// Данные для слайдов
const stickers = [
  {
    emoji: "./emodji/31116-happy-hello-kitty.png",
    message:
      "Твоя энергия и настойчивость приведут тебя туда, куда другие боятся идти.",
  },

  {
    emoji: "./emodji/39860-shock-hello-kitty.png",
    message: "Каждый день начинай с улыбкой и позитивным настроением.",
  },

  {
    emoji: "./emodji/1169-angel-hello-kitty.png",
    message: "Ты способена на всё, и я верю в твои силы",
  },

  {
    emoji: "./emodji/96491-love-hello-kitty.png",
    message: "От того, что ты рядом, мир кажется лучше и уютнее.",
  },

  {
    emoji: "./emodji/97685-mad-hello-kitty.png",
    message: "Ты всегда заряжаешь энергией и поднимаешь настроение.",
  },

  {
    emoji: "./emodji/97685-mad-hello-kitty.png",
    message: "Ты всегда заряжаешь энергией и поднимаешь настроение.",
  },

  {
    emoji: "./emodji/39860-shock-hello-kitty.png",
    message: "Мне повезло общаться с таким талантливым человеком.",
  },

  {
    emoji: "./emodji/96491-love-hello-kitty.png",
    message:
      "Вижу, как много усилий ты вкладываешь в свою работу и восхищаюсь этим.",
  },

  {
    emoji: "./emodji/1169-angel-hello-kitty.png",
    message:
      "Уверенность в собственных силах и стремлениях — твоя главная сила.",
  },

  {
    emoji: "./emodji/96491-love-hello-kitty.png",
    message: "Верю, что у тебя получится добиться любых высот.",
  },
];

// Цвета для слайдов
const colors = [
  "#FF6B8B",
  "#FF85B3",
  "#FF9EC5",
  "#FFB6D9",
  "#FFCEE5",
  "#FFE5F1",
  "#FFD1E6",
  "#FFA8D1",
  "#FF92C2",
  "#FF7EB3",
  "#FF6AA4",
  "#FF5695",
];

// Элементы DOM
const intro = document.getElementById("intro");
const startBtn = document.getElementById("startBtn");
const sliderContainer = document.getElementById("sliderContainer");
const sliderTrack = document.getElementById("sliderTrack");
const spinBtn = document.getElementById("spinBtn");
const resultContainer = document.getElementById("resultContainer");
const resultEmoji = document.getElementById("resultEmoji");
const resultText = document.getElementById("resultText");
const restartBtn = document.getElementById("restartBtn");

let isSpinning = false;
let spinInterval;
let currentPosition = 0;
let spinSpeed = 0;
let targetPosition = 0;

// Создаем слайды
function createSlides() {
  sliderTrack.innerHTML = "";
  document.querySelector(".slider-wrapper").classList.add("inactive"); // Добавьте эту строку

  // Добавляем дополнительные копии слайдов для бесшовной прокрутки
  const slidesToCreate = [...stickers, ...stickers, ...stickers];

  slidesToCreate.forEach((sticker, index) => {
    const slide = document.createElement("div");
    slide.className = "slider-slide";
    slide.style.backgroundColor = colors[index % colors.length];

    const emoji = document.createElement("div");
    emoji.className = "slide-emoji";
    emoji.innerHTML = `<img src='${sticker.emoji}' />`;

    const text = document.createElement("div");
    text.className = "slide-text";
    text.textContent = sticker.message;

    slide.appendChild(emoji);
    slide.appendChild(text);
    sliderTrack.appendChild(slide);
  });
}

// Прокрутка слайдера
function spinSlider() {
  if (isSpinning) return;

  document.querySelector(".slider-wrapper").classList.remove("inactive"); // Добавьте эту строку

  isSpinning = true;
  spinBtn.disabled = true;

  // Начальная скорость
  spinSpeed = 30;

  // Случайная конечная позиция (один из оригинальных слайдов)
  targetPosition = Math.floor(Math.random() * stickers.length) * 100;
  // Добавляем несколько полных прокруток
  targetPosition += stickers.length * 100 * 3;

  // Анимация прокрутки
  spinInterval = setInterval(updateSlider, 16);
}

// Обновление позиции слайдера
function updateSlider() {
  // Уменьшаем скорость со временем
  if (currentPosition < targetPosition * 0.7) {
    spinSpeed = 30;
  } else if (currentPosition < targetPosition * 0.9) {
    spinSpeed = 15;
  } else if (currentPosition < targetPosition) {
    spinSpeed = 5;
  } else {
    // Остановка
    clearInterval(spinInterval);
    isSpinning = false;

    // Определяем выигрышный слайд
    const winningIndex = Math.floor(currentPosition / 100) % stickers.length;
    showResult(stickers[winningIndex]);
    return;
  }

  currentPosition += spinSpeed;
  sliderTrack.style.transform = `translateX(-${
    currentPosition % (stickers.length * 100)
  }%)`;
}

