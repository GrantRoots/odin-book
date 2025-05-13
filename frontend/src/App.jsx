import { Link } from "react-router-dom";
import styles from "./App.module.css";
import { useEffect, useState } from "react";

function App() {
  const [chatrooms, setChatrooms] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const username = localStorage.getItem("username");

  async function findUserChatrooms() {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    if (token && !loggedIn) setLoggedIn(true);
    try {
      const response = await fetch("http://localhost:3000/chatrooms", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userId }),
      });
      if (!response.ok) return;
      const data = await response.json();
      setChatrooms(data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    findUserChatrooms();
  }, []);

  return (
    <>
      <header className={styles.header}>
        <Link to={"signup"}>
          <button className={styles.button}>Sign Up</button>
        </Link>
        <Link to={"login"}>
          <button className={styles.button}>Log In</button>
        </Link>
        {loggedIn && (
          <>
            <div>{username} Is Logged In</div>
            <Link to={"message"}>
              <button className={styles.button}>Send A New Message</button>
            </Link>
            <Link to={"customize"}>
              <button className={styles.button}>Customize Profile</button>
            </Link>
          </>
        )}
      </header>
      <main className={styles.main}>
        {chatrooms.length > 0 && (
          <div>
            {chatrooms.map((room) => {
              return (
                <div key={room.id} className={styles.room}>
                  <div>
                    {room.users[0].username === username
                      ? room.users[1].username
                      : room.users[0].username}
                    's Chatroom
                  </div>
                  <Link to={`room/${room.id}`}>
                    <button>Open</button>
                  </Link>
                </div>
              );
            })}
          </div>
        )}
        {chatrooms.length < 1 && (
          <div>No chatrooms yet click "Send A New Message" to get started!</div>
        )}
      </main>
    </>
  );
}

export default App;
