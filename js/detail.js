//$("detail")goodsbyid.do
$(function(){
	var id=location.search.split("=")[1];
	console.log(id)
	$.get("http://47.104.244.134:8080/goodsbyid.do",{id:id},function(data){
		var str=`
		<div class="detail-title"><a href="index.html">首页</a><span>${data.name}</span></div>
			<div class="detail-content">
				<div class="dc-left">
					<div class="midbox"><img src="${data.picurl}"/><div class="fdj"></div>
					</div>
					<div class="img-list">
					<img src="${data.picurl}"/>
					
					
					</div>
					<div class="zoom">
					<img src="${data.picurl}"/>
					</div>
				</div>
				<div class="dc-right">
					<p><span></span>日本直供 青岛一号仓发货</p>
					<p><strong>${data.name}</strong></p>
					<p>价格<span style="color:rgb(229,0,75);font-size:22px">${data.price}</span>元</p>
					<p>原价<span >${data.price-100+200}</span>元<span>为您节省100元</span></p>
					<p>税费 <span>本商品适用税率为11.2%</span> <span>税费收取规则</span> </p>
					<div class="transport">运费  <span>至 <select>
						<option>北京市</option>
					</select></span><span>订单实付满99元包邮</span><span>预计3-5个工作日送达</span></div>
					<div class="number">购买数量 
					<button class="jian">-</button>
					<input type="text" class="num" value="1"/>
					<button class="jia">+</button> <span>赠送42积分</span></div>
					<input data-id="${data.id}" class="buygoods" type="button" value="加入购物车" />
					<div class="khd"><span></span>客户端下单</div> <span>收藏商品</span></div>
					
			`
		;
		
		$(".detail").html(str);
		$(".jia").click(function(){
			var a = $(".num").val();
			a++;
			$(".num").val(a)
		})
		$(".jian").click(function(){
			var a = $(".num").val();
			a--;
			$(".num").val(a)
			if(a<=1){
				$(".num").val("1")
			}
		})
	/*放大镜*/
	
	$(".midbox").on("mouseover",function(){
		$(".zoom").css("display","block");
		$(".fdj").css("display","block");
	})
	$(".midbox").on("mouseout",function(){
		$(".zoom").css("display","none");
		$(".fdj").css("display","none");
	})
	$(".midbox").on("mousemove",function(e){
			var evt  = e || event;
			var x = evt.pageX -$(".fdj")[0].offsetWidth-70;
			var y = evt.pageY - $(".fdj")[0].offsetHeight-100;
				
			var maxWid = $(".midbox")[0].offsetWidth - $(".fdj")[0].offsetWidth;
			var maxHei = $(".midbox")[0].offsetHeight -$(".fdj")[0].offsetHeight;
					
			x = x<=0?0:x>=maxWid?maxWid:x;
			y = y<=0?0:y>=maxHei?maxHei:y;
					
			$(".fdj").css({"left":x+"px","top":y+"px"});		
			$(".zoom").children().css({"left":-x/$(".midbox")[0].offsetWidth*$(".zoom")[0].offsetWidth+"px","top":-y/$(".midbox")[0].offsetHeight*$(".zoom")[0].offsetHeight+"px"});
			
		
	})
	
   
   for(let i=0;i<$(".img-list img").length;i++){
   $(".img-list img").eq(i).click(function(){
 		console.log($(".midbox img").attr("src"));
// 		console.log( $(this).attr("src"));
   		$(".midbox img").attr("src",$(this).attr("src"));
		$(".zoom img").attr("src",$(this).attr("src")) 
   	})
   }
	
	
	$(".buygoods").click(function(){
			var token =Getcookie("token")
			$.get("http://47.104.244.134:8080/cartsave.do",{gid:id,token:token},function(data){
				console.log(data)
			})
		})

//			$(".buygoods").eq(0).click(function(){
//				var token=localStorage.getItem("token");
//				var id=$(this).attr("data-id")
//				$.post("http://47.104.244.134:8080/cartsave.do",{gid:id,token:token},function(data){
//					//$(".middle-cart .cart_no").text($(".middle-cart .cart_no").text()-1+2);
//						console.log("添加成功！");
//				})
//			
//			})s
	})

		
})
