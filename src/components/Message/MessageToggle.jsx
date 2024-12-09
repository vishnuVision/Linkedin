import PropTypes from "prop-types";

const MessageToggle = ({ name, avatar, lastMessage, time, unread,setIsOpen }) => {
  return (
    <div onClick={()=>setIsOpen(prev=>!prev)} className="flex items-center p-4 hover:bg-gray-50 cursor-pointer border-b border-gray-100">
      <img
        src={avatar}
        alt={name}
        className="w-12 h-12 rounded-full object-cover"
      />
      <div className="ml-4 flex-1">
        <div className="flex justify-between items-center">
          <h3 className={`font-medium ${unread ? 'text-black' : 'text-gray-700'}`}>
            {name}
          </h3>
          <span className="text-xs text-gray-500">{time}</span>
        </div>
        <p className={`text-sm mt-1 ${unread ? 'text-black font-medium' : 'text-gray-600'}`}>
          {lastMessage}
        </p>
      </div>
    </div>
  );
};

MessageToggle.propTypes = {
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  lastMessage: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  unread: PropTypes.bool,
  setIsOpen:PropTypes.func
}

export default MessageToggle;