/* --> xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx <---

File Name : router.js
File Description : This file includes web router definitions

---> Required Dependencies <---
Installed Dependencies : 
1) express (npm install express)

User Defined Dependencies : 
1) routeHandlers.js ("./routeHandlers")

---> Function Definitions <---
1) webRouter

--> xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx <--- */

// Dependencies
const express = require("express");
const { getHomepage, getWebhook, handleWebhook, getVerify, askDemoWebview } = require("./routeHandler");

// Router Object
let router = express.Router();

/**
 * 
 * @param {object} app 
 * @returns {object}
 * @description Router definition function
 */
exports.webRouter = (app) => {
    // Homepage
    router.get(["/", "/home"], getHomepage)

    // Webhook
    router.get("/webhook", getWebhook)
    router.post("/webhook", handleWebhook)

    // Webhook Verification
    router.get("/verify/:password", getVerify)

    // Optional for webview testing
    router.get("/ask-demowebview", askDemoWebview)

    return app.use("/", router)
}