import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Header } from "../Header/Header";
import { Home } from "../Icons/Icons";
import styles from "./CreatePost.module.css";

function CreatePost() {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  const API_URL = import.meta.env.VITE_API_URL;

  async function handleSend(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    // const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch(`${API_URL}/posts`, {
        method: "POST",
        headers: {
          // "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: formData,
        mode: "cors",
      });
      const responseData = await response.json();

      if (responseData.success) {
        navigate("/");
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
        <h1>Create A Post</h1>
        <form onSubmit={handleSend} enctype="multipart/form-data">
          <label htmlFor="contnet">
            <h2>Content:</h2>
          </label>
          <textarea type="text" name="content" className={styles.content} />

          <label htmlFor="image">
            <h2>Image(Optional): </h2>
          </label>
          <input type="file" name="image" />

          <input type="hidden" value={userId} name="userId" />

          <button type="submit" className={styles.submit}>
            <h2>Submit</h2>
          </button>
        </form>
        {error && <div>{error}</div>}
        <Link to={"/"}>
          <button className={styles.home}>
            <Home></Home>
          </button>
        </Link>
      </main>
    </>
  );
}

export { CreatePost };
