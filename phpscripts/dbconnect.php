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
?>
