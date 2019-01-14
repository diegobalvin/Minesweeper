import * as React from "react";
import "./App.css";
import { Board } from "./Board";
import { Cell } from "./cellclass";
import { Function } from "./function";
import { Game } from "./gameclass";
import { Input } from "./input";

export interface AppState {
  boardSize: number | undefined;
  game: Game;
  numMines: number | undefined;
}

class App extends React.Component<{}, AppState> {
  constructor(props: AppState) {
    super(props);
    this.state = {
      boardSize: undefined,
      game: Function.initBoard(6, 5),
      numMines: undefined
    };
    this.updateInputs = this.updateInputs.bind(this);
  }

  public updateState(cell: Cell, updateFn: (game: Game, cell: Cell) => Game) {
    this.setState((prevState: AppState) => {
      const updatedGame = updateFn(prevState.game, cell);
      return {
        game: updatedGame
      };
    });
  }
  public onClick(cell: Cell) {
    this.updateState(cell, Function.openCell);
  }

  public updateInputs(boardSize: number, numMines: number) {
    this.setState((prevState: AppState) => {
      prevState.boardSize = boardSize;
      prevState.numMines = numMines;
      prevState.game = Function.initBoard(boardSize, numMines);
      return prevState;
    });
  }

  public render() {
    let x;
    if (this.state.boardSize === undefined) {
      x = (
        <div>
          <Input updateInputs={this.updateInputs} />
        </div>
      );
    } else if (!this.state.game.exploded) {
      x = (
        <Board
          game={this.state.game}
          onClick={(cell: Cell) => this.onClick(cell)}
        />
      );
    } else {
      x = (
        <div>
          <h1 key={0}>Game Over</h1>
          <Input updateInputs={this.updateInputs} key={1} />
        </div>
      );
    }

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">{"Welcome to Minesweeper"}</h1>
        </header>
        <div className="game">{x}</div>
      </div>
    );
  }
}

export default App;
