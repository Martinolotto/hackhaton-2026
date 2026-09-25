import { useRef, useState } from "react";

export default function SpotlightCard({
  as: Component = "div",
  children,
  className = "",
  disabled = false,
  spotlightColor = "rgba(128, 82, 255, 0.16)",
  ...props
}) {
  const cardRef = useRef(null);
  const [opacity, setOpacity] = useState(0);

  const handlePointerMove = (event) => {
    if (disabled || !cardRef.current || event.pointerType === "touch") return;

    const rect = cardRef.current.getBoundingClientRect();
    cardRef.current.style.setProperty(
      "--spotlight-x",
      `${event.clientX - rect.left}px`,
    );
    cardRef.current.style.setProperty(
      "--spotlight-y",
      `${event.clientY - rect.top}px`,
    );
  };

  return (
    <Component
      ref={cardRef}
      className={`hp-react-bits-spotlight ${className}`}
      onPointerEnter={() => !disabled && setOpacity(1)}
      onPointerLeave={() => setOpacity(0)}
      onPointerMove={handlePointerMove}
      {...props}
    >
      <span
        className="hp-react-bits-spotlight-layer"
        style={{
          opacity: disabled ? 0 : opacity,
          background: `radial-gradient(circle 280px at var(--spotlight-x, 50%) var(--spotlight-y, 50%), ${spotlightColor}, transparent 72%)`,
        }}
        aria-hidden="true"
      />
      <div className="hp-react-bits-spotlight-content">{children}</div>
    </Component>
  );
}
