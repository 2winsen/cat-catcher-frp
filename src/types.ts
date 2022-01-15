export type GameBoard = {
    grid: number[][],
    windows: Point[],
};

export type Point = [number, number];

export enum BoardItem {
    Wall,
    Window,
    Cat
}
