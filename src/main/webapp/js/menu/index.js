$(function(){
	var mainDiv = $("#cms_menu_main_div");
	var mainDivList =  $("div.list div.data",mainDiv);
	var rootPath = "/menu/";
	mainDiv.height($(window).height()-49);
	mainDiv.off().on("click","a[name='add']",function(){
		$.EasyUI.Window({
			url:$.cms.url+rootPath+"add",
			type:"get",
			width:1000,
			height:"auto",
			title:"添加"
		});
	}).on("click","a[name='update']",function(){
		$.datagrid.getSelectRow({
			gridId:mainDivList,
			field:"id",
			success:function(value,row){
				$.EasyUI.Window({
					url:$.cms.url+rootPath+"update",
					type:"get",
					data:{"id":value},
					width:1000,
					height:"auto",
					title:"修改"
				});
			}
		})
	}).on("click","a[name='delete']",function(){
		$.datagrid.getSelectRow({
			gridId:mainDivList,
			field:"id",
			success:function(value,row){
				$.EasyUI.message("确定要删除该条数据吗?",'cf',function(){
					$.ajax({
						url:$.cms.url+rootPath+"delete",
						data:{"id":value},
						type:"post",
						dataType:"json",
						success:function(data){
							if(data.status){
								mainDivList.datagrid('reload',$("form[name='search_form']",mainDiv).toJSON());
							}else{
								$.EasyUI.message(data.reason,"e");
							}
						}
					})
				})
			}
		})
	}).on("click","a[name='search']",function(){
		mainDivList.datagrid('reload',$("form[name='search_form']",mainDiv).toJSON());
	}).on("click","a[name='reset']",function(){
		$("form[name='search_form']",mainDiv).form('clear');
		mainDivList.datagrid('reload',$("form[name='search_form']",mainDiv).toJSON());
	});
	initGrid();
	function initGrid(){
		$("div.list",mainDiv).height(mainDiv.height()-
			$("form[name='search_form']",mainDiv).height()-$("div.btn_div",mainDiv).height()-10);
		var jsonData=$("form[name='search_form']",mainDiv).toJSON();
		$.EasyUI.DataGrid({
			gridId:mainDivList,
			url: $.cms.url+rootPath+"list",
			queryParams: jsonData,//关键之处
			fitColumns: true,
			collapsible:false,
			nowrap: true,
			singleSelect: true,
			pagination: true,
			remoteSort: true,
			border: true,
			rownumbers: false,
			rowStyler:function(){
				return "height:35px";
			},onDblClickRow :function(rowIndex,rowData){
				$.EasyUI.Window({
					url:$.cms.url+rootPath+"detail?id="+rowData.id,
					type:"get",
					width:950,
					height:"auto",
					title:"查询详情"
				});
			},
			columns: [[{
				field: 'CK',
				title: '',
				checkbox: true,
				width: 30
			},{
				field: "id",
				title: "主键",
				width: 100,
				align:  "center",
				sortable: true
			},{
				field: "name",
				title: "菜单名称",
				width: 100,
				align:  "center",
				sortable: true
			},{
				field: "icon",
				title: "菜单ICON",
				width: 100,
				align:  "center",
				sortable: true
			},{
				field: "description",
				title: "描述",
				width: 100,
				align:  "center",
				sortable: true
			},{
				field: "sort_num",
				title: "排序号",
				width: 100,
				align:  "center",
				sortable: true,
				formatter:function(value,row){
					return row.sortNum;
				}
			},{
				field: "is_deleted",
				title: "是否删除",
				width: 100,
				align:  "center",
				sortable: true,
				formatter:function(value,row){
					return row.deleted==1?"是":"否";
				}
			},{
				field: "operator",
				title: "最后操作人",
				width: 100,
				align:  "center",
				sortable: true
			},{
				field: "gmt_create",
				title: "创建时间",
				width: 100,
				align:  "center",
				sortable: true,
				formatter:function(value,row){
					return $.cms.toDateTime(row.gmtCreate);
				}
			},{
				field: "gmt_modified",
				title: "最后修改时间",
				width: 100,
				align:  "center",
				sortable: true,
				formatter:function(value,row){
					return $.cms.toDateTime(row.gmtModified);
				}
			}]]
		});
	}
})