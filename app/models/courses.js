/* mongoose schema för kurser */

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// utan id för det sköts automatiskt av mongodb
var coursesSchema = new Schema({
    courseId: String,
    courseName: String,
    coursePeriod: Number
});

/* exportera schemat */
module.exports = mongoose.model("Courses", coursesSchema);