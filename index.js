// Controle do menu mobile
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menuToggle');
    const mainNav = document.getElementById('mainNav');
    const body = document.body;
    
    // Criar overlay para menu mobile
    const menuOverlay = document.createElement('div');
    menuOverlay.className = 'menu-overlay';
    body.appendChild(menuOverlay);
    
    // Abrir/fechar menu
    menuToggle.addEventListener('click', function() {
        mainNav.classList.toggle('active');
        menuOverlay.classList.toggle('active');
        body.classList.toggle('menu-open');
        
        // Mudar ícone do menu
        const icon = menuToggle.querySelector('i');
        if (mainNav.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
    
    // Fechar menu ao clicar no overlay
    menuOverlay.addEventListener('click', function() {
        mainNav.classList.remove('active');
        menuOverlay.classList.remove('active');
        body.classList.remove('menu-open');
        menuToggle.querySelector('i').className = 'fas fa-bars';
    });
    
    // Fechar menu ao clicar em um link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            mainNav.classList.remove('active');
            menuOverlay.classList.remove('active');
            body.classList.remove('menu-open');
            menuToggle.querySelector('i').className = 'fas fa-bars';
        });
    });
    
    // Fechar menu ao redimensionar a janela (se voltar para desktop)
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            mainNav.classList.remove('active');
            menuOverlay.classList.remove('active');
            body.classList.remove('menu-open');
            menuToggle.querySelector('i').className = 'fas fa-bars';
        }
    });
});