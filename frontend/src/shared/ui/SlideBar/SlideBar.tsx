// SlideBar.tsx
import { memo, useMemo } from "react";
import styles from "./styles.module.scss";
import arrow from "../../../../public/svgs/Arrow.svg";
import { useSlideBarStore } from "../../../core/Store/slideBarStore";

type Position = "left" | "right";

interface SlideBarProps {
  children: React.ReactNode;
  position?: Position;
  width?: string;
  id: string;
}

const SlideBar = memo(
  ({ children, position = "right", width = "300px", id }: SlideBarProps) => {
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
      };

      const rotation = isOpen
        ? { left: 180, right: 0 }[position]
        : { left: 0, right: 180 }[position];

      return {
        ...baseStyles,
        ...positionStyles[position],
        transform: `rotate(${rotation}deg)`,
      };
    }, [position, isOpen]);

    return (
      <div
        className={`${styles.sidebar} ${isOpen ? styles.open : styles.closed}`}
        style={{
          position: "fixed",
          [position]: isOpen ? "0" : `-${width}`,
          width,
          height: "100vh",
          transition: `${position} 0.3s ease`,
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
