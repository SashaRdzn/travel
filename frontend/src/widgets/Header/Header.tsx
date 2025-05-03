import { Link } from "react-router-dom";
import styles from './styles.module.scss'
import SlideBar from "../../shared/ui/SlideBar/SlideBar";
const Header = () => {
  return (
    <SlideBar position="left" width="280px">
      <header className={styles.navigate}>
        <Link className={styles.navigate__link} to={"country"}>
          country
        </Link>
        <Link className={styles.navigate__link} to={"profile"}>
          Profile
        </Link>
      </header>
    </SlideBar>
  );
};

export default Header;
