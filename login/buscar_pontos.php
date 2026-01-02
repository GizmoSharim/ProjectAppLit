<?php
header('Content-Type: application/json');
require '../conexao.db/conexaoBanco.php'; // Ou '../conexaoBanco.php' dependendo da sua pasta

$data = json_decode(file_get_contents("php://input"));
$cpf = $data->cpf;

if(empty($cpf)) {
    echo json_encode(["pontos" => 0]);
    exit;
}

// Busca SÓ os pontos atualizados
$sql = "SELECT pontos FROM usuarios WHERE cpf = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $cpf);
$stmt->execute();
$result = $stmt->get_result();

if ($row = $result->fetch_assoc()) {
    echo json_encode(["pontos" => $row['pontos']]);
} else {
    echo json_encode(["pontos" => 0]);
}
?>