import { Cell } from './cellclass';
import { Game } from './gameclass';

// function drawBoard(rows: number, columns: number): Game {
function drawBoard(rows: number, columns: number): Game {
    const state: Cell[][] = Array(rows).fill(null).map((r:number, i: number) => {
        return Array(columns).fill(null).map((c:number, j: number) => {
            return new Cell(0,false, {x: i, y: j});
        });
    });
    return new Game(state);
};

function update(game: Game, fn: (cell: Cell) => Cell): Game { // we apply the function to each cell
    const updated: Cell[][] = game.state.slice().map(row => {
        return row.slice().map(cell => {
            return fn(cell);
        });
    });
    return new Game(updated);
}

function openCell(game: Game, cell: Cell): Game {
    const openField = (selectedCell: Cell) => (square: Cell) => { 
        if (selectedCell === square) {
            return new Cell(square.bombs, true, square.position);
        } else {
            return new Cell(square.bombs, square.isOpened, square.position);
        }
    };

    return update(game, openField(cell));
}

export const Function = {
    drawBoard,
    openCell
};