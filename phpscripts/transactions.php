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
$totals_table = 'totals';

// Get username from query parameters (for GET requests)
$username = isset($_GET['username']) ? $_GET['username'] : null;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Handle adding a new transaction
    $postData = json_decode(file_get_contents('php://input'), true);

    if ($postData && isset($postData['username'])) {
        $username = $postData['username']; // Use username from POST data
        $amount = $postData['amount'];
        $date = $postData['date']; // Date coming from React component
        $time = $postData['time']; // Time coming from React component
        $details = $postData['details'];
        $category = $postData['category']; // Add category handling

        // Create transaction data array
        $transactionData = [
            'username' => $username,
            'amount' => $amount,
            'date' => $date, // Storing the date separately
            'time' => $time, // Storing the time separately
            'details' => $details,
            'category' => $category // Add category to the data
        ];

        // Determine if the transaction is income or expense based on category
        $isIncome = in_array(strtolower($category), ['cashback', 'income']); // Check if category is Cashback or income

        // Add the transaction to the Firebase database
        $result = writeData($reference_table . '/' . $username, $transactionData);

        if ($result) {
            echo json_encode(['success' => true, 'message' => 'Transaction added successfully']);
            if ($isIncome) {
                $totalsData = ['Income' => $amount, 'Expense' => 0];
                // Write the updated totals back to Firebase
                $updateResult = writeData($totals_table . '/' . $username, $totalsData);
            }
            else{
                $totalsData = ['Income' => 0, 'Expense' => $amount];
                // Write the updated totals back to Firebase
                $updateResult = writeData($totals_table . '/' . $username, $totalsData);
            }
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
                    'date' => $transaction['date'], // Date in a separate field
                    'time' => $transaction['time'], // Time in a separate field
                    'details' => $transaction['details'],
                    'category' => $transaction['category'] // Add category to the response
                ];
            }
            echo json_encode(['success' => true, 'data' => $transactionArray]);
        } else {
            echo json_encode(['success' => false, 'message' => 'No Transactions are added yet']);
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'Username is required']);
    }
} else {
    // Handle unsupported request methods
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
}

?>
