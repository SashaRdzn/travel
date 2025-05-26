import { Outlet } from "react-router-dom";
import Header from "../../widgets/Header/Header";
import styles from "./styles.module.scss";
import { useAuthStore } from "../Store/authStore";
import { useSlideBarStore } from "../Store/slideBarStore";
import ProfileMenu from "../../widgets/ProfileMenu/ProfileMenu";

const Layout = () => {
  const { isAuthenticated } = useAuthStore();
  const isSidebarOpen = useSlideBarStore(
    (state) => state.states["main-sidebar"] || false
  );
  const isSidebarOpenRight = useSlideBarStore(
    (state) => state.states["secondary-sidebar"] || false
  );
  return (
    <main className={styles.main} style={{ display: "flex" }}>
      <Header />
      <ProfileMenu />
      <section
        className={isAuthenticated ? styles.authenticated : styles.guest}
        style={{
          flex: 1,
          overflow: "auto",
          marginLeft: isSidebarOpen ? "280px" : "0",
          marginRight: isSidebarOpenRight ? "280px" : "0",
          transition: "all 0.3s ease",
        }}>
        <Outlet />
      </section>
    </main>
  );
};

export default Layout;
