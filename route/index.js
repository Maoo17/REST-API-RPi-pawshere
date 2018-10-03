/**
 * General routes.
 */
"use strict";

const express = require("express");
const router  = express.Router();
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({ extended: false });

const paws = require("../src/paws.js");

const Routefunctions = require("../src/class/Routefunctions.js");
var func = new Routefunctions();

/*
 * res.query.var --> parse the query
 * res.params.var --> parse the direct path of index
*/

router.get("/", (req, res) => {
});

router.get("/verify_key", async (req, res) => {
    let key = req.query.key;
    let text = "Key does not exist.";

    let result = await paws.checkForKey(key);

    if (typeof key == 'undefined') {
        text = "Wrong type of argument in query.";
    } else {
        text = "Key does not exists.";
        if (result === true) {
            text = "Key exist as a verified key.";
        }
    }

    res.write(text);
    res.end();
});

router.get("/cats", async (req, res) => {
    let key = req.query.api_key;
    let result = await paws.checkForKey(key);

    if (typeof key == 'undefined') {
        res.write("Wrong type of argument in query.");
    } else {
        if (result === true) {
            let data = await paws.getAllCats();
            res.write(func.mapToJson(data));
        } else {
            res.write("does not exist.");
        }
    }
    res.end();
});

router.get("/cat/:tag_id", async (req, res) => {
    let key = req.query.api_key;
    let tag = req.params.tag_id;
    let result = await paws.checkForKey(key);

    if (typeof key == 'undefined') {
        res.write("Wrong type of argument in query.");
    } else {
        if (result === true) {
            let data = await paws.getSpecificCat(tag);
            res.write(func.mapToJson(data));
        } else {
            res.write("does not exist.");
        }
    }
    res.end();
});

module.exports = router;
