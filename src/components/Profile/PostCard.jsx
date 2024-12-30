import { Heart } from "lucide-react"
import moment from "moment";
import PropTypes from "prop-types"
import { useSelector } from "react-redux";

function PostCard({ post }) {
    const { user } = useSelector(state => state.authReducer);
    return (
        <div className="flex flex-col gap-2 border-t border-gray-200 pt-4">
            <div className="flex gap-2 items-center">
                <p className="text-xs text-slate-700"><span className="font-semibold">{user.firstName + " " + user.lastName}</span> posted this</p>
                <div className="flex items-center gap-2">
                    <div className="h-1 p-[3px] w-1 rounded-full bg-slate-500"></div>
                    <p className="text-xs text-slate-700">{moment(post.createdAt).fromNow()}</p>
                </div>
            </div>
            <div className="flex items-center overflow-hidden gap-2">
                {
                    post.image && <img src={post.image} alt="" className="w-16 h-16 rounded-md" />
                }
                <div className="line-clamp-2">
                    {post.text}
                </div>
            </div>
            <div className="flex items-center gap-1 my-4">
                <Heart className="px-1 bg-red-200 rounded-full" />
                {
                    Number.parseInt(post?.likeCount) > 0 && (
                        <p className="text-xs text-slate-700">{post.isLike ? "You & " : ""}{post.likeCount} Others</p>
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
