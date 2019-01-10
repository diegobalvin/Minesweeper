import * as React from 'react';
import './App.css';
import Board from './Board';

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to Minesweeper</h1>
        </header>
        <div className="game">
          <div className="game-board">
            <Board />
          </div>
        </div>
      </div>
    );
  }
}

export default App;