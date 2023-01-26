//Este modelo soporta un solo Administrador que atiende solicitudes.

var socket;
var IPServer; //= "130.1.7.78";
var PuertoServer; // = "5555";
//var IPServer = "130.1.7.78";
var IdUsuario = '';
var IdTicket = '';
var NombreUsuario = '';
var DescripcionUsuario = '';
var TipoUsuario = '';
var PrimerMensaje = true;
var TicketCerrado = false;
var CodTecnicoAsignado = '';

function Usuario(P_inCod, Usuario, TipoTicket) {
    this.P_inCod = P_inCod;
    this.Usuario = Usuario;
    this.TipoTicket = TipoTicket;
}

$(function () {
    IPServer = $("#hdfIpNode").val();
    PuertoServer = $("#hdfPuertoNode").val();

    if (fnSinAccesoXGrupoOrigen()) {
        return;
    }

    if ($.browser.msie && parseInt($.browser.version) <= 9) {
        $('#pnlDetalle').width('370');
    }

    IdUsuario = $("#hfIdUsuario").val();
    NombreUsuario = $("#hfNombreUsuario").val();
    DescripcionUsuario = $("#hfDescripcionUsuario").val();
    TipoUsuario = $("#hfTipoUsuario").val();

    $("#dvConectando").show();

    iniciarSocket();

    socket.emit("IniciaConexion", IdUsuario + "," + DescripcionUsuario + "," + TipoUsuario);

    $(document).keypress(function (e) {
        if (e.which == 13) return false;
    });

    function iniciarSocket() {
        socket = io.connect("http://" + IPServer + ":" + PuertoServer);
        socket.on("MensajeUsuario", MensajeUsuario);
        socket.on("MensajeNoUsuario", MensajeNoUsuario);
        //socket.on("AdministradoresLogeados", AdministradoresLogeados);
        socket.on("UsuariosLogeados", UsuariosLogeados);
        socket.on("AlgunUsuarioDesconectado", AlgunUsuarioDesconectado);

        socket.on("fnSinAdministradores", fnSinAdministradores);
        socket.on("fnAdministradoresConectados", fnAdministradoresConectados);
        //socket.on("fnSinAccesoXGrupoOrigen", fnSinAccesoXGrupoOrigen);

        socket.on("MensajeAdministrador", fnMensajeAdministrador);
        socket.on("AdministradorDesconectado", fnAdministradorDesconectado);
        socket.on("AdministradorConectado", fnAdministradorConectado);
        socket.on("AdministradorCerroTicket", fnAdministradorCerroTicket);
        socket.on("TotalUsuariosConectados", fnTotalUsuariosConectados);

        socket.on("TecnicoAsignado", fnTecnicoAsignado);


        socket.on('disconnect', function () {
            //console.log('Disconnected');
            //alert('desconectado');
            //alert('Reconectado...');
            socket.socket.reconnect();
        });

        //descomentar en un ambiente real donde la variable usuario deberia ya estar cargada
        //socket.emit("InciaConexion", $("#hdfId").val() + "," + $("#hdfUsuario").val());
    }

    $('#ddlTipoIncidencia').change(function () {
        fnObtieneDescripcionTipo($('#ddlTipoIncidencia').val());
    });


    $("#dvSalirChat").click(function () {
        if (confirm('¿Cerrar chat?')) {
            window.close();
        }
    });

    $('#dvEntrarChat').click(function () {


        var oUsuario = new Usuario();
        oUsuario.TipoTicket = $("#ddlTipoIncidencia").val().split(',')[0];
        //alert(oUsuario.TipoTicket);

        //Valida si existen tecnicos disponibles segun el IDTIpo...
        socket.emit("ValidarTecnicoDisponible", oUsuario);


    });


    $('#txtDescripcionDetalle').keypress(function (event) {
        if (event.which == '13') {
            $('#dvEnviarMensaje').click();
        }
    });

    $('#dvEnviarMensaje').click(function () {
        //alert('intento');
        var Mensaje = '';
        Mensaje = $.trim($("#txtDescripcionDetalle").val());
        Mensaje = Mensaje.replace(/\</g, '&lt;').replace(/\>/g, '&gt;');

        //$("#txtDescripcionDetalle").attr("disabled", "disabled");
        if (Mensaje != '') {

            if (PrimerMensaje == true) {
                //Agregar cabecera...
                var asunto = $("#dvDescripcionTipo").html().replace(/'/g, "&#39");
                var vaMensaje = asunto;
                var idTipoDetallado = $('#ddlTipoIncidencia').val();
                var valTipo = "-1";
                var valSubTipo = "-1";
                var valMedio = 1;
                if (idTipoDetallado.indexOf(',') >= 0) {
                    valTipo = idTipoDetallado.split(',')[0];
                    valSubTipo = idTipoDetallado.split(',')[1];
                }

                $.ajax({
                    type: "POST",
                    url: "Chat.aspx/RegistrarTicket",
                    data: "{'pUsuario': '" + IdUsuario + "'," +
                           "'pUsuarioRegistro': '" + IdUsuario + "'," +
                           "'pMedioContacto': '" + valMedio + "'," +
                           "'pTipificacion': '" + valSubTipo + "'," +
                           "'pAsunto': '" + asunto + "'," +
                           "'pDescripcion': '" + vaMensaje + "'," +
                           "'pEsChat': true, 'CodTecnicoAsignado':'" + CodTecnicoAsignado + "'}",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (result) {
                        //debugger;
                        //alert('grabo ticket desde usuario');

                        var strTicket = result.d.split("|")[1];
                        IdTicket = '' + parseInt(result.d.split("|")[1].replace('TCK', ''), 10);
                        //alert(IdTicket);
                        fnAgregarMensaje(DescripcionUsuario, Mensaje, "#E7F3FC");
                        //Enviar mensaje por socket...
                        socket.emit("EnviaMensajeParaAdministrador", IdUsuario + "|" + DescripcionUsuario + "|" + TipoUsuario + "|" + Mensaje + "|" + IdTicket + "|" + asunto + "|true|" + ObtieneFechaGeneral() + '-' + ObtieneHoraGeneral() + '-' + ObtieneNumeroAleatorio() + "|" + CodTecnicoAsignado);
                        $("#txtDescripcionDetalle").val('');
                        $("#txtDescripcionDetalle").focus();
                        $("#pnlDetalle").scrollTop($("#pnlDetalle")[0].scrollHeight);
                        $("#lblTicket").text("Nro de Ticket: " + strTicket);

                        PrimerMensaje = false;

                    },
                    error: function (xhr, err, thrErr) {
                        //alert('error');
                        //MostrarErrorAjax(xhr, err, thrErr);
                    }
                });



            }
            else {
                //alert(CodTecnicoAsignado);
                fnAgregarMensaje(DescripcionUsuario, Mensaje, "#E7F3FC");
                //Enviar mensaje por socket...
                socket.emit("EnviaMensajeParaAdministrador", IdUsuario + "|" + DescripcionUsuario + "|" + TipoUsuario + "|" + Mensaje + "|" + IdTicket + "|||" + ObtieneFechaGeneral() + '-' + ObtieneHoraGeneral() + '-' + ObtieneNumeroAleatorio() + "|" + CodTecnicoAsignado);
                $("#txtDescripcionDetalle").val('');
                $("#txtDescripcionDetalle").focus();
                $("#pnlDetalle").scrollTop($("#pnlDetalle")[0].scrollHeight);
            }
        }
        else {
            $("#txtDescripcionDetalle").focus();
        }

    });


    $.timer(3000, function (temporizador) {
        $.ajax({
            type: "POST",
            url: "Chat.aspx/VerificaSesion",
            data: "{}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                if (result.d != "") {
                    temporizador.stop();
                    $("#dvConectando").hide();
                    $("#dvChatInicio").hide();
                    $("#dvChatMensaje").hide();
                    $("#dvSinAdministrador").show();
                    var Mensaje = "Estimado Usuario, ha finalizado su sesión.";
                    $("#lblSinAdministrador").text(Mensaje);
                    window.close();
                }
            },
            error: function (xhr, err, thrErr) {
                temporizador.stop();
                window.location.href('Login.aspx');
            }
        });
    });


});


