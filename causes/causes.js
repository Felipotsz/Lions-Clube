// Carrossel
document.addEventListener('DOMContentLoaded', function() {
    
    // Elementos
    const carousel = document.querySelector('.carousel');
    if (!carousel) return;
    
    const track = carousel.querySelector('.carousel-track');
    const slides = carousel.querySelectorAll('.carousel-slide');
    const prevBtn = carousel.querySelector('.carousel-btn.prev');
    const nextBtn = carousel.querySelector('.carousel-btn.next');
    
    // Criar contador
    const counter = document.createElement('div');
    counter.className = 'carousel-counter';
    counter.innerHTML = '<span class="current-slide">1</span><span>/</span><span class="total-slides"></span>';
    carousel.appendChild(counter);
    
    const currentSlideElement = counter.querySelector('.current-slide');
    const totalSlidesElement = counter.querySelector('.total-slides');
    
    // Estado
    let currentIndex = 0;
    let autoPlayTimer = null;
    const AUTO_PLAY_DELAY = 5000; // 5 segundos
    
    // Função para detectar orientação da imagem
    function detectImageOrientation(img) {
        if (!img.complete) {
            // Se a imagem não carregou ainda, adicionar listener
            img.addEventListener('load', function() {
                applyOrientationClass(this);
            });
            return;
        }
        
        applyOrientationClass(img);
    }
    
    // Aplicar classe baseada na orientação
    function applyOrientationClass(img) {
        // Remover classes anteriores
        img.classList.remove('landscape', 'portrait');
        
        if (img.naturalWidth > img.naturalHeight) {
            img.classList.add('landscape');
        } else if (img.naturalHeight > img.naturalWidth) {
            img.classList.add('portrait');
        } else {
            // Quadrada
            img.classList.add('landscape');
        }
        
        // Otimizar qualidade
        img.style.imageRendering = 'auto';
    }
    
    // Inicializar
    function init() {
        // Atualizar contador total
        totalSlidesElement.textContent = slides.length;
        
        // Ajustar imagens para evitar distorção
        slides.forEach(slide => {
            const img = slide.querySelector('img');
            if (img) {
                detectImageOrientation(img);
                
                // Garantir que a imagem seja carregada com qualidade
                if (img.src.includes('blogger.googleusercontent.com')) {
                    // Remover parâmetros de tamanho se existirem
                    img.src = img.src.replace(/\/s\d+\//, '/s2048/');
                }
            }
        });
        
        // Iniciar auto-play
        startAutoPlay();
        
        // Configurar eventos
        setupEvents();
        
        console.log('Carrossel iniciado com', slides.length, 'slides');
    }
    
    // Configurar eventos
    function setupEvents() {
        // Botões
        if (prevBtn) prevBtn.addEventListener('click', showPrevSlide);
        if (nextBtn) nextBtn.addEventListener('click', showNextSlide);
        
        // Swipe para mobile
        let startX = 0;
        carousel.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            pauseAutoPlay();
        }, { passive: true });
        
        carousel.addEventListener('touchend', (e) => {
            const endX = e.changedTouches[0].clientX;
            const diff = startX - endX;
            
            if (Math.abs(diff) > 50) {
                if (diff > 0) {
                    showNextSlide();
                } else {
                    showPrevSlide();
                }
            }
            setTimeout(startAutoPlay, 1000);
        }, { passive: true });
        
        // Pausar auto-play ao interagir
        carousel.addEventListener('mouseenter', pauseAutoPlay);
        carousel.addEventListener('mouseleave', startAutoPlay);
        carousel.addEventListener('touchstart', pauseAutoPlay, { passive: true });
        carousel.addEventListener('touchend', () => {
            setTimeout(startAutoPlay, 1000);
        }, { passive: true });
    }
    
    // Mostrar slide específico
    function showSlide(index) {
        // Limitar índice
        if (index < 0) index = slides.length - 1;
        if (index >= slides.length) index = 0;
        
        currentIndex = index;
        
        // Mover track
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        // Atualizar contador
        currentSlideElement.textContent = currentIndex + 1;
        
        // Resetar auto-play
        resetAutoPlay();
    }
    
    // Próximo slide
    function showNextSlide() {
        showSlide(currentIndex + 1);
    }
    
    // Slide anterior
    function showPrevSlide() {
        showSlide(currentIndex - 1);
    }
    
    // Iniciar auto-play
    function startAutoPlay() {
        // Limpar timer anterior
        if (autoPlayTimer) clearInterval(autoPlayTimer);
        
        // Novo timer
        autoPlayTimer = setInterval(showNextSlide, AUTO_PLAY_DELAY);
    }
    
    // Pausar auto-play
    function pauseAutoPlay() {
        if (autoPlayTimer) {
            clearInterval(autoPlayTimer);
            autoPlayTimer = null;
        }
    }
    
    // Resetar auto-play
    function resetAutoPlay() {
        pauseAutoPlay();
        startAutoPlay();
    }
    
    // Inicializar
    init();
    
    // Expor API básica
    window.simpleCarousel = {
        next: showNextSlide,
        prev: showPrevSlide,
        goTo: showSlide,
        getCurrentSlide: () => currentIndex + 1,
        getTotalSlides: () => slides.length
    };
    
});