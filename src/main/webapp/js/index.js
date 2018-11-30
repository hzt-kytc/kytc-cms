/**
 * 首页js
 */
$(function() {
	var main_div = $("#cms_body");
	var initMenu = function() {
		var win_height = $(window).height();
		var top = 0;
		var left = 0;
		var index = 0;
		$("div.menu_div:visible", main_div).each(function() {
			if (top + $(this).height() + 10 + index * 5 < win_height - 140) {
				$(this).css({
					"left" : 10 + left + "px",
					"top" : 10 + index * 5 + top + "px",
					"position" : "absolute"
				});
				top = top + $(this).height();
				index++;
			} else {
				$(this).css({
					"left" : 10 + left + 80 + "px",
					"top" : 10 + "px",
					"position" : "absolute"
				});
				top = 80;
				left = left + 80;
				index = 1;
			}
		});
	}
	initMenu();
	$(window).resize(function() {
		initMenu();
	});
	var that;
	$("div.menu_div", main_div).mousedown(function(e) {
		that = $(this);
		$(this).css({
			"cursor" : "move"
		})
		var _width = $(this).width();
		var _height = $(this).height();
		var offset = $(this).offset();// DIV在页面的位置
		var x = e.pageX - offset.left;// 获得鼠标指针离DIV元素左边界的距离
		var y = e.pageY - offset.top;// 获得鼠标指针离DIV元素上边界的距离
		var _index = $(this).index();
		$(document).unbind("mousemove").bind("mousemove", function(ev) { // 绑定鼠标的移动事件，因为光标在DIV元素外面也要有效果，所以要用doucment的事件，而不用DIV元素的事件
			var _x = ev.pageX - x;// 获得X轴方向移动的值
			var _y = ev.pageY - y;// 获得Y轴方向移动的值
			var __x = _x;
			var __y = _y;
			$(that).animate({
				left : _x + "px",
				top : _y + "px"
			}, 0);
		});
		$(document).unbind("mouseup").bind("mouseup", function(ev) { // 绑定鼠标的移动事件，因为光标在DIV元素外面也要有效果，所以要用doucment的事件，而不用DIV元素的事件
			$(that).css("cursor", "pointer");
			var left = $(that).offset().left;
			var top = $(that).offset().top;
			var topIndex = Math.round((top-10)/85);
			var leftIndex = Math.round((left-10)/80);
			var _left = 10 + leftIndex * 80;
			var _top = 10 + topIndex * 85;
			$(this).unbind("mousemove");
			$(this).unbind("mouseup");
			var flag = true;
			$("div.menu_div", main_div).each(function(index,item){
				if(flag && $(item).offset().left == _left && $(item).offset().top == _top && index!=_index){
					$(that).css({
						"left" : offset.left + "px",
						"top" : offset.top + "px",
						"position" : "absolute"
					});
					flag = false;
					return false;
				}
			});
			if(flag){
				$(that).css({
					"left" : 10 + leftIndex*80 + "px",
					"top" : 10 + topIndex * 85 + "px",
					"position" : "absolute"
				});
			}
		});
	});
	var setTopWindow = function(){
		var index = 0;
		$(".window",main_div).each(function(){
			var zIndex = $(this).css("z-index")*1;
			if (zIndex > index){
				index = zIndex;
			}
		});
		return index;
	}
	var width = $(window).width();
	var height = $(window).height();
	main_div.on("dblclick", "div.menu_div", function(){
		if($(this).data("state")!=true){
			var title = $("span:last",$(this)).html();
			var url = $(this).data("url");
			var uuid = $.cms.UUID();
			var content = '<iframe src="'+url+'" width="100%" height="100%" frameborder="0" scrolling="no"></iframe>';  
		    var boarddiv = '<div id="'+uuid+'" title="'+title+'"></div>'//style="overflow:hidden;"可以去掉滚动条  
		    $(document.body).append(boarddiv);  
		    var win = $('#'+uuid).dialog({  
		        content: content,  
		        width: width*0.9,  
		        height: height*0.9,  
		        modal: false,  
		        title: title,  
		        onClose: function () {  
		            $(this).dialog('destroy');//后面可以关闭后的事件  
		    		$(".footer span[name='"+uuid+"']",main_div).remove();
		    		$("div.menu_div[name='"+uuid+"']",main_div).data("state",false);
		    		$("div.menu_div[name='"+uuid+"']",main_div).removeAttr("name");
		        }
		    });  
		    win.dialog('open'); 
		    $("div.footer span",main_div).removeClass("active");
		    $(this).attr("name",uuid);
			$(this).data("state", true);
			var _html = "<span name='"+uuid+"'><img alt='"+title+"' src='"+$("img",$(this)).attr("src")+"'/><u>"+title+"</u></span>"
			$(".footer",main_div).append(_html);
			$(".footer span[name='"+uuid+"']",main_div).addClass("active");
			
			$('#'+uuid).click(function(){
				console.log(111)
			})
			
		}else{
			var uuid = $(this).attr("name");
			$(".footer span[name='"+uuid+"']").trigger("click");
		}
	}).on("contextmenu", "div.menu_div", function(e){
		e.preventDefault();
		$('#cms_main_menu_right_click').data("index",$(this).index());
		console.log($(this).index())
		$('#cms_main_menu_right_click').menu('show', {
			left: e.pageX,
			top: e.pageY
		});
		return false;
	}).on("click",".footer em",function(){
		if($("#cms_personal_info_main_div").length>0){
			var index = setTopWindow();
			$("#cms_personal_info_main_div").closest(".window").css("z-index", index*1+4);
			return;
		}
		var url = $(this).data("url");
		var content = '<iframe src="/info" width="100%" height="99%" frameborder="0" scrolling="no"></iframe>';  
	    var boarddiv = '<div id="cms_personal_info_main_div" title="个人信息"></div>'//style="overflow:hidden;"可以去掉滚动条  
	    $(document.body).append(boarddiv);  
	    var win = $('#cms_personal_info_main_div').dialog({  
	        content: content,  
	        width: 250,  
	        height: 497,  
	        modal: false,  
	        left:0,
	        cls:"personal_info",
	        top:$(window).height()-510
	    });  
	    win.dialog('open');
	    return false;
	});
	var main_right_div = $('#cms_main_right_click');
	$("div.footer",main_div).on("contextmenu","span",function(e){
		e.preventDefault();
		$('#cms_main_right_click').data("index",$(this).index());
		$('#cms_main_right_click').menu('show', {
			left: e.pageX,
			top: e.pageY
		});
	}).on("click","span",function(e){
		var uuid = $(this).attr("name");
		var index = 0;
		$(".window",main_div).each(function(){
			var zIndex = $(this).css("z-index")*1;
			if (zIndex > index){
				index = zIndex;
			}
		});
		$("div.footer span",main_div).removeClass("active");
		$(this).addClass("active");
		$("#"+uuid).closest(".window").css("z-index", index*1+4);
	});
	main_right_div.on("click","div[name='close']",function(){
		var index = main_right_div.data("index");
		var uuid = $(".footer span:eq("+(index*1-1)+")",main_div).attr("name");
		$(".footer span:eq("+(index*1-1)+")",main_div).remove();
		$("#"+uuid).destroy();
		$("div.menu_div[name='"+uuid+"']",main_div).data("state",false);
		$("div.menu_div[name='"+uuid+"']",main_div).removeAttr("name");
	}).on("click","div[name='closeOther']",function(){
		var index = main_right_div.data("index");
		$("div.footer span",main_div).each(function(itemIndex,item){
			if(itemIndex!=index){
				var uuid = $(item).attr("name");
				$(item).remove();
				$("#"+uuid).destroy();
				$("div.menu_div[name='"+uuid+"']",main_div).data("state",false);
				$("div.menu_div[name='"+uuid+"']",main_div).removeAttr("name");
			}
		});
	}).on("click","div[name='closeAll']",function(){
		$("div.footer span",main_div).each(function(index,item){
			var uuid = $(item).attr("name");
			$(item).remove();
			$("#"+uuid).destroy();
			$("div.menu_div[name='"+uuid+"']",main_div).data("state",false);
			$("div.menu_div[name='"+uuid+"']",main_div).removeAttr("name");
		});
	});
	$(document).on("click","div.window",function(){
		var uuid = $(this).find("div.window-body").attr("id");
		$("div.footer span",main_div).removeClass("active");
		$("div.footer span[name='"+uuid+"']",main_div).addClass("active");
	});
	$(document).on("click","body:not(#cms_personal_info_main_div,div.footer em),body:not(div.footer>em)",function(){
		if ($("#cms_personal_info_main_div").length>0){
			$("#cms_personal_info_main_div").destroy();
		}
	});
	$("#cms_main_menu_right_click").on("click","div[name='open']",function(){
		var index = $("#cms_main_menu_right_click").data("index");
		$("#cms_body div.menu_div:eq("+index+")").trigger("dblclick")
	}).on("click","div[name='openNew']",function(){
		var index = $("#cms_main_menu_right_click").data("index");
		var url = $("#cms_body div.menu_div:eq("+index+")").data("url")
		window.open($.cms.url+url)
	});
	$(window).on("contextmenu", function(e){
		e.preventDefault();
		$('#cms_main_body_right_click').menu('show', {
			left: e.pageX,
			top: e.pageY
		});
	});
	$("#cms_main_body_right_click").on("click","div[name='add']",function(){
		$.EasyUI.Window({
			url:$.cms.url+"/menu/add",
			type:"get",
			width:600,
			height:"auto",
			title:"添加"
		});
	}).on("click","div[name='refresh']",function(){
		window.location.reload();
	});
	function initDate(){
		var myDate = new Date();
		var dateStr = myDate.toLocaleDateString();
		var hour = myDate.getHours();
		var minute = myDate.getMinutes();
		var second = myDate.getSeconds();
		var time = (hour<10?"0"+hour:hour)+":"+(minute<10?"0"+minute:minute)+":"+(second<10?"0"+second:second);
		$("div.footer a b:eq(1)").html(dateStr)
		$("div.footer a b:eq(0)").html(time)
	};
	initDate();
	window.setInterval(initDate, 1000);
});