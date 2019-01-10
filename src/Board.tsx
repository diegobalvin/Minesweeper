import * as React from 'react';

function Square(props: {current: number}) {
    return (
      <button className="square">
        {props.current}
      </button>
    );
}

class Board extends React.Component {
    public renderSquare(i:number) {
      return (
              <Square current={i} />
            );
    }
    
    public render() {
      const arr = [0, 3, 6];
      const listItems = arr.map((num) =>
        <div className="board-row" key={num}>
          {this.renderSquare(num)}
          {this.renderSquare(num + 1)}
          {this.renderSquare(num + 2)}
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