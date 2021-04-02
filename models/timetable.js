var mongoose = require("mongoose");

// ########################################################
// ##
// ##                 Ques Schema
// ##
// ########################################################


var timetableSchema = new mongoose.Schema({
    name: String,
    file: String,
    quesDate: { type: Date, default: Date.now },
});


module.exports = mongoose.model("Timetable", timetableSchema);