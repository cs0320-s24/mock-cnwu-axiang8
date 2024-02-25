// Adjusting the REPLFunction interface to return String or an array of String arrays
export interface REPLFunction {
  (args: Array<string>): String | String[][];
}

interface CommandRegistry {
  [commandName: string]: REPLFunction;
}

export class CommandProcessor {
  private commands: CommandRegistry = {};
  private outputMode: "brief" | "verbose" = "brief";
  private currentDataSet: any[] = [];

  registerCommand(name: string, func: REPLFunction) {
    this.commands[name] = func;
  }

  constructor() {
    // Register the load_file command
    //this.registerCommand("load_file", this.loadFile.bind(this));
    // Register the mode command
    this.registerCommand("mode", this.toggleModeCommand.bind(this));
  }
  /*
  private loadFile = (args: Array<string>): String => {
    const filePath = args.join(" ");
    if (mockedDataSets.hasOwnProperty(filePath)) {
      this.currentDataSet = mockedDataSets[filePath];
      return new String(`Dataset loaded from ${filePath}`);
    } else {
      return new String("File path does not exist.");
    }
  };
  */
  private toggleModeCommand = (args: Array<string>): String => {
    // Toggle mode without needing to specify 'brief' or 'verbose'
    if (args.length > 0) {
      // If there are arguments, return a message indicating the correct usage
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
      // Formatting the result based on the output mode
      const formattedResult =
        this.outputMode === "verbose"
          ? new String(`Command: ${input}\nOutput: ${result}`)
          : new String(result);
      return formattedResult;
    }

    return new String("Unknown command");
  }
}
