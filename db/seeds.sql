-- Inserting data into the department table
INSERT INTO department (name)
VALUES ("Security"), ("Reception"), ("Engineering"), ("Human Resources"), ("Accounting");
-- Inserting data into the role table.
-- Adding roles with their respective titles, salaries, and department IDs they belong to
INSERT INTO role (title, salary, department_id)
VALUES ("Head of Security", 25000.00, 1), ("Accountant", 400000.00, 5), ("Engineer", 600000.00, 3), ("HR Manger", 700000.00, 4), ("Receptionest", 400000.00, 2);
-- Adding employees with their first names, last names, role IDs, and manager IDs
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Erling", "Halland", 1, NULL), ("Marcos", "Alonso", 1, 1), ("Kevin", "Debruyne", 3, 2), ("Bukayo", "Saka", 5, 3), ("Declan", "Rice", 5, 1);