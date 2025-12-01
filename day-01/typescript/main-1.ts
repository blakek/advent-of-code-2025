import * as AOC from "@/aoc";

AOC.setExampleInput(`
    L68
    L30
    R48
    L5
    R60
    L55
    L1
    L99
    R14
    L82
`);

const instructionPattern = /^(L|R)(\d+)$/;

function parseInstruction(line: string): number {
  const match = line.match(instructionPattern);

  if (!match) {
    throw new Error(`Invalid instruction: ${line}`);
  }

  const [, direction, distanceStr] = match;

  if (!(direction === "L" || direction === "R")) {
    throw new Error(`Invalid direction in instruction: ${line}`);
  }

  if (!distanceStr) {
    throw new Error(`Missing distance in instruction: ${line}`);
  }

  const distance = parseInt(distanceStr, 10);

  if (isNaN(distance)) {
    throw new Error(`Invalid distance in instruction: ${line}`);
  }

  return direction === "L" ? -distance : distance;
}

/**
 * "Turns" the dial the given direction and returns the new state. Keeps the state between 0 and 99 inclusive.
 */
function turn(state: number, amount: number): number {
  // Reduce to within -99 to 99
  const distance = amount % 100;
  state += distance;

  // Wrap around
  if (state < 0) {
    state += 100;
  } else if (state >= 100) {
    state -= 100;
  }

  return state;
}

// Current number
let state = 50;
let timesVisited0 = 0;

const input = await AOC.readInputLines(1);

for (const line of input) {
  const instruction = parseInstruction(line);
  state = turn(state, instruction);

  if (state === 0) {
    timesVisited0++;
  }
}

console.log(`Result: ${timesVisited0}`);
