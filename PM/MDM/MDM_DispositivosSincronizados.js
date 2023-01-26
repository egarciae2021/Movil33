var oCulturaUsuario;
var inFilas;
var nuAltoFila = 23.04;
var ArrayPaginacion = [];
var ModalDispositivos;
var ModalAplicaciones;
var Perfiles = [];
var PerfilSP = "";


function ButtonItems(P_Evento, P_Icono, P_Value, P_Button, P_Disabled) {
    this.P_Evento = P_Evento;
    this.P_Icono = P_Icono;
    this.P_Value = P_Value;
    this.P_Button = P_Button;
    this.P_Disabled = P_Disabled;
}

$(document).ready(function () {

    oCulturaUsuario = window.parent.parent.parent.oCulturaUsuario;

    $("#TableBtn").buttonset();

    $(".btnNormal").button({});
    //Gatillo de eventos
    $(".btnNormal").live("click", function () {
        pagina = $(this).attr("url");
        var EventoClick = $(this).attr("click");
        Titulo = $(this).attr("title");
        IdOpcion = $(this).attr("IdOpcion");
        eval(EventoClick)();
    });

    $(window).resize(function () {
        DimPosElementos();
    });

    //connection.onclose(start);

    var perfiles = $("#hdfPerfiles").val();
    Perfiles = perfiles.split(',');
    for (var i = 0; i < Perfiles.length; i++) {
        if (Perfiles[i] == "SCRTPRM") {
            PerfilSP = Perfiles[i];
        }
    }

    $("#tblAvanzada").buttonset();
    fnCargarDatosModelos();

    $("#txtBusqueda").on('change keyup paste', function () {
        SearchByAppName('tbDispositivos');
    });
});

function ConnexionSignal() {
    var idgateway = $("#hdfIdGateway").val();
    if (PerfilSP == "SCRTPRM") {
        var tabla = document.getElementById("TableBtn");
        var html = "";
        html += "<td>";
        html += "   <button id='btnSincronizarTodos' type='button' class='btn btn-sm btn-purple Habilitado' title='Sincronizar todos los dispositivos' style='margin-left:10px;' onclick='fnSincronizarTodos()'>";
        html += "   Sincronizar Todos";
        html += "   </button>";
        html += "</td>";
        html += "<td>";
        html += "   <label class'control-label' id='lblEstadoSocket' style='margin-left:10px;font-weight: 700;color: #4d627b;display: none;'></label>";
        html += "</td>";
        tabla.children[0].children[0].insertAdjacentHTML('beforeend', html);


        //document.getElementById("lblEstadoSocket").innerHTML = "Desconectado";
        //var lista = document.getElementsByClassName("Habilitado");
        //for (var i = 0; i < lista.length; i++) {
        //    lista[i].disabled = true;
        //}
        //if (window.top.connectionSignalCore.state === window.top.signalRCore.HubConnectionState.Disconnected) {
        //    window.top.startSignalCore(function () {
        //        document.getElementById("lblEstadoSocket").innerHTML = "Conectado";
        //        document.getElementById("lblEstadoSocket").style.color = "#39af3c";
        //        var lista = document.getElementsByClassName("Habilitado");
        //        var atr;
        //        for (var i = 0; i < lista.length; i++) {
        //            atr = lista[i].getAttribute("appadmin");
        //            if (atr != null) {
        //                if (atr.value === "1") {
        //                    lista[i].disabled = false;
        //                }
        //            } else {
        //                lista[i].disabled = false;
        //            }
        //        }
        //    });
        //} else {
        //    document.getElementById("lblEstadoSocket").innerHTML = "Conectado";
        //    document.getElementById("lblEstadoSocket").style.color = "#39af3c";
        //    var lista = document.getElementsByClassName("Habilitado");
        //    var atr;
        //    for (var i = 0; i < lista.length; i++) {
        //        atr = lista[i].getAttribute("appadmin");
        //        if (atr != null) {
        //            if (atr === "1") {
        //                lista[i].disabled = false;
        //            }
        //        } else {
        //            lista[i].disabled = false;
        //        }
        //    }
        //}
    }
}

