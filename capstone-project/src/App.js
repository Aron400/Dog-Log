import "./App.css";
import Header from "./components/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Feed from "./pages/Feeding";
import Walk from "./pages/Walks";
import Medical from "./pages/medical/Medical";
import Login from "./pages/Login";
import Register from "./pages/Register";
import VaccineAddEdit from "./pages/medical/VaccineAddEdit";
import PrivateRoutes from "./components/PrivateRoutes";
import NotesAddEdit from "./pages/medical/NotesAddEdit";
import { useState } from "react";

function App() {
	const [loggedIn, setLoggedIn] = useState(localStorage.access ? true : false);

	return (
		<div className="app">
			<Router>
				<Header />
				<Routes>
					<Route element={<PrivateRoutes />}>
						<Route path="/" exact element={<Home />} />
						<Route path="/feeding" element={<Feed />} />
						<Route path="/walks" element={<Walk />} />
						<Route path="/medical" element={<Medical />} />
						<Route path="/addVaccine" element={<VaccineAddEdit />} />
						<Route path="/updateVaccine/:id" element={<VaccineAddEdit />} />
						<Route path="/addNote" element={<NotesAddEdit />} />
						<Route path="/updateNote/:id" element={<NotesAddEdit />} />
					</Route>
					<Route element={<Login />} path="/login" />
					<Route path="/register" element={<Register />} />
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
