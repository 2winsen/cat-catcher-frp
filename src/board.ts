import { Board, BoardItem, Point } from "./types";
import { BOARD_HEIGHT, BOARD_WIDTH, WINDOWS_COUNT } from "./constants";

export function randomInt(min: number, max: number) {
    return Math.floor(
        Math.random() * (max - min + 1) + min
    );
}

export function emptyBoard() {
    const emptyBoard: Board = Array.from(
        { length: BOARD_HEIGHT },
        () => Array.from({ length: BOARD_WIDTH }, () => BoardItem.EmptyCell)
    );
    return emptyBoard;
}

export function addWindows(board: Board) {
    for (let index = 0; index < WINDOWS_COUNT; index++) {
        board[randomInt(0, BOARD_HEIGHT - 1)][randomInt(0, BOARD_WIDTH - 1)] = BoardItem.Window;
    }
    return board;
}

export function getWindows(board: Board): Point[] {
    let windows = [] as Point[];
    for (let colIdx = 0; colIdx < board.length; colIdx++) {
        const row = board[colIdx];
        for (let rowIdx = 0; rowIdx < row.length; rowIdx++) {
            const cell = row[rowIdx];
            if (cell !== BoardItem.EmptyCell) {
                windows.push([colIdx, rowIdx]);
            }
        }

    }
    return windows;
}

export function clean(board: Board): Board {
    for (let colIdx = 0; colIdx < board.length; colIdx++) {
        const row = board[colIdx];
        for (let rowIdx = 0; rowIdx < row.length; rowIdx++) {
            const cell = row[rowIdx];
            if (cell === BoardItem.Cat) {
                board[colIdx][rowIdx] = BoardItem.Window;
            }
        }

    }
    return board;
}

export function getRandomWindow() {
    return randomInt(0, WINDOWS_COUNT - 1);
}