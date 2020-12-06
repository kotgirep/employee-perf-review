## Perf Review
### San Jose State University
### CMPE-272 :Enterprise Software Platforms

### Professor: Andrew Bond
### ISA: Juhi Nayak
### Group Name:Techie Tribe
### Team Members: Bhavya Tetali, Pranjali Kotgire,Priti Sharma, Supriya Meduri

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

### Git Repo: https://github.com/kotgirep/employee-perf-review/tree/master
### Test Account Credentials : 
#### Manager : 2mathe@skvorets.com / Apple@123
#### Employee:
cajef21689@1heizi.com / Apple@123
supriyameduri@gmail.com / Apple@123
vskgtm@gmail.com / Apple@123

### Architecture Diagram

## DB Employees :



## Database Design:



## Activity Diagram: 


## Single Sign On Using Okta:



## AWS Architecture Diagram: 




## Application monitoring through Kibana





## CI/CD Screenshots: 


## Sample Demo Screenshots:


