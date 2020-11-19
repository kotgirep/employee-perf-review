var express = require('express');
var router = express.Router();
var mySQL = require('mysql');

var pool = mySQL.createPool({
    connectionLimit: 1000,
    host: "employee-database.c1ty2hg1gwnk.us-west-1.rds.amazonaws.com",
    user: "admin",
    password: "Techietribe"
});
const AWS = require('aws-sdk');
//console.log("getmanager")

function getManager(req, res,next) {
    console.log("Inside getManager ")
    var employeeno = req.body.emp_no;
    console.log("Employee no is " +employeeno)
    pool.getConnection(function (err, connection) {
        if (err) throw err;
        connection.query("select * from `employees`.dept_manager where emp_no = " + employeeno,
            function (err, result, fields) {
                connection.release();
                if (err) {
                    //res.json({})
                    console.log(err);
                }
                return res.status(200).json(result);

            })
    })

}

router.get('/', getManager);
module.exports = router;
module.exports.getManager = getManager;