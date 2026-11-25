// Make the AI Judge Laugh: Office Jokes — entry program.
// Writes a single original office joke to /output/entry.txt
// (or $MAKEFUN_OUTPUT_DIR/entry.txt for local testing).
// Node 22, standard library only, deterministic, no network.
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const line =
  "Our office has a meeting to plan the meeting, a follow-up to discuss the follow-up, and a calendar invite titled 'quick sync' that has eaten three careers.";

// Self-check: the entry must be exactly one line of 1-199 characters.
// Fail loudly instead of writing an invalid entry.
if (line.length < 1 || line.length > 199 || line.includes('\n')) {
  console.error(
    `invalid entry line: expected one line of 1-199 characters, got ${line.length} characters`,
  );
  process.exit(1);
}

// Second check: no leading/trailing whitespace, and the UTF-8 byte size
// must also fit the gate (a multi-byte character counts as more than one byte).
const bytes = Buffer.byteLength(line, 'utf8');
if (line !== line.trim() || bytes > 199) {
  console.error(
    `invalid entry line: whitespace or ${bytes} bytes over the 199-byte cap`,
  );
  process.exit(1);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, 'entry.txt'), line, 'utf8');
