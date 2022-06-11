/* --> xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx <---

File Name : textMessageController.js
File Description : This file controls every text message coming from user.

---> Required Dependencies <---
Installed Dependencies : 

User Defined Dependencies :
1) messageSenders ("../services/messageSenders")
2) mapNames ("../configuration/mapNames")
3) mapToLocalDB ("../services/mapToLocalDB")
4) languageChooser ("../language/languageChooser")
5) utilities ("../utilities/utilities")
6) messageController ("./messageController")

---> Function Definitions <---
1) handleTextMessage

--> xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx <--- */

// Dependencies
const mapNames = require("../configuration/mapNames");
const { clearMaps } = require("../utilities/utilities")
const { MapToLocal } = require("../services/mapToLocalDB");
const languageChooser = require("../language/languageChooser");
const { sendTextMessage, sendQuickReplyMessage, sendWebviewTemplate } = require("../services/messageSenders");
const {
    otherTextMessageHandler,
    initConversationHandler,
    introductionMessageHandler,
    webviewHandler,
    designationHandler,
    districtIdHandler,
    quizHandler,
    question1Handler,
    question2Handler,
    question3Handler,
    question4Handler,
    question5Handler
} = require("./messageController");
const { question4, question3, question2, question1, question5, userReply, quizStart } = require("../utilities/payloadStorage");

// Map Variables
let flowPathIndicator = new MapToLocal(mapNames.flowPathIndicator)
let userData = new MapToLocal(mapNames.userData)
let selectedCommunicationLanguage = new MapToLocal(mapNames.selectedCommunicationLanguage)

/**
 * 
 * @param {string} senderID 
 * @param {string} message 
 * @description Handles Text Messages
 */
exports.handleTextMessage = async(senderID, message) => {

    if (languageChooser(senderID).initiateConversationMessages.includes(message)) {
        initConversationHandler(senderID, message)
    } else if (flowPathIndicator.has(senderID)) {
        const currentPathIndex = flowPathIndicator.get(senderID)

        switch (currentPathIndex) {
            case "1":
                await sendQuickReplyMessage(senderID, userReply())
                break
            case "2":
                designationHandler(senderID)
                break
            case "3":
                districtIdHandler(senderID)
                break
            case "4":
                quizHandler(senderID)
                break
            case "quiztext":
                await sendQuickReplyMessage(senderID, quizStart())
                break
            case "question1":
                await sendQuickReplyMessage(senderID, question1())
                break
            case "question2":
                await sendQuickReplyMessage(senderID, question2())
                break
            case "question3":
                await sendQuickReplyMessage(senderID, question3())
                break
            case "question4":
                await sendQuickReplyMessage(senderID, question4())
                break
            case "question5":
                await sendQuickReplyMessage(senderID, question5())
                break
            default:
                await sendTextMessage(senderID, languageChooser(senderID).somethingWentWrong)
        }
    } else {
        otherTextMessageHandler(senderID, message)
    }
}