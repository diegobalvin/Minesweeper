import * as React from "react";
import { Cell } from "./cellclass";
import { Game } from "./gameclass";

// class Cell {
//     constructor (
//         public bombs: number = 0,
//         public isOpened: boolean = false,
//         public position: Position
//     ){}
// }
// class Game {
//     constructor (
//         public state: Cell [][]
//     ) {}
// }

export interface CellProps {
  cell: Cell;
  onClick: (cell: Cell) => void;
}

export interface BoardProps {
  game: Game;
  onClick: (cell: Cell) => void;
}

export function DrawCell(props: CellProps) {
  return (
    <button className="square" onClick={() => props.onClick(props.cell)}>
      {String(props.cell.isOpened)}
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
