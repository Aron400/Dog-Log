import "./App.css";
import Header from "./components/Header";
// import SideNavbar from "./components/side-navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Feed from "./pages/Feeding";
import Walk from "./pages/Walks";
import Medical from "./pages/medical/Medical";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PrivateRoutes from "./components/PrivateRoutes";

function App() {
	return (
		<div className="app">
			<Router>
				<Header />
				{/* <SideNavbar /> */}
				<Routes>
					<Route>
						<Route path="/" exact element={<Home />} />
						<Route path="/register" element={<Register />} />
						<Route path="/feeding" element={<Feed />} />
						<Route path="/walks" element={<Walk />} />
						<Route path="/medical" element={<Medical />} />
					</Route>
					
				</Routes>
			</Router>
		</div>
	);
}
// function App() {
// 	return (
// 		<div className="app">
// 			<Router>
// 				<Header />
// 				{/* <SideNavbar /> */}
// 				<Routes>
// 					<Route element={<PrivateRoutes />}>
// 						<Route path="/home" exact element={<Home />} />
// 						<Route path="/register" element={<Register />} />
// 						<Route path="/feeding" element={<Feed />} />
// 						<Route path="/walks" element={<Walk />} />
// 						<Route path="/medical" element={<Medical />} />
// 					</Route>
// 					<Route element={<Login />} path="/" />
// 				</Routes>
// 			</Router>
// 		</div>
// 	);
// }

export default App;
