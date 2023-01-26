//#region Variables Globales
var idSubCuenta = null;
var vcDescSubCuenta = '';
var inSubCuenServ = 0;
var dcCanSubCuenta = 0;
var vVisualizarLineasAsignadas = false;

var RegistroActual = null;
var p_inCodTipSer = 0;
var p_inCodSer = 0;
var vcNomGrupoSeleccionado = '';

//TOTALES 
var inTotMin = 0;
var inTotAsi = 0;
var inTotReg = 0;
var inTotReg_OmitSinEmp = 0;
var inTotUltAsig = 0;
var inTotReal = 0;
var idPer = 0;
var vMontoAsignado = '';

//FLAG'S
var flagEditable = true;
var flagPROCESADO = false;
var flagClose = true;
var flagFiltro = true;
var flagOrga = true;
var flagEstado = true;
var flagENTER = false;
var flagSeleccion = false;
var flagCargaImport = true;

//VARIABLES
var p_Fil_Importacion = '';
var p_Fil_Codint2 = '';
var vcValor_caja;
var vcCodigo_caja;
var periodo_inCanBolsa; //= 0.000;
var periodo_inCanUltAsig; //= 0.000;
var vcValor_Estado = 1;

//CULTURA
var oCulturaLocal = window.parent.parent.oCulturaUsuario;

//MENU
var menuFiltros;
var menuEstados;
var menuImpor;

//TAB
var tabOpciones;

//TREE
var tree = null;
var idTree = "-1";

//cabmio en la distribución
var bCambioPorGuardar = false;

//carpeta de dominio
var CarpetaDominio = '';
//#endregion

//#region Dimenciones Dialog
var vHeightDetalleCuenta = 5, vWidthDetalleCuenta = 0;
var vHeightDetalleLinea = 0, vWidthDetalleLinea = 0;
var vHetghtHistoricoLinea = 0, vWidthHistoricoLinea = 0;
//#endregion

//GRILLA PERIODO
var WithPeriodo = 40; //920;
var HeigthPeriodo = 210;
//GRILLA DETALLES
var WithGrilla1 = 40; //290;
var HeigthGrilla1 = 310; //300; //280;
//leyenda
var WidthLeyenda = 40;

function DimPosElementos() {
    var Ancho = $(window).width();
    var Alto = $(window).height();
    //tabla de periodos
    //$("#tabOpciones").width(Ancho - 20);
    $("#tabOpciones").width(Ancho - 20);
    
    $("#tbPeriodo").setGridWidth(Ancho - WithPeriodo);
    $("#tbPeriodo").setGridHeight(Alto - HeigthPeriodo);

    //vista tipo lineas
    $("#tbLinea").setGridWidth(Ancho - WithGrilla1);
    $("#tbLinea").setGridHeight(Alto - HeigthGrilla1);
    //vista agrupaciones
    $("#tbDistAgrup").setGridWidth(Ancho - WithGrilla1);
    $("#tbDistAgrup").setGridHeight(Alto - HeigthGrilla1);
    //leyendat
    $("#dvLeyendaGrilla").width(Ancho - WidthLeyenda);
}


function CargarDependecia() {
    if (tree != null) {
        if (idTree != tree.getSelectedItemId()) {
            $.ajax({
                type: "POST",
                url: "../Consultar/Con_SeleccionArea.aspx/ListarOrganizacion",
                data: "{'vcCodInt': '" + tree.getSelectedItemId() + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {
                    var idtree = tree.getSelectedItemId();
                    var texto = tree.getAllChildless();

                    $(result.d).each(function () {
                        if (texto.indexOf(this.vcCodInt) == -1) {
                            tree.insertNewItem(idtree, this.vcCodInt, this.vcNomOrg, 0, 0, 0, 0, '');
                            //fixImage(this.vcCodInt);
                        }
                        else {
                            return false;
                        }
                    });
                },
                error: function (xhr, err, thrErr) {
                    MostrarErrorAjax(xhr, err, thrErr);
                }
            });
        }
        idTree = tree.getSelectedItemId();
    }
}

//function fixImage(id) {
//    //Cerrar, abrir, cerrar
//    var Archivo = 'Niveles/' + (id.length / 3).toString() + '.ico'
//    tree.setItemImage2(id, Archivo, Archivo, Archivo);
//}

