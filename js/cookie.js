//增加&改cookie
function Setcookie(keys, keyvalue, DAte, Path) {
	var oDate = new Date();
	oDate.setDate(oDate.getDate() + DAte);
	document.cookie = keys + "=" + keyvalue + ";" + "expires=" + oDate + ";path=" + Path;
}
//查询cookie
function Getcookie(keyvalue) {
	var obj = document.cookie;
	var obj1 = obj.split("; ");
	for(var i = 0; i < obj1.length; i++) {
		var arr = obj1[i].split("=");
		if(arr[0] === keyvalue) {
			return arr[1];
		}
	}
}
//删除
function RemoveCookie(name) {
	Setcookie(name, 1, -1);
}

