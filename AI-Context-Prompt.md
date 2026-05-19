# AI 上下文提示词文档 - Harry 项目重构改造

## 项目背景

### 当前状态

Harry 是一个个人项目展示和下载中心网站，目前采用统一主站的方式展示多个独立项目。原本每个项目都有自己的独立官网或展示页面，这种方式导致：
- 部署分散，每个项目需要单独维护前端
- 主题、多语言、下载链接不统一
- 版本更新管理分散，难以维护
- 维护成本高，重复代码多

### 重构目标

将所有项目的展示功能统一到 Harry 主站，各独立项目专注于核心功能开发和发布：

**Harry 主站职责**：
- 统一展示所有项目
- 统一下载中心
- 统一版本号展示
- 统一 Release notes 摘要
- 统一多语言支持
- 统一明暗主题
- 统一部署文档
- 统一版本管理（release-manifest.json）

**各独立项目职责**：
- 专注于核心功能开发
- 专注于应用端构建
- 专注于后端服务
- 专注于安装包和 Release 发布
- 通过 release.ps1 脚本自动化发布

### 关键原则

1. **不再为项目展示页使用二级域名** - 所有项目统一使用 harryhongyue.com 域名
2. **不再让每个项目维护独立官网** - 展示功能统一到 Harry 主站
3. **不原样复制其他项目的 React 应用壳** - 只迁移核心内容，不迁移重复的基础设施
4. **迁移内容、组件和业务入口，不迁移重复的 Header、Footer、ThemeSwitcher、i18n Provider**
5. **后端算力项目保留在各自仓库，通过 Docker + API 路由接入 Harry**
6. **桌面应用和扩展包通过 GitHub Releases 发布，Harry 读取 manifest 展示最新版本号**

## 项目分类

### 一、纯桌面应用项目

**特点**：
- 无独立前端（或有旧前端需要删除）
- 无后端 API
- 发布方式：GitHub Releases（Windows 安装程序）
- Harry 网站仅作为展示页和下载中心

**项目列表**：
1. ODE Solver (ODE-All-In-One-Solver)
2. SurpriseMe
3. 计量证书管理系统 (Metrology-Certificate-System)

**改造任务**：
- ✅ 已创建 release.ps1 脚本
- ✅ 已在 Harry 网站创建展示组件
- ✅ 已添加到 release-manifest.json
- ⚠️ 需要配置 GitHub Secrets
- ⚠️ 需要测试发布流程
- ⚠️ 需要删除旧前端（如果有）

### 二、桌面应用 + 后端 API 项目

**特点**：
- 无独立前端（或有旧前端需要删除）
- 有后端 API（需要 Docker 化）
- 发布方式：
  - 桌面版：GitHub Releases（Windows 安装程序）
  - 后端：Docker 镜像（ghcr.io）
- Harry 网站提供展示页和在线工具入口

**项目列表**：
1. PDF Reader
2. Aircargo EDI

**改造任务**：
- ✅ 已创建 release.ps1 脚本
- ✅ 已在 Harry 网站创建展示组件
- ✅ 已添加到 release-manifest.json
- ⚠️ 需要创建后端 Dockerfile
- ⚠️ 需要配置 GitHub Secrets（包括 Docker 相关）
- ⚠️ 需要测试发布流程
- ⚠️ 需要配置 Harry compose.yml
- ⚠️ 需要验证 watchtower 自动更新
- ⚠️ 需要删除旧前端（如果有）

### 三、网站案例项目（独立运行）

**特点**：
- 有独立前端（保留，不删除）
- 可能有后端（保留，不删除）
- 独立部署，Harry 网站仅作为介绍页
- 不影响项目的独立运行

**项目列表**：
1. Future Website Building Platform
2. Ominigent
3. CryoCore Cooling
4. Song Yan
5. Harry Personal
6. Harry's Hub
7. Electronic Product Specifications Analysis

**改造任务**：
- ✅ 已在 Harry 网站创建展示组件（如有）
- ✅ 已在 Harry projects.ts 添加项目条目（如有）
- ⚠️ 需要验证 Harry 网站展示页正常显示
- ⚠️ 需要验证"访问网站"链接正确
- ⚠️ 确认项目独立部署配置正常
- ⚠️ 不需要删除任何代码

## 各项目详细改造指南

### 1. ODE Solver (ODE-All-In-One-Solver)

