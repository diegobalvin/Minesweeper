export interface Position {
    x: number;
    y: number;
}
export class Cell {
    constructor (
        public bombs: number = 0,
        public isOpened: boolean = false,
        public position: Position
    ){}
}