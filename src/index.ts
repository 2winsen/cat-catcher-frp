import { combineLatest, filter, fromEvent, interval, map, merge, of, pairwise, startWith, tap } from "rxjs";
import { addWindows, emptyBoard } from "./board";
import "./index.css";
import { renderBoard, update } from "./renderer";
import { GAME_INTERVAL, getCursorPosition, randomInt, WINDOWS_COUNT } from "./utils";

const canvas = document.getElementById("canvas");

const board$ = of(emptyBoard())
    .pipe(
        map(addWindows),
        tap(renderBoard),
    )

const cat$ = interval(GAME_INTERVAL)
    .pipe(
        startWith(0, 0),
        map(_ => randomInt(0, WINDOWS_COUNT)),
        pairwise(),
        tap(update),
    )

const player$ = fromEvent<MouseEvent>(document, "click")
    .pipe(
        filter(event => event.target === canvas),
        map(event => getCursorPosition(event.target as HTMLElement, event)),
    )

combineLatest([
    board$,
    cat$,
])
    .pipe()
    .subscribe();