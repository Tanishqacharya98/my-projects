import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {

  const userDetails = JSON.parse(localStorage.getItem("userDetails"));

  if (!userDetails?.token) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default ProtectedRoute;