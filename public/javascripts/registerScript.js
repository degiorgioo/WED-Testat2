(function($){
    $(document).ready(function(){
        $("#submitRegInfo").on("click", function(e){
            var username = $("#username").val(),
                password = $("#password").val();

            $.ajax({
                method: "POST",
                url: "/reg",
                contentType: 'application/json',
                data: JSON.stringify({
                    user: username,
                    pass: password
                    }),
                success: alert("Sie wurden erfolgreich registriert.")
                })
            })
        })
})(jQuery);