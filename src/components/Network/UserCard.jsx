import { Clock, Plus } from "lucide-react";
import { Link } from "react-router-dom"
import PropTypes from "prop-types";
import { useState } from "react";

export function UserCard({ name, title, avatar, mutualConnections }) {
  const [isConnected, setIsConnected] = useState(false);
  return (
    <div className={'rounded-xl border bg-card text-card-foreground shadow border-gray-300 bg-gray-50'}>
      <div className="p-4">
        <div className="flex flex-col items-center text-center">
          <Link to={`/profile/${name}`}>
            <img
              src={avatar}
              alt={name}
              className="w-20 h-20 rounded-full mb-4 object-cover"
            />
          </Link>
          <Link to={`/profile/${name}`} className="font-semibold text-lg">{name}</Link>
          <Link to={`/profile/${name}`} className="text-sm text-gray-600 mb-2">{title}</Link>
          <p className="text-xs text-gray-500 mb-4">
            {mutualConnections} mutual connections
          </p>
          {
            !isConnected && (
              <button onClick={()=>setIsConnected(true)} className="w-full text-[#0a66c2] border border-[#0a66c2] rounded-full justify-center flex items-center hover:bg-blue-50 hover:border-blue-600">
                <Plus className="text-[#0a66c2] px-1" />
                Connect
              </button>
            )
          }
          {
            isConnected && (
              <button onClick={()=>setIsConnected(false)} className="w-full border border-slate-500 hover:border-slate-700 hover:bg-gray-200 rounded-full justify-center flex items-center bg-gray-100">
                <Clock className=" px-1" />
                Pending
              </button>
            )
          }

        </div>
      </div>
    </div>
  );
}

UserCard.propTypes = {
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  mutualConnections: PropTypes.number.isRequired,
};