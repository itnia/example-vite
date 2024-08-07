
$(function () {

    $("#js_contact_submit").click(function () {

        $.ajax({

            type: "POST",
            url: "?contact&ajax" ,
            data: $('#js_contact_form').serialize() ,

            success: function (json) {

                json=JSON.parse(json);console.log(json);
                if(json['success']) {
                    $('#contact_div').slideToggle(500);
                    alert(json['success'])
                }else{
                    if(!json['error'])
                        json['error']='Что-то пошло не так';
                    alert(json['error'])
                }
            },

            error: function () {
                alert('some error is');
            }
        });
    });

});

