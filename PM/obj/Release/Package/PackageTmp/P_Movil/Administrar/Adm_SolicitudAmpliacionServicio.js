var lstUbicaciones = [];
var arlincue = [];
function LineaCuenta(Linea, Cuenta) {
    this.Cuenta = Cuenta;
    this.Linea = Linea;
}
var serv = 'amp';

$(function () {
    inicio();
    $("#txtEmpleado").focus();
    $(".btnNormal").button({});
    var tbModelos = $("#tbModelos").tabs({});
    $("#btnSolicitar").button("option", "disabled", true);
    $("#btnSolicitar").val("Solicitar Ampliación");

    ValidarNumeroEnCajaTexto("txtCatnidadSolicitada", ValidarSoloNumero);

    $("#txtMotivoActivacion").keypress(ValidarAlfaNumericoConEspacios);
    $("#ddlServicio").append($("<option></option>").attr("value", "-1").text("<Seleccionar>"));
    $("#ddlTipoServicio").append($("<option></option>").attr("value", "-1").text("<Seleccionar>"));

    //ActivarCombokendo("#ddlDispositivo", "200");
    //ActivarCombokendo("#ddlServicio", "200");
    //ActivarCombokendo("#ddlTipoServicio", "200");

    CargarPagina2();

    //if ($("#ddlDispositivo").val() != null && $("#ddlDispositivo").val() != "-1") {
    //    document.getElementById('divTabs').style.display = '';
    //    $("#tbModelos").tabs("option", "disabled", [1]);
    //    var name = $("#ddlDispositivo option:selected").text();
    //    //alert(name);
    //    var IMEI = name.substr(0, name.indexOf('-') - 1);
    //    $("#ifDetalleDispositivo").attr("src", "Mantenimiento/Mnt_DetalleDispositivoServicio.aspx?CodDis=" + IMEI + "&serv=" + serv);
    //    MostrarFilasNuevoServ(1);
    //}
    //else {
    //    document.getElementById('divTabs').style.display = 'none';
    //    MostrarFilasNuevoServ(0);
    //    $("#ifDetalleDispositivo").attr("src", "");
    //    $("#btnSolicitar").button("option", "disabled", true);
    //};

    $("#ddlDispositivo").change(function () {
        if ($("#ddlDispositivo").val() != "-1") {
            document.getElementById('divTabs').style.display = '';
            var name = $("#ddlDispositivo option:selected").text();
            var IMEI = name.substr(0, name.indexOf('-') - 1);
            $("#ifDetalleDispositivo").attr("src", "Mantenimiento/Mnt_DetalleDispositivoServicio.aspx?CodDis=" + IMEI + "&serv=" + serv);
            MostrarFilasNuevoServ(1);
            //alert($("#hdfCodCuenta").val() + ", " + $("#ddlDispositivo").val());
            //listarTipoServicio($("#hdfCodCuenta").val(), $("#ddlDispositivo").val())
        }
        else {
            $("#ifDetalleDispositivo").attr("src", "");
            MostrarFilasNuevoServ(0);
            $("#btnSolicitar").button("option", "disabled", true);
        }
    });

    function inicio() {
        if ($("#hdfCodEmpleado").val() != "") {
            CargarDispositivosConLinea($("#hdfCodEmpleado").val());
        }

        //$('#ddlTipoServicio').change(function () {
        //    if ($(this).val() == '-1') {
        //        $("#lblValorCatnidad").text('');
        //    };
        //    if ($(this).val() == '16') {
        //        $("#lblValorCatnidad").text(' (min)');
        //    };
        //    if ($(this).val() == '17') {
        //        $("#lblValorCatnidad").text(' (KB)');
        //    };
        //    if ($(this).val() == '18') {
        //        $("#lblValorCatnidad").text(' (msj)');
        //    };
        //    listarServicios($("#hdfCodCuenta").val(), $("#ddlDispositivo").val(), $(this).val());
        //});
        //
        $('#chkIlimitado').click(function () {
            if ($('#chkIlimitado').is(':checked')) {
                document.getElementById('trCantidad2').style.display = 'none';
            } else {
                document.getElementById('trCantidad2').style.display = '';
            }
        });
    }

    if ($("#txtEmpleado").length > 0) {
        $("#txtEmpleado").autocomplete({
            minLength: 0,
            source: function (request, response) {
                $.ajax({
                    type: "POST",
                    url: "../../Common/WebService/General.asmx/ListarEmpleado",
                    data: "{'maxFilas': '" + 200 + "'," +
                           "'vcNomEmp': '" + $("#txtEmpleado").val() + "'," +
                           "'incodGrup': '-1'," +
                           "'idCliente': '" + window.parent.parent.parent.idCliente + "'}",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (result) {
                        response($.map(result.d, function (item) {
                            return {
                                label: item.vcNom,
                                vcCodEmp: item.P_vcCod,
                                category: item.Grupo.vcNom,
                                inCodGru: item.Grupo.P_inCod
                            };
                        }));
                    },
                    error: function (xhr, err, thrErr) {
                        MostrarErrorAjax(xhr, err, thrErr);
                    }
                });
            },
            focus: function (event, ui) {
                $("#txtEmpleado").val(ui.item.label);
                return false;
            },
            select: function (event, ui) {
                Selecciono = true;
                $("#txtEmpleado").val(ui.item.label);
                $("#hdfCodEmpleado").val(ui.item.vcCodEmp);
                CargarDispositivosConLinea(ui.item.vcCodEmp);
                $("#ddlDispositivo").focus();
                $("#btnSolicitar").button("option", "disabled", false);
                return false;
            },
            change: function (event, ui) {
                if (!Selecciono) {
                    $("#hdfCodEmpleado").val("");
                    CargarDispositivosConLinea("");
                    $("#btnSolicitar").button("option", "disabled", true);
                }
                return false;
            },
            open: function (event, ui) {
                Selecciono = false;
                return false;
            }
        })
        .data("autocomplete")._renderItem = function (ul, item) {
            return $("<li></li>")
			    .data("item.autocomplete", item)
			    .append("<a>" + item.vcCodEmp + "=" + item.label + "</a>")
			    .appendTo(ul);
        };
    }

    $("#btnSolicitar").click(function () {
        var CodEmp = $("#hdfCodEmpleado").val(); //empleado
        var NumLin = $("#ddlDispositivo").val(); //dispositivo
        var ArchAdj = lstUbicaciones.join(","); // adjuntos
        var Serv = $("#hdfServSerl").val(); //servicio
        var DesSol = $("#txtMotivoActivacion").val().replace(/'/g, "&#39"); //motivo
        var CantSol = $("#txtCatnidadSolicitada").val(); //cantidad
        var ServSol = Serv; //Servicio solicitado
        //alerta("CodEmp->" + CodEmp + ",NumLin->" + NumLin + ",ArchAdj->" +ArchAdj  + ",Serv->" + Serv + ",DesSol->" + DesSol + ",->" +  + ",
        if ($('#chkIlimitado').is(':checked') == false && CantSol == '') {
            alerta("Indique una cantidad para el servicio.");
            return;
        }

        if ($('#chkIlimitado').is(':checked')) { CantSol = "0"; }
        //if ($('#rbtPermanente').is(':checked')) { FecFin = null };
        $.ajax({
            type: "POST",
            url: "Adm_SolicitudAmpliacionServicio.aspx/EnviaSolicitud",
            data: "{'vcNumLin': '" + NumLin + "'," +
                    "'vcCodEmp': '" + CodEmp + "'," +
                    "'vcArchAdj': '" + ArchAdj + "'," + // adjuntos 
                    "'ServSol': '" + ServSol + "'," +
                    "'DesSol': '" + DesSol + "'," +
                    "'CantSol': '" + CantSol + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                if (result.d == '0') {
                    alerta("Ya ha solicitado este servicio.");
                } else if (result.d == '-2') {
                    alerta("No hay saldo suficiente para responder a su solicitud");
                } else {
                    alerta("Su solicitud fue enviada con éxito");
                    limpiarParaNuevaSolicitud();
                }
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            }
        });
    });

    //adjuntar archivos
    $("#btnAdjuntarArchivos").click(function () {
        var $width = 420;
        var $height = 400;
        var $Pagina = 'Adm_AdjuntarArchivos.aspx?inTipSol=' + $("#hdfSolicitud").val() + "&lstUbi=" + lstUbicaciones.join(",");
        $("#ifAdjuntar").attr("src", $Pagina);
        Modal = $('#dvAdjuntar').dialog({
            title: "Adjuntar Archivos",
            width: $width,
            height: $height,
            modal: true,
            resizable: false
        });
    });

});

