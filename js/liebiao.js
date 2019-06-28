window.onload = function(){



function choose(){
    $(".selected-libox ul li").each(function(){
        if($(".selected-libox ul li").length > 1){
            $(this).remove();
        }
    });
    $(".selected-libox").css({"display":"none"});
    $(".choose-libox").show();
}
//获取商品信息
function get_listDetail(obj){
    var searchkey=$(obj).find('a').attr('searchkey');
    var category_pid=$(obj).find('a').attr('category-pid');
    var brand_name=$('#brandname').attr('attrbrand');
    if(brand_name !=''){
        brand_name=brand_name.replace(/&/,"><");
    }
    var dataurl=encodeURI("searchkey="+searchkey+"&pid="+category_pid+"&sort="+0+"&brand="+brand_name);
    $.ajax({
        url:"/Goods/getList",
        type:"GET",
        data:dataurl,
        beforeSend:function(){
            PopLoading('正在加载,请稍后...');
        },
        success:function(msg){
            var ajax_msg=msg.split('||');
            //商品品牌
            var brandInfo=ajax_msg[0];
            $('#choose_brand').html(brandInfo);
            //商品动态属性
            var categoryInfo=ajax_msg[1];
            $('#goodsDynamicAttribute').html(categoryInfo);
            //商品数量
            var goodsCount=ajax_msg[2];
            $('#goodsCount').html(goodsCount);
            //商品列表
            var goodsList=ajax_msg[3];
            $('#ul_content').html(goodsList);
            PagingFunction($(this),1,goodsCount,24,6,0,1);
            PopLoaded();
        }
    });
}

/***************购物车操作**************************/
//增加
function goods_num_up(obj){
    var onekey=$(obj).parent().parent().find(".keybuy").val();
    if(onekey!=1){
        var now_num = $(obj).parent().find(".list-good-num").val();
        var mincout=$(obj).parent().find(".list-good-num").attr("mincout");
        var rel_num =Number(now_num)+1;
        $(obj).parent().find(".list_-ood-num").val(rel_num);
    }
}
//减少
function goods_num_down(obj){
    var onekey=$(obj).parent().parent().find(".keybuy").val();
    if(onekey!=1){
        var now_num = $(obj).parent().find(".list-good-num").val();
        var minstart=$(obj).parent().find(".list-good-num").attr("minstart");
        var rel_num =Number(now_num)-1;
        if(rel_num > minstart){
            $(obj).parent().find(".list-good-num").val(rel_num);
        }else{
            $(obj).parent().find(".list-good-num").val(minstart);
        }
    }
}
//添加购物车
function good_addcart(obj,event,type){
    if(type==0){
        var offset = $("#end").offset();
        var addcar = $(obj);
        var end_top=offset.top-$(document).scrollTop();
        var img = $(obj).parent().parent().find(".list-good-img img").attr('src');
        var flyer = $('<img class="u-flyer" src="'+img+'">');
        flyer.fly({
            start: {
                left: event.pageX,
                top: event.pageY-$(document).scrollTop()
            },
            end: {
                left: offset.left+10,
                top:  end_top+10,
                width: 0,
                height:0
            },
            onEnd: function(){
                //addcar.css("cursor","default").removeClass('orange').unbind('click');
                this.destory();
            }
        });
    }
    var goods_num=$(obj).parent().find(".list-good-num").val();
    var mincout=$(obj).parent().find(".list-good-num").attr("mincout");
    var gid=$(obj).parent().find(".goodsid").val();
    var cart_id=$(obj).parent().find(".cartid").val();
    var groupid=$(obj).parent().find(".groupid").val();
    var isactive=$(obj).parent().find(".isactive").val();
    if(groupid!==''){           //添加单品组合
        goods_num=goods_num*Number(mincout);
        if(type==1){
            window.open("/Order/zgindex/goods/"+gid+"/group/"+groupid+"/type/1/num/"+goods_num);
        }else{
            $.ajax({
                url:"/Cart/AddGoodsToCart",
                type:"post",
                data:"type=group&gid="+gid+"&num="+goods_num+"&cid="+cart_id+"&groupid="+groupid+"&isactive="+isactive,
                success:function(msg){
                    if(isNaN(msg)){
                        alert(msg);
                        return false;
                    }else{
                        $(".cart-count").html(msg);
                        $(".cart-no").html(msg);
                    }
                }
            });
        }
    }else{
        if(type==1){
            window.open("/Order/zgindex/goods/"+gid+"/group/0/type/0/num/"+goods_num);
        }else{
            $.ajax({
                url:"/Cart/AddGoodsToCart",
                type:"post",
                data:"from=list&gid="+gid+"&num="+goods_num+"&cid="+cart_id,
                success:function(msg){
                    if(isNaN(msg)){
                        alert(msg);
                        return false;
                    }else{
                        $(".cart-count").html(msg);
                        $(".cart-no").html(msg);
                    }
                }
            });
        }
    }
}

/*****************商品筛选************************/
//商品品牌筛选
function click_brand(obj){
    var brand_name=$(obj).text();
    var brand_id=$(obj).attr('attributeid');
    var brand_type='品牌';
    var msg= "<li parm-Id='"+brand_id+"'>"+
                "<a href='javascript:void(0)'>"+
                    "<span class='label-seleted'>"+brand_type+" </span> :"+
                    "<span class='tag-seleted'>"+brand_name+" </span>"+
                    "<i id='del-choose' onclick='del-choose(this)'></i>"+
                "</a>"+
              "</li>";
    $(".yixuan").show();
    $("#reset").show();
    //$("#reset").before(msg);
    $('.selected_tagbox ul li').eq(0).before(msg);
    $(obj).parent().parent(".choose-libox").hide();
    $(".selected-libox").show();
    scan($);
}
//其他属性筛选商品
function click_attribute(obj){
    var attribute_name=$(obj).text();
    var attribute_id=$(obj).attr('attributeid');
    var attribute_type=$(obj).parent().parent().find('.choose-label').text();
    var msg= "<li parm_Id='"+attribute_id+"'>"+
                "<a href='javascript:void(0)'>"+
                    "<span class='label-seleted'>"+attribute_type+" </span> :"+
                    "<span class='tag-seleted'>"+attribute_name+" </span>"+
                    "<i id='del-choose' onclick='del-choose(this)'></i>"+
                "</a>"+
              "</li>";
    $(".yixuan").show();
    $("#reset").show();
    $("#reset").before(msg);
    $(obj).parent().parent(".choose-libox").hide();
    $(".selected-libox").show();
    scan($);
}
//删除某个筛选条件
function del_choose(obj){
    $(obj).parent().parent('li').remove();
    //判断是否取消品牌的筛选
    if($(obj).parent().parent('li').attr('parm-id')=='brand'){
        $('.choose-ulbox .choose-libox').css({"display":"block"});
    }
    if($(".selected-tagbox  ul li").length==1){
        $(".selected-libox").css("display","none");
    }
    else{
        $(".selected-libox").css("display","block");
    }
    scan($);
}
//删除全部筛选值
$(function(){
    $("#reset").click(function(){
        $(this).prevUntil().remove();
        $(".selected-libox").css({"display":"none"});
        $(".choose-libox").show();
        scan($);
    });
});
//根据商品品牌等筛选条件获取列表数据
function scan($){
    var scanparam='',brand='';
    $('#div-select-tagbox ul li').each(function(){
        var pid=$(this).attr("parm_id");
        var ptitle=$(this).find(".label-seleted").text();
        var pval=$(this).find(".tag-seleted").text();
        var brand_name=$('#brandname').attr('attrbrand');
        if(brand_name!=''){
            brand=brand_name;
        }
        var pid=$(this).attr("parm-id");
        var ptitle=$(this).find(".label-seleted").text();
        var pval=$(this).find(".tag-seleted").text();

        if(pid=='brand'){
            brand= $.trim(pval);
        }else{
            if(ptitle !==''||pval!==''){
                scanparam+= $.trim(pid+":"+ptitle+":"+pval+"|");
            }
        }
    });
    brand=brand.replace(/&/,"><");
    var category_type=$('#category-type').attr('category-id');
    var  searchKey=$('#searchkey-type').attr('searchkey-id');
    if(searchKey==undefined){
        searchKey='';
    }
    var dataurl=encodeURI("searchkey="+searchKey+"&pid="+category_type+"&sort=0&brand="+brand+"&dynamicParam="+scanparam);
    $.ajax({
        url:"/Goods/getList",
        type:"GET",
        data:dataurl,
        beforeSend:function(){
            PopLoading('正在加载,请稍后...');
        },
        success:function(msg){
            //alert("searchkey="+searchKey+"&pid="+category_type+"&sort=0&brand="+brand+"&dynamicParam="+scanparam);
            //去掉 排序样式
            $(".choose-item a").siblings().removeClass('selected');
            $('#sort-type').attr('sort-order',0);
            var ajax_msg=msg.split('||');
            //商品品牌
            var brandInfo=ajax_msg[0];
            $('#choose-brand').html(brandInfo);
            //商品动态属性
            var categoryInfo=ajax_msg[1];
            $('#goodsDynamicAttribute').html(categoryInfo);
            //商品数量
            var goodsCount=ajax_msg[2];
            $('#goodsCount').html(goodsCount);
            //商品列表
            var goodsList=ajax_msg[3];
            $('#ul-content').html(goodsList);
            PagingFunction($(this),1,goodsCount,24,6,0,1);
            PopLoaded();
        }
    });
}


//商品样式
function over(obj){
    $(obj).css("border","3px solid #e5004b");
    $(obj).find(".list-good-addcart").css({"background":"#e5004b","color":"#fff"});
}
function out(obj){
    $(obj).css("border","3px solid #fff");
    $(obj).find(".list-good-addcart").css({"background":"#f6f6f6","color":"#333"});
}


$(function(){
	$.get("http://47.104.244.134:8080/goodsbytid.do",{
		tid:13,
		page:1,
		limit:13
	}).done(data=>{
		console.log(data);
		data = data.data;
		var str="";
		for (var i = 0;i<data.length;i++){
			str +=`
					<div id="diva">
						<a href="detail.html?id=${data[i].id}">
						<img src = "${data[i].picurl}">
						<h3>￥${data[i].price}</h3>
						<p>${data[i].name}</p>
						<p>${data[i].info}</p>
						</a>
						
						
					</div>
			`
			$("#box").html(str)
		}
	})
})
}