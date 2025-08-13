import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import './entrance.css';

const LOCATIONS = ['vijaynagar', 'palasia', 'bholaram', 'bhanwarkuwa'];

const Entrance = () => {
  const [search, setSearch] = useState('');
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [filteredLocations, setFilteredLocations] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  const bannerText = [
  {
    title: ["Come, live", "the new kind", "of Living."],
    subtitle: "Life at a professionally managed accommodation awaits you.",
  },
  {
    title: ["You've got 99 problems, but", "brokerage ain't one."],
    subtitle: "Move in without having to pay a fortune.",
  },
  {
    title: ["Multiple options.", "Zero judgements passed."],
    subtitle: "Co-ed. Girls-only. Boys-only. All types of residences available.",
  },
];


  const handleSearchChange = (e) => {
    const input = e.target.value.toLowerCase();
    setSearch(input);
    const matches = LOCATIONS.filter((loc) => loc.startsWith(input));
    setFilteredLocations(matches);
  };

  const handleSelectLocation = (location) => {
    navigate(`/${location}`);
    setSearch('');
    setFilteredLocations([]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (LOCATIONS.includes(search.toLowerCase())) {
      navigate(`/${search.toLowerCase()}`);
    }
  };

  useEffect(() => {
    if (location.state?.scrollToLocations) {
      const target = document.getElementById('locations');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  useEffect(() => {
  const interval = setInterval(() => {
    setCarouselIndex((prev) => (prev + 1) % 3);
  }, 2000); // 0.5 second

  return () => clearInterval(interval);
}, []);

  return (
    <>
      <div className='homepage-container'>
          <div className="page-bg-image" />

        {/* Header */}
      <div className="header-container">
  <div className="header-left" onClick={() => navigate('/')}>
<h1 class="logo">
  <span class="logo-left">Home</span><span class="logo-right">stella</span>
</h1>
  </div>

  <form className="header-search-form" onSubmit={handleSubmit}>
    <div className="search-wrapper">
      <span className="search-icon">🔍</span>
      <input
        type="text"
        placeholder="Search by location, area, landmark..."
        value={search}
        onChange={handleSearchChange}
        className="search-bar"
      />
    </div>

    {search && filteredLocations.length > 0 && (
      <ul className="suggestions">
        {filteredLocations.map((loc, index) => (
          <li key={index} onClick={() => handleSelectLocation(loc)}>
            📍 {loc}
          </li>
        ))}
      </ul>
    )}
  </form>

  <div className="header-buttons">
    {localStorage.getItem('token') && localStorage.getItem('role') === 'user' && (
      <button className="nav-button" onClick={() => navigate('/my-bookings')}>
        My Bookings
      </button>
    )}
    {localStorage.getItem('token') && localStorage.getItem('role') === 'admin' && (
      <button className="nav-button" onClick={() => navigate('/admin')}>
        Admin Panel
      </button>
    )}
    <button className="auth-button" onClick={() => navigate('/auth')}>
      Login / Signup
    </button>
  </div>
</div>


       


                            {/* carousel-section */}
 <div className="carousel-section">
  <div className="carousel-text">
    {bannerText[carouselIndex].title.map((line, i) => (
      <h2 key={i}>{line}</h2>
    ))}
    <p>{bannerText[carouselIndex].subtitle}</p>
  </div>

  <div className="carousel-images">
    <picture className={carouselIndex === 0 ? "active" : ""}>
      <source srcSet="/photos/entry1.avif" type="image/avif" />
      <img src="/photos/entry1.jpg" alt="Entry 1" className="carousel-img" />
    </picture>
    <picture className={carouselIndex === 1 ? "active" : ""}>
      <source srcSet="/photos/entry2.avif" type="image/avif" />
      <img src="/photos/entry2.jpg" alt="Entry 2" className="carousel-img" />
    </picture>
    <picture className={carouselIndex === 2 ? "active" : ""}>
      <source srcSet="/photos/entry3.avif" type="image/avif" />
      <img src="/photos/entry3.jpg" alt="Entry 3" className="carousel-img" />
    </picture>
  </div>
</div>

     


        {/* Hero Section */}
        <div className="hero-section">
          <div className="hero-text">
            <h2>Step into a room that has <br/> <span>room for everything</span></h2>
            <p>Your clothes and bag will not be fighting for space on the same chair. At Homestella, there's ample room for all your possessions. Even a framed photo of your family, for the rare occasions you miss home.</p>
          </div>
         <div className="hero-images">
  <picture>
    <source srcSet="/photos/room1.avif" type="image/avif" />
    <img src="/photos/room1.jpg" alt="Room 1" className="hero-img top-img" />
  </picture>

  <picture>
    <source srcSet="/photos/room2.avif" type="image/avif" />
    <img src="/photos/room2.jpg" alt="Room 2" className="hero-img bottom-img" />
  </picture>
</div>
 </div>

          {/* Locations */}
        <div className="hostels-locations" id='locations'>
          {LOCATIONS.map((loc) => (
            <Link key={loc} to={`/${loc}`} className="location-card">
              <img src={`/photos/${loc}.png`} alt={loc} />
              <p className="location-name">{loc.charAt(0).toUpperCase() + loc.slice(1)}</p>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Entrance;
