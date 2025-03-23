import React from "react";
import { Button, type ButtonProps } from "@/components/ui/button.tsx";

interface LoadingButtonProps extends ButtonProps {
  loading?: boolean;
}

const LoadingButton: React.FC<LoadingButtonProps> = ({
                                                       loading = false,
                                                       children,
                                                       className = "",
                                                       ...props
                                                     }) => {
  return (
    <Button
      disabled={loading || props.disabled}
      className={`relative overflow-hidden ${className}`}
      {...props}
    >
      <span className="relative z-10">{children}</span>
      {loading && (
        <span className="absolute inset-0 z-0 animated-overlay" />
      )}
      <style>{`
          @keyframes colorPulse {
              0%,
              100% {
                  background-color: hsl(var(--primary));
                  opacity: 0.4;
              }
              50% {
                  background-color: hsl(var(--secondary));
                  opacity: 0.8;
              }
          }
          .animated-overlay {
              animation: colorPulse 1.5s ease-in-out infinite;
          }
      `}</style>
    </Button>
  );
};

export default LoadingButton;