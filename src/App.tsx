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
    let toRender;
    if (this.state.boardSize === undefined) {
      toRender = (
        <div>
          <h1>Welcome to Minesweeper</h1>
          <Input updateInputs={this.updateInputs} />
        </div>
      );
    } else if (!this.state.game.exploded) {
      toRender = (
        <div className="game">
          <Board
            game={this.state.game}
            onClick={(cell: Cell) => this.onClick(cell)}
          />
          <h1 className="App-title">{"Whatever you do, don't blow up"}</h1>
        </div>
      );
    } else {
      toRender = (
        <div>
          <h1 key={0}>Yikes. You blew up</h1>
          <h2>Play again?</h2>
          <Input updateInputs={this.updateInputs} key={1} />
        </div>
      );
    }

    return <div className="App">{toRender}</div>;
  }
}

export default App;
