import * as fs from "node:fs";

const input = fs.readFileSync("./puzzleInput.txt", "utf-8");
const rows = input.split(/\n/);

// matrix[row][col]
const matrix = rows.map((row) => row.split(""));