//LOAD
$(function () {
    //#region Valoes/Estados Iniciales
    CarpetaDominio = window.top.$("#hdfCodigoDominio").val() != '' ? '/' + window.top.$("#hdfCodigoDominio").val() : '';
    $("#inforAsignar_dvToolTip").css("display", "none");

    fnSetDimensionDialog();

    $(".dvTotal").css("margin", "0px"); // !important; 
    $(".dvTotal").css("padding", "3px"); //!important;

    $(".btnNormal").button();
    $("#btnActivar").button("option", "disabled", true);
    $("#btnEnviar").button("option", "disabled", true);
    $("#btnPeriodosImportados").button("option", "disabled", true);

    $("#dvAcciones").buttonset();
    $("#dvEstado").buttonset();
    $("#dvAvanzada").buttonset();
    $("#dvProceso").buttonset();

    $("#txt_CantidadFija").live("keypress", ValidarEnteroPositivo);
    $("#txt_Historico").live("keypress", ValidarEnteroPositivo);
    $("#txt_AumentarCantidad").live("keypress", ValidarEnteroPositivo);

    //INSTANCIAMOS TAB CONTROL, y ocultamos la pestaña editar periodo
    tabOpciones = $("#tabOpciones").tabs({});
    $(tabOpciones).find('li:eq(1)').addClass('ui-state-hidden');

    $(".MESANHO").removeClass("ui-widget-content ui-corner-all");
    $(".MESANHO").css("padding", "0px");
    $(".MESANHO").css("margin", "0px");
    $(".MESANHO").kendoDatePicker({
        //culture: "es-ES",
        culture: "es-PE",
        animation: false,
        start: "year",
        depth: "year",
        format: "MM/yyyy"
    });

    $(window).resize(function () {
        DimPosElementos();
    });

    DimPosElementos();

    $("#imgDetCuenta").hide();
    $("#imgEditTipoDist").hide();

    //desactivar acciones para usuarios sin permisos
    if (p_esAdmin == "0" && p_esResp == "0") {
        $("#btnNuevo").button("option", "disabled", true);
        $("#btnEditar").button("option", "disabled", true);
        $("#btnEliminar").button("option", "disabled", true);
        $("#btnActivar").button("option", "disabled", true);
        $("#btnGenerarCopia").button("option", "disabled", true);
        $("#btnExportarPeriodo").button("option", "disabled", true);
        $("#btnEnviar").button("option", "disabled", true);
        $("#btnCerrarDist").button("option", "disabled", true);
    }

    //  POLITICA ACTIVA
    if (p_PolOrga == "1") {
        vVisualizarLineasAsignadas = true;
        //$("#Label2").prop('disabled', true);



        // ===================================
        //  ERES RESPONSABLE DE DISTRIBUCION
        // ===================================
        //if (p_esResp == "1") {
        //
        //    //Mensaje("<br/><h1>El periodo ya esta procesado</h1>", document, null);
        //
        //    $("#btnNuevo").button("option", "disabled", true);
        //    $("#btnEliminar").button("option", "disabled", true);
        //    $("#btnEstadoPeriodo").button("option", "disabled", true);
        //    $("#btnGenerarCopia").button("option", "disabled", true);
        //    $("#btnExportarPeriodo").button("option", "disabled", true);
        //
        //}
    }

    //  TREEVE DE ORGANIZACION
    try {
        tree = new dhtmlXTreeObject("dvOrganizacion", "100%", "100%", 0);
        tree.setImagePath("../../Common/Images/Controles/dhtmlx/TreeView/");
        tree.setOnClickHandler(CargarDependecia);
    }
    catch (Error) {
        //some error
        alerta(Error);
    }

    //  CARGA PRIMER NODO, nivel maximo del usuario.
    if (tree != null) {
        $.ajax({
            type: "POST",
            url: "../Consultar/Con_SeleccionArea.aspx/ListarPrincipal",
            data: "{'vcCodInt': '" + F_vcCodInt + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                tree.loadJSArray(result.d);

                //                $(result.d).each(function () {
                //                    fixImage(this[0]);
                //                });

                //CargarDetalle(0);
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            }
        });
    }

    //cargar filtro para listado
    $("#ddlFiltroPeriodo").append($("<option></option>").val(1).text('Código Cuenta'));
    $("#ddlFiltroPeriodo").append($("<option></option>").val(2).text('Cuenta'));
    $("#ddlFiltroPeriodo").append($("<option></option>").val(3).text('Estado Proceso'));
    $("#ddlFiltroPeriodo").append($("<option></option>").val(4).text('Operador'));
    $("#ddlFiltroPeriodo").append($("<option></option>").val(5).text('Periodo'));
    $("#ddlFiltroPeriodo").append($("<option></option>").val(6).text('Tipo Distribución'));

    Cabecera();
    Lista_Periodo();
    CambiaOperador();

    //#endregion

    //#region Evento Controles
    $(".SaveAgrup").live("keypress", function (event) {
        if (event.keyCode == 13) {
            fnDistribucionActualizada(true);
            Guardar_Agrupacion_Msj(this.value, this.name);
        } else {
            return Valida_Caja(event);
        }
    });
    //$(".MiTxt").live("focusin", function () { //guardar el valor 
    //    vMontoAsignado = this.value;
    //});
    //$(".MiTxt").live("focusout", function () { //si valor es diferente actualiza
    //    if (this.value != vMontoAsignado) {
    //        Guarda_Linea(this.value, this.name, this);
    //    }
    //});
    $(".MiTxt").live("keypress", function (event) {
        if (event.keyCode == 13) {
            flagENTER = true;
            fnDistribucionActualizada(true);
            Guarda_Linea(this.value, this.name, this);
        } else {
            if (Valida_Caja(event)) {
                return true;
            } else {
                return false;
            }
        }
    });

    $(".MiTxtDet").live("keypress", function (event) {
        if (event.keyCode == 13) {
            fnDistribucionActualizada(true);
            Guarda_DetalleLinea(this.value, this.name, this);
        } else {
            return Valida_Caja(event);
        }
    });
    //#region Filtro por cantidad //23-02-2015 wapumayta
    $("#chkCantMinAsig").live("click", function () {
        if ($(this).is(":checked")) {
            $("#txtCantMinAsig").attr("disabled", false);
        } else {
            $("#txtCantMinAsig").attr("disabled", true);
            $("#txtCantMinAsig").val('');
        }
    });
    $("#txtCantMinAsig").live("keypress", function (event) {
        if (event.keyCode == 13) {
            Carga_Modo();
            flagOrga = true;
            menuFiltros.hide();
            ActualizarFiltroCantidadAsignada($("#txtCantMinAsig").val());
        } else {
            if (Valida_Caja(event)) {
                return true;
            } else {
                return false;
            }
        }
    });
    $("#btnAplicarFiltro").live("click", function () {
        p_Fil_Codint2 = tree.getSelectedItemId();
        Carga_Modo();
        flagOrga = true;
        menuFiltros.hide();
        ActualizarFiltroCantidadAsignada($("#txtCantMinAsig").val());
    });
    //#endregion

    //TODOS ORGA
    $("#btnTodosOrga").click(function () {
        menuFiltros.hide();
        p_Fil_Codint2 = '';
        flagOrga = true;
        Carga_Modo();
        return false;
    });
    $("#btnCerrarOrga").click(function () {
        menuFiltros.hide();
        flagOrga = true;
        return false;
    });

    //ESTADO BUTTON
    $("#rbtnActivos").click(function () {
        vcValor_Estado = 1;
        flagFiltro = false;
        $("#btnActivar").button("option", "disabled", true);
        $("#tbPeriodo").trigger("reloadGrid");
    });
    $("#rbtnInactivos").click(function () {
        vcValor_Estado = 0;
        flagFiltro = false;
        $("#btnActivar").button("option", "disabled", true);
        $("#tbPeriodo").trigger("reloadGrid");
    });
    $("#rbtnTodos").click(function () {
        vcValor_Estado = 2;
        flagFiltro = false;
        $("#btnActivar").button("option", "disabled", true);
        $("#tbPeriodo").trigger("reloadGrid");
    });

    //NUEVO
    $("#btnNuevo").click(function () {
        if (flagEditable && $("#hdfGuidNomTabTemp").val() != '' && bCambioPorGuardar) {
            alerta("Hay una edición de periodo en proceso, guarde los cambios y cierre la edición para continuar.", null, fnMostrarTabEdicion);
            return;
        }
        NuevoPeriodo();
    });
    //EDITAR PERIODO
    $("#btnEditar").click(function () {
        if (flagSeleccion) {
            if (flagEditable && $("#hdfGuidNomTabTemp").val() != '' && bCambioPorGuardar) {
                alerta("Hay una edición de periodo en proceso, guarde los cambios y cierre la edición para continuar.", null, fnMostrarTabEdicion);
                return;
            }
            VerDetalle();
        } else {
            alerta("Debe seleccionar un Periodo");
        }
    });
    //ANULAR PERIODO
    $("#btnEliminar").click(function () {
        if (flagSeleccion) {
            if (RegistroActual.inEstPro == '69') {
                if (RegistroActual.btEst.toLowerCase() == 'true') {
                    confirmacion("Se desactivará el periodo, ¿Desea continuar?", fnEliminarPeriodo, null, "Confirmación");
                } else if (RegistroActual.btEst.toLowerCase() == 'false') {
                    confirmacion("Se eliminará el periodo, ¿Desea continuar?", fnEliminarPeriodo, null, "Confirmación");
                }
            } else {
                alerta('No puede eliminar un periodo con un estado diferente de "Pendiente"');
            }
        } else {
            alerta("Debe seleccionar un Periodo");
        }
    });
    //REACTIVAR PERIODO
    $("#btnActivar").click(function () {
        if (flagSeleccion) {
            if (RegistroActual.inEstPro == '69') {
                var Validar_Periodo_Data = {
                    p_vcPeriodo: RegistroActual.Periodo,
                    p_idCuenta: RegistroActual.F_vcCuenta,
                    vcModo: ''
                };
                $.ajax({
                    type: "POST",
                    url: "Conf_DistribucionMinutos.aspx/Validar_Periodo",
                    data: JSON.stringify(Validar_Periodo_Data),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (result) {
                        if (result.d > 0) {
                            alerta("Periodo actual ya existe, no se puede activar.");
                        } else {
                            confirmacion("Se activará el periodo, ¿Desea continuar?", Activar_periodo, null, "Confirmación");
                        }
                    },
                    error: function (xhr, err, thrErr) {
                        MostrarErrorAjax(xhr, err, thrErr);
                    }
                });

            } else {
                alerta("El periodo no se encuentra en estado pendiente");
            }
        } else {
            alerta("Debe seleccionar un Periodo");
        }
    });
    //MOSTRAR ESTADO
    $("#btnFiltrar").click(function () {
        if ($("#ddlModo").val() == '0') {
            $("#trFiltroMinAsig").show();
            $("#dvFiltros").css("height", "335px");
        } else {
            $("#trFiltroMinAsig").hide();
            $("#dvFiltros").css("height", "325px");
        }
        if (flagOrga) {
            menuFiltros = $("#dvFiltros").show().position({
                my: "center top",
                at: "center bottom",
                of: $("#btnFiltrar")[0]
            });
            flagOrga = false;
        } else {
            flagOrga = true;
            menuFiltros.hide();
        }
        return false;
    });

    //tablas importadas (no utilizado hasta la próxima mejora)
    $("#btnPeriodosImportados").click(function () {
        if (flagCargaImport) {
            VerHistorialPeriodo();
        }
        menuImpor = $("#dvImportacion").dialog({
            height: 290,
            width: 270,
            title: 'Periodos Importados',
            modal: true,
            resizable: false,
            //closeOnEscape: false,
            buttons: [
                { text: 'Aplicar', click: function () {
                    menuImpor.dialog("close");
                }
                }
            ],
            close: function () {
                var arPerSel = [];
                var vtitle = '', vtext = '';

                if (p_Fil_Importacion != "") {
                    arPerSel = p_Fil_Importacion.split(',');
                }

                if (arPerSel.length == 1) {
                    vtext = "(" + FormatoMesPeriodo(arPerSel[0]) + ")";
                } else if (arPerSel.length > 1) {
                    vtext = "(" + arPerSel.length + " Periodos" + ")";
                    var i = 0;
                    for (i = 0; i < arPerSel.length; i++) {
                        if (i == 0) {
                            vtitle = FormatoMesPeriodo(arPerSel[0]);
                        } else {
                            vtitle = vtitle + "\n" + FormatoMesPeriodo(arPerSel[i]);
                        }
                    }
                }

                $("#lblPeriodosSeleccionados").text(vtext);
                $("#lblPeriodosSeleccionados").attr("title", vtitle);
            }
        });
    });

    // SELECCIONAR ORGANIZACION, ejecuta select de vistas
    $("#dvOrganizacion").dblclick(function () {
        p_Fil_Codint2 = tree.getSelectedItemId();
        menuFiltros.hide();
        flagOrga = true;
        Carga_Modo();
        return false;
    });

    //editar tipo de distribucion
    $("#imgEditTipoDist").click(function () {
        fnEditarTipoDistribucion();
    });

    //DETALLE CUENTA BOLSA
    $("#imgDetCuenta").click(function () {
        var flagEntra = true;
        var vcCodCue = $("#ddlCuenta").val();
        if (vcCodCue == '-1' || vcCodCue == null) {
            flagEntra = false;
        } else {
            $("#hdfidCuenta").val(vcCodCue);
        }
        if (RegistroActual != null) {
            flagEntra = true;
        }
        if (flagEntra) {
            verDetalleCuenta($("#hdfidCuenta").val(), true);
        } else {
            alerta('Cuenta incorrecta');
        }
    });

    //cerrar
    $("#btnCerrar").click(function () {

        var EsPrincipal = $("#hdfEsPrincipal").val();

        if (EsPrincipal == "1" || EsPrincipal == "2") {
            $("#dvAsignaConfigBolsa").dialog("close");
        }
        else {
            if (menuFiltros != undefined && menuFiltros != null) {
                menuFiltros.hide();
            }
            oculta_pestana();
            flagOrga = true;
        }
    });

    //actualizar datos de la distribucion desde la tabla temporal
    $("#btnGuardarEditar").click(function () {
        fnValidarDatosTemporales('Guardar');
    });

    //filtro estados
    $("#btnEstadoPeriodo").click(function () {
        if (flagEstado) {
            menuEstados = $("#dvEstadoPeriodo").show().position({
                my: "left top",
                at: "left bottom",
                of: $("#btnEstadoPeriodo")[0]
            });
            flagEstado = false;
        } else {
            flagEstado = true;
            menuEstados.hide();
        }

        $(document).one("click", function () {
            menuEstados.hide();
            flagEstado = true;
        });
        return false;
    });

    //OPERADOR
    $("#ddlOperador").change(function () {
        CambiaOperador();
    });

    //GENERAR COPIA
    $("#btnGenerarCopia").click(function () {
        if (flagSeleccion) {
            $("#dvPeriodoCopiar").dialog({
                title: "Copiar Periodo",
                width: 300,
                height: 190,
                resizable: false,
                modal: true,
                buttons: [
                    { text: "Cancelar", click: function () {
                        $("#dvPeriodoCopiar").dialog("close");
                    }
                    },
                    { text: "Copiar Periodo", click: function () {
                        if (RegistroActual.F_vcCuenta == '' || RegistroActual.F_vcCuenta == undefined || RegistroActual.F_vcCuenta == null) {
                            alerta("Debe seleccionar un Periodo de la grila de periodos existentes.");
                            $("#dvPeriodoCopiar").dialog("close");
                            return;
                        }
                        if ($("#txtPeriodoCopiar").val() == '') {
                            alerta("Seleccione el periodo a generar.");
                            return;
                        }
                        var Validar_Periodo_Data = {
                            p_vcPeriodo: $("#txtPeriodoCopiar").val(),
                            p_idCuenta: RegistroActual.F_vcCuenta,
                            vcModo: 'GenerarCopia'
                        };
                        $.ajax({
                            type: "POST",
                            url: "Conf_DistribucionMinutos.aspx/Validar_Periodo",
                            data: JSON.stringify(Validar_Periodo_Data),
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success: function (result) {
                                if (result.d == '-1') {
                                    alerta("Distribución para la cuenta y el periodo ya existe.");
                                } else if (result.d == "-2") {
                                    alerta("Se ha superado en día máximo para la creación de una distribución para el periodo seleccionado.");
                                } else if (result.d == "0") {
                                    confirmacion("¿Está seguro de generar una copia del periodo " + FormatoMesPeriodo(RegistroActual.Periodo) + " ?", Copia_Periodo, null, "Confirmación.");
                                }
                            },
                            error: function (xhr, err, thrErr) {
                                MostrarErrorAjax(xhr, err, thrErr);
                            }
                        });
                        $("#dvPeriodoCopiar").dialog("close");
                    }
                    }
                ]
            });
        } else {
            alerta("Debe seleccionar un Periodo");
        }
    });

    //EXPORTAR PERIODO
    $("#btnExportarPeriodo").click(function () {
        var flagOmitir = '0';
        var vcCodInt2 = p_PolOrga == '1' ? F_vcCodInt : '';
        var ddlFilPer = $('#ddlFiltroPeriodo').val();
        var vcFilPer = '';
        if (ddlFilPer == '3') { //estado de proceso
            vcFilPer = $("#ddlFiltroEstPro").val();
        } else if (ddlFilPer == '6') { //tipo de distribucion
            vcFilPer = $("#ddlFiltroTipDis").val();
        } else {
            vcFilPer = $('#txtFiltroPeriodo').val();
        }

        $('#ifExportacionImportacion')[0].src = "Conf_DistribucionMinutosImportarExportar.aspx?" +
                                                "Tipo=0&SubTipo=3&vcCuenta=0&vcValIli=0&vcPeriodo=0&p_flagOmitir=" + flagOmitir +
                                                "&p_idPeriodo=1&p_vcCodInt2=" + vcCodInt2 + "&p_vcEstado=" + vcValor_Estado + "&p_ddlFil_Per=" + ddlFilPer + "&p_vcFil_Per=" + vcFilPer;
        $("#ifExportacionImportacion").show();
    });

    //VER DETALLE CUENTA
    $("#btnVerCuenta").click(function () {
        if (flagSeleccion) {
            var idCue = RegistroActual.F_vcCuenta;
            verDetalleCuenta(idCue, false);
        } else {
            alerta("Debe seleccionar un Periodo");
        }
    });

    //ENVIAR OPERADOR
    $("#btnEnviar").click(function () {
        if (flagSeleccion) {
            if (RegistroActual.inEstPro == 72) {
                alerta("El periodo ya ha sido procesado");
                return;
            } else if (RegistroActual.inEstPro == 71) {
                alerta("El periodo ya ha sido cerrado");
                return;
            } else if (parseInt(RegistroActual.inLinBajas) > 0) {
                alerta("Se ha(n) detectado " + RegistroActual.inLinBajas + " línea(s) con estado de baja en la distribución.");
                return;
            } else if (parseInt(RegistroActual.inLinDistCero) > 0) {
                confirmacion("Se ha(n) detectado " + RegistroActual.inLinDistCero + " línea(s) con distribución igual a cero (0). ¿Desea continuar?", fnEnviarAlOperador, null, "Confirmación");
            } else {
                confirmacion("¿Desea enviar el periodo seleccionado?", fnEnviarAlOperador, null, "Confirmación");
            }
        } else {
            alerta("Debe seleccionar un Periodo");
        }
    });

    //CERRAR DISTRIBUCION
    $("#btnCerrarDist").click(function () {
        if (flagSeleccion) {
            if (RegistroActual.inEstPro == 72) {
                alerta("El periodo ya ha sido procesado.");
                return;
            } else if (RegistroActual.inEstPro == 69) {
                alerta("El periodo no ha sido enviado al operador.");
                return;
            } else if (RegistroActual.inEstPro == 71) {
                alerta("El periodo ya ha sido cerrado.");
                return;
            }
            confirmacion("Al cerrar el periodo este ya no podrá ser editado. ¿Desea cerrar el periodo?", fnCerrarDistribucion, null, "Confirmación");
        } else {
            alerta("Debe seleccionar un Periodo");
        }
    });

    //KEYPRESS 
    $("#txtFiltro").keypress(function (event) {
        if (event.keyCode == 13) {
            Filtra_Data();
        } else {
            return ValidarAlfaNumericoConEspacios(event);
        }
    });
    $("#txtFiltroDetalle").keypress(function (event) {
        if (event.keyCode == 13) {
            Filtra_DataDetalle();
        } else {
            return ValidarAlfaNumericoConEspacios(event);
        }
    });
    $("#txtFiltroPeriodo").keypress(function (event) {
        if (event.which == 13) {
            flagFiltro = false;
            $("#btnActivar").button("option", "disabled", true);
            $("#tbPeriodo").trigger("reloadGrid");
        } else {
            return ValidarAlfaNumericoConEspacios(event);
        }
    });
    $("#txtPeriodo").keypress(function (event) {
        if (event.which == 13) {
            $("#btnGuardar").click();
        }
    });
    $("#ddlOperador").keypress(function (event) {
        if (event.which == 13) {
            $("#btnGuardar").click();
        }
    });
    $("#ddlCuenta").keypress(function (event) {
        if (event.which == 13) {
            $("#btnGuardar").click();
        }
    });

    //Filtro estados proceso
    $("#ddlFiltroEstPro,#ddlFiltroTipDis").change(function () {
        $("#tbPeriodo").trigger("reloadGrid");
    });

    //EXPORTAR
    $("#btnExportar").click(function () {
        var vcPeriodo = $("#hdfvcPeriodo").val();
        var vcCodCuenta = $("#hdfidCuenta").val();
        var p_idPeriodo = idPer;

        if (vcCodCuenta != "-1") {
            var idModo = $("#ddlModo").val();
            var ValorIli = $("#txtFiltro").val();
            var p_flagOmitir = (p_PolOrga == "1" ? true : $('#chOmitir').is(':checked'));
            var vcCodInt2 = p_PolOrga == '1' ? F_vcCodInt : '';
            var inFilCanAsig = $("#txtCantMinAsig").val() == '' ? '-1' : $("#txtCantMinAsig").val();
            var p_FilLinExp = $("#chkLinExcep").is(":checked") ? "1" : "0";

            $('#ifExportacionImportacion')[0].src = "Conf_DistribucionMinutosImportarExportar.aspx?" +
                                                    "Tipo=" + idModo + "&SubTipo=1&vcCuenta=" + vcCodCuenta +
                                                    "&vcValIli=" + ValorIli + "&vcPeriodo=" + vcPeriodo +
                                                    "&p_flagOmitir=" + p_flagOmitir + "&p_idPeriodo=" + p_idPeriodo + "&p_vcCodInt2=" + vcCodInt2 +
                                                    "&p_vcEstado=" + vcValor_Estado + "&p_inFilCanAsig=" + inFilCanAsig + "&p_FilLinExp=" + p_FilLinExp;
            $("#ifExportacionImportacion").show();
        } else {
            alerta("Seleccione una cuenta");
        }
    });

    //IMPORTAR
    $("#btnImportar").click(function () {
        var idModo = $("#ddlModo").val();
        var vcPeriodo = $("#hdfvcPeriodo").val();
        var vcValIli = 'Si:No'; //$("#hdfValorIlimitado").val();
        var vcCodCuenta = $("#hdfidCuenta").val();
        var vcCodInt2 = p_PolOrga == '1' ? F_vcCodInt : '';

        $("#ifExportacionImportacion").attr("src", "Conf_DistribucionMinutosImportarExportar.aspx?Tipo=" + idModo
                                                + "&SubTipo=2" + "&vcValIli=" + vcValIli + "&vcPeriodo=" + vcPeriodo
                                                + "&vcCuenta=" + vcCodCuenta + "&p_vcCodInt2=" + vcCodInt2 + "&p_vcEstado=" + vcValor_Estado
                                                + "&p_idPeriodo=" + $("#hdfidPeriodo").val() + "&vcGuidNom=" + $("#hdfGuidNomTabTemp").val());
        $("#ifExportacionImportacion").height("150");
        $("#ifExportacionImportacion").width("450");
        $("#dvExportacionImportacion").dialog({
            title: "IMPORTACIÓN DE CUENTA BOLSA POR PERIODO, esperando archivo",
            width: 450,
            height: 180,
            modal: true,
            resizable: false,
            close: function (ev, ui) { //CambiaCuenta(); 
                Carga_Modo();
            }
        });
    });

    //ASIGNAR 
    $("#imgAsignar").click(function () {
        VerAsignacion();
    });

    //OMITIR
    $("#chOmitir").click(function () {
        menuFiltros.hide();
        flagOrga = true;
        Carga_Modo();
        //return false;
    });

    //VALIDAR PERIODO 
    $("#txtPeriodo").change(function () {
        var vcPeriodo = $("#txtPeriodo").val();
        var vcCuenta = $("#ddlCuenta").val();
        if (vcPeriodo.length == 7 && vcCuenta != '-1' && vcCuenta != null && vcCuenta != undefined) {
            valida_Cuenta(vcCuenta);
        }
    });

    $("#ddlNumeroMeses").change(function () {
        Generar_Grafico($("#ddlNumeroMeses").val(), $(oDatosGrafico), oDatosGrafico);
    });

    // CHANGE FILTRO PERIODO
    $("#ddlFiltroPeriodo").change(function () {
        $("#txtFiltroPeriodo").val('');
        if ($(this).val() == 3) {//estado
            $("#txtFiltroPeriodo").hide();
            $("#ddlFiltroEstPro").show();
            $("#ddlFiltroTipDis").hide();
            $("#tbPeriodo").trigger("reloadGrid");
        } else if ($(this).val() == 6) {//tipo distribucion
            $("#txtFiltroPeriodo").hide();
            $("#ddlFiltroEstPro").hide();
            $("#ddlFiltroTipDis").show();
            $("#tbPeriodo").trigger("reloadGrid");
        } else {
            $("#txtFiltroPeriodo").show();
            $("#ddlFiltroEstPro").hide();
            $("#ddlFiltroTipDis").hide();
            $("#txtFiltroPeriodo").focus();
        }
    });

    //VALIDAR PERIODO 
    $("#dwSigno").change(function () {
        $("#txt_AumentarCantidad").focus();
    });

    //MODO
    $("#ddlModo").change(function () {
        p_Fil_Codint2 = "";
        var vcModo = $("#ddlModo").val();
        $("#txtFiltro").val('');
        var vcFiltro = $("#ddlTipoDist option:selected").text();

        if (vcModo == 0) {
            $("#txtFiltro").attr("title", "La búsqueda se realizará por Línea, Empleado o IMEI");
            $("#chOmitir").attr("title", "Omitir líneas sin empleado asociado");
            if (flagEditable) {
                $("#imgAsignar").show();
                $("#inforAsignar_dvToolTip").css("display", "inline-flex");
            }
            $("#tbFiltrosExtras").show();
        } else {
            $("#txtFiltro").attr("title", "La búsqueda se realizará por Código o Descripción de " + vcFiltro);
            $("#chOmitir").attr("title", "Omitir líneas sin grupo o sin empleado asociado");
            $("#imgAsignar").hide();
            $("#inforAsignar_dvToolTip").css("display", "none");
            $("#tbFiltrosExtras").hide();
        }
        fnActualizarLeyenda(vcModo);

        Carga_Modo();
        if (menuFiltros != undefined || menuFiltros != null) {
            menuFiltros.hide();
        }
    });

    //CUENTA
    $("#ddlCuenta").change(function () {
        var vcPeriodo = $("#txtPeriodo").val();
        var vcCodCue = $("#ddlCuenta").val();
        $("#hdfidCuenta").val(vcCodCue);

        if (vcCodCue != "-1") {
            valida_Cuenta(vcCodCue);
        }
    });

    //GUARDAR
    $("#btnGuardar").click(function () {
        Guarda_Periodo();
    });

    //#endregion
    $("#dvCargandoDistribucion").hide(); //agregado 14-07-2015 wapumayta

    $.ajax(
    {
        url: "Conf_DistribucionConfiguracion.aspx/ExisteDistribucionTipo",
        dataType: "json",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            if (result.d == "0") {
                var EsPrincipal = $("#hdfEsPrincipal").val();
                var $Pagina = raiz('P_Movil/Configurar/Conf_DistribucionConfiguracion.aspx?bPrincipal=' + EsPrincipal);

                $("#ifAsignaConfigBolsa").attr("src", $Pagina);
                var $width = 720;
                var $height = 480;

                var modalAsignaConfigBolsa = $("#dvAsignaConfigBolsa").dialog(
                {
                    title: "Asignar Configuración de Bolsa",
                    width: $width,
                    height: $height,
                    modal: true,
                    resizable: false,
                    close: function (event, url) {
                        location.reload();
                    }
                });
            }
        },
        error: function (result) {
            alert('Error');
        }
    });



});                                                              //END LOAD

//#region FUNCIONES FINALES
//CARGA MODO
function Carga_Modo() {
    var vcPer = $("#hdfvcPeriodo").val();
    var idCue = $("#hdfidCuenta").val();

    OcultarGrilla();
    
    //$("#txtFiltro").val('');
    var vcModo = $("#ddlModo").val();
    if (vcModo == 0) {
        $("#dvLinea").show();

        if ($('#tbLinea').getGridParam("rowNum") == null) {
            Listar_Linea('', '', '', '', 2);
        } //2 = cargar desde temporal
        else {
            $("#tbLinea").trigger("reloadGrid", [{ page: 1}]);
        }
    }

    if (vcModo != 0) {
        $("#dvDistAgrup").show();
        if ($('#tbDistAgrup').getGridParam("rowNum") == null) {
            Listar_DistribucionAgrupada(idCue, vcPer, '', vcModo);
        }
        else {
            $("#tbDistAgrup").trigger("reloadGrid", [{ page: 1}]);
        }
    }
}

