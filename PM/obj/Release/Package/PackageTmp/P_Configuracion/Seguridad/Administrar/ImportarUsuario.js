
var WidthTabla = 890;
var HeigthLog = 255;
var RowsLog = 14;
var RowsUsu = 14;

var tabDatos;

function DimPosElementos() {

    var Ancho = $(window).width();
    var Alto = $(window).height();

    $("#tabDatos").height(Alto - 145);
    $("#tbLog").setGridHeight(Alto - HeigthLog);
    $("#tbUsuario").setGridHeight(Alto - HeigthLog);
    $("#tbUsuarioSin").setGridHeight(Alto - HeigthLog);
}


// ==========================================================================================
//  LOAD
// ==========================================================================================
$(function () {

    //var tabOpciones = $("#tabOpciones").tabs({});
    tabDatos = $("#tabDatos").tabs({});

    DimPosElementos();

    $(window).resize(function () {
        DimPosElementos();
    });

    $("input:checkbox,input:radio,input:file").uniform();
    $(".uploader").css("width", "270px");
    $(".filename").css("width", "165px");
    $(".btnNormal").button();

    // =============================================================
    //  
    // =============================================================

    Listar_Campos();
    Listar_Log();
    Listar_Usuario();
    Listar_UsuarioSin();

    //var $pagina = "ImportarUsuario.aspx";
    //$("#ifrCargaUsuario").attr("src", $pagina);

    $("#btnCargar").hide();
    $("#btnExportar").hide();

    // =============================================================
    //  EVALUA RUTA
    // =============================================================
    var vcRuta = $("#hdfvcRutaArchivo").val();
    var vcPass = $("#hdfvcPass").val();

    if (vcRuta.length > 0) {
        // =============================================================
        //  INICIAR PROCESO
        // =============================================================
        //alert(vcRuta);
        //$.ajax({
        //    // ==============================================================================================================================
        //    type: "POST",
        //    url: "ImportarUsuario.aspx/Inicia_Procesar",
        //    data: "{'vcCriterio': '" + vcRuta + "','vcPass': '" + vcPass + "'}",
        //    contentType: "application/json; charset=utf-8",
        //    dataType: "json",
        //    success: function (result) {
        //        // ==============================================================================================================================
        //        Actualizar_Data();
        //        // ============================================================================================================================== 
        //    },
        //    error: function (xhr, err, thrErr) {
        //        MostrarErrorAjax(xhr, err, thrErr);
        //    }
        //
        //});

        // =============================================================
        //  LISTAR LOG
        // =============================================================
        //        
        //        for (i = 0; i < 100000; i++) {
        //            if (i % 5 == 0)
        //                $("#tbLog").trigger("reloadGrid");

        //        }


    }

    // =============================================================
    //  
    // =============================================================
    $("#btnCargarCli").click(function () {

        var vcPass = $("#txtContraseña").val();
        var vcArchivo = $("#fuArchivo").val();

        if (vcArchivo.length == 0) {
            alerta("Debe de seleccionar un archivo");
        }
        else if (vcPass.length > 0) {
            $("#btnCargar").click();
        } else {
            $("#txtContraseña").focus();
            alerta("Debe de ingresar el password");

        }

    });

    // =============================================================
    //  
    // =============================================================
    $("#btnExportarXls").click(function () {

        $("#btnExportar").click();

    });

    // =============================================================
    //  
    // =============================================================
    $("#btnEliminar").click(function () {

        confirmacion("Esta seguro de eliminar los usuarios importados ?", Eliminar_UsuariosImportados, otro, "Confirmación");

    });

    // =============================================================
    //  
    // =============================================================
    $("#btnActualizar").click(function () {
            
        tabDatos.tabs('option', 'selected', 0);
        
        Actualizar_Data();

        
    });

    // =============================================================
    //  
    // =============================================================
    $("#fuArchivo").change(function () {

        $("#txtContraseña").focus();

    });

    // =============================================================
    //  
    // =============================================================
    $("#btnConfiguracion").click(function () {

        $("#dvCampos").dialog({
            title: "Configuración Campos Excel",
            width: 585,
            height: 273,
            modal: true
        });

    });



    // ==========================================================================================
    // END 
    // ==========================================================================================
});

