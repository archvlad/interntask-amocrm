# Тестовое задание веб-разработчика (Node.JS) - back-end сервис по работе с API AmoCRM

## Запуск

В `.env` файл нужно положить данные необходимые для работы через API

```
docker build -t interntask-amocrm .
docker run interntask-amocrm -p:3000:3000
```

## API

### GET /

Query:
- name
- email
- phone

Возвращает объект новой сделки привязанной к клиенту в параметрах
