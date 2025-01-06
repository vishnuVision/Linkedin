import { X } from "lucide-react"
import ImageGrid from "./ImageGrid"
import VideoGrid from "./VideoGrid"
import PropTypes from "prop-types"
import { useEffect, useRef, useState } from "react";
import ReactPlayer from 'react-player';
import useApi from "../../hook/useApi";
import { useSelector } from "react-redux";
import {toast} from "react-toastify";

function CreatePostModal({ accept = "image/*", videos, previews, isOpen, setIsOpen, setPreviews, setVideos, refereshData }) {
    const textareaRef = useRef(null);
    const [content, setContent] = useState("");
    const [isValid, setIsValid] = useState(false);
    const { user } = useSelector((state) => state.authReducer);
    const { apiAction } = useApi();
    const [isDisabled, setIsDisabled] = useState(true);
    const [isLoading,setIsLoading] = useState(false);

    useEffect(()=>{
        if(content || videos.length > 0){
            setIsDisabled(false);
        }
        else
        {
            setIsDisabled(true);
        }
    },[content,videos])

    if (!isOpen) return null;

    const handleInputChange = async (e) => {
        const regex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/;
        setIsValid(regex.test(e.target.value));
        setContent(e.target.value);

        const textarea = textareaRef.current;
        textarea.style.height = "auto";
        textarea.style.height = `${textarea.scrollHeight}px`;
    };

    const handleFormSubmit = async () => {
        if (!content && videos.length <= 0) return;
        
        let toastId = toast.loading("Uploading...");
        setIsLoading(true);
        const media = videos.map((file) => file);
        const formData = new FormData();
        media.forEach((file) => {
            formData.append("media", file);
        });
        formData.append("text", content);
        formData.append("viewPriority", "anyone");
        formData.append("referenceId", user._id);
        formData.append("isVideo",accept==="video/*"?true:false);
        // formData.append("authorType", "");

        const { success, data } = await apiAction({
            url: `/api/v1/post/createPost`,
            method: "POST",
            isFormData: true,
            data: formData
        });

        if (success && data) {
            refereshData();
            toast.update(toastId, { render: "Post uploaded successfully", type: "success", isLoading: false, autoClose: 3000 });
        }
        else
        {
            toast.update(toastId, { render: data.message, type: "error", isLoading: false, autoClose: 3000 });
        }
        setIsLoading(true);
        setIsOpen(false);
        setVideos([]);
        setPreviews([]);
        setContent("");
    }

    const handleFileChange = (files) => {
        if (!files) return;

        const newFiles = Array.from(files);
        const newPreviews = newFiles.map(file => URL.createObjectURL(file));

        setVideos(prev => [...prev, ...newFiles]);
        setPreviews(prev => [...prev, ...newPreviews]);
    };

    const handleRemove = (index) => {
        setVideos(prev => prev.filter((_, i) => i !== index));
        setPreviews(prev => {
            URL.revokeObjectURL(prev[index]);
            return prev.filter((_, i) => i !== index);
        });
    };

    const handleClose = () => {
        setVideos([]);
        setPreviews([]);
        setIsOpen(false);
        setContent("");
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg w-full max-w-2xl">
                <div className="border-b p-4 flex justify-between items-center">
                    <div className="flex gap-2 items-center">
                        <img className="w-10 h-10 object-cover rounded-full border border-gray-200" src={user?.avatar} alt="" />
                        <p className="font-semibold">{user?.firstName + " " + user?.lastName}</p>
                    </div>
                    <button onClick={handleClose} className="p-1 hover:bg-gray-100 rounded-full">
                        <X className="w-6 h-6" />
                    </button>
                </div>
                <textarea
                    ref={textareaRef}
                    value={content}
                    onChange={handleInputChange}
                    className="w-full rounded p-2 resize-none overflow-hidden focus:outline-none text-lg px-4"
                    rows={1}
                    placeholder="What do you want to talk about?"
                />
                <div className={`${isValid ? "block" : "hidden"}`}>
                    <ReactPlayer
                        url={content}
                        controls
                        playing
                        width="100%"
                        height="360px"
                    />
                </div>
                <div className="p-4">
                    {accept?.includes('image') ? (
                        <ImageGrid
                            previews={previews}
                            onFileChange={handleFileChange}
                            onRemove={handleRemove}
                        />
                    ) :
                        <VideoGrid
                            videos={videos}
                            previews={previews}
                            onFileChange={handleFileChange}
                            onRemove={handleRemove}
                        />
                    }
                </div>

                <div className="border-t p-4 flex justify-end gap-3">
                    <button
                        disabled={isLoading}
                        onClick={handleClose}
                        className={`px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-full ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                    >
                        Cancel
                    </button>
                    <button
                        disabled={isDisabled || isLoading}
                        onClick={handleFormSubmit}
                        className={`px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 ${isDisabled || isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                    >
                        Post
                    </button>
                </div>
            </div>
        </div>
    )
}

CreatePostModal.propTypes = {
    accept: PropTypes.string,
    previews: PropTypes.array,
    videos: PropTypes.array,
    isOpen: PropTypes.bool,
    setIsOpen: PropTypes.func,
    setVideos: PropTypes.func,
    setPreviews: PropTypes.func,
    refereshData: PropTypes.func
}

export default CreatePostModal
