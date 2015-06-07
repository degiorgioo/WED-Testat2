(function($){

    $(document).ready(function(){
        var linkText = $("#linkText");
        var linkTitel = $("#linkTitel");
        var template = Handlebars.compile($("#templateContainer").html());

        //set intervall for update all link entries
        setInterval(updateLinks, 30000);

        $("#sendLogOut").on("click", function(req, res){
            console.log("logout");
            $.ajax({
                method:"GET",
                url: "/logout"
            });
        });

        $(".allEntries").on("click", '.rankingButtonUp', function(e){
            $.ajax({
                method: "POST",
                url: "/links/" + e.target.name + "/up",
                success: updateLinks
            });
        });

        $(".allEntries").on("click",'.rankingButtonDown' ,function(e){
            $.ajax({
                method: "POST",
                url: "/links/" + e.target.name + "/down",
                success: updateLinks
            });
        });

        $(".allEntries").on("click", ".deleteButton" ,function(e){
            $.ajax({
                method: "POST",
                url: "/delete/" + e.target.name,
                success: updateLinks
            });
        });

        function updateLinks() {
            $.ajax({
                method: "GET",
                url: "/",
                contentType: 'application/json'
            }).done(function (allJSONEntries) { //allJSONEntries kommt von links.get -> in links Route
                $('.allEntries').html(template({links: JSON.parse(allJSONEntries)}));
               linkText.val("");
               linkTitel.val("");
            });
        }

        $('#inputForm').submit(function(e){
            e.preventDefault();
               $.ajax({
                        method:"POST",
                        url:"/",
                        contentType: 'application/json',
                        data: JSON.stringify({
                            url: linkText.val(),
                            titel: linkTitel.val()
                        }),
                        success: updateLinks
                    });
        });

    });
})(jQuery);