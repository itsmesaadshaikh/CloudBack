<?php
// Set response header to JSON
header('Content-Type: application/json');

// Database connection
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "cloudbookings";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    echo json_encode(["status" => "error", "message" => "Database connection failed"]);
    exit();
}

// Get POST data
$data = json_decode(file_get_contents('php://input'), true);

// Extract and sanitize values
$name = htmlspecialchars($data['name']);
$middleName = htmlspecialchars($data['middleName']);
$lastName = htmlspecialchars($data['lastName']);
$email = htmlspecialchars($data['email']);
$phone = htmlspecialchars($data['phone']);
$age = htmlspecialchars($data['age']);
$passport = htmlspecialchars($data['passport']);

// Validate required fields
if (empty($name) || empty($lastName) || empty($email) || empty($phone) || empty($age) || empty($passport)) {
    echo json_encode(["status" => "error", "message" => "All fields are required"]);
    exit();
}

// Insert query
$sql = "INSERT INTO ticketinfo (passenger_name, email, phone_number, age, passport_details)
        VALUES (?, ?, ?, ?, ?)";

$stmt = $conn->prepare($sql);
$passenger_name = $name . ' ' . $middleName . ' ' . $lastName;

// Bind and execute
$stmt->bind_param("sssis", $passenger_name, $email, $phone, $age, $passport);

if ($stmt->execute()) {
    echo json_encode(["status" => "success", "message" => "Passenger details stored successfully"]);
} else {
    echo json_encode(["status" => "error", "message" => "Error storing passenger details: " . $conn->error]);
}

// Close connection
$stmt->close();
$conn->close();
?>
