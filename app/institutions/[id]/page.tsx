'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/Button';

import {
  MapPin, Phone, Users, CheckCircle2,
  ChevronLeft, Share2, AlertCircle, Gift, Loader2,
  Search, ArrowUpDown, Clock
} from 'lucide-react';
import PledgeModal, { NeedItem } from '@/components/specific/PledgeModal';
import { fetchInstitutionById, fetchNeedsByInstitution, NeedsFilters } from '@/lib/api';
import { useAuth } from '@/lib/AuthContext';
import { useRouter } from 'next/navigation';
import { Institution, Need } from '@/types/project';

const STATUS_OPTIONS = [
  { id: 'all', label: 'Все' },
  { id: 'open', label: 'Открытые' },
  { id: 'closed', label: 'Закрытые' },
];

const SORT_OPTIONS = [
  { id: 'default', label: 'По дате (новые)' },
  { id: 'date_asc', label: 'По дате (старые)' },
  { id: 'urgency', label: 'По срочности' },
];

export default function InstitutionDetailPage() {
  const params = useParams();

  // Состояние для данных учреждения
  const [data, setData] = useState<Institution | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  // Состояние для нужд с фильтрами
  const [needs, setNeeds] = useState<Need[]>([]);
  const [needsLoading, setNeedsLoading] = useState(false);
  const [needsSearch, setNeedsSearch] = useState('');
  const [needsStatus, setNeedsStatus] = useState('all'); // 'all' | 'open' | 'closed'
  const [needsSort, setNeedsSort] = useState('default');

  // Состояния модалки
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedNeed, setSelectedNeed] = useState<NeedItem | null>(null);

  const { user } = useAuth();
  const router = useRouter();

  // Загрузка нужд с фильтрами  
  const loadNeeds = useCallback(async (institutionId: string) => {
    setNeedsLoading(true);
    try {
      const filters: NeedsFilters = {};
      if (needsSearch) filters.name = needsSearch;
      if (needsStatus === 'open') filters.is_done = false;
      if (needsStatus === 'closed') filters.is_done = true;
      if (needsSort !== 'default') filters.order_by = needsSort;

      const result = await fetchNeedsByInstitution(institutionId, filters);
      setNeeds(result);
    } catch (err) {
      console.error('Error loading needs:', err);
    } finally {
      setNeedsLoading(false);
    }
  }, [needsSearch, needsStatus, needsSort]);

  // Загрузка данных учреждения
  useEffect(() => {
    const loadDetail = async () => {
      if (!params.id) return;

      setIsLoading(true);
      try {
        const id = Array.isArray(params.id) ? params.id[0] : params.id;
        const result = await fetchInstitutionById(id);

        if (!result) {
          setError('Учреждение не найдено');
        } else {
          setData(result);
          // Загружаем нужды при первой загрузке
          setNeeds(result.needs);
        }
      } catch (err) {
        console.error(err);
        setError('Ошибка при загрузке данных');
      } finally {
        setIsLoading(false);
      }
    };

    loadDetail();
  }, [params.id]);

  // Перезагрузка нужд при изменении фильтров
  useEffect(() => {
    if (!params.id || isLoading) return;

    const id = Array.isArray(params.id) ? params.id[0] : params.id;
    const timeoutId = setTimeout(() => {
      loadNeeds(id);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [params.id, needsSearch, needsStatus, needsSort, isLoading, loadNeeds]);

  // Хендлер для открытия модалки
  const handlePledgeClick = (need: Need) => {
    if (!user) {
      router.push('/login');
      return;
    }
    setSelectedNeed({
      id: need.id,
      title: need.name,
      total: need.requiredQuantity,
      collected: need.receivedQuantity,
      measure: need.unit
    });
    setIsModalOpen(true);
  };

  // Прогресс-бар с учетом booked
  const ProgressBar = ({ received, booked, total, unit }: { received: number, booked: number, total: number, unit: string }) => {
    const receivedPercent = Math.min(100, Math.round((received / total) * 100));
    const bookedPercent = Math.min(100 - receivedPercent, Math.round((booked / total) * 100));
    const remaining = Math.max(0, total - received - booked);
    const isFullyCovered = remaining <= 0;

    return (
      <div className="w-full">
        <div className="flex justify-between text-xs font-bold mb-1">
          <span className={isFullyCovered ? 'text-green-600' : 'text-[#1e3a8a]'}>
            {isFullyCovered ? 'Сбор покрыт' : `Осталось: ${remaining} ${unit}`}
          </span>
          <span className="text-gray-400">
            Получено: {received} {booked > 0 ? `· В пути: ${booked}` : ''} · Всего: {total}
          </span>
        </div>
        <div className="h-2.5 w-full bg-gray-100 rounded-full overflow-hidden flex">
          <div
            className="h-full bg-green-500 transition-all duration-500"
            style={{ width: `${receivedPercent}%` }}
          />
          {bookedPercent > 0 && (
            <div
              className="h-full bg-[#ffca63] transition-all duration-500"
              style={{ width: `${bookedPercent}%` }}
            />
          )}
        </div>
      </div>
    );
  };

  // 3. Рендер состояний загрузки/ошибки
  if (isLoading) {
    return (
      <MainLayout>
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#f8fafc] text-[#1e3a8a]">
          <Loader2 size={48} className="animate-spin mb-4" />
          <p className="font-bold">Загрузка профиля...</p>
        </div>
      </MainLayout>
    );
  }

  if (error || !data) {
    return (
      <MainLayout>
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#f8fafc]">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Упс!</h1>
          <p className="text-gray-500 mb-6">{error || 'Учреждение не найдено'}</p>
          <Button asChild>
            <Link href="/institutions">Вернуться к списку</Link>
          </Button>
        </div>
      </MainLayout>
    );
  }

  // 4. Основной рендер (когда данные есть)
  return (
    <MainLayout>
      <div className="min-h-screen bg-[#f8fafc] font-sans pb-20">

        {/* HERO IMAGE & BREADCRUMBS */}
        <div className="relative h-[280px] sm:h-[340px] lg:h-[400px] w-full overflow-hidden">
          <Image
            src="/institution_id_hero.webp"
            alt={data.name}
            fill
            className="object-cover"
            priority
          />

          <div className="container mx-auto max-w-[1440px] px-6 md:px-12 xl:px-28 relative z-10 pt-28">
            <Link href="/institutions" className="inline-flex items-center text-white hover:text-white transition-colors font-bold text-sm bg-black/20 backdrop-blur-md px-4 py-2 rounded-full hover:bg-black/30">
              <ChevronLeft size={16} className="mr-1" />
              Назад к списку
            </Link>
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div className="container mx-auto max-w-[1440px] px-6 md:px-12 xl:px-28 -mt-10 lg:-mt-16 relative z-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

            {/* ЛЕВАЯ КОЛОНКА */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-gray-100">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-16 h-16 rounded-2xl bg-blue-50 text-[#1e3a8a] flex items-center justify-center">
                    <Users size={32} />
                  </div>
                  {/* Verified пока хардкодим true, или добавим поле в БД */}
                  <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider flex items-center gap-1">
                    <CheckCircle2 size={14} />
                    Проверено
                  </div>
                </div>

                <h1 className="text-2xl md:text-3xl font-black text-gray-900 mb-2 leading-tight">
                  {data.name}
                </h1>

                <div className="flex items-center text-gray-500 font-medium mb-6">
                  <MapPin size={16} className="mr-2 text-[#ffca63]" />
                  {data.city}, {data.address}
                </div>

                {/* Статистика */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-gray-50 flex flex-col justify-center p-4 rounded-2xl w-full">
                    <div className="text-xs text-gray-500 font-bold uppercase mb-1">Подопечных</div>
                    <div className="text-xl font-black text-[#1e3a8a]">{data.wardsCount || 0}</div>
                  </div>
                  <div className="bg-gray-50 flex flex-col justify-center p-4 rounded-2xl w-full">
                    <div className="text-xs text-gray-500 font-bold uppercase mb-1">Открытых нужд</div>
                    <div className="text-xl font-black text-[#1e3a8a]">{data.needsCount}</div>
                  </div>
                </div>

                <div className="space-y-4 pt-6 border-t border-gray-100">
                  <div className="flex items-center gap-3">
                    <Phone size={18} className="text-gray-400" />
                    <div>
                      <p className="text-xs text-gray-400 font-bold uppercase">Контакты</p>
                      <p className="font-bold text-gray-800">{data.contactPhone || 'Не указан'}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Users size={18} className="text-gray-400" />
                    <div>
                      <p className="text-xs text-gray-400 font-bold uppercase">Email</p>
                      <p className="font-bold text-gray-800">{data.contactEmail || 'Не указан'}</p>
                    </div>
                  </div>
                </div>
              </div>

              <Button variant="outline" className="w-full h-14 rounded-2xl border-2 border-gray-200 text-gray-500 font-bold hover:border-[#1e3a8a] hover:text-[#1e3a8a] bg-transparent">
                <Share2 size={18} className="mr-2" />
                Поделиться профилем
              </Button>
            </div>

            {/* ПРАВАЯ КОЛОНКА (Нужды) */}
            <div className="lg:col-span-8 space-y-8">

              {/* Описание */}
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 flex flex-col lg:flex-row gap-8 justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-xl font-black text-gray-900 mb-4">О нас</h3>
                  <p className="text-gray-600 leading-relaxed text-lg">
                    {`Учреждение "${data.name}" находится в городе ${data.city}.`}
                  </p>
                </div>
                
                <div className="w-full lg:w-[350px] bg-[#f8fafc] border border-gray-200 rounded-2xl p-6 flex-shrink-0">
                  <div className="text-xs text-gray-500 font-bold uppercase mb-2 flex items-center gap-2">
                    <Clock size={16} className="text-[#1e3a8a]" /> Часы приема
                  </div>
                  <div className="text-sm font-bold text-[#1e3a8a] leading-relaxed break-words">
                    {data.activityHours && data.activityHours.trim() !== '' ? data.activityHours : 'Не указаны'}
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl md:text-3xl font-black text-[#1e3a8a]">
                    Актуальные нужды
                  </h2>
                  <span className="bg-[#ffca63] text-[#1e3a8a] px-3 py-1 rounded-lg text-sm font-bold">
                    {needs.filter(n => n.receivedQuantity < n.requiredQuantity).length} открыто
                  </span>
                </div>

                {/* Панель фильтров нужд */}
                <div className="bg-white rounded-2xl p-4 border border-gray-100 mb-6">
                  <div className="flex flex-col lg:flex-row gap-4">
                    {/* Поиск по названию */}
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                      <input
                        type="text"
                        placeholder="Найти нужду..."
                        value={needsSearch}
                        onChange={(e) => setNeedsSearch(e.target.value)}
                        className="w-full h-11 pl-10 pr-4 rounded-xl bg-gray-50 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]/20 font-medium text-sm"
                      />
                    </div>

                    {/* Фильтр по статусу */}
                    <div className="flex items-center gap-2">
                      {STATUS_OPTIONS.map((opt) => (
                        <button
                          key={opt.id}
                          onClick={() => setNeedsStatus(opt.id)}
                          className={`
                            px-4 py-2.5 rounded-xl font-bold text-sm transition-all
                            ${needsStatus === opt.id
                              ? 'bg-[#1e3a8a] text-white'
                              : 'bg-gray-50 text-gray-600 hover:bg-gray-100'}
                          `}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>

                    {/* Сортировка */}
                    <div className="flex items-center gap-2">
                      <ArrowUpDown size={16} className="text-gray-400" />
                      <select
                        value={needsSort}
                        onChange={(e) => setNeedsSort(e.target.value)}
                        className="bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 font-medium text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]/20 cursor-pointer"
                      >
                        {SORT_OPTIONS.map((opt) => (
                          <option key={opt.id} value={opt.id}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Индикатор загрузки нужд */}
                {needsLoading && (
                  <div className="flex justify-center py-8">
                    <Loader2 size={32} className="animate-spin text-[#1e3a8a]" />
                  </div>
                )}

                {!needsLoading && needs.length === 0 ? (
                  <div className="text-center py-10 bg-white rounded-3xl border border-gray-100">
                    <p className="text-gray-500">
                      {needsSearch || needsStatus !== 'all'
                        ? 'Нужды не найдены по заданным фильтрам'
                        : 'В данный момент нужд нет.'}
                    </p>
                    {(needsSearch || needsStatus !== 'all') && (
                      <button
                        onClick={() => { setNeedsSearch(''); setNeedsStatus('all'); }}
                        className="mt-3 text-[#1e3a8a] font-bold hover:underline"
                      >
                        Сбросить фильтры
                      </button>
                    )}
                  </div>
                ) : !needsLoading && (
                  <div className="space-y-4">
                    {needs.map((need) => {
                      const remaining = Math.max(0, need.requiredQuantity - need.receivedQuantity - need.bookedQuantity);
                      const isDone = need.receivedQuantity >= need.requiredQuantity;
                      const isFullyCovered = remaining <= 0;

                      return (
                        <div
                          key={need.id}
                          className={`bg-white rounded-2xl p-6 transition-all border ${isDone ? 'border-green-100 opacity-60' : 'border-gray-100 shadow-lg hover:shadow-xl hover:-translate-y-1'}`}
                        >
                          <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                            <div className={`w-14 h-14 rounded-2xl flex-shrink-0 flex items-center justify-center ${isDone ? 'bg-green-100 text-green-600' : 'bg-blue-50 text-[#1e3a8a]'}`}>
                              {isDone ? <CheckCircle2 size={24} /> : <Gift size={24} />}
                            </div>

                            <div className="flex-1 w-full">
                              <div className="flex justify-between items-start mb-2">
                                <div>
                                  <div className="flex items-center gap-2 mb-1">
                                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wide">Потребность</span>
                                  </div>
                                  <h4 className={`text-xl font-bold ${isDone ? 'text-gray-500 line-through' : 'text-gray-900'}`}>
                                    {need.name}
                                  </h4>
                                </div>
                              </div>

                              <div className="max-w-md">
                                <ProgressBar received={need.receivedQuantity} booked={need.bookedQuantity} total={need.requiredQuantity} unit={need.unit} />
                              </div>
                            </div>

                            <div className="flex-shrink-0 w-full md:w-auto mt-4 md:mt-0">
                              {isDone ? (
                                <span className="text-green-600 font-bold text-sm">✓ Закрыто</span>
                              ) : isFullyCovered ? (
                                <Button disabled className="w-full bg-gray-200 text-gray-500 font-bold h-12 rounded-xl px-6 cursor-not-allowed">
                                  Покрыто (в пути)
                                </Button>
                              ) : (
                                <Button
                                  onClick={() => handlePledgeClick(need)}
                                  className="w-full bg-[#1e3a8a] hover:bg-[#2c4db5] text-white font-bold h-12 rounded-xl px-6">
                                  Я привезу
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                <div className="mt-8 bg-[#fff8e6] border border-[#ffca63]/30 rounded-2xl p-6 flex gap-4 items-start">
                  <AlertCircle className="text-[#e6b046] flex-shrink-0 mt-1" size={24} />
                  <div>
                    <h4 className="font-bold text-[#966d1f] mb-1">Важно знать</h4>
                    <p className="text-[#b38632] text-sm leading-relaxed">
                      Пожалуйста, перед поездкой нажмите кнопку «Я привезу», чтобы забронировать нужное количество. Это поможет избежать дублирования помощи.
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
      {selectedNeed && (
        <PledgeModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          need={selectedNeed}
          institutionName={data.name}
          onSuccess={() => {
            const id = Array.isArray(params.id) ? params.id[0] : params.id;
            if (id) loadNeeds(id);
          }}
        />
      )}
    </MainLayout>
  );
}