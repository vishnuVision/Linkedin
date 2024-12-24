import { X } from "lucide-react"
import ImageGrid from "./ImageGrid"
import VideoGrid from "./VideoGrid"
import PropTypes from "prop-types"
import { useRef, useState } from "react";
import ReactPlayer from 'react-player';

function CreatePostModal({ accept = "image/*", videos, previews, isOpen, setIsOpen, setPreviews, setVideos }) {
    const textareaRef = useRef(null);
    const [content, setContent] = useState("");
    const [isValid, setIsValid] = useState(false);

    if (!isOpen) return null;

    const handleInputChange = async (e) => {
        const regex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/;
        setIsValid(regex.test(e.target.value));
        setContent(e.target.value);

        const textarea = textareaRef.current;
        textarea.style.height = "auto";
        textarea.style.height = `${textarea.scrollHeight}px`;
    };

    const handleFormSubmit = () => {
        console.log(content);
        console.log(videos);
        console.log(accept);
        // setIsOpen(false);
        // setVideos([]);
        // setPreviews([]);
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
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg w-full max-w-2xl">
                <div className="border-b p-4 flex justify-between items-center">
                    <div className="flex gap-2 items-center">
                        <img className="w-10 h-10 object-cover rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" alt="" />
                        <p className="font-semibold">Vishnu Mandlesara</p>
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
                        onClick={handleClose}
                        className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-full"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleFormSubmit}
                        className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700"
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
    setPreviews: PropTypes.func
}

export default CreatePostModal
