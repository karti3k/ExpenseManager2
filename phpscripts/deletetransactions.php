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

include('dbconnect.php'); // Include the Firebase connection and functions

// Check if the request method is POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    
    // Retrieve the posted data
    $amount = $_POST['amount'];
    $date = $_POST['date'];
    $time = $_POST['time'];
    $category = $_POST['category'];
    $username = $_POST['username'];

    // Call the delete function to delete the transaction
    $transfer=deleteTransaction($username,$amount, $date, $time, $category);
    echo $transfer;
} else {
    echo json_encode(['success' => false, 'message' => 'Transactions data not found.']);
}

?>
