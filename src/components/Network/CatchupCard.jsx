import { CircleCheck } from "lucide-react";
import { useState } from "react"
import { Link } from "react-router-dom"

function CatchupCard() {
    const [isMessageSent, setIsMessageSent] = useState(false);
    return (
        <div className="border-b border-gray-200 flex-grow w-full">
            <div className="">
                <div className="flex gap-2 items-start p-4">
                    <Link to={"/profile/1"}>
                        <img className="w-16 h-16 object-contain rounded-full" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                    </Link>
                    <div className="flex flex-col flex-grow">
                        <Link to={"/profile/1"} className="font-bold">Vishnu Mandlesara</Link>
                        <Link to={"/profile/1"} className="truncate max-w-60 text-ellipsis whitespace-nowrap overflow-hidden">Software Engineer at Google Inc Student of BSC IT from SRKI ghfddddddddddddddddddddddddddddddddddddddddddd dgh                fdfffffffffff dggggggggggggggggggggg</Link>
                        <div className="mt-4">
                            {
                                !isMessageSent && <button onClick={()=>setIsMessageSent(true)} className="px-4 py-1 rounded-full border hover:bg-gray-100">Happy Birthday Vishnu!</button>
                            }
                            {
                                isMessageSent && <div className="text-[#01754f] flex gap-1">
                                    <CircleCheck className="fill-[#01754f] text-white"/>
                                    <p>Message sent</p>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CatchupCard
