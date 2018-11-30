package com.kytc.cms.dto;

public class ResultDTO<T> {
	private String code;
	private String reason;
	private T data;
	private long timeLength;
	public String getCode() {
		return code;
	}
	public void setCode(String code) {
		this.code = code;
	}
	public String getReason() {
		return reason;
	}
	public void setReason(String reason) {
		this.reason = reason;
	}
	public T getData() {
		return data;
	}
	public void setData(T data) {
		this.data = data;
	}
	public long getTimeLength() {
		return timeLength;
	}
	public void setTimeLength(long timeLength) {
		this.timeLength = timeLength;
	}
	public ResultDTO(){
		
	}
	public ResultDTO(String code,String reason){
		this.code = code;
		this.reason = reason;
	}
	public boolean getStatus(){
		return this.code!=null&&"00000".equals(this.code);
	}
	@Override
	public String toString() {
		return "ResultDTO [code=" + code + ", reason=" + reason + ", data="
				+ data + ", timeLength=" + timeLength + "]";
	}
}
