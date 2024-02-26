import "../styles/main.css";
import { StateAction } from './REPL';

interface REPLHistoryProps {
  // TODO: Fill with some shared state tracking all the pushed commands
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
