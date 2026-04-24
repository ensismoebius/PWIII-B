<?php

function create_pdo(): PDO
{
    static $pdo = null;

    if ($pdo instanceof PDO) {
        return $pdo;
    }

    // Carrega .env do diretório pai
    $env_path = __DIR__ . '/../.env';
    if (is_file($env_path)) {
        foreach (file($env_path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES) as $line) {
            $line = trim($line);
            if ($line === '' || str_starts_with($line, '#') || !str_contains($line, '=')) {
                continue;
            }
            [$k, $v] = explode('=', $line, 2);
            $k = trim($k);
            $v = trim($v);
            if (str_starts_with($v, '"') || str_starts_with($v, "'")) {
                $v = substr($v, 1, -1);
            }
            putenv("$k=$v");
            $_ENV[$k] = $v;
        }
    }

    $host = getenv('MYSQL_HOST') ?: '127.0.0.1';
    if ($host === 'localhost') {
        $host = '127.0.0.1'; // força TCP em vez de socket Unix
    }
    $port = (int) (getenv('MYSQL_PORT') ?: 3306);
    $database = getenv('MYSQL_DATABASE') ?: 'test';
    $username = getenv('MYSQL_USER') ?: 'root';
    $password = getenv('MYSQL_PASSWORD') ?: '';

    $dsn = "mysql:host=$host;port=$port;dbname=$database;charset=utf8mb4";

    $pdo = new PDO($dsn, $username, $password, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    ]);

    return $pdo;
}

function query_all(string $sql, array $params = []): array
{
    $statement = create_pdo()->prepare($sql);
    $statement->execute($params);
    return $statement->fetchAll();
}

function query_one(string $sql, array $params = []): ?array
{
    $statement = create_pdo()->prepare($sql);
    $statement->execute($params);
    $row = $statement->fetch();
    return $row === false ? null : $row;
}

function execute_sql(string $sql, array $params = []): int
{
    $statement = create_pdo()->prepare($sql);
    $statement->execute($params);
    return $statement->rowCount();
}

function users_get_all(): array
{
    return query_all('SELECT id, name, email FROM users ORDER BY id DESC');
}

function users_create(string $name, string $email): array
{
    execute_sql('INSERT INTO users (name, email) VALUES (?, ?)', [$name, $email]);
    $id = (int) create_pdo()->lastInsertId();
    return users_get_by_id($id) ?? ['id' => $id, 'name' => $name, 'email' => $email];
}

function users_get_by_id(int $id): ?array
{
    return query_one('SELECT id, name, email FROM users WHERE id = ?', [$id]);
}

function users_update(int $id, string $name, string $email): ?array
{
    execute_sql('UPDATE users SET name = ?, email = ? WHERE id = ?', [$name, $email, $id]);
    return users_get_by_id($id);
}

function users_delete(int $id): bool
{
    $affected = execute_sql('DELETE FROM users WHERE id = ?', [$id]);
    return $affected > 0;
}
