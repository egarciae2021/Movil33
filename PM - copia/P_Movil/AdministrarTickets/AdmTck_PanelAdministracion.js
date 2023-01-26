var tickets;
var usuarios = [];
var usuarioRegistro;
var index = "";
var indexUsuario = -1;
var CodigoItemActualSeleccionado = '';
var DescripcionUsuario = window.parent.DescripcionUsuario;
var iUltimoIndiceTicket = 0;
var IdUserSeleccionado;

function Usuario(P_inCod, vcNom, Grupo, vcUsu) {
    this.P_inCod = P_inCod;
    this.vcNom = vcNom;
    this.Grupo = Grupo;
    this.vcUsu = vcUsu;
}


$(function () {

    $(window).css({ "overflow-y": "hidden" });

    $(".btnNormal").button();
    $("#radio").buttonset();
    //$("#format").buttonset();
    $("#btnCerrarPanelChat").button({ icons: { secondary: "ui-icon-circle-triangle-s"} });
    $("#btnNuevoTicket").button({ icons: { primary: "ui-icon-clipboard"} });
    $("#btnAnularTicket").button({ icons: { primary: "ui-icon-trash"} });
    $("#btnCerrarTicket").button({ icons: { primary: "ui-icon-check"} });
    $("#btnAyudaSupervisor").button({ icons: { primary: "ui-icon-person"} });
    $("#btnRefresh").button({ icons: { primary: "ui-icon-refresh"} });
    $("#btnRegistrarDetalle").button({ icons: { secondary: "ui-icon-mail-closed"} });
    $("#btnIniciarSesion").button({ icons: { primary: "ui-icon-power"} });
    $("#btnChat").button({ icons: { primary: "ui-icon-comment"} });
    $("#btnbolsa").button({ icons: { primary: "ui-icon-suitcase"} });

    obtenerTickets_inicio();


    //fnCargarUsuariosConTicketsPendientes();

    $("#btnRegistrarDetalle").live("click", function () { registrarDetalle(); });
    $("#btnAnularTicket").live("click", function () { anularTicket(); });
    $("#btnCerrarTicket").live("click", function () { cerrarTicket(); });
    $("#btnAyudaSupervisor").live("click", function () { ayudaTicket(); });
    $("#btnRefresh").live("click", function () { refrescar(); });

    $(".grupoUsuarios").live("click", function () {
        fnGrupoUsuario_Click(this);
    });
    $(".grupoUsuarios").live("mousemove", function () {
        fnGrupoUsuarios_mousemove(this);
    });
    $(".grupoUsuarios").live("mouseout", function () {
        fnGrupoUsuarios_mouseout(this);
    });

    $(".usergrupousuario").live("click", function () {
        fnusergrupousuario_Click(this);
    });
    $(".usergrupousuario").live("mousemove", function () {
        fnusergrupousuario_mousemove(this);
    });
    $(".usergrupousuario").live("mouseout", function () {
        fnusergrupousuario_mouseout(this);
    });

    $("#txtBuscaUsuario").keypress(function (event) {
        if (event.which == '13') {
            fnFiltrarUsuarioSeleccionado();
        }
    });


    $("#btnRegistrarCierre").click(function () {
        registrarCerrarTicket();
    });

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

    $(".btnchk").live("click", function () { buscarTicketPorEstado(); });
    Codusuario = $("#hdfIdUsuarioLogeado").val();
    $("#dialog-anular").dialog({
        autoOpen: false,
        modal: true,
        buttons: {
            Ok: function () {
                $.ajax({
                    type: "POST",
                    url: "AdmTck_PanelAdministracion.aspx/cambiarEstadoTicket",
                    data: "{'p_inCodTicket': '" + tickets[index].P_inCod.toString() + "'," +
                            "'p_inCodEstado': '" + '3' + "'}",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (result) {
                        if (!result.d) {
                            alert('No se anuló ticket seleccionado');
                            return;
                        }
                        var elemento;
                        if (tickets[index].EsChat) {
                            elemento = $($('#pnlticket div #' + index.toString() + '-' + tickets[index].P_inCod.toString() + ' span')[3]);
                        }
                        else {
                            elemento = $($('#pnlticket div #' + index.toString() + '-' + tickets[index].P_inCod.toString() + ' span')[3]);
                        }


                        elemento.hide(300, function () {
                            elemento.css('color', 'orange');
                            elemento.text('ANULADO');
                            elemento.show(300);
                        });
                    },
                    error: function (xhr, err, thrErr) {
                        MostrarErrorAjax(xhr, err, thrErr);
                    }
                });
                $(this).dialog("close");
            }
        }
    });

    $("#dialog-cerrar").dialog({
        autoOpen: false,
        width: 400,
        modal: true,
        buttons: {
            Aceptar: function () {

                $.ajax({
                    type: "POST",
                    url: "AdmTck_PanelAdministracion.aspx/cambiarEstadoTicket",
                    data: "{'p_inCodTicket': '" + tickets[index].P_inCod.toString() + "'," +
                                            "'p_inCodEstado': '" + '6' + "'}",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (result) {

                        if (!result.d) {
                            alert('No se anuló ticket seleccionado');
                            return;
                        }

                        var iTotalTickets = $('#ddlTickets').children('option').length;
                        if (iTotalTickets > 1) {
                            $("#ddlTickets option[value='" + $('#ddlTickets').val() + "']").remove();
                            var UltimoCodigoTicket = $("#ddlTickets").children('option').first().val();
                            $('#ddlTickets').val(UltimoCodigoTicket);
                            var _index = $("#ddlTickets").children('option').first().index() + 1;
                            $('div #pnlHeadDetalle').empty();
                            $('div #pnlHeadDetalle').append('<div style="width: 99%; text-align: left; overflow:auto; font-size:11px; ">Descripción: ' + tickets[_index].Descripcion.toString() + '</div>');
                            cargarDetalleComunicacion(UltimoCodigoTicket, _index);
                            $("#pnlDetalle").scrollTop($("#pnlDetalle")[0].scrollHeight);
                            $("#txtDescripcionDetalle").focus();
                        }
                        else {
                            $("#pnlPrincipaldetalle").hide();
                            $("#" + focoUsuario).remove();

                            //Quitar de la matriz de usuarios..
                            var indice = -1;
                            for (i in usuarios) {
                                if (usuarios[i].P_inCod == focoUsuario.replace("User_", "")) {
                                    indice = i;
                                    break;
                                }
                            }
                            //delete usuarios[indice];
                            if (indice > -1) {
                                usuarios.splice(indice, 1);
                            }

                            //Valida si quita el Grupo...
                            if ($("#grupodetalle_" + focoGrupo).children('div').length == 0) {
                                $("#grupo_" + focoGrupo).remove();
                                $("#grupodetalle_" + focoGrupo).remove();
                            }
                        }

                        if (window.parent.ChatActivo == true) {
                            window.parent.socket.emit("EnviarAdministradorCerroTicket", tickets[index].Usuario.vcUsu + '|' + tickets[index].P_inCod.toString());
                        }

                        //                                        var elemento;
                        //                                        if (tickets[index].EsChat) {
                        //                                            elemento = $($('#pnlticket div #' + index.toString() + '-' + tickets[index].P_inCod.toString() + ' span')[3]);
                        //                                        }
                        //                                        else {
                        //                                            elemento = $($('#pnlticket div #' + index.toString() + '-' + tickets[index].P_inCod.toString() + ' span')[3]);
                        //                                        };
                        //                                        elemento.hide(300, function () {
                        //                                            elemento.css('color', 'BLUE');
                        //                                            elemento.text('CERRADO');
                        //                                            elemento.show(300);
                        //                                        });
                        //                                        $('#pnlticket div #' + index.toString() + '-' + tickets[index].P_inCod.toString()).remove();
                        //                                        $("#pnlPrincipaldetalle").hide();
                        //                                        //Notificar cierre de ticket...
                        //                                        if (window.parent.ChatActivo == true) {
                        //                                            window.parent.socket.emit("EnviarAdministradorCerroTicket", tickets[index].Usuario.vcUsu + '|' + tickets[index].P_inCod.toString());
                        //                                        }

                    },
                    error: function (xhr, err, thrErr) {
                        MostrarErrorAjax(xhr, err, thrErr);
                    }
                });
                $(this).dialog("close");
            },
            Cancelar: function () {
                $(this).dialog("close");
            },
            CerrarTodos: {
                class: 'leftButton',
                text: 'Cerrar Todos los Tickets',
                click: function () {
                    fnCerrarTodosLosTickets();
                    $(this).dialog("close");
                }
            }
        }
    });

    $("#dialog-ayuda").dialog({
        autoOpen: false,
        modal: true,
        buttons: {
            Ok: function () {
                $.ajax({
                    type: "POST",
                    url: "AdmTck_PanelAdministracion.aspx/cambiarEstadoTicket",
                    data: "{'p_inCodTicket': '" + tickets[index].P_inCod.toString() + "'," +
                            "'p_inCodEstado': '" + '5' + "'}",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (result) {

                        if (!result.d) {
                            alert('No se anuló ticket seleccionado');
                            return;
                        }

                        var elemento;

                        if (tickets[index].EsChat) {

                            elemento = $($('#pnlticket div #' + index.toString() + '-' + tickets[index].P_inCod.toString() + ' span')[3]);
                        }
                        else {
                            elemento = $($('#pnlticket div #' + index.toString() + '-' + tickets[index].P_inCod.toString() + ' span')[3]);
                        }

                        elemento.hide(300, function () {
                            elemento.css('color', 'GRAY');
                            elemento.text('AYUDA SUPERVISOR');
                            elemento.show(300);
                        });

                    },
                    error: function (xhr, err, thrErr) {
                        MostrarErrorAjax(xhr, err, thrErr);
                    }
                });
                $(this).dialog("close");
            }
        }
    });

    $("#btnbolsa").live("click", function () {
        var $width = 1010;
        var $height = 500;
        var $Pagina = 'AdmTck_BolsaTicket.aspx';
        $("#ifArea").attr("width", $width).attr("src", $Pagina);
        Modal = $('#dvArea').dialog({
            title: "Bolsa de tickets sin asignación",
            width: $width,
            height: $height,
            modal: true,
            resizable: false
        });
    });

    $("#btnNuevoTicket").live("click", function () {
        var $width = 740;
        var $height = 500;
        var $Pagina = 'AdmTck_RegistrarTicket.aspx';
        $("#ifArea").attr("width", $width).attr("src", $Pagina);
        Modal = $('#dvArea').dialog({
            title: "Registrar Nuevo ticket",
            width: $width,
            height: $height,
            modal: true,
            resizable: false
        });
    });

    $('#btnChat').live("click", function () {

        var ancho = $(window).width() - 223;

        $('#panelChat').css('left', ancho);
        $(this).hide('clip', 300, function () {

            $('#panelChat').show('clip', 300);

        });
    });

    $('#btnCerrarPanelChat').live("click", function () {

        $('#panelChat').hide('clip', 300, function () {

            $('#btnChat').show('clip', 300);

        });
    });

    $('#btnIniciarSesion').live("click", function () {

        if (window.parent.ChatActivo) {
            cerrarSesionChat();
        }
        else {
            iniciarSesionChat();

        }

    });

    //    $(window).unload(function () {
    //        
    //        if (_sesion) {
    //            cerrarSesionChat();
    //        };

    //    });

    $(window).bind('unload', function () {
        if (window.parent.ChatActivo) {
            cerrarSesionChat();
        }
    });
    esAdmministrador();


    $(window).resize(function () {
        DimPosElementos();
    });


    $("#ddlTickets").live("change", function () {
        //alert($(this).val());
        //Cargar Detalle...

        var j = -1;
        for (i = 0; i <= tickets.length; i++) {
            if (tickets[i].CodigoTicket == $(this).val()) {
                //p_incodTicket = tickets[i].Descripcion;
                j = i;
                break;
            }
        }
        cargarDetalleComunicacion($(this).val(), j);
    });

});


