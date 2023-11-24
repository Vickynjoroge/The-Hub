import React, { useState, useEffect } from "react";
import "./Posts.css";
import { FaHeart, FaComment, FaTimes } from "react-icons/fa"; // Import icons
import AddPost from "./AddPost";
import CommentList from "./CommentList";
import moment from "moment";

function Post({ user_id  }) {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [likes, setLikes] = useState({});
  const [postCommentVisibility, setPostCommentVisibility] = useState({});

  const toggleComments = (postId) => {
    setPostCommentVisibility((prevVisibility) => ({
      ...prevVisibility,
      [postId]: !prevVisibility[postId],
    }));
  };

  const handlePostAdded = (newPost) => {
    setPosts((prevPosts) => [
      ...prevPosts,
      newPost,
    ]);
  };

  const fetchLikesFromLocalStorage = () => {
    const storedLikes = localStorage.getItem('likes');
    if (storedLikes) {
      setLikes(JSON.parse(storedLikes));
    }
  };

  const fetchPosts = async () => {
    try {
      const response = await fetch('/posts');
      if (!response.ok) {
        throw new Error('Failed to fetch posts');
      }
      const data = await response.json();
      setPosts(data);
      setIsLoading(false);
    } catch (error) {
      console.log('An error occurred:', error);
      setError('Failed to fetch posts');
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
    fetchLikesFromLocalStorage();
  }, []);

  const handleLike = async (id) => {
    if (likes[id]) {
      alert("You have already liked this post.");
      return;
    }
  
    try {
      const response = await fetch(`/posts/${id}/increment_likes`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      if (data.likes !== undefined) {
        setLikes((prevLikes) => ({
          ...prevLikes,
          [id]: data.likes,
        }));
        localStorage.setItem('likes', JSON.stringify({
          ...likes,
          [id]: data.likes,
        }));
      } else {
        console.log('Failed to update likes. Data:', data);
      }
    } catch (error) {
      console.error('Error updating likes:', error);
    }
  };
  

  const handleDelete = async (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this post?');

    if (confirmed) {
      try {
        await fetch(`/posts/${id}`, {
          method: 'DELETE',
        });
        fetchPosts();
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  const addNewPost = (newPost) => {
    setPosts((prevPosts) => [
      ...prevPosts, newPost
    ]);
  };

  const handleCommentAdded = (postId, newComment) => {
    setPosts((prevPosts) => {
      const updatedPosts = prevPosts.map((post) => {
        if (post.id === postId) {
          return { ...post, comments: [...post.comments, newComment] };
        }
        return post;
      });
      return updatedPosts;
    });
  };

  const formatDate = (dateString) => {
    const postDate = moment(dateString);
    return postDate.calendar(null, {
      sameDay: "[Today] HH:mm",
      nextDay: "[Tomorrow] HH:mm",
      nextWeek: "ddd, HH:mm",
      lastDay: "[Yesterday] HH:mm",
      lastWeek: "ddd, HH:mm",
      sameElse: "DD/MM/YYYY HH:mm",
    });
  };

  return (
    <div className="post-container">
      <div>
        <h1 className="post-heading">Feeds</h1>
        <AddPost user_id={user_id} onPostCreated={handlePostAdded} />
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          <div>
            {posts.map((post) => (
              <div key={post.id} className="post-card">
                <div className="post-start">
                  <p className="post-user"> {post.user.username}</p>
                  <p className="post-creation">{formatDate(post.created_at)}</p>
                  <FaTimes className="post-delete-button" onClick={() => handleDelete(post.id)} />
                </div>
                <img src={post.image_url} alt="Post" className="post-image" />
                <p className="post-description">Description: {post.description}</p>
                <div className="post-interactions">
                  <div className="post-interaction-like">
                    <FaHeart
                      className={`like-icon ${likes[post.id] ? "active" : ""}`}
                      onClick={() => handleLike(post.id)}
                    />
                    <p className="post-like-count">: {likes[post.id] || 0}</p>
                  </div>
                  <div className="post-interaction-comment">
                    <FaComment
                      className={`comment-icon ${postCommentVisibility[post.id] ? "active" : ""}`}
                      onClick={() => toggleComments(post.id)}
                    />
                  </div>
                </div>
                {postCommentVisibility[post.id] && (
                  <ul className="post-comments">
                    <CommentList
                      post={post}
                      toggleComments={toggleComments}
                      postCommentVisibility={postCommentVisibility}
                      onCommentAdded={handleCommentAdded}
                    />
                  </ul>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      <div>
      </div>
    </div>
  );
}

export default Post;