function fnTotalUsuariosConectados(data) {
    //alert(data);
    try {

        //if (parseInt(data) > $("hdfUsuariosMaximos").val()) {
        if (parseInt(data) > parseInt($("#hdfUsuariosMaximos").val())) {
            socket.disconnect();
            $("#dvConectando").hide();
            $("#dvChatInicio").hide();
            $("#dvChatMensaje").hide();
            $("#dvSinAdministrador").show();
            var Mensaje = '';
            Mensaje = $("#hdfMsjAdminSaturado").val();
            $("#lblSinAdministrador").text(Mensaje);
        }
        
    }
    catch (err) {
        //some error
    }
}

function fnObtieneDescripcionTipo(IdTipoDetalle) {

    if (IdTipoDetalle.indexOf(',') >= 0) {
        var IdTipo = IdTipoDetalle.split(',')[0];
        var IdDetalleTipo = IdTipoDetalle.split(',')[1];
        $.ajax({
            type: "POST",
            url: "Chat.aspx/GetDescripcionTipo",
            data: "{'idtipo': '" + IdTipo + "','iddetalletipo':'" + IdDetalleTipo + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (resultado) {

                $("#dvDescripcionTipo").html(resultado.d);
                $("#dvDescripcionTipo").css({ "color": "#000000" });
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            }
        });
    }
    else {
        $("#dvDescripcionTipo").html('');
    }

    //

}







