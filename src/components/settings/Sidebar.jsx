import { Settings, UserCircle, Lock } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const menuItems = [
  { icon: UserCircle, text: 'Account preferences', to:"/settings/" },
  { icon: Lock, text: 'Sign in & security', to:"/settings/sign-in-and-security" },
];

const Sidebar = () => {
  const {pathname} = useLocation();
  return (
    <div className="w-full md:w-64 bg-white md:min-h-screen p-4 border-r">
      <div className="flex items-center gap-2 mb-6">
        <Settings className="w-6 h-6" />
        <h1 className="text-xl font-semibold">Settings</h1>
      </div>
      <nav>
        {menuItems.map((item, index) => (
          <Link
            to={item.to}
            key={index}
            className={`flex items-center gap-3 p-3 rounded-md cursor-pointer transition-colors
              ${pathname === item.to 
                ? 'bg-blue-50 text-blue-600' 
                : 'hover:bg-gray-50'
              }`}
          >
            <item.icon className="w-5 h-5" />
            <span className="text-sm font-medium">{item.text}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;