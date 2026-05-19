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
$projectRoot = (Resolve-Path -LiteralPath (Join-Path -Path $PSScriptRoot -ChildPath '..')).ProviderPath
$artifactsDir = Join-Path $projectRoot 'artifacts'

Require-Env -Name 'HARRYWEBSITE_AUTOMATED_PACKAGE_DEPLOYMENT_GITHUB_TOKEN'
if (-not $env:GH_TOKEN) {
    $env:GH_TOKEN = $env:HARRYWEBSITE_AUTOMATED_PACKAGE_DEPLOYMENT_GITHUB_TOKEN
}

Write-Host "📝 Updating package.json & manifest versions..." -ForegroundColor Yellow
$packagePath = Join-Path -Path $projectRoot -ChildPath 'package.json'
$packageLockPath = Join-Path -Path $projectRoot -ChildPath 'package-lock.json'
Update-VersionField -Path $packagePath -NewVersion $packageVersion
Update-PackageLockVersion -Path $packageLockPath -NewVersion $packageVersion

$manifestPaths = @()
foreach ($folder in @('extension_chrome', 'extension_firefox', 'extension_safari')) {
    $manifestDir = Join-Path -Path $projectRoot -ChildPath $folder
    $manifestPaths += Join-Path -Path $manifestDir -ChildPath 'manifest.json'
}
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

$mergedZipName = "SurpriseMe-$packageVersion.zip"
$mergedZipPath = Join-Path -Path $artifactsDir -ChildPath $mergedZipName

if (-not (Test-Path $mergedZipPath)) {
    throw "Merged package not found at $mergedZipPath. Ensure npm run package succeeded."
}

Write-Host "🔐 Calculating checksums..." -ForegroundColor Yellow
$mergedSha = (Get-FileHash -Path $mergedZipPath -Algorithm SHA256).Hash.ToLower()
$mergedSize = Format-SizeString -Bytes (Get-Item $mergedZipPath).Length

Write-Host "📦 Creating GitHub release..." -ForegroundColor Yellow
$releaseNotes = "SurpriseMe $tagVersion Release`n`n$Changes"
$ghArgs = @('release', 'create', $tagVersion, $mergedZipPath, '--notes', $releaseNotes, '--title', "SurpriseMe $tagVersion")
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
        label = @{ en = 'Browser Extensions'; zh = '浏览器扩展'; nl = 'Browser-extensies' }
        platform = @{ en = 'Chrome/Edge/Brave/Vivaldi/Firefox'; zh = 'Chrome/Edge/Brave/Vivaldi/Firefox'; nl = 'Chrome/Edge/Brave/Vivaldi/Firefox' }
        version = $tagVersion
        size = $mergedSize
        href = "https://github.com/HarryHongyue/SurpriseMe/releases/download/$tagVersion/$mergedZipName"
        sha256 = $mergedSha
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
