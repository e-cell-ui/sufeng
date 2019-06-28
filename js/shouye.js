window.onbeforeunload = function(){
    window.scrollTo("0","0");
}

GetPromotion_start();

function GetPromotion_start(){
    GetTodaySale_taskId=setInterval(GetTodaySale_showtime,1000);
}
function GetTodaySale_showtime(){

    var now = new Date();
    var h = now.getHours();
    var m = now.getMinutes();
    var s = now.getSeconds();
    h = parseInt(h);
    var m = now.getMinutes();
    var minute = 59 - parseInt(m);
    if(minute<=9)
    {
        minute = "0"+minute;
    }
    var s = now.getSeconds();
    var second = 59 - parseInt(s);
    if(h<14 && h>=10)
    {
        var hour = 13 - h;
        hour = hour;
        var clock = '距本场结束:<span class="houn">'+hour+'</span>时<span class="min">'+minute+'</span>分<span class="sec">'+second+'</span>秒';
        $(".clock-con").html(clock);
        $("#tab10").parent().find("li").removeClass("now");
        $("#tab10").addClass("now");
    }
    else if(h<20 && h>=14)
    {
        hour = 19 - h;

        var clock = '距本场结束:<span class="houn">'+hour+'</span>时<span class="min">'+minute+'</span>分<span class="sec">'+second+'</span>秒';
        $(".clock-con").html(clock);
        $("#tab14").parent().find("li").removeClass("now");
        $("#tab14").addClass("now");
    }
    else if(h>=20 || h<10)
    {
        if(h<10)
        {
            var hour = 9 - h;
        }
        else{
            hour = 33 - h;
        }


        var clock = '距本场结束:<span class="houn">'+hour+'</span>时<span class="min">'+minute+'</span>分<span class="sec">'+second+'</span>秒';
        $(".clock-con").html(clock);
        $("#tab20").parent().find("li").removeClass("now");
        $("#tab20").addClass("now");
    }
}
//倒计时结束
$(document).ready(function() {

	//top 隐藏菜单
	$('#supuy-app,#supuy-service,#supuy-user,#supuy-life,#supuy-oversea').hover(function() {
		var hover_id = this.id.split('-')[1];
		$(this).find('.top-nav-menu').addClass('top-nav-hover');
		$('#' + hover_id + '-con').show();
	}, function() {
		var hover_id = this.id.split('-')[1];
		$(this).find('.top-nav-menu').removeClass('top-nav-hover');
		$('#' + hover_id + '-con').hide();
	});




    //主分类列表hover
    $(".cateMenu li").hover(function(){
		$(this).css("background","#ffffff");
        $(this).find(".cate-tag a").css("color","#e5004a");
        $(this).find(".cate-icon").css("background-position","-35px -152px");
        
    },function(){
		$(this).css("background","#e5004a");
        $(this).find(".cate-tag a").css("color","#ffffff");
        $(this).find(".cate-icon").css("background-position","0 -152px");
       
    });
	//head 弹出菜单部分

	var cateMenu = function() {
		var cateLiNum = $(".cateMenu li").length;
		$(".cateMenu li").each(function(index, element) {
			if (index < cateLiNum) {
				$(this).mouseenter(function() {
					var sub = $(this).find(".list-item");
					$(this).find(".cate-tag").addClass("on");
					sub.stop().show();
				});
				$(this).mouseleave(function() {

					$(this).find('.cate-tag').removeClass("on");
					$(this).find(".list-item").hide();
				});
			}
		});

		$('.navCon_on').bind({
			mouseenter: function() {
				$('.cateMenu').stop().show();
			},
			mouseleave: function() {
				$('.cateMenu').stop().hide();
			}
		});
		if ($('.main').hasClass('home')) {
			$('.cateMenu').removeClass('hide');
			$('.navCon_on').unbind('mouseenter').unbind('mouseleave');
		};

	}();

//侧边栏
$(".right-nav").css("height",($(window).height()));
    $(window).resize(function(){
        $(".right-nav").css("height",($(window).height()));
    });
    $(".right-nav ul li").hover(function(){
        $(this).find("span").css("left",-$(this).find("span").width());
    },function(){
        $(this).find("span").css("left","60px");
	});

$(".scroll-top").click(function(){$("html,body").animate({scrollTop: "0px"}, 700);});
})

//二级菜单
$.get("http://47.104.244.134:8080/goodstypelist.do",{l:1}).done(function(data){
						for(let i = 0;i<data.length;i++){
							$(".list1 li").eq(i).append(data[i].name);
						}
					});
					$.get("http://47.104.244.134:8080/goodstypelist.do",{l:2}).done(data=>{
						
							$(".hd-sou-xq").on("mouseenter",function(){
								$(".hd-sou-xq").css({"width":"280px"})
								$(".list2").show()
								});
							$(".hd-sou-xq").on("mouseleave",function(){
								$(".hd-sou-xq").css({"width":"159px"})
								$(".list2").hide()
								});
							$(".list1 li").on("mouseenter",function(){
								var a = $(this).index();
								$(".list2 li").eq(0).html(data[a].name);
							})
					});

