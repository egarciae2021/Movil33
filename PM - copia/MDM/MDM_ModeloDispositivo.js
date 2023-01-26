var oCulturaUsuario;
var inFilas;
var nuAltoFila = 23.04;
var ArrayPaginacion = [];
var ModalDispositivos;

function ButtonItems(P_Evento, P_Icono, P_Value, P_Button) {
    this.P_Evento = P_Evento;
    this.P_Icono = P_Icono;
    this.P_Value = P_Value;
    this.P_Button = P_Button;
}

$(function () {
    oCulturaUsuario = window.parent.parent.parent.oCulturaUsuario;

    Init();

    $(window).resize(function () {
        DimPosElementos();
    });

    function Init() {
        fnCargarDatos();
    }

    
    NumeroInicialFilas();
    
})

function DimPosElementos() {
    var Ancho = $(window).width();
    var Alto = $(window).height();
    $("#tbModelo").setGridWidth($(window).width() - 55);
    $("#tbModelo").setGridHeight($(window).height() - 120);
    RecalcularColumnasGrilla("tbModelo", false);
    NumeroInicialFilasResize();
}
function NumeroInicialFilas() {
    ArrayPaginacion = [];
    inFilas = Math.floor(($(window).height() - 300) / nuAltoFila);
    ArrayPaginacion.push(inFilas);
    ArrayPaginacion.push(inFilas + inFilas);
    ArrayPaginacion.push(inFilas + inFilas + inFilas);
}

function NumeroInicialFilasResize() {
    inFilas = Math.floor(($(window).height() - 330) / nuAltoFila);
    inFilas = inFilas - 1;
    ActualizarPageSizeGrillasTab("tbModelo", inFilas);

}

function GenerarBotones(obj_data, obj_button) {
    //debugger;
    var obj_id = obj_data.IDMODELO;
    var obj_des = obj_data.NOMMODELO;
    var evento = obj_button.P_Evento;
    var icono = obj_button.P_Icono;
    var button = obj_button.P_Button;
    var value = obj_button.P_Value;
    var vcBotones = '<button id="btnDom_' + obj_id + '" type="button" class="btn btn-sm btn-' + button + '" onclick="javascript:' + evento + '(' + obj_id + ',\'' + obj_des + '\');" style="margin: 5px;"><span class="fa fa-' + icono + '" aria-hidden="true"></span> ' + value + '</button>';
    return vcBotones;

}