// Показываем результат
function showResult(sticker) {
  setTimeout(() => {
    resultEmoji.innerHTML = `<img src='${sticker.emoji}' />`;
    resultText.textContent = sticker.message;
    sliderContainer.classList.remove("visible");
    resultContainer.classList.add("visible");
    createConfetti(30);
  }, 500);
}

// Создаем конфетти
function createConfetti(count = 20) {
  for (let i = 0; i < count; i++) {
    const confetti = document.createElement("div");
    confetti.className = "confetti";
    confetti.style.left = `${Math.random() * 100}%`;
    confetti.style.top = `${Math.random() * 100}%`;
    confetti.style.backgroundColor = `hsl(${
      Math.random() * 60 + 330
    }, 100%, 75%)`;
    confetti.style.width = `${Math.random() * 10 + 5}px`;
    confetti.style.height = `${Math.random() * 10 + 5}px`;
    confetti.style.borderRadius = `${Math.random() > 0.5 ? "50%" : "0"}`;
    document.body.appendChild(confetti);

    setTimeout(() => {
      confetti.style.opacity = "1";
      confetti.style.transform = `translate(${Math.random() * 100 - 50}px, ${
        Math.random() * 100 + 100
      }px) rotate(${Math.random() * 360}deg)`;
      confetti.style.transition = `all ${Math.random() * 2 + 1}s ease-out`;
    }, 10);

    setTimeout(() => {
      confetti.remove();
    }, 3000);
  }
}

// Перезапуск
function restart() {
  resultContainer.classList.remove("visible");
  sliderContainer.classList.add("visible");
  document.querySelector(".slider-wrapper").classList.add("inactive"); // Добавьте эту строку
  spinBtn.disabled = false;
  currentPosition = 0;
  sliderTrack.style.transform = "translateX(0)";
}

// Показываем слайдер
function showSlider() {
  intro.classList.add("hidden");
  sliderContainer.classList.add("visible");
  createSlides();
}

// Инициализация
function init() {
  startBtn.addEventListener("click", showSlider);
  spinBtn.addEventListener("click", spinSlider);
  restartBtn.addEventListener("click", restart);
}

window.addEventListener("DOMContentLoaded", init);

// Список комплиментов
const compliments = ["a", "v", "d", "e", "k", "o", "q", "e"];

function getRandomPosition() {
  // Возвращает случайные координаты в пределах 80% экрана
  // (не слишком близко к краям)
  return {
    x: 10 + Math.random() * 80, // 10-90%
    y: 20 + Math.random() * 60, // 20-80%
  };
}

function createFloatingCompliments() {
  const container = document.querySelector(".floating-compliments");

  // Создаем новый комплимент каждые 1-2 секунды
  setInterval(() => {
    const compliment = document.createElement("span");
    compliment.textContent =
      compliments[Math.floor(Math.random() * compliments.length)];

    const pos = getRandomPosition();
    const animDuration = 4 + Math.random() * 4; // 4-8 секунд
    const fontSize = Math.floor(Math.random() * 50) + 51;

    compliment.style.left = `${pos.x}%`;
    compliment.style.top = `${pos.y}%`;
    compliment.style.animationDuration = `${animDuration}s`;
    compliment.style.fontSize = `${fontSize}px`;
    container.appendChild(compliment);

    // Удаляем элемент после анимации
    setTimeout(() => {
      compliment.remove();
    }, animDuration * 1000);
  }, 1000); // Случайный интервал 1-2 секунды
}

// Запускаем при загрузке
window.addEventListener("DOMContentLoaded", createFloatingCompliments);

document.addEventListener("DOMContentLoaded", function () {
  // Получаем элементы
  const secretButton = document.querySelector(".secret-button");
  const secretWindow = document.querySelector(".secret-window");
  const closeSecret = document.querySelector(".close-secret");

  // Открываем секретное окно при клике на изображение
  secretButton.addEventListener("click", function () {
    secretWindow.style.display = "flex";
    document.body.style.overflow = "hidden"; // Блокируем прокрутку страницы
  });

  // Закрываем секретное окно
  closeSecret.addEventListener("click", function () {
    secretWindow.style.display = "none";
    document.body.style.overflow = ""; // Восстанавливаем прокрутку
  });

  // Закрываем при клике вне окна
  secretWindow.addEventListener("click", function (e) {
    if (e.target === secretWindow) {
      secretWindow.style.display = "none";
      document.body.style.overflow = "";
    }
  });
});
