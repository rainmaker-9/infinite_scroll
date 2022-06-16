<?php

if ($_SERVER["REQUEST_METHOD"] === 'GET') {
  if (isset($_GET['page']) && isset($_GET['per_page'])) {
    include_once '../DBConfig.php';
    $link = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);
    $page = intval($link->real_escape_string($_GET['page']));
    $per_page =  intval($link->real_escape_string($_GET['per_page']));
    $stmt = $link->prepare("SELECT product_name as name,product_price as price,product_desc as descr,product_image as image FROM tbl_products LIMIT ?,?");
    $page *= $per_page;
    $stmt->bind_param("ii", $page, $per_page);
    $stmt->execute();
    $result = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);

    header('Content-type: application/json');
    echo json_encode(array('products' => $result));
  }
}
