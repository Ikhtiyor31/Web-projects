<?php 
      
    include_once './db/db_con.php';
    
    $check_date = date("Y-m-d (H:i)");
    $day = date("l");
    // Check if form is submitted successfully
    if(isset($_POST["submit"]))
    {
    	// Check if any option is selected
    	if(isset($_POST["attendance_box"])){
    		// Retrieving each selected option
    		$post_data = "select * from employees";
    		$post_result_first = mysqli_query($conn, $post_data);
    		while ($row = mysqli_fetch_array($post_result_first)){
    			$attendance="absence";
    			foreach ($_POST['attendance_box'] as $reieved_id){
    				if($row['id'] == $reieved_id){
    					$attendance="attendance";
    					break;
    				}
    			}
    			$query_first = "insert into attendance_results(emp_attend_num, first_name, last_name, checked_date, check_day, emp_status)";
    			$query_first .= "values('$row[id]', '$row[name]', '$row[surname]', '$check_date', '$day', '$attendance')";
    			$check = mysqli_query($conn, $query_first);
    			
    		}
    		   
    	}
    	
 
    		
    }
  /*  if($check) {
   	  echo ("
   	  		 
					<script>
					alert('attendance results sucessfully saved ');
					history.go(-1)
					</script>
   	  		");
   } else {
   	echo ("s
   	 
					<script>
					alert(' attendance results failed to be saved');
					history.go(-1)
					</script>
   	  		");
  
   	
   } */
    
    mysqli_close($conn);


    echo
    "<script>
          location.href='employee_table.php';
   		</script>"
    		;
    
?> 