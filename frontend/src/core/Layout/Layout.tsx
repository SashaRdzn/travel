import {  Outlet } from "react-router-dom";
import Header from "../../widgets/Header/Header";
import styles from "./styles.module.scss";
import Profile from "../../widgets/ProfileMenu/ProfileMenu";

const Layout = () => {
  return (
    <main className={styles.main}>
      <Header />
      <Profile />
      <section>
        <Outlet />
      </section>
    </main>
  );
};

export default Layout;
