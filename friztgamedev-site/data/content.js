// Контент сайта: проекты, команда, галерея.
window.CONTENT = {
  projects: [
    {
      id: "finish-the-word",
      title: { ru: "Finish the Word", ky: "Finish the Word", en: "Finish the Word" },
      desc: {
        ru: "Словесная игра: нужно закончить слово. Играется прямо в браузере.",
        ky: "Сөз оюну: сөздү аягына чыгаруу керек. Түз браузерде ойнолот.",
        en: "A word game: finish the word. Plays right in the browser."
      },
      tags: ["HTML", "CSS", "JavaScript"],
      image: "images/project-1.svg",
      play: "https://muzara.github.io/finish_the_word2/",
      repo: "https://github.com/MuzarA/finish_the_word2" // TODO: проверьте, что ссылка рабочая
    },
    {
      id: "meme-generator",
      title: { ru: "Генератор мемов", ky: "Мем генератору", en: "Meme Generator" },
      desc: {
        ru: "Создавайте мемы за секунды: выберите картинку, добавьте текст и сохраните.",
        ky: "Мемдерди секундада жасаңыз: сүрөт тандап, текст кошуп, сактаңыз.",
        en: "Make memes in seconds: pick an image, add text and save."
      },
      tags: ["JavaScript", "Web app"],
      image: "images/project-2.svg",
      play: "https://meme-generator-mocha-sigma.vercel.app/",
      repo: "" // TODO: вставьте ссылку на репозиторий на GitHub
    },
    {
      id: "battleship",
      title: { ru: "Морской бой (редизайн)", ky: "Деңиз салгылашы (редизайн)", en: "Battleship Redesign" },
      desc: {
        ru: "Классический морской бой с современным дизайном.",
        ky: "Заманбап дизайндагы классикалык деңиз салгылашы.",
        en: "Classic Battleship with a modern redesign."
      },
      tags: ["JavaScript", "CSS"],
      image: "images/project-3.svg",
      play: "https://battleship-redesign-syu6-git-main-comfci.vercel.app/",
      repo: "" // TODO: вставьте ссылку на репозиторий на GitHub
    }
  ],
  team: [
    { name: "Камчыбеков Анас", role: { ru: "Генеральный директор, разработчик", ky: "Башкы директор, иштеп чыгуучу", en: "CEO, developer" }, rating: 4.9, photo: "images/team-1.svg" },
    { name: "Oliver Whitmore", role: { ru: "Геймдизайнер", ky: "Геймдизайнер", en: "Game designer" }, rating: 4.8, photo: "images/team-2.svg" },
    { name: "Camille Laurent", role: { ru: "3D / UI дизайнер", ky: "3D / UI дизайнер", en: "3D / UI designer" }, rating: 4.7, photo: "images/team-3.svg" }
  ],
  gallery: [
    { src: "images/gallery-1.jpg", alt: { ru: "Разработка на Unity", ky: "Unity'де иштеп чыгуу", en: "Development in Unity" } },
    { src: "images/gallery-2.jpg", alt: { ru: "Рабочее пространство студии", ky: "Студиянын иш мейкиндиги", en: "Studio workspace" } },
    { src: "images/gallery-3.jpg", alt: { ru: "3D-моделирование персонажа", ky: "Каарманды 3D моделдөө", en: "3D character modeling" } },
    { src: "images/gallery-4.jpg", alt: { ru: "Работа над графикой и дизайном", ky: "Графика жана дизайн боюнча иш", en: "Graphics and design work" } }
  ]
};
