export interface Pos {
    x: number;
    y: number;
}
export class Cell {
    constructor(public position: Pos,
                public isOpened = false,
                public bombs = 0,
                ){}
}