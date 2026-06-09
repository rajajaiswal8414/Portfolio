import { useState, useEffect } from 'react';

export const useScrollSpy = (sectionIds: string[], offset: number = 100): string => {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + offset;

      // Find the current active section
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const section = document.getElementById(sectionIds[i]);
        if (section) {
          const sectionTop = section.offsetTop;
          if (scrollPosition >= sectionTop) {
            setActiveId(sectionIds[i]);
            return;
          }
        }
      }

      // Default to first section if at the very top
      if (scrollPosition < (document.getElementById(sectionIds[0])?.offsetTop || 0)) {
        setActiveId(sectionIds[0]);
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Initial check
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [sectionIds, offset]);

  return activeId;
};
