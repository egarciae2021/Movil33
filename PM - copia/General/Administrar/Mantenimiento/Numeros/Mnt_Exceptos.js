/// <reference path="../../../../Common/Scripts/jquery-2.0.0-vsdoc.js" />
var paises = [];
var Selecciono;
if ($('#hdfCod').val() == '') {
    Selecciono = false;
} else {
    Selecciono = true;
}
$(function () {

    $("#txtPais").keypress(ValidarAlfaNumericoConEspacios);
    $("#txtCiudad").keypress(ValidarAlfaNumericoConEspacios);
    $("#txtEmpleado").keypress(ValidarAlfaNumericoConEspacios);
    $('#txtBuscar').live("keypress", function (e) {
        if (e.keyCode == 13) {
            buscarNumeros();
            return false; // prevent the button click from happening
        }
        else {
            if ($('#radio1').is(':checked')) {
                return ValidarSoloNumero(e);
            }
            else {
                return ValidarAlfaNumericoConEspacios(e);
            }
        }
    });

    ActivarCombokendo("#ddlTipo", "200");
    ActivarCombokendo("#ddlSubtipo", "200");
    function selfocus() {
        if ($("#txtCiudad").val() == "") { $("#txtCiudad").focus(); } else { $("#txtBuscar").focus(); }
    }
    $("#radio").buttonset();
    //$("#rad").buttonset();
    $('#btnBuscar').button();
    $('#btnGuardar').button();
    $('#btnBuscarNumero').button();
    $('#btnVolverMant').button({ icons: { primary: "ui-icon-circle-arrow-w"} });

    $('#radio2').click(function () {
        $('#rad').show(200);
        $("#lbldatoBusqueda").text("Raz.Soc.:");
        selfocus();
    });
    $('#radio1').click(function () {
        $('#rad').hide(200);
        $("#lbldatoBusqueda").text("Número:");
        selfocus();
        $("#txtBuscar").val('');
    });
    $("#rad1").click(function () { $("#txtCiudad").focus(); });
    $("#rad2").click(function () { $("#txtCiudad").focus(); });
    $("#rad3").click(function () { $("#txtCiudad").focus(); });
    $('#btnBuscar').click(function () { buscarNumeros(); });
    $('#btnBuscarNumero').click(function () { mostrarBuscarNumero(); });
    $('#btnVolverMant').click(function () { ocultarBuscarNumero(); });
    $('#btnGuardar').click(function () { Guardar(); });

    $('#ddlTipo').change(function () { obtenerSubtipo($(this).val()); });

    var tbNumeros = $("#tbNumeros").jqGrid({
        datatype: "local",
        colModel: [{ name: 'NUME_PF_vcCODPAI', index: 'NUME_PF_vcCODPAI', label: 'Cod Pais', hidden: true, sortable: false }, //true
            {name: 'vcNomPai', index: 'vcNomPai', label: 'Pais', hidden: false, sortable: false },
            { name: 'NUME_PF_vcCODCIU', index: 'NUME_PF_vcCODCIU', label: 'Cod Ciudad', hidden: true, sortable: false }, //true
    {name: 'vcNomCiu', index: 'vcNomCiu', label: 'Ciudad', hidden: false, sortable: false },
            { name: 'NUME_P_vcNUMTEL', index: 'NUME_P_vcNUMTEL', label: 'Num Tel', hidden: false, width: '200px' },
            { name: 'NUME_vcDESNUM', index: 'NUME_vcDESNUM', label: 'Desc Num', hidden: false, width: '300px', sortable: false },
            { name: 'NUME_btMON', index: 'NUME_btMON', label: 'Monitoriar', hidden: false },
            { name: 'NUME_F_tiCODGRUBASDES', index: 'NUME_F_tiCODGRUBASDES', label: 'Cod Tipo', hidden: true, sortable: false }, //true
            {name: 'GRBD_vcNOMGRU', index: 'GRBD_vcNOMGRU', label: 'Tipo', hidden: false, width: '100px' },
            { name: 'NUME_F_tiCODGRUDES', index: 'NUME_F_tiCODGRUDES', label: 'Cod SubTipo', hidden: true, sortable: false }, //true
            {name: 'GRDE_vcNOMGRU', index: 'GRDE_vcNOMGRU', label: 'SubTipo', hidden: false, width: '100px' },
            { name: 'NUME_F_vcCODEMP', index: 'NUME_F_vcCODEMP', label: 'Cod Empresa', hidden: true, width: '300px', sortable: false }, //true
            {name: 'vcRazSoc', index: 'vcRazSoc', label: 'Empresa', hidden: false, width: '200px' },
            { name: 'NUME_vcFECINI', index: 'NUME_vcFECINI', label: 'Fecha Ini', hidden: false },
            { name: 'NUME_vcFECFIN', index: 'NUME_vcFECFIN', label: 'Fecha Fin', hidden: false },
            { name: 'NUME_btEST', index: 'NUME_btEST', label: 'Estado', hidden: true, sortable: false }, //true
        ],
        sortname: "NUME_P_vcNUMTEL", //Default SortColumn
        sortorder: "asc", //Default SortOrder.
        width: "1010",
        height: "250",
        rownumbers: true,
        caption: "Números",
        ondblClickRow: function () { elegirNumero(); },
        afterInsertRow: function (rowid, aData) {
            if (aData.NUME_btEST == false) {
                var colModels = $("#tbNumeros").getGridParam("colModel");
                var i;
                for (i in colModels) {
                    $("#tbNumeros").jqGrid('setCell', rowid, i, '', { color: 'red' });
                }
            }
        }
    });

    $("#tbNumeros").jqGrid('bindKeys', { "onEnter": function () { elegirNumero(); }, "onSpace": function () { elegirNumero(); } });

    obtenerPais();
    obtenerEmpleados();
    verificarEditar_o_Agregar();
    obtenerPaisInstalacion();
    if ($("#txtPaisMant").val() == '') {
        obtenerPaisInstalacionExceptos();
    }

    //////--------
    $("#txtEmpleado").keypress(function (e) {
        Selecciono = false;
        if (e.keyCode == 13) {
            return;
        }
    });
    //////--------

    $("input[name='ddlTipo_input']").attr("disabled", true);
    $("input[name='ddlSubtipo_input']").attr("disabled", true);
});

