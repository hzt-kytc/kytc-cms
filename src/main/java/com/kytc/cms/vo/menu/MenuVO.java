package com.kytc.cms.vo.menu;

import com.kytc.cms.vo.BaseVO;
import com.kytc.utils.JsonUtils;

public class MenuVO extends BaseVO{
	private Integer   id;                   //主键
	private String    name;                 //菜单名称
	private String    icon;                 //菜单ICON
	private String    description;          //描述
	private Integer   sortNum;              //排序号
	private Boolean   deleted;              //是否删除  1是0否
	public void setId(Integer id){
		this.id = id;
	}
	public Integer getId(){
		return this.id;
	}
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
	@Override
	public String toString() {
		return JsonUtils.toJSON( this );
	}
}