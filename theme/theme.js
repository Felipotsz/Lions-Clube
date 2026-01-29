// Sistema de tema escuro/claro (modo escuro como principal)
document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('themeToggle');
    const htmlElement = document.documentElement;
    
    // Verificar preferência salva
    const savedTheme = localStorage.getItem('theme');
    
    // Aplicar tema salvo ou usar modo escuro como padrão
    if (savedTheme) {
        htmlElement.setAttribute('data-theme', savedTheme);
    } else {
        // Modo escuro é o padrão principal
        htmlElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    }
    
    // Alternar tema ao clicar no botão
    themeToggle.addEventListener('click', function() {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Efeito visual no botão
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 150);
    });
    
    // Atualizar ícone do botão baseado no tema
    function updateToggleIcon() {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const sunIcon = document.querySelector('.sun-icon');
        const moonIcon = document.querySelector('.moon-icon');
        
        if (currentTheme === 'dark') {
            // Modo escuro ativo
            sunIcon.style.opacity = '0';
            moonIcon.style.opacity = '1';
        } else {
            // Modo claro ativo
            sunIcon.style.opacity = '1';
            moonIcon.style.opacity = '0';
        }
    }
    
    // Observar mudanças no atributo data-theme
    const observer = new MutationObserver(updateToggleIcon);
    observer.observe(htmlElement, { attributes: true, attributeFilter: ['data-theme'] });
    
    // Inicializar ícone
    updateToggleIcon();
});