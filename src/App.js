import React from 'react'
import { BrowserRouter as Router , Routes, Route } from 'react-router-dom'
import Entrance from './components/entrance/entrance'
// import Hosteldata from './components/Hosteldata/hosteldata'
import HostelPage from './components/Hosteldata/hostelpage'
import AdminPanel from './components/Admin/adminpanel'
import AuthForm from './components/LoginSignup/authform'
import MyBookings from './components/myBooking/mybooking'
import PaymentSuccess from './components/myBooking/paymentsuccess'
import PaymentCancel from './components/myBooking/paymentcancel'
const App = () => {
  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element = {<Entrance/>}/>
        <Route path="/:location" element={<HostelPage />} />
                <Route path="/admin" element={<AdminPanel/>} />
                <Route path="/auth" element={<AuthForm/>} />
                <Route path="/my-bookings" element={<MyBookings />} />
      <Route path='/payment-success' element={<PaymentSuccess/>}/>
      <Route path='/payment-cancel' element={<PaymentCancel/>}/>

      </Routes>
    </Router>
    </>
  )
}

export default App



// pk_test_51Rnd5G7T8I6u9ldhIELZdITqMKVd19DomvB5Qzkwi8pOqby1G2pRsjR2XV1sVgylDpyNs2czfWwunnDRx2EWOorJ00DGg5Nvr3