<?php
$servername = "dev.pandapvp.net";
$username = "mysql";
$password = "mysqldb8383p4nel";
$dbname = "analytics_database";

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