function verificarEditar_o_Agregar() {
    var cod = $('#hdfCod').val();
    if (cod != '-1') {
        $('#btnBuscarNumero').hide();
        $("#txtEmpleado").focus();
    }
}

function Guardar() {
    var cod = $('#hdfCod').val();

    var numero = $("#txtNumero").val();
    var codPais = $("#txtPaisMant").val();
    var codCiudad = $("#txtCiudadMant").val();
    var codEmpleado = $("#txtEmpleado").val();
    var codTipo = $("#ddlTipo").val();
    var codSubtipo = $("#ddlSubtipo").val();
    var Estado = $('#chActivo').is(':checked');

    if (numero == "") {
        alerta("El número es un campo obligatorio");
        //$("#txtNumero").focus();
        $("#btnBuscarNumero").focus();
        return;
    }

    if (codPais == "") {
        alerta("El País es un campo obligatorio");
        $("#txtPaisMant").focus();
        return;
    }

    if (codCiudad == "") {
        alerta("El Ciudad es un campo obligatorio");
        $("#txtCiudadMant").focus();
        return;
    }

    if (codEmpleado == "" || !Selecciono) {
        alerta("El Empleado es un campo obligatorio");
        $("#txtEmpleado").focus();
        return;
    }

    if (codTipo == 0) {
        alerta("El Tipo es un campo obligatorio");
        $("#ddlTipo").focus();
        return;
    }

    if (codSubtipo == 0) {
        alerta("El Subtipo es un campo obligatorio");
        $("#ddlSubtipo").focus();
        return;
    }

    $("#dvCargando").show();

    var esInsertar = cod == '-1';

    $.ajax({
        type: "POST",
        url: "Mnt_Exceptos.aspx/Guardar",
        data: "{'prNumTel': '" + numero +
        "', 'prCodPais': '" + codPais +
        "', 'prCodCiudad': '" + codCiudad +
        "', 'prCodEmpleado': '" + codEmpleado +
        "', 'prCodTipo': '" + codTipo +
        "', 'prCodSubtipo': '" + codSubtipo +
        "', 'esInsertar': '" + esInsertar.toString() + "', 'prEstado':'" + Estado + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
            $("#dvCargando").hide();
            if (msg.d == "") {
                window.parent.ActualizarGrilla();
                Mensaje("<br/><h1>Excepto guardado</h1><br/>", document, CerroMensaje);
            }
            else {
                alerta("Revisar: " + msg.d);
            }
        },
        error: function (xhr, err) {
            $("#dvCargando").hide();
            alerta("Error, Estadow: " + xhr.readyState + "\nEstado: " + xhr.status);
        }
    });
}

