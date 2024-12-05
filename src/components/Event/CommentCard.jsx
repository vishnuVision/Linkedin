function CommentCard() {
    return (
        <div className="px-4 py-2 flex-grow w-full">
            <div className="flex gap-2 items-start">
                <div>
                    <img className="w-10 h-10 object-contain rounded-full" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                </div>
                <div className="flex flex-col flex-grow overflow-hidden">
                    <h1 className="font-bold">Vishnu Mandlesara</h1>
                    <p className="truncate max-w-96 text-ellipsis whitespace-nowrap overflow-hidden">Software Engineer at Google Inc Student of BSC IT from SRKI ghfddddddddddddddddddddddddddddddddddddddddddd dgh                fdfffffffffff dggggggggggggggggggggg</p>
                    <p className="max-w-96 break-words">Comment Content Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem nisi, fuga aperiam nobis distinctio facilis sequi porro nam beatae dolore repellat consequatur sapiente modi culpa, enim soluta iste doloremque ipsum.</p>
                </div>
            </div>
        </div>
    )
}

export default CommentCard
