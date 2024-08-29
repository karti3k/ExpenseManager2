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

if (isset($_GET['username'])) {
    $username = $_GET['username'];

    include('dbconnect.php'); // Include the Firebase connection and functions

    // Path to the user's data in Firebase
    $path = 'totals'; // Adjust the path to match your Firebase structure

    // Use the readData function to fetch the user's transactions
    $userData = readData($path . '/' . $username);

    // Initialize total income and expense
    $totalIncome = 0;
    $totalExpense = 0;

    // Check if the user data is valid
    if ($userData && is_array($userData)) {
        // Loop through each transaction to calculate total income and expenses
        foreach ($userData as $key => $transaction) {
            if (isset($transaction['Income']) && is_numeric($transaction['Income'])) {
                $totalIncome += $transaction['Income'];
            }
            if (isset($transaction['Expense']) && is_numeric($transaction['Expense'])) {
                $totalExpense += $transaction['Expense'];
            }
        }

        // Respond with total income and expenses
        echo json_encode([
            "success" => true,
            "data" => [
                "totalIncome" => $totalIncome,
                "totalExpense" => $totalExpense
            ]
        ]);
    } else {
        // No data found for the user or invalid data format
        echo json_encode([
            "success" => true,
            "data" => [
                "totalIncome" => 0,
                "totalExpense" => 0
            ]
        ]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Username not provided"]);
}
?>
