/**
 * General routes.
 */
"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const router  = express.Router();
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
            res.json({message: "Key is registered as valid API-key"});
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
            res.json({message: "Key does not exist."});
        }
    }
    res.end();
});

router.get("/cat/:tag_id", async (req, res) => {
    let key = req.query.api_key;
    let tag = req.params.tag_id;
    let result = await paws.checkForKey(key);

    if (typeof key == 'undefined') {
        res.json({message: "Wrong type of argument in query."});
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

router.post("/cats", async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    let id = req.body.tag_id;
    let oi = req.body.owner_id;
    let name = req.body.name;
    let hg = req.body.home_group;
    let chip = req.body.is_chipped;
    let owner = req.body.owner;
    let home = req.body.home;
    let img = req.body.img;
    let gps = "0,0";
    let mv = "0,0";

    let key = req.query.api_key;
    let result = await paws.checkForKey(key);

    if (typeof key == 'undefined') {
        res.json({message: "Wrong type of argument in query."});
    } else {
        if (result === true) {
            await paws.registerCat(id, oi, name, hg, chip, owner, home, gps, mv, img);
        } else {
            res.json(func.formatError("Cannot use duplicate entry for id.", "Entry aldready exists."));
        }
    }

    res.end();
});

router.delete("/cats", async (req, res) => {
    let id = req.body.tag_id;

    let key = req.query.api_key;
    let result = await paws.checkForDuplicateId(id);

    if (typeof key == 'undefined') {
        res.json({message: "Wrong type of argument in query."});
    } else {
        if (result === true) {
            await paws.deleteCat(id);
        } else {
            res.json(func.formatError("Cannot delete cat.", "Entry does not exists."));
        }
    }

    res.end();
});

router.delete("/users", async (req, res) => {
    let id = req.body.id;
    let key = req.query.api_key;

    if (typeof key == 'undefined') {
        res.json({message: "Wrong type of argument in query."});
    } else {
        await paws.deleteUser(id);
    }

    res.end();
});

router.post("/users", async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    let username = req.body.username;
    let password = req.body.password;
    let key = req.query.api_key;

    if (typeof key == 'undefined') {
        res.json({message: "Wrong type of argument in query."});
    } else {
        await paws.registerUser(username, password);
    }

    res.end();
});

router.post("/login", async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    let username = req.body.username;
    let password = req.body.password;

    let key = req.query.api_key;
    let result = await paws.checkForKey(key);

    if (typeof key == 'undefined') {
        res.json({message: "Wrong type of argument in query."});
    } else {
        if (result === true) {
            let loginres = await paws.login(username, password);
            res.json({message: loginres});
        } else {
            res.json({message: "API-key is not valid."});
        }
    }

    res.end();
});


module.exports = router;
