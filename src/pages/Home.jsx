import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import Loader from "../components/Loaders/Loader";

function Home() {
  const { user } = useSelector(state => state.authReducer);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      if (!user?.firstName && !user?.lastName && !user?.location && user?.educations?.length === 0 && user?.experiences?.length === 0) {
        navigate("/provide-details");
      }
      else {
        navigate("/feed");
      }
    }
  }, [user])

  if(user)
  {
    return <Loader />
  }

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
