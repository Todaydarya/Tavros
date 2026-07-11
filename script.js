// ===== ЧАСТЬ 1: Рендеринг секции "Наши работы" =====
document.addEventListener('DOMContentLoaded', () => {
    const worksContainer = document.getElementById('works-container');
    
    if (worksContainer && typeof projectsDB !== 'undefined') {
        projectsDB.forEach(project => {
            const card = document.createElement('div');
            card.className = 'work-card';
            
            // Берём первое фото для превью
            const previewImage = project.gallery && project.gallery.length > 0 
                ? project.gallery[0] 
                : '';
            const videoPath = project.video || null;
            
            card.innerHTML = `
                <div class="work-image">
                    <img src="${previewImage}" alt="${project.name}" loading="lazy" onerror="this.style.display='none';">
                    ${videoPath ? '<div class="work-video-badge">▶ Видео</div>' : ''}
                </div>
                <h3>${project.name}</h3>
                <p class="location">📍 ${project.location}</p>
                <p>${project.description}</p>
            `;
            
            card.addEventListener('click', () => openWorkModal(project));
            
            worksContainer.appendChild(card);
        });
    }
});

// ===== ГАЛЕРЕЯ В МОДАЛКЕ =====
let currentProject = null;
let currentSlideIndex = 0;
let slides = []; // массив слайдов: {type: 'image'|'video', src: '...'}

function buildSlides(project) {
    const result = [];
    
    // Сначала все фото
    if (project.gallery && project.gallery.length > 0) {
        project.gallery.forEach(src => {
            result.push({ type: 'image', src });
        });
    }
    
    // Потом видео (если есть)
    if (project.video) {
        result.push({ type: 'video', src: project.video });
    }
    
    return result;
}

