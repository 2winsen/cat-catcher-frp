import { CANVAS_CELL_SIZE } from "./constants";
import { GameBoard, BoardItem, Point } from "./types";
import wallImg from "./assets/wall.png";
import windowImg from "./assets/window.png";
import catImg from "./assets/cat.png";

let ctx: CanvasRenderingContext2D | null = null;
let preloadedImages: Map<BoardItem, HTMLImageElement> = new Map();

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

function loadImage(key: BoardItem, imageSrc: string) {
	const img = new Image();
	img.src = imageSrc;
	preloadedImages.set(key, img);
}

function drawImage(key: BoardItem, [x, y]: Point) {
	const image = preloadedImages.get(key);
	if (ctx && image) {
		// Optimization: images are prescaled as optimization no need to scale programmatically
		ctx.drawImage(
			image,
			x * CANVAS_CELL_SIZE,
			y * CANVAS_CELL_SIZE,
		);
	}
}

export function renderBoard({ grid }: GameBoard) {
	if (!ctx) {
		ctx = initContext();
		// Optimization: preloading
		loadImage(BoardItem.Wall, wallImg);
		loadImage(BoardItem.Window, windowImg);
		loadImage(BoardItem.Cat, catImg);
	}
	if (ctx) {
		for (let x = 0; x < grid.length; x++) {
			const col = grid[x];
			for (let y = 0; y < col.length; y++) {
				const cell = col[y];
				switch (cell) {
					case BoardItem.Wall:
						drawImage(cell, [x, y]);
						break;
					case BoardItem.Window:
						drawImage(cell, [x, y]);
						break;
				}
			}
		}
	}
}

/**
 * Optimization: to redraw only changed parts
 */
export function updateBoard(prevCatPosition: Point, catPosition: Point) {
	if (ctx) {
		if (prevCatPosition.toString() === catPosition.toString()) {
			return;
		}

		clearRect(prevCatPosition);
		drawImage(BoardItem.Window, prevCatPosition);
		drawImage(BoardItem.Cat, catPosition);
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