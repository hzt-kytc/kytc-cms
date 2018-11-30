package com.kytc.cms.dao.menu;

import java.util.List;

import com.kytc.cms.po.menu.MenuPO;
import com.kytc.cms.vo.menu.MenuVO;

public interface MenuDao {
	/**
	 * @author fisher 
	 * @date 2018年11月27日 18:47:35
	 * @description 添加数据 
	 * @param po 
	 * @return Boolean true 添加成功,false 添加失败 
	**/
	Boolean add(MenuPO po);
	/**
	 * @author fisher 
	 * @date 2018年11月27日 18:47:35
	 * @description 修改数据 
	 * @param po 
	 * @return Boolean true 修改成功,false 修改失败 
	**/
	Boolean update(MenuPO po);
	/**
	 * @author fisher
	 * @date 2018年11月27日 18:47:35
	 * @description 删除数据
	 * @param po 假删除 删除标志置为1
	 * @return Boolean true 修改成功,false 修改失败 
	**/
	Boolean delete(MenuPO po);
	/**
	 * @author fisher 
	 * @date 2018年11月27日 18:47:35
	 * @description 根据id获取数据详情 
	 * @param id 
	 * @return MenuPO 
	**/
	MenuPO detail(Integer id);
	/**
	 * @author fisher 
	 * @date 2018年11月27日 18:47:35
	 * @description 获取分页数据源 
	 * @param vo 
	 * @return List<MenuPO> 
	**/
	List<MenuPO> list(MenuVO vo);
	/**
	 * @author fisher 
	 * @date 2018年11月27日 18:47:35
	 * @description 获取数据源总条数 
	 * @param vo 
	 * @return Long 
	**/
	Long count(MenuVO vo);
	/**
	 * @author fisher
	 * @date 2018年11月28日下午5:19:49
	 * @description 
	 * @return List<MenuPO>
	 */
	List<MenuPO> infos();
}