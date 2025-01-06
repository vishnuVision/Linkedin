import React, { useContext, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Ellipsis, Heart, Image, MessageCircle, Pen, Smile, Trash2, X } from 'lucide-react';
import moment from 'moment';
import useApi from '../../hook/useApi';
import { useSelector } from 'react-redux';
import { postContext } from '../../contextApi/postContext';
import EmojiPicker from 'emoji-picker-react';

const Comment = ({ comment, isPostAuthor, postId, isSubComment = false, isReplying, setIsReplying }) => {
    const [isLiked, setIsLiked] = React.useState(false);
    const [likesCount, setLikesCount] = React.useState(0);
    const [replyText, setReplyText] = React.useState('');
    const [content, setContent] = useState('');
    const [isDrop, setIsDrop] = useState(false);
    const { apiAction } = useApi();
    const [isEdit, setIsEdit] = useState(false);
    const user = useSelector((state) => state.authReducer.user);
    const { commentList: comments, setCommentList: setComments } = useContext(postContext);
    const [media, setMedia] = useState("");
    const [imagePreview, setImagePreview] = useState("");
    const [showPicker, setShowPicker] = useState(false);
    const fileRef = useRef(null);

    useEffect(() => {
        setIsLiked(comment?.isLike || false);
        setLikesCount(comment?.likeCount || 0);
        setContent(comment?.text || '');
    }, [comment, comments])

    const handleLike = async () => {
        if (isLiked) {
            const { success, data } = await apiAction({
                url: `/api/v1/post/like/removeLike/${comment._id}`,
                method: "DELETE",
                header: {},
            });

            if (success && data) {
                if (isSubComment) {
                    const parentComment = comment?.parentComment;
                    const data2 = comments.map((com) => com._id.toString() === parentComment.toString() ? { ...com, subComments: com.subComments.map((subComment) => subComment._id.toString() === data.post.toString() ? { ...subComment, isLike: false, likeCount: !subComment.likeCount ? 1 : Number.parseInt(subComment.likeCount) - 1 } : subComment) } : com);
                    setComments(data2);
                }
                else {
                    setComments(prev => prev.map((maincomment) => maincomment._id === comment._id ? { ...maincomment, isLike: false, likeCount: !maincomment.likeCount ? 1 : Number.parseInt(maincomment.likeCount) - 1 } : maincomment));
                }
            }
        }
        else {
            const { success, data } = await apiAction({
                url: `/api/v1/post/like/addLike/${comment._id}`,
                method: "POST",
                data: { type: "comment" }
            });

            if (success && data) {
                if (isSubComment) {                    
                    const parentComment = comment?.parentComment;
                    const data2 = comments.map((com) => com._id.toString() === parentComment.toString() ? { ...com, subComments: com.subComments.map((subComment) => subComment._id.toString() === data.post.toString() ? { ...subComment, isLike: true, likeCount:  !subComment.likeCount ? 1 : Number.parseInt(subComment.likeCount) + 1 } : subComment) } : com);
                    setComments(data2);
                }
                else {
                    setComments(prev => prev.map((maincomment) => maincomment._id === comment._id ? { ...maincomment, isLike: true, likeCount: !maincomment.likeCount ? 1 : Number.parseInt(maincomment.likeCount) + 1 } : maincomment));
                }
            }
        }
    }

    const handleDeleteComment = async (commentId) => {
        const { success, data } = await apiAction({
            url: `/api/v1/post/comment/deleteComment/${postId}/${commentId}`,
            method: "DELETE",
            header: {}
        });
        if (success) {
            if(isSubComment) {
                const parentComment = comment?.parentComment;
                setComments(prev => prev.map((comment) => comment._id === parentComment ? { ...comment, subComments: comment.subComments.filter((subComment) => subComment._id !== data._id) } : comment));
            }
            else
            {
                setComments(prev => prev.filter((comment) => comment._id !== data._id));
            }
        }
    }

    const handleEditComment = async (commentId, content) => {
        const { success, data } = await apiAction({
            url: `/api/v1/post/comment/editComment/${postId}/${commentId}`,
            method: "PUT",
            data: { text: content }
        });
        if (success) {
            if(isSubComment) {
                const parentComment = comment?.parentComment;
                setComments(prev => prev.map((comment) => comment._id === parentComment ? { ...comment, subComments: comment.subComments.map((subComment) => subComment._id === data._id ? data : subComment) } : comment));
            }
            else
            {
                setComments(prev => prev.map((comment) => comment._id === data._id ? data : comment));
            }
        }
    }

    const handleSubmitReply = async () => {
        if (!replyText && !media) return;

        const formData = new FormData();
        formData.append("media", media);
        formData.append("text", replyText);
        formData.append("isSubComment", true);

        const { success, data } = await apiAction({
            url: `/api/v1/post/comment/addSubComment/${postId}/${isSubComment ? comment?.parentComment : comment._id}`,
            method: "POST",
            isFormData: true,
            data: formData
        });

        if (success && data) {
            const parentComment = isSubComment ? comment?.parentComment : comment._id;
            const data2 = comments.map((com) => com._id.toString() === parentComment.toString() ? { ...com, subComments: [...com.subComments, data] } : com);
            setComments(data2);
            setIsReplying(false);
            setReplyText("");
            setImagePreview("");
            setMedia(null);
        }
    };

    const handleEmojiClick = (emojiData) => {
        setReplyText((prev) => prev + emojiData.emoji);
        setShowPicker(false);
    };

    useEffect(() => {
        if (!media) return;

        setImagePreview(URL.createObjectURL(media));
    }, [media])

    const adjustPickerPosition = () => {
        const picker = document.querySelector(".emoji-picker-class");
        if (!picker) return;

        const pickerBounds = picker.getBoundingClientRect();
        const viewportWidth = window.innerWidth;

        const spaceAbove = pickerBounds.top;

        if (viewportWidth <= 768) {
            picker.style.left = "50%";
            picker.style.transform = "translate(-50%, 10px)";
            picker.style.width = "100%";
            picker.style.maxWidth = "300px";
        } else {
            if (spaceAbove < pickerBounds.height) {
                picker.style.bottom = "unset";
                picker.style.top = "100%";
                picker.style.transform = "translateY(10px)";
            } else {
                picker.style.top = "unset";
                picker.style.bottom = "100%";
                picker.style.transform = "translateY(-10px)";
            }

            picker.style.left = "0";
            picker.style.transform += " translateX(0)";
            picker.style.width = "auto";
            picker.style.maxWidth = "none";
        }
    };

    useEffect(() => {
        if (showPicker) {
            adjustPickerPosition();
        }

        const handleResize = () => {
            if (showPicker) adjustPickerPosition();
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [showPicker]);

    return (
        <div className="p-4">
            <div className="flex gap-3">
                <img
                    src={comment.owner?.avatar}
                    alt={comment.owner?.firstName + ' ' + comment.owner?.lastName}
                    className="w-10 h-10 rounded-full object-cover"
                />
                <div className='flex-grow'>
                    <div className="bg-gray-50 rounded-lg px-3 pt-1 flex">
                        <div className='flex-grow'>
                            <div className="flex flex-col">
                                <h4 className="font-semibold text-sm">{comment.owner?.firstName + ' ' + comment.owner?.lastName}</h4>
                                <span className="text-xs text-gray-500">Software engineer</span>
                                <span className="text-xs text-gray-500">{moment(comment?.createdAt).fromNow()}</span>
                            </div>
                            <div>
                                {
                                    !isEdit && <p className="mt-2 text-sm text-gray-700">{content}</p>
                                }
                                {
                                    isEdit && <input type="text" value={content} onChange={(e) => setContent(e.target.value)} className='w-full border border-gray-200 rounded-lg px-2 py-1 my-2' placeholder='Enter your comment' />
                                }
                                {
                                    comment?.media &&
                                    <img className="w-1/2 rounded-lg object-contain border" src={comment?.media} alt="" />
                                }
                                {
                                    isEdit && (
                                        <div>
                                            <div className="flex gap-2 mt-3">
                                                <button type='button' onClick={() => setIsEdit(false)} className={`bg-gray-200 hover:bg-gray-300 rounded-lg px-2 py-1`}>Cancel</button>
                                                <button type='button' onClick={() => { handleEditComment(comment._id, content); setIsEdit(false) }} disabled={content === comment?.text} className={`bg-blue-600 rounded-lg px-2 py-1 text-white ${content === comment.text ? "bg-opacity-50 cursor-not-allowed" : "hover:bg-blue-700 "} `}>Save</button>
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                        {
                            (isPostAuthor || user._id === comment?.owner?._id) && (
                                <button type='button' onClick={() => setIsDrop(prev => !prev)} className='relative hover:bg-gray-100 flex items-center justify-center h-8 w-8 rounded-full'>
                                    <Ellipsis />
                                    {
                                        isDrop && (
                                            <div className="fixed w-48 lg:absolute top-8 right-0 sm:right-10 mt-2 lg:right-0 lg:mt-2 bg-white border border-gray-200 rounded-s-lg rounded-b-lg shadow-xl">
                                                <div onClick={() => setIsEdit(true)} className='flex items-center gap-2 p-2 hover:bg-[#866f55] hover:bg-opacity-5'>
                                                    <Pen className='w-4 h-4 font-semibold' />
                                                    <p className='text-sm font-semibold'>Edit</p>
                                                </div>
                                                <div onClick={() => handleDeleteComment(comment._id)} className='flex items-center gap-2 p-2 hover:bg-[#866f55] hover:bg-opacity-5'>
                                                    <Trash2 className='w-4 h-4' />
                                                    <p className='text-sm font-semibold'>Delete</p>
                                                </div>
                                            </div>
                                        )
                                    }
                                </button>
                            )

                        }
                    </div>
                    <div className="mt-2 flex items-center gap-4 text-sm text-gray-600">
                        <button
                            onClick={handleLike}
                            className={`flex items-center gap-1 hover:text-blue-600 ${isLiked ? 'text-blue-600' : ''
                                }`}
                        >
                            <Heart className="w-4 h-4" fill={isLiked ? 'currentColor' : 'none'} />
                            <span>{likesCount}</span>
                        </button>
                        <button
                            onClick={() => {setIsReplying(prev => !prev);setReplyText(comment.owner?.firstName + ' ' + comment.owner?.lastName+' ')}}
                            className="flex items-center gap-1 hover:text-blue-600"
                        >
                            <MessageCircle className="w-4 h-4" />
                            <span>Reply</span>
                        </button>
                    </div>

                    {isReplying && (
                        <div className='mt-4'>
                            <div className="flex-grow border border-gray-300 rounded-2xl relative">
                                {showPicker && (
                                    <div
                                        className="absolute z-10 emoji-picker-class"
                                        style={{
                                            bottom: "100%",
                                            left: 0,
                                            transform: "translateY(-10px)",
                                            maxWidth: "120vw",
                                        }}
                                    >
                                        <EmojiPicker
                                            onEmojiClick={handleEmojiClick}
                                            style={{
                                                width: "100%",
                                                maxHeight: "300px",
                                                overflowY: "auto",
                                                borderRadius: "8px",
                                                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                                            }}
                                        />
                                    </div>
                                )}

                                <textarea
                                    value={replyText}
                                    onChange={(e) => setReplyText(e.target.value)}
                                    className="w-full border-none px-3 py-1 focus:outline-none rounded-t-2xl focus:ring-0 resize-none text-sm sm:text-base"
                                    placeholder="Add a comment..."
                                    rows="2"
                                ></textarea>

                                {imagePreview && (
                                    <div className="px-3 pb-2">
                                        <div className="relative w-32 sm:w-48">
                                            <img
                                                src={imagePreview}
                                                alt="Preview"
                                                className="w-full h-full border rounded-lg object-cover"
                                            />
                                            <button
                                                onClick={() => {
                                                    setImagePreview(null);
                                                    setMedia(null);
                                                }}
                                                className="absolute top-2 right-2 bg-white rounded-full p-1 shadow"
                                            >
                                                <X className="w-4 h-4 text-gray-500" />
                                            </button>
                                        </div>
                                    </div>
                                )}

                                <div className="flex justify-between items-center px-3 py-2 bg-gray-100 rounded-b-2xl">
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => setShowPicker((prev) => !prev)}
                                            type="button"
                                            className="relative text-gray-500 hover:text-gray-600"
                                        >
                                            <Smile />
                                        </button>
                                        {!media && (
                                            <button
                                                onClick={() => { fileRef.current.click() }}
                                                className="relative text-gray-500 hover:text-gray-600"
                                            >
                                                <Image />
                                                <input
                                                    type="file"
                                                    ref={fileRef}
                                                    onChange={(e) => setMedia(e.target.files[0])}
                                                    className="hidden"
                                                />
                                            </button>
                                        )}
                                    </div>

                                    <button
                                        onClick={handleSubmitReply}
                                        className="bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-full px-4 py-1 text-sm sm:text-base"
                                    >
                                        Reply
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div >
    );
};

Comment.propTypes = {
    comment: PropTypes.object,
    setComments: PropTypes.func,
    isPostAuthor: PropTypes.bool,
    postId: PropTypes.string,
    isSubComment: PropTypes.bool,
    isReplying: PropTypes.bool,
    setIsReplying: PropTypes.func
}

export default Comment;