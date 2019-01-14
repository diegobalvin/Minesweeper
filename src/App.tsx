import * as React from "react";
import "./App.css";
import { Board } from "./Board";
import { Cell } from "./cellclass";
import { Function } from "./function";
import { Game } from "./gameclass";
import { Input } from "./input"

export interface AppProps {
  columns: number;
  rows: number;
}

class App extends React.Component<AppProps> {
  public state = {
    columns: this.props.columns,
    game: Function.drawBoard(this.props.rows, this.props.columns),
    rows: this.props.rows,
    size: undefined
  };

  public updateState(cell: Cell, updateFn: (game: Game, cell: Cell) => Game) {
    this.setState((prevState: any, props) => {
      const updatedGame = updateFn(prevState.game, cell);
      return {
        game: updatedGame
      };
    });
  }
  public onClick(cell: Cell) {
    this.updateState(cell, Function.openCell);
  }

  public render() {
    if (this.state.size === undefined) {
      return (<Input/>)
       
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
