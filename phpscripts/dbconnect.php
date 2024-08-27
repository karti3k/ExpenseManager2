<?php
// Firebase Realtime Database URL
$firebaseUrl = 'https://e-manager-310bd-default-rtdb.firebaseio.com/';

// Function to write data to Firebase
function writeData($path, $data) {
    global $firebaseUrl;

    // Convert data to JSON
    $jsonData = json_encode($data);

    // Initialize cURL
    $ch = curl_init();

    // Set cURL options
    curl_setopt($ch, CURLOPT_URL, $firebaseUrl . $path . '.json');
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $jsonData);
    curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));

    // Execute the request
    $response = curl_exec($ch);

    // Check for errors
    if ($response === false) {
        echo "Error: " . curl_error($ch);
    }

    // Close cURL
    curl_close($ch);

    return $response;
}

// Function to read data from Firebase
function readData($path) {
    global $firebaseUrl;

    // Initialize cURL
    $ch = curl_init();

    // Set cURL options
    curl_setopt($ch, CURLOPT_URL, $firebaseUrl . $path . '.json');
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

    // Execute the request
    $response = curl_exec($ch);

    // Check for errors
    if ($response === false) {
        echo "Error: " . curl_error($ch);
    }

    // Close cURL
    curl_close($ch);

    // Return decoded JSON data
    return json_decode($response, true);
}

// Function to delete a complete transaction from the transactions table
function deleteTransaction($username, $amount, $date, $time, $category) {
    global $firebaseUrl;
    
    // Validate input parameters
    if (empty($username) || !is_numeric($amount) || empty($date) || empty($time) || empty($category)) {
        return json_encode(['success' => false, 'message' => 'Invalid input parameters.']);
    }
    
    // Define the path to the transactions table for the specific user
    $path = 'transactions/' . $username;
    
    // Read the current transactions data
    $transactions = readData($firebaseUrl . $path . '.json');
    
    if (!is_array($transactions)) {
        return json_encode(['success' => false, 'message' => 'Failed to retrieve transactions.']);
    }
    
    // Find the key for the transaction that matches all the given details
    $transactionKeyToDelete = null;
    
    foreach ($transactions as $key => $transaction) {
        if (
            isset($transaction['amount']) && abs($transaction['amount'] - $amount) < 0.001 &&
            isset($transaction['date']) && $transaction['date'] === $date &&
            isset($transaction['time']) && $transaction['time'] === $time &&
            isset($transaction['category']) && $transaction['category'] === $category
        ) {
            $transactionKeyToDelete = $key;
            break;
        }
    }
    
    // If a matching transaction is found
    if ($transactionKeyToDelete !== null) {
        // Initialize cURL for DELETE request to remove the specific transaction
        $chDelete = curl_init();
        curl_setopt($chDelete, CURLOPT_URL, $firebaseUrl . $path . '/' . $transactionKeyToDelete . '.json');
        curl_setopt($chDelete, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($chDelete, CURLOPT_CUSTOMREQUEST, 'DELETE');
        
        // Execute the DELETE request
        $deleteResponse = curl_exec($chDelete);
        
        if ($deleteResponse === false) {
            $error = curl_error($chDelete);
            curl_close($chDelete);
            return json_encode(['success' => false, 'message' => 'Error deleting transaction: ' . $error]);
        }
        
        curl_close($chDelete);
        
        // Check if the delete operation was successful
        // Firebase typically returns "null" for a successful delete
        if ($deleteResponse === 'null') {
            return json_encode(['success' => true, 'message' => 'Transaction deleted successfully.']);
        } else {
            return json_encode(['success' => false, 'message' => 'Failed to delete transaction.']);
        }
    } else {
        // Return the response if no matching transaction is found
        return json_encode(['success' => false, 'message' => 'No matching transaction found.']);
    }
}


?>
