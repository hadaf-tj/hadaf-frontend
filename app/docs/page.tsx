/* FILE: app/docs/page.tsx */
'use client';

import MainLayout from '@/components/layout/MainLayout';
import { FileText, Download, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/Button';

const DOCUMENTS = [
  { title: 'Устав благотворительного сообщества "Ҳадаф"', size: '2.4 MB', date: '12.01.2023' },
  { title: 'Свидетельство о регистрации', size: '1.1 MB', date: '10.01.2023' },
  { title: 'Политика обработки персональных данных', size: '0.8 MB', date: '15.01.2023' },
  { title: 'Публичная оферта', size: '0.5 MB', date: '20.01.2023' },
];

export default function DocsPage() {
  return (
    <MainLayout>
      <div className="min-h-screen bg-[#f8fafc] font-sans pb-20">
        
        {/* HERO */}
        <div className="bg-[#1e3a8a] pt-32 pb-16 rounded-b-[3rem] relative overflow-hidden">
           <div className="container mx-auto px-6 relative z-10 flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center text-[#ffca63] mb-6 backdrop-blur-sm">
                 <ShieldCheck size={32} />
              </div>
              <h1 className="text-4xl font-black text-white mb-4">Официальные документы</h1>
              <p className="text-white/80 text-lg max-w-2xl">
                 Мы работаем открыто и в строгом соответствии с законодательством Республики Таджикистан.
              </p>
           </div>
        </div>

        {/* LIST */}
        <div className="container mx-auto max-w-4xl px-6 mt-12">
           <div className="bg-white rounded-[2rem] shadow-xl border border-gray-100 overflow-hidden">
              {DOCUMENTS.map((doc, idx) => (
                <div key={idx} className="p-6 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                   <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#1e3a8a] flex items-center justify-center shrink-0">
                         <FileText size={24} />
                      </div>
                      <div>
                         <h3 className="font-bold text-gray-900 text-lg leading-tight mb-1">{doc.title}</h3>
                         <p className="text-sm text-gray-500 font-medium">PDF • {doc.size} • Обновлено {doc.date}</p>
                      </div>
                   </div>
                   <Button variant="outline" className="border-gray-200 hover:border-[#1e3a8a] hover:text-[#1e3a8a] font-bold shrink-0">
                      <Download size={18} className="mr-2" />
                      Скачать
                   </Button>
                </div>
              ))}
           </div>
        </div>

      </div>
    </MainLayout>
  );
}