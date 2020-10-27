 <?php 
  include_once './config.php';
 ?>
   <?php 
   if($admin_name) {
 ?>
<html style="margin: 0; padding: 0; top: 0;">
<head>

<link rel="stylesheet" href="./css/header.css">
</head>

<body>
   <nav>
   <ul>
   <li><a href="index.php">Home</a></li>
   
   <li><a href="employee_table.php" >Employee Table List</a></li>
   
   <li><a href="employee_attendance_check.php">Employee attendance</a></li>
   
   <li><a href="employee_form.php">Insert employee</a></li>
   <li> <a style="padding-left: 200px; color: blue; "> name: <?=$admin_name?></a> </li>
   <li><a href="logout.php" style="color: red;">logout</a></li>
   </ul>
  
 
   </nav>
</body>

</html>
  <?php } else { ?>
  
   <?php 
   echo "
 		<script>
   		location.href = 'admin_login.php';
   		</script>
	
		";
   
 }
    ?>