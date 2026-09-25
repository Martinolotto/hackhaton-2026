import { useEffect, useRef, useState } from "react";

export default function Magnet({
  children,
  padding = 72,
  disabled = false,
  magnetStrength = 3.5,
  wrapperClassName = "",
  innerClassName = "",
  ...props
}) {
  const magnetRef = useRef(null);
  const [isActive, setIsActive] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (disabled) return undefined;

    const handlePointerMove = (event) => {
      if (!magnetRef.current || event.pointerType === "touch") return;

      const { left, top, width, height } =
        magnetRef.current.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;
      const insideRange =
        Math.abs(centerX - event.clientX) < width / 2 + padding &&
        Math.abs(centerY - event.clientY) < height / 2 + padding;

      setIsActive(insideRange);
      setPosition(
        insideRange
          ? {
              x: (event.clientX - centerX) / magnetStrength,
              y: (event.clientY - centerY) / magnetStrength,
            }
          : { x: 0, y: 0 },
      );
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, [disabled, magnetStrength, padding]);

  const renderedPosition = disabled ? { x: 0, y: 0 } : position;
  const renderedIsActive = !disabled && isActive;

  return (
    <div
      ref={magnetRef}
      className={wrapperClassName}
      style={{ position: "relative", display: "inline-block" }}
      {...props}
    >
      <div
        className={innerClassName}
        style={{
          transform: `translate3d(${renderedPosition.x}px, ${renderedPosition.y}px, 0)`,
          transition: renderedIsActive
            ? "transform 180ms cubic-bezier(0.16, 1, 0.3, 1)"
            : "transform 420ms cubic-bezier(0.16, 1, 0.3, 1)",
          willChange: renderedIsActive ? "transform" : "auto",
        }}
      >
        {children}
      </div>
    </div>
  );
}
