// Серверная функция Vercel: принимает заявку с формы и отправляет её в Telegram-бота.
// Токен и chat id берутся из переменных окружения (см. .env.example) — в код их НЕ пишем.

const hits = new Map(); // простая защита от спама: не чаще 3 заявок за 10 минут с одного IP

function esc(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function tooMany(ip) {
  const now = Date.now();
  const list = (hits.get(ip) || []).filter((t) => now - t < 10 * 60 * 1000);
  if (list.length >= 3) { hits.set(ip, list); return true; }
  list.push(now);
  hits.set(ip, list);
  return false;
}

module.exports = async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, error: "method" });
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) {
    return res.status(500).json({ ok: false, error: "not_configured" });
  }

  let body = req.body;
  if (typeof body === "string") {
    try { body = JSON.parse(body); } catch (e) { body = {}; }
  }
  body = body || {};

  // Ловушка для ботов: если скрытое поле заполнено — делаем вид, что всё хорошо
  if (body.website) return res.status(200).json({ ok: true });

  const name = String(body.name || "").trim().slice(0, 80);
  const contact = String(body.contact || "").trim().slice(0, 120);
  const topic = String(body.topic || "").trim().slice(0, 80);
  const message = String(body.message || "").trim().slice(0, 1500);
  const lang = String(body.lang || "").slice(0, 5);

  if (!name || !contact || message.length < 5) {
    return res.status(400).json({ ok: false, error: "invalid" });
  }

  const ip = String(req.headers["x-forwarded-for"] || "").split(",")[0].trim() || "unknown";
  if (tooMany(ip)) return res.status(429).json({ ok: false, error: "rate" });

  const text =
    "📩 <b>Новая заявка на консультацию</b>\n\n" +
    "👤 <b>Имя:</b> " + esc(name) + "\n" +
    "📞 <b>Контакт:</b> " + esc(contact) + "\n" +
    (topic ? "🏷 <b>Тема:</b> " + esc(topic) + "\n" : "") +
    "🌐 <b>Язык сайта:</b> " + esc(lang || "-") + "\n\n" +
    "💬 " + esc(message) + "\n\n" +
    "🕒 " + new Date().toLocaleString("ru-RU", { timeZone: "Asia/Bishkek" });

  try {
    const r = await fetch("https://api.telegram.org/bot" + token + "/sendMessage", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text, parse_mode: "HTML", disable_web_page_preview: true })
    });
    const data = await r.json();
    if (!data.ok) {
      console.error("Telegram error:", data.description);
      return res.status(502).json({ ok: false, error: "telegram" });
    }
    return res.status(200).json({ ok: true });
  } catch (e) {
    console.error("Send failed:", e && e.message);
    return res.status(502).json({ ok: false, error: "network" });
  }
};
