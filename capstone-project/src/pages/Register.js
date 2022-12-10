import { useState } from "react";
import Axios from "axios";

function Register() {
	const [emailReg, setEmailReg] = useState("");
	const [usernameReg, setUsernameReg] = useState("");
	const [passwordReg, setPasswordReg] = useState("");

	const addUser = () => {
		Axios.post("http://localhost:3001/create", {
			email: emailReg,
			username: usernameReg,
			password: passwordReg,
		}).then((response) => console.log(response));
	};

	return (
		<div className="App">
			<div className="information">
				<label>Email:</label>
				<input
					type="text"
					onChange={(event) => {
						setEmailReg(event.target.value);
					}}
				/>
				<label>UserName:</label>
				<input
					type="text"
					onChange={(event) => {
						setUsernameReg(event.target.value);
					}}
				/>
				<label>Password:</label>
				<input
					type="text"
					onChange={(event) => {
						setPasswordReg(event.target.value);
					}}
				/>
			</div>

			<button onClick={addUser} className="btn btn-primary">
				Register
			</button>
		</div>
	);
}

export default Register;
