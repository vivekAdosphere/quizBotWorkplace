/* --> xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx <---

File Name : postbackController.js
File Description : This file controls every postback message response coming from user.

---> Required Dependencies <---
Installed Dependencies : 

User Defined Dependencies :
1) messageSenders ("../services/messageSenders")
2) mapNames ("../configuration/mapNames")
3) mapToLocalDB ("../services/mapToLocalDB")
4) messageController ("./messageController")

---> Function Definitions <---
1) handlePostbackMessage

--> xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx <--- */

const mapNames = require("../configuration/mapNames");
const { MapToLocal } = require("../services/mapToLocalDB");
const { sendTextMessage, sendQuickReplyMessage } = require("../services/messageSenders");
const { otherTextMessageHandler, initConversationHandler, introductionMessageHandler, nameHandler } = require("./messageController")

// Map Variables
let flowPathIndicator = new MapToLocal(mapNames.flowPathIndicator)
let userData = new MapToLocal(mapNames.userData)
let selectedCommunicationLanguage = new MapToLocal(mapNames.selectedCommunicationLanguage)

/**
 * 
 * @param {string} senderID 
 * @param {object} postbackObject 
 * @description Handles Postback Message
 */
exports.handlePostbackMessage = async(senderID, postbackObject) => {
    const payload = postbackObject.payload

    switch (payload) {
        case "GET_STARTED":
            initConversationHandler(senderID)
            break

        default:
            await sendTextMessage(senderID, languageChooser(senderID).somethingWentWrong)
    }
}