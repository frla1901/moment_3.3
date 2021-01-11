/* NodeJS JavaScript - Moment 2 - DT162G, JavaScript-baserad webbutveckling 
Skapad av Frida Lazzari */

/* bibliotek som ska importeras */
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var mongoose = require("mongoose");

mongoose.connect("mongodb+srv://frida:TzUIc6ge1EWbECzJ@cluster0.xterm.mongodb.net/dbCourses", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

/* skapar instans av express biblioteket */
var app = express();

/* Läs in mongoose schema */
var Courses = require("./app/models/courses.js");

/* middelware för att göra webbtjänsterna blir tillgängliga även från andra domäner
att använda i framtiden */

app.all(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Headers", "Origin, Accept, X-Requested-With, Content-Type, Authorization");
    res.header("Access-Control-Allow-Methods", "GET,PUT,PATCH,POST,DELETE");
    next();
});

/* body parser */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/* skapar statisk sökväg */
app.use(express.static(path.join(__dirname, 'public')));

/* REST-api för kurser */
// alla kurser
app.get("/courses", function(req, res) {
    Courses.find(function(err, Courses) {
        if (err) {
            res.send(err)
        }
        res.json(Courses);
    });
});

// en specifik kurs
app.get("/courses/:id", function(req, res) {
    var Id = req.params.id;

    Courses.find({ _id: Id }, function(err, Courses) {
        if (err) {
            res.send(err)
        }
        res.json(Courses);
    });
});

// ta bort en specifik kurs
app.delete("/courses/delete/:id", function(req, res) {
    var deleteId = req.params.id;

    Courses.deleteOne({ _id: deleteId }, function(err, Courses) {
        if (err) {
            res.send(err)
        } else {
            res.json({
                message: "Raderar kurs med id " + deleteId
            });
        }
    });
});

// lägga till en ny kurs 
app.post("/courses/add", function(req, res) {

    // ny instans av Courses
    var course = new Courses();

    course.courseId = req.body.courseId;
    course.courseName = req.body.courseName;
    course.coursePeriod = req.body.coursePeriod;

    // spara kurs till databasen och skriva ut ev. felmeddelande
    course.save(function(err) {
        if (err) {
            res.send(err)
        }
    });

    res.redirect("/");
});

// anslutningsport
var port = 3000;

// starta server
app.listen(port, function() {
    console.log("Servern är startad på port 3000");
});