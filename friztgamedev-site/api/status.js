// Служебная страница: показывает, к какому боту подключён сайт.
// Откройте https://ВАШ-САЙТ.vercel.app/api/status — должно показать имя бота.
// Токен наружу НЕ выводится.

module.exports = async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  const out = { token_set: Boolean(token), chat_id_set: Boolean(chatId) };
  if (!token) {
    out.hint = "Добавьте TELEGRAM_BOT_TOKEN в Vercel → Settings → Environment Variables и сделайте Redeploy";
    return res.status(200).json(out);
  }
  try {
    const r = await fetch("https://api.telegram.org/bot" + token + "/getMe");
    const d = await r.json();
    if (d.ok) {
      out.bot_ok = true;
      out.bot_name = d.result.first_name;
      out.bot_username = "@" + d.result.username;
    } else {
      out.bot_ok = false;
      out.error = d.description;
    }
  } catch (e) {
    out.bot_ok = false;
    out.error = "network";
  }
  return res.status(200).json(out);
};
