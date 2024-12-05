function NetworkCard() {
    return (
        <div className="px-4 border-b border-gray-200 py-2 flex-grow w-full">
            <div className="flex gap-2 items-center">
                <div className="">
                    <img className="w-20 h-20 object-contain rounded-full" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                </div>
                <div className="flex flex-col relative overflow-hidden">
                    <h1 className="font-bold">Vishnu Mandlesara</h1>
                    <p className="truncate max-w-fit text-ellipsis whitespace-nowrap overflow-hidden">Software Engineer at Google Inc Student of BSC IT from SRKI ghfddddddddddddddddddddddddddddddddddddddddddd dgh                fdfffffffffff dggggggggggggggggggggg</p>
                </div>
            </div>
        </div>
    )
}

export default NetworkCard
