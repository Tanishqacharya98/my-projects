import React, { useEffect, useState } from "react";
import {
  getUsers,
  deleteUser,
  toggleBlockUser,
  impersonateUser,
} from "../../../services/AdminService";

import { useNavigate } from "react-router-dom";

function UserList() {

  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const navigate = useNavigate();

  const userDetails = JSON.parse(localStorage.getItem("userDetails"));
  const role = userDetails?.user?.role;

  // 🚫 Only Admin Access
  if (role !== "admin") {
    return (
      <div style={styles.denied}>
        Access Denied. Admin Only.
      </div>
    );
  }

  useEffect(() => {
    loadUsers();
  }, [page, search]);

  const loadUsers = async () => {
    try {
      const res = await getUsers(page, search);
      setUsers(res.data.users);
      setTotalPages(res.data.totalPages);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this user?")) {
      await deleteUser(id);
      loadUsers();
    }
  };

  const handleBlock = async (id) => {
    await toggleBlockUser(id);
    loadUsers();
  };

  const handleImpersonate = async (id) => {

    const res = await impersonateUser(id);

    const userDetails = {
      token: res.data.token,
      user: res.data.user
    };

    localStorage.setItem("userDetails", JSON.stringify(userDetails));
    localStorage.setItem("impersonationLogId", res.data.impersonationLogId);

    alert("Now impersonating " + res.data.user.name);

  navigate("/profile");   // redirect to user dashboard
  };

  return (

    <div style={styles.container}>

      <h2 style={styles.heading}>User Management</h2>

      <div style={styles.topBar}>

        <button
          style={styles.createBtn}
          onClick={() => navigate("/create-user")}
        >
          + Create User
        </button>

        <input
          style={styles.search}
          placeholder="Search user..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

      </div>

      <table style={styles.table}>

        <thead>
          <tr>
            <th style={styles.th}>User</th>
            <th style={styles.th}>Email</th>
            <th style={styles.th}>Status</th>
            <th style={styles.th}>Actions</th>
          </tr>
        </thead>

        <tbody>

          {users.map((user) => (

            <tr key={user._id}>

              <td style={styles.td}>

                <div style={styles.userCell}>

                  {user.profilePicture ? (
                    <img
                      src={`http://localhost:5000/${user.profilePicture}`}
                      alt=""
                      style={styles.avatar}
                    />
                  ) : (
                    <div style={styles.placeholder}>
                      {user.name?.charAt(0)}
                    </div>
                  )}

                  {user.name}

                </div>

              </td>

              <td style={styles.td}>{user.email}</td>

              <td style={styles.td}>
                <span style={user.isBlocked ? styles.blocked : styles.active}>
                  {user.isBlocked ? "Blocked" : "Active"}
                </span>
              </td>

              <td style={styles.td}>

                <button
                  style={{ ...styles.actionBtn, ...styles.blockBtn }}
                  onClick={() => handleBlock(user._id)}
                >
                  {user.isBlocked ? "Unblock" : "Block"}
                </button>

                <button
                  style={{ ...styles.actionBtn, ...styles.editBtn }}
                  onClick={() => navigate(`edit-user/${user._id}`)}
                >
                  Edit
                </button>

                <button
                  style={{ ...styles.actionBtn, ...styles.deleteBtn }}
                  onClick={() => handleDelete(user._id)}
                >
                  Delete
                </button>

                <button
                  style={{ ...styles.actionBtn, ...styles.impersonateBtn }}
                  onClick={() => handleImpersonate(user._id)}
                >
                  Impersonate
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

      <div style={styles.pagination}>

        <button
          style={styles.pageBtn}
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Prev
        </button>

        <span>
          Page {page} / {totalPages}
        </span>

        <button
          style={styles.pageBtn}
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>

      </div>

    </div>
  );
}

const styles = {

  container: {
    padding: "30px",
    fontFamily: "Inter, sans-serif",
    background: "#f9fafb",
    minHeight: "100vh"
  },

  denied: {
    padding: "40px",
    fontSize: "20px",
    color: "red"
  },

  heading: {
    fontSize: "24px",
    fontWeight: "600",
    marginBottom: "20px"
  },

  topBar: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "20px",
    alignItems: "center"
  },

  createBtn: {
    background: "#2563eb",
    color: "white",
    border: "none",
    padding: "10px 18px",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "500"
  },

  search: {
    padding: "10px",
    width: "260px",
    borderRadius: "6px",
    border: "1px solid #ddd",
    outline: "none"
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
    background: "white",
    borderRadius: "8px",
    overflow: "hidden",
    boxShadow: "0 4px 12px rgba(0,0,0,0.05)"
  },

  th: {
    textAlign: "left",
    padding: "14px",
    background: "#f3f4f6",
    fontSize: "14px"
  },

  td: {
    padding: "14px",
    borderBottom: "1px solid #f1f1f1",
    fontSize: "14px"
  },

  userCell: {
    display: "flex",
    alignItems: "center",
    gap: "10px"
  },

  avatar: {
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    objectFit: "cover"
  },

  placeholder: {
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    background: "#e5e7eb",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "600"
  },

  active: {
    background: "#dcfce7",
    color: "#166534",
    padding: "5px 12px",
    borderRadius: "20px",
    fontSize: "12px"
  },

  blocked: {
    background: "#fee2e2",
    color: "#991b1b",
    padding: "5px 12px",
    borderRadius: "20px",
    fontSize: "12px"
  },

  actionBtn: {
    marginRight: "6px",
    padding: "6px 10px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "12px"
  },

  blockBtn: { background: "#f59e0b", color: "white" },
  editBtn: { background: "#3b82f6", color: "white" },
  deleteBtn: { background: "#ef4444", color: "white" },
  impersonateBtn: { background: "#6b7280", color: "white" },

  pagination: {
    marginTop: "20px",
    display: "flex",
    gap: "10px",
    alignItems: "center"
  },

  pageBtn: {
    padding: "6px 12px",
    border: "1px solid #ddd",
    background: "white",
    cursor: "pointer",
    borderRadius: "4px"
  }

};

export default UserList;