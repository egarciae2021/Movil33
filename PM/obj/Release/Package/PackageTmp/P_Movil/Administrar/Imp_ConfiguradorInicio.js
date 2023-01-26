
$(function () {
    $("#imgFondo").css({ 'opacity': 0.1 });

});

$(document).bind("contextmenu", function (e) {
    return false;
});

document.onkeydown = function (event) {
    event = (event || window.event);
    if (event.keyCode == 123) {
        return false;
    }
};