function DimPosElementos() {
    $('#pnlPrincipaldetalle').css({ "width": $(window).width() - 290 + "px" });
    $("#ddlTickets").css({ "width": $(window).width() - 325 + "px" });
}
function esAdmministrador() {

    if ($("#hdfAdmin").val() != "1") {
        $("#btnNuevoTicket").hide();
        $("#btnbolsa").hide();
        $("#btnAnularTicket").hide();
        $("#btnCerrarTicket").hide();
    }

}

function iniciarSesionChat() {
    /*
    _sesion = true;
    websocket.emit("IniciaSesionTecnico", $("#hdfIdTecnico").val() + "," + $("#hdfIdUsuarioLogeadoNombre").val() + "," + $("#hdfGuid").val());
    */
}

function cerrarSesionChat() {
    /*    
    _sesion = false;
    websocket.emit("CierraSesionTecnico", $("#hdfIdTecnico").val() + "," + $("#hdfGuid").val());
    */
}

function buscarTicketPorEstado() {

    var estados = '2,';
    //    if ($('#check1').is(':checked')) estados = estados + '2,';
    //    if ($('#check2').is(':checked')) estados = estados + '4,';
    //    if ($('#check3').is(':checked')) estados = estados + '3,';
    //    if ($('#check4').is(':checked')) estados = estados + '5,';

    if (estados == '') {
        $('#panelTickets').hide(300, function () {
            $('#panelTickets').empty();
            $('#panelTickets').append('<div id="MensajesChat" style="width: 100%;"></div>');
        });
    }
    else {

        estados = estados.substr(0, estados.length - 1);
        $('#panelTickets').hide(0, function () {
            $('#panelTickets').empty();
            $('#panelTickets').append('<div id="MensajesChat" style="width: 100%; "></div>');
            $.ajax({
                type: "POST",
                url: "AdmTck_PanelAdministracion.aspx/obtenerTickets",
                data: "{'p_inCod': '" + '-1' + "'," +
                "'pCodigoTicket': '" + '000000000000' + "'," +
                "'p_inCodUsuario': '" + '-1' + "'," +
                "'p_inCodUsuarioRegistro': '" + Codusuario + "'," +
                "'p_inCodTecnico': '" + usuarioRegistro + "'," +
                "'p_inCodEstado': '" + estados + "'," +
                "'P_inCodMedioContacto': '" + '-1' + "'," +
                "'P_inTipificacion': '" + '-1' + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {

                    if ($(result.d).length == 0) {
                        //alerta("No existen tickets asignados para usted");
                        return;
                    }

                    var i = 0; 
                    for (i = 0; i < $(result.d).length; i++) {
                        fnAgregarCabeceraGeneral(i, result.d[i].Estado.P_inCod, result.d[i], "estadoInactivo.png", "");
                    }

                    $(".btnTicket").button();
                    $(".btnTicket").unbind('mouseleave.button');
                    $(".btnTicket").unbind('mouseenter.button');
                    $(".btnTicket").live("click", function () {
                        obtenerDetalle(this);
                    });
                    $(".btnTicketChat").button({ icons: { secondary: "ui-icon-alert"} });
                    $(".btnTicketChat").unbind('mouseleave.button');
                    $(".btnTicketChat").unbind('mouseenter.button');
                    $(".btnTicketChat").live("click", function () {
                        obtenerDetalle(this);
                    });
                    $('#panelTickets').show(300);
                    tickets = result.d;
                },
                error: function (xhr, err, thrErr) {
                    MostrarErrorAjax(xhr, err, thrErr);
                }
            });

        });


    }


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
    try {
        event.preventDefault();
    }
    catch (e) {
        //some error
    }
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
    try {
        event.preventDefault();
    }
    catch (error) {
        //some err
    }
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
    try {
        event.preventDefault();
    }
    catch (e) {
        //some error
    }
}

function refrescar() {
    $('div #pnlPrincipaldetalle').hide(300);
    $("div .btnTicket").removeClass('ui-state-active');
    index = "";
    $('#panelTickets').hide(0, function () {
        $('#panelTickets').empty();
        $('#panelTickets').append('<div id="MensajesChat" style="width: 100%; "></div>');
        obtenerTickets_inicio();
    });
}

function anularTicket() {

    if (index == "") {
        if (index != 0) {
            alerta("Seleccione un ticket");
            return;
        }
    }
    $('#dialog-anular p b').text(tickets[index].CodigoTicket.toString());
    $("#dialog-anular").dialog("open");

}

function cerrarTicket() {

    if (index == "") {
        if (index != 0) {
            alerta("Seleccione un ticket");
            return;
        }
    }

    //    $('#dialog-cerrar p b').text(tickets[index].CodigoTicket.toString());
    //    $("#dialog-cerrar").dialog("open");

    $("#rbResuelto").attr("checked", "checked");
    $("#txtConclusion").val("");

    $('#dvCerrar').dialog({
        title: "Cerrar Ticket",
        height: 310,
        width: 410,
        modal: true
    });


}

function ayudaTicket() {

    if (index == "") {
        if (index != 0) {
            alerta("Seleccione un ticket");
            return;
        }
    }
    $('#dialog-ayuda p b').text(tickets[index].CodigoTicket.toString());
    $("#dialog-ayuda").dialog("open");


}

