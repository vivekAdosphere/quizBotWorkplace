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

exports.menuSelector = () => {
    return {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": [{
                        "title": "Module1",
                        "image_url": "https://images.unsplash.com/photo-1547082688-9077fe60b8f9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1489&q=80",
                        "buttons": [{
                            "type": "postback",
                            "title": "Module1",
                            "payload": "module1"
                        }],
                    },

                    // Company Privacy Policy
                    {
                        "title": "Module2",
                        "image_url": "https://images.unsplash.com/photo-1521791055366-0d553872125f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
                        "buttons": [{
                            "type": "postback",
                            "title": "Module2",
                            "payload": "module2"
                        }],
                    },

                    {
                        "title": "Module3",
                        "image_url": "https://images.unsplash.com/photo-1580795479025-93d13fd9aa6c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1325&q=80",
                        "buttons": [{
                            "type": "postback",
                            "title": "Module3",
                            "payload": "module3"
                        }],
                    },


                ]
            }
        }
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
            },
            {
                "content_type": "text",
                "title": "Sabarmati",
                "payload": "Sabarmati"
            },
            {
                "content_type": "text",
                "title": "Ganga",
                "payload": "Ganga"
            }


        ]
    }

}

exports.question2 = () => {
    return {
        "text": "*Question 2*\nThe first country in the world to use postcards was the United States of America.",
        "quick_replies": [{
                "content_type": "text",
                "title": "Yes",
                "payload": "yesquestion2"
            },
            {
                "content_type": "text",
                "title": "No",
                "payload": "noquestion2"
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
        "text": "*Question 4*\nOnce upon a time there _________ (live) a man called Damocles.",
        "quick_replies": [{
                "content_type": "text",
                "title": "lived",
                "payload": "lived"
            },
            {
                "content_type": "text",
                "title": "was lived",
                "payload": "waslived"
            },
            {
                "content_type": "text",
                "title": "an lived",
                "payload": "anlived"
            },
            {
                "content_type": "text",
                "title": "live",
                "payload": "live"
            }

        ]
    }

}

exports.question5 = () => {
    return {
        "text": "*Question 5*\nBill Gates is the founder of Amazon.",
        "quick_replies": [{
                "content_type": "text",
                "title": "Yes",
                "payload": "yesquestion5"
            },
            {
                "content_type": "text",
                "title": "No",
                "payload": "noquestion5"
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