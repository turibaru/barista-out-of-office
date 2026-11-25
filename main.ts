// Runner for the barista out-of-office entry: it copies entry.txt into the
// grader's output directory. The line itself lives in entry.txt, never in
// this file, so editing the reply never means touching the code.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// entry.txt sits beside this script, so resolve it from the script's own
// location — the grader may launch node from any working directory.
const here = dirname(fileURLToPath(import.meta.url));
const entryPath = join(here, "entry.txt");

const raw = readFileSync(entryPath, "utf8");
const entry = raw.trim();

// Gate: a real reply is 1–280 characters; blank or over-long text fails.
if (entry.length === 0 || entry.length > 280) {
  console.error(`entry.txt invalid: ${entry.length} characters (need 1-280)`);
  process.exit(1);
}

// The grader points at its output folder through this environment variable.
const outDir = process.env.MAKEFUN_OUTPUT_DIR;
if (!outDir) {
  console.error("MAKEFUN_OUTPUT_DIR is not set");
  process.exit(1);
}

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), raw, "utf8");
