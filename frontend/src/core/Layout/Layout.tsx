import { Outlet } from "react-router-dom";
import Header from "../../widgets/Header/Header";
import styles from "./styles.module.scss";
import { useAuthStore } from "../Store/authStore";


const Layout = () => {
  const { isAuthenticated } = useAuthStore();

  return (
    <>
      <Header />
      <main className={styles.main} style={{ display: "flex" }}>
        <section
          className={isAuthenticated ? styles.authenticated : styles.guest}>
          <Outlet />
        </section>
      </main>
    </>
  );
};

export default Layout;