**项目类型**：纯桌面应用（JavaFX）

**项目路径**：`g:\GitHubPersonal\ODE-All-In-One-Solver`

**当前状态**：
- ✅ 已创建 `scripts/release.ps1`
- ✅ 已在 Harry 网站创建展示组件 `OdeSolverShowcase.tsx`
- ✅ 已添加到 release-manifest.json
- ⚠️ 需要配置 GitHub Secrets
- ⚠️ 需要测试发布流程
- ⚠️ 需要删除旧前端（如果有）

**改造任务**：

1. **验证项目结构**
   - 确认 `pom.xml` 存在
   - 确认 `scripts/release.ps1` 存在
   - 检查是否有 `frontend/` 目录（旧前端）

2. **删除旧前端（如果有）**
   - 如果有 `frontend/` 目录，可以选择删除或保留作为历史记录
   - 推荐删除，因为展示功能已迁移到 Harry 网站
   - 删除命令：`Remove-Item -Recurse -Force frontend\`
   - 提交删除：`git add .`, `git commit -m "删除旧前端，展示功能迁移到 Harry 网站"`, `git push`

3. **配置 GitHub Secrets**
   - 访问：`https://github.com/HarryHongyue/ODE-All-In-One-Solver/settings/secrets/actions`
   - 添加 Secret：
     - Name: `HARRYWEBSITE_AUTOMATED_PACKAGE_DEPLOYMENT_GITHUB_TOKEN`
     - Value: 统一的自动化发布 token

4. **测试发布流程**
   - 准备发布：`git add .`, `git commit -m "准备发布新版本"`, `git push`
   - 运行发布脚本：`.\scripts\release.ps1 -Version "v1.1.0" -Changes "新增功能1, 新增功能2, 修复bug"`
   - 验证发布结果：
     - 访问 GitHub Releases 确认 Release 创建成功
     - 访问 Harry 网站确认版本号更新
     - 访问 Harry 仓库确认 release-manifest.json 更新

**关键点**：
- 删除旧前端时，确保只删除展示相关代码，不删除核心业务代码
- release.ps1 脚本应该能够自动完成所有发布步骤
- 测试发布流程时，可以使用测试版本号（如 v0.0.1-test）

---

### 2. SurpriseMe

**项目类型**：纯桌面应用（浏览器扩展）

**项目路径**：`g:\GitHubPersonal\SurpriseMe`

**当前状态**：
- ✅ 已创建 `scripts/release.ps1`
- ✅ 已在 Harry 网站创建展示组件 `SurpriseMeShowcase.tsx`
- ✅ 已添加到 release-manifest.json
- ⚠️ 需要配置 GitHub Secrets
- ⚠️ 需要测试发布流程
- ⚠️ 需要手动发布到 Chrome Web Store / Firefox Add-ons

**改造任务**：

1. **验证项目结构**
   - 确认 `package.json` 存在
   - 确认 `manifest.json` 存在
   - 确认 `scripts/release.ps1` 存在
   - 确认 `scripts/build-extension.js` 存在

2. **配置 GitHub Secrets**
   - 访问：`https://github.com/HarryHongyue/SurpriseMe/settings/secrets/actions`
   - 添加 Secret：
     - Name: `HARRYWEBSITE_AUTOMATED_PACKAGE_DEPLOYMENT_GITHUB_TOKEN`
     - Value: 统一的自动化发布 token

3. **测试发布流程**
   - 准备发布：`git add .`, `git commit -m "准备发布新版本"`, `git push`
   - 运行发布脚本：`.\scripts\release.ps1 -Version "v1.1.0" -Changes "新增颜色选项, 修复Chrome兼容性"`
   - 验证发布结果（同 ODE Solver）

4. **手动发布到浏览器商店**
   - Chrome Web Store: 访问 Developer Console，上传 ZIP 包，提交审核
   - Firefox Add-ons: 访问 Developer Hub，上传 ZIP 包，提交审核

**关键点**：
- 浏览器商店发布目前需要手动完成
- release.ps1 脚本应该更新 `package.json` 和 `manifest.json` 的版本号
- 测试发布时，可以先发布到 GitHub Releases，再发布到浏览器商店

---

### 3. 计量证书管理系统 (Metrology-Certificate-System)

**项目类型**：纯桌面应用（JavaFX）

