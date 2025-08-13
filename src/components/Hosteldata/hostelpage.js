import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Hosteldata from './hosteldata';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Modal,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Paper,
} from '@mui/material';
import { LocationOn, Star, LocalOffer, MonetizationOn, FilterList } from '@mui/icons-material';
import './hostelPage.css';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  background: 'linear-gradient(135deg, #2ec785, #d4fc79)',
  borderRadius: 8,
  boxShadow: 24,
  padding: 24,
};

const HostelPage = () => {
  const { location } = useParams();
  const navigate = useNavigate();

  const [hostels, setHostels] = useState([]);
  const [sort, setSort] = useState('');
  const [feature, setFeature] = useState('all');
  const [gender, setGender] = useState('all');
  const [selectedHostel, setSelectedHostel] = useState(null);
  const [formData, setFormData] = useState({ name: '', phone: '' });

  const userRole = localStorage.getItem('role');
  const token = localStorage.getItem('token');

  useEffect(() => {
    let data = Hosteldata[location.toLowerCase()] || [];

    if (gender !== 'all') {
      data = data.filter((hostel) => hostel.gender === gender);
    }

    if (feature !== 'all') {
      data = data.filter((hostel) => hostel.features.includes(feature));
    }

    if (sort === 'low') {
      data = [...data].sort((a, b) => a.price - b.price);
    } else if (sort === 'high') {
      data = [...data].sort((a, b) => b.price - a.price);
    } else if (sort === 'rating') {
      data = [...data].sort((a, b) => b.rating - a.rating);
    }

    setHostels(data);
  }, [location, sort, feature, gender]);

  const handleBookClick = (hostel) => {
    if (!token) {
      navigate('/auth');
      return;
    }
    setSelectedHostel(hostel);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        'http://localhost:5000/api/create-checkout-session',
        {
          amount: selectedHostel.price,
          hostelName: selectedHostel.name,
          location,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      localStorage.setItem('pendingBooking', JSON.stringify({
        hostel: selectedHostel.name,
        location,
        name: formData.name,
        phone: formData.phone,
      }));

      window.location.href = res.data.url;

    } catch (err) {
      console.error('Payment initiation failed:', err);
      alert('Failed to start payment process.');
    }
  };

  return (
    <div className="hostel-page-wrapper">
      {/* 🌄 Background Image */}
      <div className="hostel-background-image" />

      <div className="hostel-page-container">
        <Typography variant="h4" gutterBottom className="hostel-heading">
          Hostels in {location}
        </Typography>

        <Paper elevation={3} sx={{ p: 2, mb: 3, borderRadius: 3, background: 'linear-gradient(135deg, #2ec785, #d4fc79)' }}>
          <Box display="flex" flexWrap="wrap" gap={2} alignItems="center" justifyContent="space-between">
            <Box display="flex" gap={2} alignItems="center">
              <FilterList />
              <FormControl variant="outlined" size="small" sx={{ minWidth: 140, backgroundColor: '#fff', borderRadius: 1 }}>
                <InputLabel>Sort</InputLabel>
                <Select value={sort} label="Sort" onChange={(e) => setSort(e.target.value)}>
                  <MenuItem value="">None</MenuItem>
                  <MenuItem value="rating">Rating</MenuItem>
                  <MenuItem value="low">Price: Low to High</MenuItem>
                  <MenuItem value="high">Price: High to Low</MenuItem>
                </Select>
              </FormControl>

              <FormControl variant="outlined" size="small" sx={{ minWidth: 140, backgroundColor: '#fff', borderRadius: 1 }}>
                <Select value={feature} onChange={(e) => setFeature(e.target.value)}>
                  <MenuItem value="all">All Features</MenuItem>
                  <MenuItem value="WiFi">WiFi</MenuItem>
                  <MenuItem value="AC">AC</MenuItem>
                  <MenuItem value="Laundry">Laundry</MenuItem>
                  <MenuItem value="Food">Food</MenuItem>
                </Select>
              </FormControl>
            </Box>

            <ToggleButtonGroup
              value={gender}
              exclusive
              onChange={(e, value) => value && setGender(value)}
              size="small"
              sx={{ backgroundColor: '#fff', borderRadius: 2 }}
            >
              <ToggleButton value="all">All</ToggleButton>
              <ToggleButton value="boys">👦 Boys</ToggleButton>
              <ToggleButton value="girls">👧 Girls</ToggleButton>
            </ToggleButtonGroup>
          </Box>
        </Paper>

        <Grid container spacing={3}>
          {hostels.length > 0 ? (
            hostels.map((h, i) => (
              <Grid item xs={12} sm={6} md={4} key={i}>
                <Card className="hostel-card">
                  <CardMedia
                    component="img"
                    height="180"
                    image={h.image}
                    alt={h.name}
                  />
                  <CardContent>
                    <Typography variant="h6">{h.name}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      <LocationOn fontSize="small" /> {h.address}
                    </Typography>
                    <Typography variant="body2">
                      <Star color="warning" /> Rating: {h.rating}
                    </Typography>
                    <Typography variant="body2">
                      <MonetizationOn color="success" /> ₹{h.price}
                    </Typography>
                    <Typography variant="body2">
                      <LocalOffer /> Features: {(h.features || []).join(', ')}
                    </Typography>

                    {userRole !== 'admin' && (
                      <Button variant="contained" fullWidth sx={{ mt: 2 }} onClick={() => handleBookClick(h)}>
                        Book Now
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            ))
          ) : (
            <Typography>No hostels found.</Typography>
          )}
        </Grid>

       <Modal
  open={!!selectedHostel}
  onClose={() => setSelectedHostel(null)}
  aria-labelledby="modal-title"
  aria-describedby="modal-description"
>
  <Box className="booking-modal">
    <Typography id="modal-title" variant="h6" component="h2">
      Book {selectedHostel?.name}
    </Typography>
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}
    >
      <TextField
        label="Your Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        required
      />
      <TextField
        label="Phone Number"
        type="tel"
        value={formData.phone}
        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        required
      />
      <Button variant="contained" type="submit">Pay & Book</Button>
      <Button variant="outlined" onClick={() => setSelectedHostel(null)}>Cancel</Button>
    </Box>
  </Box>
</Modal>

      </div>
    </div>
  );
};

export default HostelPage;
