import React from "react";
import ProductManagementPage from "./pages/ProductManagementPage";
import Shop from "./pages/Shop";
import Header from "./components/Header";

const App: React.FC = () => {
	return (
		<>
			<Header />
			{/* <ProductManagementPage /> */}
			<Shop />
		</>
	);
};

export default App;
