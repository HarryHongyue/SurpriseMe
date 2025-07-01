#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const archiver = require('archiver');

const extensionDir = path.join(__dirname, '../extension');
const outputDir = path.join(__dirname, '../public');
const zipPath = path.join(outputDir, 'SurpriseMe-extension.zip');

// 确保输出目录存在
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// 创建压缩包
const output = fs.createWriteStream(zipPath);
const archive = archiver('zip', {
  zlib: { level: 9 } // 最高压缩级别
});

output.on('close', function() {
  console.log(`扩展打包完成: ${archive.pointer()} bytes`);
  console.log(`输出路径: ${zipPath}`);
  console.log('');
  console.log('使用说明:');
  console.log('1. 解压 SurpriseMe-extension.zip');
  console.log('2. 在Chrome中进入 chrome://extensions/');
  console.log('3. 开启"开发者模式"');
  console.log('4. 点击"加载已解压的扩展程序"');
  console.log('5. 选择解压后的文件夹');
});

archive.on('error', function(err) {
  throw err;
});

archive.pipe(output);

// 添加扩展文件到压缩包
archive.directory(extensionDir, false);

archive.finalize();