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

  public updateState(
    cell: Cell,
    updateFn: (game: Game, cell: Cell, flag: boolean) => Game,
    flag: boolean
  ) {
    this.setState((prevState: AppState) => {
      const updatedGame = updateFn(prevState.game, cell, flag);
      return {
        game: updatedGame
      };
    });
  }

  public onClick(cell: Cell, e: any) {
    console.log(e.metaKey);
    this.updateState(cell, Function.openCell, e.metaKey);
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
    } else if (this.state.game.exploded) {
      toRender = (
        <div>
          <h1 key={0}>Yikes. You blew up</h1>
          <h3>Play again?</h3>
          <Input updateInputs={this.updateInputs} key={1} />
        </div>
      );
    } else if (this.state.game.won) {
      toRender = (
        <div>
          <h1 key={0}>YOU WON!</h1>
          <h3>Play again?</h3>
          <Input updateInputs={this.updateInputs} key={1} />
        </div>
      );
    } else {
      toRender = (
        <div className="game">
          <p className="helper-text">{"Command-Click to Flag"}</p>
          <Board
            game={this.state.game}
            onClick={(cell: Cell, e: any) => this.onClick(cell, e)}
          />
          <h2 className="game-subheading">
            {"Clear the mine field"}
            <span style={{ color: "rgb(255, 143, 88)" }}>
              {" without blowing up and you win."}
            </span>
          </h2>
          <h1 className="App-title">{"Rules are Simple"}</h1>
        </div>
      );
    }

    return <div className="App">{toRender}</div>;
  }
}

export default App;
