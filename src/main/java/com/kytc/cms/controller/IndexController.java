package com.kytc.cms.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import com.kytc.cms.service.menu.MenuService;

@Controller("indexController")
@RequestMapping("")
public class IndexController {
	@Autowired
	private MenuService menuService;
	@RequestMapping({"index",""})
	public String index(Model model){
		model.addAttribute("list", menuService.infos());
		return "index";
	}
}
