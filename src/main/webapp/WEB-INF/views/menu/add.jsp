<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/menu/add.js"></script>
<div id="cms_menu_add_main_div" style="width:100%;height:100%;">
	<table class="d_table">
		<tr>
			<td style="width:15%;">菜单名称:</td>
			<td style="width:35%;">
				<input name="name" class="easyui-textbox"/>
			</td>
			<td style="width:15%;">排序号:</td>
			<td style="width:35%;">
				<input class="easyui-numberbox" name="sortNum" value="1" data-options="min:1,required:true">
			</td>
		</tr>
		<tr>
			<td>菜单ICON:</td>
			<td colspan="3">
				<span class="textbox1 textbox1-focus">
					<input name="icon" class="textbox"/>
				</span>
			</td>
		</tr>
		<tr>
			<td>路径:</td>
			<td colspan="3">
				<span class="textbox1 textbox1-focus">
					<input name="url" class="textbox"/>
				</span>
			</td>
		</tr>
		<tr>
			<td>描述:</td>
			<td colspan="3">
				<span class="textbox1 textbox1-focus" style="height:90px;">
<!-- 					<input name="url" class="textbox"/> -->
					<textarea cols="50" rows="5" name="description" class="textbox" style="height:90px;"></textarea>
				</span>
			</td>
		</tr>
		<tr>
			<td colspan="4">
				<div class="btn_div">
					<a name="save" class="easyui-linkbutton" data-options="iconCls:'icon-save'">保存</a>
					<a name="close" class="easyui-linkbutton" data-options="iconCls:'icon-close'">关闭</a>
				</div>
			</td>
		</tr>
	</table>
</div>