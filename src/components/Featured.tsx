export default function Featured() {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-[#1a2018]">
      <div className="flex-1 flex flex-col justify-center px-8 py-16 lg:px-20 lg:py-0">
        <h2 className="text-6xl lg:text-8xl font-black text-[#c8f000] mb-12 leading-none uppercase" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
          КТО Я:
        </h2>
        <div className="flex flex-col gap-6">
          {[
            'меня зовут Ольга Белохвостова.',
            'я AI креатор и эксперт по маркетплейсам',
            'создаю рекламные фото и видео для маркетплейсов, для аккаунтов в соц.сетях с помощью ИИ без фотосессии',
            'моя аудитория: владельцы малого бизнеса на WB/Ozon, различные бренды одежды и аксессуаров.',
          ].map((text, i) => (
            <div key={i} className="flex gap-4 items-start">
              <span className="text-white text-xl mt-0.5 shrink-0">—</span>
              <p className="text-white text-lg lg:text-xl leading-snug">{text}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 relative min-h-[500px] lg:min-h-screen">
        <img
          src="https://cdn.poehali.dev/projects/40144880-03b0-45bf-831f-2605356bf84f/bucket/47debcff-6d37-4cdf-807a-ff544b4f7288.jpg"
          alt="Ольга Белохвостова"
          className="w-full h-full object-cover object-top"
        />
      </div>
    </div>
  );
}
