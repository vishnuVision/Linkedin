import MessageList from '../components/Message/MessageList';
import Chat from '../components/Message/Chat';
import Sidebar from '../components/Dashboard/Sidebar';
import { Menu, Search } from 'lucide-react';
import { useRef, useState } from 'react';

function ChatDashboard() {

    const [displayChat,setDisplayChat]= useState(false);
    const divRef = useRef();

    return (
        <div ref={divRef} className="max-h-[100vh] overflow-hidden bg-transparent">
            <main className="pt-20 px-4">
                <div className="max-w-6xl h-full mx-auto grid grid-cols-12 gap-4">
                    <div className="col-span-12 lg:col-span-9">
                        <div className="bg-white rounded-lg border overflow-hidden">
                            <div className="h-16 bg-white border-b border-gray-200 flex gap-3 md:gap-4 items-center px-4">
                                <button onClick={()=>setDisplayChat(prev=>!prev)} className='block md:hidden'>
                                    <Menu/>
                                </button>
                                <h1 className="text-lg md:text-2xl font-semibold text-gray-900">Messaging</h1>
                                <div className="flex w-80 items-center space-x-2 bg-gray-200 rounded-full px-4 py-2">
                                    <Search className="w-5 h-5 text-gray-500" />
                                    <input
                                        type="text"
                                        placeholder="Search messages"
                                        className="bg-transparent w-full focus:outline-none text-sm"
                                    />
                                </div>
                            </div>
                            <div className="flex h-[calc(100vh-165px)] relative ">
                                <MessageList setDisplayChat={setDisplayChat} displayChat={displayChat} divRef={divRef}/>
                                <Chat />
                            </div>
                        </div>
                    </div>
                    <div className="col-span-3 hidden lg:block">
                        <Sidebar />
                    </div>
                </div>
            </main>
        </div>
    )
}

export default ChatDashboard
