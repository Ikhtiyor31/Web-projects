function checkForm() {
	
	if(!document.login.username.value) {
		alert("please enter your name");
		document.login.username.focus();
		return;
	}
	if(!document.login.password.value) {
		alert("please enter password");
		document.login.password.focus();
		return;
	}
	document.login.submit();
	
}