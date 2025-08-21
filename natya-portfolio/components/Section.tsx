import React from 'react';
import { useOnScreen } from '../hooks/useOnScreen';

interface SectionProps {
  id: string;
  className?: string;
  children: React.ReactNode;
  ref?: React.Ref<HTMLElement>;
}

const Section: React.FC<SectionProps> = React.forwardRef<HTMLElement, Omit<SectionProps, 'ref'>>(({ id, className = '', children }, forwardedRef) => {
  const [ref, isVisible] = useOnScreen<HTMLElement>({ threshold: 0.1 });

  // Combine the forwarded ref with the internal ref
  const setRefs = React.useCallback(
    (node: HTMLElement | null) => {
      // @ts-ignore
      ref.current = node;
      if (typeof forwardedRef === 'function') {
        forwardedRef(node);
      } else if (forwardedRef) {
        // @ts-ignore
        forwardedRef.current = node;
      }
    },
    [forwardedRef, ref]
  );
  
  return (
    <section
      id={id}
      ref={setRefs}
      className={`py-20 md:py-28 transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] transform-gpu [perspective:1000px] ${className} ${
        isVisible ? 'opacity-100 translate-y-0 rotate-x-0' : 'opacity-0 translate-y-10 rotate-x-[-15deg]'
      }`}
    >
      {children}
    </section>
  );
});

export default Section;