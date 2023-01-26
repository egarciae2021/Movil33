var inModeloDis = "";
var tbEmpleados;
var tbModelos;
var tbPaquetesOrigen;
var oCulturaUsuario;
$(function () {
    oCulturaUsuario = window.parent.parent.oCulturaUsuario;
    var indiceTab = window.parent.tab.tabs("option", "selected");
    $("#AccordionJQ1").accordion("option", "active", 1);

    $(".accordion").accordion({
        collapsible: true,
        autoHeight: false
    });

    tbEmpleados = $("#tbEmpleados").jqGrid({
        sortable: true,
        datatype: CargarGrillaEmpleados,
        colModel: [{ name: 'IdEmpleado', Campo: 'IdEmpleado', label: 'Código', hidden: false, width: 100 },
                   { name: 'vcNom', index: 'vcNom', label: 'Nombre', hidden: false, width: 500 }
        ],
        jsonReader: {
            root: "Items",
            page: "PaginaActual",
            total: "TotalPaginas",
            records: "TotalRegistros",
            repeatitems: true,
            cell: "Row",
            id: "ID"
        },
        pager: "#tbEmpleadoPager",
        loadtext: 'Cargando Empleados...',
        emptyrecords: 'No hay Empleados en el Grupo Empleado',
        pgtext: 'Pág: {0} de {1}', //Paging input control text format.
        rowNum: "10", // PageSize.
        rowList: [10, 20, 30], //Variable PageSize DropDownList. 
        viewrecords: true, //Show the RecordCount in the pager.
        multiselect: false,
        sortname: "vcNom", //sortname: idTabla, //Default SortColumn
        sortorder: "asc", //Default SortOrder.
        width: 710,
        height: "auto",
        rownumbers: true,
        shrinkToFit: false,
        caption: "Empleados"
    });

    tbModelos = $("#tbModelos").jqGrid({
        sortable: true,
        datatype: CargarGrillaModelos,
        colModel: [{ name: 'IdModeloDispositivo', Campo: 'IdModeloDispositivo', label: 'Código', hidden: false, width: 100 },
                        { name: 'vcNom', index: 'vcNom', label: 'Nombre', hidden: false, width: 500 }
        ],
        jsonReader: {
            root: "Items",
            page: "PaginaActual",
            total: "TotalPaginas",
            records: "TotalRegistros",
            repeatitems: true,
            cell: "Row",
            id: "ID"
        },
        pager: "#tbModelosPager",
        loadtext: 'Cargando Modelos Dispositivos...',
        emptyrecords: 'No hay Modelos en el Grupo Empleado',
        pgtext: 'Pág: {0} de {1}', //Paging input control text format.
        rowNum: "10", // PageSize.
        rowList: [10, 20, 30], //Variable PageSize DropDownList. 
        viewrecords: true, //Show the RecordCount in the pager.
        multiselect: false,
        sortname: "vcNom", //sortname: idTabla, //Default SortColumn
        sortorder: "asc", //Default SortOrder.
        width: 710,
        height: "auto",
        rownumbers: true,
        shrinkToFit: false,
        caption: "Modelos Dispositivos"
    });

    tbPaquetesOrigen = $("#tbPaquetes").jqGrid({
        sortable: true,
        datatype: CargarGrillaPaquetes,
        colModel: [
            { name: 'inCodPaqAmp', Campo: 'inCodPaqAmp', label: 'Código', hidden: true, width: 50 },
            { name: 'vcNom', index: 'vcNom', label: 'Nombre', hidden: false, width: 150 },
            { name: 'inCantidad', index: 'inCantidad', label: 'Cantidad', hidden: false, width: 80,
                formatter: function (value, options, rData) {
                    return FormatoNumero(rData[2], oCulturaUsuario, true).toString() + ' ' + rData[5];
                }
            },
            { name: 'dcMonto', index: 'dcMonto', label: 'Monto (' + oCulturaUsuario.Moneda.vcSimMon + ')', hidden: false, width: 80, align: "right",
                formatter: function (value, options, rData) {
                    return FormatoNumero(rData[3], oCulturaUsuario, false);
                }
            },
            { name: 'vcNomTipSer', index: 'vcNomTipSer', label: 'Tipo Servicio', hidden: false, width: 100 },
            { name: 'vcExpEn', index: 'vcExpEn', label: 'Exp En', hidden: true, width: 40 },
            { name: 'vcNomOpe', index: 'vcNomOpe', label: 'Operador', hidden: false, width: 120 },
            { name: 'vcNomSer', index: 'vcNomSer', label: 'Servicio', hidden: false, width: 100 }
        ],
        jsonReader: {
            root: "Items",
            page: "PaginaActual",
            total: "TotalPaginas",
            records: "TotalRegistros",
            repeatitems: true,
            cell: "Row",
            id: "ID"
        },
        pager: "#tbPaquetesPager",
        loadtext: 'Cargando Paquetes de Ampliación...',
        emptyrecords: 'No hay Paquetes en el Grupo Empleado',
        pgtext: 'Pág: {0} de {1}', //Paging input control text format.
        rowNum: "10", // PageSize.
        rowList: [10, 20, 30], //Variable PageSize DropDownList. 
        viewrecords: true, //Show the RecordCount in the pager.
        multiselect: false,
        sortname: "vcNom", //sortname: idTabla, //Default SortColumn
        sortorder: "asc", //Default SortOrder.
        width: 710,
        height: "auto",
        rownumbers: true,
        shrinkToFit: false,
        caption: "Paquetes de Ampliación"
    });

    IniciarPagina();
    $(".btnNormal").button();
    function IniciarPagina() {
        $("#txtNombre").focus().select();
        if ($("#hdfEstado").val() == '') {
            $("#tdEstado").hide();
        }
        else {
            $("#tdEstado").show();
        }
    }

    $("#ddlTipoLin").change(function (event) {
        //EL GRUPO ESTA ASOCIADO CON LAS OPCIONES NUMERO MAXIMO DE DISPOSITIVO Y TIEMPO MINIMO PARA SOLICITAR CAMBIO DE EQUIPO.
        if ($("#hdfEditarTipoLinea").val() == "1") {
            $("#spanGruOri").html($("#txtNombre").val());
            $("#spanDepencia").html("<ul><li>Número máximo de dispositivos.</li><li>Tiempo mínimo para solicitar cambio de equipo.</li></ul>");
            $("#divMsgCambioTipoLinea").dialog({
                title: "Confirmación",
                modal: true,
                buttons: {
                    "Aceptar": function () {
                        $("#ddlTipoLin").val($("#hdfTipoLinea").val());
                        $(this).dialog("close");
                    }
                },
                resizale: false
            });
        }
        //EL GRUPO ESTA ASOCIADO CON LA OPCION NUMERO MAXIMO DE DISPOSITIVO.
        if ($("#hdfEditarTipoLinea").val() == "2") {
            $("#spanGruOri").html($("#txtNombre").val());
            $("#spanDepencia").html("<ul><li>Número máximo de dispositivos.</li></ul>");
            $("#divMsgCambioTipoLinea").dialog({
                title: "Confirmación",
                modal: true,
                buttons: {
                    "Aceptar": function () {
                        $("#ddlTipoLin").val($("#hdfTipoLinea").val());
                        $(this).dialog("close");
                    }
                },
                resizale: false
            });
        }
        //EL GRUPO ESTA ASOCIADO CON LA OPCION TIEMPO MINIMO PARA SOLICITAR CAMBIO DE EQUIPO.
        if ($("#hdfEditarTipoLinea").val() == "3") {
            $("#spanGruOri").html($("#txtNombre").val());
            $("#spanDepencia").html("<ul><li>Tiempo mínimo para solicitar cambio de equipo.</li></ul>");
            $("#divMsgCambioTipoLinea").dialog({
                title: "Confirmación",
                modal: true,
                buttons: {
                    "Aceptar": function () {
                        $("#ddlTipoLin").val($("#hdfTipoLinea").val());
                        $(this).dialog("close");
                    }
                },
                resizale: false
            });
        }

    });

    $("#txtBuscarModelos").keypress(function (e) {
        if (e.keyCode == 13) {
            $("#tbModelos").trigger("reloadGrid");
        } else {
            return ValidarAlfaNumericoConEspacios(e);
        }
    });
    $("#txtBuscarEmpleado").keypress(function (e) {
        if (e.keyCode == 13) {
            $('#tbEmpleados').setGridParam({ page: 1 });
            $("#tbEmpleados").trigger("reloadGrid");
        } else {
            return ValidarAlfaNumericoConEspacios(e);
        }
    });
    $("#txtBuscarPaquete").keypress(function (e) {
        if (e.keyCode == 13) {
            $('#tbPaquetes').setGridParam({ page: 1 });
            $("#tbPaquetes").trigger("reloadGrid");
        } else {
            return ValidarAlfaNumericoConEspacios(e);
        }
    });

    $("#btnBusquedaModelos").live("click", function () {
        $("#tbModelos").trigger("reloadGrid");
    });
    $("#btnBusquedaEmpleado").live("click", function () {
        $('#tbEmpleados').setGridParam({ page: 1 });
        $("#tbEmpleados").trigger("reloadGrid");
    });
    $("#btnBusquedaPaquete").live("click", function () {
        $('#tbPaquetes').setGridParam({ page: 1 });
        $("#tbPaquetes").trigger("reloadGrid");
    });

    $("#btnAgregarModelo").live("click", function () {
        $("#bpBusquedaModelos_imgBusqueda").click();
    });
    $("#btnAgregar").live("click", function () {
        $("#bpBusquedaEmpleados_imgBusqueda").click();
    });
    $("#btnAgregarPaquetes").live("click", function () {
        $("#bpBusquedaPaquetes_imgBusqueda").click();
    });

    $("#btnEliminarModelo").live("click", function () {
        var inCodModelo = tbModelos.getGridParam('selrow');
        if (tbModelos.getGridParam('selrow')) {
            $('#divMsgConfirmacioDeleteModelo').dialog({
                title: "Remover Modelo Dispositivo",
                modal: true,
                buttons: {
                    "Si": function () {
                        //tbModelos.delRowData(tbModelos.getGridParam('selrow'));
                        //$(this).dialog("close");
                        $(this).dialog("close");
                        ProcesarModelosDis($("#hdfGrupoOrigen").val(), inCodModelo, false);

                    },
                    "Cancelar": function () {
                        $(this).dialog("close");
                    }
                },
                resizable: false
            });
        } else {
            alerta("Debe seleccionar un Modelo de Dispositivo.");
        }
    });
    $("#btnEliminar").live("click", function () {
        var inCodEmpleado = tbEmpleados.getGridParam('selrow');
        if (tbEmpleados.getGridParam('selrow')) {
            $('#divMsgConfirmacioDeleteEmpleado').dialog({
                title: "Remover Empleado",
                modal: true,
                buttons: {
                    "Si": function () {
                        $(this).dialog("close");
                        ProcesarEmpleados($("#hdfGrupoOrigen").val(), inCodEmpleado, $("#ddlTipoLin").val(), false);
                    },
                    "Cancelar": function () {
                        $(this).dialog("close");
                    }
                },
                resizable: false
            });
        } else {
            alerta("Debe seleccionar un Empleado.");
        }
    });
    $("#btnEliminarPaquetes").live("click", function () {
        var vPaquete = tbPaquetesOrigen.getGridParam('selrow');
        if (tbPaquetesOrigen.getGridParam('selrow')) {
            $('#divMsgConfirmacionDeletePaquete').dialog({
                title: "Remover Paquete de Ampliación",
                modal: true,
                buttons: {
                    "Si": function () {
                        $(this).dialog("close");
                        ProcesarPaquetes($("#hdfGrupoOrigen").val(), vPaquete, false);
                    },
                    "Cancelar": function () {
                        $(this).dialog("close");
                    }
                },
                resizable: false
            });
        } else {
            alerta("Debe seleccionar un Paquete de Ampliación.");
        }
    });

    //Agregado por Mauricio Benavides 12/07/2013
    $("#chActivo").bind('change', function () {
        if ($(this).is(":checked")) {
            $("#hdfEstadoGruOri").val("1");
        }
        else {
            $("#hdfEstadoGruOri").val("0");
        }
    });

    $("#btnGuardar").live("click", function () {
        var Codigo = $("#txtCodigo").val().replace(/'/g, "&#39").replace(/"/g, "&#34").replace(/\\/g, "&#92");
        var Nombre = $("#txtNombre").val().replace(/'/g, "&#39").replace(/"/g, "&#34").replace(/\\/g, "&#92");
        var Estado = $("#hdfEstadoGruOri").val();
        var inTipLin = $("#ddlTipoLin").val();
        /*if (Codigo == "") {
        alerta("El codigo es un campo obligatorio");
        $("#txtCodigo").focus();
        return;
        }*/

        if ($.trim(Nombre) == "") {
            alerta("El nombre es un campo obligatorio");
            $("#txtNombre").focus();
            return;
        }
        if (inTipLin == '-1') {
            alerta("Seleccione un tipo de linea");
            return;
        }
        $("#dvCargando").show();

        var lstIdEmpleado = tbEmpleados.getDataIDs();

        $.ajax({
            type: "POST",
            url: "Mnt_GrupoOrigen.aspx/Guardar",
            data: "{'Codigo': '" + Codigo + "', 'Nombre': '" + $.trim(Nombre) + "', 'inCodEst': '" + $("#hdfEstado").val() + "', 'estado':'" + $("#hdfEstadoGruOri").val() + "', 'vcCodEmpleado':'" + lstIdEmpleado.toString() + "', 'inTipLinAnt':'" + $("#hdfTipoLineaAnterior").val() + "', 'inTipLin':'" + inTipLin + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (msg) {
                $("#dvCargando").hide();
                if (msg.d == "0") {
                    window.parent.ActualizarGrilla();
                    Mensaje("<br/><h1>Grupo de Empleado guardado</h1><br/>", document, CerroMensaje);
                }
                else {
                    //alerta("Revisar: " + msg.d);
                    alerta("Ya existe un grupo de empleado con el mismo nombre.");
                }
            },
            error: function (xhr, err) {
                $("#dvCargando").hide();
                alerta("Error, Estadow: " + xhr.readyState + "\nEstado: " + xhr.status);
            }
        });
    });

    var indiceTab = window.parent.tab.tabs("option", "selected");
    function CerroMensaje() {
        if ($("#hdfEstado").val() == "") {
            $("#txtCodigo").val("");
            $("#txtNombre").val("");
            $("#txtNombre").focus();
            $("#ddlTipoLin").val(-1);
            $("#tbAgregarModelos").hide();
            $("#tbAgregarEmpleados").hide();
            $("#dvMensajeModelos").show();
            $("#dvMensajeEmpleados").show();
        }
        else {
            //window.parent.location.reload();
            window.parent.tab.tabs("remove", indiceTab);
        }
        //window.parent.location.reload();
    }

    $("#btnCerrar").live("click", function () {
        window.parent.tab.tabs("remove", indiceTab);
    });
});


function fnMostrarCodigoModelos(valor) {
    ProcesarModelosDis($("#hdfGrupoOrigen").val(), valor, true);
}

function ProcesarModelosDis(inCodGrupoOrigen, inCodModelo, esAdd) {
    $.ajax({
        type: "POST",
        url: "Mnt_GrupoOrigen.aspx/ProcesarModeloGrupoOrigen",
        data: "{ 'p_inCodGrupoOrigen':'" + inCodGrupoOrigen + "', 'p_inCodModeloDispositivo':'" + inCodModelo + "', 'esAdd':'" + esAdd + "' }",
        dateType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            var textResultado = '';
            if (esAdd) {
                if (result.d == '1') {
                    textResultado = "Modelo Dispositivo agregado.";
                } else {
                    //textResultado = "Modelo Dispositivo ya pertenece al Grupo Empleado";
                    alerta("Modelo Dispositivo ya pertenece al Grupo Empleado");
                    return;
                }
            } else {
                if (result.d == '1') {
                    textResultado = "Modelo Dispositivo eliminado.";
                } else if (result.d == "0") {
                    //textResultado = "Modelo Dispositivo no pertence al Grupo Empleado.";
                    alerta("Modelo Dispositivo no pertence al Grupo Empleado.");
                    return;
                }
            }
            tbModelos.trigger("reloadGrid");
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
}

function fnMostrarCodigoEmpleado(valor) {
    ProcesarEmpleados($("#hdfGrupoOrigen").val(), valor, $("#ddlTipoLin").val(), true);
}

function ProcesarEmpleados(inCodGrupoOrigen, vcCodEmpleados, inIdTipLin, esAdd) {
    $.ajax({
        type: "POST",
        url: "Mnt_GrupoOrigen.aspx/ProcesarEmpleadosGrupoOrigen",
        data: JSON.stringify({
            p_inCodGrupoOrigen: inCodGrupoOrigen,
            p_vcCodEmpleado: vcCodEmpleados,
            p_inIdTipLin: inIdTipLin,
            esAdd: esAdd
        }),
        dateType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            var textResultado = '';
            if (esAdd) {
                if (result.d == '1') {
                    textResultado = "Empleado agregado.";
                } else {
                    textResultado = "Empleado ya pertenece al Grupo Empleado";
                    alerta(textResultado);
                }
            } else {
                if (result.d == '1') {
                    textResultado = "Empleado eliminado.";
                } else if (result.d == "0") {
                    textResultado = "Empleado no pertence al Grupo Empleado.";
                    alerta(textResultado);
                }
            }
            tbEmpleados.trigger("reloadGrid");
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
}

function CargarGrillaEmpleados() {
    var idGrupoOrigen = $("#hdfGrupoOrigen").val();
    var inPagTam = $("#tbEmpleados").getGridParam("rowNum");
    var inPagAct = $("#tbEmpleados").getGridParam("page");
    var vcFiltro = $("#txtBuscarEmpleado").val().replace(/'/g, "&#39").replace(/"/g, "&#34").replace(/\\/g, "&#92");
    var idTipoLin = $("#ddlTipoLin").val();
    if (idGrupoOrigen == '') {
        return;
    }
    $.ajax({
        type: "POST",
        url: "Mnt_GrupoOrigen.aspx/ObtenerEmpleados_GrupoOrigen",
        data: "{'pIdGrupoOrigen': '" + idGrupoOrigen + "', 'inPagTam':'" + inPagTam +
                "', 'inPagAct':'" + inPagAct + "', 'pidTipoLin':'" + idTipoLin + "', 'vcFiltro':'" + vcFiltro + "' }",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            var lstEmpleados = result.d;
            $("#tbEmpleados")[0].addJSONData(lstEmpleados);
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
}

function CargarGrillaModelos() {
    var idGrupoOrigen = $("#hdfGrupoOrigen").val();
    var inPagTam = $("#tbModelos").getGridParam("rowNum");
    var inPagAct = $("#tbModelos").getGridParam("page");
    var vcFiltro = $("#txtBuscarModelos").val().replace(/'/g, "&#39").replace(/"/g, "&#34").replace(/\\/g, "&#92");
    if (idGrupoOrigen == '') {
        return;
    }
    $.ajax({
        type: "POST",
        url: "Mnt_GrupoOrigen.aspx/ObtenerModelos_GrupoOrigen",
        data: "{'pIdGrupoOrigen': '" + idGrupoOrigen + "', 'inPagTam':'" + inPagTam +
                "', 'inPagAct':'" + inPagAct +  "', 'vcFiltro':'" + vcFiltro + "' }",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            var lstModelos = result.d;
            $("#tbModelos")[0].addJSONData(lstModelos);
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
}

//paquetes de ampliacion
function fnMostrarCodigoPaquete(valor) {
    ProcesarPaquetes($("#hdfGrupoOrigen").val(), valor, true);
}

function CargarGrillaPaquetes() {
    var idGrupoOrigen = $("#hdfGrupoOrigen").val();
    var inPagTam = $("#tbPaquetes").getGridParam("rowNum");
    var inPagAct = $("#tbPaquetes").getGridParam("page");
    var vcFiltro = $("#txtBuscarPaquete").val().replace(/'/g, "&#39").replace(/"/g, "&#34").replace(/\\/g, "&#92");
    if (idGrupoOrigen == '') {
        return;
    }
    var ObtenerPaquetesAmpliacion_Data = { pIdGrupoOrigen: idGrupoOrigen,
        inPagTam: inPagTam,
        inPagAct: inPagAct,
        vcFiltro: vcFiltro
    };

    $.ajax({
        type: "POST",
        url: "Mnt_GrupoOrigen.aspx/ObtenerPaquetesAmpliacion",
        data: JSON.stringify(ObtenerPaquetesAmpliacion_Data),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            var lstModelos = result.d;
            $("#tbPaquetes")[0].addJSONData(lstModelos);
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
}

function ProcesarPaquetes(inCodGrupoOrigen, inCodPaqAmp, esAdd) {
    var ProcesarPaqueteAmpliacion_Data = {
        p_inCodGrupoOrigen: inCodGrupoOrigen,
        p_inCodPaqAmp: inCodPaqAmp,
        esAdd: esAdd
    };
    $.ajax({
        type: "POST",
        url: "Mnt_GrupoOrigen.aspx/ProcesarPaqueteAmpliacion",
        data: JSON.stringify(ProcesarPaqueteAmpliacion_Data),
        dateType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            var textResultado = '';
            if (esAdd) {
                if (result.d == '1') {
                    textResultado = "Paquete de Ampliación agregado.";
                } else if (result.d == '-1') {
                    textResultado = "Paquete de Ampliación ya pertenece al Grupo Empleado";
                    alerta(textResultado);
                } else if (result.d == '-2') {
                    textResultado = "No se puede encontrar el Paquete de Ampliación seleccionado";
                    alerta(textResultado);
                } else {
                    textResultado = "No se pudo completar la acción";
                    alerta(textResultado);
                }
            } else {
                if (result.d == '1') {
                    textResultado = "Paquete de Ampliación eliminado.";
                } else if (result.d == "-1") {
                    textResultado = "Paquete de Ampliación no pertence al Grupo Empleado.";
                    alerta(textResultado);
                } else {
                    textResultado = "No se pudo completar la acción";
                    alerta(textResultado);
                }
            }
            tbPaquetesOrigen.trigger("reloadGrid");
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
}
