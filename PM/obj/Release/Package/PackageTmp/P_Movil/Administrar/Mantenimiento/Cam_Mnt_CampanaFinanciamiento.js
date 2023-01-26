var arMeses = [{ valor: 1, mes: 'Enero' }, { valor: 2, mes: 'Febrero' }, { valor: 3, mes: 'Marzo' }, { valor: 4, mes: 'Abril' }, { valor: 5, mes: 'Mayo' }, { valor: 6, mes: 'Junio' }, { valor: 7, mes: 'Julio' }, { valor: 8, mes: 'Agosto' }, { valor: 9, mes: 'Septiembre' }, { valor: 10, mes: 'Octubre' }, { valor: 11, mes: 'Noviembre' }, { valor: 12, mes: 'Diciembre'}];
var esAdd;
var MargenFiltro = 0;
var MargenHeight = 48;

function inicioPagina() {
    DimPosElementos();
}

function DimPosElementos() {
    var Ancho = $(window).width();
    var Alto = $(window).height();
    //    var AnchoLateral = $(".LateralSplitter");
    //    $(".tabs").css({ height: Alto - 25, width: Ancho - AnchoLateral, marginbotton: 0, paddingbotton: 0 });

    //    $(".Splitter").css({ height: Alto - 18 });

    //    if ($(window).width() < 480) {
    //        $("#tblFinanciamiento").setGridWidth(550);
    //    } else {
    //        $("#tblFinanciamiento").setGridWidth($(window).width() - 170);
    //    }

    $("#tblFinanciamiento").setGridWidth(Ancho - 130);
    $("#tblFinanciamiento").setGridHeight(Alto - 120);

    //    if ($(window).height() < 600 && $(window).height() > 400) {
    //        $("#tblFinanciamiento").setGridHeight(($(window).height() - 50) / 2);
    //    } else if ($(window).height() < 400) {
    //        $("#tblFinanciamiento").setGridHeight(200);
    //    } else {
    //        $("#tblFinanciamiento").setGridHeight(300);
    //    }
}

