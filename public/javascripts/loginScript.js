(function($){

    $(document).ready(function(){
       console.log("document loaded");

        $('#submitCreds').on("click", function(){
            var username, passwort;

            username = $('#username').val();
            passwort = $('#password').val();

            $.ajax({
                method: "POST",
                url: "/login",
                contentType: 'application/json',
                data: JSON.stringify({
                    username: username,
                    password: passwort
                })
            })
        });
    });
})(jQuery);