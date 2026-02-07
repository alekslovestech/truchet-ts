/**
 * Graphical Text Renderer
 * Takes an input string and outputs a special graphical version of it.
 * (SVG output excluded.)
 */
import * as fs from "fs";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { processText } from "./formatter";
import { TileStyle } from "./tilestyle";

const argv = yargs(hideBin(process.argv))
  .option("word", {
    alias: "w",
    type: "string",
    description: "Text to render (if omitted, read from stdin)",
  })
  .option("style", {
    alias: "t",
    type: "string",
    choices: Object.values(TileStyle) as string[],
    default: "bowtie",
    description: "Rendering style",
  })
  .option("inverted", {
    alias: "i",
    type: "boolean",
    default: false,
    description: "Use inverted (empty-space) style",
  })
  .option("init_tile_flipped", {
    alias: "f",
    type: "boolean",
    default: false,
    description: "First tile is hourglass (⧗) as opposed to bowtie (⧓)",
  })
  .parseSync();

const userInput =
  argv.word ?? fs.readFileSync(0, "utf-8").trim();

const output = processText(userInput, argv.inverted);

if (argv.word == null) {
  console.log("Output:");
}
if (argv.inverted) {
  console.log(output);
} else {
  console.log("\n" + output + "\n");
}