function otro() { }

function Actualizar_Data() {


    $("#tbLog").trigger("reloadGrid");

    $("#tbUsuario").trigger("reloadGrid");

    $("#tbUsuarioSin").trigger("reloadGrid");
}

// ========================================================================
// ELIMINA USUARIOS IMPORTADOS
// ========================================================================
function Eliminar_UsuariosImportados() {

    tabDatos.tabs('option', 'selected', 0);

    //$.ajax({
    //    // ==============================================================================================================================
    //    type: "POST",
    //    url: "ImportarUsuario.aspx/Eliminar_UsuariosImportados",
    //    data: "{'p_vcCriterio': ''}",
    //    contentType: "application/json; charset=utf-8",
    //    dataType: "json",
    //    success: function (result) {
    //        // ==============================================================================================================================
    //        Actualizar_Data();            
    //    }, // ==============================================================================================================================
    //    error: function (xhr, err, thrErr) {
    //        MostrarErrorAjax(xhr, err, thrErr);
    //    }
    //
    //});

}


// ========================================================================
// GUARDAR LINEA 
// ========================================================================
function Guarda_Posicion(idCampo, inPosicion, p_obj) {
    
    //$.ajax({
    //    // ==============================================================================================================================
    //    type: "POST",
    //    url: "ImportarUsuario.aspx/Guarda_Posicion",
    //    data: "{'idCampo': '" + idCampo + "','inPosicion': '" + inPosicion + "'}",
    //    contentType: "application/json; charset=utf-8",
    //    dataType: "json",
    //    success: function (result) {
    //        // ==============================================================================================================================
    //
    //        //Filtra_Data();
    //
    //    }, // ==============================================================================================================================
    //    error: function (xhr, err, thrErr) {
    //        MostrarErrorAjax(xhr, err, thrErr);
    //    }
    //
    //});

    var vcNomCss = '.MiTxt';

    var i;
    for (i= 0; i < $(vcNomCss).length; i++) {

        $($(vcNomCss)[i]).css("background", "white");

        if ($($(vcNomCss)[i]).attr('name') == $(p_obj).attr('name')) {
            $(p_obj).css("background", "#F7F8E0");
            $($(vcNomCss)[i + 1]).focus();
            $($(vcNomCss)[i + 1]).select();
            break;
        }
    }
    
}

function Valida_Caja(evt) {
    var charCode = (evt.which) ? evt.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }

    return true;
}

