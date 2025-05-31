import styles from "./Header.module.css";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className={styles.header}>
      <Link to={"/"} className="link">
        <h1>Odinstagram</h1>
      </Link>
    </header>
  );
}

export { Header };
