// Arquivo: Catalogo/catalogo.js (CORRIGIDO PARA NOVA PASTA)

document.addEventListener('DOMContentLoaded', () => {
    
    const nomeSalvo = localStorage.getItem('nomeUsuario');
    const cpfSalvo = localStorage.getItem('cpfUsuario'); 

    if (nomeSalvo) {
        // Preenche o avatar com a inicial
        const primeiroNome = nomeSalvo.split(' ')[0];
        const elAvatar = document.querySelector('.avatar');
        if(elAvatar) elAvatar.textContent = primeiroNome.charAt(0).toUpperCase();
        
        // --- CORREÇÃO DO CAMINHO DOS PONTOS ---
        // Sai da pasta 'Catalogo' (../) e entra na pasta 'login'
        const caminhoBuscarPontos = '../login/buscar_pontos.php'; 

        if (cpfSalvo) {
            fetch(caminhoBuscarPontos, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ cpf: cpfSalvo })
            })
            .then(response => response.json())
            .then(data => {
                const pontos = parseInt(data.pontos) || 0;
                
                // Atualiza na tela
                const elPontos = document.getElementById('pontosDisplay');
                if(elPontos) elPontos.textContent = pontos;
                
                // Atualiza na memória e nos cards
                localStorage.setItem('pontosUsuario', pontos);
                atualizarVisualCards(pontos);
            })
            .catch(err => console.error("Erro ao buscar pontos:", err));
        }
    }
});

// Função que deixa cinza o que não dá pra comprar
function atualizarVisualCards(pontosUsuario) {
    const cards = document.querySelectorAll('.product-card');
    cards.forEach(card => {
        const precoItem = parseInt(card.getAttribute('data-price'));
        if (pontosUsuario < precoItem) {
            card.classList.add('indisponivel');
        } else {
            card.classList.remove('indisponivel');
        }
    });
}

// --- FUNÇÃO DE COMPRA ---
function comprarItem(preco, nomeItem) {
    const cpfUsuario = localStorage.getItem('cpfUsuario');
    
    if (!cpfUsuario) {
        alert("Erro: Faça login novamente.");
        return;
    }

    if(confirm(`Resgatar "${nomeItem}" por ${preco} pontos?`)) {
        document.body.style.cursor = 'wait'; 

        // --- CORREÇÃO DO CAMINHO DA COMPRA ---
        // Sai da pasta 'Catalogo' (../) e entra na pasta 'noacessuser'
        const caminhoCompra = '../noacessuser/processar_compra.php';

        fetch(caminhoCompra, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                cpf: cpfUsuario, 
                preco: preco, 
                item: nomeItem 
            })
        })
        .then(response => response.json())
        .then(data => {
            document.body.style.cursor = 'default';

            if (data.success) {
                // SUCESSO!
                alert(data.message);
                
                // Atualiza o saldo VISUALMENTE com o valor que veio do banco
                const novoSaldo = data.novoSaldo;
                document.getElementById('pontosDisplay').textContent = novoSaldo;
                localStorage.setItem('pontosUsuario', novoSaldo);
                
                // Atualiza os cartões (escurece os caros)
                atualizarVisualCards(novoSaldo);

            } else {
                // ERRO (Saldo insuficiente ou erro no PHP)
                alert("Ops! " + data.message);
            }
        })
        .catch(err => {
            document.body.style.cursor = 'default';
            console.error(err);
            alert("Erro de conexão. Verifique se o caminho do arquivo processar_compra.php está correto.");
        });
    }
}