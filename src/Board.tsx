import * as React from 'react';

interface BoardProps {
    rows:number;
    cols:number;
}
export interface CellProps {
    value: string; 
}
  
export function Cell(props:CellProps) {
    return (
        <button className="square">
        {props.value}
        </button>
    )
}


function makeBoard(r:number, c:number) {
    const arr = [];
    for (let i = 0; i < r; i++){
        arr.push(Array(c).fill(""))
    }
    return arr;
}

export class Board extends React.Component<BoardProps> {    
    public render() {
      const arr = makeBoard(this.props.rows, this.props.cols); // makeBoard(this.state.rows, this.state.cols);
      const listItems = arr.map((row, i) =>
        <div className="board-row" key={i}>
          {
            row.map((cols, j) => 
                <Cell 
                    key={j}
                    value={cols}
                />)
          }
        </div>
      );
      
      return (
        <div>
          {listItems}
        </div>
      );
    }
}