import { useState } from "react";
import "../styles/main.css";
import { CommandProcessor } from "./CommandSystem";
import { REPLHistory } from "./REPLHistory";
import { REPLInput } from "./REPLInput";

const commandProcessor = new CommandProcessor();
/* 
  You'll want to expand this component (and others) for the sprints! Remember 
  that you can pass "props" as function arguments. If you need to handle state 
  at a higher level, just move up the hooks and pass the state/setter as a prop.
  
  This is a great top level component for the REPL. It's a good idea to have organize all components in a component folder.
  You don't need to do that for this gearup.
*/
export type StateAction = string | JSX.Element;

export default function REPL() {
  // TODO: Add some kind of shared state that holds all the commands submitted.
  const [history, setHistory] = useState<StateAction[]>([]);

  const [outputMode, setOutputMode] = useState<"brief" | "verbose">("brief");

  // Function to process commands
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
