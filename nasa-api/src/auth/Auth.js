import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

const Auth = ({ children }) => {
  const [currentToken, setCurrentToken] = useState(undefined);

  useEffect(() => {
    var token = localStorage.getItem("token");

    setTimeout(() => {
      if (token) {
        setCurrentToken(token);
      } else {
        setCurrentToken(null);
      }
    }, 2000);
  }, []);

  if (currentToken === undefined) {
    return null;
  }

  if (!currentToken) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default Auth;
