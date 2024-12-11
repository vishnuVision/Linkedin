import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

function Home() {
  const { user } = useSelector(state => state.authReducer);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      console.log(user);
      return navigate("/feed");
    }
  }, [user])

  return (
    <div className="min-h-screen bg-linkedin-gray">
      <Navbar />
      <main>
        <Hero />
        <Features />
      </main>
      <Footer />
    </div>
  )
}

export default Home
