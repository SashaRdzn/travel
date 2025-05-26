import { Link } from "react-router-dom";
import styles from "./styles.module.scss";
import SlideBar from "../../shared/ui/SlideBar/SlideBar";
import { memo } from "react";
import { useAuthStore } from "../../core/Store/authStore";

const NavLink = memo(({ to, text }: { to: string; text: string }) => (
  <Link className={styles.navigate__link} to={to}>
    {text}
  </Link>
));

const Header = memo(() => {
  const { user, isAuthenticated, logout } = useAuthStore();

  return (
    <SlideBar id="main-sidebar" position="left" width="280px">
      <header className={styles.navigate}>
        {isAuthenticated ? (
          <>
            <NavLink to="country" text="Country" />
            <a onClick={logout} className={styles.navigate__link}>
              Logout
            </a>
            {user && (
              <div className={styles.userGreeting}>
                Hello, {user.first_name}!
              </div>
            )}
          </>
        ) : (
          <>
            <NavLink to="auth/register" text="Register" />
            <NavLink to="auth/login" text="Login" />
          </>
        )}
      </header>
    </SlideBar>
  );
});

export default Header;
