var express = require('express');
var router = express.Router();
var mySQL = require('mysql');

var pool = mySQL.createPool({
    connectionLimit: 1000,
    host: "employee-database.c1ty2hg1gwnk.us-west-1.rds.amazonaws.com",
    user: "admin",
    password: "Techietribe"
});

//console.log("getEmployeeRating")
/* Function to view the ratings as employee */
function getEmployeeRating(req, res) {
    console.log("Inside getEmployeeRating")
    var employeeno = req.body.emp_no;
    console.log(employeeno)
    pool.getConnection(function (err, connection) {
            if (err) throw err;
            var sql = "select * from `employees`.emp_ratings where EmpNo =" + employeeno;
            connection.query(sql, function (err, result, fields) {
                    connection.release();
                    if (err) console.log("error" + err)
                    else {
                        console.log("employee rating" + result);
                        return res.status(200).json(result);
                    }

                }
            )
        }
    )
}

router.post("/", getEmployeeRating)
module.exports = router;
