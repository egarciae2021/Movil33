var Codigos = "";
var Valores = "";
var CodigosNombres = "";
var v_inCodPol = "";
var v_CodGru = "";
var v_vcVal = "";
var v_vcNomGru = "";
var v_titulo = "";
var intTipo = "0";
var strValor = "";
var timeoutHnd;
var timeoutHndEmpleado;
var MargenFiltro = 0;
var MargenHeight = 48;
var EmpleadosSeleccionados = new Array();
var Modal;

//        function MOV_CAM_CampanaCreditoListaNegra(IdEmpleado, NombreEmpleado) {
//            this.IdEmpleado = IdEmpleado;
//            this.NombreEmpleado = NombreEmpleado;
//        }

function MOV_CAM_CampanaCreditoListaNegra(IdCampana, IdEmpleado, NombreEmpleado, Descripcion) {
    this.IdCampana = IdCampana;
    this.IdEmpleado = IdEmpleado;
    this.Descripcion = Descripcion;
    this.NombreEmpleado = NombreEmpleado;
}

function empleado(P_vcCod, vcNom) {
    this.P_vcCod = P_vcCod;
    this.vcNom = vcNom;
}

function inicioPagina() {
    DimPosElementos();
}

function DimPosElementos() {
    var Ancho = $(window).width();
    var Alto = $(window).height();
    //            var AnchoLateral = $(".LateralSplitter");
    //            $(".tabs").css({ height: Alto - 25, width: Ancho - AnchoLateral, marginbotton: 0, paddingbotton: 0 });

    //            $(".Splitter").css({ height: Alto - 18 });

    //            if ($(window).width() < 480) {
    //                $("#tblListaNegra").setGridWidth(550);
    //            } else {
    //                $("#tblListaNegra").setGridWidth($(window).width() - 170);
    //            }
    $("#tblListaNegra").setGridWidth(Ancho - 130);
    $("#tblListaNegra").setGridHeight(Alto - 110);

    //            if ($(window).height() < 600 && $(window).height() > 400) {
    //                $("#tblListaNegra").setGridHeight(($(window).height() - 50) / 2);
    //            } else if ($(window).height() < 400) {
    //                $("#tblListaNegra").setGridHeight(200);
    //            } else {
    //                $("#tblListaNegra").setGridHeight(300);
    //            }
}

