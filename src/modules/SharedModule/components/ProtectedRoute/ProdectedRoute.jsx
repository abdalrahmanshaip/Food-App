import { Navigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
export default function ProdectedRoute({ loginData, children }) {
  if (localStorage.getItem("token") || loginData) {
    return children;
  } else return <Navigate to="/login" />;
}
