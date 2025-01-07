import { ThumbsUp } from "lucide-react"
import moment from "moment";
import PropTypes from "prop-types"
import { useContext } from "react";
import { useSelector } from "react-redux";
import { filterContext } from "../../contextApi/filterContext";
import { useNavigate } from "react-router-dom";

function PostCard({ post }) {
    const { user } = useSelector(state => state.authReducer);
    const {setPost} = useContext(filterContext);
    const navigate = useNavigate();

    const handleRedirect = () => {
        setPost(post);
        if(post)
            return navigate(`/single-post/${post._id}`);
    }

    return (
        <div onClick={handleRedirect} className="flex flex-col gap-2 border-t border-gray-200 pt-4 hover:cursor-pointer">
            <div className="flex gap-2 items-center">
                <p className="text-xs text-slate-700"><span className="font-semibold">{user.firstName + " " + user.lastName}</span> posted this</p>
                <div className="flex items-center gap-2">
                    <div className="h-1 p-[3px] w-1 rounded-full bg-slate-500"></div>
                    <p className="text-xs text-slate-700">{moment(post.createdAt).fromNow()}</p>
                </div>
            </div>
            <div className="flex items-center overflow-hidden gap-2">
                {
                    post.media && <img src={post.media[0]} alt="" className="w-16 h-16 rounded-md" />
                }
                <div className="line-clamp-2">
                    {post.text}
                </div>
            </div>
            <div className="flex items-center gap-1 my-4">
                <ThumbsUp className="px-[2px] h-6 fill-red-500" />
                {
                    Number.parseInt(post?.likeCount) > 0 && (
                        <p className="text-xs text-slate-700">{post.isLike ? "Liked by you" : `${post?.likeCount} others`}{post.isLike && post?.likeCount > 0 && ` & ${post?.likeCount} others`}</p>
                    )
                }
                {
                    Number.parseInt(post?.likeCount) <= 0 && (
                        <p className="text-xs text-slate-700">{0}</p>
                    )
                }
            </div>
        </div>
    )
}

PostCard.propTypes = {
    post: PropTypes.object
}

export default PostCard
