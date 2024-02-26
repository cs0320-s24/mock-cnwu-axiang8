import { mockedDataSets } from "../data/mockedJson";

export interface REPLFunction {
  (args: Array<string>): String | String[] | String[][];
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

  private view = (args: Array<string>): String[][] | String => {
    if (mockedDataSets.hasOwnProperty(this.currentFile)) {
      this.currentDataSet = mockedDataSets[this.currentFile];
      return JSON.stringify(this.currentDataSet, null, 2);
    } else {
      return "Error viewing data set.";
    }
  };

  private search = (args: Array<string>): String[] | String[][] | String => {
    if (this.currentDataSet.length === 0) {
      return "No dataset loaded. Use 'load_file' command to load a dataset.";
    }
    const column = args[0];
    const value = args.slice(1).join(" ");

    // Check if the column exists in the dataset
    const columnIndex = this.currentDataSet[0].indexOf(column);
    if (columnIndex === -1) {
      return [`Column '${column}' does not exist in the dataset.`];
    }

    const matchingRows = this.currentDataSet
      .filter((row, index) => index !== 0 && row[columnIndex].includes(value))
      .map((row) => (Array.isArray(row) ? row : [row])); // Ensure each row is an array

    return matchingRows.length > 0
      ? matchingRows
      : [["No matching rows found."]];
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

  processCommand(input: string): String {
    const [command, ...args] = input.split(" ");
    const func = this.commands[command];

    if (func) {
      const result = func(args);
      const formattedResult =
        this.outputMode === "verbose"
          ? new String(`Command: ${input}\nOutput: ${result}`)
          : new String(result);
      return formattedResult;
    }

    return new String("Unknown command");
  }
}
