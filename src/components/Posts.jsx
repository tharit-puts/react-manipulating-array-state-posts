import { useState } from "react";
import { postData } from "../raw-data/post-data.js";

function Posts() {
  const [posts, setPosts] = useState(postData);

  const handleLike = (id) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === id ? { ...post, likes: post.likes + 1 } : post
      )
    );
  };

  const handleDislike = (id) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === id && post.likes > 0
          ? { ...post, likes: post.likes - 1 }
          : post
      )
    );
  };

  return (
    <div className="app-wrapper">
      <h1 className="app-title">Posts</h1>
      <div className="post-list">
        {posts.map((post) => (
          <div className="post-item" key={post.id}>
            <div className="post-header">
              <h2>Post Title #{post.id}</h2>
              <div className="post-social-media-stats">
                <span className="stats-topic">Likes: </span>
                <span className="post-likes">{post.likes}</span>
              </div>
            </div>
            <p className="post-content">{post.content}</p>
            <div className="post-actions">
              <button
                className="like-button"
                onClick={() => handleLike(post.id)}
              >
                Like
              </button>
              <button
                className="dislike-button"
                onClick={() => handleDislike(post.id)}
              >
                Dislike
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Posts;
