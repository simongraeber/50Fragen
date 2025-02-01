import React, { useState } from "react"

interface Round3DButtonProps {
  label?: string;
  onClick: () => void;
}

const Round3DButton: React.FC<Round3DButtonProps> = ({
                                                       label = "",
                                                       onClick,
                                                     }) => {
  const [isHovered, setIsHovered] = useState(false)
  const [isActive, setIsActive] = useState(false)

  // Dimensions and shape
  const size = 80

  // Top-level button (“pushable”) styles
  const buttonStyle: React.CSSProperties = {
    position: "relative",
    border: "none",
    background: "transparent",
    padding: 0,
    cursor: "pointer",
    outlineOffset: "4px",
    userSelect: "none",
    WebkitTapHighlightColor: "transparent",
    width: `${size}px`,
    height: `${size}px`,
    borderRadius: "50%",
    // No filter here, so it won’t brighten or blur the whole page
  }

  /*
    To animate the shadow, edge, and front independently,
    we compute their Y-positions and filters based on hover/active state.
  */
  // Shadow
  const shadowBaseY = 2
  const shadowHoverY = 4
  const shadowActiveY = 1
  const shadowTranslateY = isActive
    ? shadowActiveY
    : isHovered
      ? shadowHoverY
      : shadowBaseY

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
    // Apply blur (always) and brightness (only on hover) without affecting the page
    filter: isHovered
      ? "blur(4px) brightness(1.1)"
      : "blur(4px)",
  }

  // Edge (the “middle” rim of the button)
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
    // Slight brightness bump on hover
    filter: isHovered ? "brightness(1.1)" : "none",
    transition: "filter 250ms",
  }

  // Front (the top face)
  const frontBaseY = -4
  const frontHoverY = -6
  const frontActiveY = -2
  const frontTranslateY = isActive
    ? frontActiveY
    : isHovered
      ? frontHoverY
      : frontBaseY

  const frontStyle: React.CSSProperties = {
    display: "block",
    position: "relative",
    width: "100%",
    height: "100%",
    borderRadius: "50%",
    fontSize: "1rem",
    color: "white",
    background: "hsl(345deg 100% 47%)",
    willChange: "transform, filter",
    transform: `translateY(${frontTranslateY}px)`,
    // Different transitions for press vs. hover
    transition: isActive
      ? "transform 34ms, filter 34ms"
      : "transform 600ms cubic-bezier(0.3, 0.7, 0.4, 1), filter 250ms",
    alignItems: "center",
    justifyContent: "center",
    // Slight brightness on hover
    filter: isHovered ? "brightness(1.1)" : "none",
  }

  // Handlers for pointer states
  const handleMouseEnter = () => setIsHovered(true)
  const handleMouseLeave = () => {
    setIsHovered(false)
    setIsActive(false)
  }
  const handleMouseDown = () => setIsActive(true)
  const handleMouseUp = () => setIsActive(false)

  return (
    <button
      type="button"
      style={buttonStyle}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      // Useful for accessibility
      onFocus={(e) => (e.target as HTMLButtonElement).style.outline = ""}
      onBlur={(e) => (e.target as HTMLButtonElement).style.outline = ""}
    >
      <span style={shadowStyle}></span>
      <span style={edgeStyle}></span>
      <span style={frontStyle}>
        {label}
      </span>
    </button>
  )
}

export default Round3DButton