import { Camera, MapPin, Briefcase, MessageCircle, UserPlus, GraduationCap, Pencil } from 'lucide-react';
import { useContext, useEffect, useRef, useState } from 'react';
import { handleModalContext } from '../../contextApi/handleModalContext';
import PropTypes from 'prop-types';
import { useLocation, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import useApi from '../../hook/useApi';
import { useSelector } from 'react-redux';

function ProfileHeader({ setIsModalOpen, user, educations, experiences }) {
  const { setIsChatDetailsOpen } = useContext(handleModalContext);
  const { search } = useLocation();
  const isEdit = search.split('=')[1];
  const imageRef = useRef();
  const avatarRef = useRef();
  const [image, setImage] = useState("");
  const [avatarImage, setAvatarImage] = useState("");
  const [lastSchool, setLastSchool] = useState("");
  const [lastCompany, setLastCompany] = useState("");
  const { apiAction } = useApi();
  const [backgroundImage, setBackgroundImage] = useState("");
  const [isAvatarLoading, setIsAvatarLoading] = useState(false);
  const [isBackgroundLoading, setIsBackgroundLoading] = useState(false);
  const [avatar, setAvatar] = useState("");
  const { id } = useParams();
  const { _id } = useSelector(state => state?.authReducer?.user);

  useEffect(() => {
    if (user) {
      setBackgroundImage(user?.backgroundImage);
      setAvatar(user?.avatar);
    }
  }, [user])

  useEffect(() => {
    if (educations || experiences) {
      const lastEducation = educations && educations.reduce((max, education) => {
        return Number(education?.endYear) > (Number(max?.endYear) || 0) ? education : max;
      }, {});

      const lastExperience = experiences && experiences.reduce((max, experience) => {
        if (experience?.isPresent) return experience;
        return Number(experience?.endYear) > (Number(max?.endYear) || 0) ? experience : max;
      }, null);

      setLastSchool(lastEducation?.school?.name);
      setLastCompany(lastExperience?.company?.name);
    }
  }, [educations, experiences])

  useEffect(() => {
    if (isEdit) {
      setIsModalOpen(true);
    }
  }, [isEdit])

  const updateUserBackground = async () => {
    setIsBackgroundLoading(true);
    try {
      const formData = new FormData();
      formData.append("backgroundImage", image);

      const { success, data } = await apiAction({
        url: `/api/v1/profile/editBackgroundImage`,
        method: "PUT",
        isFormData: true,
        data: formData
      });

      if (success) {
        setBackgroundImage(data?.backgroundImage);
      }

    } catch (error) {
      toast.error(error?.response?.data?.message || error?.message);
    }
    setIsBackgroundLoading(false);
  }

  const updateUserAvatar = async () => {
    setIsAvatarLoading(true);
    try {
      const formData = new FormData();
      formData.append("avatar", avatarImage);

      const { success, data } = await apiAction({
        url: `/api/v1/profile/editAvatar`,
        method: "PUT",
        isFormData: true,
        data: formData
      });

      if (success) {
        setAvatar(data?.avatar);
      }

    } catch (error) {
      toast.error(error?.response?.data?.message || error?.message);
    }
    setIsAvatarLoading(false);
  }

  useEffect(() => {
    if (image) {
      updateUserBackground();
    }
  }, [image])

  useEffect(() => {
    if (avatarImage) {
      updateUserAvatar();
    }
  }, [avatarImage])

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="relative">
        <div className="h-48 w-full overflow-hidden bg-gradient-to-r from-blue-500 to-blue-600 rounded-t-lg">
          {
            backgroundImage &&
            <img
              src={backgroundImage}
              alt={user?.firstName + " " + user?.lastName}
              className={`w-full h-full object-cover ${isBackgroundLoading ? 'blur-sm' : ''}`}
            />
          }
          {
            id === _id && <button disabled={isBackgroundLoading} onClick={() => imageRef.current.click()} className={`absolute right-4 bottom-4 bg-white p-2 rounded-full ${isBackgroundLoading ? "bg-opacity-50 cursor-not-allowed" : "hover:bg-gray-100"}`}>
              <Camera className="w-5 h-5 text-gray-600" />
            </button>
          }
          <input accept='image/*' ref={imageRef} className='hidden' onChange={(e) => setImage(e.target.files[0])} type='file' />
        </div>
        <div className="absolute -bottom-16 left-4">
          <div className="relative">
            {
              avatar &&
              <img
                src={avatar}
                alt="Profile"
                className={`w-32 h-32 rounded-full border-4 border-white ${isAvatarLoading ? 'blur-[20px]' : ''}`}
              />
            }
            {
              !avatar &&
              <img
                src={`https://ui-avatars.com/api/?name=${user?.firstName + " " + user?.lastName}`}
                alt="Profile"
                className={`w-32 h-32 rounded-full border-4 border-white ${isAvatarLoading ? 'blur-[20px]' : ''}`}
              />
            }
            {
              id === _id && (
                <button onClick={() => avatarRef.current.click()} className={`absolute bottom-0 right-0 bg-white p-2 rounded-full border border-gray-200 ${isBackgroundLoading ? "bg-opacity-50 cursor-not-allowed" : "hover:bg-gray-100"}`}>
                  <Camera className="w-5 h-5 text-gray-600" />
                </button>
              )
            }
            <input accept='image/*' ref={avatarRef} className='hidden' onChange={(e) => setAvatarImage(e.target.files[0])} type='file' />
          </div>
        </div>
      </div>
      <div className='flex justify-end p-3'>
        {
          id === _id && (
            <button onClick={() => setIsModalOpen(true)} className="p-2 hover:bg-gray-100 rounded-full">
              <Pencil className="w-5 h-5 text-gray-600" />
            </button>
          )
        }
      </div>
      <div className="pt-8 px-4 pb-4">
        <div className="flex flex-wrap justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{user.firstName + " " + user.lastName}</h1>
            <p className="text-lg text-gray-600">{user?.bio}</p>
            <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
              {
                user?.location && (
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" /> {user?.location}
                  </span>
                )
              }
              {
                lastCompany && (
                  <span className="flex items-center gap-1">
                    <Briefcase className="w-4 h-4" /> {lastCompany}
                  </span>
                )
              }
              {
                lastSchool && (
                  <span className="flex items-center gap-1">
                    <GraduationCap className="w-4 h-4" /> {lastSchool}
                  </span>
                )
              }
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
        <div>
          <Link to={"/"} className="font-semibold text-[#0a66c2] text-sm hover:underline">{user?.followers?.length + user?.following?.length || 0} connections</Link>
        </div>
      </div>
    </div>
  );
}

ProfileHeader.propTypes = {
  setIsModalOpen: PropTypes.func,
  user: PropTypes.object,
  educations: PropTypes.array,
  experiences: PropTypes.array,
};

export default ProfileHeader;