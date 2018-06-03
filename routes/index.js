var express = require('express');
var app = express();
var router = express.Router();
var cors = require('cors')
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors()) // Use this after the variable declaration

app.listen(3001, function () {
    console.log('Example app listening on port 3000!');
})
app.post("/user/add", function (req, res) {
    /* some server side logic */
    console.log(req.body);      // your JSON
    console.log(req.body["user"])
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("app_db");
        dbo.collection("users").insertOne(req.body, function(err, res) {
            if (err) throw err;
            console.log("1 document inserted");
            db.close();
        });
    });
    res.send("OK");
});
module.exports = router;