## Perf Review
### San Jose State University
### CMPE-282 :Cloud Services

### Professor: Andrew Bond
### ISA: Juhi Nayak
### Group Name:Techie Tribe
### Team Members: Bhavya Tetali, Pranjali Kotgire,Sneha Patil, Supriya Meduri

### Project Introduction:

Perf Review is an enterprise application that allows two role based access.
Managers and Employees to securely login through Single Sign On. 
The manager can provide the employee with ratings, view the employee ratings already provided in the chart. 
Also the employees can view the ratings provided by the manager.

### Tech Stack
Node.js
Express 
HTML, Javascript, Bootstrap
RDS - For accessing employee data in the default project
Okta Single sign on using OIDC
Jenkins - For CI/CD

### Kibana Dashboard set up
Install Nginx 
Install Elastic-search and kibana 
Install filebeat 
Configure Filebeat to point to Elastic-search and Kibana
Modified nginx.yml in modules.d in Filebeat to point to correct access and error logs.
Run Filebeat

### Test Account Credentials : 
#### Manager : pranjalikotgire57@gmail.com / Apple@123
#### Employee:
1. sneha.magdum11@gmail.com / Apple@123
2. supriyameduri@gmail.com / Apple@123
3. bhavyatetali3@gmail.com / Apple@123

### Architecture Diagram

## DB Employees :
<img width="838" alt="Screen Shot 2020-12-03 at 11 29 03 AM" src="https://user-images.githubusercontent.com/71044935/101294301-49bddb00-37cb-11eb-8e27-ae178ef97ee0.png">

## Database Design:
<img width="650" alt="Screen Shot 2020-12-03 at 11 32 59 AM" src="https://user-images.githubusercontent.com/71044935/101294312-593d2400-37cb-11eb-8f23-dd367986846d.png">

## Activity Diagram: 
<img width="1121" alt="Screen Shot 2020-12-04 at 11 37 58 AM" src="https://user-images.githubusercontent.com/71044935/101294323-68bc6d00-37cb-11eb-8d05-e3d7154fed3f.png">


## Single Sign On Using Okta:
<img width="1270" alt="Screen Shot 2020-12-04 at 2 07 47 PM" src="https://user-images.githubusercontent.com/71044935/101294331-74a82f00-37cb-11eb-9c3e-f15422da2f9f.png">

## AWS Architecture Diagram: 
![272 Project](https://user-images.githubusercontent.com/71044935/101294259-0c594d80-37cb-11eb-9ef7-c08566526a96.png)

## CI/CD Screenshots: 
![Screen Shot 2020-12-06 at 11 30 19 PM](https://user-images.githubusercontent.com/68761598/101324233-c29a5280-381e-11eb-9be7-b6a1e043c182.png)

![Screen Shot 2020-12-06 at 11 30 31 PM](https://user-images.githubusercontent.com/68761598/101324285-d80f7c80-381e-11eb-8cc2-df0872a139ad.png)

## Sample Demo Screenshots:

Home page of the application : Our Home page has a login option for Manager or Employee to login.
<img src="https://github.com/kotgirep/employee-perf-review/blob/master/Images/Screen%20Shot%202021-05-10%20at%2011.52.06%20PM.png" width="450">

Okta Sign In Page: Login as Manager using okta

<img src="https://github.com/kotgirep/employee-perf-review/blob/master/Images/Screen%20Shot%202021-05-12%20at%2010.01.40%20AM.png" width="450">

Manager View: When a Manager signs in, the employees under his department are populated.
<img src="https://github.com/kotgirep/employee-perf-review/blob/master/Images/Screen%20Shot%202021-05-11%20at%2010.36.15%20PM.png" width="450">


ChatBot: When manager signs in, he can see a chat bot which helps manager to add employee rating and update the employee rating

<img src="https://github.com/kotgirep/employee-perf-review/blob/master/Images/Screen%20Shot%202021-05-11%20at%2010.36.52%20PM.png" width="450>

Add Rating: Manager can add rating to any employee using ‘Rate Employee’ option.

Once the Manager hits ‘Submit Rating’ button , alert pops up as shown below

Manager can view the rating already provided to the employee through ‘Show Rating’ option

Manager can update ratings already provided to employees, by clicking the ‘Update Rating’ option.

Employees can login and check the ratings provided by the Manager.




