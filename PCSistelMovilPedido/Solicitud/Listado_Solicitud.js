var solicitud;
//var productos;
//var arregloSeleccion = [];
//var pedidos;
//var planes;
//var creditos;
//var produc;
//var filaSelec;
//var ale = true;
var textTipo;
var valTipo = '';
var valkendoFiltro;
var ValFiltro;
var filtro='', ValueFiltro;
var CodSolicitud, TipoMnsje;
//var cont;

$(function () {
    enlacesLoad();
    $("#generalCarrito").show();
    //    $("#txtDescripcionDetalle").attr('maxlength', '118');
    onChangeDdl();

    function enlacesLoad() {
        CodSolicitud = DevolverParametroURL('ID');
        TipoMnsje = DevolverParametroURL('Tipo');

        if (CodSolicitud != 0) {
            $("#detalleTabs > div").hide();
            VerDetalle('', CodSolicitud, 1)
        } else {
            $("#tabDetalle").hide();
            $("#generalCarrito").show();
            $(".tap").removeClass("tapSelect");
            $("#tabSolicitud").addClass("tapSelect");
            $("#detalleTabs > div").hide(0, function () {
                $("#pSelecSolicitud").fadeIn(200);
            });
        }

        $('#txtCodigo').keypress(function (event) {
            if (event.which == '13') {
                ValFiltro = (valkendoFiltro.text == undefined ? "Código" : valkendoFiltro.text)
                filtro = "";
                if (ValFiltro == "Código") {
                    filtro = $("#txtCodigo").val();
                    ValueFiltro = 1;
                }
                CargarFiltro();
            }
        });

        //        $('#txtDescripcion').keypress(function (event) {
        //            if (event.which == '13') {
        //                ValFiltro = (valkendoFiltro.text == undefined ? "Asunto" : valkendoFiltro.text)
        //                filtro = "";
        //                if (ValFiltro == "Descripción") {
        //                    filtro = $("#txtDescripcion").val();
        //                    ValueFiltro = 3;
        //                }
        //                CargarFiltro();
        //            }
        //        });


        $("#btnFiltroProducto").bind('click', function () {
            filtro = "";
            CargarValoresBusqueda();
            CargarFiltro();
        });

        $("#cmbTipo").kendoDropDownList({
            change: onChangeDdl
        });

        $("#ReqTipo").kendoMultiSelect({
            change: function (e) {
                textTipo = this.value();
                cargarValTipoSolicitud();
                CargarFiltro();
            }
        });

        var multiselect = $("#ReqTipo").data("kendoMultiSelect");
        textTipo = multiselect.value();
        //ObtenerEstado();

        CargarValoresBusqueda();
        CargaInicial();

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
                RegistrarMensajeChat($("#hiddenCodSolicitud").val(), CodSolicitud);
            };
        });

        $("#dvEnviarMensaje").click(function () {
            RegistrarMensajeChat($("#hiddenCodSolicitud").val(), CodSolicitud);
        });

        $("#tabSolicitud").click(function () {
            $(".tap").removeClass("tapSelect");
            $("#tabSolicitud").addClass("tapSelect");
            $("#detalleTabs > div").hide(0, function () {
                $("#pSelecSolicitud").fadeIn(200);
            });
        });

        $("#tabDetalle").click(function () {
            $(".tap").removeClass("tapSelect");
            $("#tabDetalle").addClass("tapSelect");
            $("#detalleTabs > div").hide(0, function () {
                $("#pSelecDetalle").fadeIn(200);
            });
        });

        $("#btnNuevo").click(function () {
            document.location.href = "Registrar_Solicitud.aspx";
        });

        $("#gridSolicitud").delegate("tbody>tr", "dblclick", function (e) {
            var fila = $(this).index();
            VerDetalle($("#hiddenCodSolicitud").val(), '', 1);
            $("#gridSolicitud tbody > tr ").eq(fila).css("background-color", "white");
            $("#gridSolicitud tbody > tr ").eq(fila).css("font-weight", "normal");
        });

        $('.tap').hover(function () {
            $(this).animate({ marginRight: '10px', marginLeft: '30px' }, 300);

        }, function () {
            $(this).animate({ marginRight: '0px', marginLeft: '20px' }, 300);
        });
    }

    function CargarValoresBusqueda() {

        if (valkendoFiltro == undefined) {
            var dropdownlist = $("#cmbTipo").data("kendoDropDownList");
            valkendoFiltro = dropdownlist.dataItem(dropdownlist.select());
        }

        ValFiltro = (valkendoFiltro.text == undefined ? "Código" : valkendoFiltro.text)

        if (ValFiltro == "Código") {
            filtro = $("#txtCodigo").val();
            ValueFiltro = 1;
        }
        if (ValFiltro == "Tipo de Solicitud") {
            ValueFiltro = 2;
        }

    }

    function CargaInicial() {
        var usuarioRegistro = $("#hdfIdTecnico").val();
        var Codusuario = $("#hdfIdUsuarioLogeado").val();

        cargarValTipoSolicitud();
        filtro = valTipo;

        $.ajax({
            type: "POST",
            url: "Listado_Solicitud.aspx/BuscarSolicitudFiltro",
            data: "{'strCodEmp': '" + $("#hdfEmpleado").val() + "'," +
                  "'intFiltro': '" + ValueFiltro + "'," +
                  "'strFiltro': '" + filtro + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                solicitud = result.d;

                $("#gridSolicitud").kendoGrid({
                    dataSource: {
                        data: solicitud,
                        pageSize: 10
                    },
                    dataBound: onDataBound,
                    selectable: "multiple",
                    navigatable: true,
                    change: function (e) {
                        var selectedRows = this.select();
                        for (var i = 0; i < selectedRows.length; i++) {
                            var dataItem = this.dataItem(selectedRows[i]);
                            $("#hiddenCodSolicitud").val(dataItem.P_inCodSol);
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
                            empty: "",
                            first: "Ir a primera página",
                            last: "Ir a última página",
                            next: "Ir a página siguiente",
                            previous: "Ir a página anterior"
                        }
                    },
                    detailInit: detailInit,
                    columns: [
                        { field: "P_inCodSol", title: "P_inCodSol", width: "80px", hidden: true },
                        { field: "vcCodigo", title: "Código", width: "100px" },
                        { field: "inTipSol", title: "inTipSol", width: "80px", hidden: true },
                        { field: "vcNomTipSol", title: "Tipo de Solicitud", width: "150px" },
                        { field: "biPersonalizado", title: "biPersonalizado", width: "70px", hidden: true },
                        { field: "vcNomEst", title: "Estado", width: "100px" },
                        { field: "dcMonto", title: "Monto", width: "70px" },
                        { command: { text: "Detalle",
                            click: function (e) {
                                var tr = $(e.target).closest("tr");
                                var data = this.dataItem(tr);
                                $("#hiddenCodSolicitud").val(data.P_inCodSol);
                                VerDetalle($("#hiddenCodSolicitud").val(), '', 1);
                                $(tr).css("background-color", "white");
                                $(tr).css("font-weight", "normal");
                            }
                        }, title: " ", width: "65px"
                        },
                    ]
                });
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            }
        });
    };

    function detailInit(e) {
        var detailRow = e.data;

        $.ajax({
            type: "POST",
            url: "Listado_Solicitud.aspx/ObtenerSeguimiento",
            data: "{'inCodSol': '" + detailRow.P_inCodSol + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (resultado) {

                var seguimiento = resultado.d;

                if (seguimiento.length > 0) {
                    $("<div/>").appendTo(e.detailCell).kendoGrid({
                        dataSource: {
                            data: seguimiento,
                            pageSize: 10
                        },
                        scrollable: false,
                        sortable: false,
                        columns: [
                            { field: "Fecha", title: "Fecha", width: "80px" },
                            { field: "P_inCodSol", title: "P_inCodSol", width: "100px", hidden: true },
                            { field: "EstadoInicial", title: "inEstadoInicial", width: "80px", hidden: true },
                            { field: "EstadoFinal", title: "inEstadoFinal", width: "150px", hidden: true },
                            { field: "IdUsuario", title: "Usuario", width: "70px", hidden: true },
                            { field: "vcEstadoInicial", title: "Estado Inicial", width: "70px" },
                            { field: "vcEstadoFinal", title: "Estafo Final", width: "70px" },
                            { field: "NomUsuario", title: "Usuario", width: "80px" },
                            { field: "Comentarios", title: "Comentarios", width: "100px" }
                        ]
                    });
                }
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            }
        });
    }

    function CargarFiltro() {
        var usuarioRegistro = $("#hdfIdTecnico").val();
        var Codusuario = $("#hdfIdUsuarioLogeado").val();

        $.ajax({
            type: "POST",
            url: "Listado_Solicitud.aspx/BuscarSolicitudFiltro",
            data: "{'strCodEmp': '" + $("#hdfEmpleado").val() + "'," +
                  "'intFiltro': '" + ValueFiltro + "'," +
                  "'strFiltro': '" + $.trim(filtro) + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                solicitud = result.d;

                var dataSource = new kendo.data.DataSource({
                    data: solicitud,
                    pageSize: 10
                });

                var gridele = $("#gridSolicitud").data("kendoGrid");
                gridele.setDataSource(dataSource);

                var grid = $("#gridSolicitud").data("kendoGrid");
                grid.select("tr:eq(1)");
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            }
        });
    };

    function cargarValTipoSolicitud() {
        valTipo = "";

        for (i = 0; i < textTipo.length; i++) {
            valTipo += textTipo[i] + ",";
        }
        if (textTipo.length > 0)
            valTipo = valTipo.substring(0, valTipo.length - 1);

        filtro = valTipo;
    }

    function onChangeDdl() {
        var dropdownlist = $("#cmbTipo").data("kendoDropDownList");
        var selectedIndex = dropdownlist.select();
        valkendoFiltro = dropdownlist.dataItem(selectedIndex);

        switch (valkendoFiltro.text) {
            case "Código":
                ValueFiltro = 1;
                filtro = "";
                $("#ptxtDescripcion").hide();
                $("#ptxtAsunto").hide();
                $("#ptxtTipo").hide();
                $("#txtCodigo").val('');
                $("#ptxtCodigo").fadeIn(300);
                break;
            default:
                ValueFiltro = 2;
                filtro = "";
                $("#ptxtCodigo").hide();
                $("#ptxtAsunto").hide();
                $("#ptxtDescripcion").hide();
                $("#ptxtTipo").fadeIn(300);
        }
    };

    function ObtenerEstado() {
        //        var usuarioRegistro = $("#hdfIdTecnico").val();
        //        var Codusuario = $("#hdfIdUsuarioLogeado").val();

        //        for (i = 0; i < textTipo.length; i++) {
        //            if ($.trim(textTipo[i]) == "Cerrado") {
        //                valTipo += "6,7,2,";
        //            }
        //            else if ($.trim(textTipo[i]) == "Pendiente") {
        //                valTipo += "1,";
        //            }
        //        }

        //        $.ajax({
        //            type: "POST",
        //            url: "Incidencia.aspx/BuscarTicketPorEstado",
        //            data: "{'p_inCod': '" + '-1' + "'," +
        //                    "'pCodigoTicket': '" + '000000000000' + "'," +
        //                    "'p_inCodUsuario': '" + '-1' + "'," +
        //                    "'p_inCodUsuarioRegistro': '" + Codusuario + "'," +
        //                    "'p_inCodTecnico': '" + usuarioRegistro + "'," +
        //                    "'p_inCodEstado': '" + (valTipo == "" ? "-1" : valTipo.substr(0, valTipo.length - 1)) + "'," +
        //                    "'P_inCodMedioContacto': '" + '-1' + "'," +
        //                    "'P_inFiltro': '" + ValueFiltro + "'," +
        //                    "'p_strFiltro': '" + filtro + "'," +
        //                    "'P_inTipificacion': '" + '-1' + "'}",
        //            contentType: "application/json; charset=utf-8",
        //            dataType: "json",
        //            success: function (result) {
        //                ticket = result.d;

        //                $("#gridTicket").kendoGrid({
        //                    dataSource: {
        //                        data: ticket,
        //                        pageSize: 10
        //                    },
        //                    dataBound: onDataBound,
        //                    selectable: "multiple",
        //                    change: function (e) {
        //                        var selectedRows = this.select();
        //                        for (var i = 0; i < selectedRows.length; i++) {
        //                            var dataItem = this.dataItem(selectedRows[i]);
        //                            $("#hiddenCodSolicitud").val(dataItem.P_inCod);
        //                        }
        //                    },
        //                    sortable: true,
        //                    pageable: {
        //                        refresh: true,
        //                        pageSizes: 5,
        //                        buttonCount: 6,
        //                        messages: {
        //                            itemsPerPage: "ítems por página",
        //                            display: "{0}-{1} de {2} ítems",
        //                            empty: ""
        //                        }
        //                    },

        //                    columns: [
        //                        { field: "CodigoTicket", title: "Código", width: "80px" },
        //                        { field: "FechaRegistro", title: "Fecha", width: "100px" },
        //                        { field: "Usuario.vcNom", title: "Usuario", width: "80px", hidden: true },
        //                        { field: "Descripcion", title: "Descripción", width: "150px" },
        //                        { field: "Estado.Titulo", title: "Estado", width: "70px" },
        //                        { field: "LeidoPorUsuario", title: "Leido", width: "70px", hidden: true },
        //                        { command: { text: "Detalle",
        //                            click: function (e) {
        //                                var tr = $(e.target).closest("tr");
        //                                var data = this.dataItem(tr);
        //                                $("#hiddenCodSolicitud").val(data.P_inCod);
        //                                VerDetalle($("#hiddenCodSolicitud").val(), '', 1);
        //                                $(tr).css("background-color", "white");
        //                                $(tr).css("font-weight", "normal");
        //                            }
        //                        }, title: " ", width: "65px"
        //                        },
        //                    ]
        //                });
        //            },
        //            error: function (xhr, err, thrErr) {
        //                MostrarErrorAjax(xhr, err, thrErr);
        //            }
        //        });
    };

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
    };

    function RegistrarMensajeChat(idSolicitud, codSolicitud) {

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
            var descripcion = $.trim($('#txtDescripcionDetalle').val().replace(/'/g, "&#39"));

            var dia = d.getDate();
            var mes = d.getMonth() + 1;
            var año = d.getFullYear();
            dia = (dia < 10) ? '0' + dia : dia;
            mes = (mes < 10) ? '0' + mes : mes;
            var Fecha = dia + '/' + mes + '/' + año;

            if (codSolicitud == "" && idSolicitud == "") {
                alert("Seleccione una solicitud");
                //$("#txtDescripcionDetalle").focus();
                return;
            };

            if ($.trim(descripcion).length == 0 || descripcion == "") {
                $("#txtDescripcionDetalle").focus();
                return;
            };

            $.ajax({
                type: "POST",
                url: "Listado_Solicitud.aspx/RegistrarDetalle",
                data: "{'inCodSol': '" + idSolicitud + "'," +
                    "'vcDetalle': '" + descripcion.toString() + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {
                    if (!result.d) {
                        alert('No se insertó detalle');
                        return;
                    };

                    var limpiar = $('#comodin').text();

                    if (limpiar.length != 0) {
                        $('#pnlDetalle').empty();
                    }

                    $('#pnlDetalle').append('<div class="msm" style="width: 99%; text-align: left; overflow:auto; border-bottom:1px solid white; word-wrap: break-word;"><table border="0" cellpadding="0" cellspacing="0" width="100%"><tr><td colspan="2" style="width: 99%;"><span  style="font-size:8pt; font-weight: bold; color: #0072C6; font-family:Verdana; font-size:11px;">(' + Fecha + ' - ' + Hora + ') - ' + $('#hdfIdUsuarioLogeadoNombre').val() + ' dice : </span></td><td style="width: 10%;"></td></tr></table><div class="detalle"  style="color: black;font-family:Verdana; font-size:11px;">' + descripcion + ' </div></div><br>');

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
        };

    function VerDetalle(idSolicitud, codSolicitud, viewDet) {
        if (viewDet == 1) {
            $("#tabDetalle").show();
            $(".tap").removeClass("tapSelect");
            $("#tabDetalle").addClass("tapSelect");
            $("#detalleTabs > div").hide(0, function () {
                $("#pSelecDetalle").fadeIn(400);
            });
        }

        $('div #pnlDetalle').empty();
        $("#txtDescripcionDetalle").val('');
        $("#txtDescripcionDetalle").focus();

        $.ajax({
            type: "POST",
            url: "Listado_Solicitud.aspx/ObtenerDetalle",
            data: "{'inCodSol': '" + idSolicitud + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                $('div #pnlHeadDetalle').empty();
                $('div #pnlHeadDetalle').append('<div style="width: 99%; text-align: left; overflow:auto; font-size:10pt; ">Descripción: ' + "Alguna descripcion ... " + '</div>');
                if ($(result.d).length == 0) {
                    $('#pnlDetalle').append('<div class="msm" id="comodin" style="width: 99%; text-align: left; overflow: auto;"> <p><span  style="font-size:12pt; color:red;">INGRESE DETALLE</span></p></div>');
                    $('div #pnlPrincipaldetalle').show('drop');
                    return;
                };
                var Usuario = "";
                var contIndex = 0;
                for (var i = 0; i < $(result.d).length; i++) {
                    //var Fecha = result.d[i].FechaRegistro.substring(6, 8) + '/' + result.d[i].FechaRegistro.substring(4, 6) + '/' + result.d[i].FechaRegistro.substring(0, 4);
                    if ($("#hdfIdUsuarioLogeadoNombre").val().toString() == result.d[i].RegistradoPor.toString()) {
                        $('#pnlDetalle').append('<div class="msm" style="width: 99%; text-align: left; overflow:auto; border-bottom:1px solid white; word-wrap: break-word;"><table border="0" cellpadding="0" cellspacing="0" width="100%"><tr><td colspan="2" style="width: 99%;"><span  style="font-size:8pt; font-weight: bold; color: #0072C6; font-family:Verdana; font-size:11px;">(' + result.d[i].Fecha.toString() + ' -  ' + result.d[i].Hora.toString() + ') - ' + result.d[i].RegistradoPor.toString() + ' dice : </span></td></td></tr></table><div class="detalle" style="color: black;font-family:Verdana; font-size:11px;">' + result.d[i].Detalle.toString() + ' </div></div><br>');
                    } else {
                        $('#pnlDetalle').append('<div class="msm" style="width: 99%; text-align: left; overflow:auto; border-bottom:1px solid white; word-wrap: break-word;"><table border="0" cellpadding="0" cellspacing="0" width="100%"><tr><td colspan="2" style="width: 90%;"><span  style="font-size:8pt; font-weight: bold; color: #757575; font-family:Verdana; font-size:11px;">(' + result.d[i].Fecha.toString() + ' -  ' + result.d[i].Hora.toString() + ') - ' + result.d[i].RegistradoPor.toString() + ' dice : </span></td></td></tr></table><div class="detalle"  style="color: black;font-family:Verdana; font-size:11px;">' + result.d[i].Detalle.toString() + ' </div></div><br>');
                    }
                };

                $('div #pnlPrincipaldetalle').show('drop', 300, function () { $("#pnlDetalle").scrollTop($("#pnlDetalle")[0].scrollHeight); });
                $("#txtDescripcionDetalle").focus();

                $(".msm").css("word-wrap", "break-word");
                $(".detalle").css("word-wrap", "break-word");
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            }
        });

        //                if (codTicket != '') {
        //                    $.ajax({
        //                        type: "POST",
        //                        url: "Incidencia.aspx/ActualizarTicketsYaLeidos",
        //                        data: "{'IdTicket': '" + parseInt(CodTicket.substr(3, CodTicket.length)) + "'}",
        //                        contentType: "application/json; charset=utf-8",
        //                        dataType: "json",
        //                        success: function (result) {
        //                        },
        //                        error: function (xhr, err, thrErr) {
        //                            MostrarErrorAjax(xhr, err, thrErr);
        //                        }
        //                    });
        //                }

        //                if (idTicket != '') {
        //                    $.ajax({
        //                        type: "POST",
        //                        url: "Incidencia.aspx/ActualizarTicketsYaLeidos",
        //                        data: "{'IdTicket': '" + idTicket + "'}",
        //                        contentType: "application/json; charset=utf-8",
        //                        dataType: "json",
        //                        success: function (result) {
        //                            //CargarFiltro();
        //                        },
        //                        error: function (xhr, err, thrErr) {
        //                            MostrarErrorAjax(xhr, err, thrErr);
        //                        }
        //                    });
        //                }
    }
});
