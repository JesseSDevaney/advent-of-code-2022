import * as fs from "node:fs";

const input = fs.readFileSync("./puzzleInput.txt", "utf-8");
const grid = input.split(/\n/).map((row) => row.split(""));

console.log(grid);
