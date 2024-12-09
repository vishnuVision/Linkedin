import { Image } from "lucide-react"
import CommentCard from "./CommentCard"

function Comment() {
    return (
        <div className="p-4 border-b border-gray-200">
            <div className="flex flex-wrap justify-between items-start gap-2">
                <img className="w-8 h-8 object-contain rounded-full" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                <div className="border border-gray-300 rounded-lg flex-grow overflow-hidden">
                    <textarea
                        className="border-none rounded-md p-2 focus:outline-none focus:ring-0 focus:border-transparent w-full"
                        placeholder="Add a Comment..."
                    ></textarea>
                    <div className="flex justify-between px-2 py-2">
                        <button>
                            <Image />
                        </button>
                        <button className="bg-[#0a66c2] rounded-full px-4 py-1 text-white">
                            Comment
                        </button>
                    </div>
                </div>
            </div>
            <div className="mt-4">
                <CommentCard />
                <CommentCard />
                <CommentCard />
            </div>
        </div>
    )
}

export default Comment
