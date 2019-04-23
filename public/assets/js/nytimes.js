//get articles as a json
$.getJSON("/articles", data => {
   console.log('RUNNING')
    for (let i = 0; i < data.length; i++) {
        console.log('DATA ID ', data[i]._id)
    $("#articles").append("<p '" + data[i]._id + "'>" + data[i].title) + 
            "<br / >" + data[i].link + "</p>"
    }
    console.log(data[i].title);
})

//click on note button
$(document).click(".btn btn-dark", () => {
        $("#notes").empty();
        //const title = data[i].title;
        const thisId = $('.noteButton').attr('id')
        console.log('CLICKED ', thisId)


    $.ajax({
        method: "GET",
        url: "/articles" + thisId
       
    })

    .then(data => {

        //adding stuff to add notes
        $("#notes").append("<h2>" + data.title + "</h2");
        $("notes").append("<input id = 'titleinput' name = 'title'>");
        $("notes").append("textarea id = 'bodyinput' name = 'body'></textarea>");
        $("notes").append("<button data-id = '" + data._id + " 'id = 'savenote'>SaveNote</button>");
        console.log("notes section")

        //if there is a note
        if (data.note) {
            $("#titleinput").val(data.note.title);
            $("#bodyinput").val(data.note.body);
        }
    });
});
