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

  registerCommand(name: string, func: REPLFunction) {
    this.commands[name] = func;
  }

  toggleOutputMode() {
    this.outputMode = this.outputMode === "brief" ? "verbose" : "brief";
    return new String(`Output mode set to ${this.outputMode}`);
  }

  processCommand(input: string): String {
    const [command, ...args] = input.split(" ");
    const func = this.commands[command];

    if (command === "mode" && args.length === 0) {
      return this.toggleOutputMode();
    } else if (func) {
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
