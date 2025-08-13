import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Box, Typography, Paper, CircularProgress, Button, Alert, Stack } from '@mui/material';

const PaymentSuccess = () => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const locationParam = new URLSearchParams(search).get("location");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const bookingData = JSON.parse(localStorage.getItem("pendingBooking"));
    const token = localStorage.getItem("token");

    if (bookingData && token) {
      axios.post('http://localhost:5000/api/book', bookingData, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        setSuccess(true);
        setLoading(false);
        localStorage.removeItem("pendingBooking");
        // 3 सेकंड बाद MyBookings पर redirect
        setTimeout(() => {
          navigate('/my-bookings');
        }, 3000);
      })
      .catch(() => {
        setError("Booking failed! Please try again.");
        setLoading(false);
      });
    } else {
      setError("Missing booking data or not authenticated.");
      setLoading(false);
    }
  }, [locationParam, navigate]);

  return (
    <Box
      sx={{
        minHeight: '70vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        bgcolor: '#f5f7fa',
        px: 2,
      }}
    >
      <Paper
        elevation={4}
        sx={{
          p: 4,
          maxWidth: 400,
          width: '100%',
          textAlign: 'center',
          borderRadius: 3,
        }}
      >
        {loading ? (
          <Stack spacing={3} alignItems="center">
            <CircularProgress color="primary" size={60} />
            <Typography variant="h6" color="text.secondary">
              Processing your booking...
            </Typography>
          </Stack>
        ) : error ? (
          <>
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
            <Button variant="contained" color="primary" onClick={() => navigate('/')}>
              Go to Home
            </Button>
          </>
        ) : (
          <>
            <Typography variant="h4" color="success.main" gutterBottom>
              ✅ Payment Successful!
            </Typography>
            <Typography variant="body1" sx={{ mb: 3 }}>
              Your booking has been confirmed.
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              You will be redirected to your bookings page shortly.
            </Typography>
            <Button variant="contained" color="primary" onClick={() => navigate('/my-bookings')}>
              Go to My Bookings Now
            </Button>
          </>
        )}
      </Paper>
    </Box>
  );
};

export default PaymentSuccess;
