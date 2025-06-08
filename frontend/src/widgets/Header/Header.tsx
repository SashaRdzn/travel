import { Link } from "react-router-dom";
import styles from "./styles.module.scss";
import { memo, useState, useRef, useEffect } from "react";
import { useAuthStore } from "../../core/Store/authStore";
import { FaRegUser } from 'react-icons/fa'
import { IoIosLogOut } from 'react-icons/io'
import cn from 'classnames'
import { useLogout } from "../../features/Auth/api/Auth";

const NavLink = memo(({ to, text }: { to: string; text: string }) => (
  <Link className={styles.navigate__link} to={to}>
    {text}
  </Link>
));

const Header = memo(() => {
  const { user, isAuthenticated } = useAuthStore();
  const { mutate: logout } = useLogout();
  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<number | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setShowModal(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setShowModal(false);
    }, 300);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const ModalUser = () => (
    <div
      ref={modalRef}
      className={styles.user__modal}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <span>Имя: {user?.first_name}</span>
      <span>Фамилия: {user?.last_name}</span>
      <span>Почта: {user?.email}</span>
      <NavLink to="profile" text="Перейти в профиль" />
    </div>
  );

  const handleLogOut = () => {
    logout();
    setShowModal(false);
  };

  return (
    <header className={styles.navigate}>
      <NavLink to="country" text="Страны" />

      {isAuthenticated ? (
        <div className={cn(styles.user)}>
          {user && (
            <>
              {showModal && <ModalUser />}
              <FaRegUser size="20px"
                className={styles.user__icons}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave} />
              <IoIosLogOut
                className={styles.user__icons}
                size="30px"
                onClick={handleLogOut}
              />
            </>
          )}
        </div>
      ) : (
        <NavLink to="auth/login" text="Войти" />
      )}
    </header>
  );
});

export default Header;