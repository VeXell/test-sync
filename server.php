<?php

header('Access-Control-Allow-Origin: *');

sleep(2);
echo "ok";

if (isset($_REQUEST['sw']) && !empty($_REQUEST['sw'])) {
    file_put_contents('sw.txt', date('Y-m-d H:i:s') . '|' . file_get_contents('php://input') . PHP_EOL, FILE_APPEND | LOCK_EX);
}