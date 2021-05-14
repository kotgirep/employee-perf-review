"use strict";
const axios = require("axios");
require("dotenv").config();
var key = process.env["API_GATEWAY_INVOKE_URL"];

function getRatingsInString(data){
  var ratingsInfo = "Punctuality & Discipline: " +
      data["PunctualityAndDiscipline"] +
      ", Execution of Duties: " +
      data["ExecutionOfDuties"] +
      ", Learning & Development: " +
      data["LearningAndDevelopment"] +
      ", Team Cooperation: " +
      data["TeamCooperation"]+
      ", Responsibility Taken: " +
      data["ResponsibilityTaken"]
    return ratingsInfo
}

module.exports.getEmpInfoForAdd = async (event) => {
  var empNum = event.currentIntent.slots["EmpNum"];
  const url = key + "isemployeevalid?dept_no=d003&emp_no=" + empNum;
  const response = await axios.get(url);
  const data = response.data;

  var tempSessionAttribute = event.sessionAttributes;
  var isValidEmployee = false;
  for (var i = 0; i < data.length; i++) {
    if (data[i].emp_no == empNum) {
      tempSessionAttribute["empName"] = data[i].first_name;
      tempSessionAttribute["employeeNum"] = empNum;
      isValidEmployee = true;
      break;
    }
  }
  if (isValidEmployee === false) {
    const answer = "Employee Number is invalid.";
    return {
      sessionAttributes: tempSessionAttribute,
      dialogAction: {
        type: "Close",
        fulfillmentState: "Fulfilled",
        message: {
          contentType: "PlainText",
          content: answer,
        },

        responseCard: {
          version: 1,
          contentType: "application/vnd.amazonaws.card.generic",
          genericAttachments: [
            {
              title: "",
              buttons: [
                {
                  text: "Try Again",
                  value: "I would like to add perf ratings",
                },
                {
                  text: "Cancel",
                  value: "Cancel",
                },
              ],
            },
          ],
        },
      },
    };
  } 
  const urlForAddCheck = key + "rating?emp_no=" + empNum;
  const res = await axios.get(urlForAddCheck);

  if (res.data.length != 0) {
    var answer = tempSessionAttribute["empName"]+ " already has following ratings available - " +
    getRatingsInString(res.data[0]) + 
    ". Would you like to update the rating instead?";

    return {
      sessionAttributes: tempSessionAttribute,
      dialogAction: {
        type: "Close",
        fulfillmentState: "Fulfilled",
        message: {
          contentType: "PlainText",
          content: answer,
        },

        responseCard: {
          version: 1,
          contentType: "application/vnd.amazonaws.card.generic",
          genericAttachments: [
            {
              title: "",
              buttons: [
                {
                  text: "Yes!",
                  value: "Call update feedback",
                },
                {
                  text: "Cancel",
                  value: "Cancel",
                },
              ],
            },
          ],
        },
      },
    };
  } 

  answer = "Awesome! Now, I'll ask you a few questions and you'll tell me how much you agree with me from 1 to 10, ok?";
    return {
      sessionAttributes: tempSessionAttribute,
      dialogAction: {
        type: "Close",
        fulfillmentState: "Fulfilled",
        message: {
          contentType: "PlainText",
          content: answer,
        },

        responseCard: {
          version: 1,
          contentType: "application/vnd.amazonaws.card.generic",
          genericAttachments: [
            {
              title: "",
              buttons: [
                {
                  text: "Okay!",
                  value: "rate employee through employee id",
                },
              ],
            },
          ],
        },
      },
    };
  
};


module.exports.saveRatingsInSessionForAdd = async (event) => {
  var punctuality = event.currentIntent.slots["Punctuality"];
  var execOfDuties = event.currentIntent.slots["ExecOfDuties"];
  var learnAndDev = event.currentIntent.slots["LearningAndDev"];
  var teamPlayer = event.currentIntent.slots["TeamPlayer"];
  var responsibility = event.currentIntent.slots["Responsibility"];
  var empName = event.sessionAttributes.empName;

  const answer =
    "That's all! We have received your review for employee " +
    empName +
    " as follows:Punctuality & Discipline: " +
    punctuality +
    ", Execution of Duties: " +
    execOfDuties +
    ", Learning & Development: " +
    learnAndDev +
    ", Team Cooperation: " +
    teamPlayer +
    ", Responsibility Taken: " +
    responsibility;

  // populate session attributes
  var tempSessionAttribute = event.sessionAttributes;
  tempSessionAttribute["PunctualityAndDiscipline"] = punctuality;
  tempSessionAttribute["ExecutionOfDuties"] = execOfDuties;
  tempSessionAttribute["LearningAndDevelopment"] = learnAndDev;
  tempSessionAttribute["TeamCooperation"] = teamPlayer;
  tempSessionAttribute["ResponsibilityTaken"] = responsibility;

  return {
    sessionAttributes: tempSessionAttribute,
    dialogAction: {
      type: "Close",
      fulfillmentState: "Fulfilled",
      message: {
        contentType: "PlainText",
        content: answer,
      },

      responseCard: {
        version: 1,
        contentType: "application/vnd.amazonaws.card.generic",
        genericAttachments: [
          {
            title: "Would you like to save these changes?",
            buttons: [
              {
                text: "Yes",
                value: "Save Ratings",
              },
              {
                text: "No",
                value: "Cancel",
              },
            ],
          },
        ],
      },
    },
  };
};

