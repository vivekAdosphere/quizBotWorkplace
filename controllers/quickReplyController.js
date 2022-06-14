/* --> xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx <---

File Name : quickReplyController.js
File Description : This file controls every quick reply message response coming from user.

---> Required Dependencies <---
Installed Dependencies : 

User Defined Dependencies :
1) messageSenders ("../services/messageSenders")
2) mapNames ("../configuration/mapNames")
3) mapToLocalDB ("../services/mapToLocalDB")
4) messageController ("./messageController")

---> Function Definitions <---
1) handleQuickReplyMessage

--> xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx <--- */

// Dependencies
const mapNames = require("../configuration/mapNames");
const { MapToLocal } = require("../services/mapToLocalDB");
const { sendTextMessage, sendQuickReplyMessage } = require("../services/messageSenders");
const { otherTextMessageHandler, initConversationHandler, introductionMessageHandler, quizHandler, nameHandler, question1Handler, question2Handler, question3Handler, question4Handler, question5Handler, thankYouMessageSender, menuHandler } = require("./messageController")
const languageChooser = require("../language/languageChooser")
    // Map Variables
let flowPathIndicator = new MapToLocal(mapNames.flowPathIndicator)
let userData = new MapToLocal(mapNames.userData)
let selectedCommunicationLanguage = new MapToLocal(mapNames.selectedCommunicationLanguage)

/**
 * 
 * @param {string} senderID 
 * @param {object} quickReplyObject 
 * @description Handles Quick Reply Message
 * 
 */
exports.handleQuickReplyMessage = async(senderID, quickReplyObject) => {
    const payload = quickReplyObject.payload
    switch (payload) {
        case "English":
            selectedCommunicationLanguage.set(senderID, "English")
            initConversationHandler(senderID)
            break
        case "ગુજરાતી":
            selectedCommunicationLanguage.set(senderID, "ગુજરાતી")
            initConversationHandler(senderID)
            break
        case "Start":
            introductionMessageHandler(senderID)
            break
        case "Yes":
            menuHandler(senderID)
            break
        case "No":
            nameHandler(senderID)
            break
        case "startquiz":
            question1Handler(senderID)
            break

            //question 1 options handle here
        case "Narmada":
            question2Handler(senderID, payload)
            break
        case "Mahanadi":
            question2Handler(senderID, payload)
            break
        case "Sabarmati":
            question2Handler(senderID, payload)
            break
        case "Ganga":
            question2Handler(senderID, payload)
            break

            //question2 options handle here
        case "yesquestion2":
            question3Handler(senderID, payload)
            break
        case "noquestion2":

            question3Handler(senderID, payload)
            break

            //question 3 options handle here
        case "Mandakini":
            question4Handler(senderID, payload)
            break
        case "Bhagirathi":
            question4Handler(senderID, payload)
            break

            // question 4 options handle here
        case "lived":
            question5Handler(senderID, payload)
            break
        case "waslived":
            question5Handler(senderID, payload)
            break
        case "anlived":
            question5Handler(senderID, payload)
            break
        case "live":
            question5Handler(senderID, payload)
            break
            //queestion 5 options handle here
        case "yesquestion5":
            thankYouMessageSender(senderID, payload)
            break
        case "noquestion5":
            thankYouMessageSender(senderID, payload)
            break
        default:
            await sendTextMessage(senderID, languageChooser(senderID).somethingWentWrong)
    }

}