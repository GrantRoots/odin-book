import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

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
    <main>
      <h1>Create A Post</h1>
      <form onSubmit={handleSend} enctype="multipart/form-data">
        <label htmlFor="contnet">Content:</label>
        <input type="text" name="content" />

        <label htmlFor="image">Image(Optional): </label>
        <input type="file" name="image" />

        <input type="hidden" value={userId} name="userId" />

        <button type="submit">Submit</button>
      </form>
      {error && <div>{error}</div>}
      <Link to={"/"}>
        <button>Home</button>
      </Link>
    </main>
  );
}

export { CreatePost };
