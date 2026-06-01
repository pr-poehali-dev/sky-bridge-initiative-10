import { useEffect, useState } from 'react';
import { getMe } from '@/lib/api';
import Icon from '@/components/ui/icon';

const lessons = [
  { num: "00", title: "Вводный урок" },
  { num: "01", title: "Регистрация и оплата подписки в Syntx.ai" },
  { num: "02", title: "Как выбрать нейросеть под задачу бренда" },
  { num: "03", title: "Что такое Syntx.ai и почему он один из главных инструментов" },
  { num: "04", title: "Midjourney: функционал и основы работы" },
  { num: "05", title: "Nano Banana: функционал и основы работы" },
  { num: "06", title: "Nano Banana: создание инфографики" },
  { num: "07", title: "Seedream: для чего нужен, как улучшает реализм" },
  { num: "08", title: "Nano Banana — база графических нейросетей" },
  { num: "09", title: "Работа с Kling AI через Syntx.ai" },
  { num: "10", title: "SUNO: создаём авторский саундтрек для видео за 30 секунд" },
  { num: "11", title: "Базовый монтаж в CapCut" },
  { num: "12", title: "Создаём голос ребёнка для гендер-пати" },
  { num: "13", title: "Реставрация старых фото и оживление их" },
  { num: "14", title: "Создание песни в Suno" },
  { num: "15", title: "Как сделать видео из фото", mini: true },
  { num: "16", title: "Как создать свой мини-сериал", mini: true },
  { num: "17", title: "Как перенести движения с видео на фото / повторить танец", mini: true },
  { num: "18", title: "Создать рекламный ролик в пару кликов", mini: true },
  { num: "19", title: "Интересные ракурсы для видео", mini: true },
  { num: "20", title: "Создание мультика в стиле Pixar", mini: true },
];

interface User {
  name: string;
  email: string;
  has_access: boolean;
}

interface Lesson {
  num: string;
  title: string;
  mini?: boolean;
}

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) { window.location.href = '/login'; return; }
    getMe(token).then(data => {
      if (data.error) { window.location.href = '/login'; return; }
      if (!data.has_access) { window.location.href = '/'; return; }
      setUser(data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center">
        <p className="text-neutral-400 text-sm uppercase tracking-widest">Загрузка...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <header className="border-b border-neutral-800 px-6 py-4 flex justify-between items-center">
        <span className="text-xl tracking-tight" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>НЕЙРОБОГ</span>
        <div className="flex items-center gap-6">
          <span className="text-neutral-400 text-sm">{user?.name}</span>
          <button
            onClick={() => { localStorage.removeItem('token'); window.location.href = '/'; }}
            className="text-neutral-500 hover:text-white text-sm transition-colors cursor-pointer"
          >
            Выйти
          </button>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <h2 className="text-3xl mb-2" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>Программа курса</h2>
        <p className="text-neutral-400 text-sm mb-10">Нажми на урок, чтобы открыть видео и материалы</p>

        <div className="divide-y divide-neutral-800">
          {lessons.map((lesson) => (
            <button
              key={lesson.num}
              onClick={() => setActiveLesson(lesson)}
              className="w-full flex items-center gap-6 py-5 text-left hover:bg-neutral-900 transition-colors px-2 -mx-2 cursor-pointer group"
            >
              <span className="text-xs text-neutral-500 w-8 shrink-0">{lesson.num}</span>
              <span className="flex-1 text-sm sm:text-base text-neutral-200 group-hover:text-white transition-colors">{lesson.title}</span>
              {lesson.mini && (
                <span className="text-xs text-neutral-500 border border-neutral-700 px-2 py-0.5 shrink-0">Мини</span>
              )}
              <Icon name="Play" size={16} className="text-neutral-600 group-hover:text-white transition-colors shrink-0" />
            </button>
          ))}
        </div>
      </div>

      {activeLesson && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={() => setActiveLesson(null)}>
          <div className="bg-neutral-900 w-full max-w-3xl max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center px-6 py-4 border-b border-neutral-800">
              <div>
                <span className="text-xs text-neutral-500 uppercase tracking-wide">Урок {activeLesson.num}</span>
                <h3 className="text-white text-lg mt-0.5">{activeLesson.title}</h3>
              </div>
              <button onClick={() => setActiveLesson(null)} className="text-neutral-400 hover:text-white cursor-pointer">
                <Icon name="X" size={20} />
              </button>
            </div>

            <div className="p-6">
              <div className="bg-neutral-800 aspect-video flex items-center justify-center mb-6">
                <div className="text-center">
                  <Icon name="Video" size={40} className="text-neutral-600 mx-auto mb-3" />
                  <p className="text-neutral-500 text-sm">Видео будет добавлено</p>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="text-sm uppercase tracking-wide text-neutral-400 mb-3">План урока</h4>
                <p className="text-neutral-300 text-sm leading-relaxed">Описание урока будет добавлено</p>
              </div>

              <div>
                <h4 className="text-sm uppercase tracking-wide text-neutral-400 mb-3">Материалы</h4>
                <div className="flex items-center gap-3 text-neutral-500 text-sm">
                  <Icon name="FileText" size={16} />
                  <span>PDF будет добавлен</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
