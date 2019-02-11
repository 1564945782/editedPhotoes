/*
Navicat MySQL Data Transfer

Source Server         : wl
Source Server Version : 50200
Source Host           : localhost:3306
Source Database       : today_news

Target Server Type    : MYSQL
Target Server Version : 50200
File Encoding         : 65001

Date: 2019-01-24 00:11:19
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `imgsrc`
-- ----------------------------
DROP TABLE IF EXISTS `imgsrc`;
CREATE TABLE `imgsrc` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `address` varchar(21825) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of imgsrc
-- ----------------------------
INSERT INTO `imgsrc` VALUES ('1', '{\"data\":[\"http://www.leaf.com:3000/uploads/1548259769452_156731.jpg\",\"http://www.leaf.com:3000/uploads/1548259799455_273030.jpg\"]}');
INSERT INTO `imgsrc` VALUES ('2', null);
