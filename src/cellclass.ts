export interface Position {
    x: number;
    y: number;
}
export class Cell {
    constructor (
        public adjBombs: number = 0,
        public isOpened: boolean = false,
        public position: Position,
        public flag: boolean = false
    ){}
}