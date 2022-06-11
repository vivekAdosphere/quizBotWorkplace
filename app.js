/* --> xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx <---

File Name : app.js
File Description : This file is entry point of the app and it contains contains

---> Required Dependencies <---
Installed Dependencies : 
1) express (npm install express)

User Defined Dependencies : 
1) config.js ("./config/config")
2) router.js ("./webRoutes/router")

---> Function Definitions <---

--> xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx <--- */


const express = require("express")
const config = require("./configuration/config");
const { webRouter } = require("./webRoutes/router")
const app = express()

const PORT = config.PORT;


//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./public"));

//setting view engine
app.set("view engine", "ejs")
app.set("views", "./views")

//setting up web routes
webRouter(app)

app.listen(PORT, () => {
    console.log(`Bot is running at ${PORT}`)
})