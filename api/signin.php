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

    // Retrieve all users from the 'users' table
    $existingUsers = readData($reference_table);
    $userDetails = null;

    if ($existingUsers) {
        foreach ($existingUsers as $user) {
            if ($user['username'] === $username) {
                $userDetails = $user;
                break;
            }
        }
    }

    if ($userDetails) {
        // Check if the password matches
        if (password_verify($password, $userDetails['password'])) {
            echo json_encode(['success' => true, 'username' => $username]);
        } else {
            echo json_encode(['success' => false, 'message' => 'Incorrect password']);
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'Username does not exist']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid data']);
}
?>
