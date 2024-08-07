//обработчик кнопки закрытия окна
$(function () {
    $(document).on('click', '[data-hide-button]', function () {
        $('[data-hide=' + $(this).attr('data-hide-button') + ']').hide();
    });
});

/**
 * показ окна с кнопкой закрыть сверху
 * @param content контент для отображения
 */
function showModalBlock(content, options) {
    options = options || {};
    if ($('#modal_container .text_message').length == 0) {
        $('body').append(
            '<div id="modal_container" class="valid_info_message" style="display: none;" data-hide="modal_container" hidden>\n' +
            '    <div class="wrap_info_message">\n' +
            '        <button type="button" class="simple_button close_mess" data-hide-button="modal_container"></button>\n' +
            '        <div></div>\n' +
            '        <div class="text_message" style="max-height: 80vh;overflow:auto;"></div>\n' +
            '    </div>\n' +
            '</div>'
        );
        console.log('write:modal_container');
    }
    if (content == '') {
        console.log('#err: try to open empty modal');
    }
    var $container = $('#modal_container');
    $container.find('.text_message').html(content);

    $container.fadeIn('fast');
    if ($('#mtext_origin'))
        $container.find('#mtext_origin').focus();

    var contain = document.getElementById('modal_container');
    if(options.wrapClassAdd){
        $(contain).addClass(options.wrapClassAdd);
    }
    contain.onclick = function (e) {
        e = e || window.event;
        var clickElem = e.target;
        if (clickElem == e.currentTarget) {
            $container.fadeOut('fast');
            actionOnCloseModal();
        }
    };
    $(contain).find('[data-hide-button="modal_container"]').click(function(){
        actionOnCloseModal();
    });

    document.body.onkeydown = closeForm;

    function closeForm(e) {
        e = e || window.event;
        if (e.keyCode == 27) {
            $container.fadeOut('fast');
            actionOnCloseModal();
        }
    }

    function actionOnCloseModal()
    {
        if(options.wrapClassAdd){
            $(contain).removeClass(options.wrapClassAdd);
        }
        if(options.remove){
            hideModalBlock();
        }
    }
}
// сокрытие модального окна с кнопкой закрыть
function hideModalBlock() {
    $('#modal_container').remove();
}

/**
 * показ сообщения пользователю в модальном окне с кнопкой "ОК"
 * @param text текст сообщения
 * @param callback функция, вызванная после закрытия окна
 * @param status тип соообщения (success,error)
 */
function showMessage(text, callback, status) {
    if ($('#message_text').length == 0) {
        $('body').append(
            '<div id="close_block" class="valid_info_message" style="display: none;" hidden>\n' +
            '    <div class="wrap_info_message">\n' +
            '        <p id="message_text" class="text_message"></p>\n' +
            '        <button type="button" id="close_button" class="simple_button grad_blue">OK</button>\n' +
            '    </div>\n' +
            '</div>'
        );
        console.log('write:message_text');
    }


    var textElem = document.getElementById('message_text');
    $(textElem).html(text);
    var closeElem = document.getElementById('close_block');
    closeElem.style.display = '';
    document.getElementById('close_button').onclick = closeBlock;
    document.body.onkeydown = closeForm;
    if (status === "error") {
        textElem.classList.add("error")
    }
    if (status === "success") {
        textElem.classList.add("success")
    }
    closeElem.onclick = function (e) {
        e = e || window.event;
        var clickElem = e.target;
        if (clickElem == e.currentTarget)
            closeBlock(e);
    };

    function closeForm(e) {
        e = e || window.event;
        if (e.keyCode == 27) {
            closeBlock();
        }
    }

    function closeBlock(e) {
        document.getElementById('close_block').style.display = 'none';
        textElem.className = 'message_text';
        if (callback) {
            callback();
        }
    }
}


