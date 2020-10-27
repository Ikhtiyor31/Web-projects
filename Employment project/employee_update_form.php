<html>

<head>

<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
<script src="./js/jquery-1.10.2.js"></script>	

<script>
  
   $(function() {
	  $('#save_form').click(function(){
        checkInputForm();
	   });
   });
	   
   function  checkInputForm() {
	   // check employee name input
   if(!document.emp_info.emp_name.value) {
       alert("please enter employee name");
	   document.emp_info.emp_name.focus();
	   return;
	   
   }
   // check employee surname input
   if(!document.emp_info.emp_surname.value) {
	   alert("please enter employee surname");
	   document.emp_info.emp_surname.focus();
	   return;
   } 
   if(!$("input:radio[name='emp_gender'][value='male']").is(":checked") && !$("input:radio[name='emp_gender'][value='female']").is(":checked")) { 
	   alert("please select employee gender");
	   return;
	  } 

	   
  // check qualification input 
  if(!document.emp_info.emp_qualification.value) {
	   alert("please enter employee qualification");
	   document.emp_info.emp_qualification.focus();
	   return;
   } 
 // check saalry input 
   if(!document.emp_info.emp_salary.value) {
	   alert("please enter employee salary");
	   document.emp_info.emp_salary.focus();
	   return;
	   }
   //company  join input date check
   if(!document.emp_info.emp_join_date.value) {
	   alert("please enter employee company join date");
	   document.emp_info.emp_join_date.focus();
	   return;
	   }
      // check birthdate input 
   if(!document.emp_info.emp_birthdate.value) {
	   alert("please enter employee date of birth");
	   document.emp_info.emp_birthdate.focus();
	   return;
	   }
   if(!document.emp_info.emp_phonenumber.value) {
	   alert("please enter employee phone number");
	   document.emp_info.emp_phonenumber.focus();
	   return;
	   }
    if(!document.emp_info.chooseFile.value) {
    	alert("please select photo");
 	   document.emp_info.chooseFile.focus();
 	   return;
        }
           document.emp_info.submit();
   }


</script>
</head>
<body>
     <?php include_once 'header.php';?>
     
     <?php 
        include_once './db/db_con.php';
        
        $recieved_id = $_GET['id'];
        $query = "select * from employees where id = '$recieved_id'";
        
        $query_result = mysqli_query($conn, $query);
        
        $row = mysqli_fetch_assoc($query_result);
        
        $emp_first_name = $row['name'];
        $emp_last_name = $row['surname'];
        $emp_gender = $row['gender'];
        $emp_qualification = $row['qualification'];
        $emp_salary = $row['salary'];
        $emp_join_date = $row['joinDate'];
        $emp_birth_date = $row['birthDate'];
        $emp_phonenumber = $row['phone_number'];
        $file_name = $row['imagePath'];
         
       
     ?>
     
     <div class="container" style="width: 500px; margin-top: 30px; margin-bottom: 50px">
     <div class="navbar navbar-light bg-secondary" style="margin-bottom:15px;">
     
  <span class="navbar-text" style="color: white">
    <h2> Update an employee </h2>
  </span>
     </div>
     <form action="employee_update.php?id_num=<?=$recieved_id?>" method="post" name="emp_info" id="employee_form" enctype="multipart/form-data">
  
  <div class="form-group">
    <label for="nameInput">Employee Name </label>
    <input type="text" class="form-control" name="emp_name" value="<?=$emp_first_name?>" placeholder="enter name">
  </div>
  
  <div class="form-group">
    <label for="surnameInput">Employee Surname</label>
    <input type="text" class="form-control" name="emp_surname"  value="<?=$emp_last_name?>" placeholder="enter surname">
  </div>
  

   <div class="form-group">
      <label for="genderInput">Employee Gender Select</label>
      <br>
   <div class="form-check form-check-inline">
  <input class="form-check-input" type="radio" name="emp_gender" <?php if ($emp_gender == 'male') echo 'checked="checked"'; ?> id="male_check" value="male">
  <label class="form-check-label" for="inlineRadio1">Male</label>
</div>
<div class="form-check form-check-inline">
  <input class="form-check-input" type="radio" name="emp_gender" <?php if ($emp_gender == 'female') echo 'checked="checked"'; ?>id="female_check" value="female">
  <label class="form-check-label" for="inlineRadio2">Female</label>
</div>
   </div>
  
   <div class="form-group">
    <label for="qualificationInput">Employee Qualification</label>
    <input type="text" class="form-control" name="emp_qualification" value="<?=$emp_qualification?>" placeholder="enter qualification">
  </div>
  
    <div class="form-group">
    <label for="salaryInput">Employee Salary</label>
    <input type="text" class="form-control" name="emp_salary" value="<?=$emp_salary?>" placeholder="enter salary">
  </div>
  
  <div class="form-group">
    <label for="JoinInput">Employee Company Join Date</label>
    <input type="date" class="form-control" name="emp_join_date" value="<?=$emp_join_date?>" placeholder="enter company join date">
  </div>
  
  <div class="form-group">
      <label for="BirthDate">Employee Date of Birth</label>
      <input type="date" class="form-control" name="emp_birthdate" value="<?=$emp_birth_date?>" placeholder="Date of birth">
    </div>
  
   <div class="form-group">
    <label for="PhoneInput">Employee Phone Number</label>
    <input type="text" class="form-control" name="emp_phonenumber" value="<?=$emp_phonenumber?>" placeholder="enter phone number">
  </div>
   
   <div class="form-group">
    <label for="PhoneInput">Employee Photo </label>
   <div class="file-upload">
  <div class="file-select">
    
    <input type="file" name="chooseFile" id="chooseFile">  <div class="col2">prev_file_name:  "<?=$file_name?>"</div>
     
  </div>
</div>
  </div>
  <a class="btn btn-primary" id="save_form">Save data</a>
</form>
      
     </div>
    <footer>
     <?php include_once 'footer.php';?>
    </footer>
    
</body>
</html>