//VALIDA PERIODO
function valida_Cuenta(vcCodCue) {
    $.ajax({
        type: "POST",
        url: "Conf_DistribucionMinutos.aspx/ListarServicioPorCuenta",
        data: "{'vcCodCue': '" + vcCodCue + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            var inCodServicio = result.d[0];
            var inCantSer = result.d[1];
            var vcNomSer = result.d[2];

            var bValidFecProc = false;
            var vcValidFecProc = 0;

            var dtToday = new Date();
            var vYear = dtToday.getFullYear();
            var vMonthVar = (parseInt(dtToday.getMonth()) + 1).toString();
            var vMonth = vMonthVar.length == 1 ? "0" + vMonthVar : vMonthVar;
            var vDay = dtToday.getDate();

            if ($("#txtPeriodo").val() != '' && vcCodCue.toString() != '-1') { // se ha selecionado una cuenta y un periodo
                if (arFechasCuenta['2|' + vcCodCue.toString()] != undefined) { //se ha configurado una fecha
                    var vFechaConfProc = arFechasCuenta['2|' + vcCodCue.toString()].inFecha;
                    if ($("#txtPeriodo").val() == vMonth + '/' + vYear) { //periodo seleccionado es el perdio actual
                        if (parseInt(vFechaConfProc) <= vDay) {
                            bValidFecProc = true;
                            vcValidFecProc = 'Se ha superado el día máximo para la creación de una distribución.';
                        }
                    } else if (parseInt($("#txtPeriodo").val().split("/")[1] + $("#txtPeriodo").val().split("/")[0]) < parseInt(vYear.toString() + vMonth.toString())) { //periodo seleccionado es menor al periodo actual (26-06-2015 - wapumayta)
                        bValidFecProc = true;
                        vcValidFecProc = "No se puede crear una distribución para un periodo pasado.";
                    }
                } else {
                    bValidFecProc = true;
                    vcValidFecProc = 'No se ha configurado una fecha de proceso para la cuenta seleccionada.';
                }
            } else {
                bValidFecProc = false;
                vcValidFecProc = 'No se ha seleccionado periodo o cuenta.';
            }

            var totalcuenta = $("#ddlCuenta option").length - 1;
            if (totalcuenta == 0) {
                alerta("Usted actualmente no tiene una cuenta.");
                //$("#ddlCuenta").val("-1");
                $("#btnGuardar").button("option", "disabled", true);
            }
            else 
            {
                if (inCodServicio == 0) 
                {
                    alerta("La cuenta no tiene servicio de llamadas o el servicio de llamadas está ilimitado.<br>Para acceder a esta opción vaya al mantenimiento de cuentas y configure los datos de su bolsa.");
                    $("#ddlCuenta").val("-1");
                    //$("#btnGuardar").hide();
                    $("#btnGuardar").button("option", "disabled", true);
                } else if (inCantSer == 0) {
                    alerta("El servicio de cuenta : " + vcNomSer + " es Ilimitado, no se puede asignar una distribución cuenta bolsa.");
                    //$("#btnGuardar").hide();
                    $("#btnGuardar").button("option", "disabled", true);
                } else if (bValidFecProc) {
                    alerta(vcValidFecProc);
                    //$("#btnGuardar").hide();
                    $("#btnGuardar").button("option", "disabled", true);
                } else {
                    //$("#btnGuardar").show();
                    $("#btnGuardar").button("option", "disabled", false);
                }            
            }

        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
}

//ver detalle de la cuenta
function verDetalleCuenta(vcCodCue, selSubCue) {
    var vPeriodo = RegistroActual != null ? RegistroActual.Periodo : $("#txtPeriodo").val();
    if (arFechasCuenta['2|' + vcCodCue.toString()] != undefined && (vPeriodo != '' && vPeriodo != null)) { //se ha configurado una fecha
        //var inDefPer = parseInt(arFechasCuenta["1|" + vcCodCue.toString()].inDefPer);
        var inLimEnv = parseInt(arFechasCuenta['1|' + vcCodCue.toString()].inFecha);
        var inDiaPro = parseInt(arFechasCuenta['2|' + vcCodCue.toString()].inFecha);

        var dtPeriodo = new Date(vPeriodo.split("/")[1], vPeriodo.split("/")[0] - 1, "1");
        var dtLimEnv, dtDiaPro;
        var vDay, vMonth, vYear;
        
        dtPeriodo = new Date(vPeriodo.split("/")[1], vPeriodo.split("/")[0] - 1, "1");
        dtDiaPro = new Date(dtPeriodo.setDate(dtPeriodo.getDate() - 1 + inDiaPro));
        dtPeriodo = new Date(vPeriodo.split("/")[1], vPeriodo.split("/")[0] - 1, "1");
        dtLimEnv = new Date(dtPeriodo.setDate(dtPeriodo.getDate() - 1 + inLimEnv));
        if (inLimEnv > inDiaPro) { //fecha de envio en el periodo anterior
            dtLimEnv = new Date(dtLimEnv.setMonth(dtLimEnv.getMonth() - 1));
        }

        //proceso
        vDay = dtDiaPro.getDate().toString().length == 1 ? "0" + dtDiaPro.getDate().toString() : dtDiaPro.getDate();
        vMonth = (dtDiaPro.getMonth() + 1).toString().length == 1 ? "0" + (dtDiaPro.getMonth() + 1).toString() : dtDiaPro.getMonth() + 1;
        vYear = dtDiaPro.getFullYear();
        $("#txtDiaProc").val(vDay + "/" + vMonth + "/" + vYear);
        //envio
        vDay = dtLimEnv.getDate().toString().length == 1 ? "0" + dtLimEnv.getDate().toString() : dtLimEnv.getDate();
        vMonth = (dtLimEnv.getMonth() + 1).toString().length == 1 ? "0" + (dtLimEnv.getMonth() + 1).toString() : dtLimEnv.getMonth() + 1;
        vYear = dtLimEnv.getFullYear();
        $("#txtLimEnv").val(vDay + "/" + vMonth + "/" + vYear);
    }

    $("#ifDetalleCuenta").attr("src", "Adm_CuentaServicios.aspx?CodCue=" + vcCodCue + "&CodSubCue=" + $("#hdfidSubCuenta").val() + "&Editable=" + (flagEditable ? '1' : '0') + "&SelSubCue=" + (selSubCue ? '1' : '0'));
    if (selSubCue) {
        $("#ifDetalleCuenta").height("315"); //235
    } else {
        $("#ifDetalleCuenta").height("235"); //235
    }
    $("#ifDetalleCuenta").width("575"); //575

    var arButtons = [];
    if (selSubCue) {
        arButtons.push({
            text: "Aplicar",
            click: function () {
                var arDataSubCuenta = $("#ifDetalleCuenta")[0].contentWindow.fnCapturarValores();
                //$("#hdfidSubCuenta").val(arDataSubCuenta[0]);
                vcDescSubCuenta = arDataSubCuenta[1];
                inSubCuenServ = arDataSubCuenta[2];
                dcCanSubCuenta = arDataSubCuenta[3];

                //if (idSubCuenta == null || idSubCuenta == '-1') {
                if (arDataSubCuenta[0] == '' || arDataSubCuenta[0] == '-1') {
                    alerta("Debe seleccionar la Sub-Cuenta que se modificará al procesar la distribución.");
                    return;
                } else if (inSubCuenServ != '1') {
                    alerta("Debe seleccionar una Sub-Cuenta que solo tenga un solo servicio.");
                    return;
                } else if (parseFloat(dcCanSubCuenta) == 0) {
                    alerta("Debe seleccionar un servicio que no esté definido como Ilimitado.");
                    return;
                }
                $("#hdfidSubCuenta").val(arDataSubCuenta[0]);
                fnDistribucionActualizada(true);
                //01-07-2015 wapumayta
                $("#lblCuentaBolsa").text(FormatoNumero(dcCanSubCuenta, oCulturaLocal, true) + ' min.');
                inTotAsi = dcCanSubCuenta;
                var inMinDis = parseFloat(DevuelveNumeroSinFormato($("#lblTemporal").text(), oCulturaLocal, true));
                $("#lblDisponible").text(FormatoNumero((inTotAsi - inMinDis), oCulturaLocal, true).toString() + ' min.');
                if ((inTotAsi - inMinDis) < 0) {
                    $("#dvFondoDisponible").css("background", "#FE2E2E");
                    $("#lblDisponible").css("color", "white");
                    $("#lblDisponible_").css("color", "#FE2E2E");

                    Mensaje("<br/><h1>Advertencia, se ha sobrepasado la asignación de la bolsa</h1>", document, null);
                } else {
                    $("#dvFondoDisponible").css("background", "white");
                    $("#lblDisponible").css("color", "#8E236B");
                    $("#lblDisponible_").css("color", "#8E236B");
                }

                $(this).dialog("close");
            }
        });
    }
    arButtons.push({
        text: "Cerrar",
        click: function () {
            $(this).dialog("close");
        }
    });
    $("#dvDetalleCuenta").dialog({
        title: "Selección de Sub Cuenta a distribuir",
        width: 585 + vWidthDetalleCuenta,
        height: (selSubCue ? 450 + vHeightDetalleCuenta : 368 + vHeightDetalleCuenta),
        modal: true,
        resizable: false,
        buttons: arButtons
    });
}

//NUEVO PERIODO
function NuevoPeriodo() {

    $("#lblPeriodo").prop('disabled', false);
    $("#txtOperador").prop('disabled', false);
    $("#txtCuenta").prop('disabled', false);
    $("#txtTipoDist").prop('disablde', false);

    $(tabOpciones).find('li:eq(1)').removeClass('ui-state-hidden');
    tabOpciones.tabs('option', 'selected', 1);
    $('#tabOpciones .ui-tabs-selected a').text("Nuevo Periodo");

    flagEditable = true;
    $("#chOmitir").attr("title", "Omitir líneas sin empleado asociado");

    OcultarGrilla();

    $("#tdlblPeriodo").hide();
    $("#tddtPeriodo").show();
    $("#tdTxtOperador").hide();
    $("#tdDdlOperador").show();

    $("#txtTipoDist").hide();
    $("#ddlTipoDist").show();
    $("#imgEditTipoDist").hide();
    $("#txtCuenta").hide();
    $("#ddlCuenta").show();
    $("#imgDetCuenta").hide();

    $("#btnGuardar").show();
    $("#btnImportar").hide();
    $("#btnExportar").hide();

    $("#dvLeyendaGrilla").hide();

    //$("#ddlOperador").val("-1");    

    $("#ddlCuenta").val("-1");
    $("#txtDescrip").val("");
    $("#txtPeriodo").val("");
    $("#hdfidCuenta").val("");
    $("#hdfidSubCuenta").val('');

    $("#tbTotales").hide();
    $("#lblCuentaBolsa").text("0");
    $("#lblUltAsignacion").text("0");
    $("#lblConsumido").text("0");
    $("#lblTemporal").text("0");
    $("#lblDisponible").text("0");

    $("#txtPeriodo").focus();

    $("#dvPanelFiltros").hide();
}

function OcultarGrilla() {
    $("#dvLinea").hide();
    $("#dvDistAgrup").hide();
}

//GUARDA PERIODO
function Guarda_Periodo() {
    var vcPer = $("#txtPeriodo").val();
    var idOpe = $("#ddlOperador").val();
    var idCue = $("#ddlCuenta").val();
    var idTipDis = $("#ddlTipoDist").val();
    var idSubCue = $("#hdfidSubCuenta").val();

    if (vcPer.length == 0) {
        alerta('Periodo incorrecto');
        return;
    }
    if (vcPer.length != 7) {
        alerta('Formato de Periodo incorrecto');
        return;
    }

    if (vcPer.substring(2, 3) != '/') {
        alerta('Formato de Periodo incorrecto');
        return;
    }

    if (idCue == null) {
        alerta('Cuenta incorrecta');
        return;
    }

    if (idCue == '-1' || idCue == '-2') {
        alerta('Cuenta incorrecta');
        return;
    }

    if (idOpe == null) {
        alerta('Operador incorrecta');
        return;
    }

    if (idOpe == '-1') {
        alerta('Operador incorrecta');
        return;
    }

    if (idSubCue == '') {
        alerta('Seleccione una subcuenta', null, fnAbrirDetalleCuenta);
        return;
    }

    var GuardarPeriodo_Data = { vcPer: vcPer.toString(),
        idCue: idCue.toString(),
        idTipDis: idTipDis,
        idSubCue: idSubCue
    };

    $.ajax({
        type: "POST",
        url: "Conf_DistribucionMinutos.aspx/GuardarPeriodo",
        data: JSON.stringify(GuardarPeriodo_Data),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            if (result.d[0] == 0) {
                alerta("Ya existe una distribución activa para la cuenta en el periodo seleccionado.");
                return;
            }
            idPer = result.d[0];
            //campos para consultas

            $("#hdfidPeriodo").val(idPer);
            $("#hdfvcPeriodo").val(vcPer);
            $("#hdfidCuenta").val(idCue);
            $("#hdfidTipoDis").val(idTipDis);
            $("#hdfGuidNomTabTemp").val(result.d[1]);

            //diseño de cabecera
            $("#lblPeriodo").val(vcPer);
            $("#tdlblPeriodo").show();
            $("#tddtPeriodo").hide();

            $("#txtTipoDist").val($("#ddlTipoDist option:selected").text());
            $("#txtTipoDist").show();
            $("#ddlTipoDist").hide();
            $("#imgEditTipoDist").show();

            $("#txtOperador").val($("#ddlOperador option:selected").text());
            $("#tdTxtOperador").show();
            $("#tdDdlOperador").hide();

            $("#txtCuenta").val($("#ddlCuenta option:selected").text());
            $("#txtCuenta").show();
            $("#ddlCuenta").hide();

            $("#dvLeyendaGrilla").show();
            $("#dvPanelFiltros").show();
            $("#ddlModo").html('');
            $("#ddlModo").append($("<option></option>").val(0).text('Línea'));
            $("#ddlModo").append($("<option></option>").val(idTipDis).text($("#ddlTipoDist option:selected").text()));

            $("#btnExportar").show();
            $("#btnImportar").show();
            $("#btnImportar").button("option", "disabled", false);
            $("#btnGuardar").hide();
            $("#btnGuardarEditar").button("option", "disabled", false);
            $("#tbTotales").show();
            $("#imgAsignar").show();
            $("#inforAsignar_dvToolTip").css("display", "inline-flex");

            flagEditable = true;

            $("#dvLinea").show();


            if ($('#tbLinea').getGridParam("rowNum") == null) {
                Listar_Linea("", "", "", "", 2); //mostrar lineas desde la tabla temporal
            }
            else {
                $("#tbLinea").trigger("reloadGrid");
            }

            $("#tbPeriodo").trigger("reloadGrid");

            //Obtener_Minutos();

            fnActualizarLeyenda($("#ddlModo").val());
            $(tabOpciones).find('li:eq(0)').removeClass('ui-state-hidden');

        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
            //alerta(thrErr);
        }
    });
}

//DETALLE LINEAS
function VerDetalleLineas(vcId, vcNomItem) {
    var vcTitulo = "";
    $("#hdfvcFiltroDetalle").val(vcId);
    vcNomGrupoSeleccionado = vcNomItem;

    idModo = parseInt($("#hdfidTipoDis").val());
    if (idModo == 1) { vcTitulo = "Centro de Costos"; }
    if (idModo == 2) { vcTitulo = "Área"; }
    if (idModo == 3) { vcTitulo = "Nivel"; }
    if (idModo == 4) { vcTitulo = "Grupo Empleado"; }

    if ($('#tbLineaDetalle').getGridParam("rowNum") == null) {
        Listar_LineaDetalle();
    } else {
        $("#tbLineaDetalle").trigger("reloadGrid", [{ page: 1}]);
    }
    $("#txtFiltroDetalle").val("");

    if (vcId == '' || vcId == '-1' || vcId == '-2') {
        vcTitulo = "Líneas por " + vcTitulo + " : " + vcNomItem;
    } else {
        vcTitulo = "Líneas por " + vcTitulo + " : " + vcId + " - " + vcNomItem;
    }
    $("#dvLineaDetalle").dialog({
        title: vcTitulo,
        width: 535 + vWidthDetalleLinea,
        height: 405 + vHeightDetalleLinea,
        resizable: false,
        modal: true,
        close: function (ev, ui) {
            var vcModo = $("#ddlModo").val();
            if (vcModo == "0") {
                $("#tbLinea").trigger("reloadGrid");
            } else {
                $("#tbDistAgrup").trigger("reloadGrid");
                $("#txtFiltroDetalle").val('');
            }            
        }
    });
}

//CAMBIA OPERADOR
function CambiaOperador() {
    $("#imgDetCuenta").hide();
    $("#ddlCuenta").html("");

    if ($("#ddlOperador").val() != "-1") {
        var ListarCuentaPorOperador_Data = { inCodOpe: $("#ddlOperador").val() };
        $.ajax({
            type: "POST",
            url: "Conf_DistribucionMinutos.aspx/ListarCuentaPorOperador",
            data: JSON.stringify(ListarCuentaPorOperador_Data),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                if ($(result.d).length > 0) {
                    $("#ddlCuenta").html("");

                    $("#ddlCuenta").append($("<option></option>").attr("value", "-1").text("<Seleccionar>"));

                    for (i in result.d) {
                        $("#ddlCuenta").append($("<option></option>").attr("value", result.d[i].P_vcCod).text(result.d[i].vcNom));
                    }

                    $("#imgDetCuenta").show();
                } else {
                    $("#ddlCuenta").append($("<option></option>").attr("value", "-2").text("<Sin Cuentas>"));
                }
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            }
        });
    }
}

