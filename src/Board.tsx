import * as React from "react";
import { Cell } from "./cellclass";
import { Game } from "./gameclass";

export interface CellProps {
  cell: Cell;
  onClick: (cell: Cell) => void;
}

export interface BoardProps {
  game: Game;
  onClick: (cell: Cell) => void;
}
function styleCell(cell: Cell) {
  if (cell.isOpened) {
    const x = cell.adjBombs === 0 ? "" : String(cell.adjBombs);
    return x;
  } else {
    return "";
  }
}

function findID(cell: Cell) {
  if (!cell.isOpened) {
    return "";
  } else {
    const countString = [
      "zero",
      "one",
      "two",
      "three",
      "four",
      "five",
      "six",
      "seven",
      "eight"
    ];
    return countString[cell.adjBombs];
  }
}

export function DrawCell(props: CellProps) {
  return (
    <button
      className={props.cell.isOpened ? "square opened" : "square"}
      onClick={() => props.onClick(props.cell)}
      id={findID(props.cell)}
    >
      {styleCell(props.cell)}
    </button>
  );
}

export function Board(props: BoardProps) {
  return (
    <div className="game-board">
      {props.game.state.map((row, i) => (
        <div key={i} className="board-row">
          {row.map((cell, j) => (
            <DrawCell
              key={j}
              cell={cell}
              onClick={(mine: Cell) => props.onClick(mine)}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
