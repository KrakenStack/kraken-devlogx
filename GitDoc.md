# 1. 分支策略

## 长期分支
```bash
dev      # 开发主分支，所有功能合并到此
release  # 部署分支，只包含已准备好上线的代码
```
## 临时分支（按需）
```
feature/*   # 新功能
bugfix/*    # 修复
hotfix/*    # 紧急修复（直接从 release 切出）
```
# 2. 操作流程
## 2.1 初始设置
```bash
# 克隆项目
git clone <your-repo>
cd your-hugo-site

# 创建 dev 分支（默认）
git checkout -b dev
git push -u origin dev

# 创建 release 分支（从 dev 创建初始版本）
git checkout -b release
git push -u origin release
2.2 日常开发（在 dev 上）
bash
git checkout dev
git pull origin dev

# 创建功能分支
git checkout -b feature/new-layout
# ... 开发，提交 ...
git push -u origin feature/new-layout

# 合并到 dev（通过 PR 或本地合并）
git checkout dev
git merge feature/new-layout --no-ff
git push origin dev
```
## 2.3 准备上线（从 dev 合并到 release）
```bash
git checkout release
git pull origin release
git merge dev --no-ff
git push origin release
```
## 2.4 打 Tag 标记版本（在 release 分支上）
```bash
git checkout release
git pull origin release

# 使用语义化版本号
git tag -a v1.0.0 -m "Release v1.0.0: add contact form, fix navbar"

# 推送 tag 到远程
git push origin v1.0.0
# 或推送所有 tag
git push --tags
```
# 3. 与 CI/CD 集成（推荐）
## 3.1 使用 GitHub Actions 自动部署
当 release 分支有更新或新的 Tag 被推送时，自动构建 Hugo 并部署到服务器（如 GitHub Pages、Netlify、Vercel 或自建主机）。
示例 GitHub Actions 配置（.github/workflows/deploy.yml）：
```yaml
name: Deploy Hugo Site

on:
  push:
    branches:
      - release
    tags:
      - 'v*'

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          submodules: true
          fetch-depth: 0

      - name: Setup Hugo
        uses: peaceiris/actions-hugo@v2
        with:
          hugo-version: 'latest'

      - name: Build
        run: hugo --minify

      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        if: github.ref == 'refs/heads/release'
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./public
          publish_branch: gh-pages   # 或你的部署分支/服务器

      - name: Create Release on Tag
        if: startsWith(github.ref, 'refs/tags/')
        uses: softprops/action-gh-release@v1
        with:
          files: |
            public.tar.gz   # 可选：打包生成的静态文件
```
# 4. 版本管理规范
Tag 命名：v<major>.<minor>.<patch>（如 v1.2.3）

# 版本升级规则：

patch：修复 bug，向前兼容

minor：新增功能，向前兼容

major：不兼容的 API 变更或重大改版

自动生成 CHANGELOG：可使用 git-chglog 或 GitHub Release 手动编写变更记录。

# 5. 紧急修复流程（Hotfix）
如果线上（release）出现紧急问题，且 dev 分支已包含未完成的功能不能直接合并：

```bash
# 从 release 分支切出 hotfix
git checkout release
git pull origin release
git checkout -b hotfix/critical-bug

# 修复并提交
git commit -m "fix: critical bug"
git push origin hotfix/critical-bug

# 合并到 release
git checkout release
git merge hotfix/critical-bug --no-ff

# 打补丁版 tag
git tag -a v1.0.1 -m "Hotfix v1.0.1: fix critical bug"

# 同时合并回 dev（保持同步）
git checkout dev
git merge hotfix/critical-bug --no-ff

# 推送所有分支和 tag
git push origin release dev --tags
```
# 6. 基于 Tag 的部署（可选）
如果您的部署脚本需要根据 Tag 来发布：

```bash
# 列出所有 tag
git tag -l

# 切换到某个 tag 进行构建（用于回滚）
git checkout tags/v1.0.0
hugo --minify
或通过 CI 检测 Tag 前缀自动执行不同环境的部署（如 v2.0.0-beta 部署到预发布环境）。
```
# 7. 保护分支（建议在 Git 平台设置）
分支	保护规则
dev	要求 PR 才能合并，状态检查通过，不允许强制推送
release	要求 PR 并经过代码评审，禁止直接 push，禁止强制推送
Tag	设置为只读，只能由维护者创建

# 8. 总结命令速查表
|操作|	命令|
|-|-|
|开发新功能|	|git checkout dev && git checkout -b feature/xxx|
|合并功能到 dev	|git checkout dev && git merge feature/xxx --no-ff|
|发布上线	|git checkout release && git merge dev --no-ff|
|打 tag	|git tag -a v1.0.0 -m "message" && git push origin v1.0.0|
|紧急修复	|git checkout release && git checkout -b hotfix/xxx|
|查看当前分支	|git branch|
|查看 tag 列表	|git tag -l|