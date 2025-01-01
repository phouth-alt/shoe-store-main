const Employee = require("../models/employeeModel");
const upload = require("../middleware/upload");
const e = require("express");

exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.getAll();
    res.render("employees", { employees });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};  

exports.renderCreateForm = (req, res) => {
  res.render("createEmployee");
};

exports.createEmployee = async (req, res) => {
  try {
    const data = req.body;
    const result = await Employee.create(data);
    res.redirect("/employees");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getEmployeeById = async (req, res) => {
  try {
    const id = req.params.id;
    const employee = await Employee.getById(id);
    res.render("employeeDetail", { employee });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.renderEditForm = async (req, res) => {  
  try {
    const id = req.params.id;
    const employee = await Employee.getById(id);
    res.render("editEmployee", { employee });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateEmployee = async (req, res) => {  
  try {
    const id = req.params.id;
    const data = req.body;
    const result = await Employee.update(id, data);
    res.redirect("/employees");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteEmployee = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await Employee.delete(id);
    res.redirect("/employees");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};  
