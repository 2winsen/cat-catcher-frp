import { CANVAS_CELL_SIZE } from "./constants";
import { GameBoard, BoardItem, Point } from "./types";

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

export function fillRect([x, y]: Point) {
	if (ctx) {
		ctx.fillRect(
			x * CANVAS_CELL_SIZE, 
			y * CANVAS_CELL_SIZE, 
			CANVAS_CELL_SIZE, 
			CANVAS_CELL_SIZE
		);
	}
}

export function renderBoard({ grid }: GameBoard) {
	if (!ctx) {
		ctx = initContext();
	}
	if (ctx) {
		for (let x = 0; x < grid.length; x++) {
			const col = grid[x];
			for (let y = 0; y < col.length; y++) {
				const cell = col[y];
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
				fillRect([x, y]);
			}
		}
	}
}

export function updateBoard(prevCatPosition: Point, catPosition: Point) {
	if (ctx) {
		ctx.fillStyle = 'rgb(0, 200, 200)';
		fillRect(prevCatPosition);

		ctx.fillStyle = 'rgb(0, 200, 0)';
		fillRect(catPosition);
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
		Math.floor(x / CANVAS_CELL_SIZE),
		Math.floor(y / CANVAS_CELL_SIZE),
	]
}

export function updateScore() {
	const score = document.getElementById("score");
	if (score) {
		score.innerHTML = (+score.innerHTML + 1).toString();
	}
}