function CargarDispositivosConLinea(Empleado) {
    $("#ddlDispositivo").html("");
    $("#ifDetalleDispositivo").attr("src", "");
    document.getElementById('divTabs').style.display = '';
    if (Empleado != "") {
        //$($('#tbModelos > ul a')[1]).text("Equipo a Adquirir");
        $.ajax({
            type: "POST",
            url: "Adm_SolicitudActivacionServicio.aspx/ListarDispositivosConLinea",
            data: "{'vcCodEmp': '" + Empleado + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                if ($(result.d).length > 0) {
                    $("#ddlDispositivo").append($("<option></option>").attr("value", "-1").text("Seleccione un dispositivo"));
                    //var itemsDispositivos = [{ text: 'Seleccione un dispositivo', value: -1}];
                    arlincue = [];
                    for (i in result.d) {
                        var lincue = new LineaCuenta();
                        $("#ddlDispositivo").append($("<option></option>").attr("value", result.d[i].vcNum).text(result.d[i].ModeloDispositivo.vcNom));
                        //itemsDispositivos.push({ text: result.d[i].ModeloDispositivo.vcNom.toString(), value: result.d[i].vcNum.toString() });
                        $("#hdfCodCuenta").val(result.d[0].F_vcCodEmp);
                        lincue.Linea = result.d[i].vcNum;
                        lincue.Cuenta = result.d[i].F_vcCodEmp;
                        arlincue.push(lincue);
                    }
                    //alert(itemsDispositivos.length);
                    //var dataSourceDisp = new kendo.data.DataSource({ data: itemsDispositivos });
                    //$("#ddlDispositivo").data("kendoComboBox").setDataSource(dataSourceDisp);
                    $('#ddlDispositivo').val(result.d[0].vcNum);
                    //$("#ddlDispositivo").data("kendoComboBox").select(0);
                    if ($("#ddlDispositivo").val() != "-1") {
                        var name = $("#ddlDispositivo option:selected").text();
                        var IMEI = name.substr(0, name.indexOf('-') - 1);
                        //alert(IMEI);
                        $("#ifDetalleDispositivo").attr("src", "Mantenimiento/Mnt_DetalleDispositivoServicio.aspx?CodDis=" + IMEI + "&serv=" + serv);
                        MostrarFilasNuevoServ(1);
                        //listarTipoServicio($("#hdfCodCuenta").val(), $("#ddlDispositivo").val());
                    }
                    else {
                        $("#ifDetalleDispositivo").attr("src", "");
                        document.getElementById('divTabs').style.display = 'none';
                        MostrarFilasNuevoServ(0);
                        $("#btnSolicitar").button("option", "disabled", true);
                    }
                }
                else {
                    $("#ddlDispositivo").append($("<option></option>").attr("value", "-2").text("No tiene dispostivos con linea asignados"));
                    $("#ifDetalleDispositivo").attr("src", '');
                    document.getElementById('divTabs').style.display = 'none';
                    MostrarFilasNuevoServ(0);
                    $("#btnSolicitar").button("option", "disabled", true);
                    //$("#ddlDispositivo").data("kendoComboBox").setDataSource({ text: 'No tiene dispostivos con linea asignados', value: '-2' });
                }
                CargarPagina2();
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            }
        });
    }
    else {
        //$("#ddlDispositivo").append($("<option></option>").attr("value", "-1").text("Seleccione un empleado"));
        $("#ddlDispositivo").data("kendoComboBox").setDataSource({ text: 'Seleccione un empleado', value: '-1' });
    }
}

