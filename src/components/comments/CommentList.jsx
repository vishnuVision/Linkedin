import PropTypes from 'prop-types';
import CommentThread from './CommentThread';
import { useSelector } from 'react-redux';
import { useContext } from 'react';
import { postContext } from '../../contextApi/postContext';

const CommentList = ({ postAuthor, postId }) => {
    const user = useSelector((state) => state.authReducer.user);
    const { commentList:comments } = useContext(postContext);
     
  return (
    <div className="space-y-5">
      {comments && comments.length > 0 && comments.map((comment,idx) => (
        <CommentThread key={idx} comment={comment} isPostAuthor={postAuthor === user._id} postId={postId}/>
      ))}
    </div>
  );
};

CommentList.propTypes = {
  postAuthor:PropTypes.string,
  postId:PropTypes.string
};

export default CommentList;