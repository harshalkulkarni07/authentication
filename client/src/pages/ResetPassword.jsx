import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { ToastContainer, toast } from 'react-toastify';

function ResetPassword() {
  const [cookies] = useCookies([]);
  const navigate = useNavigate();
  const location = useLocation();

  const [values, setValues] = useState({ email: '', password: '' });
  const generateError = (error) =>
    toast.error(error, {
      position: 'bottom-right',
    });

  useEffect(() => {
    // Extract email and token from the URL parameters
    const searchParams = new URLSearchParams(location.search);
    const email = searchParams.get('email');
    const token = searchParams.get('token');

    // Pre-fill the email field
    setValues({ ...values, email });

    // You might want to validate the token here
    // and show an error message if the token is invalid or expired
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await axios.post('http://localhost:5000/api/users/resetpassword', {
        ...values,
      });

      toast.success(data.message, {
        position: 'bottom-right',
      });

      navigate('/login');
    } catch (ex) {
      console.log(ex);

      if (ex.response && ex.response.data && ex.response.data.errors) {
        const { email, password } = ex.response.data.errors;
        if (email) generateError(email);
        else if (password) generateError(password);
      } else {
        generateError('An error occurred during password reset');
      }
    }
    navigate("/")
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
            placeholder="Enter your email"
            value={values.email}
            onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="password">New Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your new password"
            onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })}
          />
        </div>
        <button type="submit">Reset Password</button>
        <span>
          Don't have an account ?<Link to="/register"> Register </Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
}

export default ResetPassword;
