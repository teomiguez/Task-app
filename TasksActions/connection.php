<?php
    $connection = mysqli_connect(
        'localhost',
        'root',
        '',
        'task-database'
    );

    if ($connection -> connect_errno) {
        echo("Failed to connect to MySQL: " . $connection -> connect_error);
        exit();
    }
?>