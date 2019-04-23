const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const cheerio = require("cheerio");
const axios = require("axios");

const PORT =  process.env.PORT || 8080;

const db = require("./models");

const app = express();

//morgan logger to log requests
app.use(logger("dev"));

//parse json requests
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

//make public folder static
app.use(express.static("public"));

//set handlebars
const exhbs = require("express-handlebars");

app.engine("handlebars", exhbs({ defaultLayout: "main"}));
app.set("view engine", "handlebars");

// Connect to the Mongo DB
mongoose.connect("mongodb://localhost/articles", { useNewUrlParser: true });

//render index.html handlebars page
app.get("/",function(req,res){
    res.redirect("/scrape");
})
 

app.get("/scrape", (req, res) => {
//make the request with axios
    axios.get("https://www.theverge.com/tech/").then(response => {
     
        //setting up cheerio
        const $ = cheerio.load(response.data);

        //array of results
        let results = [];

    //using cheerio to get parse the results
    //looking for articles
    $("h2.c-entry-box--compact__title").each((i, element) => {
        let title = $(element).text();
        let link = $(element).children("a").attr("href");
            results.push({
                title: title,
                link: link
            })
        })

        db.Article.create(results)
            .then(dbArticle => {
            console.log(dbArticle);
            })
            .catch(err => {
                console.log(err);
            })

        res.send(results);
       
    })
    res.redirect("/articles");
});   

app.get("/articles", (req, res) => {
    db.Article.find()
        .then(dbArticle => {
        let hbsobj ={articles:dbArticle}
          res.render('index',hbsobj)
        })
        .catch(err => {
            res.json(err);
        })
})

app.get("/articles:id", (req, res) => {
    console.log('THIS ROUTE WAS HIT')
    console.log('REQ PARAMS ', req.params.id)
    db.Article.find()
        .then(dbArticle => {
        let hbsobj ={articles:dbArticle}
          res.render('index',hbsobj)
        })
        .catch(err => {
            res.json(err);
        })
})


//start server
app.listen(PORT, () => {
    console.log("server listening on " + PORT);
})