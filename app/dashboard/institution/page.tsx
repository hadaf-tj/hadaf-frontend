'use client';

import { useState, useEffect } from 'react';
import { 
  Plus, 
  Package, 
  CheckCircle2, 
  Clock, 
  Trash2, 
  Edit2,
  AlertTriangle,
  Loader2,
  ClipboardList,
  Check,
  X,
  PackageCheck
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import AddNeedModal from '@/components/specific/AddNeedModal';
import { 
  getProfile, 
  fetchInstitutionById, 
  deleteNeed, 
  updateNeed, 
  fetchInstitutionBookings, 
  approveBooking, 
  rejectBooking, 
  completeBooking,
  fetchInstitutionEvents,
  approveEvent,
  rejectEvent,
  EventItem
} from '@/lib/api';
import { Need } from '@/types/project';

type Tab = 'needs' | 'bookings' | 'events';

interface Booking {
  id: number;
  need_id: number;
  quantity: number;
  note?: string;
  status: string;
}

export default function InstitutionDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>('needs');
  const [needs, setNeeds] = useState<Need[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [institutionId, setInstitutionId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Edit state
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({ name: '', required_qty: 0, unit: '', urgency: '' });
  
  // Feedback
  const [feedback, setFeedback] = useState<{type: 'success' | 'error', msg: string} | null>(null);

  const showFeedback = (type: 'success' | 'error', msg: string) => {
    setFeedback({ type, msg });
    setTimeout(() => setFeedback(null), 3000);
  };

  // Загрузка данных
  const loadData = async () => {
    setLoading(true);
    try {
      const user = await getProfile();
      
      if (!user.institution_id) {
        alert("Вы не привязаны к учреждению!");
        setLoading(false);
        return;
      }
      setInstitutionId(user.institution_id);

      const inst = await fetchInstitutionById(String(user.institution_id));
      if (inst) {
        setNeeds(inst.needs);
      }

      // Load bookings
      try {
        const bookingsData = await fetchInstitutionBookings(user.institution_id);
        setBookings(bookingsData as unknown as Booking[]);
      } catch (e) {
        console.error('Bookings load error:', e);
      }
      
      // Load events
      try {
        const eventsData = await fetchInstitutionEvents(user.institution_id);
        setEvents(eventsData);
      } catch (e) {
        console.error('Events load error:', e);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Delete need
  const handleDelete = async (id: string) => {
    if(!confirm("Удалить эту нужду?")) return;
    try {
      await deleteNeed(id);
      setNeeds(prev => prev.filter(n => n.id !== id));
      showFeedback('success', 'Нужда удалена');
    } catch (e) {
      console.error(e);
      showFeedback('error', 'Не удалось удалить');
    }
  };

  // Start editing
  const startEdit = (need: Need) => {
    setEditingId(need.id);
    setEditForm({
      name: need.name,
      required_qty: need.requiredQuantity,
      unit: need.unit,
      urgency: need.urgency || 'medium',
    });
  };

  // Save edit
  const saveEdit = async () => {
    if (!editingId) return;
    try {
      await updateNeed(editingId, {
        name: editForm.name,
        required_qty: editForm.required_qty,
        unit: editForm.unit,
        urgency: editForm.urgency,
      });
      setEditingId(null);
      showFeedback('success', 'Нужда обновлена');
      loadData();
    } catch (e) {
      console.error(e);
      showFeedback('error', 'Ошибка обновления');
    }
  };

  // Booking actions
  const handleApprove = async (id: number) => {
    try {
      await approveBooking(id);
      showFeedback('success', 'Бронирование одобрено');
      loadData();
    } catch (e) {
      console.error(e);
      showFeedback('error', 'Ошибка подтверждения');
    }
  };

  const handleReject = async (id: number) => {
    try {
      await rejectBooking(id);
      showFeedback('success', 'Бронирование отклонено');
      loadData();
    } catch (e) {
      console.error(e);
      showFeedback('error', 'Ошибка отклонения');
    }
  };

  const handleComplete = async (id: number) => {
    try {
      await completeBooking(id);
      showFeedback('success', 'Доставка подтверждена! Количество обновлено.');
      loadData();
    } catch (e) {
      console.error(e);
      showFeedback('error', 'Ошибка завершения');
    }
  };

  // Event moderation
  const handleApproveEvent = async (id: number) => {
    if(!confirm("Одобрить это событие? Оно появится в публичной ленте.")) return;
    try {
      await approveEvent(id);
      showFeedback('success', 'Событие одобрено');
      loadData();
    } catch (e) {
      console.error(e);
      showFeedback('error', 'Ошибка одобрения события');
    }
  };

  const handleRejectEvent = async (id: number) => {
    if(!confirm("Отклонить это событие?")) return;
    try {
      await rejectEvent(id);
      showFeedback('success', 'Событие отклонено');
      loadData();
    } catch (e) {
      console.error(e);
      showFeedback('error', 'Ошибка отклонения события');
    }
  };

  if (loading) {
    return <div className="flex h-screen items-center justify-center text-[#1e3a8a]"><Loader2 className="animate-spin" size={40}/></div>;
  }

  // Stats
  const activeCount = needs.filter(n => n.receivedQuantity < n.requiredQuantity).length;
  const completedCount = needs.length - activeCount;
  const pendingBookings = bookings.filter(b => b.status === 'pending').length;
  const pendingEvents = events.filter(e => e.status === 'pending').length;

  const statusLabel = (s: string) => {
    switch(s) {
      case 'pending': return { text: 'Ожидает', cls: 'bg-yellow-50 text-yellow-700' };
      case 'approved': return { text: 'Одобрено', cls: 'bg-blue-50 text-blue-700' };
      case 'rejected': return { text: 'Отклонено', cls: 'bg-red-50 text-red-700' };
      case 'completed': return { text: 'Доставлено', cls: 'bg-green-50 text-green-700' };
      default: return { text: s, cls: 'bg-gray-50 text-gray-700' };
    }
  };

  return (
    <div className="space-y-5 sm:space-y-6">
      
      {/* Feedback toast */}
      {feedback && (
        <div className={`fixed top-24 right-6 z-50 px-6 py-3 rounded-xl shadow-lg font-bold text-sm animate-in slide-in-from-right ${
          feedback.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
        }`}>
          {feedback.msg}
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
           <h1 className="text-3xl font-black text-[#1e3a8a]">Управление нуждами</h1>
           <p className="text-gray-500 font-medium">
             Публикуйте то, что действительно необходимо вашим подопечным.
           </p>
        </div>
        {activeTab === 'needs' && (
          <Button 
            onClick={() => setIsModalOpen(true)}
            className="bg-[#1e3a8a] text-white hover:bg-[#2a4ec2] font-bold h-12 px-6 rounded-xl shadow-lg shadow-[#1e3a8a]/20 flex items-center gap-2"
          >
            <Plus size={20} />
            Добавить нужду
          </Button>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
            <div>
               <div className="text-3xl font-black text-gray-900">{activeCount}</div>
               <div className="text-xs font-bold text-gray-400 uppercase">Активных сборов</div>
            </div>
            <div className="w-12 h-12 bg-blue-50 text-[#1e3a8a] rounded-xl flex items-center justify-center">
               <Clock size={24} />
            </div>
         </div>
         <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
            <div>
               <div className="text-3xl font-black text-gray-900">{completedCount}</div>
               <div className="text-xs font-bold text-gray-400 uppercase">Завершено</div>
            </div>
            <div className="w-12 h-12 bg-green-50 text-green-600 rounded-xl flex items-center justify-center">
               <CheckCircle2 size={24} />
            </div>
         </div>
         <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
            <div>
               <div className="text-3xl font-black text-gray-900">{pendingBookings + pendingEvents}</div>
               <div className="text-xs font-bold text-gray-400 uppercase">Ожидают решения</div>
            </div>
            <div className="w-12 h-12 bg-yellow-50 text-yellow-600 rounded-xl flex items-center justify-center">
               <ClipboardList size={24} />
            </div>
         </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 p-1 rounded-xl w-fit">
        <button
          onClick={() => setActiveTab('needs')}
          className={`px-6 py-2.5 rounded-lg font-bold text-sm transition-all ${
            activeTab === 'needs' 
              ? 'bg-white text-[#1e3a8a] shadow-sm' 
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <Package size={16} className="inline mr-2 -mt-0.5" />
          Нужды ({needs.length})
        </button>
        <button
          onClick={() => setActiveTab('bookings')}
          className={`px-6 py-2.5 rounded-lg font-bold text-sm transition-all ${
            activeTab === 'bookings' 
              ? 'bg-white text-[#1e3a8a] shadow-sm' 
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <ClipboardList size={16} className="inline mr-2 -mt-0.5" />
          Бронирования ({bookings.length})
          {pendingBookings > 0 && (
            <span className="ml-2 inline-flex items-center justify-center w-5 h-5 text-xs font-black bg-red-500 text-white rounded-full">
              {pendingBookings}
            </span>
          )}
        </button>
        <button
          onClick={() => setActiveTab('events')}
          className={`px-6 py-2.5 rounded-lg font-bold text-sm transition-all ${
            activeTab === 'events' 
              ? 'bg-white text-[#1e3a8a] shadow-sm' 
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <Clock size={16} className="inline mr-2 -mt-0.5" />
          События ({events.length})
          {pendingEvents > 0 && (
            <span className="ml-2 inline-flex items-center justify-center w-5 h-5 text-xs font-black bg-red-500 text-white rounded-full">
              {pendingEvents}
            </span>
          )}
        </button>
      </div>

      {/* === NEEDS TAB === */}
      {activeTab === 'needs' && (
        <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
           <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                 <thead>
                    <tr className="bg-gray-50 border-b border-gray-100">
                       <th className="py-5 px-6 text-xs font-black text-gray-500 uppercase tracking-wider">Наименование</th>
                       <th className="py-5 px-6 text-xs font-black text-gray-500 uppercase tracking-wider text-center">Прогресс</th>
                       <th className="py-5 px-6 text-xs font-black text-gray-500 uppercase tracking-wider text-center">Статус</th>
                       <th className="py-5 px-6 text-xs font-black text-gray-500 uppercase tracking-wider text-right">Действия</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-gray-50">
                    {needs.length === 0 ? (
                        <tr><td colSpan={4} className="p-8 text-center text-gray-500">Список пуст</td></tr>
                    ) : needs.map((item) => {
                        const percent = Math.min(100, Math.round((item.receivedQuantity / item.requiredQuantity) * 100));
                        const bookedPercent = Math.min(100 - percent, Math.round(((item.bookedQuantity || 0) / item.requiredQuantity) * 100));
                        const isDone = item.receivedQuantity >= item.requiredQuantity;
                        const isEditing = editingId === item.id;
                        
                        return (
                           <tr key={item.id} className="hover:bg-[#f8fafc] transition-colors group">
                              {/* Название */}
                              <td className="py-5 px-6">
                                 {isEditing ? (
                                   <div className="space-y-2">
                                     <input
                                       type="text"
                                       value={editForm.name}
                                       onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                                       className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]/20"
                                     />
                                     <div className="flex gap-2">
                                       <input
                                         type="number"
                                         value={editForm.required_qty}
                                         onChange={(e) => setEditForm({...editForm, required_qty: Number(e.target.value)})}
                                         className="w-24 px-3 py-2 rounded-lg border border-gray-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]/20"
                                       />
                                       <select
                                         value={editForm.unit}
                                         onChange={(e) => setEditForm({...editForm, unit: e.target.value})}
                                         className="px-3 py-2 rounded-lg border border-gray-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]/20"
                                       >
                                         {['шт', 'кг', 'литр', 'упаковка', 'коробка'].map(u => <option key={u} value={u}>{u}</option>)}
                                       </select>
                                       <select
                                         value={editForm.urgency}
                                         onChange={(e) => setEditForm({...editForm, urgency: e.target.value})}
                                         className="px-3 py-2 rounded-lg border border-gray-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]/20"
                                       >
                                         <option value="low">Низкий</option>
                                         <option value="medium">Средний</option>
                                         <option value="high">Высокий</option>
                                       </select>
                                     </div>
                                   </div>
                                 ) : (
                                   <div className="flex items-center gap-3">
                                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${isDone ? 'bg-green-100 text-green-600' : 'bg-blue-50 text-[#1e3a8a]'}`}>
                                         {isDone ? <CheckCircle2 size={20}/> : <Package size={20}/>}
                                      </div>
                                      <div>
                                         <div className="font-bold text-gray-900">{item.name}</div>
                                         <div className="text-xs text-gray-400 font-medium">
                                            {item.requiredQuantity} {item.unit}
                                            {item.urgency === 'high' && (
                                              <span className="ml-2 inline-flex items-center gap-0.5 text-red-500"><AlertTriangle size={10}/>Срочно</span>
                                            )}
                                         </div>
                                      </div>
                                   </div>
                                 )}
                              </td>

                              {/* Прогресс */}
                              <td className="py-5 px-6 w-1/4">
                                 <div className="flex justify-between text-xs font-bold mb-1.5">
                                    <span className="text-gray-500">{item.receivedQuantity} из {item.requiredQuantity}</span>
                                    <span className="text-[#1e3a8a]">{percent}%</span>
                                 </div>
                                 <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden flex">
                                    <div className={`h-full ${isDone ? 'bg-green-500' : 'bg-[#1e3a8a]'}`} style={{ width: `${percent}%` }}></div>
                                    {bookedPercent > 0 && (
                                      <div className="h-full bg-[#ffca63]" style={{ width: `${bookedPercent}%` }}></div>
                                    )}
                                 </div>
                                 {(item.bookedQuantity || 0) > 0 && (
                                   <div className="text-xs text-gray-400 mt-1">
                                     В пути: {item.bookedQuantity} {item.unit}
                                   </div>
                                 )}
                              </td>

                              {/* Статус */}
                              <td className="py-5 px-6 text-center">
                                 {isDone ? (
                                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-50 text-green-700 text-xs font-black uppercase">
                                       <CheckCircle2 size={12} /> Закрыт
                                    </span>
                                 ) : (
                                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-black uppercase">
                                       Активен
                                    </span>
                                 )}
                              </td>

                              {/* Действия */}
                              <td className="py-5 px-6 text-right">
                                 <div className="flex items-center justify-end gap-2">
                                    {isEditing ? (
                                      <>
                                        <button onClick={saveEdit} className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors" title="Сохранить">
                                          <Check size={18} />
                                        </button>
                                        <button onClick={() => setEditingId(null)} className="p-2 text-gray-400 hover:bg-gray-100 rounded-lg transition-colors" title="Отмена">
                                          <X size={18} />
                                        </button>
                                      </>
                                    ) : (
                                      <>
                                        <button onClick={() => startEdit(item)} className="p-2 text-gray-400 hover:text-[#1e3a8a] hover:bg-blue-50 rounded-lg transition-colors" title="Редактировать">
                                           <Edit2 size={18} />
                                        </button>
                                        <button onClick={() => handleDelete(item.id)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Удалить">
                                           <Trash2 size={18} />
                                        </button>
                                      </>
                                    )}
                                 </div>
                              </td>
                           </tr>
                        );
                    })}
                 </tbody>
              </table>
           </div>
        </div>
      )}

      {/* === BOOKINGS TAB === */}
      {activeTab === 'bookings' && (
        <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
           <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                 <thead>
                    <tr className="bg-gray-50 border-b border-gray-100">
                       <th className="py-5 px-6 text-xs font-black text-gray-500 uppercase tracking-wider">ID</th>
                       <th className="py-5 px-6 text-xs font-black text-gray-500 uppercase tracking-wider">Нужда</th>
                       <th className="py-5 px-6 text-xs font-black text-gray-500 uppercase tracking-wider text-center">Количество</th>
                       <th className="py-5 px-6 text-xs font-black text-gray-500 uppercase tracking-wider">Заметка</th>
                       <th className="py-5 px-6 text-xs font-black text-gray-500 uppercase tracking-wider text-center">Статус</th>
                       <th className="py-5 px-6 text-xs font-black text-gray-500 uppercase tracking-wider text-right">Действия</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-gray-50">
                    {bookings.length === 0 ? (
                      <tr><td colSpan={6} className="p-8 text-center text-gray-500">Нет бронирований</td></tr>
                    ) : bookings.map((booking) => {
                      const needName = needs.find(n => n.id === String(booking.need_id))?.name || `Нужда #${booking.need_id}`;
                      const st = statusLabel(booking.status);
                      
                      return (
                        <tr key={booking.id} className="hover:bg-[#f8fafc] transition-colors">
                          <td className="py-5 px-6 font-bold text-gray-900">#{booking.id}</td>
                          <td className="py-5 px-6 font-medium text-gray-700">{needName}</td>
                          <td className="py-5 px-6 text-center font-bold text-gray-900">{booking.quantity}</td>
                          <td className="py-5 px-6 text-gray-500 text-sm max-w-[200px] truncate">{booking.note || '—'}</td>
                          <td className="py-5 px-6 text-center">
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-black uppercase ${st.cls}`}>
                              {st.text}
                            </span>
                          </td>
                          <td className="py-5 px-6 text-right">
                            <div className="flex items-center justify-end gap-2">
                              {booking.status === 'pending' && (
                                <>
                                  <button 
                                    onClick={() => handleApprove(booking.id)} 
                                    className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors" 
                                    title="Одобрить"
                                  >
                                    <Check size={18} />
                                  </button>
                                  <button 
                                    onClick={() => handleReject(booking.id)} 
                                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors" 
                                    title="Отклонить"
                                  >
                                    <X size={18} />
                                  </button>
                                </>
                              )}
                              {(booking.status === 'approved' || booking.status === 'pending') && (
                                <button 
                                  onClick={() => handleComplete(booking.id)} 
                                  className="p-2 text-[#1e3a8a] hover:bg-blue-50 rounded-lg transition-colors" 
                                  title="Доставлено"
                                >
                                  <PackageCheck size={18} />
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                 </tbody>
              </table>
           </div>
        </div>
      )}

      {/* === EVENTS TAB === */}
      {activeTab === 'events' && (
        <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
           <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                 <thead>
                    <tr className="bg-gray-50 border-b border-gray-100">
                       <th className="py-5 px-6 text-xs font-black text-gray-500 uppercase tracking-wider">ID</th>
                       <th className="py-5 px-6 text-xs font-black text-gray-500 uppercase tracking-wider">Событие</th>
                       <th className="py-5 px-6 text-xs font-black text-gray-500 uppercase tracking-wider">Дата</th>
                       <th className="py-5 px-6 text-xs font-black text-gray-500 uppercase tracking-wider text-center">Статус</th>
                       <th className="py-5 px-6 text-xs font-black text-gray-500 uppercase tracking-wider text-right">Действия</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-gray-50">
                    {events.length === 0 ? (
                      <tr><td colSpan={5} className="p-8 text-center text-gray-500">Нет событий для модерации</td></tr>
                    ) : events.map((ev) => {
                      const st = statusLabel(ev.status);
                      
                      return (
                        <tr key={ev.id} className="hover:bg-[#f8fafc] transition-colors">
                          <td className="py-5 px-6 font-bold text-gray-900">#{ev.id}</td>
                          <td className="py-5 px-6">
                            <div className="font-bold text-gray-900">{ev.title}</div>
                            <div className="text-xs text-gray-500 max-w-[250px] truncate">{ev.description}</div>
                            <div className="text-xs text-gray-400 mt-1">Организатор: {ev.creator_name}</div>
                          </td>
                          <td className="py-5 px-6 font-medium text-gray-700">
                            {new Date(ev.event_date).toLocaleString('ru-RU')}
                          </td>
                          <td className="py-5 px-6 text-center">
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-black uppercase ${st.cls}`}>
                              {st.text}
                            </span>
                          </td>
                          <td className="py-5 px-6 text-right">
                            <div className="flex items-center justify-end gap-2">
                              {ev.status === 'pending' && (
                                <>
                                  <button 
                                    onClick={() => handleApproveEvent(ev.id)} 
                                    className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors" 
                                    title="Одобрить"
                                  >
                                    <Check size={18} />
                                  </button>
                                  <button 
                                    onClick={() => handleRejectEvent(ev.id)} 
                                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors" 
                                    title="Отклонить"
                                  >
                                    <X size={18} />
                                  </button>
                                </>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                 </tbody>
              </table>
           </div>
        </div>
      )}

      {/* ADD NEED MODAL */}
      {institutionId && (
          <AddNeedModal 
            isOpen={isModalOpen} 
            onClose={() => setIsModalOpen(false)} 
            institutionId={institutionId}
            onSuccess={loadData}
          />
      )}

    </div>
  );
}