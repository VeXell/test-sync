<?php

header('Access-Control-Allow-Origin: *');

$SLEEP_TIME = 2;

if (isset($_REQUEST['sw']) && !empty($_REQUEST['sw'])) {
    $SLEEP_TIME = 0.5;
}

sleep($SLEEP_TIME);
echo "ok";

if (isset($_REQUEST['sw']) && !empty($_REQUEST['sw'])) {
    // Uncomment if you want to see background sync after page unload
    //file_put_contents('sw.txt', date('Y-m-d H:i:s') . '|' . file_get_contents('php://input') . PHP_EOL, FILE_APPEND | LOCK_EX);
}