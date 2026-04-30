// app/api/telegram/route.ts
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    // Получаем данные из формы
    const { name, contact, message } = await request.json();

    // Проверяем, что всё заполнено
    if (!name || !contact || !message) {
      return NextResponse.json({ error: 'Все поля обязательны' }, { status: 400 });
    }

    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!botToken || !chatId) {
      console.error('Не настроены переменные окружения Telegram');
      return NextResponse.json({ error: 'Ошибка конфигурации сервера' }, { status: 500 });
    }

    // Формируем красивое сообщение для Telegram
    const text = `🔥 <b>Новая заявка с сайта!</b>\n\n👤 <b>Имя:</b> ${name}\n📞 <b>Контакт:</b> ${contact}\n📝 <b>О проекте:</b>\n${message}`;

    // Отправляем запрос к Telegram API
    const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
    const response = await fetch(telegramUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: text,
        parse_mode: 'HTML', // Чтобы работали жирные шрифты <b>
      }),
    });

    if (!response.ok) {
      throw new Error('Ошибка при отправке в Telegram');
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Ошибка API Telegram:', error);
    return NextResponse.json({ error: 'Внутренняя ошибка сервера' }, { status: 500 });
  }
}