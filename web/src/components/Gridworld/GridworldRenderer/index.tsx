import { type MouseEvent, type TouchEvent, useContext } from "react";
import { GridworldDispatchContext } from "../GridworldContextProvider";
import { GridworldActionType } from "../actions";
import { HEIGHT, WIDTH } from "../config";
import GridworldCell from "./GridworldCell";

const positions: [number, number][] = [];
for (let row = 0; row < HEIGHT; row++) {
	for (let column = 0; column < WIDTH; column++) {
		positions.push([row, column]);
	}
}

const _getGridPosition = (
	currentTarget: SVGElement,
	clientX: number,
	clientY: number,
) => {
	const { x, y, width, height } = currentTarget.getBoundingClientRect();
	const row = Math.floor(((clientY - y) / height) * HEIGHT);
	const column = Math.floor(((clientX - x) / width) * WIDTH);
	return [row, column];
};

const mouseEventToGridPosition = (event: MouseEvent<SVGElement>) => {
	return _getGridPosition(event.currentTarget, event.clientX, event.clientY);
};

const touchEventToGridPosition = (event: TouchEvent<SVGElement>) => {
	return _getGridPosition(
		event.currentTarget,
		event.touches[0].clientX,
		event.touches[0].clientY,
	);
};

const GridworldRenderer = () => {
	const dispatch = useContext(GridworldDispatchContext);

	const handleMouseEvent = (event: MouseEvent<SVGElement>) => {
		const [row, column] = mouseEventToGridPosition(event);
		switch (event.type) {
			case "mousedown":
				dispatch({
					type: GridworldActionType.START_DRAWING,
					row,
					column,
				});
				break;
			case "mousemove":
				dispatch({
					type: GridworldActionType.DRAW,
					row,
					column,
				});
				break;
			case "mouseup":
			// eslint-disable-next-line no-fallthrough
			case "mouseleave":
				dispatch({
					type: GridworldActionType.STOP_DRAWING,
				});
				break;
		}
	};

	const handleTouchEvent = (event: TouchEvent<SVGElement>) => {
		// This will log an error on Chrome for touchstart and touchmove events
		// Don't try to check the user mobile browser with navigator.userAgent
		// Just roll with it
		// https://developer.mozilla.org/en-US/docs/Web/API/TouchEvent#using_with_addeventlistener_and_preventdefault
		event.preventDefault();

		if (event.touches.length !== 1) {
			return;
		}

		const [row, column] = touchEventToGridPosition(event);
		switch (event.type) {
			case "touchstart":
				dispatch({
					type: GridworldActionType.START_DRAWING,
					row,
					column,
				});
				break;
			case "touchmove":
				dispatch({
					type: GridworldActionType.DRAW,
					row,
					column,
				});
				break;
			case "touchend":
			// eslint-disable-next-line no-fallthrough
			case "touchcancel":
				dispatch({
					type: GridworldActionType.STOP_DRAWING,
				});
				break;
		}
	};

	return (
		<svg
			viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
			className="mx-auto max-h-[80vh] touch-none"
			onMouseDown={handleMouseEvent}
			onMouseMove={handleMouseEvent}
			onMouseUp={handleMouseEvent}
			onMouseLeave={handleMouseEvent}
			onTouchStart={handleTouchEvent}
			onTouchMove={handleTouchEvent}
			onTouchEnd={handleTouchEvent}
			onTouchCancel={handleTouchEvent}
		>
			{positions.map(([row, column]) => (
				<svg
					key={`${row}:${column}`}
					viewBox="0 0 1 1"
					x={column}
					y={row}
					width="1"
					height="1"
				>
					<GridworldCell row={row} column={column} />
				</svg>
			))}
		</svg>
	);
};

export default GridworldRenderer;
