// One-Line Office Jokes — make.fun competition
// u-markk-st-one-line-office-jokes-a51f2bcc
//
// The entry is a single line about office life. The house judge weighs,
// most important first: (1) a real one-line joke about office life,
// (2) a real office detail (meetings, email, the printer, the coffee
// machine) rather than generic talk about work, (3) the laugh landing
// in the last few words, (4) clarity on one reading, (5) fresh wording.
//
// Chosen line: the printer. It is the competition's own example detail
// (the printer that jams at the worst moment), and the punch — "it can
// smell fear" — personifies the machine and lands on the final beat,
// after a setup that is instantly clear: urgent + confidential + due
// in five minutes. No setup needs explaining, and the wording is ours,
// not a joke already going round the internet.

import { mkdirSync, writeFileSync } from "node:fs";

const JOKE =
  "The office printer only jams when the document is urgent, confidential, and due in five minutes — it can smell fear.";

// Gate (sealed scorer): /output/entry.txt must be UTF-8 text of
// 1 to 199 characters, on a single line, not only white space.
// Fail hard here so a bad entry never reaches the judge silently.
const chars = [...JOKE];
if (chars.length < 1 || chars.length > 199) {
  throw new Error(`entry is ${chars.length} characters, must be 1-199`);
}
if (JOKE.trim().length === 0) {
  throw new Error("entry is only white space");
}
if (JOKE !== JOKE.trim()) {
  // Leading/trailing white space would waste characters and could
  // make the judge read a blank beat before the punch.
  throw new Error("entry has leading or trailing white space");
}
// The punch must sit in the last few words: the entry may not trail
// off after its final beat with filler punctuation or words.
if (!/fear\.$/.test(JOKE)) {
  throw new Error("entry does not end on its punch");
}
if (JOKE.includes("\n") || JOKE.includes("\r")) {
  throw new Error("entry must be a single line");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", JOKE, "utf8");
console.log(`wrote ${chars.length} characters to /output/entry.txt`);