//OBTENER MINUTOS
function Obtener_Minutos() {
    var Obtener_Cuenta_Data = { idCuenta: RegistroActual.F_vcCuenta, //$("#hdfidCuenta").val(),
        p_vcCodInt2: F_vcCodInt.toString(),
        p_PolOrga: p_PolOrga.toString(),
        IdSubCuenta: RegistroActual.inCodSubCue
    };
    $.ajax({
        type: "POST",
        url: "Conf_DistribucionMinutos.aspx/Obtener_Cuenta",
        data: JSON.stringify(Obtener_Cuenta_Data),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            inTotAsi = result.d[0];
            if (p_PolOrga == "1") {
                if (result.d[1] > 0) {
                    inTotAsi = result.d[1];
                }
            }
            var vcinTotAsi;
            //vcinTotAsi = inTotAsi.replace(/(\d)(?=(\d{3})+\.)/g, "$1,").toString().replace('.000', '');
            vcinTotAsi = FormatoNumero(inTotAsi, oCulturaLocal, true);
            $("#lblCuentaBolsa").text(vcinTotAsi + ' min.');
            //ActualizarTotal();
            VerDetalle_2();
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
}

//VER DETALLE
function VerDetalle() { //obtener minutos debe completarse antes de todas las demas acciones (Error 3814)
    Obtener_Minutos();
}
function VerDetalle_2() { //cambiado de VerDetalle a VerDetalle_2
    if (RegistroActual.inLineas == 0) {
        Mensaje("<br/><h1>Periodo no tiene líneas asociadas</h1>", document, null);
        return false;
    }

    if (p_PolOrga == "1") {
        $("#chOmitir").prop('disabled', true);
        $("#lblomitir").prop('disabled', true);
        $("#chOmitir").prop("checked", true);

        $("#chkTipCalcProm").prop('disabled', true);
        $("#chkTipCalcProm").prop('checked', true);
    }

    $("#lblPeriodo").prop('disabled', true);
    $("#txtOperador").prop('disabled', true);
    $("#txtTipoDist").prop('disabled', true);
    $("#txtCuenta").prop('disabled', true);

    $("#lblPeriodo").css("background", "white");
    $("#txtOperador").css("background", "white");
    $("#txtTipoDist").css("background", "white");
    $("#txtCuenta").css("background", "white");

    OcultarGrilla();

    $(tabOpciones).find('li:eq(1)').removeClass('ui-state-hidden');
    tabOpciones.tabs('option', 'selected', 1);
    $('#tabOpciones .ui-tabs-selected a').text("Editar Periodo");
    flagPROCESADO = false;

    $("#tbTotales").show();
    $("#dvPanelFiltros").show();

    idPer = RegistroActual.P_inCodBolPer;
    var vcPer = RegistroActual.Periodo;
    var vcDes = RegistroActual.vcDescrip;
    var idOpe = RegistroActual.Periodo;
    var vcOpe = RegistroActual.vcNomOpe;
    var idCue = RegistroActual.F_vcCuenta;
    var vcCue = RegistroActual.vcNomCue;
    var vcModo = RegistroActual.vcModoDis;
    var vcTipDis = RegistroActual.vcNomTipDis;
    var idSubCue = RegistroActual.inCodSubCue;

    periodo_inCanBolsa = RegistroActual.inCanBolsa;
    periodo_inCanUltAsig = RegistroActual.inCanUltAsig;

    $("#hdfidPeriodo").val(idPer);
    $("#hdfvcPeriodo").val(vcPer);
    $("#hdfidOperador").val(idOpe);
    $("#hdfidCuenta").val(idCue);
    $("#hdfidTipoDis").val(vcModo);
    $("#hdfidSubCuenta").val(idSubCue);

    $("#lblPeriodo").val($("#hdfvcPeriodo").val());
    $("#txtOperador").val(vcOpe);
    $("#txtCuenta").val(vcCue);

    $("#tdlblPeriodo").show();
    $("#tddtPeriodo").hide();

    $("#txtTipoDist").show();
    $("#txtTipoDist").val(vcTipDis);
    $("#ddlTipoDist").hide();
    $("#imgEditTipoDist").show();
    $("#ddlModo").html('');
    $("#ddlModo").append($("<option></option>").val(0).text('Línea'));
    $("#ddlModo").append($("<option></option>").val(vcModo).text(vcTipDis));
    $("#tbFiltrosExtras").hide();

    $("#tdTxtOperador").show();
    $("#tdDdlOperador").hide();

    $("#txtCuenta").show();
    $("#ddlCuenta").hide();
    $("#imgDetCuenta").show();

    flagEditable = true;
    $("#btnImportar").button("option", "disabled", false);
    $("#btnGuardarEditar").button("option", "disabled", false);

    //$("#btnAsignar").show();
    $("#btnGuardar").hide();
    $("#btnImportar").show();
    $("#btnExportar").show();

    $("#dvLeyendaGrilla").show(); //mostrar leyenda de grilla
    
    if (RegistroActual.btEst == 'False' || RegistroActual.inEstPro == 72 || RegistroActual.inEstPro == 71) { //estado inactivo o estados de proces cerrado o procesado
        //if (RegistroActual.vcEstPro.lastIndexOf('PROCESADO') != -1) {
        flagPROCESADO = true; //??????????????????????????????????????????????????????????????????????????????????
        $("#btnImportar").button("option", "disabled", true);
        $("#btnGuardarEditar").button("option", "disabled", true);
        $("#imgEditTipoDist").hide();
        $("#imgAsignar").hide();
        $("#inforAsignar_dvToolTip").css("display", "none");
        flagEditable = false;
        $('#tabOpciones .ui-tabs-selected a').text("Periodo Cerrado");
    }    

    //Obtener_Minutos();
    $("#ddlModo").val(vcModo);
    $("#imgAsignar").hide();
    $("#inforAsignar_dvToolTip").css("display", "none");
    $("#chOmitir").attr("title", "Omitir líneas sin grupo o sin empleado asociado");
    $("#chkCantMinAsig").attr("checked", false);
    $("#txtCantMinAsig").attr("disabled", true);
    $("#txtCantMinAsig").val('');

    if (RegistroActual.btEst == 'True' && (RegistroActual.inEstPro == '69' || RegistroActual.inEstPro == '70')) {//distribucion activa y estado pendiente o enviado (editable, crear temporal)
        fnCrearTablaTemporal(vcModo, idCue, vcPer, RegistroActual.P_inCodBolPer);
    } else { //no editable, consutar desde la tabla principal
        $("#hdfGuidNomTabTemp").val('');
        if (vcModo != 0) {
            $("#dvDistAgrup").show();
            if ($('#tbDistAgrup').getGridParam("rowNum") == null) {
                Listar_DistribucionAgrupada(idCue, vcPer, '', vcModo);
            } else {
                $("#tbDistAgrup").trigger("reloadGrid");
                fnActualizarCaptionGridAgrup(vcModo);
            }
        } else {
            $("#chOmitir").attr("title", "Omitir líneas sin empleado asociado");
            $("#dvLinea").show();
            if ($('#tbLinea').getGridParam("rowNum") == null) {
                Listar_Linea("", "", "", "", 1);
            } else {
                $("#tbLinea").trigger("reloadGrid");
            }
        }
    }
    fnActualizarLeyenda(vcModo);
    fnDistribucionActualizada(false);
}

//GUARDAR LINEA 
function Guarda_Linea(p_vcValue, p_vcNum, p_obj) {
    var txt_ = $("txt_" + p_vcNum); // document.getElementById("txt_" + p_vcNum);
    //txt_.style.backgroundColor = "red";
    var bTemp = true; //actualizar en tabla temporal
    var vUrl;
    var Guardar_Linea_Data;
    if (bTemp) {
        vUrl = 'Guardar_Linea_Temp';
        Guardar_Linea_Data = { vcCodNum: p_vcNum.toString(),
            vcPeriodo: $("#hdfvcPeriodo").val(),
            dcCan: p_vcValue.toString(),
            p_vcCodCue: $("#hdfidCuenta").val(),
            vcGuidNom: $("#hdfGuidNomTabTemp").val()
        };
    } else {
        vUrl = 'Guardar_Linea';
        Guardar_Linea_Data = { vcCodNum: p_vcNum.toString(),
            vcPeriodo: $("#hdfvcPeriodo").val(),
            dcCan: p_vcValue.toString(),
            p_vcCodCue: $("#hdfidCuenta").val()
        };
    }

    $.ajax({
        type: "POST",
        url: "Conf_DistribucionMinutos.aspx/" + vUrl,
        data: JSON.stringify(Guardar_Linea_Data),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            Filtra_Data(parseInt($('#tbLinea').getGridParam("page")));
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
}

//GUARDA DETALLE LINEA 
function Guarda_DetalleLinea(p_vcValue, p_vcNum, p_obj) {
    var bTemp = true; //actualizar en tabla temporal
    var vUrl, Guardar_Linea_Data;
    if (bTemp) {
        vUrl = 'Guardar_Linea_Temp';
        Guardar_Linea_Data = {
            vcCodNum: p_vcNum.toString(),
            vcPeriodo: $("#hdfvcPeriodo").val(),
            dcCan: p_vcValue.toString(),
            p_vcCodCue: $("#hdfidCuenta").val(),
            vcGuidNom: $("#hdfGuidNomTabTemp").val()
        };
    } else {
        vUrl = 'Guardar_Linea';
        Guardar_Linea_Data = {
            vcCodNum: p_vcNum.toString(),
            vcPeriodo: $("#hdfvcPeriodo").val(),
            dcCan: p_vcValue.toString(),
            p_vcCodCue: $("#hdfidCuenta").val()
        };
    }
    $.ajax({
        type: "POST",
        url: "Conf_DistribucionMinutos.aspx/" + vUrl,
        data: JSON.stringify(Guardar_Linea_Data),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            Filtra_DataDetalle(parseInt($('#tbLineaDetalle').getGridParam("page")));
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }

    });

    //var vcNomCss = '.MiTxtDet';

    //for (var i = 0; i < $(vcNomCss).length; i++) {
    //
    //    $($(vcNomCss)[i]).css("background", "white");
    //
    //    if ($($(vcNomCss)[i]).attr('name') == $(p_obj).attr('name')) {
    //        $(p_obj).css("background", "#F7F8E0");
    //        $($(vcNomCss)[i + 1]).focus();
    //        $($(vcNomCss)[i + 1]).select();
    //        break;
    //    }
    //}

}

//FILTRAR DATA
function Filtra_Data(rd) {
    var vcModo = parseInt($("#ddlModo").val());
    var redicPag = rd == null || rd == undefined ? 1 : rd;
    if (vcModo == 0) {
        $("#tbLinea").trigger("reloadGrid", [{ page: redicPag}]);
    } else {
        $("#tbDistAgrup").trigger("reloadGrid", [{ page: redicPag}]);
    }
}

//FILTRAR DATA
function Filtra_DataDetalle(rd) {
    var redicPag = rd == null || rd == undefined ? 1 : rd;
    $("#tbLineaDetalle").trigger("reloadGrid", [{ page: redicPag}]);
}

function Valida_Caja(evt) {
    var charCode = (evt.which) ? evt.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
}

//LISTAR LINEA 
function Listar_Linea(p_inNiv, p_CodGru, p_CodCC, p_CodOrga, p_inModo) {
    var tbColumns =
    [
        { name: 'rData[3]', index: 'rData[3]', label: 'Línea', hidden: false, width: '70px', sortable: false, align: 'center', classes: 'ColumnGrillaLinea',
            formatter: function (value, options, rData) {
                return "" + rData[0];

            }
        },
        { name: 'P_vcNum', index: 'P_vcNum', label: 'Empleado', hidden: false, width: '200px', sortable: false,
            formatter: function (value, options, rData) {
                return "" + rData[2];

            }
        },
        { name: 'P_vcNum', index: 'P_vcNum', label: 'IMEI', hidden: true, width: '100px', sortable: false, align: 'center', visible: false, 
            formatter: function (value, options, rData) {
                return "" + rData[3];

            }
        },
        { name: 'P_vcNum', index: 'P_vcNum', label: 'Modelo Dispositivo', hidden: false, width: '150px', sortable: false,
            formatter: function (value, options, rData) {
                return "" + rData[4];

            }
        },
        { name: 'P_vcNum', index: 'P_vcNum', label: 'Sucursal', hidden: true, width: '120px', sortable: false, visible: false, 
            formatter: function (value, options, rData) {
                return "" + rData[6];

            }
        },
        { name: 'P_vcNum', index: 'P_vcNum', label: 'Minutos Asignados', hidden: false, width: '85px', sortable: false, align: 'right',
            formatter: function (value, options, rData) {
                if (parseInt(rData[8]) != -1) {
                    //sinTotMin = inTotMin + parseInt( rData[8]);
                    return " " + parseInt(rData[8]);
                } else {
                    return " Ilimitado "; //+ rData.Cuenta.dcMon;
                }
            }
        },
        { name: 'P_vcNum', index: 'P_vcNum', label: 'Minutos Consumidos', hidden: false, width: '85px', sortable: false, align: 'right',
            formatter: function (value, options, rData) {
                return "" + parseInt(rData[10]);

            }
        },
        { name: 'vcUsu', index: 'vcUsu', label: 'Usuario', hidden: true,
            formatter: function (value, options, rData) {

                return "" + rData[12];

            }
        },
        { name: 'dcMon', index: 'dcMon', label: 'Asignar por Línea', hidden: false, width: '65px', sortable: false, align: 'center', classes: 'ColumnGrillaLlamadas',
            formatter: function (value, options, rData) {
                if (flagEditable && parseInt(rData[8]) != -1) {
                    //return "  <input title='Fecha Actualización : " + rData[11] + "&#13;Usuario : " + rData[12] + " &#13;(presionar ENTER para guardar)' class='MiTxt' id='txt_" + rData[0] + "' onClick='this.select();' name='" + rData[0] + 
                    //            "' type='text' onkeypress=' if (event.keyCode==13){ flagENTER = true; Guarda_Linea(this.value,this.name,this);} else return Valida_Caja(event); '  value='" +
                    //                parseInt(rData[9]) + "' style='width:45px;text-align:right;' maxlength='4'> "
                    //return "  <input title='Fecha Actualización : " + rData[11] + "&#13;Usuario : " + rData[12] + " &#13;(presionar ENTER para guardar)' class='MiTxt' id='txt_" + rData[0] + "' onClick='this.select();' name='" + rData[0] +
                    //            "' type='text' onkeypress='ValidarIngreso(event, \"" + rData[0] + "\");' value='" + parseInt(rData[9]) + "' style='width:45px;text-align:right;' maxlength='4'> "
                    return "  <input title='Fecha Actualización : " + rData[11] + "&#13;Usuario : " + rData[12] + "' class='MiTxt' id='txt_" + rData[0] + "' onClick='this.select();' name='" + rData[0] +
                                "' type='text' value='" + parseInt(rData[9]) + "' style='width:45px;text-align:right;' maxlength='4'> ";
                } else {
                    //return " - "; //+ rData.Cuenta.dcMon;
                    return parseInt(rData[9]);
                }

            }
        },
        { name: 'cDet', index: 'cDet', label: '.', hidden: false, width: '45px', sortable: false, align: 'center',
            formatter: function (value, options, rData) {
                if (rData[13] == "0") {
                    return " <a class='imgBtn' name='" + rData[0] + "' onClick='VerHistorico(this.name);' title='Ver Historico' ><img src='../../Common/Images/Mantenimiento/VerDetalle.png' ></a> " +
                    " <a class='imgBtn' name='" + rData[0] + "' onClick='fnQuitarLinea_Confirm(this.name);' title='Quitar Línea' ><img src='../../Common/Images/Mantenimiento/Cancelar.png'></a>";
                } else {
                    return " <a class='imgBtn' name='" + rData[0] + "' onClick='VerHistorico(this.name);' title='Ver Historico' ><img src='../../Common/Images/Mantenimiento/VerDetalle.png' ></a> ";
                }
                // height='20' width='22'
            }
        },
        { name: 'bEstado', index: 'bEstado', lable: 'Est', hidden: true, width: '25px', sortable: false, align: 'center',
            formatter: function (value, options, rData) {
                return "" + rData[13];
            }
        }
    ];

    var inNumRegistros = ($(window).height() - HeigthGrilla1);
    inNumRegistros = parseInt(inNumRegistros / 23);

    var tblinea = $("#tbLinea").jqGrid({
        width: ($(window).width() - WithGrilla1),
        height: ($(window).height() - HeigthGrilla1),
        datatype: function () {
            var p_flagOmitir = (p_PolOrga == "1" ? true : $('#chOmitir').is(':checked'));
            //$('#chOmitir').is(':checked');
            inTotMin = 0;
            var dataGrid = { inPagTam: $('#tbLinea').getGridParam("rowNum"), //Tamaño de pagina
                inPagAct: parseInt($('#tbLinea').getGridParam("page")), //Pagina actual
                vcVal: $("#txtFiltro").val(),
                CodCue: $("#hdfidCuenta").val(),
                vcPer: $("#hdfvcPeriodo").val(),
                inNiv: p_inNiv,
                CodGru: p_CodGru,
                CodCC: p_CodCC,
                CodOrga: p_CodOrga,
                p_flagOmitir: p_flagOmitir.toString(),
                p_SinEmpleado: 0,
                p_SinGrupo: 0,
                p_vcCodInt2: (p_Fil_Codint2.length == 0 ? (p_PolOrga == '1' ? F_vcCodInt : '') : p_Fil_Codint2),
                vcGuidNom: p_inModo == 1 ? '' : $("#hdfGuidNomTabTemp").val(),
                p_inFilCanAsig: $("#txtCantMinAsig").val() == '' ? '-1' : $("#txtCantMinAsig").val(),
                p_LinExcep: $("#chkLinExcep").is(":checked") ? "1" : "0",
                inCodBolPer: $("#hdfidPeriodo").val(),
                inCodTipDis: $("#ddlModo").val()
            };

            $.ajax({
                url: "Conf_DistribucionMinutos.aspx/Lista_dtLinea", //PageMethod
                data: JSON.stringify(dataGrid),
                dataType: "json",
                type: "post",
                contentType: "application/json; charset=utf-8",
                success: function (result) {
                    $("#tbLinea")[0].addJSONData(result.d[0]);
                    ActualizarTotal(result.d[1]);
                },
                error: function (xhr, err, thrErr) {
                    MostrarErrorAjax(xhr, err, thrErr);
                }
            });
        },
        jsonReader:
        {
            root: "Items", page: "PaginaActual", total: "TotalPaginas", records: "TotalRegistros", repeatitems: true, cell: "Row",
            id: "P_vcNum"
        },
        colModel: tbColumns,
        pager: "#pagerLinea",
        loadtext: 'Cargando datos...',
        recordtext: "{0} - {1} de {2} elementos",
        emptyrecords: 'No hay resultados',
        pgtext: 'Pág: {0} de {1}', //Paging input control text format.
        rowNum: inNumRegistros,
        rowList: [(inNumRegistros), (inNumRegistros * 2), (inNumRegistros * 3)],
        viewrecords: true,
        caption: "Líneas (presionar ENTER para guardar)",
        rownumbers: true,
        shrinkToFit: false,
        beforeSelectRow: function (rowid, status, e) {
            return false;
        },
        onRightClickRow: function () {
            tblinea.jqGrid('resetSelection');
            return false;
        },
        afterInsertRow: function (rowid, aData, rowelem) {
            var vStyleCol;
            if (rowelem[13] != "2") {
                if (rowelem[13] == "0") { //lineas de baja
                    //vStyleCol = 'ui-state-error-text';
                    vStyleCol = 'ColumnaLineaBaja';
                    //$("#dvAccionBajas").show();
                } else if (rowelem[13] == "1") { //lineas de alta
                    //vStyleCol = { color: 'blue' };
                    vStyleCol = 'ColumnaLineaAlta';
                }
                var colModels = $("#tbLinea").getGridParam("colModel");
                for (i in colModels) {
                    if (i > 0) {
                        $("#tbLinea").jqGrid('setCell', rowid, i, '', vStyleCol);
                    }
                }
            } else {
                var inCanAsi = parseInt(rowelem[9]);
                var inCanTipDis = parseInt(rowelem[14]);
                if (inCanTipDis != -1 && inCanAsi != inCanTipDis) {
                    vStyleCol = 'ColumnaLineaExcepcion';
                    var colModels = $("#tbLinea").getGridParam("colModel");
                    for (i in colModels) {
                        if (i > 0) {
                            $("#tbLinea").jqGrid('setCell', rowid, i, '', vStyleCol);
                        }
                    }
                }
            }
        }
    }).navGrid("#pagerLinea", { edit: false, add: false, search: false, del: false });
    //ActualizarTotal();    
}

//LISTAR DETALLE
function Listar_LineaDetalle() {
    var tbColumns = [
        { name: 'P_vcNum', index: 'P_vcNum', label: 'P_vcNum', hidden: true },
        { name: 'P_vcNum', index: 'P_vcNum', label: 'Línea', hidden: false, width: '70px', sortable: false, align: 'center', classes: 'ColumnGrillaLinea',
            formatter: function (value, options, rData) {
                return "" + rData[0];

            }
        },
        { name: 'Empleado.NombreUsuario', index: 'Empleado.NombreUsuario', label: 'Empleado', hidden: false, width: '140px', sortable: false,
            formatter: function (value, options, rData) {
                return "" + rData[2];

            }
        },
        { name: 'Cuenta.dcMonAsig', index: 'Cuenta.dcMonAsig', label: 'Minutos Asignados', hidden: false, width: '70px', sortable: false, align: 'right',
            formatter: function (value, options, rData) {
                return "" + parseInt(rData[8]);

            }
        },
        { name: 'Cuenta.dcMonReal', index: 'Cuenta.dcMonReal', label: 'Minutos Consumidos', hidden: false, width: '70px', sortable: false, align: 'right',
            formatter: function (value, options, rData) {
                return "" + parseInt(rData[10]);

            }
        },
        { name: 'Cuenta.dcMon', index: 'Cuenta.dcMon', label: 'Asignar por Línea', hidden: false, width: '70px', sortable: false, align: 'center', classes: 'ColumnGrillaLlamadas',
            formatter: function (value, options, rData) {
                if (flagEditable) {
                    //return "  <input class='MiTxtDet' title='Fecha Actualización : " + rData[11] + "&#13;Usuario : " + rData[12] + "&#13;(presionar ENTER para guardar)' id='txtDet_" + rData[0] + "' name='" + rData[0] + "' type='text' onkeypress='if (event.keyCode==13){ Guarda_DetalleLinea(this.value,this.name,this);} else return Valida_Caja(event); '  value='" + parseInt(rData[9]) + "' style='width:50px;text-align:right;' maxlength='4'> "
                    return "  <input class='MiTxtDet' title='Fecha Actualización : " + rData[11] + "&#13;Usuario : " + rData[12] + "&#13;(presionar ENTER para guardar)' id='txtDet_" + rData[0] + "' name='" + rData[0] + "' type='text' value='" + parseInt(rData[9]) + "' style='width:50px;text-align:right;' maxlength='4'> ";
                } else {
                    //return " - "; //+ rData.Cuenta.dcMon;
                    return parseInt(rData[9]);
                }

            }
        },
        { name: 'Cuenta.dcMon', index: 'Cuenta.dcMon', label: '.', hidden: false, width: '45px', sortable: false, align: 'center',
            formatter: function (value, options, rData) {
                if (rData[13] == "0") {
                    return " <a class='imgBtn' name='" + rData[0] + "' onClick='VerHistorico(this.name);' title='Ver Historico' ><img src='../../Common/Images/Mantenimiento/VerDetalle.png' ></a> " +
                    " <a class='imgBtn' name='" + rData[0] + "' onClick='fnQuitarLinea_Confirm(this.name);' title='Quitar Línea' ><img src='../../Common/Images/Mantenimiento/Cancelar.png'></a>";
                } else {
                    return " <a class='imgBtn' name='" + rData[0] + "' onClick='VerHistorico(this.name);' title='Ver Historico' ><img src='../../Common/Images/Mantenimiento/VerDetalle.png' ></a> ";
                }
                // height='20' width='22'
            }
        },
        { name: 'bEstado', index: 'bEstado', lable: 'Est', hidden: true, width: '25px', sortable: false, align: 'center',
            formatter: function (value, options, rData) {
                return "" + rData[13];
            }
        }
    ];

        var tbLineaDetalle = $("#tbLineaDetalle").jqGrid({
            width: "530",
            height: "250",
            datatype: function () {
                //$("#tbLineaDetalle").jqGrid('clearGridData');
                var vcFiltro = '';
                var p_vcCodCue = $("#hdfidCuenta").val();
                var p_vcPer = $("#hdfvcPeriodo").val();
                var p_CodCC = "", p_CodOrga = "", p_inNiv = "", p_CodGru = "";
                var vcModo = $("#ddlModo").val();
                var vcCodGrupo = $("#hdfvcFiltroDetalle").val();

                if (vcModo == '1') { p_CodCC = (vcCodGrupo == '-1' || vcCodGrupo == '-2' ? '' : vcCodGrupo); }
                if (vcModo == '2') { p_CodOrga = (vcCodGrupo == '-1' || vcCodGrupo == '-2' ? '' : vcCodGrupo); }
                if (vcModo == '3') { p_inNiv = (vcCodGrupo == '-1' || vcCodGrupo == '-2' ? '' : vcCodGrupo); }
                if (vcModo == '4') { p_CodGru = (vcCodGrupo == '-1' || vcCodGrupo == '-2' ? '' : vcCodGrupo); }

                vcFiltro = $("#txtFiltroDetalle").val();

                var p_flagOmitir = (p_PolOrga == "1" ? true : $('#chOmitir').is(':checked')); //$('#chOmitir').is(':checked');

                var Lista_dtLinea_Data = {
                    inPagTam: $('#tbLineaDetalle').getGridParam("rowNum"), //Tamaño de pagina
                    inPagAct: parseInt($('#tbLineaDetalle').getGridParam("page")), //Pagina actual
                    vcVal: vcFiltro,
                    CodCue: p_vcCodCue,
                    vcPer: p_vcPer,
                    inNiv: p_inNiv,
                    CodGru: p_CodGru,
                    CodCC: p_CodCC,
                    CodOrga: p_CodOrga,
                    p_flagOmitir: p_flagOmitir.toString(),
                    p_SinEmpleado: vcCodGrupo == '-1' ? 1 : 0, //(vcCodGrupo.length > 0 ? '1' : '0'),
                    p_SinGrupo: vcCodGrupo == '-2' ? 1 : 0, //(vcNomGrupoSeleccionado.search("SIN GRUPO") != -1 ? '0' : '1'),
                    p_vcCodInt2: (p_Fil_Codint2.length == 0 ? (p_PolOrga == '1' ? F_vcCodInt : '') : p_Fil_Codint2),
                    vcGuidNom: $("#hdfGuidNomTabTemp").val(),
                    p_inFilCanAsig: '-1',
                    p_LinExcep: "0",
                    inCodBolPer: $("#hdfidPeriodo").val(),
                    inCodTipDis: vcModo
                };

                $.ajax({
                    url: "Conf_DistribucionMinutos.aspx/Lista_dtLinea",
                    data: JSON.stringify(Lista_dtLinea_Data),
                    dataType: "json",
                    type: "post",
                    contentType: "application/json; charset=utf-8",
                    success: function (result) {
                        $("#tbLineaDetalle")[0].addJSONData(result.d[0]);
                    },
                    error: function (xhr, err, thrErr) {
                        MostrarErrorAjax(xhr, err, thrErr);
                    }
                });
            },
            jsonReader: { root: "Items", page: "PaginaActual", total: "TotalPaginas", records: "TotalRegistros", repeatitems: true, cell: "Row", id: "P_vcNum" },
            colModel: tbColumns,
            pager: "#pagerLineaDetalle",
            loadtext: 'Cargando datos...',
            recordtext: "{0} - {1} de {2} elementos",
            emptyrecords: 'No hay resultados',
            pgtext: 'Pág: {0} de {1}', //Paging input control text format.
            rowNum: 10,
            rowList: [10, 20, 30],
            viewrecords: true, //caption: "Centro de Costos",
            rownumbers: true,
            shrinkToFit: false,
            beforeSelectRow: function (rowid, status, e) {
                return false;
            },
            onRightClickRow: function () {
                tbLineaDetalle.jqGrid('resetSelection');
                return false;
            },
            afterInsertRow: function (rowid, aData, rowelem) {
                if (rowelem[13] != "2") {
                    var vStyleCol;
                    if (rowelem[13] == "0") { //lineas de baja
                        //vStyleCol = 'ui-state-error-text';
                        vStyleCol = 'ColumnaLineaBaja';
                    } else if (rowelem[13] == "1") { //lineas de alta
                        //vStyleCol = { color: 'blue' };
                        vStyleCol = 'ColumnaLineaAlta';
                    }
                    var colModels = $("#tbLineaDetalle").getGridParam("colModel");
                    for (i in colModels) {
                        if (i > 0) {
                            $("#tbLineaDetalle").jqGrid('setCell', rowid, i, '', vStyleCol);
                        }
                    }
                } else {
                    var inCanAsi = parseInt(rowelem[9]);
                    var inCanTipDis = parseInt(rowelem[14]);
                    if (inCanTipDis != -1 && inCanAsi != inCanTipDis) {
                        vStyleCol = 'ColumnaLineaExcepcion';
                        var colModels = $("#tbLineaDetalle").getGridParam("colModel");
                        for (i in colModels) {
                            if (i > 0) {
                                $("#tbLineaDetalle").jqGrid('setCell', rowid, i, '', vStyleCol);
                            }
                        }
                    }
                }
            }
        }).navGrid("#pagerLineaDetalle", { edit: false, add: false, search: false, del: false });
}

//ACTUALIZA TOTALES
function ActualizarTotal(list_) {
    inTotMin = list_[0];
    inTotUltAsig = list_[1];
    inTotReal = list_[2];
    inTotReg = list_[3];
    inTotReg_OmitSinEmp = list_[4];
    if (flagPROCESADO) {
        inTotUltAsig = parseInt(periodo_inCanUltAsig.replace(",", ""));
        //$("#lblCuentaBolsa").text(parseFloat(periodo_inCanBolsa, 10).toFixed(1).replace(/(\d)(?=(\d{3})+\.)/g, "$1,").toString().replace('.0','') + ' min.');
        $("#lblUltAsignacion").text(periodo_inCanUltAsig + ' min.');
        $("#lblCuentaBolsa").text(periodo_inCanBolsa + ' min.');
    }
    // Distribucion Actual
    $("#lblUltAsignacion").text(FormatoNumero(inTotUltAsig, oCulturaLocal, true).toString() + ' min.');
    // Consumido
    $("#lblConsumido").text(FormatoNumero(inTotReal, oCulturaLocal, true).toString() + ' min.');
    // Distribuido
    $("#lblTemporal").text(FormatoNumero(inTotMin, oCulturaLocal, true).toString() + ' min.');
    // Disponible
    $("#lblDisponible").text(FormatoNumero((inTotAsi - inTotMin), oCulturaLocal, true).toString() + ' min.');
    // Asignacion Masiva
    $("#txtCalculo").val(FormatoNumero(inTotAsi / inTotReg, oCulturaLocal, true));

    if (!flagPROCESADO) {
        if ((inTotAsi - inTotMin) < 0) {
            $("#dvFondoDisponible").css("background", "#FE2E2E");
            $("#lblDisponible").css("color", "white");
            $("#lblDisponible_").css("color", "#FE2E2E");

            Mensaje("<br/><h1>Advertencia, se ha sobrepasado la asignación de la bolsa</h1>", document, null);
        } else {
            $("#dvFondoDisponible").css("background", "white");
            $("#lblDisponible").css("color", "#8E236B");
            $("#lblDisponible_").css("color", "#8E236B");
        }
    }
}

//ASIGNAR VALORES
function VerAsignacion() {
    Evaluar_Asignar(0);

    $("#txt_AumentarCantidad").val("");
    $("#ch_5").prop("checked", false);
    $("#ch_AumentoPorcentual").prop("checked", false);

    var inwidth = 350;
    var inheight = 410; //375
    $("#lblEvaluarAsignar").attr("title", "Calcular Promedio : " + FormatoNumero(inTotAsi, oCulturaLocal, true).toString() + " Min. / " + FormatoNumero(inTotReg, oCulturaLocal, true).toString() + " Líneas");
    p_Fil_Importacion = "";

    $("#dvAsignar").dialog({
        title: "Asignar Valor",
        width: (inwidth),
        height: (inheight),
        modal: true,
        resizable: false,
        buttons: [{ text: "Aplicar", click: function () {
            //validar al menos una opción seleccionada
            if (!$('#ch_1').is(':checked') && !$('#ch_3').is(':checked') && !$('#ch_5').is(':checked') && !$('#ch_4').is(':checked') && !$('#ch_6').is(':checked')) {
                alerta("No ha seleccionado ninguna opción.");
                return;
            }

            if ($('#ch_1').is(':checked')) { //CANTIDAD FIJA
                var txtCanFija = $('#txt_CantidadFija').val();
                if (txtCanFija.length == 0) {
                    $('#txt_CantidadFija').focus();
                    alerta('Ingrese una cantidad fija');
                    return false;
                }
                if (txtCanFija < 0) {
                    $('#txt_CantidadFija').focus();
                    alerta('La cantidad no puede ser menor a cero');
                    return false;
                }
            } else if ($('#ch_3').is(':checked')) { //Consumo Real por Linea
                if (p_Fil_Importacion.length == 0) {
                    alerta('No ha seleccionado Periodos de consumo real', null, fnAbrirPeriodosImportados);
                    return;
                }
            }

            if ($('#ch_5').is(':checked')) {
                var nPorcen = 0;
                var nCant = $('#txt_AumentarCantidad').val();

                if ($('#ch_AumentoPorcentual').is(':checked')) {
                    nPorcen = 1;
                }
                if (nCant.length == 0) {
                    alerta('Cantidad de aumento incorrecto');
                    return false;
                }
                if (nCant <= 0) {
                    alerta('La cantidad debe ser mayor a cero');
                    return false;
                }
                if (nPorcen == 1) {
                    if (nCant <= 0 || nCant >= 101) {
                        alerta('La cantidad porcentual no está dentro del rango permitido');
                        return false;
                    }
                }
            }

            fnValidarDatosTemporales('AsignarValor');
        }
        }, { text: "Cerrar", click: function () {
            $("#dvAsignar").dialog("close");
            return false;
        }
        }],
        open: function (ev, ui) {
            flagCargaImport = true;
            p_Fil_Importacion = '';
            $("#txt_CantidadFija").focus();
            $("#txt_Historico").prop('disabled', true);
            $("#dwSigno").attr('disabled', true);
            $("#txt_AumentarCantidad").prop('disabled', true);
            $("#ch_AumentoPorcentual").prop('disabled', true);

            $("#lblPeriodosSeleccionados").text("");
            $("#lblPeriodosSeleccionados").attr("title", "");
        },
        close: function (ev, ui) {
            return false;
        }
    });
}

//ASIGNAR VALORES
function Asignar_Valores() {
    $("dvCargando").show();
    var dcNuevoValor = 0;
    var vcModo = "";
    var vcPeriodo = $("#hdfvcPeriodo").val();
    var vcCuenta = $("#hdfidCuenta").val();
    var vcSingo = "";
    var inPorcentual = 0;
    var dcCantAumentar = 0;

    //  APLICAR AUMENTO POR
    //if ($('#ch_5').is(':checked')) {
    //    vcModo = "AUMENTO";
    //}
    vcSingo = $('#dwSigno').val();
    if ($('#ch_5').is(':checked')) {
        dcCantAumentar = $('#txt_AumentarCantidad').val();
    }
    if ($('#ch_AumentoPorcentual').is(':checked')) {
        inPorcentual = 1;
    }

    //  PROMEDIO
    if ($('#ch_6').is(':checked')) {
        //var txtCanFija = $('#txt_CantidadFija').val();
        dcNuevoValor = $('#txtCalculo').val();
        dcNuevoValor = DevuelveNumeroSinFormato(dcNuevoValor, oCulturaLocal, true); //agreagdo 13-08-2015 wapumayta
        vcModo = "LINEA";

    }

    //  CANTIDAD FIJA
    if ($('#ch_1').is(':checked')) {
        var txtCanFija = $('#txt_CantidadFija').val();
        dcNuevoValor = DevuelveNumeroSinFormato(txtCanFija, oCulturaLocal, true); //agreagdo 13-08-2015 wapumayta
        vcModo = "LINEA";
    }
    // ====================================================================================================
    //  PROMEDIO HISTORICO DE LOS ULTIMOS N MESES
    // ====================================================================================================
    /*
    if ($('#ch_2').is(':checked')) {

    var nMeses = $('#txt_Historico').val();
    dcNuevoValor = nMeses;
    vcModo = "PROMEDIO";

    }*/
    // ====================================================================================================
    //  CONSUMO REAL 
    // ====================================================================================================

    // CONSUMO REAL POR LINEA
    if ($('#ch_3').is(':checked')) {
        flagCargaImport = true;

        var ArrayImport = p_Fil_Importacion.split(',');    
        dcNuevoValor = ArrayImport.length;
        vcModo = "IMPORTACION";
    }

    //CONSUMO ASIGNADO (DISTRUBION VIGENTE)
    if ($('#ch_4').is(':checked')) {
        dcNuevoValor = 0;
        vcModo = "ASIGNADO";
    }

    var p_vcFilLinea = '';
    var p_vcFilCC = '';
    var p_vcFilOrga = '';
    var p_vcFilNivel = '';
    var p_vcFilGrupo = '';

    var idModo = $("#ddlModo").val();
    var vcFiltro = $("#txtFiltro").val();

    if (idModo == '0') {
        p_vcFilLinea = vcFiltro;
    }
    if (idModo == '1') {
        p_vcFilCC = vcFiltro;
    }
    if (idModo == '2') {
        p_vcFilOrga = vcFiltro;
    }
    if (idModo == '3') {
        p_vcFilNivel = vcFiltro;
    }
    if (idModo == '4') {
        p_vcFilGrupo = vcFiltro;
    }

    var Asignar_Valores_Datos = {
        p_vcPeriodo: vcPeriodo,
        p_vcCodCue: vcCuenta,
        p_vcModo: vcModo,
        p_inCantidad: dcNuevoValor,
        p_vcSigno: vcSingo,
        p_inPorcentual: inPorcentual,
        p_inCantAumento: dcCantAumentar,
        p_vcCodInt2: (p_Fil_Codint2.length == 0 ? (p_PolOrga == '1' ? F_vcCodInt : '') : p_Fil_Codint2),
        p_SinEmpleado: ($('#chkTipCalcProm').is(':checked') == false ? '0' : '1'),
        P_Fil_Importacion: p_Fil_Importacion,
        vcGuidNom: $("#hdfGuidNomTabTemp").val()
    };
    //alerta(p_Fil_Importacion);
    $.ajax({
        type: "POST",
        url: "Conf_DistribucionMinutos.aspx/Asignar_Valores_Temp",
        data: JSON.stringify(Asignar_Valores_Datos),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            if (result.d == 0) {
                alerta("No se ha podido realizar una consulta a los datos de esta distribución, vuelva a intentarlo", "Error BD", oculta_pestana);
            }
            var vcModo = $("#ddlModo").val();
            fnDistribucionActualizada(true);
            if (vcModo == '0') {
                $("#tbLinea").trigger("reloadGrid");
            } else {
                $("#tbDistAgrup").trigger("reloadGrid");
            }
            $("dvCargando").hide();
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
    $("#dvAsignar").dialog("close");
}

//EVALUAR ASIGNAR
function Evaluar_Asignar(index) {
    if (index == 5) { //aplicar aumento
        $("#ch_5").prop("checked", false);
        if ($("#txt_AumentarCantidad").is(':disabled')) {
            $("#ch_5").prop("checked", true);

            $("#dwSigno").prop("disabled", false);
            $("#dwSigno").val("mas");
            $("#txt_AumentarCantidad").val("");
            $("#txt_AumentarCantidad").prop('disabled', false);
            $("#ch_AumentoPorcentual").prop('disabled', false);
            $("#ch_AumentoPorcentual").prop('checked', false);

            $("#txt_AumentarCantidad").focus();
        } else {
            //$("#ch_1").prop("checked", false);
            //$("#ch_3").prop("checked", false);
            //$("#ch_4").prop("checked", false);
            //$("#ch_6").prop("checked", false);

            $("#txt_CantidadFija").val("");
            $("#dwSigno").prop("disabled", true);
            $("#txt_CantidadFija").prop('disabled', true);
            $("#txtCalculo").prop('disabled', true);

            $("#btnPeriodosImportados").button("option", "disabled", true);

            $("#ch_AumentoPorcentual").prop('disabled', true);
            $("#txt_AumentarCantidad").prop('disabled', true);
        }
    } else {
        $("#ch_1").prop("checked", false);
        $("#ch_3").prop("checked", false);
        $("#ch_4").prop("checked", false);
        //$("#ch_5").prop("checked", false);
        $("#ch_6").prop("checked", false);

        $("#txt_CantidadFija").val("");

        $("#chkTipCalcProm").attr("disabled", true);
        if (p_PolOrga == '0') {
            $("#chkTipCalcProm").prop("checked", false);
            CalcPromedio();
        }        

        $("#txt_CantidadFija").prop('disabled', true);
        $("#txtCalculo").prop('disabled', true);

        $("#btnPeriodosImportados").button("option", "disabled", true);

        if (index == 11) {
            $("#ch_1").prop("checked", true);
            $("#txt_CantidadFija").prop('disabled', false);
            $("#txt_CantidadFija").val(parseInt(inTotAsi / inTotReg).toString());
            $("#txt_CantidadFija").focus();
            $("#txt_CantidadFija").select();
        }

        if (index == 1) {
            $("#ch_1").prop("checked", true);
            $("#txt_CantidadFija").prop('disabled', false);
            $("#txt_CantidadFija").focus();
        }

        if (index == 6) {
            $("#ch_6").prop("checked", true);
            if (p_PolOrga == '0') {
                $("#chkTipCalcProm").attr("disabled", false);
            }
        }

        if (index == 60) {
            if ($("#ch_6").is(':checked')) {
                $("#ch_6").prop("checked", false);
                $("#chkTipCalcProm").attr("disabled", true);
            } else {
                $("#ch_6").prop("checked", true);
                if (p_PolOrga == '0') {
                    $("#chkTipCalcProm").attr("disabled", false);
                }
            }
        }

        if (index == 10) {
            $("#txt_CantidadFija").val('');
            if ($("#ch_1").is(':checked')) {
                $("#ch_1").prop("checked", false);
                $("#txt_CantidadFija").prop('disabled', true);
            } else {
                $("#ch_1").prop("checked", true);
                $("#txt_CantidadFija").prop('disabled', false);
                $("#txt_CantidadFija").focus();
            }
        }

        if (index == 3 || index == 30) {
            var Valida_TablaPeriodo_DATA = { p_vcCriterio: 'TablaPeriodo' };
            $.ajax({
                type: "POST",
                url: "Conf_DistribucionMinutos.aspx/Valida_TablaPeriodo",
                data: JSON.stringify(Valida_TablaPeriodo_DATA),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {
                    if (result.d == 0) {
                        Mensaje("<br/><h1>No existen periodos importados</h1>", document, null);

                        $("#ch_1").prop("checked", true);
                        $("#txt_CantidadFija").prop('disabled', false);
                        $("#txt_CantidadFija").focus();
                        $("#btnPeriodosImportados").button("option", "disabled", true);
                    } else {
                        if (index == 3) {
                            $("#ch_3").prop("checked", true);
                            $("#btnPeriodosImportados").button("option", "disabled", false);
                        }

                        if (index == 30) {
                            if ($("#ch_3").is(':checked')) {
                                $("#ch_3").prop("checked", false);
                                $("#btnPeriodosImportados").button("option", "disabled", true);
                            } else {
                                $("#ch_3").prop("checked", true);
                                $("#btnPeriodosImportados").button("option", "disabled", false);
                            }
                        }
                        if ($("#ch_5").is(':checked')) { $("#txt_AumentarCantidad").focus(); }
                    }
                },
                error: function (xhr, err, thrErr) {
                    MostrarErrorAjax(xhr, err, thrErr);
                }
            });
        }

        if (index == 4 || index == 40) {
            var Valida_TablaPeriodo_Data = { p_vcCriterio: 'ValorAsignado' };
            $.ajax({
                type: "POST",
                url: "Conf_DistribucionMinutos.aspx/Valida_TablaPeriodo",
                data: JSON.stringify(Valida_TablaPeriodo_Data),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {
                    if (result.d == 0) {
                        Mensaje("<br/><h1>No hay valores asignados a líneas</h1>", document, null);

                        $("#ch_1").prop("checked", true);
                        $("#txt_CantidadFija").prop('disabled', false);
                        $("#txt_CantidadFija").focus();
                    } else {
                        if (index == 4) {
                            $("#ch_4").prop("checked", true);
                        }
                        if (index == 40) {
                            if ($("#ch_4").is(':checked')) {
                                $("#ch_4").prop("checked", false);
                            } else {
                                $("#ch_4").prop("checked", true);
                            }
                        }
                        if ($("#ch_5").is(':checked')) {
                            $("#txt_AumentarCantidad").focus();
                        }
                    }
                },
                error: function (xhr, err, thrErr) {
                    MostrarErrorAjax(xhr, err, thrErr);
                }
            });
        }
    }
}

//VER HISTORICO
function VerHistorico(p_vcCodLin) {
    $("#tbHistorico").jqGrid('clearGridData');
    var Listar_Historico_Data = {
        p_vcCodLin: p_vcCodLin,
        p_vcCodCue: $("#hdfidCuenta").val(),
        p_vcCodInt2: (p_Fil_Codint2.length == 0 ? (p_PolOrga == '1' ? F_vcCodInt : '') : p_Fil_Codint2) //F_vcCodInt
    };
    $.ajax({
        type: "POST",
        url: "Conf_DistribucionMinutos.aspx/Listar_Historico",
        data: JSON.stringify(Listar_Historico_Data),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            if ($(result.d).length > 0) {
                var i = 0;
                for (i = 0; i < $(result.d).length; i++) {
                    $("#tbHistorico").jqGrid('addRowData', result.d[i].vcPeriodo, result.d[i]);
                }
                $("#dvHistorico").dialog({
                    title: "Histórico de Línea : " + p_vcCodLin,
                    width: 405 + vWidthHistoricoLinea,
                    height: 180 + vHetghtHistoricoLinea,
                    resizable: false,
                    modal: true
                });
            } else {
                //Mensaje("<br/><h1>No tiene historial</h1>", document, null);
                alerta("Línea " + p_vcCodLin + " no tiene historial de distribución.");
            }
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
}

//Cerrar pestaña de edición
function oculta_pestana() {
    //if (flagEditable && $("#hdfGuidNomTabTemp").val() != '') {
    if (flagEditable && $("#hdfGuidNomTabTemp").val() != '' && bCambioPorGuardar) {
        confirmacion("Se perderán los cambios que no haya guardado. ¿Desea cerrar de todos modos?", fnOcultarPestana, null, "Confirmación Cierre");
    } else {
        fnOcultarPestana();
    }
}

function fnOcultarPestana() {
    $("#dvFilCanAsig").empty();
    $(tabOpciones).find('li:eq(1)').addClass('ui-state-hidden');
    tabOpciones.tabs('option', 'selected', 0);
    fnEliminarTablaTemporal();
    bCambioPorGuardar = false;
}

//====LISTADO=====\\
//VER DETALLE DE DISTRIBUCION
function Ver_Periodo(rowId) {
    if (flagEditable && $("#hdfGuidNomTabTemp").val() != '' && bCambioPorGuardar) {
        alerta("Hay una edición de periodo en proceso, guarde los cambios y cierre la edición para continuar.", null, fnMostrarTabEdicion);
        return;
    }
    RegistroActual = $("#tbPeriodo").jqGrid('getRowData', rowId);
    flagSeleccion = true;
    VerDetalle();
}

//Elimnar Periodo 
function fnEliminarPeriodo() {
    var Elimina_Periodo_Data = { idPeriodo: RegistroActual.P_inCodBolPer };
    $.ajax({
        type: "POST",
        url: "Conf_DistribucionMinutos.aspx/Elimina_Periodo",
        data: JSON.stringify(Elimina_Periodo_Data),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            $("#tbPeriodo").trigger("reloadGrid");
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
}

//Activar Periodo 
function Activar_periodo() {
    var Activar_Periodo_Data = { p_idPeriodo: RegistroActual.P_inCodBolPer };
    $.ajax({
        type: "POST",
        url: "Conf_DistribucionMinutos.aspx/Activar_Periodo",
        data: JSON.stringify(Activar_Periodo_Data),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            //vcValor_Estado = 1;
            //flagFiltro = false;
            
            //if (result.d == 1) {
            //    alerta("Registro Activado");
            //}
            if (result.d == -1) {
                alerta("Ya existe una distribución para la cuenta y el periodo.");
            } else if (result.d == -2) {
                alerta("No se encuentra el registro.");            
            }
            $("#btnActivar").button("option", "disabled", true);
            $("#tbPeriodo").trigger("reloadGrid");

            //$("#rbtnInactivos").prop("checked", false);
            //$("#rbtnActivos").prop("checked", true);
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
}

//CABECERA
function Cabecera() {
    //HISTORICO
    var tbHistorico = $("#tbHistorico").jqGrid({
        datatype: "local",
        colModel: [
            { name: 'P_vcNum', index: 'P_vcNum', label: 'Periodo', hidden: false, width: '70px', sortable: false, align: 'center', classes: 'ColumnGrillaLinea',
                formatter: function (value, options, rData) {
                    return "" + FormatoMesPeriodo(value);
                }
            },
            { name: 'Cuenta.dcMon', index: 'Cuenta.dcMon', label: 'Minutos Asignados', hidden: false, width: '80px', sortable: false, align: 'right',
                formatter: function (value, options, rData) {
                    return "" + parseFloat(rData.Cuenta.dcMon, 10).toFixed(1).replace(/(\d)(?=(\d{3})+\.)/g, "$1,").toString().replace('.0', '');
                }
            },
            { name: 'Cuenta.dcMonReal', index: 'Cuenta.dcMonReal', label: 'Minutos Consumidos', hidden: false, width: '80px', sortable: false, align: 'right',
                formatter: function (value, options, rData) {
                    return "" + parseFloat(rData.Cuenta.dcMonReal, 10).toFixed(1).replace(/(\d)(?=(\d{3})+\.)/g, "$1,").toString().replace('.0', '');
                }
            },
            { name: 'Cuenta.vcPorcentual', index: 'Cuenta.vcPorcentual', label: 'Consumido (%)', hidden: false, width: '80px', sortable: false, align: 'right',
                formatter: function (value, options, rData) {
                    return "" + parseFloat(rData.Cuenta.vcPorcentual, 10).toFixed(1).replace(/(\d)(?=(\d{3})+\.)/g, "$1,").toString().replace('.0', '');
                }
            }
        ],
        width: "400",
        height: "120",
        shrinkToFit: false,
        rownumbers: true,
        beforeSelectRow: function (rowid, status, e) {
            return false;
        },
        onRightClickRow: function () {
            tbHistorico.jqGrid('resetSelection');
            return false;
        }
    });

    //TABLA CREADA IMPORTACION
    var tbPeriodosCreados = $("#tbPeriodosCreados").jqGrid({
        datatype: "local",
        colModel: [
        //{ name: 'BolsaTabla', index: 'BolsaTabla', label: '.', hidden: false, width: '20px', sortable: false, align: 'center',
        //    formatter: function (value, options, rData) {
        //        //return "" + FormatoMesPeriodo(value) 
        //        return "<input onclick='PeriodoImportados(this,this.name);' class='Micheck_' id='ch_" + value + "' name='" + value + "' type ='checkbox' />"
        //        //return "<div  class='btnNormal' style='height:20px;width:80px;'><input id='ch_'"+value+"' type ='checkbox' /></div>  "
        //    }
        //},
                    {name: 'vcPeriodo', index: 'vcPeriodo', label: 'Periodo', hidden: false, width: '65px', sortable: false, align: 'left',
                    formatter: function (value, options, rData) {
                        return "&nbsp;" + FormatoMesPeriodo(value);
                    }
                },
                    { name: 'BolsaFecCre', index: 'BolsaFecCre', label: 'Importado', hidden: true, width: '80px', sortable: false, align: 'center' },
                    { name: 'BolsaFecMod', index: 'BolsaFecMod', label: 'Modificada', hidden: true, width: '90px', sortable: false, align: 'right' },
                    { name: 'BolsainLineas', index: 'BolsainLineas', label: 'Total Líneas', hidden: false, width: '50px', sortable: false, align: 'right' },
                    { name: 'BolsainServicios', index: 'BolsainServicios', label: 'Líneas con Consumo', hidden: false, width: '70px', sortable: false, align: 'right' },

   	                ],
        //sortname: "BolsaTabla", //Default SortColumn
        //sortorder: "asc", //Default SortOrder.
        width: "250",
        height: "170",
        shrinkToFit: false,
        rownumbers: false,
        multiselect: true,
        onSelectRow: function (rowid, status, e) {
            PeriodoImportados(status, rowid);
        },
        onSelectAll: function (aRowids, status) {
            p_Fil_Importacion = '';
            if (status) {
                var i = 0;
                for (i = 0; i < aRowids.length; i++) {
                    PeriodoImportados(status, aRowids[i]);
                }
            }
        }
    });
}

//LISTAR PERIODO 
function Lista_Periodo() {
    var tbColumns = [
        { name: 'vcEstProIcono', index: 'vcEstProIcono', label: '.', hidden: false, width: '27px', sortable: false, align: 'center',
            formatter: function (value, options, rData) {
                //return "  <label title='"+(rData[7] == "PROCESADO" ? rData[14] : rData[15])+"' for='" + rData[0] + "' style='color:" + (rData[7] == "PROCESADO" ? "#088A08" : "#B40404") + "'>" + rData[7] + "</label>  "
                //return " <img title='" + rData[7] + " - " + (rData[7] == "PROCESADO" ? rData[14] : rData[15]) + "' id='img_" + rData[0] + "' src='../../Common/Images/Semaforos/" + (rData[9] == 'False' ? "Ambar_16x16" : (rData[7] == "PROCESADO" ? "Rojo_16x16" : "Verde_16x16")) + ".png'> "
                //return " <img title='" + rData[7] + " - " + (rData[7] == "PROCESADO" ? rData[14] : rData[15]) + "' id='img_" + rData[0] + "' src='../../Common/Images/Mantenimiento/" + (rData[9] == 'False' ? "Ambar_16x16" : (rData[7] == "PROCESADO" ? "padlockredclose22x22" : "padlockgreenopen22x22")) + ".png'> "
                if (rData[7] == 69) { //pendiente
                    return " <img title='Creado - " + rData[15] + "' id='img" + rData[0] + "' src='../../Common/Images/Mantenimiento/edit_16x16.gif'/> ";
                } else if (rData[7] == 70) { //enviado
                    return " <img title='Enviado - " + rData[14] + "' id='img" + rData[0] + "' src='../../Common/Images/Mantenimiento/EnviarCorreo.png'/> ";
                } else if (rData[7] == 71) { //cerrado
                    return " <img title='Cerrado - " + rData[14] + "' id='img" + rData[0] + "' src='../../Common/Images/Mantenimiento/lock_16x16.png'/> ";
                } else if (rData[7] == 72) { //procesado
                    return " <img title='Procesado - " + rData[14] + "' id='img" + rData[0] + "' src='../../Common/Images/Mantenimiento/Procesar.png'/> ";
                } else {
                    return " <img title='Procesado - " + rData[14] + "' id='img" + rData[0] + "' src='../../Common/Images/Mantenimiento/Procesar.png'/> ";
                }
            }
        },
        { name: 'P_inCodBolPer', index: 'P_inCodBolPer', label: 'P_inCodBolPer', hidden: true, width: '70px', sortable: false, align: 'center',
            formatter: function (value, options, rData) {
                return "" + rData[0];
            }
        },
        { name: 'inPeriodo', index: 'inPeriodo', label: 'Periodo', hidden: false, width: '85px', sortable: true, align: 'left',
            formatter: function (value, options, rData) {
                return "<div title='Editar Distribución' id='" + options.rowId + "' onclick='Ver_Periodo(this.id);' class='btnNormal' style='height:20px;width:80px;'>" + FormatoMesPeriodo(rData[1]) + "</div>  ";
            }
        },
        { name: 'vcDescrip', index: 'vcDescrip', label: 'Descripción', hidden: true, width: '100px', sortable: false,
            formatter: function (value, options, rData) {
                return "" + rData[2];
            }
        },
        { name: 'vcNomOpe', index: 'vcNomOpe', label: 'Operador', hidden: false, width: '140px', sortable: true,
            formatter: function (value, options, rData) {
                return "" + rData[3];
            }
        },
        { name: 'F_vcCuenta', index: 'F_vcCuenta', label: 'Código Cuenta', hidden: false, width: '100px', sortable: true,
            formatter: function (value, options, rData) {

                return "" + rData[4];

            }
        },
        { name: 'vcNomCue', index: 'vcNomCue', label: 'Cuenta', hidden: false, width: '150px', sortable: true,
            formatter: function (value, options, rData) {

                return "" + rData[5];

            }
        },
        { name: 'vcNomTipDis', index: 'vcNomTipDis', label: 'Tipo Distribución.', hidden: false, width: '100px',
            formatter: function (value, options, rData) {
                return "" + rData[17];
            }
        },
        { name: 'inLineas', index: 'inLineas', label: 'Líneas', hidden: false, width: '60px', sortable: true, align: 'right',
            formatter: function (value, options, rData) {
                return "" + rData[6];
            }
        },
        { name: 'inLineasAsig', index: 'inLineasAsig', label: 'Líneas Asignadas', hidden: !vVisualizarLineasAsignadas, width: '60px', sortable: true, align: 'right',
            formatter: function (value, options, rData) {
                return "" + rData[25];
            }
        },
        { name: 'inLineasNoAsig', index: 'inLineasNoAsig', label: 'Líneas No Asignadas', hidden: !vVisualizarLineasAsignadas, width: '60px', sortable: true, align: 'right',
            formatter: function (value, options, rData) {
                return (parseInt(rData[6]) - parseInt(rData[25])).toString();
            }
        },
        { name: 'btEnviado', index: 'btEnviado', label: 'Enviado', hidden: true,
            formatter: function (value, options, rData) {
                return "" + rData[8];
            }
        },
        { name: 'vcModoDis', index: 'vcModoDis', label: 'Modo', hidden: true,
            formatter: function (value, options, rData) {
                return "" + rData[10];
            }
        },
        { name: 'inCanBolsa', index: 'inCanBolsa', label: 'Minutos por Cuenta Bolsa', hidden: true, width: '90px', sortable: true, align: 'right',
            formatter: function (value, options, rData) {
                //rData[11] = (rData[11].length==0?0:rData[11]);
                return "" + (rData[11] > 0 ? parseFloat(rData[11], 10).toFixed(1).replace(/(\d)(?=(\d{3})+\.)/g, "$1,").toString().replace('.0', '') : '0');
            }
        },
        { name: 'inCanUltAsig', index: 'inCanUltAsig', label: 'Minutos por Distribución', hidden: true, width: '90px', sortable: true, align: 'right',
            formatter: function (value, options, rData) {
                //rData[12] = (rData[12].length==0?0:rData[12]);
                return "" + (rData[12] > 0 ? parseFloat(rData[12], 10).toFixed(1).replace(/(\d)(?=(\d{3})+\.)/g, "$1,").toString().replace('.0', '') : '0');
            }
        },
        { name: 'Periodo', index: 'Periodo', label: 'Periodo', hidden: true,
            formatter: function (value, options, rData) {
                return "" + rData[13];
            }
        },
        { name: 'dtFecUsuMod', index: 'dtFecUsuMod', label: 'dtFecUsuMod', hidden: true,
            formatter: function (value, options, rData) {
                return "" + rData[14];
            }
        },
        { name: 'dtFecUsuCre', index: 'dtFecUsuCre', label: 'dtFecUsuCre', hidden: true,
            formatter: function (value, options, rData) {
                return "" + rData[15];
            }
        },
        { name: 'inPeriodo', index: 'inPeriodo', label: 'inPeriodo', hidden: true,
            formatter: function (value, options, rData) {
                return "" + rData[16];
            }
        },
        { name: 'btEst', index: 'btEst', label: 'btEst', hidden: true,
            formatter: function (value, options, rData) {
                return "" + rData[9];
            }
        },
        { name: 'inEstPro', index: 'inEstPro', label: 'inEstPro', hidden: true,
            formatter: function (value, options, rData) {
                return "" + rData[7];
            }
        },
        { name: 'vcEstPro', index: 'vcEstPro', label: 'Estado Proceso', hidden: false, width: '70px',
            formatter: function (value, options, rData) {
                return "" + rData[18];
            }
        },
        { name: 'inLinAltas', index: 'inLinAltas', label: 'Líneas Altas', hidden: false, width: '55px', sortable: true, align: 'right',
            formatter: function (value, options, rData) {
                return "" + rData[21];
            }
        },
        { name: 'inLinBajas', index: 'inLinBajas', label: 'Líneas Baja', hidden: false, width: '55px', sortable: true, align: 'right',
            formatter: function (value, options, rData) {
                return "" + rData[22];
            }
        },
        { name: 'inLinDistCero', index: 'inLinDistCero', label: 'Líneas Dist Cero', hidden: false, width: '60px', sortable: true, align: 'right',
            formatter: function (value, options, rData) {
                return "" + rData[23];
            }
        },
        { name: 'inCodSubCue', index: 'inCodSubCue', label: 'inCodSubCue', hidden: true, width: '55px', sortable: false, align: 'right',
            formatter: function (value, options, rData) {
                return "" + rData[24];
            }
        }
    ];

    var inNumRegistros = ($(window).height() - HeigthGrilla1);
    inNumRegistros = parseInt(inNumRegistros / 23);

    if (inNumRegistros <= 0) {
        inNumRegistros = 5;
    }

    var tbPeriodo = $("#tbPeriodo").jqGrid({
        sortable: false,
        width: ($(window).width() - WithPeriodo),
        height: ($(window).height() - HeigthPeriodo),
        datatype: function () {
            flagSeleccion = false;
            $("#btnCerrarDist").show();
            $("#btnVerDetalle").show();
            $("#btnImportar").show();

            var ddlFilPer = $('#ddlFiltroPeriodo').val();
            var vcFilPer = $('#txtFiltroPeriodo').val();

            var p_Fil_vcCodCuenta = '';
            var p_Fil_vcDesCuenta = '';
            var p_fil_inEstPro = -1;
            var p_Fil_vcDesOperador = '';
            var p_Fil_vcPeriodo = '';
            var p_Fil_inTipDis = -1;

            p_Fil_vcCodCuenta;
            p_Fil_vcDesCuenta;
            p_fil_inEstPro;
            p_Fil_vcDesOperador;
            p_Fil_vcPeriodo;
            p_Fil_inTipDis;

            if (ddlFilPer == 1) { p_Fil_vcCodCuenta = vcFilPer; }
            if (ddlFilPer == 2) { p_Fil_vcDesCuenta = vcFilPer; }
            if (ddlFilPer == 3) { p_fil_inEstPro = $("#ddlFiltroEstPro").val(); }
            if (ddlFilPer == 4) { p_Fil_vcDesOperador = vcFilPer; }
            if (ddlFilPer == 5) { p_Fil_vcPeriodo = vcFilPer; }
            if (ddlFilPer == 6) { p_Fil_inTipDis = $("#ddlFiltroTipDis").val(); }

            var Listar_Periodo_Data = { inPagTam: $('#tbPeriodo').getGridParam("rowNum"), //Tamaño de pagina
                inPagAct: parseInt($('#tbPeriodo').getGridParam("page")),
                vcCriterio1: $('#tbPeriodo').getGridParam("sortorder"),
                vcCriterio2: $('#tbPeriodo').getGridParam("sortname"),
                p_vcCodInt2: (p_PolOrga == '1' ? F_vcCodInt : ''),
                p_Fil_vcCodCuenta: p_Fil_vcCodCuenta,
                p_Fil_vcDesCuenta: p_Fil_vcDesCuenta,
                p_fil_inEstPro: p_fil_inEstPro,
                p_Fil_vcDesOperador: p_Fil_vcDesOperador,
                p_Fil_vcPeriodo: p_Fil_vcPeriodo,
                p_Fil_inTipDis: p_Fil_inTipDis,
                p_Fil_vcEstado: vcValor_Estado
            };
            $.ajax({
                type: "POST",
                url: "Conf_DistribucionMinutos.aspx/Listar_Periodo",
                data: JSON.stringify(Listar_Periodo_Data),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {
                    $("#tbPeriodo")[0].addJSONData(result.d);
                    //if (result.d.Items.length > 0) {
                    flagFiltro = true;
                    if (flagClose) {
                        $(tabOpciones).find('li:eq(1)').append('<span onclick="oculta_pestana();" class="ui-icon ui-icon-close">Remover Tab</span>');
                        flagClose = false;
                    }
                    //Lista_Grafico();
                    $(tabOpciones).find('li:eq(0)').removeClass('ui-state-hidden');
                    //} else {
                    //    if (flagFiltro) {
                    //        $("#dvCargando").hide();
                    //        $("#btnCerrarDist").hide();
                    //        $("#btnVerDetalle").hide();
                    //        $("#btnImportar").hide();
                    //        $(tabOpciones).find('li:eq(0)').addClass('ui-state-hidden');
                    //        NuevoPeriodo();
                    //    }
                    //}
                },
                error: function (xhr, err, thrErr) {
                    MostrarErrorAjax(xhr, err, thrErr);
                }
            });
        },
        jsonReader:
        {
            root: "Items", page: "PaginaActual", total: "TotalPaginas", records: "TotalRegistros", repeatitems: true, cell: "Row",
            id: "P_inCodBolPer"
        },
        colModel: tbColumns,
        pager: "#pagerPeriodo",
        loadtext: 'Cargando datos...',
        recordtext: "{0} - {1} de {2} elementos",
        emptyrecords: 'No hay resultados',
        pgtext: 'Pág: {0} de {1}',
        rowNum: inNumRegistros,
        rowList: [(inNumRegistros), (inNumRegistros * 2), (inNumRegistros * 3)],
        viewrecords: true,
        caption: "Periodos",
        rownumbers: true,
        shrinkToFit: false,
        ondblClickRow: function () {
            VerDetalle();
        },
        onSelectRow: function (id) {
            RegistroActual = $("#tbPeriodo").jqGrid('getRowData', id);
            flagSeleccion = true;

            if (RegistroActual.btEst == 'False') {
                if (p_esAdmin == "1" || p_esResp == "1") {
                    $("#btnActivar").button("option", "disabled", false);
                }
                $("#btnGenerarCopia").button("option", "disabled", true);
                $("#btnEnviar").button("option", "disabled", true);
                $("#btnCerrarDist").button("option", "disabled", true);
            } else {
                $("#btnActivar").button("option", "disabled", true);
                if (p_esAdmin == "1" || p_esResp == "1") {
                    $("#btnGenerarCopia").button("option", "disabled", false);
                    $("#btnEnviar").button("option", "disabled", false);
                    $("#btnCerrarDist").button("option", "disabled", false);
                }
            }

            //if (RegistroActual.inEstPro == 69) { //estado pendiente, listo para enviar
            //    $("#btnEnviar").button("option", "disabled", false);
            //} else {
            //    $("#btnEnviar").button("option", "disabled", true);
            //}
        },
        gridComplete: function () {
            $(".btnNormal").button();
        },
        afterInsertRow: function (rowid, aData, rowelem) {
            //if (aData.inCanBolsa == 'False') {
            if (rowelem[9] == 'False') {
                var colModels = $("#tbPeriodo").getGridParam("colModel");
                for (i in colModels) {
                    $("#tbPeriodo").jqGrid('setCell', rowid, i, '', { color: 'red' });
                }
            }
        }
    }).navGrid("#pagerPeriodo", { edit: false, add: false, search: false, del: false });

    $("#tbPeriodo").closest(".ui-jqgrid").find(".ui-jqgrid-titlebar>.ui-jqgrid-titlebar-close>.ui-icon-circle-triangle-n").removeClass("ui-icon ui-icon-circle-triangle-n");
}

//COPIA PERIODO
function Copia_Periodo() {
    var Copia_Periodo_Data = {
        p_vcPeriodoNuevo: $("#txtPeriodoCopiar").val(),
        p_vcPeriodo: RegistroActual.Periodo,
        p_vcCuenta: RegistroActual.F_vcCuenta
    };
    $.ajax({
        type: "POST",
        url: "Conf_DistribucionMinutos.aspx/Copia_Periodo",
        data: JSON.stringify(Copia_Periodo_Data),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            if (result.d == '1') {
                $("#tbPeriodo").trigger("reloadGrid");
                flagSeleccion = false;
            } else {
                alerta("No se ha podido generar la copia por que la distribución selecciona no es válida.");
            }
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
}

function FormatoMesPeriodo(p_vcNomPeriodo) {
    var inMes = p_vcNomPeriodo.substring(0, 2);
    var vcMes = '';
    if (inMes == '01') { vcMes = 'ENE'; }
    if (inMes == '02') { vcMes = 'FEB'; }
    if (inMes == '03') { vcMes = 'MAR'; }
    if (inMes == '04') { vcMes = 'ABR'; }
    if (inMes == '05') { vcMes = 'MAY'; }
    if (inMes == '06') { vcMes = 'JUN'; }
    if (inMes == '07') { vcMes = 'JUL'; }
    if (inMes == '08') { vcMes = 'AGO'; }
    if (inMes == '09') { vcMes = 'SET'; }
    if (inMes == '10') { vcMes = 'OCT'; }
    if (inMes == '11') { vcMes = 'NOV'; }
    if (inMes == '12') { vcMes = 'DIC'; }
    return p_vcNomPeriodo.replace(inMes, vcMes).replace('/', '-');
}
//#endregion

//#region FUNCIONES MEOJRAS
function VerHistorialPeriodo() {
    $("#tbPeriodosCreados").jqGrid('clearGridData');
    var Listar_TablaPeriodo_Data = { p_vcCriterio: '' };
    $.ajax({
        type: "POST",
        url: "Conf_DistribucionMinutos.aspx/Listar_TablaPeriodo",
        data: JSON.stringify(Listar_TablaPeriodo_Data),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {            
            if ($(result.d).length > 0) {
                flagCargaImport = false;
                var i = 0;
                for (i = 0; i < $(result.d).length; i++) {
                    if (result.d[i].BolsainServicios > 0) {
                        $("#tbPeriodosCreados").jqGrid('addRowData', result.d[i].vcPeriodo, result.d[i]);
                    }
                }
            }
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
    // ====================================================================================================
    //  POPUP
    // ====================================================================================================
    /*
    $("#dvPeriodosCreados").dialog({
    title: "Tablas creadas por Periodo ",
    width: 500,
    height: 290,
    modal: true,

    buttons: [{ text: "Cerrar", click: function () {

            
    $("#dvPeriodosCreados").dialog("close");
    }
    }],
    close: function (ev, ui) {

    }
    });
    */

    // ====================================================================================================
    //  END LOAD
    // ====================================================================================================
}
//#endregion

function isNumberKey(evt) {
    var charCode = (evt.which) ? evt.which : event.keyCode;
    if (charCode > 31 && (charCode < 47 || charCode > 57)) {
        return false;
    }
    return true;
}

function OnFocusOutForm(event) {
    //if (event.srcElement.className == 'MiTxt') {
    //    flagENTER = false;
    //    Guarda_Linea(event.srcElement.value, event.srcElement.name, event.srcElement);
    //}
    //if (event.srcElement.className == 'MiTxtDet') {
    //    flagENTER = false;
    //    Guarda_DetalleLinea(event.srcElement.value, event.srcElement.name, event.srcElement);
    //} 
}

//PERIODO importado
function PeriodoImportados(status, p_vcNomPerImp) {
    if (status) {
        if (p_Fil_Importacion.length == 0) {
            //p_Fil_Importacion = '*' + p_vcNomPerImp + '*';
            p_Fil_Importacion = p_vcNomPerImp;
        } else {
            p_Fil_Importacion = p_Fil_Importacion + ',' + p_vcNomPerImp;
        }
    } else {
        var ArrayImport = p_Fil_Importacion.split(',');
        var vcNuevoFil = '';
        var i = 0;
        for (i = 0; i < ArrayImport.length; i++) {
            if (ArrayImport[i] != p_vcNomPerImp) {
                if (vcNuevoFil.length == 0) {
                    vcNuevoFil = ArrayImport[i];
                } else {
                    vcNuevoFil = vcNuevoFil + "," + ArrayImport[i];
                }
            }
        }
        p_Fil_Importacion = vcNuevoFil;
    }
}

//NUEVOS
function fnEditarTipoDistribucion() {
    $("#txtNombreTipDisAct").val($("#txtTipoDist").val());
    $("#dvEditTipoDistribucion").dialog({
        title: "Editar Tipo de Distribución",
        width: 350,
        height: 200,
        modal: true,
        resizable: false,
        buttons: [
            { text: "Aplicar", click: function () {
                var idNewTipDis = $("#ddlEditTipoDist").val();
                var vcNewTipDis = $("#ddlEditTipoDist option:selected").text();
                var idModo = $("#ddlModo").val();
                if (idNewTipDis == $("#hdfidTipoDis").val()) {
                    alerta("Debe seleccionar un tipo de distribución deferente del actual.");
                    return;
                }

                $("#ddlModo").html('');
                $("#ddlModo").append($("<option></option>").val(0).text('Línea'));
                $("#ddlModo").append($("<option></option>").val(idNewTipDis).text(vcNewTipDis));

                if (idModo == "0") {
                    $("#ddlModo").val(0);
                } else {
                    $("#ddlModo").val(idNewTipDis);
                }

                $("#txtTipoDist").val(vcNewTipDis);
                $("#hdfidTipoDis").val(idNewTipDis);

                Carga_Modo();
                fnDistribucionActualizada(true);

                $(this).dialog("close");
            }
            }, { text: 'Cancelar', click: function () {
                $(this).dialog("close");
            }
            }
        ],
        close: function (ev, ui) { //CambiaCuenta(); 

        }
    });
}

function Listar_DistribucionAgrupada(p_vcCodCue, p_vcper, p_vcBus, p_inTipDis) {
    var tbColumns = [
        { name: 'vcCodigo', index: 'vcCodigo', label: 'Código', hidden: false, width: '100px', sortable: false, align: 'center', classes: 'ColumnGrillaLinea',
            formatter: function (value, options, rData) {
                return "" + (rData[0] == '-1' || rData[0] == '-2' ? '' : rData[0]);
            }
        },
        { name: 'vcDescripcion', index: 'vcDescripcion', label: 'Descripción', hidden: false, width: '300px', sortable: false, classes: 'ColumnGrillaLinea',
            formatter: function (value, options, rData) {
                return " <a href='#' name='" + rData[0] + "' id='" + rData[1] + "' onClick='VerDetalleLineas(this.name, this.id);' title='Ver Detalle Líneas' >" + rData[1] + " </a> ";
            }
        },
        { name: 'inNumLin', index: 'inNumLin', label: 'Líneas', hidden: false, width: '80px', sortable: false, align: 'right',
            formatter: function (value, options, rData) {
                return "" + rData[3];
            }
        },
        { name: 'dcMonAsig', index: 'dcMonAsig', label: 'Minutos Asignado', hidden: false, width: '95px', sortable: false, align: 'right',
            formatter: function (value, options, rData) {
                return "" + parseInt(rData[4]);
            }
        },
        { name: 'dcMonReal', index: 'dcMonReal', label: 'Minutos Consumido', hidden: false, width: '80px', sortable: false, align: 'right',
            formatter: function (value, options, rData) {
                return "" + parseInt(rData[5]);
            }
        },
        { name: 'dcMon', index: 'dcMon', label: 'Asignar por Línea', hidden: false, width: '65px', sortable: false, align: 'center', classes: 'ColumnGrillaLlamadas',
            formatter: function (value, options, rData) {
                if (flagEditable) {
                    return "  <input class='SaveAgrup' title='Última Actualización : " + rData[7] + "' id='" + rData[3] + "' onClick='this.select();' name='" + rData[0] + "' type='text' value='0' style='width:50px;text-align:right;' maxlength='4'> ";
                } else {
                    return " - "; //+ rData.Cuenta.dcMon;
                }
            }
        },
        { name: 'dcMon', index: 'dcMon', label: '.', hidden: true, width: '30px', sortable: false, align: 'center',
            formatter: function (value, options, rData) {
                return " <a href='#' name='" + rData[0] + "' onClick='VerHistorico(this.name);' title='Ver Historico' ><img src='../../Common/Images/Mantenimiento/VerDetalle.png' ></a> ";
            }
        },
        { name: 'dcMonReal', index: 'dcMonReal', label: 'Minutos por Tip Dist', hidden: false, width: '90px', sortable: false, align: 'right',
            formatter: function (value, options, rData) {
                return "" + parseInt(rData[6]);
            }
        },
        { name: 'numLinAlta', index: 'numLinAlta', label: 'Altas', hidden: true, width: '40px', sortable: false, align: 'center',
            formatter: function (value, options, rData) {
                return "" + rData[8];
            }
        },
        { name: 'numLinBaja', index: 'numLinBaja', label: 'Bajas', hidden: true, width: '40px', sortable: false, align: 'center',
            formatter: function (value, options, rData) {
                return "" + rData[9];
            }
        }
    ];

    var inNumRegistros = ($(window).height() - HeigthGrilla1);
    inNumRegistros = parseInt(inNumRegistros / 23);

    var vCaption;
    switch ($("#hdfidTipoDis").val()) {
        case "1": //Centro de Costo
            vCaption = "Centro de Costos (presionar ENTER para guardar)";
            break;
        case "2": //Area
            vCaption = "Area (presionar ENTER para guardar)";
            break;
        case "3": //Nivel
            vCaption = "Nivel (presionar ENTER para guardar)";
            break;
        case "4": //Grupo Empleado    
            vCaption = "Grupo Empleados (presionar ENTER para guardar)";
            break;
        default:
    }

    var tbDistAgrup = $("#tbDistAgrup").jqGrid({
        width: ($(window).width() - WithGrilla1),
        height: ($(window).height() - HeigthGrilla1),
        datatype: function () {
            var Lista_Agrup_Data = { inPagTam: $('#tbDistAgrup').getGridParam("rowNum"), //Tamaño de pagina
                inPagAct: parseInt($('#tbDistAgrup').getGridParam("page")),
                vcVal: '',
                CodCue: $("#hdfidCuenta").val(),
                vcPer: $("#hdfvcPeriodo").val(),
                vcBus: $("#txtFiltro").val(),
                p_flagOmitir: (p_PolOrga == "1" ? true : $('#chOmitir').is(':checked')).toString(),
                p_vcCodInt2: (p_Fil_Codint2.length == 0 ? (p_PolOrga == '1' ? F_vcCodInt : '') : p_Fil_Codint2),
                vcGuidNom: $("#hdfGuidNomTabTemp").val(),
                inTipDis: $("#hdfidTipoDis").val(),
                inCodBolPer: $("#hdfidPeriodo").val()
            };

            $.ajax({
                type: "POST",
                url: "Conf_DistribucionMinutos.aspx/Lista_dtAgrup",
                data: JSON.stringify(Lista_Agrup_Data),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {
                    $("#tbDistAgrup")[0].addJSONData(result.d[0]);
                    ActualizarTotal(result.d[1]);
                },
                error: function (xhr, err, thrErr) {
                    MostrarErrorAjax(xhr, err, thrErr);
                }
            });
        },
        jsonReader: { root: "Items", page: "PaginaActual", total: "TotalPaginas", records: "TotalRegistros", repeatitems: true, cell: "Row", id: "P_vcNum" },
        colModel: tbColumns,
        pager: "#pagerDistAgrup",
        loadtext: 'Cargando datos...',
        recordtext: "{0} - {1} de {2} elementos",
        emptyrecords: 'No hay resultados',
        pgtext: 'Pág: {0} de {1}', //Paging input control text format.
        rowNum: inNumRegistros,
        rowList: [(inNumRegistros), (inNumRegistros * 2), (inNumRegistros * 3)],
        viewrecords: true,
        caption: vCaption,
        rownumbers: true,
        shrinkToFit: false,
        beforeSelectRow: function (rowid, status, e) {
            return false;
        },
        onRightClickRow: function () {
            tbDistAgrup.jqGrid('resetSelection');
            return false;
        },
        afterInsertRow: function (rowid, aData, rowelem) {
            var vStyleCol;
            if (parseInt(rowelem[9]) > 0) { //lineas de baja
                //vStyleCol = 'ui-state-error-text';
                vStyleCol = 'ColumnaLineaBaja';
                //$("#dvAccionBajas").show();
            } else if (parseInt(rowelem[8]) > 0) { //lineas de alta
                //vStyleCol = { color: 'blue' };
                vStyleCol = 'ColumnaLineaAlta';
            }
            var colModels = $("#tbDistAgrup").getGridParam("colModel");
            for (i in colModels) {
                if (i > 0) {
                    $("#tbDistAgrup").jqGrid('setCell', rowid, i, '', vStyleCol);
                }
            }
        }
    }).navGrid("#pagerDistAgrup", { edit: false, add: false, search: false, del: false });

}

function Guardar_Agrupacion_Msj(inValue, vcCod) {
    vcValor_caja = inValue;
    vcCodigo_caja = vcCod;
    if (inValue == 0) {
        confirmacion("Valor ingresado es cero. ¿Desea continuar?", Guardar_Agrupacion, null, "Confirmación");
    } else {
        Guardar_Agrupacion();
    }
}

function Guardar_Agrupacion() {
    var Guardar_TipoDistribucion_Tmp_Data = {
        p_vcPeriodo: $("#hdfvcPeriodo").val(),
        p_vcCuenta: $("#hdfidCuenta").val(),
        p_dcCan: vcValor_caja,
        vcCodDis: vcCodigo_caja == '' ? -1 : vcCodigo_caja,
        inTipDis: $("#hdfidTipoDis").val(),
        p_IdUsuario: 0,
        vcGuidNom: $("#hdfGuidNomTabTemp").val(),
        bUpdLinExcep: false //no actualiza las lineas exceptuadas
    };
    $.ajax({
        type: "POST",
        url: "Conf_DistribucionMinutos.aspx/Guardar_TipoDistribucion_Tmp",
        data: JSON.stringify(Guardar_TipoDistribucion_Tmp_Data),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            if (result.d == '0') {
                alerta("No se ha podido guardar los cambios de esta distribución, vuelva a intentarlo", "Error BD", oculta_pestana);
            } else if (result.d == '1') {
                Filtra_Data(parseInt($('#tbLinea').getGridParam("page")));
            } else {
                alerta("Error Desconocido", "Error Desconocido", null);
            }
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
}

function fnCrearTablaTemporal(vcModo, idCue, vcPer, codBolPer) {
    var CrearTablaTemporalEdicion_Data = {
        p_vcCodCue: $("#hdfidCuenta").val(),
        p_IdPeriodo: $("#hdfvcPeriodo").val(),
        p_inCodBolPer: codBolPer,
        vcGuidNom: $("#hdfGuidNomTabTemp").val()
    };
    $.ajax({
        type: "POST",
        url: "Conf_DistribucionMinutos.aspx/CrearTablaTemporalEdicion",
        data: JSON.stringify(CrearTablaTemporalEdicion_Data),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            if (result.d != '') {
                $("#hdfGuidNomTabTemp").val(result.d);
                if (vcModo != 0) {
                    $("#dvDistAgrup").show();
                    if ($('#tbDistAgrup').getGridParam("rowNum") == null) {
                        Listar_DistribucionAgrupada(idCue, vcPer, '', vcModo);
                    } else {
                        $("#tbDistAgrup").trigger("reloadGrid");
                        fnActualizarCaptionGridAgrup(vcModo);
                    }
                } else {
                    $("#chOmitir").attr("title", "Omitir líneas sin empleado asociado");
                    $("#dvLinea").show();
                    if ($('#tbLinea').getGridParam("rowNum") == null) {
                        Listar_Linea("", "", "", "", 1);
                    } else {
                        $("#tbLinea").trigger("reloadGrid");
                    }
                }
            } else {
                alerta("Ha ocurrido un error al intentar consultar la distribución, vuelva a intertarlo.", "Error BD", oculta_pestana);
            }
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
}

function fnEliminarTablaTemporal() {
    var EliminarTablaTemporal_Data = { p_vcCodCue: $("#hdfidCuenta").val().toString(),
        p_IdPeriodo: $("#hdfvcPeriodo").val().toString(),
        vcNomGuid: $("#hdfGuidNomTabTemp").val().toString()
    };
    $.ajax({
        type: "POST",
        url: "Conf_DistribucionMinutos.aspx/EliminarTablaTemporal",
        data: JSON.stringify(EliminarTablaTemporal_Data),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            $("#hdfGuidNomTabTemp").val('');
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
}

function fnActualizarDistribucionDetalle() {
    var ActualizarDistribucionDetalle_Data = {
        vcCodCue: $("#hdfidCuenta").val(),
        vcPeriodo: $("#hdfvcPeriodo").val(),
        inTipDis: $("#hdfidTipoDis").val(),
        vcGuidNom: $("#hdfGuidNomTabTemp").val(),
        inCodBolPer: $("#hdfidPeriodo").val(),
        inCodSubCue: $("#hdfidSubCuenta").val()
    };

    $.ajax({
        type: "POST",
        url: "Conf_DistribucionMinutos.aspx/ActualizarDistribucionDetalle",
        data: JSON.stringify(ActualizarDistribucionDetalle_Data),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            if (result.d == 1) {
                alerta("Todos los cambios han sido guardados", null, Filtra_Data);
                $("#tbPeriodo").trigger("reloadGrid");
                fnDistribucionActualizada(false);
            } else if (result.d == 0) {
                alerta("No se ha podido guardar los cambios de esta distribución, vuelva a intentarlo", "Error BD", oculta_pestana);
            } else {
                alerta("Error al actualizar");
            }
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
}

function fnValidarDatosTemporales(vcEvent) {    
    var ValiddDatosTemporales_Data = {
        vcGuidNom: $("#hdfGuidNomTabTemp").val(),
        vcCodCue: $("#hdfidCuenta").val(),
        vcPeriodo: $("#hdfvcPeriodo").val()
    };
    $.ajax({
        type: "POST",
        url: "Conf_DistribucionMinutos.aspx/ValiddDatosTemporales",
        data: JSON.stringify(ValiddDatosTemporales_Data),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            if (result.d[0] == "0") {
                alerta("No se ha podido realizar una consulta a los datos de esta distribución, vuelva a intentarlo", "Error BD", oculta_pestana);
            } else {
                var vMensajeConfirm = '';
                var vTitutloConfirm = 'Guardar Distribución';
                if (vcEvent == 'Guardar') {
                    if (result.d[2] != "0") { //lineas de baja
                        vMensajeConfirm = "Se ha(n) detectado " + result.d[2].toString() + " línea(s) en estado de baja. No puede guardar una distribución con líneas en estado de baja.";
                        alerta(vMensajeConfirm, "Alerta " + vTitutloConfirm, null);
                    } else if (result.d[1] != "0") { //lineas dist cero
                        vMensajeConfirm = "Se ha(n) detectado " + result.d[1].toString() + " línea(s) con una asignación igual a cero (0). ¿Desea continuar?.";
                        confirmacion(vMensajeConfirm, fnActualizarDistribucionDetalle, null, "Confirmación " + vTitutloConfirm);
                    } else {
                        fnActualizarDistribucionDetalle();
                    }
                } else if (vcEvent == 'AsignarValor') {
                    if (result.d[2] != "0") { //lineas de baja
                        vMensajeConfirm = "Se ha(n) detectado " + result.d[2].toString() + " línea(s) en estado de baja. No puede guardar una distribución con líneas en estado de baja.";
                        alerta(vMensajeConfirm, "Alerta " + vTitutloConfirm, null);
                    } else {
                        confirmacion("El cambio se aplicará a todas las líneas. ¿Está seguro de continuar?", Asignar_Valores, null, "Se requiere confirmación");
                    }
                }
            }
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
}

function fnQuitarLinea_Confirm(vcCodLin) {
    $("#hdfLineaQuitar").val(vcCodLin);
    confirmacion("¿Desea quitar la línea " + vcCodLin + " de la distribución?", fnQuitarLinea, null, "Confirmación");
}

function fnQuitarLinea() {
    var QuitarLinea_DistTemp_Data = {
        vcGuidNom: $("#hdfGuidNomTabTemp").val(),
        vcCodNum: $("#hdfLineaQuitar").val()
    };
    $.ajax({
        type: "POST",
        url: "Conf_DistribucionMinutos.aspx/QuitarLinea_DistTemp",
        data: JSON.stringify(QuitarLinea_DistTemp_Data),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            if (result.d == "0") { //tabla temporal no existe
                alerta("No se ha podido realizar una consulta a los datos de esta distribución, vuelva a intentarlo", "Error BD", oculta_pestana);
            } else if (result.d == '-1') { //linea no tiene un estado de baja
                alerta("Línea no está en estado de baja.", "Error de consulta", null);
            } else if (result.d == '1') { //se quitó línea de tabla temporal
                $("#tbLinea").trigger("reloadGrid");
                $("#tbLineaDetalle").trigger("reloadGrid");
                fnDistribucionActualizada(true);
            }
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
}

function CalcPromedio() {
    var vEstCalc = $("#chkTipCalcProm").is(":checked");
    if (vEstCalc) {
        $("#txtCalculo").val(FormatoNumero(inTotAsi / inTotReg_OmitSinEmp, oCulturaLocal, true));
        $("#lblEvaluarAsignar").attr("title", "Calcular Promedio: " + FormatoNumero(inTotAsi, oCulturaLocal, true).toString() + " Min. / " + FormatoNumero(inTotReg_OmitSinEmp, oCulturaLocal, true).toString() + " Líneas");
    } else {
        $("#txtCalculo").val(FormatoNumero(inTotAsi / inTotReg, oCulturaLocal, true));
        $("#lblEvaluarAsignar").attr("title", "Calcular Promedio: " + FormatoNumero(inTotAsi, oCulturaLocal, true).toString() + " Min. / " + FormatoNumero(inTotReg, oCulturaLocal, true).toString() + " Líneas");
    }
}

function MostrarLineasExceptuadas() {
    if ($('#tbLinea').getGridParam("rowNum") == null) {
        Listar_Linea("", "", "", "", 1);
    } else {
        $("#tbLinea").trigger("reloadGrid");
    }
}

function fnEnviarAlOperador() {
    var EnviarAlOperador_Data = {
        inColBolPer: RegistroActual.P_inCodBolPer,
        vcCodCue: RegistroActual.F_vcCuenta,
        vcPeriodo: RegistroActual.Periodo,
        CodInt2: ""
    };

    $.ajax({
        type: "POST",
        url: "Conf_DistribucionMinutos.aspx/EnviarAlOperador",
        data: JSON.stringify(EnviarAlOperador_Data),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            if (result.d != '-1') {
                $("#tbPeriodo").trigger("reloadGrid");
                window.location.href = raiz("Common/Controladores/DescargarArchivo.ashx?archivo=Common/Images/Temporal" + CarpetaDominio + "/" + result.d);
            } else {
                alerta("Error al enviar al operador");
            }
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
}

function fnCerrarDistribucion() {
    var CerrarDistribucion_Data = {
        inCodBolPer: RegistroActual.P_inCodBolPer,
        vcCueCue: RegistroActual.F_vcCuenta,
        vcPeriodo: RegistroActual.Periodo
    };
    $.ajax({
        type: "POST",
        url: "Conf_DistribucionMinutos.aspx/CerrarDistribucion",
        data: JSON.stringify(CerrarDistribucion_Data),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            if (result.d = '1') {
                alerta("La distribución a sido cerrada");
                $("#tbPeriodo").trigger("reloadGrid");
            } else {
                alerta("Error al cerrar la distribución");
            }
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
}

function fnActualizarLeyenda(vcModo) {
    if (vcModo != 0) { //tipo distribucion
        $("#lblLeyendaAlta").text("Contiene al menos una línea nueva");
        $("#lblLeyendaBaja").text("Contiene al menos una línea en estado de baja");
        $("#dvLeyendaDifDist").hide();
        $("#lblLeyendaDifDist").text("");
    } else { //linea
        $("#lblLeyendaAlta").text("Línea nueva");
        $("#lblLeyendaBaja").text("Línea en estado de baja");
        $("#dvLeyendaDifDist").show();
        $("#lblLeyendaDifDist").text("Línea con diferente distribución");
    }
}

function fnActualizarCaptionGridAgrup(vcModo) {
    if (parseInt(vcModo) != 0) {
        switch (parseInt(vcModo)) {
            case 1: //Centro de Costo
                $("#tbDistAgrup").setCaption('Centro de Costos (presionar ENTER para guardar)');
                break;
            case 2: //Area
                $("#tbDistAgrup").setCaption('Area (presionar ENTER para guardar)');
                break;
            case 3: //Nivel
                $("#tbDistAgrup").setCaption('Nivel (presionar ENTER para guardar)');
                break;
            case 4: //Grupo Empleado    
                $("#tbDistAgrup").setCaption('Grupo Empleados (presionar ENTER para guardar)');
                break;
        }
        
    }
}

function fnSetDimensionDialog() {
    $.browser.chrome = /chrom(e|ium)/.test(navigator.userAgent.toLowerCase());
    $.browser.msie = /msie/.test(navigator.userAgent.toLowerCase());
    $.browser.mozilla = /firefox/.test(navigator.userAgent.toLowerCase());
    if ($.browser.chrome) {
        //
    } else if ($.browser.mozilla) {
        vHeightDetalleCuenta = 5;
        vHeightDetalleLinea = 8;
        vHetghtHistoricoLinea = 8;
    } else if ($.browser.msie) {
        vHeightDetalleCuenta = 5;
        vHetghtHistoricoLinea = 3;
    }
}

function fnDistribucionActualizada(e) {
    bCambioPorGuardar = e;
    if (flagEditable) {
        if (bCambioPorGuardar) {
            $("#btnGuardarEditar").button("option", "disabled", false);
        } else {
            $("#btnGuardarEditar").button("option", "disabled", true);
        }
    }
}

function ActualizarFiltroCantidadAsignada(c) {
    if (c == '') {
        $("#dvFilCanAsig").empty();
    } else {
        $("#dvFilCanAsig").html('FILTRO: Cantidad distribuida menor o igual a ' + c);
    }
}

function fnAbrirPeriodosImportados() {
    $("#btnPeriodosImportados").click();
}

function fnAbrirDetalleCuenta() {
    $("#imgDetCuenta").click();
}

function fnMostrarTabEdicion(){
    tabOpciones.tabs('option', 'selected', 1);
}
