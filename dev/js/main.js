;
$(window).load(function () {
//start выравнивание элеменов по горизонтальной сетки
    $("img").keepTheRhythm({
        baseLine: 17
    });
    $("#tags_tagsinput").keepTheRhythm({
        baseLine: 17
    });

    $("#mainForm").keepTheRhythm({
        baseLine: 17
    });
//end выравнивание элеменов по горизонтальной сетки

//start разварачивающие чекбоксы региона
    $('.childrenCategories').each(function(i) { // Check each submenu:
        $(this).prev().addClass('collapsible').click(function() { // Attach an event listener
            if ($(this).next().css('display') == 'none') {
                $(this).next().slideDown(200, function () { // Show submenu:
                    $(this).prev().removeClass('collapsed').addClass('expanded');
                });
            }else {
                $(this).next().slideUp(200, function () { // Hide submenu:
                    $(this).prev().removeClass('expanded').addClass('collapsed');
                    $(this).find('ul').each(function() {
                        $(this).hide().prev().removeClass('expanded').addClass('collapsed');
                    });
                });
            }
            return false; // Prohibit the browser to follow the link address
        });
    });
//end разварачивающие чекбоксы региона

//start выделение слов в блоке "тип"
    $('#tags').tagsInput({
        'height': '100%',
        'width': '',
        'defaultText': 'Тип',
        'placeholderColor' : '#000'
    });
//end выделение слов в блоке "тип"


//start показываем/скрываем поля
    $('#btRegion').bind('click', function() {
        $('.region').css('display', 'block');
        $('#btRegion').css('display', 'none');
    });

    $('.region .buttonDelete').bind('click', function() {
        $('.region').css('display', 'none');
        $('#btRegion').css('display', 'inline-block');
    });

    $('#btStatus').bind('click', function() {
        $('.status').css('display', 'block');
        $('#btStatus').css('display', 'none');
    });

    $('.status .buttonDelete').bind('click', function() {
        $('.status').css('display', 'none');
        $('#btStatus').css('display', 'inline-block');
    });


    $('#btType').bind('click', function() {
        $('.type').css('display', 'block');
        $('#btType').css('display', 'none');
    });

    $('.type .buttonDelete').bind('click', function() {
        $('.type').css('display', 'none');
        $('#btType').css('display', 'inline-block');
    });


    $('#btOption').bind('click', function() {
        $('.option').css('display', 'block');
        $('#btOption').css('display', 'none');
    });

    $('.option .buttonDelete').bind('click', function() {
        $('.option').css('display', 'none');
        $('#btOption').css('display', 'inline-block');
    });
//end показываем/скрываем поля


});