import "../styles/main.css";
import { Dispatch, SetStateAction, useState } from "react";
import { ControlledInput } from "./ControlledInput";

/**
 *  There is an interface called REPLInputProps that takes in a function that represents the command,
 *  and is passed into export function REPLInput. REPLInput manages the logic for commands being inputted into the command box,
 *  and calls the function in REPLInputProps that is passed in from the prop.
 */
interface REPLInputProps {
  processCommand: (commandString: string) => void;
}

/*takes in a command and when Submit is clicked, calls on the command that is entered*/
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
