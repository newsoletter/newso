const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const sitemapPath = path.join(root, "sitemap.xml");
const original = fs.readFileSync(sitemapPath, "utf8");
if (!original.includes("</urlset>")) {
  throw new Error("sitemap.xml is missing </urlset>");
}

// Preserve every existing entry and only append URLs that are not present.
const existing = new Set(
  Array.from(original.matchAll(/<loc>\s*([^<]+?)\s*<\/loc>/g), (match) => match[1])
);
const additions = [];
for (const file of fs.readdirSync(path.join(root, "_posts")).sort()) {
  const match = /^(\d{4})-(\d{2})-(\d{2})-(\d+)\.html$/.exec(file);
  if (!match) continue;
  const [, year, month, day, id] = match;
  const url = `https://newso.co.kr/${year}/${month}/${day}/${id}.html`;
  if (existing.has(url)) continue;
  additions.push(`<url>\n  <loc>${url}</loc>\n</url>\n`);
  existing.add(url);
}

if (additions.length) {
  const newline = original.includes("\r\n") ? "\r\n" : "\n";
  const entries = additions.join("").replace(/\n/g, newline);
  fs.writeFileSync(sitemapPath, original.replace("</urlset>", entries + "</urlset>"));
}
console.log(`Added ${additions.length} post URLs to sitemap.xml.`);
