import { Image, MessageSquare, Send, Share2, Smile, ThumbsUp, X } from "lucide-react"
import PropTypes from "prop-types"
import ImageGrid from "./ImageGrid"
import { Link, useParams } from "react-router-dom"
import { useContext, useEffect, useRef, useState } from "react"
import moment from "moment";
import useApi from "../../hook/useApi"
import EmojiPicker from "emoji-picker-react"
import CommentList from "../comments/CommentList";
import { PostContext as refereshPost } from "../../pages/Profile";
import PostContext from "../../contextApi/postContext.js";
import { useSelector } from "react-redux"

function PostCard({ post }) {
    const [isLiked, setIsLiked] = useState(post?.isLike || false);
    const [isComment, setIsComment] = useState(false);
    const [likeCount, setLikeCount] = useState(post.likeCount || 0);
    const [comment, setComment] = useState(post.comment || []);
    const [media, setMedia] = useState();
    const [content, setContent] = useState("");
    const fileRef = useRef(null);
    const { apiAction } = useApi();
    const [imagePreview, setImagePreview] = useState("");
    const [showPicker, setShowPicker] = useState(false);
    const user = useSelector((state) => state.authReducer.user); 
    const {id} = useParams();
    const isAuthor = id === user._id;
    const setPosts = useContext(refereshPost)?.setPosts;

    const handleLike = async () => {
        if (isLiked) {
            const { success,data } = await apiAction({
                url: `/api/v1/post/like/removeLike/${post?._id}`,
                method: "DELETE",
                header: {}
            });

            if (success) {
                setIsLiked(false);
                setLikeCount(likeCount - 1);
                editPosts(likeCount-1,data?.post);
            }
        }
        else {
            const { success,data } = await apiAction({
                url: `/api/v1/post/like/addLike/${post._id}`,
                method: "POST",
                data: { type: "post" }
            });

            if (success) {
                setIsLiked(true);
                setLikeCount(likeCount + 1);
                editPosts(likeCount+1,data?.post);
            }
        }
    }  
    
    const editPosts = async (likeCount,id) => {
        if(!setPosts) return;
        setPosts((prev) => prev.map((post) => {
            if (post._id === id) {
                return {
                    ...post,
                    likeCount: likeCount,
                    isLike: !isLiked
                };
            }
            return post;
        }));
    }

    const editPostsForComment = async (comments,id) => {
        if(!setPosts) return;
        setPosts((prev) => prev.map((post) => {
            if (post._id === id) {
                return {
                    ...post,
                    comment: comments
                };
            }
            return post;
        }));
    }

    const handleFileUpload = async () => {
        fileRef.current.click();
    }

    useEffect(() => {
        if (!media) return;

        setImagePreview(URL.createObjectURL(media));
    }, [media])

    const handleComment = async () => {
        if (!content && !media) return;
        const formData = new FormData();
        formData.append("media", media);
        formData.append("text", content);

        const { success, data } = await apiAction({
            url: `/api/v1/post/comment/addComment/${post._id}`,
            method: "POST",
            isFormData: true,
            data: formData
        });

        if (success && data) {
            editPostsForComment([...comment,data],data?.referenceId);
            setComment(prev => [...prev, data]);
            setContent("");
            setImagePreview("");
            setMedia(null);
        }
    }

    const handleEmojiClick = (emojiData) => {
        setContent((prev) => prev + emojiData.emoji);
        setShowPicker(false);
    };

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
        <div key={post._id} className="bg-white rounded-lg shadow mb-4 border border-gray-200">
            <div className="p-4">
                <Link to={post.authorType === "page" ? `/company/${isAuthor ? post.author : post.authorDetails?._id}/` : post.authorType === "group" ? `/groups/${isAuthor ? post.author : post.authorDetails?._id}` : post.authorType === "event" ? `/events/${isAuthor ? post.author : post.authorDetails?._id}` : post.authorType === "company" ? `/company/${isAuthor ? post.author : post.authorDetails?._id}` : `/profile/${isAuthor ? post.author : post.authorDetails?._id}`} className="flex items-start gap-3">
                    {
                        post.authorDetails?.avatar && (
                            <img src={post.authorDetails?.avatar}
                            onError={(e) => { e.target.src = `https://ui-avatars.com/api/?name=${post.authorDetails?.name}` }} alt={post.authorDetails?.name} className="w-12 h-12 border rounded-full object-cover" />       
                        )
                    }
                    <div>
                        <h3 className="font-semibold hover:underline hover:text-[#1da1f2]">{isAuthor ? user?.firstName+" "+user?.lastName : post.authorDetails?.name}</h3>
                        <p className="text-sm text-gray-500 leading-tight">{isAuthor ? user?.description : post.authorDetails?.description}</p>
                        <p className="text-xs text-gray-400 leading-none">{moment(post.createdAt).fromNow()}</p>
                    </div>
                </Link>

                <p className="mt-3">{post.text}</p>

                {post?.media && post?.media.length > 0 && (
                    <div className="mt-4">
                        <ImageGrid images={post.media} />
                    </div>
                )}

                <div className="flex gap-3 mt-3 text-sm text-gray-500">
                    <span>{likeCount} likes</span>
                    <span>{comment?.length || 0} comments</span>
                </div>
            </div>

            <div className="border-t border-gray-100 py-2 flex justify-evenly">
                <button onClick={handleLike} className="flex items-center gap-2 py-2 px-1 hover:bg-gray-100 rounded-lg text-gray-600">
                    <ThumbsUp className={`w-5 h-5 ${isLiked ? "fill-blue-600" : ""}`} />
                    <span className={`hidden sm:block ${isLiked ? "text-blue-600" : ""}`}>Like</span>
                </button>
                <button onClick={() => setIsComment(prev => !prev)} className="flex items-center gap-2 py-2 hover:bg-gray-100 px-1 rounded-lg text-gray-600">
                    <MessageSquare className="w-5 h-5" />
                    <span className='hidden sm:block'>Comment</span>
                </button>
                <button className="flex items-center gap-2 py-2 px-1 hover:bg-gray-100 rounded-lg text-gray-600">
                    <Share2 className="w-5 h-5" />
                    <span className='hidden sm:block'>Share</span>
                </button>
                <button className="flex items-center gap-2 py-2 px-1 hover:bg-gray-100 rounded-lg text-gray-600">
                    <Send className="w-5 h-5" />
                    <span className='hidden sm:block'>Send</span>
                </button>
            </div>

            {
                isComment && (
                    <div className="p-4 border-b border-gray-200">
                        <div className="flex flex-wrap items-start gap-4 sm:gap-6">
                            <img
                                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover"
                                src={user?.avatar || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
                                alt="User avatar"
                            />

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
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
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
                                                onClick={handleFileUpload}
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
                                        onClick={handleComment}
                                        className="bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-full px-4 py-1 text-sm sm:text-base"
                                    >
                                        Comment
                                    </button>
                                </div>
                            </div>
                        </div>
                        <PostContext value={{ commentList: comment, setCommentList: setComment }}>
                            <div className="mt-4">
                                {
                                    comment && comment.length > 0 &&
                                    <CommentList isPostAuthor={post?.author === user?._id} postId={post?._id} />
                                }
                            </div>
                        </PostContext>
                    </div>
                )
            }
        </div>
    )
}

PostCard.propTypes = {
    post: PropTypes.object,
}

export default PostCard


