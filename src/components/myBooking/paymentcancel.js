import { useEffect } from 'react';

const PaymentCancel = () => {
  useEffect(() => {
    localStorage.removeItem("pendingBooking");
  }, []);

  return <h2>❌ Payment was cancelled. Please try again.</h2>;
};

export default PaymentCancel;
