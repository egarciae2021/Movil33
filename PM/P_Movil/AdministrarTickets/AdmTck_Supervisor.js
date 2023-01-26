var tickets;
var usuarioRegistro;
var index = "";

$(function () {
    obtenerTecnicos();

    $("#btnSeguimiento").button({ icons: { primary: "ui-icon-plusthick"} });
    //$("#radio").buttonset();

    //tbUsuarios = $("#tbTecnicos").jqGrid({



    $("#btnSeguimiento").click(function () {
        SeguimientoTecnico();
    });
    $("#divAtras").click(function () {
        $("#divSeguimiento").fadeOut("fast", function () {
            $("#divTecnicos").fadeIn("fast");
        });
    });

    //********************************



    $(".btnNormal").button();

    $("#btnRegistrarDetalle").button({ icons: { secondary: "ui-icon-mail-closed"} });


    //obtenerTickets_inicio()

    $("#btnRegistrarDetalle").click(function () { registrarDetalle(); });


    $('#txtBuscaTicket').keypress(function (event) {
        if (event.which == '13') {

            var tipo = $('#ddlBuscaTicket').val();

            switch (tipo) {

                case "0":
                    buscarTicketCodigo();
                    break;

                case "1":
                    buscarTicketAsunto();
                    break;

                case "2":
                    buscarTicketDescripcion();
                    break;

                default:
                    break;
            }
        }
    });

    $('#txtDescripcionDetalle').keypress(function (event) {
        if (event.which == '13') {
            registrarDetalle();
        }
    });

    //*****************************

});



