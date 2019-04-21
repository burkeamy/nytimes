const express = require("express");
const mongoose = require("mongoose");
const cheerio = require("cheerio");
const axios = require("axios");
const PORT =  process.env.PORT || 8080;

const app = express();

app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(express.static("public"));

//set handlebars
const exhbs = require("express-handlebars");

app.engine("handlebars", exhbs({ defaultLayout: "main"}));
app.set("view engine", "handlebars");

// Connect to the Mongo DB
mongoose.connect("mongodb://localhost/nytimesArticles", { useNewUrlParser: true });


console.log("grabbing info from nytimes");

app.get("/scrape", (req, res) => {
//make the request with axios
    axios.get("https://www.nytimes.com/").then(response => {

        //setting up cheerio
        const $ = cheerio.load(response.data);

        //array of results
        const results = [];

    //using cheerio to get parse the results
    //looking for articles
    $("h2").each((i, element) => {
        const title = $(element).text();
        const link = $(element).parents().attr("href");
    
        results.push({
            title: title,
            link: link
        })
        console.log(results);
    })

    db.Article.create(results)
        .then(dbArticle => {
         console.lg(dbArticle);
        })
        .catch(err => {
            console.log(err);
        })

    res.send("Your articles have arrived");
  });
});   
//import routes and give the server access to them.
//const routes = require("./controllers/nytimesController.js");

///app.use(routes);

//start server
app.listen(PORT, () => {
    console.log("server listening on " + PORT);
})