// ========================================================================
//  LISTAR CAMPOS
// ========================================================================
function Listar_Campos() {


 var tbColumns = [ //0 
                   // {name: 'P_vcNum', index: 'P_vcNum', label: 'P_vcNum', hidden: false },

                   //{name: 'P_vcNum', index: 'P_vcNum', label: 'P_vcNum', hidden: true },
                    { name: 'P_vcNum', index: 'P_vcNum', label: 'Columna XLS', hidden: false, width: '140px', sortable: false, align: 'left', classes: 'ColumnGrillaLinea' ,
                        formatter: function (value, options, rData) {
                            return "" + rData[1];
                        }},
                    { name: 'P_vcNum', index: 'P_vcNum', label: 'Column SQL', hidden: false, width: '115px', sortable: false,
                        formatter: function (value, options, rData) {
                            return "" + rData[2];
                        }},
                    { name: 'P_vcNum', index: 'P_vcNum', label: 'Tipo Dato', hidden: false, width: '80px', sortable: false,
                        formatter: function (value, options, rData) {
                            return "" + rData[3];
                        } 
                    },
                    { name: 'P_vcNum', index: 'P_vcNum', label: 'is Primary', hidden: false, width: '80px', sortable: false,
                        formatter: function (value, options, rData) {
                            return "" + rData[4];
                        }
                    },
                    { name: 'P_vcNum', index: 'P_vcNum', label: 'Posición', hidden: false, width: '60px', sortable: false,
                        formatter: function (value, options, rData) {
                            return "<input class='MiTxt' id='txt_" + rData[0] + "' onClick='this.select();' name='" + rData[0] + "' type='text' onkeypress=' if (event.keyCode==13){ Guarda_Posicion(this.name,this.value,this);} else return Valida_Caja(event); '  value='" + rData[5] + "' style='width:30px;text-align:right;' maxlength='2'>";
                        }
                    },


                ];

   var tbCampos =  $("#tbCampos").jqGrid({
        //  sortable: true,
        width: "530",
        height: 150,
        datatype: function () {
                
                //$.ajax({
                //
                //    url: "ImportarUsuario.aspx/Lista_Campos", //PageMethod
                //    data: "{'inPagTam':'" + $('#tbCampos').getGridParam("rowNum") + "'," + //Tamaño de pagina
                //                        "'inPagAct':'" + parseInt($('#tbCampos').getGridParam("page")) + "'," + //Pagina actual
                //                        "'vcCriterio': ''}",
                //    dataType: "json",
                //    type: "post",
                //    contentType: "application/json; charset=utf-8",
                //    success: function (result) {
                //        $("#tbCampos")[0].addJSONData(result.d);
                //            
                //    },
                //    error: function (xhr, err, thrErr) {
                //        MostrarErrorAjax(xhr, err, thrErr);
                //    }
                //});   
        },
            jsonReader: { root: "Items", page: "PaginaActual", total: "TotalPaginas", records: "TotalRegistros", repeatitems: true, cell: "Row", id: "idImpConf" },
        colModel: tbColumns, pager: "#pagerCampos", loadtext: 'Cargando datos...',recordtext: "{0} - {1} de {2} elementos",
        emptyrecords: 'No hay resultados',pgtext: 'Pág: {0} de {1}', //Paging input control text format.
        rowNum: 10, rowList: [10, 20, 30], viewrecords: true, //caption: "Centro de Costos",
        rownumbers: true,shrinkToFit: false, 
         ondblClickRow: function () {
            //fila = $("#tbPeriodo").jqGrid('getRowData', id);
            //VerDetalleLineas('2', RegistroActual.CCNumero);
            //VerDetalle();
            
            //($("#grid").getRowData(id)).NombreNivel
        },
        onSelectRow: function (id, select, item) {
            //RegistroActual = $("#tbCC").jqGrid('getRowData', id);

        }       
    }).navGrid("#pagerCampos", { edit: false, add: false, search: false, del: false });


}

