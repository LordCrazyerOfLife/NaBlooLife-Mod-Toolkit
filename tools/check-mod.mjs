#!/usr/bin/env node
// Looks for common problems in a mod file. It reads the file; it never runs it.
//   node tools/check-mod.mjs my-mods/cool-menu.js
// A pass does NOT mean a mod is safe or bug free.
import { readFileSync } from "node:fs";
import { spawnSync } from "node:child_process";

const files = process.argv.slice(2);
if (!files.length) (console.log("Usage: node tools/check-mod.mjs <file.js> ..."), process.exit(1));

let failed = false;
for (const file of files) {
  console.log(`\n${file}`);
  const say = (level, msg) => {
    console.log(`  ${level.padEnd(5)} ${msg}`);
    if (level === "ERROR") failed = true;
  };
  let code;
  try {
    code = readFileSync(file, "utf8");
  } catch {
    say("ERROR", "cannot read the file");
    continue;
  }
  const syntax = spawnSync(process.execPath, ["--check", file], { encoding: "utf8" });
  if (syntax.status !== 0) {
    say("ERROR", "syntax error:\n" + syntax.stderr.split("\n").slice(0, 5).join("\n"));
    continue;
  }
  say("ok", "syntax");
  const bare = code.replace(/\/\*[\s\S]*?\*\/|^\s*\/\/.*$/gm, "");
  const has = (re) => re.test(bare);
  if (has(/MOD_SOURCES\s*\.\s*register/)) say("ok", "registers an on/off switch");
  else say("WARN", "no MOD_SOURCES.register(): switching off relies on the automatic switch");
  if (!has(/\boff\s*(\(\s*\)\s*\{|:\s*(function|\())|function off\b/)) say("WARN", "no off() found");
  if (!/^\s*(\/\*[\s\S]*?\*\/\s*|\/\/.*\n\s*)*[;(!]/.test(code)) say("WARN", "not wrapped in (() => { ... })(); its names may clash with the game");
  if (has(/^\s*(import|export)\s/m)) say("ERROR", "import/export do not work: a mod is one plain script");
  if (has(/window\.(state|EVENTS|CHEV|BACK_ICON)\b/)) say("ERROR", "state, EVENTS, CHEV and BACK_ICON are not on window: use the bare name");
  if (has(/document\.write\b/)) say("ERROR", "document.write can wipe the page");
  if (has(/Math\.random\s*=/)) say("ERROR", "replacing Math.random breaks the whole game");
  if (has(/innerHTML\s*\+=/)) say("WARN", "innerHTML += rebuilds the list and drops other mods' tap handlers");
  if (has(/localStorage\.clear|indexedDB\.deleteDatabase/)) say("WARN", "deletes saved games");
  if (has(/\beval\s*\(|new Function\b/)) say("WARN", "runs text as code");
  if (has(/\bfetch\s*\(|XMLHttpRequest|WebSocket|sendBeacon|https?:\/\//)) say("WARN", "talks to or names a web address: check what is sent");
  if (has(/setInterval\s*\(/) && !has(/clearInterval\s*\(/)) say("WARN", "starts a repeating timer and never clears it");
  const added = (bare.match(/(window|document)\.addEventListener\s*\(/g) || []).length;
  if (added && !has(/removeEventListener\s*\(/)) say("WARN", "adds page-wide listeners and never removes them");
}
process.exit(failed ? 1 : 0);
