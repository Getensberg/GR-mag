// Инициализация скидки и корзины при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
const track = document.querySelector('.carousel-track');
        const slides = Array.from(document.querySelectorAll('.carousel-slide'));
        const nextBtn = document.querySelector('.next-btn');
        const prevBtn = document.querySelector('.prev-btn');
        
        let currentIndex = 0;

        // Функция для определения количества видимых слайдов
        function getVisibleSlides() {
            const screenWidth = window.innerWidth;
            if (screenWidth <= 480) {
                return 1; // 1 фото на маленьких экранах
            } else if (screenWidth <= 768) {
                return 2; // 2 фото на планшетах
            } else {
                return 3; // 3 фото на десктопе
            }
        }

        // Функция для получения ширины слайда
        function getSlideWidth() {
            return slides[0].getBoundingClientRect().width + 20; // + margin
        }

        // Функция перемещения карусели
        function moveToSlide(index) {
            const slideWidth = getSlideWidth();
            track.style.transform = `translateX(-${slideWidth * index}px)`;
            currentIndex = index;
        }

        // Функция для получения максимального индекса
        function getMaxIndex() {
            const visibleSlides = getVisibleSlides();
            return Math.max(0, slides.length - visibleSlides);
        }

        // Кнопка "Вправо"
        nextBtn.addEventListener('click', function() {
            const maxIndex = getMaxIndex();
            if (currentIndex < maxIndex) {
                moveToSlide(currentIndex + 1);
            } else {
                moveToSlide(0); // Возврат к началу
            }
        });

        // Кнопка "Влево"
        prevBtn.addEventListener('click', function() {
            if (currentIndex > 0) {
                moveToSlide(currentIndex - 1);
            } else {
                const maxIndex = getMaxIndex();
                moveToSlide(maxIndex); // Переход к концу
            }
        });

        // Адаптация при изменении размера окна
        window.addEventListener('resize', function() {
            // Проверяем, не вышли ли мы за границы после изменения размера
            const maxIndex = getMaxIndex();
            if (currentIndex > maxIndex) {
                currentIndex = maxIndex;
            }
            moveToSlide(currentIndex);
        });

        // Инициализация
        moveToSlide(0);

// видео --------------------------------------------------------------------------------------
 // Элементы карусели
    const slider = document.querySelector('.video-showcase-slider');
    const cards = document.querySelectorAll('.video-showcase-card');
    const prevBtnV = document.querySelector('.video-slider-prev');
    const nextBtnV = document.querySelector('.video-slider-next');
    
    // Элементы модального окна
    const modal = document.getElementById('videoModal');
    const modalVideo = document.querySelector('.modal-video-player');
    const closeBtn = document.querySelector('.close-modal');
    const modalPrev = document.querySelector('.modal-prev');
    const modalNext = document.querySelector('.modal-next');
    
    // Данные видео
    const videoSources = Array.from(cards).map(card => {
        return card.querySelector('source').src;
    });
    
    let currentSlide = 0;
    let currentVideoIndex = 0;
    
    // Логика карусели
    function updateSlider() {
        const cardWidth = cards[0].offsetWidth + 20;
        slider.style.transform = `translateX(-${currentSlide * cardWidth}px)`;
    }
    
    nextBtnV.addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % (cards.length - 3);
        updateSlider();
    });
    
    prevBtnV.addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + (cards.length - 3)) % (cards.length - 3);
        updateSlider();
    });
    
    // Логика модального окна
    function openModal(index) {
        currentVideoIndex = index;
        modalVideo.src = videoSources[index];
        modal.style.display = 'flex';
        modalVideo.play().catch(e => console.log('Autoplay prevented:', e));
    }
    
    function closeModal() {
        modal.style.display = 'none';
        modalVideo.pause();
    }
    
    function navigateModal(direction) {
        currentVideoIndex = (currentVideoIndex + direction + videoSources.length) % videoSources.length;
        modalVideo.src = videoSources[currentVideoIndex];
        modalVideo.play();
    }
    
    // Обработчики событий
    cards.forEach((card, index) => {
        const playBtn = card.querySelector('.video-play-btn');
        
        playBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            openModal(index);
        });
        
        card.addEventListener('click', () => {
            openModal(index);
        });
    });
    
    closeBtn.addEventListener('click', closeModal);
  
    
    // Закрытие по ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'flex') {
            closeModal();
        }
    });
    
    // Адаптация при изменении размера
    window.addEventListener('resize', updateSlider);
        });
            

