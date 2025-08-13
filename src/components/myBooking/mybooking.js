import React, { useEffect, useState, useMemo } from 'react';
import './mybooking.css'
import axios from 'axios';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Fade,
  FormControl,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  Skeleton,
  Stack,
  TextField,
  Typography,
  Snackbar,
  ThemeProvider,
  createTheme,
} from '@mui/material';
import Hosteldata from '../Hosteldata/hosteldata';
// MUI Theme
const theme = createTheme({
  palette: {
    primary: { main: '#1976d2' },
    error: { main: '#d32f2f' },
    success: { main: '#388e3c' },
    warning: { main: '#fbc02d' },
    background: { default: '#f9f9f9' },
  },
  typography: { fontFamily: "'Roboto', sans-serif" },
  shape: { borderRadius: 12 },
});

// Status colors mapping for badges
const statusColors = {
  booked: 'success',
  cancelled: 'error',
  pending: 'warning',
};

const paymentStatusColors = {
  paid: 'success',
  unpaid: 'error',
  pending: 'warning',
};

const BOOKINGS_PER_PAGE = 5;

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // UI control states
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [sortOrder, setSortOrder] = useState('desc'); // date desc by default

  const [cancelDialog, setCancelDialog] = useState({ open: false, bookingId: null });
  const [detailsModal, setDetailsModal] = useState({ open: false, booking: null });
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/my-bookings', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBookings(res.data);
    } catch (err) {
      setSnackbar({ open: true, message: 'Failed to load bookings', severity: 'error' });
    } finally {
      setLoading(false);
    }
  };

  // Cancel booking with confirmation modal
  const cancelBooking = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/my-bookings/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSnackbar({ open: true, message: 'Booking cancelled', severity: 'success' });
      fetchBookings();
    } catch (err) {
      setSnackbar({ open: true, message: 'Error cancelling booking', severity: 'error' });
    }
  };

  // Helper: get image from Hosteldata or fallback
  const getHostelImage = (booking) => {
    if (!booking.location || !booking.hostel) return '/photos/default.jpg';

    const locationKey = booking.location.trim().toLowerCase();
    const hostelsAtLocation = Hosteldata[locationKey];
    if (!hostelsAtLocation) return '/photos/default.jpg';

    const matchedHostel = hostelsAtLocation.find(
      (h) => h.name.trim().toLowerCase() === booking.hostel.trim().toLowerCase()
    );

    return matchedHostel ? matchedHostel.image : '/photos/default.jpg';
  };

  // Filter + Search + Sort logic using useMemo for performance
  const filteredBookings = useMemo(() => {
    let filtered = [...bookings];

    if (searchTerm.trim() !== '') {
      const lowerSearch = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (b) =>
          b.name.toLowerCase().includes(lowerSearch) ||
          b.hostel.toLowerCase().includes(lowerSearch) ||
          b.location.toLowerCase().includes(lowerSearch)
      );
    }

    if (statusFilter) {
      filtered = filtered.filter((b) => b.status === statusFilter);
    }

    filtered.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    });

    return filtered;
  }, [bookings, searchTerm, statusFilter, sortOrder]);

  const totalPages = Math.ceil(filteredBookings.length / BOOKINGS_PER_PAGE);

  const displayedBookings = filteredBookings.slice(
    (page - 1) * BOOKINGS_PER_PAGE,
    page * BOOKINGS_PER_PAGE
  );

  // Event handlers
  const openCancelDialog = (bookingId) => setCancelDialog({ open: true, bookingId });
  const confirmCancelBooking = () => {
    cancelBooking(cancelDialog.bookingId);
    setCancelDialog({ open: false, bookingId: null });
  };
  const openDetails = (booking) => setDetailsModal({ open: true, booking });
  const closeDetails = () => setDetailsModal({ open: false, booking: null });
  const handleCloseSnackbar = () => setSnackbar({ ...snackbar, open: false });

  return (
    <ThemeProvider theme={theme}>
      <Box
    sx={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '50vh',
      zIndex: -2,
    }}
  >
    <Box
      sx={{
        width: '100%',
        height: '100vh',
        backgroundImage: 'url(https://cdn.pixabay.com/animation/2023/01/24/22/38/22-38-59-658_512.gif)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        filter: 'brightness(0.7)', // dark overlay
        marginTop:'17vh'
      }}
    />
  </Box>

  {/* Content container with less or no top padding */}
  <Container
    maxWidth="md"
    sx={{
       pt: 2,
  position: 'relative',
  // zIndex: -2,
  backgroundColor: 'rgba(255, 255, 255, 0.4)',  // हल्का ट्रांसपेरेंट व्हाइट
  borderRadius: 2,
  boxShadow: 3,
  color: 'black',
      // marginTop: '45vh',
    }}
  >
    <Typography
      variant="h4"
      gutterBottom
      fontWeight={700}
      textAlign="center"
      sx={{ mb: 3 }}
    >
      My Bookings
    </Typography>
        {/* Search, Filter, Sort Controls */}
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          mb={4}
          justifyContent="space-between"
          alignItems="center"
        >
          <TextField
            label="Search by name, hostel, location"
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setPage(1); // reset page on search
            }}
            sx={{ flex: 1, minWidth: 200 }}
          />

          <FormControl size="small" sx={{ minWidth: 130 }}>
            <InputLabel>Status</InputLabel>
            <Select
              label="Status"
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setPage(1);
              }}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="booked">Booked</MenuItem>
              <MenuItem value="cancelled">Cancelled</MenuItem>
              <MenuItem value="pending">Pending</MenuItem>
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ minWidth: 140 }}>
            <InputLabel>Sort by Date</InputLabel>
            <Select
              label="Sort by Date"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <MenuItem value="asc">Oldest First</MenuItem>
              <MenuItem value="desc">Newest First</MenuItem>
            </Select>
          </FormControl>
        </Stack>

        {/* Loading Skeleton */}
        {loading ? (
          Array.from(new Array(BOOKINGS_PER_PAGE)).map((_, idx) => (
            <Skeleton
              key={idx}
              variant="rectangular"
              height={120}
              sx={{ borderRadius: 2, mb: 3 }}
            />
          ))
        ) : filteredBookings.length === 0 ? (
          <Box textAlign="center" mt={6}>
            <Typography variant="h6" gutterBottom>
              No bookings found.
            </Typography>
            <Button variant="contained" color="primary" href="/">
              Book Now
            </Button>
          </Box>
        ) : (
          <>
            <Stack spacing={3}>
              {displayedBookings.map((b) => {
                const isUpcoming = new Date(b.date) > new Date();
                return (
                  <Fade key={b._id} in timeout={500}>
                    <Card
                      sx={{
                        display: 'flex',
                        cursor: 'pointer',
                        transition: 'transform 0.3s, box-shadow 0.3s',
                        borderLeft: isUpcoming ? '5px solid #1976d2' : 'none',
                        boxShadow: isUpcoming ? 4 : 1,
                        '&:hover': {
                          transform: 'scale(1.03)',
                          boxShadow: 6,
                        },
                        borderRadius: 2,
                      }}
                      onClick={() => openDetails(b)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') openDetails(b);
                      }}
                      aria-label={`View details for booking at ${b.hostel}`}
                    >
                      <Box
                        sx={{
                          width: 160,
                          overflow: 'hidden',
                          borderTopLeftRadius: 8,
                          borderBottomLeftRadius: 8,
                          flexShrink: 0,
                        }}
                      >
                        <CardMedia
                          component="img"
                          image={getHostelImage(b)}
                          alt={b.hostel}
                          sx={{
                            width: '100%',
                            height: 120,
                            objectFit: 'cover',
                            transition: 'transform 0.5s ease',
                            '&:hover': { transform: 'scale(1.1)' },
                          }}
                        />
                      </Box>
                      <CardContent
                        sx={{
                          flex: 1,
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'space-between',
                        }}
                      >
                        <Box>
                          <Typography variant="h6" color="text.primary" gutterBottom>
                            {b.hostel}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {b.location} — {new Date(b.date).toLocaleDateString()}
                          </Typography>
                          <Typography variant="body2" sx={{ mt: 1 }}>
                            Guest: <strong>{b.name}</strong>
                          </Typography>
                        </Box>

                        <Stack direction="row" spacing={1} mt={2} alignItems="center" flexWrap="wrap">
                          <Chip
                            label={b.status.toUpperCase()}
                            color={statusColors[b.status] || 'default'}
                            size="small"
                          />
                          {b.paymentStatus && (
                            <Chip
                              label={`Payment: ${b.paymentStatus.toUpperCase()}`}
                              color={paymentStatusColors[b.paymentStatus] || 'default'}
                              size="small"
                            />
                          )}
                        </Stack>
                      </CardContent>
                    </Card>
                  </Fade>
                );
              })}
            </Stack>

            {/* Pagination */}
            {totalPages > 1 && (
              <Box display="flex" justifyContent="center" mt={4}>
                <Pagination
                  count={totalPages}
                  page={page}
                  onChange={(e, val) => setPage(val)}
                  color="primary"
                  shape="rounded"
                  size="large"
                  showFirstButton
                  showLastButton
                  aria-label="Bookings pagination"
                />
              </Box>
            )}
          </>
        )}

        {/* Cancel Confirmation Dialog */}
        <Dialog
          open={cancelDialog.open}
          onClose={() => setCancelDialog({ open: false, bookingId: null })}
          aria-labelledby="cancel-dialog-title"
          aria-describedby="cancel-dialog-description"
        >
          <DialogTitle id="cancel-dialog-title">Confirm Cancellation</DialogTitle>
          <DialogContent>
            <DialogContentText id="cancel-dialog-description">
              Are you sure you want to cancel this booking? This action cannot be undone.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setCancelDialog({ open: false, bookingId: null })} color="primary">
              No
            </Button>
            <Button onClick={confirmCancelBooking} color="error" variant="contained" autoFocus>
              Yes, Cancel
            </Button>
          </DialogActions>
        </Dialog>

        {/* Booking Details Modal */}
        <Dialog
          open={detailsModal.open}
          onClose={closeDetails}
          maxWidth="sm"
          fullWidth
          aria-labelledby="booking-details-title"
        >
          <DialogTitle id="booking-details-title">Booking Details</DialogTitle>
          <DialogContent dividers>
            {detailsModal.booking && (
              <>
                <Box
                  component="img"
                  src={getHostelImage(detailsModal.booking)}
                  alt={detailsModal.booking.hostel}
                  sx={{
                    width: '100%',
                    height: 200,
                    objectFit: 'cover',
                    borderRadius: 2,
                    mb: 2,
                  }}
                />
                <Typography variant="h6" gutterBottom>
                  {detailsModal.booking.hostel}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  Location: {detailsModal.booking.location}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Guest Name: {detailsModal.booking.name}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Date: {new Date(detailsModal.booking.date).toLocaleDateString()}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Status: {detailsModal.booking.status.toUpperCase()}
                </Typography>
                {detailsModal.booking.paymentStatus && (
                  <Typography variant="body1" gutterBottom>
                    Payment Status: {detailsModal.booking.paymentStatus.toUpperCase()}
                  </Typography>
                )}
                {/* Add more booking info here if available */}
              </>
            )}
          </DialogContent>
          <DialogActions>
            {detailsModal.booking && detailsModal.booking.status !== 'cancelled' && (
              <Button
                onClick={() => {
                  setCancelDialog({ open: true, bookingId: detailsModal.booking._id });
                  closeDetails();
                }}
                color="error"
                variant="contained"
              >
                Cancel Booking
              </Button>
            )}
            <Button onClick={closeDetails} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>

        {/* Snackbar for notifications */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={4000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Container>
    </ThemeProvider>
  );
};

export default MyBookings;
