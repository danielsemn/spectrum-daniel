document.addEventListener('DOMContentLoaded', () => {
    
    // --- Lógica do Modo Escuro ---
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const sunIcon = document.getElementById('sun-icon');
    const moonIcon = document.getElementById('moon-icon');

    // O "if" abaixo previne que o site quebre se o botão não existir
    if (themeToggle && sunIcon && moonIcon) {
        themeToggle.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            if (body.classList.contains('dark-mode')) {
                sunIcon.style.display = 'block';
                moonIcon.style.display = 'none';
            } else {
                sunIcon.style.display = 'none';
                moonIcon.style.display = 'block';
            }
        });
    }

    // --- Lógica do Filtro e Dropdown ---
    const filtroBotoes = document.querySelectorAll('.filtro-btn');
    const cartoesMedicos = document.querySelectorAll('.medicos');
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    const todosBotao = document.querySelector('.filtro-btn[data-filtro="todos"]');

    // 1. Abrir/Fechar Dropdown
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            // Impede a propagação se clicar em elementos internos indesejados, mas permite o LI
            e.stopPropagation(); 
            
            // Fecha outros dropdowns abertos
            dropdownToggles.forEach(otherToggle => {
                if (otherToggle !== toggle) {
                    otherToggle.classList.remove('open');
                }
            });

            toggle.classList.toggle('open');
        });
    });

    // Fechar dropdown se clicar fora dele
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.dropdown-toggle')) {
            dropdownToggles.forEach(toggle => toggle.classList.remove('open'));
        }
    });

    // 2. Filtragem de Cartões
    filtroBotoes.forEach(botao => {
        botao.addEventListener('click', (e) => {
            e.stopPropagation(); // Evita conflito com o fechar do dropdown

            const filtroValor = botao.getAttribute('data-filtro');

            // Remove active de todos
            filtroBotoes.forEach(btn => btn.classList.remove('active'));
            // Adiciona active no clicado
            botao.classList.add('active');
            
            // Fecha os dropdowns
            dropdownToggles.forEach(toggle => toggle.classList.remove('open'));

            // Lógica de esconder/mostrar
            cartoesMedicos.forEach(cartao => {
                // Reseta o display para o padrão (flex) antes de testar
                cartao.style.display = 'flex'; 

                if (filtroValor === 'todos') {
                    cartao.style.display = 'flex';
                } else {
                    // Se o cartão NÃO tem a classe do filtro, esconde
                    if (!cartao.classList.contains(filtroValor)) {
                        cartao.style.display = 'none';
                    }
                }
            });
        });
    });

    // Inicializa mostrando todos
    if(todosBotao) {
        todosBotao.click();
    }

    // --- Lógica do Botão Agendar/Contato ---
    document.querySelectorAll('.agendar').forEach(botaoAgendar => {
        botaoAgendar.addEventListener('click', () => {
            const coluna = botaoAgendar.closest('.coluna');
            const contatoInfo = coluna.querySelector('.contato-info');
            
            botaoAgendar.style.display = 'none';
            contatoInfo.style.display = 'flex'; 
        });
    });

    document.querySelectorAll('.fechar-contato').forEach(botaoFechar => {
        botaoFechar.addEventListener('click', () => {
            const contatoInfo = botaoFechar.closest('.contato-info');
            const coluna = contatoInfo.closest('.coluna');
            const botaoAgendar = coluna.querySelector('.agendar');

            contatoInfo.style.display = 'none';
            botaoAgendar.style.display = 'block'; 
        });
    });

});
