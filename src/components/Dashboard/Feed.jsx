import PostCard from './PostCard';

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
      {posts.map((post,idx) => (
        <PostCard key={idx} post={post}/>
      ))}
    </div>
  );
}