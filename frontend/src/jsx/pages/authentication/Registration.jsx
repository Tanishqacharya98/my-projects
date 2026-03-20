import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { signupAction } from "../../../store/actions/AuthActions";
import { useNavigate } from "react-router-dom";

function Registration() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const submitHandler = (e) => {

    e.preventDefault();

    dispatch(
      signupAction(
        name,
        email,
        password,
        navigate
      )
    );

  };

  return (
    <div style={{padding:"100px"}}>

      <h2>Signup</h2>

      <form onSubmit={submitHandler}>

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e)=>setName(e.target.value)}
        />

        <br/><br/>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
        />

        <br/><br/>

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
        />

        <br/><br/>

        <button type="submit">
          Signup
        </button>

      </form>

    </div>
  );
}

export default Registration;