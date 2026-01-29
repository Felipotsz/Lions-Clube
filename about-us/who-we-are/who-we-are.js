// Animação de scroll
document.addEventListener('DOMContentLoaded', function() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    const timelineProgress = document.getElementById('timelineProgress');

    function checkScroll() {
        const triggerBottom = window.innerHeight * 0.8;

        timelineItems.forEach(item => {
            const itemTop = item.getBoundingClientRect().top;

            if (itemTop < triggerBottom) {
                item.classList.add('animated');
            }
        });

        // Progresso da linha
        if (timelineProgress) {
            const timelineSection = document.querySelector('.animated-timeline');
            const timelineRect = timelineSection.getBoundingClientRect();
            const timelineTop = timelineRect.top;
            const timelineHeight = timelineRect.height;
            
            const progress = Math.max(0, Math.min(1, 
                (window.innerHeight - timelineTop) / (timelineHeight + window.innerHeight)
            ));
            
            timelineProgress.style.height = (progress * 100) + '%';
        }
    }

    // Throttle function para performance
    function throttle(func, wait) {
        let timeout = null;
        return function() {
            if (!timeout) {
                timeout = setTimeout(() => {
                    func();
                    timeout = null;
                }, wait);
            }
        };
    }

    const throttledCheckScroll = throttle(checkScroll, 100);

    window.addEventListener('scroll', throttledCheckScroll);
    window.addEventListener('resize', throttledCheckScroll);
    
    // Inicializar
    setTimeout(checkScroll, 300);
});

// Galeria navegável com loop simples
const gallerySlider = document.getElementById('gallerySlider');
const galleryPrev = document.getElementById('galleryPrev');
const galleryNext = document.getElementById('galleryNext');

if (gallerySlider && galleryPrev && galleryNext) {
    const slides = gallerySlider.querySelectorAll('.gallery-slide');
    const totalSlides = slides.length;
    let currentSlide = 0;
    let slidesPerView = 3;
    let isAnimating = false;
    
    // Ajustar slides por viewport
    function updateSlidesPerView() {
        if (window.innerWidth <= 576) {
            slidesPerView = 1;
        } else if (window.innerWidth <= 992) {
            slidesPerView = 2;
        } else {
            slidesPerView = 3;
        }
        updateSliderPosition();
    }
    
    // Atualizar posição do slider
    function updateSliderPosition() {
        if (slides.length === 0) return;
        
        const slideWidth = slides[0].offsetWidth + 30;
        const translateX = -currentSlide * slideWidth;
        gallerySlider.style.transform = `translateX(${translateX}px)`;
    }
    
    // Navegar para um slide específico
    function goToSlide(slideIndex) {
        if (isAnimating || slides.length === 0) return;
        
        isAnimating = true;
        
        // Aplicar transição suave
        gallerySlider.style.transition = 'transform 0.5s ease';
        
        // Atualizar slide atual (com loop)
        currentSlide = slideIndex;
        
        // Se passou do final, voltar ao início
        if (currentSlide >= totalSlides) {
            currentSlide = 0;
        }
        
        // Se foi antes do início, ir para o final
        if (currentSlide < 0) {
            currentSlide = totalSlides - slidesPerView;
        }
        
        updateSliderPosition();
        
        // Resetar animação
        setTimeout(() => {
            isAnimating = false;
            gallerySlider.style.transition = '';
        }, 500);
    }
    
    // Próximo slide
    function nextSlide() {
        let nextSlideIndex = currentSlide + slidesPerView;
        
        // Se passou do final, voltar ao início
        if (nextSlideIndex >= totalSlides) {
            nextSlideIndex = 0;
        }
        
        goToSlide(nextSlideIndex);
    }
    
    // Slide anterior
    function prevSlide() {
        let prevSlideIndex = currentSlide - slidesPerView;
        
        // Se foi antes do início, ir para o final
        if (prevSlideIndex < 0) {
            // Calcular última posição possível
            const lastPosition = Math.max(0, totalSlides - slidesPerView);
            prevSlideIndex = lastPosition;
        }
        
        goToSlide(prevSlideIndex);
    }
    
    // Event listeners para botões
    galleryPrev.addEventListener('click', prevSlide);
    galleryNext.addEventListener('click', nextSlide);
    
    // Suporte básico a touch/swipe
    let touchStartX = 0;
    let touchEndX = 0;
    
    gallerySlider.addEventListener('touchstart', function(e) {
        touchStartX = e.touches[0].clientX;
    }, { passive: true });
    
    gallerySlider.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].clientX;
        handleSwipe();
    }, { passive: true });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe para a esquerda - próximo
                nextSlide();
            } else {
                // Swipe para a direita - anterior
                prevSlide();
            }
        }
    }
    
    // Inicializar
    updateSlidesPerView();
    
    // Redimensionamento
    window.addEventListener('resize', () => {
        updateSlidesPerView();
    });
    
    // Loop automático (opcional)
    let autoSlideInterval;
    
    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 5000); // Troca a cada 5 segundos
    }
    
    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }
    
    // Iniciar loop automático
    startAutoSlide();
    
    // Pausar quando o mouse estiver sobre a galeria
    gallerySlider.addEventListener('mouseenter', stopAutoSlide);
    gallerySlider.addEventListener('mouseleave', startAutoSlide);
    gallerySlider.addEventListener('touchstart', stopAutoSlide);
    gallerySlider.addEventListener('touchend', () => setTimeout(startAutoSlide, 3000));
}

