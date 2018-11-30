$(function(){
	var mainDiv = $("#cms_menu_add_main_div");
	var parentMainDiv = $("#cms_menu_main_div");
	var rootPath = "/menu/";
	mainDiv.off().on("click","a[name='save']",function(){
		if(mainDiv.form('validate')){
			var jsonData = mainDiv.toJSON();
			jsonData.deleted = 0;
			$.ajax({
				url:$.cms.url+rootPath+"add",
				type:"post",
				data:jsonData,
				dataType:"json",
				success:function(data){
					if(data.status){
						$("a[name='search']",parentMainDiv).trigger("click");
						$.EasyUI.Window.close(mainDiv);
					}else{
						$.EasyUI.message(data.error_reason,"s",null);
						return;
					}
				}
			})
		}
	}).on("click","a[name='close']",function(){
		$.EasyUI.Window.close(mainDiv);
	});
});