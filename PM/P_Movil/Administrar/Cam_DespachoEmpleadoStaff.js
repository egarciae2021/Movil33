/*global _comma_separated_list_of_variables_*/
var TipoLineaStaff = "1";
var IdCampanaSeleccionada = -1;
var arFechasReporte = [];

var AsignarSerie = 1;  //0=Numero de serie no obligatorios, 1=Asigna un numero de seie a los dispositivos despachados
var bDespachoRenovacion = false;
var tbPedido = null;
var j = 0;
var lstPedidos;
var idSetIntervalPedidos;
var RegistroAnterior = null;
var RegistroActual = null;
var IdEmpleadoSeleccionado = "";
var IdOficinaSeleccionada = "";
//var colorNoHabilitadoTipo = "#E45E74";
var colorNoHabilitadoTipo = "#EB8A9A";
var colorDespachado = "#6AEE80";
var colorNoHabilitadoFecha = "#FFA87F";
var colorNoCorte = "#E4FF87";
var colorListoDespacho = "#FFFFFF";
var colorNoProcesadasError = "#EB8A9A";
var v_IMEI;
var v_Linea;
var biMultiselect;
var lstIdsPorDes = [];
var Selecciono = false;
var v_biLoadAtenciones = false;
var LineaSeleccionada = "";
var SolicitudSeleccionada = "";
var TituloValeResguardo = "";
var CarpetaDominio = '';

function fnMostrarOficina(Id) {
    IdOficinaSeleccionada = Id;
    CargarPedidos("", Id);

    if (Id != "") {
        $("#dvImportacion").show();
    } else {
        $("#dvImportacion").hide();
    }
}
function fnMostrarEmpleado(Id) {
    IdEmpleadoSeleccionado = Id;

    if (Id != "") {
        $('#chkMarcarTodos').attr('checked', false);
        $('#chkListoDespacho').attr('checked', true);
        $('#chkYaDespacho').attr('checked', true);
        $('#chkNoFechaDespacho').attr('checked', true);
        $('#chkNoEnviadoOperador').attr('checked', true);
        $('#chkBajaRenovacionSinEquipo').attr('checked', false);
    }
    if ($("#hdfidAtencion").val() == "") {
        CargarPedidos(Id, "");
    }
}

function CargarNombreArchivo(Archivo, RutaCompleta) {
    $("#hdfArchivo").val(Archivo);
    $("#hdfRutaCompleta").val(RutaCompleta);
    $("#lblArchivoCargado").html(Archivo);

    //            SatisfactoriaCargarArchivo("2");

    //var Metodo = raiz("P_Movil/Administrar/Cam_DespachoEmpleado.aspx/CargarArchivo");
    var Metodo = "Cam_DespachoEmpleado.aspx/CargarArchivo";
    var Data = {
        Operador: $("#ddlOperador").val(), //Serializa JSON MODELO
        Campana: IdCampanaSeleccionada, //Serializa JSON MODELO
        pruta: RutaCompleta, //Serializa JSON MODELO
        LineaTipo: TipoLineaStaff,
        IdOficina: IdOficinaSeleccionada //Serializa JSON MODELO
    };

    MetodoWeb(Metodo, JSON.stringify(Data), SatisfactoriaCargarArchivo);

    //window.parent.ActualizarGrilla();
    //HabilitarCerrar(false);
}

function SatisfactoriaCargarArchivo(result) {
    if (result.page != undefined) {
        return;
    }
    var inSeparador = result.indexOf("---");
    var inFilasOmitidas = result.substring(result.indexOf("---") + 3);

    if (inFilasOmitidas != "" && inFilasOmitidas != "0") {
        if (inFilasOmitidas == "1") {
            alerta("Hubo una fila que fue omitida ya sea porque: era de baja o renovación sin equipo, ya había sido despachada o aun no había sido enviada al operador.");
        }
        else {
            alerta("Hubieron " + inFilasOmitidas + " filas que fueron omitidas ya sea porque 1 o más eran de baja o renovación sin equipo, ya habían sido despachadas o aun no habían sido enviadas al operador.");
        }
    }

    $("#hdfIdOficinaTemp").val(result.substring(0, result.indexOf("---")));

    $("#bpOficina_txtValorBusqueda").attr('disabled', 'disabled');
    $("#bpOficina_btnBuscar").attr('disabled', 'disabled');

    $(".chkMarcarTodos").css('display', 'none');
    $(".chkListoDespacho").css('display', 'none');
    $(".chkYaDespacho").css('display', 'none');
    $(".chkNoFechaDespacho").css('display', 'none');
    $(".chkNoEnviadoOperador").css('display', 'none');
    $(".chkBajaRenovacionSinEquipo").css('display', 'none');
    $("#dvPedidosInicial").hide();

    $(".chkNoProcesadasError").css('display', '');
    $("#dvPedidosImportacion").show();

    $("#btnGuardar").show();

    fnCargarImportacion();
}

function fnLimpiar() {
    $("#bpEmpleado_txtValorBusqueda").val("");
    $("#bpOficina_txtValorBusqueda").val("");
    $(".dvFamilia").hide();

    $("#dvImportacion").hide();
    //$("#ddlOperador").prop("disabled", true);
    //            $("#ddlCampana").prop("disabled", false);
    $("#bpOficina_txtValorBusqueda").attr('disabled', false);
    $("#bpOficina_btnBuscar").attr('disabled', false);

    $(".chkMarcarTodos").css('display', '');
    $(".chkListoDespacho").css('display', '');
    $(".chkYaDespacho").css('display', '');
    $(".chkNoFechaDespacho").css('display', '');
    $(".chkNoEnviadoOperador").css('display', '');
    $(".chkBajaRenovacionSinEquipo").css('display', '');

    $("#dvPedidosInicial").show();
    $(".chkNoProcesadasError").css('display', 'none');
    $("#dvPedidosImportacion").hide();

    if ($("#dvOficina").length > 0) {
        $("#btnGuardar").hide();
    }

    //var Metodo = raiz("P_Movil/Administrar/Cam_DespachoEmpleado.aspx/LimpiarOficinaTemp");
    var Metodo = "Cam_DespachoEmpleado.aspx/LimpiarOficinaTemp";
    var Data = {};
    MetodoWeb(Metodo, JSON.stringify(Data));

    CargarPedidos("", "");
}

function CargarPedidos(IdEmpleado, IdOficina) {
    RegistroAnterior = null;
    RegistroActual = null;

    $("#tbPedido").jqGrid('clearGridData');
    if ((IdEmpleado == "" && IdOficina == "") || //No se elige oficina o empleado
                (TipoLineaStaff == "-1" || //STAFF
                (TipoLineaStaff == "2" && $("#ddlTipoSolicitudFamilia").val() == "-1") || //Familia Solicitud
                (TipoLineaStaff == "2" && $("#ddlTipoSolicitudFamilia").val() == "2" && IdCampanaSeleccionada == "-1"))) {//Familia Pedidos

        $("#dvDespachos").hide();
        $("#dvPedidos").hide();

        //                IdEmpleadoSeleccionado = "";
        //                IdOficinaSeleccionada = "";
        //                $("#bpEmpleado_txtValorBusqueda").val("");
        //                $("#bpOficina_txtValorBusqueda").val("");
    }
    else {
        $("#dvDespachos").show();
        $("#dvPedidos").show();
        //var Metodo = raiz("P_Movil/Administrar/Cam_DespachoEmpleado.aspx/TraerModeloGrilla");
        var Metodo = "Cam_DespachoEmpleado.aspx/TraerModeloGrilla";
        var Data = {
            IdEmpleado: IdEmpleado, //Serializa JSON MODELO
            IdOficina: IdOficina, //Serializa JSON MODELO
            IdOperador: $("#ddlOperador").val(),
            IdCampana: IdCampanaSeleccionada,
            IdTipoLinea: TipoLineaStaff//,
            //                    ListoDespacho: $('#chkListoDespacho').is(':checked'),
            //                    YaDespacho: $('#chkYaDespacho').is(':checked'),
            //                    NoFechaDespacho: $('#chkNoFechaDespacho').is(':checked'),
            //                    NoEnviadoOperador: $('#chkNoEnviadoOperador').is(':checked'),
            //                    BajaRenovacionSinEquipo: $('#chkBajaRenovacionSinEquipo').is(':checked')
        };
        MetodoWeb(Metodo, JSON.stringify(Data), CargarGrilla, ErrorCargarPedidos);
    }
}

function SatisfactoriaCargarPedidos(Pedidos) {
    $("#lblMensaje").hide();
    $("#lblMensaje").html("");
    $("#dvPedidos").show();
    if (Pedidos.Items.length > 0) {
        $("#tbPedido").jqGrid('clearGridData');

        //$("#tbPedido").setGridParam({ rowNum: Pedidos.Items.length }).trigger("reloadGrid");
        if ($("#dvOficina").length == 0) {
            $("#tbPedido").setGridParam({ rowNum: Pedidos.Items.length });
        }
        j = 0;
        lstPedidos = Pedidos.Items;
        idSetIntervalPedidos = setInterval(function () {
            $("#tbPedido").jqGrid('clearGridData');
            var jfin = j + 3;
            for (j = 0; j < jfin; j++) {
                if (j == $(lstPedidos).length) {
                    clearInterval(idSetIntervalPedidos);
                    break;
                }
                else {
                    $("#tbPedido").jqGrid('addRowData', lstPedidos[j].ID, lstPedidos[j].Row);
                }
            }
        }, 1);
    }
    else {
        $("#dvPedidos").hide();
        $("#lblMensaje").show();
        //                if ($("#dvUsuario").length > 0)
        $("#lblMensaje").html("No hay equipos por despachar para los criterios seleccionados");
        //                else 
        //                    $("#lblMensaje").html("No hay ninguna campaña con pedidos pendientes para dicha oficina");                
    }
}
function ErrorCargarPedidos() {
}

