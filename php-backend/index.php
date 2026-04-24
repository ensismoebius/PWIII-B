<?php
/**
 * API REST simples para Usuarios
 * Endpoints:
 *   GET    /api/users      - Lista todos os usuarios
 *   GET    /api/users/{id} - Lista um usuario especifico
 *   POST   /api/users      - Cria um usuario
 *   PUT    /api/users/{id} - Atualiza um usuario
 *   DELETE /api/users/{id} - Deleta um usuario
 */

require_once __DIR__ . '/db.php';

// ─── Ajudante: Envia resposta JSON e para a execucao ─────────────────────

function json_response(mixed $data, int $status = 200): void
{
    http_response_code($status);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($data, JSON_UNESCAPED_UNICODE);
    exit;
}

// ─── Ajudante: Pega o corpo da requisicao como array ──────────────────────

function get_request_body(): array
{
    $raw = file_get_contents('php://input');
    $decoded = json_decode($raw, true);
    return is_array($decoded) ? $decoded : [];
}

// ─── Ajudante: Exige que certos campos estejam presentes e nao vazios ─────

function require_fields(array $data, array $fields): void
{
    $empty_fields = [];

    foreach ($fields as $field) {
        if (empty(trim($data[$field] ?? ''))) {
            $empty_fields[] = $field;
        }
    }

    if (!empty($empty_fields)) {
        $field_list = implode(', ', $empty_fields);
        json_response(['error' => "$field_list sao obrigatorios"], 400);
    }
}

// ─── Manipuladores de Rota ─────────────────────────────────────────────────

function handle_get_all_users(): void
{
    json_response(users_get_all());
}

function handle_get_user(int $id): void
{
    $user = users_get_by_id($id);

    if ($user !== null) {
        json_response($user);
    } else {
        json_response(['error' => 'Usuario nao encontrado'], 404);
    }
}

function handle_create_user(): void
{
    $body = get_request_body();
    require_fields($body, ['name', 'email']);

    $name = trim($body['name']);
    $email = trim($body['email']);

    json_response(users_create($name, $email), 201);
}

function handle_update_user(int $id): void
{
    $body = get_request_body();
    require_fields($body, ['name', 'email']);

    $name = trim($body['name']);
    $email = trim($body['email']);

    $user = users_update($id, $name, $email);

    if ($user !== null) {
        json_response($user);
    } else {
        json_response(['error' => 'Usuario nao encontrado'], 404);
    }
}

function handle_delete_user(int $id): void
{
    $deleted = users_delete($id);

    if ($deleted) {
        json_response(null, 204);
    } else {
        json_response(['error' => 'Usuario nao encontrado'], 404);
    }
}

// ─── Configuracao CORS ────────────────────────────────────────────────────

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

// ─── Analisa a requisicao recebida ───────────────────────────────────────

$path = $_SERVER['REQUEST_URI'];
$method = $_SERVER['REQUEST_METHOD'];

if (!preg_match('#^/api(?:/(?P<resource>\w+)(?:/(?P<id>\d+))?)?$#', $path, $matches)) {
    json_response(['error' => 'Rota nao encontrada'], 404);
}

$resource = $matches['resource'] ?? null;
$resource_id = $matches['id'] ?? null;

// ─── Despacha para o manipulador ─────────────────────────────────────────

try {
    if ($resource === null) {
        json_response(['message' => 'API esta rodando'], 200);
    }

    if ($resource === 'users') {
        match ($method . ($resource_id !== null ? ':id' : '')) {
            'GET:id' => handle_get_user((int) $resource_id),
            'GET' => handle_get_all_users(),
            'POST' => handle_create_user(),
            'PUT:id' => handle_update_user((int) $resource_id),
            'DELETE:id' => handle_delete_user((int) $resource_id),
            default => json_response(['error' => 'Metodo nao permitido'], 405),
        };
    } else {
        json_response(['error' => 'Recurso nao encontrado'], 404);
    }
} catch (Throwable $e) {
    json_response(['error' => $e->getMessage()], 500);
}