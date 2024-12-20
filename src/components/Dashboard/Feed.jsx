import PropTypes from 'prop-types';
import PostCard from './PostCard';

export default function Feed({posts}) {
  return (
    <div className="space-y-4">
      {posts && posts.length > 0 && posts.map((post,idx) => (
        <PostCard key={idx} post={post}/>
      ))}
    </div>
  );
}

Feed.propTypes = {
  posts: PropTypes.array  
}