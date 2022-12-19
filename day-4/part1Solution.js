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

function isFullyContained(firstRange, secondRange) {
  const [min1, max1] = firstRange;
  const [min2, max2] = secondRange;

  const firstRangeFullyContainsSecondRange = min1 <= min2 && max1 >= max2;
  const secondRangeFullyContainsFirstRange = min2 <= min1 && max2 >= max1;

  if (firstRangeFullyContainsSecondRange) return true;
  if (secondRangeFullyContainsFirstRange) return true;

  return false;
}

const pairsAreFullyContained = pairedRanges.map((pair) => {
  return isFullyContained(...pair);
});

const numFullyContained = pairsAreFullyContained.reduce((sum, currVal) => {
  if (currVal === true) return sum + 1;
  return sum;
},
0);


console.log(numFullyContained);