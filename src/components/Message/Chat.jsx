import { useEffect, useRef, useState } from 'react';
import { Image, Paperclip, Smile, X } from 'lucide-react';
import EmojiPicker from "emoji-picker-react";

const Chat = () => {
  const [message, setMessage] = useState('');
  const imageRef = useRef(null);
  const [image, setImage] = useState();
  const [imageList, setImageList] = useState([]);
  const [fileList, setFileList] = useState([]);
  const [showPicker, setShowPicker] = useState(false);

  const handleSend = (e) => {
    e.preventDefault();
    if (message.trim()) {
      // Handle sending message
      setMessage('');
    }
  };

  const handleImageUpload = () => {
    imageRef?.current.click();
  }

  const deleteImage = (index) => {
    setImageList(imageList.filter((media, idx) => idx !== index));
    setFileList(fileList.filter((skill, idx) => idx !== index))
  }

  useEffect(() => {
    if (image && imageList.length <= 5) {
      const previewURL = URL.createObjectURL(image);
      setImageList(prev => [...prev, { name: image.name, preview: previewURL }]);
      setFileList(prev => [...prev, image]);
    }
  }, [image])

  const handleEmojiClick = (emojiData) => {
    setMessage((prev) => prev + emojiData.emoji);
    setShowPicker(false);
  };

  return (
    <div className="w-full flex flex-col h-full">
      <div className="border-b border-gray-200 p-4">
        <div className="flex items-center">
          <img
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330"
            alt="Sarah Wilson"
            className="w-12 h-12 rounded-full object-cover"
          />
          <div className="ml-4">
            <h2 className="font-semibold text-gray-900">Sarah Wilson</h2>
            <p className="text-sm text-gray-500">Product Designer at Design Co</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <div className="flex justify-end">
          <div className="bg-blue-600 text-white rounded-lg py-2 px-4 max-w-xs">
            Hi Sarah! Thanks for connecting.
          </div>
        </div>
        <div className="flex">
          <div className="bg-gray-100 rounded-lg py-2 px-4 max-w-xs">
            Thanks for reaching out! I had love to discuss potential collaboration opportunities.
          </div>
        </div>
      </div>

      <div className='flex flex-col'>
        {
          imageList && imageList.length > 0 && imageList.map((image, idx) => (
            <div className='flex justify-between items-center p-4 border-y-[1px] border-gray-200' key={idx}>
              <div className='flex gap-4 items-center'>
                <img className='w-10' src={image.preview} alt="" />
                <p>{image?.name}</p>
              </div>
              <div>
                <button onClick={() => deleteImage(idx)}>
                  <X />
                </button>
              </div>
            </div>
          ))
        }
      </div>

      <form onSubmit={handleSend} className="border-t-2 border-gray-200">
        <div className="flex flex-col items-center">
          <div className='w-full px-2 py-4'>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write a message..."
              className="w-full border-none rounded-lg px-1 py-2 bg-[#866f55] bg-opacity-10 focus:outline-none bg-"
            />
          </div>

          <div className='flex justify-between w-full items-center border-t border-gray-200 p-2 py-2'>
            <div className='flex items-center gap-4'>
              <button onClick={handleImageUpload} type="button" className="text-gray-500 hover:text-gray-600">
                <Image className="w-5 h-5" />
                <input className='hidden' type='file' ref={imageRef} onChange={(e) => setImage(e.target.files[0])} />
              </button>
              <button onClick={handleImageUpload} type="button" className="text-gray-500 hover:text-gray-600">
                <Paperclip className="w-5 h-5" />
              </button>
              <button onClick={() => setShowPicker((prev) => !prev)} type="button" className="relative text-gray-500 hover:text-gray-600">
                <Smile className="w-5 h-5" />
                {showPicker && (
                  <div className="absolute bottom-8 left-0 z-10">
                    <EmojiPicker onEmojiClick={handleEmojiClick} />
                  </div>
                )}
              </button>
            </div>
            <button
              type="submit"
              className="bg-blue-600 text-white rounded-full px-3 hover:bg-blue-700"
            >
              send
            </button>
          </div>

        </div>
      </form>
    </div>
  );
};

export default Chat;