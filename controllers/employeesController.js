const Employee = require('../model/Employees');

const getAllEmployees = async (req, res) => {
    const employees = await Employee.find();
    if(!employees) return res.status(204).json({message: "employees not found"});
    res.json(employees);
}

const createEmployees = async(req, res) => {
   if(!req?.body?.firstname || !req?.body?.lastname ){
      res.status(400).json;
   }

   try {
         const result = await Employee.create({
            firstname: req.body.firstname,
            lastname: req.boody.lastname
         });
         res.status(201).json(result);
   } catch (error) {
    console.error(error);
   }
}

const updateEmployees = async(req,res) => {
    if(!req?.body?.id) {
        return res.status(400).json({"message": "ID not found"});
        }
        const employee = await Employee.findOne({_id: req.body.id}).exec();
    if (!employee){
        return res.status(204).json({"message" : `Employee ID ${req.body.id} not found`});
    }
    if(req.body?.firstname) employee.firstname = req.body.firstName;
    if (req.body?.lastname) employee.lastname = req.body.lastName;
    const result = await Employee.bulkSave();
    res.json(result);
}

const deleteEmployee = async (req, res) => {
    if(!req?.body?.id) {
        return res.status(400).json({"message": "ID not found"});
    }
    const employee = await Employee.findOne({_id: req.body.id}).exec();
    if (!employee){
        return res.status(400).json({"message" : `Employee ID ${req.body.id} not found`});
    }
      const result = await Employee.deleteOne({_id: req.body.id});
    res.json(result);
}

const getEmployee = async (req, res) => {
    if(!req?.params?.id) {
        return res.status(400).json({"message": "ID not found"});
    }
    const employee = await Employee.findOne({_id: req.params.id}).exec();
    if (!employee){
        return res.status(400).json({"message" : `Employee ID ${req.params.id} not found`});
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