function ListarListaNegra() {
    //            if ($("#ddlCampana").val() != "-1") {
    $.ajax({
        type: "POST",
        url: "Cam_Mnt_CampanaListaNegra.aspx/ListarListaNegra",
        data: "{'inPagTam':'" + $('#tblListaNegra').getGridParam("rowNum") + "'," + //Tamaño de pagina
                            "'inPagAct':'" + parseInt($('#tblListaNegra').getGridParam("page")) + "'," +  //FiltroRegistro
                            "'IdCampana':'" + parseInt($("#hdfIdCampana").val()) + "'," +  //FiltroRegistro
                            "'intTipo':'" + parseInt(intTipo) + "'," +  //FiltroRegistro
                            "'strValor':'" + strValor + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            $("#tblListaNegra")[0].addJSONData(result.d);
            EmpleadosSeleccionados = [];
            $.each(result.d.Items, function () {
                EmpleadosSeleccionados.push(new MOV_CAM_CampanaCreditoListaNegra(this.Row[1], this.Row[0], this.Row[2], this.Row[3]));
            });
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
    //            }
}

function CargarListaNegraCampana(lstListaN) {
    $("#tblListaNegra").jqGrid('clearGridData');
    if ($(lstListaN).length > 0) {
        var i;
        for (i = 0; i < $(lstListaN).length; i++) {
            $("#tblListaNegra").jqGrid('addRowData', lstListaN[i].IdEmpleado, lstListaN[i]);
        }
    }
    else {
        //alerta("No hay datos disponibles");
    }
}

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

function AbreEmpleado() {
    var $width = 740;
    var $height = 500;
    var $Pagina = '../../Consultar/Con_SeleccionArea.aspx?Tipo=2&Multiple=1';
    $("#ifArea").attr("src", $Pagina);
    Modal = $('#dvArea').dialog({
        title: "Seleccionar empleado",
        width: $width,
        height: $height,
        modal: true,
        resizable: false
    });
}

function ObtenerListaNegra() {
    return EmpleadosSeleccionados;
}

function IngresarEmpleadosSelecionados() {
    var EmpleadosEnviados = new Array();
    //return EmpleadosSeleccionados;
    var i;
    for (i in EmpleadosSeleccionados) {
        var Empleado = new empleado();
        Empleado.P_vcCod = EmpleadosSeleccionados[i].IdEmpleado;
        Empleado.vcNom = EmpleadosSeleccionados[i].NombreEmpleado;
        EmpleadosEnviados.push(Empleado);
    }
    return EmpleadosEnviados;
}

function IngresarEmpleados(Empleado) {
    var EmpleadosNuevos = new Array();
    var yaAgregado = false;
    var i;
    var j;
    for (i in Empleado) {
        yaAgregado = false;
        for (j in EmpleadosSeleccionados) {
            if (EmpleadosSeleccionados[j].IdEmpleado == Empleado[i].P_vcCod) {
                yaAgregado = true;
                break;
            }
        }
        if (!yaAgregado) {
            EmpleadosNuevos.push(new MOV_CAM_CampanaCreditoListaNegra(parseInt($("#hdfIdCampana").val()), Empleado[i].P_vcCod, Empleado[i].vcNom.toString().split("=")[1], Empleado[i].vcNom.toString().split("=")[1]));
        }
    }

    $.ajax({
        type: "POST",
        url: "Cam_Mnt_CampanaListaNegra.aspx/AgregarEmpleado",
        data: "{'v_lstEmpleado': '" + JSON.stringify(EmpleadosNuevos) + "', 'IdCampana': '" + $("#hdfIdCampana").val() + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            ListarListaNegra();
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
    //var i;
    for (i in EmpleadosNuevos) {
        EmpleadosSeleccionados.push(EmpleadosNuevos[i]);
    }
    //            Codigos = "";
    //            CodigosNombres = "";
    //            Valores = "";
    //            for (i = 0; i < Empleado.length; i++) {
    //                Codigos = Codigos + Empleado[i].P_vcCod + ',';
    //                CodigosNombres = CodigosNombres + Empleado[i].vcNom + ',';
    //                if (Empleado[i].vcVal == undefined) {
    //                    Valores = Valores + "";
    //                } else {
    //                    Valores = Valores + Empleado[i].vcVal;
    //                }
    //            };

    //            $.ajax({
    //                type: "POST",
    //                url: "Cam_Mnt_CampanaListaNegra.aspx/Guardar",
    //                data: "{'IdCampana': '" + $("#ddlCampana").val() + "'," +
    //                       "'CodEmpleado':'" + Codigos.substring(0, Codigos.length - 1) + "'," +
    //                       "'Descripcion': '" + "" + "'}",
    //                contentType: "application/json; charset=utf-8",
    //                dataType: "json",
    //                success: function (result) {
    //                    if (result.d == "") {
    //                        //MetodoWeb("Cam_Mnt_CampanaListaNegra.aspx/ListarListaNegraCampana", JSON.stringify({ 'IdCampana': $("#ddlCampana").val(), 'intTipo': intTipo, 'strValor': '' }), CargarListaNegraCampana, null);
    //                        ListarListaNegra();
    //                    } else {
    //                        //MetodoWeb("Cam_Mnt_CampanaListaNegra.aspx/ListarListaNegraCampana", JSON.stringify({ 'IdCampana': $("#ddlCampana").val(), 'intTipo': intTipo, 'strValor': '' }), CargarListaNegraCampana, null);
    //                        ListarListaNegra();
    //                        $("#lblMsg2").text(result.d.substring(0, result.d.length - 1));
    //                        $('#divMsgConfirmacionAhora').dialog({
    //                            title: "Confirmación",
    //                            modal: true,
    //                            resizable: false
    //                        });
    //                    }
    //                },
    //                error: function (xhr, err, thrErr) {
    //                    MostrarErrorAjax(xhr, err, thrErr);
    //                }
    //            });
}

$(function () {
    combokendoFormar("#ddlCampana", 200);
    combokendoFormar("#ddlTipo", 120);



    var AnchoG = $(window).width() - 160;
    var oColModelListaNegra = [
    //{ name: 'rowId', label: 'rowId', width: 80, fixed: true, sortable: false, resize: false, width: 20, hidden: true },
            {name: 'IdEmpleado', label: 'Código', index: 'invdate', width: 80 },
            { name: 'IdCampana', label: 'IdCampana', fixed: true, sortable: false, resize: false, width: 20, hidden: true },
            { name: 'NombreEmpleado', label: 'Empleado', index: 'id', width: 350 },
            { name: 'Descripcion', label: 'Descripción', index: 'name', width: 270, hidden: true }
        ];

    var tblListaNegra = JQGrid("#tblListaNegra", "#pagerListaNegra", ListarListaNegra, oColModelListaNegra, AnchoG, 280, "rowId", true, fnDoubleClickListaNegra, fnSelectListaNegra);

    //            $(window).resize(function () {
    //                var AnchoG = $(window).width() - 160;
    //                $("#gbox_tblListaNegra").width(AnchoG);
    //            });

    inicioPagina();
    $(window).resize(function () {
        DimPosElementos();
    });

    $("#btnAgregarListaNegra").click(function (event) {
        //                if ($("#ddlCampana").val() != "-1") {
        var $width = 750;
        var $height = 360;
        var $Pagina = '../../Consultar/Con_SeleccionArea.aspx?Tipo=2&Multiple=1';
        $("#ifArea").attr("src", $Pagina);
        Modal = $('#dvArea').dialog({
            title: "Seleccionar empleado",
            width: $width,
            height: $height,
            modal: true,
            resizable: false
        });
        //                } else {
        //                    alerta("Debe seleccionar una Campaña");
        //                }
    });

    $("#btnQuitarListaNegra").click(function () {
        //confirmacion("Se quitara este lugar de entrega de la actual campaña. ¿Desea continua?", fnQuitarEmpleado, null, "");
        fnQuitarEmpleado();
    });

    $("#ddlCampana").change(function () {
        //MetodoWeb("Cam_Mnt_CampanaListaNegra.aspx/ListarListaNegraCampana", JSON.stringify({ 'IdCampana': $(this).val(), 'intTipo': intTipo, 'strValor': '' }), CargarListaNegraCampana, null);
        intTipo = '0';
        strValor = '';
        ListarListaNegra();
    });
    $("#ddlTipo").change(function () {
        intTipo = $(this).val();
        $("#TxtValor").val('');
        strValor = "";
        //MetodoWeb("Cam_Mnt_CampanaListaNegra.aspx/ListarListaNegraCampana", JSON.stringify({ 'IdCampana': $("#ddlCampana").val(), 'intTipo': intTipo, 'strValor': strValor }), CargarListaNegraCampana, null);
        ListarListaNegra();
    });

    $("#TxtValor").keyup(function (e) {
        if (e.key != "Enter") {
            strValor = $("#TxtValor").val();
            //MetodoWeb("Cam_Mnt_CampanaListaNegra.aspx/ListarListaNegraCampana", JSON.stringify({ 'IdCampana': $("#ddlCampana").val(), 'intTipo': intTipo, 'strValor': strValor }), CargarListaNegraCampana, null);
            ListarListaNegra();
        }
    });

    function fnSelectListaNegra(id) { }
    function fnDoubleClickListaNegra(id) { }

    function fnQuitarEmpleado() {
        var idsSel = $("#tblListaNegra").jqGrid('getGridParam', 'selarrrow');
        $.ajax({
            type: "POST",
            url: "Cam_Mnt_CampanaListaNegra.aspx/QuitarEmpleado",
            data: "{'v_lstEmpleado': '" + idsSel + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                //$("#tblLugarEntrega").jqGrid('delRowData', id);
                //MetodoWeb("Cam_Mnt_CampanaListaNegra.aspx/ListarListaNegraCampana", JSON.stringify({ 'IdCampana': $("#ddlCampana").val(), 'intTipo': intTipo, 'strValor': strValor }), CargarListaNegraCampana, null);
                ListarListaNegra();
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            }
        });
    }

    function dialogValor(inCodPol, CodGru, CodEmp, vcVal, titulo, tipo, vcNomGru, vcNomEmp) {
        var $width;
        var $height;
        var $Pagina;
        if (tipo == 1) {
            $width = 400;
            $height = 200;
            $Pagina = '../../Configurar/Conf_AgregarGrupo_PolSeg.aspx?inCodPol=' + inCodPol + '&inCodGru=' + CodGru + '&vcVal=' + vcVal + '&vcNomGru=' + vcNomGru;
        }
        else if (tipo == 2) {
            $width = 520;
            $height = 265;
            $Pagina = '../../Configurar/Conf_AgregarEmpleado_PolSeg.aspx?inCodPol=' + inCodPol + '&inCodGru=' + CodGru + '&vcVal=' + vcVal + '&inCodEmp=' + Codigos + '&vcNomGru=' + vcNomGru + '&vcNomEmp=' + CodigosNombres;
        }
        $("#ifExcepcion").width($width - 20);
        $("#ifExcepcion").height($height - 30);
        $("#ifExcepcion").attr("src", $Pagina);

        ModalEmpleados = $("#dvExcepcion").dialog({
            title: titulo,
            width: $width,
            height: $height,
            modal: true,
            resizable: false
        });
    }
});