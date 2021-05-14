var mySQL = require('mysql');
const employeepath = '/employees';
const ratingpath = '/rating';

var pool = mySQL.createPool({
  host: 'employee-database.cog0es3hfp6n.us-east-1.rds.amazonaws.com',
  user: 'admin',
  password: 'Awsproject',
});

exports.handler = (event, context, callback) => {
  let response;
  switch (true) {
    case event.httpMethod === 'GET' && event.path === '/employees':
      response = getemployees(
        event.queryStringParameters.dept_no,
        context,
        callback
      );
      break;
    case event.httpMethod === 'GET' && event.path === '/rating':
      response = getRating(
        event.queryStringParameters.emp_no,
        context,
        callback
      );
      console.log(response);
      break;
    case event.httpMethod === 'GET' && event.path === '/manager':
      console.log(event.httpMethod);
      response = getManager(
        event.queryStringParameters.emp_no,
        context,
        callback
      );
      console.log(response);
      break;
    case event.httpMethod === 'POST' && event.path === '/rating':
      console.log(event.httpMethod);
      response = addRatings(
        event.queryStringParameters.EmpNo,
        event.queryStringParameters.PunctualityAndDiscipline,
        event.queryStringParameters.ExecutionOfDuties,
        event.queryStringParameters.LearningAndDevelopment,
        event.queryStringParameters.TeamCooperation,
        event.queryStringParameters.ResponsibilityTaken,
        context,
        callback
      );
      console.log(response);
      break;
    case event.httpMethod === 'PATCH' && event.path === '/rating':
      console.log(event.httpMethod);
      response = updateRatings(
        event.queryStringParameters.PunctualityAndDiscipline,
        event.queryStringParameters.ResponsibilityTaken,
        event.queryStringParameters.ExecutionOfDuties,
        event.queryStringParameters.LearningAndDevelopment,
        event.queryStringParameters.TeamCooperation,
        event.queryStringParameters.EmpNo,
        context,
        callback
      );
      console.log(response);
      break;
    case event.httpMethod === 'GET' && event.path === '/verify':
      response = verifyUser(
        event.queryStringParameters.email,
        context,
        callback
      );
      break;
    case event.httpMethod === 'GET' && event.path === '/isemployeevalid':
      response = verifyEmployee(
        event.queryStringParameters.dept_no,
        event.queryStringParameters.emp_no,
        context,
        callback
      );
      break;
  }
  return response;
};

function getManager(employeeno, context, callback) {
  console.log(employeeno);
  //prevent timeout from waiting event loop
  context.callbackWaitsForEmptyEventLoop = false;
  pool.getConnection(function (err, connection) {
    // Use the connection
    console.log('inside getConnection');
    var sql =
      'select * from `employees`.dept_manager where emp_no = ' + employeeno;
    connection.query(sql, function (error, results, fields) {
      // Handle error after the release.
      if (err) callback(err);
      else {
        if (results.length > 0) {
          callback(null, {
            statusCode: 200,
            body: JSON.stringify(results),
            headers: {
              'Access-Control-Allow-Headers': 'Content-Type',
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Methods': 'OPTIONS,POST,GET',
              'Content-Type': 'application/json',
            },
          });
        } else {
          var sql =
            'select PunctualityAndDiscipline, ExecutionOfDuties, LearningAndDevelopment, TeamCooperation, ResponsibilityTaken from employees.emp_ratings where EmpNo = ' +
            employeeno;

          connection.query(sql, function (err, result, fields) {
            connection.release();
            if (err) console.log('error' + err);
            else {
              callback(null, {
                statusCode: 200,
                body: JSON.stringify(result),
                headers: {
                  'Access-Control-Allow-Headers': 'Content-Type',
                  'Access-Control-Allow-Origin': '*',
                  'Access-Control-Allow-Methods': 'OPTIONS,POST,GET',
                  'Content-Type': 'application/json',
                },
              });
            }
          });
        }
      }
    });
  });
}

function getRating(employeeno, context, callback) {
  console.log('Rating');
  //prevent timeout from waiting event loop
  context.callbackWaitsForEmptyEventLoop = false;
  pool.getConnection(function (err, connection) {
    // Use the connection
    console.log('inside getConnection');
    var sql =
      'select PunctualityAndDiscipline, ExecutionOfDuties, LearningAndDevelopment, TeamCooperation, ResponsibilityTaken from employees.emp_ratings where EmpNo = ' +
      employeeno;
    connection.query(sql, function (error, results, fields) {
      // And done with the connection.
      connection.release();
      // Handle error after the release.
      if (err) callback(err);
      else {
        console.log(results);
        callback(null, {
          statusCode: 200,
          body: JSON.stringify(results),
          headers: {
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS,POST,GET',
            'Content-Type': 'application/json',
          },
        });
      }
    });
  });
}