$(function () {
    $("input:checkbox,input:radio,input:file").uniform();
    combokendoFormar("#ddlCampanaActiva", 200);
    combokendoFormar("#ddlBusquedaFinan", 200);
    combokendoFormar("#ddlCuotasDobles", 200);
    $(".trFinanciamiento,.trPeriodoGracia,.trCuotasDobles,.trCuotaQuincena,.trIntereses").hide();
    //$("#trGraciaMaxima").hide();
    //$(".trCuotasDobles").hide();
    //$("#trCuotasDobles").hide();
    //$(".trCuotaQuincena").hide();
    //$("#trCuotaQuincena").hide();
    //$(".trIntereses").hide();
    //$("#trTasaInteres").hide();

    $("#txtBusquedaFinanciamiento").keypress(ValidarAlfaNumericoConEspacios);

    ValidarNumeroEnCajaTexto("txtPerGraMax", ValidarEnteroPositivo);
    ValidarNumeroEnCajaTexto("txtCuotaQuincena", ValidarEnteroPositivo);
    ValidarNumeroEnCajaTexto("txtTasaInteres", ValidarDecimalPositivo);

    var oColModelFinanciamiento = [
            { name: 'rowId', label: 'rowId', fixed: true, sortable: false, resize: false, width: 20, hidden: true },
            { name: 'IdCampana', label: 'IdCampana', fixed: true, sortable: false, resize: false, width: 20, hidden: true },
            { name: 'IdTipoFinanciamiento', label: 'IdTipoFinanciamiento', key: true, index: 'id', width: 80, hidden: true },
            { name: 'Codigo', label: 'Código Financ.', index: 'codfin', hidden: false },
            { name: 'Descripcion', label: 'Descripción', index: 'invdate', width: 280 },
            { name: 'DescripcionCorta', label: 'Desc. Corta', index: 'codfin', hidden: true },
            { name: 'PagoContado', label: 'Pago Contado', hidden: true },
            { name: 'MinimoCuotas', label: 'MinimoCuotas', hidden: true },
            { name: 'MaximoCuotas', label: 'MaximoCuotas', hidden: true },
            { name: 'Cuotas', label: 'Cuotas', hidden: true },
            { name: 'MesesCuotas', label: 'MesesCuotas', hidden: true },
            { name: 'PeriodoGraciaMax', label: 'Periodo Gracia Máxima', index: 'invdate', hidden: true },
            { name: 'MinimoMesesPeriodoGracia', label: 'Mínimo Meses Período Gracia', hidden: true },
            { name: 'MaximoMesesPeriodoGracia', label: 'Máximo Meses Período Gracia', hidden: true },
            { name: 'MesesPeriodoGracia', label: 'Meses Periodo Gracia', hidden: true },
            { name: 'CuotasDobles', label: 'Cuotas Dobles', hidden: true },
            { name: 'MesesCuotasDobles', label: 'Meses Cuotas Dobles', hidden: true },
            { name: 'CuotaQuincena', label: 'Cuota Quincena', hidden: true },
            { name: 'MinimoCuotaPrimeraQuincena', label: 'MinimoCuotaPrimeraQuincena', hidden: true },
            { name: 'MaximoCuotaPrimeraQuincena', label: 'Máximo Cuota Primera Quincena', hidden: true },
            { name: 'CuotaPrimeraQuincena', label: 'Cuota Primera Quincena', hidden: true },
            { name: 'Intereses', label: 'Intereses', hidden: true },
            { name: 'TipoInteres', label: 'Tipo Interes', hidden: true },
            { name: 'TasaInteres', label: 'Tasa Interes', hidden: true },
            { name: 'IdEstado', label: 'Estado', hidden: true },
    // jbalmaceda 20160706 172200
            {name: 'EsDefault', label: 'Por Defecto', width: 60, formatter: function (value, options, rData) { if (value == "True") { return "SI"; } else { return "NO"; } } },
            { name: 'Categoria', label: 'Categoría', width: 80, formatter: function (value, options, rData) { if (value == "C") { return "Chip"; } else { return "Equipo"; } } },
]



    var oColModelFinanciamientoTipo = [
               { name: 'IdTipoFinanciamiento', label: 'IdTipoFinanciamiento', sortable: false, hidden: true },
               { name: 'IdCliente', label: 'IdCliente', hidden: true },
               { name: 'Codigo', label: 'Código', width: 80 },
               { name: 'Descripcion', label: 'Descripción', width: 200 },
               { name: 'DescripcionCorta', label: 'Descripción Corta', hidden: true },
               { name: 'PagoContado', label: 'Pago Contado', width: 60, formatter: function (value, options, rData) { if (value == "True") { return 'SI'; } else { return 'NO'; } } },
               { name: 'PeriodoGracia', label: 'Período Gracia', width: 60, formatter: function (value, options, rData) { if (value == "True") { return 'SI'; } else { return 'NO'; } } },
               { name: 'CuotasDobles', label: 'Cuotas Dobles', width: 60, formatter: function (value, options, rData) { if (value == "True") { return 'SI'; } else { return 'NO'; } } },
               { name: 'MesesCuotasDobles', label: 'MesesCuotasDobles', hidden: true },
               { name: 'CuotaQuincena', label: 'Cuota Quincena', index: 'CuotaQuincena', width: 60, formatter: function (value, options, rData) { if (value == "True") { return 'SI'; } else { return 'NO'; } } },
               { name: 'Interés', label: 'Interes', index: 'Interes', width: 60, formatter: function (value, options, rData) { if (value == "True") { return 'SI'; } else { return 'NO'; } } },
               { name: 'TipoInteres', label: 'Tipo Interes', hidden: true },
               { name: 'TasaInteres', label: 'TasaInteres', index: 'TasaInteres', hidden: true },
               { name: 'IdEstado', label: 'IdEstado', hidden: true },
               { name: 'Vigente', label: 'Vigente', hidden: true },
               { name: 'MaximoMesesPeriodoGracia', label: 'Máximo Meses Período Gracia', hidden: true },
               { name: 'MinimoMesesPeriodoGracia', label: 'Mínimo Meses Período Gracia', hidden: true },
               { name: 'MesesPeriodoGracia', label: 'Meses Periodo Gracia', hidden: true },
               { name: 'MaximoCuotaPrimeraQuincena', label: 'Máximo Cuota Primera Quincena', hidden: true },
               { name: 'MinimoCuotaPrimeraQuincena', label: 'MinimoCuotaPrimeraQuincena', hidden: true },
               { name: 'CuotaPrimeraQuincena', label: 'Cuota Primera Quincena', hidden: true },
               { name: 'MaximoCuotas', label: 'MaximoCuotas', hidden: true },
               { name: 'MinimoCuotas', label: 'MinimoCuotas', hidden: true },
               { name: 'Cuotas', label: 'Cuotas', hidden: true },
               { name: 'MesesCuotas', label: 'MesesCuotas', hidden: true },
    //jbalmaceda 20160704 092500
               {name: 'IsDefault' + 'IdTipoFinanciamiento', label: 'Por Defecto', align: 'center', hidden: false, width: 100, formatter: function (value, options, rData) {
                   var CustomID = "chk_IsDefault_" + rData[0];
                   return "<input id='" + CustomID + "'  type='checkbox' onclick= 'f_IsDefault(" + rData[0] + ")' />";
               }
           },
               { name: 'Category', label: 'Categoría', align: 'center', hidden: false, width: 100, formatter: function (value, options, rData) {
                   var CustomID = "slct_Categoria_" + rData[0];
                   return "<select id='" + CustomID + "'><option value='E'>Equipo</option><option value='C'>Chip</option></select>";
               }
               }
            ];



    var AnchoGrilla = $(window).width() - 140;
    //var tblFinanciamiento = JQGrid("#tblFinanciamiento", "#pagerFinanciamiento", "local", oColModelFinanciamiento, AnchoGrilla, 195, "rowId", true, DCEditarFinanciamiento, fnFinancSelect);
    var tblFinanciamiento = JQGrid("#tblFinanciamiento", "#pagerFinanciamiento", CargarCampanaFinanciamiento, oColModelFinanciamiento, AnchoGrilla, 195, "rowId", true, DCEditarFinanciamiento, fnFinancSelect);
    //var tbTipoFinanc = JQGrid("#tbTipoFinanc", "#pagerFinanc", "local", oColModelFinanciamientoTipo, 670, 100, "IdTipoFinanciamiento", false, DCFinancTipo, fnFinancTipoSelect);
    var tbTipoFinanc = JQGrid("#tbTipoFinanc", "#pagerFinanc", "", oColModelFinanciamientoTipo, 670, 120, "IdTipoFinanciamiento", false, DCFinancTipo, fnFinancTipoSelect);
    //var tbTipoFinanc = JQGrid("#tbTipoFinanc", "#pagerFinanc", MostrarFinanciamientoTipo, oColModelFinanciamientoTipo, 670, 120, "IdTipoFinanciamiento", false, DCFinancTipo, fnFinancTipoSelect);

    inicioPagina();
    $(window).resize(function () {
        DimPosElementos();
    });



    $("#ddlCampanaActiva").change(function () {
        var IdCampana = $("#ddlCampanaActiva").data("kendoComboBox").value();
        limpiarValoresFiltro();
        CargarCampanaFinanciamiento();
    });

    //FILTRO FINANCIAMIENTO
    $("#txtBusquedaFinanciamiento").focus(function () {
        if ($(this).hasClass("txtBusqueda")) {
            $(this).removeClass("txtBusqueda");
            $(this).val("");
        }
    });
    $("#txtBusquedaFinanciamiento").keyup(function () {
        setTimeout(CargarCampanaFinanciamiento(), 1000);
    });
    $("#txtBusquedaFinanciamiento").focusout(function () {
        if (!$(this).hasClass("txtBusqueda") && $(this).val() == '') {
            $(this).addClass("txtBusqueda");
            $(this).val("Valor a filtrar");
        }
    });

    //ACCIONES
    $("#btnAgregarFinanciamiento").click(function () {
        if ($("#ddlCampanaActiva").data("kendoComboBox").value() == "-1") {
            alerta("Seleccione una Campaña");
            return;
        }
        $("#divTipoFinacDetalles").hide();
        MostrarFinanciamientoTipo();
    });


    //jbalmaceda 20160707 114600 ========== EDITAR/ACTUALIZAR FINANCIAMIENTO =========

    $("#btnEditarFinanciamiento").click(function () {
        var IdFin = $("#tblFinanciamiento").jqGrid('getGridParam', 'selrow');
        var data = $("#tblFinanciamiento").jqGrid('getRowData', IdFin);

        if (data.EsDefault == "NO") {
            $("#chk_isDefault_Modifica").attr('checked', false);
            $("#chk_isDefault_Modifica").uniform();
        }
        else {
            $("#chk_isDefault_Modifica").attr('checked', true);
            $("#chk_isDefault_Modifica").uniform();
        }

        if (data.Categoria == "Equipo") {
            $('#slct_cat option').removeAttr('selected');
            $('#slct_cat option')[0].selected = true;
        }
        else {
            $('#slct_cat option').removeAttr('selected');
            $('#slct_cat option')[1].selected = true;
        }


        if (data.Categoria != null) {
            $("#txt_IdFinanc").val(data.IdTipoFinanciamiento);

            $("#div_ModificarFinanciamiento").dialog({
                title: "Editar Financiamiento",
                width: 400,
                modal: true,
                resizable: false
            });
        }
        else {
            alerta("Seleccione la fila que desea editar.");
            return;
        }
    });

    $("#dv_cancelFinan").click(function () {
        $("#div_ModificarFinanciamiento").dialog("close");
    });

    $("#dv_updateFinan").click(function () {
        var IdCamp = $("#ddlCampanaActiva").data("kendoComboBox").value();
        var IdFin = $("#tblFinanciamiento").jqGrid('getGridParam', 'selrow');
        var resultValueChk = $("#chk_isDefault_Modifica").is(":checked");
        var EsDefault = resultValueChk;

        var resultValueSelectOpt = $("#slct_cat").val();
        var Categoria = resultValueSelectOpt;

        if (resultValueChk == true && resultValueSelectOpt == "C") {
            alerta("Solo puede establecer Por Defecto a Categoría Equipo");
            return;
        }

        MetodoWeb("Cam_Mnt_CampanaFinanciamiento.aspx/EditarCampanaFinanciamiento",
            JSON.stringify({ IdCamp: IdCamp, IdFin: IdFin, EsDefault: EsDefault, Categoria: Categoria }), ResultEditarFinanciamiento, null);

        $("#div_ModificarFinanciamiento").dialog("close");
    });

    //==================================================================


    $("#btnGrabarFinanc").click(function () {
        var IdCamp = $("#ddlCampanaActiva").data("kendoComboBox").value();
        var IdFin = $("#tbTipoFinanc").jqGrid('getGridParam', 'selrow');

        // jbalmaceda
        var vcIsDefault = false;
        if ($("#chk_IsDefault_" + IdFin).is(":checked")) { vcIsDefault = true; }
        var EsDefault = vcIsDefault;
        var Categoria = $("#slct_Categoria_" + IdFin).val();
        //var PerGra = $("#txtPerGraMax").val();
        //var CuoDob = '';
        //var CuoQui = $("#txtCuotaQuincena").val();
        //var TasInt = $("#txtTasaInteres").val();
        //var vcMeses = [];

        //for (var i = 0; i < $("#lstCuotasDobles")[0].options.length; i++) {
        //    vcMeses.push($("#lstCuotasDobles")[0].options[i].value);
        //};
        //CuoDob = vcMeses.join(',');
        //var datosFinanTipo = $("#tbTipoFinanc").jqGrid('getRowData', IdFin);
        //if (datosFinanTipo.PeriodoGracia == 'SI' && PerGra == '') {
        //    alerta("Ingrese un período de gracia");
        //    return;
        //} else if (datosFinanTipo.PeriodoGracia == 'NO') {
        //    PerGra = 0;
        //};
        //if (datosFinanTipo.CuotasDobles == 'SI' && CuoDob == '') {
        //    alerta("Ingrese por lo menos un mes para Cuotas Dobles");
        //    return;
        //} else if (datosFinanTipo.CuotasDobles == 'NO') {
        //    CuoDob = '';
        //};
        //if (datosFinanTipo.CuotaQuincena == 'SI' && CuoQui == '') {
        //    alerta("Ingrese monto para Cuota Quincena");
        //    return;
        //} else if (datosFinanTipo.CuotaQuincena == 'NO') {
        //    CuoQui = 0;
        //};
        //if (datosFinanTipo.Interes == 'SI' && TasInt == '') {
        //    alerta("Ingrese una Tasa de Interes");
        //    return;
        //} else if (datosFinanTipo.Interes == 'NO') {
        //    TasInt = 0;
        //};
        //alert(IdCamp + " - " + IdFin);

        if (vcIsDefault == true && Categoria == "C") {
            alerta("Solo puede establecer Por Defecto a Categoría Equipo");
            return;
        }

        if (esAdd) {
            MetodoWeb("Cam_Mnt_CampanaFinanciamiento.aspx/AgregarCampanaFinanciamiento",
            JSON.stringify({ IdCamp: IdCamp, IdFin: IdFin, EsDefault: EsDefault, Categoria: Categoria }), ResultInsertarFinanciamiento, null);
        }


        // else {
        //    IdFin = $("#hdfTipFinanc").val();
        //    MetodoWeb("Cam_Mnt_CampanaFinanciamiento.aspx/EditarCampanaFinanciamiento", JSON.stringify({ IdCamp: IdCamp, IdFin: IdFin }), ResultEditarFinanciamiento, null);
        //};
    });
    $("#btnCerrarDialogFinanc").click(function () {
        $("#divAgregarFinanciamiento").dialog("close");
        $("#divTipoFinacDetalles").hide();
    });

    $("#btnQuitarFinanciamiento").click(function () {
        if ($("#ddlCampanaActiva").data("kendoComboBox").value() == "-1") {
            alerta("Seleccione una Campaña");
            return;
        }
        //eliminar financiamiento de la base de datos
        var idTabFinanc = $("#tblFinanciamiento").jqGrid('getGridParam', 'selarrrow');
        if (idTabFinanc.length != 0) {
            var lstIdFinanc = [];
            var g;
            for (g = 0; g < idTabFinanc.length; g++) {
                var datosFinanc = $("#tblFinanciamiento").jqGrid('getRowData', idTabFinanc[g]);
                lstIdFinanc.push(datosFinanc.IdTipoFinanciamiento);
            }
            var IdFin = lstIdFinanc.join(",");
            var IdCamp = $("#ddlCampanaActiva").data("kendoComboBox").value();
            //Eliminar Financiamiento
            $('#divMsgConfirmacionFinanciamiento').dialog({
                title: "Eliminar Financiamiento",
                modal: true,
                buttons: {
                    "Si": function () {
                        //alert(IdFin + " , " + IdCamp);
                        MetodoWeb("Cam_Mnt_CampanaFinanciamiento.aspx/EliminarFinanciamiento", JSON.stringify({ IdFin: IdFin, IdCamp: IdCamp }), ResulEliminarFinanciamiento, null);
                        $(this).dialog("close");
                    },
                    "Cancelar": function () {
                        $(this).dialog("close");
                    }
                },
                resizable: false
            });
        } else {
            alerta("Seleccione por lo menos un Financiamiento");
        }
    });

    //AGREGAR Y QUITAR MESES
    $("#imgAgregarMes").click(function () {
        if ($("#ddlCuotasDobles").data("kendoComboBox").value() != "-1") {
            var vcMes = $("#ddlCuotasDobles").data("kendoComboBox").text();
            var vcValor = $("#ddlCuotasDobles").data("kendoComboBox").value();
            var blnExiste = 0;
            var i;
            for (i = 0; i < $("#lstCuotasDobles")[0].options.length; i++) {
                if ($.trim($("#lstCuotasDobles")[0].options[i].value) == vcValor) {
                    blnExiste = 1;
                }
            }
            if (blnExiste == 0) {
                $("#lstCuotasDobles").append($("<option></option>").attr("value", vcValor).text(vcMes));
                $("#ddlCuotasDobles").data("kendoComboBox").value(-1);
                $("#ddlCuotasDobles").focus();
            } else {
                alerta("Ya existe el mes seleccionado.");
            }
        } else {
            alerta("Debe seleccionar un mes.");
        }
    });
    $("#imgQuitarMes").click(function () {
        var len = $("#lstCuotasDobles option:selected").length;
        if (len != 0) {
            var vcValor = $("#lstCuotasDobles option:selected")[0].value;
            if (vcValor != null) {
                var i;
                for (i = 0; i < $("#lstCuotasDobles")[0].options.length; i++) {
                    if ($.trim($("#lstCuotasDobles")[0].options[i].value) == vcValor) {
                        $("#lstCuotasDobles")[0].options.remove(i);
                    }
                }
            }
        }
        else {
            alerta("Seleccione un mes a quitar");
        }
    });
});                                                                                                                                          //FIN LOAD

