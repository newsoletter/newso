const fs = require("fs");
const path = require("path");

// Keep aliases outside _posts so they do not appear in archives or search.
const root = path.resolve(__dirname, "..");
const posts = fs.readdirSync(path.join(root, "_posts")).sort();
const byDate = new Map();

for (const file of posts) {
  const match = /^(\d{4}-\d{2}-\d{2})-(\d+)\.html$/.exec(file);
  if (!match) continue;
  const date = match[1];
  if (byDate.has(date)) {
    throw new Error(`Multiple posts for ${date}: ${byDate.get(date)}, ${file}`);
  }
  byDate.set(date, file);
}

const destination = path.join(root, "redirects");
fs.mkdirSync(destination, { recursive: true });
for (const [date, file] of byDate) {
  const content = `---
layout: redirect
permalink: /${date}.html
redirect_post: ${file.replace(/\.html$/, "")}
sitemap: false
---
`;
  fs.writeFileSync(path.join(destination, `${date}.html`), content);
  fs.writeFileSync(
    path.join(destination, `${date}-pretty.html`),
    content.replace(`permalink: /${date}.html`, `permalink: /${date.replace(/-/g, "/")}/`)
  );
}
console.log(`Generated ${byDate.size * 2} redirects for ${byDate.size} dates.`);
