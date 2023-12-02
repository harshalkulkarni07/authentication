import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { ToastContainer, toast } from "react-toastify";
import { GoogleLogin } from 'react-google-login';


function Login() {
  const [cookies] = useCookies([]);
  const navigate = useNavigate();
  const responseGoogle = (response) => {
    console.log(response);
    // Handle the response from Google, e.g., send it to your server for authentication
    if (response?.tokenObj?.access_token === null) {
      if (response.errors) {
        const { email, password } = response.errors;
        if (email) generateError(email);
        else if (password) generateError(password);
      }
    } else {
      if(response?.tokenObj?.access_token){
      localStorage.setItem("jwt", response?.tokenObj?.access_token);
      navigate("/");
      }
    }
  };

  const [values, setValues] = useState({ email: "", password: "" });
  const generateError = (error) =>
    toast.error(error, {
      position: "bottom-right",
    });
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/users/login",
        {
          ...values,
        }
      );
      console.log(data);
      if (data.accessToken === null) {
        if (data.errors) {
          const { email, password } = data.errors;
          if (email) generateError(email);
          else if (password) generateError(password);
        }
      } else {
        localStorage.setItem("jwt", data.accessToken);
        navigate("/");
      }
    } catch (ex) {
      console.log(ex);
    }
  };
  return (
    <div className="container">
      <h2>Login to your Account</h2>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={(e) =>
              setValues({ ...values, [e.target.name]: e.target.value })
            }
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) =>
              setValues({ ...values, [e.target.name]: e.target.value })
            }
          />
        </div>
        <button type="submit">Submit</button>
        <GoogleLogin
          clientId="YOUR_GOOGLE_CLIENT_ID"
          buttonText="Login with Google"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
        />
        <span>
          Don't have an account ?<Link to="/register"> Register </Link>
        </span>
        <span>
          Forgot Password ?<Link to="/forgotpassword"> Reset now </Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
}

export default Login;
