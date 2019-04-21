const mongoose = require("mongoose");

const Schema = mongoose.Schema;

//setting up the note schema
const NoteSchema = new Schema({
    title: String,
    body: String
});

//create the model for making notes
const Notes = mongoose.model("Notes", NoteSchema);

//export to the index
module.exports = Notes;