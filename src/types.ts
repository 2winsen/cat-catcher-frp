export type Board = BoardItem[][];

export type Point = [number, number];

export enum BoardItem {
    EmptyCell,
    Window,
    Cat
}
