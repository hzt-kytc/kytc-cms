package com.kytc.utils;

import com.kytc.cms.CodeEnum;
import com.kytc.cms.dto.ResultDTO;

public class CommonUtils {
	public static <T> ResultDTO<T> returnDTO(CodeEnum codeEnum){
		return new ResultDTO<T>(codeEnum.code(),codeEnum.reason());
	}
    public static <T> ResultDTO<T> returnDTO(T data){
    	ResultDTO<T> result = returnDTO();
    	result.setData(data);
		return result;
	}
    public static <T> ResultDTO<T> returnDTO(CodeEnum codeEnum, T data){
    	ResultDTO<T> result = returnDTO(codeEnum);
    	result.setData(data);
    	return result;
	}
    public static <T> ResultDTO<T> returnDTO(String code,String reason, T data){
    	ResultDTO<T> result = new ResultDTO<T>(code,reason);
    	result.setData(data);
    	return result;
	}
    public static <T> ResultDTO<T> returnDTO(String code,String reason){
    	ResultDTO<T> result = new ResultDTO<T>(code,reason);
    	return result;
	}
	public static <T> ResultDTO<T> returnDTO(){
		return returnDTO(CodeEnum.SUCCESS);
	}
}
