<?php
include('dbconnect.php');
$reference=$database->getReference('contacts');
echo $reference->getValue();

// try {
    //     $userProperties = [
    //         'email' => $email,
    //         'emailVerified' => false,
    //         'password' => $password,
    //         'displayName' => $username,
    //     ];
        
    //     $createdUser = $auth->createUser($userProperties);
    //     echo json_encode(['success' => true, 'email' => $email]);

    // } catch (Exception $e) {
    //     echo json_encode(['success' => false, 'message' => $e->getMessage()]);
    // }

    
?>