function fnCargarDatos()
{
    var columnas = [
                { name: 'IDMODELO', hidden: true, align: "center", key: true },
                {
                    name: 'NOMMODELO', label: 'Modelo', index: 'NOMMODELO', width: 120, hidden: false, align: "left"
                },
                {
                    name: 'NOMMARCA', label: 'Marca', index: 'NOMMARCA', width: 80, hidden: false, align: "left"
                },
                //{
                //    name: 'Fabricante', label: 'Fabricante', index: 'Fabricante', width: 60, hidden: false, align: "center"
                //},
                {
                    name: 'DISPOSITIVOS', label: 'Dispositivos Existentes', index: 'DISPOSITIVOS', width: 60, hidden: false, align: "center", formatter: function (value, options, rData) {
                        if (rData.DISPOSITIVOS == 0) {
                            return '0';
                        } else {
                            return '<span onclick="javascript:fnMostrarDispositivos(' + rData.IDMODELO + ',\'' + rData.NOMMODELO + '\');" style="cursor: hand; cursor: pointer; text-decoration: underline; color: rgb(0, 133, 151);">' + rData.DISPOSITIVOS + '</span>';
                        }
                    }
                },
                {
                    name: 'DISPOSITIVOSAPP', label: 'Dispositivos Administrados', index: 'DISPOSITIVOSAPP', width: 60, hidden: false, align: "center", formatter: function (value, options, rData) {
                        if (rData.DISPOSITIVOSAPP == 0) {
                            return '0';
                        } else {
                            return '<span onclick="javascript:fnMostrarDispositivosAdministrados(' + rData.IDMODELO + ',\'' + rData.NOMMODELO + '\');" style="cursor: hand; cursor: pointer; text-decoration: underline; color: rgb(0, 133, 151);">' + rData.DISPOSITIVOSAPP + '</span>';
                        }
                    }
                },
                {
                    name: 'APPS', index: 'APPS', label: 'Configurar Aplicaciones', hidden: false, width: "80px", align: 'center', resizable: false,
                    formatter: function (value, options, rData) {
                        var buttonItems = new ButtonItems();
                        buttonItems.P_Evento = "fnMostrarAplicaciones";
                        buttonItems.P_Icono = "android";
                        buttonItems.P_Button = "success";
                        buttonItems.P_Value = " Apps";
                        return GenerarBotones(rData, buttonItems);
                    }
                },
                {
                    name: 'ACTAPP', index: 'ACTAPP', label: 'Activar Aplicaciones', hidden: false, width: "80px", align: 'center', resizable: false,
                    formatter: function (value, options, rData) {
                        var buttonItems = new ButtonItems();
                        buttonItems.P_Evento = "fnActivarAplicaciones";
                        buttonItems.P_Icono = "check";
                        buttonItems.P_Button = "success";
                        buttonItems.P_Value = " Todos";
                        return GenerarBotones(rData, buttonItems);
                    }
                },
                {
                    name: 'DESAPP', index: 'DESAPP', label: 'Desactivar Aplicaciones', hidden: false, width: "80px", align: 'center', resizable: false,
                    formatter: function (value, options, rData) {
                        var buttonItems = new ButtonItems();
                        buttonItems.P_Evento = "fnDesactivarAplicaciones";
                        buttonItems.P_Icono = "close";
                        buttonItems.P_Button = "danger";
                        buttonItems.P_Value = " Todos";
                        return GenerarBotones(rData, buttonItems);
                    }
                },
                {
                    name: 'EXCEPTO', index: 'EXCEPTO', label: 'Exceptos', hidden: false, width: "80px", align: 'center', resizable: false,
                    formatter: function (value, options, rData) {
                        if (rData.EXCEPTO == true) {
                            return '<button data-toggle="button" class="btn btn-xs btn-default btn-active-info active" disabled="disabled" type="button" aria-pressed="true"> </button>';
                        }
                        else {
                            return '<button data-toggle="button" class="btn btn-xs btn-default btn-active-info" disabled="disabled" type="button" aria-pressed="false"> </button>';
                        }                        
                    }
                },
                {
                    name: 'COD', index: 'COD', label: 'Generar Código', hidden: false, width: "100px", align: 'center', resizable: false,
                    formatter: function (value, options, rData) {
                        var buttonItems = new ButtonItems();
                        buttonItems.P_Evento = "fnGenerarCodigos";
                        buttonItems.P_Icono = "mobile";
                        buttonItems.P_Button = "primary";
                        buttonItems.P_Value = " Código";
                        return GenerarBotones(rData, buttonItems);
                    }
                },
                //},
                //{ name: 'EstadoDispositivo', label: 'Estado Dispositivo', index: 'EstadoDispositivo', width: 60, hidden: false, align: "left" },

    ];

    $.ajax({
        type: "POST",
        url: "MDM_ModeloDispositivo.aspx/Listar",
        data: "",
        contentType: "application/json; charset=utf-8",
        dataType: "json",

        success: function (result) {
            //debugger;
            if ($(result.d).length > 0) {
                var resul = result.d;
                if (resul[0] == "1") {
                    Mensaje("<br/><h1>No existe registros en los parámetros seleccionados.</h1>", document, null);
                    //                $("#dvGrupoCuenta").hide();
                    //                $("#dvPanel").hide();
                    $("#dvModeloDispositivo").hide();
                } else {
                    $("#dvModeloDispositivo").show();
                    var datos = JSON.parse(resul[1]);
                }

                tbGrupoCuenta = $("#tbModelo").jqGrid({
                    datatype: "local",
                    colModel: columnas,
                    data: datos,
                    sortname: "DISPOSITIVOSAPP",
                    sortorder: "desc",
                    width: $(window).width() - 45,
                    height: $(window).height() - 115,
                    loadtext: 'Cargando datos...',
                    recordtext: "{0} - {1} de {2} elementos",
                    emptyrecords: 'No hay resultados',
                    pgtext: 'Pág: {0} de {1}',
                    rownumbers: true,
                    //gridview: true,
                    //rowNum: 10000,
                    rowList: [10, 20, 50, 100],
                    rowNum: inFilas,
                    shrinkToFit: true,
                    viewrecords: true,
                    hidegrid: false,
                    sortable: true,
                    //caption: "Relación de Modelos de Dispositivos " ,
                    pager: "#PaginadorModelo"
                }).navGrid("#PaginadorModelo", { edit: false, add: false, search: false, del: false });
            } else {
                Mensaje("<br/><h1>No existe registros en los parámetros seleccionados.</h1>", document, null);
                //                $("#dvGrupoCuenta").hide();
                //                $("#dvPanel").hide();
                $("#dvModeloDispositivo").hide();
            }

        }, // ==============================================================================================================================
        error: function (xhr, err, thrErr) {
            // ==============================================================================================================================
            MostrarErrorAjax(xhr, err, thrErr);
            // ==============================================================================================================================
        }
    });
}

