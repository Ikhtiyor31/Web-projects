<?php
 include_once './db/db_con.php';
 
   $emp_id = $_GET['id'];
   
   $query = "select * from empoyees where id = '$emp_id'";
   $result_emp = mysqli_query($conn, $query);
   $each_row = mysqli_fetch_array($result_emp);
   $filepath = $each_row['changeFilePath'];
   if($filepath) {
   	   $filename = "./uploadphoto/".$filepath;
    	unlink($filename);
   }
     $del_result = "delete from employees where id = '$emp_id'";
      mysqli_query($conn, $del_result);
      mysqli_close($connn);
   echo  (
   		 "<script> 
          location.href='employee_table.php';
   		</script>"
   		);
   
   
 

?> 