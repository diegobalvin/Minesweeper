import { Cell, Position } from './cellclass';
import { Game } from './gameclass';

function initBoard(size: number, numMines: number): Game {
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

    return new Game(state, false);
};

function inBounds(state: Cell[][], dx:number, dy:number, pos: Position): boolean {
    return pos.x + dx >= 0 && pos.x + dx < state.length && pos.y + dy >= 0 && pos.y + dy < state[0].length
}

function countAdjMines(state: Cell[][]): void {
    state.forEach(row => {
        row.forEach(cell => { 
            if (cell.adjBombs === -1) {
                for (let dx = -1; dx < 2; dx++) {
                    for (let dy = -1; dy < 2; dy++) {
                        if (inBounds(state, dx, dy, cell.position)) {
                            const currCell = state[cell.position.x + dx][cell.position.y + dy]
                            if (currCell.adjBombs !== -1) {
                                currCell.adjBombs++;
                            }
                        }
                    }
                }
            }
        });
    });
}

function openCell(game: Game, cell: Cell): Game {
    cell.isOpened = true
    if (cell.adjBombs === -1) {
        game.exploded = true
    }
    return game
}

export const Function = {
    initBoard,
    openCell
};