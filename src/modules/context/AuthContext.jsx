import { createContext } from "react";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext(null);

export default function AuthContextProvider(props) {
  let requestHeaders = {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  let baseUrl = "https://upskilling-egypt.com:3006/api/v1";
  const [loginData, setLoginData] = useState(true);
  const saveLoginData = () => {
    let enciodedToken = localStorage.getItem("token");
    let decodedToken = jwtDecode(enciodedToken);
    setLoginData(decodedToken);


  };
  useEffect(() => {
    if (localStorage.getItem("token")) {
      saveLoginData();
    }
  }, []);
  return (
    <AuthContext.Provider
      value={{ baseUrl, requestHeaders, loginData, saveLoginData }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
