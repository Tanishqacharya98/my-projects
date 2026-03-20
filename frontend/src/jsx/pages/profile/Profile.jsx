import React, { useEffect, useState } from "react";
import { getProfile, updateProfile, uploadProfilePicture } from "../../../services/UserService";
import { endImpersonation } from "../../../services/AdminService";
import ChangePassword from "./ChangePassword";

function Profile() {

const [name,setName] = useState("");
const [phone,setPhone] = useState("");
const [bio,setBio] = useState("");
const [image,setImage] = useState(null);

useEffect(()=>{
loadProfile();
},[])

const loadProfile = async()=>{
try{
const res = await getProfile();
setName(res.data.name || "");
setPhone(res.data.phone || "");
setBio(res.data.bio || "");
}
catch(error){
console.log(error);
}
}

const handleSubmit = async(e)=>{
e.preventDefault();

try{
await updateProfile({
name,
phone,
bio
});
alert("Profile updated");
}
catch(error){
console.log(error);
}
}

const handleImageUpload = async () => {

const formData = new FormData();
formData.append("profilePicture", image);

try {

const res = await uploadProfilePicture(formData);

const newImage = res.data.profilePicture;

const userDetails = JSON.parse(localStorage.getItem("userDetails"));

userDetails.user.profilePicture = newImage;

localStorage.setItem("userDetails", JSON.stringify(userDetails));

alert("Profile picture updated");

window.location.reload();

}
catch(error){
console.log(error);
}

};

const handleEndImpersonation = async () => {

const logId = localStorage.getItem("impersonationLogId");

const res = await endImpersonation(logId);

const userDetails = {
token: res.data.token,
user: res.data.user
};

localStorage.setItem("userDetails", JSON.stringify(userDetails));

localStorage.removeItem("impersonationLogId");

window.location.reload();

};

return(

<div style={styles.container}>

<h2 style={styles.heading}>Profile Settings</h2>

{localStorage.getItem("impersonationLogId") && (
<button style={styles.adminBtn} onClick={handleEndImpersonation}>
Switch Back To Admin
</button>
)}

<div style={styles.card}>

<form onSubmit={handleSubmit}>

<div style={styles.inputGroup}>

<label>Name</label>

<input
type="text"
value={name}
onChange={(e)=>setName(e.target.value)}
style={styles.input}
/>

</div>


<div style={styles.inputGroup}>

<label>Phone</label>

<input
type="text"
value={phone}
onChange={(e)=>setPhone(e.target.value)}
style={styles.input}
/>

</div>


<div style={styles.inputGroup}>

<label>Bio</label>

<textarea
value={bio}
onChange={(e)=>setBio(e.target.value)}
style={styles.textarea}
/>

</div>


<button style={styles.updateBtn}>
Update Profile
</button>

</form>

</div>


<div style={styles.card}>

<h4 style={{marginBottom:"15px"}}>Profile Picture</h4>

<input
type="file"
onChange={(e)=>setImage(e.target.files[0])}
/>

<button style={styles.uploadBtn} onClick={handleImageUpload}>
Upload Picture
</button>

</div>


<div style={styles.card}>

<ChangePassword />

</div>


</div>

)

}

const styles = {

container:{
padding:"30px",
maxWidth:"700px"
},

heading:{
marginBottom:"20px"
},

card:{
background:"#fff",
padding:"25px",
borderRadius:"10px",
boxShadow:"0 4px 12px rgba(0,0,0,0.08)",
marginBottom:"20px"
},

inputGroup:{
marginBottom:"15px",
display:"flex",
flexDirection:"column"
},

input:{
padding:"10px",
borderRadius:"6px",
border:"1px solid #ddd"
},

textarea:{
padding:"10px",
borderRadius:"6px",
border:"1px solid #ddd",
minHeight:"80px"
},

updateBtn:{
background:"#2563eb",
color:"white",
border:"none",
padding:"10px 16px",
borderRadius:"6px",
cursor:"pointer"
},

uploadBtn:{
marginTop:"10px",
background:"#10b981",
color:"white",
border:"none",
padding:"10px 16px",
borderRadius:"6px",
cursor:"pointer"
},

adminBtn:{
background:"#ef4444",
color:"white",
border:"none",
padding:"10px 16px",
borderRadius:"6px",
cursor:"pointer",
marginBottom:"20px"
}

};

export default Profile;