import React from "react";
import ComponentB from "./ComponentB";

interface ComponentAProps {
	count: number;
	setCount: React.Dispatch<React.SetStateAction<number>>;
}

const ComponentA: React.FC<ComponentAProps> = ({ count, setCount }) => {
	console.log("A re-render");

	return (
		<div>
			<h2>Component A đây</h2>
			<ComponentB count={count} setCount={setCount} />
		</div>
	);
};

export default ComponentA;