function fnCargarImportacion() {
    //var Metodo = raiz("P_Movil/Administrar/Cam_DespachoEmpleado.aspx/TraerModeloGrillaImportacion");
    var Metodo = "Cam_DespachoEmpleado.aspx/TraerModeloGrillaImportacion";
    var Data = {
        IdOficinaTemp: $("#hdfIdOficinaTemp").val() //Serializa JSON MODELO
    };
    MetodoWeb(Metodo, JSON.stringify(Data), CargarGrillaImportacion, ErrorCargarImportacion);
}
function CargarGrillaImportacion(oColModelPedido) {
    if ($("#dvOficina").length > 0) {
        tbImportacion = JQGrid("#tbImportacion", "#tbImportacionPaginado", CargarGrillaDataImportacion, oColModelPedido, 725, 320, "rowId", false, null, null, fnDespuesInsercion_Imp,
                                null, true, [20, 35, 50]);
        //SeleccionoPedido, AgregoFilaPedido, AntesSeleccionPedido, true, [20, 35, 50]); //725, 320
        CargarGrillaDataImportacion();
        $.extend($("#tbImportacion").nav, { edit: false, add: false, del: false, refreshstate: 'current' });
    }
    Dimensionar();
}
function fnDespuesInsercion_Imp(rowid, data, rowelem) {
    var colModels = $("#tbImportacion").getGridParam("colModel");
    if (data.Procesado == 'NO') {
        var i;
        for (i in colModels) {
            $("#tbImportacion").jqGrid('setCell', rowid, i, '', { 'background-color': colorNoProcesadasError, 'color': 'black', 'border-color': '#a6c9e2' });
        }
    }
}
function ErrorCargarImportacion() {
}
function CargarGrillaDataImportacion() {
    var Metodo = "Cam_DespachoEmpleado.aspx/ListarGrillaImportacion";
    var Data = {
        inPagTam: $('#tbImportacion').getGridParam("rowNum"), //Serializa JSON MODELO
        inPagAct: $('#tbImportacion').getGridParam("page"),
        IdOficinaTemp: $("#hdfIdOficinaTemp").val() //Serializa JSON MODELO
    };
    MetodoWeb(Metodo, JSON.stringify(Data), SatisfactoriaCargarGrillaDataImportacion);
}
function SatisfactoriaCargarGrillaDataImportacion(lstDespacho) {
    if ($("#dvOficina").length > 0) {
        $("#tbImportacion")[0].addJSONData(lstDespacho);
    }
}

function CargarGrillaData() {
    var Metodo = "Cam_DespachoEmpleado.aspx/ListarGrilla";
    var Data = {
        inPagTam: $('#tbPedido').getGridParam("rowNum"), //Serializa JSON MODELO
        inPagAct: $('#tbPedido').getGridParam("page"), //Serializa JSON MODELO
        ListoDespacho: $('#chkListoDespacho').is(':checked'),
        YaDespacho: $('#chkYaDespacho').is(':checked'),
        NoFechaDespacho: $('#chkNoFechaDespacho').is(':checked'),
        NoEnviadoOperador: $('#chkNoEnviadoOperador').is(':checked'),
        BajaRenovacionSinEquipo: $('#chkBajaRenovacionSinEquipo').is(':checked'),
        EsEmpleado: ($("#dvOficina").length > 0 ? false : true)
    };
    MetodoWeb(Metodo, JSON.stringify(Data), SatisfactoriaCargarGrillaData);
}

function SatisfactoriaCargarGrillaData(lstDespacho) {
    if ($("#dvOficina").length > 0) {
        $("#tbPedido")[0].addJSONData(lstDespacho);
    }
    else {
        SatisfactoriaCargarPedidos(lstDespacho);
        //            if (lstDespacho.Items.length > 0) {
        //                $("#tbPedido")[0].addJSONData(lstDespacho);
        //                $("#tbPedido").jqGrid('clearGridData');
        //                if (tbPedido == null)
        //                    $("#tbPedido").GridDestroy();
        //                CargarGrilla(Pedidos["oColModelPedido"]);
        //            }
        //            else {
        //                $("#dvPedidos").hide();
        //                $("#lblMensaje").show();
        //                if ($("#dvUsuario").length > 0)
        //                    $("#lblMensaje").html("No hay ninguna campaña con pedidos pendientes para dicho empleado");
        //                else
        //                    $("#lblMensaje").html("No hay ninguna campaña con pedidos pendientes para dicha oficina");
        //            }
    }
}

function CargarGrilla(oColModelPedido) {
    $("#lblMensaje").hide();
    $("#lblMensaje").html("");
    //            $("#txtBuscador").hide();

    if (tbPedido != null) {
        $("#tbPedido").GridUnload();
    }

    if ($("#dvOficina").length > 0) {
        tbPedido = JQGrid("#tbPedido", "#tbPedidoPaginado", CargarGrillaData, oColModelPedido, 725, 320, "rowId", false, null, SeleccionoPedido, AgregoFilaPedido, AntesSeleccionPedido, true, [20, 35, 50]); //725, 320
    }
    else {
        tbPedido = JQGrid("#tbPedido", "#tbPedidoPaginado", "local", oColModelPedido, 725, 320, "rowId", true, null, SeleccionoPedido, AgregoFilaPedido, AntesSeleccionPedido, true, [20, 35, 50]); //725, 320
        CargarGrillaData();
    }

    $("#tbPedido").jqGrid('setGridParam', { onSelectAll: function (aRowids, status) { SeleccionoTodosPedidos(aRowids, status); } });

    $.extend($("#tbPedido").nav, { edit: false, add: false, del: false, refreshstate: 'current' });

    Dimensionar();
    $("#cb_tbPedido").hide();
}

function Dimensionar() {
    if (tbPedido != null) {
        var Ancho = $(window).width(); //743
        var Alto = $(window).height(); //354
        if (Ancho < 743) {
            Ancho = 743;
        }
        if (Alto < 450) {
            Alto = 450;
        }
        $("#tbPedido").setGridWidth(Ancho - 18); //Ancho - 18
        $("#tbPedido").setGridHeight(Alto - 258); //Alto - 258 - 310
        $("#tbImportacion").setGridWidth(Ancho - 18); //Ancho - 18
        $("#tbImportacion").setGridHeight(Alto - 310); //Alto - 258
    }
}
function AntesSeleccionPedido(rowid, e) {
    return false;
}

function AgregoFilaPedido(rowid, data, rowelem) {
    var colModels = $("#tbPedido").getGridParam("colModel");
    var i;
    if (TipoLineaStaff == 2) { //formato grilla familia
        if (data.Producto2 == '' || data.FechaDespacho != '' || data.EnviadoOperador == 'NO' || data.IdEstado == "31") {
            $("#jqg_tbPedido_" + rowid.toString()).hide();

            //                for (var i in colModels) {
            //                    if (data.Producto2 == '' && $('#chkBajaRenovacionSinEquipo').is(':checked'))
            //                        $("#tbPedido").jqGrid('setCell', rowid, i, '', { 'background-color': colorNoHabilitadoTipo, 'color': 'black', 'border-color': '#a6c9e2' });
            //                    else if (data.FechaDespacho != '' && $('#chkYaDespacho').is(':checked'))
            //                        $("#tbPedido").jqGrid('setCell', rowid, i, '', { 'background-color': colorDespachado, 'color': 'black', 'border-color': '#a6c9e2' });
            //                    else if (data.IdCorte == '' && $('#chkNoEnviadoOperador').is(':checked'))
            //                        $("#tbPedido").jqGrid('setCell', rowid, i, '', { 'background-color': colorNoCorte, 'color': 'black', 'border-color': '#a6c9e2' });
            //                    else if (data.DiasRecojo < 0 && $('#chkNoFechaDespacho').is(':checked'))
            //                        $("#tbPedido").jqGrid('setCell', rowid, i, '', { 'background-color': colorNoHabilitadoFecha, 'color': 'black', 'border-color': '#a6c9e2' });
            //                    $('#' + rowid).removeClass('ui-state-highlight');
            //                }

            if (data.Producto2 == '' && $('#chkBajaRenovacionSinEquipo').is(':checked')) {
                for (i in colModels) {
                    $("#tbPedido").jqGrid('setCell', rowid, i, '', { 'background-color': colorNoHabilitadoTipo, 'color': 'black', 'border-color': '#a6c9e2' });
                }
            }
            else if ((data.FechaDespacho != '' || data.IdEstado == "31") && $('#chkYaDespacho').is(':checked')) {
                for (i in colModels) {
                    $("#tbPedido").jqGrid('setCell', rowid, i, '', { 'background-color': colorDespachado, 'color': 'black', 'border-color': '#a6c9e2' });
                }
            }
            else if (data.EnviadoOperador == 'NO' && $('#chkNoEnviadoOperador').is(':checked')) {
                for (i in colModels) {
                    $("#tbPedido").jqGrid('setCell', rowid, i, '', { 'background-color': colorNoCorte, 'color': 'black', 'border-color': '#a6c9e2' });
                }
            }
                //                else if (data.DiasRecojo < 0 && $('#chkNoFechaDespacho').is(':checked')){
                //                    for (var i in colModels) {
                //                        $("#tbPedido").jqGrid('setCell', rowid, i, '', { 'background-color': colorNoHabilitadoFecha, 'color': 'black', 'border-color': '#a6c9e2' });
                //                    }
                //                }
            else if (data.Despachado == "SI") {
                for (i in colModels) {
                    $("#tbPedido").jqGrid('setCell', rowid, i, '', { 'background-color': colorDespachado, 'color': 'black', 'border-color': '#a6c9e2' });
                }
            }
            $('#' + rowid).removeClass('ui-state-highlight');
        } else if (data.DiasRecojo < 0 && $('#chkNoFechaDespacho').is(':checked')) {
            for (i in colModels) {
                $("#tbPedido").jqGrid('setCell', rowid, i, '', { 'background-color': colorNoHabilitadoFecha, 'color': 'black', 'border-color': '#a6c9e2' });
            }
        }
    } else if (TipoLineaStaff == 1) { //formato grilla staff
        if ((data.FechaDespacho != '' || data.Despachado == "SI") && $('#chkYaDespacho').is(':checked')) {
            $("#jqg_tbPedido_" + rowid.toString()).hide();
            for (i in colModels) {
                $("#tbPedido").jqGrid('setCell', rowid, i, '', { 'background-color': colorDespachado, 'color': 'black', 'border-color': '#a6c9e2' });
            }
        } else if ((data.FechaDespacho == '' || data.Despachado == "NO") && data.EstadoDipAsig == 61) { //equipo en reparacion (no reingresado)
            $("#jg_tbPedido_" + rowid.toString()).hide();
            for (i in colModels) {
                $("#tbPedido").jqGrid('setCell', rowid, i, '', { 'background-color': colorNoHabilitadoTipo, 'color': 'black', 'border-color': '#a6c9e2' });
            }
        } else if ((data.FechaDespacho == '' || data.Despachado == "NO") && data.DiasRecojo > 0) { //no cumple fecha de despacho
            for (i in colModels) {
                $("#tbPedido").jqGrid('setCell', rowid, i, '', { 'background-color': colorNoHabilitadoFecha, 'color': 'black', 'border-color': '#a6c9e2' });
            }
        }

        $('#' + rowid).removeClass('ui-state-highlight');
    }
}

