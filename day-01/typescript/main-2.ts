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

function countZeroHits(current: number, change: number): number {
  const absoluteChange = Math.abs(change);

  if (absoluteChange === 0) {
    return 0;
  }

  const remainder = change > 0 ? (100 - current) % 100 : current % 100;
  const firstHit = remainder === 0 ? 100 : remainder;

  return 1 + Math.floor((absoluteChange - firstHit) / 100);
}

/**
 * "Turns" the dial the given direction and returns the new state. Keeps the state between 0 and 99 inclusive.
 */
function turn(currentState: number, amount: number): number {
  // Reduce to within -99 to 99
  const distance = amount % 100;

  // Wrap around using modulo to keep between 0 and 99
  return (currentState + distance + 100) % 100;
}

// Current number
let state = 50;
let timesVisited0 = 0;

const input = await AOC.readInputLines(1);

for (const line of input) {
  const instruction = parseInstruction(line);
  timesVisited0 += countZeroHits(state, instruction);
  state = turn(state, instruction);
}

console.log(`Result: ${timesVisited0}`);
