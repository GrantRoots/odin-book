import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import styles from "./Post.module.css";
import { Home, Like } from "../Icons/Icons";
import { Header } from "../Header/Header";

function Post() {
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  const { postId } = useParams();
  const API_URL = import.meta.env.VITE_API_URL;

  async function getPost(postId) {
    try {
      const response = await fetch(`${API_URL}/posts/${postId}`, {
        mode: "cors",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) return;
      const data = await response.json();
      if (data.success) {
        setPost(data.post);
      } else {
        return setError(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getPost(postId);
  }, []);

  async function likePost(id) {
    try {
      const data = {
        postId: id,
      };

      await fetch(`${API_URL}/posts/like`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
        mode: "cors",
      });
      getPost(postId);
    } catch (err) {
      console.error("Network or server error:", err);
    }
  }

  async function postComment(e) {
    e.preventDefault();

    const data = {
      comment: e.target.comment.value,
      postId: postId,
      userId: userId,
    };
    try {
      const response = await fetch(`${API_URL}/posts/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
        mode: "cors",
      });
      const responseData = await response.json();

      if (responseData.success) {
        getPost(postId);
        e.target.comment.value = "";
      } else {
        setError(responseData.message);
      }
    } catch (err) {
      console.error("Network or server error:", err);
    }
  }

  return (
    <>
      <Header></Header>
      <main>
        {error && <div>{error}</div>}
        {post && (
          <div key={post.id} className={styles.post}>
            <Link to={`/${post.userId}`} className="link">
              <h1>
                <u>{post.username}</u>
              </h1>
            </Link>
            {post.image && (
              <img
                className="postImg"
                src={`${API_URL}/${post.image}`}
                alt="Post Image"
              />
            )}
            <h2>{post.content}</h2>
            <div>
              <div>Likes: {post.likes}</div>
              <button
                onClick={() => {
                  likePost(post.id);
                }}
              >
                <Like></Like>
              </button>
            </div>
            <div>
              {new Date(post.createdAt).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>

            <form onSubmit={postComment}>
              <label htmlFor="comment">Comment: </label>
              <input type="text" name="comment" />
              <button type="submit">Send</button>
            </form>
            <div>
              <h2>Comments</h2>
              {post.comments
                .map((comment) => {
                  return (
                    <div key={comment.id} className={styles.comment}>
                      {comment.username}: {comment.text}
                    </div>
                  );
                })
                .reverse()}
            </div>
            <Link to={"/"}>
              <button>
                <Home></Home>
              </button>
            </Link>
          </div>
        )}
      </main>
    </>
  );
}

export { Post };
