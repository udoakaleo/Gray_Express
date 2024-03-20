const Employee = require('../model/Employee');

const getAllEmployees = async (req, res) => {
    const employees = await Employee.find();
    if(!employees) return res.status(204).json({message: "employees not found"});
    res.json(employees);
}

const createEmployees = (req, res) => {
   if(!req?.body?.firstname || !req?.body?.lastname ){
      res.status(400).json;
   }

   if (!newEmployee.firstName || !newEmployee.lastName){
        return res.status(400).json({'message' : 'first and lastName are required'});
    }
    data.setEmployees([...data.employees, newEmployee]);
    res.status(201).json(data.employees);
}

const updateEmployees = (req,res) => {
    const employee = data.employees.find( emp => emp.id === parseInt(req.body.id));
    if (!employee){
        return res.status(400).json({"message" : `Employee ID ${req.body.id} not found`});
    }
    if(req.body.firstName) employee.firstName = req.body.firstName;
    if (req.body.lastName) employee.lastName = req.body.lastName;
    const filteredArray = data.employees.filter( emp  => emp.id !== parseInt(req.body.id));
    const unsortedArray = [...filteredArray, employee];
    data.setEmployees(unsortedArray.sort((a,b) => a.id > b.id ? 1 : a.id < b.id ? -1 : 0));
    res.json(data.employees);
}

const deleteEmployee = (req, res) => {
   const employee = data.employees.find(emp => emp.id === parseInt(req.body.id));
    if (!employee){
        return res.status(400).json({"message" : `Employee ID ${req.body.id} not found`});
    }
     const filteredArray = data.employees.filter(emp => emp.id !== parseInt(req.body.id));
    data.setEmployees ([...filteredArray]);
    res.json(data.employees);
}

const getEmployee = (req, res) => {
    const employee = data.employees.find( emp  => emp.id === parseInt(req.params.id));
    if (!employee){
        return res.status(400).json({"message" : `Employee ID ${req.body.id} not found`});
    }
    res.json(employee);
}

module.exports = {
    getAllEmployees,
    createEmployees,
    updateEmployees,
    deleteEmployee,
    getEmployee
};