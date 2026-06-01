const lessons = [
  { num: "Вводный", title: "Вводный урок" },
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

export default function Program() {
  return (
    <section id="program" className="bg-white px-6 py-20 lg:py-32">
      <div className="max-w-4xl mx-auto">
        <h3 className="uppercase text-sm tracking-wide text-neutral-500 mb-4">Программа курса</h3>
        <h2 className="text-4xl lg:text-6xl font-bold text-neutral-900 mb-16" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
          20 уроков — от основ до результата
        </h2>
        <div className="divide-y divide-neutral-200">
          {lessons.map((lesson) => (
            <div key={lesson.num} className="flex items-center gap-6 py-5 group">
              <span className="text-xs uppercase tracking-widest text-neutral-400 w-12 shrink-0">
                {lesson.mini ? "МИ" : ""}{lesson.num}
              </span>
              <span className="text-base lg:text-lg text-neutral-900 flex-1">{lesson.title}</span>
              {lesson.mini && (
                <span className="text-xs uppercase tracking-wide text-neutral-400 border border-neutral-300 px-2 py-0.5 shrink-0">
                  Мини
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
