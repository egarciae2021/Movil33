$(function () {

    //window.parent.$("#DivContrato").find(".lblMenu").css({ color: "#424242" });
    window.parent.$("#DivContrato").find(".lblMenu").css({ "text-decoration": "underline" });
    window.parent.$("#edit2").css({ "display": "" });

    $("#fechai").val(window.parent.fechai);
    $("#fechaf").val(window.parent.fechaf);
    $("#txtobs").val(window.parent.obs);
    $("#txtdesc").val(window.parent.descrip);

    if (window.parent.IdContratoTerminos != "") {
        $("#ddlContrato").val(window.parent.IdContratoTerminos);
    }



    //------datepicker--------------------
    $(".txtFecha").datepicker({
        changeMonth: true,
        changeYear: true
    });
    //$(".txtFecha").keypress(ValidarFecha);

    $("#imgBorrarFechaInicio").click(function () {
        $("#txtfechaInicio").val("");
    });

    $("#imgBorrarFechaFin").click(function () {
        $("#txtfechaFin").val("");
    });

    //---------Fin datepicker---------------

    $("#btnatras").click(function () {

        window.parent.$("#DivContrato").find(".lblMenu").css({ "text-decoration": "none" });
        window.parent.$("#edit2").css({ "display": "none" });
        var $Pagina = 'Asistente1.aspx';
        window.parent.$("#ifTemaAsistente").attr("src", $Pagina);
    });
    $("#btnsiguiente").click(function () {

        if ($("#fechai").val() == "") {
            alertaExterna("Ingrese una fecha inicial");
            $("#fechai").focus();
            return;
        }
        if ($("#fechaf").val() == "") {
            alertaExterna("Ingrese una final");
            $("#fechaf").focus();
            return;
        }

        window.parent.fechai = $("#fechai").val();
        window.parent.fechaf = $("#fechaf").val();
        window.parent.obs = $("#txtobs").val();
        window.parent.descrip = $("#txtdesc").val();

        window.parent.IdContratoTerminos = $("#ddlContrato").val();
        window.parent.ContratoTermino = $($("#ddlContrato option:selected")[0]).text();

        window.parent.$("#DivContrato").find(".lblMenu").css({ "text-decoration": "none" });
        window.parent.$("#edit2").css({ "display": "none" });
        var $Pagina = 'AsistenteLicencia.aspx';
        window.parent.$("#ifTemaAsistente").attr("src", $Pagina);
    });

    $("#btcancelar").click(function () {
        CancelarAsistente();
    });
});