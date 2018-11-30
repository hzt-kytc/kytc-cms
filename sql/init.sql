CREATE TABLE `tb_menu` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '主键',
  `name` varchar(255) NOT NULL COMMENT '菜单名称',
  `icon` varchar(255) NOT NULL COMMENT '菜单ICON',
  `description` varchar(255) DEFAULT NULL COMMENT '描述',
  `sort_num` smallint(6) NOT NULL DEFAULT '0' COMMENT '排序号',
  `url` varchar(255) DEFAULT NULL COMMENT 'url',
  `is_deleted` tinyint(4) NOT NULL DEFAULT '0' COMMENT '是否删除  1是0否',
  `operator` int(11) DEFAULT NULL COMMENT '最后操作人',
  `gmt_create` datetime DEFAULT NULL COMMENT '创建时间',
  `gmt_modified` datetime DEFAULT NULL COMMENT '最后修改时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;