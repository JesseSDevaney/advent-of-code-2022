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
// const mostCalories = Math.max(...elfHasCalories);

function sortedIndex(array, value) {
  let low = 0;
  let high = array.length;

  while (low < high) {
      const mid = (low + high) >>> 1;
      if (array[mid] < value) low = mid + 1;
      else high = mid;
  }
  return low;
}

// top three elf's total calories sorted from smallest to largest
const topThreeElves = Array(3).fill(0);

elfHasCalories.forEach((calories) => {
  if(calories <= topThreeElves[0]) return;

  // insert element in the new top three
  const insertIndex = sortedIndex(topThreeElves, calories);
  topThreeElves.splice(insertIndex, 0, calories);

  // remove smallest element
  topThreeElves.shift();
});

console.log(topThreeElves);

const topThreeTotal = topThreeElves.reduce((sum, val) => sum + val);
console.log(topThreeTotal);