import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { ToastContainer, toast } from "react-toastify";

function ForgotPassword() {
  const [cookies] = useCookies([]);
  const navigate = useNavigate();

  const [values, setValues] = useState({ email: "", password: "" });
  const generateError = (error) =>
    toast.error(error, {
      position: "bottom-right",
    });
  const handleSubmit = async (event) => {
    event.preventDefault();
    // try {
    //   const { data } = await axios.post(
    //     "http://localhost:5000/api/users/forgotpassword",
    //     {
    //       ...values,
    //     }
    //   );
    //   console.log(data)
    //   if (data.accessToken ===null) {
    //     if (data.errors) {
    //       const { email, password } = data.errors;
    //       if (email) generateError(email);
    //       else if (password) generateError(password);
    //     } 
    //   }else {
    //     localStorage.setItem("jwt",data.accessToken)
    //     navigate("/");
    //   }
    // } catch (ex) {
    //   console.log(ex);
    // }
  };
  return (
    <div className="container">
      <h2>Reset Password</h2>
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
        <button type="submit">Submit</button>
        <span>
          Don't have an account ?<Link to="/register"> Register </Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
}

export default ForgotPassword;
