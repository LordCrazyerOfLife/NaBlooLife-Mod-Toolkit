#!/usr/bin/env node
// Make a new mod from a template.
//   node tools/new-mod.mjs                                (lists the templates)
//   node tools/new-mod.mjs tabbed-menu cool-menu "Cool Menu"
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const templates = readdirSync(join(root, "templates")).filter((f) => f.endsWith(".js")).sort();
const short = (f) => f.replace(/^\d+-/, "").replace(/\.js$/, "");
const [kind, id, title] = process.argv.slice(2);
const fail = (msg) => (console.error(msg), process.exit(1));

if (!kind) {
  console.log('Usage: node tools/new-mod.mjs <template> <mod-id> ["Display Name"]\n\nTemplates:');
  templates.forEach((f) => console.log("  " + short(f)));
  process.exit(0);
}
const file = templates.find((f) => short(f) === kind) || fail(`No template called "${kind}".`);
if (!/^[a-z][a-z0-9-]{1,39}$/.test(id || "")) fail("The mod id needs 2-40 characters: a-z, 0-9 and dashes, starting with a letter.");
const name = title || id.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
if (/["\\`$<>]/.test(name)) fail('The display name cannot contain " \\ ` $ < or >.');

const key = "mod" + id.replace(/(^|-)(\w)/g, (_, __, c) => c.toUpperCase());
let code = readFileSync(join(root, "templates", file), "utf8")
  .replace(/const ID = "[^"]*";/, `const ID = "${id}";`)
  .replace(/const TITLE = "[^"]*";/, `const TITLE = "${name}";`)
  .replace(/const NAME = "[^"]*";/, `const NAME = "${name}";`)
  .replace(/const KEY = "[^"]*";/, `const KEY = "${key}";`);

const out = join(root, "my-mods", `${id}.js`);
if (existsSync(out)) fail(`${out} already exists. Nothing was changed.`);
mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, code);
console.log(`Created my-mods/${id}.js\nNext: node tools/check-mod.mjs my-mods/${id}.js`);
