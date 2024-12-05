import { Link } from "react-router-dom"

function UserRequest() {
    return (
        <div className="px-4 border-b border-gray-200 py-3 flex-grow w-full">
            <div className="flex gap-2 items-center flex-wrap">
                <Link to={"/profile/1"} Link>
                    <img className="w-16 h-16 object-contain rounded-full" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                </Link>
                <div className="flex flex-col flex-grow">
                    <Link to={"/profile/1"} className="font-bold hover:underline">Vishnu Mandlesara</Link>
                    <p className="truncate max-w-60 text-ellipsis whitespace-nowrap overflow-hidden">Software Engineer at Google Inc Student of BSC IT from SRKI ghfddddddddddddddddddddddddddddddddddddddddddd dgh                fdfffffffffff dggggggggggggggggggggg</p>
                </div>
                <div className="flex gap-2">
                    <button className="px-4 py-1 rounded-full border hover:bg-gray-100">Ignore</button>
                    <button className="px-4 py-1 rounded-full bg-blue-100 border border-blue-500 hover:bg-blue-200">Accept</button>
                </div>
            </div>
        </div>
    )
}

export default UserRequest
