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

// Define the reference table name
$reference_table = 'transactions'; // Adjust this according to your Firebase structure

// Get username from query parameters (for GET requests)
$username = isset($_GET['username']) ? $_GET['username'] : null;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Handle adding a new transaction
    $postData = json_decode(file_get_contents('php://input'), true);

    if ($postData && isset($postData['username'])) {
        $username = $postData['username']; // Use username from POST data
        $amount = $postData['amount'];
        $dateTime = date('Y-m-d H:i:s'); // Current date and time
        $details = $postData['details'];

        // Create transaction data array
        $transactionData = [
            'username' => $username,
            'amount' => $amount,
            'dateTime' => $dateTime,
            'details' => $details
        ];

        // Add the transaction to the Firebase database
        $result = writeData($reference_table . '/' . $username, $transactionData);

        if ($result) {
            echo json_encode(['success' => true, 'message' => 'Transaction added successfully']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Failed to add transaction']);
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'Invalid data']);
    }
} elseif ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Handle retrieving all transactions
    if ($username) {
        $transactions = readData($reference_table . '/' . $username); // Modify readTransactions to handle username

        if ($transactions) {
            $transactionArray = [];
            foreach ($transactions as $transaction) {
                $transactionArray[] = [
                    'amount' => (int)$transaction['amount'],
                    'date' => $transaction['dateTime'],
                    'details' => $transaction['details']
                ];
            }
            echo json_encode(['success' => true, 'data' => $transactionArray]);
        } else {
            echo json_encode(['success' => false, 'message' => 'Failed to retrieve transactions']);
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'Username is required']);
    }
} else {
    // Handle unsupported request methods
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
}

?>
