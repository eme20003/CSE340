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

  Util.buildInvDetailGrid = 
  async function (data) { 
    let grid; 
    if (data) { 
      grid = '<div class="inv-detail-view">'; 
      grid += '<div class="image-Section">'; 
      grid += '<div class="inv-detail-hero-image">'; 
      grid += '<img src="' + data[0].inv_image + '" alt= "here image of car selected" />'; 
      grid += "</div>"; grid += '<div class="inv-detail-thumbnail">'; 
      grid += '<img src="' + data[0].inv_thumbnail + '" alt= "thumbnail image of car" />'; 
      grid += "</div>"; grid += "</div>"; 
      grid += '<div class="inv-detail-primary">' 
      + "<h3> Model:          " + data[0].invModel + "</h3>"   
      + "<h3> Year:           " + data[0].inv_year + "</h3>"    
      + "<h3> Miles:          " + data[0].inv_miles + "</h3>"
      + "<h3> Color:          "+ data[0].inv_color + "</h3>";
      grid += "</div>"; 
      grid += "</div>"; 

      grid += '<div class="inv-detail-secondary">' 
      + "<h3> Description: </h3>" 
      + data[0].inv_description 
      + "<h3> Price: </h3>" 
      + "$" 
      + data[0].inv_price; grid 
      += "</div>"; 
    } else { 
      grid += '<p class="notice"> Sorry, but we are unable to find what you are looking for! </p>'; } return grid; };


Util.buildAccForm = 
async function (){
    let grid = '<div class="loginForm">';
    grid += '<form>';
    grid += '<label for="account_email">' + 'Email:' + '</label>'
    grid += '<br>';
    grid += '<input type="email" id="account_email" name="account_email required">';
    grid += '<br>';
    grid += '<label for="account_password">' + 'Password:' + '</label>';
    grid += '<br>';
    grid += '<input type = "text" id="account_password" name="account_password" required>';
    grid += '<br>';
    grid += '<input type="submit" id="login_button" title="Click to Login">';
    grid += '</form>';
    grid += '<p> No Account? <a href="/account/register"> Sign-Up Now!</a> </p>';
    grid += '</div>';
    return grid;
}

Util.buildRegisterForm = 
async function (){
  let grid = '<div class="registerForm">';
  grid += '<form id="registerForm" action="/account/register" method="post">';
  grid += '<label for="account_firstname">' + 'First Name:' + '</label>'
  grid += '<br>';
  grid += '<input type="text" id="account_firstname" name="account_firstname" required>';
  grid += '<br>';
  grid += '<label for="account_lastname">' + 'Last Name:' + '</label>';
  grid += '<br>';
  grid += '<input type = "text" id="account_lastname" name="account_lastname required">';
  grid += '<br>';
  grid += '<label for="account_email">' + 'Email Address:' + '</label>';
  grid += '<br>';
  grid += '<input type = "email" id="account_email" name="account_email required placeholder="Enter a valid email address"">';
  grid += '<br>';
  grid += '<label for="account_password">' + 'Password:' + '</label>';
  grid += '<br>';
  grid += '<input type = "text" id="account_password" name="account_password required pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{12,}$"">';
  grid += '<br>';
  grid += '<input type="submit" id="register_button" title="Register">';
  /* Sending info to server */
  grid += '</form>';
  grid += '<p> Already Have an Account? <a href="/account/login"> Click here to sign in!</a> </p>';
  grid += '</div>';
  return grid;
}



/* ****************************************
 * Middleware For Handling Errors
 * Wrap other function in this for 
 * General Error Handling
 **************************************** */
Util.handleErrors = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

module.exports = Util