//FUNCIONES DE CARGA DE DATOS
function CargarCampanaFinanciamiento() {

    var IdCampana = $("#ddlCampanaActiva").data("kendoComboBox").value();
    var vcCampoFiltro = $("#ddlBusquedaFinan").data("kendoComboBox").value();
    var vcValorFiltro = $("#txtBusquedaFinanciamiento").val();
    var inPagTam = $("#tblFinanciamiento").getGridParam("rowNum");
    var inPagAct = $("#tblFinanciamiento").getGridParam("page");

    if($("#txtBusquedaFinanciamiento").hasClass("txtBusqueda")) {
        vcValorFiltro = '';
    }

    if (IdCampana != "-1") {
        MetodoWeb("Cam_Mnt_CampanaFinanciamiento.aspx/ListarCampFinanciamiento",
        JSON.stringify({ 'IdCampana': IdCampana, 'vcCampoFiltro': vcCampoFiltro, 'vcValorFiltro': vcValorFiltro, inPagTam: inPagTam, inPagAct: inPagAct }), CargarFinanciamiento, null);
    } else {
        $("#tblFinanciamiento").jqGrid('clearGridData');
    }

}




function MostrarFinanciamientoTipo() {
    //cargar tipos de financiamientos tipos
    esAdd = true;
    var IdCampana = $("#ddlCampanaActiva").data("kendoComboBox").value();
    var inPagTam = $("#tbTipoFinanc").getGridParam("rowNum");
    var inPagAct = $("#tbTipoFinanc").getGridParam("page");
    if (IdCampana != "-1") {
        MetodoWeb("Cam_Mnt_CampanaFinanciamiento.aspx/ListarFinanciamientoTipo", JSON.stringify({ inPagTam: inPagTam, inPagAct: inPagAct }), CargarFinanciamientoTipo, null);
    } else {
        //alerta("Seleccione una Campaña");
    }
}

