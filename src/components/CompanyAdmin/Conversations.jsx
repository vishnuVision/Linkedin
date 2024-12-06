import { MoreHorizontal, MoveRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const posts = [
    {
        company: {
            name: "W3Schools.com",
            logo: "https://images.unsplash.com/photo-1549921296-3b0f9a35af35?w=40&h=40&q=80",
            followers: "1,871,418"
        },
        timePosted: "19h",
        content: "300k subscribers on YouTube! 🎉",
        image: "https://images.unsplash.com/photo-1555066931-bf19f8fd1085?w=400&h=300&q=80",
        engagement: {
            reactions: 67,
            comments: 2,
            reposts: 1
        }
    },
    {
        company: {
            name: "W3Schools.com",
            logo: "https://images.unsplash.com/photo-1549921296-3b0f9a35af35?w=40&h=40&q=80",
            followers: "1,871,418"
        },
        timePosted: "1d",
        content: "What does !false mean in programming? 🤔",
        image: "https://images.unsplash.com/photo-1555066932-e78dd8fb77bb?w=400&h=300&q=80",
        engagement: {
            reactions: 317,
            comments: 9,
            reposts: 14
        }
    }
];

export function Conversations() {
    return (
        <div className="rounded-xl bg-gray-50 pt-4 border bg-card text-card-foreground shadow">
            <div className='px-4 pb-2'>
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h2 className="text-xl font-semibold">Join conversations</h2>
                        <p className="text-sm text-gray-600 mt-1">
                            Build brand awareness and community by engaging with recent conversations
                        </p>
                    </div>
                </div>

                <div className="space-y-4">
                    {posts.map((post, index) => (
                        <div key={index} className="border rounded-lg p-4">
                            <div className="flex items-start justify-between">
                                <div className="flex gap-3">
                                    <div className="h-12 w-12">
                                        <img src={post.company.logo} alt={post.company.name} />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold">{post.company.name}</h3>
                                        <p className="text-sm text-gray-600">{post.company.followers} followers</p>
                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                            <span>{post.timePosted}</span>
                                            <span>•</span>
                                            <span>Sign up</span>
                                        </div>
                                    </div>
                                </div>
                                <button size="icon">
                                    <MoreHorizontal className="h-5 w-5" />
                                </button>
                            </div>

                            <p className="mt-3">{post.content}</p>

                            {post.image && (
                                <img
                                    src={post.image}
                                    alt="Post content"
                                    className="mt-3 w-full h-48 object-cover rounded-lg"
                                />
                            )}

                            <div className="mt-3 flex items-center gap-4 text-sm text-gray-600">
                                <span>{post.engagement.reactions} reactions</span>
                                <span>{post.engagement.comments} comments</span>
                                <span>{post.engagement.reposts} reposts</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Link to={"feed/"} className='flex gap-1 hover:bg-gray-100 cursor-pointer justify-center items-center border-t border-gray-200 p-2 mt-2 rounded-b-lg'>
                Show feed
                <span>
                    <MoveRight className='pl-1'/>
                </span>
            </Link>
        </div>
    );
}