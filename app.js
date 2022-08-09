const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const _ = require('lodash');
const ejs = require('ejs')

const app = express();

app.set('view engine', 'ejs');

app.use(express.static(__dirname + "/public/"));

app.use(bodyParser.urlencoded({
    extended: true
}))

mongoose.connect("mongodb://localhost:27017/formDB")

const callTypes = ["Complaint", "Suggestion", "Feedback", "Enquiry"];
const localExport = ["Local", "Export"];

const infoSchema = {
    date: Date,
    name: String,
    phoneNumber: Number,
    email: String,
    address: String,
    landmark: String,
    area: String,
    city: String,
    callType: String,
    localExport: String,
    nature: String,
    actionTaken: String
}

const Info = mongoose.model('Info', infoSchema);

app.get("/", (req, res) => {
    res.render("index");
})

app.post("/", (req, res) => {


    const info = new Info({
        date: req.body.date,
        name: req.body.customerName,
        phoneNumber: req.body.contact,
        email: req.body.email,
        address: req.body.address,
        landmark: req.body.landmark,
        area: req.body.area,
        city: req.body.city,
        callType: callTypes[req.body.callType],
        localExport: localExport[req.body.exportLocal],
        nature: req.body.nature,
        actionTaken: req.body.actionTaken
    })

    info.save(err => {
        if (!err) {
            res.redirect("/info")
        }
    })

})

app.get('/info', (req, res) => {
    Info.find({}, (err, foundInfo) => {
        console.log(foundInfo)
        res.render('info', {
            infoArr: foundInfo
        })
    })

})

app.listen(3000, (req, res) => {
    console.log('listening on port 3000')
})