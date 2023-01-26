//#region Variables Globales
var indiceTab;
var oCulturaUsuario;
var arListGrupoOrigen = [];
function GrupoOrigen(Codigo, Nombre) {
    this.P_inCodGruOri = Codigo;
    this.vcNomGru = Nombre;
}
var lstServicio;
//#endregion
$(function () {
    //#region Valores Iniciales
    indiceTab = window.parent.tab.tabs("option", "selected");
    oCulturaUsuario = window.parent.parent.oCulturaUsuario;
    fnListarServicios();

    $("#txtNombrePaquete").focus();
    $(".btnNormal").button();
    $(".VARCHAR").keypress(ValidarAlfaNumericoConEspacios);

    //$(".INT").keypress(ValidarEntero);
    //$(".DECIMAL").keypress(ValidarDecimal);

    //ValidarNumeroEnCajaTexto("txtMonto", ValidarDecimalPositivo);
    ValidarNumeroEnCajaTexto("txtMonto", ValidarDecimalPositivo, oCulturaUsuario, false);
    ValidarNumeroEnCajaTexto("txtCantidad", ValidarSoloNumero, oCulturaUsuario, true);

    //cargar lista grupos
    $("#lstGrupOrig option").each(function () {
        var oGrupoOrigen = new GrupoOrigen();
        oGrupoOrigen.P_inCodGruOri = $(this).val();
        oGrupoOrigen.vcNomGru = $(this).text();
        arListGrupoOrigen.push(oGrupoOrigen);
    });

    //#endregion

    //#region eventos
    $("#ddlTipoServicio").change(function () {
        var vcExpEn = $("#ddlTipoServicio option[value='" + $(this).val() + "']").attr("ExpEn");
        $("#lblExpEn").text(vcExpEn);
        fnCargarServicioPorTipo($(this).val());
    });

    $("#imgAgregar").click(function () {
        var oGrupoOrigen = new GrupoOrigen();
        oGrupoOrigen.P_inCodGruOri = $("#ddlGrupoOrigen").val();
        oGrupoOrigen.vcNomGru = $("#ddlGrupoOrigen option[value='" + oGrupoOrigen.P_inCodGruOri + "']").text();

        var inArray = $.grep(arListGrupoOrigen, function (e) { return e.P_inCodGruOri == oGrupoOrigen.P_inCodGruOri; });

        if (inArray.length == 0) {
            $("#lstGrupOrig").append($("<option></option>").attr("value", oGrupoOrigen.P_inCodGruOri).text(oGrupoOrigen.vcNomGru));
            arListGrupoOrigen.push(oGrupoOrigen);
        } else {
            alerta("Ya se ha agregado el grupo.");
        }
    });

    $("#imgQuitar").click(function () {
        if ($("#lstGrupOrig option:selected").html() != null) {
            var Item = new GrupoOrigen($("#lstGrupOrig").val(), $("#lstGrupOrig option:selected").html());
            var inArray = $.grep(arListGrupoOrigen, function (e) { return e.P_inCodGruOri == Item.P_inCodGruOri; });

            if (inArray.length == 1) {
                $("#lstGrupOrig option:selected").remove();

                arListGrupoOrigen = $.grep(arListGrupoOrigen, function (e) {
                    return e.P_inCodGruOri != Item.P_inCodGruOri;
                });
                //$("#lstEmpleado")[0].options.remove(i)
            } else {
                alerta("el grupo ya fue eliminado.");
            }
        }
        else {
            alerta("Seleccione un Item a quitar");
        }
    });

    $("#btnGuardar").click(function () {
        var inCodPaqAmp = $("#hdfCodigoPaqAmp").val();
        var vcNombre = $("#txtNombrePaquete").val();
        var inCodOpe = $("#ddlOperador").val();
        var inCodTipSer = $("#ddlTipoServicio").val();
        var inCantidad = $("#txtCantidad").val();
        var dcMonto = $("#txtMonto").val();
        var btVig = true;
        var inCodSer = $("#ddlServicio").val();

        if ($("#hdfCodigoPaqAmp").val() != '0') {
            btVig = $("#chkActivo").is(":checked");
        }

        if (vcNombre == '') {
            alerta("Debe ingresar un nombre para el paquete de ampliación");
            return;
        }

        if (inCodOpe == -1) {
            alerta("Seleccione un operador.");
            return;
        }

        if (inCodTipSer == -1) {
            alerta("Seleccione un Tipo de Servicio.");
            return;
        }

        if (inCodSer == -1) {
            alerta("Seleccione un Servicio");
            return;
        }

        if (inCantidad == '') {
            alerta("Ingrese una cantidad para el paquete de ampliación.");
            return;
        }

        if (parseInt(inCantidad) <= 0) {
            alerta("Ingrese una cantidad mayor a cero (0).");
            return;
        }

        if (dcMonto == '') {
            alerta("Ingrese un monto para el paquete de ampliación.");
            return;
        }

        if (arListGrupoOrigen.length == 0) {
            alerta("Ingrese por lo menos un grupo de empleado.");
            return;
        }

        var Guardar_Data = { inCodPaqAmp: inCodPaqAmp,
            vcNombre: vcNombre,
            inCodOpe: inCodOpe,
            inCantidad: inCantidad,
            dcMonto: dcMonto,
            inCodTipSer: inCodTipSer,
            inCodSer: inCodSer,
            btVig: btVig,
            Grupos: JSON.stringify(arListGrupoOrigen)
        };

        fnGuardarPaquete(Guardar_Data);
    });

    $("#btnCerrar").click(function () {
        window.parent.tab.tabs("remove", indiceTab);
    });
    //#endregion
});

