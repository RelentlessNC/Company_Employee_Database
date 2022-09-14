INSERT INTO departments(id, name)
VALUES  (1, "Information Technology"),
        (2, "Human Resources");

INSERT INTO roles(id, title, salary, department_id)
VALUES  (1, "Manager", 60.25, 2),
        (2, "Technician", 45.75, 1),
        (3, "Recruiter", 20.50, 1);

INSERT INTO employees(id, first_name, last_name, role_id, manager_id)
VALUES  (1, "John", "Smith", 1, NULL),
        (2, "Ricky", "Jones", 2, 1),
        (3, "Jenna", "Parks", 3, 1);