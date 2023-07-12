<?php
   include('connection.php');

    if(isset($_POST['search']))
    {
        $data = $_POST['search'];
        
        $query = "SELECT * FROM tasks WHERE name LIKE '$data%'";
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