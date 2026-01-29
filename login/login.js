// Elementos do DOM
let interesseForm;
let faqItems;
let faqQuestions;

// Inicialização quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function () {
    inicializarElementosEnvolvaSe();
    inicializarListenersEnvolvaSe();
    atualizarAnoRodape();
});

// Inicializa os elementos do DOM
function inicializarElementosEnvolvaSe() {
    interesseForm = document.getElementById('interesse-form');
    faqItems = document.querySelectorAll('.faq-item');
    faqQuestions = document.querySelectorAll('.faq-question');
}

// Inicializa os listeners de eventos
function inicializarListenersEnvolvaSe() {
    // Submissão do formulário de interesse
    if (interesseForm) {
        interesseForm.addEventListener('submit', lidarComInteresse);
    }

    // FAQ - abrir/fechar respostas
    faqQuestions.forEach(question => {
        question.addEventListener('click', alternarFAQ);
    });

    // Máscara para telefone
    const telefoneInput = document.getElementById('telefone');
    if (telefoneInput) {
        telefoneInput.addEventListener('input', aplicarMascaraTelefone);
    }

    // Validação em tempo real
    const camposObrigatorios = interesseForm.querySelectorAll('[required]');
    camposObrigatorios.forEach(campo => {
        campo.addEventListener('blur', validarCampo);
        campo.addEventListener('input', limparErroCampo);
    });
}

