import { GameBoard, BoardItem, Point } from "./types";
import { BOARD_HEIGHT, BOARD_WIDTH, WINDOWS_COUNT } from "./constants";

export function randomInt(min: number, max: number) {
    return Math.floor(
        Math.random() * (max - min + 1) + min
    );
}

export function emptyBoard(): GameBoard {
    const grid = Array.from(
        { length: BOARD_WIDTH },
        () => Array.from({ length: BOARD_HEIGHT }, () => BoardItem.Wall)
    );
    return {
        grid,
        windows: [],
    };
}

export function addWindows(board: GameBoard) {
    const { grid, windows } = board;
    for (let index = 0; index < WINDOWS_COUNT; index++) {
        const x = randomInt(0, BOARD_WIDTH - 1);
        const y = randomInt(0, BOARD_HEIGHT - 1);
        grid[x][y] = BoardItem.Window;
        windows.push([x, y]);
    }
    return board;
}

export function getRandomWindow({ windows }: GameBoard) {
    return windows[randomInt(0, windows.length - 1)];
}

export function showCat([prevX, prevY]: Point, [x, y]: Point, board: GameBoard) {
    board.grid[prevX][prevY] = BoardItem.Window;
    board.grid[x][y] = BoardItem.Cat;
}