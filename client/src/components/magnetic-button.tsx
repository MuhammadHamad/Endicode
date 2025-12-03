import { useRef, ReactNode, useState } from "react";
import { Slot } from "@radix-ui/react-slot";

interface MagneticButtonProps {
  children: ReactNode;
  asChild?: boolean;
  className?: string;
  strength?: number;
}

export default function MagneticButton({ 
  children, 
  asChild = false, 
  className = "",
  strength = 0.4 
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const Component = Slot;

  const handleMouseMove = (e: React.MouseEvent) => {
    const button = buttonRef.current;
    if (!button) return;

    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    const distance = Math.sqrt(x * x + y * y);
    const maxDistance = Math.max(rect.width, rect.height) / 2;
    const normalizedDistance = Math.min(distance / maxDistance, 1);
    
    // Enhanced magnetic effect with distance-based scaling
    const magneticX = x * strength * (1 - normalizedDistance * 0.5);
    const magneticY = y * strength * (1 - normalizedDistance * 0.5);
    const scale = 1 + (normalizedDistance < 0.5 ? 0.05 : 0);

    button.style.setProperty('--magnetic-x', `${magneticX}px`);
    button.style.setProperty('--magnetic-y', `${magneticY}px`);
    button.style.setProperty('--magnetic-scale', `${scale}`);
    button.style.transform = `translate(${magneticX}px, ${magneticY}px) scale(${scale})`;
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    const button = buttonRef.current;
    if (!button) return;
    button.style.transition = 'transform 0.2s cubic-bezier(0.4, 0, 0.2, 1)';
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    const button = buttonRef.current;
    if (!button) return;

    button.style.transition = 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
    button.style.setProperty('--magnetic-x', '0px');
    button.style.setProperty('--magnetic-y', '0px');
    button.style.setProperty('--magnetic-scale', '1');
    button.style.transform = 'translate(0px, 0px) scale(1)';
  };

  return (
    <Component
      ref={buttonRef as any}
      className={`transition-transform duration-300 ease-out ${isHovered ? 'cursor-pointer' : ''} ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </Component>
  );
}
