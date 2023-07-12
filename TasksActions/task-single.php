<?php
    include('connection.php');

    if(isset($_POST['id']))
    {
        $id = $_POST['id'];
        
        $query = "SELECT * FROM tasks WHERE id = '$id'";
        $rta = $connection -> query($query);

        if(!$rta)
        {
            die('Query Error!' . mysqli_error($connection));
        }

        $json = array();

        while($row = mysqli_fetch_array($rta))
        {
            $json[] = array(
                'id' => $row['id'],
                'name' => $row['name'],
                'description' => $row['description']
            );
        }

        $jsonstring = json_encode($json);
        echo $jsonstring;
    }
?>