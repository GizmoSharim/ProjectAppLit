<?php
    $dbHost = 'localhost';
    $dbUsername = 'root';
    $dbPassword = '@GeovanniMat20';
    $dbName = 'formulario_teste';

    $conexao =  new mysqli($dbHost, $dbUsername, $dbPassword, $dbName);

    if ($conexao->connect_error) {
       echo "error";
    }else {

        echo "Conexão realiada com sucesso!";
    }
?>