function fnMostrarDispositivos(IdModelo, NomModelo) {
    var $width;
    var $height;
    var $Pagina;
    var titulo = "Dispositivos Asociados al Modelo: [ " + NomModelo + " ]";

        $width = 800;
        $height = 500;
        $Pagina = 'MDM_DispositivoVista.aspx?IdModelo=' + IdModelo;

    $("#ifDispositivo").width($width - 0);
    $("#ifDispositivo").height($height - 30);
    $("#ifDispositivo").attr("src", $Pagina);

    ModalDispositivos = $("#dvDispositivo").dialog({
        title: titulo,
        width: $width,
        height: $height,
        modal: true,
        resizable: false
    });
}

function fnMostrarDispositivosAdministrados(IdModelo, NomModelo) {
    var $width;
    var $height;
    var $Pagina;
    var titulo = "Dispositivos Asociados al Modelo: [ " + NomModelo + " ]";

    $width = 1200;
    $height = 480;
    $Pagina = 'MDM_Dispositivo.aspx?IdFiltro=' + IdModelo + "&IdTipoFiltro=1";

    $("#ifDispositivo").width($width - 0);
    $("#ifDispositivo").height($height - 30);
    $("#ifDispositivo").attr("src", $Pagina);

    ModalDispositivos = $("#dvDispositivo").dialog({
        title: titulo,
        width: $width,
        height: $height,
        modal: true,
        resizable: false
    });
}

function fnMostrarAplicaciones(IdModelo, NomModelo) {
    var $width;
    var $height;
    var $Pagina;
    var titulo = "Aplicativos Asociados al Modelo: [ " + NomModelo + " ]";
    //debugger;
    $width = 1000
    $height = 500;
    $Pagina = 'MDM_DispositivoApp.aspx?IdFiltro=' + IdModelo + "&IdTipoFiltro=1";

    $("#ifAplicaciones").width($width - 0);
    $("#ifAplicaciones").height($height - 30);
    $("#ifAplicaciones").attr("src", $Pagina);

    ModalDispositivos = $("#dvAplicaciones").dialog({
        title: titulo,
        width: $width,
        height: $height,
        modal: true,
        resizable: false
    });
}

function fnActivarAplicaciones(IdModelo, NomModelo) {
    $("#Mensaje").text("Se generaran los codigós de activación para cada empleado asociado al modelo " + NomModelo + ".");
    dialogLiberacion = $("#dvConfirmacion").dialog({
        title: "Activar de Aplicaciones",
        width: 400,
        modal: true,
        resizable: false,
        open: function (event, ui) {
            window.parent.$("#TabOpciones").scrollTop(0);
        },
        buttons: [
            {
                text: "Aceptar",
                click: function () {
                    ActivarAplicaciones(IdModelo);
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

function ActivarAplicaciones(IdModelo)
{
    $.ajax({
        type: "POST",
        url: "MDM_ModeloDispositivo.aspx/ActivarAplicaciones",
        data: "{'IdModelo': '" + IdModelo + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            //debugger;
            if (result.d != "0") {
                dialogLiberacion.dialog("close");
                $("#tbModelo").trigger("reloadGrid");
                alerta("Se activaron todas las aplicaciones.");
            }
            else
                Mensaje("Ocurrio un problema.");
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
}

function fnDesactivarAplicaciones(IdModelo, NomModelo) {
    $("#Mensaje").text("Se generaran los codigós de activación para cada empleado asociado al modelo " + NomModelo + ".");
    dialogLiberacion = $("#dvConfirmacion").dialog({
        title: "Desactivar de Aplicaciones",
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
                    DesactivarAplicaciones(IdModelo);
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

function DesactivarAplicaciones(IdModelo) {
    $.ajax({
        type: "POST",
        url: "MDM_ModeloDispositivo.aspx/DesactivarAplicaciones",
        data: "{'IdModelo': '" + IdModelo + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            if (result.d != "0") {
                dialogLiberacion.dialog("close");
                $("#tbModelo").trigger("reloadGrid");
                alerta("Se desactivaron todas las aplicaciones.");
            }
            else
                Mensaje("Ocurrio un problema.");
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
}

function fnGenerarCodigos(IdModelo, NomModelo) {
    $("#Mensaje").text("Se generaran los codigós de activación para cada empleado asociado al modelo " + NomModelo + ".");
    dialogLiberacion = $("#dvConfirmacion").dialog({
        title: "Generar Códigos",
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
                    GenerarCodigos(IdModelo);                    
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

function GenerarCodigos(IdModelo) {
    $.ajax({
        type: "POST",
        url: "MDM_ModeloDispositivo.aspx/GenerarCodigoMasivo",
        data: "{'IdModelo': '" + IdModelo + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            //debugger;
            if (result.d != "0") 
            {
                dialogLiberacion.dialog("close");
                $("#tbModelo").trigger("reloadGrid");
                alerta("Se generaron los codigos de activación.");
            }
            else
                Mensaje("Ocurrio un problema.");
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
}