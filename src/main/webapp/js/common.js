$.ajaxSetup({
	cache: false,
	error: function(xhr, textStatus){//jquery .ajax请求错误统一处理方式	
		if(xhr.status!=200){
			var contextStr;
		    if(xhr.status==401||xhr.status==403||xhr.status==405||xhr.status==406||xhr.status==500){
		    	contextStr=xhr.responseText;        
		    }else if(xhr.status==0){
		    	contextStr="服务器无响应,请联系管理员！";       
		    }else{
		    	contextStr="警告','连接服务器失败,请重试！";        
		    }    
		    $.EasyUI.message(contextStr);	
		}
	},
    complete:function(XMLHttpRequest,textStatus){  
    	 var sessionstatus=XMLHttpRequest.getResponseHeader("sessionstatus");  
         if(sessionstatus=="timeout"){  
        	if($("#ajax_error_alert_div").length<=0){
  				$(document.body).append("<div id='ajax_error_alert_div'></div>");
  			}	    
         	var contextStr="<div style='width:100%;margin-top:50px;text-align:center;'>你已长时间未进行操作，请<a name='refresh' href='#'>重新登录</a></div>";
  		    $("#ajax_error_alert_div").html(contextStr);
	  		$("#ajax_error_alert_div").window({
	            title: "登陆超时",
	            width: 300,
	            height: 150,
	            collapsible: false,
	            minimizable: false,
	            maximizable: false,
	            resizable: false,
	            modal: true
	        });
	  		$("#ajax_error_alert_div a[name='refresh']").off().on("click",function(){
	  			parent.location.href="/login";
	  		})
         }  
    }  
});
/**
 * 公共js方法
 */
