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

// Function to update data in Firebase
function updateData($path, $data) {
    global $firebaseUrl;

    // Convert data to JSON
    $jsonData = json_encode($data);

    // Initialize cURL
    $ch = curl_init();

    // Set cURL options
    curl_setopt($ch, CURLOPT_URL, $firebaseUrl . $path . '.json');
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'PATCH');
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

// Function to delete data from Firebase
function deleteData($path) {
    global $firebaseUrl;

    // Initialize cURL
    $ch = curl_init();

    // Set cURL options
    curl_setopt($ch, CURLOPT_URL, $firebaseUrl . $path . '.json');
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'DELETE');

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

// Function to read transactions from Firebase based on username
function readTransactions($path, $username) {
    global $firebaseUrl;

    // Read data from Firebase for the specified user
    $response = readData($path . '/' . $username);

    // Check if the response is not null or empty
    if ($response && is_array($response)) {
        // Initialize an array to store transactions
        $transactions = [];

        // Loop through the response data and add each transaction to the transactions array
        foreach ($response as $key => $transaction) {
            $transactions[] = [
                'username' => $username,
                'amount' => $transaction['amount'],
                'date_time' => $transaction['date_time'],
                'message' => $transaction['message']
            ];
        }

        // Return the transactions array
        return $transactions;
    } else {
        // Return an empty array if no transactions are found
        return [];
    }
}



// Function to add a transaction to Firebase
function addTransaction($path, $username, $amount, $date, $details) {
    global $firebaseUrl;

    // Prepare transaction data
    $data = [
        'username' => $username,
        'amount' => $amount,
        'date' => $date,
        'timestamp' => date('Y-m-d H:i:s'), // Current date-time
        'details' => $details
    ];

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


?>