**项目路径**：`g:\GitHubPersonal\计量证书管理系统`

**当前状态**：
- ✅ 已创建 `scripts/release.ps1`
- ✅ 已在 Harry 网站创建展示组件 `MetrologyCertificateShowcase.tsx`
- ✅ 已添加到 release-manifest.json
- ⚠️ 需要配置 GitHub Secrets
- ⚠️ 需要测试发布流程

**改造任务**：

1. **验证项目结构**
   - 确认 `pom.xml` 存在
   - 确认 `package.bat` 存在
   - 确认 `scripts/release.ps1` 存在

2. **配置 GitHub Secrets**
   - 访问：`https://github.com/HarryHongyue/Metrology-Certificate-System/settings/secrets/actions`
   - 添加 Secret：
     - Name: `HARRYWEBSITE_AUTOMATED_PACKAGE_DEPLOYMENT_GITHUB_TOKEN`
     - Value: 统一的自动化发布 token

3. **测试发布流程**
   - 准备发布：`git add .`, `git commit -m "准备发布新版本"`, `git push`
   - 运行发布脚本：`.\scripts\release.ps1 -Version "v1.1.0" -Changes "新增批量导入功能, 修复数据库bug"`
   - 验证发布结果（同 ODE Solver）

**关键点**：
- release.ps1 脚本应该调用 `package.bat` 构建安装程序
- 确保安装程序能够正常安装和运行

---

### 4. PDF Reader

**项目类型**：桌面应用 + 后端 API（Python + FastAPI）

**项目路径**：`g:\GitHubPersonal\PDF-Reader`

**当前状态**：
- ✅ 已创建 `scripts/release.ps1`
- ✅ 已在 Harry 网站创建展示组件 `PdfReaderShowcase.tsx`
- ✅ 已添加到 release-manifest.json
- ⚠️ 需要创建后端 Dockerfile
- ⚠️ 需要配置 GitHub Secrets（包括 Docker 相关）
- ⚠️ 需要测试发布流程
- ⚠️ 需要配置 Harry compose.yml
- ⚠️ 需要验证 watchtower 自动更新
- ⚠️ 需要删除旧前端（如果有）

**改造任务**：

1. **验证项目结构**
   - 确认 `backend/` 目录存在
   - 确认 `local_version.json` 存在
   - 确认 `scripts/release.ps1` 存在

2. **创建后端 Dockerfile**
   - 在 `backend/` 目录中创建 `Dockerfile`
   - Dockerfile 内容应该包括：
     - FROM python:3.11-slim
     - 安装依赖（requirements.txt）
     - 复制应用代码
     - 暴露端口 8000
     - 启动命令：uvicorn main:app --host 0.0.0.0 --port 8000

3. **配置 GitHub Secrets**
   - 访问：`https://github.com/HarryHongyue/PDF-Reader/settings/secrets/actions`
   - 添加 Secrets：
     - Name: `HARRYWEBSITE_AUTOMATED_PACKAGE_DEPLOYMENT_GITHUB_TOKEN`
     - Value: 统一的自动化发布 token
     - Name: `DOCKER_USERNAME`
     - Value: GitHub 用户名（HarryHongyue）
     - Name: `DOCKER_PASSWORD`
     - Value: Docker Registry Token（需要有 write:packages 权限）

4. **测试发布流程**
   - 准备发布：`git add .`, `git commit -m "准备发布新版本"`, `git push`
   - 运行发布脚本：`.\scripts\release.ps1 -Version "v1.3.0" -Changes "新增表格识别功能, 优化OCR准确率"`
   - 验证发布结果：
     - 访问 GitHub Releases 确认 Release 创建成功
     - 访问 GitHub Container Registry 确认 Docker 镜像推送成功
     - 访问 Harry 网站确认版本号更新

5. **配置 Harry compose.yml**
   - 在 Harry 项目的 `compose.yml` 中添加 PDF Reader 后端服务：
     ```yaml
     pdf-reader-api:
       image: ghcr.io/harryhongyue/pdf-reader-api:latest
       container_name: pdf-reader-api
       ports:
         - "8001:8000"
       labels:
         - "com.centurylinklabs.watchtower.enable=true"
       restart: unless-stopped
     ```

