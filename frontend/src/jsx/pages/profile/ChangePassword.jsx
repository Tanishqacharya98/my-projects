import React,{useState} from "react";
import { changePassword } from "../../../services/UserService";

function ChangePassword(){

  const [oldPassword,setOldPassword] = useState("");
  const [newPassword,setNewPassword] = useState("");

  const handleSubmit = async(e)=>{

    e.preventDefault();

    try{

      await changePassword({
        oldPassword,
        newPassword
      });

      alert("Password updated");

      setOldPassword("");
      setNewPassword("");

    }
    catch(error){
      console.log(error);
    }

  }

  return(

    <div style={{padding:"40px"}}>

      <h2>Change Password</h2>

      <form onSubmit={handleSubmit}>

        <input
          type="password"
          placeholder="Old Password"
          value={oldPassword}
          onChange={(e)=>setOldPassword(e.target.value)}
        />

        <br/><br/>

        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e)=>setNewPassword(e.target.value)}
        />

        <br/><br/>

        <button type="submit">
          Change Password
        </button>

      </form>

    </div>

  )

}

export default ChangePassword;