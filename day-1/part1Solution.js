import * as fs from "node:fs";

const input = fs.readFileSync("./puzzleInput.txt", "utf-8");

// separate each elf with their items into an array
const elfSeparator = /\n\n/;
const separateElvesArr = input.split(elfSeparator);

// find the calorie sum for each elf
const elfHasCalories = separateElvesArr.map((items) => {
  const calorieArr = items.split(/\n/);
  return calorieArr.reduce(
    (sum, currVal) => sum + Number(currVal),
    0
  );
});

// find the elf with the largest number of calories
const mostCalories = Math.max(...elfHasCalories);

console.log(mostCalories);