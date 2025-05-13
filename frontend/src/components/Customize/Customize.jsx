import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Customize() {
  const username = localStorage.getItem("username");
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();

    const token = localStorage.getItem("token");
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("http://localhost:3000/user", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
        mode: "cors",
      });
      const responseData = await response.json();

      if (responseData.success) {
        localStorage.setItem("username", e.target.newUsername.value);
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
      <h1>Update Profile</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">New Username: </label>
        <input type="text" name="newUsername" placeholder={username} />

        {/* <label htmlFor="photo">Profile Picture: </label>
        <input type="text" name="photo" /> */}

        <input type="hidden" name="oldUsername" value={username} />

        <button type="Submit">Update</button>
      </form>
      {error && <div>{error}</div>}
      <Link to={"/"}>
        <button>Home</button>
      </Link>
    </>
  );
}

export { Customize };

//Profile photo??
