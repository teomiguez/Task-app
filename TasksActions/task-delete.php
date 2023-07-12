<?php
    include('connection.php');

    if(isset($_POST['id']))
    {
        $id = $_POST['id'];
        $query = "DELETE FROM tasks WHERE id = '$id';";
        
        $rta = $connection -> query($query);

        if(!$rta)
        {
            echo("Query filed!");
        }

        echo("Task delete successfully");
    }
?>