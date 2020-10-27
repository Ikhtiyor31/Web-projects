<html>
<?php 
include_once './config.php';
?>
<head>

<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">

<?php 
  include_once './db/db_con.php';
  // to select each empployee detail by id from sent from employee_table
    $recieved_id = $_GET['id'];
   $sql  = "select * from employees where id = '$recieved_id' ";
   $result_details = mysqli_query($conn, $sql);
   //The mysqli_fetch_assoc() function is used to return an associative array
   $emp_details = mysqli_fetch_assoc($result_details);
   $emp_first_name  = $emp_details['name']; 
   $emp_last_name = $emp_details['surname'];
   $emp_gender  = $emp_details['gender'];
   $emp_salary_info = $emp_details['salary'];
   $emp_join_date = $emp_details['joinDate'];
   $emp_birth_date = $emp_details['birthDate'];
   $emp_profession = $emp_details['qualification'];
   $emp_phone_number = $emp_details['phone_number'];
   $emp_profile_photo = $emp_details['changeFilePath'];
  
   
     
 
?>

 <?php include_once 'header.php';?>
 <style>
 table, th, td {
  border: 1px solid black;
  border-collapse: collapse;
  padding: 10px;
  font-size: 20px;
 
}
table th {
    color: darkslategray;
}

   
 </style>
 <title><?=$emp_first_name?></title>
 </head>
 <body>
 <div style="padding: 30px; color: white;  ">
  <span class="navbar navbar-light bg-secondary" style="width: 50%; margin-bottom: 15px; ">
   <h2> Employee Information</h2>
   </span>
  
<table style="width:50%; heigth: auto" class="table table-bordered ">

  <tr>
  
    <th colspan="2" rowspan="5"><?="<img src='./uploadphoto/$emp_profile_photo' width='300' height='250'>"?></th>

  </tr>
  
  <tr >
    <th>First Name </th>
    <td><?=$emp_first_name?></td>
  </tr>
  <tr >
    <th>Last Name</th>
    <td><?=$emp_last_name?></td>
  </tr>
  <tr>
    <th>BirthDate</th>
    <td><?=$emp_birth_date?></td>
  </tr>
  <tr>
  <th>Gender</th>
  <td><?=$emp_gender?></td>
  </tr>
   <tr>
  <th>Salary</th>
  <td> $<?=$emp_salary_info?> </td>
  <th>Join Date</th>
  <td> <?=$emp_join_date?> </td>
  </tr>
  <tr> 
     <th>Job Position</th>
  <td> <?=$emp_profession?> </td>
   <th> Phone number</th>
   <td> <?=$emp_phone_number?> </td>
  </tr>
</table>
 </div>
     <div style="padding-left: 20px;">
        <?php   echo "<button><a href='employee_delete.php?id=".$_GET['id']." '>Delete </button>";?>
         <?php   echo "<button><a href='employee_update_form.php?id=".$_GET['id']." '>Update</button>";?>
         </div>
      <li style="list-style: none; text-align:center;"> <a href="employee_table.php" style="color: red;">Go back </a> </li>
      
      <div style="padding: 20px;">
      
      <table style="width:40%" class="table table-bordered ">
      	<tr>
      	<th>Work Dates</th>
      	<th>Status</th>
        <th>Day</th>
      	</tr>
      <?php 
      
      $qeury  = "select * from attendance_results where emp_attend_num = '$recieved_id' ";
      $rec_results = mysqli_query($conn, $qeury);
      $worked_days = 0;
      $not_worked_days = 0;
      while($at_row = mysqli_fetch_array($rec_results)) {
      	 $emp_status = $at_row['emp_status'];
      	 $emp_checked_date = $at_row['checked_date'];
      	 $emp_checked_day = $at_row['check_day'];
      	 	if($emp_status == 'attendance') {		
      	 		$worked_days = $worked_days + 1;	
      	 	}
      	 	if($emp_status == 'absence') {
      	 		$not_worked_days = $not_worked_days + 1;	
      	 	}
      ?>
      	<tr>
      	<td><?=$at_row['checked_date']?></td>
      	<?php if ($at_row['emp_status'] == 'attendance') {  $attendance_color = $at_row['emp_status']?>
         <td style="color: blue;"><?=$attendance_color?></td>
      	<?php  } else if ($at_row['emp_status'] == 'absence') {$absence_color = $at_row['emp_status'] 	?>
      	
         <td style="color: red;"><?=$absence_color?></td>
      <?php } ?>
      <td><?=$emp_checked_day?></td>
      	</tr>
      	
      	 
     
     <?php 
    
      }
      
      ?>
      
      	</table>
      	</div>
      	<div style="padding: 30px">
      	<table style="width:20%; margin-bottom: 100px;" class="table table-bordered ">
  <tr>
    <th># of days on work</th>
    <th># of days not on work </th> 
    
  </tr>
  <tr>
    <td style="color: blue;"><?=$worked_days?></td>
    <td style="color: red;"><?=$not_worked_days?></td>

  </tr>
 
</table>
      	</div>
 <footer style="position: relative;" >
  <?php include_once 'footer.php';?>
 </footer>
</body>
</html>