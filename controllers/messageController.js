const mapNames = require("../configuration/mapNames");
const { clearMaps } = require("../utilities/utilities")
const { MapToLocal } = require("../services/mapToLocalDB");
const languageChooser = require("../language/languageChooser");
const { userReply, quizStart, question1, question2, question3, question4, question5 } = require("../utilities/payloadStorage")
const { sendTextMessage, sendQuickReplyMessage, sendVideoFile, sendImageFile } = require("../services/messageSenders");

// Map Variables
let flowPathIndicator = new MapToLocal(mapNames.flowPathIndicator)
let userData = new MapToLocal(mapNames.userData)
let selectedCommunicationLanguage = new MapToLocal(mapNames.selectedCommunicationLanguage)

/**
 * 
 * @param {string} senderID 
 * @description Sets default value for local database
 */
let setDefaultMapValues = (senderID) => {
    flowPathIndicator.set(senderID, "1")
    userData.set(senderID, {})
}

/**
 * 
 * @param {string} senderID 
 * @param {string} key 
 * @param {object} value 
 * @returns 
 * @description Helps to update database in dynamic way
 */
let userDataUpdator = (senderID, key, value) => {
    let dictValues = userData.get(senderID, value)
    dictValues[key] = value
    userData.set(senderID, dictValues)
    return;
}

/**
 * 
 * @param {string} senderID 
 * @description Starting Covnersation Handler
 */
exports.initConversationHandler = async(senderID) => {
    try {
        clearMaps(senderID)
        await sendTextMessage(senderID, languageChooser(senderID).welcomeMessage)
        await sendTextMessage(senderID, languageChooser(senderID).existingUser)
        await sendQuickReplyMessage(senderID, userReply())
        setDefaultMapValues(senderID)
    } catch (err) {
        clearMaps(senderID)
    }

}

exports.nameHandler = async(senderID) => {
    try {
        await sendTextMessage(senderID, languageChooser(senderID).askForName)
        flowPathIndicator.set(senderID, "2")

    } catch (err) {
        clearMaps(senderID)
    }
}

exports.designationHandler = async(senderID) => {
    try {
        await sendTextMessage(senderID, languageChooser(senderID).askForDesignation)
        flowPathIndicator.set(senderID, "3")
    } catch (err) {
        clearMaps(senderID)
    }
}

exports.districtIdHandler = async(senderID) => {
    try {
        await sendTextMessage(senderID, languageChooser(senderID).askForDistrictId)
        flowPathIndicator.set(senderID, "4")

    } catch (err) {
        clearMaps(senderID)
    }
}

exports.quizHandler = async(senderID) => {
    try {
        await sendTextMessage(senderID, languageChooser(senderID).videoHold)
        await sendVideoFile(senderID)
        await sendTextMessage(senderID, languageChooser(senderID).learnFromVideo);
        await sendQuickReplyMessage(senderID, quizStart())
        flowPathIndicator.set(senderID, "quiztext")

    } catch (err) {
        clearMaps(senderID)
    }
}

exports.question1Handler = async(senderID) => {
    try {
        await sendQuickReplyMessage(senderID, question1())
        flowPathIndicator.set(senderID, "question1")
        userDataUpdator(senderID, "score", 0)
    } catch (err) {
        clearMaps(senderID)
    }
}
exports.question2Handler = async(senderID, message) => {
    try {
        if (message === "Narmada") {
            userDataUpdator(senderID, "score", 1)
        }
        await sendQuickReplyMessage(senderID, question2())
        flowPathIndicator.set(senderID, "question2")
    } catch (err) {
        clearMaps(senderID)
    }
}
exports.question3Handler = async(senderID, message) => {
    try {
        if (message === "noquestion2") {
            userDataUpdator(senderID, "score", userData.get(senderID).score + 1)
            console.log(userData.get(senderID).score)
        }
        await sendQuickReplyMessage(senderID, question3())
        flowPathIndicator.set(senderID, "question3")
    } catch (err) {
        clearMaps(senderID)
    }
}
exports.question4Handler = async(senderID, message) => {
    try {
        if (message === "Bhagirathi") {
            userDataUpdator(senderID, "score", userData.get(senderID).score + 1)

        }
        console.log(userData.get(senderID).score)

        await sendQuickReplyMessage(senderID, question4())
        flowPathIndicator.set(senderID, "question4")
    } catch (err) {
        clearMaps(senderID)
    }
}
exports.question5Handler = async(senderID, message) => {
    try {
        if (message === "lived") {
            userDataUpdator(senderID, "score", userData.get(senderID).score + 1)
        }
        console.log(userData.get(senderID).score)

        await sendQuickReplyMessage(senderID, question5())
        flowPathIndicator.set(senderID, "question5")


    } catch (err) {
        clearMaps(senderID)
    }
}

exports.otherTextMessageHandler = async(senderID) => {
    try {
        sendTextMessage(senderID, languageChooser(senderID).invalidInputMessage)
    } catch (err) {
        clearMaps(senderID)
    }
}

exports.thankYouMessageSender = async(senderID, message) => {
    try {
        if (message === "noquestion5") {
            userDataUpdator(senderID, "score", userData.get(senderID).score + 1)
        }
        console.log(userData.get(senderID).score)

        await sendTextMessage(senderID, languageChooser(senderID).thankYouMsg + ", " + `your score is ${userData.get(senderID).score}/5`)
        await sendImageFile(senderID)
        clearMaps(senderID)

    } catch (err) {
        clearMaps(senderID)
    }
}

exports.introductionMessageHandler = async(senderID, message) => {
    await sendTextMessage(senderID, languageChooser(senderID).welcomeMessage)
}