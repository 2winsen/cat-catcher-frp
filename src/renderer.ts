import { CANVAS_CELL_SIZE } from "./constants";
import { GameBoard, BoardItem, Point } from "./types";
import wallImg from "./assets/wall.png";
import windowImg from "./assets/window.png";
import catImg from "./assets/cat.png";

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

function clearRect([x, y]: Point) {
	if (ctx) {
		ctx.clearRect(
			x * CANVAS_CELL_SIZE,
			y * CANVAS_CELL_SIZE,
			CANVAS_CELL_SIZE,
			CANVAS_CELL_SIZE
		);
	}
}

function drawImage(imageSrc: string, [x, y]: Point, xOffset = 0, yOffset = 0) {
	const img = new Image();
	img.src = imageSrc;
	img.onload = () => {
		if (ctx) {
			ctx.drawImage(
				img,
				(x * CANVAS_CELL_SIZE) - (xOffset / 2),
				y * CANVAS_CELL_SIZE - (yOffset / 2),
				CANVAS_CELL_SIZE + xOffset,
				CANVAS_CELL_SIZE + yOffset
			);
		}
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
						drawImage(wallImg, [x, y]);
						break;
					case BoardItem.Window:
						drawImage(windowImg, [x, y], -6, -6);
						break;
				}
			}
		}
	}
}

export function updateBoard(prevCatPosition: Point, catPosition: Point) {
	if (ctx) {
		if (prevCatPosition.toString() === catPosition.toString()) {
			return;
		}

		clearRect(prevCatPosition);
		drawImage(windowImg, prevCatPosition, -6, -6);
		drawImage(catImg, catPosition);
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