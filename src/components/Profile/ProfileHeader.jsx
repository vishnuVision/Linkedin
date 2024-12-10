import { Camera, MapPin, Briefcase, MessageCircle, UserPlus, Pen } from 'lucide-react';
import { useContext, useEffect, useRef, useState } from 'react';
import { handleModalContext } from '../../contextApi/handleModalContext';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';

function ProfileHeader({setIsModalOpen}) {
  const { setIsChatDetailsOpen } = useContext(handleModalContext);
  const {search} = useLocation();
  const isEdit = search.split('=')[1];
  const imageRef = useRef();
  const [image,setImage] = useState();

  useEffect(() => {
    if(isEdit)
    {
      setIsModalOpen(true);
    }
  },[isEdit])

  const handleImage = () => {
    imageRef?.current.click();
  }

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="relative">
        <div className="h-48 w-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-t-lg">
          <button onClick={handleImage} className="absolute right-4 bottom-4 bg-white p-2 rounded-full hover:bg-gray-100">
            <Camera className="w-5 h-5 text-gray-600" />
          </button>
          <input ref={imageRef} className='hidden' value={image} onChange={(e)=>setImage(e.target.files[0])} type='file'/>
        </div>
        <div className="absolute -bottom-16 left-4">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80"
              alt="Profile"
              className="w-32 h-32 rounded-full border-4 border-white"
            />
            <button className="absolute bottom-0 right-0 bg-white p-2 rounded-full hover:bg-gray-100 border border-gray-200">
              <Camera className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
      <div className='flex justify-end p-3'>
        <button onClick={()=>setIsModalOpen(true)} className='px-3 py-3 rounded-full bg-[#866f55] bg-opacity-10'>
          <Pen />
        </button>
      </div>
      <div className="pt-8 px-4 pb-4">
        <div className="flex flex-wrap justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">John Doe</h1>
            <p className="text-lg text-gray-600">Senior Software Engineer</p>
            <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4" /> San Francisco Bay Area
              </span>
              <span className="flex items-center gap-1">
                <Briefcase className="w-4 h-4" /> Tech Company Inc.
              </span>
            </div>
          </div>
          <div className="flex gap-2 mt-4 md:mt-0">
            <button onClick={() => setIsChatDetailsOpen(prev => !prev)} className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 flex items-center gap-2">
              <MessageCircle className="w-4 h-4" />
              Message
            </button>
            <button className="px-4 py-2 border border-blue-600 text-blue-600 rounded-full hover:bg-blue-50 flex items-center gap-2">
              <UserPlus className="w-4 h-4" />
              Connect
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

ProfileHeader.propTypes = {
  setIsModalOpen:PropTypes.func
}; 

export default ProfileHeader;