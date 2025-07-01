# SurpriseMe

🎉 为您的浏览体验带来惊喜和乐趣的Chrome扩展

## 📁 项目结构

```
SurpriseMe/
├── extension/          # Chrome扩展源代码
│   ├── manifest.json   # 扩展清单文件
│   ├── popup.html      # 弹出窗口UI
│   ├── popup.js        # 弹出窗口逻辑
│   ├── background.js   # 后台脚本
│   ├── content.js      # 内容脚本
│   ├── styles.css      # 样式文件
│   └── icons/          # 扩展图标
├── src/               # 网站源代码
│   ├── app/           # Next.js应用路由
│   ├── components/    # React组件
│   └── styles/        # 网站样式
├── public/           # 静态资源
│   └── SurpriseMe.crx # 扩展安装包
└── docs/             # 文档
```

## 🚀 快速开始

### 安装Chrome扩展

#### 方法1: 从Chrome网上应用店安装（推荐）
[Chrome网上应用店链接](https://chrome.google.com/webstore/detail/your-extension-id)

#### 方法2: 直接下载安装
1. 下载 [SurpriseMe.crx](./public/SurpriseMe.crx)
2. 打开Chrome，进入 `chrome://extensions/`
3. 开启"开发者模式"
4. 将.crx文件拖拽到扩展页面

#### 方法3: 开发者模式安装
1. 克隆本仓库
2. 打开Chrome，进入 `chrome://extensions/`
3. 开启"开发者模式"
4. 点击"加载已解压的扩展程序"
5. 选择 `extension` 文件夹

### 本地开发网站

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm run dev

# 构建生产版本
pnpm run build
```

## 🌐 在线访问

- **官方网站**: [https://surpriseme.harryhongyue.site](https://surpriseme.harryhongyue.site)
- **GitHub仓库**: [https://github.com/yourusername/SurpriseMe](https://github.com/yourusername/SurpriseMe)

## ✨ 功能特性

- 🎲 随机惊喜内容
- 🎨 12种精美主题
- 📱 响应式设计
- 🌍 多语言支持
- 🔒 隐私保护
- 🚀 轻量级设计

## 🛠️ 技术栈

### Chrome扩展
- Vanilla JavaScript
- Chrome Extension API
- HTML/CSS

### 网站
- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- React Icons

## 📖 开发指南

### 扩展开发
扩展相关代码位于 `extension/` 目录中。修改后需要在Chrome扩展页面点击"重新加载"来更新。

### 网站开发
网站使用Next.js框架，支持热重载。修改代码后浏览器会自动刷新。

## 🤝 贡献

欢迎提交Issue和Pull Request！

## 📄 许可证

MIT License - 详见 [LICENSE](./LICENSE) 文件

## 🔗 相关链接

- [Chrome扩展开发文档](https://developer.chrome.com/docs/extensions/)
- [Next.js文档](https://nextjs.org/docs)
- [React文档](https://react.dev/)