import { BOARD_HEIGHT, BOARD_WIDTH, randomInt, WINDOWS_COUNT } from "./utils";
import { Board, BoardItem } from "./types";

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