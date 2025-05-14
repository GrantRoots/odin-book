import { useState } from "react";
import styles from "./Signup.module.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  async function onSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("http://localhost:3000/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        mode: "cors",
      });

      if (response.ok) {
        navigate("/");
      } else {
        setError("Sign Up failed please try again");
      }
    } catch (err) {
      console.error("Network or server error:", err);
    }
  }

  return (
    <div className={styles.container}>
      <h1>Sign Up</h1>
      <form onSubmit={onSubmit} className={styles.form}>
        <label htmlFor="username">Username: </label>
        <input type="text" name="username" required />

        <label htmlFor="password">Password: </label>
        <input type="text" name="password" required />

        <label htmlFor="confirmPassword">Confirm Password: </label>
        <input type="text" name="confirmPassword" required />

        <label htmlFor="firstName">First Name: </label>
        <input type="text" name="firstName" required />

        <label htmlFor="lastName">Last Name: </label>
        <input type="text" name="lastName" required />

        <button type="submit">Submit</button>
      </form>
      {error && <div>{error}</div>}
      <Link to={"/"}>
        <button>Home</button>
      </Link>
    </div>
  );
}

export { Signup };
