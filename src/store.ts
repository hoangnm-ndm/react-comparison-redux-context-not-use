import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./features/counter/counterSlice";
import todoReducer from "./features/todo/todoSlice";

const store = configureStore({
	reducer: {
		counter: counterReducer,
		todo: todoReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
