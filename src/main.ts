/**
 * Graphical Text Renderer
 * Takes an input string and outputs a special graphical version of it.
 */
import * as fs from "fs";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { processText } from "./formatter";
import { TileStyle } from "./tilestyle";
import { displaySvg, linesToSvg } from "./svg/svg_render";

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
    description: "Rendering style (default: bowtie)",
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
    description: "First tile is hourglass (⧗), as opposed to bowtie (⧓, default)",
  })
  .option("svg", {
    alias: "s",
    type: "boolean",
    default: false,
    description: "Render as SVG and open in browser",
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

const wantSvg = (argv as { svg?: boolean }).svg === true;
if (wantSvg && output) {
  const lines = output.split("\n");
  const initTileFlipped = !argv.init_tile_flipped;
  const style = argv.style as TileStyle;
  const svg = linesToSvg(lines, initTileFlipped, style);
  displaySvg(svg);
}
