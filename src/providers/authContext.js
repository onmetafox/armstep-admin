import React, {createContext, useContext, useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom"

const AuthContext = createContext();

const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setToken(localStorage.getItem('token'));
    let token = localStorage.getItem('token');
    const decodedJwt = parseJwt(token);

    if (decodedJwt && decodedJwt.exp * 1000 < Date.now()) {
      navigate("/login", {replace: true})
    }
  }, [token]);

  return (
    <AuthContext.Provider
      value={{
        token,
        setToken
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => useContext(AuthContext)