String.prototype.trim = function () {
	return this.replace(/^\s\s*/, '' ).replace(/\s\s*$/, '' );
};
String.prototype.endWith=function(endStr){
    var d=this.length-endStr.length;
    return (d>=0&&this.lastIndexOf(endStr)==d)
};
String.prototype.startWith=function(startStr){
    return (this.indexOf(startStr)==0)
};
Date.prototype.format =function(format){
	var o = {
		"M+" : this.getMonth()+1, //month
		"d+" : this.getDate(), //day
		"h+" : this.getHours(), //hour
		"m+" : this.getMinutes(), //minute
		"s+" : this.getSeconds(), //second
		"q+" : Math.floor((this.getMonth()+3)/3), //quarter
		"S" : this.getMilliseconds() //millisecond
	}
	if(/(y+)/.test(format)) 
		format=format.replace(RegExp.$1,(this.getFullYear()+"").substr(4- RegExp.$1.length));
	for(var k in o)
		if(new RegExp("("+ k +")").test(format))
			format = format.replace(RegExp.$1,RegExp.$1.length==1? o[k] :("00"+ o[k]).substr((""+ o[k]).length));
	return format;
};
(function($){
    $.fn.toJSON = function(options){
		var result = [],
		settings = {
			mode: 'first', // what to convert: 'all' or 'first' matched node
			delimiter: ".",
			skipEmpty: true,
			nodeCallback: null,
			useIdIfEmptyName: false
		};
		if (options){
			$.extend(settings, options);
		}
		switch(settings.mode){
			case 'first':
				return form2js(this.get(0), settings.delimiter, settings.skipEmpty, settings.nodeCallback, settings.useIdIfEmptyName);
				break;
			case 'all':
				this.each(function(){
					result.push(form2js(this, settings.delimiter, settings.skipEmpty, settings.nodeCallback, settings.useIdIfEmptyName));
				});
				return result;
				break;
			case 'combine':
				return form2js(Array.prototype.slice.call(this), settings.delimiter, settings.skipEmpty, settings.nodeCallback, settings.useIdIfEmptyName);
				break;
		}
    };
    $.fn.clearForm = function() {
    	return this.each(function() {
    		$('input,select,textarea', this).clearFields();
    	});
    };
    $.fn.resetForm = function() {
    	return this.each(function() {
    		if (typeof this.reset == 'function' || (typeof this.reset == 'object' && !this.reset.nodeType)) {
    			this.reset();
    		}
    	});
    };
})(jQuery);
//定义将表单转化为json的函数
var form2js = (function()
{
	"use strict";
	/**
	 * Returns form values represented as Javascript object
	 * "name" attribute defines structure of resulting object
	 * @param rootNode {Element|String} root form element (or it's id) or array of root elements
	 * @param delimiter {String} structure parts delimiter defaults to '.'
	 * @param skipEmpty {Boolean} should skip empty text values, defaults to true
	 * @param nodeCallback {Function} custom function to get node value
	 * @param useIdIfEmptyName {Boolean} if true value of id attribute of field will be used if name of field is empty
	 */
	function form2js(rootNode, delimiter, skipEmpty, nodeCallback, useIdIfEmptyName){
		if (typeof skipEmpty == 'undefined' || skipEmpty == null) skipEmpty = true;
		if (typeof delimiter == 'undefined' || delimiter == null) delimiter = '.';
		if (arguments.length < 5) useIdIfEmptyName = false;

		rootNode = typeof rootNode == 'string' ? document.getElementById(rootNode) : rootNode;

		var formValues = [],
			currNode,
			i = 0;

		/* If rootNode is array - combine values */
		if (rootNode.constructor == Array || (typeof NodeList != "undefined" && rootNode.constructor == NodeList)){
			while(currNode = rootNode[i++]){
				formValues = formValues.concat(getFormValues(currNode, nodeCallback, useIdIfEmptyName));
			}
		}else{
			formValues = getFormValues(rootNode, nodeCallback, useIdIfEmptyName);
		}

		return processNameValues(formValues, skipEmpty, delimiter);
	}
	/**
	 * Processes collection of { name: 'name', value: 'value' } objects.
	 * @param nameValues
	 * @param skipEmpty if true skips elements with value == '' or value == null
	 * @param delimiter
	 */
	function processNameValues(nameValues, skipEmpty, delimiter){
		var result = {},
			arrays = {},
			i, j, k, l,
			value,
			nameParts,
			currResult,
			arrNameFull,
			arrName,
			arrIdx,
			namePart,
			name,
			_nameParts;

		for (i = 0; i < nameValues.length; i++){
			value = nameValues[i].value;
			if (skipEmpty && (value === '' || value === null)) continue;
			name = nameValues[i].name;
			_nameParts = name.split(delimiter);
			nameParts = [];
			currResult = result;
			arrNameFull = '';

			for(j = 0; j < _nameParts.length; j++){
				namePart = _nameParts[j].split('][');
				if (namePart.length > 1){
					for(k = 0; k < namePart.length; k++){
						if (k == 0){
							namePart[k] = namePart[k] + ']';
						}else if (k == namePart.length - 1){
							namePart[k] = '[' + namePart[k];
						}else{
							namePart[k] = '[' + namePart[k] + ']';
						}

						arrIdx = namePart[k].match(/([a-z_]+)?\[([a-z_][a-z0-9_]+?)\]/i);
						if (arrIdx){
							for(l = 1; l < arrIdx.length; l++){
								if (arrIdx[l]) nameParts.push(arrIdx[l]);
							}
						}else{
							nameParts.push(namePart[k]);
						}
					}
				}else{
					nameParts = nameParts.concat(namePart);
				}							
			}

			for (j = 0; j < nameParts.length; j++){
				namePart = nameParts[j];

				if (namePart.indexOf('[]') > -1 && j == nameParts.length - 1){
					arrName = namePart.substr(0, namePart.indexOf('['));
					arrNameFull += arrName;

					if (!currResult[arrName]) currResult[arrName] = [];
					currResult[arrName].push(value);
				}else if (namePart.indexOf('[') > -1){
					arrName = namePart.substr(0, namePart.indexOf('['));
					arrIdx = namePart.replace(/(^([a-z_]+)?\[)|(\]$)/gi, '');

					/* Unique array name */
					arrNameFull += '_' + arrName + '_' + arrIdx;

					/*
					 * Because arrIdx in field name can be not zero-based and step can be
					 * other than 1, we can't use them in target array directly.
					 * Instead we're making a hash where key is arrIdx and value is a reference to
					 * added array element
					 */

					if (!arrays[arrNameFull]) arrays[arrNameFull] = {};
					if (arrName != '' && !currResult[arrName]) currResult[arrName] = [];

					if (j == nameParts.length - 1){
						if (arrName == ''){
							currResult.push(value);
							arrays[arrNameFull][arrIdx] = currResult[currResult.length - 1];
						}else{
							currResult[arrName].push(value);
							arrays[arrNameFull][arrIdx] = currResult[arrName][currResult[arrName].length - 1];
						}
					}else{
						if (!arrays[arrNameFull][arrIdx]){
							if ((/^[a-z_]+\[?/i).test(nameParts[j+1])) currResult[arrName].push({});
							else currResult[arrName].push([]);

							arrays[arrNameFull][arrIdx] = currResult[arrName][currResult[arrName].length - 1];
						}
					}

					currResult = arrays[arrNameFull][arrIdx];
				}else{
					arrNameFull += namePart;
					if (j < nameParts.length - 1){
						if (!currResult[namePart]) currResult[namePart] = {};
						currResult = currResult[namePart];
					}else{
						currResult[namePart] = value;
					}
				}
			}
		}
		return result;
	}

    function getFormValues(rootNode, nodeCallback, useIdIfEmptyName){
        var result = extractNodeValues(rootNode, nodeCallback, useIdIfEmptyName);
        return result.length > 0 ? result : getSubFormValues(rootNode, nodeCallback, useIdIfEmptyName);
    }

    function getSubFormValues(rootNode, nodeCallback, useIdIfEmptyName){
		var result = [],
			currentNode = rootNode.firstChild;
		
		while (currentNode){
			result = result.concat(extractNodeValues(currentNode, nodeCallback, useIdIfEmptyName));
			currentNode = currentNode.nextSibling;
		}
		return result;
	}

    function extractNodeValues(node, nodeCallback, useIdIfEmptyName) {
        var callbackResult, fieldValue, result, fieldName = getFieldName(node, useIdIfEmptyName);
        callbackResult = nodeCallback && nodeCallback(node);
        if (callbackResult && callbackResult.name) {
            result = [callbackResult];
        }else if (fieldName != '' && node.nodeName.match(/INPUT|TEXTAREA/i)) {
            fieldValue = getFieldValue(node);
			result = [ { name: fieldName, value: fieldValue} ];
        }else if (fieldName != '' && node.nodeName.match(/SELECT/i)) {
	        fieldValue = getFieldValue(node);
	        result = [ { name: fieldName.replace(/\[\]$/, ''), value: fieldValue } ];
        }else {
            result = getSubFormValues(node, nodeCallback, useIdIfEmptyName);
        }
        return result;
    }
	function getFieldName(node, useIdIfEmptyName){
		if (node.name && node.name != '') return node.name;
		else if (useIdIfEmptyName && node.id && node.id != '') return node.id;
		else return '';
	}
	function getFieldValue(fieldNode){
		if (fieldNode.disabled) return null;				
		switch (fieldNode.nodeName) {
			case 'INPUT':
			case 'TEXTAREA':
				switch (fieldNode.type.toLowerCase()) {
					case 'radio':
					case 'checkbox':
                        if (fieldNode.checked && fieldNode.value === "true") return true;
                        if (!fieldNode.checked && fieldNode.value === "true") return false;
						if (fieldNode.checked) return fieldNode.value;
						break;

					case 'button':
					case 'reset':
					case 'submit':
					case 'image':
						return '';
						break;

					default:
						return fieldNode.value;
						break;
				}
				break;
			case 'SELECT':
				return getSelectedOptionValue(fieldNode);
				break;
			default:
				break;
		}
		return null;
	}

	function getSelectedOptionValue(selectNode){
		var multiple = selectNode.multiple,
			result = [],
			options,
			i, l;

		if (!multiple) return selectNode.value;

		for (options = selectNode.getElementsByTagName("option"), i = 0, l = options.length; i < l; i++){
			if (options[i].selected) result.push(options[i].value);
		}
		return result;
	}
	return form2js;
})();
(function($){
	$.cms = function(){};
	$.cms.url = "";
	$.cms.UUID = function(){
		function S4() {
	       return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
	    }
	    return "UUID-"+(S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
	};
	$.cms.toDate = function(timestamp){
		if(timestamp==null||timestamp=='')
			return "";
		var date = new Date(timestamp);
		return date.format('yyyy-MM-dd')
	};
	$.cms.toDateTime = function(timestamp){
		if(timestamp==null||timestamp=='')
			return "";
		if(timestamp==null){
			return "";
		}
		var date = new Date(timestamp);
		return date.format('yyyy-MM-dd hh:mm:ss')
	};
	$.cms.progressbar = function(options){
		var defaultOptions = {
			containerId:$("body")
		};
		options = $.extend(defaultOptions, options || {});
		var uuid = $.cms.UUID();
		var html = "<div class='progress_bar_shadow "+uuid+"'></div><div id='"+
			uuid+"' class='easyui-progressbar progress' style='width:400px;'></div>";
		$(html).appendTo(options.containerId);
		$('#'+uuid).progressbar({
			 width : '200',
		     // 设置进度条高度
		    height : '20',
		    //设置进度条值
		    value : '0',
		    // 设置进度条百分比模版
		    text: '0'
		});
		var flag = true;
		var start = function(){
			if(flag){
				var value = $('#'+uuid).progressbar('getValue');
				if (value < 100){
					value += Math.floor(Math.random() * 10);
					$('#'+uuid).progressbar('setValue', value);
				} else {
					value = 0;
					$('#'+uuid).progressbar('setValue', value);
				}
				setTimeout(arguments.callee, 200);
				$('#'+uuid+' div.progressbar-text').html((value<100?value:100)+"%");
			}
		};
		start();
		this.close = function(){
			flag = false;
			$("div."+uuid).hide().remove();
			$('#'+uuid).hide().remove();
		}
		return this;
	};
})(jQuery);
(function($){
	$.datagrid = function(){};
	$.datagrid.getSelectRow = function(options){
		var defaultOptions = {
			success:function(){},
			selectRow:function(){},
			nullInfo:"请选择要操作的数据",
			moreInfo:"一次只能操作一条数据",
			gridId:"",
			field:""
		};
		options = $.extend(defaultOptions, options || {});
		if(options.gridId.length>0){
			var rows = options.gridId.datagrid('getSelections');
			if(rows.length==1){
				var data = eval("rows[0]."+options.field);
				options.success(data, rows[0]);
				options.selectRow(rows[0]);
			}else if(rows.length>1){
				$.EasyUI.message(options.moreInfo);
			}else{
				$.EasyUI.message(options.nullInfo);
			}
		}else{
			$.EasyUI.message("datagrid ID为空");
		}
	};
	$.datagrid.getSelectRows = function(options){
		var defaultOptions = {
			success:function(){},
			nullInfo:"请选择要操作的数据",
			gridId:"",
			field:""
		};
		options = $.extend(defaultOptions, options || {});
		if(options.gridId.length>0){
			var rows = options.gridId.datagrid('getSelections');
			if(rows.length>0){
				var data = [];
				$.each(rows,function(index,row){
					if(options.field==""){
						data.push(eval(row));
					}else{
						data.push(eval("row."+options.field));
					}
				});
				options.success(data);
			}else{
				$.EasyUI.message(options.nullInfo);
			}
		}else{
			$.EasyUI.message("datagrid ID为空");
		}
	};
})(jQuery);
