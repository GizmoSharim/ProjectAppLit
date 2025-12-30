<?php
// conexaoBanco.php
$host = "localhost";
$user = "root";
$pass = ""; // No XAMPP padrão, a senha é vazia
$dbname = "nexup_db";

$conn = new mysqli($host, $user, $pass, $dbname);

if ($conn->connect_error) {
    die("Falha na conexão: " . $conn->connect_error);
}
?>