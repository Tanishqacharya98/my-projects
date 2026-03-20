import React from "react";

function Home() {

const userDetails = JSON.parse(localStorage.getItem("userDetails"));
const user = userDetails?.user;

const isAdmin = user?.role === "admin";

const styles = {

cardContainer:{
display:"flex",
gap:"20px",
marginTop:"25px",
flexWrap:"wrap"
},

card:{
flex:"1",
minWidth:"250px",
background:"#fff",
padding:"25px",
borderRadius:"10px",
boxShadow:"0 4px 12px rgba(0,0,0,0.08)",
transition:"all 0.3s ease",
cursor:"pointer"
},

cardHover:{
transform:"translateY(-6px)",
boxShadow:"0 8px 18px rgba(0,0,0,0.15)"
},

title:{
fontSize:"18px",
fontWeight:"600",
marginBottom:"10px"
},

desc:{
fontSize:"14px",
color:"#555",
lineHeight:"1.6"
}

};

return (
<>

<div className="page-head">
<div className="row">

<div className="col-sm-6 mb-sm-4 mb-3">

<h3 className="mb-0">
Welcome {isAdmin ? "Admin" : "User"} {user?.name}
</h3>

<p className="mb-0">
{isAdmin
? "You have full control over the system. Manage users and monitor activity."
: "Manage your account, update your profile and keep your information secure."}
</p>

</div>

</div>
</div>


<div style={styles.cardContainer}>

{/* CARD 1 */}

<div
style={styles.card}
onMouseEnter={e=>{
e.currentTarget.style.transform="translateY(-6px)";
e.currentTarget.style.boxShadow="0 8px 18px rgba(0,0,0,0.15)";
}}
onMouseLeave={e=>{
e.currentTarget.style.transform="translateY(0)";
e.currentTarget.style.boxShadow="0 4px 12px rgba(0,0,0,0.08)";
}}
>

<div style={styles.title}>
{isAdmin ? "User Management" : "Profile Management"}
</div>

<div style={styles.desc}>

{isAdmin
? "View all users, search them, create new users, edit details and manage access permissions."
: "Update your personal information such as name, phone number, bio and profile picture."}

</div>

</div>


{/* CARD 2 */}

<div
style={styles.card}
onMouseEnter={e=>{
e.currentTarget.style.transform="translateY(-6px)";
e.currentTarget.style.boxShadow="0 8px 18px rgba(0,0,0,0.15)";
}}
onMouseLeave={e=>{
e.currentTarget.style.transform="translateY(0)";
e.currentTarget.style.boxShadow="0 4px 12px rgba(0,0,0,0.08)";
}}
>

<div style={styles.title}>
{isAdmin ? "Access Control" : "Account Security"}
</div>

<div style={styles.desc}>

{isAdmin
? "Block or unblock users, manage roles and control system access securely."
: "Change your password regularly and keep your account safe from unauthorized access."}

</div>

</div>


{/* CARD 3 */}

<div
style={styles.card}
onMouseEnter={e=>{
e.currentTarget.style.transform="translateY(-6px)";
e.currentTarget.style.boxShadow="0 8px 18px rgba(0,0,0,0.15)";
}}
onMouseLeave={e=>{
e.currentTarget.style.transform="translateY(0)";
e.currentTarget.style.boxShadow="0 4px 12px rgba(0,0,0,0.08)";
}}
>

<div style={styles.title}>
{isAdmin ? "Impersonation Tool" : "Profile Customization"}
</div>

<div style={styles.desc}>

{isAdmin
? "Temporarily log in as another user to troubleshoot or verify user issues."
: "Upload a profile picture, update your bio and personalize your account."}

</div>

</div>

</div>

</>
)

}

export default Home;