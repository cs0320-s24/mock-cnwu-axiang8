import "../styles/main.css";
import { Dispatch, SetStateAction, useState } from "react";
import { ControlledInput } from "./ControlledInput";

interface REPLInputProps {
  processCommand: (commandString: string) => void;
}
export function REPLInput({ processCommand }: REPLInputProps) {
  const [commandString, setCommandString] = useState<string>("");
  const handleSubmit = () => {
    processCommand(commandString);
    setCommandString(""); // Clear input after submission
  };
  return (
    <div className="repl-input">
      <fieldset>
        <legend>Enter a command:</legend>
        <ControlledInput
          value={commandString}
          setValue={setCommandString}
          ariaLabel={"Command input"}
        />
        <button onClick={handleSubmit}>Submit</button>
      </fieldset>
    </div>
  );
}
