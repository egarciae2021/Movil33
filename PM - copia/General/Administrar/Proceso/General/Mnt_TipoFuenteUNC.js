
$(function () {

    $("#txtNombreFuente").keypress(ValidarAlfaNumericoConEspacios);
    //    $("#txtservidor").keypress(ValidarAlfaNumericoConEspacios);
    //$("#txtruta").keypress(ValidarAlfaNumericoConEspacios);
    //    $("#txtusuario").keypress(ValidarAlfaNumericoConEspacios);
    //    $("#txtpassword").keypress(ValidarAlfaNumericoConEspacios);
    IniciarPagina();
    $(".btnNormal").button();

    var indiceTab = window.parent.tab.tabs("option", "selected");

    function IniciarPagina() {

        if ($("#hdfEstado").val() == '1') {
            $("#hdfEstado").val("1");
            $("#trEstado").hide();
            $("#tdEstado").hide();
        }
        else {
            $("#trEstado").show();
            $("#tdEstado").show();
        }
    }

    function BloquearPagina(bloqueado) {
        $(".btnNormal").button("option", "disabled", bloqueado);

        if (bloqueado) {
            $("input").attr("disabled", "disabled");
            $("select").attr("disabled", "disabled");
        }
        else {
            $("input").removeAttr("disabled");
            $("select").removeAttr("disabled");
        }
    }

    $("#chActivo").bind('change', function () {
        if ($(this).is(":checked")) {
            $("#hdfEstado").val("1");
        }
        else {
            $("#hdfEstado").val("0");
        }
    });

    function CerroMensaje() {
        BloquearPagina(false);
        if ($("#hdfCodigo").val() == "") {
            $("#txtNombreFuente").val("");
            $("#txtservidor").val("");
            $("#txtruta").val("");
            $("#txtusuario").val("");
            $("#txtpassword").val("");
            $("#hdfEstado").val("1");
        }
        else {
            window.parent.tab.tabs("remove", indiceTab);
        }
    }

    $("#btnCerrar").live("click", function () {
        window.parent.tab.tabs("remove", window.parent.tab.tabs("option", "selected"));
    });

    $("#btnGuardar").live("click", function () {

        var Codigo = $("#hdfCodigo").val();
        var Nombre = $("#txtNombreFuente").val().replace(/'/g, "&#39").replace(/\\/g, "\\\\");
        var serv = $("#txtservidor").val().replace(/'/g, "&#39").replace(/\\/g, "\\\\");
        var ruta = $("#txtruta").val().replace(/'/g, "&#39").replace(/\\/g, "\\\\");
        var usuario = $("#txtusuario").val().replace(/'/g, "&#39").replace(/\\/g, "\\\\");
        var password = $("#txtpassword").val().replace(/'/g, "&#39").replace(/\\/g, "\\\\");



        if ($.trim(Nombre) == "") {
            alerta("El nombre del Tipo de Fuente UNC es un campo obligatorio");
            $("#txtNombreFuente").focus();
            return;
        }
//        if ($.trim(serv) == "") {
//            alerta("El servidor del Tipo de Fuente UNC es un campo obligatorio");
//            $("#txtservidor").focus();
//            return;
//        }
        if ($.trim(ruta) == "") {
            alerta("La ruta del Tipo de Fuente UNC es un campo obligatorio");
            $("#txtruta").focus();
            return;
        }

        $("#dvCargando").show();

        $.ajax({
            type: "POST",
            url: "Mnt_TipoFuenteUNC.aspx/Guardar",
            data: "{'pCod': '" + Codigo + "'," +
                    "'pNom': '" + Nombre + "'," +
                    "'pServ': '" + serv + "'," +
                    "'pRuta': '" + ruta + "'," +
                    "'pUsuario': '" + usuario + "'," +
                    "'pPassword': '" + password + "'," +
                    "'btVig': '" + parseInt($("#hdfEstado").val()) + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (msg) {
                $("#dvCargando").hide();
                if (msg.d == "1" || msg.d == "0") {
                    window.parent.ActualizarGrilla();
                    Mensaje("<br/><h1>Tipo Fuente UNC guardada</h1><br/>", document, CerroMensaje);
                }
                else {
                    if (msg.d == "2") {
                        alerta("El nombre del Tipo de Fuente UNC ya esta siendo usado, no se pudo grabar el registro");
                        BloquearPagina(false);
                    }
                }
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            }
        });
    });

});