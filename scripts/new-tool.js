import fs from "node:fs";
import path from "node:path";

const slug = process.argv[2];
if (!slug || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
	console.error("Usage: pnpm new-tool <ascii-slug>");
	process.exit(1);
}

const filename = path.join("src", "content", "tools", `${slug}.md`);
if (fs.existsSync(filename)) {
	console.error(`Tool already exists: ${filename}`);
	process.exit(1);
}

fs.mkdirSync(path.dirname(filename), { recursive: true });
fs.writeFileSync(
	filename,
	`---
name: ${slug}
description: "一句话说明工具解决的问题，至少写清楚适用场景"
logo: ""
category: AI 工具
tags: []
platforms: [Web]
free: false
pricing: "请以官网为准"
officialUrl: https://example.com/
lastTested: ${new Date().toISOString().slice(0, 10)}
version: "持续更新"
rating: 4
limitations: ""
featured: false
relatedPosts: []
---

## 核心功能

## 适合谁

## 使用建议
`,
);
console.log(`Tool created: ${filename}`);
