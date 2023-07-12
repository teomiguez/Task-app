<?php
    include('connection.php');

    $query = "SELECT * FROM tasks";
    $rta = $connection -> query($query);

    if(!$rta)
    {
        echo("Query filed!");
    }

    $json = array();

    while($row = mysqli_fetch_array($rta)) {
        $json[] = array(
            'id' => $row['id'],
            'name' => $row['name'],
            'description' => $row['description']
        );
    }

    $jsonstring = json_encode($json);
    echo($jsonstring);
?>