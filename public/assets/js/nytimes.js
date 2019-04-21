//get articles as a json
$.getJSON("/articles", data => {
    console.log(data)
    for (let i = 0; i < 11; i++) {
        //limit to 10 articles, hopefully to speed it up
    $("#articles").append("<p '" + data[i]._id + "'>" + data[i].title) + 
            "<br / >" + data[i].link + "</p>"
    }
})

//click on a p tag
$(document).click("P", function() {
    $("#notes").empty();
    const thisId = $(this).attr("data-id");
    
    $.ajax({
        method: "GET",
        url: "/articles" + thisId
    })
})