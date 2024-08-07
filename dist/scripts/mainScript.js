"use strict";
$(document).ready(function () {

    var elemNav = $('#top_nav');
    // var elemSearch = $('#sticky_livesearch');
    var elemSearch = $('#livesearch_wrapper');
    var topNav = elemNav.offset().top;

    var hTopNav = elemNav.outerHeight();
    var hTopSearch = elemSearch.outerHeight();

    // try {
    //     var topSearch = elemSearch.offset().top;
    //     $(window).resize(function () {
    //         topNav = elemNav.offset().top;
    //         topSearch = elemSearch.offset().top;
    //         // hTopNav = elemNav.outerHeight();
    //         // hTopSearch = elemSearch.outerHeight();
    //         // // var topLength = $(document).scrollTop();
    //         // // console.log(topLength)
    //         stickyScroll(topNav, topSearch);
    //     });
    //     $(window).scroll(function (e) {
    //         stickyScroll(e, topNav, topSearch,);
    //     });
    //
    //
    // } catch (e) {
    //     console.log('no_sticky', e);
    // }

    $(".fancy").fancybox({
        openSpeed: 200,
        closeSpeed: 200,
        openEffect: 'elastic',
        closeEffect: 'elastic',
        prevEffect: 'none',
        nextEffect: 'none',
        padding: 0,
        helpers: {
            overlay: {
                locked: false
            }
        }
    });

    function stickyScroll(e, newTopNav, newTopSearch) {
        var top = $(e.target).scrollTop();
        var hTopNav = elemNav.outerHeight();
        var hTopSearch = elemSearch.outerHeight();
        // console.log('top '+ top);
        // console.log('topNav '+ topNav);
        // console.log('hTopNav '+ hTopNav);
        // console.log('topSearch '+ topSearch);
        // console.log('hTopSearch '+ hTopSearch);
        if (top > newTopNav) {
            elemNav.addClass('sticky_header');
            elemNav.parent().css('margin-top', hTopNav + 'px');
            if (top + hTopNav > newTopSearch) {
                elemSearch.addClass('sticky_header');
                elemSearch.css('top', hTopNav + 'px');
                elemSearch.parent().css('margin-top', hTopSearch + 'px');
                $("#backbutton").show(100);
                // console.log('test');

            } else {
                elemSearch.removeClass('sticky_header');
                elemSearch.css('top', '');
                elemSearch.parent().css('margin-top', '');
                $("#backbutton").hide(100);
            }
        } else {
            elemSearch.removeClass('sticky_header');
            elemSearch.css('top', '');
            elemSearch.parent().css('margin-top', '');
            elemNav.removeClass('sticky_header');
            elemNav.parent().css('margin-top', '');
            $("#backbutton").hide(100);
        }

    };
    $(document).on('click', '#backbutton', function () {
        $('html, body').animate({
            scrollTop: 0
        }, 'fast', function () {
            $('#backbutton').hide();
        });
        return false;
    });

    $('#showMenu').click(function () {
        $('#top_nav nav').addClass('show_nav_menu');
        $('body').css('overflow', 'hidden');
    })
    $('#hideMenu').click(function () {
        $('#top_nav nav').removeClass('show_nav_menu');
        $('body').css('overflow', 'visible');
    })
    $('#show_filter').click(function () {
        $('#filters').addClass('show_filter');
        $('body').css('overflow', 'hidden');
    })
    $('#hide_filter').click(function () {
        $('#filters').animate({
            left: '-100%',
            right: '100%'
        }, 400, function () {
            $('#filters').removeClass('show_filter');
            $('#filters').css('left', '');
            $('#filters').css('right', '');
        })
        // $('#filters').removeClass('show_filter');
        $('body').css('overflow', 'visible');
    })
    $('#show_map').click(function () {
        $('#map_box').addClass('show_map');
        $('body').css('overflow', 'hidden');
    })
    $('#hide_map').click(function () {
        var left = '-100%';
        var right = '100%';
        console.log($("#hide_map").hasClass('right_show_map'));
        if ($("#map_box").hasClass('right_show_map')) {
            left = '100%';
            right = '-100%';
        }
        $('#map_box').animate({
            left: left,
            right: right
        }, 400, function () {
            $('#map_box').removeClass('show_map');
            $('#map_box').css('left', '');
            $('#map_box').css('right', '');
        })
        // $('#map_box').removeClass('show_map');
        $('body').css('overflow', 'visible');
    })
    $(document).on('click', '#hide_filter_block', function () {
        $('#filters').removeClass('show_filter');
        $('body').css('overflow', 'visible');
    })
    $(document).on('click', '.hide_menu_filter h3', function () {
        if (window.innerWidth > 1000) {
            if ($(this).parent().find('.filter').css('display') === 'none') {
                $(this).parent().find('.filter').css('display', 'block');
                $(this).addClass('transform');
            } else {
                $(this).parent().find('.filter').css('display', 'none');
                $(this).addClass('transform_back');
                $(this).animate({
                    opacity: 1
                }, 300, function () {
                    $(this).removeClass('transform');
                    $(this).removeClass('transform_back');
                })
            }
        }
    })
    // $(document).on('mouseleave', '.hide_menu_filter .filter', function(e){
    //     $(this).parent().find('.filter').hide();
    //     $(this).parent().find('h3').removeClass('transform');
    // })
    $(document).on('mouseleave', '.hide_menu_filter', function (e) {
        if ((window.innerWidth > 1000) && ($(this).find('.filter').css('display') == 'block')) {
            $(this).find('.filter').hide();
            $(this).find('h3').removeClass('transform');
            // $(this).find('h3').addClass('transform_back');
            // $(this).find('h3').animate({
            //     opacity: 1
            // }, 300, function(){
            //     console.log($(this).find('h3'))
            //     $(this).find('h3').removeClass('transform');
            //     $(this).find('h3').removeClass('transform_back');
            // })
        }
    })
});