module.exports.addFeedback = async (event) => {
  var punctuality = event.sessionAttributes.PunctualityAndDiscipline;
  var execOfDuties = event.sessionAttributes.ExecutionOfDuties;
  var learnAndDev = event.sessionAttributes.LearningAndDevelopment;
  var teamPlayer = event.sessionAttributes.TeamCooperation;
  var responsibility = event.sessionAttributes.ResponsibilityTaken;
  var empNum = event.sessionAttributes.employeeNum;

  var answer = "Is there anything else I can help you with?";
  const url =
    key +
    "rating?EmpNo=" +
    empNum +
    "&PunctualityAndDiscipline=" +
    punctuality +
    "&ExecutionOfDuties=" +
    execOfDuties +
    "&LearningAndDevelopment=" +
    learnAndDev +
    "&TeamCooperation=" +
    teamPlayer +
    "&ResponsibilityTaken=" +
    responsibility;
  try {
    const response = await axios.post(url);
    return {
      sessionAttributes: {},
      dialogAction: {
        type: "Close",
        fulfillmentState: "Fulfilled",
        message: {
          contentType: "PlainText",
          content: answer,
        },
        responseCard: {
          version: 1,
          contentType: "application/vnd.amazonaws.card.generic",
          genericAttachments: [
            {
              title: "",
              buttons: [
                {
                  text: "I’m all right!",
                  value: "say bye",
                },
                {
                  text: "Yes please!",
                  value: "Hey",
                },
              ],
            },
          ],
        },
      },
    };
  } catch (error) {
    console.log(error);
  }
};

module.exports.getEmpInfoForUpdate = async (event) => {
  var empNum = event.currentIntent.slots["UpdateEmpNum"];
  const url = key + "isemployeevalid?dept_no=d003&emp_no=" + empNum;
  const response = await axios.get(url);
  const data = response.data;

  var tempSessionAttribute = event.sessionAttributes;
  var isValidEmployee = false;
  for (var i = 0; i < data.length; i++) {
    if (data[i].emp_no == empNum) {
      tempSessionAttribute["empName"] = data[i].first_name;
      tempSessionAttribute["employeeNum"] = empNum;
      isValidEmployee = true;
      break;
    }
  }
  if (isValidEmployee === false) {
    const answer = "Employee Number is invalid.";
    return {
      sessionAttributes: tempSessionAttribute,
      dialogAction: {
        type: "Close",
        fulfillmentState: "Fulfilled",
        message: {
          contentType: "PlainText",
          content: answer,
        },


        responseCard: {
          version: 1,
          contentType: "application/vnd.amazonaws.card.generic",
          genericAttachments: [
            {
              title: "",
              buttons: [
                {
                  text: "Try Again",
                  value: "I would like to update perf feedback",
                },
                {
                  text: "Cancel",
                  value: "Cancel",
                },
              ],
            },
          ],
        },
      },
    };
  }
  else {
    const urlForAddCheck = key + "rating?emp_no=" + empNum;
    const response1 = await axios.get(urlForAddCheck);
    const data1 = response1.data;
    console.log(data1);
    if (data1.length != 0) {

      const answer = tempSessionAttribute["empName"] + 
            " has the following ratings: " + 
            getRatingsInString(response1.data[0]) +
            ". Now, I'll ask you a few questions again and you'll tell me how much you agree with me from 1 to 10, ok?";
      return {
        sessionAttributes: tempSessionAttribute,
        dialogAction: {
          type: "Close",
          fulfillmentState: "Fulfilled",
          message: {
            contentType: "PlainText",
            content: answer,
          },

          responseCard: {
            version: 1,
            contentType: "application/vnd.amazonaws.card.generic",
            genericAttachments: [
              {
                title: "",
                buttons: [
                  {
                    text: "Okay!",
                    value: "Call update feedback",
                  },
                  {
                    text: "Cancel",
                    value: "Cancel"
                  }
                ],
              },
            ],
          },
        },
      };
    } else {
      const answer = "Rating is not provided to this employee earlier. Do you want to go ahead and add rating now ?"
      return {
        sessionAttributes: tempSessionAttribute,
        dialogAction: {
          type: "Close",
          fulfillmentState: "Fulfilled",
          message: {
            contentType: "PlainText",
            content: answer,
          },

          responseCard: {
            version: 1,
            contentType: "application/vnd.amazonaws.card.generic",
            genericAttachments: [
              {
                title: "",
                buttons: [
                  {
                    text: "Okay!",
                    value: "rate employee through employee id",
                  },
                  {
                    text: "Cancel",
                    value: "Cancel"
                  }
                ],
              },
            ],
          },
        },
      };
    }
  }
};

