//Живой поиск  change keyup input click

var requestObject={};

$(function () {

    $("#livesearch_form").on('input change','input,select',function () {

        var $form=$(this.form);
        if (requestObject.abort) {
            requestObject.abort();
        }

        if ($form.find('#livesearch_input').val().length > 2) {
            var form_data = $(this.form).serialize() ;

            requestObject=$.ajax({
                type: "post",
                url: "?livesearch&ajax&json",
                data: form_data,
                response: "json",
                success: function (response) {
                    var json;
                    if (typeof(response) === 'object') {
                         json = response;
                    } else {
                        try {
                             json = JSON.parse(response);
                        } catch (e) {
                            console.log('Response type error');
                             return;
                        }
                    }
                    $("#livesearch_result").html(json.html); //Выводим полученые данные в списке
                }
            });

        } else {
            $("#livesearch_result").html('');// опустошаем результаты
        }
    });
    // NOT AJAX
    $(document).mouseup(function (e) {
        var container = $("#livesearch_wrapper");
        // console.log($(e.target).parents('#ui-datepicker-div').length);
        if (container.has(e.target).length === 0) {
            if ($(e.target).parents('#ui-datepicker-div').length==0) {
                // console.log('teeest')
                $('#livesearch_wrapper').removeClass('show_results');
                $('#ui-datepicker-div').css('display', 'none');

            }
        } else {
            // console.log(container.has(e.target).find('#livesearch_input').val())
            if (container.has(e.target).find('#livesearch_input').val()!='') {
                $('#livesearch_wrapper').addClass('show_results');
            }
        }
    });
    document.body.onkeyup=closeLiveSearch;
    function closeLiveSearch(e) {
        e=e||window.event;
        // if (e.keyCode==8&&$('#livesearch_input').val().length==1) {
        //     $('#livesearch_wrapper').removeClass('show_results');
        // }
        if ($('#livesearch_input').val().length>2)
            $('#livesearch_wrapper').addClass('show_results');
        if (e.keyCode==27&&$('#livesearch_wrapper').hasClass('show_results')) {
            $('#livesearch_wrapper').removeClass('show_results');
        }
    }
    // document.getElementById('livesearch_input').oninput=(function(e){
    //     if ($('#livesearch_input').val().length==0) {
    //         $('#livesearch_wrapper').removeClass('show_results');
    //     }
    // })
    $('#closeSearch').click(function () {
        $('#livesearch_wrapper').removeClass('show_results');
        $('#ui-datepicker-div').css('display', 'none');
    })

});