interface CounterAction {
	type: string;
	payload?: any;
}

const increment = (): CounterAction => ({ type: "counter/increment" });
const decrement = (): CounterAction => ({ type: "counter/decrement" });
