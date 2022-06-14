const mapNames = require("../configuration/mapNames");
const { clearMaps } = require("../utilities/utilities")
const { MapToLocal } = require("../services/mapToLocalDB");
const languageChooser = require("../language/languageChooser");
const { userReply, chooseLanguage, quizStart, question1, question2, question3, question4, question5, menuSelector } = require("../utilities/payloadStorage")
const { sendTextMessage, sendQuickReplyMessage, sendVideoFile, sendImageFile, sendCardMenu } = require("../services/messageSenders");

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

//the chat function starts from here
//when user initiate the conversation then this function will call
//this funciton set the flowapth to 1
exports.languageHandler = async(senderID) => {
    try {
        clearMaps(senderID)
        await sendQuickReplyMessage(senderID, chooseLanguage())

    } catch (err) {
        logger.error(`Error,${JSON.stringify(err.response.data)}`)
        clearMaps(senderID)
    }
}

exports.initConversationHandler = async(senderID) => {
    try {
        await sendTextMessage(senderID, languageChooser(senderID).welcomeMessage)
        await sendTextMessage(senderID, languageChooser(senderID).existingUser)
        await sendQuickReplyMessage(senderID, userReply(languageChooser(senderID).confirmData, languageChooser(senderID).confirmYes, languageChooser(senderID).confirmNo))
        setDefaultMapValues(senderID)
    } catch (err) {
        logger.error(`Error,${JSON.stringify(err.response.data)}`)
        clearMaps(senderID)
    }

}

//in above function we ask user for existing record , user reply with quick reply(YES<NO)
//we have to handle next function in quick reply controller

//if user answer with YES 
//then we have to send the generic template to select one of them


exports.menuHandler = async(senderID) => {
    try {
        await sendTextMessage(senderID, languageChooser(senderID).selectMenu)
        await sendCardMenu(senderID, menuSelector())
    } catch (err) {
        logger.error(`Error, from MENU hanlder --> ${senderID} : ${err.response.data}`)

    }
}

exports.nameHandler = async(senderID) => {
    try {
        await sendTextMessage(senderID, languageChooser(senderID).askForName)
        flowPathIndicator.set(senderID, "2")

    } catch (err) {
        logger.error(`Error,${JSON.stringify(err.response.data)}`)
        clearMaps(senderID)
    }
}

exports.designationHandler = async(senderID) => {
    try {
        await sendTextMessage(senderID, languageChooser(senderID).askForDesignation)
        flowPathIndicator.set(senderID, "3")
    } catch (err) {
        logger.error(`Error,${JSON.stringify(err.response.data)}`)
        clearMaps(senderID)
    }
}

exports.districtIdHandler = async(senderID) => {
    try {
        await sendTextMessage(senderID, languageChooser(senderID).askForDistrictId)
        flowPathIndicator.set(senderID, "menu")

    } catch (err) {
        logger.error(`Error,${JSON.stringify(err.response.data)}`)
        clearMaps(senderID)
    }
}

exports.quizHandler = async(senderID) => {
    try {
        await sendTextMessage(senderID, languageChooser(senderID).videoHold)
        await sendVideoFile(senderID)
        await sendTextMessage(senderID, languageChooser(senderID).learnFromVideo);
        await sendQuickReplyMessage(senderID, quizStart(languageChooser(senderID).initiateQuiz))
        flowPathIndicator.set(senderID, "quiztext")

    } catch (err) {
        logger.error(`Error,${JSON.stringify(err.response.data)}`)
        clearMaps(senderID)
    }
}

exports.question1Handler = async(senderID) => {
    try {
        await sendQuickReplyMessage(senderID, question1(languageChooser(senderID).questionOne, languageChooser(senderID).question1Op1, languageChooser(senderID).question1Op2, languageChooser(senderID).question1Op3, languageChooser(senderID).question1Op4))
        flowPathIndicator.set(senderID, "question1")
        userDataUpdator(senderID, "score", 0)
    } catch (err) {
        logger.error(`Error,${JSON.stringify(err.response.data)}`)
        clearMaps(senderID)
    }
}
exports.question2Handler = async(senderID, message) => {
    try {
        if (message === "Narmada") {
            userDataUpdator(senderID, "score", 1)
        }
        await sendQuickReplyMessage(senderID, question2(languageChooser(senderID).questionTwo, languageChooser(senderID).confirmYes, languageChooser(senderID).confirmNo))
        flowPathIndicator.set(senderID, "question2")
    } catch (err) {
        logger.error(`Error,${JSON.stringify(err.response.data)}`)
        clearMaps(senderID)
    }
}
exports.question3Handler = async(senderID, message) => {
    try {
        if (message === "noquestion2") {
            userDataUpdator(senderID, "score", userData.get(senderID).score + 1)
            console.log(userData.get(senderID).score)
        }
        await sendQuickReplyMessage(senderID, question3(languageChooser(senderID).questionThree, languageChooser(senderID).question3Op1, languageChooser(senderID).question3Op2))
        flowPathIndicator.set(senderID, "question3")
    } catch (err) {
        logger.error(`Error,${JSON.stringify(err.response.data)}`)
        clearMaps(senderID)
    }
}
exports.question4Handler = async(senderID, message) => {
    try {
        if (message === "Bhagirathi") {
            userDataUpdator(senderID, "score", userData.get(senderID).score + 1)

        }
        console.log(userData.get(senderID).score)

        await sendQuickReplyMessage(senderID, question4(languageChooser(senderID).questionFour, languageChooser(senderID).question4Op1, languageChooser(senderID).question4Op2, languageChooser(senderID).question4Op3, languageChooser(senderID).question4Op4))
        flowPathIndicator.set(senderID, "question4")
    } catch (err) {
        logger.error(`Error,${JSON.stringify(err.response.data)}`)
        clearMaps(senderID)
    }
}
exports.question5Handler = async(senderID, message) => {
    try {
        if (message === "lived") {
            userDataUpdator(senderID, "score", userData.get(senderID).score + 1)
        }
        console.log(userData.get(senderID).score)

        await sendQuickReplyMessage(senderID, question5(languageChooser(senderID).questionFive, languageChooser(senderID).confirmYes, languageChooser(senderID).confirmNo))
        flowPathIndicator.set(senderID, "question5")


    } catch (err) {
        logger.error(`Error,${JSON.stringify(err.response.data)}`)
        clearMaps(senderID)
    }
}

exports.otherTextMessageHandler = async(senderID) => {
    try {
        sendTextMessage(senderID, languageChooser(senderID).invalidInputMessage)
    } catch (err) {
        logger.error(`Error,${JSON.stringify(err.response.data)}`)
        clearMaps(senderID)
    }
}

exports.thankYouMessageSender = async(senderID, message) => {
    try {
        if (message === "noquestion5") {
            userDataUpdator(senderID, "score", userData.get(senderID).score + 1)
        }
        console.log(userData.get(senderID).score)

        await sendTextMessage(senderID, languageChooser(senderID).thankYouMsg + ", " + `${userData.get(senderID).score}/5`)
        await sendImageFile(senderID)
        clearMaps(senderID)

    } catch (err) {
        logger.error(`Error,${JSON.stringify(err.response.data)}`)
        clearMaps(senderID)
    }
}

exports.introductionMessageHandler = async(senderID, message) => {
    await sendTextMessage(senderID, languageChooser(senderID).welcomeMessage)
}