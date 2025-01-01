const db = require("../../config/database");

class Employee {
    static async getAll(){
        const [rows] = await db.query('SELECT * FROM employees');
        return rows;
    }

    static async create(data){
        const result = await db.query("INSERT INTO employees (name, id,department, address, phone) VALUE (?,?,?,?)",[data.name, data.id,data.department,data.address,data.phone]);
        return result;
    }

    static async getById(id) {
        const [rows] = await db.query('SELECT * FROM employees WHERE id = ?', [id]);
        return rows[0];
    }

    static async update(id, data) {
        const result = await db.query('UPDATE employees SET name = ?, id = ?,department = ?, address = ?, phone = ? WHERE id = ?', [data.name, data.id,data.department,data.address,data.phone, id]);
        return result;
      }
    
    static async delete(id) {
        const result = await db.query('DELETE FROM employees WHERE id = ?', [id]);
        return result;
      }
}

module.exports = Employee;