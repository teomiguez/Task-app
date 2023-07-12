<?php 
    include('connection.php');

    if(isset($_POST['id']) && isset($_POST['name']) && isset($_POST['description']))
    {
        $id = $_POST['id'];
        $name = $_POST['name'];
        $description = $_POST['description'];

        $query = "UPDATE tasks SET name = '$name', description = '$description' WHERE id = '$id'";
        $rta = $connection -> query($query);

        if(!$rta)
        {
            echo("Query filed!");
        }

        echo("Task updated successfully");
    }
?>