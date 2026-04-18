import React from 'react';
import Navbar from '../components/layout/Navbar';
import Hero from '../components/home/Hero';
import BookingBar from '../components/home/BookingBar';
import RoomList from '../components/home/RoomList';
import Services from '../components/home/Services';
import Footer from '../components/layout/Footer';

const Home: React.FC = () => {
  return (
    <main className="min-h-screen bg-bg-primary overflow-x-hidden">
      <Navbar />
      
      {/* Cinematic Hero */}
      <Hero />
      
      {/* Floating Booking Interface */}
      <div className="relative z-20">
        <BookingBar />
      </div>

      {/* Main Content Sections */}
      <div className="relative pt-20 flex flex-col gap-32">
        <RoomList />
        <Services />
      </div>

      <Footer />
    </main>
  );
};

export default Home;
