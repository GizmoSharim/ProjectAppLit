<?php
// Arquivo: ProjectAppLit/login/processar_compra.php

header('Content-Type: application/json');

// Ajuste o caminho da conexão conforme sua estrutura
// Se este arquivo está em 'login/', e a conexão em 'conexao.db/'
require '../conexao.db/conexaoBanco.php'; 

// 1. Recebe os dados do Javascript
$data = json_decode(file_get_contents("php://input"));
$cpf = $data->cpf;
$preco = $data->preco;
$item = $data->item;

// Validação básica
if(empty($cpf) || empty($preco)) {
    echo json_encode(["success" => false, "message" => "Dados incompletos."]);
    exit;
}

// 2. Verifica o saldo ATUAL no banco (Segurança contra fraudes)
$sql = "SELECT pontos FROM usuarios WHERE cpf = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $cpf);
$stmt->execute();
$result = $stmt->get_result();
$usuario = $result->fetch_assoc();

if (!$usuario) {
    echo json_encode(["success" => false, "message" => "Usuário não encontrado."]);
    exit;
}

$pontosAtuais = intval($usuario['pontos']);

// 3. A Lógica da Compra
if ($pontosAtuais >= $preco) {
    
    // Tem saldo! Vamos descontar.
    $novosPontos = $pontosAtuais - $preco;
    
    $updateSql = "UPDATE usuarios SET pontos = ? WHERE cpf = ?";
    $updateStmt = $conn->prepare($updateSql);
    $updateStmt->bind_param("is", $novosPontos, $cpf);
    
    if ($updateStmt->execute()) {
        // Sucesso!
        echo json_encode([
            "success" => true, 
            "message" => "Resgate de '$item' realizado com sucesso!",
            "novoSaldo" => $novosPontos
        ]);
    } else {
        echo json_encode(["success" => false, "message" => "Erro ao atualizar banco de dados."]);
    }

} else {
    // Não tem saldo (Tentou burlar o frontend?)
    echo json_encode(["success" => false, "message" => "Saldo insuficiente no banco de dados!"]);
}
?>