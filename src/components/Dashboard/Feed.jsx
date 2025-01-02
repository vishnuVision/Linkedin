import PropTypes from 'prop-types';
import PostCard from './PostCard';

export default function Feed({ posts, isLimit = false, refreshPost }) {
  return (
    <div className="space-y-4">
      {
        isLimit && posts && posts.length > 0 && posts.slice(0, 3).map((post, idx) => (
          <PostCard key={idx} post={post} refreshPost={refreshPost}/>
        ))
      }
      {
        !isLimit && posts && posts.length > 0 && posts.map((post, idx) => (
          <PostCard key={idx} post={post} refreshPost={refreshPost}/>
        ))
      }
    </div>
  );
}

Feed.propTypes = {
  posts: PropTypes.array,
  isLimit: PropTypes.bool,
  refreshPost: PropTypes.func
}