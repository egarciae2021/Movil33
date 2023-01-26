

$(function () {

    //    $("#txtNombreFormato").keypress(ValidarAlfaNumericoConEspacios);
    $("#txtIdentificador").keypress(ValidarAlfaNumericoConEspacios);

    ValidarNumeroEnCajaTexto("txtposdia", ValidarSoloNumero);
    ValidarNumeroEnCajaTexto("txtlogdia", ValidarSoloNumero);
    ValidarNumeroEnCajaTexto("txtposmes", ValidarSoloNumero);
    ValidarNumeroEnCajaTexto("txtlogmes", ValidarSoloNumero);
    ValidarNumeroEnCajaTexto("txtposano", ValidarSoloNumero);
    ValidarNumeroEnCajaTexto("txtlogano", ValidarSoloNumero);

    IniciarPagina();
    $(".btnNormal").button();

    var indiceTab = window.parent.tab.tabs("option", "selected");

    function IniciarPagina() {

        if ($("#hdfEstado").val() == '') {
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
            $("#txtNombreFormato").val("");
            $("#txtIdentificador").val("");
            $("#txtposdia").val("");
            $("#txtlogdia").val("");
            $("#txtposmes").val("");
            $("#txtlogmes").val("");
            $("#txtposano").val("");
            $("#txtlogano").val("");
            $("#hdfEstado").val("");
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
        var Nombre = $("#txtNombreFormato").val().replace(/'/g, "&#39").replace(/\\/g, "");
        var Identificador = $("#txtIdentificador").val().replace(/'/g, "&#39").replace(/\\/g, "");
        var posdia = $("#txtposdia").val();
        var logdia = $("#txtlogdia").val();
        var posmes = $("#txtposmes").val();
        var logmes = $("#txtlogmes").val();
        var posano = $("#txtposano").val();
        var logano = $("#txtlogano").val();
        var esActivo;
        if ($('#chActivo').prop('checked')) {
            esActivo = 1;
        } else {
            esActivo = 0;
        }


        if ($.trim(Nombre) == "") {
            alerta("El nombre del Formato es un campo obligatorio");
            $("#txtNombreFormato").focus();
            return;
        }
        if ($.trim(Identificador) == "") {
            alerta("El identificador del Formato es un campo obligatorio");
            $("#txtIdentificador").focus();
            return;
        }

        $("#dvCargando").show();

        $.ajax({
            type: "POST",
            url: "Mnt_Formato.aspx/Guardar",
            data: "{'pCod': '" + $.trim(Codigo) +
            "', 'pNom': '" + $.trim(Nombre) +
            "', 'pIdent': '" + $.trim(Identificador) +
            "', 'pPosDia': '" + $.trim(posdia) +
            "', 'pLogDia': '" + $.trim(logdia) +
            "', 'pPosMes': '" + $.trim(posmes) +
            "', 'pLogMes': '" + $.trim(logmes) +
            "', 'pPosAno': '" + $.trim(posano) +
            "', 'pLogAno': '" + $.trim(logano) +
            "', 'btVig': '" + esActivo + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (msg) {
                $("#dvCargando").hide();
                if (msg.d == "1" || msg.d == "0") {
                    window.parent.ActualizarGrilla();
                    Mensaje("<br/><h1>Formato guardado</h1><br/>", document, CerroMensaje);
                }
                else {
                    if (msg.d == "2") {
                        alerta("El nombre del Formato ya esta siendo usado, no se pudo grabar el registro");
                        BloquearPagina(false);
                    }
                }
            },
            error: function (xhr, err) {
                $("#dvCargando").hide();
                alerta("Error, Estadow: " + xhr.readyState + "\nEstado: " + xhr.status);
            }
        });
    });

});