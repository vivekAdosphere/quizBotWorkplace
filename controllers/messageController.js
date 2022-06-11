const mapNames = require("../configuration/mapNames");
const { clearMaps } = require("../utilities/utilities")
const { MapToLocal } = require("../services/mapToLocalDB");
const languageChooser = require("../language/languageChooser");
const { demoQuickReply, demoWebview, userReply, quizStart, question1, question2, question3, question4, question5 } = require("../utilities/payloadStorage")
const { sendTextMessage, sendQuickReplyMessage, sendWebviewTemplate, sendVideoFile, sendImageFile } = require("../services/messageSenders");

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
        await sendQuickReplyMessage(senderID, userReply())
        setDefaultMapValues(senderID)
    } catch (err) {
        console.log(err)
    }

}

exports.nameHandler = async(senderID) => {
    try {
        await sendTextMessage(senderID, languageChooser(senderID).askForName)
        flowPathIndicator.set(senderID, "2")

    } catch (err) {

        console.log(err)
        clearMaps(senderID)
    }
}

exports.designationHandler = async(senderID) => {
    try {
        await sendTextMessage(senderID, languageChooser(senderID).askForDesignation)
        flowPathIndicator.set(senderID, "3")
    } catch (err) {
        console.log(err)
        clearMaps(senderID)
    }
}

exports.districtIdHandler = async(senderID) => {
    try {
        await sendTextMessage(senderID, languageChooser(senderID).askForDistrictId)
        flowPathIndicator.set(senderID, "4")

    } catch (err) {
        console.log(err)
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
        console.log(err)
        clearMaps(senderID)
    }
}

exports.question1Handler = async(senderID) => {
    try {
        await sendQuickReplyMessage(senderID, question1())
        flowPathIndicator.set(senderID, "question1")
    } catch (err) {
        console.log(err)
        clearMaps(senderID)
    }
}
exports.question2Handler = async(senderID, message) => {
    try {
        if (message === "Narmada") {
            console.log(message)

            userDataUpdator(senderID, "score", 1)
        }
        await sendQuickReplyMessage(senderID, question2())
        flowPathIndicator.set(senderID, "question2")
    } catch (err) {
        console.log(err)
        clearMaps(senderID)
    }
}
exports.question3Handler = async(senderID, message) => {
    try {
        if (message === "Cuttack") {
            console.log(message)
            userDataUpdator(senderID, "score", 2)
        }
        await sendQuickReplyMessage(senderID, question3())
        flowPathIndicator.set(senderID, "question3")
    } catch (err) {
        console.log(err)
        clearMaps(senderID)
    }
}
exports.question4Handler = async(senderID, message) => {
    try {
        if (message === "Bhagirathi") {
            console.log(message)
            userDataUpdator(senderID, "score", 3)
        }
        await sendQuickReplyMessage(senderID, question4())
        flowPathIndicator.set(senderID, "question4")
    } catch (err) {
        console.log(err)
        clearMaps(senderID)
    }
}
exports.question5Handler = async(senderID, message) => {
    try {
        if (message === "Hurricanes") {
            console.log(message)
            userDataUpdator(senderID, "score", 4)
        }
        await sendQuickReplyMessage(senderID, question5())
        flowPathIndicator.set(senderID, "question5")


    } catch (err) {
        console.log(err)
        clearMaps(senderID)
    }
}

exports.otherTextMessageHandler = async(senderID) => {
    try {
        sendTextMessage(senderID, languageChooser(senderID).invalidInputMessage)
    } catch (err) {
        console.log(err)
    }
}

exports.thankYouMessageSender = async(senderID, message) => {
    try {
        if (message === "Venus") {
            console.log(message)
            userDataUpdator(senderID, "score", 5)
        }
        await sendTextMessage(senderID, languageChooser(senderID).thankYouMsg)
        await sendTextMessage(senderID, `You have successfully scored ${userData.get(senderID)} and you have earned the certificate`)

        await sendImageFile(senderID)
        clearMaps(senderID)

    } catch (err) {
        console.log(err)
        clearMaps(senderID)
    }
}

exports.introductionMessageHandler = async(senderID, message) => {
    await sendTextMessage(senderID, languageChooser(senderID).welcomeMessage)
}