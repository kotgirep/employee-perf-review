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

//console.log("Update Ratings")

function updateRating(req, res) {
    //console.log("Inside updateRating");
    var empno = req.body.emp_no;
    console.log(empno);

    var metric1 = req.body.metric1;
    console.log(metric1);

    var metric2 = req.body.metric2;
    console.log(metric2);

    var metric3 = req.body.metric3
    console.log(metric3);

    var metric4 = req.body.metric4;
    console.log(metric4);

    var metric5 = req.body.metric5;
    console.log(metric5);

    pool.getConnection(function (err, connection) {
        if (err) throw err;
        console.log("Update Row in RDS");
        // var sql = "UPDATE `employees`.emp_ratings SET PunctualityAndDiscipline= ? ,ExecutionOfDuties=? ,LearningAndDevelopment = ? ,TeamCooperation = ?,ResponsibilityTaken = ? WHERE emp_no =? ", [metric1,metric2,metric3,metric4,metric5,empno],
        connection.query("UPDATE `employees`.emp_ratings SET PunctualityAndDiscipline= ? ,ExecutionOfDuties=? ,LearningAndDevelopment = ? ,TeamCooperation = ?,ResponsibilityTaken = ? WHERE EmpNo =? ", [metric1, metric2, metric3, metric4, metric5, empno],
            function (err, result) {
                connection.release();
                if (err) {
                    console.log("Error inserting records in table" + err);
                }
                console.log("Row inserted" + result);
                return res.status(500).send('rating updated successfully');

            })


    })


}

router.post("/", updateRating);
module.exports = router;
module.exports.updateRating = updateRating;