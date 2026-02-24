/* FILE: app/dashboard/promises/page.tsx */
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { HeartHandshake, Loader2, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { fetchMyBookings } from '@/lib/api';

interface Booking {
  id: number;
  need_name: string;
  institution_name: string;
  quantity: number;
  status: string;
  planned_date?: string;
}

export default function PromisesPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchMyBookings();
        setBookings((data as unknown as Booking[]) || []);
      } catch (err) {
        console.error(err);
        // API may not exist yet — show empty state gracefully
        setBookings([]);
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, []);

  return (
    <div className="max-w-4xl space-y-5 sm:space-y-8">

      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-[#1e3a8a]">Мои обещания</h1>
        <p className="text-gray-500 font-medium text-sm sm:text-base">
          Список вещей, которые вы планируете передать учреждениям.
        </p>
      </div>

      {/* Loading */}
      {isLoading && (
        <div className="flex items-center justify-center py-20">
          <Loader2 size={40} className="animate-spin text-[#1e3a8a]" />
        </div>
      )}

      {/* Error */}
      {!isLoading && error && (
        <div className="text-center py-16">
          <p className="text-red-500 font-bold mb-4">{error}</p>
          <Button onClick={() => window.location.reload()}>Попробовать снова</Button>
        </div>
      )}

      {/* Empty State */}
      {!isLoading && !error && bookings.length === 0 && (
        <div className="text-center py-14 sm:py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
          <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <HeartHandshake size={40} className="text-[#1e3a8a]" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">У вас пока нет обещаний</h3>
          <p className="text-gray-500 mb-6 max-w-md mx-auto">
            Перейдите к списку учреждений, чтобы найти тех, кому нужна помощь, и начните помогать.
          </p>
          <Link href="/institutions">
            <Button className="bg-[#1e3a8a] text-white hover:bg-[#2a4ec2] font-bold px-8">
              <ExternalLink size={16} className="mr-2" />
              Найти учреждения
            </Button>
          </Link>
        </div>
      )}

      {/* Bookings List */}
      {!isLoading && bookings.length > 0 && (
        <div className="space-y-4">
          {bookings.map((b) => (
            <div key={b.id} className="bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{b.need_name}</h3>
                  <p className="text-sm text-gray-500">{b.institution_name} · {b.quantity} шт.</p>
                  {b.planned_date && (
                    <p className="text-xs text-gray-400 mt-1">Плановая дата: {b.planned_date}</p>
                  )}
                </div>
                <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                  b.status === 'delivered' ? 'bg-green-100 text-green-700' :
                  b.status === 'cancelled' ? 'bg-red-100 text-red-700' :
                  'bg-blue-100 text-[#1e3a8a]'
                }`}>
                  {b.status === 'delivered' ? 'Выполнено' :
                   b.status === 'cancelled' ? 'Отменено' : 'Активно'}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}