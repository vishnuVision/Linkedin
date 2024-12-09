import { Heart } from "lucide-react"

function PostCard() {
    return (
        <div className="flex flex-col gap-2 border-t border-gray-200 pt-4">
            <div>
                <p className="text-xs text-slate-700"><span className="font-semibold">Vishnu Mandlesara</span> posted this</p>
            </div>
            <div className="flex items-center overflow-hidden gap-2">
                <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" className="w-16 h-16 rounded-md" />
                <p className="truncate max-w-full text-ellipsis whitespace-nowrap overflow-hidden">Software Engineer at Google Inc Student of BSC IT from SRKI ghfddddddddddddddddddddddddddddddddddddddddddd dgh                fdfffffffffff dggggggggggggggggggggg</p>
            </div>
            <div className="flex items-center gap-1 my-4">
                <Heart className="px-1 bg-red-200 rounded-full"/>
                <p>23</p>
            </div>
        </div>
    )
}

export default PostCard
