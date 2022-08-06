import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { authContext } from "../../context/authContext";
import axios from "../../utils/axios";
import "./login.scss";


const Login = () => {
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined
  });

  const { error, loading, dispatch } = useContext(authContext);

  const handleChange = (e) => {
    setCredentials((prev) => ({
      ...prev,
      [e.target.id]: e.target.value
    }));
  }

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({
      type: "LOGIN_START"
    });
    try {
      const { data } = await axios({
        method: "post",
        data: credentials,
        url: "/auth/login",
        withCredentials: true

      });
      if (data.isAdmin) {
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: data.details
        });
        navigate("/");

      } else {
        dispatch({
          type: "LOGIN_FAILURE",
          payload: { message: "You are not allowed" }
        });
      }

    } catch (err) {
      dispatch({
        type: "LOGIN_FAILURE",
        payload: err.response.data.msg

      })
    }
  }

  return (
    <div className="login">
      <div className="login__container">
        <input
          type="email"
          name="email"
          id="email"
          placeholder="mail"
          className="loginInput"
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="password"
          className="loginInput"
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className="loginButton"
          onClick={handleClick}
        >
          Login
        </button>
        {error && <span>{error.msg}</span>}
      </div>
    </div>
  )
}

export default Login