
$(function () {

    //    $("#txtNombreFuente").keypress(ValidarAlfaNumericoConEspacios);
    //    $("#txtServidor").keypress(ValidarAlfaNumericoConEspacios);
    //    $("#txtbasedatos").keypress(ValidarAlfaNumericoConEspacios);
    //    $("#txtTabla").keypress(ValidarAlfaNumericoConEspacios);
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
            $("#txtServidor").val("");
            $("#txtbasedatos").val("");
            $("#txtTabla").val("");
            $("#txtusuario").val("");
            $("#txtpassword").val("");
            $("#hdfEstado").val("1");
            $("#hdfConfigFuente").val("");
            $("#txtrutaerrores").val("");
            $("#txtrutalog").val("");
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
        var Nombre = $("#txtNombreFuente").val().replace(/'/g, "&#39").replace(/\\/g, "&#92");
        var serv = $("#txtServidor").val().replace(/'/g, "&#39").replace(/\\/g, "&#92");
        var bd = $("#txtbasedatos").val().replace(/'/g, "&#39").replace(/\\/g, "&#92");
        var tabla = $("#txtTabla").val().replace(/'/g, "&#39").replace(/\\/g, "&#92");
        var usuario = $("#txtusuario").val().replace(/'/g, "&#39").replace(/\\/g, "&#92");
        var password = $("#txtpassword").val().replace(/'/g, "&#39").replace(/\\/g, "&#92");
        var ConfigFuente = $("#hdfConfigFuente").val().replace(/'/g, "&#39").replace(/\\/g, "&#92");
        var RutaErrores = $("#txtrutaerrores").val().replace(/'/g, "&#39").replace(/\\/g, "&#92");
        var RutaLog = $("#txtrutalog").val().replace(/'/g, "&#39").replace(/\\/g, "&#92");

        if ($.trim(Nombre) == "") {
            alerta("El nombre de la Fuente Base de Datos es un campo obligatorio");
            $("#txtNombreFuente").focus();
            return;
        }
        if ($.trim(serv) == "") {
            alerta("El servidor de la Fuente Base de Datos es un campo obligatorio");
            $("#txtServidor").focus();
            return;
        }
        if ($.trim(bd) == "") {
            alerta("La base de datos de la Fuente Base de Datos es un campo obligatorio");
            $("#txtbasedatos").focus();
            return;
        }
//        if ($.trim(tabla) == "") {
//            alerta("La tabla de la Fuente Base de Datos es un campo obligatorio");
//            $("#txtTabla").focus();
//            return;
//        }
        if ($.trim(RutaErrores) == "") {
            alerta("La ruta de errores de la Fuente Base de Datos es un campo obligatorio");
            $("#txtrutaerrores").focus();
            return;
        }
        if ($.trim(RutaLog) == "") {
            alerta("La ruta log de la Fuente Base de Datos es un campo obligatorio");
            $("#txtrutalog").focus();
            return;
        }

        $("#dvCargando").show();

        $.ajax({
            type: "POST",
            url: "Mnt_FuenteBD.aspx/Guardar",
            data: "{'pCod': '" + Codigo + "'," +
                    "'pNom': '" + Nombre + "'," +
                    "'pServ': '" + serv + "'," +
                    "'pBD': '" + bd + "'," +
                    "'pTabla': '" + tabla + "'," +
                    "'pUsuario': '" + usuario + "'," +
                    "'pPassword': '" + password + "'," +
                    "'pConfigFuente': '" + ConfigFuente + "'," +
                    "'pRutaErrores': '" + RutaErrores + "'," +
                    "'pRutaLog': '" + RutaLog + "'," +
                    "'pbtVig': '" + parseInt($("#hdfEstado").val()) + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (msg) {
                $("#dvCargando").hide();
                if (msg.d == "1" || msg.d == "0") {
                    window.parent.ActualizarGrilla();
                    Mensaje("<br/><h1>Fuente Base de Datos guardada</h1><br/>", document, CerroMensaje);
                }
                else {
                    if (msg.d == "2") {
                        alerta("El nombre de la Fuente Base de Datos ya esta siendo usado, no se pudo grabar el registro");
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