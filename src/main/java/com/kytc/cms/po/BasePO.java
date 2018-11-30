package com.kytc.cms.po;

import java.util.Date;

public class BasePO {
	protected Integer   id;                   //主键
	protected Date      gmtCreate;            //创建时间
	protected Date      gmtModified;          //最后修改时间
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public Date getGmtCreate() {
		return gmtCreate;
	}
	public void setGmtCreate(Date gmtCreate) {
		this.gmtCreate = gmtCreate;
	}
	public Date getGmtModified() {
		return gmtModified;
	}
	public void setGmtModified(Date gmtModified) {
		this.gmtModified = gmtModified;
	}
	@Override
	public String toString() {
		StringBuilder builder = new StringBuilder();
		builder.append("BasePO [id=");
		builder.append(id);
		builder.append(", gmtCreate=");
		builder.append(gmtCreate);
		builder.append(", gmtModified=");
		builder.append(gmtModified);
		builder.append("]");
		return builder.toString();
	}
	
}
