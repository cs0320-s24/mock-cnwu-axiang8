import "../styles/main.css";
import { StateAction } from "./REPL";

/**
 * In the REPLHistory component, there is an interface that contains a
 * StateAction array (StateAction being a export type that can either be a String or JSX.Element),
 *  and goes through all the StateAction outputs (what the functions have returned) in the array and returns them.
 */

interface REPLHistoryProps {
  history: StateAction[];
}
export function REPLHistory(props: REPLHistoryProps) {
  return (
    <div className="repl-history">
      {/* This is where command history will go */}
      {/* TODO: To go through all the pushed commands... try the .map() function! */}
      {props.history.map((command, index) => (
        <p>{command}</p>
      ))}
    </div>
  );
}
