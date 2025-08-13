import React from "react";

interface ComponentCProps {
	count: number;
	setCount: React.Dispatch<React.SetStateAction<number>>;
}

const ComponentC: React.FC<ComponentCProps> = ({ count, setCount }) => {
	console.log("C re-render");

	return (
		<div>
			<h2>Component C đây</h2>
			<button onClick={() => setCount(count + 1)}>Count value: {count}</button>
		</div>
	);
};

export default ComponentC;
