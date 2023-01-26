$(function () {

    //window.parent.$("#DivLicencia").find(".lblMenu").css({ color: "#424242" });
    window.parent.$("#DivLicencia").find(".lblMenu").css({ "text-decoration": "underline" });
    window.parent.$("#edit4").css({ "display": "" });

    //*****************Cargando Datos************
    $("#Tipolicencia").val(window.parent.codtipoli);

    if (window.parent.nombredom == "") {
        $("#nombredominio").val(window.parent.nombreempresa);
    }
    else {
        $("#nombredominio").val(window.parent.nombredom);
    }
    $("#nombreservapp").val(window.parent.codservapp);
    $("#nombreservbd").val(window.parent.codservbd);
    //*************************************************

    $("#btnatras").click(function () {

        window.parent.$("#DivLicencia").find(".lblMenu").css({ "text-decoration": "none" });
        window.parent.$("#edit4").css({ "display": "none" });
        var $Pagina = 'AsistenteSelectBD.aspx';
        window.parent.$("#ifTemaAsistente").attr("src", $Pagina);
    });

    $("#btnsiguiente").click(function () {

        if ($("#nombredominio").val() == "") {
            alertaExterna("Ingrese un nombre de dominio");
            $("#nombredominio").focus();
            return;
        }

        window.parent.codtipoli = $("#Tipolicencia").val();
        window.parent.nombredom = $("#nombredominio").val();
        window.parent.codservapp = $("#nombreservapp").val();
        window.parent.codservbd = $("#nombreservbd").val();


        window.parent.tipoli = $($("#Tipolicencia option:selected")[0]).text();
        window.parent.servapp = $($("#nombreservapp option:selected")[0]).text();
        window.parent.servbd = $($("#nombreservbd option:selected")[0]).text();

        window.parent.$("#DivLicencia").find(".lblMenu").css({ "text-decoration": "none" });
        window.parent.$("#edit4").css({ "display": "none" });
        var $Pagina = 'Asistente5.aspx';
        window.parent.$("#ifTemaAsistente").attr("src", $Pagina);
    });

    $("#btcancelar").click(function () {
        CancelarAsistente();
    });
});