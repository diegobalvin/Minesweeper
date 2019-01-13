import * as React from 'react';
import './App.css';
import { Board } from './Board';
import { Function } from './function';

export interface AppProps {
  columns: number;
  rows: number;
}

class App extends React.Component<AppProps> {
  public state = {
    columns: this.props.columns,
    game: Function.drawBoard(this.props.rows, this.props.columns),
    rows: this.props.rows
  }

  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">{'Welcome to Minesweeper'}</h1>
        </header>
        <div className="game">
            <Board 
              game={this.state.game}
            />
        </div>
      </div>
    );
  }
}

export default App;