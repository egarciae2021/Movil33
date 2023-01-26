! function (t) {
    var o;
    t.fn.printPreview = function (e) {
        var i = this,
            r = t.extend({
                obj2print: "body",
                style: "",
                width: "800",
                height: screen.height - 105,
                top: 0,
                left: "center",
                resizable: "yes",
                scrollbars: "yes",
                status: "no",
                title: "Vista previa",
                print: true
            }, e);
        return "center" == r.left && (r.left = screen.width / 2 - r.width / 2), i.bind("click.printPreview", function () {
            $(".seccion-ac").hide();
            if (o == undefined || o.closed) {
                var e = i[0].outerHTML,
                    n = "";
                n = t("head").html() + (r.print ? '<script>setTimeout(function(){ window.print(); }, 500);</script>' : '');
                var l = "" + n + r.style + "";
                l += t(r.obj2print)[0].outerHTML.replace(e, "") + "";                
                o = window.open("", "vistapreviea", "width=" + r.width + ",top=" + r.top + ",height=" + r.height + ",left=" + r.left + ",resizable=" + r.resizable + ",scrollbars=" + r.scrollbars + ",status=" + r.status + ",location=no,toolbar=no,menubar=no", false);
                o.document.write(l), o.document.title = r.title;
            } else {
                o.focus();
            }
        });
    }
}(jQuery);