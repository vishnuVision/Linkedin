import { Users, UserPlus, Building2, Calendar } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

function NetworkSidebar() {

    const { pathname: url } = useLocation();
    const menuItems = [
        { icon: Users, label: 'Connections', count: 1234 },
        { icon: UserPlus, label: 'Following & Followers', count: 847 },
        { icon: Building2, label: 'Groups', count: 15 },
        { icon: Calendar, label: 'Events', count: 6 },
    ];

    return (
        <>
            <div className={'rounded-xl border bg-card text-card-foreground bg-gray-50 shadow'}>
                <h2 className="font-semibold px-4 py-2">Manage my network</h2>
                <nav>
                    {menuItems.map((item) => (
                        <button
                            key={item.label}
                            className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors"
                        >
                            <div className="flex items-center gap-3">
                                <item.icon className="h-5 w-5 text-gray-500" />
                                <span>{item.label}</span>
                            </div>
                            <span className="text-gray-500">{item.count}</span>
                        </button>
                    ))}
                </nav>
            </div>
            {
                url.includes("/jobs") &&
                <div className="bg-white rounded-lg shadow mt-4">
                    <div className="p-2 flex flex-col text-sm font-semibold text-[#0a66c2] px-4 gap-2 justify-evenly">
                        <Link className="font-semibold hover:underline hover:underline-offset-1">Post a free job</Link>
                        <Link to={"/newsletters"} className="font-semibold hover:underline hover:underline-offset-1">NewsLetters</Link>
                    </div>
                </div>
            }
            <div className="rounded-lg shadow mt-4">
                <Link to="/jobs">
                    <img src={"/feed_ads.png"} alt="Ad" className="w-full rounded-lg" />
                </Link>
            </div>
        </>
    );
}

export default NetworkSidebar