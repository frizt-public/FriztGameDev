// Главные настройки сайта. Меняйте данные здесь — остальной код трогать не нужно.
window.SITE_CONFIG = {
  company: {
    name: "FriztGameDev",
    founded: 2025,
    city: { ru: "Бишкек, Кыргызстан", ky: "Бишкек, Кыргызстан", en: "Bishkek, Kyrgyzstan" },
    email: "hello@friztgamedev.example",       // TODO: впишите реальную почту
    telegram: "https://t.me/your_channel", // TODO: ссылка на ваш Telegram
    github: "https://github.com/frizt-public",  // ссылка на GitHub студии
    ceo: {
      name: "Камчыбеков Анас",
      photo: "images/team-1.svg", // TODO: положите своё фото, например images/anas.jpg
      role: { ru: "Основатель и генеральный директор", ky: "Негиздөөчү жана башкы директор", en: "Founder & CEO" },
      education: { ru: "Университет AIU", ky: "AIU университети", en: "AIU University" },
      bio: {
        ru: "Основатель и генеральный директор FriztGameDev. Отвечает за стратегию студии, разработку игр и запуск проектов. Увлечён геймдизайном и создаёт браузерные игры, которыми легко делиться.",
        ky: "FriztGameDev студиясынын негиздөөчүсү жана башкы директору. Студиянын стратегиясына, оюндарды иштеп чыгууга жана долбоорлорду ишке киргизүүгө жооптуу. Геймдизайнга кызыгат жана бөлүшүүгө жеңил браузер оюндарын жасайт.",
        en: "Founder and CEO of FriztGameDev. Responsible for studio strategy, game development and project launches. Passionate about game design and builds browser games that are easy to share."
      }
    }
  },
  // Куда отправлять форму. На Vercel это серверная функция api/send.js
  formEndpoint: "/api/send",
  defaultLang: "ru"
};
