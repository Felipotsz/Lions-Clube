// uncionalidades específicas da página inicial
document.addEventListener('DOMContentLoaded', function () {
    // Dados dos cards do carousel
    const carouselData = [
        {
            id: 1,
            title: "Campanha de Doação de Sangue",
            description: "Organizamos campanhas periódicas de doação de sangue em parceria com o hemocentro local, mobilizando a comunidade para salvar vidas.",
            image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjB8zCU3HgzHKhcqISb7sWOlS6126Psgl_WL8LZW7jrOn1S6PClOJwESxHKPYu4oEMf-3_alSdqi4XL6eKXfdzio9pExlCo6J40rmgLBBrOtIUwQw9Jzc-YabfwDXZhGHnvpL9guVGNBXg/s1600/004.JPG",
            link: {
                url: "https://lionsclubetatui.blogspot.com/2014/02/doacao-ao-banco-de-sangue.html",
                target: "_blank"
            }
        },
        {
            id: 2,
            title: "Distribuição de Cestas Básicas",
            description: "Durante está ação, distribuímos diversas cestas básicas para o \"Recanto do Bom Velhinho\" em Tatuí.",
            image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjd5P5pV56PH30zHkGErz59o8ou-FEqWC0IfxJbDbcsq9utMrMlgAv_mJlRGmEPQx0ieY10cGKEIbdXhKN8RR1WKGMOGCRB3nAzCt3FTNfNiwmwJAYB6gbVeBc72YldQHcmep8mvq0GJDA/s320/018.JPG",
            link: {
                url: "https://lionsclubetatui.blogspot.com/2012/10/recanto-do-bom-velhinho-recebe-cestas.html",
                target: "_blank"
            }
        },
        {
            id: 3,
            title: "Projeto Visão para Todos",
            description: "Realizamos exames de vista gratuitos e doamos óculos para crianças e idosos que não têm condições de adquirir.",
            image: "https://scontent.fsod1-2.fna.fbcdn.net/v/t39.30808-6/485140367_953021246998250_7286947022055891360_n.jpg?stp=dst-jpg_s590x590_tt6&_nc_cat=110&ccb=1-7&_nc_sid=127cfc&_nc_ohc=NfkYIYhPgncQ7kNvwEYb4jP&_nc_oc=Adl80L4PMz55vJajFo-WuEuKM3YfWS6-4rBgtDr8IGo2hViecir4393IkBQjgdA2bhg&_nc_zt=23&_nc_ht=scontent.fsod1-2.fna&_nc_gid=Hq34nburGUpQPNaSZlUqMQ&oh=00_Afr9mwinJ-vebmhRxW-hM7UPMJIQlFYNZ02mS7Jdlg34TQ&oe=6980B303",
            link: {
                url: "https://www.facebook.com/lionsclubedetatui.org.br/posts/campanha-da-vis%C3%A3ona-sede-do-lions-clube-de-tatu%C3%AD-na-manh%C3%A3-de-11-de-novembro-de-2/865090712457971",
                target: "_blank"
            }
        },
        {
            id: 4,
            title: "Ação Ambiental: Plantio de Árvores",
            description: "Em parceria com a prefeitura, plantamos mais de 100 mudas nativas em áreas públicas para conscientizar sobre preservação ambiental.",
            image: "https://www2.tatui.sp.gov.br/wp-content/uploads/2025/10/semana-municipal-de-arborizacao-urbana-2025_mega-plantio-no-parque-maria-tuca.jpeg",
            link: {
                url: "https://portal.tatui.sp.gov.br/noticias/agricultura-e-meio-ambiente/mais-de-mil-pessoas-participam-da-semana-municipal-da-arborizacao-urbana-que-plantou-208-arvores-e-doou-205-mudas-28",
                target: "_blank"
            }
        },
        {
            id: 5,
            title: "Apoio a Instituições de Caridade",
            description: "Fornecemos apoio financeiro e voluntário para instituições que cuidam de idosos e pessoas com deficiência em nossa região.",
            image: "https://scontent.fsod1-2.fna.fbcdn.net/v/t39.30808-6/616462185_1183738020593237_1529323588780560573_n.jpg?stp=dst-jpg_p180x540_tt6&_nc_cat=104&ccb=1-7&_nc_sid=127cfc&_nc_ohc=0oYNsC1fZQAQ7kNvwGZUvwp&_nc_oc=AdncgvXkYB2Jvm8L5kmHff88h5VCgiFj2wI0qw2xFpEOFpkf7jztJFEEdobVeIVDWi0&_nc_zt=23&_nc_ht=scontent.fsod1-2.fna&_nc_gid=JLZ-vr6R-KYnbVDwQQDbDg&oh=00_AfqwV4zUANCQw3exri8m8PWBiEPsqMEJ13Kv2pCuQp0ieA&oe=6980BA20",
            link: {
                url: "https://www.facebook.com/lionsclubedetatui.org.br/posts/doa%C3%A7%C3%A3o-de-alimentos-para-entidadeno-domingo-1101-o-lions-clube-de-tatu%C3%AD-em-mais-/1183738110593228/",
                target: "_blank"
            }
        },
        {
            id: 6,
            title: "Lions Mund 2025",
            description: "Início de uma iniciativa que envolve o Lions Clube de Tatuí, o LEO Clube de Tatuí, a Fatec Tatuí, o Conselho da Juventude e o Lar Donato Flores.",
            image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgkXoK2bSSettWw9AiVZbH0P-ymyKlyFEJdjQBfWYRb6gR3HVauYj9oEn9HTXlPQOoGcTxwW97al8168529SIfO2doYubCOlFMGpTCKkr-NpI1q7B48EU-sZ2MQvMF8eQYkXsn6BYhi6MKfbJu9QXmsHa9GXg5Sy2fCY7SQsWEx34Wqvp-9T7tMk3YHNKUs/s600/3%20-%20WhatsApp%20Image%202025-02-20%20at%2008.27.57.jpeg",
            link: {
                url: "https://lionsclubetatui.blogspot.com/2025/02/lions-mund-2025-inicio-do-projeto-no.html",
                target: "_blank"
            }
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

            // Verificar se link é objeto ou string (para compatibilidade)
            let linkUrl, linkTarget, linkRel;
            
            if (typeof item.link === 'object' && item.link !== null) {
                // Se link é um objeto
                linkUrl = item.link.url || '#';
                linkTarget = item.link.target || '_self';
                linkRel = item.link.target === '_blank' ? 'noopener noreferrer' : '';
            } else {
                // Se link é uma string (para manter compatibilidade)
                linkUrl = item.link || '#';
                linkTarget = '_blank'; // Padrão para links externos
                linkRel = 'noopener noreferrer';
            }

            card.innerHTML = `
                <div class="carousel-img-container">
                    <img src="${item.image}" alt="${item.title}" class="carousel-img" loading="lazy">
                </div>
                <div class="carousel-content">
                    <h4>${item.title}</h4>
                    <p>${item.description}</p>
                    <a href="${linkUrl}" 
                       target="${linkTarget}" 
                       ${linkRel ? `rel="${linkRel}"` : ''}
                       class="btn btn-small">
                        Ver detalhes
                    </a>
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
    window.addEventListener('resize', function () {
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