package com.kytc.cms.po.menu;

import com.kytc.cms.po.BasePO;
import com.kytc.utils.JsonUtils;

public class MenuPO extends BasePO{
	private String    name;                 //菜单名称
	private String    icon;                 //菜单ICON
	private String    description;          //描述
	private Integer   sortNum;              //排序号
	private String    url;                  //链接地址
	private Boolean   deleted;              //是否删除  1是0否
	private Integer   operator;             //最后操作人
	public void setName(String name){
		this.name = name;
	}
	public String getName(){
		return this.name;
	}
	public void setIcon(String icon){
		this.icon = icon;
	}
	public String getIcon(){
		return this.icon;
	}
	public void setDescription(String description){
		this.description = description;
	}
	public String getDescription(){
		return this.description;
	}
	public void setSortNum(Integer sortNum){
		this.sortNum = sortNum;
	}
	public Integer getSortNum(){
		return this.sortNum;
	}
	public void setDeleted(Boolean deleted){
		this.deleted = deleted;
	}
	public Boolean getDeleted(){
		return this.deleted;
	}
	public void setOperator(Integer operator){
		this.operator = operator;
	}
	public Integer getOperator(){
		return this.operator;
	}
	public String getUrl() {
		return url;
	}
	public void setUrl(String url) {
		this.url = url;
	}
	@Override
	public String toString() {
		return JsonUtils.toJSON( this );
	}
}