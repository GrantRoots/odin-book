import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import styles from "./Chatroom.module.css";

function Chatroom() {
  const [error, setError] = useState(null);
  const [room, setRoom] = useState(null);
  const { roomId } = useParams();
  const formRef = useRef(null);
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");

  async function getRoom() {
    try {
      const response = await fetch(
        `http://localhost:3000/chatrooms/${roomId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          mode: "cors",
        }
      );
      const responseData = await response.json();

      if (responseData.success) {
        setRoom(responseData.room);
      } else {
        setError(responseData.message);
      }
    } catch (err) {
      console.error("Network or server error:", err);
    }
  }

  async function handleSend(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("http://localhost:3000/chatrooms/message", {
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
        //then clear message box
        getRoom();
      } else {
        setError(responseData.message);
      }
    } catch (err) {
      console.error("Network or server error:", err);
    }
  }

  useEffect(() => {
    formRef.current.scrollIntoView();
  }, [room]);

  useEffect(() => {
    getRoom();
  }, []);

  return (
    <>
      {!room && (
        <div className={styles.container}>
          Room not found please try again...
        </div>
      )}
      {room && (
        <div className={styles.container}>
          <h1 className={styles.h1}>
            {username === room.users[0].username
              ? room.users[1].username
              : room.users[0].username}
          </h1>
          {room.messages.map((message) => {
            console.log(room);
            return (
              <div
                key={message.id}
                className={`${styles.message} ${
                  parseInt(userId) === message.userId
                    ? styles.right
                    : styles.left
                }`}
              >
                <div>{message.content}</div>
                <div>
                  {new Date(message.createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}
      <div className={styles.form} ref={formRef}>
        <form onSubmit={handleSend}>
          <label htmlFor="message">New Message:</label>
          <input type="text" name="message" />
          <input type="hidden" name="roomId" value={roomId} />
          <input type="hidden" name="userId" value={userId} />
          <button type="submit">Send</button>
        </form>
        {error && <div>{error}</div>}
        <Link to={"/"}>
          <button className={styles.home}>Home</button>
        </Link>
      </div>
    </>
  );
}

export { Chatroom };
