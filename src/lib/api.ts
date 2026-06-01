const AUTH_URL = 'https://functions.poehali.dev/44b13651-ee11-4fef-9562-b429f647310c';

export async function register(email: string, password: string, name: string) {
  const res = await fetch(`${AUTH_URL}/?action=register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, name }),
  });
  return res.json();
}

export async function login(email: string, password: string) {
  const res = await fetch(`${AUTH_URL}/?action=login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  return res.json();
}

export async function getMe(token: string) {
  const res = await fetch(`${AUTH_URL}/?action=me`, {
    headers: { 'Authorization': `Bearer ${token}` },
  });
  return res.json();
}
