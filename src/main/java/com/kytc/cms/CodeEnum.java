package com.kytc.cms;

public enum CodeEnum {
	SUCCESS("00000","操作成功"),
	USER_PASSWORD_ERROR("12345","密码错误！"),
	USER_LONG_TIME_ERROR("11215","长时间未操作,请重新登录..."),
	
	COMMON_ARGS_ERROR("10000","参数错误"),
	
	ADD_SCUUESS("00000","添加成功..."),
	ADD_FAIL("12345","添加失败..."),
	UPDATE_SCUUESS("00000","更新成功..."),
	UPDATE_FAIL("12345","更新失败..."),
	DELETE_SCUUESS("00000","删除成功..."),
	DELETE_FAIL("12345","删除失败...");
	
	CodeEnum(String code,String reason){
		this.code = code;
		this.reason = reason;
	}
	private String code;
	private String reason;
	public String code(){
		return this.code;
	}
	public String reason(){
		return this.reason;
	}
}
