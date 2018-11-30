package com.kytc.cms.controller.menu;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.kytc.cms.dto.PageDTO;
import com.kytc.cms.dto.ResultDTO;
import com.kytc.cms.po.menu.MenuPO;
import com.kytc.cms.service.menu.MenuService;
import com.kytc.cms.vo.menu.MenuVO;

@Controller(value="menuController")
@RequestMapping(value="menu")
public class MenuController {

	@Resource(name="menuServiceImpl")
	private MenuService menuServiceImpl;
	private String ROOT_PATH = "/menu/";

	@RequestMapping(value={"","index"},method=RequestMethod.GET)
	public String index() {
		return ROOT_PATH + "index";
	}

	@RequestMapping(value="list")
	@ResponseBody
	public PageDTO<MenuPO> list(MenuVO vo){
		return menuServiceImpl.list(vo);
	}

	@RequestMapping(value="add",method=RequestMethod.GET)
	public String addGet() {
		return ROOT_PATH + "add";
	}

	@RequestMapping(value="add",method=RequestMethod.POST)
	@ResponseBody
	public ResultDTO<String> addPost(MenuPO po) {
//		po.setOperator(SessionUtils.getUserId());
		return menuServiceImpl.add(po);
	}

	@RequestMapping(value="update",method=RequestMethod.GET)
	public String updateGet(Integer id,Model model) {
		model.addAttribute("result", menuServiceImpl.detail(id));
		return ROOT_PATH + "update";
	}

	@RequestMapping(value="update",method=RequestMethod.POST)
	@ResponseBody
	public ResultDTO<String> updatePost(MenuPO po) {
//		po.setOperator(SessionUtils.getUserId());
		return menuServiceImpl.update(po);
	}

	@RequestMapping(value="detail",method=RequestMethod.GET)
	public String detailGet(Integer id,Model model) {
		model.addAttribute("result", menuServiceImpl.detail(id));
		return ROOT_PATH + "detail";
	}

	@RequestMapping(value="delete",method=RequestMethod.POST)
	@ResponseBody
	public ResultDTO<String> delete(MenuPO po){
//		po.setOperator(SessionUtils.getUserId());
		return menuServiceImpl.delete(po);
	}
}