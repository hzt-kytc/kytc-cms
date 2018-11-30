(function($){
	$.EasyUI=function(){};
	/*
	 * 生成UUID
	 */
	function UUID() {
	    function S4() {
	       return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
	    }
	    return "UUID-"+(S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
	}
	/*
	 * 提示信息
	 */
	$.EasyUI.message = function(content,icon,fun){
		if(icon == "cf"){
			//confirm定义
			$.messager.confirm("系统提示",content,function(r){
				if(r){
					if(typeof fun == "function"){
						fun.call();
					}else{
						Messager("Messager的第三个参数不是一个回调函数！");
					}
				}
			});
		}else if(icon == "s"){
			var dialog  = $('<div style="text-align:center;font-size:20px;line-height:80px;background:#f0f9fd;">'+content+'</div>');
			dialog.appendTo('body');
			dialog.dialog({
				title:false,
				width:"300px",
				height:"100px"
			});
			dialog.dialog('open');
			setTimeout(function(){
				dialog.dialog('close');
			},800);
		}else{
			switch (icon) {
			case "e":
				$.messager.alert("系统提示",content,'error');
				break;
			case "q":
				$.messager.alert("系统提示",content,'question');
				break;
			case "w":
				$.messager.alert("系统提示",content,'warning');
				break;
			default:
				$.messager.alert("系统提示",content);
			break;
			}
		}
	};
	/**
	 * 获取当前操作的window 
	 *  @param target 当前窗口的windowId 或者 当前窗口中的元素(element)
	 */
	function getWindow(target){
		if(typeof target == "string"){
			return document.getElementById(target);
		}else{
			return $(target).parents(".window-body");
		}
	}
	/*
	 * 统一的easy ui打开windows窗口的方法
	 */
	$.EasyUI.Window=function(options){
		if(!options.url){
			return false;
		}
		var windowId;
		if(options.winId){
			windowId=options.winId;
		}else{
			windowId=UUID();
		}
		if(options.buttons){
			var closeBtn = {
					text:'关闭',
					handler:function(){
						$(GETWIN(this)).destroy();
					}
			};
			options.buttons.push(closeBtn);
		}
		options = $.extend({},$.EasyUI.Window.defaults, options || {});
		
		var dialog  = $('<div id="'+windowId+'">加载中……</div>');
		dialog.appendTo('body');
		if(options.params!=null){
			dialog.data("options",options.params)
		}
		$.ajax({
			url:options.url,
			type:options.type || "POST",
			data:options.data == null ? "" : options.data,
			success:function(data){
				if(data==""){
					$.messager.alert('警告','服务器无响应,请联系管理员！','error');
				}else{
					$("#"+windowId).html(data);
					$.parser.parse(dialog);
					dialog.dialog(options);
					dialog.dialog('open');
					options.onComplete.call(this,windowId);	//触发回调函数
				}
			},
			error:options.error || function(xhr, textStatus, thrownError){
				//uniform_jquery_ajax_error_handle(xhr, textStatus, thrownError);
				alert(111);
			}
		});
		return windowId;
	}
	window.GETWIN = getWindow;
	//关闭并销毁实体
	$.fn.destroy =function(){
		var options = $(this).dialog("options");
		$(this).dialog("destroy");
		if(options.fck){
			$("body").children("iframe").remove();
		}
	};
	//关闭window窗口
	$.EasyUI.Window.close = function(windowId){
		$(windowId).parents(".window-body").destroy();
	};//,//创建成功后的回调方法		
	$.EasyUI.Window.defaults = $.extend({},$.fn.dialog.defaults,{
		url:'',					//窗口要加载的html片段地址
		data:'',				//可带参数，data类型为jqurey.ajax的data参数类型
		zIndex: 100000,			
		height : 600,
		width : 800,
		collapsible: false,
		minimizable: false,
		maximizable: true,
		resizable:true,
		closable: true,
		modal:true,
		onClose:function(){
			$(this).dialog("destroy");
		},
		onComplete:function(windowId){}//,//创建成功后的回调方法		
	});
	$.EasyUI.DataGrid=function(options){
		options = $.extend({}, $.EasyUI.DataGrid.defaults, options || {});
		options.gridId.datagrid(options);
	}
	//DataGrid默认参数
	$.EasyUI.DataGrid.defaults = {
			loadMsg: "加载中,请稍后……",
			fit: true,
			nowrap: true,
			striped: false,
			fitColumns: false,
			pagination: true,
			pageList:[15,30,50,80,100,150,200],
			pageSize:15,
			remoteSort:false,
			rownumbers:true,
			rowStyler: function(){
				return "line-height: 15px;cursor: pointer;";
			}
	};
})(jQuery);
/**
 * 为grid添加自己重新加载方法
 */
$.extend($.fn.datagrid.methods, {
    myreload: function(jq, newposition){
    	 return jq.each(function(){
    		 	//显示第一页数据   
    			$(this).datagrid("options").pageNumber = 1;   
    			//分页栏上跳转到第一页   
    			$(this).datagrid('getPager').pagination({pageNumber: 1}); 
    			$(this).datagrid("reload",newposition);
         });
    }
});
$.extend($.fn.datagrid.defaults.editors, {
     radiobox: {//radiobox就是你要自定义editor的名称
         init: function(container, options){
        	 var _name = container.context.attributes[0].value;
             var radio = $('<input type="radio" name="'+_name+'">').appendTo(container);
             return radio;
         },
         getValue: function(target){
             return $(target).parent().find('input').prop("checked");
         },
         setValue: function(target, value){
             if(value==true){
            	 $(target).prop("checked",true);
             }else{
            	 $(target).prop("checked",false);
             }
         },
         resize: function(target, width){
            var input = $(target);
            if ($.boxModel == true){
                 input.width(width - (input.outerWidth() - input.width()));
            } else {
                 input.width(width);
             }
         }
     }
});