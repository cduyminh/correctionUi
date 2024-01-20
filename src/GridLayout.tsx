import GridLayout from "react-grid-layout";

function MyFirstGrid() {
	// layout is an array of objects, see the demo for more complete usage
	const layout = [
		{ i: "a", x: 0, y: 0, w: 1, h: 2, static: true },
		{ i: "b", x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4 },
		{ i: "c", x: 4, y: 0, w: 1, h: 2 },
		{ i: "d", x: 4, y: 1, w: 1, h: 2 },
		{ i: "e", x: 4, y: 2, w: 1, h: 2 },
		{ i: "f", x: 4, y: 3, w: 1, h: 2 },
		{ i: "g", x: 4, y: 4, w: 1, h: 2 },
		{ i: "h", x: 4, y: 5, w: 1, h: 2 },
		{ i: "i", x: 4, y: 6, w: 1, h: 2 },
	];

	return (
		<GridLayout
			className="layout"
			layout={layout}
			cols={12}
			rowHeight={30}
			width={1200}
			style={{ position: "relative", transition: "all 0.5s ease" }}
			useCSSTransforms={true}
		>
			<div key="a" style={{ background: "red", transition: "all 0.5s ease" }}>
				a
			</div>
			<div key="b" style={{ background: "red", transition: "all 0.5s ease" }}>
				b
			</div>
			<div key="c" style={{ background: "red", transition: "all 0.5s ease" }}>
				c
			</div>
			<div key="d" style={{ background: "red", transition: "all 0.5s ease" }}>
				d
			</div>
			<div key="e" style={{ background: "red", transition: "all 0.5s ease" }}>
				e
			</div>
			<div key="f" style={{ background: "red", transition: "all 0.5s ease" }}>
				f
			</div>
			<div key="g" style={{ background: "red", transition: "all 0.5s ease" }}>
				g
			</div>
			<div key="h" style={{ background: "red", transition: "all 0.5s ease" }}>
				h
			</div>
			<div key="i" style={{ background: "red", transition: "all 0.5s ease" }}>
				i
			</div>
		</GridLayout>
	);
}

export default MyFirstGrid;