/**
 * Пилим свой confirm с блэкжеком и )) закрывается только крестиком (если не выставлено allowCloseOnClickBeside===true)
 * @param text - html модалки
 * @param onConfirm - действие при нажатии  "согласиться"
 * @param onDecline - действие при нажатии  "отклонить"
 * @param confirmBtnText - текст кнопки "согласиться" - по умолчанию 'Ок'
 * @param declineBtnText - текст кнопки "отклонить" - по умолчанию 'Отмена'
 * @param allowCloseOnClickBeside - по умолчанию false, управляет разрешением закрыть кликом по пустоте вокруг всплывашки
 */
function showModalConfirm(text,onConfirm,onDecline,confirmBtnText,declineBtnText,allowCloseOnClickBeside)
{
    confirmBtnText=confirmBtnText || '{3749}';
    declineBtnText=declineBtnText || '{3750}';
    if ($('#message_text_confirm').length == 0) {
        $('body').append(
            '<div id="close_block_confirm" class="valid_info_message" style="display: none;" data-hide="modal_container_confirm" hidden>\n' +
            '    <div class="wrap_info_message">\n' +
            '        <button type="button" class="simple_button close_mess" data-hide-button="modal_container_confirm"></button>\n' +
            '        <p id="message_text_confirm" class="text_message"></p>\n' +
            '        <button type="button" id="confirm_button" class="simple_button grad_green">'+confirmBtnText+'</button>\n' +
            '        <button type="button" id="decline_button" class="simple_button grad_red">'+declineBtnText+'</button>\n' +
            '    </div>\n' +
            '</div>'
        );
        console.log('write:message_text_confirm');
    }


    var textElem = document.getElementById('message_text_confirm');
    $(textElem).html(text);
    var closeElem = document.getElementById('close_block_confirm');
    closeElem.style.display = '';
    document.getElementById('confirm_button').onclick = function(){closeBlock(onConfirm);};
    document.getElementById('decline_button').onclick =  function(){closeBlock(onDecline);};

    if(allowCloseOnClickBeside) {
        closeElem.onclick = function (e) {
            e = e || window.event;
            var clickElem = e.target;
            if (clickElem == e.currentTarget)
                closeBlock(e);
        };
    }

    function closeForm(e) {
        e = e || window.event;
        if (e.keyCode == 27) {
            closeBlock();
        }
    }

    function closeBlock(callback) {
        document.getElementById('close_block_confirm').style.display = 'none';
        textElem.className = 'message_text';
        if (callback) {
            callback();
        }
    }
}


/**
 * Управление блоком загрузки
 * @type {{$loadDiv: (Window.jQuery.fn.init|jQuery|HTMLElement), reasons: Array, show: LOAD.show, hide: LOAD.hide}}
 */
var LOAD = {
    /**
     * коллекция jquery c gif загрузки
     */
    $loadDiv: $('#core_load_div'),
    /**
     * Причины, по которым показываем блок загрузки
     */
    reasons: [],
    /**
     * Показать гифку загрузки
     * @param reason  строка   - идентификатор причины показа загрузки
     */
    show: function (reason) {
        LOAD.$loadDiv=$('#core_load_div');
        if(LOAD.$loadDiv.length===0){
            $('body').append('<div class="core_load_gif" id="core_load_div"></div>');
            console.log('write:load_div');
        }
        LOAD.$loadDiv=$('#core_load_div');
        LOAD.reasons.push(reason);
        LOAD.$loadDiv.show();
    },
    /**
     * Скрыть гифку загрузки
     * @param reason - идентификатор причины показа загрузки
     */
    hide: function (reason) {
        if (~LOAD.reasons.indexOf(reason)) {
            LOAD.reasons.splice(LOAD.reasons.indexOf(reason));
        }
        if (LOAD.reasons.length === 0) {
            LOAD.$loadDiv.hide();
        }
    },
    /**
     * Проверка, показан ли блок загрузки по какой-либо причине
     * @param reason - идентификатор причины показа загрузки
     * @return {boolean}
     */
    checkShow: function (reason) {
        return !!~LOAD.reasons.indexOf(reason);

    }
};