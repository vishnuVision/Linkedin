import { Search, Home, Users, BriefcaseBusiness, MessageSquareMore, Bell, Grip, Compass, ReceiptText, Plus, Menu, CalendarClock } from 'lucide-react';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import { TiArrowSortedDown } from "react-icons/ti";
import { useEffect, useRef, useState } from 'react';

export default function Navbar() {

  const { pathname: url } = useLocation();
  const [showProfile, setShowProfile] = useState(false);
  const [showBusiness, setShowBusiness] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const divRef = useRef();
  const menuRef = useRef();
  const mainRef = useRef();

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const width = entry.contentRect.width;
        if(width > 1024)
        {
          setIsMobile(false);
        }
      }
    });

    if (divRef.current) {
      observer.observe(divRef.current);
    }

    return () => {
      if (divRef.current) {
        observer.unobserve(divRef.current);
      }
    };
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowProfile(false);
        setShowBusiness(false);
      }
      if (mainRef.current && !mainRef.current.contains(event.target)) {
        setIsMobile(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav ref={divRef} className="fixed top-0 w-full bg-white border-b border-gray-200 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-1 md:gap-8">
            <Link to={"/feed"} className='flex gap-1 text-2xl justify-center items-center font-bold text-[#0a66c2]'><span className='hidden md:block'>Linked</span><img src="/logo.png" alt="LinkedIn" className="w-6 h-6" /></Link>
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-5 w-3 md:w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search"
                className="pl-10 pr-4 py-2 bg-gray-100 rounded-md w-60 md:w-72 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div ref={mainRef} className={`${isMobile ? "fixed flex-col sm:flex-row top-20 right-2 bg-white overflow-x-scroll shadow-xl z-50 flex items-center border p-2 rounded-l-lg rounded-b-lg justify-center gap-4 lg:hidden" : "gap-2 h-full hidden lg:flex" }`}>
            <div className={`flex gap-2 ${isMobile ? "flex-col" : ""}`}>
              <NavItem onClick={() => setIsMobile(false)} icon={<Home />} to='/feed' label="Home" active={url === '/feed' ? true : false} />
              <NavItem onClick={() => setIsMobile(false)} icon={<Users />} to='/mynetwork/grow' label="Network" active={url.includes('/mynetwork') ? true : false} />
              <NavItem onClick={() => setIsMobile(false)} icon={<BriefcaseBusiness />} to='/jobs' label="Jobs" active={url === '/jobs' ? true : false} />
              <NavItem onClick={() => setIsMobile(false)} icon={<MessageSquareMore />} to='/messaging' label="Messages" active={url === '/messaging' ? true : false} />
              <NavItem onClick={() => setIsMobile(false)} icon={<Bell />} to='/notifications' label="Notifications" active={url === '/notifications' ? true : false} />
            </div>
            <div className='relative'>
              <NavButton onClick={() => setShowProfile((prev)=>!prev)} icon={<img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover"
              />} label={<span className="flex items-center justify-center">Me <TiArrowSortedDown className='text-lg' /></span>} />
              {
                showProfile && (
                  <div onClick={() => setShowProfile(false)} ref={menuRef} className="fixed z-10 lg:absolute right-0 sm:right-10 mt-4 lg:right-0 lg:mt-2 w-72 bg-white border border-gray-200 rounded-md shadow-xl">
                    <div className='w-full'>
                      <div className='w-full flex flex-col gap-2 justify-center items-center p-4'>
                        <Link className='w-full flex flex-col gap-2 justify-center items-center' to={"/profile/1"}>
                          <img
                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
                            alt="Profile"
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          <p>Vishnu Mandlesara</p>
                        </Link>
                        <Link to={"/profile/1"} className='flex justify-center items-center w-full py-1 text-[#0a66c2] border border-[#0a66c2] hover:bg-blue-100 rounded-full'>View Profile</Link>
                      </div>
                    </div>
                    <div className='flex flex-col w-full justify-start border-t border-gray-300 py-2'>
                      <p className='px-4'>Account</p>
                      <Link to="/settings/" className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 hover:underline hover:underline-offset-1">Settings & Privacy</Link>
                      <Link to="/logout" className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 hover:underline hover:underline-offset-1">Language</Link>
                    </div>
                    <div className='flex flex-col w-full justify-start border-t border-gray-300 py-2'>
                      <p className='px-4'>Manage</p>
                      <Link to="/profile/1/all-posts" className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 hover:underline hover:underline-offset-1">Posts & Activity</Link>
                      <Link to="/company/1" className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 hover:underline hover:underline-offset-1">Company: Vishnu Mandlesara</Link>
                      <Link to="/my-items/" className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 hover:underline hover:underline-offset-1">Job Posting Account</Link>
                    </div>
                    <div className='flex w-full justify-start items-start border-t border-gray-300'>
                      <button to="/logout" className="flex justify-start px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:underline hover:underline-offset-1 flex-grow">Sign Out</button>
                    </div>
                  </div>
                )
              }
            </div>
            <div className='md:border-s border-gray-300 px-4'>
              <div className='relative h-full'>
                <NavButton onClick={() => setShowBusiness(prev => !prev)} icon={<Grip />} label={<span className="flex items-center justify-center">For Business <TiArrowSortedDown className='text-lg' /></span>} />
                {
                  showBusiness && (
                    <div onClick={() => setShowBusiness(false)} ref={menuRef} className="fixed z-10 lg:absolute right-0 sm:right-10 mt-4 lg:right-0 lg:mt-2 w-80 sm:w-96 bg-white border border-gray-200 rounded-md shadow-xl p-4">
                      <div className='flex sm:flex-row gap-2 justify-evenly items-start'>
                        <div className='flex flex-col justify-start items-start'>
                          <h1 className='text-sm px-1 py-2 font-semibold'>My Apps</h1>
                          <Link to="/jobs" className="py-2 px-1 text-sm text-gray-700 flex gap-2 group"> <Compass /> <span className='group-hover:underline'>Find New Clients</span></Link>
                          <Link to="/groups" className="py-2 px-1 text-sm text-gray-700 flex gap-2 group"><Users /> <span className='group-hover:underline'>Groups</span></Link>
                          <Link to="/events" className="py-2 px-1 text-sm text-gray-700 flex gap-2 group"><CalendarClock /> <span className='group-hover:underline'>Events</span></Link>
                          <Link to="/notifications" className="py-2 px-1 text-sm text-gray-700 flex gap-2 group"><ReceiptText /> <span className='group-hover:underline'>Newsletters</span></Link>
                        </div>
                        <div className='flex-grow border-l pl-4 border-gray-300 flex flex-col justify-start'>
                          <h1 className='text-sm px-1 py-2 font-semibold'>Explore more for business</h1>
                          <Link to="/jobs" className="py-3 px-1 text-sm text-gray-700 flex flex-col group">
                            <span className='font-semibold group-hover:underline'>Post a job for free</span>
                            <p className='text-xs group-hover:underline'>Get qualified applicants quickly</p>
                          </Link>
                          <Link to="/jobs" className="py-3 px-1 text-sm text-gray-700 flex flex-col group">
                            <span className='font-semibold group-hover:underline'>Get Started With Premium</span>
                            <p className='text-xs group-hover:underline'>Expand and leverage your network</p>
                          </Link>
                          <Link to="/company/setup" className="py-3 px-1 text-sm text-gray-700 flex gap-1 mt-2 group">
                            <span className='font-semibold text-sm group-hover:underline'>Create a company page</span>
                            <Plus />
                          </Link>
                        </div>
                      </div>
                    </div>
                  )
                }
              </div>
            </div>
          </div>
          <div onClick={() => { setIsMobile(prev => !prev) }} className='lg:hidden flex justify-center items-center'>
            <Menu/>
          </div>
        </div>
      </div>
    </nav>
  );
}

function NavItem({ icon, label, active = false, to = "/",onClick}) {
  return (
    <Link onClick={onClick} to={to} className={`flex h-full flex-col justify-center px-4 items-center text-gray-500 hover:text-gray-900 ${active ? "border-b-2 border-gray-900" : ""}`}>
      <div className={`p-1 ${active ? 'text-gray-900' : ''}`}>
        {icon}
      </div>
      <span className="text-xs">{label}</span>
    </Link>
  );
}

function NavButton({ icon, label, onClick }) {
  return (
    <button onClick={onClick} className={`flex h-full flex-col justify-center px-4 items-center text-gray-500 hover:text-gray-900 `}>
      <div className={`p-1`}>
        {icon}
      </div>
      <span className="text-xs">{label}</span>
    </button>
  );
}

NavItem.propTypes = {
  icon: PropTypes.element.isRequired,
  label: PropTypes.any,
  active: PropTypes.bool,
  to: PropTypes.string,
  onClick:PropTypes.func
}

NavButton.propTypes = {
  icon: PropTypes.element.isRequired,
  label: PropTypes.any,
  onClick: PropTypes.func
}