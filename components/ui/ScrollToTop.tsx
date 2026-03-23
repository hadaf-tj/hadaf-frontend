'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    // Отключаем стандартное поведение браузера (восстановление позиции скролла при перезагрузке)
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    
    // При маунте (в т.ч. после перезагрузки) и при смене роута — скроллим в самый верх
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
}
