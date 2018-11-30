<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!-- <!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd"> -->
<html>
<head>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>首页</title>
<script type="text/javascript" src="${pageContext.request.contextPath}/jquery/jquery-1.8.3.min.js"></script>
<link href="${pageContext.request.contextPath}/css/common.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="${pageContext.request.contextPath}/easyui/jquery.easyui.min.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/easyui/easyloader.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/easyui/locale/easyui-lang-zh_CN.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/easyui/common.js"></script>
<link href="${pageContext.request.contextPath}/easyui/themes/color.css" rel="stylesheet" type="text/css" />
<link href="${pageContext.request.contextPath}/easyui/themes/icon.css" rel="stylesheet" type="text/css" />
<link href="${pageContext.request.contextPath}/easyui/themes/bootstrap/easyui.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="${pageContext.request.contextPath}/js/common.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/index.js"></script>
</head>
<body id="cms_body">
	<c:forEach items="${list }" var="item">
		<div class="menu_div" data-url="${item.url }" data-id="${item.id }">
			<div></div>
			<span><img alt="" src="${item.icon }"></span>
			<span>${item.name }</span>
		</div>
	</c:forEach>
	<div class="system_info">
		<div class="user">
			<img alt="" src="">
			<a>i伤心鱼</a>
		</div>
		<div class="menu_list">
			<c:forEach items="${list }" var="item">
				<div class="menu_item" data-url="${item.url }" data-id="${item.id }">
<!-- 					<div></div> -->
	<%-- 				<span><img alt="" src="${item.icon }"></span> --%>
					<span>${item.name }</span>
				</div>
			</c:forEach>
		</div>
	</div>
	<div class="footer">
		<em>
			<img alt="" src="${pageContext.request.contextPath}/images/menu/earth.png">
		</em>
		<a>
			<b>16:42</b>
			<b><fmt:formatDate value="${date }" pattern="yyyy-MM-dd "/></b>
		</a>
	</div>
	<div id="cms_main_right_click" class="easyui-menu" style="width:120px;z-index:999999999;">
		<div name="closeOther" data-options="name:'exit',iconCls:'icon-clear'">关闭其他</div>
		<div name="closeAll" data-options="name:'print',iconCls:'icon-clear'">关闭所有</div>
		<div name="close" data-options="name:'save',iconCls:'icon-clear'">关闭当前</div>
	</div>
	<div id="cms_main_menu_right_click" class="easyui-menu" style="width:120px;z-index:999999999;">
		<div name="open" data-options="name:'exit',iconCls:'icon-open'">打开</div>
		<div name="openNew" data-options="name:'exit',iconCls:'icon-open'">在新窗口打开</div>
	</div>
	<div id="cms_main_body_right_click" class="easyui-menu" style="width:120px;z-index:999999999;">
		<div name="add" data-options="name:'exit',iconCls:'icon-add'">新建菜单项</div>
		<div name="refresh" data-options="name:'exit',iconCls:'icon-refresh'">刷新</div>
		<div name="close" data-options="name:'exit',iconCls:'icon-exit'">退出</div>
	</div>
</body>
</html>