function numeroAdjuntos(nAdj) {
    $("#lblNumeroAdjuntos").text('');
    $("#lblNumeroAdjuntos").text('Se han cargado ' + nAdj + ' adjuntos.');
}

function listaUbicaciones(ubicacionesAdjuntos) {
    lstUbicaciones = ubicacionesAdjuntos;
}

function MostrarFilasNuevoServ(mostrarfila) {
    if (mostrarfila == "1") {
        //document.getElementById('trNuevoServicio0').style.display = '';
        //document.getElementById('trNuevoServicio1').style.display = '';
        document.getElementById('trServicioSeleccionado').style.display = '';
        document.getElementById('trNuevoServicio2').style.display = '';
        //document.getElementById('trNuevoServicio3').style.display = '';
        document.getElementById('trCantidad1').style.display = '';
        document.getElementById('trCantidad2').style.display = '';
    } else {
        //document.getElementById('trNuevoServicio0').style.display = 'none';
        //document.getElementById('trNuevoServicio1').style.display = 'none';
        document.getElementById('trServicioSeleccionado').style.display = 'none';
        document.getElementById('trNuevoServicio2').style.display = 'none';
        //document.getElementById('trNuevoServicio3').style.display = 'none';
        document.getElementById('trCantidad1').style.display = 'none';
        document.getElementById('trCantidad2').style.display = 'none';
    }
    limpiarParaNuevaSolicitud();
}