//FUNCIONES RESULT
//function CargarFinanciamiento(lstFinanciamiento) {
//    $("#tblFinanciamiento").jqGrid('clearGridData');
//    if ($(lstFinanciamiento).length > 0) {
//        for (var i = 0; i < $(lstFinanciamiento).length; i++) {
//            var idFinanc = $.jgrid.randId(); //genera un numero aleatrio unico
//            $("#tblFinanciamiento").jqGrid('addRowData', idFinanc, lstFinanciamiento[i]);
//        };
//    } else {
//        //alerta("No hay datos");
//    };
//};


function CargarFinanciamiento(lstFinanciamiento) { //agregado 29-11-2013


    $("#tblFinanciamiento").jqGrid('clearGridData');
    if ($(lstFinanciamiento).length > 0) {
        $("#tblFinanciamiento")[0].addJSONData(lstFinanciamiento);
    } else {
        //alerta("No hay datos");
    }
}

function CargarFinanciamientoTipo(lstFinancTipo) {
    $("#tbTipoFinanc").jqGrid('clearGridData');
    if ($(lstFinancTipo).length > 0) {
        //for (var i = 0; i < $(lstFinancTipo).length; i++) {
        //    $("#tbTipoFinanc").jqGrid('addRowData', lstFinancTipo[i].IdTipoFinanciamiento, lstFinancTipo[i]);
        //};
        $("#tbTipoFinanc")[0].addJSONData(lstFinancTipo);
        $("#trTipoFinanc").show();
        $("#btnGrabarFinanc").show();
        $("#divAgregarFinanciamiento").dialog({
            title: "Agregar Financiamiento",
            width: 700,
            //height: 400,
            modal: true,
            resizable: false
        });
    } else {
        alerta("No hay datos disponibles");
    }
}

