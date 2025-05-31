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
        <h1>Sign Up</h1>
        <form onSubmit={onSubmit} className={styles.form}>
          <label htmlFor="username">
            <h2>Username: </h2>
          </label>
          <input type="text" name="username" required />

          <label htmlFor="password">
            <h2>Password: </h2>
          </label>
          <input type="password" name="password" required />

          <label htmlFor="confirmPassword">
            <h2>Confirm Password: </h2>
          </label>
          <input type="password" name="confirmPassword" required />

          <label htmlFor="firstName">
            <h2>First Name: </h2>
          </label>
          <input type="text" name="firstName" required />

          <label htmlFor="lastName">
            <h2>Last Name: </h2>
          </label>
          <input type="text" name="lastName" required />

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

export { Signup };
