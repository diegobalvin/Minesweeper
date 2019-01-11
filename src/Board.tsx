import * as React from 'react';
import {Cell} from './Cell'

interface BoardState {
    rows:number;
    cols:number;
}

function makeBoard(r:number, c:number) {
    const arr = [];
    for (let i = 0; i < r; i++){
        arr.push(Array(c).fill(""))
    }
    return arr;
}
class Board extends React.Component<{},BoardState> {    
    public render() {
      const arr = makeBoard(6, 5); // makeBoard(this.state.rows, this.state.cols);

      const listItems = arr.map((row, i) =>
        <div className="board-row" key={i}>
          {row.map((cols, j) => <Cell key={j}
                                value={cols}
                            />)
          }
        </div>
      );
      const status = "next";
      return (
        <div>
          <div className="status">{status}</div>
          {listItems}
        </div>
      );
    }
}
export default Board;