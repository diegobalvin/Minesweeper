import { Cell } from './cellclass';
import { Game } from './gameclass';

function drawBoard(rows: number, columns: number): Game {
    const state: Cell[][] = Array(rows).fill(null).map((r:number, i: number) => {
        return Array(columns).fill(null).map((c:number, j: number) => {
            return new Cell(1,false, {x: i, y: j});
        });
    });
    return new Game(state);
};

export const Function = {
    drawBoard
};