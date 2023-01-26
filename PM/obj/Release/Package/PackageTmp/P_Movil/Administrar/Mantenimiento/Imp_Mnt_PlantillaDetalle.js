var tabOpciones;
var tabOpcionesResumen;
var lstPlantillas = [];
//(function ($) {
//    $.fn.hasScrollBar = function () {
//        return this.get(0).scrollHeight > this.height();
//    }
//})(jQuery);

function ObtienePlantillaDetalle(NumeroHoja) {
    var PlanDetalle = new ENT_MOV_IMP_PlantillaDetalle();

    if ($("#hdfPlanDetalle").val() == "") {
        PlanDetalle.P_inCodPlaDet = "-1";
    }
    else {
        PlanDetalle.P_inCodPlaDet = $("#hdfPlanDetalle").val();
    }
    //-------------------------------PRINCIPAL-------------------------------
    PlanDetalle.inNumHojCal = parseInt(NumeroHoja) + 1;
    PlanDetalle.vcPla = $("#lblPlan").html();

    //-----------------------------------------------------------------------
    //--------------------------------GENERAL--------------------------------
    if ($("#rdTipPla_0").is(':checked')) {
        PlanDetalle.btTipCam = $('#chkTipoCambio').is(':checked');
    } else if ($("#rdTipPla_0").is(':checked')) {
        //ECONDEÑA  27/02/215
        PlanDetalle.btTipCam = $('#chkTipoCambioRes').is(':checked');
    }

    PlanDetalle.btAgrCerDDNDDI = $('#chkAgregarCeroDDNDDI').is(':checked');
    PlanDetalle.vcExtDef = $("#txtExtensionDefecto").val();
    PlanDetalle.btSerCam = $('#chkServicioCampo').is(':checked');

    // ===================================================================================
    //  HINOPE  
    // ===================================================================================

    PlanDetalle.inTipPla = ($('#rdTipPla_0').is(':checked') ? 1 : 2);

    // ===================================================================================
    //  END HINOPE  
    // ===================================================================================

    PlanDetalle.Zona.P_inCodOri = $("#ddlZona").val();

    PlanDetalle.blUsaPlantillaMultiple = ($("#hdfIsPlantillaMultiple").val() == "0" ? false : true);

    if ($('#rbtCostoIncluido').is(':checked')) {
        PlanDetalle.btIncCos = $('#rbtCostoIncluido').is(':checked');
        PlanDetalle.btActCos = false;
        PlanDetalle.inTipCosteo = 0;
    } else {
        PlanDetalle.btIncCos = $('#rbtCostoIncluido').is(':checked');
        PlanDetalle.btActCos = $('#rbtActualizaCosto').is(':checked');
        PlanDetalle.inTipCosteo = $('#ddlTipoCosteo').val();  //  $('#chkCostoTotal').is(':checked');
    }

    PlanDetalle.vcUniDatOri = $("#ddlUnidadDatosOrigen").val();
    PlanDetalle.vcUniDatDes = $("#ddlUnidadDatosDestino").val();
    PlanDetalle.F_inCodSerDef = $('#ddlServicioDefecto').val();
    PlanDetalle.F_inCodSerPreDef = $('#ddlServicioPreDefinido').val();



    if ($("#rdTipPla_0").is(':checked')) {
        //-----------------------------------------------------------------------
        //--------------------------------EXTRAS---------------------------------
        PlanDetalle.dcCanDec = $("#txtCantidadDecimal").val();
        PlanDetalle.vcSimDec = $("#ddlSimboloDecimal").val();
        PlanDetalle.vcSigImp = $("#ddlSigno").val();
        PlanDetalle.dcTasImp = $("#txtTasa").val();
        PlanDetalle.vcSepFec = $("#txtSeparadorFecha").val();
        //PlanDetalle.vcForFec = $("select#ddlFormatoFechaDia").val() + PlanDetalle.vcSepFec + $("select#ddlFormatoFechaMes").val() + PlanDetalle.vcSepFec + $("select#ddlFormatoFechaAnho").val();
        PlanDetalle.vcForFec = $("#txtFechaFormato").val();
        PlanDetalle.vcForFec1 = $("select#ddlFormatoFechaDia").val();
        PlanDetalle.vcForFec2 = $("select#ddlFormatoFechaMes").val();
        PlanDetalle.vcForFec3 = $("select#ddlFormatoFechaAnho").val();
        PlanDetalle.vcSepHor = $("#txtSeparadorHora").val();
    } else if ($("#rdTipPla_1").is(':checked')) {
        //-----------------------------------------------------------------------
        //---------------------------EXTRAS RESUMEN------------------------------
        PlanDetalle.dcCanDec = $("#txtCantidadDecimalRes").val();
        PlanDetalle.vcSimDec = $("#ddlSimboloDecimalRes").val();
        PlanDetalle.vcSigImp = $("#ddlSignoRes").val();
        PlanDetalle.dcTasImp = $("#txtTasaRes").val();
        PlanDetalle.inModoImpuesto = $("#ddlModoImpuesto").val();
        if (PlanDetalle.inModoImpuesto == "") {
            PlanDetalle.inModoImpuesto = "0";
        }
        PlanDetalle.vcConceptoEn = $("#ddlConceptosEn").val();
        PlanDetalle.vcSepFec = $("#txtSeparadorFechaRes").val();
        //PlanDetalle.vcForFec = $("select#ddlFormatoFechaDia").val() + PlanDetalle.vcSepFec + $("select#ddlFormatoFechaMes").val() + PlanDetalle.vcSepFec + $("select#ddlFormatoFechaAnho").val();
        PlanDetalle.vcForFec = $("#txtFechaFormatoRes").val();
        PlanDetalle.vcForFec1 = $("select#ddlFormatoFechaDiaRes").val();
        PlanDetalle.vcForFec2 = $("select#ddlFormatoFechaMesRes").val();
        PlanDetalle.vcForFec3 = $("select#ddlFormatoFechaAnhoRes").val();
        PlanDetalle.vcSepHor = $("#txtSeparadorHoraRes").val();

        //ECONDEÑA  12/11/2015
        PlanDetalle.idTipPlanRes = ($('#rbListPla_0').is(':checked') ? 1 : 2);

    }

    //-----------------------------------------------------------------------
    //------------------------------SEPARADOR--------------------------------
    PlanDetalle.inTipSep = $("input[name='rbSeparador']:checked").val();
    PlanDetalle.vcOtrSep = $("#txtOtroSeparador").val().replace(/'/g, "&#39");
    //-----------------------------------------------------------------------
    //------------------------------SEPARADOR--------------------------------
    PlanDetalle.vcCabIde = $("#txtCabecera").val().replace(/'/g, "&#39");
    PlanDetalle.btConNumCel = $('#chkContieneNumCelular').is(':checked');

    PlanDetalle.vcFilIde1 = $("#txtFiltro1").val().replace(/'/g, "&#39");
    PlanDetalle.vcFilIde2 = $("#txtFiltro2").val().replace(/'/g, "&#39");
    PlanDetalle.vcFilIde3 = $("#txtFiltro3").val().replace(/'/g, "&#39");
    //JHERRERA 20141030
    PlanDetalle.btInsEntrFil1 = $('#chkInsEntrFil1').is(':checked');
    PlanDetalle.inCodSerFil1 = $("#ddlServicioFiltro1").val();
    PlanDetalle.btInsEntrFil2 = $('#chkInsEntrFil2').is(':checked');
    PlanDetalle.inCodSerFil2 = $("#ddlServicioFiltro2").val();
    PlanDetalle.btInsEntrFil3 = $('#chkInsEntrFil3').is(':checked');
    PlanDetalle.inCodSerFil3 = $("#ddlServicioFiltro3").val();
    //-->

    //JHERRERA 20140809
    PlanDetalle.inDirNumCel = ($('#ddlUbicacionNumCelular').val() == null ? -1 : $('#ddlUbicacionNumCelular').val());
    PlanDetalle.vcCabeceraFecha = $("#txtCabeceraFecha").val().replace(/'/g, "&#39");
    PlanDetalle.btCabeceraFecha = $('#chkContieneFecha').is(':checked');
    PlanDetalle.inDirecFecha = ($('#ddlUbicacionFecha').val() == null ? -1 : $('#ddlUbicacionFecha').val());
    //----------------

    //RRAMOS 26/11/2014------------------------------------------
    PlanDetalle.vcFilIde4 = $("#txtFiltro4").val().replace(/'/g, "&#39");
    PlanDetalle.vcFilIde5 = $("#txtFiltro5").val().replace(/'/g, "&#39");
    PlanDetalle.vcFilIde6 = $("#txtFiltro6").val().replace(/'/g, "&#39");
    PlanDetalle.btInsEntrFil4 = $('#chkInsEntrFil4').is(':checked');
    PlanDetalle.inCodSerFil4 = $("#ddlServicioFiltro4").val();
    PlanDetalle.btInsEntrFil5 = $('#chkInsEntrFil5').is(':checked');
    PlanDetalle.inCodSerFil5 = $("#ddlServicioFiltro5").val();
    PlanDetalle.btInsEntrFil6 = $('#chkInsEntrFil6').is(':checked');
    PlanDetalle.inCodSerFil6 = $("#ddlServicioFiltro6").val();
    //-----------------------------------------------------------


    //-----------------------------------------------------------------------

    var datos = $("#tbCampoPlantilla").jqGrid('getRowData');

    $(datos).each(function () {
        var Campo = new ENT_MOV_IMP_Campo();

        Campo.P_inCodCam = this.P_inCodCam;
        Campo.Servicio.P_inCod = this.inCodSer;
        Campo.inPos = this.inPos;
        Campo.inLon = this.inLon;
        Campo.vcDesSer = this.vcDesRes.replace(/'/g, "&#39");
        Campo.TipoServicioImportacion.P_vcCodTipSerImp = this.inCodTipSer;
        //        Campo.TipoServicioImportacion.P_vcCodTipSerImp = this.vcNomTipSerImp;

        Campo.F_InCodTipCon = this.inCodTipCon;
        //alert(Campo);
        PlanDetalle.Campos.push(Campo);
    });

    //JHERRERA 20141103
    var i = 0;
    for (i = 0; i < $("#lstServiciosExcluidos")[0].options.length; i++) {
        var oServicioExcluido = new ENT_MOV_IMP_PlantillaServicioExcluido();
        oServicioExcluido.F_inCodPlaDet = PlanDetalle.P_inCodPlaDet;
        oServicioExcluido.F_inCodSer = $("#lstServiciosExcluidos")[0].options[i].value;

        PlanDetalle.ServiciosExcluidos.push(oServicioExcluido);
    }

    contPlaMul = 6;
    for (var x = 1; x < contPlaMul; x++) {
        if ($("#TxtFiltroMultiple_" + x).val() != "") {
            var oPlantillaMultiple = new ENT_MOV_IMP_PlantillaMultiple();
            oPlantillaMultiple.F_inCodPlaDet = PlanDetalle.P_inCodPlaDet;
            oPlantillaMultiple.inCodPla = $("#ddlFiltroMultiple_" + x).val();
            oPlantillaMultiple.vcNombreFiltro = $("#TxtFiltroMultiple_" + x).val();

            PlanDetalle.PlantillaMultiple.push(oPlantillaMultiple);
        }
    }

    contCab = 6;
    for (var y = 1; y < contCab; y++) {
        if ($("#txtCabTexto_" + y).val() != "") {
            var oPlantillaCabecera = new ENT_MOV_IMP_PlantillaCabecera();
            oPlantillaCabecera.F_inCodPlaDet = PlanDetalle.P_inCodPlaDet;
            oPlantillaCabecera.inLongitud = $("#TxtCabLongitud_" + y).val();
            oPlantillaCabecera.vcNombreCabecera = $("#txtCabTexto_" + y).val();

            PlanDetalle.PlantillaCabecera.push(oPlantillaCabecera);
        }
    }
    //-->
    return PlanDetalle;
}
// ==================================================================================
//  LOAD
// ==================================================================================
var HeigthGrilla1 = 200;

function plantilla_resumen() {
    var CamposPlantilla = $("#tbCampoPlantilla").jqGrid('getRowData');

    if ($("#rdTipPla_1").is(':checked')) {
        if (parseInt(CamposPlantilla.length) > 0) {
            $("#lblMsgTipoPlantilla").show();
            $('#divMsgConfirmacionCambioTipoPlan').dialog({
                title: "Cambio Tipo Plantilla",
                modal: true,
                buttons: {
                    "Si": function () {
                        $("#tbCampoPlantilla").jqGrid('clearGridData');
                        $("#btnOpcion").hide();
                        $("#trCampo").hide();
                        $("#btnOpcionResumen").show();
                        $("#trServicio").show();
                        $("#trTipo").show();
                        $("#tbCampoPlantilla").jqGrid('hideCol', "vcCodCam");
                        //$("#tbCampoPlantilla").jqGrid('showCol', "vcDesTipSer");
                        $("#tbCampoPlantilla").jqGrid('showCol', "inCodTipSer");
                        $(this).dialog("close");
                        $("#hdfTipoPlantilla").val($("#rdTipPla input:radio:checked").val());
                        $("#lblPlan").html("");
                        $("#lblPlanDec").html("");
                        $("#lblPlanUn").html("");
                        $("#lblPlanLit").html("");
                    },
                    "Cancelar": function () {
                        $("#rdTipPla_0").attr('checked', true);
                        $(this).dialog("close");
                    }
                }
            });
        } else {
            $("#btnOpcion").hide();
            $("#trCampo").hide();
            $("#btnOpcionResumen").show();
            $("#trServicio").show();
            $("#trTipo").show();
            $("#tbCampoPlantilla").jqGrid('hideCol', "vcCodCam");
            //$("#tbCampoPlantilla").jqGrid('showCol', "vcDesTipSer");
            $("#tbCampoPlantilla").jqGrid('showCol', "inCodTipSer");
            $("#hdfTipoPlantilla").val($("#rdTipPla input:radio:checked").val());
        }
        $("#btnOpcionResumen").click();
        window.parent.$("#trPlantillaMultiple").css("display", "");


        if ($("#hdfIsPlantillaMultiple").val() == 1) {
            $("#TabOpcionesResumen").tabs("option", "disabled", []);
        } else {
            $("#TabOpcionesResumen").tabs("option", "disabled", [1]);
        }
    } else {
        window.parent.$("#trPlantillaMultiple").css("display", "none");
        if (parseInt(CamposPlantilla.length) > 0) {
            $("#lblMsgTipoPlantilla").show();
            $('#divMsgConfirmacionCambioTipoPlan').dialog({
                title: "Cambio Tipo Plantilla",
                modal: true,
                buttons: {
                    "Si": function () {
                        $("#tbCampoPlantilla").jqGrid('clearGridData');
                        $("#btnOpcion").show();
                        $("#trCampo").show();
                        $("#btnOpcionResumen").hide();
                        $("#trServicio").hide();
                        $("#trTipo").hide();
                        $("#tbCampoPlantilla").jqGrid('showCol', "vcCodCam");
                        //$("#tbCampoPlantilla").jqGrid('hideCol', "vcDesTipSer");
                        $("#tbCampoPlantilla").jqGrid('hideCol', "inCodTipSer");
                        $(this).dialog("close");
                        $("#hdfTipoPlantilla").val($("#rdTipPla input:radio:checked").val());
                        $("#lblPlan").html("");
                        $("#lblPlanDec").html("");
                        $("#lblPlanUn").html("");
                        $("#lblPlanLit").html("");
                    },
                    "Cancelar": function () {
                        $("#rdTipPla_1").attr('checked', true);
                        $(this).dialog("close");
                    }
                }
            });
        } else {
            $("#btnOpcion").show();
            $("#trCampo").show();
            $("#btnOpcionResumen").hide();
            $("#trServicio").hide();
            $("#trTipo").hide();
            $("#tbCampoPlantilla").jqGrid('showCol', "vcCodCam");
            //$("#tbCampoPlantilla").jqGrid('hideCol', "vcDesTipSer");
            $("#tbCampoPlantilla").jqGrid('hideCol', "inCodTipSer");
            $("#hdfTipoPlantilla").val($("#rdTipPla input:radio:checked").val());
        }
    }
    if (window.parent.$("#hdfCod").val() == "") {
        CargarPlantillaXTipo(null);
    }
}
// =========================================================
//  LOAD
// =========================================================
$(function () {
    $("#hdfTipoPlantilla").val($("#rdTipPla input:radio:checked").val());
    // =====================================================
    //  TIPO DE PLANTILLA
    // =====================================================
    $("#rdTipPla").click(function () {
        if ($("#hdfTipoPlantilla").val() != $("#rdTipPla input:radio:checked").val()) {
            plantilla_resumen();
        }

    });

    //    // =====================================================
    //    //  HINOPE
    //    // =====================================================
    //    $("#ddlTipoServicioImportador").change(function () {

    //        if (this.value == '1') {
    //            $("#ddlServicioResumenCosto").show();
    //            $("#ddlServicioResumenConsumo").hide();

    //        } else {
    //            $("#ddlServicioResumenCosto").hide();
    //            $("#ddlServicioResumenConsumo").show();
    //        }

    //    });
    //    // =====================================================
    //    //  END HINOPE
    //    // =====================================================

    DimPosElementos();

    $(window).resize(function () {
        DimPosElementos();
    });
    function DimPosElementos() {
        var Ancho = $(window).width();
        var Alto = $(window).height();
        $("#tbCampoPlantilla").setGridHeight(Alto - HeigthGrilla1 - 50);
    }


    var TipoPlantilla;
    $(".btnNormal").button({});

    tabOpciones = $("#TabOpciones").tabs({});
    tabOpcionesResumen = $("#TabOpcionesResumen").tabs({});

    $("#txtLongitud").keypress(ValidarEnteroPositivo);
    $("#txtLongitud").bind('paste', function (e) {
        return false;
    });

    $("#txtPosicion").keypress(ValidarEnteroPositivo);
    $("#txtPosicion").bind('paste', function (e) {
        return false;
    });

    ValidarNumeroEnCajaTexto("txtCantidadDecimal", ValidarEnteroPositivo);
    ValidarNumeroEnCajaTexto("TxtCabLongitud_1", ValidarEnteroPositivo);
    ValidarNumeroEnCajaTexto("TxtCabLongitud_2", ValidarEnteroPositivo);
    ValidarNumeroEnCajaTexto("TxtCabLongitud_3", ValidarEnteroPositivo);
    ValidarNumeroEnCajaTexto("TxtCabLongitud_4", ValidarEnteroPositivo);
    ValidarNumeroEnCajaTexto("TxtCabLongitud_5", ValidarEnteroPositivo);
    ValidarNumeroEnCajaTexto("TxtCabLongitud_6", ValidarEnteroPositivo);
    ValidarNumeroEnCajaTexto("txtTasa", ValidarDecimalPositivo);


    ValidarNumeroEnCajaTexto("txtTasaRes", ValidarDecimalPositivo);

    if ($('#chkServicioDefecto').is(':checked')) {
        $("#ddlServicioDefecto").show();
    }
    else {
        $("#ddlServicioDefecto").val("-1");
        $("#ddlServicioDefecto").hide();
    }

    if ($('#chkServicioPreDefinido').is(':checked')) {
        $("#ddlServicioPreDefinido").show();
    }
    else {
        $("#ddlServicioPreDefinido").val("-1");
        $("#ddlServicioPreDefinido").hide();
    }

    $("#chkServicioDefecto").change(function () {
        if ($(this).is(':checked')) {
            $("#ddlServicioDefecto").show();
        }
        else {
            $("#ddlServicioDefecto").val("-1");
            $("#ddlServicioDefecto").hide();
        }
    });

    if ($('#rbtCostoIncluido').is(':checked')) {
        $("#ddlTipoCosteo").hide();
        //$("#rbtActualizaCosto").hide(); //JHERRERA 20140814
        //$('label[for="rbtActualizaCosto"]').hide(); //JHERRERA 20140814
    } else {
        $("#ddlTipoCosteo").show();
        //$("#rbtActualizaCosto").show(); //JHERRERA 20140814
        //$('label[for="rbtActualizaCosto"]').show(); //JHERRERA 20140814
    }

    if ($('#rbtActualizaCosto').is(':checked')) {
        $("#ddlTipoCosteo").show();
    }
    else {
        $("#ddlTipoCosteo").hide();
    }

    $("#txtSeparadorFecha, #txtSeparadorHora").live("keypress", function (e) {
        return ValidarCaracteresFormatoFecha_Y_Hora(e);
    });

    $("#chkServicioPreDefinido").change(function () {
        if ($(this).is(':checked')) {
            $("#ddlServicioPreDefinido").show();
        }
        else {
            $("#ddlServicioPreDefinido").val("-1");
            $("#ddlServicioPreDefinido").hide();
        }
    });


    //--------------------------------------------------------------------------------------------------------------------------------//
    //--------------------------------------------------------CHEKS DE FILTROS--------------------------------------------------------//
    //--------------------------------------------------------------------------------------------------------------------------------//

    //    function fnScrollBar() {
    //        //        if ($(document).height() > $("#dvOpciones").height()) {
    //        if ($('#dvOpciones').hasScrollBar()) {
    //            $("#linFiltro2").css("width", "36.4em");
    //            $("#linFiltro3").css("width", "36.4em");
    //            $("#linFiltro4").css("width", "36.4em");
    //            $("#linFiltro5").css("width", "36.4em");
    //            $("#linFiltro6").css("width", "36.4em");
    //        } else {
    //            $("#linFiltro2").css("width", "37.7em");
    //            $("#linFiltro3").css("width", "37.7em");
    //            $("#linFiltro4").css("width", "37.7em");
    //            $("#linFiltro5").css("width", "37.7em");
    //            $("#linFiltro6").css("width", "37.7em");
    //        }
    //    }

    //Se modificó tamaños de ttgInfo
    $("#ttgInfoFiltro1_DvMensaje").css("width", 125);
    $("#ttgInfoFiltro1_DvMiMensaje").css("width", 109);
    $("#ttgInfoFiltro2_DvMensaje").css("width", 125);
    $("#ttgInfoFiltro2_DvMiMensaje").css("width", 109);
    $("#ttgInfoFiltro3_DvMensaje").css("width", 125);
    $("#ttgInfoFiltro3_DvMiMensaje").css("width", 109);
    $("#ttgInfoFiltro4_DvMensaje").css("width", 125);
    $("#ttgInfoFiltro4_DvMiMensaje").css("width", 109);
    $("#ttgInfoFiltro5_DvMensaje").css("width", 125);
    $("#ttgInfoFiltro5_DvMiMensaje").css("width", 109);
    $("#ttgInfoFiltro6_DvMensaje").css("width", 125);
    $("#ttgInfoFiltro6_DvMiMensaje").css("width", 109);
    //-->

    $("#chkInsEntrFil1").change(function () {
        if ($(this).is(':checked')) {
            $("#trFiltro1_2").show();
        }
        else {
            $("#ddlServicioFiltro1").val("-1");
            $("#trFiltro1_2").hide();
        }
    });
    $("#chkInsEntrFil2").change(function () {
        if ($(this).is(':checked')) {
            $("#trFiltro2_2").show();
        }
        else {
            $("#ddlServicioFiltro2").val("-1");
            $("#trFiltro2_2").hide();
        }
    });
    $("#chkInsEntrFil3").change(function () {
        if ($(this).is(':checked')) {
            $("#trFiltro3_2").show();
        }
        else {
            $("#ddlServicioFiltro3").val("-1");
            $("#trFiltro3_2").hide();
        }
    });
    $("#chkInsEntrFil4").change(function () {
        if ($(this).is(':checked')) {
            $("#trFiltro4_2").show();
        }
        else {
            $("#ddlServicioFiltro4").val("-1");
            $("#trFiltro4_2").hide();
        }
    });
    $("#chkInsEntrFil5").change(function () {
        if ($(this).is(':checked')) {
            $("#trFiltro5_2").show();
        }
        else {
            $("#ddlServicioFiltro5").val("-1");
            $("#trFiltro5_2").hide();
        }
    });
    $("#chkInsEntrFil6").change(function () {
        if ($(this).is(':checked')) {
            $("#trFiltro6_2").show();
        }
        else {
            $("#ddlServicioFiltro6").val("-1");
            $("#trFiltro6_2").hide();
        }
    });
    //-------------------------------------------------------------------------------------------------------------------------------->>


    //--------------------------------------------------------------------------------------------------------------------------------//
    //----------------------------------------------------------EXCLUSIONES-----------------------------------------------------------//
    //--------------------------------------------------------------------------------------------------------------------------------//

    $("#imgAgregarServicio").click(function () {
        if ($("#ddlServiciosExcluir").val() != "-1") {
            var biExiste = 0;
            var vcIdSer = $("#ddlServiciosExcluir").val();

            if ($("#ddlServicioDefecto").val() == vcIdSer) {
                alerta("El servicio elegido no puede ser excluido porque ya está definido como 'Servicio Por Defecto'");
                return;
            }
            if ($("#ddlServicioPreDefinido").val() == vcIdSer) {
                alerta("El servicio elegido no puede ser excluido porque ya está definido como 'Servicio Predefinido'");
                return;
            }
            if ($("#ddlServicioFiltro1").val() == vcIdSer) {
                alerta("El servicio elegido no puede ser excluido porque está siendo usado en el Filtro 1");
                return;
            }
            if ($("#ddlServicioFiltro2").val() == vcIdSer) {
                alerta("El servicio elegido no puede ser excluido porque está siendo usado en el Filtro 2");
                return;
            }
            if ($("#ddlServicioFiltro3").val() == vcIdSer) {
                alerta("El servicio elegido no puede ser excluido porque está siendo usado en el Filtro 3");
                return;
            }
            if ($("#ddlServicioFiltro4").val() == vcIdSer) {
                alerta("El servicio elegido no puede ser excluido porque está siendo usado en el Filtro 4");
                return;
            }
            if ($("#ddlServicioFiltro5").val() == vcIdSer) {
                alerta("El servicio elegido no puede ser excluido porque está siendo usado en el Filtro 5");
                return;
            }
            if ($("#ddlServicioFiltro6").val() == vcIdSer) {
                alerta("El servicio elegido no puede ser excluido porque está siendo usado en el Filtro 6");
                return;
            }

            var i = 0;
            for (i = 0; i < $("#lstServiciosExcluidos")[0].options.length; i++) {
                if (vcIdSer == $("#lstServiciosExcluidos")[0].options[i].value)
                    biExiste = 1;
            }

            if (biExiste == 0) {
                $('#lstServiciosExcluidos').append('<option value="' + vcIdSer + '">' + $("#ddlServiciosExcluir option:selected").text() + '</option>');
                $("#ddlServiciosExcluir option[value='" + vcIdSer + "']").remove();

                //JHERRERA 20141103: Eliminando Servicios excluidos de los otros combos
                $("#ddlServicioPreDefinido option[value='" + vcIdSer + "']").remove();
                $("#ddlServicioDefecto option[value='" + vcIdSer + "']").remove();
                $("#ddlServicioFiltro1 option[value='" + vcIdSer + "']").remove();
                $("#ddlServicioFiltro2 option[value='" + vcIdSer + "']").remove();
                $("#ddlServicioFiltro3 option[value='" + vcIdSer + "']").remove();
                $("#ddlServicioFiltro4 option[value='" + vcIdSer + "']").remove();
                $("#ddlServicioFiltro5 option[value='" + vcIdSer + "']").remove();
                $("#ddlServicioFiltro6 option[value='" + vcIdSer + "']").remove();
            } else {
                alerta("El servicio elegido ya es un servicio excluido.");
            }
        }
        else {
            alerta("Seleccione un servicio válido.");
            $('#ddlServiciosExcluir').focus();
        }
    });

    $("#imgQuitarServicio").click(function () {
        if ($('#lstServiciosExcluidos option').length == 0) {
            return;
        }
        if ($('#lstServiciosExcluidos option:selected').length == 0) {
            alerta('Seleccione un servicio como mínimo');
            $('#lstServiciosExcluidos').focus();
            return;
        } else {
            $('#lstServiciosExcluidos option:selected').each(function () {
                var vcIdSerExc = this.value;
                var vcNomSerExc = this.text;

                $("#ddlServiciosExcluir").append('<option value="' + vcIdSerExc + '">' + vcNomSerExc + '</option>');
                $("#ddlServicioDefecto").append('<option value="' + vcIdSerExc + '">' + vcNomSerExc + '</option>');
                $("#ddlServicioPreDefinido").append('<option value="' + vcIdSerExc + '">' + vcNomSerExc + '</option>');

                var j = 0;
                for (j = 0; j < $("#ddlServicioFiltroBack")[0].options.length; j++) {
                    if ($("#ddlServicioFiltroBack")[0].options[j].value == vcIdSerExc) {
                        $("#ddlServicioFiltro1").append('<option value="' + vcIdSerExc + '">' + vcNomSerExc + '</option>');
                        $("#ddlServicioFiltro2").append('<option value="' + vcIdSerExc + '">' + vcNomSerExc + '</option>');
                        $("#ddlServicioFiltro3").append('<option value="' + vcIdSerExc + '">' + vcNomSerExc + '</option>');
                        $("#ddlServicioFiltro4").append('<option value="' + vcIdSerExc + '">' + vcNomSerExc + '</option>');
                        $("#ddlServicioFiltro5").append('<option value="' + vcIdSerExc + '">' + vcNomSerExc + '</option>');
                        $("#ddlServicioFiltro6").append('<option value="' + vcIdSerExc + '">' + vcNomSerExc + '</option>');
                    }
                }
            });

            fnSortDropDownListByText("ddlServiciosExcluir");
            fnSortDropDownListByText("ddlServicioDefecto");
            fnSortDropDownListByText("ddlServicioPreDefinido");
            fnSortDropDownListByText("ddlServicioFiltro1");
            fnSortDropDownListByText("ddlServicioFiltro2");
            fnSortDropDownListByText("ddlServicioFiltro3");
            fnSortDropDownListByText("ddlServicioFiltro4");
            fnSortDropDownListByText("ddlServicioFiltro5");
            fnSortDropDownListByText("ddlServicioFiltro6");

            $('#lstServiciosExcluidos option:selected').remove();
        }
    });

    //-------------------------------------------------------------------------------------------------------------------------------->>


    function inicio() {

        CargarCombos();

        $("#txtExtensionDefecto").val(window.parent.Extension);

        if ($("#hdfPlanDetalle").val() != "") {

            var lstPlantillaDetalles = window.parent.lstPlantillaDetalles;

            //$("#rdTipPla").attr('checked', true);
            $("#rdTipPla_0").prop("disabled", true);
            $("#rdTipPla_1").prop("disabled", true);

            $("#rbListPla_0").prop("disabled", true);
            $("#rbListPla_1").prop("disabled", true);

            $(lstPlantillaDetalles).each(function () {
                if (window.parent.$("#ddlArchivo").val() == "1") {//Texto con separador
                    $("#TabOpciones").tabs("option", "disabled", []);
                    $("#btnEliminarHoja").hide();
                }
                else if (window.parent.$("#ddlArchivo").val() == "2") {//Texto con Plano
                    $("#TabOpciones").tabs("option", "disabled", []);

                    $("#trLongitud").show();
                    //                    $("#txtLongitud").show();

                    $("#btnEliminarHoja").hide();
                }
                else {//hoja de calculo y otros
                    $("#TabOpciones").tabs("option", "disabled", [2]);
                    $("#btnEliminarHoja").show();
                }


                if ($("#hdfPlanDetalle").val() == this.P_inCodPlaDet.toString()) {
                    $("#tbCampoPlantilla").jqGrid('clearGridData');
                    $("#trFiltro2").hide();
                    $("#trFiltro2_0").hide();
                    $("#trFiltro3").hide();
                    $("#trFiltro3_0").hide();
                    $("#trFiltro4").hide();
                    $("#trFiltro4_0").hide();
                    $("#trFiltro5").hide();
                    $("#trFiltro5_0").hide();
                    $("#txtOtroSeparador").hide();

                    $("#chkTipoCambio").attr('checked', this.btTipCam);
                    // ECONDEÑA 27/02/2015
                    $("#chkTipoCambioRes").attr('checked', this.btTipCam);

                    $("#chkAgregarCeroDDNDDI").attr('checked', this.btAgrCerDDNDDI);
                    $("#txtExtensionDefecto").val(this.vcExtDef);
                    $("#chkServicioCampo").attr('checked', this.btSerCam);

                    // =========================================================================
                    //  TIPO DE PLANTILLA
                    // =========================================================================
                    $("#chkTodasHojas").attr('checked', false);


                    if (this.blUsaPlantillaMultiple) {
                        window.parent.$("#chkPlantillaMultiple").attr('checked', true);
                        $("#hdfIsPlantillaMultiple").val("1");
                        $("#TabOpcionesResumen").tabs("option", "disabled", []);

                    } else {
                        $("#chkPlantillaMultiple").attr('checked', false);
                        $("#hdfIsPlantillaMultiple").val("0");
                        $("#TabOpcionesResumen").tabs("option", "disabled", [1]);
                    }

                    if (this.inTipPla == "1") {
                        $("#rdTipPla_0").attr('checked', true);
                    } else {
                        $("#rdTipPla_1").attr('checked', true);
                        if (this.idTipPlanRes == "1") {
                            $("#rbListPla_0").attr('checked', true);
                        } else {
                            $("#rbListPla_1").attr('checked', true);
                        }
                        
                        $("#TabOpciones").tabs("option", "disabled", []);

                    }

                    plantilla_resumen();

                    $("#ddlZona").val(this.Zona.P_inCodOri);
                    $("#rbtCostoIncluido").attr('checked', this.btIncCos);
                    $("#ddlUnidadDatosOrigen").val(this.vcUniDatOri);
                    $("#ddlUnidadDatosDestino").val(this.vcUniDatDes);
                    $("#txtCantidadDecimal").val(this.dcCanDec);
                    $("#ddlSimboloDecimal").val(this.vcSimDec);
                    $("#ddlSigno").val(this.vcSigImp);
                    $("#txtTasa").val(this.dcTasImp);


                    $("#ddlModoImpuesto").val(this.inModoImpuesto);
                    if (this.inModoImpuesto == 0) {
                        $("#txtTasaRes").val("0");
                        $(".filaImpuesto").hide();
                    }
                    else {
                        $("#txtTasaRes").val(this.dcTasImp);
                        $(".filaImpuesto").show();
                    }


                    $("#ddlConceptosEn").val(this.vcConceptoEn);
                    //Carga al inicio...
                    if (this.vcConceptoEn == 'columna') {
                        $("#ddlListaConceptos").show();
                        $("#ddlCampoServicio").hide();
                    }
                    else {
                        $("#ddlCampoServicio").show();
                        $("#ddlListaConceptos").hide();
                    }


                    $("#txtSeparadorFecha").val(this.vcSepFec);

                    if (this.F_inCodSerDef == '-1') {
                        $("#chkServicioDefecto").attr('checked', false);
                        $("#ddlServicioDefecto").val("-1");
                        $("#ddlServicioDefecto").hide();
                    } else {
                        $("#chkServicioDefecto").attr('checked', true);
                        $("#ddlServicioDefecto").val(this.F_inCodSerDef);
                        $("#ddlServicioDefecto").show();
                    }

                    if (this.F_inCodSerPreDef == '-1') {
                        $("#chkServicioPreDefinido").attr('checked', false);
                        $("#ddlServicioPreDefinido").val("-1");
                        $("#ddlServicioPreDefinido").hide();
                    } else {
                        $("#chkServicioPreDefinido").attr('checked', true);
                        $("#ddlServicioPreDefinido").show();
                        $("#ddlServicioPreDefinido").val(this.F_inCodSerPreDef);
                    }

                    if ($('#rbtCostoIncluido').is(':checked')) {
                        $("#ddlTipoCosteo").hide();
                        //$("#rbtActualizaCosto").hide(); //JHERRERA 20140814
                        //$('label[for="rbtActualizaCosto"]').hide(); //JHERRERA 20140814
                    } else {
                        $("#ddlTipoCosteo").show();
                        //$("#rbtActualizaCosto").show(); //JHERRERA 20140814
                        //$('label[for="rbtActualizaCosto"]').show(); //JHERRERA 20140814
                    }

                    $("#rbtActualizaCosto").attr('checked', this.btActCos);

                    if ($('#rbtActualizaCosto').is(':checked')) {
                        $("#ddlTipoCosteo").show();
                    }
                    else {
                        $("#ddlTipoCosteo").hide();
                    }

                    $('#ddlTipoCosteo').val(this.inTipCosteo);

                    if (this.btActCos == false) {
                        //                        var radiolist = $('#chklstTipoCosteo').find('input:radio');
                        //                        radiolist.removeAttr('checked');
                        $('#ddlTipoCosteo').val("-1");
                    }

                    if (window.parent.$("#ddlArchivo").val() == "2") {//Texto plano
                        $("#tbCampoPlantilla").jqGrid('showCol', ["inLon"]);
                    }
                    else {
                        $("#tbCampoPlantilla").jqGrid('hideCol', ["inLon"]);
                    }

                    if (this.btSerCam) {
                        //$("#tbCampoPlantilla").jqGrid('hideCol', ["vcDesSer", "vcDesTipSer"]);
                    }
                    else {
                        //$("#tbCampoPlantilla").jqGrid('hideCol', ["vcDesSer", "vcDesTipSer"]);
                    }

                    if (this.vcForFec == "") {
                        $("select#ddlFormatoFechaDia").prop('selectedIndex', 0);
                        $("select#ddlFormatoFechaMes").prop('selectedIndex', 1);
                        $("select#ddlFormatoFechaAnho").prop('selectedIndex', 2);
                    }
                    else {
                        $("#ddlFormatoFechaDia").val(this.vcForFec1);
                        $("#ddlFormatoFechaMes").val(this.vcForFec2);
                        $("#ddlFormatoFechaAnho").val(this.vcForFec3);
                        $("#txtFechaFormato").val(this.vcForFec);
                    }
                    $("#txtSeparadorHora").val(this.vcSepHor);
                    $('input:radio[name=rbSeparador]:nth(' + this.inTipSep.toString() + ')').attr('checked', true);
                    $("#txtOtroSeparador").val(this.vcOtrSep);

                    $("#txtCabecera").val(this.vcCabIde);
                    $("#chkContieneNumCelular").attr('checked', this.btConNumCel);
                    $("#txtFiltro1").val(this.vcFilIde1);
                    $("#txtFiltro2").val(this.vcFilIde2);
                    $("#txtFiltro3").val(this.vcFilIde3);
                    //JHERRERA 20141030
                    $("#chkInsEntrFil1").attr('checked', this.btInsEntrFil1);
                    $("#ddlServicioFiltro1").val(this.inCodSerFil1);
                    $("#chkInsEntrFil2").attr('checked', this.btInsEntrFil2);
                    $("#ddlServicioFiltro2").val(this.inCodSerFil2);
                    $("#chkInsEntrFil3").attr('checked', this.btInsEntrFil3);
                    $("#ddlServicioFiltro3").val(this.inCodSerFil3);
                    if ($('#chkInsEntrFil1').is(':checked'))
                        $("#trFiltro1_2").show();
                    else
                        $("#trFiltro1_2").hide();
                    if ($('#chkInsEntrFil2').is(':checked'))
                        $("#trFiltro2_2").show();
                    else
                        $("#trFiltro2_2").hide();
                    if ($('#chkInsEntrFil3').is(':checked'))
                        $("#trFiltro3_2").show();
                    else
                        $("#trFiltro3_2").hide();
                    //-->

                    //JHERRERA 20140809
                    if (this.btConNumCel)
                        $("#ddlUbicacionNumCelular").prop("disabled", true);
                    $("#ddlUbicacionNumCelular").val(this.inDirNumCel);
                    $("#txtCabeceraFecha").val(this.vcCabeceraFecha);
                    $("#chkContieneFecha").attr('checked', this.btCabeceraFecha);
                    if (this.btCabeceraFecha)
                        $("#ddlUbicacionFecha").prop("disabled", true);
                    $("#ddlUbicacionFecha").val(this.inDirecFecha);
                    //-----------------

                    if (this.vcFilIde1 != "") {
                        $("#trFiltro2").show();
                        $("#trFiltro2_0").show();
                        //JHERRERA 20141030
                        $("#chkInsEntrFil1").prop("disabled", false);
                    }
                    if (this.vcFilIde2 != "") {
                        $("#trFiltro3").show();
                        $("#trFiltro3_0").show();
                        //JHERRERA 20141030
                        $("#chkInsEntrFil2").prop("disabled", false);
                    }
                    //                    //JHERRERA 20141030
                    //                    if (this.vcFilIde3 != ""){
                    //                        $("#chkInsEntrFil3").prop("disabled", false);
                    //                    }
                    //                    //-->

                    //                    if (this.inTipSep == 3)
                    //                    {
                    //                        $("#txtOtroSeparador").show();
                    //                    }

                    //RRAMOS 26/11/2014------------------------------------------
                    $("#txtFiltro4").val(this.vcFilIde4);
                    $("#txtFiltro5").val(this.vcFilIde5);
                    $("#txtFiltro6").val(this.vcFilIde6);
                    $("#chkInsEntrFil4").attr('checked', this.btInsEntrFil4);
                    $("#ddlServicioFiltro4").val(this.inCodSerFil4);
                    $("#chkInsEntrFil5").attr('checked', this.btInsEntrFil5);
                    $("#ddlServicioFiltro5").val(this.inCodSerFil5);
                    $("#chkInsEntrFil6").attr('checked', this.btInsEntrFil6);
                    $("#ddlServicioFiltro6").val(this.inCodSerFil6);
                    if ($('#chkInsEntrFil4').is(':checked'))
                        $("#trFiltro4_2").show();
                    else
                        $("#trFiltro4_2").hide();
                    if ($('#chkInsEntrFil5').is(':checked'))
                        $("#trFiltro5_2").show();
                    else
                        $("#trFiltro5_2").hide();
                    if ($('#chkInsEntrFil6').is(':checked'))
                        $("#trFiltro6_2").show();
                    else
                        $("#trFiltro6_2").hide();

                    if (this.vcFilIde3 != "") {
                        $("#trFiltro4").show();
                        $("#trFiltro4_0").show();
                        $("#chkInsEntrFil3").prop("disabled", false);
                    }
                    if (this.vcFilIde4 != "") {
                        $("#trFiltro5").show();
                        $("#trFiltro5_0").show();
                        $("#chkInsEntrFil4").prop("disabled", false);
                    }
                    if (this.vcFilIde5 != "") {
                        $("#trFiltro6").show();
                        $("#trFiltro6_0").show();
                        $("#chkInsEntrFil5").prop("disabled", false);
                    }
                    if (this.vcFilIde6 != "") {
                        $("#chkInsEntrFil6").prop("disabled", false);
                    }
                    //-->

                    if (this.inTipSep == 6) {
                        $("#txtOtroSeparador").show();
                    }
                    //-----------------------------------------------------------



                    tabOpciones.tabs('select', '#TabOpciones_TabJQ1');
                    tabOpcionesResumen.tabs('select', '#TabOpcionesResumen_TabJQ1');

                    $("#chkServicioDefecto").change(function () {
                        if ($(this).is(':checked')) {
                            $("#ddlServicioDefecto").show();
                        }
                        else {
                            $("#ddlServicioDefecto").val("-1");
                            $("#ddlServicioDefecto").hide();
                        }
                    });

                    $("#chkServicioPreDefinido").change(function () {
                        if ($(this).is(':checked')) {
                            $("#ddlServicioPreDefinido").show();
                        }
                        else {
                            $("#ddlServicioPreDefinido").val("-1");
                            $("#ddlServicioPreDefinido").hide();
                        }
                    });

                    $("#lblPlan").html(this.vcPla);

                    $("#ddlCampo").html("");

                    var Campos = this.Campos;

                    $(window.parent.lstCampo).each(function () {
                        var inCodCam = this.P_inCodCam;
                        var vcNomCam = this.vcDes;
                        var inCon = 0;

                        $.each(Campos, function () {
                            if (this.P_inCodCam == inCodCam) {
                                if (!this.btSerCam || inCodCam != "115") {
                                    inCon = 1;
                                }
                            }
                        });

                        if (inCon == 0) {
                            $("#ddlCampo").append($("<option></option>").attr("value", inCodCam).text(vcNomCam));
                        }
                    });

                    $.each(Campos, function () {
                        var oCampo = this;

                        $(window.parent.lstCampo).each(function () {
                            var inCodCam = this.P_inCodCam;
                            var vcNomCam = this.vcDes;
                            var inCon = 0;

                            if (oCampo.P_inCodCam == inCodCam) {
                                if (!oCampo.btSerCam || inCodCam != "115") {
                                    inCon = 1;
                                }
                                $("#tbCampoPlantilla").jqGrid('addRowData', oCampo.inPos, { P_inCodCam: oCampo.P_inCodCam, vcCodCam: oCampo.vcCod, vcDesCam: oCampo.vcDes, inCodSer: oCampo.Servicio.P_inCod,
                                    vcDesSer: oCampo.Servicio.vcNom, inCodTipSer: oCampo.TipoServicioImportacion.P_vcCodTipSerImp,
                                    vcDesTipSer: oCampo.TipoServicioImportacion.vcNomTipSerImp, inPos: oCampo.inPos, inLon: oCampo.inLon,
                                    vcDesRes: oCampo.vcDesSer, inCodTipCon: oCampo.F_InCodTipCon
                                });
                            }
                        });
                    });

                    ActualizaPlantilla();

                    //JHERRERA 20141103
                    $("#lstServiciosExcluidos").html("");
                    var ServiciosExcluidos = this.ServiciosExcluidos;

                    $.each(ServiciosExcluidos, function () {
                        var i = 0;

                        for (i = 0; i < $("#ddlServiciosExcluir")[0].options.length; i++) {
                            var IdSerExc = $("#ddlServiciosExcluir")[0].options[i].value;
                            var vcNomSerExc = $("#ddlServiciosExcluir")[0].options[i].text;

                            if (this.F_inCodSer == IdSerExc && this.F_inCodSer != "-1") {
                                $('#lstServiciosExcluidos').append('<option value="' + IdSerExc + '">' + vcNomSerExc + '</option>');
                                $("#ddlServiciosExcluir option[value='" + IdSerExc + "']").remove();

                                //JHERRERA 20141103: Eliminando Servicios excluidos de los otros combos
                                $("#ddlServicioPreDefinido option[value='" + IdSerExc + "']").remove();
                                $("#ddlServicioDefecto option[value='" + IdSerExc + "']").remove();
                                $("#ddlServicioFiltro1 option[value='" + IdSerExc + "']").remove();
                                $("#ddlServicioFiltro2 option[value='" + IdSerExc + "']").remove();
                                $("#ddlServicioFiltro3 option[value='" + IdSerExc + "']").remove();
                                $("#ddlServicioFiltro4 option[value='" + IdSerExc + "']").remove();
                                $("#ddlServicioFiltro5 option[value='" + IdSerExc + "']").remove();
                                $("#ddlServicioFiltro6 option[value='" + IdSerExc + "']").remove();
                            }
                        }
                    });

                    if (window.parent.$("#hdfCod").val() != "") {
                        var oPlantillaMultiple = this.PlantillaMultiple;
                        CargarPlantillaXTipo(oPlantillaMultiple);
                    }

                    var oPlantillaCabecera = this.PlantillaCabecera;
                    var y = 1;
                    $.each(oPlantillaCabecera, function () {
                        $("#txtCabTexto_" + y).val(this.vcNombreCabecera);
                        if ($("#txtCabTexto_" + y).val() == "") {
                            $("#TxtCabLongitud_" + y).prop("disabled", true);
                        } else {
                            $("#TxtCabLongitud_" + y).prop("disabled", false);
                        }
                        $("#TxtCabLongitud_" + y).val(this.inLongitud);
                        $("#trSeparador" + (y + 1)).show();
                        $("#trCabecera" + (y + 1)).show();
                        $("#trLongitud" + (y + 1)).show();


                        y += 1;
                    });

                    //-->
                }
            });
        }
    }

    function CargarCombos() {
        $(window.parent.lstCampo).each(function () {
            $("#ddlCampo").append($("<option></option>").attr("value", this.P_inCodCam).text(this.vcDes));
        });
        $(window.parent.lstTipoPlantilla).each(function () {
            $("#ddlTipoPlantilla").append($("<option></option>").attr("value", this.P_inCodTipPla).text(this.vcNomTipPla));
        });
        $(window.parent.lstServicio).each(function () {
            $("#ddlServicio").append($("<option></option>").attr("value", this.P_inCod).text(this.vcNom));
        });

        // ==========================================================================================
        //   HINOPE
        // ==========================================================================================
        $(window.parent.lstServicioResumenCosto).each(function () {
            $("#ddlServicioResumenCosto").append($("<option></option>").attr("value", this.P_InCodCon).text(this.VcNomCon));
        });
        $(window.parent.lstServicioResumenConsumo).each(function () {
            $("#ddlServicioResumenConsumo").append($("<option></option>").attr("value", this.P_InCodCon).text(this.VcNomCon));
        });
        // ==========================================================================================
        //   END HINOPE
        // ==========================================================================================

        $(window.parent.lstZona).each(function () {
            $("#ddlZona").append($("<option></option>").attr("value", this.P_inCodOri).text(this.vcCodOri));
        });
        $(window.parent.lstTipoServicioImportador).each(function () {
            $("#ddlTipoServicioImportador").append($("<option></option>").attr("value", this.P_inCod).text(this.VcDes));
        });
        //$("#ddlZona").val(511);
        $("#ddlZona").val(560);

        //JHERRERA 20141103: Los servicios se reinician porque podrían haber sido afectados por los servicios excluidos
        //-------------------------------------------------------------------------------------------------------------
        $("#ddlServicioDefecto").html("");
        $("#ddlServicioPreDefinido").html("");
        $("#ddlServiciosExcluir").html("");
        for (i = 0; i < $("#ddlServicioBack")[0].options.length; i++) {
            var IdSer = $("#ddlServicioBack")[0].options[i].value;
            var vcNomSer = $("#ddlServicioBack")[0].options[i].text;

            $("#ddlServicioDefecto").append('<option value="' + IdSer + '">' + vcNomSer + '</option>');
            $("#ddlServicioPreDefinido").append('<option value="' + IdSer + '">' + vcNomSer + '</option>');
            $("#ddlServiciosExcluir").append('<option value="' + IdSer + '">' + vcNomSer + '</option>');
        }

        $("#ddlServicioFiltro1").html("");
        $("#ddlServicioFiltro2").html("");
        $("#ddlServicioFiltro3").html("");
        $("#ddlServicioFiltro4").html("");
        $("#ddlServicioFiltro5").html("");
        $("#ddlServicioFiltro6").html("");

        for (i = 0; i < $("#ddlServicioFiltroBack")[0].options.length; i++) {
            var IdSer = $("#ddlServicioFiltroBack")[0].options[i].value;
            var vcNomSer = $("#ddlServicioFiltroBack")[0].options[i].text;
            $("#ddlServicioFiltro1").append('<option value="' + IdSer + '">' + vcNomSer + '</option>');
            $("#ddlServicioFiltro2").append('<option value="' + IdSer + '">' + vcNomSer + '</option>');
            $("#ddlServicioFiltro3").append('<option value="' + IdSer + '">' + vcNomSer + '</option>');
            $("#ddlServicioFiltro4").append('<option value="' + IdSer + '">' + vcNomSer + '</option>');
            $("#ddlServicioFiltro5").append('<option value="' + IdSer + '">' + vcNomSer + '</option>');
            $("#ddlServicioFiltro6").append('<option value="' + IdSer + '">' + vcNomSer + '</option>');
        }
        //----------------------------------------------------------------------------------------------------------->>
    }




    var tbCampoPlantilla = $("#tbCampoPlantilla").jqGrid({
        datatype: "local",
        colModel: [{ name: 'P_inCodCam', index: 'P_inCodCam', label: 'inCodCam', hidden: true },
   		                   { name: 'vcCodCam', index: 'vcCodCam', label: 'Campo', width: '50' },
   		                   { name: 'vcDesCam', index: 'vcDesCam', label: 'Descripción', width: '270' },
   		                   { name: 'inCodSer', index: 'inCodSer', label: 'Codigo Servicio', hidden: true },
   		                   { name: 'vcDesSer', index: 'vcDesSer', label: 'Servicio', hidden: true, width: '80' },
   		                   { name: 'inCodTipSer', index: 'inCodTipSer', label: 'Tipo', hidden: true, width: '80', align: 'center' },
   		                   { name: 'vcDesTipSer', index: 'vcDesTipSer', label: 'Tipo Concepto', hidden: true, width: '80' },
   		                   { name: 'inPos', index: 'inPos', label: 'Posición', width: '80', sorttype: 'int', align: 'right' },
   		                   { name: 'inLon', index: 'inLon', label: 'Longitud', width: '50', sorttype: 'int', hidden: true },
   		                   { name: 'vcDesRes', index: 'vcDesRes', label: 'Descripción Resumen', hidden: true },
                           { name: 'inCodTipCon', index: 'inCodTipCon', label: 'Cod Tipo Concepto', width: '50', sorttype: 'int', align: 'right', hidden: true }
   	                      ],
        sortname: "inPos", //Default SortColumn
        rowList: [50, 75, 100],
        rowNum: 50,
        sortorder: "asc", //Default SortOrder.
        shrinkToFit: false,
        width: "510",
        height: ($(window).height() - HeigthGrilla1),
        rownumbers: true,
        caption: "Campos",
        ondblClickRow: function (id) { $("#btnModificar").click(); }
    });

    $("#tbCampoPlantilla").jqGrid('bindKeys', { "onEnter": function (id) { $("#btnModificar").click(); }, "onSpace": function (id) { $("#btnModificar").click(); } });

    inicio();
    //if (window.parent.$("#hdfCod").val() != "") {
    //    CargarPlantillaXTipo();
    //}

    $('#rbtActualizaCosto').change(function () {
        if ($('#rbtActualizaCosto').is(':checked')) {
            $("#ddlTipoCosteo").show();
        }
        else {
            $("#ddlTipoCosteo").hide();
        }
    });

    $('#rbtCostoIncluido').change(function () {
        if ($('#rbtCostoIncluido').is(':checked')) {
            $("#ddlTipoCosteo").hide();
            //$("#rbtActualizaCosto").hide(); //JHERRERA 20140814
            //$('label[for="rbtActualizaCosto"]').hide(); //JHERRERA 20140814
        } else {
            $("#ddlTipoCosteo").show();
            //$("#rbtActualizaCosto").show(); //JHERRERA 20140814
            //$('label[for="rbtActualizaCosto"]').show(); //JHERRERA 20140814
        }
    });


    $("#btnOpcion").click(function () {
        TipoPlantilla = $("#ddlTipoPlantilla").val();
        $('#dvOpciones').dialog({
            title: "Opciones de plantilla",
            modal: true,
            width: '502px',
            close: function (event, ui) {
                if (TipoPlantilla != $("#ddlTipoPlantilla").val()) {
                    var DatosInicio = $("#tbCampoPlantilla").jqGrid('getRowData');
                    var ExisteInicio = false;
                    var ind = 1;
                    $(DatosInicio).each(function () {
                        if (this.P_inCodCam == 115) {
                            $("#tbCampoPlantilla").jqGrid('delRowData', ind);
                            ExisteInicio = true;
                        }
                        ind++;
                    });
                    if (ExisteInicio) {
                        $("#ddlCampo").html("");

                        var Datos = $("#tbCampoPlantilla").jqGrid('getRowData');

                        $(window.parent.lstCampo).each(function () {
                            var inCodCam = this.P_inCodCam;
                            var vcNomCam = this.vcDes;
                            var Existe = false;

                            $(Datos).each(function () {
                                if (this.P_inCodCam == inCodCam) {
                                    Existe = true;
                                }
                            });

                            if (!Existe) {
                                $("#ddlCampo").append($("<option></option>").attr("value", inCodCam).text(vcNomCam));
                            }
                        });
                    }
                }
            }
        });
    });

    $("#btnOpcionResumen").click(function () {
        TipoPlantilla = $("#ddlTipoPlantilla").val();
        $('#dvOpcionesResumen').dialog({
            title: "Opciones de plantilla - Resumen",
            modal: true,
            width: '502px',
            close: function (event, ui) {
                if (TipoPlantilla != $("#ddlTipoPlantilla").val()) {
                    var DatosInicio = $("#tbCampoPlantilla").jqGrid('getRowData');
                    var ExisteInicio = false;
                    var ind = 1;
                    $(DatosInicio).each(function () {
                        if (this.P_inCodCam == 115) {
                            $("#tbCampoPlantilla").jqGrid('delRowData', ind);
                            ExisteInicio = true;
                        }
                        ind++;
                    });
                    if (ExisteInicio) {
                        $("#ddlCampo").html("");

                        var Datos = $("#tbCampoPlantilla").jqGrid('getRowData');

                        $(window.parent.lstCampo).each(function () {
                            var inCodCam = this.P_inCodCam;
                            var vcNomCam = this.vcDes;
                            var Existe = false;

                            $(Datos).each(function () {
                                if (this.P_inCodCam == inCodCam) {
                                    Existe = true;
                                }
                            });

                            if (!Existe) {
                                $("#ddlCampo").append($("<option></option>").attr("value", inCodCam).text(vcNomCam));
                            }
                        });
                    }
                }
            }
        });
    });

    // ===================================================================
    //  AGREGAR 
    // ===================================================================
    $("#btnAgregar").click(function () {

        var MaxPos = 0;

        $('#lblCampo').html("");
        $('#lblCampo').hide();
        $('#ddlCampo').show();
        $("select#ddlCampo").prop('selectedIndex', 0);

        $('#lblServicio').html("");
        $('#lblServicio').hide();
        $('#lblTipo').html("");
        $('#lblTipo').hide();

        $('#trDescripcion').hide();

        //$("select#ddlTipoServicioImportador").prop('selectedIndex', 0);
        $("#txtDescripcion").val("");

        $("#txtPosicion").focus();
        $("#txtPosicion").select();

        var datos = $("#tbCampoPlantilla").jqGrid('getRowData');

        // ===================================================================================
        //  HINOPE  
        // ===================================================================================
        if ($('#rdTipPla_1').is(':checked')) {

            if ($("#ddlArchivo").val() == "2") {
                $("#trLongitud").show();
            }
            $("#trServicio").show();
            $("#ddlTipoServicioImportador").show();
            //$("#ddlServicioResumenCosto").show();

            //$("#ddlServicioResumenConsumo").show();
            //$("#ddlServicioResumenCosto").hide();

            $("#ddlTipoServicioImportador").val("-1");
            var cod = $("#ddlTipoServicioImportador").val();
            ListarConceptoxTipo(cod);

        }
        // ===================================================================================
        //  HINOPE  
        // ===================================================================================

        $(datos).each(function () {
            if (MaxPos < parseInt(this.inPos)) {
                MaxPos = parseInt(this.inPos);
            }
        });

        MaxPos = MaxPos + 1;
        $('#txtPosicion').val(MaxPos);

        $('#dvCamposDetalle').dialog({
            title: "Agregar campo",
            modal: true,
            width: 450,
            buttons: {
                "Agregar": function () {

                    var inCodCam = $('#ddlCampo').val();
                    var inPos = $('#txtPosicion').val();
                    var inLon = $('#txtLongitud').val();
                    var inSer = "-1";
                    var inTip = "-1";
                    var vcSer = "";
                    var vcDes = "";
                    var vcTip = "";
                    var Repetido = 0;
                    var inCodTipCon = "-1";
                    var inCodSer;
                    // ===================================================================================
                    //  HINOPE  
                    // ===================================================================================
                    var inTipoPlantilla = $("#rdTipPla_1").is(':checked');
                    var vcddlCampo = $("#ddlCampo option:selected").text();

                    if (inTipoPlantilla) {

                        // ===================================================================================================
                        // RESUMEN
                        // ===================================================================================================
                        var vcTipo = $("#ddlTipoServicioImportador").val();

                        //                        if (vcTipo == '1') {
                        //                            if ($("#ddlServicioResumenCosto").val() == "-1") {
                        //                                alerta("Seleccione un servicio");

                        //                                return;
                        //                            }
                        //                        } else {
                        //                            if ($("#ddlServicioResumenConsumo").val() == "-1") {
                        //                                alerta("Seleccione un servicio");

                        //                                return;
                        //                            }
                        //                        }
                        // ===================================================================================================
                        // ECONDEÑA
                        // ===================================================================================================

                        var vcConceptoEn = $("#ddlConceptosEn").val();

                        if (vcTipo == '1') {
                            if (vcConceptoEn == 'columna') {
                                if ($("#ddlListaConceptos").val() == "-1") {
                                    alerta("Seleccione un tipo de concepto");

                                    return;
                                }
                            }
                        }
                        if ($("#ddlTipoServicioImportador").val() == "-1") {
                            alerta("Seleccione un tipo de concepto");

                            return;
                        }



                        if (vcConceptoEn == 'columna') {
                            if ($("#ddlListaConceptos").val() == "-1" || $("#ddlListaConceptos").val() == "") {
                                alerta("Seleccione un concepto");
                                return;
                            }
                        }
                        else {
                            if ($("#ddlCampoServicio").val() == "-1" || $("#ddlCampoServicio").val() == "") {
                                alerta("Seleccione un campo");
                                return;
                            }
                        }

                        //                        inSer = (vcTipo == '1' ? $("#ddlServicioResumenCosto").val() : $("#ddlServicioResumenConsumo").val());
                        inSer = (vcTipo == '1' ? $("#ddlListaConceptos").val() : $("#ddlListaConceptos").val());

                        inTip = $("#ddlTipoServicioImportador").val();

                        vcDes = (vcTipo == '1' ? $("#ddlListaConceptos option:selected").text() : $("#ddlListaConceptos option:selected").text());
                        vcSer = (vcTipo == '1' ? $("#ddlListaConceptos option:selected").text() : $("#ddlListaConceptos option:selected").text());

                        //                        vcDes = (vcTipo == '1' ? $("#ddlServicioResumenCosto option:selected").text() : $("#ddlServicioResumenConsumo option:selected").text());
                        //                        vcSer = (vcTipo == '1' ? $("#ddlServicioResumenCosto option:selected").text() : $("#ddlServicioResumenConsumo option:selected").text());

                        inCodTipCon = $("#ddlTipoServicioImportador option:selected").val();

                        vcTip = $("#ddlTipoServicioImportador option:selected").text();

                        vcddlCampo = vcSer;
                        inCodCam = 115;
                        inLon = $("#txtLongitud").val();

                        inCodSer = $("#ddlListaConceptos").val();


                        if (vcConceptoEn == 'fila') {
                            inCodSer = $("#ddlCampoServicio option:selected").val();
                            inSer = $("#ddlCampoServicio option:selected").val();
                            vcDes = $("#ddlCampoServicio option:selected").text();
                            vcSer = $("#ddlCampoServicio option:selected").text();
                            vcddlCampo = vcSer;
                        }

                        //alert(vcDes);

                        //                        if ($("#ddlTipoServicioImportador").val() == '1') {
                        //                            inCodSer = $("#ddlServicioResumenCosto").val();
                        //                        } else if ($("#ddlTipoServicioImportador").val() == '2') {
                        //                            inCodSer = $("#ddlServicioResumenConsumo").val();
                        //                        }

                        // ===================================================================================
                        //  HINOPE  
                        // ===================================================================================
                    }


                    if (inCodCam == -1) {
                        alerta("Seleccione un campo");
                        $('#ddlCampo').focus();
                        return;
                    }
                    if (inPos == "") {
                        alerta("Ingrese una posición");
                        $('#txtPosicion').focus();
                        return;
                    }
                    if (parseInt(inPos) == 0) {
                        alerta("Ingrese una posición mayor a cero");
                        $('#txtPosicion').focus();
                        return;
                    }
                    if (inLon == "") {
                        if ($("#ddlArchivo").val() == "2") {
                            alerta("Ingrese una longitud");
                            $('#txtLongitud').focus();
                            return;
                        }
                        else {
                            inLon = "1";
                        }
                    }
                    if (parseInt(inLon) == 0) {
                        if ($("#ddlArchivo").val() == "2") {
                            alerta("Ingrese una longitud mayor a cero");
                            $('#txtLongitud').focus();
                            return;
                        }
                        else {
                            inLon = "1";
                        }
                    }


                    if (inPos.substring(0, 1) == "0") {
                        alerta("Ingrese una Posición válida - No se Permite que el Valor inicie con cero");
                        $('#txtPosicion').focus();
                        return;
                    }

                    if (inLon.substring(0, 1) == "0") {
                        alerta("Ingrese una Longitud válida - No se Permite que el Valor inicie con cero");
                        $('#txtLongitud').focus();
                        return;
                    }


                    var datos = $("#tbCampoPlantilla").jqGrid('getRowData');

                    $(datos).each(function () {
                        if (parseInt($('#txtPosicion').val()) == parseInt(this.inPos)) {
                            //cadenaOriginal.replaceFirst ("^0*", "")
                            Repetido = 1;
                        }
                        // ===================================================================================
                        //  HINOPE  
                        // ===================================================================================
                        if (inTipoPlantilla) {

                            if (vcSer.toUpperCase() == this.vcDesCam.toUpperCase() && vcTip.toUpperCase() == this.vcDesTipSer.toUpperCase()) {
                                Repetido = 2;
                            }
                        }
                        // ===================================================================================
                        //  HINOPE  
                        // ===================================================================================
                    });

                    if (Repetido == 1) {
                        alerta("La posición ingresada ya ha sido registrada");
                        $('#txtPosicion').focus();
                        return;
                    }
                    // ===================================================================================
                    //  HINOPE  
                    // ===================================================================================
                    if (Repetido == 2) {
                        alerta("El servicio seleccionado ya esta registrado");
                        //$('#txtPosicion').focus();
                        return;
                    }
                    // ===================================================================================
                    //  HINOPE  
                    // ===================================================================================

                    //                            $("#tbCampoPlantilla").addRowData(inCodCam, { P_inCodCam: inCodCam, vcCodCam: String.fromCharCode(inCodCam), vcDesCam: $("#ddlCampo option:selected").text(),
                    //                                inCodSer: inSer, vcDesSer: vcSer, inCodTipSer: inTip, vcDesTipSer: vcTip, inPos: inPos, inLon: inLon, vcDesRes: vcDes
                    //                            }, "before", 8);





                    // ===================================================================================================
                    // AGREGAR CAMPO
                    // ===================================================================================================

                    $("#tbCampoPlantilla").jqGrid('addRowData', inPos, { P_inCodCam: inCodCam, vcCodCam: String.fromCharCode(inCodCam), vcDesCam: vcddlCampo,
                        inCodSer: inSer, vcDesSer: vcSer, inCodTipSer: vcTip, vcDesTipSer: vcTip, inPos: inPos, inLon: inLon, vcDesRes: vcDes
                        , inCodTipCon: inCodTipCon
                    });

                    //                            $("#tbCampoPlantilla").trigger("reloadGrid");

                    //                            $("#tbCampoPlantilla").jqGrid('delRowData', inPos);

                    ActualizaPlantilla();

                    if (!$('#chkServicioCampo').is(':checked') || inCodCam != "115") {
                        $("#ddlCampo option:selected").remove();
                    }

                    else {
                        if (vcTipo == '1') {

                            var inIndex = $("#ddlServicioResumenCosto option:selected").index();
                            $("select#ddlServicioResumenCosto").prop('selectedIndex', (inIndex + 1));
                        }
                        if (vcTipo == '2') {

                            var inIndex = $("#ddlServicioResumenConsumo option:selected").index();
                            $("select#ddlServicioResumenConsumo").prop('selectedIndex', (inIndex + 1));

                        }
                    }

                    Mensaje("<br/><h1>Campo agregado</h1><h2>Para guardar los cambios de forma permanente, dé click en el botón guardar</h2><br/>", document, CerroMensaje);
                    $(this).dialog("close");
                },
                Cancelar: function () {
                    $(this).dialog("close");
                }
            }
        });
    });

    //JHERRERA 20140908//
    $("#chkContieneNumCelular").change(function () {
        if ($(this).is(':checked')) {
            $("#ddlUbicacionNumCelular").prop("disabled", true);
            $("#ddlUbicacionNumCelular").val("0");
        } else {
            $("#ddlUbicacionNumCelular").prop("disabled", false);
        }
    });

    $("#chkContieneFecha").change(function () {
        if ($(this).is(':checked')) {
            $("#ddlUbicacionFecha").prop("disabled", true);
            $("#ddlUbicacionFecha").val("0");
        } else {
            $("#ddlUbicacionFecha").prop("disabled", false);
        }
    });
    //-----------------//

    function CerroMensaje() {
        $('#txtLongitud').val('');
    }

    // ===============================================================================================
    //  MODIFICAR
    // ===============================================================================================
    $("#btnModificar").click(function () {
        var PosAct;
        var id = $("#tbCampoPlantilla").jqGrid('getGridParam', 'selrow');

        if (id) {

            var datos = $("#tbCampoPlantilla").jqGrid('getRowData', id);

            PosAct = datos.inPos;
            $('#ddlCampo').hide();
            $('#lblCampo').html(datos.vcDesCam);
            $('#lblCampo').show();
            $('#txtPosicion').val(PosAct);
            $('#txtLongitud').val(datos.inLon);
            $('#lblServicio').html("");
            $('#lblServicio').hide();
            $('#lblTipo').html("");
            $('#lblTipo').hide();
            //            $('#ddlTipoServicioImportador').hide();

            $('#trDescripcion').hide();
            $('#ddlServicioResumen').hide();
            $('#ddlServicioResumenConsumo').hide();

            $("#ddlTipoServicioImportador").val(datos.inCodTipCon);
            //            
            //            $("#ddlListaConceptos").val(datos.inCodSer);
            $("#ddlListaConceptos").hide();

            var vcConceptoEn = $("#ddlConceptosEn").val();
            if (vcConceptoEn == 'columna') {
                $("#ddlListaConceptos").show();
                $("#ddlCampoServicio").hide();
            }
            else {
                $("#ddlCampoServicio").show();
                $("#ddlListaConceptos").hide();
            }

            //$("select#ddlTipoServicioImportador").prop('selectedIndex', 0);

            // ===========================================================
            //  HINOPE
            // ===========================================================
            if ($('#rdTipPla_1').is(':checked')) {

                $('#lblServicio').html(datos.vcDesCam);
                $('#lblTipo').html(datos.vcDesTipSer);

                //alert(datos.vcDesCam);
                //alert(datos.vcDesTipSer);

                $("#ddlCampoServicio").val(datos.inCodSer);
                //$('#ddlCampoServicio').find('option:contains("' + datos.vcDesCam + '")').attr('selected', true);

                //                $('#lblServicio').show();
                //                $('#lblTipo').show();

                ListarConceptoxTipo(datos.inCodTipCon, datos.inCodSer);


                //$("#ddlListaConceptos").show();


            }
            // ===========================================================
            //  END HINOPE
            // ===========================================================

            $('#dvCamposDetalle').dialog({
                title: "Editar campo",
                modal: true,
                width: 450,
                buttons: {
                    "Modificar": function () {
                        if ($('#rdTipPla input:checked').val() == "2") {

                            var vcConceptoEn = $("#ddlConceptosEn").val();

                            if (vcTipo == '1') {
                                if (vcConceptoEn == 'columna') {
                                    if ($("#ddlListaConceptos").val() == "-1") {
                                        alerta("Seleccione un tipo de concepto");

                                        return;
                                    }
                                }
                            }
                            if ($("#ddlTipoServicioImportador").val() == "-1") {
                                alerta("Seleccione un tipo de concepto");

                                return;
                            }



                            if (vcConceptoEn == 'columna') {
                                if ($("#ddlListaConceptos").val() == "-1" || $("#ddlListaConceptos").val() == "") {
                                    alerta("Seleccione un concepto");
                                    return;
                                }
                            }
                            else {
                                if ($("#ddlCampoServicio").val() == "-1" || $("#ddlCampoServicio").val() == "") {
                                    alerta("Seleccione un campo");
                                    return;
                                }
                            }

                            var inPos = $('#txtPosicion').val();
                            var inLon = $('#txtLongitud').val();

                            var vcTipo = $("#ddlTipoServicioImportador").val();

                            var vcDes = (vcTipo == '1' ? $("#ddlListaConceptos option:selected").text() : $("#ddlListaConceptos option:selected").text());
                            var vcSer = (vcTipo == '1' ? $("#ddlListaConceptos option:selected").text() : $("#ddlListaConceptos option:selected").text());
                            var inCodTipCon = $("#ddlTipoServicioImportador option:selected").val();

                            var vcTip = $("#ddlTipoServicioImportador option:selected").text();

                            var inCodSer = $("#ddlListaConceptos option:selected").val();

                            if (vcConceptoEn == 'fila') {
                                inCodSer = $("#ddlCampoServicio option:selected").val();
                                vcDes = $("#ddlCampoServicio option:selected").text();
                                vcSer = $("#ddlCampoServicio option:selected").text();
                            }

                            //alert(vcDes);

                            var inTipoPlantilla = $("#rdTipPla_1").is(':checked');
                            //var vcddlCampo = $("#ddlCampo option:selected").text();

                        } else {
                            var inPos = $('#txtPosicion').val();
                            var inLon = $('#txtLongitud').val();
                            var vcDes = $('#txtDescripcion').val();
                        }
                        var Repetido = 0;

                        if (inPos == "") {
                            alerta("Ingrese una posición");
                            $('#txtPosicion').focus();
                            return;
                        }
                        if (inLon == "") {
                            if ($("#ddlArchivo").val() == "2") {
                                alerta("Ingrese una longitud");
                                $('#txtLongitud').focus();
                                return;
                            }
                            else {
                                inLon = "1";
                            }
                        }
                        if (parseInt(inLon) == 0) {
                            if ($("#ddlArchivo").val() == "2") {
                                alerta("Ingrese una longitud mayor a cero");
                                $('#txtLongitud').focus();
                                return;
                            }
                            else {
                                inLon = "1";
                            }
                        }
                        if (parseInt(inPos) == 0) {
                            alerta("Ingrese una posición mayor a cero");
                            $('#txtPosicion').focus();
                            return;
                        }

                        var datos = $("#tbCampoPlantilla").jqGrid('getRowData');
                        $(datos).each(function () {
                            if (parseInt($('#txtPosicion').val()) == parseInt(this.inPos)) {
                                Repetido = 1;
                            }
                        });

                        if (Repetido == 1 && PosAct != $('#txtPosicion').val()) {
                            alerta("La posición ingresada ya ha sido registrada");
                            $('#txtPosicion').focus();
                            return;
                        }

                        if ($('#rdTipPla input:checked').val() == "2") {
                            $("#tbCampoPlantilla").jqGrid('setRowData', id, { 'inPos': inPos, 'inLon': inLon, 'inCodSer': inCodSer, 'vcDesTipSer': vcTip, 'vcDesCam': vcDes, 'vcDesRes': vcDes, 'inCodTipCon': inCodTipCon, 'inCodTipSer': vcTip });
                        } else {
                            $("#tbCampoPlantilla").jqGrid('setRowData', id, { 'inPos': inPos, 'inLon': inLon, 'inCodSer': inCodSer, 'vcDesTipSer': vcTip, 'vcDesCam': vcSer, 'vcDesRes': vcDes, 'inCodTipCon': inCodTipCon, 'inCodTipSer': vcTip });
                        }
                        ActualizaPlantilla();
                        Mensaje("<br/><h1>Campo actualizado</h1><h2>Para guardar los cambios de forma permanente, dé click en el botón guardar</h2><br/>", document, CerroMensaje);
                        $(this).dialog("close");

                    },
                    Cerrar: function () {
                        $(this).dialog("close");
                    }
                }
            });
        }
        else {
            alerta("Seleccione un campo");
        }
    });

    $("#btnQuitar").click(function () {
        var id = $("#tbCampoPlantilla").jqGrid('getGridParam', 'selrow');
        if (id) {
            $('#divMsgConfirmacion').dialog({
                title: "Quitar campo",
                modal: true,
                buttons: {
                    "Si": function () {
                        $("#tbCampoPlantilla").jqGrid('delRowData', id);
                        $("#ddlCampo").html("");

                        var Datos = $("#tbCampoPlantilla").jqGrid('getRowData');

                        $(window.parent.lstCampo).each(function () {
                            var inCodCam = this.P_inCodCam;
                            var vcNomCam = this.vcDes;
                            var Existe = false;

                            $(Datos).each(function () {
                                if (this.P_inCodCam == inCodCam) {
                                    Existe = true;
                                }
                            });

                            if (!Existe) {
                                $("#ddlCampo").append($("<option></option>").attr("value", inCodCam).text(vcNomCam));
                            }
                        });

                        Mensaje("<br/><h1>Campo removido</h1><h2>Para guardar los cambios de forma permanente, dé click en el botón guardar</h2><br/>", document, CerroMensaje);
                        ActualizaPlantilla();
                        $(this).dialog("close");
                    },
                    "Cancelar": function () {
                        $(this).dialog("close");
                    }
                }
            });
        }
        else {
            alerta("Seleccione un campo");
        }
    });

    //MPAJUELO_20160731
    $("#ddlConceptosEn").change(function () {
        var vcConceptoEn = $(this).val();
        if (vcConceptoEn == 'columna') {
            $("#ddlListaConceptos").show();
            $("#ddlCampoServicio").hide();
        }
        else {
            $("#ddlCampoServicio").show();
            $("#ddlListaConceptos").hide();
        }
    });

    $("#ddlModoImpuesto").change(function () {
        var ModoImpuesto = $(this).val();
        if (ModoImpuesto == '' || ModoImpuesto == '0') {
            $(".filaImpuesto").hide();
        }
        else {
            $(".filaImpuesto").show();
        }
    });

    $("#ddlServicioResumenCosto").change(function () {
        $("#txtPosicion").focus();
        $("#txtPosicion").select();
    });
    $("#ddlServicioResumenConsumo").change(function () {
        $("#txtPosicion").focus();
        $("#txtPosicion").select();
    });


    $("#ddlTipoPlantilla").change(function () {
        if ($(this).val() == "1") {
            $("#chkServicioCampo").attr('checked', false);
            //$("#tbCampoPlantilla").jqGrid('hideCol', ["vcDesSer", "vcDesTipSer"]);
        }
        else if ($(this).val() == "2") {
            $("#chkServicioCampo").attr('checked', true);
            //$("#tbCampoPlantilla").jqGrid('showCol', ["vcDesSer", "vcDesTipSer"]); //$("#tbCampoPlantilla").jqGrid('hideCol', ["vcDesSer", "vcDesTipSer"]);
        }
    });

    $("#chkServicioCampo").change(function () {
        //        if ($('#chkServicioCampo').is(':checked')) {
        //            //$("#tbCampoPlantilla").jqGrid('showCol', ["vcDesSer", "vcDesTipSer"]);
        //        }
        //        else {
        //            //$("#tbCampoPlantilla").jqGrid('hideCol', ["vcDesSer", "vcDesTipSer"]);
        //        }
    });


    $("#ddlCampo").change(function () {
        if ($('#chkServicioCampo').is(':checked')) {
            if ($(this).val() == "115") {

                $('#trDescripcion').show();

                //$("select#ddlTipoServicioImportador").prop('selectedIndex', 0);
                $("#txtDescripcion").val("");
            }
            else {

                $('#trDescripcion').hide();
            }
        }
    });

    var formatoFec;
    formatoFec = $("#ddlFormatoFechaDia").val() + $('#txtSeparadorFecha').val() + $("#ddlFormatoFechaMes").val() + $('#txtSeparadorFecha').val() + $("#ddlFormatoFechaAnho").val();
    $('#txtFechaFormato').val(formatoFec);

    $("#ddlFormatoFechaDia").change(function () {
        $('#txtFechaFormato').val('');
        formatoFec = $(this).val() + $('#txtSeparadorFecha').val() + $("#ddlFormatoFechaMes").val() + $('#txtSeparadorFecha').val() + $("#ddlFormatoFechaAnho").val();
        $('#txtFechaFormato').val(formatoFec);
    });

    $("#ddlFormatoFechaMes").change(function () {
        $('#txtFechaFormato').val('');
        formatoFec = $("#ddlFormatoFechaDia").val() + $('#txtSeparadorFecha').val() + $(this).val() + $('#txtSeparadorFecha').val() + $("#ddlFormatoFechaAnho").val();
        $('#txtFechaFormato').val(formatoFec);
    });

    $("#ddlFormatoFechaAnho").change(function () {
        $('#txtFechaFormato').val('');
        formatoFec = $("#ddlFormatoFechaDia").val() + $('#txtSeparadorFecha').val() + $("#ddlFormatoFechaMes").val() + $('#txtSeparadorFecha').val() + $(this).val();
        $('#txtFechaFormato').val(formatoFec);
    });



    function fnOcultarFiltro2() {
        $("#trFiltro2").hide();
        $("#trFiltro2_0").hide();
        $("#txtFiltro2").val("");
        $("#chkInsEntrFil2").prop("disabled", true);
        $("#chkInsEntrFil2").attr('checked', false);
        $("#trFiltro2_2").hide();
        $("#ddlServicioFiltro2").val("-1");
    }
    function fnOcultarFiltro3() {
        $("#trFiltro3").hide();
        $("#trFiltro3_0").hide();
        $("#txtFiltro3").val("");
        $("#chkInsEntrFil3").prop("disabled", true);
        $("#chkInsEntrFil3").attr('checked', false);
        $("#trFiltro3_2").hide();
        $("#ddlServicioFiltro3").val("-1");
    }
    function fnOcultarFiltro4() {
        $("#trFiltro4").hide();
        $("#trFiltro4_0").hide();
        $("#txtFiltro4").val("");
        $("#chkInsEntrFil4").prop("disabled", true);
        $("#chkInsEntrFil4").attr('checked', false);
        $("#trFiltro4_2").hide();
        $("#ddlServicioFiltro4").val("-1");
    }
    function fnOcultarFiltro5() {
        $("#trFiltro5").hide();
        $("#trFiltro5_0").hide();
        $("#txtFiltro5").val("");
        $("#chkInsEntrFil5").prop("disabled", true);
        $("#chkInsEntrFil5").attr('checked', false);
        $("#trFiltro5_2").hide();
        $("#ddlServicioFiltro5").val("-1");
    }
    function fnOcultarFiltro6() {
        $("#trFiltro6").hide();
        $("#trFiltro6_0").hide();
        $("#txtFiltro6").val("");
        $("#chkInsEntrFil6").prop("disabled", true);
        $("#chkInsEntrFil6").attr('checked', false);
        $("#trFiltro6_2").hide();
        $("#ddlServicioFiltro6").val("-1");
    }

    $("#txtFiltro1").keyup(function () {
        if ($(this).val() == "") {
            $("#chkInsEntrFil1").prop("disabled", true);
            $("#chkInsEntrFil1").attr('checked', false);
            $("#trFiltro1_2").hide();
            $("#ddlServicioFiltro1").val("-1");

            fnOcultarFiltro2();
            fnOcultarFiltro3();
            fnOcultarFiltro4();
            fnOcultarFiltro5();
            fnOcultarFiltro6();
        }
        else {
            $("#chkInsEntrFil1").prop("disabled", false);
            $("#trFiltro2").show();
            $("#trFiltro2_0").show();
        }
    });

    $("#txtFiltro2").keyup(function () {
        if ($(this).val() == "") {
            $("#chkInsEntrFil2").prop("disabled", true);
            $("#chkInsEntrFil2").attr('checked', false);
            $("#trFiltro2_2").hide();
            $("#ddlServicioFiltro2").val("-1");

            fnOcultarFiltro3();
            fnOcultarFiltro4();
            fnOcultarFiltro5();
            fnOcultarFiltro6();
        }
        else {
            $("#chkInsEntrFil2").prop("disabled", false);
            $("#trFiltro3").show();
            $("#trFiltro3_0").show();
        }
    });

    $("#txtFiltro3").keyup(function () {
        if ($(this).val() == "") {
            $("#chkInsEntrFil3").prop("disabled", true);
            $("#chkInsEntrFil3").attr('checked', false);
            $("#trFiltro3_2").hide();
            $("#ddlServicioFiltro3").val("-1");

            fnOcultarFiltro4();
            fnOcultarFiltro5();
            fnOcultarFiltro6();
        }
        else {
            $("#chkInsEntrFil3").prop("disabled", false);
            $("#trFiltro4").show();
            $("#trFiltro4_0").show();
        }
    });

    $("#txtFiltro4").keyup(function () {
        if ($(this).val() == "") {
            $("#chkInsEntrFil4").prop("disabled", true);
            $("#chkInsEntrFil4").attr('checked', false);
            $("#trFiltro4_2").hide();
            $("#ddlServicioFiltro4").val("-1");

            fnOcultarFiltro5();
            fnOcultarFiltro6();
        }
        else {
            $("#chkInsEntrFil4").prop("disabled", false);
            $("#trFiltro5").show();
            $("#trFiltro5_0").show();
        }
    });

    $("#txtFiltro5").keyup(function () {
        if ($(this).val() == "") {
            $("#chkInsEntrFil5").prop("disabled", true);
            $("#chkInsEntrFil5").attr('checked', false);
            $("#trFiltro5_2").hide();
            $("#ddlServicioFiltro5").val("-1");

            fnOcultarFiltro6();
        }
        else {
            $("#chkInsEntrFil5").prop("disabled", false);
            $("#trFiltro6").show();
            $("#trFiltro6_0").show();
        }
    });

    $("#txtFiltro6").keyup(function () {
        if ($(this).val() == "") {
            $("#chkInsEntrFil6").prop("disabled", true);
            $("#chkInsEntrFil6").attr('checked', false);
            $("#trFiltro6_2").hide();
            $("#ddlServicioFiltro6").val("-1");
        }
        else {
            $("#chkInsEntrFil6").prop("disabled", false);
        }

    });

    $("#rbSeparador").change(function () {
        var valor = $("input[name='rbSeparador']:checked").val();
        if (valor == "3") {
            $("#txtOtroSeparador").show();
        }
        else {
            $("#txtOtroSeparador").hide();
        }
    });

    function fnOcultarFiltroPlaMul2() {
        $("#trFiltroMultiple2").hide();
        $("#trFiltroMultiple2_0").hide();
        $("#TxtFiltroMultiple_2").val("");
        $("#trFiltroMultiple2_2").hide();
        $("#trFiltroMultiple2_3").hide();
        $("#ddlFiltroMultiple_2").val("-1");
    }
    function fnOcultarFiltroPlaMul3() {
        $("#trFiltroMultiple3").hide();
        $("#trFiltroMultiple3_0").hide();
        $("#TxtFiltroMultiple_3").val("");
        $("#trFiltroMultiple3_2").hide();
        $("#trFiltroMultiple3_3").hide();
        $("#ddlFiltroMultiple_3").val("-1");
    }
    function fnOcultarFiltroPlaMul4() {
        $("#trFiltroMultiple4").hide();
        $("#trFiltroMultiple4_0").hide();
        $("#TxtFiltroMultiple_4").val("");
        $("#trFiltroMultiple4_2").hide();
        $("#trFiltroMultiple4_3").hide();
        $("#ddlFiltroMultiple_4").val("-1");
    }
    function fnOcultarFiltroPlaMul5() {
        $("#trFiltroMultiple5").hide();
        $("#trFiltroMultiple5_0").hide();
        $("#TxtFiltroMultiple_5").val("");
        $("#trFiltroMultiple5_2").hide();
        $("#trFiltroMultiple5_3").hide();
        $("#ddlFiltroMultiple_5").val("-1");
    }
    function fnOcultarFiltroPlaMul6() {
        $("#trFiltroMultiple6").hide();
        $("#trFiltroMultiple6_0").hide();
        $("#TxtFiltroMultiple_6").val("");
        $("#trFiltroMultiple6_2").hide();
        $("#trFiltroMultiple6_3").hide();
        $("#ddlFiltroMultiple_6").val("-1");
    }

    $("#TxtFiltroMultiple_1").keyup(function () {
        if ($(this).val() == "") {
            $("#trFiltroMultiple1_2").hide();
            $("#trFiltroMultiple1_3").hide();
            $("#ddlFiltroMultiple_1").val("-1");

            fnOcultarFiltroPlaMul2();
            fnOcultarFiltroPlaMul3();
            fnOcultarFiltroPlaMul4();
            fnOcultarFiltroPlaMul5();
            fnOcultarFiltroPlaMul6();
        }
        else {
            $("#trFiltroMultiple1_2").show();
            $("#trFiltroMultiple1_3").show();
            CargarPlantillas("ddlFiltroMultiple_1");
        }
    });

    $("#ddlFiltroMultiple_1").change(function () {
        if ($(this).val() == "-1") {
            $("#trFiltroMultiple2").hide();
            $("#trFiltroMultiple2_0").hide();
        }
        else {
            $("#trFiltroMultiple2").show();
            $("#trFiltroMultiple2_0").show();
        }
    });

    $("#TxtFiltroMultiple_2").keyup(function () {
        if ($(this).val() == "") {
            $("#trFiltroMultiple2_2").hide();
            $("#trFiltroMultiple2_3").hide();
            $("#ddlFiltroMultiple_2").val("-1");

            fnOcultarFiltroPlaMul3();
            fnOcultarFiltroPlaMul4();
            fnOcultarFiltroPlaMul5();
            fnOcultarFiltroPlaMul6();
        }
        else {
            $("#trFiltroMultiple2_2").show();
            $("#trFiltroMultiple2_3").show();
            CargarPlantillas("ddlFiltroMultiple_2");
        }
    });

    $("#ddlFiltroMultiple_2").change(function () {
        if ($(this).val() == "-1") {
            $("#trFiltroMultiple3").hide();
            $("#trFiltroMultiple3_0").hide();
        }
        else {
            $("#trFiltroMultiple3").show();
            $("#trFiltroMultiple3_0").show();
        }
    });

    $("#TxtFiltroMultiple_3").keyup(function () {
        if ($(this).val() == "") {
            $("#trFiltroMultiple3_2").hide();
            $("#trFiltroMultiple3_3").hide();
            $("#ddlFiltroMultiple_3").val("-1");

            fnOcultarFiltroPlaMul4();
            fnOcultarFiltroPlaMul5();
            fnOcultarFiltroPlaMul6();
        }
        else {
            $("#trFiltroMultiple3_2").show();
            $("#trFiltroMultiple3_3").show();
            CargarPlantillas("ddlFiltroMultiple_3");
        }
    });

    $("#ddlFiltroMultiple_3").change(function () {
        if ($(this).val() == "-1") {
            $("#trFiltroMultiple4").hide();
            $("#trFiltroMultiple4_0").hide();
        }
        else {
            $("#trFiltroMultiple4").show();
            $("#trFiltroMultiple4_0").show();
        }
    });

    $("#TxtFiltroMultiple_4").keyup(function () {
        if ($(this).val() == "") {
            $("#trFiltroMultiple4_2").hide();
            $("#trFiltroMultiple4_3").hide();
            $("#ddlFiltroMultiple_4").val("-1");

            fnOcultarFiltroPlaMul5();
            fnOcultarFiltroPlaMul6();
        }
        else {
            $("#trFiltroMultiple4_2").show();
            $("#trFiltroMultiple4_3").show();
            CargarPlantillas("ddlFiltroMultiple_4");
        }
    });

    $("#ddlFiltroMultiple_4").change(function () {
        if ($(this).val() == "-1") {
            $("#trFiltroMultiple5").hide();
            $("#trFiltroMultiple5_0").hide();
        }
        else {
            $("#trFiltroMultiple5").show();
            $("#trFiltroMultiple5_0").show();
        }
    });

    $("#TxtFiltroMultiple_5").keyup(function () {
        if ($(this).val() == "") {
            $("#trFiltroMultiple5_2").hide();
            $("#trFiltroMultiple5_3").hide();
            $("#ddlFiltroMultiple_5").val("-1");

            fnOcultarFiltroPlaMul6();
        }
        else {
            $("#trFiltroMultiple5_2").show();
            $("#trFiltroMultiple5_3").show();
            CargarPlantillas("ddlFiltroMultiple_5");
        }
    });

    $("#ddlFiltroMultiple_5").change(function () {
        if ($(this).val() == "-1") {
            $("#trFiltroMultiple6").hide();
            $("#trFiltroMultiple6_0").hide();
        }
        else {
            $("#trFiltroMultiple6").show();
            $("#trFiltroMultiple6_0").show();
        }
    });

    $("#TxtFiltroMultiple_6").keyup(function () {
        if ($(this).val() == "") {
            $("#trFiltroMultiple6_2").hide();
            $("#trFiltroMultiple6_3").hide();
            $("#ddlFiltroMultiple_6").val("-1");
        }
        else {
            $("#trFiltroMultiple6_2").show();
            $("#trFiltroMultiple6_3").show();
            CargarPlantillas("ddlFiltroMultiple_6");
        }

    });


    function fnOcultarFiltroPlaCab2() {
        $("#txtCabTexto_2").val("");
        $("#TxtCabLongitud_2").val("");
        $("#trCabecera2").hide();
        $("#trLongitud2").hide();
        $("#trSeparador2").hide();
    }
    function fnOcultarFiltroPlaCab3() {
        $("#txtCabTexto_3").val("");
        $("#TxtCabLongitud_3").val("");
        $("#trCabecera3").hide();
        $("#trLongitud3").hide();
        $("#trSeparador3").hide();
    }
    function fnOcultarFiltroPlaCab4() {
        $("#txtCabTexto_4").val("");
        $("#TxtCabLongitud_4").val("");
        $("#trCabecera4").hide();
        $("#trLongitud4").hide();
        $("#trSeparador4").hide();
    }
    function fnOcultarFiltroPlaCab5() {
        $("#txtCabTexto_5").val("");
        $("#TxtCabLongitud_5").val("");
        $("#trCabecera5").hide();
        $("#trLongitud5").hide();
        $("#trSeparador5").hide();
    }
    function fnOcultarFiltroPlaCab6() {
        $("#txtCabTexto_6").val("");
        $("#TxtCabLongitud_6").val("");
        $("#trCabecera6").hide();
        $("#trLongitud6").hide();
        $("#trSeparador6").hide();
    }

    $("#txtCabTexto_1").keyup(function () {
        if ($(this).val() == "") {
            $("#TxtCabLongitud_1").prop("disabled", true);
            $("#TxtCabLongitud_1").val("");
            fnOcultarFiltroPlaCab2();
            fnOcultarFiltroPlaCab3();
            fnOcultarFiltroPlaCab4();
            fnOcultarFiltroPlaCab5();
            fnOcultarFiltroPlaCab6();
        }
        else {
            $("#TxtCabLongitud_1").prop("disabled", false);
            $("#TxtCabLongitud_1").val("");
        }
    });
    $("#TxtCabLongitud_1").keyup(function () {
        if ($(this).val() == "") {
            $("#trSeparador2").hide();
            $("#trCabecera2").hide();
            $("#trLongitud2").hide();
        }
        else {
            $("#trSeparador2").show();
            $("#trCabecera2").show();
            $("#trLongitud2").show();

        }
    });

    $("#txtCabTexto_2").keyup(function () {
        if ($(this).val() == "") {
            $("#TxtCabLongitud_2").prop("disabled", true);
            $("#TxtCabLongitud_2").val("");
            fnOcultarFiltroPlaCab3();
            fnOcultarFiltroPlaCab4();
            fnOcultarFiltroPlaCab5();
            fnOcultarFiltroPlaCab6();
        }
        else {
            $("#TxtCabLongitud_2").prop("disabled", false);
            $("#TxtCabLongitud_2").val("");

        }
    });
    $("#TxtCabLongitud_2").keyup(function () {
        if ($(this).val() == "") {
            $("#trSeparador3").hide();
            $("#trCabecera3").hide();
            $("#trLongitud3").hide();
        }
        else {
            $("#trSeparador3").show();
            $("#trCabecera3").show();
            $("#trLongitud3").show();

        }
    });

    $("#txtCabTexto_3").keyup(function () {
        if ($(this).val() == "") {
            $("#TxtCabLongitud_3").prop("disabled", true);
            $("#TxtCabLongitud_3").val("");
            fnOcultarFiltroPlaCab4();
            fnOcultarFiltroPlaCab5();
            fnOcultarFiltroPlaCab6();
        }
        else {
            $("#TxtCabLongitud_3").prop("disabled", false);
            $("#TxtCabLongitud_3").val("");
        }
    });
    $("#TxtCabLongitud_3").keyup(function () {
        if ($(this).val() == "") {
            $("#trSeparador4").hide();
            $("#trCabecera4").hide();
            $("#trLongitud4").hide();
        }
        else {
            $("#trSeparador4").show();
            $("#trCabecera4").show();
            $("#trLongitud4").show();

        }
    });

    $("#txtCabTexto_4").keyup(function () {
        if ($(this).val() == "") {
            $("#TxtCabLongitud_4").prop("disabled", true);
            $("#TxtCabLongitud_4").val("");
            fnOcultarFiltroPlaCab5();
            fnOcultarFiltroPlaCab6();
        }
        else {
            $("#TxtCabLongitud_4").prop("disabled", false);
            $("#TxtCabLongitud_4").val("");
        }
    });
    $("#TxtCabLongitud_4").keyup(function () {
        if ($(this).val() == "") {
            $("#trSeparador5").hide();
            $("#trCabecera5").hide();
            $("#trLongitud5").hide();
        }
        else {
            $("#trSeparador5").show();
            $("#trCabecera5").show();
            $("#trLongitud5").show();

        }
    });

    $("#txtCabTexto_5").keyup(function () {
        if ($(this).val() == "") {
            $("#TxtCabLongitud_5").prop("disabled", true);
            $("#TxtCabLongitud_5").val("");
            fnOcultarFiltroPlaCab6();
        }
        else {
            $("#TxtCabLongitud_5").prop("disabled", false);
            $("#TxtCabLongitud_5").val("");
        }
    });
    $("#TxtCabLongitud_5").keyup(function () {
        if ($(this).val() == "") {
            $("#trSeparador6").hide();
            $("#trCabecera6").hide();
            $("#trLongitud6").hide();
        }
        else {
            $("#trSeparador6").show();
            $("#trCabecera6").show();
            $("#trLongitud6").show();
        }
    });

    $("#txtCabTexto_6").keyup(function () {
        if ($(this).val() == "") {
            $("#TxtCabLongitud_6").prop("disabled", true);
            $("#TxtCabLongitud_6").val("");
        }
        else {
            $("#TxtCabLongitud_6").prop("disabled", false);
            $("#TxtCabLongitud_6").val("");
        }
    });


    function ActualizaPlantilla() {
        var MaxPos = 0;
        var tipoArchivo = $("#ddlArchivo").val();
        var vcPlan = "";
        var vcPlanDec = "";
        var vcPlanUn = "";
        var vcPlanLit = "";
        var lstPlan;
        var lstPlanLit;
        var datos = $("#tbCampoPlantilla").jqGrid('getRowData');

        $(datos).each(function () {
            if (MaxPos < parseInt(this.inPos)) {
                MaxPos = parseInt(this.inPos);
            }
        });

        lstPlan = [MaxPos];
        lstPlanLit = [MaxPos];

        if (MaxPos > 0) {
            vcPlanDec = "0";
        }

        var i = 0;
        for (i = 0; i < MaxPos; i++) {
            lstPlan[i] = '*';
            lstPlanLit[i] = '';
            var i2 = (i + 1).toString();

            if (i < 9) {
                vcPlanUn += i2;
            }
            else {
                vcPlanUn += i2.substring(i2.length - 1, i2.length);
            }
            if (i > 0) {
                if ((i + 1) % 10) {
                    vcPlanDec += "_";
                }
                else {
                    vcPlanDec += i2.substring(i2.length - 2, i2.length - 1);
                }
            }
        }

        $(datos).each(function () {
            lstPlan[parseInt(this.inPos) - 1] = this.vcCodCam;
            lstPlanLit[parseInt(this.inPos) - 1] = this.vcDesCam;
        });
        var i = 0;

        for (i = 0; i < MaxPos; i++) {
            vcPlan += lstPlan[i];
            vcPlanLit += lstPlanLit[i];
            if (i < MaxPos - 1) {
                vcPlanLit += ",";
            }
        }

        $("#lblPlan").html(vcPlan);
        $("#lblPlanDec").html(vcPlanDec);
        $("#lblPlanUn").html(vcPlanUn);
        $("#lblPlanLit").html(vcPlanLit);
    }

    $("#btnEliminarHoja").click(function () {
        if (window.parent.tbHojas.tabs("length") > 1) {
            window.parent.ActualizaPestanas(window.parent.tbHojas.tabs("option", "selected"));
        }
        else {
            alerta("No puede borrar mas hojas ya que solo existe una");
        }
    });


    $("#ddlTipoServicioImportador").change(function () {

        var cod = $("#ddlTipoServicioImportador").val();
        ListarConceptoxTipo(cod);
    });

});

function fnSortDropDownListByText(selectId) {
    var vcValSel = $("#" + selectId).val();

    var foption = $('#' + selectId + ' option:first');
    var soptions = $('#' + selectId + ' option:not(:first)').sort(function (a, b) {
        //var soptions = $('#' + selectId + ' option').sort(function (a, b) {
        return a.text.toLowerCase() == b.text.toLowerCase() ? 0 : a.text.toLowerCase() < b.text.toLowerCase() ? -1 : 1;
    });
    $('#' + selectId).html(soptions).prepend(foption);
    $("#" + selectId).val(vcValSel);
}

function ListarConceptoxTipo(cod, codSer) {
    $("#ddlListaConceptos").html("");
    $.ajax({
        type: "POST",
        url: "Imp_Mnt_PlantillaDetalle.aspx/ListarConceptoxTipo",
        data: "{'cod': '" + cod + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            var lstServicio = result.d;

            if ($(lstServicio).length > 0) {
                $("#ddlListaConceptos").append($("<option></option>").attr("value", -1).text("<<Seleccionar>>"));
                $(lstServicio).each(function () {
                    $("#ddlListaConceptos").append($("<option></option>").attr("value", this.P_InCodCon).text(this.VcNomCon));
                });
            }
            $('#ddlListaConceptos').val(codSer);
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
}

function CargarPlantillaXTipo(oPlantillaMultiple) {
    var inTipolantilla = $("input[name='rdTipPla']:checked").val();
    var idOperador = window.parent.$("#ddlOperador").val();
    var idTipoArchivo = window.parent.$("#ddlArchivo").val();

    $.ajax({
        type: "POST",
        url: "../Imp_Proceso.aspx/ListarPorOperadorArchivo",
        data: "{'p_inCodOpe': '" + idOperador + "', 'p_inTipArc':'" + idTipoArchivo + "', 'p_inTipPla':'" + inTipolantilla + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            lstPlantillas = [];
            if (result.d.length > 0) {
                $("#ddlFiltroMultiple_1").html("");
                $(result.d).each(function () {
                    if (window.parent.$("#hdfCod").val() != this.P_inCodPla) {
                        lstPlantillas.push({ idPlantilla: this.P_inCodPla, NombrePlantilla: this.vcNom.replace(/&#39/g, "'").replace(/&#92/g, "\\").replace(/&#34/g, '"') });
                    }
                });
            }

            if (window.parent.$("#hdfCod").val() != "") {
                var z = 1;
                $.each(oPlantillaMultiple, function () {
                    $("#TxtFiltroMultiple_" + z).val(this.vcNombreFiltro);
                    //$("#TxtFiltroMultiple_" + z).keyup();
                    $("#trFiltroMultiple" + z + "_2").show();
                    $("#trFiltroMultiple" + z + "_3").show();
                    CargarPlantillas("ddlFiltroMultiple_" + z);
                    //$("#TxtFiltroMultiple_" + z).trigger("keyup"); 
                    $("#ddlFiltroMultiple_" + z).val(this.inCodPla);
                    //$("#TxtFiltroMultiple_" + z).trigger("change"); 
                    //$("#ddlFiltroMultiple_" + z).change();
                    $("#trFiltroMultiple" + (z + 1)).show();
                    $("#trFiltroMultiple" + (z + 1) + "_0").show();
                    z += 1;
                });
            }

        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
}

function CargarPlantillas(ddlPlantilla) {
    if ($("#" + ddlPlantilla + " option ").length == 0) {
        $("#" + ddlPlantilla).html("");
        if (lstPlantillas.length > 1) {
            for (var i = 0; i < lstPlantillas.length; i++) {
                $("#" + ddlPlantilla).append($("<option></option>").attr("value", lstPlantillas[i].idPlantilla).text(lstPlantillas[i].NombrePlantilla));
            }
        } else {
            $("#" + ddlPlantilla).append($("<option></option>").attr("value", "-2").text("Sin Datos"));
        }
    }
}





