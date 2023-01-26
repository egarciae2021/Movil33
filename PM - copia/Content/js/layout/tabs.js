
$(document).ready(function () {

    $(".nav-tabs").on("click", "a", function (e) {
        e.preventDefault();
        if (!$(this).hasClass('add-contact')) {
            $(this).tab('show');
        }
    })
        .on("click", "span", function () {
            var anchor = $(this).siblings('a');
            $(anchor.attr('href')).remove();
            $(this).parent().remove();
            $(".nav-tabs li").children('a').first().click();
        });

    $('.add-contact').click(function (e) {
        e.preventDefault();
        var id = $(".nav-tabs").children().length;
        var tabId = 'tab_' + id;
        $(this).closest('li').before('<li><a href="#tab_' + id + '">Algún módulo </a> <span> x </span></li>');
        $('.tab-content').append('<div class="tab-pane" id="' + tabId + '">Tab: Nuevo tab' + id + '</div>');
        $('.nav-tabs li:nth-child(' + id + ') a').click();
    });

});

