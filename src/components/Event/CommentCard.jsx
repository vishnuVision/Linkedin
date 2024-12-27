import PropTypes from "prop-types"

function CommentCard({ comment }) {
    return (
        <div className="px-4 py-2 flex-grow w-full">
            <div className="flex gap-2 items-start flex-col">
                <div className="flex gap-2">
                    <div className="flex justify-start">
                        <img className="w-10 h-10 object-contain rounded-full" src={comment?.owner?.length > 0 ? comment?.owner[0].avatar : "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"} alt={comment.owner?.length > 0 ? comment?.owner[0].firstName + " " + comment?.owner[0].lastName : "Any"} />
                    </div>
                    <div className="flex flex-col flex-grow overflow-hidden">
                        <h1 className="font-bold">{comment.owner?.length > 0 ? comment?.owner[0].firstName + " " + comment?.owner[0].lastName : "Any"}</h1>
                        {
                            comment?.owner?.length > 0 &&
                            <p className="truncate max-w-96 text-ellipsis whitespace-nowrap overflow-hidden">{comment?.owner[0]?.bio}</p>
                        }
                        <p className="max-w-96 break-words">{comment?.text}</p>
                    </div>
                </div>
                <div className="ps-10">
                    {
                        comment?.media &&
                        <img className="w-1/2 h-1/2 object-contain border" src={comment?.media} alt="" />
                    }
                </div>
            </div>
            {
                comment?.subComments && comment?.subComments?.length > 0 && comment?.subComments?.map((comment) => {
                    return (
                        <CommentCard key={comment?._id} comment={comment} />
                    )
                })
            }
        </div>
    )
}

CommentCard.propTypes = {
    comment: PropTypes.object
}

export default CommentCard