function ServSelect(servsel) {
    var arrayDatosServ = [];
    arrayDatosServ = servsel.split(',');
    if (arrayDatosServ[2] == 'Ilimitado') {
        alert('No puede ampliar un servicio Ilimitado');
        return;
    }
    $("#lblServSeleccionado").text(arrayDatosServ[1]);
    $("#hdfServSerl").val(arrayDatosServ[0]);
}

function limpiarParaNuevaSolicitud() {
    $("#lblServSeleccionado").text('');
    $('#chkIlimitado').attr('checked', false);
    document.getElementById('trCantidad2').style.display = '';
    $("#txtCatnidadSolicitada").val('');
    $("#lblValorCatnidad").text('');
    $("#txtMotivoActivacion").val('');
    $("#lblServSeleccionado").text('');
}

function CuentaDeLinea(linea) {
    var l = 0;
    for (l = 0; l < arlincue.length; l++) {
        if (arlincue[l].Linea == linea) {
            $("#hdfCodCuenta2").val(arlincue[l].Cuenta);
        }
    }
}

function CargarPagina2() {
    if ($("#ddlDispositivo").val() != null && $("#ddlDispositivo").val() != "-1" && $("#ddlDispositivo").val() != "-2") {
        document.getElementById('divTabs').style.display = '';
        $("#tbModelos").tabs("option", "disabled", [1]);
        var name = $("#ddlDispositivo option:selected").text();
        //alert(name);
        var IMEI = name.substr(0, name.indexOf('-') - 1);
        $("#ifDetalleDispositivo").attr("src", "Mantenimiento/Mnt_DetalleDispositivoServicio.aspx?CodDis=" + IMEI + "&serv=" + serv);
        MostrarFilasNuevoServ(1);
        $("#btnSolicitar").button("option", "disabled", false);
    }
    else {
        document.getElementById('divTabs').style.display = 'none';
        MostrarFilasNuevoServ(0);
        $("#ifDetalleDispositivo").attr("src", "");
        $("#btnSolicitar").button("option", "disabled", true);
    }
}