// Reconhecimentos - Flip Cards e Filtros
document.addEventListener('DOMContentLoaded', function() {
    const recognitionCards = document.querySelectorAll('.recognition-card');
    const flipButtons = document.querySelectorAll('.card-flip-btn');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const actionButtons = document.querySelectorAll('.card-action-btn');

    // Função para girar card
    function flipCard(card) {
        card.classList.toggle('flipped');
        
        // Alterar texto do botão
        const button = card.querySelector('.card-flip-btn');
        if (card.classList.contains('flipped')) {
            button.innerHTML = `<i class="fas fa-exchange-alt"></i> Voltar`;
        } else {
            button.innerHTML = `<i class="fas fa-exchange-alt"></i> Ver detalhes`;
        }
    }

    // Função para filtrar cards
    function filterCards(filter) {
        filterButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.filter === filter) {
                btn.classList.add('active');
            }
        });

        recognitionCards.forEach(card => {
            const category = card.dataset.category;
            
            if (filter === 'all' || category === filter) {
                card.style.display = 'block';
                // Animar entrada
                setTimeout(() => {
                    card.style.animation = 'cardAppear 0.6s ease forwards';
                }, 100);
            } else {
                card.style.display = 'none';
            }
        });
    }

    // Função para simular ação do botão
    function handleActionButton(year) {
        // Aqui ainda se pode implmentar:
        // 1. Abrir modal com documento
        // 2. Download de arquivo PDF
        // 3. Redirecionar para página específica
        
        console.log(`Ação solicitada para o certificado de ${year}`);
        
        // Exemplo: Mostrar mensagem
        alert(`Documento do ano ${year} será aberto em uma nova janela.`);
    }

    // Event Listeners
    flipButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const card = this.closest('.recognition-card');
            flipCard(card);
        });
    });

    // Girar card ao clicar nele (exceto nos botões)
    recognitionCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Não girar se o clique foi em um botão
            if (!e.target.closest('button')) {
                flipCard(this);
            }
        });
    });

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.dataset.filter;
            filterCards(filter);
        });
    });

    actionButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const card = this.closest('.recognition-card');
            const year = card.dataset.year;
            handleActionButton(year);
        });
    });

    // Animar cards ao scroll
    function animateOnScroll() {
        const triggerBottom = window.innerHeight * 0.8;
        
        recognitionCards.forEach(card => {
            const cardTop = card.getBoundingClientRect().top;
            
            if (cardTop < triggerBottom) {
                card.style.animation = 'cardAppear 0.6s ease forwards';
            }
        });
    }

    // Inicializar
    window.addEventListener('scroll', animateOnScroll);
    setTimeout(animateOnScroll, 300);

    // Hotkeys para navegação
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            // Desvirar todos os cards ao pressionar ESC
            recognitionCards.forEach(card => {
                if (card.classList.contains('flipped')) {
                    card.classList.remove('flipped');
                    const button = card.querySelector('.card-flip-btn');
                    button.innerHTML = `<i class="fas fa-exchange-alt"></i> Ver detalhes`;
                }
            });
        }
    });
});