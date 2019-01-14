import { Cell, Position } from './cellclass';
import { Game } from './gameclass';

function drawBoard(size: number, numMines: number): Game {
    const arr: number[] = []
    while(arr.length < numMines) {
        const r = Math.floor(Math.random() * Math.pow(size, 2));
        if (arr.indexOf(r) === -1) {
            arr.push(r);
        }
    }
    const state: Cell[][] = Array(size).fill(null).map((row: number, i: number) => {
        return Array(size).fill(null).map((col: number, j: number) => {
            if (arr.indexOf(i * size + j) > -1) {
                return new Cell(-1, false, {x: i, y: j});
            } else {
                return new Cell(0, false, {x: i, y: j});
            }
        });
    });
    countAdjMines(state)
    
    return new Game(state);
};

function inBounds(state: Cell[][], dx:number, dy:number, pos: Position): boolean {
    return pos.x + dx >= 0 && pos.x + dx < state.length && pos.y + dy >= 0 && pos.y + dy < state[0].length
}

function countAdjMines(state: Cell[][]): void {
    state.forEach((row) => {
        row.forEach((cell) => { 
            if (cell.bombs === -1) {
                for (let dx = -1; dx < 2; dx++) {
                    for (let dy = -1; dy < 2; dy++) {
                        if (inBounds(state, dx, dy, cell.position)) {
                            const currCell = state[cell.position.x + dx][cell.position.y + dy]
                            if (currCell.bombs !== -1) {
                                currCell.bombs++;
                            }
                        }
                    }
                }
            }
        });
    });
}

function update(game: Game, fn: (cell: Cell) => Cell): Game {
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