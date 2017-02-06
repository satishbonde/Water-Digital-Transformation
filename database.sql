SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

CREATE SCHEMA IF NOT EXISTS `digital_transformation` DEFAULT CHARACTER SET latin1 ;
USE `digital_transformation` ;

-- -----------------------------------------------------
-- Table `digital_transformation`.`user_detail`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `digital_transformation`.`user_detail`;
CREATE TABLE  `digital_transformation`.`user_detail` (
  `user_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `area_id` int(10) unsigned NOT NULL DEFAULT '0',
  `name` varchar(45) NOT NULL DEFAULT '',
  `location` varchar(45) NOT NULL DEFAULT '',
  `longitude` varchar(45) NOT NULL DEFAULT '',
  `latitude` varchar(45) NOT NULL DEFAULT '',
  `ph_value` int(10) unsigned NOT NULL DEFAULT '0',
  `upload_date` varchar(45) NOT NULL DEFAULT '',
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=646 DEFAULT CHARSET=utf8;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;