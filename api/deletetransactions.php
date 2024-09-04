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

// Firebase Realtime Database URL
$firebaseUrl = 'https://e-manager-310bd-default-rtdb.firebaseio.com';

// Decode the incoming JSON request body
$requestPayload = file_get_contents('php://input');
$data = json_decode($requestPayload, true);

// Extract required data from the request
$username = $data['username'] ?? null;
$targetAmount = $data['amount'] ?? null;
$targetDate = $data['date'] ?? null;
$targetTime = $data['time'] ?? null;
$targetCategory = $data['category'] ?? null;

if (!$username || !$targetAmount || !$targetDate || !$targetTime || !$targetCategory) {
    echo json_encode([
        'success' => false,
        'message' => 'Invalid request. Missing parameters.'
    ]);
    exit;
}

// Construct the URL to fetch all transactions for the specific user
$fetchUrl = $firebaseUrl . '/transactions/' . $username . '.json';

// Initialize cURL for fetching transactions
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $fetchUrl);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

// Execute the request to fetch transactions
$response = curl_exec($ch);

if (curl_errno($ch)) {
    echo json_encode([
        'success' => false,
        'message' => 'Error fetching transactions: ' . curl_error($ch)
    ]);
    curl_close($ch);
    exit;
}

// Parse the JSON response
$transactions = json_decode($response, true);
curl_close($ch);

// Check if transactions exist and is an array
if (!is_array($transactions)) {
    echo json_encode([
        'success' => false,
        'message' => 'No transactions found for user: ' . $username
    ]);
    exit;
}

// Initialize the variable to store the transaction key
$transactionKey = null;

// Loop through the transactions to find the matching one
foreach ($transactions as $key => $transaction) {
    if (
        isset($transaction['amount']) && $transaction['amount'] == $targetAmount &&
        isset($transaction['date']) && $transaction['date'] == $targetDate &&
        isset($transaction['time']) && $transaction['time'] == $targetTime &&
        isset($transaction['category']) && $transaction['category'] == $targetCategory
    ) {
        $transactionKey = $key;
        break; // Break the loop once the transaction is found
    }
}
if ($transactionKey) {
    $isIncome=false;
    if($targetCategory=='Income' || $targetCategory=='Cashback'){
        $isIncome=true;
    }else {
        $isIncome=false;
    }
    // Construct the URL to fetch all transactions for the specific user
    $fetchUrl = $firebaseUrl.'/totals/'. $username .'.json';
    // Initialize cURL for fetching transactions
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $fetchUrl);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    // Execute the request to fetch transactions
    $response = curl_exec($ch);
    curl_close($ch);
    $totals = json_decode($response, true);
    $totalsKey=null;
    foreach ($totals as $totalKey => $total) {
        if ($isIncome && $total['Income'] == $targetAmount) {
            $totalsKey = $totalKey;
            break;
        } elseif (!$isIncome && $total['Expense'] == $targetAmount) {
            $totalsKey = $totalKey;
            break;
        }
    }
    if($totalsKey){
        $delurl=$firebaseUrl . '/totals/' . $username . '/' . $totalsKey . '.json';
        // Set up cURL for deletion
        $chDel = curl_init();
        curl_setopt($chDel, CURLOPT_URL, $delurl);
        curl_setopt($chDel, CURLOPT_CUSTOMREQUEST, "DELETE");
        curl_setopt($chDel, CURLOPT_RETURNTRANSFER, true);
        $delResponse = curl_exec($chDel);
        curl_close($chDel);
        if($delResponse){}
        else{
            echo json_encode([
                'success' => false,
                'message' => 'Deletion Unsuccessful in totals table'.$targetAmount
            ]);
            exit;
        }
    }
    else{
        echo json_encode([
            'success' => false,
            'message' => 'Error deleting transaction in totals table '
        ]);
        exit;
    }
    // Now delete the transaction with the specific key
    $deleteUrl = $firebaseUrl . '/transactions/' . $username . '/' . $transactionKey . '.json';

    // Set up cURL for deletion
    $chDelete = curl_init();
    curl_setopt($chDelete, CURLOPT_URL, $deleteUrl);
    curl_setopt($chDelete, CURLOPT_CUSTOMREQUEST, "DELETE");
    curl_setopt($chDelete, CURLOPT_RETURNTRANSFER, true);

    $deleteResponse = curl_exec($chDelete);

    if (curl_errno($chDelete)) {
        echo json_encode([
            'success' => false,
            'message' => 'Error deleting transaction: ' . curl_error($chDelete)
        ]);
    } else {
        echo json_encode([
            'success' => true,
            'message' => 'Transaction deleted successfully.'
        ]);
    }
    curl_close($chDelete);
} else {
    echo json_encode([
        'success' => false,
        'message' => 'Transaction not found.'
    ]);
}
?>
