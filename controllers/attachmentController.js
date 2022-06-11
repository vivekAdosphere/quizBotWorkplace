const { sendTextMessage } = require("../services/messageSenders")
const languageChooser = require("../language/languageChooser")

exports.handleAttachmentMessage = async(senderId, message) => {
    try {
        await sendTextMessage(senderId, languageChooser(senderId).attachmentError)

    } catch (err) {
        console.log(err)
    }
}