//Script da tela de Cadastro resgiter
document.addEventListener("DOMContentLoaded", function () {
  const telefoneInput = document.getElementById("telefone");
  const cpfInput = document.getElementById("cpf");

  // Máscara telefone (99 99999-9999)
  telefoneInput.addEventListener("input", function (e) {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 11) value = value.slice(0, 11);

    if (value.length <= 2) {
      e.target.value = value;
    } else if (value.length <= 7) {
      e.target.value = `${value.slice(0, 2)} ${value.slice(2)}`;
    } else if (value.length <= 11) {
      e.target.value = `${value.slice(0, 2)} ${value.slice(2, 7)}-${value.slice(7)}`;
    }
  });

  // Validação CPF (somente números e até 11 dígitos)
  cpfInput.addEventListener("input", function (e) {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 11) value = value.slice(0, 11);
    e.target.value = value;
  });
});
