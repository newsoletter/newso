const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const sitemapPath = path.join(root, "sitemap.xml");
const original = fs.readFileSync(sitemapPath, "utf8");
const dateParts = new Intl.DateTimeFormat("en-US", {
  timeZone: "Asia/Seoul",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
}).formatToParts(new Date());
const part = (type) => dateParts.find((item) => item.type === type).value;
const lastmod = `${part("year")}-${part("month")}-${part("day")}`;
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

const newline = original.includes("\r\n") ? "\r\n" : "\n";
const entries = additions.join("").replace(/\n/g, newline);
const updated = original.replace("</urlset>", entries + "</urlset>")
  .replace(/<url>[\s\S]*?<\/url>/g, (entry) => {
    if (/<lastmod>[\s\S]*?<\/lastmod>/.test(entry)) {
      return entry.replace(/<lastmod>[\s\S]*?<\/lastmod>/g, `<lastmod>${lastmod}</lastmod>`);
    }
    return entry.replace(/<\/loc>/, `</loc>${newline}  <lastmod>${lastmod}</lastmod>`);
  });
if (updated !== original) {
  fs.writeFileSync(sitemapPath, updated);
}
console.log(`Added ${additions.length} post URLs; updated all lastmod dates to ${lastmod} (Asia/Seoul).`);
