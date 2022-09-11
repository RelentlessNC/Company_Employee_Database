INSERT INTO department(id, name)
VALUES  (1, "Information Technology"),
        (2, "Human Resources");

INSERT INTO role(id, title, salary, department_id)
VALUES  (1, "Manager", 60.00, 2),
        (2, "Technician", 45.00, 1),
        (3, "Recruiter", 20.00, 1);

INSERT INTO employee(id, first_name, last_name, role_id, manager_id)
VALUES  (1, "John", "Smith", 1, NULL),
        (2, "Ricky", "Jones", 2, 1),
        (3, "Jenna", "Parks", 3, 1);