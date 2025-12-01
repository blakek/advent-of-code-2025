import { unindent } from "@blakek/scratchpad";
import * as Bun from "bun";
import * as path from "path";

type PuzzleDay =
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18
  | 19
  | 20
  | 21
  | 22
  | 23
  | 24
  | 25;

const mutableState = {
  exampleInput: "",
};

const args = new Set(process.argv.slice(2));

const projectRoot = path.resolve(__dirname, "../..");

export function getDayPath(day: PuzzleDay): string {
  const folderName = `day-${day.toString().padStart(2, "0")}`;
  return path.resolve(projectRoot, folderName);
}

export function getInputPath(day: PuzzleDay): string {
  const dayPath = getDayPath(day);
  return path.resolve(dayPath, "input.txt");
}

export interface SplitLinesOptions {
  trim?: boolean;
}

export function splitLines(
  input: string,
  options: SplitLinesOptions = {}
): string[] {
  const { trim = true } = options;

  const trimmedInput = trim ? input.trim() : input;
  return trimmedInput.split("\n");
}

export interface SplitColumnsOptions<T> extends SplitLinesOptions {
  coerce?: (value: string) => T;
  separator?: string | RegExp;
}

export function splitIntoColumns<T = string>(
  input: string,
  options: SplitColumnsOptions<T> = {}
): T[][] {
  const {
    coerce = (i) => i as T,
    separator = /\s+/,
    ...splitLinesOptions
  } = options;

  const columns = splitLines(input, splitLinesOptions).map((line) =>
    line.split(separator)
  );

  // Transpose the columns so that we get the values grouped by column
  return columns.reduce<T[][]>((acc, column) => {
    column.forEach((value, i) => {
      if (!acc[i]) {
        acc[i] = [];
      }

      acc[i].push(coerce(value));
    });

    return acc;
  }, []);
}

export function splitIntoRows<T = string>(
  input: string,
  options: SplitColumnsOptions<T> = {}
): T[][] {
  const {
    coerce = (i) => i as T,
    separator = /\s+/,
    ...splitLinesOptions
  } = options;

  const columns = splitLines(input, splitLinesOptions).map((line) =>
    line.split(separator)
  );

  return columns.map((column) => column.map(coerce));
}

export async function readInput(day: PuzzleDay): Promise<Blob> {
  const shouldUseExample = args.has("--example") || args.has("-e");

  if (shouldUseExample) {
    if (!mutableState.exampleInput) {
      throw new Error("No example input has been set");
    }

    return new Blob([mutableState.exampleInput], {
      type: "text/plain",
    });
  }

  const inputPath = getInputPath(day);
  return Bun.file(inputPath);
}

export async function readInputText(day: PuzzleDay): Promise<string> {
  const input = await readInput(day);
  return input.text();
}

export async function readInputLines(day: PuzzleDay): Promise<string[]> {
  const inputText = await readInputText(day);
  return splitLines(inputText);
}

export function setExampleInput(input: string, shouldUnindent = true): void {
  mutableState.exampleInput = shouldUnindent ? unindent(input) : input;
}
