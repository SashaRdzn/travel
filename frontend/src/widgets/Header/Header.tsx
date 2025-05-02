import { Link } from "react-router-dom";
import styles from './styles.module.scss'
const Header = () => {
  return (
    <header className={styles.header}>
      <nav className={styles.navigate}>
        <Link className={styles.navigate__link} to={"catalog"}>
          Catalog
        </Link>
        <Link className={styles.navigate__link} to={"profile"}>
          Profile
        </Link>
      </nav>
    </header>
  );
};

export default Header;
