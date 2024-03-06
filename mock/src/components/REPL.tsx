import { useState } from "react";
import "../styles/main.css";
import { CommandProcessor } from "./CommandSystem";
import { REPLHistory } from "./REPLHistory";
import { REPLInput } from "./REPLInput";

const commandProcessor = new CommandProcessor();

//sometimes our function will return a string, sometimes it will return JSX.Element when returning an HTML table
export type StateAction = string | JSX.Element;

export default function REPL() {
  const [history, setHistory] = useState<StateAction[]>([]);

  const [outputMode, setOutputMode] = useState<"brief" | "verbose">("brief");

  /*Function to process commands*/
  const processCommand = (commandString: string) => {
    const output = commandProcessor.processCommand(commandString);
    setHistory((prevHistory) => [...prevHistory, output as StateAction]);
  };

  return (
    <div className="repl">
      {/*This is where your REPLHistory might go... You also may choose to add it within your REPLInput 
      component or somewhere else depending on your component organization. What are the pros and cons of each? */}
      {/* TODO: Update your REPLHistory and REPLInput to take in new shared state as props */}
      <REPLHistory history={history} />
      <hr></hr>

      {/*<REPLInput history={history} setHistory={setHistory} />*/}
      <REPLInput processCommand={processCommand} />
    </div>
  );
}
