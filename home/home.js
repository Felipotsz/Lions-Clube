// home.js - Funcionalidades específicas da página inicial

document.addEventListener('DOMContentLoaded', function() {
    // Dados dos cards do carousel
    const carouselData = [
        {
            id: 1,
            title: "Campanha de Doação de Sangue",
            description: "Organizamos campanhas periódicas de doação de sangue em parceria com o hemocentro local, mobilizando a comunidade para salvar vidas.",
            image: "",
            link: "#",
        },
        {
            id: 2,
            title: "Distribuição de Cestas Básicas",
            description: "Durante a pandemia, distribuímos mais de 500 cestas básicas para famílias em situação de vulnerabilidade social em Tatuí.",
            image: "Distribuição de Cestas Básicas",
            link: "#",
        },
        {
            id: 3,
            title: "Projeto Visão para Todos",
            description: "Realizamos exames de vista gratuitos e doamos óculos para crianças e idosos que não têm condições de adquirir.",
            image: "Projeto Visão para Todos",
            link: "#",
        },
        {
            id: 4,
            title: "Ação Ambiental: Plantio de Árvores",
            description: "Em parceria com a prefeitura, plantamos mais de 100 mudas nativas em áreas públicas para conscientizar sobre preservação ambiental.",
            image: "Ação Ambiental: Plantio de Árvores",
            link: "#",
        },
        {
            id: 5,
            title: "Apoio a Instituições de Caridade",
            description: "Fornecemos apoio financeiro e voluntário para instituições que cuidam de idosos e pessoas com deficiência em nossa região.",
            image: "Apoio a Instituições de Caridade",
            link: "#",
        },
        {
            id: 6,
            title: "Arrecadação de Agasalhos",
            description: "Todos os anos realizamos campanhas de arrecadação de agasalhos e cobertores para ajudar famílias durante o inverno.",
            image: "Arrecadação de Agasalhos",
            link: "#",
        }
    ];
    
    // Inicializar o carousel
    initCarousel(carouselData);
});

// Função para inicializar o carousel
function initCarousel(data) {
    const carousel = document.getElementById('missionCarousel');
    const indicatorsContainer = document.getElementById('carouselIndicators');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    
    if (!carousel) return;
    
    // Variáveis de controle do carousel
    let currentIndex = 0;
    let cardsPerView = getCardsPerView();
    let totalSlides = Math.ceil(data.length / cardsPerView);
    
    // Criar cards do carousel
    function createCarouselCards() {
        carousel.innerHTML = '';
        indicatorsContainer.innerHTML = '';
        
        data.forEach((item, index) => {
            // Criar card
            const card = document.createElement('div');
            card.className = 'carousel-card';
            card.setAttribute('data-index', index);
            
            card.innerHTML = `
                <div class="carousel-img-container">
                    <img src="${item.image}" alt="${item.title}" class="carousel-img">
                </div>
                <div class="carousel-content">
                    <h4>${item.title}</h4>
                    <p>${item.description}</p>
                    <a href="${item.link}" class="btn btn-small">Ver detalhes</a>
                </div>
            `;
            
            carousel.appendChild(card);
        });
        
        // Criar indicadores
        for (let i = 0; i < totalSlides; i++) {
            const indicator = document.createElement('button');
            indicator.className = 'carousel-indicator';
            if (i === 0) indicator.classList.add('active');
            indicator.setAttribute('data-slide', i);
            indicator.setAttribute('aria-label', `Ir para slide ${i + 1}`);
            indicator.addEventListener('click', () => goToSlide(i));
            indicatorsContainer.appendChild(indicator);
        }
        
        // Atualizar posição do carousel
        updateCarouselPosition();
    }
    
    // Função para calcular quantos cards cabem na tela
    function getCardsPerView() {
        const width = window.innerWidth;
        if (width >= 1100) return 3;
        if (width >= 768) return 2;
        return 1;
    }
    
    // Função para atualizar a posição do carousel
    function updateCarouselPosition() {
        const cards = document.querySelectorAll('.carousel-card');
        if (cards.length === 0) return;
        
        const cardWidth = cards[0].offsetWidth;
        const gap = 30; // Valor do gap definido no CSS
        const translateX = -currentIndex * (cardWidth + gap) * cardsPerView;
        carousel.style.transform = `translateX(${translateX}px)`;
        
        // Atualizar indicadores ativos
        document.querySelectorAll('.carousel-indicator').forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentIndex);
        });
        
        // Atualizar estado dos botões
        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex >= totalSlides - 1;
    }
    
    // Função para ir para um slide específico
    function goToSlide(index) {
        currentIndex = index;
        updateCarouselPosition();
    }
    
    // Função para ir para o próximo slide
    function nextSlide() {
        if (currentIndex < totalSlides - 1) {
            currentIndex++;
            updateCarouselPosition();
        }
    }
    
    // Função para ir para o slide anterior
    function prevSlide() {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarouselPosition();
        }
    }
    
    // Inicializar carousel
    createCarouselCards();
    
    // Adicionar event listeners
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);
    
    // Atualizar ao redimensionar a janela
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            cardsPerView = getCardsPerView();
            totalSlides = Math.ceil(data.length / cardsPerView);
            createCarouselCards();
        }, 250);
    });
    
    // Auto-play do carousel
    let autoPlayInterval;
    
    function startAutoPlay() {
        stopAutoPlay(); // Parar qualquer intervalo existente
        autoPlayInterval = setInterval(() => {
            if (currentIndex < totalSlides - 1) {
                nextSlide();
            } else {
                goToSlide(0);
            }
        }, 6000); // Muda a cada 6 segundos
    }
    
    function stopAutoPlay() {
        clearInterval(autoPlayInterval);
    }
    
    // Iniciar auto-play
    startAutoPlay();
    
    // Pausar auto-play quando o usuário interagir
    carousel.addEventListener('mouseenter', stopAutoPlay);
    carousel.addEventListener('mouseleave', startAutoPlay);
    prevBtn.addEventListener('mouseenter', stopAutoPlay);
    nextBtn.addEventListener('mouseenter', stopAutoPlay);
    indicatorsContainer.addEventListener('mouseenter', stopAutoPlay);
    
    // Swipe para mobile (opcional)
    let touchStartX = 0;
    let touchEndX = 0;
    
    carousel.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        stopAutoPlay();
    }, { passive: true });
    
    carousel.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
        startAutoPlay();
    }, { passive: true });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const swipeDistance = touchEndX - touchStartX;
        
        if (Math.abs(swipeDistance) > swipeThreshold) {
            if (swipeDistance > 0) {
                // Swipe para direita - slide anterior
                prevSlide();
            } else {
                // Swipe para esquerda - próximo slide
                nextSlide();
            }
        }
    }
}