function GenerarBotones(imei, authtoken, regcode, appadmin, obj_button) {
    var app = (appadmin == "False") ? 0 : 1;
    var obj_id = imei;
    var obj_des = authtoken;
    var evento = obj_button.P_Evento;
    var icono = obj_button.P_Icono;
    var button = obj_button.P_Button;
    var value = obj_button.P_Value;
    var disabled = obj_button.P_Disabled;
    var vcBotones;
    //if (window.top.connectionSignalCore.state === window.top.signalRCore.HubConnectionState.Disconnected) {
    //    vcBotones = '<button id="btnDom_' + obj_id + '" type="button" class="btn btn-sm btn-' + button + ' Habilitado" disabled appadmin="' + app + '" onclick="javascript:' + evento + '(\'' + imei + '\',\'' + authtoken + '\',' + regcode + ');" style="margin: 5px;"><span class="fa fa-' + icono + '" aria-hidden="true"></span> ' + value + '</button>';
    //} else {
        vcBotones = '<button id="btnDom_' + obj_id + '" type="button" class="btn btn-sm btn-' + button + ' Habilitado" appadmin="' + app + '" ' + (app == "0" ? 'disabled':'') + ' onclick="javascript:' + evento + '(\'' + imei + '\',\'' + authtoken + '\',' + regcode + ');" style="margin: 5px;"><span class="fa fa-' + icono + '" aria-hidden="true"></span> ' + value + '</button>';
    //}
    return vcBotones;

}

