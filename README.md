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
<img width="1440" alt="Screen Shot 2020-12-06 at 12 13 37 PM" src="https://user-images.githubusercontent.com/71044935/101294075-f008e100-37c9-11eb-858d-2d09f1b35248.png">

Okta Sign In Page: Login as Manager using okta
<img width="1440" alt="Screen Shot 2020-12-06 at 12 13 44 PM" src="https://user-images.githubusercontent.com/71044935/101294105-1890db00-37ca-11eb-8b13-07b16970a684.png">

Manager View: When a Manager signs in, the employees under his department are populated.
<img width="1440" alt="Screen Shot 2020-12-06 at 12 13 54 PM" src="https://user-images.githubusercontent.com/71044935/101294156-5c83e000-37ca-11eb-90ab-720d3ac97468.png">

Add Rating: Manager can add rating to any employee using ‘Rate Employee’ option.
<img width="1440" alt="Screen Shot 2020-12-06 at 12 32 29 PM" src="https://user-images.githubusercontent.com/71044935/101294169-6efe1980-37ca-11eb-84af-1e52e3ffbc16.png">

Once the Manager hits ‘Submit Rating’ button , alert pops up as shown below
<img width="1440" alt="Screen Shot 2020-12-06 at 12 32 34 PM" src="https://user-images.githubusercontent.com/71044935/101294187-9523b980-37ca-11eb-8a73-847f99e38f9d.png">

Manager can view the rating already provided to the employee through ‘Show Rating’ option
<img width="1440" alt="Screen Shot 2020-12-06 at 12 32 49 PM" src="https://user-images.githubusercontent.com/71044935/101294192-a967b680-37ca-11eb-9721-b5e9198c2f38.png">

Manager can update ratings already provided to employees, by clicking the ‘Update Rating’ option.
<img width="1440" alt="Screen Shot 2020-12-06 at 12 33 10 PM" src="https://user-images.githubusercontent.com/71044935/101294211-bf757700-37ca-11eb-9028-d1d7a64e0452.png">

Employees can login and check the ratings provided by the Manager.
<img width="1440" alt="Screen Shot 2020-12-06 at 1 44 27 PM" src="https://user-images.githubusercontent.com/71044935/101294223-d2884700-37ca-11eb-99c5-e74f9f59af3d.png">

<img width="1440" alt="Screen Shot 2020-12-06 at 12 33 52 PM" src="https://user-images.githubusercontent.com/71044935/101294233-e338bd00-37ca-11eb-9810-3f83621692cb.png">



