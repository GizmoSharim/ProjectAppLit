<?php
// Arquivo: login/login.php

// Define que a resposta será um JSON (para o Javascript entender)
header('Content-Type: application/json');

// IMPORTANTE: O caminho '../' volta uma pasta para achar o conexaoBanco.php
require '../conexao.db/conexaoBanco.php'; 

// 1. Recebe os dados enviados pelo Javascript (login.js)
$data = json_decode(file_get_contents("php://input"));

// Aqui garantimos que estamos pegando o CPF
$cpf = $data->cpf; 
$senha = $data->senha;

// Verifica se os campos não estão vazios
if(empty($cpf) || empty($senha)) {
    echo json_encode(["success" => false, "message" => "Preencha todos os campos!"]);
    exit;
}

// 2. A QUERY SQL (A parte mais importante)
// O 'WHERE cpf = ?' garante que estamos buscando pelo CPF
$sql = "SELECT id, nome, senha_hash FROM usuarios WHERE cpf = ?";

// Prepara o comando para evitar invasões (SQL Injection)
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $cpf);
$stmt->execute();
$result = $stmt->get_result();

// 3. Verifica se achou alguém com esse CPF
if ($result->num_rows > 0) {
    $usuario = $result->fetch_assoc();
    
    // 4. Verifica a Senha
    // OBS: Se você gravou a senha pura no banco (ex: '123456'), use a comparação simples:
    if ($senha === $usuario['senha_hash']) {
        
        // SUCESSO! Devolve o nome para o JS
        echo json_encode([
            "success" => true, 
            "message" => "Login realizado!",
            "nome" => $usuario['nome']
        ]);
        
    } else {
        // Senha errada
        echo json_encode(["success" => false, "message" => "Senha incorreta."]);
    }
} else {
    // CPF não existe no banco
    echo json_encode(["success" => false, "message" => "CPF não encontrado."]);
}

$conn->close();
?>