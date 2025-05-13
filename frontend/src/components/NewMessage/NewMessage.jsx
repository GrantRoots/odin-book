import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function NewMessage() {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  async function handleSend(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    const token = localStorage.getItem("token");
    try {
      const response = await fetch("http://localhost:3000/chatrooms/create", {
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
      <form onSubmit={handleSend}>
        <label htmlFor="recipientUsername">Send To:</label>
        <input type="text" name="recipientUsername" placeholder="Username" />
        <label htmlFor="message">First Message:</label>
        <input type="text" name="message" />
        <input type="hidden" name="userId" value={userId} />
        <button type="submit">Submit</button>
      </form>
      {error && <div>{error}</div>}
      <Link to={"/"}>Home</Link>
    </>
  );
}

export { NewMessage };