function ResultInsertarFinanciamiento(result) {
    if (result == "1") {
        alerta("Financiamiento Guardado con éxito");
        CargarCampanaFinanciamiento();
        $("#divAgregarFinanciamiento").dialog("close");
    } else {
        alerta("Ya existe financiamiento");
    }
}

//function CargarFinanciamientoTipoEdit(lstFinancTipo) {
//    $("#tbTipoFinanc").jqGrid('clearGridData');
//    if ($(lstFinancTipo).length > 0) {
//        $("#tbTipoFinanc")[0].addJSONData(lstFinancTipo);
//        $("#trTipoFinanc").hide();
//        var FinancSel = $("#tblFinanciamiento").jqGrid('getGridParam', 'selarrrow');
//        if (FinancSel.length != 0) {
//            if (FinancSel.length == 1) {
//                var datosEditFinanc = $("#tblFinanciamiento").jqGrid('getRowData', FinancSel[0]);
//                //DIALOG FORMAT
//                var datosTipoFinanc = $("#tbTipoFinanc").jqGrid('getRowData', datosEditFinanc.IdTipoFinanciamiento);
//                //fnFinancTipoSelect(datosTipoFinanc.IdTipoFinanciamiento);
//                //$("#hdfTipFinanc").val(datosEditFinanc.IdTipoFinanciamiento);
//                //fnFinancTipoSelect(datosEditFinanc.IdTipoFinanciamiento);
//                //$("#txtPerGraMax").val(datosEditFinanc.PeriodoGraciaMax);
//                //$("#lstCuotasDobles").html('');
//                //if (datosEditFinanc.CuotasDobles != '') {
//                //    var mesEdit = datosEditFinanc.CuotasDobles.split(',');
//                //    for (var i = 0; i < mesEdit.length; i++) {
//                //        var indexMex = mesEdit[i] - 1;
//                //        $("#lstCuotasDobles").append($("<option></option>").attr("value", arMeses[indexMex].valor).text(arMeses[indexMex].mes));
//                //    };
//                //};
//                //$("#txtCuotaQuincena").val(datosEditFinanc.CuotaQuincena);
//                //$("#txtTasaInteres").val(datosEditFinanc.TasaInteres);
//                //if (datosEditFinanc.CuotaQuincena == '') {
//                //    $("#trCuotaQuincena").hide();
//                //}
//                //if (datosEditFinanc.TasaInteres == '') {
//                //    $("#trTasaInteres").hide();
//                //}
//                $("#divAgregarFinanciamiento").dialog({
//                    title: "Editar Financiamiento",
//                    width: 400,
//                    //height: 400,
//                    modal: true,
//                    resizable: false
//                });
//                fnFinancTipoSelect(datosTipoFinanc.IdTipoFinanciamiento);
//            } else {
//                alerta("Seleccione solo un Financiamiento para editar");
//            };
//        } else {
//            alerta("Seleccione un Financiamiento");
//        };
//    } else {
//        alerta("No hay datos disponibles");
//    };
//};

