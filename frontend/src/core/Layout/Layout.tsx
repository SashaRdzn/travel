import { Outlet } from "react-router-dom";
import Header from "../../widgets/Header/Header";
import styles from "./styles.module.scss";
import Profile from "../../widgets/ProfileMenu/ProfileMenu";
import { useAuth } from "../Store/authStore";

// const { token } = useAuth();
//TODO определится с видом регистрации и сделать проверку на пользователя и токена с марщрутами и на обновление токена
const Layout = () => {
  return (
    <main className={styles.main}>
      {/* {token && <Profile />} */}
      <Header />
      <section>
        <Outlet />
      </section>
    </main>
  );
};

export default Layout;
