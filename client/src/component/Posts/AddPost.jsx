import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
import "./AddPost.css"; 

function AddPost({ user_id, onPostCreated }) {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    category: "",
    description: "",
    image_url: "",
    user_id: user_id,
  });

  const handleDataChange = (event) => {
    event.preventDefault();
    setFormData({
      ...formData,
      [event.target.id]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch("/posts", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error('Failed to create post');
        }
      })
      .then((data) => {
        if (onPostCreated) {
          onPostCreated(data);
        }
        setShowForm(false);
        setFormData({
          category: '',
          description: '',
          image_url: '',
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };
  
  const handleCancel = () => {
    setShowForm(false);
  };

  const toggleForm = () => {
    setShowForm((prevShowForm) => !prevShowForm);
  };

  return (
    <div className="add-post">
      <button className="add-story-button" onClick={toggleForm}>
        share with us
      </button>
      {showForm && (
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <label htmlFor="category">Category</label>
            <input
              type="text"
              placeholder="Category"
              id="category"
              value={formData.category}
              onChange={handleDataChange}
            />
            <label htmlFor="description">Description</label>
            <input
              type="text"
              placeholder="Description"
              id="description"
              value={formData.description}
              onChange={handleDataChange}
              required
            />
            <label htmlFor="image_url">Image URL</label>
            <input
              type="text"
              placeholder="Image URL"
              id="image_url"
              value={formData.image_url}
              onChange={handleDataChange}
            />           
            <div className="form-buttons">
              <button className="form-button-add-post"  type="submit" >Post</button>
              <button type="button" onClick={handleCancel} className="form-button-add-cancel" >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default AddPost;
