import * as React from 'react';
import './App.css';
import { Board } from './Board';

export interface AppProps {
  columns: number;
  rows: number;
}

class App extends React.Component<AppProps> {
  public state = {
    columns: this.props.columns,
    rows: this.props.rows
  }

  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">{'Welcome to Minesweeper'}</h1>
        </header>
        <div className="game">
          <div className="game-board">
            <Board 
              rows={this.state.rows}
              cols={this.state.columns}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;