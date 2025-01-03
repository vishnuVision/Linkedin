import { Trash2, Edit2, Plus } from 'lucide-react';
import PropTypes from 'prop-types';

function ImageGrid({ previews, onRemove, onFileChange }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {previews.map((preview, index) => (
        <div key={preview} className="relative group aspect-square">
          <img
            src={preview}
            alt={`Upload ${index + 1}`}
            className="w-full h-full object-cover rounded-lg"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-2">
            <button
              onClick={() => onRemove(index)}
              className="p-2 bg-white rounded-full hover:bg-gray-100"
            >
              <Trash2 className="w-5 h-5 text-gray-700" />
            </button>
            <button onClick={() => onFileChange(index)} className="p-2 bg-white rounded-full hover:bg-gray-100">
              <Edit2 className="w-5 h-5 text-gray-700" />
            </button>
          </div>
        </div>
      ))}
      
      {previews.length < 9 && (
        <label
          htmlFor="add-more"
          className="aspect-square border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-50"
        >
          <div className="flex flex-col items-center gap-2">
            <Plus className="w-8 h-8 text-gray-400" />
            <span className="text-sm text-gray-500">Add more</span>
          </div>
          <input
            type="file"
            id="add-more"
            multiple
            accept="image/*"
            onChange={(e) => onFileChange(e.target.files)}
            className="hidden"
          />
        </label>
      )}
    </div>
  );
}

ImageGrid.propTypes = {
    previews: PropTypes.any,
    onRemove: PropTypes.any,
    onFileChange: PropTypes.any
}

export default ImageGrid