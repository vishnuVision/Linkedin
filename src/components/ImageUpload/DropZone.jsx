import { useCallback } from 'react';
import { Upload } from 'lucide-react';
import PropTypes from 'prop-types';

function DropZone({ onFileChange,accept }) {
  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    onFileChange(e.dataTransfer.files);
  }, [onFileChange]);

  return (
    <div
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center"
    >
      <div className="flex flex-col items-center gap-4">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
          <Upload className="w-8 h-8 text-blue-600" />
        </div>
        <div>
          <p className="text-lg font-semibold">Drag and drop your photos here</p>
          <p className="text-gray-500 mt-1">or click to upload</p>
        </div>
        <input
          type="file"
          multiple
          accept={accept}
          onChange={(e) => onFileChange(e.target.files)}
          className="hidden"
          id="file-upload"
        />
        <label
          htmlFor="file-upload"
          className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 cursor-pointer"
        >
          Select from computer
        </label>
      </div>
    </div>
  );
}

DropZone.propTypes = {
    onFileChange:PropTypes.func,
    accept:PropTypes.string
}

export default DropZone