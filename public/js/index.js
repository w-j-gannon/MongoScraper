

// side nav
$(document).ready(function(){
    $('.sidenav').sidenav();
});

//Scrape articles
$(".scrape").on("click", () => {
    $.ajax("/api/scrape", {
        type: "GET"
    }).then(articles => {
        location.reload();
    });
});