function SeleccionoPedido(id) {
    //$("#accion").append(" / Selección grilla");
    var data = $("#tbPedido").jqGrid('getRowData', id);
    $(".cbox").attr("disabled", true);

    try {
        LineaSeleccionada = data.Linea;
        SolicitudSeleccionada = data.IdSolicitud;
    } catch (e) {
        //controlar...
    }

    var dataAnterior;

    if (TipoLineaStaff == 1) { //Solicitudes
        RegistroAnterior = RegistroActual;
        RegistroActual = id;
        if (RegistroAnterior == null) {
            RegistroAnterior = RegistroActual;
        }

        dataAnterior = $("#tbPedido").jqGrid('getRowData', RegistroAnterior);

        if (id && id !== RegistroAnterior) {
            if ($("#tbPedido").jqGrid('getGridParam', 'selarrrow').indexOf(RegistroAnterior) == -1) {
                //if ($("#tbPedido").jqGrid('getGridParam', 'selarrrow') !=RegistroAnterior) {
                $("#tbPedido").restoreRow(RegistroAnterior);
            }
            else {
                if (dataAnterior.TienePDFAutDes == "1" && $("#jqg_tbPedido_" + dataAnterior.IdSolicitud).css("display") != "none") {
                    $("#tbPedido").editRow(RegistroAnterior, true);
                }
            }

            //if ($("#tbPedido").jqGrid('getGridParam', 'selarrrow') != "" && $("#tbPedido").jqGrid('getGridParam', 'selarrrow') != undefined) {
            if ($("#tbPedido").jqGrid('getGridParam', 'selarrrow').indexOf(id) != -1) {
                if (data.TienePDFAutDes == "1" && $("#jqg_tbPedido_" + data.IdSolicitud).css("display") != "none") {
                    $("#tbPedido").editRow(id, true);
                }
            }
            else {
                $("#tbPedido").restoreRow(id);
            }
            RegistroAnterior = id;
        }
        else if (id === RegistroAnterior) {
            //if ($("#tbPedido").jqGrid('getGridParam', 'selarrrow') != "" && $("#tbPedido").jqGrid('getGridParam', 'selarrrow') != undefined) {
            if ($("#tbPedido").jqGrid('getGridParam', 'selarrrow').indexOf(id) != -1) {
                if (data.TienePDFAutDes == "1" && $("#jqg_tbPedido_" + data.IdSolicitud).css("display") != "none") {
                    $("#tbPedido").editRow(id, true);
                }
            } else {
                $("#tbPedido").restoreRow(id);
            }
        }
    } else { //Pedidos
        if ((TipoLineaStaff == 2 && (data.Producto2 == '' || data.FechaDespacho != '' || data.IdCorte == '' || data.Despachado == 'SI' || data.IdEstado == "31")) ||
            (TipoLineaStaff == 1 && (data.FechaDespacho != '' || data.Despachado == 'SI')) || data.EnviadoOperador == 'NO') {

            $('#' + id).removeClass('ui-state-highlight');
        } else {
            RegistroAnterior = RegistroActual;
            RegistroActual = id;
            if (RegistroAnterior == null) {
                RegistroAnterior = RegistroActual;
            }

            dataAnterior = $("#tbPedido").jqGrid('getRowData', RegistroAnterior);

            var editparameters = {
                "keys": false,
                "oneditfunc": null,
                "successfunc": null,
                //"url": raiz("P_Movil/Administrar/Cam_DespachoEmpleado.aspx/GuardarDespacho"),
                "url": "Cam_DespachoEmpleado.aspx/GuardarDespacho",
                "extraparam": {},
                "aftersavefunc": function (id, resp) { GuardarDatosDespacho(id, resp); },
                "errorfunc": function (id, error) { alerta('there was an error in saveRow() - ID:' + id + ' Error: ' + error); },
                "afterrestorefunc": null,
                "restoreAfterError": true,
                "mtype": "POST"
            };

            if (id && id !== RegistroAnterior) {
                if ($("#tbPedido").jqGrid('getGridParam', 'selarrrow').indexOf(RegistroAnterior) == -1) {
                    $("#tbPedido").restoreRow(RegistroAnterior);
                }
                else {
                    if (dataAnterior.Situacion != "Renovacion" && dataAnterior.Situacion != "Renovación" && dataAnterior.Situacion != "Portabilidad") {
                        $("#tbPedido").editRow(RegistroAnterior, true);
                    }
                }

                //if ($("#tbPedido").jqGrid('getGridParam', 'selarrrow') != "" && $("#tbPedido").jqGrid('getGridParam', 'selarrrow') != undefined) {
                if ($("#tbPedido").jqGrid('getGridParam', 'selarrrow').indexOf(id) != -1) {
                    if (data.Situacion != "Renovacion" && data.Situacion != "Renovación" && data.Situacion != "Portabilidad") {
                        $("#tbPedido").editRow(id, true);
                        bDespachoRenovacion = false;
                    } else {
                        $("#" + data.IdDetallePedido + "_Linea").attr("ReadOnly", true);
                        $("#" + data.IdDetallePedido + "_RPM").attr("ReadOnly", true);
                        $("#" + data.IdDetallePedido + "_IMEI").attr("ReadOnly", true);
                        $("#tbPedido").editRow(id, true);
                        bDespachoRenovacion = true;
                    }
                }
                else {
                    $("#tbPedido").restoreRow(id);
                }
                RegistroAnterior = id;
            }
            else if (id === RegistroAnterior) {
                //if ($("#tbPedido").jqGrid('getGridParam', 'selarrrow') != "" && $("#tbPedido").jqGrid('getGridParam', 'selarrrow') != undefined) {
                if ($("#tbPedido").jqGrid('getGridParam', 'selarrrow').indexOf(id) != -1) {
                    if (data.Situacion != "Renovacion" && data.Situacion != "Renovación" && data.Situacion != "Portabilidad") {
                        $("#tbPedido").editRow(id, true);
                        bDespachoRenovacion = false;
                    } else {
                        $("#" + data.IdDetallePedido + "_Linea").attr("ReadOnly", true);
                        $("#" + data.IdDetallePedido + "_RPM").attr("ReadOnly", true);
                        $("#" + data.IdDetallePedido + "_IMEI").attr("ReadOnly", true);
                        $("#tbPedido").editRow(id, true);
                        bDespachoRenovacion = true;
                    }
                } else {
                    $("#tbPedido").restoreRow(id);
                }
            }
        }
        if ((data.IdEstado == 29 || data.IdEstado == 26)) {
            $("#" + data.IdDetallePedido + "_Linea").attr("ReadOnly", true);
            $("#" + data.IdDetallePedido + "_RPM").attr("ReadOnly", true);
            $("#" + data.IdDetallePedido + "_IMEI").attr("ReadOnly", true);
        }
        if (data.Linea != '') {
            $("#" + data.IdDetallePedido + "_Linea").attr("ReadOnly", true);
        }

        if (data.RPM != '') {
            $("#" + data.IdDetallePedido + "_RPM").attr("ReadOnly", true);
        }
    }

    $(".cbox").attr("disabled", false);
    //$("#accion").append(" / Selección grilla fin | EsRenovacion: " + bDespachoRenovacion.toString());
}

function SeleccionoTodosPedidos(aRowids, status) {
    var i = 0;
    for (i = 0; i < aRowids.length; i++) {
        SeleccionoPedido(aRowids[i]);
    }
}



function fnVerAutorizacionDescuentoPDF() {
    var id = null;
    var ids;
    ids = $("#tbPedido").jqGrid('getGridParam', 'selarrrow');
    if (ids.length == 0) {
        alerta("Seleccione un registro");
        return;
    } else {
        id = ids[0];
    }
    var datos = $("#tbPedido").jqGrid('getRowData', id);
    //if ($.inArray(datos.vcCodAutDes, arAutDes) != 0 && ((datos.TienePDFAutDes == "1" && datos.vcCodAutDes == "AD-" + datos.CodigoSolicitud) || (datos.TienePDFAutDes == "0" && datos.vcCodAutDes == ""))) {
    //    arAutDes.push(datos.vcCodAutDes);
    //    oDespacho.push(datos);
    //} else {
    //    alerta("El código de autorización de descuento es inválido.");
    //    return;
    //}

    if (id) {
        if (datos.vcAutDesPDF != "") {
            var vcFile = "P_Movil/Administrar/Solicitudes/AutorizacionDescuento" + CarpetaDominio + "/" + datos.vcAutDesPDF;
            $.ajax({
                url: raiz(vcFile), //or your url
                success: function (data) {
                    window.location.href = raiz("Common/Controladores/DescargarArchivo.ashx?archivo=" + vcFile);
                },
                error: function (data) {
                    alerta('No se encontró el archivo a descargar.');
                }
            });
        }
        else {
            alerta("No necesita autorización de descuento");
        }
    } else {
        alerta("Seleccione un registro");
    }
}


