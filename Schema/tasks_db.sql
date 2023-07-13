CREATE DATABASE tasks_db;

USE tasks_db;

CREATE TABLE tasks (
    id INT(11) NOT NULL AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL ,
    description VARCHAR(200) NOT NULL,
    CONSTRAINT pk_taskId PRIMARY KEY (id)
);