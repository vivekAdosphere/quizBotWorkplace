/* --> xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx <---

File Name : routeHandlers.js
File Description : This file includes handler functions of web router definitions

---> Required Dependencies <---
Installed Dependencies : 

User Defined Dependencies : 
1) config.js ("../configuration/config")
2) logger.js ("../services/logger")
3) quickReplyController.js ("../controllers/quickReplyController")
4) textMessageController.js ("../controllers/textMessageController")
5) attachmentController.js ("../controllers/attachmentController")
6) postbackController.js ("../controllers/postbackController")
7) messageSenders.js ("../services/messageSenders")

---> Function Definitions <---
1) getHomepage
2) getVerify
3) getWebhook
4) handleWebhook

--> xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx <--- */

// Dependencies
const logger = require("../services/logger");
const config = require("../configuration/config");
const { setupWorkplaceProfile } = require("../services/messageSenders");
const { handleTextMessage } = require("../controllers/textMessageController");
const { handlePostbackMessage } = require("../controllers/postbackController");
const { handleQuickReplyMessage } = require("../controllers/quickReplyController");
const { handleAttachmentMessage } = require("../controllers/attachmentController");
const { webviewSecureEndpointGenerator } = require("../utilities/utilities");

// Config Variables
const VERIFICATION_TOKEN = config.VERIFICATION_TOKEN;
const webhookRouteVerificationPassword = config.webhookRouteVerificationPassword;
const workplaceInstanceUrl = config.workplaceInstanceUrl;

/**
 * 
 * @param {object} req 
 * @param {object} res 
 * @description Homepage route handler
 */
exports.getHomepage = (req, res) => {
    res.render("homepage")
}

/**
 * 
 * @param {object} req 
 * @param {object} res 
 * @description Webhook verification route handler
 */
exports.getVerify = async(req, res) => {
    const queryPassword = req.params.password
    console.log(queryPassword)

    if (queryPassword === webhookRouteVerificationPassword) {
        const response = await setupWorkplaceProfile()
        if (response.status === 200) {
            res.send({ "verification_status": "success for 1" })
        } else {
            res.send({ "verification_status": "failed" })
        }
    } else {
        res.send({ "verification_status": "invalid_password" })
    }
}

/**
 * 
 * @param {object} req 
 * @param {object} res 
 * @description Webhook Verification route handler
 */
exports.getWebhook = async(req, res) => {
    // Default Query Parameters
    const hubMode = req.query["hub.mode"]
    const verifyToken = req.query["hub.verify_token"]
    const challenge = req.query["hub.challenge"]

    // Establishing Webhook Connection
    if (hubMode && verifyToken) {
        if (hubMode === "subscribe" && verifyToken === VERIFICATION_TOKEN) {
            const response = await setupWorkplaceProfile()
            if (response.status === 200) {
                logger.info(`Success, Webhook Verified Successfully.`)
            } else {
                logger.info(`Error, Webhook Verification Failed.`)
            }
            res.status(200).send(challenge) // Sending '200 OK' response status if webhook verified using verification token
        } else {
            res.sendStatus(403) // Responds with '403 Forbidden' if verify tokens do not match
        }
    }
}

/**
 * 
 * @param {object} req 
 * @param {object} res 
 * @description Webhook Post route handler
 */
exports.handleWebhook = (req, res) => {
    // Request body data
    let data = req.body

    // Checking if webhook event (request) is coming from a page subscription ?
    if (data.object === "page") {
        for (let pageEntry of data.entry) {
            for (let messagingEvent of pageEntry.messaging) {
                // Storing Sender's PSID
                let senderID = messagingEvent.sender.id

                // Messaging events handling
                if (messagingEvent.message) {
                    // QuickReply Message Bifurcation
                    if (messagingEvent.message.quick_reply) {
                        handleQuickReplyMessage(senderID, messagingEvent.message.quick_reply)
                    }
                    // Text Message Bifurcation
                    else if (messagingEvent.message.text) {
                        handleTextMessage(senderID, messagingEvent.message.text)
                    }
                    // Attachment Message Bifurcation
                    else if (messagingEvent.message.attachments) {
                        handleAttachmentMessage(senderID, messagingEvent.message.attachments)
                    }
                }
                // Postback Message Bifurcation
                else if (messagingEvent.postback) {
                    handlePostbackMessage(senderID, messagingEvent.postback)
                }
            }
        }
    }
    res.sendStatus(200) // Sending '200 OK' response status to all events.
}

// Optional for webview testing
exports.askDemoWebview = (req, res) => {
    console.log(req);
    // const referer = req.get('Referer')

    // if (referer) {
    //     if (referer.indexOf(workplaceInstanceUrl.split("//").pop().split("/")[0]) >= 0) {
    //         res.setHeader('X-Frame-Options', 'ALLOW-FROM '+workplaceInstanceUrl);
    //         res.render("demoWebview")
    //     } 

    // }

    // --------------------------------

    let secureHash;
    if (req.headers['sec-fetch-dest'] === "iframe") {
        secureHash = webviewSecureEndpointGenerator()
    }

    if (req.headers.referer === workplaceInstanceUrl && secureHash) {
        res.render("demoWebview")
    } else {
        res.sendStatus(404)
    }
}