//#region Funciones BD
function fnListarServicios() {
    $.ajax({
        type: "POST",
        url: "../../../Common/WebService/General.asmx/ListarServicio",
        data: "{'idCliente': " + window.parent.parent.parent.idCliente + "}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            lstServicio = result.d;
            if ($(lstServicio).length == 0) {
                alerta("Ingrese por lo menos un servicio y vuelva a intentarlo");
            } else {
                if ($("#hdfCodigoPaqAmp").val() == '0') {
                    $("#ddlServicio").append($("<option></option>").val(-2).text("<Seleccione Tipo>"));
                } else {
                    fnCargarServicioPorTipo($("#ddlTipoServicio").val());
                }
            }
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
}

function fnGuardarPaquete(data) {
    $.ajax({
        type: "POST",
        url: "Mnt_PaqueteAmpliacion.aspx/Guardar",
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            if ($("#hdfCodigoPaqAmp").val() == '0') {
                if (result.d == 1) {
                    alert("Ya existe el paquete.");
                } else if (result.d == 0) {
                    alert("Error al guardar el Paquete.");
                } else {
                    window.parent.ActualizarGrilla();
                    Mensaje("<br/><h1>Paquete de Ampliación Guardado</h1><br/>", document, CerroMensaje);
                }
            } else {
                if (result.d == -1) {
                    alert("No existe el paquete.");
                } else {
                    window.parent.ActualizarGrilla();
                    Mensaje("<br/><h1>Paquete de Ampliación Guardado</h1><br/>", document, CerroMensaje);
                }
            }
        },
        cache: false,
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alerta(errorThrown);
        }
    });
}
//#endregion

//#region Funciones Pagina
function fnCargarServicioPorTipo(t) {
    $("#ddlServicio").html('');
    $("#ddlServicio").append($("<option></option>").val("-1").text("<Seleccione>"));
    $("#ddlServicio").append($("<option></option>").val("0").text("<Todos>"));
    var i = 0;
    for (i = 0; i < lstServicio.length; i++) {
        var vTip = lstServicio[i].TipoServicio.P_inCod;
        var vCod = lstServicio[i].P_inCod;
        var vNom = lstServicio[i].vcNom;
        var vEst = lstServicio[i].btEst;
        if (vTip == t) {
            $("#ddlServicio").append($("<option></option>").val(vCod).text(vNom));
        }
    }
    if ($("#hdfCodigoPaqAmp").val() != '0' && $("#hdfCodServicio").val() != '') {
        $("#ddlServicio").val($("#hdfCodServicio").val());
    }
}

function CerroMensaje() {
    if ($("#hdfCodigoPaqAmp").val() == '0') {
        fnLimpiarFormulario();
    } else {
        window.parent.tab.tabs("remove", indiceTab);
    }
}

function fnLimpiarFormulario() {
    $("#txtNombrePaquete").val('');
    $("#ddlOperador").val(-1);
    $("#ddlTipoServicio").val(-1);
    $("#lblExpEn").text("-");
    $("#txtCantidad").val("");
    $("#txtMonto").val("");
    $("#lstGrupOrig").html('');
    arListGrupoOrigen = [];
    $("#ddlServicio").html('');
    $("#ddlServicio").append($("<option></option>").val(-2).text("<Seleccione Tipo>"));
}
//#endregion