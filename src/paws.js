"use strict";

module.exports = {
    checkForKey: checkForKey,
    getAllCats: getAllCats,
    getSpecificCat: getSpecificCat
};

const mysql  = require("promise-mysql");
const config = require("../config/db/paws.json");
// const rf = require("class/Routefunctions.js");

let db;

(async function() {
    db = await mysql.createConnection(config);

    process.on("exit", () => {
        db.end();
    });
})();



async function checkForKey(key) {
    let sql = `SELECT * FROM api_users WHERE api_key = ?;`;
    let res = false;

    res = await db.query(sql, [key]);
    if (res.length !== 0) {
        res = true;
    }
    return res;
}
async function getAllCats() {
    let sql = `SELECT * FROM cat_profiles;`;
    let res;
    res = await db.query(sql);

    return res;
}

async function getSpecificCat(tag) {
    let sql = `SELECT * FROM cat_profiles WHERE tag_id = ?;`;
    let res;
    res = await db.query(sql, [tag]);

    return res;
}
