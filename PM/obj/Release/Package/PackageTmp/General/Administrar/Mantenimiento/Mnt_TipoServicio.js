function tipoServicio(P_inCod, vcNom, vcExpEn, mostrarDash, vcRepExpEn) {
    this.P_inCod = P_inCod;
    this.vcNom = vcNom;
    this.vcExpEn = vcExpEn;
    this.mostrarDash = mostrarDash;
    this.vcRepExpEn = vcRepExpEn;
}

var oCulturaUsuario;
var FormatoFechaCulturaForDatePicker = "";
var SimDec = ".";
var SimMil = ",";
var NumDec = "2";
var SimMon = "S/.";

$(function () {
    if ($("#hdfCodigoTipoServicio").val() == 17) {
        $("#trReporteExpEn").show();
    }

    oCulturaUsuario = window.parent.parent.oCulturaUsuario;
    FormatoFechaCulturaForDatePicker = oCulturaUsuario.vcFecCor.toLowerCase();

    if (FormatoFechaCulturaForDatePicker.indexOf("yyyy") >= 0) {
        FormatoFechaCulturaForDatePicker = FormatoFechaCulturaForDatePicker.replace("yyyy", "yy");  //Para datepicker 'yy' es como 'yyyy'; y 'y' es 'yy'
    }
    else if (FormatoFechaCulturaForDatePicker.indexOf("yy") >= 0) {
        FormatoFechaCulturaForDatePicker = FormatoFechaCulturaForDatePicker.replace("yy", "y");
    }

    SimMil = oCulturaUsuario.vcSimSepMil;
    NumDec = oCulturaUsuario.dcNumDec;
    SimDec = oCulturaUsuario.vcSimDec;
    SimMon = oCulturaUsuario.Moneda.vcSimMon;

    $("#txtNombre").keypress(ValidarAlfaNumericoConEspacios);
    $("#txtExp").keypress(ValidarAlfaNumericoConEspacios);

    ValidarNumeroEnCajaTexto("txtPaquete", ValidarEnteroPositivo);
    ValidarNumeroEnCajaTexto("txtMonto", ValidarDecimalPositivo, oCulturaUsuario, true);

    var indiceTab = window.parent.tab.tabs("option", "selected");

    //$("#AccordionJQ1").accordion("option", "active", 1);

    //$(".accordion").accordion({
    //    collapsible: true,
    //    autoHeight: false
    //});

    //#region medidas del paquete //agregado 17-12-2014
    //$("#lblPaqueteExpEn").text('(' + $("#txtExp").val() + ')');
    //$("#lblPaqueteSimboloMonto").text('(' + SimMon + ')');
    //#endregion

    //tbModelos = $("#tbPaquetes").jqGrid({
    //    sortable: true,
    //    datatype: CargarGrillaPaquetes,
    //    colModel: [{ name: 'Id', Campo: 'Id', label: 'Código', hidden: false, width: 80, align: 'Right' },
    //               { name: 'Tipo', index: 'Tipo', label: 'Tipo Servicio', hidden: true, width: 100 },
    //               { name: 'IdTipo', index: 'IdTipo', label: 'IdTipoServicio', hidden: true, width: 100 },
    //               { name: 'Cantidad', index: 'Cantidad', label: 'Paquete (' + $("#txtExp").val() + ')', hidden: false, width: 120, align: 'Right' },
    //               { name: 'Costo', index: 'Costo', label: 'Monto (' + SimMon + ')', hidden: false, width: 110, align: 'Right', formatter: "currency", formatoptions: { decimalSeparator: SimDec, thousandsSeparator: SimMil, decimalPlaces: parseInt(NumDec)} },
//],
    //    jsonReader: {
    //        root: "Items",
    //        page: "PaginaActual",
    //        total: "TotalPaginas",
    //        records: "TotalRegistros",
    //        repeatitems: true,
    //        cell: "Row",
    //        id: "ID"
    //    },
    //    pager: "#tbPaquetesPager",
    //    loadtext: 'Cargando Paquetes de Ampliación...',
    //    emptyrecords: 'No hay Registros.',
    //    pgtext: 'Pág: {0} de {1}', //Paging input control text format.
    //    rowNum: "10", // PageSize.
    //    rowList: [10, 20, 30], //Variable PageSize DropDownList. 
    //    viewrecords: true, //Show the RecordCount in the pager.
    //    multiselect: false,
    //    sortname: "vcNom", //sortname: idTabla, //Default SortColumn
    //    sortorder: "asc", //Default SortOrder.
    //    width: 710,
    //    height: "auto",
    //    rownumbers: true,
    //    shrinkToFit: false,
    //    caption: "Paquetes de Ampliación",
    //    onSelectRow: function (id) { CargarEdicionPaquete(id); },
    //    ondblClickRow: function (id) { CargarEdicionPaquete(id); }
    //});

    function BloquearPagina(bloqueado) {
        $(".btnNormal").button("option", "disabled", bloqueado);

        if (bloqueado) {
            $("input").attr("disabled", "disabled");
            $("select").attr("disabled", "disabled");
        }
        else {
            $("input").removeAttr("disabled");
            $("select").removeAttr("disabled");
        }
    }

    function CerroMensaje() {
        BloquearPagina(false);
        if ($("#hdfTS").val() == "") {//Nuevo
            $("#txtNombre").val("");
            $("#txtExp").val("");
            $("#tbAgregarPaquete").hide();
            $("#dvMensajePaquete").show();
            //document.getElementById('txtNombre').focus();
            //$("#txtNombre").select();
            //$("#txtNombre").focus();
        }
        else {//Edicion
            window.parent.tab.tabs("remove", indiceTab);
        }
    }

    //$("#btnEditarPaquete").live("click", function () {
    //    $.ajax({
    //        type: "POST",
    //        url: "Mnt_TipoServicio.aspx/GuardarPaqueteA",
    //        data: "{'IdPaquete':'" + $("#hdfIdPaquete").val() + "'," +
    //               "'IdTipoServicio':'" + $("#hdfCodigoTipoServicio").val() + "'," +
    //               "'strCantidad':'" + $("#txtPaquete").val() + "'," +
    //               "'strMonto':'" + $("#txtMonto").val() + "'," +
    //               "'strOpcion':'" + 'false' + "'}",
    //        contentType: "application/json; charset=utf-8",
    //        dataType: "json",
    //        success: function (result) {
    //            var exito = result.d;
    //            if (exito == "existe") {
    //                alerta("El paquete de ampliación ingresada ya existe");
    //                $("#txtPaquete").focus();
    //                return;
    //            } else {
    //                $("#txtPaquete").val("");
    //                $("#txtMonto").val("")
    //                $("#hdfIdPaquete").val("");
    //                $("#btnAgregarPaquete").show();
    //                $("#btnEditarPaquete").hide();
    //                $("#btnEliminarPaquete").hide();
    //                $("#btnCancelarEditar").hide();
    //                $("#txtPaquete").focus();
    //                $("#tbPaquetes").trigger("reloadGrid");
    //            }
    //        },
    //        error: function (xhr, err, thrErr) {
    //            MostrarErrorAjax(xhr, err, thrErr);
    //        }
    //    });
    //});

    //$("#btnAgregarPaquete").live("click", function () {
    //    $.ajax({
    //        type: "POST",
    //        url: "Mnt_TipoServicio.aspx/GuardarPaqueteA",
    //        data: "{'IdPaquete':'" + '0' + "'," +
    //               "'IdTipoServicio':'" + $("#hdfCodigoTipoServicio").val() + "'," +
    //               "'strCantidad':'" + $("#txtPaquete").val() + "'," +
    //               "'strMonto':'" + $("#txtMonto").val() + "'," +
    //               "'strOpcion':'" + 'false' + "'}",
    //        contentType: "application/json; charset=utf-8",
    //        dataType: "json",
    //        success: function (result) {
    //            var exito = result.d;
    //            if (exito == "existe") {
    //                alerta("El paquete de ampliación ingresada ya existe");
    //                $("#txtPaquete").focus();
    //                return;
    //            } else {
    //                $("#txtPaquete").val("");
    //                $("#txtMonto").val("")
    //                $("#hdfIdPaquete").val("");
    //                $("#btnAgregarPaquete").show();
    //                $("#btnEditarPaquete").hide();
    //                $("#btnEliminarPaquete").hide();
    //                $("#btnCancelarEditar").hide();
    //                $("#txtPaquete").focus();
    //                $("#tbPaquetes").trigger("reloadGrid");
    //            }
    //        },
    //        error: function (xhr, err, thrErr) {
    //            MostrarErrorAjax(xhr, err, thrErr);
    //        }
    //    });
    //});

    //$("#btnCancelarEditar").live("click", function () {
    //
    //    $("#txtPaquete").val("");
    //    $("#txtMonto").val("");
    //    $("#hdfIdPaquete").val("");
    //    $("#txtPaquete").focus();
    //
    //    $("#btnAgregarPaquete").show();
    //    $("#btnEditarPaquete").hide();
    //    $("#btnEliminarPaquete").hide();
    //    $("#btnCancelarEditar").hide();
    //
    //});

    //function btnEliminarPaquete_SI() {
    //    $.ajax({
    //        url: "Mnt_TipoServicio.aspx/GuardarPaqueteA",
    //        data: "{'IdPaquete':'" + $("#hdfIdPaquete").val() + "'," +
    //               "'IdTipoServicio':'" + $("#hdfCodigoTipoServicio").val() + "'," +
    //               "'strCantidad':'" + $("#txtPaquete").val() + "'," +
    //               "'strMonto':'" + $("#txtMonto").val() + "'," +
    //               "'strOpcion':'" + 'true' + "'}",
    //        dataType: "json",
    //        type: "post",
    //        contentType: "application/json; charset=utf-8",
    //        success: function (result) {
    //            var exito = result.d;
    //            if (exito == "existe") {
    //                alerta("El paquete de ampliación ingresada ya existe");
    //                $("#txtPaquete").focus();
    //                return;
    //            } else {
    //                $("#txtPaquete").val("");
    //                $("#txtMonto").val("")
    //                $("#hdfIdPaquete").val("");
    //                $("#btnAgregarPaquete").show();
    //                $("#btnEditarPaquete").hide();
    //                $("#btnEliminarPaquete").hide();
    //                $("#btnCancelarEditar").hide();
    //                $("#txtPaquete").focus();
    //                $("#tbPaquetes").trigger("reloadGrid");
    //            }
    //        },
    //        error: function (xhr, err, thrErr) {
    //            MostrarErrorAjax(xhr, err, thrErr);
    //        }
    //    });
    //}
    //$("#btnEliminarPaquete").live("click", function () {
    //    confirmacion("¿Continuar con la eliminación del paquete?", btnEliminarPaquete_SI, null, "Confirmación");
    //});

    $("#btnCerrar").live("click", function () {
        window.parent.tab.tabs("remove", window.parent.tab.tabs("option", "selected"));
    }); //boton cerrar JSILUPU - JUL2013


    $(".btnNormal").button();

    var vcCodCom = $("#hdfTS").val();

    $("#btnGuardar").click(function (event) {
        var TipoServicio = new tipoServicio();
        var michk;
        if ($("#hdfTS").val() == "") {
            TipoServicio.P_inCod = 0;
        } else {
            TipoServicio.P_inCod = $("#hdfTS").val();
        }

        //TipoServicio.vcNom = $("#txtNombre").val().replace(/'/g, "&#39").replace(/"/g, "&#34");
        TipoServicio.vcNom = $("#txtNombre").val().replace(/'/g, "&#39").replace(/"/g, "&#34").replace(/\\/g, "&#92");
        //TipoServicio.vcExpEn = $("#txtExp").val().replace(/'/g, "&#39").replace(/"/g, "&#34");
        TipoServicio.vcExpEn = $("#txtExp").val().replace(/'/g, "&#39").replace(/"/g, "&#34").replace(/\\/g, "&#92");
        if ($("#chkMostrarDash").is(':checked')) {
            TipoServicio.mostrarDash = true;
            michk = "1";
        } else {
            TipoServicio.mostrarDash = false;
            michk = "0";
        }


        if (TipoServicio.vcNom == "") {
            alerta("El nombre del tipo de servicio es un campo obligatorio.");
            $("#txtNombre").focus();
            return;
        }

        if (TipoServicio.vcExpEn == "") {
            alerta("El Exp. En. del tipo de servicio es un campo obligatorio.");
            $("#txtExp").focus();
            return;
        }

        if ($("#hdfCodigoTipoServicio").val() == 17) {
            TipoServicio.vcRepExpEn = $("#ddlReporteExpEn").val();
        } else {
            TipoServicio.vcRepExpEn = "";
        }

        var oTipoServicio = JSON.stringify(TipoServicio);
        var vcCodTS = $("#hdfTS").val().replace(/'/g, "&#39").replace(/"/g, "&#34").replace(/\\/g, "&#92");

        $.ajax({
            type: "POST",
            url: "Mnt_TipoServicio.aspx/Guardar",
            //data: "{'oCompania': '" + oCompania + "'}",

            data: "{'oTipoServicio': '" + oTipoServicio + "'," +
                    "'vcCodTS': '" + vcCodTS.replace(/'/g, "&#39") + "'," +
                    "'esChk': '" + michk + "'}",

            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                if (result.d == "0") {
                    window.parent.ActualizarGrilla();
                    Mensaje("<br/><h1>Tipo Servicio guardado</h1><br/><h2>" + TipoServicio.vcNom + "</h2>", document, CerroMensaje);
                }
                else {
                    alerta("El Tipo Servicio ya ha sido registrado anteriormente, no se pudo grabar el registro");
                    BloquearPagina(false);
                }
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
                BloquearPagina(false);
            }
        });
    });
});

function validarEspaciosEnBlancoAlInicio(id) {
    var valor = $("#" + id.toString() + "").val();
    $("#" + id.toString() + "").val($.trim(valor));
}

//function CargarGrillaPaquetes() {
//    var idTipoServicio = $("#hdfCodigoTipoServicio").val();
//    var inPagTam = $("#tbPaquetes").getGridParam("rowNum");
//    var inPagAct = $("#tbPaquetes").getGridParam("page");
//
//    if (idTipoServicio == '') {
//        return;
//    }
//    $.ajax({
//        type: "POST",
//        url: "Mnt_TipoServicio.aspx/ObtenerPaquetes_TipoServicio",
//        data: "{'pIdTipoServicio': '" + idTipoServicio + "', 'inPagTam':'" + inPagTam +
//                "', 'inPagAct':'" + inPagAct + "' }",
//        contentType: "application/json; charset=utf-8",
//        dataType: "json",
//        success: function (result) {
//            var lstPaquetes = result.d;
//            $("#tbPaquetes")[0].addJSONData(lstPaquetes);
//        },
//        error: function (xhr, err, thrErr) {
//            MostrarErrorAjax(xhr, err, thrErr);
//        }
//    });
//}


//function CargarEdicionPaquete(id) {
//    var datos = $("#tbPaquetes").jqGrid('getRowData', id);
//    $("#txtPaquete").val(datos.Cantidad);
//    $("#txtMonto").val(datos.Costo);
//    $("#hdfIdPaquete").val(id);
//
//    $("#btnAgregarPaquete").hide();
//    $("#btnEditarPaquete").show();
//    $("#btnEliminarPaquete").show();
//    $("#btnCancelarEditar").show();
//}