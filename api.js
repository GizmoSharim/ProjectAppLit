document.addEventListener('DOMContentLoaded', () => {
    
    // Botão Criar Nova Tarefa
    const btnNovaTarefa = document.getElementById('btnNovaTarefa');
    
    btnNovaTarefa.addEventListener('click', () => {
        // Simulação de ação
        const titulo = prompt("Digite o nome da nova tarefa:");
        if (titulo) {
            adicionarTarefa(titulo);
        }
    });

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