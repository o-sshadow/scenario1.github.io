<?php
$servername = "dev.pandapvp.net";
$username = "scenario1";
$password = "yUK)P3@cyfVeV@p@";
$dbname = "scenario1";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

function getConn() {
  global $conn;
  return $conn;
}
?>