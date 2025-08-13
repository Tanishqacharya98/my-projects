import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './adminpanel.css'; 

const AdminPanel = () => {
  const [bookings, setBookings] = useState([]);

 useEffect(() => {
  const fetchBookings = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Unauthorized! Please login as admin.');
      return;
    }

    try {
      const res = await axios.get('http://localhost:5000/api/bookings', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBookings(res.data);
    } catch (err) {
      console.error('Error fetching bookings:', err);
      alert(err.response?.data?.message || 'Access denied or fetch failed');
    }
  };

  fetchBookings();
}, []);


  return (
    <div className="admin-panel">
      <h2>Hostel Bookings</h2>
      <table>
        <thead>
          <tr>
            <th>User</th>
            <th>Phone</th>
            <th>Hostel</th>
            <th>Location</th>
            <th>Booked At</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((b, index) => (
            <tr key={index}>
              <td>{b.userName}</td>
             <td>{b.phone}</td>
              <td>{b.hostel}</td>
              <td>{b.location}</td>
              <td>{new Date(b.date).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPanel;
