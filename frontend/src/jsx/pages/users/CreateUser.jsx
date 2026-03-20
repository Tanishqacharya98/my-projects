import React, { useState } from "react";
import { createUser } from "../../../services/AdminService";

function CreateUser(){

  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const handleSubmit = async(e)=>{

    e.preventDefault();

    try{

      await createUser({
        name,
        email,
        password
      });

      alert("User created successfully");

      setName("");
      setEmail("");
      setPassword("");

    }
    catch(error){
      console.log(error);
    }

  }

  return(

    <div style={{padding:"40px"}}>

      <h2>Create User</h2>

      <form onSubmit={handleSubmit}>

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
          Create User
        </button>

      </form>

    </div>

  )

}

export default CreateUser;