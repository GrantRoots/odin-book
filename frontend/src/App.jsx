import { Link } from "react-router-dom";
import styles from "./App.module.css";
import { useEffect, useState } from "react";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [posts, setPosts] = useState([]);
  const [notFollowing, setNotFollowing] = useState([]);
  const [error, setError] = useState(null);
  const username = localStorage.getItem("username");
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) setLoggedIn(true);
  }, []);

  async function getUserAndFollowingPosts() {
    try {
      const response = await fetch(`http://localhost:3000/posts?id=${userId}`, {
        mode: "cors",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) return;
      const data = await response.json();
      setPosts(data.posts);
    } catch (error) {
      console.error(error);
    }
  }

  async function getNotFollowing() {
    try {
      const response = await fetch(`http://localhost:3000/user?id=${userId}`, {
        mode: "cors",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) return;
      const data = await response.json();
      setNotFollowing(data.users);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (loggedIn) {
      getUserAndFollowingPosts();
      getNotFollowing();
    }
  }, [loggedIn]);

  async function sendFollowReq(followId) {
    try {
      setError(null);
      const data = {
        senderId: userId,
        followId: followId,
      };

      const response = await fetch("http://localhost:3000/user/follow", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
        mode: "cors",
      });
      const responseData = await response.json();

      if (!responseData.success) {
        setError(responseData.message);
      }
    } catch (err) {
      console.error("Network or server error:", err);
    }
  }

  async function likePost() {}

  return (
    <>
      <header className={styles.header}>
        <h1>Odinstagram</h1>
        {loggedIn && (
          <div>
            <div>{username} Is Logged In</div>
            <Link to={"customize"}>
              <button className={styles.button}>Customize Profile</button>
            </Link>
            <Link to={"requests"}>
              <button className={styles.button}>Follow Requests</button>
            </Link>
          </div>
        )}
      </header>
      <main className={styles.main}>
        {!loggedIn && (
          <div>
            <div>
              <Link to={"signup"}>
                <button className={styles.button}>Sign Up</button>
              </Link>
              <Link to={"login"}>
                <button className={styles.button}>Log In</button>
              </Link>
            </div>
            <h1>Welcome To Odinstagram!</h1>
            <h2>Sign Up To Get Started</h2>
          </div>
        )}

        {loggedIn && (
          <div className={styles.loggedInContainer}>
            <div>
              <Link to={"create"}>
                <button>Create Post</button>
              </Link>
              {posts.length < 1 && (
                <div>No posts yet create one or follow some people :)</div>
              )}
              {posts &&
                posts.map((post) => {
                  return (
                    <div key={post.id}>
                      <div>{post.username}</div>
                      <div>{post.content}</div>
                      <div>Likes: {post.likes}</div>
                      <div>
                        {new Date(post.createdAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                      <button>Like</button>
                    </div>
                  );
                })}
            </div>
            <div>
              <div>People To Follow</div>
              {error && <div>{error}</div>}
              {notFollowing.length < 1 && <div>Nobody to follow :(</div>}
              {notFollowing &&
                notFollowing.map((user) => {
                  return (
                    <div key={user.id}>
                      <div>{user.username}</div>
                      <button
                        onClick={() => {
                          sendFollowReq(user.id);
                        }}
                      >
                        Follow
                      </button>
                    </div>
                  );
                })}
            </div>
          </div>
        )}
      </main>
    </>
  );
}

export default App;
