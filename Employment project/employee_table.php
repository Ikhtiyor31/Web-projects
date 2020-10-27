<?php 
include_once './config.php';
?>
<html>
 
<head>
<title><?=$title['employee_table']?></title>
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
</head>

<body>
   
    <?php 
    include_once './db/db_con.php';
    include_once 'header.php';
    

    if (isset($_GET["page"]))
    	$page = $_GET["page"];
    else
    	$page = 1;
    
    ?>
   
    <?php
   function filterTable($query)
      {
      $conn = mysqli_connect('localhost', 'user1', '12345', 'employment');
      	$filter_Result = mysqli_query($conn, $query);
      	return $filter_Result;
      }
   if(isset($_POST['search']))
            {
  	   $first_name = $_POST['first_name'];
  	   $last_name = $_POST['last_name'];
  	  // search in all table columns
  	   $query = "select * from employees  where name like '%".$first_name."%' OR surname like'%".$last_name."%'  ";
  	   $emp_info_result = filterTable($query);
  
      }else {
   	  $retrieved_emp_info = "select * from employees order by id desc";
   	  $emp_info_result = mysqli_query($conn, $retrieved_emp_info);
      }
   	  $num_of_emp = mysqli_num_rows($emp_info_result);
  ?>
  <div class="container" style="width: 700px; margin-top: 30px; margin-bottom: 50px;">
     <span class="navbar navbar-light bg-secondary" style="margin-bottom: 10px; color: white;">
   <h2> Employee Table List</h2>
   </span>
          <form action="employee_table.php" method="post">
            <input type="text" name="first_name" placeholder="first name">
            <input type="text" name="last_name" placeholder="last name">
            <input type="submit" name="search" value="Search"><br><br>
            
  <table class="table table-bordered ">
  <thead class="thead-dark">
    <tr>
      <th scope="col">##</th>
      <th scope="col">First Name</th>
      <th scope="col">Last Name</th>
      <th scope="col">Details</th>
    </tr>
  </thead>
  

  
  <?php 

    
   

    if($num_of_emp % 10  == 0) {// set max table_row to each web page
    	
    	$total_page = floor($num_of_emp/10); 
    	
    }else {
    	
    	$total_page = floor($num_of_emp/10) + 1;
    }
    
    
        $start = ($page - 1) * 10;
    
    for ($x=$start; $x<$start+10 && $x < $num_of_emp; $x++)
    {
        mysqli_data_seek($emp_info_result, $x);
        $row = mysqli_fetch_array($emp_info_result);
        $emp_id = $row['id'];
        $emp_name = $row['name'];
        $emp_surname = $row['surname'];
  ?>
  <tbody>
    <tr>
      <td><?=$x+1?></td>
      <td><?=$emp_name?></td>
      <td><?=$emp_surname?></td>
    <?php   echo "<td><a href='employee_details.php?id=".$row['id']."'>Views </td>";?>
 
    </tr>
   
  </tbody>

    
    			
<?php
   	   
   }
   mysqli_close($conn);

?>
    
    </table>
    

  
  <nav aria-label="Page navigation example" style="margin-bottom: 10px; background: white">
  <ul class="pagination">
   
   
	
  <?php
	if ($total_page>=2 && $page >= 2)	
	{
		$new_page = $page-1;
		
		echo "<li class='page-item'><a class='page-link' href='employee_table.php?page=$new_page'>Previous</a></li>";
	}		
	else 
		echo "<li>&nbsp;</li>";

   	// 게시판 목록 하단에 페이지 링크 번호 출력
   	for ($i=1; $i<=$total_page; $i++)
   	{
		if ($page == $i)     // 현재 페이지 번호 링크 안함
		{
			echo "<li class='page-item'><a class='page-link'> $i </a></li>";
		}
		else
		{
			
			echo "<li class='page-item'><a class='page-link' href='employee_table.php?page=$i'>$i</a></li>";
		}
   	}
   	if ($total_page>=2 && $page != $total_page)		
   	{
		$new_page = $page+1;
		echo ("<li class='page-item'><a class='page-link' href='employee_table.php?page=$new_page'>Next</a></li>");
		
		
	}
	else 
		echo "<li>&nbsp;</li>";
	
  
?>
	
	  </ul>
</nav>	

</form>
</div>




    <footer>
    
    <?php include_once 'footer.php';?>
    </footer>
</body>
</html>