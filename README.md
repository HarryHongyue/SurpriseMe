# SurpriseMe

🎉 SurpriseMe 是一个纯浏览器扩展项目，负责为 Harry 主站提供彩色边框插件的下载、版本控制与自动化发布能力。本仓库不再托管独立网站，所有展示页已经迁移到 [harryhongyue.com](https://harryhongyue.com)。

## 📁 项目结构/Project layout

```
SurpriseMe/
├── extension_chrome/      # Chrome/Edge/Brave/Vivaldi 扩展源代码
├── extension_firefox/     # Firefox 扩展源代码
├── extension_safari/      # Safari 技术预览版（可选）
├── scripts/
│   ├── build-extension.js # Node 打包脚本
│   └── release.ps1        # PowerShell 一键发布脚本
├── artifacts/             # 打包产物输出（git 忽略）
├── package.json           # 打包依赖与 npm 脚本
└── README.md              # 当前文档
```

## 🚀 快速开始/Fast start

```powershell
# 1. 安装依赖
npm install

# 2. 打包 Chrome + Firefox 扩展
npm run package
```

## 📦 发布说明/Release notes

项目使用云端 GitHub Actions workflow 进行自动化发布，生成的安装包包含 Chrome 和 Firefox 扩展。最新版本已优化发布流程，确保源码不会被打包上传。

## 🚀 快速开始/Fast start

```powershell
# 3. 可选：执行自动化发布（需配置 Secret）
pwsh ./scripts/release.ps1 -Version "v1.1.0" -Changes "新增颜色选项, 修复Chrome兼容性"
```

> 运行 `release.ps1` 前，请先安装 **Git、Node.js 18+ (npm)、GitHub CLI**，并在当前 shell 中导出 `HARRYWEBSITE_AUTOMATED_PACKAGE_DEPLOYMENT_GITHUB_TOKEN`（或使用 Windows 环境变量）。脚本会自动检测缺失依赖并给出指引 @scripts/release.ps1#84-150。

## 🔄 发布流程/Release flow

1. **准备版本号**：遵循 `vX.Y.Z` 语义化格式。
2. **运行 `release.ps1`**：脚本会同步 `package.json/package-lock.json` 与三份 manifest 版本号、重新打包到 `artifacts/`、生成 SHA 与体积信息、创建 GitHub Release（上传 Chrome/Firefox ZIP）、更新 Harry 仓库的 `release-manifest.json` 并触发 `repository_dispatch` 构建 @scripts/release.ps1#100-230。
3. **上传到商店**：按照 `AI-Context-Prompt.md` 的要求，Chrome Web Store 与 Firefox Add-ons 仍需手动上传打包产物。
4. **验证下载中心**：访问 Harry 主站对应项目卡片，确认最新版本、SHA256 与下载链接指向新的 Release。

> 🧠 提示：`release.ps1` 会自动读取 `HARRYWEBSITE_AUTOMATED_PACKAGE_DEPLOYMENT_GITHUB_TOKEN` 环境变量，并同步更新 Chrome/Firefox/Safari manifest 版本，避免遗漏。

## ✅ 清单/Checklist（来自 AI-Context-Prompt）

- [x] 仅保留扩展核心代码，删除旧的 React 网站外壳。
- [x] 打包脚本产出与版本号绑定，输出到 `artifacts/`，方便 GitHub Releases 上传。
- [x] `release.ps1` 自动维护 `package.json` 与 manifest 版本，并将最新版本写入 Harry `release-manifest.json`。
- [ ] 手动在 Chrome Web Store / Firefox Add-ons 上传 ZIP 包。
- [ ] 各仓库均需配置 `HARRYWEBSITE_AUTOMATED_PACKAGE_DEPLOYMENT_GITHUB_TOKEN`。

## 🔐 GitHub Secrets

| 名称 | 作用 |
| --- | --- |
| `HARRYWEBSITE_AUTOMATED_PACKAGE_DEPLOYMENT_GITHUB_TOKEN` | 提供 `repo + workflow` 权限，用于 `release.ps1` 创建 Release、更新 manifest、触发 Harry 仓库 rebuild |

Harry 主站仓库内的 `auto-rebuild` workflow 会监听 `release-update` 事件，自动重建 Docker 镜像并通过 SSH/Compose 发布，因此当 `release.ps1` 推送 manifest 并触发 dispatch 后，只需等待 watchtower 拉取最新镜像即可看到新安装包 @Harry/.github/workflows/auto-rebuild.yml#1-50。

## 🤝 贡献/Contribution

- Issue / PR 欢迎提出构建或自动化相关的改进。
- 若需调整扩展 UI/UX，请在 `extension_chrome` / `extension_firefox` 目录中直接修改。

## 📄 许可证/License

MIT - 详见 [LICENSE](./LICENSE)。