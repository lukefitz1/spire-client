import React, { useState, useContext, useEffect } from "react";
import { Context as AuthContext } from "../context/AuthContext";
import { useHistory } from "react-router-dom";

const Login = () => {
  const history = useHistory();
  const { state, signin, tryLocalSignin } = useContext(AuthContext);
  const [email, setEmail] = useState("lukefitz1@gmail.com");
  const [password, setPassword] = useState("pass4luke");
  const [loginError, setLoginError] = useState(false);

  useEffect(() => {
    const isLoggedIn = async () => {
      const signedIn = await tryLocalSignin();

      if (signedIn) {
        history.push("/customers");
      }
    };

    isLoggedIn();
  }, []);

  const login = async (email, password, event) => {
    event.preventDefault();
    const res = await signin({ email, password });

    if (res) {
      redirectToHome();
    } else {
      showError();
    }
  };

  const redirectToHome = () => {
    history.push("/customers");
  };

  const showError = () => {
    setLoginError(true);
  };

  return (
    <div>
      <h3>Login</h3>
      <form>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input"
        />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input"
        />
        <button onClick={(event) => login(email, password, event)}>
          Login
        </button>
        {loginError ? <p>{state.errorMessage}</p> : null}
      </form>
    </div>
  );
};

export default Login;
