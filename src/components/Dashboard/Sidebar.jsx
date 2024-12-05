import { Bookmark, Users, Calendar } from 'lucide-react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function Sidebar() {
  return (
    <div className="space-y-4">
      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="font-semibold mb-4">Recent</h2>
        <div className="space-y-3">
          <SidebarItem icon={<Users className="w-4 h-4" />} label="React Developers Group" />
          <SidebarItem icon={<Calendar className="w-4 h-4" />} label="Tech Conference 2024" />
          <SidebarItem icon={<Bookmark className="w-4 h-4" />} label="My Saved Items" />
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="font-semibold mb-4">Groups</h2>
        <div className="space-y-3">
          <GroupItem name="Frontend Development" members="15.3K members" />
          <GroupItem name="UI/UX Design" members="8.2K members" />
          <GroupItem name="Tech Startups" members="12.1K members" />
        </div>
      </div>

      <div className="rounded-lg shadow">
        <Link to="/jobs">
          <img src="/feed_ads.png" alt="Ad" className="w-full rounded-lg" />
        </Link>
      </div>
    </div>
  );
}

function SidebarItem({ icon, label }) {
  return (
    <button className="flex items-center gap-2 w-full hover:bg-gray-100 p-2 rounded">
      {icon}
      <span className="text-sm text-gray-700">{label}</span>
    </button>
  );
}

SidebarItem.propTypes = {
  icon: PropTypes.element.isRequired,
  label: PropTypes.string.isRequired
};

export function GroupItem({ name, members }) {
  return (
    <div className="hover:bg-gray-100 p-2 rounded cursor-pointer">
      <p className="text-sm font-medium">{name}</p>
      <p className="text-xs text-gray-500">{members}</p>
    </div>
  );
}

GroupItem.propTypes = {
  name: PropTypes.string.isRequired,
  members: PropTypes.string.isRequired
};