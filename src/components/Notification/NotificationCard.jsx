import { User } from 'lucide-react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const NotificationCard = ({ avatar, content, timestamp, isRead }) => {
  return (
    <div className={`p-4 hover:bg-gray-50 cursor-pointer ${!isRead ? 'bg-blue-50' : ''}`}>
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0">
          {avatar ? (
            <Link to={"/profile/1"}>
              <img src={avatar} alt="" className="h-12 w-12 rounded-full" />
            </Link>
          ) : (
            <Link to={"/profile/1"} className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center">
              <User className="h-6 w-6 text-gray-500" />
            </Link>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm text-gray-900">{content}</p>
          <p className="text-xs text-gray-500 mt-1">{timestamp}</p>
        </div>
      </div>
    </div>
  );
};

NotificationCard.propTypes = {
    avatar:PropTypes.string,
    content:PropTypes.string,
    timestamp:PropTypes.string,
    isRead:PropTypes.bool
}

export default NotificationCard;