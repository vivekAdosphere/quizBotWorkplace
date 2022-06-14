/* --> xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx <---

File Name : languageChooser.js
File Description : This file helps to choose correct language

---> Required Dependencies <---
Installed Dependencies : 

User Defined Dependencies :
1) mapToLocalDB ("../services/mapToLocalDB")
2) mapNames ("../configuration/mapNames")

---> Function Definitions <---
1) Module itself

--> xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx <--- */

// Dependencies
const mapNames = require("../configuration/mapNames");
const { MapToLocal } = require("../services/mapToLocalDB");

// Map Variables
let selectedCommunicationLanguage = new MapToLocal(mapNames.selectedCommunicationLanguage)

// Available Languages
const english = require("./english");
const gujarati = require("./gujarati");

/**
 * 
 * @param {string} senderID 
 * @returns {Object}
 * @description Helps to choose appropriate language file
 */
module.exports = (senderID) => {
    if (selectedCommunicationLanguage.has(senderID) && selectedCommunicationLanguage.get(senderID) === "English") {
        return english;
    } else if (selectedCommunicationLanguage.has(senderID) && selectedCommunicationLanguage.get(senderID) === "ગુજરાતી") {
        return gujarati;
    } else {
        return english;
    }
}