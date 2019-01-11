import { Cell } from './celldomain'
export class Game {
    constructor(public state: Cell [][],
                public totalBombs = 0,
                public exploded = false
                ) {}
}