import React, { useState } from "react";

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
  const [isActive, setIsActive] = useState(true);

  // Component dimensions
  const size = 80;

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

  // Only allow interactions if the component is active
  const handleMouseEnter = () => {
    if (!isActiv) return;
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    if (!isActiv) return;
    setIsHovered(false);
    setIsActive(false);
  };

  const handleMouseDown = () => {
    if (!isActiv) return;
    setIsActive(true);
  };

  const handleMouseUp = () => {
    if (!isActiv) return;
    setIsActive(false);
  };

  // Add touch events for mobile platforms
  const handleTouchStart = () => {
    if (!isActiv) return;
    setIsHovered(true);
    setIsActive(true);
  };

  const handleTouchEnd = () => {
    if (!isActiv) return;
    setIsHovered(false);
    setIsActive(false);
  };

  const handleTouchCancel = () => {
    if (!isActiv) return;
    setIsHovered(false);
    setIsActive(false);
  };

  // Update the front (face) color: when inactive not gray, but a less vibrant red.
  const frontBackground = isActiv
    ? "hsl(345deg 100% 47%)"
    : "hsl(345deg 60% 47%)";

  // Shadow styling – simple animation based on hover/active state
  const shadowBaseY = 2;
  const shadowHoverY = 4;
  const shadowActiveY = 1;
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
    // Even when deactivated we can show a subtle shadow effect
    filter: isHovered ? "blur(4px) brightness(1.1)" : "blur(4px)",
  };

  // Edge styling remains as defined
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

  // Front styling – change the translateY based on interactions and
  // update the background color if deactivated.
  const frontBaseY = -4;
  const frontHoverY = -6;
  const frontActiveY = -2;
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
    fontSize: "1rem",
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

  // Local onClick – perform the click action only when active
  const handleClick = () => {
    if (!isActiv) return;
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
      // Accessibility: clear outlines on focus/blur if needed
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