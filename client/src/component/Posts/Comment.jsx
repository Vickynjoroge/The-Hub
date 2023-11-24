import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Comments.css';

function Comment({ user_id, post_id, onCommentAdded }) {
  const [commentText, setCommentText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAddComment = async (e) => {
    e.preventDefault();

    const newComment = {
      comment: commentText,
      user_id: user_id,
      post_id: post_id,
    };

    try {
      setLoading(true);
      const response = await fetch(`/posts/${post_id}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ comment: newComment }),
      });

      if (response.ok) {
        const data = await response.json();
        setCommentText('');
        if (onCommentAdded) {
          onCommentAdded(data);
          // alert('Comment added successfully');
          setTimeout(() => {
            window.alert = () => { };
          }, 100);
        }
      } else {
        throw new Error('Failed to create comment');
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="comment-container">
      <form className="comment-form" onSubmit={handleAddComment}>
        <label className='comment-form-heading'>Comment</label>
        <input
          className="comment-input"
          type="text"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        />
        <div className="comment-buttons">
          <button className="comment-button" type="submit" disabled={loading}>
            {loading ? 'Adding Comment...' : 'Add Comment'}
          </button>
        </div>
        {error && <p className="comment-error">Error: {error}</p>}
      </form>
    </div>
  );
}

Comment.propTypes = {
  user_id: PropTypes.number.isRequired, 
  post_id: PropTypes.number.isRequired,
  onCommentAdded: PropTypes.func,
};

export default Comment;
