import { MapPin, Building2, GraduationCap, Bookmark, UserPlus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";
import { useEffect, useState } from 'react';

export default function ProfileCard() {
  const user = useSelector(state => state.authReducer.user);
  const [lastSchool, setLastSchool] = useState("");
  const [lastCompany, setLastCompany] = useState("");

  useEffect(() => {
    if (user) {
      const lastEducation = user?.educations?.reduce((max, education) => {
        return Number(education.endYear) > (Number(max.endYear) || 0) ? education : max;
      }, {});

      const lastExperience = user?.experiences?.reduce((max, experience) => {
        if (!experience?.endYear) return max;

        const endDate = new Date(experience.endYear).getTime();
        const maxEndDate = max?.endYear ? new Date(max.endYear).getTime() : 0;

        return endDate > maxEndDate ? experience : max;
      }, null);

      setLastSchool(lastEducation?.school?.name);
      setLastCompany(lastExperience?.company?.name);
    }
  }, [user])

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="h-24 overflow-hidden bg-gradient-to-r from-blue-500 to-blue-600 rounded-t-lg" >
        {
          user?.backgroundImage &&
          <img
            src={user?.backgroundImage}
            alt={user?.firstName + " " + user?.lastName}
            className="w-full h-24 object-cover"
          />
        }
      </div>
      <div className="">
        <div className='px-4 pb-4'>
          <div className="-mt-12 mb-4">
            <Link to={"/profile/1"}>
              {
                !user?.avatar &&
                <img
                  src={`https://ui-avatars.com/api/?name=${user?.firstName + " " + user?.lastName}`}
                  alt={user?.firstName + " " + user?.lastName}
                  className="w-24 h-24 rounded-full border-4 border-white object-cover"
                />
              }
              {
                user?.avatar &&
                <img
                  src={user?.avatar}
                  alt={user?.firstName + " " + user?.lastName}
                  className="w-24 h-24 rounded-full border-4 border-white object-cover"
                />
              }
            </Link>
          </div>
          <Link to={"/profile/1"} className='hover:underline hover:underline-offset-2'>
            <h2 className="text-xl font-bold">{user?.firstName + " " + user?.lastName}</h2>
          </Link>
          <p className="text-gray-600 mb-4 break-words">{user?.bio}</p>
          <div className="space-y-2 text-sm text-gray-600">
            {
              lastCompany && (
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4" />
                  <span>{lastCompany}</span>
                </div>
              )
            }
            {
              lastSchool && (
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-4 h-4" />
                  <span>{lastSchool}</span>
                </div>
              )
            }
            {
              user?.location && (
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>{user?.location}</span>
                </div>
              )
            }
          </div>
        </div>
        <Link to={"/mynetwork/grow"} className='justify-between items-center border-t flex gap-1 px-4 py-2 border-gray-200 text-sm text-gray-600 hover:bg-gray-100 cursor-pointer'>
          <div className='text-sm'>
            <p>Connections</p>
            <p className='font-semibold'>Grow you network</p>
          </div>
          <div>
            <UserPlus className='fill-slate-600' />
          </div>
        </Link>
        <Link to={"/my-items/posted-jobs"} className='border-t flex gap-1 px-4 py-2 border-gray-200 text-sm text-gray-600 hover:bg-gray-100 rounded-b-lg cursor-pointer'>
          <Bookmark size={20} className='fill-slate-600' />
          <p>Saved items</p>
        </Link>
      </div>
    </div>
  );
}