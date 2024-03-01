import { mockedDataSets } from "../data/mockedJson";

/**
 * Defines the interface for functions that can be executed in the REPL (Read-Eval-Print Loop).
 * These functions take an array of strings as arguments and return a string or a JSX.Element.
 */
export interface REPLFunction {
  (args: Array<string>): String | JSX.Element;
}

/**
 * Helper function to convert a 2D array of strings (representing tabular data) into an HTML table.
 * This is useful for displaying data in a structured format in the UI.
 *
 * @param data - A 2D array where each inner array represents a row of data.
 * @return A JSX.Element representing the rendered HTML table.
 */
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

/**
 * Maps command names to their corresponding functions. This enables a flexible and extensible
 * way to add or modify commands without altering the core logic of command processing.
 */
interface CommandRegistry {
  [commandName: string]: REPLFunction;
}

/**
 * Processes commands inputted by the user, facilitating interaction with datasets and the application.
 * Supports loading files, viewing data, searching within datasets, and toggling output modes.
 */
export class CommandProcessor {
  private commands: CommandRegistry = {};
  private outputMode: "brief" | "verbose" = "brief";
  private currentFile = "";
  private currentDataSet: string[][] | string[] = [];

  /**
   * Registers a new command in the command registry.
   *
   * @param name - The name of the command.
   * @param func - The function to execute when the command is called.
   */
  registerCommand(name: string, func: REPLFunction) {
    this.commands[name] = func;
  }

  /**
   * Initializes the command processor and registers default commands.
   */
  constructor() {
    this.registerCommand("load_file", this.loadFile.bind(this));
    this.registerCommand("mode", this.mode.bind(this));
    this.registerCommand("view", this.view.bind(this));
    this.registerCommand("search", this.search.bind(this));
  }

  /**
   * Loads a dataset from the specified file path.
   *
   * @param args - Array containing the file path as its elements.
   * @return A string indicating whether the dataset was successfully loaded or not.
   */
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

  /**
   * Displays the currently loaded dataset in a tabular format.
   *
   * @param args - Unused parameter, included to match the REPLFunction interface.
   * @return A JSX.Element representing the data table or a message indicating no dataset is loaded.
   */
  private view = (args: Array<string>): String | JSX.Element => {
    if (mockedDataSets.hasOwnProperty(this.currentFile)) {
      this.currentDataSet = mockedDataSets[this.currentFile];
      return (
        <div className="view" aria-label="view">
          {renderTable(this.currentDataSet)}
        </div>
      );
    } else {
      return (
        <p>No dataset loaded. Use 'load_file' command to load a dataset.</p>
      );
    }
  };

  /**
   * Searches for records in the loaded dataset that match the criteria specified by the user.
   *
   * @param args - The first element is the column to search in, followed by the search query.
   * @return A JSX.Element displaying the matching records or a message if no matches are found.
   */
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

    if (matchingRows.length === 0) {
      return (
        <p>
          No records found matching '{value}' in column '{column}'.
        </p>
      );
    }
    // Call renderTable to generate HTML table
    return (
      <div className="search" aria-label="search">
        {renderTable(matchingRows)}
      </div>
    );
  };

  /**
   * Toggles the output mode between brief and verbose. In verbose mode, additional information
   * about the command executed and its output is displayed.
   *
   * @param args - Unused parameter, included to match the REPLFunction interface.
   * @return A string indicating the new output mode.
   */
  private mode = (args: Array<string>): String => {
    if (args.length > 0) {
      return new String(
        "Usage: 'mode' to toggle between brief and verbose output."
      );
    }
    this.outputMode = this.outputMode === "brief" ? "verbose" : "brief";
    return new String(`Mode set to ${this.outputMode}`);
  };

  /**
   * Processes an input command by looking it up in the registry and executing the associated function.
   *
   * @param input - The command input string from the user.
   * @return The result of executing the command, which can be a string or JSX.Element.
   */
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
