<?php
// Enable error reporting for debugging
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// CORS headers
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

$postData = json_decode(file_get_contents('php://input'), true);

if ($postData) {
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
    if ($snapshot->exists()) {
        $userData = $snapshot->getValue();
        // Retrieve the first user's data (in case of multiple records, which shouldn't happen with unique usernames)
        $userDetails = reset($userData);

        // Check if the password matches
        if (password_verify($password, $userDetails['password'])) {
            echo json_encode(['success' => true, 'username' => $username]);
        } else {
            echo json_encode(['success' => false, 'message' => 'Incorrect password']);
        }
        exit;
    } else {
        echo json_encode(['success' => false, 'message' => 'Username does not exists']);
        exit;
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid data']);
}
?>