function obtenerPais() {
    $("#dvCargando").show();
    $.ajax({
        type: "POST",
        url: "Mnt_Exceptos.aspx/ListarPais",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {

            $(msg.d).each(function (index, el) {
                paises.push(el.vcNomPai);
            });
            $("#dvCargando").hide();
            //paises = msg.d;
            $("#txtPais").autocomplete({
                source: paises,
                select: function (event, ui) {
                    obtenerCiudad(this.value);
                },
                focus: function (event, ui) {
                    $("#txtPais").val(ui.item.label);
                    return false;
                },
                change: function (event, ui) {
                    if (!ui.item) {
                        $("#txtPais").val("");
                    }
                    return false;
                }
            });
        },
        error: function (xhr, err) {
            $("#dvCargando").hide();
            alerta("Error, Estado: " + xhr.readyState + "\nEstado: " + xhr.status);
        }
    });

}

function obtenerEmpleados() {
    $("#dvCargando").show();
    $.ajax({
        type: "POST",
        url: "Mnt_Exceptos.aspx/ListarEmpleado",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {

            $("#dvCargando").hide();
            //paises = msg.d;
            $("#txtEmpleado").autocomplete({
                minLength: 3,
                source: msg.d,
                select: function (event, ui) {
                    $("#ddlTipo").focus();
                    Selecciono = true;
                },
                change: function (event, ui) {
                    if (!Selecciono) {
                        $("#txtEmpleado").val("");
                    }
                    return false;
                },
                focus: function (event, ui) {
                    $("#txtEmpleado").val(ui.item.label);
                    return false;
                },
                open: function (event, ui) {
                    Selecciono = false;
                    return false;
                }
            });
        },
        error: function (xhr, err) {
            $("#dvCargando").hide();
            alerta("Error, Estado: " + xhr.readyState + "\nEstado: " + xhr.status);
        }
    });

}

function obtenerCiudad(pais) {
    $("#txtCiudad").val('');
    $("#txtCiudad").focus();
    $("#dvCargando").show();
    $.ajax({
        type: "POST",
        url: "Mnt_Exceptos.aspx/ListarCiudad",
        data: "{'prCodPais': '" + pais + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
            var cuidades = [];
            $(msg.d).each(function (index, el) {
                cuidades.push(el.vcNomCiu);
            });
            $("#dvCargando").hide();
            //paises = msg.d;
            $("#txtCiudad").autocomplete({
                source: cuidades,
                select: function (event, ui) {
                    $("#txtBuscar").focus();
                },
                change: function (event, ui) {
                    if (!ui.item) {
                        $("#txtCiudad").val('');
                    }
                }
            });
        },
        error: function (xhr, err) {
            $("#dvCargando").hide();
            alerta("Error, Estado: " + xhr.readyState + "\nEstado: " + xhr.status);
        }
    });
}

//OBTENER SUBTIPO POR TIPO
function obtenerSubtipo(tipo) {

    if (tipo != "0") {

        $.ajax({
            type: "POST",
            url: "Mnt_Exceptos.aspx/obtenerSubtipo",
            data: "{'prIdTipo': '" + tipo + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {

                //                var options = [];
                //                for (var i = 0; i < result.d.length; i++) {
                //                    options.push('<option value="',
                //                        result.d[i].GRDE_P_tiCODGRU, '">',
                //                        result.d[i].GRDE_vcNOMGRU, '</option>');
                //                }
                //                $("#ddlSubtipo").html(options.join(''));
                //                $("#ddlSubtipo").val();

                var items = [];
                var i;
                for (i = 0; i < result.d.length; i++) {
                    items.push({ text: result.d[i].GRDE_vcNOMGRU, value: result.d[i].GRDE_P_tiCODGRU });
                }
                var dataSource = new kendo.data.DataSource({ data: items });
                $("#ddlSubtipo").data("kendoComboBox").setDataSource(dataSource);
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
                $("#dvCargando").hide();
            }
        });

    }
    else {
        $("#ddlSubtipo").html('<option value="0">---Seleccione----</option>');
        return;
    }

}
//FIN OBTENER SUBTIPO POR TIPO


