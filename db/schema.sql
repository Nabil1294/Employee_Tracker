-- Drop the employees database if it already exists
DROP DATABASE if EXISTS employees;
-- Create a new employees database
CREATE DATABASE employees;

-- Set the use to the employees database
USE employees;

-- Create the department table
CREATE Table department (
    -- Primary key with auto-incrementing integer value
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    -- Unique department name
    name VARCHAR(30) UNIQUE NOT NULL
);

-- Create the role table
CREATE TABLE role (
    -- Primary key with auto-incrementing integer value
    id INT AUTO_INCREMENT PRIMARY KEY,
    -- Unique role title
    title VARCHAR(30) UNIQUE NOT NULL,
    -- Salary associated with the role
    salary DECIMAL NOT NULL,
    -- Foreign key referencing the department table
    department_id INT NOT NULL,
    FOREIGN KEY (department_id)
    REFERENCES department(id)
    ON DELETE CASCADE
);

-- Create the employee table
CREATE TABLE employee (
    -- Primary key with auto-incrementing integer value
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    -- Foreign key referencing the role table
    FOREIGN key (role_id)
    REFERENCES role(id)
    ON DELETE CASCADE,
    -- Self-referencing foreign key to determine an employee's manager
    manager_id INT,
    FOREIGN key (manager_id)
    REFERENCES employee(id)
    ON DELETE SET NULL
);
