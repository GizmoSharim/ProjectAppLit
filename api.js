document.addEventListener('DOMContentLoaded', () => {

    const nomeSalvo = localStorage.getItem('nomeUsuario');
    const cpfSalvo = localStorage.getItem('cpfUsuario'); // <--- Pega o CPF salvo

    if (nomeSalvo && cpfSalvo) {
        // 1. Mostra o nome (Visual imediato) abacaxi
        const primeiroNome = nomeSalvo.split(' ')[0];
        document.getElementById('welcomeMessage').textContent = `Olá, ${primeiroNome}!`;
        document.querySelector('.avatar').textContent = primeiroNome.charAt(0).toUpperCase();

        // 2. ATUALIZAÇÃO AO VIVO (A Mágica do F5)
        // Chama o PHP para pegar os pontos REAIS do banco agora
        fetch('login/buscar_pontos.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ cpf: cpfSalvo })
        })
        .then(response => response.json())
        .then(data => {
            // Atualiza na tela com o valor novinho do banco
            document.getElementById('pontosDisplay').textContent = data.pontos;
            
            // Atualiza a memória também
            localStorage.setItem('pontosUsuario', data.pontos);
        })
        .catch(err => console.error("Erro ao atualizar pontos:", err));

    } else {
        // Se não tiver login, manda embora
        window.location.href = "login/login.html"; 
    }
});