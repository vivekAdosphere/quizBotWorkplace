/* --> xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx <---

File Name : payloadStorage.js
File Description : This file includes payload for template messages such as quick_reply, webview etc.

---> Required Dependencies <---
Installed Dependencies : 

User Defined Dependencies : 
1) config.js ("../configuration/config")

---> Function Definitions <---
1) demoQuickReply

--> xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx <--- */

// Dependencies
const config = require("../configuration/config");

// Config Variables
const SERVER_URL = config.SERVER_URL;

/**
 * @description Quick Reply Payload
 * @returns {object}
 */
exports.demoQuickReply = () => { // Bot Introduction
    return {
        "text": "Please click on 'Start' to initiate the conversation",
        "quick_replies": [{
            "content_type": "text",
            "title": "Start",
            "payload": "Start",
        }]
    };
};

exports.userReply = () => {
    return {
        "text": "Do you confirm the details above ?",
        "quick_replies": [{
                "content_type": "text",
                "title": "Yes",
                "payload": "Yes"
            },
            {
                "content_type": "text",
                "title": "No",
                "payload": "No"
            }

        ]
    }
}

exports.quizStart = () => {
    return {
        "text": "Click on the 'Start' button to initiate the quiz",
        "quick_replies": [{
            "content_type": "text",
            "title": "Start",
            "payload": "startquiz",
        }]
    };
}

exports.question1 = () => {
    return {
        "text": "*Question 1*\nWhich one of the following river flows between Vindhyan and Satpura ranges?",
        "quick_replies": [{
                "content_type": "text",
                "title": "Narmada",
                "payload": "Narmada"
            },
            {
                "content_type": "text",
                "title": "Mahanadi",
                "payload": "Mahanadi"
            }

        ]
    }

}

exports.question2 = () => {
    return {
        "text": "*Question 2*\nThe Central Rice Research Station is situated in?",
        "quick_replies": [{
                "content_type": "text",
                "title": "Chennai",
                "payload": "Chennai"
            },
            {
                "content_type": "text",
                "title": "Cuttack",
                "payload": "Cuttack"
            }

        ]
    }

}

exports.question3 = () => {
    return {
        "text": "*Question 3*\nWhich among the following headstreams meets the Ganges in last?",
        "quick_replies": [{
                "content_type": "text",
                "title": "Mandakini",
                "payload": "Mandakini"
            },
            {
                "content_type": "text",
                "title": "Bhagirathi",
                "payload": "Bhagirathi"
            }

        ]
    }

}

exports.question4 = () => {
    return {
        "text": "*Question 4*\nTsunamis are not caused by",
        "quick_replies": [{
                "content_type": "text",
                "title": "Hurricanes",
                "payload": "Hurricanes"
            },
            {
                "content_type": "text",
                "title": "Earthquakes",
                "payload": "Earthquakes"
            }

        ]
    }

}

exports.question5 = () => {
    return {
        "text": "*Question 5*\nThe hottest planet in the solar system?",
        "quick_replies": [{
                "content_type": "text",
                "title": "Mercury",
                "payload": "Mercury"
            },
            {
                "content_type": "text",
                "title": "Venus",
                "payload": "Venus"
            }

        ]
    }

}




// Optional for webview testing
exports.demoWebview = (senderID) => {
    return {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "button",
                "text": "Please select the date",
                "buttons": [{
                    "type": "web_url",
                    "url": SERVER_URL + "/ask-demowebview",
                    "title": "Select",
                    "webview_height_ratio": "tall", //display on mobile
                    "messenger_extensions": true,
                    "webview_share_button": "hide"
                }, ],
            },
        }
    };
}