function EventosUpdatePanel() {
    $("#ddlPlantilla").change(function () {
    });
}

 $(function () {
    var indiceTab = window.parent.tab.tabs("option", "selected");
    $(".btnNormal").button({});

    ValidarNumeroEnCajaTexto("txtLongitudMinimo", ValidarSoloNumero);
    ValidarNumeroEnCajaTexto("txtLongitudMaximo", ValidarSoloNumero);

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

    $("#txtPrefijo").focusout(function () {
        $("#txtPrefijo").val($("#txtPrefijo").val().replace(/\\/g, ""));
    });

    $("#txtReemplazarPrefijo").focusout(function () {
        $("#txtReemplazarPrefijo").val($("#txtReemplazarPrefijo").val().replace(/\\/g, ""));
    });

    $("#btnGuardar").click(function () {
        var Operador = $('#ddlOperador').val();
        var Plantilla = $('#ddlPlantilla').val();
        var Zona = ($('#ddlZona').val() == "-1" ? 561 : $('#ddlZona').val());
        var Prefijo = $('#txtPrefijo').val().replace(/'/g, "&#39").replace(/\\/g, "");
        var ReemplazarPrefijo = $('#txtReemplazarPrefijo').val().replace(/'/g, "&#39").replace(/\\/g, "");
        var LongitudMinimo = $('#txtLongitudMinimo').val();
        var LongitudMaximo = $('#txtLongitudMaximo').val();
        var TipoNumero = $('#ddlTipoNumero').val();
        var btVig = $('#chkEstado').is(':checked');

        if (Operador == "-1") {
            window.top.alerta("Seleccione un operador");
            $('#ddlOperador').focus();
            return;
        }
        if (Plantilla == "-1") {
            window.top.alerta("Seleccione un tipo de plantilla");
            $('#ddlPlantilla').focus();
            return;
        }
        //if (Zona == "-1") {
        //    window.top.alerta("Seleccione una zona");
        //    $('#ddlZona').focus();
        //    return;
        //}
        if (Prefijo == "") {
            window.top.alerta("Ingrese un prefijo");
            $('#txtPrefijo').focus();
            return;
        }

//        if (Prefijo.substring(0, 1) == "0") {
//            alerta("Ingrese un Prefijo válido - No se Permite que el Valor inicie con cero");
//            $('#txtPrefijo').focus();
//            return;
//        }

//        if (ReemplazarPrefijo.substring(0, 1) == "0") {
//            alerta("Ingrese un Reem. Prefijo válido - No se Permite que el Valor inicie con cero");
//            $('#txtReemplazarPrefijo').focus();
//            return;
//        }

        if (LongitudMinimo == "") {
            window.top.alerta("Ingrese una logitud minima");
            $('#txtLongitudMinimo').focus();
            return;
        }

        if (LongitudMinimo.substring(0, 1) == "0") {
            window.top.alerta("Ingrese una Longitud Min. válida - No se Permite que el Valor inicie con cero");
            $('#txtLongitudMinimo').focus();
            return;
        }

        if (LongitudMaximo == "") {
            window.top.alerta("Ingrese una longitud máxima");
            $('#txtLongitudMaximo').focus();
            return;
        }

        if (LongitudMaximo.substring(0, 1) == "0") {
            window.top.alerta("Ingrese una Longitud Max. válida - No se Permite que el Valor inicie con cero");
            $('#txtLongitudMaximo').focus();
            return;
        }

        if (TipoNumero == "-1") {
            window.top.alerta("Seleccione un tipo de número");
            $('#ddlTipoNumero').focus();
            return;
        }
        if (parseInt(LongitudMinimo) > parseInt(LongitudMaximo)) {
            window.top.alerta("La longitud minima no puede ser mayor a la máxima");
            $('#txtLongitudMinimo').focus();
            return;
        }

        BloquearPagina(true);
        $.ajax({
            type: "POST",
            url: "Imp_Mnt_Ruta.aspx/Guardar",
            data: "{'inCodRut': '" + $('#hdfCod').val() + "'," +
                           "'inCodOpe': '" + Operador + "'," +
                           "'F_inCodPla': '" + Plantilla + "'," +
                           "'inCodZon': '" + Zona + "'," +
                           "'vcPre': '" + Prefijo.replace(/'/g, "&#39") + "'," +
                           "'vcRemPre': '" + ReemplazarPrefijo.replace(/'/g, "&#39") + "'," +
                           "'inLonMin': '" + LongitudMinimo + "'," +
                           "'inLonMax': '" + LongitudMaximo + "'," +
                           "'inCodTipNum': '" + TipoNumero + "'," +
                           "'btVig': '" + btVig + "'}",
            contentType: "application/json; charset=iso-8859-1",
            dataType: "json",
            success: function (result) {
                if (result.d == "0") {
                    window.parent.ActualizarGrilla();
                    Mensaje("<br/><img src=\"../../../Common/Images/Mantenimiento/Grabar32.png\" /><br/><h1>Prefijo guardado</h1><br/>", document, CerroMensaje);
                }
                else {
                    window.top.alerta("Ya se ingreso una ruta con los mismos datos");
                    BloquearPagina(false);
                }
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
                BloquearPagina(false);
            }
        });
    });
    $("#btnCerrar").click(function () {
        window.parent.tab.tabs("remove", window.parent.tab.tabs("option", "selected"));
    });
    function LimpiarTodo() {
        $("select#ddlOperador").prop('selectedIndex', 0);
        $("select#ddlPlantilla").prop('selectedIndex', 0);
        //$("select#ddlZona").prop('selectedIndex', 0);
        $('#txtPrefijo').val("");
        $('#txtReemplazarPrefijo').val("");
        $('#txtLongitudMinimo').val("");
        $('#txtLongitudMaximo').val("");
        $('select#ddlTipoNumero').prop('selectedIndex', 0);
    }
    function CerroMensaje() {
        BloquearPagina(false);
        if ($('#hdfCod').val() == "") {
            LimpiarTodo();
        }
        else {
            window.parent.tab.tabs("remove", indiceTab);
        }
    }
 });


