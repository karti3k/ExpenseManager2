<?php
// Enable error reporting for debugging
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header('Content-Type: application/json');

$postData = json_decode(file_get_contents('php://input'), true);

if ($postData) {
    $email = $postData['email'];
    $password = $postData['password'];

    // Here you can handle the user data, e.g., save it to a database
    // For demonstration, we'll just return a success message

    echo json_encode(['success' => true, 'email' => $email]);
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid data']);
}
?>
