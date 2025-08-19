//Script da tela de Login
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const cpfInput = document.getElementById('cpf');
    const passwordInput = document.getElementById('password');
    const togglePassword = document.getElementById('togglePassword');
    const cpfFeedback = document.getElementById('cpfFeedback');
    const passwordFeedback = document.getElementById('passwordFeedback');

    // Alternar visibilidade da senha
    togglePassword.addEventListener('click', function() {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        this.classList.toggle('fa-eye');
        this.classList.toggle('fa-eye-slash');
    });

    // Formatação automática do CPF
    cpfInput.addEventListener('input', function() {
        let value = this.value.replace(/\D/g, '');
        
        if (value.length > 3) {
            value = value.replace(/^(\d{3})/, '$1.');
        }
        if (value.length > 7) {
            value = value.replace(/^(\d{3})\.(\d{3})/, '$1.$2.');
        }
        if (value.length > 11) {
            value = value.replace(/^(\d{3})\.(\d{3})\.(\d{3})/, '$1.$2.$3-');
        }
        
        this.value = value.substring(0, 14);
        validateCPF(value);
    });

    // Validação de CPF em tempo real
    function validateCPF(cpf) {
        // Remove caracteres não numéricos
        cpf = cpf.replace(/\D/g, '');
        
        if (!cpf) {
            cpfInput.classList.remove('success', 'error');
            cpfFeedback.classList.remove('show');
            return false;
        }

        // Verifica se tem 11 dígitos
        if (cpf.length !== 11) {
            cpfInput.classList.remove('success');
            cpfInput.classList.add('error');
            cpfFeedback.textContent = 'CPF deve ter 11 dígitos';
            cpfFeedback.classList.add('show');
            return false;
        }

        // Verifica se todos os dígitos são iguais (inválido)
        if (/^(\d)\1{10}$/.test(cpf)) {
            cpfInput.classList.remove('success');
            cpfInput.classList.add('error');
            cpfFeedback.textContent = 'CPF inválido';
            cpfFeedback.classList.add('show');
            return false;
        }

        // Validação dos dígitos verificadores
        let sum = 0;
        let remainder;
        
        for (let i = 1; i <= 9; i++) {
            sum += parseInt(cpf.substring(i-1, i)) * (11 - i);
        }
        remainder = (sum * 10) % 11;
        
        if ((remainder === 10) || (remainder === 11)) {
            remainder = 0;
        }
        if (remainder !== parseInt(cpf.substring(9, 10))) {
            cpfInput.classList.remove('success');
            cpfInput.classList.add('error');
            cpfFeedback.textContent = 'CPF inválido';
            cpfFeedback.classList.add('show');
            return false;
        }
        
        sum = 0;
        for (let i = 1; i <= 10; i++) {
            sum += parseInt(cpf.substring(i-1, i)) * (12 - i);
        }
        remainder = (sum * 10) % 11;
        
        if ((remainder === 10) || (remainder === 11)) {
            remainder = 0;
        }
        if (remainder !== parseInt(cpf.substring(10, 11))) {
            cpfInput.classList.remove('success');
            cpfInput.classList.add('error');
            cpfFeedback.textContent = 'CPF inválido';
            cpfFeedback.classList.add('show');
            return false;
        }
        
        cpfInput.classList.remove('error');
        cpfInput.classList.add('success');
        cpfFeedback.classList.remove('show');
        return true;
    }

    // Validação de senha em tempo real
    passwordInput.addEventListener('input', function() {
        if (!this.value) {
            this.classList.remove('success', 'error');
            passwordFeedback.classList.remove('show');
            return;
        }

        if (this.value.length >= 6) {
            this.classList.remove('error');
            this.classList.add('success');
            passwordFeedback.classList.remove('show');
        } else {
            this.classList.remove('success');
            this.classList.add('error');
            passwordFeedback.textContent = 'A senha deve ter pelo menos 6 caracteres';
            passwordFeedback.classList.add('show');
        }
    });

    // Validação do formulário
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let isValid = true;

        // Validar CPF
        const cpfValid = validateCPF(cpfInput.value);
        if (!cpfValid) {
            cpfInput.classList.add('error');
            cpfFeedback.textContent = 'Por favor, insira um CPF válido';
            cpfFeedback.classList.add('show');
            isValid = false;
        }

        // Validar senha
        if (!passwordInput.value || passwordInput.value.length < 6) {
            passwordInput.classList.add('error');
            passwordFeedback.textContent = 'A senha deve ter pelo menos 6 caracteres';
            passwordFeedback.classList.add('show');
            isValid = false;
        }

        if (isValid) {
            // Simular envio do formulário
            console.log('Formulário válido. Enviando...');
            // Aqui você pode adicionar o código para enviar o formulário
            alert('Login realizado com sucesso! (Simulação)');
        }
    });
});