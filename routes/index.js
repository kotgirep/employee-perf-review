var express = require('express');
var router = express.Router();
var mySQL = require('mysql');

var pool = mySQL.createPool({
    connectionLimit: 1000,
    host: "employee-database.c1ty2hg1gwnk.us-west-1.rds.amazonaws.com",
    user: "admin",
    password: "Techietribe"
});



/* GET home page. */
router.get('/', function (req, res, next) {
  console.log("entered get home page");
  if(!req.userContext){
    return res.render('login', { title: 'Express' })
  }


var employeeno = req.body.logged_emp_no;
  pool.getConnection(function (err, connection) {
      if (err) throw err;
      connection.query("select * from `employees`.dept_manager where emp_no = " + employeeno,
          function (err, result, fields) {
            console.log(JSON.stringify(result));
              if (err || result.length == 0) {
                //res.render('employeeHome', { name: "example" });
                console.log("placeholder");
                console.log(result);
                url = 'http\://localhost:3000/employeeHome.html?empID=' + employeeno;
                res.redirect(url);
              } else{
                result =  JSON.parse(JSON.stringify(result));
                //console.log(result[0].emp_no);
                url = 'http\://localhost:3000/managerHome.html?deptID=' + result[0].dept_no + '&empID=' + employeeno;;
                res.redirect(url);
              }
          });
  })

});

module.exports = router;