function fnCargarDatosModelos() {
    
    $("#tbDispositivos").GridUnload();
    if (PerfilSP == "SCRTPRM") {
        var columnas = [
            { name: 'P_VCCODIMEI', label: 'IMEI', index: 'P_VCCODIMEI', hidden: false, align: "center", width: "10%" },
            { name: 'VCNOM', label: 'Modelo Dispositivo', index: 'VCNOM', hidden: false, align: "left", width: "10%" },
            { name: 'EMPL_P_VCCODEMP', label: 'Cód. Empleado', index: 'EMPL_P_VCCODEMP', hidden: false, align: "left", width: "10%" },
            { name: 'EMPL_VCNOMEMP', label: 'Nombre Empleado', index: 'EMPL_VCNOMEMP', hidden: false, align: "left", width: "20%" },
            { name: 'P_VCNUM', label: 'Línea', index: 'P_VCNUM', hidden: false, align: "center", width: "10%" },
            { name: 'FECSINCRONIZA', label: 'Ult. Sincronización', index: 'FECSINCRONIZA', hidden: false, align: "center", width: "13%" },
            { name: 'DIFSINCRONIZA', label: 'Tiempo Transc.', index: 'DIFSINCRONIZA', hidden: false, align: "center", width: "13%" },
            { name: 'SEMAFORO', label: 'Semáforo', index: 'SEMAFORO', hidden: false, align: "center", width: "7%" },
            { name: 'DEVICERELEASE', label: 'Android SO', index: 'DEVICERELEASE', hidden: false, align: "center", width: "7%" },
            { name: 'APPVERSIONNAME', label: 'App Versión', index: 'APPVERSIONNAME', hidden: false, align: "center", width: "7%" },
            { name: 'APPADMIN', label: 'APPADMIN', index: 'APPADMIN', hidden: true, align: "center", width: "7%" },
            { name: 'AUTHTOKEN', label: 'AUTHTOKEN', index: 'AUTHTOKEN', hidden: true, align: "center", width: "7%" },
            { name: 'REGCODE', label: 'REGCODE', index: 'REGCODE', hidden: true, align: "center", width: "7%" },
            {
                name: 'SINC', index: 'SINC', label: 'Sincronizar', hidden: false, width: "7%", align: 'center',
                formatter: function (value, options, rData) {
                    var buttonItems = new ButtonItems();
                    buttonItems.P_Evento = "fnSincronizarDispositivo";
                    buttonItems.P_Icono = "cloud";
                    buttonItems.P_Button = "purple";
                    buttonItems.P_Value = "";
                    return GenerarBotones(rData.P_VCCODIMEI, rData.AUTHTOKEN, rData.REGCODE, rData.APPADMIN, buttonItems);
                }
            },
        ];
    }
    else {
        var columnas = [
            { name: 'P_VCCODIMEI', label: 'IMEI', index: 'P_VCCODIMEI', hidden: false, align: "center", width: "10%" },
            { name: 'VCNOM', label: 'Modelo Dispositivo', index: 'VCNOM', hidden: false, align: "left", width: "10%" },
            { name: 'EMPL_P_VCCODEMP', label: 'Cód. Empleado', index: 'EMPL_P_VCCODEMP', hidden: false, align: "left", width: "10%" },
            { name: 'EMPL_VCNOMEMP', label: 'Nombre Empleado', index: 'EMPL_VCNOMEMP', hidden: false, align: "left", width: "20%" },
            { name: 'P_VCNUM', label: 'Línea', index: 'P_VCNUM', hidden: false, align: "center", width: "10%" },
            { name: 'FECSINCRONIZA', label: 'Ult. Sincronización', index: 'FECSINCRONIZA', hidden: false, align: "center", width: "13%" },
            { name: 'DIFSINCRONIZA', label: 'Tiempo Transc.', index: 'DIFSINCRONIZA', hidden: false, align: "center", width: "13%" },
            { name: 'SEMAFORO', label: 'Semáforo', index: 'SEMAFORO', hidden: false, align: "center", width: "7%" },
        ];
    }

    $.ajax({
        type: "POST",
        url: "MDM_DispositivosSincronizados.aspx/ListarDispositivosSincronizados",
        data: "",
        contentType: "application/json; charset=utf-8",
        dataType: "json",

        success: function (result) {
            debugger;
            if ($(result.d).length > 0) {
                var resul = result.d;
                if (resul[0] == "1") {
                    Mensaje("<br/><h1>No existe registros en los parámetros seleccionados.</h1>", document, null);

                    $("#dvDispositivoSincronizados").hide();
                } else {
                    $("#dvDispositivoSincronizados").show();
                    var datos = JSON.parse(resul[1]);

                    for (var i = 0; i < datos.length; i++) {
                        if (datos[i].SEMAFORO == "VERDE") { datos[i].SEMAFORO = '<label value="A VERDE"><span class="fa fa-circle" style="font-size: 30px; color: #33FF3F"></span></label>'; }
                        else if (datos[i].SEMAFORO == "AMARILLO") { datos[i].SEMAFORO = '<label value="B AMARILLO"><span class="fa fa-circle" style="font-size: 30px; color: #FFF933"></span></label>'; }
                        else if (datos[i].SEMAFORO == "NARANJA") { datos[i].SEMAFORO = '<label value="C NARANJA"><span class="fa fa-circle" style="font-size: 30px; color: #FE9A00"></span></label>'; }
                        else if (datos[i].SEMAFORO == "ROJO") { datos[i].SEMAFORO = '<label value="D ROJO"><span class="fa fa-circle" style="font-size: 30px; color: #FE2E00"></span></label>'; }
                        //if (datos[i].SEMAFORO == "VERDE") { datos[i].SEMAFORO = '<span class="fa fa-circle" style="font-size: 30px; color: #33FF3F"></span>'; }
                        //else if (datos[i].SEMAFORO == "AMARILLO") { datos[i].SEMAFORO = '<span class="fa fa-circle" style="font-size: 30px; color: #FFF933"></span>'; }
                        //else if (datos[i].SEMAFORO == "NARANJA") { datos[i].SEMAFORO = '<span class="fa fa-circle" style="font-size: 30px; color: #FE9A00"></span>'; }
                        //else if (datos[i].SEMAFORO == "ROJO") { datos[i].SEMAFORO = '<span class="fa fa-circle" style="font-size: 30px; color: #FE2E00"></span>'; }

                        datos[i].FECSINCRONIZA = '<span style="display: none;">' + fnFechaStringToANSI(datos[i].FECSINCRONIZA) + '</span>' + datos[i].FECSINCRONIZA;

                    }

                }

                tbGrupoCuenta = $("#tbDispositivos").jqGrid({
                    datatype: "local",
                    colModel: columnas,
                    data: datos,
                    sortname: "P_vcCodIMEI",
                    sortorder: "desc",
                    width: $(window).width() - 55,
                    height: $(window).height() - 170,
                    loadtext: 'Cargando datos...',
                    recordtext: "{0} - {1} de {2} elementos",
                    emptyrecords: 'No hay resultados',
                    pgtext: 'Pág: {0} de {1}',
                    rownumbers: true,
                    //gridview: true,
                    //rowNum: 10000,
                    rowList: [10,20, 50, 100],
                    rowNum: 10,//inFilas,
                    shrinkToFit: true,
                    viewrecords: true,
                    hidegrid: false,
                    sortable: true,
                    ignoreCase: true,
                    //caption: "Relación de Modelos de Dispositivos " ,
                    pager: "#PaginadorModelo"
                }).navGrid("#PaginadorModelo", { edit: false, add: false, search: false, del: false });

                ConnexionSignal();
            } else {
                Mensaje("<br/><h1>No existe registros en los parámetros seleccionados.</h1>", document, null);

                $("#dvDispositivoSincronizados").hide();
            }

            SettingColumnName("tbDispositivos");
        }, // ==============================================================================================================================
        error: function (xhr, err, thrErr) {
            // ==============================================================================================================================
            MostrarErrorAjax(xhr, err, thrErr);
            // ==============================================================================================================================
        }
    });
}

