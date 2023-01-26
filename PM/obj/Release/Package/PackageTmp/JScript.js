//$(function () {
//    var status = 1;
//    var toggler = $("#tbPrincipal_SplitterJQ3_D_tS");
//    var Iconotoggler = $("#tbPrincipal_SplitterJQ3_D_iTS");
//    var lateral = $("#tbPrincipal_SplitterJQ3_I");
//    var content = $("#tbPrincipal_SplitterJQ3_D");
//    //alert('c');
//    var contentReal = $("#tbPrincipal_SplitterJQ3_D_cR");
//    var lateralWidth = lateral.width();
//    var windowHeight = 0;
//    var renderHeight = 0;
//    var togglerHeight = 0;
//    applyDimensions();
//    $(window).resize(function () {
//        applyDimensions(); 
//    });
//    toggler.click(clickToggler);
//    function applyDimensions() {
//        windowHeight = $(window).height();
//        windowWidth = $(window).width();
//        renderHeight = (windowHeight - 88) + "px";
//        togglerHeight = (windowHeight - 90) + "px";
//        var lw = $("#tbPrincipal_SplitterJQ3_I").width();
//        if (status == 1)
//            var contenidoRealWidth = (windowWidth - lw - 39 - 7) + "px";
//        else
//            var contenidoRealWidth = (windowWidth - 39 - 7) + "px";
//        var contenidoRealHeight;
//        var contenidoRealHeight = (windowHeight - 90 + 0) + "px";
//        var IconotogglerWidth = (togglerHeight.substring(0, togglerHeight.length - 2)) / 2 - 10;
//        lateral.css("height", renderHeight);
//        content.css("height", renderHeight);
//        contentReal.css({ height: contenidoRealHeight, width: contenidoRealWidth });
//        toggler.css("height", togglerHeight);
//        Iconotoggler.css("margin-top", IconotogglerWidth);
//        //Iconotoggler.attr("margin-top", togglerHeight);
//    }
//    function clickToggler() {
//        var wcR = contentReal.width();
//        if (status == 1) {
//            var wcontentReal = (wcR + lateralWidth) + 'px';
//            contentReal.css({ width: wcontentReal });
//            lateral.hide();
//            //content.css("margin-left", "0px");
//            //$("#TabDetalle").css("width", "0px");
//            Iconotoggler.removeClass("ui-icon ui-icon-triangle-1-w");
//            Iconotoggler.addClass("ui-icon ui-icon-triangle-1-e");
//            Iconotoggler.attr("margin-left", "-8px");
//            status = 0;
//            toggler.removeClass("ui-accordion-header ui-helper-reset ui-state-hover ui-corner-all");
//            toggler.addClass("ui-accordion-header ui-helper-reset ui-state-default ui-corner-all");
//        }
//        else {
//            var wcR = $("#tbPrincipal_SplitterJQ3_D_cR").width();
//            var wcontentReal = (wcR - lateralWidth) + 'px';
//            //alert(wcontentReal);
//            contentReal.css({ width: wcontentReal });
//            lateral.show();
//            //content.css("margin-left", lateralWidth);
//            //$("#TabDetalle").css("width", "0px");
//            Iconotoggler.removeClass("ui-icon ui-icon-triangle-1-w");
//            Iconotoggler.addClass("ui-icon ui-icon-triangle-1-w");
//            Iconotoggler.attr("margin-left", "-6px");
//            status = 1;
//            toggler.removeClass("ui-accordion-header ui-helper-reset ui-state-hover ui-corner-all");
//            toggler.addClass("ui-accordion-header ui-helper-reset ui-state-default ui-corner-all");
//        }
//    }
//    toggler.mousemove(function () {
//        toggler.removeClass("ui-accordion-header ui-helper-reset ui-state-default ui-corner-all");
//        toggler.addClass("ui-accordion-header ui-helper-reset ui-state-hover ui-corner-all");
//    });
//    toggler.mouseout(function () {
//        toggler.removeClass("ui-accordion-header ui-helper-reset ui-state-hover ui-corner-all");
//        toggler.addClass("ui-accordion-header ui-helper-reset ui-state-default ui-corner-all");
//    });
//});
// 