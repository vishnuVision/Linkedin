import { MapPin, Building2, GraduationCap, Bookmark, UserPlus } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ProfileCard() {
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="h-24 bg-gradient-to-r from-blue-500 to-blue-600 rounded-t-lg" />
      <div className="">
        <div className='px-4 pb-4'>
          <div className="-mt-12 mb-4">
            <Link to={"/profile/1"}>
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
                alt="Profile"
                className="w-24 h-24 rounded-full border-4 border-white object-cover"
              />
            </Link>
          </div>
          <Link to={"/profile/1"} className='hover:underline hover:underline-offset-2'>
            <h2 className="text-xl font-bold">John Doe</h2>
          </Link>
          <p className="text-gray-600 mb-4">Senior Software Engineer</p>

          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4" />
              <span>Tech Company Inc.</span>
            </div>
            <div className="flex items-center gap-2">
              <GraduationCap className="w-4 h-4" />
              <span>Computer Science, University of Technology</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>San Francisco Bay Area</span>
            </div>
          </div>
        </div>
        <Link to={"/mynetwork/grow"} className='justify-between items-center border-t flex gap-1 px-4 py-2 border-gray-200 text-sm text-gray-600 hover:bg-gray-100 cursor-pointer'>
          <div className='text-sm'>
            <p>Connections</p>
            <p className='font-semibold'>Grow you network</p>
          </div>
          <div>
            <UserPlus className='fill-slate-600'/>
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