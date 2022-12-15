import { useEffect, useState } from "react";
import Axios from "axios";
import "./pages.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loginStatus, setLoginStatus] = useState("");

  Axios.defaults.withCredentials = true;

  const login = () => {
    Axios.post("http://localhost:3001/login", {
      username: username,
      password: password,
    }).then((response) => {
      if (response.data.message) {
        setLoginStatus(response.data.message);
      } else {
        setLoginStatus(response.data[0].username);
      }
    });
  };
  useEffect(() => {
    Axios.get("http://localhost:3001/login").then((response) => {
      if (response.data.loggedInd == true)
        setLoginStatus(response.data.user[0].username);
    });
  }, []);

  return (
    <div className="App">
      <h1>Login</h1>
      <div className="login">
        <label>Username:</label>
        <input
          type="text"
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />

        <label>Password:</label>
        <input
          type="text"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />

        <button onClick={login} className="btn btn-primary">
          Login
        </button>
      </div>

      <h1>{loginStatus}</h1>
    </div>
  );
}

export default Login;
