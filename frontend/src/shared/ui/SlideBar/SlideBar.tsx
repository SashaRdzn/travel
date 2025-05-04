import { useState } from "react";
import styles from "./styles.module.scss";
import arrow from "../../../../public/svgs/Arrow.svg";

type Position = "left" | "right" | "top" | "bottom";

interface SlideBarProps {
  children: React.ReactNode;
  position?: Position;
  width?: string;
  height?: string;
}

const SlideBar = ({
  children,
  position = "right",
  width = "300px",
  height = "100vh",
}: SlideBarProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const getArrowStyles = () => {
    const baseStyles = {
      position: "absolute",
      cursor: "pointer",
      width: "20px",
      height: "20px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "white",
      borderRadius: "50%",
      boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
      zIndex: 1001,
      transition: "transform 0.3s ease",
    };

    switch (position) {
      case "left":
        return {
          ...baseStyles,
          right: "-10px",
          top: "20px",
          transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
        };
      case "right":
        return {
          ...baseStyles,
          left: "-10px",
          top: "20px",
          transform: isOpen ? "rotate(0deg)" : "rotate(180deg)",
        };
      case "top":
        return {
          ...baseStyles,
          bottom: "-10px",
          left: "50%",
          transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
        };
      case "bottom":
        return {
          ...baseStyles,
          top: "-10px",
          left: "50%",
          transform: isOpen ? "rotate(0deg)" : "rotate(180deg)",
        };
      default:
        return baseStyles;
    }
  };

  const ArrowIcon = () => (
    <img
      src={arrow}
      alt="arrow"
      style={{
        width: "12px",
        height: "12px",
        transition: "transform 0.3s ease",
      }}
    />
  );

  return (
    <div
      className={`${styles.sidebar} ${isOpen ? styles["sidebar__open"] : ""}`}
      style={{
        [position]: isOpen ? "0" : `calc(-${width} + 20px)`,
        width: position === "left" || position === "right" ? width : "100vw",
        height: position === "top" || position === "bottom" ? height : "100vh",
        transition: "all 0.3s ease",
      }}>
      <div onClick={toggleSidebar} style={getArrowStyles()}>
        <ArrowIcon />
      </div>
      <div className={styles.sidebar__content}>{children}</div>
    </div>
  );
};

export default SlideBar;