6. **验证 watchtower 自动更新**
   - 发布新版本 Docker 镜像
   - 等待 5 分钟（WATCHTOWER_POLL_INTERVAL=300）
   - 检查 watchtower 日志：`docker logs watchtower`
   - 验证 pdf-reader-api 容器是否自动重启：`docker ps | findstr pdf-reader-api`

**关键点**：
- Dockerfile 应该使用多阶段构建或轻量级基础镜像
- release.ps1 脚本应该同时构建桌面安装程序和 Docker 镜像
- Docker Registry Token 需要有 write:packages 权限
- watchtower 会自动监控并更新 Docker 镜像

---

### 5. Aircargo EDI

**项目类型**：桌面应用 + 后端 API（Python + FastAPI）

**项目路径**：`g:\GitHubPersonal\Aircargo-EDI`

**当前状态**：
- ✅ 已创建 `scripts/release.ps1`
- ✅ 已在 Harry 网站创建展示组件 `AircargoEdiShowcase.tsx`
- ✅ 已添加到 release-manifest.json
- ⚠️ 需要创建后端 Dockerfile
- ⚠️ 需要配置 GitHub Secrets（包括 Docker 相关）
- ⚠️ 需要测试发布流程
- ⚠️ 需要配置 Harry compose.yml
- ⚠️ 需要验证 watchtower 自动更新
- ⚠️ 需要删除旧前端（如果有）

**改造任务**：

1. **验证项目结构**
   - 确认 `backend/` 目录存在
   - 确认 `local_version.json` 存在
   - 确认 `scripts/release.ps1` 存在

2. **创建后端 Dockerfile**
   - 在 `backend/` 目录中创建 `Dockerfile`
   - Dockerfile 内容参考 PDF Reader

3. **配置 GitHub Secrets**
   - 访问：`https://github.com/HarryHongyue/Aircargo-EDI/settings/secrets/actions`
   - 添加 Secrets（与 PDF Reader 相同，可以复用同一个 Docker Registry Token）

4. **测试发布流程**
   - 准备发布：`git add .`, `git commit -m "准备发布新版本"`, `git push`
   - 运行发布脚本：`.\scripts\release.ps1 -Version "v1.1.0" -Changes "新增AWB解析功能, 优化报文生成"`
   - 验证发布结果（同 PDF Reader）

5. **配置 Harry compose.yml**
   - 在 Harry 项目的 `compose.yml` 中添加 Aircargo EDI 后端服务：
     ```yaml
     aircargo-edi-api:
       image: ghcr.io/harryhongyue/aircargo-edi-api:latest
       container_name: aircargo-edi-api
       ports:
         - "8002:8000"
       labels:
         - "com.centurylinklabs.watchtower.enable=true"
       restart: unless-stopped
     ```

6. **验证 watchtower 自动更新**
   - 同 PDF Reader

**关键点**：
- 可以与 PDF Reader 复用同一个 Docker Registry Token
- 确保端口不冲突（PDF Reader: 8001, Aircargo EDI: 8002）

---

### 6-12. 网站案例项目（独立运行）

**项目列表**：
6. Future Website Building Platform
7. Ominigent
8. CryoCore Cooling
9. Song Yan
10. Harry Personal
11. Harry's Hub
12. Electronic Product Specifications Analysis

**重要说明**：
- 这些项目是独立运行的网站，有自己的前端和后端
- **不需要删除任何代码**
- **不需要修改任何部署配置**
- Harry 网站仅作为介绍页，不影响项目的独立运行

**改造任务**（以 CryoCore Cooling 为例）：

1. **验证项目结构**
   - 确认项目有独立的前端代码
   - 确认项目有独立的部署配置

2. **验证 Harry 网站展示组件**
   - 确认 Harry 网站有对应的展示组件
   - 确认展示组件有"访问网站"按钮
   - 确认"访问网站"按钮链接正确

3. **验证 Harry projects.ts 配置**
   - 确认 Harry 项目的 `src/data/projects.ts` 有对应项目条目
   - 确认 `externalUrl` 字段指向实际运行的网站地址
   - 确认 `downloadable: false`

4. **验证 Harry 网站展示页**
   - 访问 Harry 网站对应项目页面
   - 确认展示页正常显示
   - 确认"访问网站"按钮链接正确
   - 点击"访问网站"按钮，确认能正常跳转

5. **确认项目独立部署配置正常**
   - 确认项目能够独立部署和运行
   - 确认项目有自己的域名或访问地址

