/// <reference path="../../../../Common/Scripts/jquery-2.0.0-vsdoc.js" />
var Selecciono;
var esProceso;
var arCodSolServ = [];
//var arCodSolServU = new Array;
// INICIO DE DOCUMENT READY
$(function () {
    var adj;
    var codSol;
    var inTipSol;
    var arrDispositivo;
    //solicitud servicio
    $("#txtServSolicitado").hide();
    $("#txtCantidadSolicitada").hide();
    
    $('.btnNormal').button();
    $("#radioVistas").buttonset();
    $("#btnIngresarDetalle").button({ icons: { primary: "ui-icon-comment"} });
    $("#btnProcesar").button({ icons: { primary: "ui-icon-gearm"} });
    $("#btnAceptar").button({ icons: { primary: "ui-icon-check"} });
    $("#btnRechazar").button({ icons: { primary: "ui-icon-closethick"} });
    $("#btnCrear").button({ icons: { primary: "ui-icon-plusthick"} });
    $("#btnEnviar").button({ icons: { primary: "ui-icon-mail-closed"} });
    $("#btnEnviar").click(function () { AbrirReporteSolicitudServicio(); });

    $("#btnAgrupadoEstado").button({ icons: { primary: "ui-icon-bookmark"} });
    $("#btnBuscarIMEI").button();
    $("#btnBuscarEquipo").button();

    $("#porTipo").click(function () { mostrarTipos(); });
    $("#porEstado").click(function () { mostrarEstados(); });
    $("#btnProcesar").click(function () { 
        var tipsol = $("#hdfCodTipo").val();
        if (tipsol == 6 || tipsol == 7) {
            ProcesarSolicitudServicios(tipsol);
        } else {
            ProcesarSolicitud();
        }
    });
    $("#btnRechazar").click(function () { RechazarSolicitud(); });
    $("#btnCrear").click(function () { CrearSolicitud(); });
    $("#btnAgrupadoEstado").click(function () { AbrirReporteAgrupadoEstado(); });
    $("#btnIngresarDetalle").click(function () { ingresarDetalle($("#txtDetalle").val()); });
    $('#txtDetalle').keypress(function (event) {
        if (event.which == '13') {
            ingresarDetalle($("#txtDetalle").val());
        }
    });

    $(".txtFecha").datepicker({
        changeMonth: true,
        changeYear: true,
        minDate: new Date()
    });

    $("#imgBorrarFecha").click(function () {
        $("#txtFecha").val("");
    });

    $("#imgBorrarFechaEntregaC").click(function(){
        $("#txtFechaEntregaC").val("");
    });

    obtenerTipos();
    obtenerSolicitudesInicio(6);



    $("#btnGuardar").click(function (event) {//guardar procesar
        //var CodIMEI = $("#ddlEquipoNuevo").val();        
        var CodIMEI = $("#hdfImeiSel").val();
        var EstSol = $("#hdfCodEstado").val();
        var codNumLim;
        
        codSol = $("#hdfIdSolicitud").val();
        inTipSol = $("#hdfCodTipo").val();

        if (inTipSol == 6 || inTipSol == 7){
            var CantSol;
            if($("#txtCantidadSolicitada").val() == 'Ilimitado') {
                CantSol = 0;
            } else {
                CantSol = $("#txtCantidadSolicitada").val();
            }
            var ServSol = $("#hdfCodDatSol").val();
            var EnvCor = $("#hdfEnvio").val();
            var Obs = $("#hdfMotivo").val();
            if(EstSol == 6) { EnvCor = false; }                
            $.ajax({
                type: "POST",
                url: "Adm_Solicitudes.aspx/RespuestaSolicitudServicio",
                data: "{'inCodSol': '" + codSol + "'," +
                       "'inTipSol': '" + inTipSol + "'," +
                       "'inEstSol': '" + EstSol + "'," +
                       "'codNumLim': '" + codNumLim + "'," +
                       "'CantSol': '" + CantSol + "'," +
                       "'ServSol': '" + ServSol + "'," +
                       "'EnvCor': '" + EnvCor + "'," +
                       "'vcObs': '" + Obs + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (msg) {
                    alerta("Solicitud respondida");
                    $("#txtFecha").val("");
                    Modal.dialog('close');
                    window.document.location.reload();
                },
                error: function (xhr, err, thrErr) {
                    MostrarErrorAjax(xhr, err, thrErr);
                }
            });
        } else {
            var f = new Date();
            if (Date.parse($("#txtFecha").val()) < Date.parse(f)) {
                alerta("La fecha de Entrega debe ser mayor a la actual.");
                return;
            }
            
            if ($.trim($("#txtFecha").val()) == "" && $("#hdfCodEstado").val() == 8) {
                alerta("La Fecha de Entrega es requerido.");
                return;
            }
            
            if ($("#hdfValidacion").val() != "") {
                alert($("#hdfValidacion").val());
                Modal.dialog('close');
            }
            else {
                if (inTipSol == 2) {
                    
                    codNumLim = $("#ddlNumero").val();
            var i = 0;
                    for (i = 0; i < arrDispositivo.length; i++) {
                        //if (arrDispositivo[i]['P_vcCodIMEI'] == $("#ddlEquipoNuevo")[0].value) {
                        if (arrDispositivo[i]['P_vcCodIMEI'] == $("#hdfImeiSel")[0].value) {
                            if (arrDispositivo[i]['btSopLin'] == "true" && (codNumLim == null || codNumLim == "")){
                                alert('El dispositivo requiere de una línea válida.');
                                return;
                            }
                        }
                    }
                }
                else {
                    codNumLim = "";
                }
                if (CodIMEI != null) {
                    $.ajax({
                        type: "POST",
                        url: "Adm_Solicitudes.aspx/RespuestaSolicitud",
                        data: "{'vcCodIMEI': '" + CodIMEI.replace(/'/g, "&#39") + "'," +
                               "'inCodSol': '" + codSol + "'," +
                               "'inTipSol': '" + inTipSol + "'," +
                               "'inEstSol': '" + EstSol + "'," +
                               "'codNumLim': '" + codNumLim + "'," +
                               "'dtFecEnt': '" + $("#txtFecha").val() + "'," +
                               "'vcObs': '" + "" + "'}",
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: function (msg) {
                            alerta("Solicitud respondida");
                            $("#txtFecha").val("");
                            Modal.dialog('close');
                            window.document.location.reload();
                        },
                        error: function (xhr, err, thrErr) {
                            MostrarErrorAjax(xhr, err, thrErr);
                        }
                    });
                } else {
                    alerta("No hay líneas disponibles para esta solicitud");
                }
            }
        }

        
    });

    $("#btnSalir").click(function (event) {
        Modal.dialog('close');
        DesactivarProcSolServicio();
    });

    $("#btnGuardarR").click(function (event) {
        //var CodIMEI = $("#ddlEquipoNuevo").val();
        var CodIMEI = $("#hdfImeiSel").val();
        var EstSol = $("#hdfCodEstado").val();
        var codNumLim;

        if ($("#hdfValidacion").val() != "") {
            alert($("#hdfValidacion").val());
            Modal.dialog('close');
        }
        else {

            if ($("#txtObservaciones").val().replace(/'/g, "&#39") == "") {
                alert('Observaciones es requerido');
                return;
            }
            $.ajax({
                type: "POST",
                url: "Adm_Solicitudes.aspx/RespuestaSolicitud",
                data: "{'vcCodIMEI': '" + "" + "'," +
                        "'inCodSol': '" + codSol + "'," +
                        "'inTipSol': '" + inTipSol + "'," +
                        "'inEstSol': '" + 9 + "'," +
                        "'codNumLim': '" + "" + "'," +
                        "'dtFecEnt': '" + "" + "'," +
                        "'vcObs': '" + $("#txtObservaciones").val().replace(/'/g, "&#39") + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (msg) {
                    alerta("Solicitud respondida");
                    Modal.dialog('close');
                    window.document.location.reload();
                },
                error: function (xhr, err, thrErr) {
                    MostrarErrorAjax(xhr, err, thrErr);
                }
            });
            ingresarDetalle($("#txtObservaciones").val());
        }
    });

    $("#btnSalirR").click(function (event) {
        Modal.dialog('close');
    });

    $("#btnGuardarC").click(function (event) {
        var CodIMEI = $("#hdfImeiSel").val();
        var CodIMEIAnt = $("#ddlEquipo").val();
        var CodModDis = $("#ddlModeloEquipoNuevoC").val();
        var CodEmp = $("#hdfCodEmpleadoNuevo").val();
        var NumLin = $("#lblNumeroC").html();
        //datos para solicitud de servicios
        var DesSol = $("#txtMotivoActivacion").val().replace(/'/g, "&#39"); //motivo
        var CantSol;
        if($("#txtCatnidadSolicitada").val() == 'Ilimitado') {
            CantSol = 0;
        } else {
            CantSol = $("#txtCatnidadSolicitada").val();
        }
        var ArchAdj = "";
        var ServSol; //Servicio solicitado

        if ($("#hdfCodEmpleadoNuevo").val() == ''){
            alerta("Seleccione un empleado");
            return;
        }
        //var f = new Date();
        //if (Date.parse($("#txtFechaEntregaC").val()) < Date.parse(f)) {
        //    alerta("La fecha de Entrega debe ser mayor a la actual.");
        //    return;
        //}

        if ($("#ddlTipoSolicitud").val() == 6){
            var Serv = $("#ddlServicio").val(); //servicio
            var TipServ = $("#ddlTipoServicio").val(); //tipo servicio
            var FecIni = $("#txtFechaInicial").val(); //fecha inicial
            var FecFin = $("#txtFechaFinal").val(); //fecha final

            if (TipServ == "-2" && Serv == "-2") {
                alerta("Ud. ya cuenta con todos los servicios para la cuenta asociada a la línea.");
                return;
            }
            if (TipServ == "-1") {
                alerta("Seleccione un Tipo de Servicio.");
                return;
            }
            if (Serv == "-1") { //todos los servicios de un tiposervicio
                ServSol = TipServ; //codigo de tiposervicio
            } else {
                ServSol = Serv; //codigo de servicio individual
            }
            if ($('#chkIlimitado').is(':checked')) { CantSol = "0"; }
            if ($('#chkIlimitado').is(':checked') == false && CantSol == '') {
                alerta("Indique una cantidad para el servicio.");
                return;
            }
            if ($("#txtFechaInicial").val() == '') {
                alerta("Ingrese una Fecha de inicio");
                return;
            }
            if ($('#chkPermanente').is(':checked')){ FecFin = ""; }
            if ($('#chkPermanente').is(':checked') == false && FecFin == '') {
                alerta("Ingrese una Fecha Final");
                return;
            }
            //alerta("listo " + CantSol + "-" + ServSol + "-" + FecFin);
            $.ajax({
                type: "POST",
                url: "../Adm_SolicitudActivacionServicio.aspx/EnviaSolicitud",
                data: "{'vcNumLin': '" + NumLin + "'," +
                        "'vcCodEmp': '" + CodEmp + "'," +
                        "'vcArchAdj': '" + ArchAdj + "'," + // adjuntos 
                        "'ServSol': '" + ServSol + "'," +
                        "'FecIni': '" + FecIni + "'," +
                        "'FecFin': '" + FecFin + "'," +
                        "'DesSol': '" + DesSol + "'," +
                        "'CantSol': '" + CantSol + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {
                    if (result.d == '0') {
                        alerta("Ya ha solicitado este servicio.");
                    }
                    else if (result.d == '-1') {
                        alerta("Ya ha solicitado todos los servios del Tipo Servicio seleccionado ");
                    } else {
                        alerta("Su solicitud fue enviada con éxito");
                        Modal.dialog('close');
                    }
                },
                error: function (xhr, err, thrErr) {
                    MostrarErrorAjax(xhr, err, thrErr);
                }
            });
        } else if($("#ddlTipoSolicitud").val() ==7){
            ServSol = $("#ddlServActuales").val();

            if (ServSol == "-1") {
                alerta("Seleccione un Servicio.");
                return;
            }
            if ($('#chkIlimitado').is(':checked')) { CantSol = "0"; }
            if ($('#chkIlimitado').is(':checked') == false && CantSol == '') {
                alerta("Indique una cantidad para el servicio.");
                return;
            }
            
            $.ajax({
                type: "POST",
                url: "../Adm_SolicitudAmpliacionServicio.aspx/EnviaSolicitud",
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
                    } else {
                        alerta("Su solicitud fue enviada con éxito");
                        Modal.dialog('close');
                    }
                },
                error: function (xhr, err, thrErr) {
                    MostrarErrorAjax(xhr, err, thrErr);
                }
            });

        } else {
            if ($("#lblMensaje").html() != ""){
                alert($("#lblMensaje").html());
                return;
            }
            if ($("#txtFechaEntregaC").val() == "") {
                alerta("La Fecha de Entrega es requerido.");
                return;        
            }
            if ($("#ddlTipoSolicitud").val() != 4){
                if ($("#hdfImeiSel").val() == ""){
                    alerta("El dispositivo es requerido");
                    return;
                }
            }
            if ($("#ddlTipoSolicitud").val() == 2) {
                NumLin = $("#ddlNumero").val();
                var i = 0;
                for (i = 0; i < arrDispositivo.length; i++) {
                    if (arrDispositivo[i]['P_vcCodIMEI'] == $("#hdfImeiSel")[0].value) {
                        if (arrDispositivo[i]['btSopLin'] == "true" && (codNumLim == null || codNumLim == "")){
                            alert('El dispositivo requiere de una línea válida.');
                            return;
                        }else if (arrDispositivo[i]['btSopLin'] == "false") {
                            alert('El dispositivo no soporta línea, asi que no se considerará ninguna');
                            NumLin = "";
                        }
                    }
                }
            }
            $.ajax({
                type: "POST",
                url: "Adm_Solicitudes.aspx/CreaSolicitud",
                data: "{'vcCodIMEI': '" + CodIMEIAnt + "'," + //CodIMEI.replace(/'/g, "&#39") + "'," + 
                      "'inTipSol': '" + $("#ddlTipoSolicitud").val() + "'," +
                      "'codNumLim': '" + NumLin + "'," +
                      "'dtFecEnt': '" + $("#txtFechaEntregaC").val() + "'," +
                      "'inCodModDis': '" + CodModDis + "'," +
                      "'vcCodEmp': '" + CodEmp + "'," +
                      "'vcObs': '" + '' + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {
                    if (result.d == '') {
                        alerta("Solicitud creada");
                        $("#hdfCodEmpleadoNuevo").val("");
                        $("#lblNumeroC").val("");
                        Modal.dialog('close');
                    }
                    else {
                        alert(result.d);
                    }
                },
                error: function (xhr, err, thrErr) {
                    MostrarErrorAjax(xhr, err, thrErr);
                }
            });
        }
    });

    $("#btnSalirC").click(function (event) {
        Modal.dialog('close');
        DesactivarCrearSolServicio();
        $("#hdfCodEmpleadoNuevo").val();        
    });

    function ProcesarSolicitud() {
        DesactivarProcSolServicio();
        $("#btnBuscarIMEI").button("option", "disabled", false);
        $("#hdfValidacion").val("");

        function Dispositivo() {
            this.P_vcCodIMEI;
            this.inCodModDis;
            this.vcNomModDis;
            this.btSopLin;
        }
        arrDispositivo = [];

        if ($("#hdfAdmin").val() == "1") {
            var a = $("#solis").find(".ui-state-active");
            var id;

            if (a.length != 0) {
                if ($("#hdfCodEstado").val() != 6 && $("#hdfCodEstado").val() != 8) {
                    alert('Solo las solicitudes en estados "Por Ejecutar" o "En Proceso" pueden ser procesadas.');
                    return;
                }

                var CodEmp = $("#hdfCodEmpleado").val();
                var NomEmp = $("#txtEmpleado").val();
                var NumLin = $("#txtNumero").val();
                var vcModDisAnt = $("#txtDispAnt").val();
                var IMEIDisAnt = $("#hdfImeiAnt").val();
                var CodMotRep = 1;
                var vcModDisNuevo = $("#txtDispNuevo").val();
                var IMEIDisNuevo = $("#hdfImeiNue").val();
                var vcObs = "";
                var codEst = $("#hdfCodEstado").val();
                inTipSol = $("#hdfCodTipo").val();
                codSol = $("#hdfIdSolicitud").val();
                $("#lblCodEmpleado").html(CodEmp);
                $("#lblNomEmpleado").html(NomEmp);
                $("#lblNumCelular").html(NumLin);
                $("#lblModeloEquipoAnt").html(vcModDisAnt);
                $("#lblIMEIEquipoAnt").html(IMEIDisAnt);
                $("#ddlMotivoReposicion").val(CodMotRep);
                $("#lblModeloEquipoNuevo").html(vcModDisNuevo);

                var vcMetodo = "";
                var vcData = "";
//                if (inTipSol != 2){
//                    vcMetodo = "Adm_Solicitudes.aspx/ListarDispositivosLibresPorSolicitud";
//                    vcData = "{'inCodSol': '" + codSol + "'}";
//                }else{
                    vcMetodo = "Adm_Solicitudes.aspx/ListarDispositivos";
                    vcData = "{'vcCodEmp': '" + CodEmp + "'}";
                //}

                $("#ddlModeloEquipoNuevo").empty();
                $("#ddlModeloEquipoBuscar").empty();

                $.ajax({
                    type: "POST",
                    url: vcMetodo,
                    data: vcData,
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (result) {
                        if ($(result.d).length > 0) {
                            var index = 0;
                            $.each(result.d, function () {
                                eval("var Dispositivo" + index + " = new Dispositivo();");
                                eval("Dispositivo" + index + "['P_vcCodIMEI'] = " + this.P_vcCodIMEI + ";");
                                eval("Dispositivo" + index + "['inCodModDis'] = " + this.ModeloDispositivo.P_inCod + ";");
                                eval("Dispositivo" + index + "['vcNomModDis'] = '" + this.ModeloDispositivo.vcNom + "';");
                                eval("Dispositivo" + index + "['btSopLin'] = '" + this.ModeloDispositivo.btSopLin + "';");
                                eval("arrDispositivo.push(Dispositivo" + index + ");");

                                if ($("#ddlModeloEquipoNuevo option[value='" + this.ModeloDispositivo.P_inCod + "']").val() === undefined) {
                                    $("#ddlModeloEquipoNuevo").append($("<option></option>").attr("value", this.ModeloDispositivo.P_inCod).text(this.ModeloDispositivo.vcNom));
                                    $("#ddlModeloEquipoBuscar").append($("<option></option>").attr("value", this.ModeloDispositivo.P_inCod).text(this.ModeloDispositivo.vcNom));
                                }
//                                if ($("#ddlModeloEquipoNuevo")[0].value == this.inCodModDis) {
//                                    $("#ddlEquipoNuevo").append($("<option></option>").attr("value", this.P_vcCodIMEI).text(this.P_vcCodIMEI));
//                                }
                            });
                            $("#lblModeloEquipoNuevo").html(vcModDisNuevo);
                        }
                        else {
                            $("#hdfValidacion").val("No hay equipos disponibles para esta solicitud");
                            $("#btnBuscarIMEI").button("option", "disabled", true);
                            //alerta("No hay equipos disponibles para esta solicitud");
                            //Modal.dialog('close');
                        }
                    },
                    error: function (xhr, err, thrErr) {
                        MostrarErrorAjax(xhr, err, thrErr);
                    }
                });

                if (inTipSol == 2) {
                    $.ajax({
                        type: "POST",
                        url: "Adm_Solicitudes.aspx/ListarLineasLibresPorSolicitud",
                        data: "{'inCodSol': '" + codSol + "'}",
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: function (result) {
                            $("#ddlNumero").show();
                            $("#lblNumCelular").hide();
                            $("#ddlNumero").html("");

                            if ($(result.d).length > 0) {
                                $.each(result.d, function () {
                                    $("#ddlNumero").append($("<option></option>").attr("value", this.P_vcNum).text(this.P_vcNum));
                                });
                            }
//                            else {
//                                $("#hdfValidacion").val("No hay lineas disponibles para esta solicitud");
//                                //alerta("No hay lineas disponibles para esta solicitud");
//                                //Modal.dialog('close');
//                            }
                        },
                        error: function (xhr, err, thrErr) {
                            MostrarErrorAjax(xhr, err, thrErr);
                        }
                    });
                }
                else {
                    $("#ddlNumero").hide();
                    $("#lblNumCelular").show();
                }
                Modal = $("#dvAprobacion").dialog({
                    modal: true,
                    width: 360,
                    title: "Procesar solicitud"
                });
            }
            else {
                alerta("Seleccione un registro");
            }
        }
        else{
            alerta("Usted no es un usuario administrador, No podra realizar esta acción");
        }
    }

    $("#txtEmpleado").focusout(function () {
        $.ajax({
            type: "POST",
            url: "../../../Common/WebService/General.asmx/ListarEmpleado",
            data: "{'maxFilas': '" + 200 + "'," +
                           "'vcNomEmp': '" + $("#txtEmpleado").val().replace(/'/g, "&#39") + "'," +
                           "'incodGrup': '-1'," +
                           "'idCliente': '" + window.parent.parent.idCliente + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                if ($(result.d).length == 1) {
                    $("#hdfCodEmpleado").val(result.d[0].P_vcCod);
                    Selecciono = true;
                    BuscarGrilla();
                }
                else {
                    $("#hdfCodEmpleado").val("");
                    Selecciono = false;
                }
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            }
        });
    });

    $("#txtEmpleado").autocomplete({
        minLength: 0,
        source: function (request, response) {
            $.ajax({
                type: "POST",
                url: "../../../Common/WebService/General.asmx/ListarEmpleado",
                data: "{'maxFilas': '" + 200 + "'," +
                               "'vcNomEmp': '" + $("#txtEmpleado").val().replace(/'/g, "&#39") + "'," +
                               "'incodGrup': '-1'," +
                               "'idCliente': '" + window.parent.parent.idCliente + "'}",
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
            return false;
        },
        change: function (event, ui) {
            if (!Selecciono) {
                $("#hdfCodEmpleado").val("");
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

    function RechazarSolicitud() {

        function Dispositivo() {
            this.P_vcCodIMEI;
            this.inCodModDis;
            this.vcNomModDis;
        }
        arrDispositivo = [];

        if ($("#hdfAdmin").val() == "1") {
            var a = $("#solis").find(".ui-state-active");
            var id;

            if (a.length != 0) {
                if ($("#hdfCodEstado").val() != 6 && $("#hdfCodEstado").val() != 8) {
                    alert('Solo las solicitudes en estados "Por Ejecutar" o "En Proceso" pueden ser rechazadas.');
                    return;
                }

                var CodEmp = $("#hdfCodEmpleado").val();
                var NomEmp = $("#txtEmpleado").val();
                inTipSol = $("#hdfCodTipo").val();
                codSol = $("#hdfIdSolicitud").val();

                $("#lblCodEmpleadoR").html(CodEmp);
                $("#lblNomEmpleadoR").html(NomEmp);

                Modal = $("#dvRechazo").dialog({
                    modal: true,
                    width: 360,
                    title: "Rechazar solicitud"
                });
            }
            else {
                alerta("Seleccione un registro");
            }
        }
    }

    function LimpiarControlesCreacion(){
        $("#ddlTipoSolicitud").val("1");
        $("#txtEmpleadoNuevo").val("");
        $("#lblMensaje").html("");
        $("#lblIMEINuevo").html("");
        $("#ddlEquipo").empty();
        $("#lblEquipo").val("");
        $("#ddlNumeroC").empty();
        $("#lblNumeroC").val("");
        $("#ddlModeloEquipoNuevoC").empty();
        $("#txtFechaEntregaC").val("");
        $("#hdfCodEmpleadoNuevo").val("");
        $("#lblNumeroC").text("");
        LimpiarControlesCearServ();
    }

    function LimpiarControlesCearServ() {
        $("#lblNumeroC").text("");

        $("#ddlTipoServicio").html("");
        $("#ddlTipoServicio").append($("<option></option>").attr("value", -2).text("Sin datos"));
        $("#ddlTipoServicio").val('-2');
        $("#ddlServicio").html("");
        $("#ddlServicio").append($("<option></option>").attr("value", -2).text("Sin datos"));
        $("#ddlServicio").val('-2');
        $('#chkIlimitado').attr('checked', false);
        $("#txtCatnidadSolicitada").val('');
        $("#txtCatnidadSolicitada").show(100);
        $("#lblValorCatnidad").text('');
        $("#txtMotivoActivacion").val('');
        $("#txtFechaInicial").val('');
        $("#txtFechaFinal").val('');
        $("#txtFechaFinal").show(100);
        $('#chkPermanente').attr('checked', false);
        $("#txtFechaInicial").datepicker('option', 'minDate', new Date());
        $("#txtFechaInicial").datepicker('option', 'maxDate', '');
        $("#txtFechaFinal").datepicker('option', 'minDate', new Date());
        $("#txtFechaFinal").datepicker('option', 'maxDate', '');
    }

    function CrearSolicitud() {
    DesactivarCrearSolServicio();
    LimpiarControlesCreacion();
    $("#btnBuscarEquipo").button("option", "disabled", false);
    $("#hdfValidacion").val("");

        function Dispositivo() {
            this.P_vcCodIMEI;
            this.inCodModDis;
            this.vcNomModDis;
        }
        arrDispositivo = [];
        var vcNumLin = "";

        if ($("#hdfAdmin").val() == "1") {
            var a = $("#solis").find(".ui-state-active");
            var id;

            $("#lblMensaje").html("");
            $("#ddlModeloEquipoNuevoC").removeAttr('disabled');
            $("#lblNumeroC").text("");
            $("#ddlNumeroC").hide();
            $("#lblNumeroC").show();

            $("#ddlTipoSolicitud").change(function () {
                var combo = this;
                $("#lblMensaje").html("");
                if (combo.value == "6" || combo.value == "7"){
                    ActivarCrearSolServicio();
                    CargarDispositivosConLinea($("#hdfCodEmpleadoNuevo").val());

                } else if (combo.value == "2"){
                    CargarDispositivos($("#hdfCodEmpleadoNuevo").val());
                    DesactivarCrearSolServicio();
                    $("#ddlNumeroC").show();
                    $("#lblNumeroC").hide();
                    $("#ddlNumeroC").html("");
                    $("#lblEquipo").hide();
                    $("#ddlEquipo").hide();
                    $("#ddlModeloEquipoNuevoC")[0].disabled = false;
                    $("#btnBuscarEquipo").show();
                } else if (combo.value == "4") {
                    CargarDispositivos($("#hdfCodEmpleadoNuevo").val());
                    DesactivarCrearSolServicio();
                    $("#ddlNumeroC").hide();
                    $("#lblNumeroC").show();
                    $("#lblEquipo").show();
                    $("#ddlEquipo").show();
                    $("#ddlModeloEquipoNuevoC")[0].disabled = true;
                    $("#btnBuscarEquipo").hide();
                } else {
                    CargarDispositivos($("#hdfCodEmpleadoNuevo").val());
                    DesactivarCrearSolServicio();
                    $("#ddlNumeroC").hide();
                    $("#lblNumeroC").show();
                    $("#lblEquipo").show();
                    $("#ddlEquipo").show();
                    $("#ddlModeloEquipoNuevoC")[0].disabled = false;
                    $("#btnBuscarEquipo").show();
                }
                $("#txtEmpleadoNuevo").focus();
            });

            $("#ddlEquipo").change(function () {
                var combo = this;
                var arrNumLin = vcNumLin.split(",");
                if ($("#ddlTipoSolicitud").val() == "6" || $("#ddlTipoSolicitud").val() == "7"){
                    if ($("#ddlEquipo").val() != "-1") {
                        listarTipoServicio($("#hdfCodCuenta").val(), $("#ddlEquipo").val());
                        $("#lblNumeroC").html('');
                        $("#lblNumeroC").html($("#ddlEquipo").val());
                    } else {
                        $("#lblNumeroC").html('');
                    }
                } else {
                    for (i = 0; i < $("#ddlEquipo")[0].length; i++) {
                        if ($("#ddlEquipo").val() ==  $("#ddlEquipo")[0][i].value) {
                            for (j = 0; j < arrNumLin.length; j++) {
                                if (j == i - 1) {                            
                                    VerificaHabilitado($("#ddlEquipo")[0][i].value);
                                    $("#lblNumeroC").html(arrNumLin[j]);
                                }
                            }
                        }
                    }
                }
            });

//            if ($("#ddlEquipo").val() != "-1") {
//            if ($("#hdfSolicitud").val() != "2") {
//            VerificaHabilitado($("#ddlEquipo").val());
//            } else {
//            VerificaHabilitadoEmpleado(Empleado);
//            }

            function CargarDispositivos(Empleado) {
                $("#ddlEquipo").html("");
                vcNumLin = "";

                if (Empleado != "") {
                    if ($("#ddlTipoSolicitud").val() != "2") {
                        $.ajax({
                            type: "POST",
                            url: "../Adm_SolicitarDispositivo.aspx/ListarDispositivos",
                            data: "{'vcCodEmp': '" + Empleado + "'}",
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success: function (result) {
                            $('#ddlEquipo').find('option').remove();
                            $("#ddlEquipo").append($("<option></option>").attr("value", "-1").text("Seleccione un dispositivo"));
                                if ($(result.d).length > 0) {                                    
                                var i;
                                    for (i in result.d) {
                                        $("#ddlEquipo").append($("<option></option>").attr("value", result.d[i].P_vcCodIMEI).text(result.d[i].ModeloDispositivo.vcNom));
                                        vcNumLin = vcNumLin + result.d[i].vcNum + ",";
                                    }
                                    
                                    if (vcNumLin.length > 0){
                                        vcNumLin = vcNumLin.substr(0,vcNumLin.length-1);
                                    }

                                    $('#ddlEquipo').val(result.d[0].P_vcCodIMEI);
                                    $("#lblNumeroC").html(result.d[0].vcNum);

                                    if ($("#ddlEquipo").val() != "-1") {
                                        if ($("#hdfSolicitud").val() != "2") {
                                            VerificaHabilitado($("#ddlEquipo").val());
                                        } else {
                                            VerificaHabilitadoEmpleado(Empleado);
                                        }
                                    }
                                    else {
                                        $("#lblMensaje").html("");
                                    }

                                    var vcMetodo = ""; var vcData = "";
                                    var CodEmp = $("#hdfCodEmpleadoNuevo").val();

                                    $.ajax({
                                        type: "POST",
                                        url: "Adm_Solicitudes.aspx/ListarDispositivos",
                                        data: "{'vcCodEmp': '" + CodEmp + "'}",
                                        contentType: "application/json; charset=utf-8",
                                        dataType: "json",
                                        success: function (result) {
                                            if ($(result.d).length > 0) {
                                                $("#ddlModeloEquipoNuevoC").empty();
                                                $("#ddlModeloEquipoBuscar").empty();
                                                var i;
                                                for (i in result.d) {
                                                    eval("var Dispositivo" + i + " = new Dispositivo();");
                                                    eval("Dispositivo" + i + "['P_vcCodIMEI'] = " + result.d[i].P_vcCodIMEI + ";");
                                                    eval("Dispositivo" + i + "['inCodModDis'] = " + result.d[i].ModeloDispositivo.P_inCod + ";");
                                                    eval("Dispositivo" + i + "['vcNomModDis'] = '" + result.d[i].ModeloDispositivo.vcNom + "';");
                                                    eval("arrDispositivo.push(Dispositivo" + i + ");");

                                                    if ($("#ddlModeloEquipoNuevoC option[value='" + result.d[i].ModeloDispositivo.P_inCod + "']").val() === undefined) {
                                                        $("#ddlModeloEquipoNuevoC").append($("<option></option>").attr("value", result.d[i].ModeloDispositivo.P_inCod).text(result.d[i].ModeloDispositivo.vcNom));
                                                        $("#ddlModeloEquipoBuscar").append($("<option></option>").attr("value", result.d[i].ModeloDispositivo.P_inCod).text(result.d[i].ModeloDispositivo.vcNom));
                                                    }
                                                }
                                            }else {
                                                $("#hdfValidacion").val("No hay equipos disponibles para esta solicitud");
                                                $("#btnBuscarEquipo").button("option", "disabled", true);
                                            }
                                        },
                                        error: function (xhr, err, thrErr) {
                                            MostrarErrorAjax(xhr, err, thrErr);
                                        }
                                    });
                                }
                                else {
                                    $("#ddlEquipo").append($("<option></option>").attr("value", "-2").text("No tiene dispostivos asignados"));
                                }
                            },
                            error: function (xhr, err, thrErr) {
                                MostrarErrorAjax(xhr, err, thrErr);
                            }
                        });
                    } else {
                        VerificaHabilitadoEmpleado(Empleado);
                        $.ajax({
                            type: "POST",
                            url: "Adm_Solicitudes.aspx/ListarLineasLibresPorSolicitud",
                            data: "{'inCodSol': '" + $("#ddlTipoSolicitud").val() + "'}",
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success: function (result) {
                                $("#lblNumeroC").html("");
                                $("#ddlNumeroC").empty();

                                if ($(result.d).length > 0) {
                                    $.each(result.d, function () {
                                        $("#ddlNumeroC").append($("<option></option>").attr("value", this.P_vcNum).text(this.P_vcNum));
                                    });
                                }
                            },
                            error: function (xhr, err, thrErr) {
                                MostrarErrorAjax(xhr, err, thrErr);
                            }
                        });

                        $.ajax({
                            type: "POST",
                            url: "Adm_Solicitudes.aspx/ListarDispositivos",
                            data: "{'vcCodEmp': '" + Empleado + "'}",
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success: function (result) {
                                if ($(result.d).length > 0) {
                                    $("#ddlModeloEquipoNuevoC").empty();
                                    $("#ddlModeloEquipoBuscar").empty();
                                    var i;
                                    for (i in result.d) {
                                        eval("var Dispositivo" + i + " = new Dispositivo();");
                                        eval("Dispositivo" + i + "['P_vcCodIMEI'] = " + result.d[i].P_vcCodIMEI + ";");
                                        eval("Dispositivo" + i + "['inCodModDis'] = " + result.d[i].ModeloDispositivo.P_inCod + ";");
                                        eval("Dispositivo" + i + "['vcNomModDis'] = '" + result.d[i].ModeloDispositivo.vcNom + "';");
                                        eval("arrDispositivo.push(Dispositivo" + i + ");");

                                        if ($("#ddlModeloEquipoNuevoC option[value='" + result.d[i].ModeloDispositivo.P_inCod + "']").val() === undefined) {
                                            $("#ddlModeloEquipoNuevoC").append($("<option></option>").attr("value", result.d[i].ModeloDispositivo.P_inCod).text(result.d[i].ModeloDispositivo.vcNom));
                                            $("#ddlModeloEquipoBuscar").append($("<option></option>").attr("value", result.d[i].ModeloDispositivo.P_inCod).text(result.d[i].ModeloDispositivo.vcNom));
                                        }
                                    }
                                }else {
                                    $("#hdfValidacion").val("No hay equipos disponibles para esta solicitud");
                                    $("#btnBuscarEquipo").button("option", "disabled", true);
                                }
                            },
                            error: function (xhr, err, thrErr) {
                                MostrarErrorAjax(xhr, err, thrErr);
                            }
                        });
                    }
                }
                else {
                    $("#ddlEquipo").append($("<option></option>").attr("value", "-1").text("Seleccione un empleado"));
                }
            }

            function VerificaHabilitadoEmpleado(Empleado) {
                $.ajax({
                    type: "POST",
                    url: "../Adm_NuevoDispositivo.aspx/VerificaLineaEmpleado",
                    data: "{'vcCodEmp': '" + Empleado + "'}",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (result) {
                        $("#btnGuardarC").button("option", "disabled", true);
                        paginaSolicitud = "";
                        $("#lblMensaje").html("");
                        if (result.d == "1") {
                            $("#lblMensaje").html("El empleado ya tiene una solicitud pendiente para adquirir un nuevo equipo");
                        }
                        else if (result.d == "2") {
                            $("#lblMensaje").html("El empleado no puede adquirir más equipos");
                        }
                        else if (result.d == "3") {
                            $("#lblMensaje").html("El empleado no está incluido en ninguna política");
                        }
                        else {
                            $("#btnGuardarC").button("option", "disabled", false);
                        }
                    },
                    error: function (xhr, err, thrErr) {
                        MostrarErrorAjax(xhr, err, thrErr);
                    }
                });
            }

            function VerificaHabilitado(Dispositivo) {
                if ($("#ddlTipoSolicitud").val() == "1") {
                    $.ajax({
                        type: "POST",
                        url: "../Adm_CambioDispositivo.aspx/VerificaLineaEmpleado",
                        data: "{'dcNumLin': '" + Dispositivo + "'," +
                              "'vcCodEmp': '" + $("#hdfCodEmpleadoNuevo").val() + "'}",
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: function (result) {
                            $("#lblMensaje").html("");
                            if (result.d == "1") {
                                $("#lblMensaje").html("Hubo un problema al verificar la línea");
                            }
                            else if (result.d == "2") {
                                $("#lblMensaje").html("Ya existe una solicitud para este equipo");
                            }
                            else if (result.d == "3") {
                                $("#lblMensaje").html("El empleado No ha cumplido el tiempo mínimo para realizar cambio de equipo");
                            }
                            else if (result.d == "4") {
                                $("#lblMensaje").html("El empleado no está incluido en ninguna política");
                            }
                            else {
                                $("#btnGuardarC").button("option", "disabled", false);
                            }
                        },
                        error: function (xhr, err, thrErr) {
                            MostrarErrorAjax(xhr, err, thrErr);
                        }
                    });
                }
                else if ($("#ddlTipoSolicitud").val() == "3") {
                    $.ajax({
                        type: "POST",
                        url: "../Adm_ReposicionDispositivo.aspx/VerificaLineaEmpleado",
                        data: "{'dcNumLin': '" + Dispositivo + "'," +
                           "'vcCodEmp': '" + $("#hdfCodEmpleado").val() + "'}",
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: function (result) {
                            $("#lblMensaje").html("");
                            if (result.d == "1") {
                                $("#lblMensaje").html("Hubo un problema al verificar la línea. Línea no corresponde al empleado.");
                            }
                            else if (result.d == "2") {
                                $("#lblMensaje").html("Ya existe una solicitud para este equipo");
                            }
                            else if (result.d == "3") {
                                $("#lblMensaje").html("El empleado no está incluido en ninguna política");
                            }
                            else {
                                $("#btnGuardarC").button("option", "disabled", false);
                            }
                        },
                        error: function (xhr, err, thrErr) {
                            MostrarErrorAjax(xhr, err, thrErr);
                        }
                    });
                }
            }

//            $("#ddlModeloEquipoNuevoC").change(function () {
//                var combo = this;
////                $('#ddlEquipoNuevoC').empty();

//                for (var i = 0; i < arrDispositivo.length; i++) {
//                    if (arrDispositivo[i]['inCodModDis'] == combo.value) {
//                        $("#ddlEquipoNuevoC").append($("<option></option>").attr("value", arrDispositivo[i]['P_vcCodIMEI']).text(arrDispositivo[i]['P_vcCodIMEI']));
//                    }
//                }
//            });
                        
            if ($("#txtEmpleadoNuevo").length > 0) {
                $("#txtEmpleadoNuevo").autocomplete({
                    minLength: 0,
                    source: function (request, response) {
                        $.ajax({
                            type: "POST",
                            url: "../../../Common/WebService/General.asmx/ListarEmpleado",
                            data: "{'maxFilas': '" + 200 + "'," +
                                    "'vcNomEmp': '" + $("#txtEmpleadoNuevo").val().replace(/'/g, "&#39") + "'," +
                                    "'incodGrup': '-1'," +
                                    "'idCliente': '" + window.parent.parent.idCliente + "'}",
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
                        $("#txtEmpleadoNuevo").val(ui.item.label);
                        return false;
                    },
                    select: function (event, ui) {
                        Selecciono = true;
                        $("#txtEmpleadoNuevo").val(ui.item.label);
                        $("#hdfCodEmpleadoNuevo").val(ui.item.vcCodEmp);
                        if ($("#ddlTipoSolicitud").val() == "6" || $("#ddlTipoSolicitud").val() == "7"){
                            LimpiarControlesCearServ();
                            CargarDispositivosConLinea(ui.item.vcCodEmp);
                            if ($("#ddlTipoSolicitud").val() == "6"){ $("#ddlTipoServicio").focus(); } else { $("#ddlServActuales").focus(); }
                        } else {
                            CargarDispositivos(ui.item.vcCodEmp);
                            $("#btnBuscarEquipo").focus();
                        }
                        $("#lblMensaje").html("");
                        return false;
                    },
                    change: function (event, ui) {
                        if (!Selecciono) {
                            $("#hdfCodEmpleadoNuevo").val("");
                            if ($("#ddlTipoSolicitud").val() == "6" || $("#ddlTipoSolicitud").val() == "7"){
                                CargarDispositivosConLinea("");
                                LimpiarControlesCearServ();
                            } else {
                                CargarDispositivos("");
                            }
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

            Modal = $("#dvCrear").dialog({
                modal: true,
                width: 360,
                title: "Crear solicitud"
            });

        }
    }

    $("#btnBuscarIMEI").click(function () {
        
        CargarGrillaEquipos(1);

        ModalBuscarEquipo = $('#dvBuscarEquipo').dialog({
            title: "Buscar Equipo",
            width: 810,
            height: 530,
            modal: true
        });
    });

    $("#btnBuscarEquipo").click(function () {

        CargarGrillaEquipos(0);

        ModalBuscarEquipo = $('#dvBuscarEquipo').dialog({
            title: "Buscar Equipo",
            width: 810,
            height: 530,
            modal: true
        });
    });
    
    function CargarGrillaEquipos(esProceso) {
        
        if (esProceso == "1"){
            $("#ddlModeloEquipoBuscar").val($("#ddlModeloEquipoNuevo").val());
        }else{
            $("#ddlModeloEquipoBuscar").val($("#ddlModeloEquipoNuevoC").val());
        }


        $("#btnElegirEquipo").click(function (event) {
            var id = $("#tbEquipo").jqGrid('getGridParam','selrow');
            if(id) {
                var equipo = $("#ddlModeloEquipoBuscar").val();
                $("#hdfImeiSel").val(id);
                $("#lblIMEIElegido").html(id);

                if (esProceso == "1"){
                    $("#ddlModeloEquipoNuevo").val(equipo);    
                }else{
                    $("#ddlModeloEquipoNuevoC").val(equipo);
                    $("#lblIMEINuevo").html(id);
                }
                    
                ModalBuscarEquipo.dialog('close');
            }else{
                alerta("Debe seleccionar un dispositivo");
            }
        });

        $("#btnCerrarBusqueda").click(function (event) {
            ModalBuscarEquipo.dialog('close');
        });

        $("#tbEquipo").jqGrid({
            datatype: "local",
            colModel: [{ name: 'P_vcCodIMEI', index: 'P_vcCodIMEI', label: 'IMEI', width: '50', align: 'center', sortable: false, resizable: false, },
   		                   { name: 'F_inCodModDis', index: 'F_inCodModDis', label: 'inCodModDis', width: '20', align: 'left', sortable: false, resizable: false, hidden: true },
   		                   { name: 'ModeloDispositivo.vcNom', index: 'ModeloDispositivo.vcNom', label: 'Modelo', width: '100', align: 'left', sortable: false, resizable: false },
   		                   { name: 'dtFecIng', index: 'dtFecIng', label: 'Fecha', align: 'left', sortable: false, resizable: false, hidden: true },
   		                   { name: 'F_inCodTipAdq', index: 'F_inCodTipAdq', label: 'inTipAdq', width: '15', align: 'center', sortable: false, resizable: false, hidden: true  },
                           { name: 'vcNum', index: 'vcNum', label: 'Tipo de Adquisición', width: '55', align: 'center', sortable: false, resizable: false }
   	                      ],
            //rowNum: 10,
            //rowList: [10, 20, 40],
            //pager: '#pEstadoMsn',
            sortname: 'Fecha',
            width: "770",
            height: "340",
            viewrecords: false,
            sortorder: "desc",
            multiselect: false,
            subGrid: true,
            subGridOptions: {
                // load the subgrid data only once
                // and the just show/hide
                "reloadOnExpand": false,
                // select the row when the expand column is clicked
                "selectOnExpand": true
            },
            subGridRowExpanded: function (subgrid_id, row_id) {
                // we pass two parameters
                // subgrid_id is a id of the div tag created whitin a table data
                // the id of this elemenet is a combination of the "sg_" + id of the row
                // the row_id is the id of the row
                // If we wan to pass additinal parameters to the url we can use
                // a method getRowData(row_id) - which returns associative array in type name-value
                // here we can easy construct the flowing
                var subgrid_table_id, pager_id;
                subgrid_table_id = subgrid_id + "_t";
                pager_id = "p_" + subgrid_table_id;
                $("#" + subgrid_id).html("<table id='" + subgrid_table_id + "' class='scroll'></table><div id='" + pager_id + "' class='scroll'></div>");
                $("#" + subgrid_table_id).jqGrid({
                    datatype: function () {
                        $.ajax({
                            url: "Adm_Solicitudes.aspx/ListarHistoricosPorDispositivo", //PageMethod
                            data: "{'vcCodIMEI': '" + row_id + "'}",
                            dataType: "json",
                            type: "post",
                            contentType: "application/json; charset=utf-8",
                            success: function (result) {
                                $("#" + subgrid_table_id).jqGrid('clearGridData');
                                var i = 0;
                                for (i = 0; i < $(result.d).length; i++) {
                                    $("#" + subgrid_table_id).jqGrid('addRowData', i, result.d[i]);
                                }

                                $("#" + subgrid_table_id).setGridHeight($(result.d).length * 23);
                            },
                            error: function (xhr, err, thrErr) {
                                MostrarErrorAjax(xhr, err, thrErr);
                            }
                        });
                    },
                    colModel: [{ name: 'P_F_vcCodDis', index: 'P_F_vcCodDis', label: 'P_F_vcCodDis', width: '40', align: 'center', sortable: false, resizable: false, hidden:true },
   		                           { name: 'P_dtFecIni', index: 'P_dtFecIni', label: 'Fecha Inicio', width: '70', align: 'left', sortable: false, resizable: false },
   		                           { name: 'dtFecFin', index: 'dtFecFin', label: 'Fecha Fin', width: '70', align: 'left', sortable: false, resizable: false },
   		                           { name: 'F_vcNumLin', index: 'F_vcNumLin', label: 'Línea', width: '40', align: 'left', sortable: false, resizable: false },
   		                           { name: 'vcNomEst', index: 'vcNomEst', label: 'Estado', width: '40', align: 'left', sortable: false, resizable: false },
   		                           { name: 'F_vcCodEmp', index: 'F_vcCodEmp', label: 'F_vcCodEmp', width: '40', align: 'right', sortable: false, resizable: false, hidden:true },
   		                           { name: 'EMPL_vcNOMEMP', index: 'EMPL_vcNOMEMP', label: 'Empleado',  width: '120', align: 'left', sortable: false, resizable: false}
   	                              ],
                    sortname: 'Fecha',
                    sortorder: "asc",
                    width: "750",
                    height: "0"
                });
                //$("#" + subgrid_table_id).jqGrid('navGrid', "#" + pager_id, { edit: false, add: false, del: false })
            },
            subGridRowColapsed: function (subgrid_id, row_id) {
                // this function is called before removing the data
                //var subgrid_table_id;
                //subgrid_table_id = subgrid_id+"_t";
                //jQuery("#"+subgrid_table_id).remove();
            },
            ondblClickRow: function (id) {
                AbrirRegistro(id);
            }
        });

        //$("#tbDetalleConsultaCriterio").jqGrid('navGrid', '#pEstadoMsn', { add: false, edit: false, del: false });

        $("#tbEquipo").jqGrid('bindKeys', { "onEnter": function (id) { AbrirRegistro(id); },
            "onSpace": function (id) { AbrirRegistro(id); }
        });

        function AbrirRegistro(id) {
            $("#tbEquipo").toggleSubGridRow(id);
        }

        $(window).resize(function (x) {
            $("#tbEquipo").setGridWidth($(window).width());
            $("#tbEquipo").setGridHeight($(window).height());
        });

        CargarOrganizacionDetalle();

        function CargarOrganizacionDetalle() {
            $.ajax({
                type: "POST",
                url: "Adm_Solicitudes.aspx/ListarEquiposPorFiltro",
                data: "{'vcCodEmp': '" + $("#hdfCodEmpleadoNuevo").val() + "'," +
                        "'inCodModDis': '" + $("#ddlModeloEquipoBuscar").val() + "'," + 
                        "'vcFecIni': '" + '' + "'," +
                        "'vcFecFin': '" + '' + "'," +
                        "'inTipAdq': '" + $("#ddlTipoAdquisicion").val() + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {
                    $("#tbEquipo").jqGrid('clearGridData');
                    var i = 0;
                    for (i = 0; i < $(result.d).length; i++) {
                        $("#tbEquipo").jqGrid('addRowData', result.d[i].P_vcCodIMEI, result.d[i]);
                    }

                    if ($(result.d).length > 0) {
                        $("#ContentPlaceHolder1_UTSum__ctl1_lblError").hide();
                        $("#ContentPlaceHolder1_UTSum__ctl1_pnDet").show();
                    }
                    else {
                        $("#ContentPlaceHolder1_UTSum__ctl1_lblError").show();
                        $("#ContentPlaceHolder1_UTSum__ctl1_pnDet").hide();
                    }
                },
                error: function (xhr, err, thrErr) {
                    MostrarErrorAjax(xhr, err, thrErr);
                }
            });
        }

        $("#ddlModeloEquipoBuscar,#ddlTipoAdquisicion").change(function () {
            CargarOrganizacionDetalle();
        });
    }

    //INICIO CREAR SOLICITUD SERVICIO
    $("#ddlTipoServicio").append($("<option></option>").attr("value", -2).text("Sin datos"));
    $("#ddlServicio").append($("<option></option>").attr("value", -2).text("Sin datos"));
    $("#ddlServActuales").append($("<option></option>").attr("value", -2).text("Sin datos"));
    $("#ddlServActuales").change(function () { $("#txtCatnidadSolicitada").focus(); });
    $("#txtCatnidadSolicitada").keypress(ValidarSoloNumero);
    //$("#btnEnviar").button("option", "disabled", false);
    $('#ddlTipoServicio').change(function () {
        if ($(this).val() == '-1') {
            $("#lblValorCatnidad").text('');
        }
        if ($(this).val() == '16') {
            $("#lblValorCatnidad").text(' (min)');
        }
        if ($(this).val() == '17') {
            $("#lblValorCatnidad").text(' (KB)');
        }
        if ($(this).val() == '18') {
            $("#lblValorCatnidad").text(' (msj)');
        }
        listarServicios($("#hdfCodCuenta").val(), $("#ddlEquipo").val(), $(this).val());
        $('#ddlServicio').focus();
    });
    $('#rbtNoEnvidas').change(function () {
        obtenerSolicitudes();
        if ($("#rbtNoEnvidas").is(':checked') || $("#rbtElegir").is(':checked')){
            //$("#btnEnviar").button("option", "disabled", false);
        }
    });
    $('#rbtElegir').change(function () {
        obtenerSolicitudes();
        if ($("#rbtNoEnvidas").is(':checked') || $("#rbtElegir").is(':checked')){
            //$("#btnEnviar").button("option", "disabled", false);
        }
    });
    $('#ddlServicio').change(function () { $("#txtCatnidadSolicitada").focus(); });
    $('#chkIlimitado').click(function () {
        if ($('#chkIlimitado').is(':checked')) {
            $("#txtCatnidadSolicitada").hide(100);
            $("#txtMotivoActivacion").focus();
        } else {
            $("#txtCatnidadSolicitada").show(100);
            $("#txtCatnidadSolicitada").focus();
        }
    });

    $('#chkPermanente').click(function () {
        if ($('#chkPermanente').is(':checked')) {
            $("#txtFechaFinal").hide(100);
        } else {
            $("#txtFechaFinal").show(100);
        }
    });
    
    $("#txtFechaInicial").datepicker('option', { onClose: function (selectedDate) {
        if (selectedDate != '') {
            $("#txtFechaFinal").datepicker('option', 'minDate', selectedDate);
        } else {
            $("#txtFechaFinal").datepicker('option', 'minDate', new Date());
        }
    }
    });
    $("#txtFechaFinal").datepicker('option', { onClose: function (selectedDate) {
        $("#txtFechaInicial").datepicker('option', 'maxDate', selectedDate);
    }
    });
    //FIN CREAR SOICITUD SERVICIO

    //MOSTRAR ARCHIVOS ADJUNTOS
    $("#btnAdjuntos").click(function() {
        DialogAdj = $("#dvAdjuntos").dialog({
            modal: true,
            //width: 360,
            title: "Archivos Adjutnos"
            //buttons: [{
            //    text: "Cerrar",
            //    click: function() { $( this ).dialog( "close" );}
            //    }]
        });
    });
    
    $("#btnCerrarAdjuntos").click(function (event) {
        DialogAdj.dialog('close');
    });

    function ListarAdjuntos() {
        if (adj.length != 0) { 
            $("#btnAdjuntos").show();
            var i = 0;
            for (i = 0; i <adj.length; i++) {
                var dataadj = adj[i].vcNomAdj.toString();
                var ardatosadj = [];
                ardatosadj = dataadj.split('--');
                var nombre = ardatosadj[2];
                var tamano = ardatosadj[1];
                //alert('nombre: ' + nombre + ' tamaño: ' + tamaño);
                $("#PnlAdjuntos").append('<div id="'+ adj[i].P_inIdAdj + '" class="adjunto">' + nombre + ' (' + tamano + ')</div>');
            }
            $('.adjunto').button();
            $('.adjunto').click(function(){ DescargarAdjunto(this);});
        } else {
            $("#btnAdjuntos").hide(); 
        }
    }
});
//FIN DE DOCUMENT READY


function cargarDatosInicio() {

    $("#chkEst-6").attr('checked', 'true');
    $("#lblEst-6").addClass("ui-state-active");


    switch ($("#hdf_nom").val()) {

        case "pnlCantidadCambio":
        $("#chkTip-1").attr('checked', 'true');
        $("#lblTip-1").addClass("ui-state-active");
        break;

    case "pnlCantidadNuevo":
        $("#chkTip-2").attr('checked', 'true');
        $("#lblTip-2").addClass("ui-state-active");
        break;

    case "pnlCantidadReposicion":
        $("#chkTip-3").attr('checked', 'true');
        $("#lblTip-3").addClass("ui-state-active");
        break;

    default:
        $("#chkTip-4").attr('checked', 'true');
        $("#lblTip-4").addClass("ui-state-active");
        break;

}

obtenerSolicitudes(6);
}

function obtenerTipos() {

    $.ajax({
        type: "POST",
        url: "Adm_Solicitudes.aspx/ListarTipos",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
            $(msg.d).each(function (index, el) {

                $('#btnTipos').append('<input class="chkVista"  type="checkbox" id="chkTip-' + el.inCod + '" /><label id="lblTip-' + el.inCod + '" for="chkTip-' + el.inCod + '">' + el.vcNom + '</label>');
                

            });
            //$("#btnTipos").buttonset();
            obtnerEstados();
        },
        error: function (xhr, err) {
            $("#dvCargando").hide();
            alerta("Error, Estado: " + xhr.readyState + "\nEstado: " + xhr.status);
        }
    });

}

function obtnerEstados(cod) {

    $.ajax({
        type: "POST",
        url: "Adm_Solicitudes.aspx/ListarEstados",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {

            $(msg.d).each(function (index, el) {
//                if (el.inCod == 6){
//                    $('#btnEstados').append('<input class="chkVista" checked="checked" type="checkbox" id="chkEst-' + el.inCod + '" /><label id="lblEst-' + el.inCod + '" for="chkEst-' + el.inCod + '">' + el.vcNom + '</label>')
//                }else{
                    $('#btnEstados').append('<input class="chkVista" type="checkbox" id="chkEst-' + el.inCod + '" /><label id="lblEst-' + el.inCod + '" for="chkEst-' + el.inCod + '">' + el.vcNom + '</label>');
//                }
                
            });
            //$("#btnEstados").buttonset();
            $(".chkVista").click(function () { obtenerSolicitudes(); });

            if ($("#hdf_nom").val() != "") {
                cargarDatosInicio();
            }
        },
        error: function (xhr, err) {
            $("#dvCargando").hide();
            alerta("Error, Estado: " + xhr.readyState + "\nEstado: " + xhr.status);
        }
    });
}

function mostrarTipos() {
    $("#btnEstados").fadeOut(function () {
        $("#btnTipos").fadeIn();
    });    
}

function mostrarEstados() {
    $("#btnTipos").fadeOut(function () {
        $("#btnEstados").fadeIn();
    });
}

function agregarEstilosSolicitudes() {
    $(".soli").addClass("ui-state-default");

    $(".soli").css("color", "black");

    $(".soli").hover(function () {
        $(".soli").removeClass("ui-state-hover");
        $(this).addClass("ui-state-hover");
        $(this).css("width", "99%");
        $(this).css("height", "7.3em");
    });

    $(".soli").click(function () {
        var id = $(this).attr("id").split("-");
        if (!$("#rbtElegir").is(':checked')){
            $(".soli").removeClass("ui-state-active");
            $(this).addClass("ui-state-active");
        } else {
            
            if (!$("#chk-" + id[1]).is(':checked')) {
                $("#chk-" + id[1]).attr('checked',true);
                $(this).addClass("ui-state-active");
            } else {
                $("#chk-" + id[1]).attr('checked',false);
                $(this).removeClass("ui-state-active");
            }
        }
        
    });

    $(".soli").mouseleave(function () {
        $(this).removeClass("ui-state-hover");
        $(this).css("width", "97%");
        $(this).css("height", "5.2em");
    });
        
    $(".SoliEst").css("color","blue");
}

function agregarEstilosDetalle() {
    $(".detalle").addClass("ui-state-hover");
    $(".detalle").css("font-weight", "normal");
    $(".detalle").addClass("detalle");
    $(".detalle").css("font-size", "11px");
    $(".detalle").css("color", "black");
    $(".detalle").css("word-wrap", "break-word");
    
}




function obtenerSolicitudes() { 
    arCodSolServ = []; //array de solicitudes seleccionadas para enviar
    var estados = '';
    var tipos = '';
    var add = false;
    $("#btnEstados input").each(function (index) {
        var id = $(this).attr("id").split("-");
        if ($(this).is(':checked')) estados = estados + id[1].toString() + ",";
    });

    $("#btnTipos input").each(function (index) {
        var id = $(this).attr("id").split("-");
        if ($(this).is(':checked')) tipos = tipos + id[1].toString() + ",";
    });
    //agregado 13-09-2013
    var arTipos = [];
    arTipos = tipos.split(",",tipos.length/2);
    if ((arTipos.length == 2 && arTipos[0] == 6 && arTipos[1] == 7) || (arTipos.length == 1 && (arTipos[0] == 6 || arTipos[0] == 7))) {
        $("#rbtNoEnvidas").attr('disabled',false);
        $("#rbtElegir").attr('disabled',false);
        $("#btnEnviar").show(100);
        //if (!$("#rbtElegir").is(':checked') && !$("#btnEnviar").is(':checked')) {
        //    $("#btnEnviar").button("option", "disabled", true);alerta("000000");
        //} else {
        //    $("#btnEnviar").button("option", "disabled", false);alerta("111111");
        //};
        add = true;
    } else {
        $("#rbtNoEnvidas").attr('disabled',true).attr('checked',false);
        $("#rbtElegir").attr('disabled',true).attr('checked',false);
        $("#btnEnviar").hide(100);
    }
    //fin agregado 13-09-2013
    if (estados == "" && tipos == "") {
//        $('#solis').hide(300, function () {
//            $('#solis').empty();
//            return;
//        });
        tipos = '-1';
        estados = '6';
        $.ajax({
            type: "POST",
            url: "Adm_Solicitudes.aspx/ListarPorTiposPorEstados",
            data: "{'prCodEstados': '" + estados + "'," +
                  "'prCodTipos': '" + tipos + "'," +
                  "'prCamBus': '" + $("#ddlSoli").val() + "'," +
                  "'prBus': '" + $.trim($("#txtDatoSoli").val()) + "'," +
                  "'vcCodEmp': '" + $("#hdfEmpleado").val() + "'," +
                  "'inAdm': '" + $("#hdfAdmin").val() +  "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (msg) {
                $("#PnlDetSoli").hide(0);
                $('#solis').hide(0, function () {
                    $('#solis').empty();
                    $(msg.d).each(function (index, e) {
                        var f = new Date(parseInt(e.dtFecSol.toString().slice(6, -2)));
                        var fecha = '' + f.getDate() + '/' + (1 + f.getMonth()) + '/' + f.getFullYear().toString();
                        var d = new Date(parseInt(e.dtFecSol.toString().slice(6, -2)));
                        var segundos = d.getSeconds().toString();
                        var minutos = d.getMinutes().toString();
                        var horas = d.getHours().toString();
                        segundos = segundos.length == 1 ? '0' + segundos : segundos;
                        minutos = minutos.length == 1 ? '0' + minutos : minutos;
                        horas = horas.length == 1 ? '0' + horas : horas;
                        var hora = '' + horas + ':' + minutos + ':' + segundos.toString();
                        $('#solis').append('<div id="soli-' + e.P_inCodSol.toString() + '" class="soli"><div class="SoliEst">' + e.Estado.vcNom.toString() +
                        '</div><div class="SoliNum">' + e.vcNumLin.toString() +
                        '</div><div class="SoliNom">' + e.Empleado.vcNom.toString() +
                        '</div><div class="SoliFec">' + fecha + ' ' + hora  +
                        '</div><div class="SoliDesc">' + e.vcObs.toString() +
                        '</div></div>');
                    });
                    agregarEstilosSolicitudes();
                    $(".soli").click(function () { obtenerDetalle(this); });
                    $('#solis').fadeIn();
                });


            },
            error: function (xhr, err) {
                $("#dvCargando").hide();
                alerta("Error, Estado: " + xhr.readyState + "\nEstado: " + xhr.status);
            }
        });

    }
    else {
        if (tipos != "") tipos = tipos.substr(0, tipos.length - 1);
        else tipos = '-1';


        if (estados != '') estados = estados.substr(0, estados.length - 1);
        else estados = '-1';
        
        if ($("#rbtNoEnvidas").is(':checked')){ estados = '8'; }
        //alert(estados);
        $.ajax({
            type: "POST",
            url: "Adm_Solicitudes.aspx/ListarPorTiposPorEstados",
            data: "{'prCodEstados': '" + estados + "'," +
                  "'prCodTipos': '" + tipos + "'," +
                  "'prCamBus': '" + $("#ddlSoli").val() + "'," +
                  "'prBus': '" + $.trim($("#txtDatoSoli").val()) + "'," +
                  "'vcCodEmp': '" + $("#hdfEmpleado").val() + "'," +
                  "'inAdm': '" + $("#hdfAdmin").val() +  "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (msg) {
                $("#PnlDetSoli").hide(0);
                $('#solis').hide(0, function () {
                    $('#solis').empty();

                    $(msg.d).each(function (index, e) {

                    var f = new Date(parseInt(e.dtFecSol.toString().slice(6, -2)));
                    var fecha = '' + f.getDate() + '/' + (1 + f.getMonth()) + '/' + f.getFullYear().toString();

                    var d = new Date(parseInt(e.dtFecSol.toString().slice(6, -2)));
                    var segundos = d.getSeconds().toString();
                    var minutos = d.getMinutes().toString();
                    var horas = d.getHours().toString();
                    segundos = segundos.length == 1 ? '0' + segundos : segundos;
                    minutos = minutos.length == 1 ? '0' + minutos : minutos;
                    horas = horas.length == 1 ? '0' + horas : horas;
                    var hora = '' + horas + ':' + minutos + ':' + segundos.toString();
                    var env = 'No enviado';
                    if (e.btEnv){ env = 'Enviado';}
                    if (add && $("#rbtElegir").is(':checked')){
                        $('#solis').append('<div id="soli-' + e.P_inCodSol.toString() + '" class="soli"><div class="SoliEst">' + e.Estado.vcNom.toString() +
                        '</div><div class="SoliNum">' + e.vcNumLin.toString() +
                        '</div><div class="SoliNom">' + e.Empleado.vcNom.toString() +
                        '</div><div class="SoliFec">' + fecha + ' ' + hora  +
                        '</div><div class="SoliDesc">' + e.vcObs.toString() +
                        '<table><tr><td><input type="checkbox" id="chk-' + e.P_inCodSol.toString() + '" /></td><td>'+
                        '<div class="SoliEnv">' + env +
                        //'<span class="ui-button-icon-primary ui-icon ui-icon-mail-closed"></span>'+
                        '</div></td></tr></table>'+
                        '</div></div>');
                    } else {
                        $('#solis').append('<div id="soli-' + e.P_inCodSol.toString() + '" class="soli"><div class="SoliEst">' + e.Estado.vcNom.toString() +
                        '</div><div class="SoliNum">' + e.vcNumLin.toString() +
                        '</div><div class="SoliNom">' + e.Empleado.vcNom.toString() +
                        '</div><div class="SoliFec">' + fecha + ' ' + hora  +
                        '</div><div class="SoliDesc">' + e.vcObs.toString() +
                        '</div></div>');
                    }
                    });
                    agregarEstilosSolicitudes();
                    $(".soli").click(function () { obtenerDetalle(this); });
                    $('#solis').fadeIn();
                });


            },
            error: function (xhr, err) {
                $("#dvCargando").hide();
                alerta("Error, Estado: " + xhr.readyState + "\nEstado: " + xhr.status);
            }
        });
    }
}

function obtenerDetalle(a) {
    var id = $(a).attr("id").split("-");

    $.ajax({
        type: "POST",
        url: "Adm_Solicitudes.aspx/ListarPorIds",
        data: "{'prCodIds': '" + id[1].toString() + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
            $('#PnlDetSoli').hide(0,function () {
                $('#PnlDetalles').empty();
                LimpiartxtDetalle();
                var obj = msg.d;
                var det = obj[0].Detalle;
                $("#txtEmpleado").val(obj[0].Empleado.vcNom + " (" + obj[0].Empleado.P_vcCod + ")");
                $("#txtEstado").val(obj[0].Estado.vcNom);
                $("#txtNumero").val(obj[0].vcNumLin);
                $("#txtDispAnt").val(obj[0].DispositivoAnterior.ModeloDispositivo.vcNom);
                $("#txtTipo").val(obj[0].vcTipSol);
                $("#txtDispNuevo").val(obj[0].DispositivoNuevo.ModeloDispositivo.vcNom);
                
                $("#hdfIdSolicitud").val(obj[0].P_inCodSol);
                $("#hdfCodEmpleado").val(obj[0].Empleado.P_vcCod);
                $("#hdfCodModeloDis").val(obj[0].inCodModDis);
                $("#hdfCodEstado").val(obj[0].Estado.P_inCod);
                $("#hdfCodTipo").val(obj[0].inTipSol);
                $("#hdfImeiAnt").val(obj[0].DispositivoAnterior.P_vcCodIMEI);
                $("#hdfImeiNue").val(obj[0].DispositivoNuevo.P_vcCodIMEI);
                
                //campos solicitud servicio
                $("#hdfEnvio").val(obj[0].btEnv);
                //alert($("#hdfCodTipo").val() + " - " + $("#hdfEnvio").val()); //eliminar
                $("#hdfCodDatSol").val(obj[0].vcDatSol);
                $("#txtServSolicitado").val(obj[0].vcNomDatSol);
                if (obj[0].inCantSol == 0) {
                    $("#txtCantidadSolicitada").val('Ilimitado');
                } else {
                    $("#txtCantidadSolicitada").val(obj[0].inCantSol);
                }
                $("#hdfMotivo").val(obj[0].vcObs);
                if ($("#hdfCodTipo").val() == "6") {
                    var fecini = new Date(parseInt(obj[0].daFecIni.toString().slice(6, -2)));
                    var fechaini = '' + fecini.getDate() + '/' + (1 + fecini.getMonth()) + '/' + fecini.getFullYear().toString();
                    var fecfin = new Date(parseInt(obj[0].daFecFin.toString().slice(6, -2)));
                    var fechafin = '' + fecfin.getDate() + '/' + (1 + fecfin.getMonth()) + '/' + fecfin.getFullYear().toString();
                    $("#hdfFecIni").val(fechaini);
                    $("#hdfFecFin").val(fechafin);
                }

                if ($("#hdfCodTipo").val() == "6" || $("#hdfCodTipo").val() == "7"){
                    $("#txtDispNuevo").hide();
                    $("#txtDispAnt").hide();
                    $("#txtServSolicitado").show();
                    $("#txtCantidadSolicitada").show();
                    $("#lblDispAnt").text('Servicio:');
                    $("#lblDispNuevo").text('Cantidad:');
                    //txtDispNuevo
                } else if ($("#hdfCodTipo").val() == "4"){
                    $("#txtDispNuevo").show();
                    //$("#txtDispAnt").show();
                    $("#txtServSolicitado").hide();
                    $("#txtCantidadSolicitada").hide();
                    //$("#lblDispAnt").text('Disp Ant:');

                    $("#lblDispNuevo").html("Dispositivo:");
                    $("#txtDispAnt").hide();
                    $("#lblDispAnt").hide();
                } else{
                    $("#txtDispNuevo").show();
                    //$("#txtDispAnt").show();
                    $("#txtServSolicitado").hide();
                    $("#txtCantidadSolicitada").hide();
                    
                    if(obj[0].inTipSol == "2"){
                        $("#lblDispAnt").html("Disp Soli:");
                        $("#lblDispNuevo").html("Disp Asig:");                        
                        $("#lbltdModelo").html("Modelo Solicitado");
                        $("#lblIMEIEquipoAntCab").html("IMEI Solicitado");
                        $("#lblModeloEquipoNuevoCab").html("Modelo a Asignar");
                        $("#lblIMEIEquipoNueCab").html("IMEI a Asignar");
                    }
                    else{
                        $("#lblDispAnt").html("Disp Ant:");
                        $("#lblDispNuevo").html("Disp Nuevo:");
                        $("#lbltdModelo").html("Modelo de equipo anterior");
                        $("#lblIMEIEquipoAntCab").html("IMEI Equipo anterior");
                        $("#lblModeloEquipoNuevoCab").html("Modelo de equipo nuevo");
                        $("#lblIMEIEquipoNueCab").html("IMEI Equipo nuevo");
                    }
                    $("#txtDispAnt").show();
                    $("#lblDispAnt").show();
                }

                $("#PnlDetalles").empty();
                var i = 0;
                for (i = 0; i < det.length; i++) {
                    var fechaDet;
                    var detdia = det[i].Fecha.substring(6,8);
                    var detmes = det[i].Fecha.substring(4,6);
                    var detanio = det[i].Fecha.substring(0,4);
                    fechaDet = detdia + '/' + detmes + '/' + detanio;
                    $("#PnlDetalles").append('<div class="detalle"><b>' + det[i].RegistradoPor + ' (' + fechaDet + ' - ' + det[i].hora + ') dice:</b> ' + det[i].Detalle + '</div>');

                }
                agregarEstilosDetalle();
                
                //ARCHIVOS ADJUNTOS DE SOLICITUD
                adj = '';
                $("#PnlAdjuntos").empty();
                adj = obj[0].ArchivosAdjuntos;
                //if (adj.length != 0) { $("#btnAdjuntos").show(); } else { $("#btnAdjuntos").hide(); };
                if (adj.length != 0) { 
                    $("#btnAdjuntos").show();
                    var i = 0;
                    for (i = 0; i <adj.length; i++) {
                        var dataadj = adj[i].vcNomAdj.toString();
                        var ardatosadj = [];
                        ardatosadj = dataadj.split('--');
                        var nombre = ardatosadj[2];
                        var tamano = ardatosadj[1];
                        //alert('nombre: ' + nombre + ' tamaño: ' + tamaño);
                        $("#PnlAdjuntos").append('<div id="'+ adj[i].P_inIdAdj + '" class="adjunto">' + nombre + ' (' + tamano + ')</div>');
                    }
                    $('.adjunto').button();
                    $('.adjunto').click(function(){ DescargarAdjunto(this); });
                } else {
                    $("#btnAdjuntos").hide(); 
                }
                
                
                if (obj[0].Estado.P_inCod != 8 && $("#rbtElegir").is(':checked')) {
                    alerta("Solo puede elegir las solicitudes En proceso");
                    $("#chk-" + obj[0].P_inCodSol).attr('checked',false);
                    $("#soli-" + obj[0].P_inCodSol).removeClass("ui-state-active");
                } else if ($("#rbtElegir").is(':checked')){
                    if ($("#chk-" + obj[0].P_inCodSol).is(':checked')) {
                        arCodSolServ.push(obj[0].P_inCodSol);
                    } else {
                        arCodSolServ = jQuery.grep(arCodSolServ, function(value) {
                                return value != obj[0].P_inCodSol;
                            });
                    }
                }
                

                $('#PnlDetSoli').fadeIn(function () {
                    $("#PnlDetalles").scrollTop(1000000);
                });
                
            });
        },
        error: function (xhr, err) {
            $("#dvCargando").hide();
            alerta("Error, Estado: " + xhr.readyState + "\nEstado: " + xhr.status);
        }
    });
}


function LimpiartxtDetalle() {
    $("#txtEmpleado").val("");
    $("#txtEstado").val("");
    $("#txtNumero").val("");
    $("#txtDispAnt").val("");
    $("#txtTipo").val("");
    $("#txtDispNuevo").val("");
}


function ingresarDetalle(vcObs) {
        
    var a = $("#solis").find(".ui-state-active");
    var id;
    if (a.length != 0) {
        id = a.attr("id").split("-");
    }
    else {
        alerta("seleccione una solicitud");
        return;
    }
    
    if ( $.trim(vcObs) == "" ) {
        alerta("ingrese detalle");
        $("#txtDetalle").focus();
        return;
    }
    var d = new Date();
    var hor = d.getHours().toString();
    var min = d.getMinutes().toString();
    var sec = d.getSeconds().toString();
    hor = (hor < 10) ? '0' + hor : hor;
    min = (min < 10) ? '0' + min : min;
    sec = (sec < 10) ? '0' + sec : sec;
    var dia = d.getDate();
    var mes = d.getMonth() + 1;
    var anio = d.getFullYear();
    dia = (dia < 10) ? '0' + dia : dia;
    mes = (mes < 10) ? '0' + mes : mes;
    var usuario = $("#hdfNomUsuarioLogeado").val();
    var Hora = hor + ":" + min + ":" + sec;
    var Fecha = dia + '/' + mes + '/' + anio;
    //var Fecha = d.toLocaleDateString();
    var detalletck = $("#txtDetalle").val().replace(/'/g, "&#39");

    $.ajax({
        type: "POST",
        url: "Adm_Solicitudes.aspx/RegistrarDetalle",
        data: "{'prIdSolicitud': '" + id[1] +
            "', 'prDetalle': '" + vcObs +
            "', 'prEstecnico': '" + 'true' + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
            $("#dvCargando").hide();
            if (msg.d == "") {

                $("#PnlDetalles").append('<div class="detalle"><b>' + usuario + ' (' + Fecha + ' - ' + Hora + ') dice:</b> ' + detalletck + '</div>');
                $("#txtDetalle").val("");
                $("#txtObservaciones").val("");
                agregarEstilosDetalle();
                $("#PnlDetalles").scrollTop(1000000);

            }
            else {
                alerta("Revisar: " + msg.d);
            }
        },
        error: function (xhr, err) {
            $("#dvCargando").hide();
            alerta("Error, Estadow: " + xhr.readyState + "\nEstado: " + xhr.status);
        }
    });

}


function AbrirReporteAgrupadoEstado(){
    var tab1 = window.parent.tabschild[window.parent.tabPrincipal.tabs("option", "selected")].id;
    var Accord = window.parent.$("#" + tab1);    
    var tab="tbRptSolicitudAgrupadoEstado";
    var descripcion="Reporte Solicitud por Estado";
    var pagina="P_Movil/Administrar/Solicitudes/Adm_ReporteSolicitudEstado.aspx";
    
    var Id = "#" + tab;
    var $panel = Accord.find(Id);
    if (!$panel.length) {//En el caso que no exista el tab, lo crea
        var Titulo = descripcion;
        window.parent.pagina = pagina;
        Accord.tabs("add", Id, Titulo);
        window.parent.$(Id).css("width", "99%");
        window.parent.$(Id).css("height", "94%");
        window.parent.$(Id).css("margin-top", "0px");
        window.parent.$(Id).css("margin-left", "0px");
        window.parent.$(Id).css("margin-bottom", "0px");
        window.parent.$(Id).css("margin-right", "0px");
        window.parent.$(Id).css("padding-top", "0px");
        window.parent.$(Id).css("padding-left", "0px");
        window.parent.$(Id).css("padding-bottom", "0px");
        window.parent.$(Id).css("padding-right", "0px");
    }
    else { //En el caso que exista lo muestra
        Accord.tabs('select', Id);
    }
}


function obtenerSolicitudesInicio(cod) {
    var estados = '';
    var tipos = '';

        $.ajax({
            type: "POST",
            url: "Adm_Solicitudes.aspx/ListarPorTiposPorEstados",
            data: "{'prCodEstados': '" + cod + "'," +
                  "'prCodTipos': '-1'," +
                  "'prCamBus': '" + $("#ddlSoli").val() + "'," +
                  "'prBus': '" + $.trim($("#txtDatoSoli").val()) + "'," +
                  "'vcCodEmp': '" + $("#hdfEmpleado").val() + "'," +
                  "'inAdm': '" + $("#hdfAdmin").val() +  "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (msg) {
                $("#PnlDetSoli").hide(0);
                $('#solis').hide(0, function () {
                    $('#solis').empty();

                    $(msg.d).each(function (index, e) {

                    var f = new Date(parseInt(e.dtFecSol.toString().slice(6, -2)));
                    var fecha = '' + f.getDate() + '/' + (1 + f.getMonth()) + '/' + f.getFullYear().toString();

                    var d = new Date(parseInt(e.dtFecSol.toString().slice(6, -2)));
                    var segundos = d.getSeconds().toString();
                    var minutos = d.getMinutes().toString();
                    var horas = d.getHours().toString();
                    segundos = segundos.length == 1 ? '0' + segundos : segundos;
                    minutos = minutos.length == 1 ? '0' + minutos : minutos;
                    horas = horas.length == 1 ? '0' + horas : horas;
                    var hora = '' + horas + ':' + minutos + ':' + segundos.toString();

                    $('#solis').append('<div id="soli-' + e.P_inCodSol.toString() + '" class="soli"><div class="SoliEst">' + e.Estado.vcNom.toString() +
                    '</div><div class="SoliNum">' + e.vcNumLin.toString() +
                    '</div><div class="SoliNom">' + e.Empleado.vcNom.toString() +
                    '</div><div class="SoliFec">' + fecha + ' ' + hora  +
                    '</div><div class="SoliDesc">' + e.vcObs.toString() +
                    '</div></div>');
                    });
                    agregarEstilosSolicitudes();
                    $(".soli").click(function () { obtenerDetalle(this); });
                    $('#solis').fadeIn();
                });


            },
            error: function (xhr, err) {
                $("#dvCargando").hide();
                alerta("Error, Estado: " + xhr.readyState + "\nEstado: " + xhr.status);
            }
        });
}

function ActivarProcSolServicio(tsol) {
    $("#lbltdModelo").text('Modelo de equipo');
    $("#ddlNumero").hide();
    document.getElementById('IMEIEquipoAnt').style.display = 'none';
    document.getElementById('trMODEquipoNue').style.display = 'none';
    document.getElementById('trIMEIEquipoNue').style.display = 'none';
    document.getElementById('trServicioSolicitado').style.display = '';
    document.getElementById('trCantidadSolicitada').style.display = '';
    if ($("#hdfMotivo").val() != '') {
        document.getElementById('trMotivo').style.display = '';
    } else {
        document.getElementById('trMotivo').style.display = 'none';
    }
    if (tsol == 6){
        document.getElementById('trTiempoSolicitado').style.display = '';
        $("#lblMotivoSolServ").text('Motivo Activación');
    } else {
        document.getElementById('trTiempoSolicitado').style.display = 'none';
        $("#lblMotivoSolServ").text('Motivo Ampliación');
    }
    document.getElementById('tfFechaEntrega').style.display = 'none';
}
function DesactivarProcSolServicio() {
    if($("#hdfCodTipo").val()=="2")
        $("#lbltdModelo").text('Modelo Solicitado');
    else
        $("#lbltdModelo").text('Modelo de equipo anterior');
    $("#ddlNumero").show();
    document.getElementById('IMEIEquipoAnt').style.display = '';
    document.getElementById('trMODEquipoNue').style.display = '';
    document.getElementById('trIMEIEquipoNue').style.display = '';
    document.getElementById('trServicioSolicitado').style.display = 'none';
    document.getElementById('trCantidadSolicitada').style.display = 'none';
    document.getElementById('trTiempoSolicitado').style.display = 'none';

    $("#lbltdMotivo").text('Motivo de reposición');
    document.getElementById('trMotivo').style.display = 'none';
    document.getElementById('tfFechaEntrega').style.display = '';
}
function ProcesarSolicitudServicios(ts) {
    ActivarProcSolServicio(ts);
    $("#hdfValidacion").val("");
    if ($("#hdfAdmin").val() == "1") {
        var a = $("#solis").find(".ui-state-active");
        var id;
        if (a.length != 0) {
            if ($("#hdfCodEstado").val() != 6 && $("#hdfCodEstado").val() != 8) {
                alert('Solo las solicitudes en estados "Por Ejecutar" o "En Proceso" pueden ser procesadas.');
                return;
            }
            
            var CodEmp = $("#hdfCodEmpleado").val();
            var NomEmp = $("#txtEmpleado").val();
            var NumLin = $("#txtNumero").val();
            var vcModDisAnt = $("#txtDispAnt").val();
            //var IMEIDisAnt = $("#hdfImeiAnt").val();
            //var CodMotRep = 1;
            //var vcModDisNuevo = $("#txtDispNuevo").val();
            //var IMEIDisNuevo = $("#hdfImeiNue").val();
            var vcObs = "";
            var codEst = $("#hdfCodEstado").val();
            inTipSol = $("#hdfCodTipo").val();
            codSol = $("#hdfIdSolicitud").val();
            //campos servicios
            var CodServSol = $("#hdfCodDatSol").val();
            var ServSol = $("#txtServSolicitado").val();
            var CantSol = $("#txtCantidadSolicitada").val();
            var FecIni = $("#hdfFecIni").val();
            var FecFin = $("#hdfFecFin").val();
            var MotSol = $("#hdfMotivo").val();

            $("#lblCodEmpleado").html(CodEmp);
            $("#lblNomEmpleado").html(NomEmp);
            $("#lblNumCelular").html(NumLin);
            $("#lblModeloEquipoAnt").html($.trim(vcModDisAnt));
            //$("#lblIMEIEquipoAnt").html(IMEIDisAnt);
            //$("#ddlMotivoReposicion").val(CodMotRep);
            //$("#lblModeloEquipoNuevo").html(vcModDisNuevo);
            //campos servicios
            $("#lblServSolicitado").html(ServSol);
            $("#lblCantidadSolicitada").html(CantSol);
            $("#txtMotivoSolServ").val(MotSol);
            //$("#lblTiempoSolicitado").html(FecIni + " - " + FecFin);
            if (FecFin.toString() == '1/1/1'){
                $("#lblTiempoSolicitado").html('(Permanente) Desde: ' + FecIni);
            } else {
                $("#lblTiempoSolicitado").html('(Temporal) Desde: ' + FecIni + ' Hasta: ' + FecFin);
            }
        
            Modal = $("#dvAprobacion").dialog({
                modal: true,
                width: 360,
                title: "Procesar solicitud"
            });
        }
        else {
            alerta("Seleccione un registro");
        }
    }
    else{
        alerta("Usted no es un usuario administrador, No podra realizar esta acción");
    }
}

function ActivarCrearSolServicio() {
    document.getElementById('trCModEquipoNuevo').style.display = 'none';
    document.getElementById('trCIMEIEquipoNuevo').style.display = 'none';
    document.getElementById("trFechaEntrega").style.display = 'none';
    if($("#ddlTipoSolicitud").val() == "6"){
        document.getElementById("trTipoServicio").style.display = '';
        document.getElementById("trServicio").style.display = '';
        document.getElementById("trServiciosActuales").style.display = 'none';
        document.getElementById("trTiempoActivacion").style.display = '';
    } else if ($("#ddlTipoSolicitud").val() =="7"){
        document.getElementById("trTipoServicio").style.display = 'none';
        document.getElementById("trServicio").style.display = 'none';
        document.getElementById("trServiciosActuales").style.display = '';
        document.getElementById("trTiempoActivacion").style.display = 'none';
    }
    //document.getElementById("trIlimitado").style.display = '';
    document.getElementById("trCantidad").style.display = '';
    document.getElementById("trMotivoActivacion").style.display = '';
    //document.getElementById("trFechaInicial").style.display = '';
    //document.getElementById("trFechaFinal").style.display = '';
    $("#ddlNumeroC").hide();
    $("#lblNumeroC").show();
    $("#lblEquipo").show();
    $("#ddlEquipo").show();
}

function DesactivarCrearSolServicio() {
    document.getElementById('trCModEquipoNuevo').style.display = '';
    document.getElementById('trCIMEIEquipoNuevo').style.display = '';
    document.getElementById("trFechaEntrega").style.display = '';
    document.getElementById("trTipoServicio").style.display = 'none';
    document.getElementById("trServicio").style.display = 'none';
    //document.getElementById("trIlimitado").style.display = 'none';
    document.getElementById("trCantidad").style.display = 'none';
    document.getElementById("trMotivoActivacion").style.display = 'none';
    document.getElementById("trTiempoActivacion").style.display = 'none';
    //document.getElementById("trFechaInicial").style.display = 'none';
    //document.getElementById("trFechaFinal").style.display = 'none';
    $("#ddlNumeroC").show();
    $("#lblNumeroC").hide();
    $("#lblEquipo").hide();
    $("#ddlEquipo").hide();
}

function CargarDispositivosConLinea(Empleado) {
    $("#ddlEquipo").html("");
    //$("#ifDetalleDispositivo").attr("src", "");
    //document.getElementById('divTabs').style.display = '';
    if (Empleado != "") {
        //$($('#tbModelos > ul a')[1]).text("Equipo a Adquirir");
        $.ajax({
            type: "POST",
            url: "../Adm_SolicitudActivacionServicio.aspx/ListarDispositivosConLinea",
            data: "{'vcCodEmp': '" + Empleado + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                if ($(result.d).length > 0) {
                    $("#ddlEquipo").append($("<option></option>").attr("value", "-1").text("Seleccione un dispositivo"));
                    //var itemsDispositivos = [{ text: 'Seleccione un dispositivo', value: -1}];
                    var i;
                    for (i in result.d) {
                        $("#ddlEquipo").append($("<option></option>").attr("value", result.d[i].vcNum).text(result.d[i].ModeloDispositivo.vcNom));
                        //itemsDispositivos.push({ text: result.d[i].ModeloDispositivo.vcNom.toString(), value: result.d[i].vcNum.toString() });
                        $("#hdfCodCuenta").val(result.d[i].F_vcCodEmp);
                    }
                    //alert(itemsDispositivos.length);
                    //var dataSourceDisp = new kendo.data.DataSource({ data: itemsDispositivos });
                    //$("#ddlDispositivo").data("kendoComboBox").setDataSource(dataSourceDisp);
                    $('#ddlEquipo').val(result.d[0].vcNum);
                    $("#lblNumeroC").html(result.d[0].vcNum);
                    //$("#ddlDispositivo").data("kendoComboBox").select(0);
                    if ($("#ddlEquipo").val() != "-1") {
                        var name = $("#ddlEquipo option:selected").text();
                        var IMEI = name.substr(0, name.indexOf('-') - 1);
                        //alert(IMEI);
                        //$("#ifDetalleDispositivo").attr("src", "Mantenimiento/Mnt_DetalleDispositivoServicio.aspx?CodDis=" + IMEI);
                        //MostrarFilasNuevoServ(1);
                        if ($("#ddlTipoSolicitud").val() == "6"){
                            listarTipoServicio($("#hdfCodCuenta").val(), $("#ddlEquipo").val());
                        } else if ($("#ddlTipoSolicitud").val() == "7"){
                            listarServicioActuales(result.d[0].vcNum);
                        }
                    }
                    else {
                        //$("#ifDetalleDispositivo").attr("src", "");
                        //document.getElementById('divTabs').style.display = 'none';
                        //MostrarFilasNuevoServ(0);
                        //$("#btnSolicitar").button("option", "disabled", true);
                    }
                }
                else {
                    $("#ddlEquipo").append($("<option></option>").attr("value", "-2").text("No tiene dispostivos con línea asignados"));
                    //$("#ifDetalleDispositivo").attr("src", '');
                    //document.getElementById('divTabs').style.display = 'none';
                    //MostrarFilasNuevoServ(0);
                    //$("#btnSolicitar").button("option", "disabled", true);
                    //$("#ddlDispositivo").data("kendoComboBox").setDataSource({ text: 'No tiene dispostivos con linea asignados', value: '-2' });
                }
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            }
        });
    }
    else {
        $("#ddlEquipo").append($("<option></option>").attr("value", "-1").text("Seleccione un empleado"));
        //$("#ddlDispositivo").data("kendoComboBox").setDataSource({ text: 'Seleccione un empleado', value: '-1' });
    }
}

function listarTipoServicio(codcue, codlin) {
    $.ajax({
        type: "POST",
        url: "../Adm_SolicitudActivacionServicio.aspx/ListarServiciosTipoNoUsados",
        data: "{'CodCue': '" + codcue + "','CodLin':'" + codlin + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            lstServicioTipo = result.d;
            $("#ddlServicio").html("");
            $("#ddlTipoServicio").html("");
            if ($(lstServicioTipo).length > 0) {
                $("#ddlServicio").append($("<option></option>").attr("value", -1).text("<Seleccionar>"));
                $("#ddlTipoServicio").append($("<option></option>").attr("value", -1).text("<Seleccionar>"));
                $(lstServicioTipo).each(function () {
                    $("#ddlTipoServicio").append($("<option></option>").attr("value", this.P_inCod).text(this.vcNom));
                });
                if ($("option", "#ddlServicio").length == 1) {
                    $("#ddlServicio").html("");
                    $("#ddlServicio").append($("<option></option>").attr("value", -2).text("Sin datos"));
                }
            } else {
                $("#ddlServicio").append($("<option></option>").attr("value", -2).text("Sin datos"));
                $("#ddlTipoServicio").append($("<option></option>").attr("value", -2).text("Sin datos"));
            }
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
}

function listarServicios(CodCue, CodLin, CodTipServ) {
    $.ajax({
        type: "POST",
        url: "../Adm_SolicitudActivacionServicio.aspx/ListarServicios_NoUsados",
        data: "{'CodCue': '" + CodCue + "','CodLin':'" + CodLin + "','CodTipServ':'" + CodTipServ + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            lstServicio = result.d;
            $("#ddlServicio").html("");
            //$("#ddlTipoServicio").html("");
            if ($(lstServicio).length > 0) {
                $("#ddlServicio").append($("<option></option>").attr("value", -1).text("<Todos>"));
                //$("#ddlTipoServicio").append($("<option></option>").attr("value", -1).text("<Seleccionar>"));
                $(lstServicio).each(function () {
                    $("#ddlServicio").append($("<option></option>").attr("value", this.P_inCod).text(this.vcNom));
                });
                if ($("option", "#ddlServicio").length == 1) {
                    $("#ddlServicio").html("");
                    $("#ddlServicio").append($("<option></option>").attr("value", -2).text("Sin datos"));
                }
            } else {
                $("#ddlServicio").append($("<option></option>").attr("value", -2).text("Sin datos"));
                //$("#ddlTipoServicio").append($("<option></option>").attr("value", -2).text("Sin datos"));
            }
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
}

function listarServicioActuales(vcNum){
    $.ajax({
        type: "POST",
        url: "Adm_Solicitudes.aspx/ListarServiciosActuales",
        data: "{'vcNum': '" + vcNum + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            lstServicioAct = result.d;
            $("#ddlServActuales").html("");
            if ($(lstServicioAct).length > 0) {
                $("#ddlServActuales").append($("<option></option>").attr("value", -1).text("<Seleccionar>"));
                $(lstServicioAct).each(function () {
                    if (this.dcCan != "0"){
                        $("#ddlServActuales").append($("<option></option>").attr("value", this.P_inCod).text(this.vcNom + ' - (' + this.dcCan + ')'));
                    }
                });
                if ($("#ddlServActuales option").length == 1){
                    $("#ddlServActuales").append($("<option></option>").attr("value", -2).text("Servicios actuales son Ilimitados"));
                }
            } else {
                $("#ddlServActuales").append($("<option></option>").attr("value", -2).text("Sin datos"));
            }
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
}

function AbrirReporteSolicitudServicio(){
    var tab1 = window.parent.tabschild[window.parent.tabPrincipal.tabs("option", "selected")].id;
    var Accord = window.parent.$("#" + tab1);    
    var tab="tbRptSolicitudServicio";
    var descripcion="Reporte Solicitud Servicio";
    var repenv;
    var arCods;
    if(!$("#rbtNoEnvidas").is(':checked') && !$("#rbtElegir").is(':checked')) { alerta("Eliga un metodo de selección"); return;}
    if($("#rbtNoEnvidas").is(':checked')){ repenv = 0; } else { repenv = ''; }
    if($("#rbtElegir").is(':checked')){ 
        if (arCodSolServ.length == 0) { alerta("Seleccione al menos una solicitud"); return;}
        arCods = arCodSolServ.join(',');
    } else { arCods = ''; }
    var TipSol = '';
    if ($("#chkTip-6").is(':checked')) { TipSol = '6';}
    if ($("#chkTip-7").is(':checked')) { TipSol = '7';}
    if ($("#chkTip-6").is(':checked') && $("#chkTip-7").is(':checked')) { TipSol = '';}
    var pagina="P_Movil/Administrar/Solicitudes/Adm_ReporteSolicitudServicio.aspx?repenv=" + repenv + "&arcod=" + arCods + "&tipsol=" + TipSol;
    var Id = "#" + tab;
    var $panel = Accord.find(Id);
    if (!$panel.length) {//En el caso que no exista el tab, lo crea
        var Titulo = descripcion;
        window.parent.pagina = pagina;
        Accord.tabs("add", Id, Titulo);
        window.parent.$(Id).css("width", "99%");
        window.parent.$(Id).css("height", "94%");
        window.parent.$(Id).css("margin-top", "0px");
        window.parent.$(Id).css("margin-left", "0px");
        window.parent.$(Id).css("margin-bottom", "0px");
        window.parent.$(Id).css("margin-right", "0px");
        window.parent.$(Id).css("padding-top", "0px");
        window.parent.$(Id).css("padding-left", "0px");
        window.parent.$(Id).css("padding-bottom", "0px");
        window.parent.$(Id).css("padding-right", "0px");
    }
    else { //En el caso que exista lo muestra
        Accord.tabs('select', Id);
    }
}
//agregado 25-09-2013 wapumayta
function DescargarAdjunto(a){
    var id = $(a).attr("id");
    $.ajax({
        type: "POST",
        url: "Adm_Solicitudes.aspx/DescargarAdjunto",
        data: "{'idAjd': '" + id + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
            var $Pagina = "../Temporal/" + msg.d;
            //var $Pagina = msg.d;
            //alert($Pagina);
            //window.location($Pagina);
            $("#ifAdjuntoDesc").attr("src", $Pagina);
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });  
}