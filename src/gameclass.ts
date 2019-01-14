import { Cell } from './cellclass'

export class Game {
    constructor (
        public state: Cell [][],
        public exploded: boolean
    ) {}
}