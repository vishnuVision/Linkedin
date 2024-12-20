import PropTypes from "prop-types"

function CommentCard({comment}) {
    return (
        <div className="px-4 py-2 flex-grow w-full">
            <div className="flex gap-2 items-start">
                <div>
                    <img className="w-10 h-10 object-contain rounded-full" src={comment?.owner[0].avatar} alt={comment?.owner[0].firstName+" "+comment?.owner[0].lastName} />
                </div>
                <div className="flex flex-col flex-grow overflow-hidden">
                    <h1 className="font-bold">{comment?.owner[0].firstName+" "+comment?.owner[0].lastName}</h1>
                    {/* <p className="truncate max-w-96 text-ellipsis whitespace-nowrap overflow-hidden">Software Engineer at Google Inc Student of BSC IT from SRKI ghfddddddddddddddddddddddddddddddddddddddddddd dgh                fdfffffffffff dggggggggggggggggggggg</p> */}
                    <p className="max-w-96 break-words">{comment?.text}</p>
                </div>
            </div>
        </div>
    )
}

CommentCard.propTypes = {
    comment: PropTypes.object
}

export default CommentCard
