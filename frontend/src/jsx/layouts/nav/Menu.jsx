export const MenuList = () => {

const userDetails = JSON.parse(localStorage.getItem("userDetails"));
const role = userDetails?.user?.role;

return [

{
    title: "Dashboard",
    to: "dashboard",
    iconStyle: <i className="flaticon-home" />
},

// 👇 Admin Only
...(role === "admin" ? [
{
    title: "User Management",
    classsChange: "mm-collapse",
    iconStyle: <i className="flaticon-user" />,
    content: [
        {
            title: "Users",
            to: "users"
        },
        {
            title: "Create User",
            to: "create-user"
        }
    ]
}
] : []),

{
    title: "Profile",
    classsChange: "mm-collapse",
    iconStyle: <i className="flaticon-user-1" />,
    content: [
        {
            title: "My Profile",
            to: "profile"
        },
        {
            title: "Edit Profile",
            to: "edit-user"
        }
    ]
},

{
    title: "Settings",
    to: "settings",
    iconStyle: <i className="flaticon-settings" />
},

{
    title: "Logout",
    to: "logout",
    iconStyle: <i className="flaticon-logout" />
}

];

}