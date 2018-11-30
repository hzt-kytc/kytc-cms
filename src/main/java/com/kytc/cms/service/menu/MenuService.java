package com.kytc.cms.service.menu;

import java.util.List;

import com.kytc.cms.dto.PageDTO;
import com.kytc.cms.dto.ResultDTO;
import com.kytc.cms.po.menu.MenuPO;
import com.kytc.cms.vo.menu.MenuVO;

public interface MenuService {
	/**
	 * @author fisher 
	 * @date 2018年11月27日 18:47:35
	 * @description 添加数据 
	 * @param po 
	 * @return ResultDTO<String> 
	**/
	ResultDTO<String> add(MenuPO po);
	/**
	 * @author fisher 
	 * @date 2018年11月27日 18:47:35
	 * @description 修改数据 
	 * @param po 
	 * @return ResultDTO<String> 
	**/
	ResultDTO<String> update(MenuPO po);
	/**
	 * @author fisher 
	 * @date 2018年11月27日 18:47:35
	 * @description 删除数据 
	 * @param po 假删除 删除标志置为1
	 * @return ResultDTO<String> 
	**/
	ResultDTO<String> delete(MenuPO po);
	/**
	 * @author fisher 
	 * @date 2018年11月27日 18:47:35
	 * @description 根据id获取数据详情 
	 * @param id 
	 * @return ResultDTO<MenuPO> 
	**/
	ResultDTO<MenuPO> detail(Integer id);
	/**
	 * @author fisher 
	 * @date 2018年11月27日 18:47:35
	 * @description 获取分页数据源 
	 * @param vo 
	 * @return PageDTO<MenuPO> 
	**/
	PageDTO<MenuPO> list(MenuVO vo);
	/**
	 * @author fisher
	 * @date 2018年11月28日下午5:26:13
	 * @description 
	 * @return List<MenuPO>
	**/
	List<MenuPO> infos();
}