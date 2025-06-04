import { useState } from "react";
import styles from "./Signup.module.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Home } from "../Icons/Icons";

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
    <>
      <main className={styles.container}>
        <h2>Sign Up</h2>
        <form onSubmit={onSubmit} className={styles.form}>
          <label htmlFor="username">
            <span>Username: </span>
          </label>
          <input type="text" name="username" required />

          <label htmlFor="password">
            <span>Password: </span>
          </label>
          <input type="password" name="password" required />

          <label htmlFor="confirmPassword">
            <span>Confirm Password: </span>
          </label>
          <input type="password" name="confirmPassword" required />

          <label htmlFor="firstName">
            <span>First Name: </span>
          </label>
          <input type="text" name="firstName" required />

          <label htmlFor="lastName">
            <span>Last Name: </span>
          </label>
          <input type="text" name="lastName" required />

          <button type="submit" className={styles.submit}>
            Submit
          </button>
        </form>
        {error && <div>{error}</div>}
        <Link to={"/"}>
          <span className={styles.home}>
            <Home></Home>
          </span>
        </Link>
      </main>
    </>
  );
}

export { Signup };
