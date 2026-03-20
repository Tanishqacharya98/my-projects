import React,{useState,useEffect} from "react";
import { updateUser, getUsers } from "../../../services/AdminService";
import { useParams,useNavigate } from "react-router-dom";

function EditUser(){

const {id} = useParams();
const navigate = useNavigate();

const [name,setName] = useState("");
const [email,setEmail] = useState("");
const [loading,setLoading] = useState(true);

const userDetails = JSON.parse(localStorage.getItem("userDetails"));
const role = userDetails?.user?.role;

useEffect(()=>{
loadUser();
},[])

const loadUser = async()=>{

try{

const res = await getUsers(1,"");

const user = res.data.users.find(u => u._id === id);

if(user){
setName(user.name);
setEmail(user.email);
}

setLoading(false);

}
catch(error){
console.log(error);
setLoading(false);
}

}


const handleSubmit = async(e)=>{

e.preventDefault();

if(!name || !email){
alert("Please fill all fields");
return;
}

try{

await updateUser(id,{
name,
email
});

alert("User updated successfully");

navigate("/users");

}
catch(error){
console.log(error);
}

}

if(role !== "admin"){
return(
<div style={styles.denied}>
Access Denied. Admin Only.
</div>
)
}

if(loading){
return(
<div style={styles.loading}>
Loading user data...
</div>
)
}

return(

<div style={styles.container}>

<h2 style={styles.heading}>Edit User</h2>

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

<label>Email</label>

<input
type="email"
value={email}
onChange={(e)=>setEmail(e.target.value)}
style={styles.input}
/>

</div>

<button style={styles.btn}>
Update User
</button>

<button
type="button"
style={styles.cancelBtn}
onClick={()=>navigate("/users")}
>
Cancel
</button>

</form>

</div>

</div>

)

}

const styles={

container:{
padding:"40px",
maxWidth:"600px"
},

heading:{
marginBottom:"20px",
fontSize:"22px"
},

card:{
background:"#fff",
padding:"25px",
borderRadius:"10px",
boxShadow:"0 4px 12px rgba(0,0,0,0.08)"
},

inputGroup:{
marginBottom:"15px",
display:"flex",
flexDirection:"column"
},

input:{
padding:"10px",
border:"1px solid #ddd",
borderRadius:"6px",
fontSize:"14px"
},

btn:{
marginTop:"10px",
background:"#2563eb",
color:"white",
border:"none",
padding:"10px 16px",
borderRadius:"6px",
cursor:"pointer",
marginRight:"10px"
},

cancelBtn:{
marginTop:"10px",
background:"#6b7280",
color:"white",
border:"none",
padding:"10px 16px",
borderRadius:"6px",
cursor:"pointer"
},

loading:{
padding:"40px",
fontSize:"18px"
},

denied:{
padding:"40px",
color:"red",
fontSize:"18px"
}

};

export default EditUser;