// Controle das abas (para Leos e Lions)
const initializeTabs = () => {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    if (tabBtns.length === 0 || tabPanes.length === 0) {
        console.log('Nenhuma aba encontrada para inicializar');
        return;
    }
    
    console.log(`Encontradas ${tabBtns.length} abas e ${tabPanes.length} painéis`);
    
    // Função para ativar uma aba específica
    const activateTab = (btn) => {
        const tabId = btn.getAttribute('data-tab');
        console.log(`Ativando aba: ${tabId}`);
        
        // Remover classe active de todos os botões e painéis
        tabBtns.forEach(b => b.classList.remove('active'));
        tabPanes.forEach(p => p.classList.remove('active'));
        
        // Adicionar classe active ao botão clicado
        btn.classList.add('active');
        
        // Encontrar o painel correspondente
        let targetPane = null;
        
        // Tentar todas as combinações possíveis de ID
        const possibleIds = [
            tabId,
            tabId.includes('-tab') ? tabId : `${tabId}-tab`,
            tabId.replace('-tab', '')
        ];
        
        for (const id of possibleIds) {
            targetPane = document.getElementById(id);
            if (targetPane) {
                console.log(`Encontrado painel com ID: ${id}`);
                targetPane.classList.add('active');
                break;
            }
        }
        
        if (!targetPane) {
            console.error(`Nenhum painel encontrado para a aba: ${tabId}`);
            console.log('IDs disponíveis:', Array.from(tabPanes).map(p => p.id));
        }
    };
    
    // Adicionar event listeners às abas
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            activateTab(this);
        });
    });
    
    // Verificar se há abas ativas e garantir que a primeira esteja ativa
    const activeTabs = document.querySelectorAll('.tab-btn.active');
    if (activeTabs.length === 0 && tabBtns.length > 0) {
        // Ativar primeira aba
        activateTab(tabBtns[0]);
    }
    
    // Log para debugging
    console.log('Sistema de abas inicializado com sucesso!');
};

// Controle do FAQ (para Leos e Lions)
const initializeFAQ = () => {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    if (faqQuestions.length === 0) {
        console.log('Nenhuma pergunta FAQ encontrada');
        return;
    }
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            // Toggle da resposta
            const answer = this.nextElementSibling;
            const icon = this.querySelector('i');
            
            answer.classList.toggle('active');
            
            // Rotacionar ícone
            if (answer.classList.contains('active')) {
                icon.style.transform = 'rotate(180deg)';
            } else {
                icon.style.transform = 'rotate(0deg)';
            }
            
            // Fechar outras respostas abertas (opcional)
            // faqQuestions.forEach(otherQuestion => {
            //     if (otherQuestion !== this) {
            //         const otherAnswer = otherQuestion.nextElementSibling;
            //         const otherIcon = otherQuestion.querySelector('i');
            //         otherAnswer.classList.remove('active');
            //         otherIcon.style.transform = 'rotate(0deg)';
            //     }
            // });
        });
    });
    
    // Adicionar classe inicial ao primeiro item FAQ se necessário
    if (faqQuestions.length > 0) {
        const firstAnswer = faqQuestions[0].nextElementSibling;
        if (firstAnswer) {
            firstAnswer.classList.add('active');
            const firstIcon = faqQuestions[0].querySelector('i');
            if (firstIcon) {
                firstIcon.style.transform = 'rotate(180deg)';
            }
        }
    }
    
    console.log(`FAQ inicializado com ${faqQuestions.length} perguntas`);
};

// Inicializar tudo quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM carregado, inicializando componentes...');
    
    // Inicializar abas
    initializeTabs();
    
    // Inicializar FAQ
    initializeFAQ();
    
    // Adicionar animação suave para as transições
    const style = document.createElement('style');
    style.textContent = `
        .tab-pane {
            transition: opacity 0.3s ease, transform 0.3s ease;
        }
        .tab-pane:not(.active) {
            display: none;
        }
        .tab-pane.active {
            display: block;
            animation: fadeIn 0.3s ease;
        }
        .faq-answer {
            transition: max-height 0.3s ease, opacity 0.3s ease;
            max-height: 0;
            overflow: hidden;
            opacity: 0;
        }
        .faq-answer.active {
            max-height: 500px;
            opacity: 1;
        }
        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: translateY(10px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);
    
    console.log('Todos os componentes inicializados com sucesso!');
});

// Para compatibilidade com navegadores mais antigos
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        initializeTabs();
        initializeFAQ();
    });
} else {
    initializeTabs();
    initializeFAQ();
}