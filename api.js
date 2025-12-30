document.addEventListener('DOMContentLoaded', () => {

    // 1. Recupera o nome salvo no Login
    const nomeUsuario = localStorage.getItem('nomeUsuario');
    
    // 2. Se tiver nome, atualiza o texto.
    if (nomeUsuario) {
        // Pega apenas o primeiro nome
        const primeiroNome = nomeUsuario.split(' ')[0];
        document.getElementById('welcomeMessage').textContent = `Olá, ${primeiroNome}!`;
        
        // Atualiza a bolinha do avatar
        const avatarElement = document.querySelector('.avatar');
        if (avatarElement) {
            avatarElement.textContent = primeiroNome.charAt(0).toUpperCase();
        }
    } else {
        // Se quiser ativar a proteção de login, descomente a linha abaixo:
        window.location.href = "login/login.html";
    }

    // A lógica dos botões foi removida pois os botões foram apagados do HTML.

    // Botão Gerar Relatório
    const btnRelatorio = document.getElementById('btnRelatorio');
    
    btnRelatorio.addEventListener('click', () => {
        btnRelatorio.textContent = "Gerando...";
        btnRelatorio.disabled = true;
        
        setTimeout(() => {
            alert("Relatório gerado com sucesso!");
            btnRelatorio.textContent = "Gerar Relatório";
            btnRelatorio.disabled = false;
        }, 1500);
    });

    // Função auxiliar para adicionar visualmente a tarefa na lista
    function adicionarTarefa(texto) {
        const lista = document.querySelector('.task-list');
        const novoItem = document.createElement('li');
        
        novoItem.innerHTML = `
            <i class="ph ph-circle"></i>
            <span>${texto}</span>
        `;
        
        // Adiciona no topo da lista
        lista.insertBefore(novoItem, lista.firstChild);
    }
});