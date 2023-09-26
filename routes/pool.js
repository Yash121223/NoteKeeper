var mysql = require("mysql2");
var pool = mysql.createPool({
  host: "containers-us-west-77.railway.app",
  port: 7562,
  user: "root",
  password: "UgB2IY1CVg6VvFOIjXh9",
  database: "railway",
  connectionLimit: 300,
});



  

 
module.exports = pool;