$(function () {
    CarpetaDominio = window.top.$("#hdfCodigoDominio").val() != '' ? '/' + window.top.$("#hdfCodigoDominio").val() : '';
    TituloValeResguardo = $("#hdfTituloValeResguardo").val();
    if (TituloValeResguardo == "") {
        $("#aTituloValeResguardo").html("Vale Resguardo");
    }
    else {
        $("#aTituloValeResguardo").html(TituloValeResguardo);
    }
    $("#btnAutDesPDF").click(function () {
        fnVerAutorizacionDescuentoPDF();
    });

    CondicionJQueryEmp = '1=2';
    CondicionJQueryOfi = '1=2';

    $("#tdNoDespacho").css({ 'background-color': colorNoHabilitadoTipo });
    $("#tdYaDespacho").css({ 'background-color': colorDespachado });
    $("#tdNoFechaDespacho").css({ 'background-color': colorNoHabilitadoFecha });
    $("#tdNoCorte").css({ 'background-color': colorNoCorte });
    $("#tdListoDespacho").css({ 'background-color': colorListoDespacho, "border": "1px solid #C5DBEC" });
    $("#tdNoProcesadasError").css({ 'background-color': colorNoProcesadasError });

    $("#lblMensaje").hide();
    $(".txtBuscador").hide();
    $("#txtEmpleado").focus();

    $("#ddlCampana").prop("disabled", true);

    //$("input:checkbox,input:radio,input:file").uniform();

    $(window).resize(function () {
        Dimensionar();
    });

    function GuardarDatosDespacho(id, resp) {

    }

    function ErrorCargarCampana() {

    }

    function SeleccionarOperadorPorCampana(IdCampana) {
        var Metodo = "Cam_DespachoEmpleado.aspx/OperadorPorCampana";
        var Data = {
            IdCampana: IdCampana
        };
        MetodoWeb(Metodo, JSON.stringify(Data), SeleccionarOperadorPorCampanaListo, null);
    }

    function SeleccionarOperadorPorCampanaListo(IdOperador) {
        $("#ddlOperador").val(IdOperador);
        $("#ddlOperador").change();
    }

    if ($("#hdfempleadoAtencion").val() != "") {
        $("#ddlTipoSolicitudFamilia").val("2");
        fnMostrarEmpleado($("#hdfempleadoAtencion").val());
        $("#bpEmpleado_tbControles").hide();
        $(".dvCampana").show();
        $(".dvFamilia").show();
        if ($("#hdfidCampana").val() != "" && $("#hdfidCampana").val() != "-1") {
            SeleccionarOperadorPorCampana($("#hdfidCampana").val());
        }
    }

    if ($("#dvOficina").length > 0) {
        $("#btnGuardar").hide();
    } else {
        $("#dvImportacion").hide();
    }

    //$(".txtSerie").live("keypress", ValidarEnteroPositivo);
    //$(".txtSerie").live("keypress", function (e) {
    //    if (e.keyCode == 13) {
    //        alert("siguiente");
    //    }
    //});
    $(".txtLinea").live("keypress", ValidarEnteroPositivo);
    $(".txtRPM").live("keypress", ValidarRPM);
    $(".txtIMEI").live("keypress", ValidarEnteroPositivo);
    $('.txtAutDes').live("keypress", function (event) {
        if (event.keyCode == 0 || event.keyCode == 32) {
            return false;
        }
    });

    $(".txtLinea").bind('paste', function (e) {
        return true;
    });

    $(".txtIMEI").bind('paste', function (e) {
        return true;
    });

    $("#lblArchivoCargado").click(function () {
        if ($("#lblArchivoCargado").html() != "") {
            //window.location.href = raiz("Common/Controladores/DescargarArchivo.ashx?archivo=" + $("#hdfRutaCompleta").val());
            window.location.href = "../../Common/Controladores/DescargarArchivo.ashx?archivo=" + $("#hdfRutaCompleta").val();
        }
    });

    function CargarIMEI(Linea, IMEI, id) {
        var Metodo = "Cam_DespachoEmpleado.aspx/CargarAlmacenIMEI";
        var Data = {
            Linea: Linea,
            IMEI: IMEI,
            Id: id
        };
        v_Linea = Linea;

        MetodoWeb(Metodo, JSON.stringify(Data), CargarIMEIListo, null);
    }

    function CargarIMEIListo(Resultado) {
        //$("#tbPedido").jqGrid('setCell', Resultado.Id, 'IMEI', Resultado.IMEI);

        if ($("#lbl_" + Resultado.Id + "_IMEI").length == 0) {
            $("#" + Resultado.Id + "_IMEI").parent().append("<label id = 'lbl_" + Resultado.Id + "_IMEI'></label>");
        }

        $("#lbl_" + Resultado.Id + "_IMEI").text(Resultado.IMEI);
        $("#" + Resultado.Id + "_IMEI").val(Resultado.IMEI);

        if (Resultado.IMEI != "") {
            $("#" + Resultado.Id + "_IMEI").hide();
        }
        else {
            $("#" + Resultado.Id + "_IMEI").show();
        }

        if (Resultado.Error != "0") {
            $("#lbl_" + Resultado.Id + "_IMEI").text(Resultado.IMEI);
            $("#" + Resultado.Id + "_IMEI").val(Resultado.IMEI);
            $("#lbl_" + Resultado.Id + "_Linea").text(Resultado.Linea);
            $("#" + Resultado.Id + "_Linea").val(Resultado.Linea);

            alerta("Línea '" + v_Linea + "' inválida" + Resultado.Error);
        }
    }

    function CargarLinea(IMEI, Linea, id) {
        var Metodo = "Cam_DespachoEmpleado.aspx/CargarAlmacenLinea";
        var Data = {
            IMEI: IMEI,
            Linea: Linea,
            Id: id
        };
        v_IMEI = IMEI;

        MetodoWeb(Metodo, JSON.stringify(Data), CargarLineaListo, null);
    }

    function CargarLineaListo(Resultado) {
        //$("#tbPedido").jqGrid('setCell', Resultado.Id, 'Linea', Resultado.Linea);

        if ($("#lbl_" + Resultado.Id + "_Linea").length == 0) {
            $("#" + Resultado.Id + "_Linea").parent().append("<label id = 'lbl_" + Resultado.Id + "_Linea'></label>");
        }

        $("#lbl_" + Resultado.Id + "_Linea").text(Resultado.Linea);
        $("#" + Resultado.Id + "_Linea").val(Resultado.Linea);

        if (Resultado.Linea != "") {
            $("#" + Resultado.Id + "_Linea").hide();
        }
        else {
            $("#" + Resultado.Id + "_Linea").show();
        }

        if (Resultado.Error != "0") {
            $("#lbl_" + Resultado.Id + "_IMEI").text(Resultado.IMEI);
            $("#" + Resultado.Id + "_IMEI").val(Resultado.IMEI);
            alerta("IMEI '" + v_IMEI + "' inválido" + Resultado.Error);
        }
    }
    $(".txtLinea").live("focusin", function (e) {
        //$("#accion").append(" / focus in linea");
        if ($(this).is("[readonly]")) {
            bDespachoRenovacion = true;
        } else {
            bDespachoRenovacion = false;
        }
        //$("#lblin").text("in\nControl_ID: " + $(this).attr("id").toString() + " | EsRenovacion: " + bDespachoRenovacion.toString() + " | readonly: " + $(this).is("[readonly]").toString());
        //$("#accion").append(" / focus in linea fin");
    });

    $(".txtLinea").live("focusout", function (e) {//86254_Linea
        //$("#lblout").text("out\nControl_ID: " + $(this).attr("id").toString() + " | EsRenovacion: " + bDespachoRenovacion.toString() + " | readonly: " + $(this).is("[readonly]").toString());
        var id = $(this).attr("id").toString().split("_")[0];
        if (!bDespachoRenovacion) {
            FueraFocoLinea(this, id);
        }
    });

    function FueraFocoLinea(txt, id) {
        if ($(txt).val() != "") {
            CargarIMEI($(txt).val(), $("#" + id + "_IMEI").val(), id);
        }
        else {
            if ($("#lbl_" + id + "_IMEI").length == 0) {
                $("#" + id + "_IMEI").parent().append("<label id = 'lbl_" + id + "_IMEI'></label>");
            }

            $("#lbl_" + id + "_IMEI").text("");
            $("#" + id + "_IMEI").val("");
            $("#" + id + "_IMEI").show();
        }
    }

    $(".txtLinea").live("keydown", function (e) {//86254_Linea
        if (e.keyCode == 13 || e.keyCode == 9) {
            var id = $(this).attr("id").toString().split("_")[0];
            if (!bDespachoRenovacion) {
                FueraFocoLinea(this, id);
            }
            $("#" + id + "_RPM").focus();
            return false; // prevent the button click from happening
        }
    });

    $(".txtRPM").live("keydown", function (e) {//86254_RPM
        if (e.keyCode == 13 || e.keyCode == 9) {
            var id = $(this).attr("id").toString().split("_")[0];
            if ($('#' + id + '_IMEI:visible').length > 0) {
                $("#" + id + "_IMEI").focus();
            }
            else {
                var ids = $("#tbPedido").jqGrid('getGridParam', 'selarrrow');
                var i = 0;
                for (i = 0; i < ids.length; i++) {
                    if (ids[i].toString() == id.toString()) {
                        if (i == ids.length - 1) {
                            if ($('#' + ids[0] + '_Linea:visible').length > 0) {
                                $("#" + ids[0] + "_Linea").focus();
                            }
                            else {
                                $("#" + ids[0] + "_RPM").focus();
                            }
                        }
                        else {
                            if ($('#' + ids[i + 1] + '_Linea:visible').length > 0) {
                                $("#" + ids[i + 1] + "_Linea").focus();
                            }
                            else {
                                $("#" + ids[i + 1] + "_RPM").focus();
                            }
                        }
                    }
                }
            }

            return false; // prevent the button click from happening
        }
    });

    $(".txtIMEI").live("focusout", function (e) {//86254_IMEI    
        var id = $(this).attr("id").toString().split("_")[0];
        if (!bDespachoRenovacion) {
            FueraFocoIMEI(this, id);
        }
    });

    function FueraFocoIMEI(txt, id) {
        if ($(txt).val() != "") {
            CargarLinea($(txt).val(), $("#" + id + "_Linea").val(), id);
        }
        else {
            //$("#tbPedido").jqGrid('setCell', id, 'Linea', "");
            if ($("#lbl_" + id + "_Linea").length == 0) {
                $("#" + id + "_Linea").parent().append("<label id = 'lbl_" + id + "_IMEI'></label>");
            }

            $("#lbl_" + id + "_Linea").text("");
            $("#" + id + "_Linea").val("");
            $("#" + id + "_Linea").show();
        }
    }

    $(".txtIMEI").live("keydown", function (e) {//86254_IMEI                
        if (e.keyCode == 13 || e.keyCode == 9) {
            var id = $(this).attr("id").toString().split("_")[0];
            FueraFocoIMEI(this, id);
            var ids = $("#tbPedido").jqGrid('getGridParam', 'selarrrow');
            var i = 0;
            for (i = 0; i < ids.length; i++) {
                if (ids[i].toString() == id.toString()) {
                    if (i == ids.length - 1) {
                        if ($('#' + ids[0] + '_Linea:visible').length > 0) {
                            $("#" + ids[0] + "_Linea").focus();
                        }
                        else {
                            $("#" + ids[0] + "_RPM").focus();
                        }
                    }
                    else {
                        if ($('#' + ids[i + 1] + '_Linea:visible').length > 0) {
                            $("#" + ids[i + 1] + "_Linea").focus();
                        }
                        else {
                            $("#" + ids[i + 1] + "_RPM").focus();
                        }
                    }
                }
            }
            return false; // prevent the button click from happening
        }
    });

    function Guardar() {
        var DespachoEmpleado;
        if ($(".txtIMEI[value!='']").length != $(".txtIMEI").length) {
            alerta("Tiene que ingresar todos los códigos IMEI");
            $(".txtIMEI").first().focus();
            return;
        }
        if ($(".txtLinea[value!='']").length != $(".txtLinea").length) {
            alerta("Tiene que ingresar todas las lineas");
            $(".txtLinea").first().focus();
            return;
        }
        if ($(".txtAutDes[value!='']").length != $(".txtAutDes").length) {
            alerta("Tiene que ingresar todos los códigos de autorización de descuento");
            $(".txtAutDes").first().focus();
            return;
        }
        if ($(".txtSerie[value!='']").length != $(".txtSerie").length) {
            alerta("Tiene que ingresar todos los Números de Serie");
            $(".txtAutDes").first().focus();
            return;
        }

        var oDespacho = [];
        var arIMEI = [];
        var arLineas = [];
        var arRPM = [];
        var arAutDes = [];
        var arSeries = [];
        //var ids = $("#tbPedido").jqGrid('getGridParam', 'selarrrow');
        var ids = lstIdsPorDes;
        if (ids.length != 0) { //agregado 13/12/2013 wapumayta
            var i = 0;
            for (i = 0; i < ids.length; i++) {
                if (TipoLineaStaff == "2") {//Pedidos
                    $("#tbPedido").jqGrid('setRowData', ids[i], { 'NumeroItem': i + 1, 'Linea': $("#" + ids[i] + "_Linea").val(), 'RPM': $("#" + ids[i] + "_RPM").val(), 'IMEI': $("#" + ids[i] + "_IMEI").val(), 'Serie': $("#" + ids[i] + "_Serie").val() });
                    var datos = $("#tbPedido").jqGrid('getRowData', ids[i]);
                    if (oDespacho.length > 0) {
                        if ($.inArray(datos.IMEI, arIMEI) != 0 && ($.inArray(datos.RPM, arRPM) != 0 || datos.RPM == '' || datos.RPM == undefined) && ($.inArray(datos.Linea, arLineas) != 0 || datos.Linea == '') && $.inArray(datos.Serie, arSeries) != 0) {
                            arIMEI.push(datos.IMEI);
                            arLineas.push(datos.Linea);
                            arRPM.push(datos.RPM);
                            oDespacho.push(datos);
                        } else {
                            alerta("No puede ingresar valores duplicado");
                            return;
                        }
                    }
                    else {
                        arIMEI.push(datos.IMEI);
                        arLineas.push(datos.Linea);
                        arRPM.push(datos.RPM);
                        arSeries.push(datos.Serie);
                        oDespacho.push(datos);
                    }
                } else { //Solicitudes
                    $("#tbPedido").jqGrid('setRowData', ids[i], { 'vcCodAutDes': $("#" + ids[i] + "_vcCodAutDes").val() });
                    var datos = $("#tbPedido").jqGrid('getRowData', ids[i]);
                    //                            if (oDespacho.length > 0) {
                    if ($.inArray(datos.vcCodAutDes, arAutDes) != 0 && ((datos.TienePDFAutDes == "1" && datos.vcCodAutDes == "AD-" + datos.CodigoSolicitud) || (datos.TienePDFAutDes == "0" && datos.vcCodAutDes == ""))) {
                        arAutDes.push(datos.vcCodAutDes);
                        oDespacho.push(datos);
                    } else {
                        alerta("Uno o más códigos de autorización de descuento son inválidos.");
                        return;
                    }
                    //                            }
                    //                            else {
                    //                                arAutDes.push(datos.vcCodAutDes);
                    //                                oDespacho.push(datos);
                    //                            }
                }
            }

            if ($("#dvUsuario").length > 0) {
                DespachoEmpleado = true;
            }
            else {
                DespachoEmpleado = false;
            }
            var inCampana;
            if (TipoLineaStaff == 1) {
                inCampana = "-1";
            }
            else {
                inCampana = IdCampanaSeleccionada;
            }


            //var Metodo = raiz("P_Movil/Administrar/Cam_DespachoEmpleado.aspx/Guardar");
            var Metodo = "Cam_DespachoEmpleado.aspx/Guardar";
            var Data = {
                oDespacho: JSON.stringify(oDespacho),
                IdEmpleado: IdEmpleadoSeleccionado,
                IdCampana: inCampana,
                NumeroGuia: $("#txtNumeroGuia").val(),
                FechaDespacho: $("#txtFechaDespacho").val(),
                DespachoEmpleado: DespachoEmpleado,
                IdAtencion: $("#hdfidAtencion").val(),
                IdOperador: $("#ddlOperador").val()
            };
            BloquearPagina(true);
            MetodoWeb(Metodo, JSON.stringify(Data), SatisfactoriaGuardar, ErrorGuardar);
        }
        else {
            alerta("No ha seleccionado ningun equipo para despachar");
            return;
        }

        //        if ($("#ddlOperador option").length == 2) 
        //        {
        //            $("#ddlOperador").prop("selectedIndex", 1);
        //            $("#ddlOperador").attr('disabled', true);
        //            $("#ddlOperador").change();
        //        }
    }

    function fnGrabarDespachoImportacion() {
        var Metodo = "Cam_DespachoEmpleado.aspx/GrabarImportacion";
        var Data = {
            IdOficinaTemp: $("#hdfIdOficinaTemp").val() //Serializa JSON MODELO
        };
        MetodoWeb(Metodo, JSON.stringify(Data), SatisfactoriaGrabarDespachoImportacion);
    }

    function SatisfactoriaGrabarDespachoImportacion(result) {
        if (result == '1') {
            fnLimpiar();
            alerta("Despacho Guardado");
        }
    }

    $("#btnGuardar").click(function () {
        if ($("#dvUsuario").length > 0) {

            //JHERRERA 20141128
            var ids = $("#tbPedido").jqGrid('getGridParam', 'selarrrow');
            //                if (ids.length == 0) {
            //                    alerta("No ha seleccionado ningun equipo para despachar");
            //                    return;
            //                }

            lstIdsPorDes = [];
            var i = 0;
            for (i = 0; i < ids.length; i++) {
                var data = $("#tbPedido").jqGrid('getRowData', ids[i]);

                if (data.Producto2 == '' || data.FechaDespacho != '' || data.EnviadoOperador == 'NO' || data.IdEstado == "31") {
                    if (data.Producto2 == '') { //Baja y renovación sin equipo
                        lstIdsPorDes = lstIdsPorDes;
                    }
                    else if (data.FechaDespacho != '' || data.IdEstado == "31" || data.Despachado == "SI") { //Ya despachado
                        lstIdsPorDes = lstIdsPorDes;
                    }
                    else if (data.EnviadoOperador == 'NO') { //No enviado al operador
                        lstIdsPorDes = lstIdsPorDes;
                    }
                    else {
                        lstIdsPorDes.push(ids[i]);
                    }
                } else { //No cumple fecha de despacho
                    lstIdsPorDes.push(ids[i]);
                }
            }
            if (lstIdsPorDes.length == 0) {
                alerta("No ha seleccionado ningún equipo para despachar");
                return;
            }
            //-->

            confirmacion("¿Está seguro de proceder con el despacho?", Guardar);
        }
        else {
            if ($("#dvPedidosImportacion").length > 0) {
                confirmacion("Se procerá a asignar las líneas e IMEIs importados y sin errores.¿Está seguro que desea proceder con el despacho?", fnGrabarDespachoImportacion);
            } else {
                $("#dvOpcionesGrabado").dialog({
                    autoOpen: false,
                    modal: true,
                    buttons: {
                        Cancelar: function () {
                            $(this).dialog("close");
                        },
                        Ok: function () {
                            Guardar();
                            $(this).dialog("close");
                        }
                    }
                });
            }
        }

        //        if ($("#ddlOperador option").length == 2) 
        //        {
        //            $("#ddlOperador").prop("selectedIndex", 1);
        //            $("#ddlOperador").attr('disabled', true);
        //            $("#ddlOperador").change();
        //        }
    });

    function CierreFin() {
        var Metodo = "Cam_DespachoEmpleado.aspx/VolverAtencion";
        var Data = {
            IdAtencion: $("#hdfidAtencion").val()
        };
        MetodoWeb(Metodo, JSON.stringify(Data), SatisfactoriaCierreFin, ErrorCierreFin);
    }

    function SatisfactoriaCierreFin(tab) {
        var tab1 = window.parent.tabschild[window.parent.tabPrincipal.tabs("option", "selected")].id;
        var Accord = window.parent.$("#" + tab1);
        var tabSeleccionado = Accord.tabs("option", "selected");
        $(window.parent.$("a[href^='" + tab.Pagina + "']").parent()).click();
        Accord.tabs("remove", tabSeleccionado);
    }

    function ErrorCierreFin() {
        alerta("Hubo un problema al volver a atención, ");
    }

    function ConfirmacionCierreFin() {
        if ($("#hdfempleadoAtencion").val() != "") {
            confirmacion("¿Desea terminar el despacho y retomar la atención?", CierreFin);
        }
    }

    function CerroMensaje() {
        BloquearPagina(false);
        $('#bpEmpleado_txtValorBusqueda').val("");
        CargarPedidos("", "");

        //        if ($("#ddlOperador option").length == 2) {
        //            $("#ddlOperador").prop("selectedIndex", 1);
        //            $("#ddlOperador").attr('disabled', true);
        //            $("#ddlOperador").change();
        //        }        
        //                $("#tbPedido").trigger("reloadGrid");
    }

    function SatisfactoriaGuardar(resultado) {
        $("#tbPedido").trigger("reloadGrid");

        if (resultado.ProcesoOK == '1') {
            //Mensaje("<br/><h1>Despacho Guardado</h1><br/>", document, ConfirmacionCierreFin);
            //Mensaje("<br/><h1>Despacho Guardado</h1><br/>", document, CerroMensaje);

            //                    var vcFile = "P_Movil/Administrar/Solicitudes/AutorizacionDescuento/" + resultado.ConEntPDF;
            var vcFile = resultado.ConEntPDF;

            if (vcFile != "") {
                $.ajax({
                    //url: raiz(vcFile), //or your url
                    url: "../../" + vcFile, //or your url
                    success: function (data) {

                        //Comentado para PEMEX...
                        //window.location.href = "../../Common/Controladores/DescargarArchivo.ashx?archivo=" + vcFile;


                        if ($("#hdfidAtencion").val() != "") {
                            //Mensaje("<br/><h1>Despacho Guardado</h1><br/>", document, CerroMensajeAtenciones);
                            var prueba;
                        }
                        else {
                            alerta("Despacho Guardado");
                            CerroMensaje();
                        }
                    },
                    error: function (data) {
                        alerta('No se encontró el archivo a descargar.');
                    }
                });
            }
        }
        else if (resultado.ProcesoOK == '0') {
            alerta("Ningún despacho fue realizado, verifique TODOS los números de líneas y los códigos IMEI, actualize el listado es posible que ya haya sido despachado.");
        }
        else {
            var MensajeResultado = "";

            if (resultado.Pedidos != '') {
                MensajeResultado += "Estos pedidos " + resultado.Pedidos + ", no fueron registrados porque ya se han despachado.";
            }
            if (resultado.Lineas != '') {
                MensajeResultado += "<br/>Estas líneas " + resultado.Lineas + ", no fueron registradas porque no se han ingresado en almacén o ya se encuentran asignadas.";
            }
            if (resultado.IMEI != '') {
                MensajeResultado += "<br/>Estos códigos IMEI " + resultado.IMEI + ", no fueron registrados porque no se han registrado en el almacén o ya se encuentran asignados.";
            }
            if (MensajeResultado != "") {
                alerta(MensajeResultado);
            }
        }
        BloquearPagina(false);

        //        if ($("#ddlOperador option").length == 2) {
        //            $("#ddlOperador").prop("selectedIndex", 1);
        //            $("#ddlOperador").attr('disabled', true);
        //            $("#ddlOperador").change();
        //        }
    }

    function ErrorGuardar() {
        $("#tbPedido").trigger("reloadGrid");
        alerta("Hubo un problema al guardar el despacho vuelva a intentarlo.");
        BloquearPagina(false);

        //        if ($("#ddlOperador option").length == 2) {
        //            $("#ddlOperador").prop("selectedIndex", 1);
        //            $("#ddlOperador").attr('disabled', true);
        //            $("#ddlOperador").change();
        //        }
    }

    $(".checker", "#tbFiltrosPedidos").css({ "float": "left" });

    $("input", "#tbFiltrosPedidos").change(function () {
        //                if ($("#dvUsuario").length > 0)
        //                    CargarPedidos(IdEmpleadoSeleccionado, "");
        //                else {
        //                    CargarPedidos("", IdOficinaSeleccionada);
        //                }
        if ($("#dvUsuario").length > 0) {
            CargarGrillaData();
        }
        else {
            $("#tbPedido").trigger("reloadGrid");
        }
        // CargarGrillaData();
    });

    $("#ddlOperador").change(function () {
        CargarTipoLineaStaff();
        $("#tbPedido").jqGrid('clearGridData');
        if ($("#ddlOperador").val() == "-1") {
            $("#ddlCampana").html("");
            $("#ddlCampana").append($("<option></option>").attr("value", "-1").text("<Seleccionar Operador>"));
        }
        else {
            $("#ddlCampana").html("");

            //var Metodo = raiz("P_Movil/Administrar/Cam_DespachoOperador.aspx/ListarCampanaPorOperador");
            //var Metodo = "../../P_Movil/Administrar/Cam_DespachoOperador.aspx/ListarCampanaPorOperador";
            var Metodo = "Cam_DespachoOperador.aspx/ListarCampanaPorOperador";
            var Data = {
                IdOperador: $("#ddlOperador").val() //Serializa JSON MODELO
            };
            MetodoWeb(Metodo, JSON.stringify(Data), SatisfactoriaListarCampana);
        }
        //$("#dvRecepcionEquipo").hide();                
        if ($("#hdfempleadoAtencion").val() == "") {
            $(".dvCampana").hide();
            $(".dvFamilia").hide();
        }

        //fnTipoLineaPerfil();
    });

    function SatisfactoriaListarCampana(lstCampana) {
        if ((!v_biLoadAtenciones && $("#hdfidAtencion").val() != "") || $("#hdfidAtencion").val() == "") {
            if ($(lstCampana).length == 0) {
                $("#ddlCampana").append($("<option></option>").attr("value", "-1").text("<No se encontraron campañas>"));
            }
            else {
                $("#ddlCampana").html("");
                $("#ddlCampana").append($("<option></option>").attr("value", "-1").text("<Seleccione>"));
                $.each(lstCampana, function () {
                    $("#ddlCampana").append($("<option></option>").attr("value", this.IdCampana).text(this.Descripcion));

                    $("#hdfCampanaActiva").val('');
                    if (this.btActivo == true) {
                        $("#hdfCampanaActiva").val(this.IdCampana);
                    }
                });
                if ($("#hdfCampanaActiva").val() != "" && $("#hdfCampanaActiva").val() != "-1") {
                    $("#ddlCampana").val($("#hdfCampanaActiva").val());

                    //$("#ddlCampana").attr("disabled", true);
                    //$("#ddlOperador").attr("disabled", true);
                    $("#ddlCampana").prop("disabled", true);
                } else {
                    $("#ddlCampana").prop("disabled", false);
                }
            }
            v_biLoadAtenciones = true;
            $("#ddlCampana").change();
        }
    }

    function OpcionesSolicitud(solicitudes) {
        if (solicitudes) {//Solicitudes
            //                    $(".chkListoDespacho").show();
            //                    $(".chkYaDespacho").show();
            //$(".chkNoFechaDespacho").hide();
            $(".chkNoEnviadoOperador").hide();
            //$(".chkBajaRenovacionSinEquipo").hide();
            $("#lblLeyendaRenovSinEquip").text("Equipo no re-ingresado");
            $(':checkbox[name=chkBajaRenovacionSinEquipo]').next('label').text("Equipo no re-ingresado");
            $('#tdBajaRenovacionSinEquipo').css("width", "139px");
            //                    $("#tdBajaRenovacionSinEquipo").attr("width", 139);
        }
        else {//Pedidos
            //                    $(".chkListoDespacho").show();
            //                    $(".chkYaDespacho").show();
            //$(".chkNoFechaDespacho").show();
            $(".chkNoEnviadoOperador").show();
            //$(".chkBajaRenovacionSinEquipo").show();
            $("#lblLeyendaRenovSinEquip").text("Bajas Y Renovación Sin Equipo");
            $(':checkbox[name=chkBajaRenovacionSinEquipo]').next('label').text("Bajas Y Renovación Sin Equipo");
        }
    }

    function CargarTipoLineaStaff() {
        //$("#dvRecepcionEquipo").hide();
        $(".dvCampana").hide();
        $("#ddlTipoSolicitudFamilia").val("-1");
        if (TipoLineaStaff == "1") {//STAFF
            $(".dvFamilia").hide();
            $("#dvRecepcionEquipo").show();
            OpcionesSolicitud(true);
            $("#btnGuardar").show();

            //CondicionJQueryEmp = 'EMPL_P_vcCODEMP IN (SELECT DISTINCT SOL.F_vcCodEmp FROM MOV_Solicitud SOL LEFT JOIN MOV_Linea L ON L.P_vcNum = SOL.vcNumLin_Fin ';
            CondicionJQueryEmp = "EMPL_P_vcCODEMP IN (SELECT DISTINCT SOL.F_vcCodEmp FROM MOV_Solicitud SOL LEFT JOIN MOV_Linea L ON L.P_vcNum = case isnull(SOL.vcNumLin_Fin,||) when || then SOL.F_vcNumLin else SOL.vcNumLin_Fin end ";
            //CondicionJQueryEmp += 'WHERE (SOL.F_inEstSol = 7) AND (SOL.inTipSol in (1,2,3,4)) AND SOL.Despachado = 0 ) '
            CondicionJQueryEmp += "WHERE (SOL.F_inEstSol = 7) AND (SOL.inTipSol in (1,2,3,4)) AND SOL.Despachado = 0 AND L.F_inCodOpe = " + $("#ddlOperador").val().toString() + ") ";

            CondicionJQueryOfi = 'IdOficina IN (SELECT DISTINCT EM.IdOficina FROM MOV_Solicitud SOL LEFT JOIN MOV_Linea L ON L.P_vcNum = SOL.vcNumLin_Fin ';
            CondicionJQueryOfi += 'LEFT JOIN GEN_EMP_Empleado EM ON EM.IdEmpleado = SOL.F_vcCodEmp ';
            CondicionJQueryOfi += 'WHERE (SOL.F_inEstSol = 7) AND (SOL.inTipSol in (1,2,3,4)) AND SOL.Despachado = 0 ) ';
            $("#lblMensajeLeyenda").hide();

            //                    $("#bpOficina_txtValorBusqueda").val("");
            //                    $("#bpEmpleado_txtValorBusqueda").val("");
            //                    CargarPedidos("", "");
            fnActualizarBusquedaPrincipal();
        }
        else if (TipoLineaStaff == "2") {//FAMILIA
            $(".dvFamilia").show();
            $("#ddlTipoSolicitudFamilia").val("2");
            OpcionesSolicitud(false);

            if ($("#hdfCampanaActiva").val() != "") {
                $("#ddlCampana").val($("#hdfCampanaActiva").val());
                $("#ddlCampana").prop("disabled", true);
            } else {
                $("#ddlCampana").prop("disabled", false);
            }

            if (IdCampanaSeleccionada != "-1") {
                CondicionJQueryEmp = 'EMPL_P_vcCODEMP IN (SELECT DISTINCT IdEmpleado FROM [MOV_CAM_v_CampanaPedidoDetalle_' + IdCampanaSeleccionada + '] VI ';
                CondicionJQueryEmp += 'LEFT JOIN MOV_Linea L ON L.P_vcNum = Producto1 LEFT JOIN MOV_CAM_CampanaCorte CO ON CO.IdCorte = VI.IdCorte ';
                CondicionJQueryEmp += 'WHERE(VI.IdEstado <> 29) AND ( (IdProducto2 IS NULL) OR (EnviadoOperador=|NO| AND IdProducto2 IS NOT NULL AND VI.IdEstado != 31) OR ';
                CondicionJQueryEmp += '(DiasRecojo<0 AND IdProducto2 IS NOT NULL AND EnviadoOperador=|SI| AND VI.IdEstado != 31) OR (VI.IdEstado = 31) OR ';
                CondicionJQueryEmp += '(IdProducto2 IS NOT NULL AND EnviadoOperador=|SI| AND DiasRecojo>=0 AND VI.IdEstado != 31) ) )';

                CondicionJQueryOfi = 'IdOficina IN (SELECT DISTINCT EM.IdOficina FROM [MOV_CAM_v_CampanaPedidoDetalle_' + IdCampanaSeleccionada + '] VI ';
                CondicionJQueryOfi += 'LEFT JOIN MOV_Linea L ON L.P_vcNum = Producto1 LEFT JOIN MOV_CAM_CampanaCorte CO ON CO.IdCorte = VI.IdCorte ';
                CondicionJQueryOfi += 'LEFT JOIN GEN_EMP_Empleado EM ON EM.IdEmpleado = VI.IdEmpleado ';
                CondicionJQueryOfi += 'WHERE(VI.IdEstado <> 29) AND ( (IdProducto2 IS NULL) OR (EnviadoOperador=|NO| AND IdProducto2 IS NOT NULL AND VI.IdEstado != 31) OR ';
                CondicionJQueryOfi += '(DiasRecojo<0 AND IdProducto2 IS NOT NULL AND EnviadoOperador=|SI| AND VI.IdEstado != 31) OR (VI.IdEstado = 31) OR ';
                CondicionJQueryOfi += '(IdProducto2 IS NOT NULL AND EnviadoOperador=|SI| AND DiasRecojo>=0 AND VI.IdEstado != 31) ) )';
            } else {
                CondicionJQueryEmp = '1=2';
                CondicionJQueryOfi = '1=2';
            }

            $("#lblMensajeLeyenda").show();

            //                    $("#bpOficina_txtValorBusqueda").val("");
            //                    $("#bpEmpleado_txtValorBusqueda").val("");
            //                    CargarPedidos("", "");
            fnActualizarBusquedaPrincipal();

        } else {
            CondicionJQueryEmp = '1=2';
            CondicionJQueryOfi = '1=2';
            $("#dvImportacion").hide();

            CargarPedidos("", "");
        }
    }

    $("#ddlTipoSolicitudFamilia").change(function () {
        $("#dvRecepcionEquipo").hide();
        if ($("#ddlTipoSolicitudFamilia").val() == "1") {//Solicitudes
            $(".dvCampana").hide();
            $("#dvRecepcionEquipo").show();
            OpcionesSolicitud(true);
            $("#btnGuardar").show();
        }
        else if ($("#ddlTipoSolicitudFamilia").val() == "2") {//Pedidos
            $(".dvCampana").show();
            $("#btnGuardar").hide();
            OpcionesSolicitud(false);
        }
        $("#ddlCampana").val("-1");
    });

    $("#ddlCampana").change(function () {
        ////if (TipoLineaStaff == 1) { //agregado 07-01-2016 wapumayta
        ////    return;
        ////}
        ////if (IdCampanaSeleccionada != "-1") {
        ////    CondicionJQueryEmp = 'EMPL_P_vcCODEMP IN (SELECT DISTINCT IdEmpleado FROM [MOV_CAM_v_CampanaPedidoDetalle_' + IdCampanaSeleccionada + '] VI ';
        ////    CondicionJQueryEmp += 'LEFT JOIN MOV_Linea L ON L.P_vcNum = Producto1 LEFT JOIN MOV_CAM_CampanaCorte CO ON CO.IdCorte = VI.IdCorte ';
        ////    CondicionJQueryEmp += 'WHERE(VI.IdEstado <> 29) AND ( (IdProducto2 IS NULL) OR (EnviadoOperador=|NO| AND IdProducto2 IS NOT NULL AND VI.IdEstado != 31) OR ';
        ////    CondicionJQueryEmp += '(DiasRecojo<0 AND IdProducto2 IS NOT NULL AND EnviadoOperador=|SI| AND VI.IdEstado != 31) OR (VI.IdEstado = 31) OR ';
        ////    CondicionJQueryEmp += '(IdProducto2 IS NOT NULL AND EnviadoOperador=|SI| AND DiasRecojo>=0 AND VI.IdEstado != 31) ) )';

        ////    CondicionJQueryOfi = 'IdOficina IN (SELECT DISTINCT EM.IdOficina FROM [MOV_CAM_v_CampanaPedidoDetalle_' + IdCampanaSeleccionada + '] VI ';
        ////    CondicionJQueryOfi += 'LEFT JOIN MOV_Linea L ON L.P_vcNum = Producto1 LEFT JOIN MOV_CAM_CampanaCorte CO ON CO.IdCorte = VI.IdCorte ';
        ////    CondicionJQueryOfi += 'LEFT JOIN GEN_EMP_Empleado EM ON EM.IdEmpleado = VI.IdEmpleado ';
        ////    CondicionJQueryOfi += 'WHERE(VI.IdEstado <> 29) AND ( (IdProducto2 IS NULL) OR (EnviadoOperador=|NO| AND IdProducto2 IS NOT NULL AND VI.IdEstado != 31) OR ';
        ////    CondicionJQueryOfi += '(DiasRecojo<0 AND IdProducto2 IS NOT NULL AND EnviadoOperador=|SI| AND VI.IdEstado != 31) OR (VI.IdEstado = 31) OR ';
        ////    CondicionJQueryOfi += '(IdProducto2 IS NOT NULL AND EnviadoOperador=|SI| AND DiasRecojo>=0 AND VI.IdEstado != 31) ) )';
        ////} else {
        ////    CondicionJQueryEmp = '1=2';
        ////    CondicionJQueryOfi = '1=2';
        ////    $("#dvImportacion").hide();
        ////}

        //////CargarPedidos(IdEmpleadoSeleccionado, IdOficinaSeleccionada);
        ////fnActualizarBusquedaPrincipal();
    });

    $("#btnExportar").click(function () {
        if ($("#dvPedidosImportacion").length > 0) {
            $("#hdfDespachoImportacion").val("1");
        } else {
            $("#hdfDespachoImportacion").val("0");
        }

        btnExportarExcel_eegExportar();
    });

    $("#btnImprimirCompraPedido").click(function () {
        window.print();
    });

    $("#btnValeResguardo").click(function () {

        var selRowIds = $("#tbPedido").jqGrid('getGridParam', 'selarrrow');
        if (selRowIds.length == 0) {
            alerta("Debe seleccionar un ítem.");
            return;
        }
        else if (selRowIds.length > 1) {
            alerta("Debe seleccionar sólo un ítem.");
            return;
        }

        var data = $("#tbPedido").jqGrid('getRowData', selRowIds[0]);
        LineaSeleccionada = data.Linea;
        SolicitudSeleccionada = data.IdSolicitud;

        GenerarResguardo(LineaSeleccionada, SolicitudSeleccionada);

    });

    $("#btnLimpiar").click(function () {
        fnLimpiar();
    });

    $("#btnCerrar").click(function () {
        var tab1 = window.parent.tabschild[window.parent.tabPrincipal.tabs("option", "selected")].id;
        var Accord = window.parent.$("#" + tab1);
        Accord.tabs("remove", Accord.tabs("option", "selected"));

    });

    if ($("#ddlOperador option").length == 2) {
        $("#ddlOperador").prop("selectedIndex", 1);
        $("#ddlOperador").attr('disabled', true);
        $("#ddlOperador").change();
    }

    $("#chkMarcarTodos").change(function () {
        fnMarcarTodos();
    });

    function fnMarcarTodos() {
        if ($('#chkMarcarTodos').is(':checked')) {
            $('#chkListoDespacho').attr('checked', true);
            $('#chkYaDespacho').attr('checked', true);
            $('#chkNoFechaDespacho').attr('checked', true);
            $('#chkNoEnviadoOperador').attr('checked', true);
            $('#chkBajaRenovacionSinEquipo').attr('checked', true);

        } else {
            $('#chkListoDespacho').attr('checked', false);
            $('#chkYaDespacho').attr('checked', false);
            $('#chkNoFechaDespacho').attr('checked', false);
            $('#chkNoEnviadoOperador').attr('checked', false);
            $('#chkBajaRenovacionSinEquipo').attr('checked', false);
        }

        if ($("#dvOficina").length > 0) {
            CargarPedidos("", IdOficinaSeleccionada);
        } else {
            CargarPedidos(IdEmpleadoSeleccionado, "");
        }
    }

    $("#chkListoDespacho,#chkYaDespacho,#chkNoFechaDespacho,#chkNoEnviadoOperador,#chkBajaRenovacionSinEquipo").change(function () {
        if ($('#chkListoDespacho').is(':checked') && $('#chkYaDespacho').is(':checked') && $('#chkNoFechaDespacho').is(':checked') && $('#chkNoEnviadoOperador').is(':checked') && $('#chkBajaRenovacionSinEquipo').is(':checked')) {
            $('#chkMarcarTodos').attr('checked', true);
        } else if ($('#chkListoDespacho').is(':checked') || $('#chkYaDespacho').is(':checked') || $('#chkNoFechaDespacho').is(':checked') || $('#chkNoEnviadoOperador').is(':checked') || $('#chkBajaRenovacionSinEquipo').is(':checked')) {
            $('#chkMarcarTodos').attr('checked', false);
        }
    });

    //fnTipoLineaPerfil();
    //function fnTipoLineaPerfil() {
    //    if ($("#hdfTipoLineaPerfil").val() != '0') {
    //    }
    //}

    $("#txtFechaReporte").datepicker({
        changeMonth: true,
        changeYear: true,
        dateFormat: 'dd/mm/yy'
    });
    $("#btnAddFechaRep").click(function () {
        var vFecha = $("#txtFechaReporte").val();
        if (vFecha != '') {
            if ($.inArray(vFecha, arFechasReporte) == -1) {
                arFechasReporte.push(vFecha);
                $("#lstFechas").append($("<option></option>").attr("value", vFecha).text(vFecha));
                $("#txtFechaReporte").val('');
            } else {
                alerta("Ya existe fecha");
            }
        } else {
            alerta("Seleccione fecha");
        }
    });
    $("#btnDelFechaRep").click(function () {
        if ($("#lstFechas option:selected").html() != null) {
            arFechasReporte = $.grep(arFechasReporte, function (val) {
                return val != $("#lstFechas").val();
            });
            $('#lstFechas option:selected').remove();
        } else {
            alerta("Seleccione fecha");
        }
    });
    $("#btnGenerarReporte").click(function () {
        var grIdCampana = IdCampanaSeleccionada;
        if (grIdCampana == undefined || grIdCampana == "-1") {
            alerta("Debe seleccionar una campaña.");
            return;
        }

        //cargar lista de oficinas
        var ListarLugaresEntrega_Data = {
            IdCampana: IdCampanaSeleccionada
        };
        $.ajax({
            type: "POST",
            url: "Cam_DespachoEmpleado.aspx/ListarLugaresEntrega",
            data: JSON.stringify(ListarLugaresEntrega_Data),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                var lstLE = result.d;
                if (lstLE.length > 0) {
                    $("#ddlOficinaReporte").html('');
                    $("#ddlOficinaReporte").append($("<option></option>").attr("value", -1).text("--Todas las oficinas--"));
                    var i;
                    for (i = 0; i < lstLE.length; i++) {
                        $("#ddlOficinaReporte").append($("<option></option>").attr("value", lstLE[i].IdOficina).text(lstLE[i].NombreOficina));
                    }
                }

                $("#dvReportes").dialog({
                    title: 'Generar Reporte',
                    width: 300,
                    height: 310,
                    modal: true,
                    open: function () {
                        $("#lstFechas").html('');
                        var i;
                        for (i = 0; i < arFechasReporte.length; i++) {
                            $("#lstFechas").append($("<option></option>").attr("value", arFechasReporte[i]).text(arFechasReporte[i]));
                        }
                    },
                    buttons: {
                        Cerrar: function () {
                            $(this).dialog("close");
                        },
                        Generar: function () {
                            fnGenerarReporteDespacho();
                            $(this).dialog("close");
                        }
                    }
                });
            },
            error: function (data) {
                alerta('Error al listar lugares de entrega.');
            }
        });
    });


    CargarTipoLineaStaff();

});