function fnFechaStringToANSI(fechaCompleta) {
    let result = '';
    try
    {
        let fechaHora = fechaCompleta.split(' ');
        if (fechaHora.length > 1) {
            let fechaSolo = fechaHora[0].split('/');
            if (fechaSolo.length == 3) {
                result = fechaSolo[2] + fechaSolo[1] + fechaSolo[0] + ' ' + fechaHora[1];
            }
        }
        if (result == '') {
            result = fechaCompleta;
        }
    }
    catch (e) {
        result = fechaCompleta;
    }
    return result;
}

function DimPosElementos() {
    var Ancho = $(window).width();
    var Alto = $(window).height();

    $("#tbDispositivos").setGridWidth($(window).width() - 45);
    $("#tbDispositivos").setGridHeight($(window).height() - 155);
    RecalcularColumnasGrilla("tbDispositivos", false);
}


function SettingColumnName(grid) {
    var columnNames = $('#' + grid + '').jqGrid('getGridParam', 'colModel');
    $('select#ddlBusqueda').empty()
    for (var columnModelIndex in columnNames) {
        var columnModel = columnNames[columnModelIndex];
        if (!columnModel.hidden && columnModel.label != null && columnModel.resizable == true) {
            $("select#ddlBusqueda").append($("<option>")
            .val(columnModel.name)
            .html(columnModel.label)
        );
        }
    }
}

function SearchByAppName(grid) {

    var columnSel = $("#ddlBusqueda option:selected").val();
    //  Fetch the text from our <input> control
    var searchString = $("#txtBusqueda").val();

    //  Prepare to pass a new search filter to our jqGrid
    var f = { groupOp: "AND", rules: [] };

    //  Remember to change the following line to reflect the jqGrid column you want to search for your string in
    //  In this example, I'm searching through the UserName column.

    f.rules.push({ field: columnSel, op: "cn", data: searchString });

    var _grid = $('#' + grid + '');
    _grid[0].p.search = f.rules.length > 0;
    $.extend(_grid[0].p.postData, { filters: JSON.stringify(f) });
    _grid.trigger("reloadGrid", [{ page: 1 }]);
}


