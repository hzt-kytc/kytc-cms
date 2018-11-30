package com.kytc.cms.impl.menu;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Component;

import com.kytc.cms.CodeEnum;
import com.kytc.cms.dao.menu.MenuDao;
import com.kytc.cms.dto.PageDTO;
import com.kytc.cms.dto.ResultDTO;
import com.kytc.cms.po.menu.MenuPO;
import com.kytc.cms.service.menu.MenuService;
import com.kytc.cms.vo.menu.MenuVO;
import com.kytc.utils.CommonUtils;

@Component
@Resource(name="menuServiceImpl")
public class MenuServiceImpl implements MenuService {
	@Resource(name="menuDao")
	private MenuDao menuDao;
	@Override
	public ResultDTO<String> add(MenuPO po) {
		Boolean flag = menuDao.add(po);
		if(flag) {
			return CommonUtils.returnDTO();
		} else {
			return CommonUtils.returnDTO(CodeEnum.ADD_FAIL);
		}
	}
	@Override
	public ResultDTO<String> update(MenuPO po){
		Boolean flag = menuDao.update(po);
		if(flag) {
			return CommonUtils.returnDTO();
		} else {
			return CommonUtils.returnDTO(CodeEnum.UPDATE_FAIL);
		}
	}
	@Override
	public ResultDTO<String> delete(MenuPO po){
		Boolean flag = menuDao.delete(po);
		if(flag) {
			return CommonUtils.returnDTO();
		} else {
			return CommonUtils.returnDTO(CodeEnum.DELETE_FAIL);
		}
	}
	@Override
	public ResultDTO<MenuPO> detail(Integer id){
		return CommonUtils.returnDTO(menuDao.detail(id));
	}
	@Override
	public PageDTO<MenuPO> list(MenuVO vo){
		vo.init();
		PageDTO<MenuPO> page = new PageDTO<MenuPO>();
		page.setRows(menuDao.list(vo));
		page.setTotal(menuDao.count(vo));
		return page;
	}
	@Override
	public List<MenuPO> infos() {
		// TODO Auto-generated method stub
		return menuDao.infos();
	}
}