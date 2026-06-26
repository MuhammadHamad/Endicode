import { useRef, ReactNode, useEffect, useState } from "react";
import { Slot } from "@radix-ui/react-slot";

interface MagneticButtonProps {
  children: ReactNode;
  asChild?: boolean;
  className?: string;
  strength?: number;
}

export default function MagneticButton({
  children,
  className = "",
  strength = 0.4,
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLElement>(null);
  const [enabled, setEnabled] = useState(false);
  const frameRef = useRef<number | null>(null);
  const pendingRef = useRef<{ x: number; y: number; scale: number } | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    setEnabled(!window.matchMedia("(hover: none)").matches);
  }, []);

  const applyTransform = () => {
    frameRef.current = null;
    const button = buttonRef.current;
    const pending = pendingRef.current;
    if (!button || !pending) return;
    button.style.transform = `translate3d(${pending.x}px, ${pending.y}px, 0) scale(${pending.scale})`;
  };

  const schedule = (next: { x: number; y: number; scale: number }) => {
    pendingRef.current = next;
    if (frameRef.current == null) {
      frameRef.current = requestAnimationFrame(applyTransform);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!enabled) return;
    const button = buttonRef.current;
    if (!button) return;

    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const distance = Math.sqrt(x * x + y * y);
    const maxDistance = Math.max(rect.width, rect.height) / 2;
    const normalizedDistance = Math.min(distance / maxDistance, 1);

    const magneticX = x * strength * (1 - normalizedDistance * 0.5);
    const magneticY = y * strength * (1 - normalizedDistance * 0.5);
    const scale = 1 + (normalizedDistance < 0.5 ? 0.05 : 0);

    schedule({ x: magneticX, y: magneticY, scale });
  };

  const handleMouseEnter = () => {
    const button = buttonRef.current;
    if (!button) return;
    button.style.transition = "transform 0.2s cubic-bezier(0.4, 0, 0.2, 1)";
  };

  const handleMouseLeave = () => {
    const button = buttonRef.current;
    if (!button) return;
    button.style.transition = "transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)";
    schedule({ x: 0, y: 0, scale: 1 });
  };

  useEffect(() => {
    return () => {
      if (frameRef.current != null) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return (
    <Slot
      ref={buttonRef as any}
      className={`transition-transform duration-300 ease-out ${className}`}
      onMouseMove={enabled ? handleMouseMove : undefined}
      onMouseEnter={enabled ? handleMouseEnter : undefined}
      onMouseLeave={enabled ? handleMouseLeave : undefined}
    >
      {children}
    </Slot>
  );
}
