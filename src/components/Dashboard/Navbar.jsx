import { Search, Home, Users, BriefcaseBusiness, MessageSquareMore, Bell, Grip, Compass, ReceiptText, Plus, Menu, CalendarClock } from 'lucide-react';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import { TiArrowSortedDown } from "react-icons/ti";
import { useEffect, useRef, useState } from 'react';
import SearchInput from '../Ui/SearchInput';
import SearchDropdown from '../Ui/SearchDropdown';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { assignUser } from '../../redux/slices/authReducer';
import toast from 'react-hot-toast';
import { useAuth } from "@clerk/clerk-react";
import { useTranslation } from 'react-i18next';

export default function Navbar({setSearchQuery,searchResults=[],isDropdownVisible,setIsDropdownVisible}) {

  const { pathname: url } = useLocation();
  const [showProfile, setShowProfile] = useState(false);
  const [showBusiness, setShowBusiness] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const divRef = useRef();
  const menuRef = useRef();
  const mainRef = useRef();
  const dispatch = useDispatch();
  const { signOut } = useAuth();
  const { t } = useTranslation();
  const { user } = useSelector(state => state.authReducer);

  const handleSearch = (value) => {
    setIsDropdownVisible(true);
    setSearchQuery(value);
    setIsDropdownVisible(value.length > 0);
  };

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const width = entry.contentRect.width;
        if (width > 1024) {
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
      if (menuRef.current &&
        !menuRef.current.contains(event.target) &&
        mainRef.current &&
        !mainRef.current.contains(event.target)) {
        setIsMobile(false);
        setShowProfile(false);
        setShowBusiness(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await signOut();
      const response = await axios.delete(`${import.meta.env.VITE_SERVER_URL}/api/v1/logout`, { withCredentials: true });
      if (response.data) {
        const { success, message } = await response.data;
        if (success) {
          dispatch(assignUser(false));
        }
        else {
          toast.error(message);
        }
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  }

  return (
    <nav ref={divRef} className="fixed top-0 w-full bg-white border-b border-gray-200 z-50">
      <div className="max-w-6xl mx-auto md:px-4 px-1">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-1 md:gap-8">
            <Link to={"/feed"} className='flex gap-1 text-2xl justify-center items-center font-bold text-[#0a66c2]'><span className='hidden md:block'>Linked</span><img src="/logo.png" alt="LinkedIn" className="w-6 h-6" /></Link>
            <div className="relative ml-2 md:m-0">
              <Search className="absolute left-3 top-2.5 h-5 w-3 md:w-5 text-gray-400" />
              <div className="relative w-full max-w-md">
                <SearchInput onSearch={handleSearch} />
                <SearchDropdown searchResults={searchResults} isVisible={isDropdownVisible} setIsVisible={setIsDropdownVisible} />
              </div>
            </div>
          </div>
          <div ref={mainRef} className={`${isMobile ? "fixed flex-col sm:flex-row top-20 right-2 bg-white overflow-x-scroll shadow-xl z-50 flex items-center border p-2 rounded-l-lg rounded-b-lg justify-center gap-4 lg:hidden" : "gap-2 h-full hidden lg:flex"}`}>
            <div className={`flex gap-2 ${isMobile ? "flex-col" : ""}`}>
              <NavItem onClick={() => setIsMobile(false)} icon={<Home />} to='/feed' label={t("nav1")} active={url === '/feed' ? true : false} />
              <NavItem onClick={() => setIsMobile(false)} icon={<Users />} to='/mynetwork/grow' label={t("nav2")} active={url.includes('/mynetwork') ? true : false} />
              <NavItem onClick={() => setIsMobile(false)} icon={<BriefcaseBusiness />} to='/jobs' label={t("nav3")} active={url === '/jobs' ? true : false} />
              <NavItem onClick={() => setIsMobile(false)} icon={<MessageSquareMore />} to='/messaging' label={t("nav4")} active={url === '/messaging' ? true : false} />
              <NavItem onClick={() => setIsMobile(false)} icon={<Bell />} to='/notifications' label={t("nav5")} active={url === '/notifications' ? true : false} />
            </div>
            <div className='relative'>
              <NavButton onClick={() => setShowProfile((prev) => !prev)} icon={<img
                src={ user?.avatar ? user?.avatar : `https://ui-avatars.com/api/?name=${user?.firstName + " " + user?.lastName}`}
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover border border-gray-300"
              />} label={<span className="flex items-center justify-center">{t("nav6")} <TiArrowSortedDown className='text-lg' /></span>} />
              {
                showProfile && (
                  <div onClick={() => setShowProfile(false)} ref={menuRef} className="fixed z-10 lg:absolute right-0 sm:right-10 mt-4 lg:right-0 lg:mt-2 w-72 bg-white border border-gray-200 rounded-md shadow-xl">
                    <div className='w-full'>
                      <div className='w-full flex flex-col gap-2 justify-center items-center p-4'>
                        <Link className='w-full flex flex-col gap-2 justify-center items-center' to={`/profile/${user._id}`}>
                          <img
                            src={ user?.avatar ? user?.avatar : `https://ui-avatars.com/api/?name=${user?.firstName + " " + user?.lastName}`}
                            alt="Profile"
                            className="w-12 h-12 rounded-full object-cover border border-gray-300"
                          />
                          <p>{user?.firstName + " " + user?.lastName}</p>
                        </Link>
                        <Link to={`/profile/${user._id}`} className='flex justify-center items-center w-full py-1 text-[#0a66c2] border border-[#0a66c2] hover:bg-blue-100 rounded-full'>{t("view")}</Link>
                      </div>
                    </div>
                    <div className='flex flex-col w-full justify-start border-t border-gray-300 py-2'>
                      <p className='px-4'>{t("hed")}</p>
                      <Link to="/settings/" className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 hover:underline hover:underline-offset-1">{t("setting")}</Link>
                      <Link to="/settings/language" className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 hover:underline hover:underline-offset-1">{t("subhea5")}</Link>
                    </div>
                    <div className='flex flex-col w-full justify-start border-t border-gray-300 py-2'>
                      <p className='px-4'>{t("hed1")}</p>
                      <Link to="/profile/1/all-posts" className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 hover:underline hover:underline-offset-1">{t("posts")}</Link>
                      <Link to="/company/1/admin/dashboard/" className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 hover:underline hover:underline-offset-1">{t("com")} Vishnu Mandlesara</Link>
                      <Link to="/my-items/" className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 hover:underline hover:underline-offset-1">{t("job")}</Link>
                    </div>
                    <div className='flex w-full justify-start items-start border-t border-gray-300'>
                      <button type='button' onClick={handleLogout} className="flex justify-start px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:underline hover:underline-offset-1 flex-grow">{t("subhea6")}</button>
                    </div>
                  </div>
                )
              }
            </div>
            <div className='md:border-s border-gray-300 px-4'>
              <div className='relative h-full'>
                <NavButton onClick={() => setShowBusiness(prev => !prev)} icon={<Grip />} label={<span className="flex items-center justify-center">{t("nav7")} <TiArrowSortedDown className='text-lg' /></span>} />
                {
                  showBusiness && (
                    <div onClick={() => setShowBusiness(false)} ref={menuRef} className="fixed z-10 lg:absolute right-0 sm:right-10 mt-4 lg:right-0 lg:mt-2 w-80 sm:w-96 bg-white border border-gray-200 rounded-md shadow-xl p-4">
                      <div className='flex sm:flex-row gap-2 justify-evenly items-start'>
                        <div className='flex flex-col justify-start items-start'>
                          <h1 className='text-sm px-1 py-2 font-semibold'>{t("ap")}</h1>
                          <Link to="/jobs" className="py-2 px-1 text-sm text-gray-700 flex gap-2 group"> <Compass /> <span className='group-hover:underline'>{t("client")}</span></Link>
                          <Link to="/groups" className="py-2 px-1 text-sm text-gray-700 flex gap-2 group"><Users /> <span className='group-hover:underline'>{t("grp")}</span></Link>
                          <Link to="/events" className="py-2 px-1 text-sm text-gray-700 flex gap-2 group"><CalendarClock /> <span className='group-hover:underline'>{t("evt")}</span></Link>
                          <Link to="/notifications" className="py-2 px-1 text-sm text-gray-700 flex gap-2 group"><ReceiptText /> <span className='group-hover:underline'>{t("news")}</span></Link>
                        </div>
                        <div className='flex-grow border-l pl-4 border-gray-300 flex flex-col justify-start'>
                          <h1 className='text-sm px-1 py-2 font-semibold'>{t("exp")}</h1>
                          <Link to="/job-posting/" className="py-3 px-1 text-sm text-gray-700 flex flex-col group">
                            <span className='font-semibold group-hover:underline'>{t("free")}</span>
                            <p className='text-xs group-hover:underline'>{t("apc")}</p>
                          </Link>
                          <Link to="/jobs" className="py-3 px-1 text-sm text-gray-700 flex flex-col group">
                            <span className='font-semibold group-hover:underline'>{t("pro")}</span>
                            <p className='text-xs group-hover:underline'>{t("expa")}</p>
                          </Link>
                          <Link to="/company/setup" className="py-3 px-1 text-sm text-gray-700 flex gap-1 mt-2 group">
                            <span className='font-semibold text-sm group-hover:underline'>{t("page")}</span>
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
          <div ref={menuRef} onClick={() => { setIsMobile(prev => !prev) }} className='lg:hidden flex justify-center items-center'>
            <Menu />
          </div>
        </div>
      </div>
    </nav>
  );
}

function NavItem({ icon, label, active = false, to = "/", onClick }) {
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
  onClick: PropTypes.func
}

NavButton.propTypes = {
  icon: PropTypes.element.isRequired,
  label: PropTypes.any,
  onClick: PropTypes.func
}

Navbar.propTypes = {
  searchResults: PropTypes.array,
  setSearchQuery: PropTypes.func,
  isDropdownVisible: PropTypes.bool,
  setIsDropdownVisible: PropTypes.func
}
