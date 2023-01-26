var oCulturaUsuario;
var FormatoFechaCulturaForDatePicker = "";

$(function () {

    oCulturaUsuario = window.parent.parent.oCulturaUsuario;
    FormatoFechaCulturaForDatePicker = oCulturaUsuario.vcFecCor.toLowerCase();

    if (FormatoFechaCulturaForDatePicker.indexOf("yyyy") >= 0) {
        FormatoFechaCulturaForDatePicker = FormatoFechaCulturaForDatePicker.replace("yyyy", "yy");  //Para datepicker 'yy' es como 'yyyy'; y 'y' es 'yy'
    }
    else if (FormatoFechaCulturaForDatePicker.indexOf("yy") >= 0) {
        FormatoFechaCulturaForDatePicker = FormatoFechaCulturaForDatePicker.replace("yy", "y");
    }

    var TamanoPagina = [20, 40, 60];
    var inFilas = 40;
    function SeleccionoDespacho(id) {
    }
    var modeloDespacho = [
                {
                    name: 'opAccion', index: 'opAccion', label: 'Vale', hidden: false, width: 30, search: false, align: 'center',
                    formatter: function (value, options, rData) {
                        return GenerarBotones(rData[10], rData[2]); //Linea, IdSolicitud
                    }
                },
                { name: 'IdDespacho', index: 'IdDespacho', label: 'IdDespacho', hidden: true, width: 50, key: true, search: false },
                { name: 'IdSolicitud', index: 'IdSolicitud', label: 'IdSolicitud', hidden: true, width: 50, key: true, search: false },
                { name: 'FechaHora', index: 'FechaHora', label: 'Fecha/Hora', hidden: false, width: 60, search: false },
                { name: 'IdEmpleado', index: 'IdEmpleado', label: 'Cod.Empleado', width: 70, hidden: false, key: true },
   		        { name: 'Empleado', index: 'Empleado', label: 'Empleado', hidden: false, width: 80 },
                { name: 'Organizacion', index: 'Organizacion', label: 'Organización', hidden: false, width: 100 },
                { name: 'CentroCosto', index: 'CentroCosto', label: 'C. Costo', hidden: false, width: 80 },
                { name: 'TipoSolicitud', index: 'TipoSolicitud', label: 'Tipo Solicitud', hidden: false, width: 50 },
                { name: 'CodigoSolicitud', index: 'CodigoSolicitud', label: 'Código Solicitud', hidden: false, width: 45 },
                { name: 'Linea', index: 'Linea', label: 'Línea', hidden: false, width: 35 },
                { name: 'Modelo', index: 'Modelo', label: 'Modelo', hidden: false, width: 50 },
                { name: 'Marca', index: 'Marca', label: 'Marca', hidden: false, width: 50 },
                { name: 'IMEI', index: 'IMEI', label: 'IMEI', hidden: false, width: 35 },

    ];
    function GenerarBotones(linea, idSolicitud) {
        if (!idSolicitud) {
            return '';
        }
        else {
            return '<div align="center"><img idsolicitud="' + idSolicitud + '" linea="' + linea + '" src="../../Common/Images/pdf.png" class="imgBtn GenerarValeResguardo" style="text-align: center;cursor: pointer;" title="Vale Resguardo" /></div>';
        }
    }

    $(".GenerarValeResguardo").live("click", function () {
        GenerarResguardo($(this).attr("linea"), $(this).attr("idsolicitud"));
    });

    function CargarDespacho() {

        var FI = $("#txtFechaInicio").val();
        var FF = $("#txtFechaFin").val();
        if (FI != "") {
            FI = moment(FI, 'DD/MM/YYYY').format("YYYYMMDD");
        }
        if (FF != "") {
            FF = moment(FF, 'DD/MM/YYYY').format("YYYYMMDD");
        }

        var Filtros = '';
        if (FI != "") {
            Filtros += "AND A.FechaDespacho >= |" + FI + " 00:00:00| ";
        }
        if (FF != "") {
            Filtros += "AND A.FechaDespacho <= |" + FF + " 23:59:59| ";
        }

        if ($("#gs_IdEmpleado").val() && $("#gs_IdEmpleado").val() != "") {
            Filtros += "AND ISNULL(A.IdEmpleado,||) LIKE |%" + $("#gs_IdEmpleado").val().replace(/\'/g, "") + "%| ";
        }
        if ($("#gs_Empleado").val() && $("#gs_Empleado").val() != "") {
            Filtros += "AND ISNULL(E.EMPL_vcNOMEMP,||) LIKE |%" + $("#gs_Empleado").val().replace(/\'/g, "") + "%| ";
        }
        if ($("#gs_Organizacion").val() && $("#gs_Organizacion").val() != "") {
            Filtros += "AND ISNULL(O.ORGA_vcNOMORG,||) LIKE |%" + $("#gs_Organizacion").val().replace(/\'/g, "") + "%| ";
        }
        if ($("#gs_CentroCosto").val() && $("#gs_CentroCosto").val() != "") {
            Filtros += "AND ISNULL(CC.CCOS_vcNOMCCO,||) LIKE |%" + $("#gs_CentroCosto").val().replace(/\'/g, "") + "%| ";
        }
        if ($("#gs_TipoSolicitud").val() && $("#gs_TipoSolicitud").val() != "") {
            Filtros += "AND ISNULL(TS.vcNomTipSol,||) LIKE |%" + $("#gs_TipoSolicitud").val().replace(/\'/g, "") + "%| ";
        }
        if ($("#gs_CodigoSolicitud").val() && $("#gs_CodigoSolicitud").val() != "") {
            Filtros += "AND ISNULL(S.vcCodigo,||) LIKE |%" + $("#gs_CodigoSolicitud").val().replace(/\'/g, "") + "%| ";
        }
        if ($("#gs_Linea").val() && $("#gs_Linea").val() != "") {
            Filtros += "AND ISNULL(B.Linea,||) LIKE |%" + $("#gs_Linea").val().replace(/\'/g, "") + "%| ";
        }
        if ($("#gs_Modelo").val() && $("#gs_Modelo").val() != "") {
            Filtros += "AND ISNULL(MD.vcNom,||) LIKE |%" + $("#gs_Modelo").val().replace(/\'/g, "") + "%| ";
        }
        if ($("#gs_Marca").val() && $("#gs_Marca").val() != "") {
            Filtros += "AND ISNULL(MD.vcMarcaModelo,||) LIKE |%" + $("#gs_Marca").val().replace(/\'/g, "") + "%| ";
        }
        if ($("#gs_IMEI").val() && $("#gs_IMEI").val() != "") {
            Filtros += "AND ISNULL(B.IMEI,||) LIKE |%" + $("#gs_IMEI").val().replace(/\'/g, "") + "%| ";
        }
        if (Filtros != "") {
            Filtros = Filtros.substring(4);
        }


        var CampoOrden = '';
        CampoOrden = $('#tbDespacho').getGridParam("sortname") + " " + $('#tbDespacho').getGridParam("sortorder");
        //switch (CampoOrden) {
        //    case "Empleado": CampoOrden = ""; break;
        //    default:
        //}
        //CampoOrden = "";

        $.ajax({
            type: "post",
            url: "Cam_DespachoVisorStaff.aspx/ListarDespacho",
            data: "{'inPagTam':'" + $('#tbDespacho').getGridParam("rowNum") + "'," +
                   "'inPagAct':'" + $('#tbDespacho').getGridParam("page") + "'," +
                   "'vcOrdCol':'" + CampoOrden + "'," +
                   "'Filtros': '" + Filtros + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                $("#tbDespacho")[0].addJSONData(result.d);
            },
            error: function (xhr, err, thrErr) {
                //MostrarErrorAjax(xhr, err, thrErr);
            }
        });
    }

    function CargarDespachoDetalle() {
        $.ajax({
            url: "Cam_DespachoVisor.aspx/ListarDespachoDetalles", //PageMethod
            data: "{'inIdPedido': '" + row_id + "'," +
                           "'vcNomSit': '" + vcSit + "'}",
            dataType: "json",
            type: "post",
            contentType: "application/json; charset=utf-8",
            success: function (result) {
                $("#" + subgrid_table_id).jqGrid('clearGridData');
                var i = 0;
                for (i = 0; i < $(result.d).length; i++) {
                    $("#" + subgrid_table_id).jqGrid('addRowData', i, result.d[i]);
                }

                if ($.browser.chrome) {
                    $('#gbox_' + subgrid_table_id).css("width", "795px"); //ui-jqgrid-bdiv
                    $('div.ui-jqgrid-bdiv', 'div#gview_' + subgrid_table_id).each(function (i) {
                        $(this).css({ "width": "795px" });
                    });
                    $('div.ui-jqgrid-hdiv', 'div#gview_' + subgrid_table_id).each(function (i) {
                        $(this).css({ "width": "795px" });
                    });
                }
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            }
        });
    }

    $("#tbDespacho").jqGrid({
        datatype: CargarDespacho, //"local",
        jsonReader: //Set the jsonReader to the JQGridJSonResponse squema to bind the data.
                {
                    root: "Items",
                    page: "PaginaActual",
                    total: "TotalPaginas",
                    records: "TotalRegistros",
                    repeatitems: true,
                    cell: "Row",
                    id: "IdDespacho"
                },
        colModel: modeloDespacho,
        viewrecords: false,
        pager: "#pager", //Pager.
        loadtext: 'Cargando datos...',
        recordtext: "{0} - {1} de {2} elementos",
        emptyrecords: 'No hay resultados',
        pgtext: 'Pág: {0} de {1}', //Paging input control text format.
        rowNum: inFilas, //$("#hdfTamPag").val(), //"10" PageSize.
        rowList: TamanoPagina,  //TamanosPaginaSel, //Variable PageSize DropDownList. 
        sortname: "IdDespacho", //sortname: idTabla, //Default SortColumn
        sortorder: "asc",
        rownumbers: true,
        multiselect: false,
        beforeSelectRow: function (rowId, e) {
            return true;
        },
        onSelectRow: function (rowid, status) {
            //$("#tbPedidos").jqGrid('getRowData', rowid);
        },
        onSelectAll: function (ids_Grid, status) {
        },
        onSelectRow: function (id, select, item) {
        },
        gridComplete: function () {
        },
        ondblClickRow: function (id) {
            //AbrirRegistro(id);
        }
    }).navGrid("#pager", { edit: false, add: false, search: false, del: false });


    $("#tbDespacho").jqGrid('filterToolbar', {
        stringResult: true, searchOnEnter: false, defaultSearch: "cn",
        searchOperators: true, multipleSearch: true,
        groupOps: [{ op: "AND", text: "all" }, { op: "OR", text: "any" }]
    });


    $("#txtFechaInicio").datepicker({
        changeMonth: true,
        changeYear: true,
        dateFormat: FormatoFechaCulturaForDatePicker,
        maxDate: new Date(),
        onClose: function (selectedDate) {
            //$("#txtFechaFin").datepicker("option", "minDate", selectedDate);
            CargarGrilla();
        },
        onSelect: function (dateText) {
            //$("#txtRangoFechaFin").datepicker('option', 'minDate', dateText);
            //fnCargarGrilla();
        }
    });
    $("#txtFechaFin").datepicker({
        changeMonth: true,
        changeYear: true,
        dateFormat: FormatoFechaCulturaForDatePicker,
        maxDate: new Date(),
        onClose: function (selectedDate) {
            $("#txtFechaInicio").datepicker("option", "maxDate", selectedDate);
            CargarGrilla();
        },
        onSelect: function (dateText) {
            //$("#txtRangoFechaFin").datepicker('option', 'minDate', dateText);
            //fnCargarGrilla();
        }
    });

    DimPosElementos();
    $(window).resize(function () {
        DimPosElementos();
    });

});


function DimPosElementos() {
    var Ancho = $(window).width();
    var Alto = $(window).height();
    $("#tbDespacho").setGridWidth(Ancho - 36);
    $("#tbDespacho").setGridHeight(Alto - 250); // 235
    //$("#tbDespacho").css({ "width": Ancho - 50, "height": Alto - 100 });
}

function CargarGrilla() {
    $("#tbDespacho").trigger("reloadGrid");
}



function GenerarResguardo(Numero, _IdSolicitudSeleccionada) {

    $.ajax({
        url: "Cam_DespachoEmpleado.aspx/ObtenerDatosResguardo",
        data: "{'Numero':'" + Numero + "'}",
        dataType: "json",
        type: "post",
        contentType: "application/json; charset=utf-8",
        success: function (result) {

            $("#lblNroConsecutivoAnterior").html("(Anterior: " + result.d[0].NroConsecutivo + ")");
            try {
                $("#txtNroConsecutivo").val(parseFloat(result.d[0].NroConsecutivo) + 1);
                $("#txtObservaciones").val(result.d[0].Observaciones);
                $("#txtAdministradorContrato").val(result.d[0].Responsable);
                $("#txtModelo").val(result.d[0].Modelo);
                $("#txtMarca").val(result.d[0].MarcaModelo);
                $("#txtNroServicio").val(result.d[0].P_vcNum);
                $("#txtIMEI").val(result.d[0].F_vcCodIMEI);
                $("#txtSIM").val(result.d[0].SIM);
                $("#txtPIN").val(result.d[0].PIN);
                $("#txtFactura").val(result.d[0].NumeroFactura_OS);
                $("#txtCosto").val(result.d[0].dcMonto_Equipo);
                $("#ddlTipoServicio").val(result.d[0].IdTipoModeloDispositivo);

            } catch (e) {
                //some
            }

            $('#dvGenerarResguardo').dialog({
                title: "Generar Reporte",
                modal: true,
                width: 900,
                buttons: {
                    "Generar": function () {

                        var oDialogo = this;

                        var Accesorios = "";
                        $("[id*=chkAccesorios] input:checked").each(function () {
                            Accesorios += "," + $(this).val();
                        });
                        if (Accesorios.length > 0) {
                            Accesorios = Accesorios.substr(1, Accesorios.length - 1);
                        }
                        var txtFactura = $.trim($("#txtFactura").val());
                        var txtNroConsecutivo = $.trim($("#txtNroConsecutivo").val());
                        var ddlTipoServicio = $("#ddlTipoServicio").val();
                        var txtCosto = $.trim($("#txtCosto").val());
                        var txtMarca = $.trim($("#txtMarca").val());
                        var txtModelo = $.trim($("#txtModelo").val());
                        var txtNroServicio = $.trim($("#txtNroServicio").val());
                        var txtIMEI = $.trim($("#txtIMEI").val());
                        var txtSIM = $.trim($("#txtSIM").val());
                        var txtPIN = $.trim($("#txtPIN").val());
                        var txtObservaciones = $.trim($("#txtObservaciones").val());
                        var txtResponsable = $.trim($("#txtAdministradorContrato").val());
                        txtFactura = txtFactura.replace(/'/g, "");
                        txtNroConsecutivo = txtNroConsecutivo.replace(/'/g, "");
                        txtCosto = txtCosto.replace(/'/g, "");
                        txtMarca = txtMarca.replace(/'/g, "");
                        txtModelo = txtModelo.replace(/'/g, "");
                        txtNroServicio = txtNroServicio.replace(/'/g, "");
                        txtIMEI = txtIMEI.replace(/'/g, "");
                        txtSIM = txtSIM.replace(/'/g, "");
                        txtPIN = txtPIN.replace(/'/g, "");
                        txtObservaciones = txtObservaciones.replace(/'/g, "");
                        txtResponsable = txtResponsable.replace(/'/g, "");

                        if (txtFactura == "") {
                            alerta("Debe ingresar un código de factura", "Mensaje", function () {
                                $("#txtFactura").focus();
                            });
                            return;
                        }
                        if (txtNroConsecutivo == "") {
                            alerta("Debe ingresar un valor", "Mensaje", function () {
                                $("#txtNroConsecutivo").focus();
                            });
                            return;
                        }
                        if (txtCosto == "") {
                            alerta("Debe ingresar un valor", "Mensaje", function () {
                                $("#txtCosto").focus();
                            });
                            return;
                        }
                        if (txtMarca == "") {
                            alerta("Debe ingresar una marca", "Mensaje", function () {
                                $("#txtMarca").focus();
                            });
                            return;
                        }
                        if (txtModelo == "") {
                            alerta("Debe ingresar un modelo", "Mensaje", function () {
                                $("#txtModelo").focus();
                            });
                            return;
                        }
                        if (txtNroServicio == "") {
                            alerta("Debe ingresar un número", "Mensaje", function () {
                                $("#txtNroServicio").focus();
                            });
                            return;
                        }
                        if (txtIMEI == "") {
                            alerta("Debe ingresar un valor", "Mensaje", function () {
                                $("#txtIMEI").focus();
                            });
                            return;
                        }
                        ////if (txtSIM == "") {
                        ////    alerta("Debe ingresar un valor", "Mensaje", function () {
                        ////        $("#txtSIM").focus();
                        ////    });
                        ////    return;
                        ////}
                        ////if (txtPIN == "") {
                        ////    alerta("Debe ingresar un valor", "Mensaje", function () {
                        ////        $("#txtPIN").focus();
                        ////    });
                        ////    return;
                        ////}
                        if (txtObservaciones == "") {
                            alerta("Debe ingresar un valor", "Mensaje", function () {
                                $("#txtObservaciones").focus();
                            });
                            return;
                        }
                        if (txtResponsable == "") {
                            alerta("Debe ingresar un valor", "Mensaje", function () {
                                $("#txtAdministradorContrato").focus();
                            });
                            return;
                        }

                        $.ajax({
                            url: "Cam_DespachoEmpleado.aspx/GuardarDatosResguardo",
                            data: "{'Factura':'" + txtFactura + "','NroConsecutivo':'" + txtNroConsecutivo + "','TipoServicio':'" + ddlTipoServicio + "'," +
                                   "'Costo':'" + txtCosto + "','Marca':'" + txtMarca + "', 'Modelo':'" + txtModelo + "'," +
                                   "'NroServicio':'" + txtNroServicio + "','IMEI':'" + txtIMEI + "', 'SIM':'" + txtSIM + "'," +
                                   "'PIN':'" + txtPIN + "','Observaciones':'" + txtObservaciones + "','Accesorios':'" + Accesorios + "','Responsable':'" + txtResponsable + "'}",
                            dataType: "json",
                            type: "post",
                            contentType: "application/json; charset=utf-8",
                            success: function (result) {

                                var pagina = "Adm_ReporteDevExpress.aspx?vcTab=MOV_Solicitud&vcTipRep=2&IdResguardo=" + result.d + "&Sol=" + _IdSolicitudSeleccionada;
                                $("#ifReporteFormato").attr("src", pagina);

                                $(oDialogo).dialog("close");


                            },
                            error: function (xhr, err, thrErr) {
                                MostrarErrorAjax(xhr, err, thrErr);
                            }
                        });

                    },
                    "Cancelar": function () {
                        $(this).dialog("close");
                    }
                }
            });

        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });

}

