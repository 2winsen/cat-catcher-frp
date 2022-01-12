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
						ctx.fillStyle = 'rgba(0, 200, 200, 0.5)';
						break;
				}
				const x = colIdx * 50;
				const y = rowIdx * 50;
				ctx.fillRect(x, y, 50, 50);
			}
		}
	}
	
	// TODO: log
	console.log("render");

}

export function update([previousValue, currentValue]: [number, number]) {
	if (ctx) {
		ctx.fillStyle = 'rgba(0, 200, 200, 0.5)';
		ctx.fillRect(0, 0, 50, 50);

		// TODO: log
		console.log("update", previousValue, currentValue);
	}

}