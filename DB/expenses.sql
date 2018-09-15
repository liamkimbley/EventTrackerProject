-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema expensesdb
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `expensesdb` ;

-- -----------------------------------------------------
-- Schema expensesdb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `expensesdb` DEFAULT CHARACTER SET utf8 ;
USE `expensesdb` ;

-- -----------------------------------------------------
-- Table `expense`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `expense` ;

CREATE TABLE IF NOT EXISTS `expense` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `price` DOUBLE NOT NULL,
  `description` VARCHAR(500) NULL,
  `reason` VARCHAR(45) NULL,
  `date` DATE NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

SET SQL_MODE = '';
DROP USER IF EXISTS expenses@localhost;
SET SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';
CREATE USER 'expenses'@'localhost' IDENTIFIED BY 'expenses';

GRANT SELECT, INSERT, TRIGGER, UPDATE, DELETE ON TABLE * TO 'expenses'@'localhost';

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Data for table `expense`
-- -----------------------------------------------------
START TRANSACTION;
USE `expensesdb`;
INSERT INTO `expense` (`id`, `name`, `price`, `description`, `reason`, `date`) VALUES (DEFAULT, 'dinner', 20.00, 'happy hour with classmates', 'social', '2018-09-14');
INSERT INTO `expense` (`id`, `name`, `price`, `description`, `reason`, `date`) VALUES (DEFAULT, 'gas', 20.00, NULL, 'car needed gas', '2018-09-12');

COMMIT;