function fnConfiguracionSemaforo() {
    //debugger;
    var $width;
    var $height;
    var $Pagina;
    var titulo = "Configurar Semaforización";

    $width = 700;
    $height = 510;
    $Pagina = 'MDM_ConfiguraSincronizacion.aspx';

    $("#ifAplicaciones").width($width - 10);
    $("#ifAplicaciones").height($height - 35);
    $("#ifAplicaciones").attr("src", $Pagina);

    ModalAplicaciones = $("#dvConfiguracion").dialog({
        title: titulo,
        width: $width,
        height: $height,
        modal: true,
        resizable: false
    });
}

function ExportarExcel() {
    //debugger;
    //pagina += "?vcTab=" + $("#hdfvcTab").val() + "&Detalle=" + $("#ddlBusqueda").val().split("-")[1] + "," + encodeURIComponent(ValorBusqueda()) +" ;
    //$("#ifExcel").attr("src", pagina);
}


function fnSincronizarTodos() {
    let idgateway = $("#hdfIdGateway").val();

    $("#Mensaje").text("Se sincronizaran todos los dispositivos.");
    dialogLiberacion = $("#dvConfirmacion").dialog({
        title: "Sincronización de Dispositivos",
        width: 400,
        modal: true,
        resizable: false,
        open: function (event, ui) {
            window.parent.$("#TabOpciones").scrollTop(0);
        },
        buttons: [
            {
                text: "Aceptar",
                //click: EnviarLineasALiberar
                click: function () {
                    //window.top.SignalCore_fnSincronizarTodos(idgateway);
                    //$(this).dialog("close");

                    SincronizarTodos(idgateway);
                }
            },
            {
                text: "Cancelar",
                click: function () {
                    $(this).dialog("close");
                }
            }
        ]
    });

}

function fnSincronizarDispositivo(imei, authtoken) {
    let idgateway = $("#hdfIdGateway").val();

    $("#Mensaje").text("Se sincronizaran las apps del dispositivo.");
    dialogLiberacion = $("#dvConfirmacion").dialog({
        title: "Sincronización de Dispositivo",
        width: 400,
        modal: true,
        resizable: false,
        open: function (event, ui) {
            window.parent.$("#TabOpciones").scrollTop(0);
        },
        buttons: [
            {
                text: "Aceptar",
                //click: EnviarLineasALiberar
                click: function () {
                    //window.top.SignalCore_fnSincronizarDispositivo(idgateway, authtoken);
                    //$(this).dialog("close");

                    SincronizarPorDispositivo(imei, authtoken);
                }
            },
            {
                text: "Cancelar",
                click: function () {
                    $(this).dialog("close");
                }
            }
        ]
    });

}

function SincronizarTodos(IdGateway) {
    $.ajax({
        type: "POST",
        url: "MDM_DispositivosSincronizados.aspx/SincronizarTodos",
        data: "{'IdGateway': '" + IdGateway + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {

            if (result.d != "0") {
                dialogLiberacion.dialog("close");
                //$("#tbModelo").trigger("reloadGrid");
                alerta("Se sincronizaron los dispositivos.");

            }
            else
                Mensaje("Ocurrio un problema.");
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
}

function SincronizarPorDispositivo(IdDispositivo, AuthToken) {
    $.ajax({
        type: "POST",
        url: "MDM_DispositivosSincronizados.aspx/SincronizarDispositivo",
        data: "{'IdDispositivo': '" + IdDispositivo + "', 'AuthToken': '" + AuthToken + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {

            if (result.d != "0") {
                dialogLiberacion.dialog("close");
                //$("#tbModelo").trigger("reloadGrid");
                alerta("Se sincronizo el dispositivo.");

            }
            else
                Mensaje("Ocurrio un problema.");
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
}