function ResultEditarFinanciamiento(resultado) {
    if (resultado == "1") {
        alerta("Financiameitno editado con éxito");
        CargarCampanaFinanciamiento();
    } else {
        alerta("Error al editar Financiamiento");
    }
    $("#divAgregarFinanciamiento").dialog("close");
}

function ResulEliminarFinanciamiento(resultado) {
    if (resultado.length > 0) {
        alerta("No se eliminaron " + resultado.length + " financiamientos");
    } else {
        alerta("Financiamiento eliminado con éxito");
        CargarCampanaFinanciamiento();
    }
}
//FUNCIONES LIMPIAR
function limpiarValoresFiltro() {
    if ($("#txtBusquedaFinanciamiento").val() != '') {
        $("#txtBusquedaFinanciamiento").addClass("txtBusqueda");
        $("#txtBusquedaFinanciamiento").val("Valor a filtrar");
    }
}

//OTRAS FUNCIONES
function combokendoFormar(control, altura) {
    $(control).removeClass("ui-widget-content ui-corner-all");
    $(control).css("padding", "0px");
    $(control).css("margin", "0px");
    $(control).kendoComboBox({
        filter: "contains",
        suggest: true,
        height: altura,
        dataTextField: "text",
        dataValueField: "value"
    });
}

function DCEditarFinanciamiento(id) {
    //$("#btnEditarFinanciamiento").click();
    //detalleFinanciamientoTipo();
    $(".trPeriodoGracia,.trCuotasDobles,.trCuotaQuincena,.trIntereses").hide();
    $("#trTipoFinanc").hide();
    $("#divTipoFinacDetalles").show();
    var datosTipoFinanc = $("#tblFinanciamiento").jqGrid('getRowData', id);
    if (datosTipoFinanc.PagoContado == 'False') {
        $(".trFinanciamiento").show();
        if (datosTipoFinanc.MinimoCuotas != '' && datosTipoFinanc.MaximoCuotas != '') {
            $("#lblDefFinanciamiento").text("Número de cuotas de financiamiento por rango:");
            $("#lblDatosFinanciamiento").text(datosTipoFinanc.MinimoCuotas + " - " + datosTipoFinanc.MaximoCuotas + " cuotas");
        } else if (datosTipoFinanc.Cuotas != '') {
            $("#lblDefFinanciamiento").text("Número de cuotas de financiamiento predefinido:");
            $("#lblDatosFinanciamiento").text(datosTipoFinanc.Cuotas + " cuotas");
        } else if (datosTipoFinanc.MesesCuotas != '') {
            $("#lblDefFinanciamiento").text("Meses de financiamiento predefinido:");
            var arMesesCuotasFinanc = datosTipoFinanc.MesesCuotas.split(',');
            var meses = [];
            var i;
            var idMes;
            for (i = 0; i < arMesesCuotasFinanc.length; i++) {
                idMes = arMesesCuotasFinanc[i] - 1;
                meses.push(arMeses[idMes].mes);
            }
            $("#lblDatosFinanciamiento").text(meses.join(","));
        } else if (datosTipoFinanc.MinimoCuotas != '' && datosTipoFinanc.MaximoCuotas != '' && datosTipoFinanc.MesesCuotas != '') {
            $("#lblDefFinanciamiento").text("Meses definidos por el usuario");
            $("#lblDatosFinanciamiento").text('');
        }
    } else {
        $(".trFinanciamiento").show();
        $("#lblDefFinanciamiento").text("Pago al contado");
        $("#lblDatosFinanciamiento").text('');
    }
    if (datosTipoFinanc.PeriodoGraciaMax == 'True') {
        $(".trPeriodoGracia").show(150);
        if (datosTipoFinanc.MinimoMesesPeriodoGracia != '' && datosTipoFinanc.MaximoMesesPeriodoGracia != '') {
            $("#lblDefPeriodoGracia").text("Período de Gracia por rango:");
            $("#lblDatosPeriodoGracia").text(datosTipoFinanc.MinimoMesesPeriodoGracia + " - " + datosTipoFinanc.MaximoMesesPeriodoGracia + " meses");
        } else if (datosTipoFinanc.MesesPeriodoGracia != '') {
            $("#lblDefPeriodoGracia").text("Período de Gracia predefinido:");
            $("#lblDatosPeriodoGracia").text(datosTipoFinanc.MesesPeriodoGracia + " meses");
        }
    }
    if (datosTipoFinanc.CuotasDobles == 'True') {
        $(".trCuotasDobles").show(150);
        $("#lblDefCuotasDobles").text('Meses de Cuotas Dobles:');
        var arMesesCuotasDobles = datosTipoFinanc.MesesCuotasDobles.split(',');
        var meses = [];
        //var i;
        //var idMes;
        for (i = 0; i < arMesesCuotasDobles.length; i++) {
            idMes = arMesesCuotasDobles[i] - 1;
            meses.push(arMeses[idMes].mes);
        }
        $("#lblDatosCuotasDobles").text(meses.join(","));
    }
    if (datosTipoFinanc.CuotaQuincena == 'True') {
        $(".trCuotaQuincena").show(150);
        if (datosTipoFinanc.MaximoCuotaPrimeraQuincena != '' && datosTipoFinanc.MinimoCuotaPrimeraQuincena != '') {
            $("#lblDefCuotaQuincena").text('Cuota Quincena por rango:');
            $("#lblDatosCuotaQuincena").text(datosTipoFinanc.MinimoCuotaPrimeraQuincena * 100 + "% - " + datosTipoFinanc.MaximoCuotaPrimeraQuincena * 100 + "%");
        }
        if (datosTipoFinanc.CuotaPrimeraQuincena != '') {
            $("#lblDefCuotaQuincena").text('Cuota Quincena predefinida:');
            $("#lblDatosCuotaQuincena").text(datosTipoFinanc.CuotaPrimeraQuincena * 100 + "%");
        }
    }
    if (datosTipoFinanc.Intereses == 'True') {
        $(".trIntereses").show(150);
        $("#lblTasaInteres").text(datosTipoFinanc.TasaInteres * 100 + "%");
        $("#lblTipoInteres").text((datosTipoFinanc.TipoInteres == 'S') ? 'Simple' : 'Compuesta');
    }
    $("#btnGrabarFinanc").hide();
    $("#divAgregarFinanciamiento").dialog({
        title: "Detalles Tipo Financiamiento",
        width: 400,
        //height: 400,
        modal: true,
        resizable: false
    });
}

