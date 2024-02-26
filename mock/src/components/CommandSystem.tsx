import { mockedDataSets } from "../data/mockedJson";

export interface REPLFunction {
  (args: Array<string>): String | JSX.Element;
}

export function renderTable(data: string[][]) {
  return (
    <table>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((cell, cellIndex) => (
              <td key={cellIndex}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

interface CommandRegistry {
  [commandName: string]: REPLFunction;
}

export class CommandProcessor {
  private commands: CommandRegistry = {};
  private outputMode: "brief" | "verbose" = "brief";
  private currentFile = "";
  private currentDataSet: string[][] | string[] = [];

  registerCommand(name: string, func: REPLFunction) {
    this.commands[name] = func;
  }

  constructor() {
    this.registerCommand("load_file", this.loadFile.bind(this));
    this.registerCommand("mode", this.toggleModeCommand.bind(this));
    this.registerCommand("view", this.view.bind(this));
    this.registerCommand("search", this.search.bind(this));
  }

  private loadFile = (args: Array<string>): String => {
    const filePath = args.join(" ");
    if (mockedDataSets.hasOwnProperty(filePath)) {
      this.currentFile = filePath;
      this.currentDataSet = mockedDataSets[filePath];
      return new String(`Dataset loaded from ${filePath}`);
    } else {
      return new String("File path does not exist.");
    }
  };

  private view = (args: Array<string>): String | JSX.Element => {
    if (mockedDataSets.hasOwnProperty(this.currentFile)) {
      this.currentDataSet = mockedDataSets[this.currentFile];
      return (
        <div className="view" aria-label="view">
          {renderTable(this.currentDataSet)}
        </div>
      );
    } else {
      return <p>Error viewing data set.</p>;
    }
  };

  private search = (args: Array<string>): String | JSX.Element => {
    if (this.currentDataSet.length === 0) {
      return (
        <p>No dataset loaded. Use 'load_file' command to load a dataset.</p>
      );
    }
    const column = args[0];
    const value = args.slice(1).join(" ");

    // Check if the column exists in the dataset
    const columnIndex = this.currentDataSet[0].indexOf(column);
    if (columnIndex === -1) {
      return <p>Column '${column}' does not exist in the dataset.</p>;
    }

    const matchingRows = this.currentDataSet
      .filter((row, index) => index !== 0 && row[columnIndex].includes(value))
      .map((row) => (Array.isArray(row) ? row : [row])); // Ensure each row is an array

    // Call renderTable to generate HTML table
    return (
      <div className="search" aria-label="search">
        {renderTable(matchingRows)}
      </div>
    );
  };

  private toggleModeCommand = (args: Array<string>): String => {
    if (args.length > 0) {
      return new String(
        "Usage: 'mode' to toggle between brief and verbose output."
      );
    }
    this.outputMode = this.outputMode === "brief" ? "verbose" : "brief";
    return new String(`Output mode set to ${this.outputMode}`);
  };

  processCommand(input: string): String | JSX.Element {
    const [command, ...args] = input.split(" ");
    const func = this.commands[command];

    if (func) {
      const result = func(args);
      const formattedResult =
        this.outputMode === "verbose" ? (
          <div>
            <p>Command: {input}</p>
            <p>Output: {result}</p>
          </div>
        ) : (
          result
        );
      return formattedResult;
    }

    return new String("Unknown command");
  }
}
