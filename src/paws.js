"use strict";

module.exports = {
    checkForKey: checkForKey,
    getAllCats: getAllCats,
    getSpecificCat: getSpecificCat,
    registerCat: registerCat,
    checkForDuplicateId: checkForDuplicateId,
    deleteCat: deleteCat,
    registerUser: registerUser,
    login: login,
    deleteUser: deleteUser
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


//klart
async function checkForKey(key) {
    let sql = `SELECT * FROM api_users WHERE api_key = ?;`;
    let res = false;

    res = await db.query(sql, [key]);
    if (res.length !== 0) {
        res = true;
    }
    return res;
}
//klart
async function getAllCats() {
    let sql = `SELECT * FROM cat_profiles;`;
    let res;
    res = await db.query(sql);

    return res;
}
//klart
async function getSpecificCat(tag) {
    let sql = `SELECT * FROM cat_profiles WHERE tag_id = ?;`;
    let res;
    res = await db.query(sql, [tag]);

    return res;
}
//klart
async function registerCat(id, oi, name, hg, chip, owner, home, gps, img) {
    let sql = `INSERT INTO cat_profiles(tag_id, owner_id, name, home_group, is_chipped, owner, home, gps, img)
               VALUES
               (?, ?, ?, ?, ?, ?, ?, ?, ?);
               `;
    await db.query(sql, [id, oi, name, hg, chip, owner, home, gps, img]);
}
//klart
async function checkForDuplicateId(id) {
    let exists = false;
    let sql = `SELECT * FROM cat_profiles WHERE tag_id = ?`;
    let res = await db.query(sql, [id]);

    if (res.length !== 0) {
        exists = true;
    }
    return exists;
}
//klart
async function deleteCat(id) {
    let sql = `DELETE FROM cat_profiles WHERE tag_id = ?`;
    await db.query(sql, [id]);
}
//klart
async function deleteUser(id) {
    let sql = `DELETE FROM app_users WHERE id = ?`;
    await db.query(sql, [id]);
}
//klart
async function registerUser(username, pass) {
    let sql = `INSERT INTO app_users(id, username, password)
               VALUES
               (?, ?, ?);
               `;
    await db.query(sql, [null, username, pass]);
}
//klart
async function login(username, pass) {
    let result;
    let sql = `SELECT * FROM app_users WHERE username = ? AND password = ? `;
    let temp = await db.query(sql, [username, pass]);

    if (temp.length === 0) {
        result = "User or password is wrong.";
    } else {
        result = "Logged in as " + temp[0].username;
    }

    return result;
}
