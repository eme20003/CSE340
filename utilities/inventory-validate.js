const utilities = require(".")
const { body, validationResult } = require("express-validator")
const validate = {}

/*  **********************************
 *  Registration Data Validation Rules
 * ********************************* */
validate.registationRules = () => {
    return [
      // firstname is required and must be string
      body("inv_make")
        .trim()
        .isLength({ min: 1 })
        .withMessage("Please provide a make"), // on error this message is sent.
  
      // lastname is required and must be string
      body("inv_model")
        .trim()
        .isLength({ min: 2 })
        .withMessage("Please provide a model."), // on error this message is sent.

              // lastname is required and must be string
      body("inv_year")
      .trim()
      .isLength({ min: 2 })
      .withMessage("Please provide a year."), // on error this message is sent.

            // lastname is required and must be string
        body("inv_description")
        .trim()
        .isLength({ min: 2 })
        .withMessage("Please provide a description."), // on error this message is sent.

                  // lastname is required and must be string
      body("inv_image")
      .trim()
      .isLength({ min: 2 })
      .withMessage("Please provide a image."), // on error this message is sent.

            // lastname is required and must be string
        body("inv_thumbnail")
        .trim()
        .isLength({ min: 2 })
        .withMessage("Please provide a thumbnail."), // on error this message is sent.

                  // lastname is required and must be string
      body("inv_price")
      .trim()
      .isLength({ min: 2 })
      .withMessage("Please provide a price."), // on error this message is sent.

            // lastname is required and must be string
        body("inv_miles")
        .trim()
        .isLength({ min: 2 })
        .withMessage("Please provide a miles."), // on error this message is sent.

                  // lastname is required and must be string
      body("inv_color")
      .trim()
      .isLength({ min: 2 })
      .withMessage("Please provide a color."), // on error this message is sent.
  

    ]
  }

/* ******************************
 * Check data and return errors or continue to registration
 * ***************************** */
validate.checkRegData = async (req, res, next) => {
    const { inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color } = req.body
    let errors = []
    errors = validationResult(req)
    if (!errors.isEmpty()) {
      let nav = await utilities.getNav()
      res.render("account/register", {
        errors,
        title: "Registration",
        nav,
        inv_make, 
        inv_model, 
        inv_year, 
        inv_description, 
        inv_image, 
        inv_thumbnail, 
        inv_price, 
        inv_miles, 
        inv_color
      })
      return
    }
    next()
  }
  
  module.exports = validate