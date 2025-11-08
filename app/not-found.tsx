import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import Image from 'next/image';

export default function NotFound() {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-center min-h-[70vh] text-center lg:text-left px-4 lg:gap-12 max-w-5xl mx-auto">
      
      {/* ЛЕВАЯ ЧАСТЬ: Изображение*/}
      <div className="flex-shrink-0 mb-8 lg:mb-0">
        <Image
          src="/404.jpg" // Убедитесь, что путь правильный
          alt="Озадаченный фиолетовый монстрик"
          width={350} // Увеличим размер для лучшего эффекта
          height={350}
        />
      </div>

      {/* ПРАВАЯ ЧАСТЬ: Текст и кнопка */}
      <div className="flex flex-col items-center lg:items-start">
        <h1 className="mt-4 lg:mt-0 text-4xl font-extrabold text-[#763f97]">
          404 - Ой-ой...
        </h1>

        <p className="mt-4 text-lg text-gray-700 max-w-md italic">
            "Я обыскал все уголки карты, но этот адрес не нашел. 
            Давайте вернемся на главную страницу?"
        </p>

        <Button asChild size="lg" className="mt-8 bg-[#763f97] text-white hover:bg-[#763f97]/90 shadow-md">
          <Link href="/">
            Увести меня отсюда
          </Link>
        </Button>
      </div>
    </div>
  );
}