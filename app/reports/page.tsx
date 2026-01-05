/* FILE: app/reports/page.tsx */
import { Button } from '@/components/ui/Button';
import { FileText, ArrowRight, Construction } from 'lucide-react';
import Link from 'next/link';

export default function ReportsPage() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <div className="bg-[#f3e8ff] p-6 rounded-full mb-6 animate-bounce">
        <Construction size={48} className="text-[#763f97]" />
      </div>
      
      <h1 className="text-4xl font-extrabold text-[#304663] mb-4">
        Прозрачность — наш приоритет
      </h1>
      
      <p className="text-lg text-gray-600 max-w-2xl mb-8 leading-relaxed">
        Мы только начали свой путь и пока формируем первые отчеты о переданной помощи. 
        Как только документы будут готовы, они появятся на этой странице.
      </p>

      <div className="flex gap-4">
        <Button asChild variant="outline" className="border-[#763f97] text-[#763f97] hover:bg-[#763f97] hover:text-white">
          <Link href="/about">Узнать о нас больше</Link>
        </Button>
        <Button asChild className="bg-[#763f97] text-white hover:bg-[#60327c]">
          <Link href="/institutions">
            Совершить доброе дело <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
}