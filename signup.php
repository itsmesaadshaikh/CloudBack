<?php
$servername = "localhost";
$username = "root"; // change this if you have a different username
$password = "";     // change this if you have a password
$dbname = "cloudbookings";

// Create a connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check the connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Handling the signup form submission
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $fname = $_POST['fname'];
    $lname = $_POST['lname'];
    $email = $_POST['email'];
    $password = $_POST['password'];
    $confirmpassword = $_POST['confirmpassword'];

    // Check if passwords match
    if ($password != $confirmpassword) {
        echo "Passwords do not match. Please try again.";
        exit();
    }

    // Hash the password
    $hashed_password = password_hash($password, PASSWORD_DEFAULT);

    // Check if the email already exists
    $sql = "SELECT * FROM users WHERE email = '$email'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        echo "Email is already registered.";
    } else {
        // Insert the new user into the database
        $sql = "INSERT INTO users (first_name, last_name, email, password) VALUES ('$fname', '$lname', '$email', '$hashed_password')";

        if ($conn->query($sql) === TRUE) {
            echo "Signup successful! You can now <a href='login.html'>login</a>.";
        } else {
            echo "Error: " . $sql . "<br>" . $conn->error;
        }
    }
}

$conn->close();
?>
