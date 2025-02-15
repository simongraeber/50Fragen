import React, { useState, useEffect } from "react";

interface Round3DButtonProps {
  label?: string;
  onClick: () => void;
  isActiv?: boolean;
}

const Round3DButton: React.FC<Round3DButtonProps> = ({
                                                       isActiv = true,
                                                       label = "",
                                                       onClick,
                                                     }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isReady, setIsReady] = useState(false); // New state to track readiness

  const size = 160;

  // Button style – adjust the cursor when deactivated
  const buttonStyle: React.CSSProperties = {
    position: "relative",
    border: "none",
    background: "transparent",
    padding: 0,
    cursor: isActiv ? "pointer" : "not-allowed",
    outlineOffset: "4px",
    userSelect: "none",
    WebkitTapHighlightColor: "transparent",
    width: `${size}px`,
    height: `${size}px`,
    borderRadius: "50%",
  };

  useEffect(() => {
    // Ensure the button is ready after the first render
    const timeout = setTimeout(() => setIsReady(true), 0);
    return () => clearTimeout(timeout);
  }, []);

  const handleMouseEnter = () => {
    if (!isActiv || !isReady) return;
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    if (!isActiv || !isReady) return;
    setIsHovered(false);
    setIsActive(false);
  };

  const handleMouseDown = () => {
    if (!isActiv || !isReady) return;
    setIsActive(true);
  };

  const handleMouseUp = () => {
    if (!isActiv || !isReady) return;
    setIsActive(false);
  };

  const handleTouchStart = () => {
    if (!isActiv || !isReady) return;
    setIsHovered(true);
    setIsActive(true);
  };

  const handleTouchEnd = () => {
    if (!isActiv || !isReady) return;
    setIsHovered(false);
    setIsActive(false);
  };

  const handleTouchCancel = () => {
    if (!isActiv || !isReady) return;
    setIsHovered(false);
    setIsActive(false);
  };

  const frontBackground = isActiv
    ? "hsl(345deg 100% 47%)"
    : "hsl(345deg 60% 47%)";

  const shadowBaseY = 4;
  const shadowHoverY = 8;
  const shadowActiveY = 2;
  const shadowTranslateY = isActive
    ? shadowActiveY
    : isHovered
      ? shadowHoverY
      : shadowBaseY;

  const shadowStyle: React.CSSProperties = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    borderRadius: "50%",
    background: "hsl(0deg 0% 0% / 0.25)",
    willChange: "transform, filter",
    transform: `translateY(${shadowTranslateY}px)`,
    transition: isActive
      ? "transform 34ms, filter 34ms"
      : "transform 600ms cubic-bezier(0.3, 0.7, 0.4, 1), filter 250ms",
    filter: isHovered ? "blur(4px) brightness(1.1)" : "blur(4px)",
  };

  const edgeStyle: React.CSSProperties = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    borderRadius: "50%",
    background: `
      linear-gradient(
        to left,
        hsl(340deg 100% 16%) 0%,
        hsl(340deg 100% 32%) 8%,
        hsl(340deg 100% 32%) 92%,
        hsl(340deg 100% 16%) 100%
      )
    `,
    willChange: "filter",
    filter: isHovered ? "brightness(1.1)" : "none",
    transition: "filter 250ms",
  };

  const frontBaseY = -8;
  const frontHoverY = -12;
  const frontActiveY = -4;
  const frontTranslateY = isActive
    ? frontActiveY
    : isHovered
      ? frontHoverY
      : frontBaseY;

  const frontStyle: React.CSSProperties = {
    display: "flex",
    position: "relative",
    width: "100%",
    height: "100%",
    borderRadius: "50%",
    fontSize: "1.5rem",
    color: "white",
    background: frontBackground,
    willChange: "transform, filter",
    transform: `translateY(${frontTranslateY}px)`,
    transition: isActive
      ? "transform 34ms, filter 34ms"
      : "transform 600ms cubic-bezier(0.3, 0.7, 0.4, 1), filter 250ms",
    alignItems: "center",
    justifyContent: "center",
    filter: isHovered ? "brightness(1.1)" : "none",
  };

  const handleClick = () => {
    if (!isActiv || !isReady) return;
    onClick();
  };

  return (
    <button
      type="button"
      style={buttonStyle}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchCancel}
      onFocus={(e) => ((e.target as HTMLButtonElement).style.outline = "")}
      onBlur={(e) => ((e.target as HTMLButtonElement).style.outline = "")}
    >
      <span style={shadowStyle} />
      <span style={edgeStyle} />
      <span style={frontStyle}>{label}</span>
    </button>
  );
};

export default Round3DButton;