**关键点**：
- 不需要删除任何代码
- 不需要修改任何部署配置
- Harry 网站仅作为介绍页
- 项目继续独立运行

---

## Harry 主站配置

### GitHub Actions 配置

**配置 GitHub Secrets**：
1. 访问：`https://github.com/HarryHongyue/Harry/settings/secrets/actions`
2. 添加 Secrets：
   - Name: `SERVER_HOST`
   - Value: 服务器地址
   - Name: `SERVER_USER`
   - Value: 服务器用户名
   - Name: `SSH_PRIVATE_KEY`
   - Value: SSH 私钥内容

### Docker Compose 配置

**验证 compose.yml**：
- 确认包含 harry-web 服务
- 确认包含 watchtower 服务
- 确认 watchtower 配置正确（WATCHTOWER_POLL_INTERVAL=300）
- 确认包含 PDF Reader 和 Aircargo EDI 后端服务（如果已完成）

### 验证自动更新

1. 发布新版本 Harry Docker 镜像
2. 等待 5 分钟
3. 检查 watchtower 日志：`docker logs watchtower`
4. 验证 harry-web 容器是否自动重启：`docker ps | findstr harry-web`

---

## GitHub Token 配置

### Token 策略

**推荐方案**：创建一个专用于自动化发布的 token，用于所有项目。

- **优点**：管理简单，只需要维护一个 token
- **当前推荐**：使用一个统一的自动化发布 token，因为：
  - 所有项目都是你个人的
  - token 只存储在 GitHub Secrets 中，不会泄露
  - 管理成本更低

### Token 过期日期

**推荐方案**：设置 1 年过期时间，并在日历中设置提醒。

- 平衡了安全性和便利性
- 每年更新一次，频率可接受
- 在日历中设置提醒，避免忘记

### 权限选择

**纯桌面应用（ODE Solver、SurpriseMe、计量证书管理系统）**：
- ✅ `repo`（完整仓库权限）
- ✅ `workflow`（GitHub Actions 权限）
- ❌ 其他所有权限都不需要

**桌面应用 + 后端 API（PDF Reader、Aircargo EDI）**：
- ✅ `repo`（完整仓库权限）
- ✅ `workflow`（GitHub Actions 权限）
- ✅ `write:packages`（用于推送 Docker 镜像）
- ✅ `read:packages`（用于拉取 Docker 镜像）
- ❌ 其他所有权限都不需要

### 配置步骤

1. 访问：`https://github.com/settings/tokens`
2. 点击 "Generate new token" -> "Generate new token (classic)"
3. 填写 Token 信息：
   - Note: `自动化发布 Token - 用于项目发布自动化`
   - Expiration: 选择 `1 year`（推荐）
   - Select scopes: 根据项目类型选择权限
4. 点击 "Generate token"
5. 复制生成的 token（只显示一次，妥善保存）

### 在项目仓库中配置 Secret

**Secret Name**: `HARRYWEBSITE_AUTOMATED_PACKAGE_DEPLOYMENT_GITHUB_TOKEN`

**需要在以下项目仓库中配置**：
- ODE Solver: `https://github.com/HarryHongyue/ODE-All-In-One-Solver/settings/secrets/actions`
- SurpriseMe: `https://github.com/HarryHongyue/SurpriseMe/settings/secrets/actions`
- PDF Reader: `https://github.com/HarryHongyue/PDF-Reader/settings/secrets/actions`
- Aircargo EDI: `https://github.com/HarryHongyue/Aircargo-EDI/settings/secrets/actions`
- 计量证书管理系统: `https://github.com/HarryHongyue/Metrology-Certificate-System/settings/secrets/actions`

### Token 安全性建议

1. 不要将 token 提交到代码仓库
2. 定期更新 token（1 年过期时间）
3. 监控 token 使用情况
4. 限制 token 权限
5. 使用环境变量

---

## 当前状态总结

### 已完成

- ✅ Harry Docker 化部署
- ✅ Harry GitHub Actions 自动构建和部署 workflow
- ✅ Harry compose.yml watchtower 自动更新配置
- ✅ Harry 单域名部署
- ✅ 文档统一成单域名路由方案
- ✅ Harry 增加 release manifest 读取能力
- ✅ 所有项目展示页内容迁移到 Harry
- ✅ 所有项目一键 Release 脚本创建
- ✅ Harry GitHub Actions 自动化重建 workflow
- ✅ Harry compose.yml watchtower 自动更新配置
- ✅ release-manifest.json 统一版本管理
- ✅ 详细的项目迁移指南

