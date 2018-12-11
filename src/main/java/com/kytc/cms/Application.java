package com.kytc.cms;

import javax.servlet.MultipartConfigElement;

import net.unicon.cas.client.configuration.EnableCasClient;

import org.mybatis.spring.annotation.MapperScan;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.MultipartConfigFactory;
import org.springframework.boot.web.servlet.ServletComponentScan;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@MapperScan({"com.kytc.cms.dao"})
@ComponentScan(basePackages={"com.kytc"})
@ServletComponentScan
@EnableCasClient // 开启CAS支持
public class Application {
	private static Logger logger = LoggerFactory.getLogger(Application.class);
	@Bean
    public MultipartConfigElement multipartConfigElement() {  
        MultipartConfigFactory factory = new MultipartConfigFactory();  
        //单个文件最大  
        factory.setMaxFileSize("1024MB"); //KB,MB  
        /// 设置总上传数据总大小  
        factory.setMaxRequestSize("2048MB");  
        return factory.createMultipartConfig();  
    }  
	public static void main(String[] args) {
		long start = System.currentTimeMillis();
        SpringApplication.run(Application.class, args);
        logger.info("CMS项目本次启动耗时：{} 毫秒",System.currentTimeMillis()-start);
    }
}