document.querySelectorAll('.prod-btn').forEach(btn => {
  btn.addEventListener('click', (event) => {
    event.preventDefault();
    showTransHideApp();
  });
});

// Для одного элемента (первого с таким классом)
document.querySelector('#transBack').addEventListener('click', (event) => {
  event.preventDefault();
  showAppHideTrans()
});

// Функция для показа блока trans и скрытия app
function showTransHideApp() {
    document.getElementById('app').style.display = 'none';
    document.getElementById('trans').style.display = 'block';
}

// Функция для показа блока app и скрытия trans
function showAppHideTrans() {
    document.getElementById('app').style.display = 'block';
    document.getElementById('trans').style.display = 'none';
}





document.getElementById('feedbackForm').addEventListener('submit', (event) => {
  event.preventDefault(); // Предотвращаем стандартное поведение формы

  // Скрываем форму
  document.getElementById('contactFormBlock').style.display = 'none';

  // Показываем блок с благодарностью
  const thankYouBlock = document.getElementById('thankYouBlock');
  thankYouBlock.style.display = 'block'; // Сначала делаем блок видимым
  setTimeout(() => {
    thankYouBlock.classList.add('show'); // Добавляем класс для анимации
  }, 10); // Небольшая задержка для корректного запуска анимации
});


// Функция для создания модального окна
function createModal(message) {
  // Создаем затемнение (overlay)
  const overlay = document.createElement('div');
  overlay.classList.add('cat-overlay');
  overlay.style.display = 'block'; // Показываем затемнение

  // Создаем контейнер для модального окна
  const modal = document.createElement('div');
  modal.classList.add('cat-modal');
  modal.style.display = 'block'; // Показываем модальное окно

  // Добавляем текстовое сообщение
  const modalMessage = document.createElement('p');
  modalMessage.textContent = message;
  modal.appendChild(modalMessage);

  // Создаем кнопку "Закрыть"
  const closeButton = document.createElement('button');
  closeButton.textContent = 'Закрыть';
  closeButton.classList.add('cat-modal-close-btn');

  // Добавляем обработчик для закрытия модального окна
  closeButton.addEventListener('click', () => {
    document.body.removeChild(modal);
    document.body.removeChild(overlay);
  });

  modal.appendChild(closeButton);

  // Добавляем модальное окно и затемнение в DOM
  document.body.appendChild(overlay);
  document.body.appendChild(modal);

  // Закрытие модального окна при клике вне его области
  overlay.addEventListener('click', () => {
    document.body.removeChild(modal);
    document.body.removeChild(overlay);
  });
}

 


// КНОПКИ (в основном назад)

  // Функция для переключения видимости страниц
  function togglePageVisibility(pageToShow) {
    // Скрываем все страницы
    document.getElementById('app').style.display = 'none';
    document.getElementById('categoryPage').style.display = 'none';
    document.getElementById('cartPage').style.display = 'none';
    document.getElementById('casePage').style.display = 'none';
    document.getElementById('documentPage').style.display = 'none';

    // Показываем нужную страницу
    document.getElementById(`${pageToShow}`).style.display = 'block'

      // Прокручиваем страницу вверх
      window.scrollTo(0, 0);
  }

    // Функция для переключения видимости страниц оставляя app
  function togglePageVisibilityMain(pageToShow) {
    document.getElementById(`app`).style.display = 'block'
    document.getElementById('mainContent').style.display = 'none'
    document.getElementById('categoryPage').style.display = 'none';
    document.getElementById('cartPage').style.display = 'none';
    document.getElementById('casePage').style.display = 'none';
    document.getElementById('documentPage').style.display = 'none';
    document.getElementById(`${pageToShow}`).style.display = 'block'
    window.scrollTo(0, 0);
  }

  // Обработчик кликов для всех кнопок "Корзина"
  document.querySelectorAll('.basket').forEach(button => {
    button.addEventListener('click', () => {
    // Переключаем видимость на страницу корзины
    togglePageVisibilityMain('cartPage');
    // Рендерим товары в корзине
    renderCart();
    });
  });

  // создаем массив id секций 
  const sections = ['categories','mainPage','brand','changing','contact']
  // в цикле для классов с названием секция-back мы добавляем клик чтобы из любого места переноситься к секции
  for (let section of sections) {
    document.querySelectorAll(`.${section}-back`).forEach((link) => {
    link.addEventListener('click', () => {
      scrollToBlock(`${section}`)
    })
  })
  }

