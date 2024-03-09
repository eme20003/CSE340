// Needed Resources 
const express = require("express")
const router = new express.Router() 
const accController = require("../controllers/accController")
const utilities = require("../utilities/")
const regValidate = require('../utilities/account-validation')
const classValidate = require('../utilities/classification-validate')
const invValidate = require('../utilities/inventory-validate')

// Route to build inventory by classification view
router.get("/login", accController.buildLogin);
router.get('/register', accController.buildRegister);
router.get('/management', accController.buildManagement)
router.get('/addClassification', accController.buildClassification)
router.get('/addInventory', accController.buildInventory)
/* Will need to go back and look at utilities.handleErrors
I believe I missed something! */
router.post(
    "/register",
    regValidate.registationRules(),
    regValidate.checkRegData,
    utilities.handleErrors(accController.registerAccount)
  )

router.post(
  '/addClassification',
  classValidate.registationRules(),
  classValidate.checkRegData,
    utilities.handleErrors(accController.registerClassificationInventory)
  )

router.post(
  '/addInventory',
  invValidate.registationRules(),
  invValidate.checkRegData,
    utilities.handleErrors(accController.registerClassificationInventory)
  )

module.exports = router;