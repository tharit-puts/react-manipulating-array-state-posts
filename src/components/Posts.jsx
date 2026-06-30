// useState คือ Hook ของ React ที่ใช้เก็บข้อมูลที่เปลี่ยนแปลงได้ (State)
// เมื่อ State เปลี่ยน React จะ Render หน้าเว็บใหม่อัตโนมัติ
import { useState } from "react";
// นำเข้าข้อมูล Post เริ่มต้นจากไฟล์ post-data.js
import { postData } from "../raw-data/post-data.js";

function Posts() {
  // สร้าง State ชื่อ posts โดยใช้ข้อมูลจาก postData เป็นค่าเริ่มต้น
  // setPosts คือฟังก์ชันที่ใช้สำหรับอัปเดตค่า posts
  const [posts, setPosts] = useState(postData);

  // Event Handler สำหรับปุ่ม Like — เพิ่มจำนวน Like ของ Post ที่ถูกกดทีละ 1
  const handleLike = (postId) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        // หา Post ที่มี id ตรงกับ postId แล้วเพิ่ม likes ขึ้น 1
        post.id === postId ? { ...post, likes: post.likes + 1 } : post,
      ),
    );
  };

  // Event Handler สำหรับปุ่ม Dislike — ลดจำนวน Like ของ Post ที่ถูกกดทีละ 1
  // แต่จะไม่ให้ค่าต่ำกว่า 0 (ใช้ Math.max ป้องกันค่าติดลบ)
  const handleDislike = (postId) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? { ...post, likes: Math.max(0, post.likes - 1) }
          : post,
      ),
    );
  };

  return (
    <div className="app-wrapper">
      <h1 className="app-title">Posts</h1>
      <div className="post-list">
        {/* ใช้ .map() วนลูป Array ของ posts เพื่อ Render Post แต่ละอัน */}
        {posts.map((post) => (
          // key ช่วยให้ React ระบุตัวตนของแต่ละ Post ได้ถูกต้องเมื่อมีการอัปเดต
          <article key={post.id} className="post-item">
            <header className="post-header">
              <h2>Post Title #{post.id}</h2>
              <div className="post-social-media-stats">
                <span className="stats-topic">Likes: </span>
                <span className="post-likes">{post.likes}</span>
              </div>
            </header>
            <p className="post-content">{post.content}</p>
            <div className="post-actions">
              {/* onClick รับ Event Handler ที่ส่ง post.id เข้าไปเพื่อระบุว่ากด Post ไหน */}
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
          </article>
        ))}
      </div>
    </div>
  );
}

export default Posts;
