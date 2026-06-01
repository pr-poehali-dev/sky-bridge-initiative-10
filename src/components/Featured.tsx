import Icon from '@/components/ui/icon';

export default function Featured() {
  return (
    <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center min-h-screen px-6 py-12 lg:py-0 bg-white">
      <div className="flex-1 h-[400px] lg:h-[800px] mb-8 lg:mb-0 lg:order-2">
        <img
          src="/images/ai-collaboration.png"
          alt="AI обучение"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-1 text-left lg:h-[800px] flex flex-col justify-center lg:mr-12 lg:order-1">
        <h3 className="uppercase mb-4 text-sm tracking-wide text-neutral-600">О курсе</h3>
        <p className="text-2xl lg:text-4xl mb-8 text-neutral-900 leading-tight">
          Обучение проходит в самостоятельном формате. Учись в удобном темпе, возвращайся к урокам в любое время — и не переплачивай.
        </p>
        <div className="flex items-center gap-3 mb-8">
          <Icon name="Infinity" size={22} className="text-neutral-900 shrink-0" />
          <span className="text-sm uppercase tracking-wide text-neutral-600">Доступ навсегда</span>
        </div>
        <button className="bg-black text-white border border-black px-4 py-2 text-sm transition-all duration-300 hover:bg-white hover:text-black cursor-pointer w-fit uppercase tracking-wide">
          Начать обучение
        </button>
      </div>
    </div>
  );
}