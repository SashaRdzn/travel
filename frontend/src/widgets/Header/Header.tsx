import { Link } from "react-router-dom";
import styles from "./styles.module.scss";
import SlideBar from "../../shared/ui/SlideBar/SlideBar";
import { memo } from "react";

const NavLink = memo(({ to, text }: { to: string; text: string }) => (
  <Link className={styles.navigate__link} to={to}>
    {text}
  </Link>
));

const Header = memo(() => {
  return (
    <SlideBar id="main-sidebar" position="left" width="280px">
      <header className={styles.navigate}>
        <NavLink to="country" text="Country" />
        <NavLink to="profile" text="Profile" />
        <NavLink to="auth/register" text="Register" />
        <NavLink to="auth/login" text="Login" />
      </header>
    </SlideBar>
  );
});

export default Header;
