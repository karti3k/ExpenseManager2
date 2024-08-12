<?php
// Enable error reporting for debugging
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// CORS headers
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json'); // Ensure this header is set

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

$postData = json_decode(file_get_contents('php://input'), true);

if ($postData) {
    $email = $postData['email'];
    $username = $postData['username'];
    $password = $postData['password'];

    include('dbconnect.php');
    $reference_table = 'users';
    try {
        $snapshot = $database->getReference($reference_table)
                            ->orderByChild('username')->equalTo($username)
                            ->getSnapshot();
    } catch (Exception $e) {
        echo json_encode(['success' => false, 'message' => 'Error querying database: ' . $e->getMessage()]);
        exit;
    }
    if ($snapshot->getValue() != null) {
        echo json_encode(['success' => false, 'message' => 'Username already exists']);
    } else {
        $postData = [
            'email' => $email,
            'username' => $username,
            'password' => password_hash($password, PASSWORD_BCRYPT)
        ];

        $postRef = $database->getReference($reference_table)->push($postData);

        if ($postRef) {
            echo json_encode(['success' => true, 'email' => $email]);
        } else {
            echo json_encode(['success' => false, 'message' => 'Database is facing some issues']);
        }
        exit;
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid data']);
}
?>
