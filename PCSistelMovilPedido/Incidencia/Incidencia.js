var ticket;
var productos;
var arregloSeleccion = [];
var pedidos;
var planes;
var creditos;
var produc;
var filaSelec;
var ale = true;
var textEstado;
var valEstado = '';
var valkendoFiltro = '';
var ValFiltro;
var filtro, ValueFiltro;
var CodTicket, TipoMnsje;
var cont;

var vcFileName = "";

$(function () {

    $("#lblSinRegistros").hide();

    //debugger;
    if (window.parent.UsuarioConectado != $("#hfUsuario").val()) {
        window.location.href = '../Login.aspx';
        return;
    }

    enlacesLoad();
    $("#generalCarrito").show();
    $("#txtDescripcionDetalle").attr('maxlength', '118');
    onChangeDdl();

    function enlacesLoad() {
        CodTicket = DevolverParametroURL('ID');
        TipoMnsje = DevolverParametroURL('Tipo');

        $(".k-pager-refresh").live("click", function () {

            ValFiltro = (valkendoFiltro.text == undefined ? "Asunto" : valkendoFiltro.text);
            filtro = "";
            if (ValFiltro == "Asunto") {
                filtro = $("#txtAsunto").val();
                ValueFiltro = 1;
            }
            if (ValFiltro == "Código") {
                filtro = $("#txtCodigo").val();
                ValueFiltro = 2;
            }
            if (ValFiltro == "Descripción") {
                filtro = $("#txtDescripcion").val();
                ValueFiltro = 3;
            }
            if (ValFiltro == "Estado") {
                ValueFiltro = 4;
            }
            CargarFiltro();

        });

        if (CodTicket != 0) {
            $("#detalleTaps > div").hide();
            VerDetalle('', CodTicket, 1);
        } else {
            $("#tapDetalle").hide();
            $("#generalCarrito").show();
            $(".tap").removeClass("tapSelect");
            $("#tapTicket").addClass("tapSelect");
            $("#detalleTaps > div").hide(0, function () {
                $("#pSelecTicket").fadeIn(200);
            });
        }

        $('#txtAsunto').keypress(function (event) {
            if (event.which == '13') {
                ValFiltro = (valkendoFiltro.text == undefined ? "Asunto" : valkendoFiltro.text);
                filtro = "";
                if (ValFiltro == "Asunto") {
                    filtro = $("#txtAsunto").val();
                    ValueFiltro = 1;
                }
                CargarFiltro();
            }
        });

        $('#txtCodigo').keypress(function (event) {
            if (event.which == '13') {
                ValFiltro = (valkendoFiltro.text == undefined ? "Asunto" : valkendoFiltro.text);
                filtro = "";
                if (ValFiltro == "Código") {
                    filtro = $("#txtCodigo").val();
                    ValueFiltro = 2;
                }
                CargarFiltro();
            }
        });

        $('#txtDescripcion').keypress(function (event) {
            if (event.which == '13') {
                ValFiltro = (valkendoFiltro.text == undefined ? "Asunto" : valkendoFiltro.text);
                filtro = "";
                if (ValFiltro == "Descripción") {
                    filtro = $("#txtDescripcion").val();
                    ValueFiltro = 3;
                }
                CargarFiltro();
            }
        });


        $("#btnFiltroProducto").bind('click', function () {
            ValFiltro = (valkendoFiltro.text == undefined ? "Asunto" : valkendoFiltro.text);
            filtro = "";
            if (ValFiltro == "Asunto") {
                filtro = $("#txtAsunto").val();
                ValueFiltro = 1;
            }
            if (ValFiltro == "Código") {
                filtro = $("#txtCodigo").val();
                ValueFiltro = 2;
            }
            if (ValFiltro == "Descripción") {
                filtro = $("#txtDescripcion").val();
                ValueFiltro = 3;
            }
            if (ValFiltro == "Estado") {
                ValueFiltro = 4;
            }
            CargarFiltro();
        });

        $("#cmbTipo").kendoDropDownList({
            change: onChangeDdl
        });

        $("#ReqVista").kendoMultiSelect({
            change: function (e) {
                textEstado = this.value();
                CargarFiltro();
            }
        });

        //var multiselect = $("#ReqVista").data("kendoMultiSelect");
        textEstado = "";
        ObtenerEstado();

        $("#dscCelEle").click(function () {
            $("#caracCelEle").removeClass("tabSelect");
            $("#dscCelEle").addClass("tabSelect");
            $("#caracCel").hide(0, function () {
                $("#dscCel").fadeIn(300);
            });
        });

        $("#caracCelEle").click(function () {
            $("#dscCelEle").removeClass("tabSelect");
            $("#caracCelEle").addClass("tabSelect");
            $("#dscCel").hide(0, function () {
                $("#caracCel").fadeIn(300);
            });
        });

        $('#txtDescripcionDetalle').keypress(function (event) {
            if (event.which == '13') {
                RegistrarMensajeChat($("#hiddenCodTicket").val(), CodTicket);
            }
        });

        $("#dvEnviarMensaje").click(function () {
            RegistrarMensajeChat($("#hiddenCodTicket").val(), CodTicket);
        });

        $('.tabDesc').hover(function () {
            $(this).animate({ marginRight: '10px', marginLeft: '15px' }, 300);

        }, function () {
            $(this).animate({ marginRight: '0px', marginLeft: '2px' }, 300);
        });

        $('.tabDesc').click(function () {
            $('.tabDesc').removeClass("tabSelect");
            $(this).addClass("tabSelect");
        });

        $("#tapTicket").click(function () {
            $(".tap").removeClass("tapSelect");
            $("#tapTicket").addClass("tapSelect");
            $("#detalleTaps > div").hide(0, function () {
                $("#pSelecTicket").fadeIn(200);
            });
        });

        $("#tapDetalle").click(function () {
            $(".tap").removeClass("tapSelect");
            $("#tapDetalle").addClass("tapSelect");
            $("#detalleTaps > div").hide(0, function () {
                $("#pSelecDetalle").fadeIn(200);
            });
        });

        $("#btnNuevoPedido").click(function () {
            document.location.href = "Registrar_Incidencia.aspx";
        });

        $("#gridTicket").delegate("tbody>tr", "dblclick", function (e) {
            var fila = $(this).index();
            VerDetalle($("#hiddenCodTicket").val(), '', 1);
            $("#gridTicket tbody > tr ").eq(fila).css("background-color", "white");
            $("#gridTicket tbody > tr ").eq(fila).css("font-weight", "normal");
        });

        $('.tap').hover(function () {
            $(this).animate({ marginRight: '10px', marginLeft: '30px' }, 300);

        }, function () {
            $(this).animate({ marginRight: '0px', marginLeft: '20px' }, 300);
        });

        $("#txtDescripcion,#txtCodigo").live("keypress", ValidarAlfaNumerico);
    }

    function CargarFiltro() {
        var usuarioRegistro = $("#hdfIdTecnico").val();
        var Codusuario = $("#hdfIdUsuarioLogeado").val();
        valEstado = "";

        for (i = 0; i < textEstado.length; i++) {
            if ($.trim(textEstado[i]) == "Resuelto") {
                valEstado += "|RES|,|ANU|,|DEV|,";
            }
            else if ($.trim(textEstado[i]) == "Activo") {
                valEstado += "|ACT|,";
            }
            else if ($.trim(textEstado[i]) == "Pendiente") {
                valEstado += "|PEN|,";
            }
        }

        $.ajax({
            type: "POST",
            url: "Incidencia.aspx/BuscarTicketFiltro",
            data: "{'p_inCod': '" + '-1' + "'," +
                "'pCodigoTicket': '" + '000000000000' + "'," +
                "'p_inCodUsuario': '" + $("#hdfIdUsuarioLogeado").val() + "'," +
                "'p_inCodUsuarioRegistro': '" + '-1' + "'," +
                "'p_inCodTecnico': '" + usuarioRegistro + "'," +
                "'p_inCodEstado': '" + (valEstado == "" ? "-1" : valEstado.substr(0, valEstado.length - 1)) + "'," +
                "'P_inCodMedioContacto': '" + '-1' + "'," +
                "'P_inFiltro': '" + ValueFiltro + "'," +
                "'p_strFiltro': '" + filtro + "'," +
                "'P_inTipificacion': '" + '-1' + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                ticket = result.d;
                var dataSource = new kendo.data.DataSource({
                    data: ticket,
                    pageSize: 10
                });

                var gridele = $("#gridTicket").data("kendoGrid");
                gridele.setDataSource(dataSource);

                var grid = $("#gridTicket").data("kendoGrid");
                grid.select("tr:eq(1)");
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            }
        });
    }

    function onChangeDdl() {
        var dropdownlist = $("#cmbTipo").data("kendoDropDownList");
        var selectedIndex = dropdownlist.select();
        valkendoFiltro = dropdownlist.dataItem(selectedIndex);

        switch (valkendoFiltro.text) {
            case "Asunto":
                ValueFiltro = 1;
                filtro = "";
                $("#ptxtDescripcion").hide();
                $("#ptxtCodigo").hide();
                $("#ptxtVista").hide();
                $("#txtAsunto").val('');
                $("#ptxtAsunto").fadeIn(300);
                break;
            case "Código":
                ValueFiltro = 2;
                filtro = "";
                $("#ptxtDescripcion").hide();
                $("#ptxtAsunto").hide();
                $("#ptxtVista").hide();
                $("#txtCodigo").val('');
                $("#ptxtCodigo").fadeIn(300);
                break;
            case "Descripción":
                ValueFiltro = 3;
                filtro = "";
                $("#ptxtCodigo").hide();
                $("#ptxtAsunto").hide();
                $("#ptxtVista").hide();
                $("#txtDescripcion").val('');
                $("#ptxtDescripcion").fadeIn(300);
                break;
            case "Estado":
                ValueFiltro = 4;
                filtro = "";
                $("#ptxtCodigo").hide();
                $("#ptxtAsunto").hide();
                $("#ptxtDescripcion").hide();
                $("#ptxtVista").fadeIn(300);
                break;
            default:
                ValueFiltro = 4;
                filtro = "";
                $("#ptxtCodigo").hide();
                $("#ptxtAsunto").hide();
                $("#ptxtDescripcion").hide();
                $("#ptxtVista").fadeIn(300);
                break;
        }
    }

    function ObtenerEstado() {
        var usuarioRegistro = $("#hdfIdTecnico").val();
        var Codusuario = $("#hdfIdUsuarioLogeado").val();

        for (i = 0; i < textEstado.length; i++) {
            if ($.trim(textEstado[i]) == "Resuelto") {
                valEstado += "|RES|,|ANU|,|DEV|,";
            }
            else if ($.trim(textEstado[i]) == "Activo") {
                valEstado += "|ACT|,";
            }
            else if ($.trim(textEstado[i]) == "Pendiente") {
                valEstado += "|PEN|,";
            }
        }

        $.ajax({
            type: "POST",
            url: "Incidencia.aspx/BuscarTicketPorEstado",
            data: "{'p_inCod': '" + '-1' + "'," +
                    "'pCodigoTicket': '" + '000000000000' + "'," +
                    "'p_inCodUsuario': '" + Codusuario + "'," +
                    "'p_inCodUsuarioRegistro': '" + '-1' + "'," +
                    "'p_inCodTecnico': '" + usuarioRegistro + "'," +
                    "'p_inCodEstado': '" + (valEstado == "" ? "-1" : valEstado.substr(0, valEstado.length - 1)) + "'," +
                    "'P_inCodMedioContacto': '" + '-1' + "'," +
                    "'P_inFiltro': '" + ValueFiltro + "'," +
                    "'p_strFiltro': '" + filtro + "'," +
                    "'P_inTipificacion': '" + '-1' + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                ticket = result.d;

                if (ticket.length == 0) {
                    $("#lblSinRegistros").show();
                }
                else {
                    $("#lblSinRegistros").hide();
                }

                $("#gridTicket").kendoGrid({
                    dataSource: {
                        data: ticket,
                        pageSize: 10
                    },
                    dataBound: onDataBound,
                    selectable: "multiple",
                    change: function (e) {
                        var selectedRows = this.select();
                        for (var i = 0; i < selectedRows.length; i++) {
                            var dataItem = this.dataItem(selectedRows[i]);
                            $("#hiddenCodTicket").val(dataItem.P_inCod);
                        }
                    },
                    sortable: true,
                    pageable: {
                        refresh: true,
                        pageSizes: 5,
                        buttonCount: 6,
                        messages: {
                            itemsPerPage: "ítems por página",
                            display: "{0}-{1} de {2} ítems",
                            empty: ""
                        }
                    },

                    columns: [
                        { field: "CodigoTicket", title: "Código", width: "80px" },
                        { field: "FechaRegistro", title: "Fecha", width: "100px" },
                        { field: "Usuario.vcNom", title: "Usuario", width: "80px", hidden: true },
                        { field: "Descripcion", title: "Descripción", width: "150px" },
                        { field: "Estado.Titulo", title: "Estado", width: "70px" },
                        { field: "LeidoPorUsuario", title: "Leido", width: "70px", hidden: true },
                        { command: { text: "Detalle",
                            click: function (e) {
                                var tr = $(e.target).closest("tr");
                                var data = this.dataItem(tr);
                                $("#hiddenCodTicket").val(data.P_inCod);
                                VerDetalle($("#hiddenCodTicket").val(), '', 1);
                                $(tr).css("background-color", "white");
                                $(tr).css("font-weight", "normal");
                            }
                        }, title: " ", width: "65px"
                        }
                    ]
                });
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            }
        });
    }

    function onDataBound() {
        var trs = $(".k-selectable > tbody > tr");
        for (var i = 0; i < trs.length; i++) {
            if (trs[i].cells[5].innerText == 'false') {
                $(trs[i]).css("background-color", "#E5E5E5");
                $(trs[i]).css("font-weight", "bold");

            }
        }
    }

    function DevolverParametroURL(name) {
        var results = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(window.location.href);
        if (!results) {
            return 0;
        }
        return results[1] || 0;
    }

    function RegistrarMensajeChat(codTicket, idTickeck) {

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
        var año = d.getFullYear();
        dia = (dia < 10) ? '0' + dia : dia;
        mes = (mes < 10) ? '0' + mes : mes;
        var Fecha = dia + '/' + mes + '/' + año;

        if (codTicket == "" && idTickeck == "") {
            alert("Seleccione un ticket");
            //$("#txtDescripcionDetalle").focus();
            return;
        }

        if ($.trim(descripcion).length == 0 || $.trim(descripcion) == "") {
            $("#txtDescripcionDetalle").focus();
            return;
        }

        $.ajax({
            type: "POST",
            url: "Incidencia.aspx/RegistrarMensajeChat",
            data: "{'P_inCodTicket': '" + (codTicket == "" ? parseInt(idTickeck.substr(3, idTickeck.length)) : codTicket) + "'," +
                "'registradoPor': '" + $("#hdfIdUsuarioLogeado").val() + "'," +
                "'vcDescripcion': '" + $.trim(descripcion) + "'," +
                "'vcFileName': '" + vcFileName + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                if (result.d < 0) {
                    alert('No se insertó detalle');
                    return;
                }

                var limpiar = $('#comodin').text();

                if (limpiar.length != 0) {
                    $('#pnlDetalle').empty();
                }

                if (vcFileName == "") {
                    $('#pnlDetalle').append('<div class="msm" style="width: 99%; text-align: left; overflow:auto; border-bottom:1px solid white; word-wrap: break-word;"><table border="0" cellpadding="0" cellspacing="0" width="100%"><tr><td colspan="2" style="width: 99%;"><span  style="font-size:8pt; font-weight: bold; color: #0072C6; font-family:Verdana; font-size:11px;">(' + Fecha + ' - ' + Hora + ') - ' + $('#hdfIdUsuarioLogeadoNombre').val() + ' dice : </span></td><td style="width: 10%;"></td></tr></table><div class="detalle"  style="color: black;font-family:Verdana; font-size:11px;">' + descripcion + ' </div></div><br>');
                }
                else {
                    $('#pnlDetalle').append('<div class="msm" style="width: 99%; text-align: left; overflow:auto; border-bottom:1px solid white; word-wrap: break-word;"><table border="0" cellpadding="0" cellspacing="0" width="100%"><tr><td colspan="2" style="width: 99%;"><span  style="font-size:8pt; font-weight: bold; color: #0072C6; font-family:Verdana; font-size:11px;">(' + Fecha + ' - ' + Hora + ') - ' + $('#hdfIdUsuarioLogeadoNombre').val() + ' dice : </span></td><td><div class="imagenArchivoAdjunto"  onclick="fnDescargarArchivo(\'' + vcFileName + '\',2,' + result.d + ')"  ></div></td></tr></table><div class="detalle"  style="color: black;font-family:Verdana; font-size:11px;">' + descripcion + ' </div></div><br>');

                    DeleteFile(vcFileName);
                }


                $("#pnlDetalle").scrollTop($("#pnlDetalle")[0].scrollHeight);
                $("#txtDescripcionDetalle").val('');
                $("#txtDescripcionDetalle").focus();

                $(".msm").css("word-wrap", "break-word");
                $(".detalle").css("word-wrap", "break-word");
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            }
        });
    }

    function VerDetalle(idTicket, codTicket, viewDet) {
        if (viewDet == 1) {
            $("#tapDetalle").show();
            $(".tap").removeClass("tapSelect");
            $("#tapDetalle").addClass("tapSelect");
            $("#detalleTaps > div").hide(0, function () {
                $("#pSelecDetalle").fadeIn(400);
            });
        }

        $('div #pnlDetalle').empty();
        $("#txtDescripcionDetalle").val('');
        $("#txtDescripcionDetalle").focus();

        $.ajax({
            type: "POST",
            url: "Incidencia.aspx/BuscarTicketPorEstado",
            data: "{'p_inCod': '" + (idTicket == "" ? "-1" : idTicket) + "'," +
                   "'pCodigoTicket': '" + (codTicket == "" ? '000000000000' : codTicket) + "'," +
                   "'p_inCodUsuario': '" + $("#hdfIdUsuarioLogeado").val() + "'," +
                   "'p_inCodUsuarioRegistro': '" + '-1' + "'," +
                   "'p_inCodTecnico': '" + '-1' + "'," +
                   "'p_inCodEstado': '" + '-1' + "'," +
                   "'P_inCodMedioContacto': '" + '-1' + "'," +
                   "'P_inFiltro': '" + '-1' + "'," +
                   "'p_strFiltro': '" + '' + "'," +
                   "'P_inTipificacion': '" + '-1' + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                var Fecha = data.d[0].FechaRegistro.substring(6, 8) + '/' + data.d[0].FechaRegistro.substring(4, 6) + '/' + data.d[0].FechaRegistro.substring(0, 4);
                var Hora = data.d[0].FechaRegistro.substring(9, 17);
                var FechaH = Fecha.toString() + ' ' + Hora.toString();
                $("#lblFechaH").text(data.d[0].FechaRegistro.toString());
                $("#lblCodigo").text(data.d[0].CodigoTicket.toString());
                $("#txtDetUsuario").val(data.d[0].Usuario.vcNom.toString());
                $("#txtDetTipificacion").val(data.d[0].Tipificacion.Titulo.toString());
                $("#txtDetAsunto").val(data.d[0].Asunto.replace("&#39", "'"));
                $("#txtDetDescripcion").val(data.d[0].Descripcion.replace("&#39", "'"));
                $("#txtDetEstado").val(data.d[0].Estado.Titulo.toString());

                if (data.d[0].Estado.Titulo.toString() == "Resuelto" || data.d[0].Estado.Titulo.toString() == "Anulado" || data.d[0].Estado.Titulo.toString() == "Devuelto") {
                    $("#txtDescripcionDetalle").attr("disabled", "disabled");
                    $("#textEnviar").hide();
                    $("#pnlAdjuntar").css("display", "none");
                }
                else {
                    $("#txtDescripcionDetalle").removeAttr("disabled", "disabled");
                    $("#textEnviar").show();
                    $("#pnlAdjuntar").css("display", "block");
                }

                if (data.d[0].EsChat.toString() == "true") {
                    $('#chkDetChat').attr('checked', true);
                } else {
                    $('#chkDetChat').attr('checked', false);
                }
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            }
        });


        $.ajax({
            type: "POST",
            url: "Incidencia.aspx/obtenerDetalleTicket",
            data: "{'p_inCod': '" + (idTicket == '' ? parseInt(CodTicket.substr(3, CodTicket.length)) : parseInt(idTicket)) + "'}",
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
                var Usuario = "";
                var contIndex = 0;
                for (var i = 0; i < $(result.d).length; i++) {
                    //var Fecha = result.d[i].FechaRegistro.substring(6, 8) + '/' + result.d[i].FechaRegistro.substring(4, 6) + '/' + result.d[i].FechaRegistro.substring(0, 4);
                    var Fecha = result.d[i].FechaRegistro.toString();


                    if (result.d[i].NombreArchivo == "") {
                        if ($("#hdfIdUsuarioLogeadoNombre").val().toString() == result.d[i].IdUsuario.toString()) {
                            $('#pnlDetalle').append('<div class="msm" style="width: 99%; text-align: left; overflow:auto; border-bottom:1px solid white; word-wrap: break-word;"><table border="0" cellpadding="0" cellspacing="0" width="100%"><tr><td colspan="2" style="width: 99%;"><span  style="font-size:8pt; font-weight: bold; color: #0072C6; font-family:Verdana; font-size:11px;">(' + Fecha + ' -  ' + result.d[i].HoraRegistro.toString() + ') - ' + result.d[i].IdUsuario.toString() + ' dice : </span></td></td></tr></table><div class="detalle" style="color: black;font-family:Verdana; font-size:11px;">' + result.d[i].Descripcion.toString() + ' </div></div><br>');
                        } else {
                            $('#pnlDetalle').append('<div class="msm" style="width: 99%; text-align: left; overflow:auto; border-bottom:1px solid white; word-wrap: break-word;"><table border="0" cellpadding="0" cellspacing="0" width="100%"><tr><td colspan="2" style="width: 90%;"><span  style="font-size:8pt; font-weight: bold; color: #757575; font-family:Verdana; font-size:11px;">(' + Fecha + ' -  ' + result.d[i].HoraRegistro.toString() + ') - ' + result.d[i].IdUsuario.toString() + ' dice : </span></td></td></tr></table><div class="detalle"  style="color: black;font-family:Verdana; font-size:11px;">' + result.d[i].Descripcion.toString() + ' </div></div><br>');
                        }
                    }
                    else {
                        if ($("#hdfIdUsuarioLogeadoNombre").val().toString() == result.d[i].IdUsuario.toString()) {
                            $('#pnlDetalle').append('<div class="msm" style="width: 99%; text-align: left; overflow:auto; border-bottom:1px solid white; word-wrap: break-word;"><table border="0" cellpadding="0" cellspacing="0" width="100%"><tr><td colspan="2" style="width: 99%;"><span  style="font-size:8pt; font-weight: bold; color: #0072C6; font-family:Verdana; font-size:11px;">(' + Fecha + ' -  ' + result.d[i].HoraRegistro.toString() + ') - ' + result.d[i].IdUsuario.toString() + ' dice : </span></td><td><div class="imagenArchivoAdjunto" onclick="fnDescargarArchivo(\'' + result.d[i].NombreArchivo + '\',2,' + result.d[i].P_inCod + ')"  ></div></td></tr></table><div class="detalle" style="color: black;font-family:Verdana; font-size:11px;">' + result.d[i].Descripcion.toString() + ' </div></div><br>');
                        } else {
                            $('#pnlDetalle').append('<div class="msm" style="width: 99%; text-align: left; overflow:auto; border-bottom:1px solid white; word-wrap: break-word;"><table border="0" cellpadding="0" cellspacing="0" width="100%"><tr><td colspan="2" style="width: 90%;"><span  style="font-size:8pt; font-weight: bold; color: #757575; font-family:Verdana; font-size:11px;">(' + Fecha + ' -  ' + result.d[i].HoraRegistro.toString() + ') - ' + result.d[i].IdUsuario.toString() + ' dice : </span></td><td><div class="imagenArchivoAdjunto" onclick="fnDescargarArchivo(\'' + result.d[i].NombreArchivo + '\',2,' + result.d[i].P_inCod + ')"  ></div></td></tr></table><div class="detalle"  style="color: black;font-family:Verdana; font-size:11px;">' + result.d[i].Descripcion.toString() + ' </div></div><br>');
                        }
                    }
                }

                $('div #pnlPrincipaldetalle').show('drop', 300, function () { $("#pnlDetalle").scrollTop($("#pnlDetalle")[0].scrollHeight); });
                $("#txtDescripcionDetalle").focus();

                $(".msm").css("word-wrap", "break-word");
                $(".detalle").css("word-wrap", "break-word");


            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            }
        });

        if (codTicket != '') {
            $.ajax({
                type: "POST",
                url: "Incidencia.aspx/ActualizarTicketsYaLeidos",
                data: "{'IdTicket': '" + parseInt(CodTicket.substr(3, CodTicket.length)) + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {
                },
                error: function (xhr, err, thrErr) {
                    MostrarErrorAjax(xhr, err, thrErr);
                }
            });
        }

        if (idTicket != '') {
            $.ajax({
                type: "POST",
                url: "Incidencia.aspx/ActualizarTicketsYaLeidos",
                data: "{'IdTicket': '" + idTicket + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {
                    //CargarFiltro();
                },
                error: function (xhr, err, thrErr) {
                    MostrarErrorAjax(xhr, err, thrErr);
                }
            });
        }
    }




    if ($("#hdfConfig").val() != "1") {
        $("#pnlAdjuntar").hide();
        $("#pnlDetalle").css("height", "365px");
    }
    else {
        new AjaxUpload('#UploadButton', {
            action: 'UploadHandler.ashx',
            onComplete: function (file, response) {
                //alert(response);
                $("<div class='imgBtn' style='margin-top:1px; height:21px;'><img src='../Common/Images/Incidencias/remove.png' onclick=\"DeleteFile('" + response + "')\"/>&nbsp;&nbsp;&nbsp;<span id='filesubido' style='text-decoration:underline;' nombre='" + response + "'>" + response + "</span></div>").appendTo('#UploadedFile');
                vcFileName = response;
                $("#UploadButton").hide();
            },
            onSubmit: function (file, ext) {
                if (!(ext && /^(txt|doc|docx|xls|xlsx|pdf|jpg|png)$/i.test(ext))) {
                    alert('Formato inválido');
                    return false;
                }
            }
        });
    }

});


