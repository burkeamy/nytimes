const mongoose = require("mongoose");

//set up mongoose schema constructor
const Schema = mongoose.Schema;

//create a new schema to store articles
const ArticleSchema = new Schema ({
    title: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    //link the notes database to the articles so a user can mark a specific article
    note: {
        type: Schema.Types.ObjectId,
        ref: "Notes"
    }
});

//create model from the schema
const Article = mongoose.model("Article", ArticleSchema);

//export to index.js
module.exports = Article;