// Animação dos cards de Governadores
document.addEventListener('DOMContentLoaded', function () {
    const governorCards = document.querySelectorAll('.governor-card');
    
    function checkGovernorCards() {
        const triggerBottom = window.innerHeight * 0.8;
        
        governorCards.forEach(card => {
            const cardTop = card.getBoundingClientRect().top;
            
            if (cardTop < triggerBottom) {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Verificar no scroll
    window.addEventListener('scroll', checkGovernorCards);
    // Verificar no carregamento
    checkGovernorCards();
});

// Animação de scroll para timeline de ex-diretores
document.addEventListener('DOMContentLoaded', function () {

    // Elementos principais
    const timelineProgress = document.getElementById('timelineProgressDirectors');
    const timelineItems = document.querySelectorAll('.timeline-item-director');
    const timelineSection = document.querySelector('.ex-directors-timeline-section');

    // Função principal
    function updateTimeline() {
        // 1. Animação dos itens
        const triggerBottom = window.innerHeight * 0.8;

        timelineItems.forEach(item => {
            const itemTop = item.getBoundingClientRect().top;

            if (itemTop < triggerBottom) {
                item.classList.add('animated-item-director');
            } else {
                item.classList.remove('animated-item-director');
            }
        });

        // 2. Cálculo do progresso da linha
        const rect = timelineSection.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const scrollY = window.pageYOffset || document.documentElement.scrollTop;

        // Posições absolutas
        const sectionTop = timelineSection.offsetTop;
        const sectionHeight = timelineSection.offsetHeight;
        const sectionBottom = sectionTop + sectionHeight;

        // Posição atual do scroll
        const currentScroll = scrollY + windowHeight;

        // Calcula o progresso
        let progress = 0;

        // Se a seção está visível
        if (currentScroll > sectionTop && scrollY < sectionBottom) {
            // Quanto já percorremos da seção
            const scrolledPast = currentScroll - sectionTop;
            const totalToScroll = sectionHeight + windowHeight;
            progress = scrolledPast / totalToScroll;
        }
        // Se já passamos da seção
        else if (scrollY >= sectionBottom) {
            progress = 1;
        }

        // Limita entre 0 e 1
        progress = Math.max(0, Math.min(1, progress));

        // Aplica o progresso
        timelineProgress.style.height = (progress * 100) + '%';

        // Debug (remover depois)
        if (Math.random() < 0.01) { // Apenas 1% das vezes para não poluir o console
            console.log('Progresso:', (progress * 100).toFixed(1) + '%');
        }
    }

    // Otimização de performance
    let ticking = false;
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(function () {
                updateTimeline();
                ticking = false;
            });
            ticking = true;
        }
    }

    // Event listeners
    window.addEventListener('scroll', requestTick);
    window.addEventListener('resize', requestTick);

    // Inicializar
    updateTimeline();

    // Verificar após 2 segundos
    setTimeout(() => {
    }, 2000);
});

// Carousel da diretoria
document.addEventListener('DOMContentLoaded', function () {
    
    const leaderCarousel = document.querySelector('.leader-carousel');
    const leaderCards = document.querySelectorAll('.leader-card');
    const prevBtn = document.querySelector('.leader-carousel-btn.prev');
    const nextBtn = document.querySelector('.leader-carousel-btn.next');
    const indicatorsContainer = document.querySelector('.leader-carousel-indicators');
    
    let currentIndex = 0;
    let autoSlideInterval;
    const cardsPerView = getCardsPerView();
    
    // Criar indicadores
    function createIndicators() {
        indicatorsContainer.innerHTML = '';
        const totalSlides = Math.ceil(leaderCards.length / cardsPerView);
        
        for (let i = 0; i < totalSlides; i++) {
            const indicator = document.createElement('button');
            indicator.className = 'leader-carousel-indicator';
            if (i === 0) indicator.classList.add('active');
            indicator.setAttribute('aria-label', `Ir para slide ${i + 1}`);
            indicator.addEventListener('click', () => goToSlide(i));
            indicatorsContainer.appendChild(indicator);
        }
    }
    
    // Determinar quantos cards cabem na tela
    function getCardsPerView() {
        if (window.innerWidth >= 1200) return 3;
        if (window.innerWidth >= 992) return 2;
        return 1;
    }
    
    // Atualizar view do carousel
    function updateCarousel() {
        const cardWidth = leaderCards[0].offsetWidth + 40; // width + gap
        const translateX = -currentIndex * cardWidth * cardsPerView;
        leaderCarousel.style.transform = `translateX(${translateX}px)`;
        
        // Atualizar indicadores
        const indicators = document.querySelectorAll('.leader-carousel-indicator');
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentIndex);
        });
        
        // Atualizar estado dos botões
        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex >= Math.ceil(leaderCards.length / cardsPerView) - 1;
    }
    
    // Ir para slide específico
    function goToSlide(index) {
        const totalSlides = Math.ceil(leaderCards.length / cardsPerView);
        if (index >= 0 && index < totalSlides) {
            currentIndex = index;
            updateCarousel();
            resetAutoSlide();
        }
    }
    
    // Próximo slide
    function nextSlide() {
        const totalSlides = Math.ceil(leaderCards.length / cardsPerView);
        if (currentIndex < totalSlides - 1) {
            currentIndex++;
            updateCarousel();
            resetAutoSlide();
        }
    }
    
    // Slide anterior
    function prevSlide() {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
            resetAutoSlide();
        }
    }
    
    // Auto slide a cada 5 segundos
    function startAutoSlide() {
        autoSlideInterval = setInterval(() => {
            const totalSlides = Math.ceil(leaderCards.length / cardsPerView);
            if (currentIndex < totalSlides - 1) {
                currentIndex++;
            } else {
                currentIndex = 0;
            }
            updateCarousel();
        }, 5000);
    }
    
    // Resetar auto slide quando usuário interagir
    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    }
    
    // Inicializar
    function initCarousel() {
        const newCardsPerView = getCardsPerView();
        if (newCardsPerView !== cardsPerView) {
            currentIndex = 0;
        }
        
        createIndicators();
        updateCarousel();
        startAutoSlide();
        
        // Event listeners
        prevBtn.addEventListener('click', prevSlide);
        nextBtn.addEventListener('click', nextSlide);
        
        // Pausar auto slide quando mouse estiver sobre o carousel
        leaderCarousel.addEventListener('mouseenter', () => {
            clearInterval(autoSlideInterval);
        });
        
        leaderCarousel.addEventListener('mouseleave', () => {
            startAutoSlide();
        });
        
        // Atualizar no resize
        window.addEventListener('resize', () => {
            const newCardsPerView = getCardsPerView();
            if (newCardsPerView !== cardsPerView) {
                currentIndex = 0;
                createIndicators();
                updateCarousel();
            }
        });
    }
    
    // Iniciar carousel
    initCarousel();
});

// Código de emergência: se não funcionar, adiciona um botão manual
setTimeout(() => {
    const progressBar = document.getElementById('timelineProgressDirectors');
}, 5000);
