$(function () {
    inicioPagina();
});

var hdfMostrarChatTawkTo = $("#hdfMostrarChatTawkTo").val();
if (hdfMostrarChatTawkTo == "1") {
    var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
    (function () {
        var s1 = document.createElement("script"), s0 = document.getElementsByTagName("script")[0];
        s1.async = true;
        s1.src = 'https://embed.tawk.to/60ff5415649e0a0a5cce0fb4/1fbim0t26';
        s1.charset = 'UTF-8';
        s1.setAttribute('crossorigin', '*');
        s0.parentNode.insertBefore(s1, s0);
    })();
}

//console.log(SimbNoPermitidos);
//console.log($("#hdfSimbNoPermitidosClaveUsu").val());

function inicioPagina() {
    if ($('#hdfMensaje').val() != '') {
        alertaURL($('#hdfMensaje').val(), null, null, null, 7000, "Login.aspx");
    }
    if ($('#hdfError').val() != '') {
        alertaURL($('#hdfError').val(), null, null, null, 7000, "Login.aspx");
    }
}

function alertaURLVersion31(contenido, Titulo, fnRuta) {
    $("#dvContenidoAlerta").html("");
    $("#dvContenidoAlerta").html(contenido);

    if (Titulo == null || Titulo == undefined)
        Titulo = "Mensaje del sistema";

    $("input,select,div,button,textarea").bind("focus", function () {
        idFocus = $(this).attr("id");
        //$(this).unbind("focus");
    });

    $("#dvContenidoAlerta").css("z-index", "100000000");
    $('#dvMsgAlerta').css("z-index", "100000000");
    $('#dvMsgAlerta').dialog({
        title: Titulo,
        modal: true,
        buttons: {
            "Aceptar": function () {
                $(this).dialog("close");
                if (fnRuta != null && fnRuta != undefined)
                    window.location = fnRuta;
            }
        },
        position: { my: "center", at: "center", of: window },
        open: function (event, ui) {
            $('#dvContenidoAlerta').focus();
        }
    });
    setTimeout(function () { window.location = fnRuta; }, 8000);
}

function alertaURL(contenido, Titulo, fnCerrar, tipo, tiempoEspera, fnRuta) {
    try {
        var _tipo = tipo || "success";

        if (contenido.toLowerCase().indexOf("proveedor ") >= 0 ||
            contenido.toLowerCase().indexOf("licencias ") >= 0) {
            _tipo = "warning";
        }

        var _timer = 0;
        if (typeof fnCerrar != 'undefined' && fnCerrar != null) {
            _timer = 0;
        }
        else {
            _timer = 3500;
        }
        if (_tipo == "warning") {
            _timer = 3500;
        }

        if (typeof tiempoEspera != 'undefined' && tiempoEspera != null) {
            _timer = tiempoEspera;
        }

        if (Titulo == null) {
            Titulo = "Mensaje";
        }


        window.top.$.niftyNoty({
            type: _tipo,
            container: "floating",
            title: Titulo,
            message: contenido,
            closeBtn: true,
            focus: true,
            //timer: ((_tipo == 'danger' || (typeof fnCerrar != 'undefined' && fnCerrar != null)) ? 0 : 2500),
            timer: _timer,
            onHide: function () {
                try {
                    fnCerrar();
                } catch (e) {
                }
            }
        });
        setTimeout(function () { window.location = fnRuta; }, 8000);

    } catch (e) {
        alertaURLVersion31(contenido, Titulo, fnRuta);
    }
}