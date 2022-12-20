import { useEffect, useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loginStatus, setLoginStatus] = useState("");
	const navigate = useNavigate();

	const navigateToHome = () => {
		// 👇️ navigate to home
		navigate("/");
	};

	Axios.defaults.withCredentials = true;

	const login = () => {
		Axios.post("http://localhost:3001/login", {
			email: email,
			password: password,
		}).then((response) => {
			if (response.data.message) {
				setLoginStatus(response.data.message);
			} else {
				setLoginStatus(response.data[0].email);
				localStorage.setItem("token", response.data.email);
				navigateToHome();
			}
		});
	};
	useEffect(() => {
		Axios.get("http://localhost:3001/login").then((response) => {
			if (response.data.loggedIn == true)
				setLoginStatus(response.data.user[0].email);
		});
	}, []);

	return (
		<div className="App">
			<div className="login">
				<label>Email:</label>
				<input
					type="text"
					onChange={(event) => {
						setEmail(event.target.value);
					}}
				/>

				<label>Password:</label>
				<input
					type="text"
					onChange={(event) => {
						setPassword(event.target.value);
					}}
				/>
			</div>

			<button onClick={login} className="btn btn-primary">
				Login
			</button>
			<h1>{loginStatus}</h1>
		</div>
	);
}

export default Login;
