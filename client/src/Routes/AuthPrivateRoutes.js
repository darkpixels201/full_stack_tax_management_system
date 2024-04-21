import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AuthPrivateRoutes = ({ Component }) => {
  const navigate = useNavigate();
  const user = useSelector((state) => state?.userReducer?.user);
  const token = useSelector((state) => state?.authReducer?.tokens);
  console.log("USER TYPE", user?.user?.type);

  useEffect(() => {
    if (!token) {
        navigate("/login");
    } 
    else {
      navigate('/dashboard')
    }

    // if (user?.user?.type === "user") {
    //   navigate("/dashboard");
    // }
  }, [token]);

  return (
    <>
      <Component />
    </>
  );
};

export default AuthPrivateRoutes;
