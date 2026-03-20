import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginAction } from "../../../store/actions/AuthActions";
import { useNavigate } from "react-router-dom";

function Login() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(
      loginAction(
        email,
        password,
        navigate
      )
    );
  };

  const handleGoogleLogin = () => {
    window.location.href =
      "http://localhost:5000/api/auth/google";
  };

  return (

    <div style={styles.container}>

      <div style={styles.card}>

        <h2 style={styles.title}>Login</h2>

        <form onSubmit={submitHandler} style={styles.form}>

          <input
            style={styles.input}
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />

          <input
            style={styles.input}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          />

          <button type="submit" style={styles.loginBtn}>
            Login
          </button>

        </form>

        <button
          style={styles.googleBtn}
          onClick={handleGoogleLogin}
        >
          Login with Google
        </button>

        <p style={{marginTop:"20px"}}>
          Don't have an account?{" "}
          <span
            style={styles.register}
            onClick={()=>navigate("/register")}
          >
            Register
          </span>
        </p>

      </div>

    </div>
  );
}

const styles = {

  container:{
    height:"100vh",
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    background:"#f4f6f8"
  },

  card:{
    width:"350px",
    padding:"30px",
    background:"white",
    borderRadius:"10px",
    boxShadow:"0 4px 12px rgba(0,0,0,0.1)",
    textAlign:"center"
  },

  title:{
    marginBottom:"20px"
  },

  form:{
    display:"flex",
    flexDirection:"column",
    gap:"15px"
  },

  input:{
    padding:"10px",
    border:"1px solid #ccc",
    borderRadius:"5px",
    fontSize:"14px"
  },

  loginBtn:{
    padding:"10px",
    border:"none",
    background:"#1976d2",
    color:"white",
    borderRadius:"5px",
    cursor:"pointer",
    fontWeight:"bold"
  },

  googleBtn:{
    marginTop:"15px",
    padding:"10px",
    width:"100%",
    border:"none",
    background:"#db4437",
    color:"white",
    borderRadius:"5px",
    cursor:"pointer",
    fontWeight:"bold"
  },

  register:{
    color:"#1976d2",
    cursor:"pointer",
    fontWeight:"bold"
  }

};

export default Login;