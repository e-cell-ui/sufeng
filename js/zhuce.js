//返回id
window.onload = function(){
function F(id){
	return document.getElementById(id);
}
var pa = F("p_a");//您输入的邮箱地址格式不正确

var pc = F("p_c");//您输入的手机号码格式不正确
var pd = F("p_d");//请输入6-16位字符,必须包含英文字母和数字
var pe = F("p_e");//验证码不正确
var btn = F("btn");
var btn2 = F("btn2");
var btn3 = F("btn3");
var btn4 =F("btn4");

var btn6 = F("btn6")
var btn7 = F("btn7");
//验证手机
btn.onblur = function(){
var t = /^[A-Za-z0-9_]{4,15}$/;	
	var val = btn.value;
		if(t.test(val)){
			pc.style.display = "none";
			
			}else{
				pc.style.display = "block";
			}
		$.get("http://47.104.244.134:8080/username.do", {
		username: val
			}).done(data => {
		console.log(data);	
	})
}
//密码
btn2.onblur = function(){
	var d =/^[A-Za-z0-9_]{4,20}$/;
	var vcl = btn2.value;
		if(d.test(vcl)){
			pa.style.display = "none";
			
		}else{
			pa.style.display = "block";
		}
}

//邮箱
btn4.onblur = function(){
	var g =  /^\w+[-+.]*\w*@([a-z0-9A-Z\u2E80-\u9FFF]-?)+(\.\w{2,6})+/;
	var vdl = btn4.value;
		if(g.test(vdl)){
			pa.style.display = "none";
		}else{
			pa.style.display = "block";
		}
}


//随机验证码
$(function(){
	var show_num = [];
	draw(show_num);

	$("#canvas").on('click',function(){
		draw(show_num);
	})
	$("#btn3").on('blur',function(){
		var val = $("#btn3").val().toLowerCase();
		var num = show_num.join("");
		if(val==''|val!=num){
			
			$("#p_e").css({"display":"block"});
		}else if(val == num){
			
			$("#p_e").css({"display":"none"});
		}
	})
	draw(show_num);
})


function draw(show_num) {
	var canvas_width=$('#canvas').width();
	var canvas_height=$('#canvas').height();
	var canvas = document.getElementById("canvas");//获取到canvas的对象，演员
	var context = canvas.getContext("2d");//获取到canvas画图的环境，演员表演的舞台
	canvas.width = canvas_width;
	canvas.height = canvas_height;
	var sCode = "A,B,C,E,F,G,H,J,K,L,M,N,P,Q,R,S,T,W,X,Y,Z,1,2,3,4,5,6,7,8,9,0";
	var aCode = sCode.split(",");
	var aLength = aCode.length;//获取到数组的长度
	
	for (var i = 0; i <= 3; i++) {
		var j = Math.floor(Math.random() * aLength);//获取到随机的索引值
		var deg = Math.random() * 30 * Math.PI / 180;//产生0~30之间的随机弧度
		var txt = aCode[j];//得到随机的一个内容
		show_num[i] = txt.toLowerCase();
		var x = 10 + i * 20;//文字在canvas上的x坐标
		var y = 20 + Math.random() * 8;//文字在canvas上的y坐标
		context.font = "bold 23px 微软雅黑";

		context.translate(x, y);
		context.rotate(deg);

		context.fillStyle = randomColor();
		context.fillText(txt, 0, 0);

		context.rotate(-deg);
		context.translate(-x, -y);
	}
	
}
function randomColor() {//得到随机的颜色值
	var r = Math.floor(Math.random() * 256);
	var g = Math.floor(Math.random() * 256);
	var b = Math.floor(Math.random() * 256);
	return "rgb(" + r + "," + g + "," + b + ")";
}


btn6.onclick = function (){
	if(btn6.checked){
		btn7.style.background = "#e5004b"
	}else{
		btn7.style.background = "#ccc"
	}
}



//手机验证码

btn7.onclick = function(){
	$.post("http://47.104.244.134:8080/usersave.do", {
		username: btn.value,
		password: btn2.value,
		email: btn4.value,
		sex: "男"
	}).done(data => {
		alert("注册成功")
		console.log(data);
		window.location.href = "register.html"
	})

}


}
