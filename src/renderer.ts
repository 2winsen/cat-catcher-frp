import { CANVAS_CELL_SIZE } from "./constants";
import { Board, BoardItem, Point } from "./types";

let ctx: CanvasRenderingContext2D | null = null;

function initContext() {
	const canvas = document.getElementById('canvas') as HTMLCanvasElement;
	if (canvas) {
		if (canvas.getContext) {
			return canvas.getContext('2d');
		}
	}
	return null;
}

export function renderBoard(board: Board) {
	if (!ctx) {
		ctx = initContext();
	}
	if (ctx) {
		for (let rowIdx = 0; rowIdx < board.length; rowIdx++) {
			const row = board[rowIdx];
			for (let colIdx = 0; colIdx < row.length; colIdx++) {
				const cell = row[colIdx];
				switch (cell) {
					case BoardItem.EmptyCell:
						ctx.fillStyle = 'rgb(200, 0, 0)';
						break;
					case BoardItem.Cat:
						ctx.fillStyle = 'rgb(0, 200, 0)';
						break;
					case BoardItem.Window:
						ctx.fillStyle = 'rgb(0, 200, 200)';
						break;
				}
				const x = colIdx * CANVAS_CELL_SIZE;
				const y = rowIdx * CANVAS_CELL_SIZE;
				ctx.fillRect(x, y, CANVAS_CELL_SIZE, CANVAS_CELL_SIZE);
			}
		}
	}
}

export function getCursorPosition(event: MouseEvent): Point {
	if (event.target instanceof HTMLElement) {
		const rect = event.target.getBoundingClientRect();
		const x = event.clientX - rect.left;
		const y = event.clientY - rect.top;
		return [x, y];
	}
	throw new Error("event.target should be HTMLElement")
}

export function getBoardPosition([x, y]: Point): Point {
    return [
        Math.floor(y / CANVAS_CELL_SIZE),
        Math.floor(x / CANVAS_CELL_SIZE),
    ]
}

export function updateScore() {
	const score = document.getElementById("score");
	if (score) {
		score.innerHTML = (+score.innerHTML + 1).toString();
	}
}