const MULTIPLY = "multiply";
const ADD = "add";
const SQUARE = "square";

const startingMonkeys = [
  {
    monkey: 0,
    numInspected: 0,
    items: [54, 61, 97, 63, 74],
    operation: [MULTIPLY, 7],
    test: {
      divisible: 17,
      true: 5,
      false: 3,
    },
  },
  {
    monkey: 1,
    numInspected: 0,
    items: [61, 70, 97, 64, 99, 83, 52, 87],
    operation: [ADD, 8],
    test: {
      divisible: 2,
      true: 7,
      false: 6,
    },
  },
  {
    monkey: 2,
    numInspected: 0,
    items: [60, 67, 80, 65],
    operation: [MULTIPLY, 13],
    test: {
      divisible: 5,
      true: 1,
      false: 6,
    },
  },
  {
    monkey: 3,
    numInspected: 0,
    items: [61, 70, 76, 69, 82, 56],
    operation: [ADD, 7],
    test: {
      divisible: 3,
      true: 5,
      false: 2,
    },
  },
  {
    monkey: 4,
    numInspected: 0,
    items: [79, 98],
    operation: [ADD, 2],
    test: {
      divisible: 7,
      true: 0,
      false: 3,
    },
  },
  {
    monkey: 5,
    numInspected: 0,
    items: [72, 79, 55],
    operation: [ADD, 1],
    test: {
      divisible: 13,
      true: 2,
      false: 1,
    },
  },
  {
    monkey: 6,
    numInspected: 0,
    items: [63],
    operation: [ADD, 4],
    test: {
      divisible: 19,
      true: 7,
      false: 4,
    },
  },
  {
    monkey: 7,
    numInspected: 0,
    items: [72, 51, 93, 63, 80, 86, 81],
    operation: [SQUARE],
    test: {
      divisible: 11,
      true: 0,
      false: 4,
    },
  },
];

export { ADD, MULTIPLY, SQUARE, startingMonkeys };
