export function getIndentationLevel(lines: string[]) {
  return lines.reduce((leastIndentation, line) => {
    const indentation = line.search(/\S/);

    // Empty line
    if (indentation === -1) {
      return leastIndentation;
    }

    return Math.min(leastIndentation, indentation);
  }, Infinity);
}

/**
 * Removes indentation for all lines in a string to the least indented line.
 */
export function unindent(string: string) {
  const lines = string.split("\n");

  const indentationLevel = getIndentationLevel(lines);

  // All lines are empty
  if (indentationLevel === Infinity) {
    return "";
  }

  // Remove starting and trailing empty lines
  if (lines[0].trim() === "") {
    lines.shift();
  }

  const lastLine = lines[lines.length - 1];
  if (lastLine.trim() === "") {
    lines.pop();
  }

  // Remove indentation
  return lines.map((line) => line.slice(indentationLevel)).join("\n");
}
