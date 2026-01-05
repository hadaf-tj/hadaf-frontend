'use client';

import { useEffect, useState } from 'react';
import NeedListItem from '@/components/specific/NeedListItem';
import { Badge } from '@/components/ui/Badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Institution } from '@/types/project';
import { Mail, MapPin, Phone, Clock, CalendarClock, Loader2, ArrowLeft } from 'lucide-react';
import { fetchInstitutionById } from '@/lib/api';
import Link from 'next/link';
import { useParams } from 'next/navigation'; // Используем хук для получения ID

const typeMap: Record<string, { text: string; variant: "default" | "secondary" | "urgent" | "success" | "destructive" | "outline" }> = {
    Children: { text: 'Детский Дом', variant: 'urgent' },
    Elderly: { text: 'Дом Престарелых', variant: 'success' },
    Disabled: { text: 'Спец. Учреждение', variant: 'default' },
};

export default function InstitutionDetailPage() {
  const params = useParams();
  const id = params.id as string;

  const [institution, setInstitution] = useState<Institution | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    
    const loadData = async () => {
      setIsLoading(true);
      const data = await fetchInstitutionById(id);
      setInstitution(data);
      setIsLoading(false);
    };

    loadData();
  }, [id]);

  if (isLoading) {
    return (
        <div className="flex h-[50vh] items-center justify-center">
            <Loader2 className="h-10 w-10 animate-spin text-[#1e3a8a]" />
        </div>
    );
  }

  if (!institution) {
    return (
        <div className="flex flex-col items-center justify-center h-[50vh] gap-4">
            <h1 className="text-2xl font-bold">Учреждение не найдено</h1>
            <Link href="/institutions" className="text-[#1e3a8a] hover:underline flex items-center gap-2">
                <ArrowLeft size={16}/> Вернуться к списку
            </Link>
        </div>
    );
  }

  const typeInfo = typeMap[institution.type] || { text: institution.type, variant: 'default' };

  return (
    <div className="mx-auto max-w-7xl pb-12">
      {/* Шапка */}
      <div className="mb-8">
        <div className="mb-4">
            <Link href="/institutions" className="text-sm text-gray-500 hover:text-[#1e3a8a] transition-colors flex items-center gap-1">
                <ArrowLeft size={14}/> Назад к списку
            </Link>
        </div>
        <Badge variant={typeInfo.variant}>{typeInfo.text}</Badge>
        <h1 className="mt-2 text-4xl sm:text-5xl font-extrabold text-[#1e3a8a] tracking-tight">
          {institution.name}
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-8">
        {/* Левая колонка: список нужд */}
        <div className="lg:col-span-2">
          <h2 className="text-3xl font-bold text-[#1e3a8a] mb-4">Актуальные нужды</h2>
          <div className="space-y-4">
            {institution.needs && institution.needs.length > 0 ? (
              institution.needs.map((need) => (
                <NeedListItem key={need.id} need={need} />
              ))
            ) : (
              <div className="p-6 bg-white rounded-xl border border-dashed border-gray-300 text-center text-gray-500">
                  <p>На данный момент список нужд пуст или полностью закрыт. Спасибо!</p>
              </div>
            )}
          </div>
        </div>

        {/* Правая колонка: информация */}
        <div className="lg:col-span-1 mt-8 lg:mt-0">
          <Card className="sticky top-24 shadow-lg border-t-4 border-t-[#1e3a8a]">
            <CardHeader>
              <CardTitle>Контакты и адрес</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5 text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#1e3a8a] mt-1 flex-shrink-0" />
                <span>{institution.city}, {institution.address}</span>
              </div>
              
              {institution.contactPhone && (
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-[#1e3a8a] flex-shrink-0" />
                    <a href={`tel:${institution.contactPhone}`} className="hover:underline font-medium">{institution.contactPhone}</a>
                  </div>
              )}
              
              {institution.contactEmail && (
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-[#1e3a8a] flex-shrink-0" />
                    <a href={`mailto:${institution.contactEmail}`} className="hover:underline truncate">{institution.contactEmail}</a>
                  </div>
              )}

              {institution.activityHours && (
                  <div className="flex items-start gap-3 pt-4 border-t border-gray-100">
                    <CalendarClock className="w-5 h-5 text-[#1e3a8a] mt-1 flex-shrink-0" />
                    <div>
                      <span className="font-bold text-gray-700 block mb-1">Время для визитов:</span>
                      <span className="block text-gray-800 leading-relaxed">{institution.activityHours}</span>
                    </div>
                  </div>
              )}

              <div className="flex items-center gap-3 pt-4 border-t border-gray-100 text-gray-400 text-xs">
                <Clock className="w-4 h-4 flex-shrink-0" />
                <span>Данные обновлены: {institution.lastUpdated}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};