//BUSCAR NUMEROS
function buscarNumeros() {

    var codPais = $('#txtPais').val();
    var codCiudad = $('#txtCiudad').val();
    var Dato = $('#txtBuscar').val();

    if (codPais == "") {
        Mensaje("<br/><h1>Debe elegir un país</h1><br/>", document);
        $('#txtPais').focus();
        return;
    }

    if (codCiudad == "") {
        Mensaje("<br/><h1>Debe elegir una ciudad</h1><br/>", document);
        $('#txtCiudad').focus();
        return;
    }

    if (Dato == "") {
        Mensaje("<br/><h1>Ingrese dato de busqueda</h1><br/>", document);
        $('#txtBuscar').focus();
        return;
    }

    var TipoConsulta = 4;

    if ($('#radio1').is(':checked')) {
        TipoConsulta = 4;
    }
    else {
        if ($('#rad1').is(':checked')) {
            TipoConsulta = 3;
        }
        else {
            if ($('#rad2').is(':checked')) {
                TipoConsulta = 1;
            }
            else {
                TipoConsulta = 2;
            }
        }
    }

    $("#tbNumeros").jqGrid('clearGridData');

    $.ajax({
        type: "POST",
        url: "Lista_Numero.aspx/ListarNumero_x_dato",
        data: "{'prCodPais': '" + codPais + "'," +
                   "'prCodCiudad': '" + codCiudad + "'," +
                   "'prDato': '" + Dato + "'," +
                   "'prTipoConsulta': '" + TipoConsulta + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            if ($(result.d).length > 0) {
                var i;
                for (i = 0; i < $(result.d).length; i++) {
                    $("#tbNumeros").jqGrid('addRowData', result.d[i].NUME_P_vcNUMTEL, result.d[i]);
                }
            }
            else {
                Mensaje("<br/><h1>No se encontraron registros</h1><br/>", document);
            }
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
}

function mostrarBuscarNumero() {
    $("#panelBotonoes").fadeOut(300);
    $("#panelMant").fadeOut(300, function () {
        $("#panelBuscarNumero").fadeIn(300);
        $("#panelNumeros").fadeIn(300);
        $("#txtCiudad").focus();
    });
}

function ocultarBuscarNumero() {
    $("#panelNumeros").fadeOut(300);
    $("#panelBuscarNumero").fadeOut(300, function () {
        $("#panelMant").fadeIn(300);
        $("#panelBotonoes").fadeIn(300);
        $("#txtEmpleado").focus();
    });
}


//EDITAR NUMERO
function elegirNumero() {


    var id = $("#tbNumeros").jqGrid('getGridParam', 'selrow');
    if (id) {
        var datos = $("#tbNumeros").jqGrid('getRowData', id);

        var codPais = datos['vcNomPai'] + "(" + datos['NUME_PF_vcCODPAI'] + ")";
        var codCiudad = datos['vcNomCiu'] + "(" + datos['NUME_PF_vcCODCIU'] + ")";
        var numero = datos.NUME_P_vcNUMTEL;
        var descNumero = datos.NUME_vcDESNUM;
        var Tipo = datos['GRBD_vcNOMGRU'];
        var Subtipo = datos['GRDE_vcNOMGRU'];

        $("#txtPaisMant").val(codPais);
        $("#txtCiudadMant").val(codCiudad);
        $("#txtNumero").val(numero);
        $("#txtDscNumero").val(descNumero);
        $("#txtTipoOriginal").val(Tipo);
        $("#txtSubtipoOriginal").val(Subtipo);

        ocultarBuscarNumero();

    }
    else {
        Mensaje("<br/><h1>Seleccione un Número</h1><br/>", document);
    }
}
//FIN EDITAR NUMERO

function CerroMensaje() {
    window.parent.tab.tabs("remove", window.parent.tab.tabs("option", "selected"));
}


$(function () {
    $('#btnCerrar').button();
    $('#btnCerrar').click(function () {
        CerroMensaje();
    });
});

function obtenerPaisInstalacionExceptos() {
    $.ajax({
        type: "POST",
        url: "Lista_Numero.aspx/ObtenerPaisInstalacion",
        contentType: "application/json; charset=utf-8",
        success: function (msg) {
            var paisinst = msg.d.vcNomPai + "(" + msg.d.P_vcCodPai + ")";
            $("#txtPaisMant").val(paisinst);
            obtenerCiudad(paisinst);
        },
        error: function (xhr, err) {
            $("#dvCargando").hide();
            alerta("Error, Estado: " + xhr.readyState + "\nEstado: " + xhr.status);
        }
    });
}

function obtenerPaisInstalacion() {
    $.ajax({
        type: "POST",
        url: "Lista_Numero.aspx/ObtenerPaisInstalacion",
        contentType: "application/json; charset=utf-8",
        success: function (msg) {
            var paisinst = msg.d.vcNomPai + "(" + msg.d.P_vcCodPai + ")";
            $("#txtPais").val(paisinst);
            obtenerCiudad(paisinst);
        },
        error: function (xhr, err) {
            $("#dvCargando").hide();
            alerta("Error, Estado: " + xhr.readyState + "\nEstado: " + xhr.status);
        }
    });
}

function validarEspaciosEnBlancoAlInicio(id) {
    var valor = $("#" + id.toString() + "").val();
    $("#" + id.toString() + "").val($.trim(valor));
}