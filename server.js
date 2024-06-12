/********************************************************************************
 * WEB322 – Assignment 04
 *
 * I declare that this assignment is my own work in accordance with Seneca's
 * Academic Integrity Policy:
 *
 * https://www.senecacollege.ca/about/policies/academic-integrity-policy.html
 *
 * Name: Alec Josef Serrano Student ID: 133592238 Date: June 10, 2024
 *
 * URL Link:
 *
 ********************************************************************************/
const legoData = require("./modules/legoSets");
const express = require('express');
const path = require("path");
const app = express();
const HTTP_PORT = process.env.PORT || 8080;

// Serve static files from 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Route for the home page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "views/home.html"));
});

// Route for the about page
app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, "views/about.html"));
});

// Route for fetching LEGO sets with optional theme filtering
app.get("/lego/sets", async (req, res) => {
    try {
       if(req.query.theme){
           let sets = await legoData.getSetsByTheme(req.query.theme);
           res.send(sets);
       }else {
           let sets = await legoData.getAllSets();
           res.send(sets);
       }
    } catch (err) {
        res.status(404).sendFile(path.join(__dirname, "views/404.html"));
    }
});

app.get("/lego/sets/:num", async (req, res) => {
    try {
        let set = await legoData.getSetByNum(req.params.num);
        res.json(set);
    } catch (err) {
        res.status(404).send(err);
    }
});

app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, "views/404.html"));
});

// Initialize the LEGO data and start the server
legoData.initialize().then(() => {
    app.listen(HTTP_PORT, () => {
        console.log(`server listening on: ${HTTP_PORT}`);
    });
}).catch(err => {
    console.error("Failed to start the server:", err);
});