module.exports.saveRatingsInSessionForUpdate = async (event) => {
  var punctuality = event.currentIntent.slots["UpdatePunctuality"];
  var execOfDuties = event.currentIntent.slots["UpdateExecOfDuties"];
  var learnAndDev = event.currentIntent.slots["UpdateLearningAndDev"];
  var teamPlayer = event.currentIntent.slots["UpdateTeamPlayer"];
  var responsibility = event.currentIntent.slots["UpdateResponsibility"];
  var empName = event.sessionAttributes.empName;

  const answer =
    "That's all! We have received your review for employee " +
    empName +
    " as follows:Punctuality & Discipline: " +
    punctuality +
    ", Execution of Duties: " +
    execOfDuties +
    ", Learning & Development: " +
    learnAndDev +
    ", Team Cooperation: " +
    teamPlayer +
    ", Responsibility Taken: " +
    responsibility;

  // populate session attributes
  var tempSessionAttribute = event.sessionAttributes;
  tempSessionAttribute["PunctualityAndDiscipline"] = punctuality;
  tempSessionAttribute["ExecutionOfDuties"] = execOfDuties;
  tempSessionAttribute["LearningAndDevelopment"] = learnAndDev;
  tempSessionAttribute["TeamCooperation"] = teamPlayer;
  tempSessionAttribute["ResponsibilityTaken"] = responsibility;

  return {
    sessionAttributes: tempSessionAttribute,
    dialogAction: {
      type: "Close",
      fulfillmentState: "Fulfilled",
      message: {
        contentType: "PlainText",
        content: answer,
      },

      responseCard: {
        version: 1,
        contentType: "application/vnd.amazonaws.card.generic",
        genericAttachments: [
          {
            title: "Would you like to save these changes?",
            buttons: [
              {
                text: "Yes",
                value: "Save Updated Feedback",
              },
              {
                text: "No",
                value: "Cancel",
              },
            ],
          },
        ],
      },
    },
  };
};

module.exports.updateFeedback = async (event) => {
  var punctuality = event.sessionAttributes.PunctualityAndDiscipline;
  var execOfDuties = event.sessionAttributes.ExecutionOfDuties;
  var learnAndDev = event.sessionAttributes.LearningAndDevelopment;
  var teamPlayer = event.sessionAttributes.TeamCooperation;
  var responsibility = event.sessionAttributes.ResponsibilityTaken;
  var empNum = event.sessionAttributes.employeeNum;

  var answer = "Is there anything else I can help you with?";
  const url =
      key +
      "rating?PunctualityAndDiscipline=" +
      punctuality +
      "&ExecutionOfDuties=" +
      execOfDuties +
      "&LearningAndDevelopment=" +
      learnAndDev +
      "&TeamCooperation=" +
      teamPlayer +
      "&ResponsibilityTaken=" +
      responsibility +
      "&EmpNo=" +
      empNum;
  try {
    const response = await axios.patch(url);
    return {
      sessionAttributes: {},
      dialogAction: {
        type: "Close",
        fulfillmentState: "Fulfilled",
        message: {
          contentType: "PlainText",
          content: answer,
        },
        responseCard: {
          version: 1,
          contentType: "application/vnd.amazonaws.card.generic",
          genericAttachments: [
            {
              title: "",
              buttons: [
                {
                  text: "I’m all right!",
                  value: "say bye",
                },
                {
                  text: "Yes please!",
                  value: "Hey",
                },
              ],
            },
          ],
        },
      },
    };
  } catch (error) {
    console.log(error);
  }
};
