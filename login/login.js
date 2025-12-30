document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Lógica do Olho Mágico (MANTER IGUAL)
    const togglePassword = document.getElementById('togglePassword');
    const passwordInput = document.getElementById('password');

    togglePassword.addEventListener('click', () => {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);

        if (type === 'text') {
            togglePassword.classList.replace('ph-eye', 'ph-eye-slash');
        } else {
            togglePassword.classList.replace('ph-eye-slash', 'ph-eye');
        }
    });

    // 2. Máscara de CPF (MANTER IGUAL)
    const cpfInput = document.getElementById('cpf');

    cpfInput.addEventListener('input', (e) => {
        let value = e.target.value;
        value = value.replace(/\D/g, "");
        value = value.replace(/(\d{3})(\d)/, "$1.$2");
        value = value.replace(/(\d{3})(\d)/, "$1.$2");
        value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
        e.target.value = value;
    });

    // 3. Login REAL com PHP e Banco de Dados (ESTA PARTE MUDOU)
    const loginForm = document.getElementById('loginForm');

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Impede a página de recarregar
        
        const cpf = document.getElementById('cpf').value;
        const senha = document.getElementById('password').value;
        const btn = document.querySelector('.btn-login');

        // Feedback visual para o usuário
        btn.textContent = "Verificando...";
        btn.style.opacity = "0.7";
        
        // Envia os dados para o arquivo login.php
        fetch('login.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ cpf: cpf, senha: senha })
        })
        .then(response => response.json()) // Espera uma resposta JSON do PHP
        .then(data => {
            if (data.success) {
                // SUCESSO:
                // 1. Salva o nome do usuário para usar no Dashboard
                localStorage.setItem('nomeUsuario', data.nome);
                
                // 2. Muda o botão para verde
                btn.textContent = "Entrando...";
                btn.style.backgroundColor = "#166534"; // Verde escuro

                // 3. Redireciona após 1 segundo
                setTimeout(() => {
                    window.location.href = "../dashboard.html";
                }, 1000);

            } else {
                // ERRO (Senha errada ou usuário não existe):
                alert(data.message); 
                
                // Reseta o botão
                btn.textContent = "Entrar";
                btn.style.opacity = "1";
                btn.style.backgroundColor = ""; // Volta a cor original
            }
        })
        .catch(error => {
            console.error('Erro:', error);
            btn.textContent = "Erro no Servidor";
            alert("Erro ao conectar com o servidor. Verifique se o XAMPP está ligado.");
        });
    });
});