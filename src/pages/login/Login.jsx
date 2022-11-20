import { useContext, useState } from "react";
import "./login.scss";

import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    axios
      .post("http://127.0.0.1:8000/login", {
        username: email,
        password: password,
      })
      .then((result) => {
        console.log(`Access token ${result.data.access_token}`);
        localStorage.setItem("token", result.data.access_token);
        navigate("/");
      })
      .catch((error) => {
        console.log(error.response.data);
        setError(true);
      });
  };

  return (
    <div className="login">
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
        {error && <span>Wrong email or password!</span>}
      </form>
    </div>
  );
};

export default Login;
