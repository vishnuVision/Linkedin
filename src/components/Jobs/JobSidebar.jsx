import { Bookmark } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

function JobSidebar() {
  const { pathname } = useLocation();
  const items = [
    { label: 'Posted jobs', count: 1, to: "/my-items/posted-jobs",active:pathname.includes("posted-jobs") },
    { label: 'My jobs', count: 18, to: "/my-items/saved-jobs",active:pathname.includes("saved-jobs") },
  ];

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="border border-gray-300 rounded-lg">
        <div className={`py-2 px-2 border-b font-semibold`}>
          <span className="flex gap-2 items-center">
            <Bookmark />
            My items
          </span>
        </div>
        {items.map((item) => (
          <Link
            to={item.to}
            key={item.label}
            className={`flex hover:bg-[#866f55] hover:bg-opacity-10 justify-between items-center py-2 px-2 border-b ${item.active ? 'text-[#0a66c2] font-semibold' : 'text-gray-600'
              }`}
          >
            <span className="flex gap-2 items-center">
              {
                item.Icon && <item.Icon />
              }
              {item.label}
            </span>
            {item.count && <span>{item.count}</span>}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default JobSidebar