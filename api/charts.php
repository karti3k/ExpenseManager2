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
// Get theme from query parameters
$theme = isset($_GET['theme']) ? $_GET['theme'] : 'light'; // Default to 'light' if not specified
$transactions = readData($reference_table.'/' . $username);

// Set text color based on theme
$text_color = $theme === 'dark' ? 'white' : 'black';

// Initialize category totals
$category_totals = [];
$total_amount = 0; // To calculate the total amount for percentages

if ($transactions) {
    foreach ($transactions as $transaction) {
        $category = $transaction['category'];
        $amount = (float)$transaction['amount'];
        $total_amount += $amount;

        if (isset($category_totals[$category])) {
            $category_totals[$category] += $amount;
        } else {
            $category_totals[$category] = $amount;
        }
    }
}

// Convert category totals to JSON format for use in the response
$category_totals_json = json_encode($category_totals);

// Calculate percentages for each category
$category_percentages = [];
foreach ($category_totals as $category => $amount) {
    $percentage = ($total_amount > 0) ? round(($amount / $total_amount) * 100, 2) : 0;
    $category_percentages[] = $category . ' (' . $percentage . '%)';
}

// Format the data for QuickChart
$data = array_values($category_totals);
$labels = array_keys($category_totals);

// Create the chart configuration for QuickChart
$chartData = [
    'type' => 'outlabeledPie',
    'data' => [
        'labels' => $labels,
        'datasets' => [
            [
                'backgroundColor' => ['#FF3784', '#36A2EB', '#4BC0C0', '#F77825', '#9966FF'],
                'data' => $data
            ]
        ]
    ],
    'options' => [
        'plugins' => [
            'legend' => false,
            'outlabels' => [
                'text' => '%l %p',
                'color' => $text_color,
                'stretch' => 35,
                'font' => [
                    'resizable' => true,
                    'minSize' => 12,
                    'maxSize' => 18
                ]
            ]
        ]
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
    'data' => $category_totals_json // Send the category totals in JSON format
]);
?>
