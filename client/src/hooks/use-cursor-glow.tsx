import { useRef, useEffect } from 'react';

export function useCursorGlow() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let mouseX = 0;
    let mouseY = 0;

    const updateMousePosition = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const updateCursorGlow = () => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${mouseX - 150}px, ${mouseY - 150}px)`;
      }
      requestAnimationFrame(updateCursorGlow);
    };

    document.addEventListener('mousemove', updateMousePosition);
    updateCursorGlow();

    return () => {
      document.removeEventListener('mousemove', updateMousePosition);
    };
  }, []);

  return { cursorRef };
}
