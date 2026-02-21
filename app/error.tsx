'use client'; // Страницы ошибок ОБЯЗАТЕЛЬНО должны быть клиентскими


import { Button } from '@/components/ui/Button';
import Image from 'next/image';

// Страница ошибки принимает специальные пропсы: error и reset
export default function GlobalError({
  error: _error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-center min-h-[70vh] text-center lg:text-left px-4 lg:gap-12 max-w-5xl mx-auto">
      
      {/* ЛЕВАЯ ЧАСТЬ: Изображение 500 */}
      

      {/* ПРАВАЯ ЧАСТЬ: Текст и кнопка */}
      <div className="flex flex-col items-center lg:items-start">
        
        {/* Лаконичный текст */}
        <h1 className="mt-4 lg:mt-0 text-4xl font-extrabold text-[#1e3a8a]">
          Ой... Что-то пошло не так
        </h1>

        <p className="mt-4 text-lg text-gray-700 max-w-md">
          Это не вы, это мы. На нашей стороне произошла техническая неполадка. 
          Мы уже знаем о проблеме и работаем над её устранением.
        </p>

        {/* Кнопка "reset" пытается перезагрузить страницу */}
        <Button
          size="lg"
          className="mt-8 bg-[#1e3a8a] text-white hover:bg-[#1e3a8a]/90 shadow-md"
          onClick={() => reset()}
        >
          Попробовать снова
        </Button>
      </div>
      <div className="flex-shrink-0 mb-8 lg:mb-0">
        <Image
          src="/500.jpg" // Ваш файл 500.jpg
          alt="Ошибка на сервере"
          width={375}
          height={375}
        />
      </div>
    </div>
  );
}