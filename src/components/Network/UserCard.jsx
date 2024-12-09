import { Plus } from "lucide-react";
import { Link } from "react-router-dom"
import PropTypes from "prop-types";

export function UserCard({ name, title, avatar, mutualConnections }) {
  return (
    <Link to={`/profile/${name}`} className={'rounded-xl border bg-card text-card-foreground shadow border-gray-300 bg-gray-50'}>
      <div className="p-4">
        <div className="flex flex-col items-center text-center">
          <Link to={`/profile/${name}`}>
            <img
              src={avatar}
              alt={name}
              className="w-20 h-20 rounded-full mb-4 object-cover"
            />
          </Link>
          <h3 className="font-semibold text-lg">{name}</h3>
          <p className="text-sm text-gray-600 mb-2">{title}</p>
          <p className="text-xs text-gray-500 mb-4">
            {mutualConnections} mutual connections
          </p>
          <button className="w-full text-[#0a66c2] border border-[#0a66c2] rounded-full justify-center flex items-center hover:bg-blue-50 hover:border-blue-600">
            <Plus className="text-[#0a66c2] px-1" />
            Connect
          </button>
        </div>
      </div>
    </Link>
  );
}

UserCard.propTypes = {
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  mutualConnections: PropTypes.number.isRequired,
};