### 待完成

- [ ] PDF Reader 后端 Docker 化并接入 `/api/pdf-reader/*`
- [ ] Aircargo EDI 后端 Docker 化并接入 `/api/aircargo-edi/*`
- [ ] 实现 `/apps/pdf-reader` 和 `/apps/aircargo-edi` 登录保护
- [ ] 所有项目配置 GitHub Secrets
- [ ] 测试完整的自动化发布流程

---

## AI 使用指南

### 当 AI 进入某个项目时

**示例：进入 ODE Solver 项目**

1. **理解当前任务**：
   - 这是一个纯桌面应用项目（JavaFX）
   - 需要配置 GitHub Secrets
   - 需要测试发布流程
   - 需要删除旧前端（如果有）

2. **执行步骤**：
   - 验证项目结构
   - 检查是否有旧前端
   - 如果有旧前端，询问用户是否删除
   - 配置 GitHub Secrets
   - 测试发布流程

3. **关键点**：
   - 删除旧前端时，确保只删除展示相关代码
   - release.ps1 脚本应该能够自动完成所有发布步骤
   - 测试发布时，可以使用测试版本号

**示例：进入 PDF Reader 项目**

1. **理解当前任务**：
   - 这是一个桌面应用 + 后端 API 项目
   - 需要创建后端 Dockerfile
   - 需要配置 GitHub Secrets（包括 Docker 相关）
   - 需要测试发布流程
   - 需要配置 Harry compose.yml
   - 需要验证 watchtower 自动更新

2. **执行步骤**：
   - 验证项目结构
   - 创建后端 Dockerfile
   - 配置 GitHub Secrets
   - 测试发布流程
   - 配置 Harry compose.yml
   - 验证 watchtower 自动更新

3. **关键点**：
   - Dockerfile 应该使用轻量级基础镜像
   - release.ps1 脚本应该同时构建桌面安装程序和 Docker 镜像
   - Docker Registry Token 需要有 write:packages 权限

**示例：进入网站案例项目（如 CryoCore Cooling）**

1. **理解当前任务**：
   - 这是一个独立运行的网站项目
   - 不需要删除任何代码
   - 不需要修改任何部署配置
   - 只需要验证 Harry 网站展示页正常显示

2. **执行步骤**：
   - 验证项目结构
   - 验证 Harry 网站展示组件
   - 验证 Harry projects.ts 配置
   - 验证 Harry 网站展示页
   - 确认项目独立部署配置正常

3. **关键点**：
   - 不需要删除任何代码
   - 不需要修改任何部署配置
   - Harry 网站仅作为介绍页
   - 项目继续独立运行

### 通用原则

1. **先理解项目类型**，确定改造任务
2. **验证项目结构**，确认当前状态
3. **按照文档步骤执行**，不要跳过任何步骤
4. **关键点要特别注意**，确保不遗漏
5. **遇到问题时**，参考详细文档 `project-migration-guide-detailed.md`

### 文档参考

- **总体方案**：`unified-release-and-site-plan.md`
- **详细迁移指南**：`project-migration-guide-detailed.md`
- **AI 上下文提示词**：`AI-Context-Prompt.md`（本文档）

---

## 总结

本项目的核心目标是：
- 将所有项目的展示功能统一到 Harry 主站
- 各独立项目专注于核心功能开发和发布
- 通过 release.ps1 脚本实现自动化发布
- 通过 release-manifest.json 实现统一版本管理
- 通过 Docker + watchtower 实现自动更新

关键原则：
- 不再为项目展示页使用二级域名
- 不再让每个项目维护独立官网
- 不原样复制其他项目的 React 应用壳
- 后端算力项目通过 Docker + API 路由接入 Harry
- 桌面应用和扩展包通过 GitHub Releases 发布

当前状态：
- 大部分基础设施已完成
- 主要待完成的是配置 GitHub Secrets 和测试发布流程
- 网站案例项目只需要验证展示页正常显示

AI 使用本文档时，应该：
1. 理解项目背景和目标
2. 确定当前项目类型
3. 按照对应项目的改造任务执行
4. 参考详细文档进行具体操作
5. 遵循关键原则和注意事项