function fnActualizarBusquedaPrincipal() {
    if ($("#dvOficina").length > 0) { //OFICINA
        if (IdOficinaSeleccionada != "") {
            buscarValor_bpOficina = IdOficinaSeleccionada;
            validarDatosAjax_bpOficina = true;
            $('#bpOficina_grid').trigger('reloadGrid');
        } else if (IdOficinaSeleccionada == "" && $("#bpOficina_txtValorBusqueda").val() != "") {
            var vcOfiBus = $("#bpOficina_txtValorBusqueda").val();
            if (vcOfiBus.indexOf("=") > -1 && vcOfiBus.split("=").length > 1) {
                vcOfiBus = $.trim(vcOfiBus.split("=")[0]);
            }

            buscarValor_bpOficina = vcOfiBus;
            validarDatosAjax_bpOficina = true;
            $('#bpOficina_grid').trigger('reloadGrid');
        }
    } else {
        if (IdEmpleadoSeleccionado != "") {//EMPLEADO
            buscarValor_bpEmpleado = IdEmpleadoSeleccionado;
            validarDatosAjax_bpEmpleado = true;
            $('#bpEmpleado_grid').trigger('reloadGrid');
        } else if (IdEmpleadoSeleccionado == "" && $("#bpEmpleado_txtValorBusqueda").val() != "") {
            var vcEmpBus = $("#bpEmpleado_txtValorBusqueda").val();
            if (vcEmpBus.indexOf("=") > -1 && vcEmpBus.split("=").length > 1) {
                vcEmpBus = $.trim(vcEmpBus.split("=")[0]);
            }

            buscarValor_bpEmpleado = vcEmpBus;
            validarDatosAjax_bpEmpleado = true;
            $('#bpEmpleado_grid').trigger('reloadGrid');
        }
    }
    CargarPedidos(IdEmpleadoSeleccionado, IdOficinaSeleccionada);
}

