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

    // Query to check if the username already exists
    $existingUsers = readData($reference_table);
    $usernameExists = false;
    $emailexists = false;
    if ($existingUsers) {
        foreach ($existingUsers as $user) {
            if ($user['username'] === $username) {
                $usernameExists = true;
                break;
            }
            if ($user['email'] === $email) {
                $emailExists = true;
                break;
            }
        }
    }

    if ($usernameExists) {
        echo json_encode(['success' => false, 'message' => 'Username already exists']);
    }else if($emailexists){
        echo json_encode(['success' => false, 'message' => 'Email already exists']);
    } else {
        // Hash the password before storing it
        $postData = [
            'email' => $email,
            'username' => $username,
            'password' => password_hash($password, PASSWORD_BCRYPT)
        ];

        // Add the new user to the 'users' path in Firebase
        $result = writeData($reference_table, $postData);

        if ($result) {
            echo json_encode(['success' => true, 'email' => $email]);
        } else {
            echo json_encode(['success' => false, 'message' => 'Database is facing some issues']);
        }
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid data']);
}
?>
