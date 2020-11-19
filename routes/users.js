var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

module.exports = router;
/*
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





function getManagerDetails(req, res) {
    var employeeno = req.body.emp_no;
    pool.getConnection(function (err, connection) {
        if (err) throw err;
        connection.query("select * from dept_manager where emp_no = " + employeeno,
            function (err, result, fields) {
                connection.release();
                if (err) {
                    res.json({})
                    //console.log("Error");
                }
                return res.status(200).json(result);

            })
    })

}

function getEmployeesForDepartment(req, res) {
    var departno = req.body.dept_no;
    pool.getConnection(function (err, connection) {
            if (err) throw err;
            connection.query("select employees.emp_no, employees.first_name,employees.last_name from employees join dept_emp on employees.emp_no = dept_emp.emp_no where dept_emp.dept_no= " + departno,
                function (err, result, fields) {
                    connection.release();
                    if (err) console.log("error" + err)
                    else {
                        console.log("employee data" + result);
                        return res.status(200).json(result);
                    }

                }
            )
        }
    )
}

/!*
 function addRating(req, res) {
    /!** add statement to get emp_no **!/

    var metric1 = req.body.metric1;
    console.log(req.body.metric1);

    var metric2 = req.body.metric2
    console.log(req.body.metric2);

    var metric3 = req.body.metric3
    console.log(req.body.metric3);

    var metric4 = req.body.metric4
    console.log(req.body.metric4);

    var metric5 = req.body.metric5
    console.log(req.body.metric5);

    pool.getConnection(function (err, connection) {
        if (err) throw err;
        console.log("Insert into RDS")
        var sql = "Insert into emp_ratings('emp_no','col1','col2','col3','col4','col5') values('metric1','metric2','metric3','metric4','metric5') ";
        connection.query(sql, function (err, result) {
            connection.release();
            if (err) {
                console.log("Error inserting records in table" + err);
            }
            console.log("Row inserted")
            return res.status(500).send('rating saved successfully')

        })


    })


}

function updateRating(req, res) {
    /!** add statement to get emp_no **!/

    var metric1 = req.body.metric1;
    console.log(req.body.metric1);

    var metric2 = req.body.metric2
    console.log(req.body.metric2);

    var metric3 = req.body.metric3
    console.log(req.body.metric3);

    var metric4 = req.body.metric4
    console.log(req.body.metric4);

    var metric5 = req.body.metric5
    console.log(req.body.metric5);

    pool.getConnection(function (err, connection) {
        if (err) throw err;
        console.log("Update Row in RDS")
        var sql = "UPDATE emp_ratings SET col1='metric1',col2='metric2',col3 ='metric3',col4 = 'metric4',col5 = 'metric5' WHERE emp_no =" +  /!* get the emp_no*!/;
        connection.query(sql, function (err, result) {
            connection.release();
            if (err) {
                console.log("Error inserting records in table" + err);
            }
            console.log("Row inserted")
            return res.status(500).send('rating updated successfully')

        })


    })


}

function getRatingForEmployee(req, res) {
    var employeeno = req.body.emp_no;

    pool.getConnection(function (err, connection) {
            if (err) throw err;
            var sql = "select * from emp_ratings where emp_no =" + employeeno;
            connection.query(sql, function (err, result, fields) {
                    connection.release();
                    if (err) console.log("error" + err)
                    else {
                        console.log("employee rating" + result);
                        return
                    .
                        res.status(200).json(result);
                    }

                }
            )
        }
    )
}

*!/
router.get("/perfview/getManagerDetails", getManagerDetails)
router.get("/perfview/getEmployeesForDepartment", getEmployeesForDepartment)
// router.post("/perfview/addRating", addRating)
//router.get("/perfview/getRatingForEmployee", getRatingForEmployee)

module.exports = router;*/
