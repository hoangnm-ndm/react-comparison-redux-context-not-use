import React, { useState } from "react";
import ComponentA from "./ComponentA";

const App: React.FC = () => {
	const [count, setCount] = useState<number>(0);

	console.log("App re-render");

	return (
		<>
			<h1>Component App</h1>
			<ComponentA count={count} setCount={setCount} />
		</>
	);
};

export default App;
