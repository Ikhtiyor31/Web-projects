
<html>
<?php 
include_once './config.php';
?>
<head>
<title><?=$title['employee_attendance_check']?></title>
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
</head>

<body>
   
    <?php 
    include_once './db/db_con.php';
    include_once 'header.php';
   
    $check_day = date("Y-m-d");
    $time =  date('H:i');
    $day = date("l");
    
    ?>
  <div class="container" style="width: 700px; margin-top: 30px; margin-bottom: 300px;">
   <div style="text-align: center; padding-bottom: 10px; ">
    <span class="navbar navbar-light bg-secondary" style="color: white">
   <h2> Employee Attendance Checking</h2>
   </span>
   
   </div>
   <div>
  <span style="list-style: none;"> <a style="color: red;">Date:</a>  <?=$check_day?></span>
     <span style="list-style: none;"><a style="color: red;">Day: </a> <?=$day?></span>
  <span style="list-style: none;"> <a style="color: red;">Time:</a>  <?=$time?></span>

   
   </div>
  <form action="employee_check.php" method="post">
  <table class="table table-bordered ">
  <thead class="thead-dark">
    <tr>
      <th scope="col">##</th>
      <th scope="col">First Name</th>
      <th scope="col">Last Name</th>
      <th scope="col">Check</th>
    </tr>
  </thead>
  
  <?php 
  

  
  
    $query = "select * from employees order by id desc"; 
    
    $emp_info_result = mysqli_query($conn, $query);
    
    $num_of_emp = mysqli_num_rows($emp_info_result);
     
   $emp_nums = 0;

    // 가져올 레코드로 위치(포인터) 이동
    while($row = mysqli_fetch_array($emp_info_result))  {
       
    $emp_id = $row['id'];
    $emp_name = $row['name'];
    $emp_surname = $row['surname'];
    $emp_nums++;
  ?>
  
  
  <tbody>
    <tr>
     
      <td><?=$emp_nums?></td>
      <td><?=$emp_name?></td>
      <td><?=$emp_surname?></td>
      <td><?php echo '<input type="checkbox" name="attendance_box[]" value="'.$emp_id.'">';?> </td>
    
      
    </tr>
   
  </tbody>

    
    			
<?php
   	   
    }
   mysqli_close($conn);

?>
    
    </table>
    

     <input type = 'submit' name = 'submit' value = Submit> 

</form>
</div>




    <footer>
    
    <?php include_once 'footer.php';?>
    </footer>
</body>
</html>