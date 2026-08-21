# Cloudflare Pages 部署

在 Cloudflare Pages 中连接 GitHub 仓库，配置：

- Build command: `pnpm install --frozen-lockfile && pnpm build`
- Build output directory: `dist`
- Node version: `20`
- Environment variable: `PUBLIC_SITE_URL=https://你的域名/`

本地发布流程：

```bash
pnpm new-post best-ai-writing-tools-2026
pnpm new-tool notion-ai
pnpm check && pnpm type-check && pnpm validate:content && pnpm build
git add .
git commit -m "content: add article"
git push
```
