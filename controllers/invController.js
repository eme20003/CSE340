const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")
const addInventoryModel = require("../models/add-inventory-model")
const addClassificationModel = require("../models/add-classification-model")

const invCont = {}

/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
  const classification_id = req.params.classificationId
  const data = await invModel.getInventoryByClassificationId(classification_id)
  const grid = await utilities.buildClassificationGrid(data)
  let nav = await utilities.getNav()
  const className = data[0].classification_name
  res.render("./inventory/classification", {
    title: className + " vehicles",
    nav,
    grid,
  })
}

invCont.buildByInvId = async function (req, res, next) {
  const inv_id = req.params.invId
  const data = await invModel.getDetailsById(inv_id)
  const grid = await utilities.buildInvDetailGrid()
  let nav = await utilities.getNav()
  const className = data[0].inv_make
  console.log("price: " + data.inv_price)
  res.render("./inventory/details", {
    title: className,
    nav,
    grid,
  })
}

 invCont.buildManagement = async function (req, res, next){
  let nav = await utilities.getNav()
  res.render("inventory/management", {
      title: "Management",
      nav,
      errors: null,
  })
}

/* Classification */

invCont.buildClassification = async function (req, res, next){
  let nav = await utilities.getNav()

  const { classification_name } = req.body

  const regResult = await addClassificationModel.registerAddClassification(
    classification_name
  )

  res.render("inventory/add-classification", {
      title: "Add Classification",
      nav,
      errors: null,
  })
}

/* Inventory */

invCont.buildInventory = async function (req, res, next){
  let nav = await utilities.getNav()

  const { inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color } = req.body

  const regResult = await addInventoryModel.registerAddInventory(
      inv_make, 
      inv_model, 
      inv_year, 
      inv_description, 
      inv_image, 
      inv_thumbnail, 
      inv_price, 
      inv_miles, 
      inv_color
  )
  res.render("inventory/add-inventory", {
      title: "Add Inventory",
      nav,
      errors: null,
  })
}

invCont.registerClassification = async function (req, res) {
  let nav = await utilities.getNav()
  console.log('1')
  res.render("inventory/add-classification", {
    title: "Add Classification",
    nav,
    errors: null,
})
}

invCont.registerInventory = async function(req, res) {
  let nav = await utilities.getNav()
  const { inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color } = req.body

  const regResult = await addClassificationModel.registerAddClassification(
    inv_make, 
    inv_model, 
    inv_year, 
    inv_description, 
    inv_image, 
    inv_thumbnail, 
    inv_price, 
    inv_miles, 
    inv_color
  )

  if (regResult) {
    req.flash(
      "notice",
      `Congratulations, you\'re registered ${inv_make}!`
    )
    res.status(201).render("inventory/add-inventory", {
      title: "Inventory",
      nav,
    })
  } else {
    req.flash("notice", "Sorry, the registration failed.")
    res.status(501).render("ainventory/add-inventory", {
      title: "Inventory",
      nav,
      errors: null,
    })
  }
}


module.exports = invCont