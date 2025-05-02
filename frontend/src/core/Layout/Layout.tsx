import {  Outlet } from "react-router-dom";
import Header from "../../widgets/Header/Header";
import styles from "./styles.module.scss";

const Layout = () => {
  return (
    <main className={styles.main}>
      <Header/>
      <section>
        <Outlet />
      </section>
    </main>
  );
};

export default Layout;
