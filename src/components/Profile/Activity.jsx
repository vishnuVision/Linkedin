import { MoveRight } from "lucide-react"
import PostCard from "./PostCard"
import { useState } from "react";
import CreatePostModal from "../ImageUpload/CreatePostModal";
import { Link, useParams } from "react-router-dom";
import PropTypes from "prop-types";

function Activity({followers}) {
    const [isVisible, setIsVisible] = useState(false);
    const [previews, setPreviews] = useState([]);
    const [files, setFiles] = useState([]);
    const {id} = useParams();
    return (
        <>
            <div className="bg-white rounded-lg shadow pt-6 mt-4">
                <div className="mb-4 flex justify-between px-4">
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">Activity</h2>
                        <p className="font-semibold text-[#0a66c2]">{followers} followers</p>
                    </div>
                    <div>
                        <button onClick={() => setIsVisible(prev=>!prev)} className="text-[#0a66c2] border border-[#0a66c2] font-semibold px-4 py-1 rounded-full hover:bg-blue-50 hover:border-blue-600">create a post</button>
                    </div>
                </div>
                <div className="flex flex-col px-4">
                    <PostCard />
                    <PostCard />
                    <PostCard />
                </div>
                <div className="hover:bg-gray-100 border-t border-gray-200">
                    <Link to={`/profile/${id}/all-posts`} className="w-full p-2 flex justify-center items-center gap-2 text-lg font-semibold">
                        Show all posts
                        <MoveRight className="pt-[2px]"/>
                    </Link>
                </div>
            </div>
            <CreatePostModal isOpen={isVisible} setIsOpen={setIsVisible} accept={"image/*"} previews={previews} setPreviews={setPreviews} setVideos={setFiles} videos={files} />
        </>
    )
}

Activity.propTypes = {
    followers: PropTypes.number,
    user: PropTypes.any
}

export default Activity
