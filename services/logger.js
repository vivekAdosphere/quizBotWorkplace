/* --> xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx <---

File Name : logger.js
File Description : This file helps to create log file

---> Required Dependencies <---
Installed Dependencies : 
1) winston (npm i winston)

User Defined Dependencies : 
1) package.json ("../package.json")

---> Function Definitions <---
1) timeZone

--> xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx <--- */

// Dependencies
const package = require("../package.json");
const { createLogger, transports, format } = require("winston");

/**
 * @description Helps to get indian timezone datetime string
 * @returns {string}
 */
let timeZone = () => {
    return new Date().toLocaleString('en-IN', {
        timeZone: 'Asia/Kolkata'
    });
}

// Logger Object
const logger = createLogger({
    transports: [
        new transports.File({
            filename: `${package.name}.log`,
            level: 'info',
            format: format.combine(format.timestamp({ format: timeZone }), format.json())
        }),
        new transports.Console({
            level: 'info',
            format: format.combine(format.timestamp({ format: timeZone }), format.json())
        })
    ]
})

// Exporting Logger
module.exports = logger;