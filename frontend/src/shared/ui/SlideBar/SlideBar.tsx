import { memo, useMemo } from "react";
import styles from "./styles.module.scss";
import arrow from "../../../../public/svgs/Arrow.svg";
import { useSlideBarStore } from "../../../core/Store/slideBarStore";

type Position = "left" | "right" | "top" | "bottom";

interface SlideBarProps {
  children: React.ReactNode;
  position?: Position;
  width?: string;
  height?: string;
  id: string;
}

const SlideBar = memo(
  ({
    children,
    position = "right",
    width = "300px",
    height = "100vh",
    id,
  }: SlideBarProps) => {
    const isOpen = useSlideBarStore((state) => state.states[id] || false);
    const toggle = useSlideBarStore((state) => state.toggle);

    const arrowStyles = useMemo(() => {
      const baseStyles = {
        position: "absolute" as const,
        cursor: "pointer" as const,
        width: "20px",
        height: "20px",
        display: "flex" as const,
        alignItems: "center" as const,
        justifyContent: "center" as const,
        backgroundColor: "white",
        borderRadius: "50%",
        boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
        zIndex: 1001,
        transition: "transform 0.3s ease",
      };

      const positionStyles = {
        left: { right: "-10px", top: "20px" },
        right: { left: "-10px", top: "20px" },
        top: { bottom: "-10px", left: "50%" },
        bottom: { top: "-10px", left: "50%" },
      };

      const rotation = isOpen
        ? { left: 180, right: 0, top: 180, bottom: 0 }[position]
        : { left: 0, right: 180, top: 0, bottom: 180 }[position];

      return {
        ...baseStyles,
        ...positionStyles[position],
        transform: `rotate(${rotation}deg)`,
      };
    }, [position, isOpen]);

    return (
      <div
        className={`${styles.sidebar} ${isOpen ? styles["sidebar__open"] : ""}`}
        style={{
          [position]: isOpen ? "0" : `calc(-${width} + 20px)`,
          width: ["left", "right"].includes(position) ? width : "100vw",
          height: ["top", "bottom"].includes(position) ? height : "100vh",
          transition: "all 0.3s ease",
        }}>
        <div onClick={() => toggle(id)} style={arrowStyles}>
          <img
            src={arrow}
            alt="arrow"
            style={{ width: "12px", height: "12px" }}
          />
        </div>
        <div className={styles.sidebar__content}>{children}</div>
      </div>
    );
  }
);

export default SlideBar;
