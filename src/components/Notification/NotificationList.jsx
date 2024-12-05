import NotificationCard from "./NotificationCard";


const mockNotifications = [
  {
    id: 1,
    content: "Sarah Miller viewed your profile",
    timestamp: "2 hours ago",
    isRead: false,
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop"
  },
  {
    id: 2,
    content: "Tech Innovations Inc. posted a new job that matches your preferences",
    timestamp: "5 hours ago",
    isRead: false
  },
  {
    id: 3,
    content: "John Doe liked your post about Web Development trends",
    timestamp: "1 day ago",
    isRead: true,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop"
  },
  {
    id: 4,
    content: "React Developer Group: New discussion about React 18 features",
    timestamp: "2 days ago",
    isRead: true
  },
  {
    id: 5,
    content: "React Developer Group: New discussion about React 18 features",
    timestamp: "2 days ago",
    isRead: true
  },
  {
    id: 6,
    content: "React Developer Group: New discussion about React 18 features",
    timestamp: "2 days ago",
    isRead: true
  },
  {
    id: 7,
    content: "React Developer Group: New discussion about React 18 features",
    timestamp: "2 days ago",
    isRead: true
  },
  {
    id: 8,
    content: "React Developer Group: New discussion about React 18 features",
    timestamp: "2 days ago",
    isRead: true
  },
  {
    id: 9,
    content: "React Developer Group: New discussion about React 18 features",
    timestamp: "2 days ago",
    isRead: true
  },
  {
    id: 10,
    content: "React Developer Group: New discussion about React 18 features",
    timestamp: "2 days ago",
    isRead: true
  },
  {
    id:11,
    content: "React Developer Group: New discussion about React 18 features",
    timestamp: "2 days ago",
    isRead: true
  },
  {
    id: 12,
    content: "React Developer Group: New discussion about React 18 features",
    timestamp: "2 days ago",
    isRead: true
  },
  {
    id: 13,
    content: "React Developer Group: New discussion about React 18 features",
    timestamp: "2 days ago",
    isRead: true
  }
];

const NotificationsList = () => {
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Notifications</h2>
          <button className="text-sm text-blue-600 hover:text-blue-800">
            Mark all as read
          </button>
        </div>
      </div>
      <div className="divide-y divide-gray-200">
        {mockNotifications.map((notification) => (
          <NotificationCard
            key={notification.id}
            avatar={notification.avatar}
            content={notification.content}
            timestamp={notification.timestamp}
            isRead={notification.isRead}
          />
        ))}
      </div>
    </div>
  );
};

export default NotificationsList;