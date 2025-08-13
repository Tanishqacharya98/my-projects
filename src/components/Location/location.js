import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const HOSTEL_DATA = {
  vijaynagar: [
    { name: 'Sunshine Hostel', address: '123 Vijay Nagar Rd' },
    { name: 'City Stay', address: '45 MG Road' },
  ],
  palasia: [
    { name: 'Comfort Nest', address: 'Near Palasia Square' },
    { name: 'Palasia Residency', address: '101 AB Road' },
  ],
  bholaram: [
    { name: 'GreenView Hostel', address: 'Bholaram Campus' },
  ],
  bhanwarkuwa: [
    { name: 'Metro Hostel', address: 'Opp RRC' },
    { name: 'BK Rooms', address: 'Near DAVV' },
  ],
};

export default function HostelPage() {
  const router = useRouter();
  const { location } = router.query;
  const [hostels, setHostels] = useState([]);

  useEffect(() => {
    if (location) {
      const data = HOSTEL_DATA[location.toLowerCase()];
      setHostels(data || []);
    }
  }, [location]);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Hostels in {location}</h1>
      {hostels.length > 0 ? (
        <ul>
          {hostels.map((hostel, index) => (
            <li key={index}>
              <strong>{hostel.name}</strong> - {hostel.address}
            </li>
          ))}
        </ul>
      ) : (
        <p>No hostels found for this location.</p>
      )}
    </div>
  );
}