function callBackHideObtenerDetalle(boton) {

    $("div .btnTicket").removeClass('ui-state-active');
    $("div .btnTicketChat").removeClass('ui-state-active');
    $(boton).addClass('ui-state-active');
    $('div #pnlDetalle').empty();
    var codigo = $(boton).attr("id");
    //index = codigo.split('-')[0];

    var strMensajeUsuario = '';
    var strTemplateMensaje = '';
    strTemplateMensaje = '<div class="msm" style="width: 99%; text-align: left; border-bottom:1px solid white; word-wrap: break-word;">';
    strTemplateMensaje += '<table border="0" cellpadding="0" cellspacing="0" width="100%"><tr><td colspan="1"> ';
    strTemplateMensaje += '<span  style="font-size:8pt; font-weight: bold; color: #00338D;font-family:Verdana; font-size:11px;">';
    strTemplateMensaje += '(' + '{fecha}' + ' - ' + '{hora}' + ') {usuario}</span> </td></tr>';
    strTemplateMensaje += '<tr><td>&nbsp;<span  style="color: #626262;font-family:Verdana; font-size:11px;">';
    strTemplateMensaje += '{mensaje}' + ' </td></tr></table></div><br>';


    $.ajax({
        type: "POST",
        url: "chat.aspx/obtenerDetalleTicket",
        data: "{'p_inCod': '16'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {

            $('div #pnlHeadDetalle').empty();
            $('div #pnlHeadDetalle').append('<div style="width: 99%; text-align: left; overflow:auto; font-size:10pt; ">Descripción: ' + "Alguna descripcion ... " + '</div>');
            if ($(result.d).length == 0) {
                $('#pnlDetalle').append('<div class="msm" id="comodin" style="width: 99%; text-align: left; overflow: auto;"> <p><span  style="font-size:12pt; color:red;">INGRESE DETALLE</span></p></div>');
                $('div #pnlPrincipaldetalle').show('drop');
                return;
            }

            for (var i = 0; i < $(result.d).length; i++) {
                var Fecha = result.d[i].FechaRegistro.substring(6, 8) + '/' + result.d[i].FechaRegistro.substring(4, 6) + '/' + result.d[i].FechaRegistro.substring(0, 4);
                strMensajeUsuario = strTemplateMensaje;
                strMensajeUsuario = strMensajeUsuario.replace('{usuario}', result.d[i].IdUsuario.toString());
                strMensajeUsuario = strMensajeUsuario.replace('{fecha}', Fecha);
                strMensajeUsuario = strMensajeUsuario.replace('{hora}', result.d[i].HoraRegistro.toString());
                strMensajeUsuario = strMensajeUsuario.replace('{mensaje}', result.d[i].Descripcion.toString());

                $('#pnlDetalle').append(strMensajeUsuario);
                //$('#pnlDetalle').append('<div class="msm" style="width: 99%; text-align: left; overflow:auto; border-bottom:1px solid white; word-wrap: break-word;"> <p> <span  style="font-size:8pt; font-weight: bold;">' + result.d[i].IdUsuario.toString() + ' dice (' + Fecha + ' - ' + result.d[i].HoraRegistro.toString() + '): </span><span  style="font-size:9pt;"> ' + result.d[i].Descripcion.toString() + '</p></div>');
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








function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}


//Funciones Chat
fnAdministradoresConectados = function (data) {
    //Mostrar inicio session...
    $("#dvConectando").hide();
    $("#dvChatInicio").show();
    $("#dvChatMensaje").hide();
    $("#dvSinAdministrador").hide();

    //    var usuariotest = getParameterByName('testusuario');
    //    if (usuariotest != null) {
    //        //Enviar mensaje automaticamente...
    //        $('#ddlTipoIncidencia').val('1,1');
    //        $("#dvDescripcionTipo").html('Asunto de Test de: ' + usuariotest);
    //        $('#dvEntrarChat').click();
    //        $("#txtDescripcionDetalle").val("Mensaje enviado por: " + usuariotest);
    //        $('#dvEnviarMensaje').click();
    //    }

};

fnSinAdministradores = function () {

    try {
        socket.disconnect();
    }
    catch (err) {
        //some error
    }
    //document.title = 'fnSinAdministradores';

    $("#dvConectando").hide();
    $("#dvChatInicio").hide();
    $("#dvChatMensaje").hide();
    $("#dvSinAdministrador").show();

    //$("#hdfMsjSinAdmin").val();
    //$("#hdfMsjAdminSaturado").val();
    //var Mensaje = "Estimado Usuario, en estos momentos no contamos con personal disponible. Inténtelo de nuevo."
    var Mensaje = '';
    Mensaje = $("#hdfMsjSinAdmin").val();

    $("#lblSinAdministrador").text(Mensaje);
    //$("#dvChatInicio").show();
    //$("#dvSinAdministrador").hide();

};


fnSinAccesoXGrupoOrigen = function () {
    var _return = false;
    if ($("#hdfGrupoOrigenFam").val() != "True") {
        $("#dvConectando").hide();
        $("#dvChatInicio").hide();
        $("#dvChatMensaje").hide();
        $("#dvSinAdministrador").hide();
        $("#dvSinAccesoXGrupoOrigen").show();
        var MensajeGrupoOrigen = '';
        _return = true;
        Mensaje = ($("#hdfMsjSinAdmin").val() == '' ? "Estimado usuario, para ingresar este tipo de consulta por favor registre su ticket de atención en la opción 'Canal de Atención - Registrar Ticket' ." : $("#hdfMsjSinAdmin").val());
        $("#lblSinAccesoXGrupoOrigen").text(Mensaje);
    }
    return _return;
};


function UsuariosLogeados(datosServidor) {
    var parametros = datosServidor.split(",");
    for (i in parametros) {
        $("#lstUsuarios").append($("<option></option>").attr("value", parametros[i]).text(parametros[i]));
    }
}

function MensajeUsuario(datosServidor) {
    var parametros = datosServidor.split(",");

    if (parametros[0] == $("#hdfUsuario").val())//mensaje enviado
    {
        $("#chatbox_" + parametros[1] + " .chatboxcontent").append('<div class="chatboxmessage"><span class="chatboxmessagefrom">' + parametros[0] + ':&nbsp;&nbsp;</span><span class="chatboxmessagecontent">' + parametros[2] + '</span></div>');
        $("#chatbox_" + parametros[1] + " .chatboxcontent").scrollTop($("#chatbox_" + parametros[1] + " .chatboxcontent")[0].scrollHeight);
    }
    else //mensaje recibido
    {
        chatWith(parametros[0]);

        $("#chatbox_" + parametros[0] + " .chatboxcontent").append('<div class="chatboxmessage"><span class="chatboxmessagefrom">' + parametros[0] + ':&nbsp;&nbsp;</span><span class="chatboxmessagecontent">' + parametros[2] + '</span></div>');
        $("#chatbox_" + parametros[0] + " .chatboxcontent").scrollTop($("#chatbox_" + parametros[0] + " .chatboxcontent")[0].scrollHeight);

        if ($('#chatbox_' + parametros[0] + ' .chatboxcontent').css('display') == 'none') {
            MaximizaChat(parametros[0]);
        }

        Mensaje = parametros[0] + " te envio un mensaje";
        ParpadeaPagina();
    }
}

function MensajeNoUsuario(datosServidor) {
    var parametros = datosServidor.split(",");

    $("#chatbox_" + parametros[1] + " .chatboxcontent").append('<div class="chatboxmessage"><span class="chatboxmessagefrom">' + "admistrador chat" + ':&nbsp;&nbsp;</span><span class="chatboxmessagecontent">' + 'No existe' + '</span></div>');
    $("#chatbox_" + parametros[1] + " .chatboxcontent").scrollTop($("#chatbox_" + parametros[1] + " .chatboxcontent")[0].scrollHeight);
}

function AlgunUsuarioDesconectado(datosServidor) {
    var parametros = datosServidor.split(",");
    //alert(datosServidor);
    //alert('debe quitar el elemento: ' + parametros[0]);
    //$("#lstUsuarios option[value='" + parametros[0] + "']").remove();
    //$("#selectList option[value='2']").remove();
    //$("#lstUsuarios").remove($("<option></option>").attr("value", parametros[0]).text(parametros[0]));
}


function onFocus() {
    Foco = true;
}

function onBlur() {
    Foco = false;
}


function fnAgregarMensaje(usuario, mensaje, color, _align) {

    if (_align == null) {
        _align = 'left';
    }


    mensaje = mensaje.replace(/\</g, '&lt;').replace(/\>/g, '&gt;');

    //width: 99%; 
    //width="100%"
    var strMensajeUsuario = '';
    var strTemplateMensaje = '';

    //alert('x');

    //strTemplateMensaje = '<div class="msm" style="border-radius: 7px;float:' + _align + ';text-align: ' + _align + '; border-bottom:1px solid white; word-wrap: break-word;margin-left:auto; margin-right:auto;margin-top:10px;">';
    strTemplateMensaje = '<code><div class="msm" style="border-radius: 7px;text-align: ' + _align + '; border-bottom:1px solid white; word-wrap: break-word;margin-top:0px;">';
      //strTemplateMensaje = '<div class="msm" style="width: 99%; overflow:auto; border-bottom:1px solid white; word-wrap: break-word;">';

    strTemplateMensaje += '<table border="0" style="background-color:' + color + ';" cellpadding="0" cellspacing="0" ><tr><td colspan="1"> ';
    strTemplateMensaje += '<span  style="font-size:8pt; font-weight: bold; color: #00338D;font-family:Verdana; font-size:11px;">';
    strTemplateMensaje += '(' + '{fecha}' + ' - ' + '{hora}' + ') {usuario}</span> </td></tr>';
    strTemplateMensaje += '<tr><td>&nbsp;<code><span  style="width: 250px; word-wrap: break-word;color: #626262;font-family:Verdana; font-size:11px;">';
    strTemplateMensaje += '{mensaje}' + ' </span></code></td></tr></table></div></code><br>';


    var vFecha = ObtieneFechaGeneral();
    var vHora = ObtieneHoraGeneral();

    strMensajeUsuario = strTemplateMensaje;
    strMensajeUsuario = strMensajeUsuario.replace('{usuario}', usuario);
    strMensajeUsuario = strMensajeUsuario.replace('{fecha}', vFecha);
    strMensajeUsuario = strMensajeUsuario.replace('{hora}', vHora);
    strMensajeUsuario = strMensajeUsuario.replace('{mensaje}', fnVerificarEmoticones(mensaje)); //mensaje); 

    $('#pnlDetalle').append(strMensajeUsuario);

}


var UltimaDataMensajeAdministrador = '';
function fnMensajeAdministrador(data) {
    if (UltimaDataMensajeAdministrador == data) {
        return;
    }
    UltimaDataMensajeAdministrador = data;

    var usuario = data.split("|")[1];
    var Mensaje = data.split("|")[2];
    var vIdTicket = data.split("|")[3];

    //alert('vIdTicket: ' + vIdTicket);
    //alert('IdTicket: ' + IdTicket);

    //Valida que sea el mismo ticket...
    if (vIdTicket == IdTicket) {
        fnAgregarMensaje(usuario, Mensaje, "#FDFBE9", "right");
        $("#pnlDetalle").scrollTop($("#pnlDetalle")[0].scrollHeight);
    }
}


var UltimoValorEscrito = '';
function fnAdministradorDesconectado(idAdministrador) {
    if (idAdministrador != CodTecnicoAsignado) {
        return;
    }
    if (!TicketCerrado) {
        if (IdTicket != '') {
            UltimoValorEscrito = $("#txtDescripcionDetalle").val();
            $("#txtDescripcionDetalle").val("Administrador Desconectado");
            $("#txtDescripcionDetalle").attr("disabled", "disabled");
            $("#dvEnviarMensaje").hide();
        }
        else {
            $("#dvChatInicio").hide();
            $("#dvChatMensaje").hide();
            $("#dvSinAdministrador").show();
            //var Mensaje = "Estimado Usuario, en estos momentos no contamos con personal disponible. Inténtelo de nuevo."
            //$("#lblSinAdministrador").text(Mensaje);
            $("#lblSinAdministrador").text($("#hdfMsjSinAdmin").val());
            
        }
    }
}

function fnAdministradorConectado() {
    if (!TicketCerrado) {
        if (IdTicket != '') {
            if (UltimoValorEscrito == "Administrador Desconectado") {
                UltimoValorEscrito = "";
            }
            $("#txtDescripcionDetalle").val(UltimoValorEscrito);
            $("#txtDescripcionDetalle").removeAttr("disabled");
            $("#dvEnviarMensaje").show();
            //            $("#dvChatInicio").hide();
            //            $("#dvChatMensaje").show();
            //            $("#dvSinAdministrador").hide();
        }
        else {
            PrimerMensaje = true;
            $("#dvChatInicio").show();
            $("#dvChatMensaje").hide();
            $("#dvSinAdministrador").hide();
        }
    }
}

function fnAdministradorCerroTicket(data) {
    if (IdTicket != '') {
        TicketCerrado = true;
        try {
            socket.disconnect();
        }
        catch (err) {
            //some error
        }
        $("#dvChatInicio").hide();
        $("#dvChatMensaje").hide();
        $("#dvSinAdministrador").show();
        var Mensaje = "Estimado Usuario, el administrador ha cerrado el ticket.";
        $("#lblSinAdministrador").text(Mensaje);
    }

}


function fnTecnicoAsignado(_data) {
    CodTecnicoAsignado = _data;
    if (CodTecnicoAsignado != '') {
        if ($('#ddlTipoIncidencia').val() != '0') {
            $("#dvChatInicio").hide();
            $("#dvChatMensaje").show();

            $('#pnlDetalle').html('');

            $("#txtDescripcionDetalle").val('');
            $("#txtDescripcionDetalle").focus();
            //callBackHideObtenerDetalle();

        }
        else {
            $("#dvDescripcionTipo").html('Por favor, selecciona un motivo.');
            $("#dvDescripcionTipo").css({ "color": "#A80032" });
        }
    }
    else {
        $("#dvDescripcionTipo").html('<br> ' + $("#hdfMsjSinAdminDisponible").val());
        $("#dvDescripcionTipo").css({ "color": "#A80032" });
    }

}


function fnConvertirMatrizToString(_matriz) {
    var _resultado = '';
    for (x in _matriz) {
        if (_matriz[x] == 34)
            continue;
        _resultado = _resultado + String.fromCharCode(_matriz[x]);
    }
    return _resultado;
}