function DeleteFile(file) {
    $.ajax({
        url: "UploadHandler.ashx?file=" + file + "&accion=delete",
        type: "GET",
        cache: false,
        async: true,
        success: function (html) {
            $('#UploadedFile').html("");
            $("#UploadButton").show();
            vcFileName = "";
        }
    });
}

function fnDescargarArchivo(NomArc, tipo, inIdDet) {
    //Descargar adjunto antes de grabar nota
    if (tipo == 1) {
        var filePath = "Common/Temporal/Incidencias/" + NomArc;
        $.ajax({
            url: raiz(filePath),
            success: function (data) {
                window.location.href = raiz("Common/Controladores/DescargarArchivo.ashx?archivo=" + filePath);
            },
            error: function (data) {
                alerta('No se encontró el archivo a descargar.');
                $('#UploadedFile').html("");
                $("#UploadButton").show();
                vcFileName = "";
            }
        });
    }
    //Descargar adjunto de nota grabada
    else if (tipo == 2) {
    $.ajax({
        type: "POST",
        url: "Incidencia.aspx/DescargarArchivoBD",
        data: "{'inIdDet': '" + inIdDet + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {

            var filePath = "Common/Temporal/Incidencias/" + NomArc;
            //window.location.href = raiz(filePath);
            window.open(raiz(filePath) ,'_blank');
//            $.ajax({
//                url: raiz(filePath),
//                success: function (data) {
//                    window.location.href = raiz("Common/Controladores/DescargarArchivo.ashx?archivo=" + filePath);
//                },
//                error: function (data) {
//                    alerta('No se encontró el archivo a descargar.');
//                    $('#UploadedFile').html("");
//                    $("#UploadButton").show();
//                    vcFileName = "";
//                }
//            });
        },
        error: function (xhr, err) {
            $("#dvCargando").hide();
            alert("Error, Estadow: " + xhr.readyState + "\nEstado: " + xhr.status);
        }
    });
    }

}


$("#filesubido").live("click", function () {
    var archivo = $(this).attr("nombre");
    fnDescargarArchivo(archivo, 1, null);
});