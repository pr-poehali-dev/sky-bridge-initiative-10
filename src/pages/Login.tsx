import { useState } from 'react';
import { login, register } from '@/lib/api';

interface LoginProps {
  onSuccess: (token: string, user: { name: string; email: string; has_access: boolean }) => void;
}

export default function Login({ onSuccess }: LoginProps) {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const data = mode === 'login'
      ? await login(email, password)
      : await register(email, password, name);
    setLoading(false);

    if (data.error) {
      setError(data.error);
    } else {
      localStorage.setItem('token', data.token);
      onSuccess(data.token, { name: data.name, email: data.email, has_access: data.has_access });
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <h1 className="text-white text-4xl mb-2 tracking-tight" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
          НЕЙРОБОГ
        </h1>
        <p className="text-neutral-400 text-sm mb-8 uppercase tracking-wide">
          {mode === 'login' ? 'Вход в курс' : 'Регистрация'}
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {mode === 'register' && (
            <input
              type="text"
              placeholder="Ваше имя"
              value={name}
              onChange={e => setName(e.target.value)}
              className="bg-neutral-900 text-white border border-neutral-700 px-4 py-3 text-sm outline-none focus:border-white transition-colors"
            />
          )}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            className="bg-neutral-900 text-white border border-neutral-700 px-4 py-3 text-sm outline-none focus:border-white transition-colors"
          />
          <input
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            className="bg-neutral-900 text-white border border-neutral-700 px-4 py-3 text-sm outline-none focus:border-white transition-colors"
          />

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="bg-white text-black px-4 py-3 text-sm uppercase tracking-widest font-semibold hover:bg-neutral-200 transition-colors disabled:opacity-50 cursor-pointer"
          >
            {loading ? 'Загрузка...' : mode === 'login' ? 'Войти' : 'Зарегистрироваться'}
          </button>
        </form>

        <p className="text-neutral-500 text-sm mt-6 text-center">
          {mode === 'login' ? 'Нет аккаунта?' : 'Уже есть аккаунт?'}
          {' '}
          <button
            onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); setError(''); }}
            className="text-white hover:underline cursor-pointer"
          >
            {mode === 'login' ? 'Зарегистрироваться' : 'Войти'}
          </button>
        </p>
      </div>
    </div>
  );
}
