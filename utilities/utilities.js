/* --> xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx <---

File Name : utilities.js
File Description : This file includes common utility functions for the project

---> Required Dependencies <---
Installed Dependencies : 
1) crypto

User Defined Dependencies : 
1) mapNames ("../configuration/mapNames")
2) mapToLocalDB ("../services/mapToLocalDB")

---> Function Definitions <---
1) clearMaps
2) webviewSecureEndpointGenerator

--> xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx <--- */

// Dependencies
const crypto = require("crypto")
const mapNames = require("../configuration/mapNames");
const { MapToLocal } = require("../services/mapToLocalDB");

// Map Variables
let flowPathIndicator = new MapToLocal(mapNames.flowPathIndicator)
let userData = new MapToLocal(mapNames.userData)
let selectedCommunicationLanguage = new MapToLocal(mapNames.selectedCommunicationLanguage)

/**
 * 
 * @param {string} senderID 
 * @description Clears local database
 */
exports.clearMaps = (senderID) => {
    if (flowPathIndicator.has(senderID)) {
        flowPathIndicator.delete(senderID)
    }
    if (userData.has(senderID)) {
        userData.delete(senderID)
    }
    if (selectedCommunicationLanguage.has(senderID)) {
        selectedCommunicationLanguage.delete(senderID)
    }
}

/**
 * @description Helps to generate 64 character hex string
 * @returns 
 */
exports.webviewSecureEndpointGenerator = () => {
    return crypto.randomBytes(64).toString('hex');
}