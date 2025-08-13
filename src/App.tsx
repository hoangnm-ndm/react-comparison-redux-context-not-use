import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "./store";
import { increment, decrement } from "./features/counter/counterSlice";

const App: React.FC = () => {
	const count = useSelector((state: RootState) => state.counter.count);
	const dispatch = useDispatch<AppDispatch>();
	return (
		<div>
			<h2>Count: {count}</h2>
			<button onClick={() => dispatch(increment())}>Tăng</button>
			<button onClick={() => dispatch(decrement())}>Giảm</button>
		</div>
	);
};

export default App;
