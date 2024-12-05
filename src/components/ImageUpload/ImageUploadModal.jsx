    import { X } from 'lucide-react';
import ImageGrid from './ImageGrid';
import DropZone from './DropZone';
import PropTypes from 'prop-types';
import VideoGrid from './VideoGrid';

function ImageUploadModal({ isOpen, setIsOpen, accept,images,setImages,previews,setPreviews,setShowCreatePost }) {
    const handleFileChange = (files) => {
        if (!files) return;

        const newFiles = Array.from(files);
        const newPreviews = newFiles.map(file => URL.createObjectURL(file));

        setImages(prev => [...prev, ...newFiles]);
        setPreviews(prev => [...prev, ...newPreviews]);
    };

    const handleRemove = (index) => {
        setImages(prev => prev.filter((_, i) => i !== index));
        setPreviews(prev => {
            URL.revokeObjectURL(prev[index]);
            return prev.filter((_, i) => i !== index);
        });
    };

    const onClose = () => {
        setIsOpen(false);
        setImages([]);
        setPreviews([]);
    }

    const handleCreatePost = () => {
        setIsOpen(false);
        setShowCreatePost(true);
    }

    if (!isOpen) return null;

    return (
        <>
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg w-full max-w-2xl">
                    <div className="border-b p-4 flex justify-between items-center">
                        <h2 className="text-xl font-semibold">Editor</h2>
                        <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full">
                            <X className="w-6 h-6" />
                        </button>
                    </div>
                    <div className="p-6">
                        {previews.length === 0 ? (
                            <DropZone onFileChange={handleFileChange} accept={accept} />
                        ) : accept.includes('image') ? (
                            <ImageGrid
                                previews={previews}
                                onRemove={handleRemove}
                                onFileChange={handleFileChange}
                            />
                        ) :
                            <VideoGrid
                                videos={images}
                                previews={previews}
                                onRemove={handleRemove}
                                onFileChange={handleFileChange}
                            />
                        }
                    </div>

                    <div className="border-t p-4 flex justify-end gap-3">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-full"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleCreatePost}
                            className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

ImageUploadModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    accept: PropTypes.string,
    setIsOpen: PropTypes.func,
    images:PropTypes.array,
    setImages:PropTypes.func,
    previews:PropTypes.array,
    setPreviews:PropTypes.func,
    setShowCreatePost:PropTypes.func
};

export default ImageUploadModal