import { Link } from "react-router-dom";
import styles from "./App.module.css";
import { useEffect, useState } from "react";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [posts, setPosts] = useState(null);
  const username = localStorage.getItem("username");
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  async function getAllPosts() {
    try {
      const response = await fetch(`http://localhost:3000/posts?id=${userId}`, {
        mode: "cors",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) return;
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (token && username) setLoggedIn(true);
  }, [token]);

  useEffect(() => {
    getAllPosts();
  }, []);

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
          <div>
            <button>Find New People</button>
            <Link to={"create"}>
              <button>Create Post</button>
            </Link>

            {posts && <div>Posts</div>}
          </div>
        )}
      </main>
    </>
  );
}

export default App;