function fnFinancSelect(id) { }

function DCFinancTipo(id) { }

function fnFinancTipoSelect(id) {

    $("#divTipoFinacDetalles").show();
    var datosTipoFinanc = $("#tbTipoFinanc").jqGrid('getRowData', id);
    if (datosTipoFinanc.PagoContado == 'NO') {
        $(".trFinanciamiento").show();
        if (datosTipoFinanc.MinimoCuotas != '' && datosTipoFinanc.MaximoCuotas != '') {
            $("#lblDefFinanciamiento").text("Número de cuotas de financiamiento por rango:");
            $("#lblDatosFinanciamiento").text(datosTipoFinanc.MinimoCuotas + " - " + datosTipoFinanc.MaximoCuotas + " cuotas");
        } else if (datosTipoFinanc.Cuotas != '') {
            $("#lblDefFinanciamiento").text("Número de cuotas de financiamiento predefinido:");
            $("#lblDatosFinanciamiento").text(datosTipoFinanc.Cuotas + " cuotas");
        } else if (datosTipoFinanc.MesesCuotas != '') {
            $("#lblDefFinanciamiento").text("Meses de financiamiento predefinido:");
            var arMesesCuotasFinanc = datosTipoFinanc.MesesCuotas.split(',');
            var meses = [];
            var idMes;
            var i;
            for (i = 0; i < arMesesCuotasFinanc.length; i++) {
                idMes = arMesesCuotasFinanc[i] - 1;
                meses.push(arMeses[idMes].mes);
            }
            $("#lblDatosFinanciamiento").text(meses.join(","));
        } else if (datosTipoFinanc.MinimoCuotas != '' && datosTipoFinanc.MaximoCuotas != '' && datosTipoFinanc.MesesCuotas != '') {
            $("#lblDefFinanciamiento").text("Meses definidos por el usuario");
            $("#lblDatosFinanciamiento").text('');
        }
    } else {
        $(".trFinanciamiento").hide();
    }
    if (datosTipoFinanc.PeriodoGracia == 'SI') {
        $(".trPeriodoGracia").show(150);
        if (datosTipoFinanc.MinimoMesesPeriodoGracia != '' && datosTipoFinanc.MaximoMesesPeriodoGracia != '') {
            $("#lblDefPeriodoGracia").text("Período de Gracia por rango:");
            $("#lblDatosPeriodoGracia").text(datosTipoFinanc.MinimoMesesPeriodoGracia + " - " + datosTipoFinanc.MaximoMesesPeriodoGracia + " meses");
        } else if (datosTipoFinanc.MesesPeriodoGracia != '') {
            $("#lblDefPeriodoGracia").text("Período de Gracia predefinido:");
            $("#lblDatosPeriodoGracia").text(datosTipoFinanc.MesesPeriodoGracia + " meses");
        }
    } else {
        $(".trPeriodoGracia").hide(150);
    }
    if (datosTipoFinanc.CuotasDobles == 'SI') {
        $(".trCuotasDobles").show(150);
        $("#lblDefCuotasDobles").text('Meses de Cuotas Dobles:');
        var arMesesCuotasDobles = datosTipoFinanc.MesesCuotasDobles.split(',');
        var meses = [];
        //var idMes;
        //var i;
        for (i = 0; i < arMesesCuotasDobles.length; i++) {
            idMes = arMesesCuotasDobles[i] - 1;
            meses.push(arMeses[idMes].mes);
        }
        $("#lblDatosCuotasDobles").text(meses.join(","));
    } else {
        $(".trCuotasDobles").hide(150);
    }
    if (datosTipoFinanc.CuotaQuincena == 'SI') {
        $(".trCuotaQuincena").show(150);
        if (datosTipoFinanc.MaximoCuotaPrimeraQuincena != '' && datosTipoFinanc.MinimoCuotaPrimeraQuincena != '') {
            $("#lblDefCuotaQuincena").text('Cuota Quincena por rango:');
            $("#lblDatosCuotaQuincena").text(datosTipoFinanc.MinimoCuotaPrimeraQuincena * 100 + "% - " + datosTipoFinanc.MaximoCuotaPrimeraQuincena * 100 + "%");
        }
        if (datosTipoFinanc.CuotaPrimeraQuincena != '') {
            $("#lblDefCuotaQuincena").text('Cuota Quincena predefinida:');
            $("#lblDatosCuotaQuincena").text(datosTipoFinanc.CuotaPrimeraQuincena * 100 + "%");
        }
    } else {
        $(".trCuotaQuincena").hide(150);
    }
    if (datosTipoFinanc.Interes == 'SI') 
    {
        //$("trTasaInteres").show();
        $(".trIntereses").show(150);
        $("#lblTasaInteres").text(datosTipoFinanc.TasaInteres * 100 + "%");
        $("#lblTipoInteres").text((datosTipoFinanc.TipoInteres == 'S') ? 'Simple' : 'Compuesta');
    } else 
    {
        $(".trIntereses").hide(150);
    }
}

