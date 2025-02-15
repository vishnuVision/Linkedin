import { Image, Video, Calendar, FileText } from 'lucide-react';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ImageUploadModal from '../ImageUpload/ImageUploadModal';
import CreatePostModal from '../ImageUpload/CreatePostModal';
import { useSelector } from 'react-redux';

function CreatePost({refereshData}) {
  const [isModalOpenForImage, setIsModalOpenForImage] = useState(false);
  const [isModalOpenForVideo, setIsModalOpenForVideo] = useState(false);
  const [previews, setPreviews] = useState([]);
  const [files, setFiles] = useState([]);
  const [accept, setAccept] = useState('image/*');
  const [showCreatePost, setShowCreatePost] = useState(false);
  const { pathname } = useLocation();
  const {user} = useSelector(state=>state.authReducer);  
  
  return (
    <div className="bg-white rounded-lg shadow p-2 md:p-4 mb-4">
      <div className="flex gap-4 mb-4">
        <Link to={`/profile/${user?._id}`} className='hover:underline hover:underline-offset-2'>
          <img
            src={user?.avatar ? user?.avatar : `https://ui-avatars.com/api/?name=${user?.firstName}+${user?.lastName}`}
            alt={user?.name}
            className="w-12 h-12 rounded-full object-cover"
          />
        </Link>
        <button onClick={() => { setIsModalOpenForImage(true); setAccept("image/*") }} className="flex-1 text-left px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-500">
          Start a post
        </button>
      </div>

      <div className="w-full flex justify-between px-2">
        <PostButton onclick={() => { setIsModalOpenForImage(true); setAccept("image/*") }} icon={<Image className="w-6 md:h-6 text-blue-500" />} label="Photo" />
        <PostButton onclick={() => { setIsModalOpenForVideo(true); setAccept("video/*") }} icon={<Video className="w-6 md:h-6 text-green-500" />} label="Video" />
        {
          !pathname.includes("/newsletter") && (
            <>
              <PostLink to={"/newsletters"} icon={<FileText className="w-6 h-6 text-red-500" />} label="Newsletter" />
              <PostLink to={"/events"} icon={<Calendar className="w-6 md:h-6 text-orange-500" />} label="Event" />
            </>
          )
        }
        {
          pathname.includes("/newsletter") && (
            <PostLink to={`${pathname}/createarticle`} icon={<FileText className="w-6 h-6 text-red-500" />} label="write article" />
          )
        }
      </div>
      <ImageUploadModal
        isOpen={isModalOpenForImage}
        setIsOpen={setIsModalOpenForImage}
        accept="image/*"
        setPreviews={setPreviews}
        setImages={setFiles}
        setShowCreatePost={setShowCreatePost}
        images={files}
        previews={previews}
      />
      <ImageUploadModal
        isOpen={isModalOpenForVideo}
        setIsOpen={setIsModalOpenForVideo}
        accept="video/*"
        setPreviews={setPreviews}
        setImages={setFiles}
        setShowCreatePost={setShowCreatePost}
        images={files}
        previews={previews}
      />
      <CreatePostModal isOpen={showCreatePost} setIsOpen={setShowCreatePost} accept={accept} previews={previews} setPreviews={setPreviews} setVideos={setFiles} videos={files} refereshData={refereshData}/>
    </div>
  );
}

CreatePost.propTypes = {
  refereshData: PropTypes.func
}

export default CreatePost;

function PostButton({ icon, label, onclick }) {
  return (
    <button onClick={onclick} className="flex items-center gap-2 py-2 px-2 hover:bg-gray-100 rounded-lg">
      {icon}
      <span className="text-gray-600 hidden sm:block">{label}</span>
    </button>
  );
}

PostButton.propTypes = {
  icon: PropTypes.element.isRequired,
  label: PropTypes.string.isRequired,
  onclick: PropTypes.func
}

function PostLink({ icon, label, to }) {
  return (
    <Link to={to} className="flex items-center gap-2 py-2 px-2 hover:bg-gray-100 rounded-lg">
      {icon}
      <span className="text-gray-600 hidden sm:block">{label}</span>
    </Link>
  );
}

PostLink.propTypes = {
  icon: PropTypes.element.isRequired,
  label: PropTypes.string.isRequired,
  to: PropTypes.string
}