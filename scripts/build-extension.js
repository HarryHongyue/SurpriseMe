#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const archiver = require('archiver');

console.log('🚀 Building SurpriseMe Extensions...');

const projectRoot = path.join(__dirname, '..');
const chromeExtDir = path.join(projectRoot, 'extension_chrome');
const firefoxExtDir = path.join(projectRoot, 'extension_firefox');
const outputDir = path.join(projectRoot, 'artifacts');
const packageJson = JSON.parse(fs.readFileSync(path.join(projectRoot, 'package.json'), 'utf8'));
const args = process.argv.slice(2);
const envVersion = process.env.BUILD_VERSION;
const positionalVersion = args.length ? args[0] : undefined;
const version = envVersion || positionalVersion || packageJson.version;

// 确保输出目录存在
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// 清理旧产物
for (const file of fs.readdirSync(outputDir)) {
  if (file.toLowerCase().startsWith('surpriseme') && file.endsWith('.zip')) {
    fs.rmSync(path.join(outputDir, file));
  }
}

// 验证 manifest.json
function validateManifest(manifestPath, browserName) {
  try {
    if (!fs.existsSync(manifestPath)) {
      console.error(`❌ ${browserName} manifest.json 文件不存在`);
      return false;
    }
    
    const manifestContent = fs.readFileSync(manifestPath, 'utf8');
    JSON.parse(manifestContent);
    console.log(`✅ ${browserName} manifest.json 验证通过`);
    return true;
  } catch (error) {
    console.error(`❌ ${browserName} manifest.json 验证失败:`, error.message);
    return false;
  }
}

// 主构建函数
async function buildExtensions() {
  console.log('\n🔍 验证扩展清单文件...');
  
  // 验证 Chrome 扩展
  const chromeManifest = path.join(chromeExtDir, 'manifest.json');
  if (!validateManifest(chromeManifest, 'Chrome')) {
    process.exit(1);
  }
  
  // 验证 Firefox 扩展
  const firefoxManifest = path.join(firefoxExtDir, 'manifest.json');
  if (!validateManifest(firefoxManifest, 'Firefox')) {
    process.exit(1);
  }
  
  console.log('\n📦 开始打包扩展...');
  
  try {
    // 创建合并的扩展包
    const mergedZipPath = path.join(outputDir, `SurpriseMe-${version}.zip`);
    await createMergedPackage(chromeExtDir, firefoxExtDir, mergedZipPath, version);
    
    console.log('\n🎉 所有扩展打包完成！');
    console.log('\n📋 安装说明:');
    console.log(`\n1. 解压 SurpriseMe-${version}.zip`);
    console.log('\nChrome/Edge/Brave/Vivaldi:');
    console.log('2. 进入 chrome://extensions/');
    console.log('3. 开启"开发者模式"');
    console.log('4. 点击"加载已解压的扩展程序"');
    console.log('5. 选择 extension_chrome 文件夹');
    
    console.log('\nFirefox:');
    console.log('6. 进入 about:debugging');
    console.log('7. 点击"此 Firefox"');
    console.log('8. 点击"临时加载附加组件"');
    console.log('9. 选择 extension_firefox/manifest.json 文件');
    
  } catch (error) {
    console.error('❌ 构建失败:', error.message);
    process.exit(1);
  }
}

// 函数：创建合并的压缩包
function createMergedPackage(chromeDir, firefoxDir, outputPath, version) {
  return new Promise((resolve, reject) => {
    const output = fs.createWriteStream(outputPath);
    const archive = archiver('zip', {
      zlib: { level: 9 } // 最高压缩级别
    });

    output.on('close', function() {
      console.log(`✅ 合并扩展打包完成: ${archive.pointer()} bytes`);
      console.log(`📁 输出路径: ${outputPath}`);
      resolve();
    });

    archive.on('error', function(err) {
      console.error(`❌ 合并打包失败:`, err.message);
      reject(err);
    });

    archive.pipe(output);
    
    // 添加 Chrome 扩展到压缩包
    archive.directory(chromeDir, 'extension_chrome');
    
    // 添加 Firefox 扩展到压缩包
    archive.directory(firefoxDir, 'extension_firefox');
    
    // 添加 README 文件
    const readmeContent = `# SurpriseMe Browser Extension v${version}

## Installation

### Chrome/Edge/Brave/Vivaldi
1. Extract this ZIP file
2. Go to chrome://extensions/
3. Enable "Developer mode"
4. Click "Load unpacked"
5. Select the extension_chrome folder

### Firefox
1. Extract this ZIP file
2. Go to about:debugging
3. Click "This Firefox"
4. Click "Load Temporary Add-on"
5. Select the extension_firefox/manifest.json file

## Version
${version}
`;
    archive.append(readmeContent, { name: 'README.txt' });

    archive.finalize();
  });
}

// 运行构建
buildExtensions();