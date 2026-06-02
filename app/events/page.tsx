"use client";

// SPDX-License-Identifier: GPL-3.0-or-later
// Copyright (C) 2026 Siyovush Hamidov and The Hadaf Contributors

import { useState, useEffect } from "react";
import {
  Calendar,
  MapPin,
  Users,
  Plus,
  Loader2,
  Check,
  X,
  UserPlus,
  Clock,
  Sparkles,
  ArrowRight,
  ChevronRight,
  Search,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import MainLayout from "@/components/layout/MainLayout";
import Link from "next/link";
import {
  fetchEvents,
  createEvent,
  joinEvent,
  leaveEvent,
  EventItem,
  fetchInstitutions,
  getProfile,
} from "@/lib/api";
import { Institution } from "@/types/project";

export default function EventsPage() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [institutions, setInstitutions] = useState<Institution[]>([]);
  const [showCreate, setShowCreate] = useState(false);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<{
    type: "success" | "error";
    msg: string;
  } | null>(null);

  const [form, setForm] = useState({
    title: "",
    description: "",
    event_date: "",
    institution_id: 0,
  });
  const [creating, setCreating] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [formSuccess, setFormSuccess] = useState<string | null>(null);
  const [isAuth, setIsAuth] = useState(false);

  const getMinDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(8, 0, 0, 0);

    return tomorrow.toISOString().slice(0, 16);
  };

  const showMsg = (type: "success" | "error", msg: string) => {
    setFeedback({ type, msg });
    setTimeout(() => setFeedback(null), 3000);
  };

  const loadEvents = async () => {
    try {
      const data = await fetchEvents();
      setEvents(data);
    } catch (e) {
      console.error("Error loading events:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEvents();
    fetchInstitutions().then(setInstitutions).catch(console.error);

    getProfile()
      .then(() => setIsAuth(true))
      .catch(() => setIsAuth(false));
  }, []);

  const handleJoin = async (eventId: number) => {
    try {
      await joinEvent(eventId);
      showMsg("success", "Вы записались на событие!");
      loadEvents();
    } catch (e) {
      console.error(e);
      showMsg("error", "Ошибка записи");
    }
  };

  const handleLeave = async (eventId: number) => {
    try {
      await leaveEvent(eventId);
      showMsg("success", "Запись отменена");
      loadEvents();
    } catch (e) {
      console.error(e);
      showMsg("error", "Ошибка отмены");
    }
  };

  const handleCreate = async () => {
    setFormError(null);
    if (!form.title || !form.event_date || !form.institution_id) {
      setFormError("Пожалуйста, заполните все обязательные поля");
      return;
    }
    setCreating(true);
    try {
      await createEvent({
        title: form.title,
        description: form.description,
        event_date: new Date(form.event_date).toISOString(),
        institution_id: form.institution_id,
      });
      setFormSuccess(
        "Ваше событие успешно отправлено на модерацию. После одобрения сотрудником учреждения оно появится в ленте событий.",
      );
      loadEvents();
    } catch (e) {
      console.error(e);
      setFormError("Ошибка создания события. Попробуйте еще раз.");
    } finally {
      setCreating(false);
    }
  };

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString("ru-RU", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const isPast = (dateStr: string) => new Date(dateStr) < new Date();

  const upcomingEvents = events?.filter((e) => !isPast(e.event_date));
  const pastEvents = events?.filter((e) => isPast(e.event_date));

  return (
    <MainLayout>
      <div className="min-h-screen bg-[#f8fafc] font-sans">
        {/* toast */}
        {feedback && (
          <div
            className={`fixed top-24 right-6 z-50 px-6 py-3 rounded-xl shadow-lg font-bold text-sm ${
              feedback.type === "success"
                ? "bg-green-500 text-white"
                : "bg-red-500 text-white"
            }`}
          >
            {feedback.msg}
          </div>
        )}

        {/* HERO HEADER */}
        <div className="bg-[#1e3a8a] pt-24 pb-16 rounded-b-[3rem]">
          <div className="container mx-auto max-w-[1440px] px-6 md:px-12 xl:px-28">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md text-white rounded-full text-xs font-bold uppercase tracking-wider border border-white/10 mb-4">
                  <Sparkles size={14} className="text-[#ffca63]" />
                  Волонтёрские события
                </div>
                <h1 className="text-3xl md:text-5xl font-black text-white mb-3">
                  События и мероприятия
                </h1>
                <p className="text-white/80 text-lg max-w-xl">
                  Мастер-классы, субботники, визиты — присоединяйтесь к событиям
                  или создайте своё!
                </p>
              </div>

              <div className="flex flex-col items-center sm:items-end">
                <Button
                  onClick={() => setShowCreate(true)}
                  disabled={!isAuth}
                  className="bg-[#ffca63] text-[#1e3a8a] hover:bg-white font-bold h-12 px-6 rounded-xl shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
                >
                  <Plus size={20} />
                  Создать событие
                </Button>
                {!isAuth && (
                  <div className="mt-3 text-center sm:text-right flex flex-col items-center sm:items-end">
                    <Link href="/login">
                      <span className="text-white text-sm font-bold underline decoration-white/50 hover:decoration-white transition-all">
                        (Нужна авторизация)
                      </span>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* CONTENT */}
        <section className="py-12 -mt-8 relative z-10">
          <div className="container mx-auto max-w-[1440px] px-6 md:px-12 xl:px-28">
            {loading ? (
              <div className="flex justify-center py-20">
                <Loader2 size={40} className="animate-spin text-[#1e3a8a]" />
              </div>
            ) : events.length === 0 ? (
              <div className="text-center py-20">
                <Calendar size={64} className="mx-auto text-gray-300 mb-4" />
                <h3 className="text-xl font-bold text-gray-500 mb-2">
                  Пока нет событий
                </h3>
                <p className="text-gray-400">
                  Станьте первым — создайте мероприятие!
                </p>
              </div>
            ) : (
              <div className="space-y-12">
                {/* Upcoming */}
                {upcomingEvents.length > 0 && (
                  <div>
                    <h2 className="text-2xl font-black text-gray-900 mb-6 flex items-center gap-2">
                      <Calendar size={24} className="text-[#1e3a8a]" />
                      Предстоящие события ({upcomingEvents.length})
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {upcomingEvents.map((event) => (
                        <EventCard
                          key={event.id}
                          event={event}
                          expanded={expandedId === event.id}
                          onToggle={() =>
                            setExpandedId(
                              expandedId === event.id ? null : event.id,
                            )
                          }
                          onJoin={handleJoin}
                          onLeave={handleLeave}
                          formatDate={formatDate}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Past */}
                {pastEvents.length > 0 && (
                  <div>
                    <h2 className="text-2xl font-black text-gray-400 mb-6 flex items-center gap-2">
                      <Clock size={24} />
                      Прошедшие ({pastEvents.length})
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {pastEvents.map((event) => (
                        <EventCard
                          key={event.id}
                          event={event}
                          past
                          expanded={expandedId === event.id}
                          onToggle={() =>
                            setExpandedId(
                              expandedId === event.id ? null : event.id,
                            )
                          }
                          onJoin={handleJoin}
                          onLeave={handleLeave}
                          formatDate={formatDate}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>

        {/* CREATE MODAL */}
        {showCreate && (
          <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-8 space-y-6">
              <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                <h3 className="text-xl font-black text-gray-900">
                  Новое событие
                </h3>
                <button
                  onClick={() => {
                    setShowCreate(false);
                    setFormError(null);
                    setFormSuccess(null);
                  }}
                  className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
                >
                  <X size={20} />
                </button>
              </div>

              {formError && (
                <div className="bg-red-50 text-red-600 px-4 py-3 rounded-xl text-sm font-bold flex items-center gap-2">
                  <AlertTriangle size={18} />
                  {formError}
                </div>
              )}

              {formSuccess && (
                <div className="bg-green-50 text-green-700 px-4 py-4 rounded-xl text-sm font-bold flex items-start gap-3">
                  <CheckCircle2 size={24} className="mt-0.5 flex-shrink-0" />
                  <div className="flex-1">{formSuccess}</div>
                </div>
              )}
              {formSuccess && (
                <button
                  onClick={() => {
                    setShowCreate(false);
                    setForm({
                      title: "",
                      description: "",
                      event_date: "",
                      institution_id: 0,
                    });
                    setFormSuccess(null);
                  }}
                  className="w-full h-12 bg-[#1e3a8a] text-white font-bold rounded-xl hover:bg-[#2a4ec2] transition-colors"
                >
                  Закрыть
                </button>
              )}

              {!formSuccess && (
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-bold text-gray-500 ml-1 uppercase">
                      Название *
                    </label>
                    <input
                      type="text"
                      value={form.title}
                      onChange={(e) =>
                        setForm({ ...form, title: e.target.value })
                      }
                      placeholder="Мастер-класс по рисованию"
                      className="w-full h-12 px-4 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]/20 focus:border-[#1e3a8a] transition-all font-medium text-gray-900"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-gray-500 ml-1 uppercase">
                      Описание
                    </label>
                    <textarea
                      value={form.description}
                      onChange={(e) =>
                        setForm({ ...form, description: e.target.value })
                      }
                      placeholder="Расскажите подробнее о событии..."
                      rows={3}
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]/20 focus:border-[#1e3a8a] transition-all font-medium text-gray-900 resize-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-gray-500 ml-1 uppercase">
                      Дата и время *
                    </label>
                    <input
                      type="datetime-local"
                      value={form.event_date}
                      min={getMinDate()}
                      onChange={(e) =>
                        setForm({ ...form, event_date: e.target.value })
                      }
                      className="w-full h-12 px-4 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]/20 focus:border-[#1e3a8a] transition-all font-medium text-gray-900"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-gray-500 ml-1 uppercase">
                      Учреждение *
                    </label>
                    <select
                      value={form.institution_id}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          institution_id: Number(e.target.value),
                        })
                      }
                      className="w-full h-12 px-4 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]/20 focus:border-[#1e3a8a] transition-all font-medium text-gray-900"
                    >
                      <option value={0}>Выберите учреждение</option>
                      {institutions.map((inst) => (
                        <option key={inst.id} value={Number(inst.id)}>
                          {inst.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              {!formSuccess && (
                <div className="flex gap-3 pt-2 border-t border-gray-100">
                  <Button
                    onClick={() => {
                      setShowCreate(false);
                      setFormError(null);
                    }}
                    className="flex-1 bg-gray-100 text-gray-700 hover:bg-gray-200 font-bold h-12 rounded-xl"
                  >
                    Отмена
                  </Button>
                  <Button
                    onClick={handleCreate}
                    disabled={creating}
                    className="flex-1 bg-[#1e3a8a] text-white hover:bg-[#2a4ec2] font-bold h-12 rounded-xl disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {creating ? (
                      <Loader2 size={18} className="animate-spin" />
                    ) : (
                      <Plus size={18} />
                    )}
                    Предложить
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
}

/* ---------- EVENT CARD ---------- */
interface EventCardProps {
  event: EventItem;
  past?: boolean;
  expanded: boolean;
  onToggle: () => void;
  onJoin: (id: number) => void;
  onLeave: (id: number) => void;
  formatDate: (d: string) => string;
}

function EventCard({
  event,
  past,
  expanded,
  onToggle,
  onJoin,
  onLeave,
  formatDate,
}: EventCardProps) {
  return (
    <div
      className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden hover:shadow-lg ${
        past
          ? "border-gray-100 opacity-70"
          : "border-gray-100 hover:border-[#1e3a8a]/20"
      }`}
    >
      {/* Top color strip */}
      <div
        className={`h-1.5 ${past ? "bg-gray-200" : "bg-gradient-to-r from-[#1e3a8a] to-[#3b82f6]"}`}
      ></div>

      <div className="p-6 space-y-4">
        {/* Date badge */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm">
            <Calendar size={14} className="text-[#1e3a8a]" />
            <span className="font-bold text-gray-700">
              {formatDate(event.event_date)}
            </span>
          </div>
          {event.is_joined && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-green-50 text-green-700 text-xs font-black uppercase">
              <Check size={12} /> Вы идёте
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-lg font-black text-gray-900 leading-tight">
          {event.title}
        </h3>

        {/* Institution */}
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <MapPin size={14} />
          <span className="font-medium">{event.institution_name}</span>
        </div>

        {/* Creator + Participants */}
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500">
            <span className="font-medium">Организатор: </span>
            <span className="font-bold text-gray-700">
              {event.creator_name}
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-sm font-bold text-[#1e3a8a]">
            <Users size={16} />
            {event.participants_count}
          </div>
        </div>

        {/* Expand/Collapse */}
        {event.description && (
          <button
            onClick={onToggle}
            className="text-sm font-bold text-[#1e3a8a] hover:underline flex items-center gap-1"
          >
            {expanded ? "Скрыть" : "Подробнее"}
            <ArrowRight
              size={14}
              className={`transition-transform ${expanded ? "rotate-90" : ""}`}
            />
          </button>
        )}

        {expanded && event.description && (
          <div className="pt-2 border-t border-gray-100 text-sm text-gray-600 leading-relaxed">
            {event.description}
          </div>
        )}

        {/* Action */}
        {!past && (
          <div className="pt-2">
            {event.is_joined ? (
              <button
                onClick={() => onLeave(event.id)}
                className="w-full h-11 rounded-xl font-bold text-sm border-2 border-red-200 text-red-500 hover:bg-red-50 transition-colors flex items-center justify-center gap-2"
              >
                <X size={16} />
                Отменить запись
              </button>
            ) : (
              <button
                onClick={() => onJoin(event.id)}
                className="w-full h-11 rounded-xl font-bold text-sm bg-[#1e3a8a] text-white hover:bg-[#2a4ec2] transition-colors flex items-center justify-center gap-2 shadow-md shadow-[#1e3a8a]/20"
              >
                <UserPlus size={16} />Я иду!
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
