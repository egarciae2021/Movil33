/// <reference path="../../../../Common/Scripts/jquery-2.0.0-vsdoc.js" />
var empresas = [];
var paises = [];
var subTip;
var esEditar;
var editando;
var buscando = false;
var Selecciono = false;
// INICIO DE DOCUMENT READY
$(function () {

    $("#txtPais").keypress(ValidarCadena);
    $("#txtCiudad").keypress(ValidarAlfaNumericoConEspacios);

    ValidarNumeroEnCajaTexto("txtNumero", ValidarSoloNumero);
    ValidarNumeroEnCajaTexto("txtBuscar", ValidarSoloNumero);


    $('#txtBuscar').live("keypress", function (e) {
        if (e.keyCode == 13) {
            validarEspaciosEnBlancoAlInicio("txtBuscar");
            buscarNumeros();
            //if (buscando == false) { buscarNumeros(); } else { alerta("Realizando busquedad actual"); };
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

    $("#txtRazonSocial").keypress(ValidarAlfaNumericoConEspacios);
    $("#txtRedPrivada").keypress(ValidarAlfaNumericoConEspaciosYCaracteres);
    ActivarCombokendo("#ddlTipo", "200");
    ActivarCombokendo("#ddlSubtipo", "200");
    //    $('#txtPais').change(function () {

    //        $("#txtNumero").val($('#txtPais').val());
    //    });

    $("#radio").buttonset();
    $("#rad").buttonset();
    $('#btnBuscar').button();

    //    $('#btnAgregar').button({ icons: { primary: "ui-icon-plusthick"} });
    //    $('#btnEditar').button({ icons: { primary: "ui-icon-pencil"} });
    //    $('#btnEliminar').button({ icons: { primary: "ui-icon-closethick"} });
    $('#btnAgregar').button();
    $('#btnEditar').button();
    $('#btnEliminar').button();
    $('#btnCancelar').button();
    $('#btnGuardar').button();

    function selfocus() {
        if ($("#txtCiudad").val() == "") { $("#txtCiudad").focus(); } else { $("#txtBuscar").focus(); }
    }

    $('#radio2').click(function () {
        $('#rad').show(200);
        $("#lbldatoBusqueda").text("Nombre/Raz.Soc.:");
        ValidarCadenaEnCajaTexto("txtBuscar");
        selfocus();
    });
    $('#radio1').click(function () {
        $('#rad').hide(200);
        $("#lbldatoBusqueda").text("Número:");
        selfocus();
        ValidarNumeroEnCajaTexto("txtBuscar", ValidarSoloNumero);
        $("#txtBuscar").val('');
    });
    $("#rad1").click(function () { selfocus(); });
    $("#rad2").click(function () { selfocus(); });
    $("#rad3").click(function () { selfocus(); });
    $('#btnBuscar').click(function () { buscarNumeros(); });

    $('#btnAgregar').click(function () { agregarNumero(); });
    $('#btnEditar').click(function () { editarNumero(); });
    $('#btnEliminar').click(function () { eliminar(); });
    $('#btnCancelar').click(function () { ocultarEditar(); habilitarAlAgregar(); });
    $('#btnGuardar').click(function () { Guardar(); });

    $('#ddlTipo').change(function () { obtenerSubtipo($(this).val()); });

    var tbNumeros = $("#tbNumeros").jqGrid({
        datatype: "local",
        colModel: [{ name: 'NUME_PF_vcCODPAI', index: 'NUME_PF_vcCODPAI', label: 'Cod País', hidden: true, width: '0px', sortable: false }, //0
        {name: 'vcNomPai', index: 'vcNomPai', label: 'País', hidden: false, width: '100px', sortable: false },
        { name: 'NUME_PF_vcCODCIU', index: 'NUME_PF_vcCODCIU', label: 'Cod Ciudad', hidden: true, width: '0px', sortable: false }, //0
        {name: 'vcNomCiu', index: 'vcNomCiu', label: 'Ciudad', hidden: false, width: '100px', sortable: false },
        { name: 'NUME_P_vcNUMTEL', index: 'NUME_P_vcNUMTEL', label: 'Num Tel', hidden: false, width: '150px' },
        { name: 'NUME_vcDESNUM', index: 'NUME_vcDESNUM', label: 'Nombre /Raz. Soc', hidden: false, width: '250px', sortable: false },
        { name: 'NUME_btMON', index: 'NUME_btMON', label: 'Monitoriar', hidden: true, width: '0px' }, //0
        {name: 'NUME_F_tiCODGRUBASDES', index: 'NUME_F_tiCODGRUBASDES', label: 'Cod Tipo', hidden: true, width: '0px' }, //0px
        {name: 'GRBD_vcNOMGRU', index: 'GRBD_vcNOMGRU', label: 'Tipo', hidden: false, width: '150px' },
        { name: 'NUME_F_tiCODGRUDES', index: 'NUME_F_tiCODGRUDES', label: 'Cod SubTipo', hidden: true, width: '0px' }, //0
        {name: 'GRDE_vcNOMGRU', index: 'GRDE_vcNOMGRU', label: 'SubTipo', hidden: false, width: '150px' }, //0
        {name: 'NUME_F_vcCODEMP', index: 'NUME_F_vcCODEMP', label: 'Cod Empresa', hidden: true, width: '0px' },
        { name: 'vcRazSoc', index: 'vcRazSoc', label: 'Empresa', hidden: false, width: '150px', sortable: false },
        { name: 'NUME_vcFECINI', index: 'NUME_vcFECINI', label: 'Fecha Inicio', hidden: false },
        { name: 'NUME_vcFECFIN', index: 'NUME_vcFECFIN', label: 'Fecha Fin', hidden: false },
        { name: 'NUME_btEST', index: 'NUME_btEST', label: 'Estado', hidden: true },
        { name: 'RedPrivada', index: 'RedPrivada', label: 'Red Privada', hidden: false, width: '150px' }
    ],
        sortname: "NUME_P_vcNUMTEL", //Default SortColumn
        sortorder: "asc", //Default SortOrder.
        width: "1080",
        height: "290",
        rownumbers: true,
        caption: "Números",
        ondblClickRow: function () { editarNumero(); },
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

    $("#tbNumeros").jqGrid('bindKeys', { "onEnter": function () { editarNumero(); }, "onSpace": function () { editarNumero(); } });

    $("#dialog-eliminar").dialog({
        autoOpen: false,
        modal: true,
        buttons: {
            Cancelar: function () {
                $("#dialog-eliminar").dialog("close");
            },
            Ok: function () {

                var id = $("#tbNumeros").jqGrid('getGridParam', 'selrow');
                if (id) {
                    limpiarFormularioEditar();

                    var datos = $("#tbNumeros").jqGrid('getRowData', id);

                    var codPais = datos['NUME_PF_vcCODPAI']; // datos['Pais.P_vcCodPai'];
                    var codCiudad = datos['NUME_PF_vcCODCIU']; //datos['Ciudad.P_vcCodCiu'];
                    var numero = datos.NUME_P_vcNUMTEL;

                    $.ajax({
                        type: "POST",
                        url: "Lista_Numero.aspx/Eliminar",
                        data: "{'prCodPais': '" + codPais +
                                "', 'prCodCiudad': '" + codCiudad +
                                "', 'prNumTelefono': '" + numero + "'}",
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: function (msg) {
                            $("#dvCargando").hide();
                            //alert(msg.d);
                            if (msg.d == '1') {
                                Mensaje("<br/><h1>Número Desactivado</h1><br/>", document, cerroMensaje);
                                $("#tbNumeros").jqGrid('clearGridData');
                                limpiarFormularioEditar();
                                ocultarEditar();
                                habilitarAlAgregar();
                            }
                            else if (msg.d == '2') {
                                Mensaje("<br/><h1>Número Eliminado</h1><br/>", document, cerroMensaje);
                                $("#tbNumeros").jqGrid('clearGridData');
                                limpiarFormularioEditar();
                                ocultarEditar();
                                habilitarAlAgregar();
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
                else {
                    Mensaje("<br/><h1>Seleccione un Número</h1><br/>", document, cerroMensaje);
                }


                $(this).dialog("close");
            }
        }
    });

    obtenerPais();
    obtenerPaisInstalacion();

    //Selecciono = false;
    $("#txtEmpresa").autocomplete({
        minLength: 0,
        source: function (request, response) {
            $.ajax({
                type: "POST",
                url: "Lista_Numero.aspx/ListarEmpresa",
                data: "{'vcRazSoc': '" + $("#txtEmpresa").val().replace(/'/g, "&#39").replace(/"/g, "&#34").replace(/\\/g, "&#92") + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {
                    response($.map(result.d, function (item) {
                        return {
                            vcCodEmp: item.P_vcCodEmp.replace(/&#39/g, "'").replace(/&#92/g, "\\").replace(/&#34/g, '"'),
                            label: item.vcRazSoc
                        };
                    }));
                },
                error: function (xhr, err, thrErr) {
                    MostrarErrorAjax(xhr, err, thrErr);
                }
            });
        },
        focus: function (event, ui) {
            $("#txtEmpresa").val(ui.item.label);
            return false;
        },
        select: function (event, ui) {
            //Selecciono = true;
            $("#txtEmpleado").val(ui.item.label);
            $("#hdfCodEmpresa").val(ui.item.vcCodEmp);
            return false;
        },
        change: function (event, ui) {
            //if (!Selecciono) {
            if (!ui.item) {
                $("#txtEmpresa").val("");
                $("#hdfCodEmpresa").val("");
            }
            return false;
        },
        open: function (event, ui) {
            //Selecciono = false;
            return false;
        }
    })
    .data("autocomplete")._renderItem = function (ul, item) {
        return $("<li></li>")
			.data("item.autocomplete", item)
			.append("<a>" + item.vcCodEmp + "=" + item.label + "</a>")
			.appendTo(ul);
    };

    //$("#txtEmpresa").live("keypress", function (e) {
    //    Selecciono = false;
    //    $("#hdfCodEmpresa").val("");
    //});


    $($("#ddlTipo").data("kendoComboBox").input).attr("readonly", "readonly");
    $($("#ddlSubtipo").data("kendoComboBox").input).attr("readonly", "readonly");

    //    $("#ddlTipo_input").attr("disabled", "disabled");

    //    $("#ddlSubtipo_input").attr("disabled", "disabled");

});
//FIN DE DOCUMENT READY


function obtenerPais() {
    $("#dvCargando").show();
    $.ajax({
        type: "POST",
        url: "Lista_Numero.aspx/ListarPais",
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
                focus: function (event, ui) {
                    $("#txtPais").val(ui.item.label);
                    return false;
                },
                select: function (event, ui) {
                    obtenerCiudad(ui.item.label);
                },
                change: function (event, ui) {
                    if (!ui.item) {
                        $("#txtPais").val('');
                    }
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
        url: "Lista_Numero.aspx/ListarCiudad",
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
                    //$("#txtBuscar").focus();
                    if (editando == 1) {
                        $("#txtNumero").focus();
                    }
                    else {
                        $("#txtBuscar").focus();
                    }
                },
                focus: function (event, ui) {
                    $("#txtCiudad").val(ui.item.label);
                    return false;
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

//BUSCAR NUMEROS
function buscarNumeros() {

    var codPais = $('#txtPais').val();
    var codCiudad = $('#txtCiudad').val();
    var Dato = $('#txtBuscar').val().replace(/'/g, "&#39").replace(/"/g, "&#34");

    if (codPais == "") {
        Mensaje("<br/><h1>Debe elegir un país</h1><br/>", document, cerroMensaje);
        $('#txtPais').focus();
        return;
    }

    if (codCiudad == "") {
        Mensaje("<br/><h1>Debe elegir una ciudad</h1><br/>", document, cerroMensaje);
        $('#txtCiudad').focus();
        return;
    }

    if (Dato == "") {
        Mensaje("<br/><h1>Ingrese dato de busqueda</h1><br/>", document, cerroMensaje);
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
    //function CargarNumeroCol(codPais, codCiudad, Dato, TipoConsulta)
    if (buscando == true) {
        alerta("Se está realizando una busqueda");
        return;
    }
    else {
        buscando = true;
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
                buscando = false;
                if ($(result.d).length > 0) {
                    var i;
                    for (i = 0; i < $(result.d).length; i++) {
                        $("#tbNumeros").jqGrid('addRowData', result.d[i].NUME_P_vcNUMTEL, result.d[i]);
                    }
                }
                else {
                    Mensaje("<br/><h1>No se encontraron registros</h1><br/>", document, cerroMensaje);
                }
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            }
        });
    }
}


//AGREGAR NUMERO
function agregarNumero() {
    esEditar = false;
    mostrarEditar();
    habilitarAlAgregar();
    limpiarFormularioEditar();
    $("#ddlSubtipo").html('<option value="0">---Seleccione----</option>');
    obtenerPaisInstalacion();
    //$("#txtPais").select();
    //$("#txtPais").focus();
    //setTimeout(function () { fnFocusAgregar() }, 500);
}
//FIN AGREGAR NUMERO

//OBTENER SUBTIPO POR TIPO
function obtenerSubtipo(tipo) {
    if (tipo != "0") {
        $.ajax({
            type: "POST",
            url: "Lista_Numero.aspx/obtenerSubtipo",
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
                //                $("#ddlSubtipo").val(subTip);
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
            }
        });

    }
    else {
        $("#ddlSubtipo").html('<option value="0">---Seleccione----</option>');
        return;
    }

}
//FIN OBTENER SUBTIPO POR TIPO

//EDITAR NUMERO
function editarNumero() {
    //$("#txtRazonSocial").focus();
    esEditar = true;
    var id = $("#tbNumeros").jqGrid('getGridParam', 'selrow');
    if (id) {
        limpiarFormularioEditar();
        mostrarEditar();

        var datos = $("#tbNumeros").jqGrid('getRowData', id);

        var codPais = datos['vcNomPai'] + " (" + datos['NUME_PF_vcCODPAI'] + ")";
        var codCiudad = datos['vcNomCiu'] + " (" + datos['NUME_PF_vcCODCIU'] + ")";
        var numero = datos.NUME_P_vcNUMTEL;
        var miRedPrivada = datos.RedPrivada;
        var descNumero = datos.NUME_vcDESNUM;
        var Monitorear = datos.NUME_btMON;
        var codTipo = datos['NUME_F_tiCODGRUBASDES'];
        subTip = datos['NUME_F_tiCODGRUDES'];
        var empresa = datos['vcRazSoc'];
        var codEmpresa = datos['NUME_F_vcCODEMP'];

        $("#txtPais").val(codPais);
        $("#txtCiudad").val(codCiudad);
        $("#txtNumero").val(numero);
        $("#txtRedPrivada").val(miRedPrivada);
        $("#txtRazonSocial").val(descNumero);
        //$("#ddlTipo").val(codTipo);
        $("#ddlTipo").data("kendoComboBox").value(codTipo);
        $('#ddlTipo').change();
        $("#ddlSubtipo").data("kendoComboBox").value(subTip);
        $('#ddlTipo').change();
        $("#txtEmpresa").val(empresa);
        $("#hdfCodEmpresa").val(codEmpresa);
        //$("#ddlEmpresa").val(codEmpresa);

        if (Monitorear == "true") {
            $("#chkMonitorear").attr("checked", "checked");
        }
        else {
            $("#chkMonitorear").removeAttr("checked");
        }

        inhabilitarAlEditar();

        setTimeout(function () { fnFocus(); }, 500);

    }
    else {
        Mensaje("<br/><h1>Seleccione un Número</h1><br/>", document, cerroMensaje);
    }
}
//FIN EDITAR NUMERO


//GUARDAR
function Guardar() {
    var codPais = $("#txtPais").val();
    var codCiudad = $("#txtCiudad").val();
    var numero = $("#txtNumero").val().replace(/'/g, "&#39").replace(/"/g, "&#34");
    var RedPrivada = $("#txtRedPrivada").val().replace(/'/g, "&#39").replace(/"/g, "&#34");

    var descNumero = $("#txtRazonSocial").val().replace(/'/g, "&#39").replace(/"/g, "&#34");
    var Monitorear = $('#chkMonitorear').is(':checked');
    var codTipo = $("#ddlTipo").val();
    var subTipo = $("#ddlSubtipo").val();
    var codEmpresa = $("#hdfCodEmpresa").val();

    $("#txtNumero").keypress(ValidarSoloNumero);
    $("#txtRazonSocial").keypress(ValidarAlfaNumericoConEspacios);

    if (codPais == "") {
        Mensaje("<br/><h1>Seleccione un País</h1><br/>", document, cerroMensaje);
        $("#txtPais").focus();
        return;
    }

    if (codCiudad == "") {
        Mensaje("<br/><h1>Seleccione una Ciudad</h1><br/>", document, cerroMensaje);
        $("#txtCiudad").focus();
        return;
    }

    if (numero == "") {
        Mensaje("<br/><h1>Ingrese número</h1><br/>", document, cerroMensaje);
        $("#txtNumero").focus();
        return;
    }

    if (descNumero == "") {
        Mensaje("<br/><h1>Ingrese nombre o razón social</h1><br/>", document, cerroMensaje);
        $("#txtRazonSocial").focus();
        return;
    }

    if (codTipo == 0) {
        Mensaje("<br/><h1>Seleccione Tipo</h1><br/>", document, cerroMensaje);
        $("#ddlTipo").focus();
        return;
    }

    if (subTipo == 0) {
        Mensaje("<br/><h1>Seleccione SubTipo</h1><br/>", document, cerroMensaje);
        $("#ddlSubtipo").focus();
        return;
    }


    //// NO ES OBLIGAROTIO INGRESAR EMPRESA (TICKET Error 606:Mantto - Numeros)
    //    if (codEmpresa == "") {
    //        Mensaje("<br/><h1>Seleccione Empresa</h1><br/>", document, cerroMensaje);
    //        $("#txtEmpresa").focus();
    //        return;
    //    }

    $("#dvCargando").show();

    $.ajax({
        type: "POST",
        url: "Lista_Numero.aspx/Guardar",
        data: "{'prCodPais': '" + codPais +
        "', 'prCodCiudad': '" + codCiudad +
        "', 'prNumTelefono': '" + numero +
        "', 'prDescNum': '" + descNumero +
        "', 'prEsMonitoreado': '" + Monitorear +
        "', 'prTipo': '" + codTipo +
        "', 'prSubtipo': '" + subTipo +
        "', 'prCodEmpresa': '" + codEmpresa +
        "', 'esInsertar': '" + esEditar.toString() +
        "', 'prRedPrivada': '" + RedPrivada + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
            $("#dvCargando").hide();            
            if (msg.d == "") {
                if (esEditar) {
                    Mensaje("<br/><h1>Número guardado</h1><br/>", document, ocultarEditar);
                    $("#tbNumeros").jqGrid('clearGridData');
                    habilitarAlAgregar();
                } else {
                    Mensaje("<br/><h1>Número guardado</h1><br/>", document, limpiarFormularioEditar);
                    $("#tbNumeros").jqGrid('clearGridData');
                    habilitarAlAgregar();
                }
                //Mensaje("<br/><h1>Número guardado</h1><br/>", document, ocultarEditar);
                //$("#tbNumeros").jqGrid('clearGridData');                
                //limpiarFormularioEditar()
                ////ocultarEditar();
                //habilitarAlAgregar();                
            }
            else {
                //alerta("Revisar: " + msg.d);
                alerta("El Número ya ha sido registrado anteriormente, no se pudo grabar el registro");
                BloquearPagina(false);
            }
        },
        error: function (xhr, err) {
            $("#dvCargando").hide();
            alerta("Error, Estadow: " + xhr.readyState + "\nEstado: " + xhr.status);
        }
    });
}
//FIN GUARDAR

function cerroMensaje() {

}

//ELIMINAR NUMERO
function eliminar() {
    var id = $("#tbNumeros").jqGrid('getGridParam', 'selrow');
    if (id) {

        var datos = $("#tbNumeros").jqGrid('getRowData', id);

        var numero = datos.NUME_P_vcNUMTEL;
        var btEst = datos.NUME_btEST;

        $('#dialog-eliminar p b').text(numero);
        $("#dialog-eliminar").dialog("open");

    }
    else {
        Mensaje("<br/><h1>Seleccione un Número</h1><br/>", document, cerroMensaje);
    }
}
//FIN ELIMINAR NUMERO



function mostrarEditar() {


    $("#tablaFormulario").hide(300, function () {


        $("#panelMantenimiento").hide();
        $("#panelBusqueda").hide();
        $("#filaBuscar").hide();
        $("#filaBuscar2").hide();
        $("#panelNumeros").hide();

        $("#filaNumero").show();
        editando = 1;
        $("#filaRazonSocial").show();
        //$("#filaMonitorear").show();
        $("#filaTipo").show();
        $("#filaSubTipo").show();
        $("#filaEmpresa").show();
        $("#filaBotones").show();
        $("#filaRedPrivada").show();


        $("#tablaFormulario").show(300);

        //$("#filaRazonSocial").find($("#txtRazonSocial")).focus();

        $("#txtRazonSocial").focus();
    });

}

function ocultarEditar() {

    $("#tablaFormulario").hide(300, function () {

        $("#filaNumero").hide();
        editando = 0;
        $("#filaRazonSocial").hide();
        //$("#filaMonitorear").hide();
        $("#filaTipo").hide();
        $("#filaSubTipo").hide();
        $("#filaEmpresa").hide();
        $("#filaBotones").hide();
        $("#filaRedPrivada").hide();

        $("#panelMantenimiento").show();
        $("#panelBusqueda").show();
        $("#filaBuscar").show();
        $("#filaBuscar2").show();
        $("#panelNumeros").show();

        $("#tablaFormulario").show(300);

        obtenerPaisInstalacion();
        $("#txtCiudad").focus();
    });
}


function limpiarFormularioEditar() {
    $("#txtBuscar").val("");
    //$("#txtPais").val("");
    $("#txtCiudad").val("");
    $("#txtNumero").val("");
    $("#txtRazonSocial").val("");
    $("#ddlTipo").data("kendoComboBox").value("0");
    $("#ddlSubtipo").data("kendoComboBox").value("0");
    $("#txtEmpresa").val("");
}

function inhabilitarAlEditar() {
    $("#txtPais").attr("disabled", true);
    $("#txtCiudad").attr("disabled", true);
    $("#txtNumero").attr("disabled", true);
}

function habilitarAlAgregar() {

    $("#txtPais").removeAttr("disabled");
    $("#txtCiudad").removeAttr("disabled");
    $("#txtNumero").removeAttr("disabled");
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



function fnFocus() {
    $("#txtRazonSocial").focus();
}

function fnFocusAgregar() {
    //$("#txtPais").select();
    $("#txtRazonSocial").focus();
}


function validarEspaciosEnBlancoAlInicio(id) {
    var valor = $("#" + id.toString() + "").val();
    $("#" + id.toString() + "").val($.trim(valor));
}

//function CargarNumeroCol(paramPais, paramCiudad, paramCriterio, paramTipo) {
//    $.ajax({
//        url: "Adm_DistribucionMinutosLinea.aspx/ListarNumero_x_datoColumnas", //PageMethod
//        data: "{'prCodPais': '" + codPais + "'," +
//                   "'prCodCiudad': '" + codCiudad + "'," +
//                   "'prDato': '" + Dato + "'," +
//                   "'prTipoConsulta': '" + TipoConsulta + "'}", //FiltroRegistro
//        dataType: "json",
//        type: "post",
//        contentType: "application/json; charset=utf-8",
//        success: function (result) {
//            colModelLinea = result.d;
//            CargarGrillaLinea();
//        },
//        error: function (xhr, err, thrErr) {
//            MostrarErrorAjax(xhr, err, thrErr);
//        }
//    });
//};

//function CargarGrillaLinea(){
//    var tbNumeros = $("#tbNumeros").jqGrid({
//        datatype: "local",
//        colModel: colModelLinea,
//        sortname: "NUME_P_vcNUMTEL", //Default SortColumn
//        sortorder: "asc", //Default SortOrder.
//        width: "100%",
//        height: "290",
//        rownumbers: true,
//        caption: "Números",
//        ondblClickRow: function () { editarNumero(); },
//        afterInsertRow: function (rowid, aData) {
//            if (aData.NUME_btEST == false) {
//                var colModels = $("#tbNumeros").getGridParam("colModel");
//                for (var i in colModels) {
//                    $("#tbNumeros").jqGrid('setCell', rowid, i, '', { color: 'red' });
//                }
//            }
//        }
//    });
//};