import React from "react";
import ComponentC from "./ComponentC";

interface ComponentBProps {
	count: number;
	setCount: React.Dispatch<React.SetStateAction<number>>;
}

const ComponentB: React.FC<ComponentBProps> = ({ count, setCount }) => {
	console.log("B re-render");

	return (
		<div>
			<h2>Component B đây</h2>
			<ComponentC count={count} setCount={setCount} />
		</div>
	);
};

export default ComponentB;
