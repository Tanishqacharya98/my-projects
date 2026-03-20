import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Logout() {

  const navigate = useNavigate();

  useEffect(() => {

    // remove token / user data
    localStorage.removeItem("userDetails");

    // redirect to login page
    navigate("/login");

  }, []);

  return null;
}

export default Logout;