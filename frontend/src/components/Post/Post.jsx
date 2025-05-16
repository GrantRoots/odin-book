import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
function Post() {
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  const { postId } = useParams();

  async function getPost(postId) {
    try {
      const response = await fetch(`http://localhost:3000/posts/${postId}`, {
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

      await fetch("http://localhost:3000/posts/like", {
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
      const response = await fetch("http://localhost:3000/posts/comments", {
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
    <div>
      {error && <div>{error}</div>}
      {post && (
        <div key={post.id}>
          <div>{post.username} "Link to user profile"</div>
          <div>{post.content}</div>
          <div>Likes: {post.likes}</div>
          <div>
            {new Date(post.createdAt).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>
          <button
            onClick={() => {
              likePost(post.id);
            }}
          >
            Like
          </button>
          <form onSubmit={postComment}>
            <label htmlFor="comment">Comment: </label>
            <input type="text" name="comment" />
            <button type="submit">Send</button>
          </form>
          <div>
            {post.comments.map((comment) => {
              return (
                <div key={comment.id}>
                  {comment.username}: {comment.text}
                </div>
              );
            })}
          </div>
        </div>
      )}
      <Link to={"/"}>
        <button>Home</button>
      </Link>
    </div>
  );
}

export { Post };
