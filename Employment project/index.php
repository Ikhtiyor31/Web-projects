<?php 
	 include_once './config.php';
?>
<!DOCTYPE html>
<html>
<head> 
<meta charset="utf-8">
<title><?=$title['employee_table']?></title>

</head>
<body> 
	<header>
    	<?php include_once "header.php";?>
    </header>
	<section>
	    <?php include_once "employee_table.php";?>
	</section> 
	<footer>
    	<?php include_once "footer.php";?>
    </footer>
</body>
</html>