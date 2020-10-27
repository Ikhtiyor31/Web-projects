
<?php
session_start();

unset($_SESSION["admin_name"]);
;

echo("
       <script>
          location.href = 'admin_login.php';
         </script>
       ");
?>
