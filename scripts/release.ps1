param(
    [Parameter(Mandatory = $true)]
    [string]$Version,
    [string]$Changes = ""
)

$ErrorActionPreference = "Stop"

function Test-CommandAvailable {
    param(
        [Parameter(Mandatory = $true)][string]$Name,
        [string]$InstallHint = ""
    )
    if (-not (Get-Command $Name -ErrorAction SilentlyContinue)) {
        $hint = if ($InstallHint) { " ($InstallHint)" } else { "" }
        throw "Missing required command '$Name'.$hint"
    }
}

function Get-NumericVersion {
    param([string]$Tag)
    $trimmed = $Tag.Trim()
    if ($trimmed -match '^v(.+)$') {
        return $Matches[1]
    }
    return $trimmed
}

function Write-JsonFile {
    param([string]$Path, $Object)
    $json = $Object | ConvertTo-Json -Depth 20
    $encoding = New-Object System.Text.UTF8Encoding($false)
    [System.IO.File]::WriteAllText($Path, $json, $encoding)
}

function Update-VersionField {
    param([string]$Path, [string]$NewVersion)
    if (Test-Path $Path) {
        $json = Get-Content $Path -Raw | ConvertFrom-Json
        $json.version = $NewVersion
        Write-JsonFile -Path $Path -Object $json
    }
}

function Update-PackageLockVersion {
    param([string]$Path, [string]$NewVersion)
    if (-not (Test-Path $Path)) {
        return
    }
    $json = Get-Content $Path -Raw | ConvertFrom-Json -AsHashTable
    $json.version = $NewVersion
    if ($json.packages -and $json.packages.ContainsKey("")) {
        $json.packages[""].version = $NewVersion
    }
    Write-JsonFile -Path $Path -Object $json
}

function Require-Env {
    param([string]$Name)
    $value = [System.Environment]::GetEnvironmentVariable($Name, 'Process')
    if (-not $value) {
        $value = [System.Environment]::GetEnvironmentVariable($Name, 'User')
    }
    if (-not $value) {
        $value = [System.Environment]::GetEnvironmentVariable($Name, 'Machine')
    }
    if ([string]::IsNullOrWhiteSpace($value)) {
        throw "Missing required environment variable: $Name"
    }
    return $value
}

function Format-SizeString {
    param([long]$Bytes)
    if ($Bytes -ge 1MB) { return "{0:N1} MB" -f ($Bytes / 1MB) }
    if ($Bytes -ge 1KB) { return "{0:N1} KB" -f ($Bytes / 1KB) }
    return "$Bytes B"
}

function Normalize-Changes {
    param([string]$ChangeText)
    if ([string]::IsNullOrWhiteSpace($ChangeText)) {
        return @("Refer to GitHub release notes for details")
    }
    $items = $ChangeText -split '[,;\r\n]+' | ForEach-Object { $_.Trim() } | Where-Object { $_ }
    if (-not $items) {
        return @("Refer to GitHub release notes for details")
    }
    return $items
}

Write-Host "🚀 Starting SurpriseMe release process for $Version" -ForegroundColor Green

$tagVersion = $Version.Trim()
$packageVersion = Get-NumericVersion -Tag $tagVersion
$projectRoot = Join-Path $PSScriptRoot '..' | Resolve-Path
$artifactsDir = Join-Path $projectRoot 'artifacts'

Require-Env -Name 'HARRYWEBSITE_AUTOMATED_PACKAGE_DEPLOYMENT_GITHUB_TOKEN'
if (-not $env:GH_TOKEN) {
    $env:GH_TOKEN = $env:HARRYWEBSITE_AUTOMATED_PACKAGE_DEPLOYMENT_GITHUB_TOKEN
}

Write-Host "📝 Updating package.json & manifest versions..." -ForegroundColor Yellow
$packagePath = Join-Path $projectRoot 'package.json'
Update-VersionField -Path $packagePath -NewVersion $packageVersion
Update-PackageLockVersion -Path (Join-Path $projectRoot 'package-lock.json') -NewVersion $packageVersion

$manifestPaths = @(
    Join-Path $projectRoot 'extension_chrome/manifest.json',
    Join-Path $projectRoot 'extension_firefox/manifest.json',
    Join-Path $projectRoot 'extension_safari/manifest.json'
)
foreach ($path in $manifestPaths) {
    if (Test-Path $path) {
        Update-VersionField -Path $path -NewVersion $packageVersion
    }
}

Write-Host "🔨 Building extensions..." -ForegroundColor Yellow
Push-Location $projectRoot
try {
    $env:BUILD_VERSION = $packageVersion
    npm run package $packageVersion
}
finally {
    $env:BUILD_VERSION = $null
    Pop-Location
}

