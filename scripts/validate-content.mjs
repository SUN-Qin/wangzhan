import fs from "node:fs";
import path from "node:path";

const roots = ["src/content/posts", "src/content/tools"];
const errors = [];
const slugs = new Set();

const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const urlPattern = /^https?:\/\/[^\s]+$/;

function filesIn(directory) {
  if (!fs.existsSync(directory)) return [];
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) return filesIn(fullPath);
    return entry.name.endsWith(".md") ? [fullPath] : [];
  });
}

function frontmatterValue(frontmatter, field) {
  const value = frontmatter.match(new RegExp(`^${field}:\\s*(.+)$`, "m"))?.[1]?.trim() || "";
  return value.replace(/^("|')|("|')$/g, "").trim();
}

for (const root of roots) {
  const kind = path.basename(root);
  for (const filename of filesIn(root)) {
    if (path.basename(filename).startsWith("_")) continue;
    const relative = path.relative(root, filename).replaceAll("\\", "/");
    const slug = kind === "posts"
      ? relative.replace(/\/index\.md$/, "").replace(/\.md$/, "")
      : relative.replace(/\.md$/, "");
    if (slug.split("/").some((part) => !slugPattern.test(part))) errors.push(`${filename}: slug 必须使用小写 ASCII 字符和短横线`);
    if (slugs.has(`${kind}/${slug}`)) errors.push(`重复 slug: ${kind}/${slug}`);
    slugs.add(`${kind}/${slug}`);
    const text = fs.readFileSync(filename, "utf8");
    const frontmatter = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);
    if (!frontmatter) { errors.push(`${filename}: 缺少 frontmatter`); continue; }
    const required = kind === "posts" ? ["title", "published", "description", "category"] : ["name", "description", "category", "officialUrl"];
    for (const field of required) if (!frontmatterValue(frontmatter[1], field)) errors.push(`${filename}: 缺少 ${field}`);
    const description = frontmatterValue(frontmatter[1], "description");
    if (description.length < 10) errors.push(`${filename}: description 至少 10 个字符`);
    if (kind === "tools") {
      const officialUrl = frontmatterValue(frontmatter[1], "officialUrl");
      if (!urlPattern.test(officialUrl)) errors.push(`${filename}: officialUrl 必须是 http(s) URL`);
      const downloadUrl = frontmatterValue(frontmatter[1], "downloadUrl");
      if (downloadUrl && !urlPattern.test(downloadUrl)) errors.push(`${filename}: downloadUrl 必须是 http(s) URL`);
      const rating = frontmatterValue(frontmatter[1], "rating");
      if (rating && (Number(rating) < 1 || Number(rating) > 5)) errors.push(`${filename}: rating 必须在 1-5 之间`);
    }
  }
}
if (errors.length) { console.error(errors.join("\n")); process.exit(1); }
console.log("Content validation passed.");