// ========================================================================
//  LISTAR LOG
// ========================================================================
function Listar_Log() {


    var tbColumns = [ //0 
    // {name: 'P_vcNum', index: 'P_vcNum', label: 'P_vcNum', hidden: false },

    //{name: 'P_vcNum', index: 'P_vcNum', label: 'P_vcNum', hidden: true },
                    {name: '', index: '', label: '', hidden: true, width: '50px', sortable: false, align: 'left', classes: 'ColumnGrillaLinea',
                    formatter: function (value, options, rData) {
                        return "" + rData[0];
                    }
                },
                { name: '', index: '', label: 'Fila', hidden: false, width: '30px', sortable: false, align: 'left', classes: 'ColumnGrillaLinea',
                    formatter: function (value, options, rData) {
                        return "" + rData[1];
                    }
                },
                    { name: 'P_vcNum', index: 'P_vcNum', label: 'Tipo', hidden: false, width: '200px', sortable: false,
                        formatter: function (value, options, rData) {
                            //return "" + rData[2];
                            return "   <label for='male' style='color:" + rData[5] + "'>" + rData[2] + "</label> ";
                        }
                    },
                    { name: 'P_vcNum', index: 'P_vcNum', label: 'Descripción', hidden: false, width: '600px', sortable: false, align: 'left', classes: 'ColumnGrillaLinea',
                        formatter: function (value, options, rData) {
                            //return "   <label for='male' style='color:" + rData[5] + "'>" + rData[3] + "</label> ";
                            return " " + rData[3];
                        }
                    }

                ];

                    var tbLog = $("#tbLog").jqGrid({
                        //  sortable: true,
                        width: WidthTabla,
        height: ($(window).height() - HeigthLog),
        datatype: function () {

            //$.ajax({
            //
            //    url: "ImportarUsuario.aspx/Lista_Log", //PageMethod
            //    data: "{'inPagTam':'" + $('#tbLog').getGridParam("rowNum") + "'," + //Tamaño de pagina
            //                            "'inPagAct':'" + parseInt($('#tbLog').getGridParam("page")) + "'," + //Pagina actual
            //                            "'vcCriterio': ''}",
            //    dataType: "json",
            //    type: "post",
            //    contentType: "application/json; charset=utf-8",
            //    success: function (result) {
            //        $("#tbLog")[0].addJSONData(result.d);
            //
            //    },
            //    error: function (xhr, err, thrErr) {
            //        MostrarErrorAjax(xhr, err, thrErr);
            //    }
            //});
        },
        jsonReader: { root: "Items", page: "PaginaActual", total: "TotalPaginas", records: "TotalRegistros", repeatitems: true, cell: "Row", id: "idImpConf" },
        colModel: tbColumns, pager: "#pagerLog", loadtext: 'Cargando datos...', recordtext: "{0} - {1} de {2} elementos",
        emptyrecords: 'No hay resultados', pgtext: 'Pág: {0} de {1}', //Paging input control text format.
        rowNum: RowsLog, rowList: [10, 20, 30], viewrecords: true, //caption: "Centro de Costos",
        rownumbers: false, shrinkToFit: false
    }).navGrid("#pagerLog", { edit: false, add: false, search: false, del: false });


}



    // ========================================================================
    //  LISTAR USUARIO
    // ========================================================================
    function Listar_Usuario() {


        var tbColumns = [ //0 
        // {name: 'P_vcNum', index: 'P_vcNum', label: 'P_vcNum', hidden: false },

        //{name: 'P_vcNum', index: 'P_vcNum', label: 'P_vcNum', hidden: true },

                    {name: '', index: '', label: 'Código', hidden: false, width: '90px', sortable: false, align: 'left', classes: 'ColumnGrillaLinea',
                    formatter: function (value, options, rData) {
                        return "" + rData[4];
                    }
                },


                    { name: '', index: '', label: 'Nombre Usuario', hidden: false, width: '250px', sortable: false, align: 'left', classes: 'ColumnGrillaLinea',
                        formatter: function (value, options, rData) {
                            return "" + rData[1];
                        }
                    },
                    { name: '', index: '', label: 'Usuario', hidden: false, width: '90px', sortable: false, align: 'left',
                        formatter: function (value, options, rData) {
                            return "" + rData[2];
                        }
                    },
                    { name: '', index: '', label: 'Correo', hidden: false, width: '200px', sortable: false,
                        formatter: function (value, options, rData) {
                            return "" + rData[5];
                        }
                    },
                    { name: '', index: '', label: 'Fecha Ingreso', hidden: false, width: '140px', sortable: false,
                        formatter: function (value, options, rData) {
                            return "" + rData[7];
                        }
                    }

                ];

        var tbUsuario = $("#tbUsuario").jqGrid({
            //  sortable: true,
            width: WidthTabla,
            height: ($(window).height() - HeigthLog),
            datatype: function () {

                //$.ajax({
                //
                //    url: "ImportarUsuario.aspx/Lista_UsuarioConCodigo", //PageMethod
                //    data: "{'inPagTam':'" + $('#tbUsuario').getGridParam("rowNum") + "'," + //Tamaño de pagina
                //                        "'inPagAct':'" + parseInt($('#tbUsuario').getGridParam("page")) + "'," + //Pagina actual
                //                        "'vcCriterio': ''}",
                //    dataType: "json",
                //    type: "post",
                //    contentType: "application/json; charset=utf-8",
                //    success: function (result) {
                //        $("#tbUsuario")[0].addJSONData(result.d);
                //
                //    },
                //    error: function (xhr, err, thrErr) {
                //        MostrarErrorAjax(xhr, err, thrErr);
                //    }
                //});
            },
            jsonReader: { root: "Items", page: "PaginaActual", total: "TotalPaginas", records: "TotalRegistros", repeatitems: true, cell: "Row", id: "P_inCod" },
            colModel: tbColumns, pager: "#pagerUsuario", loadtext: 'Cargando datos...', recordtext: "{0} - {1} de {2} elementos",
            emptyrecords: 'No hay resultados', pgtext: 'Pág: {0} de {1}', //Paging input control text format.
            rowNum: RowsUsu, rowList: [50, 100, 150], viewrecords: true, //caption: "Centro de Costos",
            rownumbers: true, shrinkToFit: false
        }).navGrid("#pagerUsuario", { edit: false, add: false, search: false, del: false });


    }

    // ========================================================================
    //  LISTAR USUARIO
    // ========================================================================
    function Listar_UsuarioSin() {


        var tbColumns = [ //0 
        // {name: 'P_vcNum', index: 'P_vcNum', label: 'P_vcNum', hidden: false },

        //{name: 'P_vcNum', index: 'P_vcNum', label: 'P_vcNum', hidden: true },

                    {name: '', index: '', label: 'Código', hidden: false, width: '90px', sortable: false, align: 'left', classes: 'ColumnGrillaLinea',
                    formatter: function (value, options, rData) {
                        return "" + rData[4];
                    }
                },


                    { name: '', index: '', label: 'Nombre Usuario', hidden: false, width: '250px', sortable: false, align: 'left', classes: 'ColumnGrillaLinea',
                        formatter: function (value, options, rData) {
                            return "" + rData[1];
                        }
                    },
                    { name: '', index: '', label: 'Usuario', hidden: false, width: '90px', sortable: false, align: 'left',
                        formatter: function (value, options, rData) {
                            return "" + rData[2];
                        }
                    },
                    { name: '', index: '', label: 'Correo', hidden: false, width: '200px', sortable: false,
                        formatter: function (value, options, rData) {
                            return "" + rData[5];
                        }
                    },
                    { name: '', index: '', label: 'Fecha Ingreso', hidden: false, width: '140px', sortable: false,
                        formatter: function (value, options, rData) {
                            return "" + rData[7];
                        }
                    }

                ];

                    var tbUsuarioSin = $("#tbUsuarioSin").jqGrid({
            //  sortable: true,
                        width: WidthTabla,
            height: ($(window).height() - HeigthLog),
            datatype: function () {

                //$.ajax({
                //
                //    url: "ImportarUsuario.aspx/Lista_UsuarioSinCodigo", //PageMethod
                //    data: "{'inPagTam':'" + $('#tbUsuario').getGridParam("rowNum") + "'," + //Tamaño de pagina
                //                        "'inPagAct':'" + parseInt($('#tbUsuario').getGridParam("page")) + "'," + //Pagina actual
                //                        "'vcCriterio': ''}",
                //    dataType: "json",
                //    type: "post",
                //    contentType: "application/json; charset=utf-8",
                //    success: function (result) {
                //        $("#tbUsuarioSin")[0].addJSONData(result.d);
                //
                //    },
                //    error: function (xhr, err, thrErr) {
                //        MostrarErrorAjax(xhr, err, thrErr);
                //    }
                //});
            },
            jsonReader: { root: "Items", page: "PaginaActual", total: "TotalPaginas", records: "TotalRegistros", repeatitems: true, cell: "Row", id: "P_inCod" },
            colModel: tbColumns, pager: "#pagerUsuarioSin", loadtext: 'Cargando datos...', recordtext: "{0} - {1} de {2} elementos",
            emptyrecords: 'No hay resultados', pgtext: 'Pág: {0} de {1}', //Paging input control text format.
            rowNum: RowsUsu, rowList: [50, 100, 150], viewrecords: true, //caption: "Centro de Costos",
            rownumbers: true, shrinkToFit: false
        }).navGrid("#pagerUsuarioSin", { edit: false, add: false, search: false, del: false });


    }