//function detalleFinanciamientoTipo() {
//    //$("#btnEditarFinanciamiento").click(function () {
//    //cargar tipos de financiamientos tipos
//    esAdd = false;
//    var IdCampana = $("#ddlCampanaActiva").data("kendoComboBox").value();
//    var inPagTam = $("#tbTipoFinanc").getGridParam("rowNum");
//    var inPagAct = $("#tbTipoFinanc").getGridParam("page");
//    if (IdCampana == "-1") {
//        alerta("Seleccione una Campaña");
//        return;
//    }
//    var FinancSel = $("#tblFinanciamiento").jqGrid('getGridParam', 'selarrrow');
//    if (FinancSel.length != 0) {
//        if (FinancSel.length == 1) {
//            MetodoWeb("Cam_Mnt_CampanaFinanciamiento.aspx/ListarFinanciamientoTipo", JSON.stringify({ inPagTam: inPagTam, inPagAct: inPagAct }), CargarFinanciamientoTipoEdit, null);
//        } else {
//            alerta("Seleccione solo un Financiamiento para editar");
//        };
//    } else {
//        alerta("Seleccione un Financiamiento");
//    };
//    //});
//}

function f_IsDefault(id) {

   var valueChk;
    var ctrl = $("#id_financ").text().trim();
    if (ctrl == "") {
        $('input[type="checkbox"]').click(function (event) 
        {
            if (this.checked && $('input:checked').length > 1)
             {
                event.preventDefault();
             }

            else 
            {
                if ($("#chk_IsDefault_" + id).is(':checked'))   
                 {
                    $("#id_financ").val(id);

                    if ($("#chk_IsDefault_" + id).val().trim() == "on") 
                    
                    {
                        valueChk = "1";
                    }

                    $("#def_value").val(valueChk);
                }
                else 
                {
                    $("#id_financ").val("");
                    $("#def_value").val("");
                }
            }
        });
    }

}


////////jbalmaceda 20160705
//////function f_Categoria(idcat) {
//////    $("#cat_value").val(idcat);
//////}

//$('input[type="checkbox"]').click(function (event) {
//    if (this.checked && $('input:checked').length > 1) {
//        event.preventDefault();
//    }
//});