
$(function(){
   			var str = "";
            var taken = Getcookie("token")
                $.get("http://47.104.244.134:8080/cartlist.do",{token:taken},Cart)
            function Cart(data) {
                $.each(data,function(i){
                	console.log("aa")
                    str+=` <li goods-id="${data[i].goods.id}">
                    <div><img src="${data[i].goods.picurl}"/><p>${data[i].goods.name}</p></div>
                    <div class = "price">￥${data[i].goods.price/100}</div>
                    <div id = "cartt"><h1 data-id="${data[i].id}" goods-id="${data[i].goods.id}"><span class= "down">-</span><input id="summ" type="text" value="${data[i].count}"><span class ="up">+</span></h1></div>
                    <div class = "aggregate_money">￥${(data[i].goods.price/100*data[i].count).toFixed(2)}</div>
                    <div class="dedel"><i data-id="${data[i].id}" goods-id="${data[i].goods.id}">删除</i></div>
                    </li>`
                })
                $("#cart_item").html(str)
                    var sum = 0;
                    $("#cart_item").find(".aggregate_money").each(function(){
                        sum += Number($(this).html().split("￥")[1])})
                        var ber = $("#cart_item").find("li").length
                        $(".message_").find("b").text("￥"+sum.toFixed(2))
                        $(".moke").text("￥"+sum.toFixed(2))
                        $("#li").text(ber)
                $(".dedel").find("i").click(function(){
                        var id   = $(this).attr("data-id")
                        var goid = $(this).attr("goods-id")
                        $(this).parents("li").remove();
                        alter(id,goid,0,taken)
                        var sum = 0;
                        $("#cart_item").find(".aggregate_money").each(function(){sum += Number($(this).html().split("￥")[1])})
                        var ber = $("#cart_item").find("li").length
                        $(".message_").find("b").text("￥"+sum.toFixed(2))
                        $(".moke").text("￥"+sum.toFixed(2))
                        $("#li").text(ber)
                })
                $(".down").click(function(){
                    var a = -1;
                    var id   = $(this).parent().attr("data-id")
                    var goid = $(this).parent().attr("goods-id")
                    if(Number($(this).parent().find("#summ").val()) == 1 ){return}
                    var price = $(this).parents("li").find(".price").html().split("￥")[1]
                    var numm = Number($(this).parent().find("#summ").val())+a
                    $(this).parent().find("#summ").val(numm)
                    alter(id,goid,a,taken);
                    console.log(price,numm)
                    $(this).parents("li").find(".aggregate_money").text("￥"+(numm*price).toFixed(2))
                    var sum = 0;
                    $("#cart_item").find(".aggregate_money").each(function(){
                        sum += Number($(this).html().split("￥")[1])
                    })
                    $(".message_").find("b").text("￥"+sum.toFixed(2))
                    $(".moke").text("￥"+sum.toFixed(2))
                })

                $(".up").click(function(){
                    var a = 1;
                    var id   = $(this).parent().attr("data-id")
                    var goid = $(this).parent().attr("goods-id")
                    var price = $(this).parents("li").find(".price").html().split("￥")[1]
                    var numm = Number($(this).parent().find("#summ").val())+a
                    $(this).parent().find("#summ").val(numm)
                    alter(id,goid,a,taken)
                    $(this).parents("li").find(".aggregate_money").text("￥"+(numm*price).toFixed(2))
                    var sum = 0;
                    $("#cart_item").find(".aggregate_money").each(function(){
                        sum += Number($(this).html().split("￥")[1])
                    })
                    $(".message_").find("b").text("￥"+sum.toFixed(2))
                    $(".moke").text("￥"+sum.toFixed(2))

                })

                $("#cartt").find("input").focus(function(){
                    console.log("aa")
                    var bn = $(this).val()
                    $(this).blur(function(){
                        var an = $(this).val()
                        if(an<=0){an = 1}
                        if(an-bn == 0){return}
                        if(bn - an > 0){
                            var id   = $(this).parent().attr("data-id")
                            var goid = $(this).parent().attr("goods-id")
                            var price = $(this).parents("li").find(".price").html().split("￥")[1]
                                alter(id,goid,an - bn,taken)
                            $(this).parents("li").find(".aggregate_money").text("￥"+(an*price).toFixed(2))
                            var sum = 0;
                            $("#cart_item").find(".aggregate_money").each(function(){
                                sum += Number($(this).html().split("￥")[1])
                            })
                            $(".message_").find("b").text("￥"+sum.toFixed(2))
                            $(".moke").text("￥"+sum.toFixed(2))
                        }else{
                            var id   = $(this).parent().attr("data-id")
                            var goid = $(this).parent().attr("goods-id")
                            var price = $(this).parents("li").find(".price").html().split("￥")[1]
                                console.log(an - bn)
                                alter(id,goid,an-bn,taken)
                            $(this).parents("li").find(".aggregate_money").text("￥"+(an*price).toFixed(2))
                            var sum = 0;
                            $("#cart_item").find(".aggregate_money").each(function(){
                                sum += Number($(this).html().split("￥")[1])
                            })
                            $(".message_").find("b").text("￥"+sum.toFixed(2))
                            $(".moke").text("￥"+sum.toFixed(2))
                        }
                    })
                })

			//形象改变
            function alter(id,goid,num,taken){
                $.get("http://47.104.244.134:8080/cartupdate.do",{id:id,gid:goid,num:num,token:taken},function(data){})
            }



            //统计学
            function statistics(){
                var sum = 0;
                var ber = $("#cart_item").find("li").length
                $(".message_").find("b").text("￥"+sum.toFixed(2))
                $(".moke").text("￥"+sum.toFixed(2))
                $("#li").text(ber)
            }

}
            })	