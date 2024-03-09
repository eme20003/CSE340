const pool = require("../database/")


/* *****************************
*   Register new account
* *************************** */
async function registerAddClassification(classification_name){
    try {
      const sql = "INSERT INTO account (classification_name) VALUES ($1, 'Client') RETURNING *"
      return await pool.query(sql, [classification_name])
    } catch (error) {
      return error.message
    }
  }

  module.exports = {registerAddClassification};