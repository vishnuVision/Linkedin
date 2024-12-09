import { UserCard } from "./UserCard";
import UserRequest from "./UserRequest";

const suggestedConnections = [
    {
        name: 'Sarah Wilson',
        title: 'Senior Software Engineer at Tech Corp',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        mutualConnections: 12,
    },
    {
        name: 'Michael Chen',
        title: 'Product Manager at Innovation Labs',
        avatar: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        mutualConnections: 8,
    },
    {
        name: 'Emma Thompson',
        title: 'UX Designer at Creative Studio',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        mutualConnections: 15,
    },
    {
        name: 'David Rodriguez',
        title: 'Frontend Developer at Web Solutions',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        mutualConnections: 6,
    },
    {
        name: 'Sarah Wilson',
        title: 'Senior Software Engineer at Tech Corp',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        mutualConnections: 12,
    },
    {
        name: 'Michael Chen',
        title: 'Product Manager at Innovation Labs',
        avatar: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        mutualConnections: 8,
    },
    {
        name: 'Emma Thompson',
        title: 'UX Designer at Creative Studio',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        mutualConnections: 15,
    },
    {
        name: 'David Rodriguez',
        title: 'Frontend Developer at Web Solutions',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        mutualConnections: 6,
    },
];

function Growpage() {
    return (
        <>
            <div className="col-span-12 lg:col-span-9 md:col-span-8 max-h-[90vh] md:overflow-y-scroll someElement">
                <div className='flex flex-col mt-4 items-start bg-gray-50 rounded-lg border'>
                    <h1 className="w-full px-4 py-2 border-b border-gray-200">Invitations</h1>
                    <UserRequest/>
                    <UserRequest/>
                    <UserRequest/>
                </div>
            </div>
            <div className='bg-gray-50 px-4 py-2 mt-4 rounded-lg border'>
                <div className='mt-4'>
                    <h2 className="text-md text-gray-700 font-semibold mb-4">People you may know</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {suggestedConnections.map((connection) => (
                            <UserCard
                                key={connection.name}
                                {...connection}
                            />
                        ))}
                    </div>
                </div>
                <div className='mt-4'>
                    <h2 className="text-md text-gray-700 font-semibold mb-4">Popular Groups</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {suggestedConnections.map((connection) => (
                            <UserCard
                                key={connection.name}
                                {...connection}
                            />
                        ))}
                    </div>
                </div>
                <div className='mt-4'>
                    <h2 className="text-md text-gray-700 font-semibold mb-4">Popular Newsletters</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {suggestedConnections.map((connection) => (
                            <UserCard
                                key={connection.name}
                                {...connection}
                            />
                        ))}
                    </div>
                </div>
                <div className='mt-4'>
                    <h2 className="text-md text-gray-700 font-semibold mb-4">Popular Events</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {suggestedConnections.map((connection) => (
                            <UserCard
                                key={connection.name}
                                {...connection}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Growpage