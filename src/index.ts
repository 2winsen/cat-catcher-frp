import { filter, fromEvent, interval, map, of, pairwise, startWith, switchMap, tap } from "rxjs";
import { showCat, addWindows, emptyBoard, getRandomWindow } from "./board";
import { GAME_INTERVAL } from "./constants";
import "./index.css";
import { getBoardPosition, getCursorPosition, renderBoard, updateBoard, updateScore } from "./renderer";
import { BoardItem, GameBoard } from "./types";

const board$ = of(emptyBoard())
    .pipe(
        map(addWindows),
        tap(renderBoard),
    );

const cat$ = (board: GameBoard) => interval(GAME_INTERVAL)
    .pipe(
        startWith(0, 0),
        map(_ => getRandomWindow(board)),
        pairwise(),
        tap(([previousPoint, point]) => {
            showCat(previousPoint, point, board);
            updateBoard(previousPoint, point);
        }),
        map(_ => board),
    );

const player$ = ({ grid }: GameBoard) => fromEvent<MouseEvent>(document, "click")
    .pipe(
        filter(event => event.target === document.getElementById("canvas")),
        map(getCursorPosition),
        map(getBoardPosition),
        map(([x, y]) => grid[x][y]),
        filter(boardItem => boardItem === BoardItem.Cat),
        tap(updateScore),
    );

board$.pipe(
    switchMap(cat$),
    switchMap(player$),
)
    .subscribe();