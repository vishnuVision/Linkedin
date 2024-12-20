import { Image, MessageSquare, Send, Share2, ThumbsUp } from "lucide-react"
import PropTypes from "prop-types"
import ImageGrid from "./ImageGrid"
import { Link } from "react-router-dom"
import { useState } from "react"
import CommentCard from "../Event/CommentCard";
import moment from "moment";

function PostCard({ post }) {
    const [isLiked, setIsLiked] = useState(false);
    const [isComment, setIsComment] = useState(false);
    return (
        <div key={post._id} className="bg-white rounded-lg shadow mb-4 border border-gray-200">
            <div className="p-4">
                <Link to={post.authorType === "page" ? `/company/${post.authorDetails._id}/` :  post.authorType === "group" ? `/groups/${post.authorDetails._id}` : post.authorType === "event" ? `/events/${post.authorDetails._id}` : post.authorType === "company" ? `/company/${post.authorDetails._id}` : `/profile/${post.authorDetails._id}`} className="flex items-start gap-3">
                    <img src={post.authorDetails.avatar} alt={post.authorDetails.name} className="w-12 h-12 border rounded-full object-cover" />
                    <div>
                        <h3 className="font-semibold hover:underline hover:text-[#1da1f2]">{post.authorDetails.name}</h3>
                        <p className="text-sm text-gray-500 leading-tight">{post.authorDetails.description}</p>
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
                    <span>{post.likeCount} likes</span>
                    <span>{post?.comment?.length || 0} comments</span>
                </div>
            </div>

            <div className="border-t border-gray-100 py-2 flex justify-evenly">
                <button onClick={() => setIsLiked(prev => !prev)} className="flex items-center gap-2 py-2 px-1 hover:bg-gray-100 rounded-lg text-gray-600">
                    <ThumbsUp className={`w-5 h-5 ${isLiked ? "fill-blue-600" : ""}`} />
                    <span className={`hidden sm:block ${isLiked ? "text-blue-600" : ""}`}>Like</span>
                </button>
                <button onClick={()=>setIsComment(prev=>!prev)} className="flex items-center gap-2 py-2 hover:bg-gray-100 px-1 rounded-lg text-gray-600">
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
                        <div className="flex flex-wrap justify-between items-start gap-2">
                            <img className="w-8 h-8 object-contain rounded-full" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                            <div className="border border-gray-300 rounded-lg flex-grow overflow-hidden">
                                <textarea
                                    className="border-none rounded-md p-2 focus:outline-none focus:ring-0 focus:border-transparent w-full"
                                    placeholder="Add a Comment..."
                                ></textarea>
                                <div className="flex justify-between px-2 py-2">
                                    <button>
                                        <Image />
                                    </button>
                                    <button className="bg-[#0a66c2] rounded-full px-4 py-1 text-white">
                                        Comment
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="mt-4">
                            {
                                post?.comment && post.comment.length > 0  && post?.comment?.map(comment => <CommentCard key={comment._id} comment={comment} />)
                            }
                        </div>
                    </div>
                )
            }
        </div>
    )
}

PostCard.propTypes = {
    post: PropTypes.object
}

export default PostCard


