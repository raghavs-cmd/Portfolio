
import React, { useState, useEffect } from 'react';

const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as Element;
      if (target.closest('a, button, input, textarea, [role="button"], [data-cursor-hover]')) {
        setIsHovering(true);
      }
    };

    const onMouseOut = (e: MouseEvent) => {
      const target = e.target as Element;
       if (target.closest('a, button, input, textarea, [role="button"], [data-cursor-hover]')) {
        setIsHovering(false);
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.body.addEventListener('mouseover', onMouseOver);
    document.body.addEventListener('mouseout', onMouseOut);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.body.removeEventListener('mouseover', onMouseOver);
      document.body.removeEventListener('mouseout', onMouseOut);
    };
  }, []);

  const cursorSize = isHovering ? 40 : 12;

  return (
    <div className="hidden md:block pointer-events-none fixed inset-0 z-[9999]">
      <div
        className="absolute rounded-full border-2 border-accent transition-[width,height,border-width] duration-300 ease-out"
        style={{
          left: position.x,
          top: position.y,
          width: `${cursorSize}px`,
          height: `${cursorSize}px`,
          transform: `translate(-50%, -50%)`,
          willChange: 'width, height',
          borderWidth: isHovering ? '1px' : '2px',
        }}
      ></div>
    </div>
  );
};

export default CustomCursor;
