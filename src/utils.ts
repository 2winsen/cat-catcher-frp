import { Point } from "./types";

export const BOARD_WIDTH = 8;
export const BOARD_HEIGHT = 10;
export const WINDOWS_COUNT = 8;
export const GAME_INTERVAL = 5000;

export function randomInt(min: number, max: number) {
    return Math.floor(
        Math.random() * (max - min + 1) + min
    );
}

export function getCursorPosition(canvas: HTMLElement, event: MouseEvent): Point {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    return [x, y];
}