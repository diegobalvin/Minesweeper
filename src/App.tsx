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
  constructor(props: any) {
    super(props);
    this.state = {
      boardSize: undefined,
      game: Function.drawBoard(6, 5),
      numMines: undefined
    };
    this.updateInputs = this.updateInputs.bind(this);
  }

  public updateState(cell: Cell, updateFn: (game: Game, cell: Cell) => Game) {
    this.setState((prevState: any) => {
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
    this.setState((prevState: any) => {
      prevState.boardSize = boardSize;
      prevState.numMines = numMines;
      prevState.game = Function.drawBoard(boardSize, numMines);
      return prevState;
    });
  }

  public render() {
    if (this.state.boardSize === undefined) {
      return <Input updateInputs={this.updateInputs} />;
    } else {
      return (
        <Board
          game={this.state.game}
          onClick={(cell: Cell) => this.onClick(cell)}
        />
      );
    }
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">{"Welcome to Minesweeper"}</h1>
        </header>
        <div className="game">
          -
          <Board
            game={this.state.game}
            onClick={(cell: Cell) => this.onClick(cell)}
          />
        </div>
      </div>
    );
  }
}

export default App;
