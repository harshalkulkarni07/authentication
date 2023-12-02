import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin } from "react-google-login";
function Register() {
  const [cookies] = useCookies(["cookie-name"]);
  const navigate = useNavigate();
  useEffect(() => {
    if (cookies.jwt) {
      navigate("/");
    }
  }, [cookies, navigate]);

  const [values, setValues] = useState({ email: "", password: "" });
  const generateError = (error) =>
    toast.error(error, {
      position: "bottom-right",
    });

  const responseGoogle = async (response) => {
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/users/register/google",
        {
          email: response.profileObj.email,
          // You can include additional user data if needed
        }
      );

      // Handle successful registration
      console.log(data);
    } catch (error) {
      // Handle registration error
      console.error(error);
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/users/register",
        {
          ...values,
        }
      );
      if (data) {
        if (data.errors) {
          const { email, password } = data.errors;
          if (email) generateError(email);
          else if (password) generateError(password);
        } else {
          
        }
      }
      
    } catch (ex) {
      console.log(ex);
    }
    navigate("/login");
  };
  return (
    <div className="container">
      <h2>Register Account</h2>
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
          buttonText="Register with Google"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
        />
        <span>
          Already have an account ?<Link to="/login"> Login</Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
}

export default Register;
