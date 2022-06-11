/* --> xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx <---

File Name : mapToLocalDB.js
File Description : This file contains constructor which helps to convert and store js map object into local json file.

---> Required Dependencies <---
Installed Dependencies : 
1) croxydb (npm i croxydb)

User Defined Dependencies : 

---> Class Definitions <---
1) MapToLocal

---> Method Definitions <---
1) setMap
2) set
3) get
4) getMap
5) has
6) delete

--> xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx---xxx <--- */

// Dependencies
const db = require("croxydb");

// MapToLocal Class
class MapToLocal {
    /**
     * 
     * @param {string} dbKey 
     * @description Constructor Object
     */
    constructor(dbKey) {
        this.dbKey = dbKey;
    }

    /**
     * 
     * @param {string} key 
     * @param {string} value 
     * @description Helps to stores map object as a value of key
     */
    setMap(key, value) {
        if (db.has(this.dbKey)) {
            const createNewMap = new Map(Object.entries(db.get(this.dbKey)));
            createNewMap.set(key, Object.fromEntries(value));
            db.delByPriority(this.dbKey, 1);
            db.set(this.dbKey, Object.fromEntries(createNewMap));
        } else { //Create New MAP
            const createNewMap = new Map();
            createNewMap.set(key, Object.fromEntries(value));
            db.set(this.dbKey, Object.fromEntries(createNewMap));
        }
    }

    /**
     * 
     * @param {string} key 
     * @param {string} value 
     * @description Helps to stores any type of data as value of key.
     */
    set(key, value) {
        if (db.has(this.dbKey)) {
            const createNewMap = new Map(Object.entries(db.get(this.dbKey)));
            createNewMap.set(key, value);
            db.delByPriority(this.dbKey, 1);
            db.set(this.dbKey, Object.fromEntries(createNewMap));
        } else { //Create New MAP
            const createNewMap = new Map();
            createNewMap.set(key, value);
            db.set(this.dbKey, Object.fromEntries(createNewMap));
        }
    }

    /**
     * 
     * @param {string} key 
     * @returns 
     * @description Helps to get value of key.
     */
    get(key) {
        if (db.has(this.dbKey)) {
            const createNewMap = new Map(Object.entries(db.get(this.dbKey)));
            return createNewMap.get(key);
        } else {
            return undefined;
        }
    }

    /**
     * 
     * @param {string} key 
     * @returns 
     * @description Helps to get value of key if data is map object.
     */
    getMap(key) {
        if (db.has(this.dbKey)) {
            const createNewMap = new Map(Object.entries(db.get(this.dbKey)));
            return new Map(Object.entries(createNewMap.get(key)));
        } else {
            return new Map();
        }
    }

    /**
     * 
     * @param {string} key 
     * @returns 
     * @description Helps to check if key is present in database or not.
     */
    has(key) {
        if (db.has(this.dbKey)) {
            const createNewMap = new Map(Object.entries(db.get(this.dbKey)));
            return createNewMap.has(key);
        } else {
            return false;
        }
    }

    /**
     * 
     * @param {string} key 
     * @description Helps to delete key from the database.
     */
    delete(key) {
        if (db.has(this.dbKey)) {
            const createNewMap = new Map(Object.entries(db.get(this.dbKey)));
            if (createNewMap.has(key)) {
                createNewMap.delete(key)
                db.delByPriority(this.dbKey, 1);
                db.set(this.dbKey, Object.fromEntries(createNewMap));
            }
        }
    }
}

module.exports = { MapToLocal }