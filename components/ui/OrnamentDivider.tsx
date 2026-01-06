/* FILE: components/ui/OrnamentDivider.tsx */
'use client';

import { cn } from '@/lib/utils';

interface OrnamentDividerProps {
  className?: string;
  opacity?: string; // Позволим настраивать прозрачность
  height?: string;  // и высоту
}

const OrnamentDivider: React.FC<OrnamentDividerProps> = ({
  className,
  // Стандартная прозрачность 20% (opacity-20) - достаточно тонко
  opacity = "opacity-20", 
  // Стандартная высота
  height = "h-24 md:h-32" 
}) => {
  return (
    <div className={cn("relative w-full overflow-hidden bg-white", height, className)}>
      {/* Слой с картинкой.
         - absolute inset-0: растягиваем на весь родительский div
         - bg-[url('/ornament.png')]: подключаем картинку
         - bg-repeat: замостить узором всё пространство
         - bg-center: центрируем
         - mix-blend-multiply: режим наложения, чтобы белый фон картинки стал прозрачным, 
           а узор "впитался" в фон под ним. Отлично работает на светлых фонах.
      */}
      <div 
        className={cn(
          "absolute inset-0 bg-[url('/ornament.png')] bg-repeat bg-contain bg-center",
          opacity,
          // mix-blend-multiply хорошо работает, если фон сайта светлый (белый/серый).
          // Если фон темный, лучше убрать blend-mode и просто оставить opacity.
          "mix-blend-multiply" 
        )}
      ></div>
      
      {/* Опционально: Можно добавить поверх легкий градиент, чтобы края были мягче */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/50 via-transparent to-white/50"></div>
    </div>
  );
};

export default OrnamentDivider;