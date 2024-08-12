<?php
require __DIR__.'/vendor/autoload.php';
    use Kreait\Firebase\Factory;
    use Kreait\Firebase\Database;
    $factory = (new Factory)
        ->withServiceAccount('e-manager-310bd-firebase-adminsdk-sjh8l-317e46b174.json')
        ->withDatabaseUri('https://e-manager-310bd-default-rtdb.firebaseio.com/');

    $database=$factory->createDatabase();
    //$auth= $factory->createAuth();
?>