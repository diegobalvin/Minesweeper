import * as React from 'react';

interface CellProps {
  value: string; 
}
export class Cell extends React.Component<CellProps, {}> {
    public render() {
      return (
        <button className="square">
          {this.props.value}
        </button>
      )
    }
}