// Needed Resources 
const express = require("express")
const router = new express.Router() 
const invController = require("../controllers/invController")
const classValidate = require('../utilities/classification-validate')
const invValidate = require('../utilities/inventory-validate')
const utilities = require("../utilities/")

// Route to build inventory by classification view
router.get("/type/:classificationId", invController.buildByClassificationId);
router.get("/detail/:invId", invController.buildByInvId)
router.get('/', invController.buildManagement)
router.get('/addClassification', invController.buildClassification)
router.get('/addInventory', invController.buildInventory)

router.post(
    '/addClassification',
    classValidate.classificationRules(),
    classValidate.checkClassificationData,
      utilities.handleErrors(invController.registerClassification)
    )
  
router.post(
  '/addInventory',
  invValidate.inventoryRules(),
  invValidate.checkInvData,
  utilities.handleErrors(invController.registerInventory)
)

module.exports = router;




