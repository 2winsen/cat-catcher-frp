import { combineLatest, concat, filter, from, fromEvent, interval, map, of, pairwise, startWith, switchMap, tap } from "rxjs";
import { addWindows, emptyBoard, getRandomWindow, showCat } from "./board";
import { GAME_INTERVAL } from "./constants";
import "./index.css";
import { getBoardPosition, getCursorPosition, preloadImages, renderBoard, updateBoard, updateScore } from "./renderer";
import { GameBoard } from "./types";

const preload$ = from(preloadImages());

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
        tap(updateScore),
    );

preload$
    .pipe(
        switchMap(_ => board$),
        switchMap(cat$),
        switchMap(player$),
    )
    .subscribe();