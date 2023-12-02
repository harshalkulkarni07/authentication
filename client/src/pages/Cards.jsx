import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

export default function Cards() {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies([]);
  useEffect(() => {
    const verifyUser = async () => {
      
      if (!localStorage.getItem("jwt")) {
        navigate("/login");
      }  else
          toast(`Hi  🦄`, {
            theme: "dark",
          });
      
    };
    verifyUser();
  }, [cookies, navigate, removeCookie]);

  const logOut = () => {
    removeCookie("jwt");
    localStorage.removeItem("jwt")
    navigate("/login");
  };
  return (
    <>
      <div className="private">
        <h1>Super Secret Page</h1>
        <button onClick={logOut}>Log out</button>
      </div>
      <ToastContainer />
    </>
  );
}