function openWorkModal(project) {
    currentProject = project;
    slides = buildSlides(project);
    currentSlideIndex = 0;
    
    let modal = document.getElementById('workModal');
    
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'workModal';
        modal.className = 'modal work-modal';
        modal.innerHTML = `
            <div class="modal-content work-modal-content">
                <span class="modal-close">&times;</span>
                
                <div class="gallery-container">
                    <button class="gallery-arrow gallery-prev" aria-label="Предыдущий">&#10094;</button>
                    <button class="gallery-arrow gallery-next" aria-label="Следующий">&#10095;</button>
                    
                    <div class="modal-media" id="workModalMedia"></div>
                    
                    <div class="gallery-counter" id="galleryCounter">1 / 1</div>
                    <div class="gallery-dots" id="galleryDots"></div>
                </div>
                
                <div class="modal-info">
                    <h3 id="workModalTitle"></h3>
                    <p class="location" id="workModalLocation"></p>
                    <p id="workModalDescription"></p>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
        
        // Обработчики
        modal.querySelector('.modal-close').addEventListener('click', closeWorkModal);
        modal.addEventListener('click', function(e) {
            if (e.target === modal) closeWorkModal();
        });
        modal.querySelector('.gallery-prev').addEventListener('click', (e) => {
            e.stopPropagation();
            prevSlide();
        });
        modal.querySelector('.gallery-next').addEventListener('click', (e) => {
            e.stopPropagation();
            nextSlide();
        });
        
        // Свайп на мобильных
        setupSwipe(modal);
    }
    
    // Заполняем инфо
    document.getElementById('workModalTitle').textContent = project.name;
    document.getElementById('workModalLocation').textContent = '📍 ' + project.location;
    document.getElementById('workModalDescription').textContent = project.description;
    
    // Строим точки-индикаторы
    renderDots();
    
    // Показываем первый слайд
    renderSlide(currentSlideIndex);
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function renderSlide(index) {
    const mediaContainer = document.getElementById('workModalMedia');
    mediaContainer.innerHTML = '';
    
    if (index < 0 || index >= slides.length) return;
    
    const slide = slides[index];
    
    if (slide.type === 'image') {
        const img = document.createElement('img');
        img.src = slide.src;
        img.alt = currentProject.name;
        img.className = 'modal-image gallery-slide';
        mediaContainer.appendChild(img);
    } else if (slide.type === 'video') {
        const videoWrapper = document.createElement('div');
        videoWrapper.className = 'video-wrapper';
        
        if (slide.src.includes('youtube.com') || slide.src.includes('youtu.be')) {
            const iframe = document.createElement('iframe');
            iframe.src = slide.src + '?autoplay=1&rel=0';
            iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
            iframe.allowFullscreen = true;
            iframe.className = 'modal-video';
            videoWrapper.appendChild(iframe);
        } else {
            const video = document.createElement('video');
            video.src = slide.src;
            video.controls = true;
            video.autoplay = true;
            video.className = 'modal-video';
            videoWrapper.appendChild(video);
        }
        
        mediaContainer.appendChild(videoWrapper);
    }
    
    // Обновляем счётчик и точки
    updateCounter();
    updateDots();
    
    // Показываем/скрываем стрелки
    const prevBtn = document.querySelector('.gallery-prev');
    const nextBtn = document.querySelector('.gallery-next');
    if (prevBtn) prevBtn.style.display = slides.length > 1 ? 'flex' : 'none';
    if (nextBtn) nextBtn.style.display = slides.length > 1 ? 'flex' : 'none';
}

function nextSlide() {
    if (slides.length <= 1) return;
    currentSlideIndex = (currentSlideIndex + 1) % slides.length;
    renderSlide(currentSlideIndex);
}

function prevSlide() {
    if (slides.length <= 1) return;
    currentSlideIndex = (currentSlideIndex - 1 + slides.length) % slides.length;
    renderSlide(currentSlideIndex);
}

function goToSlide(index) {
    currentSlideIndex = index;
    renderSlide(currentSlideIndex);
}

function updateCounter() {
    const counter = document.getElementById('galleryCounter');
    if (counter) {
        counter.textContent = `${currentSlideIndex + 1} / ${slides.length}`;
    }
}

function renderDots() {
    const dotsContainer = document.getElementById('galleryDots');
    if (!dotsContainer) return;
    
    dotsContainer.innerHTML = '';
    if (slides.length <= 1) {
        dotsContainer.style.display = 'none';
        return;
    }
    
    dotsContainer.style.display = 'flex';
    slides.forEach((_, idx) => {
        const dot = document.createElement('button');
        dot.className = 'gallery-dot' + (idx === 0 ? ' active' : '');
        dot.setAttribute('aria-label', `Слайд ${idx + 1}`);
        dot.addEventListener('click', (e) => {
            e.stopPropagation();
            goToSlide(idx);
        });
        dotsContainer.appendChild(dot);
    });
}

function updateDots() {
    const dots = document.querySelectorAll('.gallery-dot');
    dots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === currentSlideIndex);
    });
}

function setupSwipe(modal) {
    let startX = 0;
    let endX = 0;
    const media = modal.querySelector('.modal-media');
    
    media.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    }, { passive: true });
    
    media.addEventListener('touchmove', (e) => {
        endX = e.touches[0].clientX;
    }, { passive: true });
    
    media.addEventListener('touchend', () => {
        const diff = startX - endX;
        if (Math.abs(diff) > 50) {
            if (diff > 0) nextSlide();
            else prevSlide();
        }
    });
}

function closeWorkModal() {
    const modal = document.getElementById('workModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        
        const mediaContainer = document.getElementById('workModalMedia');
        if (mediaContainer) mediaContainer.innerHTML = '';
    }
}

// Клавиатурная навигация
document.addEventListener('keydown', function(e) {
    const workModal = document.getElementById('workModal');
    if (!workModal || workModal.style.display !== 'block') return;
    
    if (e.key === 'Escape') closeWorkModal();
    if (e.key === 'ArrowRight') nextSlide();
    if (e.key === 'ArrowLeft') prevSlide();
});

// ===== ЧАСТЬ 2: Модальное окно для продукции (без изменений) =====
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const modalCaption = document.getElementById('modalCaption');
    const closeBtn = document.querySelector('.modal-close');
    const productCards = document.querySelectorAll('.product-card');

    productCards.forEach(card => {
        card.addEventListener('click', function() {
            const img = this.querySelector('.product-image img');
            const title = this.querySelector('h3').textContent;
            if (img) {
                modal.style.display = 'block';
                modalImage.src = img.src;
                modalCaption.textContent = title;
                document.body.style.overflow = 'hidden';
            }
        });
    });

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) closeModal();
        });
    }

    function closeModal() {
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    }
});

// ===== ЧАСТЬ 3: Форма и маска телефона =====
document.addEventListener('DOMContentLoaded', function () {
    const form       = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');
    const phoneInput = document.getElementById('phoneInput');

    if (!form) return;

    if (phoneInput) {
        phoneInput.addEventListener('input', function (e) {
            let digits = e.target.value.replace(/\D/g, '');
            if (digits.startsWith('7') || digits.startsWith('8')) {
                digits = digits.substring(1);
            }
            digits = digits.substring(0, 10);

            let formatted = '+7';
            if (digits.length > 0) formatted += ' (' + digits.substring(0, 3);
            if (digits.length >= 3) formatted += ') ' + digits.substring(3, 6);
            if (digits.length >= 6) formatted += '-' + digits.substring(6, 8);
            if (digits.length >= 8) formatted += '-' + digits.substring(8, 10);

            e.target.value = formatted;
        });

        phoneInput.addEventListener('keypress', function (e) {
            if (!/\d/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Delete') {
                e.preventDefault();
            }
        });
    }

    function showStatus(message, type) {
        formStatus.textContent = message;
        formStatus.className = 'form-status ' + type;
    }

    function hideStatus() {
        formStatus.className = 'form-status';
        formStatus.textContent = '';
    }
});