// Atualiza o ano no rodapé
function atualizarAnoRodape() {
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

// Lida com o envio do formulário de interesse
async function lidarComInteresse(evento) {
    evento.preventDefault();

    // Valida o formulário
    const valido = validarFormularioInteresse();
    if (!valido) {
        return;
    }

    // Prepara os dados
    const formData = new FormData(evento.target);
    const dados = {
        nome: formData.get('nome'),
        email: formData.get('email'),
        telefone: formData.get('telefone'),
        envolvimento: Array.from(formData.getAll('envolvimento')),
        mensagem: formData.get('mensagem'),
        newsletter: formData.get('newsletter') === 'on',
        dataEnvio: new Date().toISOString()
    };

    // Mostra estado de carregamento
    const botaoEnviar = evento.target.querySelector('button[type="submit"]');
    const textoBtn = botaoEnviar.querySelector('.btn-text');
    const loadingBtn = botaoEnviar.querySelector('.btn-loading');

    textoBtn.style.display = 'none';
    loadingBtn.style.display = 'inline-flex';
    botaoEnviar.disabled = true;

    try {
        // Simula envio para API (substitua por sua implementação real)
        await enviarParaAPI(dados);

        // Sucesso
        mostrarMensagemSucesso('Seu interesse foi registrado com sucesso! Entraremos em contato em breve.');
        interesseForm.reset();

        // Rola para a mensagem de sucesso
        setTimeout(() => {
            const sucessoMsg = document.querySelector('.form-success');
            if (sucessoMsg) {
                sucessoMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }, 100);

    } catch (erro) {
        // Erro
        mostrarMensagemErro('Ocorreu um erro ao enviar seu interesse. Por favor, tente novamente.');
        console.error('Erro no envio:', erro);
    } finally {
        // Restaura estado do botão
        textoBtn.style.display = 'inline';
        loadingBtn.style.display = 'none';
        botaoEnviar.disabled = false;
    }
}

// Valida o formulário de interesse
function validarFormularioInteresse() {
    let valido = true;
    const campos = interesseForm.querySelectorAll('[required]');

    // Limpa erros anteriores
    limparTodosErros();

    // Valida campos obrigatórios
    campos.forEach(campo => {
        if (!campo.value.trim()) {
            mostrarErroCampo(campo, 'Este campo é obrigatório');
            valido = false;
        }
    });

    // Valida e-mail
    const emailInput = document.getElementById('email');
    if (emailInput.value && !validarEmail(emailInput.value)) {
        mostrarErroCampo(emailInput, 'Digite um e-mail válido');
        valido = false;
    }

    // Valida telefone
    const telefoneInput = document.getElementById('telefone');
    if (telefoneInput.value && !validarTelefone(telefoneInput.value)) {
        mostrarErroCampo(telefoneInput, 'Digite um telefone válido');
        valido = false;
    }

    // Valida pelo menos uma opção de envolvimento
    const opcoesSelecionadas = interesseForm.querySelectorAll('input[name="envolvimento"]:checked');
    if (opcoesSelecionadas.length === 0) {
        const grupoOpcoes = document.querySelector('.envolvimento-options');
        mostrarErroGrupo(grupoOpcoes, 'Selecione pelo menos uma opção');
        valido = false;
    }

    if (!valido) {
        // Foca no primeiro erro
        const primeiroErro = interesseForm.querySelector('.error');
        if (primeiroErro) {
            primeiroErro.focus();
        }
    }

    return valido;
}

// Valida formato de e-mail
function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Valida formato de telefone
function validarTelefone(telefone) {
    // Aceita (11) 99999-9999 ou 11999999999
    const regex = /^(\(\d{2}\)\s?)?\d{4,5}-?\d{4}$/;
    return regex.test(telefone);
}

// Aplica máscara de telefone
function aplicarMascaraTelefone(evento) {
    let valor = evento.target.value.replace(/\D/g, '');
    
    if (valor.length <= 10) {
        valor = valor.replace(/^(\d{2})(\d)/g, '($1) $2');
        valor = valor.replace(/(\d{4})(\d)/, '$1-$2');
    } else {
        valor = valor.replace(/^(\d{2})(\d)/g, '($1) $2');
        valor = valor.replace(/(\d{5})(\d)/, '$1-$2');
    }
    
    evento.target.value = valor;
}

// Alterna FAQ
function alternarFAQ(evento) {
    const item = evento.currentTarget.parentElement;
    
    // Fecha outros itens
    faqItems.forEach(otherItem => {
        if (otherItem !== item && otherItem.classList.contains('active')) {
            otherItem.classList.remove('active');
            const answer = otherItem.querySelector('.faq-answer');
            answer.style.maxHeight = null;
        }
    });
    
    // Alterna item atual
    item.classList.toggle('active');
    const answer = item.querySelector('.faq-answer');
    
    if (item.classList.contains('active')) {
        answer.style.maxHeight = answer.scrollHeight + 'px';
    } else {
        answer.style.maxHeight = null;
    }
}

// Funções de validação e mensagens
function mostrarErroCampo(campo, mensagem) {
    campo.classList.add('error');
    
    let elementoErro = campo.parentNode.querySelector('.error-message');
    if (!elementoErro) {
        elementoErro = document.createElement('div');
        elementoErro.className = 'error-message';
        elementoErro.style.cssText = `
            color: var(--erro);
            font-size: 0.85rem;
            margin-top: 5px;
            display: flex;
            align-items: center;
            gap: 5px;
        `;
        campo.parentNode.appendChild(elementoErro);
    }
    
    elementoErro.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${mensagem}`;
    elementoErro.id = `error-${campo.name}`;
    
    // Atualiza atributos ARIA
    campo.setAttribute('aria-invalid', 'true');
    campo.setAttribute('aria-describedby', elementoErro.id);
}

function mostrarErroGrupo(grupo, mensagem) {
    let elementoErro = grupo.parentNode.querySelector('.error-message');
    if (!elementoErro) {
        elementoErro = document.createElement('div');
        elementoErro.className = 'error-message';
        elementoErro.style.cssText = `
            color: var(--erro);
            font-size: 0.85rem;
            margin-top: 5px;
            display: flex;
            align-items: center;
            gap: 5px;
        `;
        grupo.parentNode.appendChild(elementoErro);
    }
    
    elementoErro.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${mensagem}`;
}

function limparErroCampo(evento) {
    const campo = evento.target;
    campo.classList.remove('error');
    
    const elementoErro = campo.parentNode.querySelector('.error-message');
    if (elementoErro) {
        elementoErro.remove();
    }
    
    campo.removeAttribute('aria-invalid');
    campo.removeAttribute('aria-describedby');
}

function limparTodosErros() {
    const erros = document.querySelectorAll('.error-message');
    erros.forEach(erro => erro.remove());
    
    const camposErro = document.querySelectorAll('.error');
    camposErro.forEach(campo => {
        campo.classList.remove('error');
        campo.removeAttribute('aria-invalid');
        campo.removeAttribute('aria-describedby');
    });
}

function validarCampo(evento) {
    const campo = evento.target;
    const valor = campo.value.trim();
    let valido = true;
    let mensagem = '';

    if (campo.required && !valor) {
        valido = false;
        mensagem = 'Este campo é obrigatório';
    } else if (campo.type === 'email' && valor && !validarEmail(valor)) {
        valido = false;
        mensagem = 'Digite um e-mail válido';
    } else if (campo.id === 'telefone' && valor && !validarTelefone(valor)) {
        valido = false;
        mensagem = 'Digite um telefone válido';
    }

    if (!valido) {
        mostrarErroCampo(campo, mensagem);
    } else {
        limparErroCampo(evento);
    }

    return valido;
}

// Mostra mensagem de sucesso
function mostrarMensagemSucesso(mensagem) {
    // Remove mensagens existentes
    const mensagensExistentes = document.querySelectorAll('.form-success, .form-error');
    mensagensExistentes.forEach(msg => msg.remove());

    // Cria nova mensagem de sucesso
    const divMensagem = document.createElement('div');
    divMensagem.className = 'form-success';
    divMensagem.innerHTML = `
        <i class="fas fa-check-circle"></i>
        ${mensagem}
    `;

    // Insere antes do formulário
    interesseForm.parentNode.insertBefore(divMensagem, interesseForm);

    // Remove automaticamente após 10 segundos
    setTimeout(() => {
        if (divMensagem.parentNode) {
            divMensagem.remove();
        }
    }, 10000);
}

// Mostra mensagem de erro
function mostrarMensagemErro(mensagem) {
    // Remove mensagens existentes
    const mensagensExistentes = document.querySelectorAll('.form-success, .form-error');
    mensagensExistentes.forEach(msg => msg.remove());

    // Cria nova mensagem de erro
    const divMensagem = document.createElement('div');
    divMensagem.className = 'form-error';
    divMensagem.innerHTML = `
        <i class="fas fa-exclamation-triangle"></i>
        ${mensagem}
    `;

    // Insere antes do formulário
    interesseForm.parentNode.insertBefore(divMensagem, interesseForm);

    // Remove automaticamente após 10 segundos
    setTimeout(() => {
        if (divMensagem.parentNode) {
            divMensagem.remove();
        }
    }, 10000);
}

// Simula envio para API
async function enviarParaAPI(dados) {
    // Em produção, substitua por uma chamada real para sua API
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Simula sucesso 90% das vezes
            if (Math.random() > 0.1) {
                resolve({ success: true, message: 'Interesse registrado' });
            } else {
                reject(new Error('Erro de servidor simulado'));
            }
        }, 1500);
    });
}

// Atalhos de teclado
document.addEventListener('keydown', function (evento) {
    // Ctrl/Cmd + Enter para enviar formulário
    if ((evento.ctrlKey || evento.metaKey) && evento.key === 'Enter') {
        if (interesseForm) {
            const botaoEnviar = interesseForm.querySelector('button[type="submit"]');
            if (botaoEnviar && !botaoEnviar.disabled) {
                botaoEnviar.click();
            }
        }
    }

    // Espaço ou Enter em perguntas FAQ
    if ((evento.key === ' ' || evento.key === 'Enter') && 
        evento.target.classList.contains('faq-question')) {
        evento.preventDefault();
        alternarFAQ(evento);
    }
});

// Exporta funções para uso potencial
window.EnvolvaSeApp = {
    lidarComInteresse,
    alternarFAQ,
    validarFormularioInteresse,
    mostrarMensagemSucesso,
    mostrarMensagemErro
};

// Inicialização quando a página carrega
window.addEventListener('load', function() {
});