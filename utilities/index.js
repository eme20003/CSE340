const invModel = require("../models/inventory-model")
const Util = {}

/* ************************
 * Constructs the nav HTML unordered list
 ************************** */
Util.getNav = async function (req, res, next) {
  let data = await invModel.getClassifications()
  let list = "<ul>"
  list += '<li><a href="/" title="Home page">Home</a></li>'
  data.rows.forEach((row) => {
    list += "<li>"
    list +=
      '<a href="/inv/type/' +
      row.classification_id +
      '" title="See our inventory of ' +
      row.classification_name +
      ' vehicles">' +
      row.classification_name +
      "</a>"
    list += "</li>"
  })
  list += "</ul>"
  return list
}


/* **************************************
* Build the classification view HTML
* ************************************ */
Util.buildClassificationGrid = async function(data){
    let grid
    if(data.length > 0){
      grid = '<ul id="inv-display">'
      data.forEach(vehicle => { 
        grid += '<li>'
        grid +=  '<a href="../../inv/detail/'+ vehicle.inv_id 
        + '" title="View ' + vehicle.inv_make + ' '+ vehicle.inv_model 
        + 'details"><img src="' + vehicle.inv_thumbnail 
        +'" alt="Image of '+ vehicle.inv_make + ' ' + vehicle.inv_model 
        +' on CSE Motors" /></a>'
        grid += '<div class="namePrice">'
        grid += '<hr />'
        grid += '<h2>'
        grid += '<a href="../../inv/detail/' + vehicle.inv_id +'" title="View ' 
        + vehicle.inv_make + ' ' + vehicle.inv_model + ' details">' 
        + vehicle.inv_make + ' ' + vehicle.inv_model + '</a>'
        grid += '</h2>'
        grid += '<span>$' 
        + new Intl.NumberFormat('en-US').format(vehicle.inv_price) + '</span>'
        grid += '</div>'
        grid += '</li>'
      })
      grid += '</ul>'
    } else { 
      grid += '<p class="notice">Sorry, no matching vehicles could be found.</p>'
    }
    return grid
  }

Util.buildInvDetailGrid = async function(data){
  let grid
  if(data){
    grid = '<div class="inv-detail-view">'

      grid += '<div class="image-Section"'

        grid += '<div class="inv-detail-hero-image">'
        grid += '<img src=' + data[0].inv_image + 'alt="hero image of car selected"' + '/>'
        grid += '</div>'

        grid += '<div class="inv-detail-thumbnail">'
        grid += '<img src =' + data[0].thumbnail + 'alt = "thumbnail image of car"' + '/>'
        grid += '</div>'

      grid += '</div>'

      grid += '<div class="inv-detail-primary">'
      + "<h3> Model: </h3>" + data[0].invModel
      + "<h3> Year: </h3>" + data[0].inv_year
      + "<h3> Miles: </h3>" + data[0].inv_miles
      + "<h3> Color: </h3>" + data[0].inv_color
      grid += '</div>'

      grid += '<div class="inv-detail-secondary">'
      + "<h3> Description: </h3>" + data[0].inv_description
      + "<h3> Price: </h3>" + "$" +  data[0].inv_price
      grid += '</div>'

    grid += '</div>'
  } else {
    grid += '<p class="notice"> Sorry, but we are unable to find what you are looking for! </p>'
  }
  return grid
}

module.exports = Util