// Controle do menu mobile
document.addEventListener('DOMContentLoaded', function () {
    const menuToggle = document.getElementById('menuToggle');
    const mainNav = document.getElementById('mainNav');
    const body = document.body;

    // Criar overlay para menu mobile
    const menuOverlay = document.createElement('div');
    menuOverlay.className = 'menu-overlay';
    body.appendChild(menuOverlay);

    // Abrir/fechar menu
    menuToggle.addEventListener('click', function () {
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
    menuOverlay.addEventListener('click', function () {
        mainNav.classList.remove('active');
        menuOverlay.classList.remove('active');
        body.classList.remove('menu-open');
        menuToggle.querySelector('i').className = 'fas fa-bars';

        // Fechar todos os dropdowns
        const dropdownItems = document.querySelectorAll('.nav-item.dropdown');
        dropdownItems.forEach(item => {
            item.querySelector('.dropdown-menu').classList.remove('active');
            item.classList.remove('active');
            const icon = item.querySelector('.dropdown-icon');
            icon.style.transform = 'rotate(0deg)';
        });
    });

    // Fechar menu ao clicar em um link (exceto dropdowns)
    const navLinks = document.querySelectorAll('.nav-link:not(.dropdown-toggle)');
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            // Se for um link de dropdown no mobile, não fechar o menu
            if (window.innerWidth <= 768 && this.closest('.dropdown')) {
                e.preventDefault();
                return;
            }

            mainNav.classList.remove('active');
            menuOverlay.classList.remove('active');
            body.classList.remove('menu-open');
            menuToggle.querySelector('i').className = 'fas fa-bars';
        });
    });

    // Controle do dropdown no mobile
    const dropdownItems = document.querySelectorAll('.nav-item.dropdown');
    dropdownItems.forEach(item => {
        const link = item.querySelector('.nav-link');
        const dropdown = item.querySelector('.dropdown-menu');
        const icon = item.querySelector('.dropdown-icon');

        link.addEventListener('click', function (e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                e.stopPropagation();

                // Alternar estado do dropdown
                dropdown.classList.toggle('active');
                item.classList.toggle('active');

                // Rotacionar ícone
                if (dropdown.classList.contains('active')) {
                    icon.style.transform = 'rotate(180deg)';
                } else {
                    icon.style.transform = 'rotate(0deg)';
                }

                // Fechar outros dropdowns abertos
                dropdownItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.querySelector('.dropdown-menu').classList.remove('active');
                        otherItem.classList.remove('active');
                        otherItem.querySelector('.dropdown-icon').style.transform = 'rotate(0deg)';
                    }
                });
            }
        });

        // Fechar dropdown ao clicar em um item do dropdown
        const dropdownLinks = item.querySelectorAll('.dropdown-item');
        dropdownLinks.forEach(dropdownLink => {
            dropdownLink.addEventListener('click', function () {
                if (window.innerWidth <= 768) {
                    // Fechar menu mobile após selecionar um item
                    setTimeout(() => {
                        mainNav.classList.remove('active');
                        menuOverlay.classList.remove('active');
                        body.classList.remove('menu-open');
                        menuToggle.querySelector('i').className = 'fas fa-bars';

                        // Fechar dropdown
                        dropdown.classList.remove('active');
                        item.classList.remove('active');
                        icon.style.transform = 'rotate(0deg)';
                    }, 300);
                }
            });
        });
    });

    // Fechar dropdown ao clicar fora (mobile)
    document.addEventListener('click', function (e) {
        if (window.innerWidth <= 768) {
            if (!e.target.closest('.nav-item.dropdown')) {
                dropdownItems.forEach(item => {
                    item.querySelector('.dropdown-menu').classList.remove('active');
                    item.classList.remove('active');
                    const icon = item.querySelector('.dropdown-icon');
                    icon.style.transform = 'rotate(0deg)';
                });
            }
        }
    });

    // Fechar menu ao redimensionar a janela (se voltar para desktop)
    window.addEventListener('resize', function () {
        if (window.innerWidth > 768) {
            mainNav.classList.remove('active');
            menuOverlay.classList.remove('active');
            body.classList.remove('menu-open');
            menuToggle.querySelector('i').className = 'fas fa-bars';

            // Fechar todos os dropdowns
            const dropdownItems = document.querySelectorAll('.nav-item.dropdown');
            dropdownItems.forEach(item => {
                item.querySelector('.dropdown-menu').classList.remove('active');
                item.classList.remove('active');
                const icon = item.querySelector('.dropdown-icon');
                icon.style.transform = '';
                icon.style.removeProperty('transform');
            });
        }
    });
});

// Atualizar o ano no footer
document.addEventListener('DOMContentLoaded', function () {
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
});