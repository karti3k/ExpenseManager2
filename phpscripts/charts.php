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

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

include('dbconnect.php'); // Include the Firebase connection and functions

// Define the reference table name
$reference_table = 'transactions'; // Adjust this according to your Firebase structure

// Get username from query parameters
$username = isset($_GET['username']) ? $_GET['username'] : null;
$transactions = readData($reference_table.'/' . $username);

// Initialize category totals
$category_totals = [];

if ($transactions) {
    foreach ($transactions as $transaction) {
        $category = $transaction['category'];
        $amount = (float)$transaction['amount'];

        if (isset($category_totals[$category])) {
            $category_totals[$category] += $amount;
        } else {
            $category_totals[$category] = $amount;
        }
    }
}

// Convert PHP array to JSON format for use in JavaScript
$category_totals_json = json_encode($category_totals);

// Format the data for QuickChart
$labels = array_keys($category_totals);
$data = array_values($category_totals);

$chartData = [
    'type' => 'pie',
    'data' => [
        'datasets' => [
            ['data' => $data]
        ],
        'labels' => $labels
    ]
];

$chartDataJson = json_encode($chartData);
$chartDataUrl = urlencode($chartDataJson);

// Generate URL for QuickChart
$chartUrl = "https://quickchart.io/chart?c=" . $chartDataUrl;

// Output the JSON response
echo json_encode([
    'success' => true,
    'chart_url' => $chartUrl, // URL to access the chart image
    'data' => $category_totals_json
]);
?>
