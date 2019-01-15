import { Cell } from './cellclass'

export class Game {
    constructor (
        public state: Cell [][],
        public exploded: boolean,
        public won: boolean,
        public numMines: number
    ) {}
}