function obtenerTecnicos() {
    var idtecnico = $("#hdfIdUsuarioLogeado").val();
    $.ajax({
        type: "POST",
        url: "AdmTck_Supervisor.aspx/obtenerTecnicosDeSupervisor",
        data: "{'idUsuario': '" + idtecnico + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            $("#tbTecnicos").jqGrid('clearGridData');

            if ($(result.d).length == 0) {
                alerta("No existen tickets abiertos sin asignar");
                return;
            }

            listaTickets = result.d;

            $("#tbTecnicos").jqGrid({
                datatype: "local",
                data: listaTickets,
                colModel: [{ name: 'P_inCod', index: 'P_inCod', label: 'idTecnicoSupervisor', hidden: true, sortable: false },
                            { name: 'Supervisor.P_inCod', index: 'Supervisor.P_inCod', label: 'idSupervisor', hidden: true, sortable: false },
                            { name: 'Bolsa.P_inCod', index: 'Bolsa.P_inCod', label: 'idBolsa', hidden: true, sortable: false },
                            { name: 'Usuario.P_inCod', index: 'Usuario.P_inCod', label: 'idUsuario', hidden: true, sortable: false },
   		                   { name: 'Nombre', index: 'Nombre', label: 'Nombre', sortable: false },
                           { name: 'Apellido', index: 'Apellido', label: 'Apellido', sortable: false },
                           { name: 'CantidadTicket', index: 'CantidadTicket', label: 'Cantidad de Tickets', sortable: false },
                           { name: 'EstadisticaTicketEstado.Abierto', index: 'EstadisticaTicketEstado.Abierto', label: 'Abierto', sortable: false },
                           { name: 'EstadisticaTicketEstado.Anulado', index: 'EstadisticaTicketEstado.Anulado', label: 'Anulado', sortable: false },
                           { name: 'EstadisticaTicketEstado.Cerrado', index: 'EstadisticaTicketEstado.Cerrado', label: 'Cerrado', sortable: false },
                           { name: 'EstadisticaTicketEstado.AyudaSupervisor', index: 'EstadisticaTicketEstado.AyudaSupervisor', label: 'AyudaSupervisor', sortable: false }
   	                      ],
                rowNum: 15,
                rowList: [5, 15, 25],
                pager: '#pager',
                gridview: true,
                emptyrecords: "No hay tickets que mostrar",
                viewrecords: true,
                sortname: "vcNom", //Default SortColumn
                sortorder: "asc", //Default SortOrder
                width: "950",
                height: "300",
                rownumbers: true,
                caption: "Especialista a su cargo",
                ondblClickRow: function () { SeguimientoTecnico(); }
            });

            $("#tbTecnicos").jqGrid('bindKeys', { "onEnter": function () { SeguimientoTecnico(); }, "onSpace": function () { SeguimientoTecnico(); } });

        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
}


function SeguimientoTecnico() {

    var id = $("#tbTecnicos").jqGrid('getGridParam', 'selrow');
    if (id) {
        var datos = $("#tbTecnicos").jqGrid('getRowData', id);
        var idUsuario = datos['Usuario.P_inCod'];
        var idtecnico = $("#hdfIdUsuarioLogeado").val();

        obtenerTickets_inicio(idUsuario);

    }
    else {
        alerta("Seleccione un registro");
    }
}



//*********************************************

function registrarDetalle() {

    var descripcion = $('#txtDescripcionDetalle').val();

    if (index == "") {
        alerta("Seleccione un ticket");
        $("#txtDescripcionDetalle").focus();
        return;
    }

    if (descripcion == "") {
        //alerta("Ingrese comentario");
        $("#txtDescripcionDetalle").focus();
        return;
    }

    $.ajax({
        type: "POST",
        url: "AdmTck_PanelAdministracion.aspx/registrarDetalleTicket",
        data: "{'P_inCodTicket': '" + tickets[index].P_inCod.toString() + "'," +
                "'registradoPor': '" + '2' + "'," +
                "'vcDescripcion': '" + descripcion + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {

            if (!result.d) {
                alert('No se insertó detalle');
                return;
            }

            var limpiar = $('#comodin').text();

            if (limpiar.length != 0) {
                $('#pnlDetalle').empty();
            }

            $('#pnlDetalle').append('<div class="msm" style="width: 99%; text-align: left; overflow:auto; border-bottom:1px solid white;"> <p> <span  style="font-size:10pt; font-weight: bold;">' + $('#hdfIdUsuarioLogeadoNombre').val() + ' dice: </span>  <span  style="font-size:9pt;"> ' + descripcion + '</span></p></div>');

            if (tickets[index].EsChat) {
                if (_sesion) {
                    websocket.emit("EnviarMensaje", '0|' + tickets[index].Receptor + '|' + tickets[index].Emisor + '|' + descripcion);
                }
            }

            $("#txtDescripcionDetalle").val('');
            $("#txtDescripcionDetalle").focus();
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });

}


function buscarTicketCodigo() {
    var dato = $('#txtBuscaTicket').val();
    $('div #pnlPrincipaldetalle').hide(300);
    $("div .btnTicket").removeClass('ui-state-active');
    index = "";

    if (dato == "") {
        var i = 0;
        for (i = 0; i < tickets.length; i++) {
            $('#pnlticket div #' + i.toString() + '-' + tickets[i].P_inCod.toString()).show(200);
        }
        return;
    }

    var i = 0;
    for (i = 0; i < tickets.length; i++) {
        if (tickets[i].CodigoTicket.toLowerCase().indexOf(dato) < 0) {
            $('#pnlticket div #' + i.toString() + '-' + tickets[i].P_inCod.toString()).hide(300);
        }
        else {
            $('#pnlticket div #' + i.toString() + '-' + tickets[i].P_inCod.toString()).show(300);
        }
    }
    event.preventDefault();
}

function buscarTicketAsunto() {
    var dato = $('#txtBuscaTicket').val();
    $('div #pnlPrincipaldetalle').hide(300);
    $("div .btnTicket").removeClass('ui-state-active');
    index = "";

    if (dato == "") {
        var i = 0;
        for (i = 0; i < tickets.length; i++) {
            $('#pnlticket div #' + i.toString() + '-' + tickets[i].P_inCod.toString()).show(300);
        }
        return;
    }

    var i = 0;
    for (i = 0; i < tickets.length; i++) {
        if (tickets[i].Asunto.toLowerCase().indexOf(dato) < 0) {
            $('#pnlticket div #' + i.toString() + '-' + tickets[i].P_inCod.toString()).hide(300);
        }
        else {
            $('#pnlticket div #' + i.toString() + '-' + tickets[i].P_inCod.toString()).show(300);
        }
    }
    event.preventDefault();
}

function buscarTicketDescripcion() {
    var dato = $('#txtBuscaTicket').val();
    $('div #pnlPrincipaldetalle').hide(300);
    $("div .btnTicket").removeClass('ui-state-active');
    index = "";

    if (dato == "") {
        var i = 0;
        for (i = 0; i < tickets.length; i++) {
            $('#pnlticket div #' + i.toString() + '-' + tickets[i].P_inCod.toString()).show(300);
        }
        return;
    }

    var i = 0;
    for (i = 0; i < tickets.length; i++) {
        if (tickets[i].Descripcion.toLowerCase().indexOf(dato) < 0) {
            $('#pnlticket div #' + i.toString() + '-' + tickets[i].P_inCod.toString()).hide(300);
        }
        else {
            $('#pnlticket div #' + i.toString() + '-' + tickets[i].P_inCod.toString()).show(300);
        }
    }
    event.preventDefault();
}

function obtenerTickets_inicio(idUsuario) {

    $("#divTecnicos").fadeOut("fast", function () {


        usuarioRegistro = $("#hdfIdUsuarioLogeado").val();

        var estados = '2,3,4,5';

        $('#panelTickets').hide(0, function () {
            $('#panelTickets').empty();
            $('#panelTickets').append('<div id="MensajesChat" style="width: 100%; "></div>');

            $.ajax({
                type: "POST",
                url: "AdmTck_PanelAdministracion.aspx/obtenerTickets",
                data: "{'p_inCod': '" + '-1' + "'," +
            "'pCodigoTicket': '" + '000000000000' + "'," +
            "'p_inCodUsuario': '" + '-1' + "'," +
            "'p_inCodUsuarioRegistro': '" + '-1' + "'," +
            "'p_inCodTecnico': '" + idUsuario + "'," +
            "'p_inCodEstado': '" + estados + "'," +
            "'P_inCodMedioContacto': '" + '-1' + "'," +
            "'P_inTipificacion': '" + '-1' + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {

                    if ($(result.d).length == 0) {
                        alerta("No existen tickets asignados para usted");
                        $("#divTecnicos").fadeIn("fast");
                        return;
                    }

                    var i = 0;
                    for (i = 0; i < $(result.d).length; i++) {

                        switch (result.d[i].Estado.P_inCod) {

                            case 1:
                                $('#panelTickets').append('<div  id="' + i.toString() + '-' + result.d[i].P_inCod.toString() + '" name="0" class="btnTicket" style="width: 99%;height: 50px; text-align: left;color: Black;"> <span style="color: Blue;">' + result.d[i].CodigoTicket.toString() + '</span><span style="color: BLUE; float: right">' + result.d[i].FechaRegistro.toString() + '</span>&nbsp;&nbsp;&nbsp;' + result.d[i].Asunto.toString() + '<br />' + result.d[i].Usuario.vcNom.toString() + '<span style="color: BLACK; float: right">SIN ASIGNACION</span></div>');
                                break;
                            case 2:
                                if (result.d[i].EsChat) {
                                    $('#MensajesChat').append('<div  id="' + i.toString() + '-' + result.d[i].P_inCod.toString() + '" name="0" class="btnTicketChat" style="width: 99%;height: 50px;  text-align: left;color: Black;"> <span style="color: Blue;">' + result.d[i].CodigoTicket.toString() + '</span><span style="color: BLUE; float: right">' + result.d[i].FechaRegistro.toString() + '</span>&nbsp;&nbsp;&nbsp;' + result.d[i].Asunto.toString() + '<br />' + result.d[i].Usuario.vcNom.toString() + '<span style="color: red; float: right; text-shadow: 0px 2px 4px whait;">CHAT</span></div>');
                                }
                                else {
                                    $('#panelTickets').append('<div  id="' + i.toString() + '-' + result.d[i].P_inCod.toString() + '" name="0" class="btnTicket" style="width: 99%;height: 50px; text-align: left;color: Black;"> <span style="color: Blue;">' + result.d[i].CodigoTicket.toString() + '</span><span style="color: BLUE; float: right">' + result.d[i].FechaRegistro.toString() + '</span>&nbsp;&nbsp;&nbsp;' + result.d[i].Asunto.toString() + '<br />' + result.d[i].Usuario.vcNom.toString() + '<span style="color: GREEN; float: right; text-shadow: 0px 2px 4px whait;">ACTIVO</span></div>');
                                }
                                break;
                            case 3:
                                $('#panelTickets').append('<div  id="' + i.toString() + '-' + result.d[i].P_inCod.toString() + '" name="0" class="btnTicket" style="width: 99%;height: 50px; text-align: left;color: Black;"> <span style="color: Blue;">' + result.d[i].CodigoTicket.toString() + '</span><span style="color: BLUE; float: right">' + result.d[i].FechaRegistro.toString() + '</span>&nbsp;&nbsp;&nbsp;' + result.d[i].Asunto.toString() + '<br />' + result.d[i].Usuario.vcNom.toString() + '<span style="color: ORANGE; float: right; text-shadow: 0px 2px 4px whait;">ANULADO</span></div>');
                                break;
                            case 4:
                                $('#panelTickets').append('<div  id="' + i.toString() + '-' + result.d[i].P_inCod.toString() + '" name="0" class="btnTicket" style="width: 99%;height: 50px; text-align: left;color: Black;"> <span style="color: Blue;">' + result.d[i].CodigoTicket.toString() + '</span><span style="color: BLUE; float: right">' + result.d[i].FechaRegistro.toString() + '</span>&nbsp;&nbsp;&nbsp;' + result.d[i].Asunto.toString() + '<br />' + result.d[i].Usuario.vcNom.toString() + '<span style="color: BLUE; float: right; text-shadow: 0px 2px 4px whait;">CERRADO</span></div>');
                                break;
                            case 5:
                                $('#panelTickets').append('<div  id="' + i.toString() + '-' + result.d[i].P_inCod.toString() + '" name="0" class="btnTicket" style="width: 99%;height: 50px; text-align: left;color: Black;"> <span style="color: Blue;">' + result.d[i].CodigoTicket.toString() + '</span><span style="color: BLUE; float: right">' + result.d[i].FechaRegistro.toString() + '</span>&nbsp;&nbsp;&nbsp;' + result.d[i].Asunto.toString() + '<br />' + result.d[i].Usuario.vcNom.toString() + '<span style="color: GRAY; float: right; text-shadow: 0px 2px 4px whait;">AYUDA SUPERVISOR</span></div>');
                                break;
                            default:
                                break;
                        }

                    }

                    $(".btnTicket").button();
                    $(".btnTicket").unbind('mouseleave.button');
                    $(".btnTicket").unbind('mouseenter.button');
                    $(".btnTicket").click(function () {
                        obtenerDetalle(this);
                    });
                    $(".btnTicketChat").button({ icons: { secondary: "ui-icon-alert"} });
                    $(".btnTicketChat").unbind('mouseleave.button');
                    $(".btnTicketChat").unbind('mouseenter.button');
                    $(".btnTicketChat").click(function () {
                        obtenerDetalle(this);
                    });
                    $('#panelTickets').show(300);

                    tickets = result.d;
                    $("#divSeguimiento").fadeIn("fast");
                },
                error: function (xhr, err, thrErr) {
                    MostrarErrorAjax(xhr, err, thrErr);
                }
            });

        });
        
    });

}

function obtenerDetalle(boton) {
    $('div #pnlPrincipaldetalle').hide(0, function () { callBackHideObtenerDetalle(boton); });
}

function callBackHideObtenerDetalle(boton) {

    $("div .btnTicket").removeClass('ui-state-active');
    $("div .btnTicketChat").removeClass('ui-state-active');
    $(boton).addClass('ui-state-active');
    $('div #pnlDetalle').empty();
    var codigo = $(boton).attr("id");
    index = codigo.split('-')[0];

    $.ajax({
        type: "POST",
        url: "AdmTck_PanelAdministracion.aspx/obtenerDetalleTicket",
        data: "{'p_inCod': '" + tickets[index].P_inCod.toString() + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {

            $('div #pnlHeadDetalle').empty();
            $('div #pnlHeadDetalle').append('<div style="width: 99%; text-align: left; overflow:auto; font-size:10pt; ">Descripcion: ' + tickets[index].Descripcion.toString() + '</div>');
            if ($(result.d).length == 0) {
                $('#pnlDetalle').append('<div class="msm" id="comodin" style="width: 99%; text-align: left; overflow: auto;"> <p><span  style="font-size:12pt; color:red;">INGRESE DETALLE</span></p></div>');
                $('div #pnlPrincipaldetalle').show('drop');
                return;
            }

            var i = 0;
            for (i = 0; i < $(result.d).length; i++) {
                $('#pnlDetalle').append('<div class="msm" style="width: 99%; text-align: left; overflow:auto; border-bottom:1px solid white;"> <p> <span  style="font-size:10pt; font-weight: bold;">' + $('#hdfIdUsuarioLogeadoNombre').val() + ' dice: </span>  <span  style="font-size:9pt;"> ' + result.d[i].Descripcion.toString() + '</span></p></div>');
                //$('#pnlDetalle').append('<div style="width: 99%; text-align: left; overflow:auto; "> <p><span style="font-size:9pt;">- ' + result.d[i].Descripcion.toString() + '</span></p></div>');
            }


            $('div #pnlPrincipaldetalle').show('drop', 300);

        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });


}