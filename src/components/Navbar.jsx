import { FaUserFriends, FaBriefcase, FaComments } from 'react-icons/fa';
import { GrArticle } from "react-icons/gr";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom"
import { Menu } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export default function Navbar() {
  const [isMobile, setIsMobile] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMobile(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-white shadow-md fixed w-full top-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link className='flex gap-1 text-2xl justify-center items-center font-bold text-[#0a66c2]'><span className='hidden sm:inline'>Linked</span><img src="/logo.png" alt="LinkedIn" className="w-6 h-6" /></Link>
            <div className="hidden md:flex items-center bg-linkedin-gray rounded-md px-4 py-2">
            </div>
          </div>
          <div className='hidden md:flex'>
            <div className="flex items-center gap-8 mr-4">
              <NavItem icon={<GrArticle />} text="NewsLetters" to={"/newsletters"} />
              <NavItem icon={<FaUserFriends />} text="Network" to={"/mynetwork/grow"} />
              <NavItem icon={<FaBriefcase />} text="Jobs" to={"/jobs"} />
              <NavItem icon={<FaComments />} text="Messaging" to={"/messaging"} />
            </div>
            <div className='flex gap-1 md:gap-3'>
              <Link to={"/signup"} className='py-3 px-6 text-md text-gray-600 hover:text-black font-semibold hover:bg-slate-100 rounded-full'>Join Now</Link>
              <Link to={"/signin"} className='py-3 px-6 text-md hover:bg-blue-100 text-[#0a66c2] font-semibold border border-[#0a66c2] rounded-full'>Sign in</Link>
            </div>
          </div>
          <div className='flex md:hidden justify-center items-center gap-3'>
            <Link to={"/signup"} className='py-2 px-2 text-sm text-gray-600 hover:text-black font-semibold hover:bg-slate-100 rounded-full'>Join Now</Link>
            <Link to={"/signin"} className='py-2 px-2 text-sm hover:bg-blue-100 text-[#0a66c2] font-semibold border border-[#0a66c2] rounded-full'>Sign in</Link>
            <Menu onClick={() => { setIsMobile(prev => !prev) }}/>
            {
              isMobile &&
              <div ref={menuRef} className="fixed top-20 right-2 bg-white overflow-x-scroll min-w-2xl shadow-xl z-50 flex flex-row items-center border p-2 rounded-l-lg rounded-b-lg justify-center gap-4">
                <NavItem icon={<GrArticle />} text="Articles" />
                <NavItem icon={<FaUserFriends />} text="Network" to={"/mynetwork/grow"} />
                <NavItem icon={<FaBriefcase />} text="Jobs" to={"/jobs"} />
                <NavItem icon={<FaComments />} text="Messaging" to={"/messaging"} />
              </div>
            }
          </div>
        </div>
      </div>
    </nav>
  );
}

function NavItem({ icon, text, to }) {
  return (
    <Link to={to} className="flex flex-col items-center text-gray-600 hover:text-black">
      <span className="text-2xl">{icon}</span>
      <span className="text-xs mt-1">{text}</span>
    </Link>
  );
}

NavItem.propTypes = {
  icon: PropTypes.element.isRequired,
  text: PropTypes.string.isRequired,
  to: PropTypes.string
}