$chromeZipName = "SurpriseMe-Chrome-$packageVersion.zip"
$firefoxZipName = "SurpriseMe-Firefox-$packageVersion.zip"
$chromeZipPath = Join-Path $artifactsDir $chromeZipName
$firefoxZipPath = Join-Path $artifactsDir $firefoxZipName

if (-not (Test-Path $chromeZipPath)) {
    throw "Chrome package not found at $chromeZipPath. Ensure npm run package succeeded."
}
if (-not (Test-Path $firefoxZipPath)) {
    throw "Firefox package not found at $firefoxZipPath. Ensure npm run package succeeded."
}

Write-Host "🔐 Calculating checksums..." -ForegroundColor Yellow
$chromeSha = (Get-FileHash -Path $chromeZipPath -Algorithm SHA256).Hash.ToLower()
$firefoxSha = (Get-FileHash -Path $firefoxZipPath -Algorithm SHA256).Hash.ToLower()

$chromeSize = Format-SizeString -Bytes (Get-Item $chromeZipPath).Length
$firefoxSize = Format-SizeString -Bytes (Get-Item $firefoxZipPath).Length

Write-Host "📦 Creating GitHub release..." -ForegroundColor Yellow
$releaseNotes = "SurpriseMe $tagVersion Release`n`n$Changes"
$assetArgs = @($chromeZipPath, $firefoxZipPath)
$ghArgs = @('release', 'create', $tagVersion) + $assetArgs + @('--notes', $releaseNotes, '--title', "SurpriseMe $tagVersion")
gh @ghArgs

Write-Host "🔄 Updating Harry release manifest via GitHub API..." -ForegroundColor Yellow
$manifestEndpoint = "repos/HarryHongyue/Harry/contents/public/releases/release-manifest.json"
$manifestResponse = & gh api $manifestEndpoint | ConvertFrom-Json
$manifestContent = [System.Text.Encoding]::UTF8.GetString([System.Convert]::FromBase64String($manifestResponse.content))
$manifest = $manifestContent | ConvertFrom-Json
$projectKey = 'surpriseme'
$projectNode = $manifest.projects.$projectKey
if (-not $projectNode) {
    throw "Project key '$projectKey' not found in release-manifest.json"
}

$projectNode.latestVersion = $tagVersion
$projectNode.releaseDate = (Get-Date).ToString('yyyy-MM-dd')

$projectNode.assets = @(
    @{
        label = @{ en = 'Chrome Extension'; zh = 'Chrome 扩展'; nl = 'Chrome-extensie' }
        platform = @{ en = 'Chrome/Edge/Brave/Vivaldi'; zh = 'Chrome/Edge/Brave/Vivaldi'; nl = 'Chrome/Edge/Brave/Vivaldi' }
        version = $tagVersion
        size = $chromeSize
        href = "https://github.com/HarryHongyue/SurpriseMe/releases/download/$tagVersion/$chromeZipName"
        sha256 = $chromeSha
    },
    @{
        label = @{ en = 'Firefox Add-on'; zh = 'Firefox 附加组件'; nl = 'Firefox-add-on' }
        platform = @{ en = 'Firefox'; zh = 'Firefox'; nl = 'Firefox' }
        version = $tagVersion
        size = $firefoxSize
        href = "https://github.com/HarryHongyue/SurpriseMe/releases/download/$tagVersion/$firefoxZipName"
        sha256 = $firefoxSha
    }
)

$historyEntry = @{
    version = $tagVersion
    date = (Get-Date).ToString('yyyy-MM-dd')
    changes = Normalize-Changes -ChangeText $Changes
}
$existingHistory = $projectNode.versionHistory
if (-not $existingHistory) { $existingHistory = @() }
$projectNode.versionHistory = @($historyEntry) + $existingHistory
$manifest.lastUpdated = (Get-Date).ToString('o')

$updatedManifestJson = $manifest | ConvertTo-Json -Depth 10
$encodedManifest = [Convert]::ToBase64String([System.Text.Encoding]::UTF8.GetBytes($updatedManifestJson))
$manifestPayload = @{
    message = "Update manifest for SurpriseMe $tagVersion"
    content = $encodedManifest
    sha = $manifestResponse.sha
} | ConvertTo-Json -Depth 10

$manifestPayload | gh api $manifestEndpoint --method PUT --input - | Out-Null

Write-Host "🔔 Triggering Harry website rebuild..." -ForegroundColor Yellow
$dispatchPayload = @{
    event_type = 'release-update'
    client_payload = @{
        project = 'surpriseme'
        version = $tagVersion
    }
} | ConvertTo-Json -Depth 5

$dispatchPayload | gh api repos/HarryHongyue/Harry/dispatches --method POST --input - | Out-Null

Write-Host "✅ Release process completed successfully!" -ForegroundColor Green
