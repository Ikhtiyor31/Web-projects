<?php
   
   include_once './db/db_con.php';

   if(isset($_POST['emp_name'])) {
  
  
    
   $emp_name = $_POST['emp_name']; //  employee name
   $emp_surname = $_POST['emp_surname']; // employee surname 
   $emp_gender = $_POST['emp_gender']; // selected emp gender
   $emp_qualification = $_POST['emp_qualification']; // employee qualification
   $emp_salary = $_POST['emp_salary'];
   $emp_join_date = $_POST['emp_join_date'];
   $emp_birthdate = $_POST['emp_birthdate'];
   $emp_phonenumber = $_POST['emp_phonenumber'];
  
   //  profile photo directory to upload photo
   $uploadfile_dir = './uploadphoto/';
   $filename = $_FILES['chooseFile']['name'];
   $tmp_file_name =  $_FILES['chooseFile']['tmp_name'];
   $filesize = $_FILES['chooseFile']['size'];
   $file_error = $_FILES['chooseFile']['error'];

   if($filename && !$file_error) {
   	
   	$file_split = explode('.', $filename);
   		for($x = 0; $x < count($file_split); $x++) {
   			// to get jpg jpeg png file extention
   			if($x == count($file_split)-1)  { 
   				$file_ext = $file_split[$x];
   			    // to get original file name 
   		          if($x == count($file_split)-2) 
   		          		$file_origin_name = $file_split[$x];
   		          else 
   		          	$file_origin_name = $file_split[$x].".";
   		} 
   	}
   	$new_file_name = $emp_name; // to employee name to to its profile name 
   	$changed_file_name = $new_file_name.".".$file_ext; // new photo or file name
   	
   	$upload = $uploadfile_dir.$changed_file_name; // put changed file into directory folder 
   	
   	if( $filesize  > 10000000000000 ) {
   		echo("
				<script>
				alert('Upload file size exceeds specified size (1MB)! <br> Please check file size! ');
				history.go(-1)
				</script>
				");
   		exit;
   	}
   	if (!move_uploaded_file($tmp_file_name, $upload) ) // ./data/george.jpg // employee_name.jpg
   	{
   		echo("
					<script>
					alert('Failed to copy file to the specified directory.');
					history.go(-1)
					</script>
				");
   		exit;
   	}
   	
   }
   else {
   	  $filename = "";
   	  $changed_file_name = "";
   }
   //'INSERT INTO employees(id, name, surname, gender, qualification, salary, birthDate, phone_number, imagePath, changeFilePath)' 
   $sql = "insert into employees(name, surname, gender, qualification, salary, joinDate, birthDate, phone_number, imagePath, changeFilePath)";
   $sql .= "values('$emp_name', '$emp_surname', '$emp_gender', '$emp_qualification', '$emp_salary', '$emp_join_date', '$emp_birthdate', '$emp_phonenumber', '$filename', '$changed_file_name')"; 

   $result = mysqli_query($conn, $sql);
   mysqli_close($conn);
     }
   /* if($result) {
   	  echo ("
   	  		 
					<script>
					alert('sql sucessfully saved data');
					history.go(-1)
					</script>
   	  		");
   } else {
   	echo ("s
   	 
					<script>
					alert('sql failed to save data');
					history.go(-1)
					</script>
   	  		");
  
   	
   }
   
   */ 
   
    
 
   echo  
   		"<script>
          location.href='employee_table.php';
   		</script>"
   ;
    
  
?>
