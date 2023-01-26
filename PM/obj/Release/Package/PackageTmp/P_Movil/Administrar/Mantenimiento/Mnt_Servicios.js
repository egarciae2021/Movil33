
var indiceTab = window.parent.tab.tabs("option", "selected");
var oCulturaUsuario;
$(function () {
    oCulturaUsuario = window.parent.parent.oCulturaUsuario;
    $("input:checkbox,input:radio,input:file").uniform();
    ActivarCombokendo("#ddlOperador", 120);
    ActivarCombokendo("#ddlGruposOrigen", 120);
    $("#txtServicio").keypress(ValidarAlfaNumericoConEspacios);
    $("#txtDescripcion").keypress(ValidarAlfaNumericoConEspacios);

    //ValidarNumeroEnCajaTexto("txtCosto", ValidarDecimalPositivo);
    ValidarNumeroEnCajaTexto("txtCosto", ValidarDecimalPositivo, oCulturaUsuario);
    $("#txtCosto").val(FormatoNumero($("#txtCosto").val(), oCulturaUsuario));

    if ($("#chkSinCosto").is(":checked")) {
        $("#trCosto").hide(200);
    } else {
        $("#trCosto").show(200);
    }

    $("#btnCerrarServicio").click(function (event) {
        alert("hola");
        window.location.reload();
        return;
        window.parent.tab.tabs("remove", indiceTab);
    });

    $("#chkSinCosto").change(function () {
        if ($("#chkSinCosto").is(":checked")) {
            $("#trCosto").hide(200);
        } else {
            $("#trCosto").show(200);
        }
    });
    //AGREGAR Y QUITAR GRUPOS DE ORIGEN
    $("#imgAgregar").click(function () {
        if ($("#ddlGruposOrigen").data("kendoComboBox").value() != "-1") {
            var vcGrupo = $("#ddlGruposOrigen").data("kendoComboBox").text();
            var vcValor = $("#ddlGruposOrigen").data("kendoComboBox").value();
            var blnExiste = 0;
            var i = 0;
            for (i = 0; i < $("#lstGrupos")[0].options.length; i++) {
                if ($.trim($("#lstGrupos")[0].options[i].value) == vcValor) {
                    blnExiste = 1;
                }
            }
            if (blnExiste == 0) {
                $("#lstGrupos").append($("<option></option>").attr("value", vcValor).text(vcGrupo));
                //$("#ddlGruposOrigen").data("kendoComboBox").value(-1);
                $("#ddlGruposOrigen").focus();
            } else {
                alerta("Ya existe el grupo seleccionado.");
            }
        } else {
            alerta("Debe seleccionar un grupo.");
        }
    });
    $("#imgQuitar").click(function () {
        var len = $("#lstGrupos option:selected").length;
        if (len != 0) {
            var vcValor = $("#lstGrupos option:selected")[0].value;
            if (vcValor != null) {
                var i = 0;
                for (i = 0; i < $("#lstGrupos")[0].options.length; i++) {
                    if ($.trim($("#lstGrupos")[0].options[i].value) == vcValor) {
                        $("#lstGrupos")[0].options.remove(i);
                    }
                }
            }
        }
        else {
            alerta("Seleccione un grupo a quitar");
        }
    });
    //FIN AGREGAR Y QUITAR GRUPOS DE ORIGEN

    $("#btnGuardarServicio").click(function () {
        var idSer = $("#hdfIdServicio").val();
        var inOpe = $("#ddlOperador").data("kendoComboBox").value();
        var vcNom = $("#txtServicio").val();
        var vcDes = $("#txtDescripcion").val();
        var dcCos;
        var grups;
        if ($("#chkSinCosto").is(":checked")) {
            dcCos = 0;
        } else {
            dcCos = $("#txtCosto").val();
        }
        if (inOpe == "-1") {
            alerta("Seleccione un operador, es un campo obligatorio");
            return;
        }
        if (vcNom == '') {
            alerta("Ingrese un nombre para el Servicio");
            return;
        }
        if (!$("#chkSinCosto").is(":checked") && dcCos == '') {
            alerta("Ingrese un Costo para el servicio");
            return;
        }
        var argrups = [];
        var i = 0;
        for (i = 0; i < $("#lstGrupos")[0].options.length; i++) {
            argrups.push($("#lstGrupos")[0].options[i].value);
            //var lstGrup = $("#lstGrupos")[0].options[i].value;
        }
        var grupDel = [];
        var grupAdd = [];
        if (idSer != -1) {
            var arGrupAct = $("#hdfGrupAct").val().split(",");
            //grupos quitados
            var argrupDel = jQuery.grep(arGrupAct, function (val) {
                var sum = 0;
                var i = 0;
                for (i = 0; i < argrups.length; i++) {
                    if (val == argrups[i]) {
                        sum = sum + 1;
                    }
                }
                if (sum == 0) {
                    return val;
                }
            });
            //grupos agregados
            var argrupAdd = jQuery.grep(argrups, function (val) {
                var sum = 0;
                var i = 0;
                for (i = 0; i < arGrupAct.length; i++) {
                    if (val == arGrupAct[i]) {
                        sum = sum + 1;
                    }
                }
                if (sum == 0) {
                    return val;
                }
            });
            grupAdd = argrupAdd.join(",");
            grupDel = argrupDel.join(",");
        } else {
            grupAdd = argrups.join(",");
            grupDel = '';
        }
        //grups = argrups.join(',');
        //alert(idSer + "\n" + inOpe + "\n" + vcNom + "\n" + vcDes + "\n" + dcCos);
        //alerta("Grupos totales -> " + grups + "\nGruposActuales -> " + $("#hdfGrupAct").val() + "\nGruposAgregados -> " + grupAdd.join(",") + "\nGruposQuitados -> " + grupDel.join(","));

        if (oCulturaUsuario.vcSimSepMil == ",") {
            dcCos = dcCos.toString().replace(/,/g, "");
        }

        $.ajax({
            type: "POST",
            url: "Mnt_Servicios.aspx/GuardarServicio",
            data: "{'inIdSer': '" + idSer + "', " +
                    "'inIdOpe': '" + inOpe + "', " +
                    "'vcNom': '" + vcNom + "', " +
                    "'vcDes': '" + vcDes + "', " +
                    "'vcGrupAdd': '" + grupAdd + "', " +
                    "'vcGrupDel': '" + grupDel + "', " +
                    "'dcCos': '" + dcCos + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                if (result.d != 0) {
                    window.parent.ActualizarGrilla();
                    Mensaje("<br/><h1>Servicio guardado</h1><br/><h2>" + vcNom + "</h2>", document, CerroMensaje);
                } else if (result.d == 0) {
                    alerta("Ya existe un servicio similar para el operador seleccionado");
                }
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            }
        });
    });

});

function limpiar() {
    $("#ddlOperador").data("kendoComboBox").value(-1);
    $("#txtServicio").val('');
    $("#txtDescripcion").val('');
    $("#txtCosto").val('');
    $("#chkSinCosto").attr("checked", false);
}

function CerroMensaje() {
    if ($("#hdfCuenta").val() == "-1") {//Nuevo
        limpiar();
    }
    else {//Edicion
        window.parent.tab.tabs("remove", indiceTab);
    }
}