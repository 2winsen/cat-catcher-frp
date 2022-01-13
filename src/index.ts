import { filter, fromEvent, interval, map, of, scan, startWith, switchMap, tap } from "rxjs";
import { addWindows, clean, emptyBoard, getRandomWindow, getWindows } from "./board";
import { GAME_INTERVAL } from "./constants";
import "./index.css";
import { getBoardPosition, getCursorPosition, renderBoard, updateScore } from "./renderer";
import { Board, BoardItem } from "./types";

const canvas = document.getElementById("canvas");

const board$ = of(emptyBoard())
    .pipe(
        map(addWindows),
    );

const player$ = (board: Board) => fromEvent<MouseEvent>(document, "click")
    .pipe(
        filter(event => event.target === canvas),
        map(getCursorPosition),
        map(getBoardPosition),
        map(([col, row]) => board[col][row]),
        filter(boardItem => boardItem === BoardItem.Cat),
        tap(updateScore),
    );

const cat$ = (board: Board) => interval(GAME_INTERVAL)
    .pipe(
        startWith(0),
        map(_ => getRandomWindow()),
        map(windowIdx => getWindows(board)[windowIdx]),
        scan((acc, [col, row]) => {
            acc[col][row] = BoardItem.Cat;
            return acc;
        }, board),
        tap(renderBoard),
    );

board$.pipe(
    switchMap(cat$),
    switchMap(player$),
)
    .subscribe();