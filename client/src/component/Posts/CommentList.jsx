import React, { useEffect, useState } from 'react';
import Comment from './Comment';
const CommentsList = ({ post, toggleComments, postCommentVisibility }) => {
  const [comments, setComments] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (post && post.id && postCommentVisibility[post.id]) {
      fetch(`/posts/${post.id}/comments`)
        .then((res) => {
          if (!res.ok) {
            throw new Error('Failed to fetch comments');
          }
          return res.json();
        })
        .then((data) => {
          setComments(data);
        })
        .catch((error) => {
          console.log('An error occurred:', error);
          setError('Failed to fetch comments');
        });
    }
  }, [post, postCommentVisibility]);

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this comment?");

    if (confirmed) {
      try {
        await fetch(`/comments/${id}`, {
          method: 'DELETE',
        });

        setComments((prevComments) => prevComments.filter(comment => comment.id !== id));
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  const handleCommentAdded = (newComment) => {
    setComments((prevComments) => [...prevComments, newComment]);
  };

  return (
    <div className="comments-section">
      <h1 className='comment-heading'>Comments</h1>
      <ul>
        {comments.map((comment) => (
          <li key={comment.id} className="comment-item">
            <div className="comment-content">
              <div className='comment-top'>
                <h1>{comment.user.name}</h1>
                <span
                  className="delete-comment"
                  onClick={() => handleDelete(comment.id)}
                >
                  x
                </span>
              </div>
              <p>{comment.comment}</p>
            </div>
          </li>
        ))}
      </ul>
      <Comment
        user_id={post.user_id}
        post_id={post.id}
        onCommentAdded={handleCommentAdded} 
      />
      {error && <p className="comment-error">Error: {error}</p>}
    </div>
  );
};

export default CommentsList;