function registrarDetalle() {
    var d = new Date();
    var hor = d.getHours().toString();
    var min = d.getMinutes().toString();
    var sec = d.getSeconds().toString();
    if (hor.length == 1) {
        var hor = "0" + hor;
    }
    if (min.length == 1) {
        var min = "0" + min;
    }
    if (sec.length == 1) {
        var sec = "0" + sec;
    }
    var Hora = hor + ":" + min + ":" + sec;
    var descripcion = $('#txtDescripcionDetalle').val().replace(/'/g, "&#39");

    var dia = d.getDate();
    var mes = d.getMonth() + 1;
    var anio = d.getFullYear();
    dia = (dia < 10) ? '0' + dia : dia;
    mes = (mes < 10) ? '0' + mes : mes;
    var Fecha = dia + '/' + mes + '/' + anio;


    if (index == "") {
        if (index != 0) {
            alerta("Seleccione un ticket");
            $("#txtDescripcionDetalle").focus();
            return;
        }
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
                "'registradoPor': '" + $("#hdfIdUsuarioLogeado").val() + "'," +
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

            //$('#pnlDetalle').append('<div class="msm" style="width: 99%; text-align: left; overflow:auto; border-bottom:1px solid white; word-wrap: break-word;"> <p> <span  style="font-size:8pt; font-weight: bold;">' + $('#hdfIdUsuarioLogeadoNombre').val() + ' dice (' + Fecha + ' - ' + Hora + '): </span>  <span  style="font-size:9pt;"> ' + fnVerificarEmoticones(descripcion) + '</span></p></div>');

            $('#pnlDetalle').append('<div class="msm" style="width: 99%; text-align: left; overflow:auto; border-bottom:1px solid white; word-wrap: break-word;"> <p> <span  style="font-size:10px; font-weight: bold;"> (' + Fecha + ' - ' + Hora + ') ' + $('#hdfIdUsuarioLogeadoNombre').val() + ' dice: </span><span  style="font-size:9pt;"> ' + fnVerificarEmoticones(descripcion) + '</span></p></div>');

            //$('#pnlDetalle').append('<div class="msm" style="width: 99%; text-align: left; overflow:auto; border-bottom:1px solid white; word-wrap: break-word;"> <p> <span  style="font-size:10px; font-weight: bold;"> (' + Fecha + ' - ' + result.d[i].HoraRegistro.toString() + ') ' + result.d[i].IdUsuario.toString() + ' dice : </span><span  style="font-size:9pt;"> ' + fnVerificarEmoticones(result.d[i].Descripcion.toString()) + '</p></div>');

            //if (tickets[index].EsChat) {
            if (window.parent.ChatActivo == true && window.parent.socket != null) {

                //Valida si el chat del usuario esta activo...
                var strRutaImagenEstado = $("#img_usuario_" + focoUsuario.replace("User_", "")).attr("src");
                if (strRutaImagenEstado.indexOf("estadoInactivo.png") >= 0) {
                    //alert('enviar por socket 0');
                    //Grabar como nuevo mensaje para el usuario...
                    var idTicket = $("#ddlTickets").val();
                    fnGrabarMensajeNoLeidoParaUsuario(idTicket);
                    //Enviar notificacion al usuario...
                    window.parent.socket.emit("EnviarMensajeUsuarioNoLeido", tickets[index].Usuario.P_inCod + '|' + DescripcionUsuario + '|' + tickets[index].Asunto.toString() + '|' + tickets[index].P_inCod.toString() + '|' + ObtieneFechaGeneral() + '-' + ObtieneHoraGeneral() + '-' + ObtieneNumeroAleatorio());
                    //$("#img_usuario_" + tickets[index].Usuario.P_inCod).attr("src", "../../Common/Images/Chat/estadoContestado.png");
                }
                else {
                    //alert('enviar por socket 1');
                    window.parent.socket.emit("EnviarMensajeUsuario", tickets[index].Usuario.P_inCod + '|' + DescripcionUsuario + '|' + descripcion + '|' + tickets[index].P_inCod.toString() + '|' + ObtieneFechaGeneral() + '-' + ObtieneHoraGeneral() + '-' + ObtieneNumeroAleatorio());
                    //$("#img_usuario_" + tickets[index].Usuario.P_inCod).attr("src", "../../Common/Images/Chat/estadoContestado.png");
                }
            }

            //$("#img_usuario_" + tickets[index].Usuario.P_inCod).attr("src", "../../Common/Images/Chat/estadoContestado.png");

            $("#pnlDetalle").scrollTop($("#pnlDetalle")[0].scrollHeight);
            $("#txtDescripcionDetalle").val('');
            $("#txtDescripcionDetalle").focus();
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
}

function obtenerDetalle(boton) {
    $('div #pnlPrincipaldetalle').hide(0, function () { callBackHideObtenerDetalle(boton); });
}

function obtenerDetalle2(oUsuario) {
    //alert('x');
    $('div #pnlPrincipaldetalle').hide(0, function () { callBackHideObtenerDetalle2(oUsuario); });
}

function callBackHideObtenerDetalle(boton) {
    $(boton).removeClass();
    $(boton).addClass("btnTicket ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only");


    $("div .btnTicket").removeClass('ui-state-active');
    $("div .btnTicketChat").removeClass('ui-state-active');
    $(boton).addClass('ui-state-active');
    $('div #pnlDetalle').empty();
    var codigo = $(boton).attr("id");

    index = codigo.split('-')[0];

    CodigoItemActualSeleccionado = codigo.split('-')[1];

    $.ajax({
        type: "POST",
        url: "AdmTck_PanelAdministracion.aspx/obtenerDetalleTicket",
        data: "{'p_inCod': '" + tickets[index].P_inCod.toString() + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {

            $('div #pnlHeadDetalle').empty();
            $('div #pnlHeadDetalle').append('<div style="width: 99%; text-align: left; overflow:auto; font-size:11px; ">Descripción: ' + tickets[index].Descripcion.toString() + '</div>');
            if ($(result.d).length == 0) {
                $('#pnlDetalle').append('<div class="msm" id="comodin" style="width: 99%; text-align: left; overflow: auto;"> <p><span  style="font-size:12px; color:red;">INGRESE DETALLE</span></p></div>');
                $('div #pnlPrincipaldetalle').show('drop');
                return;
            }

            var i = 0;
            for (i = 0; i < $(result.d).length; i++) {
                var Fecha = result.d[i].FechaRegistro.substring(6, 8) + '/' + result.d[i].FechaRegistro.substring(4, 6) + '/' + result.d[i].FechaRegistro.substring(0, 4);
                $('#pnlDetalle').append('<div class="msm" style="width: 99%; text-align: left; overflow:auto; border-bottom:1px solid white; word-wrap: break-word;"> <p> <span  style="font-size:10px; font-weight: bold;">(' + Fecha + ' - ' + result.d[i].HoraRegistro.toString() + ') ' + result.d[i].IdUsuario.toString() + ' dice: </span><span  style="font-size:9pt;"> ' + result.d[i].Descripcion.toString() + '</p></div>');
                //$('#pnlDetalle').append('<div style="width: 99%; text-align: left; overflow:auto; "> <p><span style="font-size:9pt;">- ' + result.d[i].Descripcion.toString() + '</span></p></div>');
            }

            $('div #pnlPrincipaldetalle').show('drop', 300, function () { $("#pnlDetalle").scrollTop($("#pnlDetalle")[0].scrollHeight); });
            $("#txtDescripcionDetalle").focus();
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });


}


function callBackHideObtenerDetalle2(objUsuario) {
    //    $(boton).removeClass();
    //    $(boton).addClass("btnTicket ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only");


    //    $("div .btnTicket").removeClass('ui-state-active');
    //    $("div .btnTicketChat").removeClass('ui-state-active');
    //    $(boton).addClass('ui-state-active');
    //    $('div #pnlDetalle').empty();
    //    var codigo = $(boton).attr("id");
    //    index = codigo.split('-')[0];

    //    CodigoItemActualSeleccionado = codigo.split('-')[1];
    var idUsuario = $(objUsuario).attr("id").toString().replace('User_', '');
    IdUserSeleccionado = idUsuario;
    $.ajax({
        type: "POST",
        url: "AdmTck_PanelAdministracion.aspx/obtenerTicketsPorUsuario",
        data: "{'idUsuario': '" + idUsuario + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {

            //Cargar combo box...
            $('#pnlPrincipaldetalle').css({ "width": $(window).width() - 290 + "px" });
            $("#ddlTickets").css({ "width": $(window).width() - 325 + "px" });
            $("#ddlTickets").html("");
            var options = $("#ddlTickets");
            $.each(result.d, function () {
                options.append($("<option />").val(this.CodigoTicket).text(this.CodigoTicket + " - " + this.Asunto));
            });

            if (result.d.length > 0) {
                //Cargar Detalle Combo...
                //$("#ddlTickets").change();
                index = 0;
                cargarDetalleComunicacion(result.d[0].CodigoTicket, 0);
            }

            tickets = result.d;

            //$('div #pnlPrincipaldetalle').show('drop', 300, function () { $("#pnlDetalle").scrollTop($("#pnlDetalle")[0].scrollHeight); });
            //$('div #pnlPrincipaldetalle').show();
            $("#pnlDetalle").scrollTop($("#pnlDetalle")[0].scrollHeight);
            //            $("#txtDescripcionDetalle").focus();
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
}


function cargarDetalleComunicacion(IdTicket, _index) {
    index = _index;
    var id = parseInt(IdTicket.replace('TCK', ''));
    CodigoItemActualSeleccionado = id;

    $('#pnlDetalle').empty();
    $.ajax({
        type: "POST",
        url: "AdmTck_PanelAdministracion.aspx/obtenerDetalleTicket",
        data: "{'p_inCod': '" + id.toString() + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {

            $('div #pnlHeadDetalle').empty();
            $('div #pnlHeadDetalle').append('<div style="width: 99%; text-align: left; overflow:auto; font-size:11px; "><b>Descripción:</b> ' + tickets[_index].Descripcion.toString() + '</div>');
            if ($(result.d).length == 0) {
                $('#pnlDetalle').append('<div class="msm" id="comodin" style="width: 99%; text-align: left; overflow: auto;"> <p><span  style="font-size:12px; color:red;">INGRESE DETALLE</span></p></div>');
                $('div #pnlPrincipaldetalle').show('drop', 100, function () {
                    $("#txtDescripcionDetalle").focus();
                });
                //$('#img_usuario_' + IdUserSeleccionado).attr("src", "../../Common/Images/Chat/estadoInactivo.png");
                return;
            }

            //VALIDAR SI EL TICKET FUE RESPONDIDO O CONTESTADO
            ///var ultMensaje = $(result.d).length;
            //if ($("#hdfIdUsuarioLogeadoNombre").val() == result.d[ultMensaje - 1].IdUsuario) {
            //    $('#img_usuario_' + IdUserSeleccionado).attr("src", "../../Common/Images/Chat/estadoContestado.png");
            //} else {
            //    $('#img_usuario_' + IdUserSeleccionado).attr("src", "../../Common/Images/Chat/estadoInactivo.png");
            //}

            var i = 0;
            for (i = 0; i < $(result.d).length; i++) {
                var Fecha = result.d[i].FechaRegistro.substring(6, 8) + '/' + result.d[i].FechaRegistro.substring(4, 6) + '/' + result.d[i].FechaRegistro.substring(0, 4);
                $('#pnlDetalle').append('<div class="msm" style="width: 99%; text-align: left; overflow:auto; border-bottom:1px solid white; word-wrap: break-word;"> <p> <span  style="font-size:10px; font-weight: bold;"> (' + Fecha + ' - ' + result.d[i].HoraRegistro.toString() + ') ' + result.d[i].IdUsuario.toString() + ' dice : </span><span  style="font-size:9pt;"> ' + fnVerificarEmoticones(result.d[i].Descripcion.toString()) + '</p></div>');
                //$('#pnlDetalle').append('<div style="width: 99%; text-align: left; overflow:auto; "> <p><span style="font-size:9pt;">- ' + result.d[i].Descripcion.toString() + '</span></p></div>');
            }

            //            $('div #pnlPrincipaldetalle').show('drop', 300, function () {
            //                $("#pnlDetalle").scrollTop($("#pnlDetalle")[0].scrollHeight);
            //                $("#txtDescripcionDetalle").focus();
            //            }); 

            $('div #pnlPrincipaldetalle').show();
            $("#pnlDetalle").scrollTop($("#pnlDetalle")[0].scrollHeight);
            $("#txtDescripcionDetalle").focus();


        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });


}


function obtenerTickets_inicio() {

    usuarioRegistro = $("#hdfIdTecnico").val();
    Codusuario = $("#hdfIdUsuarioLogeado").val();

    window.parent.fnObtenerUsuariosConectados();

    //    var estados = '2,';
    //    //    if ($('#check1').is(':checked')) estados = estados + '2,';
    //    //    if ($('#check2').is(':checked')) estados = estados + '4,';
    //    //    if ($('#check3').is(':checked')) estados = estados + '3,';
    //    //    if ($('#check4').is(':checked')) estados = estados + '5,';

    //    if (estados == '') {
    //        $('#panelTickets').hide(0, function () {
    //            $('#panelTickets').empty();
    //            $('#panelTickets').append('<div id="MensajesChat" style="width: 100%; "></div>');
    //        });
    //    }
    //    else {

    //        estados = estados.substr(0, estados.length - 1);

    //        $('#panelTickets').hide(0, function () {
    //            $('#panelTickets').empty();
    //            $('#panelTickets').append('<div id="MensajesChat" style="width: 100%; "></div>');


    //            $('#panelTickets2').empty();

    //            $.ajax({
    //                type: "POST",
    //                url: "AdmTck_PanelAdministracion.aspx/obtenerTickets",
    //                data: "{'p_inCod': '" + '-1' + "'," +
    //                "'pCodigoTicket': '" + '000000000000' + "'," +
    //                "'p_inCodUsuario': '" + '-1' + "'," +
    //                "'p_inCodUsuarioRegistro': '" + Codusuario + "'," +
    //                "'p_inCodTecnico': '" + usuarioRegistro + "'," +
    //                "'p_inCodEstado': '" + estados + "'," +
    //                "'P_inCodMedioContacto': '" + '-1' + "'," +
    //                "'P_inTipificacion': '" + '-1' + "'}",
    //                contentType: "application/json; charset=utf-8",
    //                dataType: "json",
    //                success: function (result) {



    //                    if ($(result.d).length == 0) {
    //                        alerta("No existen tickets asignados para usted");
    //                        return;
    //                    };

    //                    for (var i = 0; i < $(result.d).length; i++) {
    //                        iUltimoIndiceTicket = i;
    //                        fnAgregarCabeceraGeneral(i, result.d[i].Estado.P_inCod, result.d[i], "estadoInactivo.png", "");
    //                    };

    //                    $(".btnTicket").button();
    //                    $(".btnTicket").unbind('mouseleave.button');
    //                    $(".btnTicket").unbind('mouseenter.button');
    //                    $(".btnTicket").live("click", function () {
    //                        obtenerDetalle(this);
    //                    });

    //                    $(".usergrupousuario").live("click", function () {
    //                        obtenerDetalle2(this);
    //                    });

    //                    $(".btnTicketChat").button({ icons: { secondary: "ui-icon-alert"} });
    //                    $(".btnTicketChat").unbind('mouseleave.button');
    //                    $(".btnTicketChat").unbind('mouseenter.button');
    //                    $(".btnTicketChat").live("click", function () {
    //                        obtenerDetalle(this);
    //                    });


    //                    //$('#panelTickets').show(300);
    //                    $('#panelTickets2').show();

    //                    tickets = result.d;

    //                    window.parent.fnObtenerUsuariosConectados();

    //                },
    //                error: function (xhr, err, thrErr) {
    //                    MostrarErrorAjax(xhr, err, thrErr);
    //                }
    //            });
    //        });
    //    }
}

function iniciarSocket() {
    /*
    websocket = io.connect("http://130.1.7.80:80");
    websocket.on("ConfirmacionSesionTecnico", ConfirmacionSesionTecnico);
    websocket.on("ConfirmacionCerrarSesionTecnico", ConfirmacionCerrarSesionTecnico);
    websocket.on("ComenzarChat", ComenzarChat);
    websocket.on("RecibirMensaje", RecibirMensaje);
    //websocket.on("loginOk", loginOk);
    //websocket.on("loginFail", loginFail);
    //websocket.on("MensajeTodos", MensajeTodos);
    //websocket.on("MensajeUsuario", MensajeUsuario);
    //websocket.on("MensajeNoUsuario", MensajeNoUsuario);
    //websocket.on("pruebamongo", pruebamongo);
    //websocket.on("EntroUsuario", EntroUsuario);
    //websocket.on("UsuariosLogeados", UsuariosLogeados);
    //websocket.on("AlgunUsuarioDesconectado", AlgunUsuarioDesconectado);
    //websocket.on("AlertaEscribiendo", AlertaEscribiendo);

    websocket.on('disconnect', function () {
    if (_sesion) {
    cerrarSesionChat();
    };
    });

    //descomentar en un ambiente real donde la variable usuario deberia ya estar cargada
    //websocket.emit("InciaConexion", $("#hdfId").val() + "," + $("#hdfUsuario").val());
    */
}



function ComenzarChat(datosServidor) {//datosServidor = 0-emisor|1-nombre de emisor|2-receptor|3-tipificacion|4-titulo|5-descripcion|6-mensaje|7-fecha
    var parametros = datosServidor.split('|');
    $.ajax({
        type: "POST",
        url: "AdmTck_PanelAdministracion.aspx/registrarTicketChat",
        data: "{'pUsuario': '" + parametros[0] + "'," +
                "'pUsuarioRegistro': '" + parametros[0] + "'," +
                "'pMedioContacto': '" + '3' + "'," +
                "'pTipificacion': '" + parametros[3] + "'," +
                "'pAsunto': '" + parametros[4] + "'," +
                "'pDescripcion': '" + parametros[5] + "'," +
                "'pEsChat': true," +
                "'pMensaje': '" + parametros[6] + "'," +
                "'pTecnicoAsignado': '" + parametros[2] + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {

            if ($(result.d).length == 0) {
                alerta("No existen tickets asignados para usted");
                return;
            }

            //$('#MensajesChat').hide(0,function () {

            var i = tickets.length;
            $('#MensajesChat').append('<div id="' + i.toString() + '-' + result.d.P_inCod.toString() + '" name="0" class="btnTicketChat" style="width: 99%;height: 50px; text-align: left;color: Black;"> <span style="color: Blue;">' + result.d.CodigoTicket.toString() + '</span><span style="color: BLUE; float: right">' + result.d.FechaRegistro.toString() + '</span>&nbsp;&nbsp;&nbsp;' + result.d.Asunto.toString() + '<br />' + result.d.Usuario.vcNom.toString() + '<span style="color: RED; float: right; text-shadow: 0px 2px 4px whait;">CHAT</span></div>');
            $("#" + i.toString() + '-' + result.d.P_inCod.toString()).hide();
            $("#" + i.toString() + '-' + result.d.P_inCod.toString()).button({ icons: { secondary: "ui-icon-alert"} });
            $("#" + i.toString() + '-' + result.d.P_inCod.toString()).unbind('mouseleave.button');
            $("#" + i.toString() + '-' + result.d.P_inCod.toString()).unbind('mouseenter.button');
            $("#" + i.toString() + '-' + result.d.P_inCod.toString()).live("click", function () {
                obtenerDetalle(this);
            });
            var tick = result.d;
            tick.Emisor = parametros[0];
            tick.Receptor = parametros[2];
            tickets.push(tick);

            window.parent.socket.emit("ComenzarChatConfirmacion", '0|' + tick.Receptor + '|' + tick.Emisor + '|' + tick.CodigoTicket);

            $("#" + i.toString() + '-' + result.d.P_inCod.toString()).show(300);
            //$('#MensajesChat').show(300);
            //});
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
}

function ConfirmacionSesionTecnico(datosServidor) {

    var parametros = datosServidor;
    $('#btnIniciarSesion span').text('Cerrar sesion');
    $("#divIconoSesion").fadeOut("fast", function () {
        $("#divIconoSesion img").attr('src', '../../Images/Tickets/UsuarioConectado.png');
        $("#divIconoSesion").fadeIn("fast");
    });

}

function ConfirmacionCerrarSesionTecnico(datosServidor) {
    var parametros = datosServidor;
    $('#btnIniciarSesion span').text('Iniciar sesion');
    $("#divIconoSesion").fadeOut("fast", function () {
        $("#divIconoSesion img").attr('src', '../../Images/Tickets/UsuarioDesconectado.png');
        $("#divIconoSesion").fadeIn("fast");
    });

}

function RecibirMensaje(datosServidor) {//mensaje|codigoticket
    parametros = datosServidor.split('|');
    var p_incodTicket = -1;
    var j;

    for (i = 0; i < tickets.length; i++) {
        if (tickets[i].CodigoTicket == parametros[1]) {
            p_incodTicket = tickets[i].P_inCod;
            j = i;
            break;
        }
    }

    if (p_incodTicket != -1) {
        $.ajax({
            type: "POST",
            url: "AdmTck_PanelAdministracion.aspx/registrarDetalleTicket",
            data: "{'P_inCodTicket': '" + p_incodTicket + "'," +
                "'registradoPor': '" + '1' + "'," +
                "'vcDescripcion': '" + parametros[0] + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {

                if (!result.d) {
                    alert('No se insertó detalle');
                    return;
                }

                if (j == index) {
                    $('#pnlDetalle').append('<div class="msm" style="width: 99%; text-align: right; overflow:auto; border-bottom:1px solid white; word-wrap: break-word;"> <p> <span  style="font-size:9pt;float:right"> ' + parametros[0] + '</span> <span  style="font-size:10pt; float:right; font-weight: bold;">' + tickets[j].Usuario.vcNom + ' dice: </span>  </p></div>');
                }
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            }
        });
    }
}



function fnUsuariosConectados(data) {
    //alert(data);
    var mUsuarios = data.split(',');
    for (i in mUsuarios) {
        //fnAgregarCabeceraGeneral(i, mUsuarios[i].split('-')[0], mUsuarios[i].split('-')[1], "estadoInactivo.png", "");

        var oUsuario = new Usuario();
        oUsuario.P_inCod = mUsuarios[i].split("-")[0];
        oUsuario.vcUsu = mUsuarios[i].split("-")[0];
        oUsuario.vcNom = mUsuarios[i].split("-")[1];
        oUsuario.Grupo = "General";

        if (oUsuario.P_inCod == null || oUsuario.P_inCod == '') {
            return;
        }

        //valida si existe el usuario...
        if (fnValidaSiExisteUsuario(oUsuario.P_inCod) != -1) {
            return;
        }
        fnAgregarCabeceraGeneral2(oUsuario, "estadoActivo.png", "");

        usuarios.push(oUsuario);

        //$('.img_usuario_' + mUsuarios[i]).attr("src", "../../Common/Images/Chat/estadoActivo.png");
        //$('.img_message_usuario_' + mUsuarios[i]).show()
    }

    //Cargar usuarios...


}

function fnUsuarioDesconectado(Usuario) {
    //alert('usuario desconectado');
    var mUsuarios = Usuario.split(',');
    for (i in mUsuarios) {
        $('.img_usuario_' + mUsuarios[i]).attr("src", "../../Common/Images/Chat/estadoInactivo.png");
    }
}

function fnAgregarMensaje(vIdUsuario, vNombreUsuario, vMensaje, vIdTicket) {
    var vFecha = ObtieneFechaGeneral();
    var vHora = ObtieneHoraGeneral();
    var vIndiceUsuario = fnValidaSiExisteUsuario(vIdUsuario);
    if (vIndiceUsuario == -1) {
        fnAgregarCabeceraUsuario(vIdTicket, vMensaje, vNombreUsuario, vIdUsuario, vMensaje);
    }
    vIndiceUsuario = fnValidaSiExisteUsuario(vIdUsuario);

    vMensaje = vMensaje.replace(/\</g, '&lt;').replace(/\>/g, '&gt;');

    if (vIndiceUsuario != -1 && CodigoItemActualSeleccionado != vIdTicket) {
        $("#User_" + vIdUsuario).addClass("focusUsuario");
        $("#User_" + vIdUsuario).children("div").children("img").show();
        //Mostrar el icono de activo (asegurar)...

        //$("#img_usuario_" + vIdUsuario).attr("src", "../../Common/Images/Chat/estadoActivo.png");

        //Mostrar el icono de nuevo mensaje
        //$('#img_message_usuario_' + vIdUsuario).addClass("focusUsuario");
        $('#img_message_usuario_' + vIdUsuario).show();
    }
    if (CodigoItemActualSeleccionado == vIdTicket) {
        $('#pnlDetalle').append('<div class="msm" style="width: 99%; text-align: left; overflow:auto; border-bottom:1px solid white; word-wrap: break-word;"> <p> <span  style="font-size:10px; font-weight: bold;"> (' + vFecha + ' - ' + vHora + ') ' + vNombreUsuario + ' dice: </span><span  style="font-size:9pt;"> ' + fnVerificarEmoticones(vMensaje) + '</p></div>');
        //Envia el foco del detalle al final...
        $("#pnlDetalle").scrollTop($("#pnlDetalle")[0].scrollHeight);

        //Quitar imagen mensaje...
        $("#User_" + vIdUsuario).children("div").children("img").hide();
    }
    //window.parent.socket.emit("MensajeDeUsuarioRecibido", "OK");
}

function fnValidaSiExisteUsuario(idUsuario) {
    var _return = -1;
    if (usuarios != null) {
        for (i = 0; i < usuarios.length; i++) {
            if (usuarios[i] == null) {
                break;
            }
            if (usuarios[i].P_inCod == idUsuario) {
                _return = i;
                break;
            }
        }
    }
    return _return;
}

function fnValidaSiExisteTicket(idTicket) {
    var _return = -1;
    for (i = 0; i < tickets.length; i++) {
        if (tickets[i].P_inCod == idTicket) {
            _return = i;
            break;
        }
    }
    return _return;
}


$.timer(700, function (temporizador) {
    var i = 0;
    for (i = 0; i < $(".focusticket").length; i++) {
        if ($($(".focusticket")[i]).hasClass("ui-tabs-nav")) {
            $($(".focusticket")[i]).removeClass("btnTicket ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all ui-button ui-widget ui-button-text-only");
            $($(".focusticket")[i]).addClass("btnTicket ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only");
        }
        //$("#" + vIndiceTicket + "-" + vIdTicket).addClass("focusticket"); //addClass("btnTicket ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all ui-button ui-widget ui-button-text-only focusticket");
        else {
            $($(".focusticket")[i]).removeClass("btnTicket ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only");
            $($(".focusticket")[i]).addClass("btnTicket ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all ui-button ui-widget ui-button-text-only");
            //$($(".focusticket")[i]).addClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header");
        }
    }

    var idUsuario = '';
    var i = 0;
    for (i = 0; i < $(".focusUsuario").length; i++) {

        idUsuario = $($(".focusUsuario")[i]).attr("id").replace("User_", "");

        if ($($(".focusUsuario")[i]).hasClass("clasetemporal")) {
            $($(".focusUsuario")[i]).removeClass("clasetemporal");
            //$($(".focusUsuario")[i]).children("div").children("img").attr("src", "../../Common/Images/Chat/mail.png"); //.addClass("btnTicket ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only");

            $("#img_message_usuario_" + idUsuario).show();
            $("#img_message_usuario_" + idUsuario).attr("src", "../../Common/Images/Chat/mail.png");

            //img_message_usuario_
            //$('#ddlTickets').children('option')
            //"img_usuario_' + objUsuario.vcUsu.toString() + '"
        }
        //$("#" + vIndiceTicket + "-" + vIdTicket).addClass("focusticket"); //addClass("btnTicket ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all ui-button ui-widget ui-button-text-only focusticket");
        else {
            $($(".focusUsuario")[i]).addClass("clasetemporal");
            //$($(".focusUsuario")[i]).children("div").children("img").attr("src", "");

            $("#img_message_usuario_" + idUsuario).hide();
            $("#img_message_usuario_" + idUsuario).attr("src", "");
            //$($(".focusticket")[i]).addClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header");
        }
    }

});


function fnAgregarCabecera(vIdTicket, Asunto, vcNomUsuario, vcIdUsuario, vcMensaje) {
    if (fnValidaSiExisteTicket(vIdTicket) != -1) {
        //alert('existe: ' + vIdTicket);
        return;
    }
    var P_inCod = vIdTicket;
    var CodigoTicket = 'TCK' + Right('000000000' + vIdTicket, 9);
    var FechaRegistro = ObtieneFechaGeneral();
    //alert('vIdTicket: ' + vIdTicket)
    $.ajax({
        type: "POST",
        url: "AdmTck_PanelAdministracion.aspx/obtenerUnTicket",
        data: "{'p_inCod': '" + P_inCod + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {

            if ($(result.d).length == 0) {
                //alerta("No existen tickets asignados para usted");
                return;
            }

            iUltimoIndiceTicket += 1;
            var i = 0;
            for (i = 0; i < $(result.d).length; i++) {
                fnAgregarCabeceraGeneral(iUltimoIndiceTicket, result.d[i].Estado.P_inCod, result.d[i], "estadoActivo.png", " focusticket");
                tickets.push(result.d[i]);
            }

            $(".btnTicket").button();
            $(".btnTicket").unbind('mouseleave.button');
            $(".btnTicket").unbind('mouseenter.button');
            $(".btnTicketChat").button({ icons: { secondary: "ui-icon-alert"} });
            $(".btnTicketChat").unbind('mouseleave.button');
            $(".btnTicketChat").unbind('mouseenter.button');

            fnAgregarMensaje(vcIdUsuario, vcNomUsuario, vcMensaje, vIdTicket);

        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
}

function fnAgregarCabeceraUsuario(vIdTicket, Asunto, vcNomUsuario, vcIdUsuario, vcMensaje) {
    if (fnValidaSiExisteUsuario(vcIdUsuario) != -1) {
        /*
        window.parent.TotalUsuariosConectados = $("img:visible").attr("src", "../../Common/Images/Chat/estadoActivo.png").length - 1;
        window.parent.socket.emit("TotalUsuariosConectados", window.parent.TotalUsuariosConectados);
        */
        //Mostrar el icono de activo (asegurar)...
        $("#img_usuario_" + vcIdUsuario).attr("src", "../../Common/Images/Chat/estadoActivo.png");
        //Mostrar el icono de nuevo mensaje
        $("#User_" + vcIdUsuario).addClass("focusUsuario");
        $('#img_message_usuario_' + vcIdUsuario).show();
        return;
    }
    var P_inCod = vIdTicket;
    var CodigoTicket = 'TCK' + Right('000000000' + vIdTicket, 9);
    var FechaRegistro = ObtieneFechaGeneral();
    //alert('vIdTicket: ' + vIdTicket)


    var oUsuario = new Usuario();
    oUsuario.P_inCod = vcIdUsuario;
    oUsuario.vcNom = vcNomUsuario;
    oUsuario.vcUsu = vcIdUsuario;
    oUsuario.Grupo = "General";
    fnAgregarCabeceraGeneral2(oUsuario, "estadoActivo.png", " focusUsuario");

    usuarios.push(oUsuario);

    /*
    $.ajax({
    type: "POST",
    url: "AdmTck_PanelAdministracion.aspx/obtenerUnUsuarioPorTicketAbiertos",
    data: "{'idUsuario':'" + vcIdUsuario + "'}",
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function (result) {

    if (!result.d) {
    return;
    };

    var oUsuario = null;
    for (var i = 0; i < $(result.d).length; i++) {
    oUsuario = result.d[i];
    fnAgregarCabeceraGeneral2(result.d[i], "estadoActivo.png", " focusUsuario");
    };

    //$('#img_message_usuario_' + $(result.d)[0].vcUsu).addClass("focusUsuario");
    $('.img_message_usuario_' + $(result.d)[0].vcUsu).show()

    if (oUsuario != null) {
    usuarios.push(oUsuario);
    }
    },
    error: function (xhr, err, thrErr) {
    MostrarErrorAjax(xhr, err, thrErr);
    }
    });
    */
    //    return;

    //    $.ajax({
    //        type: "POST",
    //        url: "AdmTck_PanelAdministracion.aspx/obtenerUnTicket",
    //        data: "{'p_inCod': '" + P_inCod + "'}",
    //        contentType: "application/json; charset=utf-8",
    //        dataType: "json",
    //        success: function (result) {

    //            if ($(result.d).length == 0) {
    //                //alerta("No existen tickets asignados para usted");
    //                return;
    //            };

    //            iUltimoIndiceTicket += 1;
    //            for (var i = 0; i < $(result.d).length; i++) {
    //                fnAgregarCabeceraGeneral(iUltimoIndiceTicket, result.d[i].Estado.P_inCod, result.d[i], "estadoActivo.png", " focusticket");
    //                tickets.push(result.d[i]);
    //            };

    //            $(".btnTicket").button();
    //            $(".btnTicket").unbind('mouseleave.button');
    //            $(".btnTicket").unbind('mouseenter.button');
    //            $(".btnTicketChat").button({ icons: { secondary: "ui-icon-alert"} });
    //            $(".btnTicketChat").unbind('mouseleave.button');
    //            $(".btnTicketChat").unbind('mouseenter.button');

    //            fnAgregarMensaje(vcIdUsuario, vcNomUsuario, vcMensaje, vIdTicket);

    //        },
    //        error: function (xhr, err, thrErr) {
    //            MostrarErrorAjax(xhr, err, thrErr);
    //        }
    //    });
}


function fnAgregarCabeceraGeneral(vIndice, vEstado, objTicket, vImagenUsuario, vClaseAdicional) {

    //fnAgregarCabeceraGeneral2(vIndice, vEstado, objTicket, vImagenUsuario, vClaseAdicional);

    var Asunto = objTicket.Asunto.toString();
    var Fecha = objTicket.FechaRegistro.toString();
    if (Fecha.length == 17) {
        Fecha = Fecha.substr(6, 2) + '/' + Fecha.substr(4, 2) + '/' + Fecha.substr(0, 4) + ' ' + Fecha.substr(9);
    }
    if (Asunto.length > 25) {
        Asunto = Asunto.substr(0, 25);
        Asunto += '...';
    }

    switch (vEstado) {

        case 1:
            $('#panelTickets').append('<div  id="' + vIndice.toString() + '-' + objTicket.P_inCod.toString() + '" name="0" class="btnTicket' + vClaseAdicional + '" style="width: 99%;height: 50px; text-align: left;color: Black;"> <span style="color: Blue;">' + objTicket.CodigoTicket.toString() + '</span><span style="color: BLUE; float: right">' + Fecha + '</span>&nbsp;&nbsp;&nbsp;' + Asunto + '<br /><span style="color: #576844;"><table border="0"><tr><td><img class="img_usuario_' + objTicket.Usuario.vcUsu.toString() + '" src="../../Common/Images/Chat/' + vImagenUsuario + '"/></td><td>' + objTicket.Usuario.vcNom.toString() + '</td></tr></table></span></div>'); //<span style="color: BLACK; float: right">SIN ASIGNACION</span></div>');
            break;
        case 2:
            if (objTicket.EsChat) {
                $('#MensajesChat').append('<div  id="' + vIndice.toString() + '-' + objTicket.P_inCod.toString() + '" name="0" class="btnTicketChat' + vClaseAdicional + '" style="width: 99%;height: 50px;  text-align: left;color: Black;"> <span style="color: Blue;">' + objTicket.CodigoTicket.toString() + '</span><span style="color: BLUE; float: right">' + Fecha + '</span>&nbsp;&nbsp;&nbsp;' + Asunto + '<br /><span style="color: #576844;"><table border="0"><tr><td><img class="img_usuario_' + objTicket.Usuario.vcUsu.toString() + '" src="../../Common/Images/Chat' + vImagenUsuario + '"/></td><td>' + objTicket.Usuario.vcNom.toString() + '</td></tr></table></span></div>'); //<span style="color: red; float: right; text-shadow: 0px 2px 4px whait;">CHAT</span></div>');
            }
            else {
                $('#panelTickets').append('<div  id="' + vIndice.toString() + '-' + objTicket.P_inCod.toString() + '" name="0" class="btnTicket' + vClaseAdicional + '" style="width: 99%;height: 50px; text-align: left;color: Black;"> <span style="color: Blue;">' + objTicket.CodigoTicket.toString() + '</span><span style="color: BLUE; float: right">' + Fecha + '</span>&nbsp;&nbsp;&nbsp;' + Asunto + '<br /><span style="color: #576844;"><table border="0"><tr><td><img class="img_usuario_' + objTicket.Usuario.vcUsu.toString() + '" src="../../Common/Images/Chat/' + vImagenUsuario + '"/></td><td>' + objTicket.Usuario.vcNom.toString() + '</td></tr></table></span></div>'); //<span style="color: GREEN; float: right; text-shadow: 0px 2px 4px whait;">ACTIVO</span></div>');
            }
            break;
        case 3:
            $('#panelTickets').append('<div  id="' + vIndice.toString() + '-' + objTicket.P_inCod.toString() + '" name="0" class="btnTicket' + vClaseAdicional + '" style="width: 99%;height: 50px; text-align: left;color: Black;"> <span style="color: Blue;">' + objTicket.CodigoTicket.toString() + '</span><span style="color: BLUE; float: right">' + Fecha + '</span>&nbsp;&nbsp;&nbsp;' + Asunto + '<br /><span style="color: #576844;"><table border="0"><tr><td><img class="img_usuario_' + objTicket.Usuario.vcUsu.toString() + '" src="../../Common/Images/Chat/' + vImagenUsuario + '"/></td><td>' + objTicket.Usuario.vcNom.toString() + '</td></tr></table></span></div>'); //<span style="color: ORANGE; float: right; text-shadow: 0px 2px 4px whait;">ANULADO</span></div>');
            break;
        case 4:
            $('#panelTickets').append('<div  id="' + vIndice.toString() + '-' + objTicket.P_inCod.toString() + '" name="0" class="btnTicket' + vClaseAdicional + '" style="width: 99%;height: 50px; text-align: left;color: Black;"> <span style="color: Blue;">' + objTicket.CodigoTicket.toString() + '</span><span style="color: BLUE; float: right">' + Fecha + '</span>&nbsp;&nbsp;&nbsp;' + Asunto + '<br /><span style="color: #576844;"><table border="0"><tr><td><img class="img_usuario_' + objTicket.Usuario.vcUsu.toString() + '" src="../../Common/Images/Chat/' + vImagenUsuario + '"/></td><td>' + objTicket.Usuario.vcNom.toString() + '</td></tr></table></span></div>'); //<span style="color: BLUE; float: right; text-shadow: 0px 2px 4px whait;">CERRADO</span></div>');
            break;
        case 5:
            $('#panelTickets').append('<div  id="' + vIndice.toString() + '-' + objTicket.P_inCod.toString() + '" name="0" class="btnTicket' + vClaseAdicional + '" style="width: 99%;height: 50px; text-align: left;color: Black;"> <span style="color: Blue;">' + objTicket.CodigoTicket.toString() + '</span><span style="color: BLUE; float: right">' + Fecha + '</span>&nbsp;&nbsp;&nbsp;' + Asunto + '<br /><span style="color: #576844;"><table border="0"><tr><td><img class="img_usuario_' + objTicket.Usuario.vcUsu.toString() + '" src="../../Common/Images/Chat/' + vImagenUsuario + '"/></td><td>' + objTicket.Usuario.vcNom.toString() + '</td></tr></table></span></div>'); //<span style="color: GRAY; float: right; text-shadow: 0px 2px 4px whait;">AYUDA SUPERVISOR</span></div>');
            break;
        default:
            break;
    }

}


var i = 0;
var indGrupo = 0;
var arrblGrupoUsuario = [];
function fnAgregarCabeceraGeneral2(objUsuario, vImagenUsuario, vClaseAdicional) {
    if (objUsuario == null) { return; }

    var NombreUsuario = objUsuario.vcNom.toString(); // + ':' + objUsuario.Grupo;
    if (NombreUsuario.length > 30) {
        NombreUsuario = NombreUsuario.substr(0, 30);
        NombreUsuario += '...';
    }

    var blExisteGrupo = false;
    var IndiceExisteGrupo = -1;
    for (iGrupo in arrblGrupoUsuario) {
        if (arrblGrupoUsuario[iGrupo][2] == objUsuario.Grupo) {
            IndiceExisteGrupo = parseInt(iGrupo) + 1;
            break;
        }
    }

    if (IndiceExisteGrupo == -1) {
        indGrupo++;
        IndiceExisteGrupo = indGrupo;

        var NombreGrupo = objUsuario.Grupo;
        if (NombreGrupo != null) {
            if (NombreGrupo.length > 22) {
                NombreGrupo = NombreGrupo.substr(0, 22);
                NombreGrupo += '...';
            }
        }


        $('#panelTickets2').append('<div id = "grupo_' + indGrupo + '" class="grupoUsuarios" style="vertical-align:middle;height:22px;line-height: 22px;background-color: #F0F0F0;font-weight:bold; color: #0072C6;border-style:solid;border-color:#B1D6F0;border-width: 1px; "><img id = "img_grupo_' + indGrupo + '" src="../../Common/Images/Chat/ico_2_default.png" /> Grupo: ' + NombreGrupo + '</div><table border="0" cellpadding="0" cellspacing="0"><tr height="2px"></tr></table><div id = "grupodetalle_' + indGrupo + '"></div>');
        arrblGrupoUsuario.push(["grupo_" + indGrupo, false, objUsuario.Grupo]);
    }

    //$("#grupodetalle_" + IndiceExisteGrupo).append()
    //$('#panelTickets2').append('<div class="usergrupousuario grupo_' + indGrupo + vClaseAdicional + '" id="User_' + objUsuario.P_inCod.toString() + '" name="0" style="width: 100%;height: 20px; text-align: left;color: Black;"> <span style="color: #576844;"><table border="0"><tr><td><img class="img_usuario_' + objUsuario.vcUsu.toString() + '" src="../../Common/Images/Chat/' + vImagenUsuario + '"/></td><td>' + NombreUsuario + '</td></tr></table></span> </div>');
    $("#grupodetalle_" + IndiceExisteGrupo).append('<div grupo="' + IndiceExisteGrupo + '" nomusuario=" ' + NombreUsuario + ' " class="usergrupousuario grupo_' + IndiceExisteGrupo + vClaseAdicional + '" id="User_' + objUsuario.P_inCod.toString() + '" name="0" style="width: 100%;height: 20px; text-align: left;color: Black;"> <span style="color: #576844;"><table border="0"><tr><td><img id="img_usuario_' + objUsuario.P_inCod.toString() + '" class="img_usuario_' + objUsuario.vcUsu.toString() + '" src="../../Common/Images/Chat/' + vImagenUsuario + '"/></td><td>' + NombreUsuario + '</td></tr></table></span> <div style="position: absolute; right: 35px;margin-top: -16px; "><img style="display:none;" id="img_message_usuario_' + objUsuario.P_inCod.toString() + '" class="img_message_usuario_' + objUsuario.vcUsu.toString() + '" src="../../Common/Images/Chat/mail.png" /></div></div>');

    i += 1;

    $("#grupo_" + IndiceExisteGrupo).css({ "cursor": "hand", "cursor": "pointer" });

    $('#User_' + objUsuario.P_inCod.toString()).live("click", function () {
        obtenerDetalle2(this);
    });

}


function fnGrupoUsuarios_mousemove(objGrupo) {
    var blEstadoGrupo = arrblGrupoUsuario[$(objGrupo).attr("id").replace('grupo_', '') - 1][1];
    if (!blEstadoGrupo) {
        $("#img_" + $(objGrupo).attr("id")).attr("src", "../../Common/Images/Chat/ico_2_over.png");
    }
    else {
        $("#img_" + $(objGrupo).attr("id")).attr("src", "../../Common/Images/Chat/ico_1_over.gif");
    }

}
function fnGrupoUsuarios_mouseout(objGrupo) {
    var blEstadoGrupo = arrblGrupoUsuario[$(objGrupo).attr("id").replace('grupo_', '') - 1][1];
    if (!blEstadoGrupo) {
        $("#img_" + $(objGrupo).attr("id")).attr("src", "../../Common/Images/Chat/ico_2_default.png");
    }
    else {
        $("#img_" + $(objGrupo).attr("id")).attr("src", "../../Common/Images/Chat/ico_1_default.gif");
    }
}

function fnGrupoUsuario_Click(objGrupo) {

    //blGrupoUsuario = !blGrupoUsuario;
    var blEstadoGrupo = arrblGrupoUsuario[$(objGrupo).attr("id").replace('grupo_', '') - 1][1];
    blEstadoGrupo = !blEstadoGrupo;
    arrblGrupoUsuario[$(objGrupo).attr("id").replace('grupo_', '') - 1][1] = blEstadoGrupo;

    if (blEstadoGrupo == true) {
        $("." + $(objGrupo).attr("id")).hide();
    }
    else {
        $("." + $(objGrupo).attr("id")).show();
    }

    if (!blEstadoGrupo) {
        $("#img_" + $(objGrupo).attr("id")).attr("src", "../../Common/Images/Chat/ico_2_over.png");
    }
    else {
        $("#img_" + $(objGrupo).attr("id")).attr("src", "../../Common/Images/Chat/ico_1_over.gif");
    }
    if ($.trim($("#txtBuscaUsuario").val()) != '') {
        fnFiltrarUsuarioSeleccionado();
    }
}

var focoUsuario = '';
var focoGrupo = '';
function fnusergrupousuario_Click(objUsuario) {
    $(".usergrupousuario").css({ "background-color": "#FFFFFF" });
    $(objUsuario).css({ "background-color": "#E6F2FA", "cursor": "default" });
    focoUsuario = $(objUsuario).attr("id");

    $(objUsuario).removeClass("focusUsuario");

    focoGrupo = $(objUsuario).attr("grupo");

    //Ocultar Icono Mensaje...
    $('#img_message_usuario_' + $(objUsuario).attr("id").replace("User_", "")).hide();
}

function fnusergrupousuario_mousemove(objUsuario) {
    $(objUsuario).css({ "background-color": "#E6F2FA", "cursor": "default" });
    //$(objUsuario).addClass('ui-accordion-header ui-helper-reset ui-state-hover ui-corner-all');
}

function fnusergrupousuario_mouseout(objUsuario) {
    if (focoUsuario != $(objUsuario).attr("id")) {
        $(objUsuario).css({ "background-color": "#FFFFFF", "cursor": "default" });
    }
    //$(objUsuario).addClass('ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all');
}

//$('.img_usuario_' + mUsuarios[i]).attr("src", "../../Common/Images/Chat/estadoActivo.png");




function fnCargarUsuariosConTicketsPendientes() {

    $.ajax({
        type: "POST",
        url: "AdmTck_PanelAdministracion.aspx/obtenerUsuariosPorTicketAbiertos",
        data: "{}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {

            if (!result.d) {
                return;
            }

            var i = 0;
            for (i = 0; i < $(result.d).length; i++) {
                fnAgregarCabeceraGeneral2(result.d[i], "estadoInactivo.png", "");
            }

            usuarios = result.d;

        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });

}


function fnGrabarMensajeNoLeidoParaUsuario(idTicket) {

    $.ajax({
        type: "POST",
        url: "AdmTck_PanelAdministracion.aspx/GrabarMensajeNoLeidoParaUsuario",
        data: "{'CodigoTicket':'" + idTicket + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            //TODO...
        },
        error: function (xhr, err, thrErr) {
            //MostrarErrorAjax(xhr, err, thrErr);
        }
    });

}

function fnFiltrarUsuarioSeleccionado() {
    var strValor = $("#txtBuscaUsuario").val();
    $(".usergrupousuario").each(function () {
        if ($(this).attr("nomusuario").toUpperCase().indexOf(strValor.toUpperCase()) > -1) {
            $(this).show();
        }
        else {
            $(this).hide();
        }
        //$("#txtBuscaUsuario").val($(this).attr("nomusuario"));
    });


}

function fnCerrarTodosLosTickets() {

    if (!confirm("Se cerrarán todos los tickets del usuario ¿Continuar con el proceso?")) {
        return false;
    }


    $.ajax({
        type: "POST",
        url: "AdmTck_PanelAdministracion.aspx/CerrarTodosTickets",
        data: "{'CodigoUsuario': '" + focoUsuario.replace("User_", "") + "'," +
                        "'p_inCodEstado': '" + 'RES' + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {

            $("#pnlPrincipaldetalle").hide();
            $("#" + focoUsuario).remove();

            //Quitar de la matriz de usuarios..
            var indice = -1;
            for (i in usuarios) {
                if (usuarios[i].P_inCod == focoUsuario.replace("User_", "")) {
                    indice = i;
                    break;
                }
            }
            //delete usuarios[indice];
            if (indice > -1) {
                usuarios.splice(indice, 1);
            }

            //Valida si quita el Grupo...
            if ($("#grupodetalle_" + focoGrupo).children('div').length == 0) {
                $("#grupo_" + focoGrupo).remove();
                $("#grupodetalle_" + focoGrupo).remove();
            }

        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });

}





function registrarCerrarTicket() {

    if ($.trim($("#txtConclusion").val()) == "") {
        Mensaje("<br/><h1>Debe ingresar la conclusión a la cual <br/> se llegado para cerrar ticket</h1><br/>", document);
        $("#txtConclusion").focus();
        return;
    }

    //var id = $("#gridSolicitud").jqGrid('getGridParam', 'selrow');
    //if (id) {
    //var datos = $("#gridSolicitud").jqGrid('getRowData', id);
    var IdTicket = parseInt($("#ddlTickets").val().replace('TCK', '')); 
    var CodEstado;
    if ($('#rbResuelto').is(':checked')) {
        CodEstado = "RES";
    }
    else {
        CodEstado = "ANU";
    }
    //alert(IdTicket);

    $.ajax({
        type: "POST",
        url: "../SolicitudesAtencion/SOA_Adm_Solicitudes.aspx/cerrarTicket",
        data: "{'prIdTicket': '" + IdTicket + "'," +
            "'prCodEstado': '" + CodEstado + "'," +
            "'prConclucion': '" + $("#txtConclusion").val() + "'," +
            "'prIdTecnico': '" + $("#hdfIdTecnico").val() + "','prChat':'1'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {

            var resultado = result.d;

            if (resultado.split('|')[0] == 'OK') {
                //alerta("Ticket cerrado exitosamente");
                Mensaje("<br/><h1>Ticket cerrado exitosamente</h1><br/>", document);

                ActualizarLuegoDeCerrarTicket();
            }
            else {
                //alert(resultado.split('|')[1]);
                Mensaje("<br/><h1>" + resultado.split('|')[1] + "</h1><br/>", document);
            }
            $('#dvCerrar').dialog("close");

        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
    //}
    //else {
    //    //alerta("Seleccione un registro");
    //    Mensaje("<br/><h1>Seleccione un registro</h1><br/>", document);
    //}
}


function ActualizarLuegoDeCerrarTicket() {

    var iTotalTickets = $('#ddlTickets').children('option').length;
    if (iTotalTickets > 1) {
        $("#ddlTickets option[value='" + $('#ddlTickets').val() + "']").remove();
        var UltimoCodigoTicket = $("#ddlTickets").children('option').first().val();
        $('#ddlTickets').val(UltimoCodigoTicket);
        var _index = $("#ddlTickets").children('option').first().index() + 1;
        $('div #pnlHeadDetalle').empty();
        $('div #pnlHeadDetalle').append('<div style="width: 99%; text-align: left; overflow:auto; font-size:11px; ">Descripción: ' + tickets[_index].Descripcion.toString() + '</div>');
        cargarDetalleComunicacion(UltimoCodigoTicket, _index);
        $("#pnlDetalle").scrollTop($("#pnlDetalle")[0].scrollHeight);
        $("#txtDescripcionDetalle").focus();
    }
    else {
        $("#pnlPrincipaldetalle").hide();
        $("#" + focoUsuario).remove();
    }


    //Quitar de la matriz de usuarios..
    var indice = -1;
    for (i in usuarios) {
        if (usuarios[i].P_inCod == focoUsuario.replace("User_", "")) {
            indice = i;
            break;
        }
    }
    //delete usuarios[indice];
    if (indice > -1) {
        usuarios.splice(indice, 1);
    }

    //Valida si quita el Grupo...
    if ($("#grupodetalle_" + focoGrupo).children('div').length == 0) {
        $("#grupo_" + focoGrupo).remove();
        $("#grupodetalle_" + focoGrupo).remove();
    }


    if (window.parent.ChatActivo == true) {
        window.parent.socket.emit("EnviarAdministradorCerroTicket", tickets[index].Usuario.P_inCod + '|' + tickets[index].P_inCod.toString());
    }

}