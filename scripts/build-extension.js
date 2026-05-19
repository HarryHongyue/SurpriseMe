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

// 函数：创建压缩包
function createZipPackage(sourceDir, outputPath, browserName) {
  return new Promise((resolve, reject) => {
    const output = fs.createWriteStream(outputPath);
    const archive = archiver('zip', {
      zlib: { level: 9 } // 最高压缩级别
    });

    output.on('close', function() {
      console.log(`✅ ${browserName} 扩展打包完成: ${archive.pointer()} bytes`);
      console.log(`📁 输出路径: ${outputPath}`);
      resolve();
    });

    archive.on('error', function(err) {
      console.error(`❌ ${browserName} 打包失败:`, err.message);
      reject(err);
    });

    archive.pipe(output);
    
    // 添加扩展文件到压缩包，排除 README 和其他非必要文件
    archive.glob('**/*', {
      cwd: sourceDir,
      ignore: ['*.md', '*.txt', '.DS_Store', 'Thumbs.db']
    });

    archive.finalize();
  });
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
    // 创建 Chrome 扩展包
    const chromeZipPath = path.join(outputDir, `SurpriseMe-Chrome-${version}.zip`);
    await createZipPackage(chromeExtDir, chromeZipPath, 'Chrome');
    
    // 创建 Firefox 扩展包
    const firefoxZipPath = path.join(outputDir, `SurpriseMe-Firefox-${version}.zip`);
    await createZipPackage(firefoxExtDir, firefoxZipPath, 'Firefox');
    
    console.log('\n🎉 所有扩展打包完成！');
    console.log('\n📋 安装说明:');
    console.log('\nChrome/Edge/Brave/Vivaldi:');
    console.log(`1. 解压 SurpriseMe-Chrome-${version}.zip`);
    console.log('2. 进入 chrome://extensions/');
    console.log('3. 开启"开发者模式"');
    console.log('4. 点击"加载已解压的扩展程序"');
    console.log('5. 选择解压后的文件夹');
    
    console.log('\nFirefox:');
    console.log(`1. 解压 SurpriseMe-Firefox-${version}.zip`);
    console.log('2. 进入 about:debugging');
    console.log('3. 点击"此 Firefox"');
    console.log('4. 点击"临时加载附加组件"');
    console.log('5. 选择 manifest.json 文件');
    
  } catch (error) {
    console.error('❌ 构建失败:', error.message);
    process.exit(1);
  }
}

// 运行构建
buildExtensions();