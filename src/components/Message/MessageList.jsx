import PropTypes from 'prop-types';
import MessageListItem from './MessageItem';
import { useEffect } from 'react';

const conversations = [
  {
    id: 1,
    name: 'Sarah Wilson',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    lastMessage: 'Thanks for connecting! Looking forward to...',
    time: '2m ago',
    unread: true,
  },
  {
    id: 2,
    name: 'David Chen',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
    lastMessage: 'Would love to discuss the opportunity...',
    time: '1h ago',
    unread: false,
  },
  {
    id: 3,
    name: 'Emily Parker',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
    lastMessage: 'Great presentation yesterday! I wanted to...',
    time: '3h ago',
    unread: true,
  },
  {
    id: 4,
    name: 'Emily Parker',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
    lastMessage: 'Great presentation yesterday! I wanted to...',
    time: '3h ago',
    unread: true,
  },
  {
    id: 5,
    name: 'Emily Parker',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
    lastMessage: 'Great presentation yesterday! I wanted to...',
    time: '3h ago',
    unread: true,
  },
  {
    id: 6,
    name: 'Emily Parker',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
    lastMessage: 'Great presentation yesterday! I wanted to...',
    time: '3h ago',
    unread: true,
  },
  {
    id: 7,
    name: 'Emily Parker',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
    lastMessage: 'Great presentation yesterday! I wanted to...',
    time: '3h ago',
    unread: true,
  },
  {
    id: 8,
    name: 'Emily Parker',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
    lastMessage: 'Great presentation yesterday! I wanted to...',
    time: '3h ago',
    unread: true,
  },
  {
    id: 9,
    name: 'Emily Parker',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
    lastMessage: 'Great presentation yesterday! I wanted to...',
    time: '3h ago',
    unread: true,
  },
  {
    id: 1,
    name: 'Sarah Wilson',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    lastMessage: 'Thanks for connecting! Looking forward to...',
    time: '2m ago',
    unread: true,
  },
];

const MessageList = ({displayChat}) => {

  useEffect(()=>{
    console.log(displayChat);
  },[displayChat])

  return (
    <div className={`border-r border-gray-200 h-full overflow-y-scroll ${displayChat ? "absolute overflow-scroll bg-white block z-40 w-80 max-h-full" : "hidden w-96"}`}>
      <div className="">
        {conversations.map((conversation) => (
          <MessageListItem key={conversation.id} {...conversation} />
        ))}
      </div>
    </div>
  );
};

MessageList.propTypes = {
  displayChat:PropTypes.bool
}

export default MessageList;