function getemployees(departno, context, callback) {
  console.log('Depart no is ' + departno);

  context.callbackWaitsForEmptyEventLoop = false;
  pool.getConnection(function (err, connection) {
    connection.query(
      "select employees.emp_no, employees.first_name,employees.last_name, employees.hire_date from `employees`.employees join `employees`.dept_emp on `employees`.employees.emp_no = `employees`.dept_emp.emp_no where `employees`.dept_emp.dept_no= '" +
        departno +
        "'",
      function (err, result, fields) {
        connection.release();
        if (err) {
          console.log('error' + err);
          callback(err);
        } else {
          console.log('employee data' + result);
          callback(null, {
            statusCode: 200,
            body: JSON.stringify(result),
            headers: {
              'Access-Control-Allow-Headers': 'Content-Type',
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Methods': 'OPTIONS,POST,GET',
              'Content-Type': 'application/json',
            },
          });
        }
      }
    );
  });
}

// function to verify if the employee number is valid and returns the employee details (for chat bot)

function verifyEmployee(departno, empNo, context, callback) {
  console.log('Depart no is ' + departno);

  context.callbackWaitsForEmptyEventLoop = false;
  pool.getConnection(function (err, connection) {
    connection.query(
      "select employees.emp_no, employees.first_name,employees.last_name, employees.hire_date from `employees`.employees join `employees`.dept_emp on `employees`.employees.emp_no = `employees`.dept_emp.emp_no where `employees`.dept_emp.dept_no= '" +
        departno +
        "' and `employees`.dept_emp.emp_no = " +
        empNo,
      function (err, result, fields) {
        connection.release();
        if (err) {
          console.log('error' + err);
          callback(err);
        } else {
          console.log('employee data' + result);
          callback(null, {
            statusCode: 200,
            body: JSON.stringify(result),
            headers: {
              'Access-Control-Allow-Headers': 'Content-Type',
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Methods': 'OPTIONS,POST,GET',
              'Content-Type': 'application/json',
            },
          });
        }
      }
    );
  });
}

// function for add employee rating

function addRatings(
  emp_no,
  metric1,
  metric2,
  metric3,
  metric4,
  metric5,
  context,
  callback
) {
  console.log('inside add employee rating');

  console.log('employeeno: ' + emp_no);
  console.log('metric1: ' + metric1);
  console.log('metric2: ' + metric2);
  console.log('metric3: ' + metric3);
  console.log('metric4: ' + metric4);
  console.log('metric5: ' + metric5);

  context.callbackWaitsForEmptyEventLoop = false;

  pool.getConnection(function (err, connection) {
    console.log('inside add rating for employees');
    connection.query(
      'INSERT INTO `employees`.emp_ratings(EmpNo,PunctualityAndDiscipline,ExecutionOfDuties,LearningAndDevelopment,TeamCooperation,ResponsibilityTaken) values (?,?,?,?,?,?)',
      [emp_no, metric1, metric2, metric3, metric4, metric5],
      function (err, result, fields) {
        connection.release();
        if (err) {
          console.log('error' + err);
          callback(err);
        } else {
          console.log('employee updated ratings' + result);
          callback(null, {
            statusCode: 200,
            body: JSON.stringify(result),
            headers: {
              'Access-Control-Allow-Headers': 'Content-Type',
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Methods': 'OPTIONS,POST,GET',
              'Content-Type': 'application/json',
            },
          });
        }
      }
    );
  });
}

// function for update employee rating

function updateRatings(
  metric1,
  metric2,
  metric3,
  metric4,
  metric5,
  empno,
  context,
  callback
) {
  console.log('inside update rating function');
  console.log('metric1: ' + metric1);
  console.log('metric2: ' + metric2);
  console.log('metric3: ' + metric3);
  console.log('metric4: ' + metric4);
  console.log('metric5: ' + metric5);
  console.log('employeeno: ' + empno);

  context.callbackWaitsForEmptyEventLoop = false;
  pool.getConnection(function (err, connection) {
    connection.query(
      'UPDATE `employees`.emp_ratings SET PunctualityAndDiscipline= ? ,ExecutionOfDuties=? ,LearningAndDevelopment = ? ,TeamCooperation = ?,ResponsibilityTaken = ? WHERE EmpNo =? ',
      [metric1, metric2, metric3, metric4, metric5, empno],
      function (err, result, fields) {
        connection.release();
        if (err) {
          console.log('error' + err);
          callback(err);
        } else {
          console.log('employee updated ratings' + result);
          callback(null, {
            statusCode: 200,
            body: JSON.stringify(result),
            headers: {
              'Access-Control-Allow-Headers': 'Content-Type',
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Methods': 'OPTIONS,POST,GET,PATCH',
              'Content-Type': 'application/json',
            },
          });
        }
      }
    );
  });
}

// function to verify user

function verifyUser(email, context, callback) {
  console.log('inside verify user');
  //console.log(event.userContext);
  //log(email);
  //var email = event.userContext.userinfo.preferred_username;
  console.log('email:' + email);

  //prevent timeout from waiting event loop
  context.callbackWaitsForEmptyEventLoop = false;
  pool.getConnection(function (err, connection) {
    if (err) throw err;
    connection.query(
      "select * from `employees`.emp_email where email = '" + email + "'",
      function (err, result, fields) {
        if (err || !result || result.length == 0) {
          console.log('error login ');
        }

        callback(null, {
          statusCode: 200,
          body: JSON.stringify(result),
          headers: {
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS,POST,GET',
            'Content-Type': 'application/json',
          },
        });

        //next();
      }
    );
  });
}
function buildresponse(status, body) {
  return {
    statusCode: 200,
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(body),
  };
}
