"""Авторизация: регистрация, вход, выход, проверка сессии"""
import json
import os
import hashlib
import secrets
import psycopg2

CORS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, X-Authorization',
    'Content-Type': 'application/json',
}

def get_conn():
    return psycopg2.connect(os.environ['DATABASE_URL'])

def hash_password(password: str) -> str:
    return hashlib.sha256(password.encode()).hexdigest()

def handler(event: dict, context) -> dict:
    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': CORS, 'body': ''}

    method = event.get('httpMethod', 'GET')
    body = json.loads(event.get('body') or '{}')
    action = (event.get('queryStringParameters') or {}).get('action', '')

    # Регистрация
    if action == 'register' and method == 'POST':
        email = body.get('email', '').strip().lower()
        password = body.get('password', '')
        name = body.get('name', '').strip()

        if not email or not password:
            return {'statusCode': 400, 'headers': CORS, 'body': json.dumps({'error': 'Email и пароль обязательны'})}

        conn = get_conn()
        cur = conn.cursor()
        cur.execute('SELECT id FROM users WHERE email = %s', (email,))
        if cur.fetchone():
            conn.close()
            return {'statusCode': 409, 'headers': CORS, 'body': json.dumps({'error': 'Пользователь уже существует'})}

        cur.execute(
            'INSERT INTO users (email, password_hash, name) VALUES (%s, %s, %s) RETURNING id',
            (email, hash_password(password), name)
        )
        user_id = cur.fetchone()[0]
        token = secrets.token_hex(32)
        cur.execute(
            'INSERT INTO sessions (user_id, token) VALUES (%s, %s)',
            (user_id, token)
        )
        conn.commit()
        conn.close()
        return {'statusCode': 200, 'headers': CORS, 'body': json.dumps({'token': token, 'name': name, 'email': email, 'has_access': False})}

    # Вход
    if action == 'login' and method == 'POST':
        email = body.get('email', '').strip().lower()
        password = body.get('password', '')

        conn = get_conn()
        cur = conn.cursor()
        cur.execute('SELECT id, name, has_access FROM users WHERE email = %s AND password_hash = %s', (email, hash_password(password)))
        row = cur.fetchone()
        if not row:
            conn.close()
            return {'statusCode': 401, 'headers': CORS, 'body': json.dumps({'error': 'Неверный email или пароль'})}

        user_id, name, has_access = row
        token = secrets.token_hex(32)
        cur.execute('INSERT INTO sessions (user_id, token) VALUES (%s, %s)', (user_id, token))
        conn.commit()
        conn.close()
        return {'statusCode': 200, 'headers': CORS, 'body': json.dumps({'token': token, 'name': name, 'email': email, 'has_access': has_access})}

    # Проверка сессии
    if action == 'me' and method == 'GET':
        auth = event.get('headers', {}).get('X-Authorization', '')
        token = auth.replace('Bearer ', '').strip()
        if not token:
            return {'statusCode': 401, 'headers': CORS, 'body': json.dumps({'error': 'Не авторизован'})}

        conn = get_conn()
        cur = conn.cursor()
        cur.execute('''
            SELECT u.id, u.email, u.name, u.has_access
            FROM sessions s JOIN users u ON s.user_id = u.id
            WHERE s.token = %s AND s.expires_at > NOW()
        ''', (token,))
        row = cur.fetchone()
        conn.close()
        if not row:
            return {'statusCode': 401, 'headers': CORS, 'body': json.dumps({'error': 'Сессия истекла'})}

        user_id, email, name, has_access = row
        return {'statusCode': 200, 'headers': CORS, 'body': json.dumps({'id': user_id, 'email': email, 'name': name, 'has_access': has_access})}

    return {'statusCode': 404, 'headers': CORS, 'body': json.dumps({'error': 'Not found'})}