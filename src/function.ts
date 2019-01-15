import { Cell, Position } from './cellclass';
import { Game } from './gameclass';

function initBoard(size: number, numMines: number): Game {
    if (numMines > size * size) {
        numMines = size * size
    }
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
    return !(pos.x + dx < 0 || pos.x + dx >= state.length || pos.y + dy < 0 || pos.y + dy >= state[0].length)
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
    if (cell.adjBombs === -1) {
        game.exploded = true
    } else if (cell.adjBombs > 0) {
        cell.isOpened = true
    } else {
        cell.isOpened = true
        let arr = [cell]
        
        while (arr.length !== 0) {
            const temp: Cell[] = [];
            console.log(arr)
            arr.forEach(element => {
                for (let dx = -1; dx < 2; dx++) {
                    for (let dy = -1; dy < 2; dy++) {
                        if (inBounds(game.state, dx, dy, element.position) && !(dx === 0 && dy === 0)) {
                            const curr = game.state[element.position.x + dx][element.position.y + dy]
                            if (curr.adjBombs !== 0) {
                                curr.isOpened = true
                            }
                            if (curr.adjBombs === 0 && !curr.isOpened) {
                                temp.push(curr);
                                curr.isOpened = true;
                            }
                        }
                    }
                }
            });
            arr = temp
        }
    }
    return game
}

export const Function = {
    initBoard,
    openCell
};