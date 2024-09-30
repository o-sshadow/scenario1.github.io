<?php
header('Content-Type: application/json');

require_once 'db.php';

// Get the database connection
$conn = getConn();

// API endpoint to retrieve students data
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
  if (isset($_GET['students'])) {
    $sql = "SELECT * FROM students";
    $result = $conn->query($sql);
    $data = array();
    while ($row = $result->fetch_assoc()) {
      $data[] = $row;
    }
    echo json_encode($data);
  }
}

// API endpoint to add a new student
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  if (isset($_POST['firstName']) && isset($_POST['surname']) && isset($_POST['birth']) && isset($_POST['address']) && isset($_POST['number']) && isset($_POST['gender']) && isset($_POST['tutour']) && isset($_POST['email'])) {
    $firstName = $_POST['firstName'];
    $surname = $_POST['surname'];
    $birth = $_POST['birth'];
    $address = $_POST['address'];
    $number = $_POST['number'];
    $gender = $_POST['gender'];
    $tutour = $_POST['tutour'];
    $email = $_POST['email'];

    $sql = "INSERT INTO students (firstName, surname, birth, address, number, gender, tutour, email) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssssssss", $firstName, $surname, $birth, $address, $number, $gender, $tutour, $email);
    $stmt->execute();

    echo json_encode(array('message' => 'Student added successfully'));
  }
}

$conn->close();
?>