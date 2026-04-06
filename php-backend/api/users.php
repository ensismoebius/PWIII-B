<?php

require_once __DIR__ . '/../db.php';

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

try {
    $users = query_all('SELECT id, name, email FROM users');
    echo json_encode($users, JSON_UNESCAPED_UNICODE);
} catch (Throwable $exception) {
    error_log('Erro em /api/users (PHP): ' . $exception->getMessage());
    http_response_code(500);
    echo json_encode(['error' => $exception->getMessage()], JSON_UNESCAPED_UNICODE);
}
