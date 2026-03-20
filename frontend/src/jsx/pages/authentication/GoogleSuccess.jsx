import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginConfirmedAction } from "../../../store/actions/AuthActions";

function GoogleSuccess(){

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(()=>{

    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    console.log("TOKEN FROM URL:", token);

    if(token){

      const userDetails = {
        token: token,
        user: {}
      };

      localStorage.setItem(
        "userDetails",
        JSON.stringify(userDetails)
      );

      dispatch(loginConfirmedAction(userDetails));

      navigate("/users");

    }

  },[])

  return(
    <div style={{padding:"100px"}}>
      <h2>Logging you in...</h2>
    </div>
  )

}

export default GoogleSuccess;