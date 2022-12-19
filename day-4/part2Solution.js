import * as fs from "node:fs";

const input = fs.readFileSync("./puzzleInput.txt", "utf-8");
const groupByPairs = input.split("\n");
const separatePairs = groupByPairs.map((pair) => pair.split(","));

function splitMinAndMax(str) {
  return str.split("-");
}

// translate ranges into array pairs as [minVal, maxVal]
const pairedRanges = separatePairs.map((pair) => {
  return pair.map((range) => {
    const [min, max] = splitMinAndMax(range);

    // convert strings to numbers for range comparison
    return [Number(min), Number(max)];
  });
});

function isOverlapping(firstRange, secondRange) {
  const [min1, max1] = firstRange;
  const [min2, max2] = secondRange;

  const isOverLapping = (
    (min1 <= min2 && max1 >= min2)
    || (min2 <= min1 && max2 >= min1)
    );

  return isOverLapping;
}

const pairsAreOverlapping = pairedRanges.map((pair) => isOverlapping(...pair));

const numOverLapping = pairsAreOverlapping.reduce((sum, currVal) => {
  if (currVal === true) return sum + 1;
  return sum;
},
0);


console.log(numOverLapping);