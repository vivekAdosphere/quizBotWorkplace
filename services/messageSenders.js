/* --> xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx <---

File Name : messageSenders.js
File Description : This file includes different type of message sender functions.

---> Required Dependencies <---
Installed Dependencies : 
1) axios (npm i axios)

User Defined Dependencies : 
1) config.js ("../configuration/config")
2) logger.js ("./logger")

---> Function Definitions <---
1) setupWorkplaceProfile
2) markMessageRead
3) sendTextMessage
4) sendQuickReplyMessage

--> xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx <--- */

// Dependencies
const axios = require("axios");
const logger = require("./logger")
const config = require("../configuration/config");

// Config variables
const ACCESS_TOKEN = config.ACCESS_TOKEN;
const API_BASE_URL = config.API_BASE_URL;
const SERVER_URL = config.SERVER_URL

/**
 * @description Sets Workplace Profile (Get Started Button & Whitelisted Domain)
 * @returns {<Promise>}
 */
exports.setupWorkplaceProfile = async() => {
    try {
        const payload = {
            "get_started": {
                "payload": "GET_STARTED"
            },
            "whitelisted_domains": [
                `${SERVER_URL}`
            ],
        };

        return await axios({
            url: `${API_BASE_URL}/me/messenger_profile`,
            data: payload,
            params: { "Content-Type": "application/json", "access_token": ACCESS_TOKEN },
            method: "post"
        });
    } catch (e) {
        logger.error(`Error, Setup workplace profile --> ${e.response.data}`)
    }
};

/**
 * 
 * @param {string} senderID 
 * @returns {<Promise>}
 * @description Helps to mark message as read
 */
const markMessageRead = async(senderID) => {
    try {
        const payload = {
            "recipient": {
                "id": senderID
            },
            "sender_action": "mark_seen"
        };

        return await axios({
            url: `${API_BASE_URL}/me/messages`,
            data: payload,
            params: { access_token: ACCESS_TOKEN },
            method: "post"
        })
    } catch (e) {
        logger.error(`Error, Text message mark seen error --> ${senderID} : ${e.response.data}`)
    }
};

/**
 * 
 * @param {string} senderID 
 * @param {string} message 
 * @returns {<Promise>}
 * @description Helps to send text message with promise
 */
exports.sendTextMessage = async(senderID, message) => {
    try {
        markMessageRead(senderID);
        const payload = {
            recipient: {
                id: senderID,
            },
            message: {
                text: message,
            },
        };

        return await axios({
            url: `${API_BASE_URL}/me/messages`,
            data: payload,
            params: { access_token: ACCESS_TOKEN },
            method: "post"
        })
    } catch (e) {
        logger.error(`Error, Text message sending error --> ${senderID} : ${e.response.data}`)
    }
}

/**
 * 
 * @param {string} senderID 
 * @param {string} payloadObject 
 * @returns {<Promise>}
 * @description Helps to send quick reply message with promise
 */
exports.sendQuickReplyMessage = async(senderID, payloadObject) => {
    try {
        markMessageRead(senderID);
        const payload = {
            recipient: {
                id: senderID,
            },
            messaging_type: "RESPONSE",
            message: payloadObject,
        };

        return await axios({
            url: `${API_BASE_URL}/me/messages`,
            data: payload,
            params: { access_token: ACCESS_TOKEN },
            method: "post"
        })
    } catch (e) {
        logger.error(`Error, Text message sending error --> ${senderID} : ${e.response.data}`)
    }
}



//send video files

exports.sendVideoFile = async(senderID, message) => {
    try {
        markMessageRead(senderID);
        const payload = {
            recipient: {
                id: senderID,
            },
            message: {
                "attachment": {
                    "type": "video",
                    "payload": {
                        "url": "https://af49-124-123-122-221.in.ngrok.io/video.mp4",
                    }

                }
            }

        }
        return await axios({
            url: `${API_BASE_URL}/me/messages`,
            data: payload,
            params: { access_token: ACCESS_TOKEN },
            method: "post"
        })
    } catch (e) {
        logger.error(`Error, Text message sending error --> ${senderID} : ${e.response.data}`)

    }
}

//sendImageFile
exports.sendImageFile = async(senderID, message) => {
    try {
        markMessageRead(senderID);
        const payload = {
            recipient: {
                id: senderID,
            },
            message: {
                "attachment": {
                    "type": "image",
                    "payload": {
                        "url": "https://af49-124-123-122-221.in.ngrok.io/image.jpeg",
                    }

                }
            }

        }
        return await axios({
            url: `${API_BASE_URL}/me/messages`,
            data: payload,
            params: { access_token: ACCESS_TOKEN },
            method: "post"
        })
    } catch (e) {
        logger.error(`Error, Text message sending error --> ${senderID} : ${e.response.data}`)

    }
}

// Optional for webview testing
exports.sendWebviewTemplate = async(senderID, payloadObject) => {
    markMessageRead(senderID);

    let payload = {
        recipient: {
            id: senderID,
        },
        message: payloadObject,
    };

    return await axios({
        url: `${API_BASE_URL}/me/messages`,
        data: payload,
        params: { access_token: ACCESS_TOKEN },
        method: "post"
    })
}