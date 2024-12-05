import { useRef, useEffect } from "react";
import { Trash2, Play, Plus } from "lucide-react";
import PropTypes from "prop-types";

function VideoGrid({ videos, previews, onRemove, onFileChange }) {
  const videoRefs = useRef([]);

  useEffect(() => {
    videoRefs.current = videoRefs.current.slice(0, previews.length);
  }, [previews]);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {previews.map((preview, index) => (
        <div key={preview} className="relative group aspect-video">
          <video
            ref={(el) => (videoRefs.current[index] = el)}
            src={preview}
            className="w-full h-full object-cover rounded-lg"
            onLoadedMetadata={() => {
              if (videoRefs.current[index]) {
                videoRefs.current[index].currentTime = 1;
              }
            }}
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-2">
            <button
              onClick={() => onRemove(index)}
              className="p-2 bg-white rounded-full hover:bg-gray-100"
            >
              <Trash2 className="w-5 h-5 text-gray-700" />
            </button>
            <button
              onClick={() => {
                const video = videoRefs.current[index];
                if (video) {
                  video.paused ? video.play() : video.pause();
                }
              }}
              className="p-2 bg-white rounded-full hover:bg-gray-100"
            >
              <Play className="w-5 h-5 text-gray-700" />
            </button>
          </div>
          <div className="absolute bottom-2 right-2 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded">
            {(videos[index]?.size / (1024 * 1024)).toFixed(1)} MB
          </div>
        </div>
      ))}

      {previews.length < 5 && (
        <label
          htmlFor="add-more-video"
          className="aspect-video border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-50"
        >
          <div className="flex flex-col items-center gap-2">
            <Plus className="w-8 h-8 text-gray-400" />
            <span className="text-sm text-gray-500">Add more</span>
          </div>
          <input
            type="file"
            id="add-more-video"
            multiple
            accept="video/*"
            onChange={(e) => onFileChange(e.target.files)}
            className="hidden"
          />
        </label>
      )}
    </div>
  );
}

VideoGrid.propTypes = {
    videos: PropTypes.array.isRequired,
    previews: PropTypes.array.isRequired,
    onRemove: PropTypes.func.isRequired,
    onFileChange: PropTypes.func.isRequired
};

export default VideoGrid;
