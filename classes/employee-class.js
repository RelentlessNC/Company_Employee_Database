class Employee {
    constructor(id, first_name, last_name, role, manager_id) {
        this.id = id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.role = role;
        this.manager_id = manager_id;
    }
}

module.exports = Employee;