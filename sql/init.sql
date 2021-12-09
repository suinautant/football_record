-- 사용자 새성 및 권한
CREATE USER 'fbrecord'@'localhost' IDENTIFIED BY 'fbrecord123';
GRANT USAGE ON *.* TO 'fbrecord'@'localhost';
GRANT EXECUTE, SELECT, SHOW VIEW, ALTER, ALTER ROUTINE, CREATE, CREATE ROUTINE, CREATE TEMPORARY TABLES, CREATE VIEW, DELETE, DROP, EVENT, INDEX, INSERT, REFERENCES, TRIGGER, UPDATE, LOCK TABLES  ON `fb\_record`.* TO 'fbrecord'@'localhost' WITH GRANT OPTION;
FLUSH PRIVILEGES;

-- DB, TABLE 생성 쿼리
CREATE DATABASE `fb_record` /*!40100 COLLATE 'utf8_general_ci' */;
CREATE TABLE `users` (
	`idx` BIGINT UNSIGNED NOT NULL,
	`username` VARCHAR(50) NOT NULL DEFAULT '',
	`password` VARCHAR(50) NOT NULL DEFAULT ''
)
COLLATE='utf8_general_ci';