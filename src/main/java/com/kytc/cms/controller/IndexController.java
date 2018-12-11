package com.kytc.cms.controller;

import java.security.Principal;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.jasig.cas.client.authentication.AttributePrincipal;
import org.jasig.cas.client.validation.Assertion;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import com.kytc.cms.service.menu.MenuService;

@Controller("indexController")
@RequestMapping("")
public class IndexController {
	private static final String CAS_KEY = "_const_cas_assertion_";
	@Autowired
	private MenuService menuService;
	@RequestMapping({"index",""})
	public String index(Model model,HttpServletRequest request){
//		HttpSession session = request.getSession();
		Assertion assertion = (Assertion) request.getSession().getAttribute(CAS_KEY);

        Principal principal  = assertion.getPrincipal();

        String loginName =principal.getName();
        System.out.printf("登录用户名:%s\r\n",loginName);

        System.out.printf("ValidFromDate:%s\r\n",assertion.getValidFromDate());
        System.out.printf("ValidUntilDate:%s\r\n",assertion.getValidUntilDate());
        System.out.printf("AuthenticationDate:%s\r\n",assertion.getAuthenticationDate());

        //获取自定义返回值的数据
        if (principal instanceof AttributePrincipal) {
            //cas传递过来的数据
            Map<String,Object> result =( (AttributePrincipal)principal).getAttributes();
            for(Map.Entry<String, Object> entry :result.entrySet()) {
                String key = entry.getKey();
                Object val = entry.getValue();
                System.out.printf("%s:%s\r\n",key,val);
            }
        }
		model.addAttribute("list", menuService.infos());
		return "index";
	}
}
