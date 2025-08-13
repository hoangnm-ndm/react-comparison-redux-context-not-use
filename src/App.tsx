import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "./store";
import { increment, decrement } from "./features/counter/counterSlice";
import { addTodo } from "./features/todo/todoSlice";

const App: React.FC = () => {
	const count = useSelector((state: RootState) => state.counter.count);
	const dispatch = useDispatch<AppDispatch>();

	const todo = useSelector((state: RootState) => state.todo.todos);
	console.log(todo);
	return (
		<div>
			<h2>Count: {count}</h2>
			<button onClick={() => dispatch(increment())}>Tăng</button>
			<button onClick={() => dispatch(decrement())}>Giảm</button>
			<button onClick={() => dispatch(addTodo({ id: 1, text: "Them viec can lam" }))}>them viec can lam</button>

			<h2>Danh sach viec can lam</h2>
			<div>
				{todo.map((item) => (
					<div key={item.id}>{item.text}</div>
				))}
			</div>
		</div>
	);
};

export default App;
