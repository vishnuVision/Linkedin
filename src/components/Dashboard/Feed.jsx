import { ThumbsUp, MessageSquare, Share2, Send } from 'lucide-react';
import { Link } from "react-router-dom";
import ImageGrid from './ImageGrid';

export default function Feed() {
  const posts = [
    {
      _id: 1,
      author: {
        name: 'Sarah Johnson',
        title: 'Product Manager at Tech Co',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        isCompany: true
      },
      images: [
        'https://images.unsplash.com/photo-1531498860502-7c67cf02f657?w=800',
        'https://images.unsplash.com/photo-1531973576160-7125cd663d86?w=800',
        'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800',
        'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800',
        'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800',
      ],
      content: 'Excited to announce that we have just launched our new product! 🚀',
      likes: 234,
      comments: 45,
      time: '2h'
    },
    {
      id: 2,
      author: {
        name: 'Michael Chen',
        title: 'Software Engineer',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
      },
      images:[],
      content: 'Just completed an amazing coding workshop on React and TypeScript. The future of web development is bright! 💻',
      likes: 156,
      comments: 23,
      time: '4h'
    },
    {
      _id: 3,
      author: {
        name: 'Sarah Johnson',
        title: 'Product Manager at Tech Co',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
      },
      images: [
        'https://images.unsplash.com/photo-1531498860502-7c67cf02f657?w=800',
        'https://images.unsplash.com/photo-1531973576160-7125cd663d86?w=800',
        'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800',
        'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800',
        'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800',
      ],
      content: 'Excited to announce that we have just launched our new product! 🚀',
      likes: 234,
      comments: 45,
      time: '2h'
    },
    {
      _id: 4,
      author: {
        name: 'Sarah Johnson',
        title: 'Product Manager at Tech Co',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
      },
      images: [
        'https://images.unsplash.com/photo-1531498860502-7c67cf02f657?w=800',
        'https://images.unsplash.com/photo-1531973576160-7125cd663d86?w=800',
        'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800',
        'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800',
        'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800',
      ],
      content: 'Excited to announce that we have just launched our new product! 🚀',
      likes: 234,
      comments: 45,
      time: '2h'
    },
    {
      _id: 5,
      author: {
        name: 'Sarah Johnson',
        title: 'Product Manager at Tech Co',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
      },
      images: [
        'https://images.unsplash.com/photo-1531498860502-7c67cf02f657?w=800',
        'https://images.unsplash.com/photo-1531973576160-7125cd663d86?w=800',
        'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800',
        'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800',
        'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800',
      ],
      content: 'Excited to announce that we have just launched our new product! 🚀',
      likes: 234,
      comments: 45,
      time: '2h'
    },
  ];

  return (
    <div className="space-y-4">
      {posts.map(post => (
        <div key={post._id} className="bg-white rounded-lg shadow mb-4 border border-gray-200">
          <div className="p-4">
            <Link to={post.author.isCompany ? `/company/${post.author.name}/` : `/profile/${post.author.name}`} className="flex items-start gap-3">
              <img src={post.author.image} alt={post.author.name} className="w-12 h-12 rounded-full object-cover" />
              <div>
                <h3 className="font-semibold hover:underline hover:text-[#1da1f2]">{post.author.name}</h3>
                <p className="text-sm text-gray-500">{post.author.title}</p>
                <p className="text-xs text-gray-400">{post.time}</p>
              </div>
            </Link>

            <p className="mt-3">{post.content}</p>

            {post.images.length > 0 && (
              <div className="mt-4">
                <ImageGrid images={post.images} />
              </div>
            )}

            <div className="flex gap-3 mt-3 text-sm text-gray-500">
              <span>{post.likes} likes</span>
              <span>{post.comments} comments</span>
            </div>
          </div>

          <div className="border-t border-gray-100 py-2 flex justify-evenly">
            <button className="flex items-center gap-2 py-2 hover:bg-gray-100 rounded-lg text-gray-600">
              <ThumbsUp className="w-5 h-5" />
              <span className='hidden sm:block'>Like</span>
            </button>
            <button className="flex items-center gap-2 py-2 hover:bg-gray-100 rounded-lg text-gray-600">
              <MessageSquare className="w-5 h-5" />
              <span className='hidden sm:block'>Comment</span>
            </button>
            <button className="flex items-center gap-2 py-2 hover:bg-gray-100 rounded-lg text-gray-600">
              <Share2 className="w-5 h-5" />
              <span className='hidden sm:block'>Share</span>
            </button>
            <button className="flex items-center gap-2 py-2 hover:bg-gray-100 rounded-lg text-gray-600">
              <Send className="w-5 h-5" />
              <span className='hidden sm:block'>Send</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}