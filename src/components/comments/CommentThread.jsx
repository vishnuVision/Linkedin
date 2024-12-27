import PropTypes from 'prop-types';
import Comment from './Comment';
import { useState } from 'react';

const CommentThread = ({ comment, isReply = false, isPostAuthor, postId, isSubComment = false }) => {
    const [isReplying, setIsReplying] = useState(false);

    return (
        <div className={`relative ${isReply ? 'ml-14 mt-2' : ''}`}>
            {isReply && (
                <div className={`absolute left-[-24px] bottom-0 w-[2px] bg-gray-200 ${comment?.media ? "top-[-170px]" : "top-[-90px]"}`} />
            )}
            <div className={`relative ${isReply ? 'before:absolute before:left-[-24px] before:top-8 before:w-[35px] before:h-[2px] before:bg-gray-200' : ''}`}>
                <Comment isReplying={isReplying} setIsReplying={setIsReplying} comment={comment} isPostAuthor={isPostAuthor} postId={postId} isSubComment={isSubComment}/>
            </div>
            {comment?.subComments  && comment?.subComments.length > 0 && (
                <div className="">
                    {comment?.subComments.map((reply,idx) => {
                        return <CommentThread key={idx} comment={reply} isPostAuthor={isPostAuthor} isSubComment={true} postId={postId} isReply />
                    })}
                </div>
            )}
        </div>
    );
};

CommentThread.propTypes = {
    comment: PropTypes.object,
    isReply: PropTypes.bool,
    isPostAuthor: PropTypes.bool,
    postId: PropTypes.string,
    isSubComment: PropTypes.bool
};

export default CommentThread;