window.onload = function(){
	

	$("#btn2").click(function() {
		
		var usr = $("#btn").val();
		var pwd =  $('#btn1').val();
		
		console.log(pwd)
		$.post(
			"http://47.104.244.134:8080/userlogin.do", {
				name: usr,
				password: pwd
			},

			function(data) {
				console.log(data)
				if(data.code == 1 ) {
					alert("用户名或密码错误，请重新输入")
					
				} else {
					
					Setcookie("token",data.data.token)
					window.location.href = "index.html"
				}

			})
	})

}
