import React from "react";
import { RootState } from "../common/redux/store";
import { useSelector } from "react-redux";

type Props = {};

const Header = (props: Props) => {
	const { cart, loading, error } = useSelector((state: RootState) => state.cart);
	console.log(cart);
	return <div>Header {JSON.stringify(cart)}</div>;
};

export default Header;
