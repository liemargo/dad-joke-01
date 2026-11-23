// dad-joke-01: delivers a single dad joke for a make.fun contest.
// The gate reads <output>/entry.txt, so all this program does is place the
// joke there. The output directory comes from MAKEFUN_OUTPUT_DIR and falls
// back to /output, matching how the harness runs the entry.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const JOKE =
  "I burned all the burgers at the barbecue, but I told my kids not to worry — their dad was just raising the steaks.";

function deliver(): void {
  // An env var that is set but empty is treated as unset.
  const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "entry.txt"), JOKE + "\n", "utf8");
}

try {
  deliver();
} catch (err) {
  const reason = err instanceof Error ? err.message : String(err);
  console.error(`main.ts: could not write entry.txt: ${reason}`);
  process.exit(1);
}