function CerroMensajeAtenciones() {
    BloquearPagina(true);
    var tab1 = window.parent.tabschild[window.parent.tabPrincipal.tabs("option", "selected")].id;
    var Accord = window.parent.$("#" + tab1);
    Accord.tabs("remove", Accord.tabs("option", "selected"));
}


function fnGenerarReporteDespacho() {
    var MetodoRepDes = 'Cam_DespachoEmpleado.aspx/CargarValoresReporte';
    var Data = {
        ListaFechas: arFechasReporte.join(","),
        Tipo: $("#rbtTipo").find(":checked").val(),
        IdOficina: $("#ddlOficinaReporte").val()
    };
    MetodoWeb(MetodoRepDes, JSON.stringify(Data), fnExportarReporte);
}

function fnExportarReporte() {
    //btnExportarExcel_eegReporte();
    var tipoRep = "ReporteLetras";
    var vcTab = "MOV_CAM_DespachoOperador";
    var pagina = "Adm_Reporte.aspx?vcTipRep=" + tipoRep + "&vcTab=" + vcTab + "&inIdCam=" + IdCampanaSeleccionada;
    $("#ifExcel").attr("src", pagina);
}

function GenerarResguardo(Numero, _IdSolicitudSeleccionada) {

    $.ajax({
        url: "Cam_DespachoEmpleado.aspx/ObtenerDatosResguardo",
        data: "{'Numero':'" + Numero + "'}",
        dataType: "json",
        type: "post",
        contentType: "application/json; charset=utf-8",
        success: function (result) {

            $("#lblNroConsecutivoAnterior").html("(Anterior: " + result.d[0].NroConsecutivo + ")");
            try {
                $("#txtNroConsecutivo").val(parseFloat(result.d[0].NroConsecutivo) + 1);
                $("#txtObservaciones").val(result.d[0].Observaciones);
                $("#txtAdministradorContrato").val(result.d[0].Responsable);
                $("#txtModelo").val(result.d[0].Modelo);
                $("#txtMarca").val(result.d[0].MarcaModelo);
                $("#txtNroServicio").val(result.d[0].P_vcNum);
                $("#txtIMEI").val(result.d[0].F_vcCodIMEI);
                $("#txtSIM").val(result.d[0].SIM);
                $("#txtPIN").val(result.d[0].PIN);
                $("#txtFactura").val(result.d[0].NumeroFactura_OS);
                $("#txtCosto").val(result.d[0].dcMonto_Equipo);
                $("#ddlTipoServicio").val(result.d[0].IdTipoModeloDispositivo);

            } catch (e) {
                //some
            }
            var widthGenerarResguardo = $(window).width() - 20;
            var heightGenerarResguardo = $(window).height() - 20;
            if (widthGenerarResguardo > 900) {
                widthGenerarResguardo = 900;
            } else if (widthGenerarResguardo < 400) {
                widthGenerarResguardo = 400;
            }
            if (heightGenerarResguardo > 500) {
                heightGenerarResguardo = 500;
            } else if (heightGenerarResguardo < 200) {
                heightGenerarResguardo = 200;
            }
            $('#dvGenerarResguardo').dialog({
                title: "Generar Reporte",
                modal: true,
                width: widthGenerarResguardo,
                height: heightGenerarResguardo,
                buttons: {
                    "Generar": function () {

                        var oDialogo = this;

                        var Accesorios = "";
                        $("[id*=chkAccesorios] input:checked").each(function () {
                            Accesorios += "," + $(this).val();
                        });
                        if (Accesorios.length > 0) {
                            Accesorios = Accesorios.substr(1, Accesorios.length - 1);
                        }
                        var txtFactura = $.trim($("#txtFactura").val());
                        var txtNroConsecutivo = $.trim($("#txtNroConsecutivo").val());
                        var ddlTipoServicio = $("#ddlTipoServicio").val();
                        var txtCosto = $.trim($("#txtCosto").val());
                        var txtMarca = $.trim($("#txtMarca").val());
                        var txtModelo = $.trim($("#txtModelo").val());
                        var txtNroServicio = $.trim($("#txtNroServicio").val());
                        var txtIMEI = $.trim($("#txtIMEI").val());
                        var txtSIM = $.trim($("#txtSIM").val());
                        var txtPIN = $.trim($("#txtPIN").val());
                        var txtObservaciones = $.trim($("#txtObservaciones").val());
                        var txtResponsable = $.trim($("#txtAdministradorContrato").val());
                        txtFactura = txtFactura.replace(/'/g, "");
                        txtNroConsecutivo = txtNroConsecutivo.replace(/'/g, "");
                        txtCosto = txtCosto.replace(/'/g, "");
                        txtMarca = txtMarca.replace(/'/g, "");
                        txtModelo = txtModelo.replace(/'/g, "");
                        txtNroServicio = txtNroServicio.replace(/'/g, "");
                        txtIMEI = txtIMEI.replace(/'/g, "");
                        txtSIM = txtSIM.replace(/'/g, "");
                        txtPIN = txtPIN.replace(/'/g, "");
                        txtObservaciones = txtObservaciones.replace(/'/g, "");
                        txtResponsable = txtResponsable.replace(/'/g, "");

                        if (txtFactura == "") {
                            alerta("Debe ingresar un código de factura", "Mensaje", function () {
                                $("#txtFactura").focus();
                            });
                            return;
                        }
                        if (txtNroConsecutivo == "") {
                            alerta("Debe ingresar un valor", "Mensaje", function () {
                                $("#txtNroConsecutivo").focus();
                            });
                            return;
                        }
                        if (txtCosto == "") {
                            alerta("Debe ingresar un valor", "Mensaje", function () {
                                $("#txtCosto").focus();
                            });
                            return;
                        }
                        if (txtMarca == "") {
                            alerta("Debe ingresar una marca", "Mensaje", function () {
                                $("#txtMarca").focus();
                            });
                            return;
                        }
                        if (txtModelo == "") {
                            alerta("Debe ingresar un modelo", "Mensaje", function () {
                                $("#txtModelo").focus();
                            });
                            return;
                        }
                        if (txtNroServicio == "") {
                            alerta("Debe ingresar un número", "Mensaje", function () {
                                $("#txtNroServicio").focus();
                            });
                            return;
                        }
                        if (txtIMEI == "") {
                            alerta("Debe ingresar un valor", "Mensaje", function () {
                                $("#txtIMEI").focus();
                            });
                            return;
                        }
                        ////if (txtSIM == "") {
                        ////    alerta("Debe ingresar un valor", "Mensaje", function () {
                        ////        $("#txtSIM").focus();
                        ////    });
                        ////    return;
                        ////}
                        ////if (txtPIN == "") {
                        ////    alerta("Debe ingresar un valor", "Mensaje", function () {
                        ////        $("#txtPIN").focus();
                        ////    });
                        ////    return;
                        ////}
                        if (txtObservaciones == "") {
                            alerta("Debe ingresar un valor", "Mensaje", function () {
                                $("#txtObservaciones").focus();
                            });
                            return;
                        }
                        if (txtResponsable == "") {
                            alerta("Debe ingresar un valor", "Mensaje", function () {
                                $("#txtAdministradorContrato").focus();
                            });
                            return;
                        }

                        $.ajax({
                            url: "Cam_DespachoEmpleado.aspx/GuardarDatosResguardo",
                            data: "{'Factura':'" + txtFactura + "','NroConsecutivo':'" + txtNroConsecutivo + "','TipoServicio':'" + ddlTipoServicio + "'," +
                                   "'Costo':'" + txtCosto + "','Marca':'" + txtMarca + "', 'Modelo':'" + txtModelo + "'," +
                                   "'NroServicio':'" + txtNroServicio + "','IMEI':'" + txtIMEI + "', 'SIM':'" + txtSIM + "'," +
                                   "'PIN':'" + txtPIN + "','Observaciones':'" + txtObservaciones + "','Accesorios':'" + Accesorios + "','Responsable':'" + txtResponsable + "'}",
                            dataType: "json",
                            type: "post",
                            contentType: "application/json; charset=utf-8",
                            success: function (result) {

                                var pagina = "Adm_ReporteDevExpress.aspx?vcTab=MOV_Solicitud&vcTipRep=2&IdResguardo=" + result.d + "&Sol=" + _IdSolicitudSeleccionada;
                                $("#ifReporteFormato").attr("src", pagina);

                                $(oDialogo).dialog("close");


                            },
                            error: function (xhr, err, thrErr) {
                                MostrarErrorAjax(xhr, err, thrErr);
                            }
                        });

                    },
                    "Cancelar": function () {
                        $(this).dialog("close");
                    }
                }
            });

        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });

}

