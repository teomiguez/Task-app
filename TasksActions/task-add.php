<?php
    include('connection.php');

    if(isset($_POST['name']) && isset($_POST['description']))
    {
        $name = $_POST['name'];
        $description = $_POST['description'];
        $query = "INSERT INTO tasks (name, description) VALUES ('$name', '$description')";
        
        $rta = $connection -> query($query);

        if(!$rta)
        {
            echo("Query filed!");
        }

        echo("Task added successfully");
    }
?>