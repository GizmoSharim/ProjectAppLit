document.addEventListener('DOMContentLoaded', () => {
    
    // ... (Partes do Olho Mágico e CPF iguais ao anterior, pode manter) ...
    // Vou focar apenas na parte do LOGIN que mudou:

    const loginForm = document.getElementById('loginForm');
    const cpfInput = document.getElementById('cpf');
    const togglePassword = document.getElementById('togglePassword');
    const passwordInput = document.getElementById('password');

    // Lógica do Olho
    if(togglePassword) {
        togglePassword.addEventListener('click', () => {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            togglePassword.classList.toggle('ph-eye');
            togglePassword.classList.toggle('ph-eye-slash');
        });
    }

    // Máscara CPF
    if(cpfInput){
        cpfInput.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, "");
            value = value.replace(/(\d{3})(\d)/, "$1.$2");
            value = value.replace(/(\d{3})(\d)/, "$1.$2");
            value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
            e.target.value = value;
        });
    }

    if(loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const cpf = document.getElementById('cpf').value;
            const senha = document.getElementById('password').value;
            const btn = document.querySelector('.btn-login');
    
            btn.textContent = "Verificando...";
            btn.style.opacity = "0.7";
            
            fetch('login.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ cpf: cpf, senha: senha })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    // --- AQUI ESTAVA FALTANDO ---
                    localStorage.setItem('nomeUsuario', data.nome);
                    localStorage.setItem('pontosUsuario', data.pontos); // <--- SALVA OS PONTOS AGORA
                    localStorage.setItem('cpfUsuario', data.cpf);
                    
                    btn.textContent = "Entrando...";
                    btn.style.backgroundColor = "#166534";
    
                    setTimeout(() => {
                        window.location.href = "../dashboard.html";
                    }, 1000);
                } else {
                    alert(data.message); 
                    btn.textContent = "Entrar";
                    btn.style.opacity = "1";
                    btn.style.backgroundColor = "";
                }
            })
            .catch(error => {
                console.error('Erro:', error);
                btn.textContent = "Erro no Servidor";
                alert("Erro ao conectar. Verifique o XAMPP e o arquivo login.php");
            });
        });
    }
});