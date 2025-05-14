import { Link } from "react-router-dom";
import styles from "./App.module.css";
import { useEffect, useState } from "react";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const username = localStorage.getItem("username");
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token && username) setLoggedIn(true);
  }, [token]);

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
            <button>Create Post</button>
            <div>Show Posts from following and self</div>
          </div>
        )}
      </main>
    </>
  );
}

export default App;
