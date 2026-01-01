<?php
// Arquivo: login/login.php
header('Content-Type: application/json');

// Ajuste o caminho conforme sua pasta (conexao.db ou apenas conexaoBanco.php)
require '../conexao.db/conexaoBanco.php'; 

$data = json_decode(file_get_contents("php://input"));
$cpf = $data->cpf; 
$senha = $data->senha;

if(empty($cpf) || empty($senha)) {
    echo json_encode(["success" => false, "message" => "Preencha todos os campos!"]);
    exit;
}

// Busca nome e PONTOS
$sql = "SELECT id, nome, senha_hash, pontos FROM usuarios WHERE cpf = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $cpf);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $usuario = $result->fetch_assoc();
    
    if ($senha === $usuario['senha_hash']) {
        echo json_encode([
            "success" => true, 
            "message" => "Login realizado!",
            "nome" => $usuario['nome'],
            "cpf" => $cpf,
            "pontos" => $usuario['pontos'] // <--- ESSA LINHA ENVIA OS PONTOS
        ]);
    } else {
        echo json_encode(["success" => false, "message" => "Senha incorreta."]);
    }
} else {
    echo json_encode(["success" => false, "message" => "CPF não encontrado."]);
}
$conn->close();
?>