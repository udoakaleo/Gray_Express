const express = require('express');
const path = require('path');
const router = express.Router();
const employeesController = require('../../controllers/employeesController');
const ROLE_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');



router.route('/')
.get( employeesController.getAllEmployees)

.post (verifyRoles(ROLE_LIST.Admin, ROLE_LIST.Editor), employeesController.createEmployees)

.put (verifyRoles(ROLE_LIST.Admin, ROLE_LIST.Editor), employeesController.updateEmployees)
  
.delete(verifyRoles(ROLE_LIST.Admin), employeesController.deleteEmployee);

// get request for an id 



router.route('/:id')
.get(employeesController.getEmployee );


module.exports = router;