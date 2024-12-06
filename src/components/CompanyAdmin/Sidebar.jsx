import { Eye, PenSquare, BarChart2, Settings, Video } from 'lucide-react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function Sidebar({ companyName, followers, activeTab, setIsOpen }) {

    const menuItems = [
        { to: "/company/1/admin/dashboard/", label: 'Dashboard', icon: BarChart2 },
        { to: '/company/1/admin/dashboard/page-posts/', label: 'Page posts', icon: PenSquare },
        { to: '/company/1/admin/dashboard/feed/', label: 'Feed', icon: Video },
    ];

    return (
        <div className="rounded-xl border bg-card text-card-foreground bg-gray-50 shadow">
            <div className="p-4">
                <div className="relative group">
                    <img
                        src="https://images.unsplash.com/photo-1496449903678-68ddcb189a24?w=500&h=200&q=80"
                        alt="Cover"
                        className="w-full h-24 object-cover rounded-t-lg"
                    />
                    <div className="absolute -bottom-10 left-4">
                        <img
                            src="https://images.unsplash.com/photo-1549921296-3b0f9a35af35?w=80&h=80&q=80"
                            alt="Profile"
                            className="w-16 h-16 rounded-lg border-2 border-white"
                        />
                    </div>
                </div>

                <div className="mt-12">
                    <h2 className="text-xl font-semibold">{companyName}</h2>
                    <div className="flex items-center gap-2 mt-1 text-sm text-gray-600">
                        <Eye className="h-4 w-4" />
                        <span>{followers} followers</span>
                    </div>
                </div>

                <nav className="mt-8">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        return (
                            <Link
                                key={item.to}
                                to={item.to}
                                className={`flex items-center gap-3 px-4 py-2 text-sm rounded-md transition-colors ${activeTab === item.id ? "text-[#0a66c2] bg-blue-50" : "text-gray-700 hover:bg-gray-100"}`}>
                                <Icon className="h-4 w-4" />
                                {item.label}
                            </Link>
                        );
                    })}
                    <button
                        onClick={() => setIsOpen(prev=>!prev)}
                        className={`flex items-center gap-3 px-4 py-2 text-sm rounded-md transition-colors text-gray-600`}>
                        <Settings className="h-4 w-4" />
                        Edit page
                    </button>
                </nav>
            </div>
        </div>
    );
}

Sidebar.propTypes = {
    companyName: PropTypes.string,
    followers: PropTypes.number,
    activeTab: PropTypes.string,
    setIsOpen: PropTypes.func
}

export default Sidebar