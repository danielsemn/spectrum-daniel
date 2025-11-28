
    // --- Lógica do Modo Escuro (Mantida) ---
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const sunIcon = document.getElementById('sun-icon');
    const moonIcon = document.getElementById('moon-icon');

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

    // ... (Mantenha aqui a Lógica do Modo Escuro) ...

    // --- Lógica do Filtro e Dropdown (Nova) ---
    const filtroBotoes = document.querySelectorAll('.filtro-btn');
    const cartoesMedicos = document.querySelectorAll('.medicos');
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    const todosBotao = document.querySelector('.filtro-btn[data-filtro="todos"]');


    // ----------------------------------------------------
    // FUNÇÃO PRINCIPAL PARA ABRIR/FECHAR DROPDOWN
    // ----------------------------------------------------
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            // Previne que o clique no LI pai acione o filtro do LI filho
            if (e.target.tagName !== 'LI') return;

            // Fecha todos os outros dropdowns
            dropdownToggles.forEach(otherToggle => {
                if (otherToggle !== toggle) {
                    otherToggle.classList.remove('open');
                }
            });

            // Alterna a classe 'open' no dropdown clicado
            toggle.classList.toggle('open');
        });
    });

    // ----------------------------------------------------
    // FUNÇÃO PRINCIPAL DE FILTRAGEM DE CARTÕES
    // ----------------------------------------------------
    filtroBotoes.forEach(botao => {
        botao.addEventListener('click', () => {
            
            const filtroValor = botao.getAttribute('data-filtro');

            // 1. Remove a classe 'active' de TODOS os botões de filtro (incluindo os dentro do dropdown)
            filtroBotoes.forEach(btn => btn.classList.remove('active'));
            
            // 2. Adiciona a classe 'active' ao botão clicado
            botao.classList.add('active');
            
            // 3. Fecha todos os dropdowns após a seleção de um item
            dropdownToggles.forEach(toggle => toggle.classList.remove('open'));

            // 4. Executa a filtragem
            cartoesMedicos.forEach(cartao => {
                cartao.style.display = 'flex'; 

                if (filtroValor === 'todos' || filtroValor === 'convenio') {
                    // O filtro 'convenio' ainda não tem funcionalidade, mas garantimos que nada seja escondido
                    cartao.style.display = 'flex';
                } else if (!cartao.classList.contains(filtroValor)) {
                    cartao.style.display = 'none';
                }
            });
        });
    });
    
    // Configura o filtro inicial (para mostrar todos ao carregar a página)
    if(todosBotao) {
        todosBotao.click();
    }

    // --- Lógica do Botão Agendar/Contato (Nova) ---
    document.querySelectorAll('.agendar').forEach(botaoAgendar => {
        botaoAgendar.addEventListener('click', () => {
            const coluna = botaoAgendar.closest('.coluna');
            const contatoInfo = coluna.querySelector('.contato-info');
            
            // Esconde o botão "Agendar"
            botaoAgendar.style.display = 'none';
            
            // Mostra a área de informações de contato
            contatoInfo.style.display = 'flex'; 
        });
    });

    // Lógica para o botão "Fechar"
    document.querySelectorAll('.fechar-contato').forEach(botaoFechar => {
        botaoFechar.addEventListener('click', () => {
            const contatoInfo = botaoFechar.closest('.contato-info');
            const coluna = contatoInfo.closest('.coluna');
            const botaoAgendar = coluna.querySelector('.agendar');

            // Esconde a área de informações de contato
            contatoInfo.style.display = 'none';
            
            // Mostra o botão "Agendar Consulta"
            botaoAgendar.style.display = 'block'; 
        });
    });
