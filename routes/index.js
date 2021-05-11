var express = require('express');
var router = express.Router();
var mySQL = require('mysql');

var pool = mySQL.createPool({
  connectionLimit: 1000,
  host: 'employee-database.cog0es3hfp6n.us-east-1.rds.amazonaws.com',
  user: 'admin',
  password: 'Awsproject',
});

/* GET home page. */
router.get('/', function (req, res, next) {
  console.log('entered get home page');
  if (!req.userContext) {
    return res.render('login', { title: 'Express' });
  }

  var employeeno = req.body.logged_emp_no;
  pool.getConnection(function (err, connection) {
    if (err) throw err;
    connection.query(
      'select * from `employees`.dept_manager where emp_no = ' + employeeno,
      function (err, result, fields) {
        console.log(JSON.stringify(result));
        if (err || result.length == 0) {
          console.log('placeholder');
          console.log(result);
          url =
            'http://perfportaltechietribe.ml/employeeHome.html?empID=' +
            employeeno;
          res.redirect(url);
        } else {
          result = JSON.parse(JSON.stringify(result));
          //console.log(result[0].emp_no);
          url =
            'http://perfportaltechietribe.ml/managerHome.html?deptID=' +
            result[0].dept_no +
            '&empID=' +
            employeeno;
          res.redirect(url);
        }
      }
    );
  });
});

module.exports = router;
