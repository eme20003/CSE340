// Needed Resources 
const express = require("express")
const router = new express.Router() 
const accController = require("../controllers/accController")
const utilities = require("../utilities/")
const regValidate = require('../utilities/account-validation')

// Route to build inventory by classification view
router.get("/login", accController.buildLogin);
router.get('/register', accController.buildRegister);
/* Will need to go back and look at utilities.handleErrors
I believe I missed something! */
router.post(
    "/register",
    regValidate.registationRules(),
    regValidate.checkRegData,
    utilities.handleErrors(accController.registerAccount)
  )

module.exports = router;