String.prototype.getReplace = function (replaceMass) {
    var replacedStr = this;
    for (var key in replaceMass) {
        // replacedStr = replacedStr.replace(key, replaceMass[key] ||'');
        replacedStr = replacedStr.split(key).join(replaceMass[key] || '');
        // while(~replacedStr.indexOf(key)){
        //     replacedStr = replacedStr.replace(key, replaceMass[key] ||'');
        // }
    }
    return replacedStr;
};


$(function () {
    /**
     * Ловим все якоря и плавно крутим
     */
    $(document).on('click', 'a', function (evt) {
        if (!$(this).attr('href') || !$(this).attr('href').match(/^#.+$/)) {
            console.log('not ankor');
            return;
        }

        evt.preventDefault();
        var offset = Math.round(document.documentElement.clientHeight / 8);
        // if ($("[name="+$(this).attr('href').replace(/^#(.+)$/,'$1')+"]#").offset()) {
        var ankor = $(this).attr('href').replace(/^#(.+)$/, '$1');
        var $elemScrollTo = $("[name=" + ankor + "],#" + ankor);
        if ($elemScrollTo.length === 0) {
            console.log('ankor for #' + ankor + ' not found!')
        } else {
            history.pushState('', '', '#' + ankor);
            $('html, body').animate({
                scrollTop: $elemScrollTo.offset().top - offset
            }, 500);
        }
        return false;
    });

    /**
     * показ всплывашки с инфо о корпоративной экскурсии
     */
    $(document).on('click', '[data-show-korp-modal]', function (evt) {
        evt.preventDefault();
        var dataJson = JSON.parse($(this).attr('data-show-korp-modal'));
        var strData = Object.keys(dataJson).map(function (key) {
            return key + '=' + encodeURI(dataJson[key]);
        }).join('&');
        console.log(strData);
        showModalBlock('<img src="https://ekskursii.by/images/icons/load.gif" style="display: block; margin:auto;"/>');
        $.ajax({
            type: 'get',
            dataType: 'json',
            url: '?modal=korpCost&ajax&json&' + strData,
            success: function (jsonResult) {
                if (jsonResult.success) {
                    showModalBlock(jsonResult.success, {wrapClassAdd: 'wider'});
                } else if (jsonResult.error) {
                    hideModalBlock();
                    showMessage(jsonResult.error, '', 'error');
                } else {
                    hideModalBlock();
                    showMessage('<h3>Ошибка получения данных, проверьте соединение с интернетом</h3>');
                }
            },
            error: function () {
                hideModalBlock();
                showMessage('<h3>Ошибка получения данных, проверьте соединение с интернетом</h3>');
            }
        })
    });


    /**
     * Показ/сокрытие описания по атрибутам
     */
    $(document).on('click', '[data-show-desc]', function () {
        $('[data-desc=' + $(this).attr('data-show-desc') + ']').slideToggle();
    });

    /**
     * При нажатии на цену добавляем якорь расписанеи экскрусии с ценами
     */
    $(document).on('click', 'a .cost_tour', function (evt) {
        var href = $(this).closest('a').attr('href');
        if (!href || ~href.indexOf('#')) {
            return true;
        }
        evt.preventDefault();
        document.location.href = href + '#grafik';
    });

    /**
     * Обравботка клков по кнопке бронировать для амплитуды
     */
    $(document).on('click', '[data-lt]', function (evt) {
        var lt = $(this).data('lt');
        $.get('/history.php?btn=' + encodeURIComponent(lt))
            .done(function (res) {
                console.log('btn clicked:' + lt,res);
            })
            .fail(function () {
                console.log('! btn click error:' + lt);
            })

    });

});

function getTrans(transId) {
    if (TRANS && TRANS[transId]) {
        return TRANS[transId];
    } else {
        return transId;
    }
}

