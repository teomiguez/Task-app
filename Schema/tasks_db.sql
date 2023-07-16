--
-- Script base de datos `chat_db`
--

CREATE DATABASE tasks_db;
USE tasks_db;

/*----------------------------------------------------------*/

--
-- Estructura de tabla para la tabla `tasks`
--

CREATE TABLE tasks (
    id INT(11) NOT NULL,
    name VARCHAR(50) NOT NULL ,
    description VARCHAR(200) NOT NULL
);

/*----------------------------------------------------------*/
/*----------------------------------------------------------*/

--
-- Indices de la tabla `tasks`
--
ALTER TABLE tasks
  ADD PRIMARY KEY (id);

/*----------------------------------------------------------*/
/*----------------------------------------------------------*/

--
-- AUTO_INCREMENT de la tabla `tasks`
--
ALTER TABLE tasks
  MODIFY id int(11) NOT NULL AUTO_INCREMENT;