# GitHub Actions Workflows

This directory contains automated workflows for building, testing, and deploying the SurpriseMe project.

## 🔄 Workflows

### 1. `build-and-deploy.yml` - Main CI/CD Pipeline

**Triggers:**
- Push to `main` or `master` branch
- Pull requests to `main` or `master` branch  
- Manual trigger (`workflow_dispatch`)

**Jobs:**
- **build-website**: Builds the React website
- **build-extensions**: Creates extension packages for Chrome and Firefox
- **deploy-to-github-pages**: Deploys website to GitHub Pages (main branch only)
- **create-release**: Creates GitHub release with extension packages (main branch only)
- **quality-checks**: Runs linting, type checking, and manifest validation

### 2. `release-extensions.yml` - Store Release Pipeline

**Triggers:**
- New release published
- Manual trigger with version input

**Jobs:**
- **prepare-chrome-store**: Creates Chrome Web Store ready package
- **prepare-firefox-store**: Creates Mozilla Add-ons ready package  
- **create-store-release**: Creates release with store-ready packages

## 🚀 Usage

### Automatic Deployment
1. Push code to `main` branch
2. GitHub Actions automatically:
   - Builds website and extensions
   - Deploys website to GitHub Pages
   - Creates release with extension packages

### Manual Release for Stores
1. Go to **Actions** tab in GitHub
2. Select **"Release Extensions to Stores"** workflow
3. Click **"Run workflow"**
4. Enter version number (e.g., `1.0.0`)
5. Download store-ready packages from the created release

### Local Development
```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build everything
npm run build:all

# Type checking
npm run type-check

# Linting
npm run lint
```

## 📦 Artifacts

### Website Build
- **Artifact**: `website-dist`
- **Contents**: Built React application
- **Retention**: 30 days

### Extension Packages
- **Artifacts**: `chrome-extension`, `firefox-extension`
- **Contents**: Packaged extension files
- **Retention**: 90 days

### Store Packages
- **Artifacts**: `chrome-store-package`, `firefox-store-package`
- **Contents**: Store-submission ready packages
- **Retention**: 30 days

## 🛠️ Setup Requirements

### GitHub Repository Settings

1. **Enable GitHub Pages**:
   - Go to Settings → Pages
   - Source: GitHub Actions
   - This allows automatic deployment

2. **Permissions** (already configured in workflows):
   - `contents: read` - Read repository contents
   - `pages: write` - Deploy to GitHub Pages
   - `id-token: write` - OIDC token for Pages

### Environment Variables
No additional environment variables needed. Workflows use built-in `GITHUB_TOKEN`.

## 🔍 Monitoring

### Build Status
- Check **Actions** tab for workflow runs
- Green ✅ = Success
- Red ❌ = Failed (check logs)

### Deployment Status
- Website: Check GitHub Pages URL
- Extensions: Download from Releases

### Quality Checks
- Type errors: Check `quality-checks` job logs
- Linting issues: Check `quality-checks` job logs
- Manifest validation: Check `build-extensions` job logs

## 🐛 Troubleshooting

### Common Issues

1. **Build Fails on Dependencies**
   ```bash
   # Local fix
   rm -rf node_modules package-lock.json
   npm install
   ```

2. **Type Check Errors**
   ```bash
   # Run locally to see issues
   npm run type-check
   ```

3. **Extension Package Issues**
   - Check manifest.json syntax
   - Ensure all required files exist
   - Verify file permissions

4. **Pages Deployment Fails**
   - Check GitHub Pages settings
   - Verify build output in `dist/` folder
   - Check workflow permissions

### Debug Steps
1. Check workflow logs in Actions tab
2. Run commands locally to reproduce
3. Verify file paths and permissions
4. Check manifest.json validity

## 📋 Store Submission Process

### Chrome Web Store
1. Download `chrome-store-package.zip` from release
2. Go to [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole/)
3. Upload package and fill store listing
4. Submit for review

### Mozilla Add-ons
1. Download `firefox-store-package.zip` from release  
2. Go to [Mozilla Add-on Developer Hub](https://addons.mozilla.org/developers/)
3. Upload package and fill listing details
4. Submit for review

### Microsoft Edge Add-ons
1. Use `chrome-store-package.zip` (compatible)
2. Go to [Microsoft Edge Add-ons](https://partner.microsoft.com/dashboard/microsoftedge/)
3. Upload and submit

## 🔄 Version Management

Versions are automatically managed:
- **Website**: Uses semantic versioning
- **Extensions**: Version from manifest.json
- **Releases**: Auto-incremented based on run number

To update extension version:
1. Edit `extension_chrome/manifest.json`
2. Edit `extension_firefox/manifest.json`  
3. Commit changes
4. Workflow will use new version in packages