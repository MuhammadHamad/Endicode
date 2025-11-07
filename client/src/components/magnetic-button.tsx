import { useRef, ReactNode } from "react";
import { Slot } from "@radix-ui/react-slot";

interface MagneticButtonProps {
  children: ReactNode;
  asChild?: boolean;
  className?: string;
}

export default function MagneticButton({ children, asChild = false, className = "" }: MagneticButtonProps) {
  const buttonRef = useRef<HTMLElement>(null);
  const Component = Slot;

  const handleMouseMove = (e: React.MouseEvent) => {
    const button = buttonRef.current;
    if (!button) return;

    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    button.style.setProperty('--magnetic-x', `${x * 0.3}px`);
    button.style.setProperty('--magnetic-y', `${y * 0.3}px`);
    button.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
  };

  const handleMouseLeave = () => {
    const button = buttonRef.current;
    if (!button) return;

    button.style.setProperty('--magnetic-x', '0px');
    button.style.setProperty('--magnetic-y', '0px');
    button.style.transform = 'translate(0px, 0px)';
  };

  return (
    <Component
      ref={buttonRef as any}
      className={`transition-transform duration-300 ease-out ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </Component>
  );
}
