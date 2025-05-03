import SlideBar from "../../shared/ui/SlideBar/SlideBar";
import styles from "./styles.module.scss";

const ProfileMenu = () => {
  return (
    <SlideBar position="right" width="280px">
      <div className={styles.profile}>
        <div className={styles.avatar}>AV</div>
        <h3 className={styles.username}>Иван Иванов</h3>
        <p className={styles.email}>ivan@example.com</p>
      </div>
    </SlideBar>
  );
};

export default ProfileMenu;
