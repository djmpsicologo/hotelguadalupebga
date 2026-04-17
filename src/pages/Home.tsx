import React from 'react';
import Navbar from '../components/layout/Navbar';
import Hero from '../components/home/Hero';
import BookingBar from '../components/home/BookingBar';
import RoomList from '../components/home/RoomList';
import Services from '../components/home/Services';
import Footer from '../components/layout/Footer';

const Home: React.FC = () => {
  return (
    <div className="home-page">
      <Navbar />
      <Hero />
      <div className="content-container" style={{ position: 'relative', zIndex: 10, marginTop: '-50px' }}>
        <BookingBar />
        <RoomList />
        <Services />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
