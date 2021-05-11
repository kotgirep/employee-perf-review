window.onload = function () {
  var url = document.location.href,
    params = url.split('?')[1].split('&'),
    data = {},
    tmp;
  for (var i = 0, l = params.length; i < l; i++) {
    tmp = params[i].split('=');
    data[tmp[0]] = tmp[1];
  }
  listAllEmployees(data.deptID);
};

function listAllEmployees(deptNo, reset = true) {
  console.log('inside list of all the employees');
  const fetchURL =
    'https://7pm2tuvgei.execute-api.us-east-1.amazonaws.com/prod/employees?dept_no=' +
    deptNo;

  fetch(fetchURL, {
    method: 'GET',
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    //body: JSON.stringify(deptID),
    headers: {
      'content-type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((result) => {
      console.log(result.statuses);
      console.log(result);
      slicedResult = result.slice(1, 100);

      slicedResult.forEach((status) => {
        console.log(status);
        var newRow = $('<tr>');
        var cols = '';
        cols += '<td> ' + status.first_name + '</td>';
        cols += '<td> ' + status.last_name + '</td>';
        cols += '<td> ' + status.emp_no + '</td>';
        cols += '<td> ' + status.hire_date.split('T')[0] + '</td>';
        cols +=
          '<td> ' +
          '<input type="button" value="Rate Employee" id=\'rate-button\' onClick=\'rateMe()\'/>' +
          '</td>';
        cols +=
          '<td> ' +
          '<input type="button" value="Update Rating" id=\'update-button\' onClick=\'updateRating()\'/>' +
          '</td>';
        cols +=
          '<td> ' +
          '<input type="button" value="Show Rating" id=\'show-button\' onClick=\'showRating(' +
          status.emp_no +
          ")'/>" +
          '</td>';
        newRow.append(cols);
        $('#empData  .tbody').append(newRow);
      });
    });
}

function rateMe() {
  url = 'https://www.perfportaltechietribe.ml/rate.html';
  document.location.href = url;
}
function showChart() {
  var url = document.location.href,
    params = url.split('?')[1].split('&'),
    data = {},
    tmp;
  for (var i = 0, l = params.length; i < l; i++) {
    tmp = params[i].split('=');
    data[tmp[0]] = tmp[1];
  }
  //alert(data.empID);
  url =
    'https://www.perfportaltechietribe.ml/employeeHome.html?empID=' +
    data.empID;
  document.location.href = url;
}

function showRating(empID) {
  url = 'https://www.perfportaltechietribe.ml/employeeHome.html?empID=' + empID;
  document.location.href = url;
}

function updateRating() {
  url = 'https://www.perfportaltechietribe.ml/updaterate.html';
  document.location.href = url;
}