// общий возврат на главную страницу (app)
document.querySelectorAll('.back-link').forEach((link) => {
  link.addEventListener('click', () => {
    togglePageVisibility('mainContent');
    togglePageVisibility('app');
  })
})

// Политика конфиденциальности
  // Обработчик кликов по ссылкам
  document.querySelectorAll('.document-link').forEach(link => {
    link.addEventListener('click', () => {
    togglePageVisibilityMain('documentPage')
    
    });
  });
  
// Политика конфиденциальности


// КНОПКИ  



// Функция для перехода к блоку
function scrollToBlock(blockName) {
  const block = document.getElementById(`${blockName}`); // Находим блок 
  if (block) {
    togglePageVisibility('mainContent');
    togglePageVisibility('app');
    block.scrollIntoView(); // Плавная прокрутка к блоку
  }
}
















// Закрытие модальных окон по клику на overlay
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('cart-modal-overlay')) {
        e.target.classList.remove('show');
    }
});

// Закрытие по Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        document.querySelectorAll('.cart-modal-overlay.show').forEach(modal => {
            modal.classList.remove('show');
        });
    }
});



// Инициализация EmailJS
(function() {
    // ЗАМЕНИТЕ НА ВАШ ПУБЛИЧНЫЙ КЛЮЧ ИЗ EMAILJS!
    emailjs.init("n2s0n6pzBSPXvZiQV");
})();

// Конфигурация EmailJS
const EMAIL_CONFIG = {
    serviceId: "service_kg6dy2v",        // ID вашего сервиса
    templateId: "template_vmp6cil",      // ID шаблона для формы
};

// Обработчик отправки формы
document.getElementById('feedbackForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const submitBtn = document.querySelector('.submit-btn');
    const messageDiv = document.getElementById('formMessage');
    
    // Показываем процесс отправки
    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Отправляем...';
    
    // Очищаем предыдущие сообщения
    messageDiv.innerHTML = '';
    messageDiv.className = '';
    
    // Собираем данные формы
    const formData = {
        name: document.getElementById('name').value.trim(),
        tel: document.getElementById('tel').value.trim(),
        message: document.getElementById('message').value.trim(),
        date: new Date().toLocaleString('ru-RU'),
        site: window.location.href
    };
    
    // Отправляем через EmailJS
    emailjs.send(EMAIL_CONFIG.serviceId, EMAIL_CONFIG.templateId, formData)
        .then(function(response) {
            console.log('✅ Форма отправлена успешно!', response.status, response.text);
            
            // Скрываем форму и показываем благодарность
            document.getElementById('contactFormBlock').style.display = 'none';
            document.getElementById('thankYouBlock').style.display = 'block';
            
            // Очищаем форму
            document.getElementById('feedbackForm').reset();
            
        })
        .catch(function(error) {
            console.error('❌ Ошибка отправки формы:', error);
            
            // Показываем сообщение об ошибке
            messageDiv.innerHTML = 'Ошибка отправки. Попробуйте позже или свяжитесь с нами по телефону.';
            messageDiv.style.color = '#dc3545';
            messageDiv.style.background = '#f8d7da';
            messageDiv.style.border = '1px solid #f5c6cb';
            messageDiv.style.padding = '10px';
            messageDiv.style.borderRadius = '4px';
            messageDiv.style.marginTop = '10px';
        })
        .finally(function() {
            // Возвращаем кнопку в исходное состояние
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        });
});


// мобильная верстка ------------------------------------------------------

// Получаем элементы только если они существуют (для мобильной версии)
const menuBtn = document.getElementById('menuBtn');
const accordionMenu = document.getElementById('accordionMenu');
const overlay = document.getElementById('overlay');
const basketBtn = document.getElementById('basketBtn');

// Проверяем что элементы существуют перед добавлением событий
if (menuBtn && accordionMenu && overlay) {
    // Переключение меню
    menuBtn.addEventListener('click', function() {
        menuBtn.classList.toggle('active');
        accordionMenu.classList.toggle('active');
        overlay.classList.toggle('active');
        document.body.style.overflow = accordionMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Закрытие меню при клике на overlay
    overlay.addEventListener('click', function() {
        closeMenu();
    });

    // Закрытие меню при клике на ссылку
    document.querySelectorAll('.menu-link').forEach(link => {
        link.addEventListener('click', function() {
            closeMenu();
        });
    });

    // Функция закрытия меню
    function closeMenu() {
        menuBtn.classList.remove('active');
        accordionMenu.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Закрытие меню при нажатии Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && accordionMenu.classList.contains('active')) {
            closeMenu();
        }
    });
}

