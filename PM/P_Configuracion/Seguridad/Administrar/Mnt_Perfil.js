var anchoDia_ = 70;
var ancho_ = 21; //'17px'; //15

// ===============================================================================================================
// ENTIDAD - SEG PERFIL 
// ===============================================================================================================
function seg_perfil(P_inCod, vcNom, inCodTip_DashMovil, inCodTip_DashEmpl, inCodTip_Consumo, vcHoras, inCodTip_General) {
    this.P_inCod = P_inCod;
    this.vcNom = vcNom;
    this.inCodTip_DashMovil = inCodTip_DashMovil;
    this.inCodTip_DashEmpl = inCodTip_DashEmpl;
    this.inCodTip_Consumo = inCodTip_Consumo;
    this.vcHoras = vcHoras;
    this.inCodTip_General = inCodTip_General;
}


// ===============================================================================================================
// BUSCAR HORARIO
// ===============================================================================================================
function Buscar_HoraAcceso(vcDia, num_) {
    // var idHora = 0;
    var vcCodHora = vcDia.substr(0, 2) + (num_ <= 9 ? "0" + num_ : "" + num_);


    var idHoras = $("#hdf_idHoras").val();
    idHoras = idHoras + (idHoras.length > 0 ? ',' : '') + vcCodHora;
    $("#hdf_idHoras").val(idHoras);

}

// ===========================================================================================================
// MARCAR DIA
// ===========================================================================================================
function Marcar_Dia(vcDia) {

    for (i = 1; i <= 24; i++) {

        var check = "#check_" + i + "_" + vcDia;
        var vcCodHora = vcDia.substr(0, 2) + (i <= 9 ? "0" + i : "" + i);
        // alert($(check));
        if (!$(check).is(":checked")) {

            $(check).prop('checked', true);

            Buscar_HoraAcceso(vcDia, i);

        } else {
            // FALSA - RETIRAMOS
            // ===========================================================================================================
            var txtidHora = $("#hdf_idHoras").val();
            var mySplitResult = txtidHora.split(",");
            var txtidHora_nuevo = '';

            $(check).prop('checked', false);

            for (ii = 0; ii < mySplitResult.length; ii++) {
                //alert(mySplitResult[ii]);
                if (vcCodHora != mySplitResult[ii]) {
                    txtidHora_nuevo = txtidHora_nuevo + (txtidHora_nuevo.length > 0 ? ',' : '') + mySplitResult[ii];
                }
            }

            $("#hdf_idHoras").val(txtidHora_nuevo);
        }


    }

}

function QuitarTodos() {
    var i;
    for (i= 1; i <= 7; i++) {
        // ==============================================================================================================================
        var vcNomDia = '';

        if (i == 1) {vcNomDia = 'Domingo';}
        if (i == 2) {vcNomDia = 'Lunes';}
        if (i == 3) {vcNomDia = 'Martes';}
        if (i == 4) {vcNomDia = 'Miércoles';}
        if (i == 5) {vcNomDia = 'Jueves';}
        if (i == 6) {vcNomDia = 'Viernes';}
        if (i == 7) { vcNomDia = 'Sabado'; }
        var nuDia;
        for (nuDia = 1; nuDia <= 24; nuDia++) {
            $("#check_" + nuDia + "_" + vcNomDia).prop('checked', false);
        }
        // ==============================================================================================================================
    }
    $("#hdf_idHoras").val('');
}
// ===============================================================================================================
// ASIGNAR HORA ACCESO
// ===============================================================================================================
function Asignar_HoraAcceso(vcDia, num_) {

    var check = "#check_" + num_ + "_" + vcDia;
    var vcCodHora = vcDia.substr(0, 2) + (num_ <= 9 ? "0" + num_ : "" + num_);


    var idHora = vcCodHora;
    var txtidHora = $("#hdf_idHoras").val();

    // ===========================================================================================================
    // TRUE - AGREGAMOS
    // ===========================================================================================================
    if ($(check).is(':checked')) {
        txtidHora = txtidHora + (txtidHora.length > 0 ? ',' : '') + idHora;
        $("#hdf_idHoras").val(txtidHora);
    } else {
        // ===========================================================================================================
        // FALSA - RETIRAMOS
        // ===========================================================================================================
        var txtidHora = $("#hdf_idHoras").val();
        var mySplitResult = txtidHora.split(",");
        var txtidHora_nuevo = '';

        for (i = 0; i < mySplitResult.length; i++) {
            //alert(mySplitResult[i]);
            if (idHora != mySplitResult[i]) {
                txtidHora_nuevo = txtidHora_nuevo + (txtidHora_nuevo.length > 0 ? ',' : '') + mySplitResult[i];
            }
        }

        $("#hdf_idHoras").val(txtidHora_nuevo);
        // ===========================================================================================================
    }


}
// ===================================================================================================================================================
// HORARIO ACCESO SISTEMA
// ===================================================================================================================================================

function Listar_HorarioAcceso() {

    

        $("#tbNumeros3").jqGrid('clearGridData');
        // ==============================================================================================================================
        $.ajax({
            // ==============================================================================================================================
            type: "POST",
            // ==============================================================================================================================
            url: "Mnt_Perfil.aspx/Listar_HorarioAcceso",
            // ==============================================================================================================================
            data: "{'prCriterio': '" + $('#hdfCodigo').val() + "'}",
            // ==============================================================================================================================
            contentType: "application/json; charset=utf-8",
            // ==============================================================================================================================
            dataType: "json",
            // ==============================================================================================================================
            success: function (result) {
                // ===========================================================================================================================
                if ($(result.d).length > 0) {
                    // =======================================================================================================================
                    var i;
                    for (i = 0; i < $(result.d).length; i++) {
                        // ===================================================================================================================
                        //alert(result.d[i].Horario_in1);
                        $("#tbNumeros3").jqGrid('addRowData', result.d[i].Horario_vcDia, result.d[i]);
                        // ===================================================================================================================
                    }
                }
                else {
                    // =======================================================================================================================
                    //Mensaje("<br/><h1>No se encontraron registros</h1><br/>", document, cerroMensaje);
                    // alerta("No se encontraron campos en el Archivo");
                    // =======================================================================================================================
                }
            }, // ============================================================================================================================
            error: function (xhr, err, thrErr) {
                // ===========================================================================================================================
                MostrarErrorAjax(xhr, err, thrErr);
                // ===========================================================================================================================
            }

        });

//        },
//        // ===================================================================================================================================================
//        buttons: {
//            "Quitar Todos": function () {
//                // ===================================================================================================================================================                
//                //alert($("#hdf_idHoras").val());
//                for (var i = 1; i <= 7; i++) {
//                    // ==============================================================================================================================
//                    var vcNomDia = '';

//                    if (i == 1) vcNomDia = 'Domingo';
//                    if (i == 2) vcNomDia = 'Lunes';
//                    if (i == 3) vcNomDia = 'Martes';
//                    if (i == 4) vcNomDia = 'Miércoles';
//                    if (i == 5) vcNomDia = 'Jueves';
//                    if (i == 6) vcNomDia = 'Viernes';
//                    if (i == 7) vcNomDia = 'Sabado';

//                    for (var nuDia = 1; nuDia <= 24; nuDia++) {
//                        $("#check_" + nuDia + "_" + vcNomDia).prop('checked', false);
//                    }
//                    // ==============================================================================================================================
//                }
//                $("#hdf_idHoras").val('');
//                // ===================================================================================================================================================
//            },
//            "Terminar": function () {
//                // ===================================================================================================================================================                
//                //alert($("#hdf_idHoras").val());
//                $(this).dialog("close");
//                // ===================================================================================================================================================
//            }

//        }
//    });
}
//var jsonTreeGrid;
//function CargarTreeGridAccesos() {
//    var idPerfil = $("#hdfCodigo").val();
//    $.ajax({
//        type: "POST",
//        url: "Mnt_Perfil.aspx/ObtenerTodosProductos",
//        data: "{'inCodPerfil': '" + idPerfil + "' }",
//        contentType: "application/json; charset=utf-8",
//        dataType: "json",
//        success: function (result) {
//            var lstProductos = result.d;
//            var rowsProd = new Array();
//            for (var i = 0; i < $(lstProductos).length; i++) {
//                var rowProd = { id: lstProductos[i].OrdenGrilla, cell: [lstProductos[i].OrdenGrilla, lstProductos[i].Descripcion, lstProductos[i].IsSelected, lstProductos[i].inNivel - 1, false, true, false] };
//                rowsProd.push(rowProd);
//            }
//            jsonTreeGrid = { total: "1", page: "1", records: lstProductos.length, rows: rowsProd };
//            $("#btTreeGridAccesos")[0].addJSONData(jsonTreeGrid);
//        },
//        error: function (xhr, err, thrErr) {
//            MostrarErrorAjax(xhr, err, thrErr);
//        }
//    });
//}

//function CargarGrillaAccesos() {
//    var idPerfil = $("#hdfCodigo").val();
//    $.ajax({
//        type: "POST",
//        url: "Mnt_Perfil.aspx/ObtenerTodosProductos",
//        data: "{'inCodPerfil': '" + idPerfil + "' }",
//        contentType: "application/json; charset=utf-8",
//        dataType: "json",
//        success: function (result) {
//            var lstProductos = result.d;
//            //for (var i = 0; i < $(lstProductos).length; i++) {
//            //    tbAccesos.jqGrid('addRowData', lstProductos[i].OrdenGrilla, lstProductos[i]);
//            //}
//            var j = 0;
//            idSetIntervalAcceso = setInterval(function () {
//                tbAccesos.jqGrid('addRowData', lstProductos[j].OrdenGrilla, lstProductos[j]);
//                j++;
//                if (j == $(lstProductos).length)
//                    clearInterval(idSetIntervalAcceso);
//            }, 1);
//
//            //alerta("gracias totales");
//        },
//        error: function (xhr, err, thrErr) {
//            MostrarErrorAjax(xhr, err, thrErr);
//        }
//    });
//}

function CargarGrillaUsuarios() {
    var idPerfil = $("#hdfCodigo").val();
    var inPagTam = $("#tbUsuarios").getGridParam("rowNum");
    var inPagAct = $("#tbUsuarios").getGridParam("page");
    var vcFiltro = $("#txtBuscarUsuario").val();
    if (idPerfil == '') {
        return;
    }
    $.ajax({
        type: "POST",
        url: "Mnt_Perfil.aspx/ObtenerUsuarios_Perfil",
        data: "{'pIdPerfil': '" + idPerfil + "', 'inPagTam':'" + inPagTam + 
                "', 'inPagAct':'" + inPagAct + "', 'vcFiltro':'" + vcFiltro + "' }",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            var lstUsuarios = result.d;
            $("#tbUsuarios")[0].addJSONData(lstUsuarios);
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
}

//function CargarTreeUsuarios() {
//    var treeData;
//    var idPerfil = $("#hdfCodigo").val();
//    BloquearPagina(true);
//    $("#dvProcesando").show();
//    $("#lblProcesando").text("Cargando usuarios...");
//    $.ajax({
//        type: "POST",
//        url: "Mnt_Perfil.aspx/ObtenerUsuariosTree_Perfil",
//        data: "{'pIdPerfil': '" + idPerfil + "'}",
//        contentType: "application/json; charset=utf-8",
//        dataType: "json",
//        success: function (resultado) {
//            //var treeData = JSON.parse(resultado.d);
//            //$("#divTreeUsuarios").dynatree({
//            //    checkbox: true,
//            //    selectMode: 3,
//            //    children: treeData,
//            //    cookieId: "dynatree-Cb3",
//            //    idPrefix: "dynatree-Cb3-",
//            //    fx: { height: "toggle", duration: 200 },
//            //    onSelect: function (select, node) {
//            //        node.data.select = select;
//            //    }
//            //});
//            
//            //con intervalo
//            //var j = 0;
//            //idSetIntervalUsuario = setInterval(function () {
//            //    if (lstUsuarios[j].select) {
//            //        $("#lstSeleccionados").append($("<option></option>").attr("value", lstUsuarios[j].key).text(lstUsuarios[j].title));
//            //    } else {
//            //        $("#lstResultado").append($("<option></option>").attr("value", lstUsuarios[j].key).text(lstUsuarios[j].title));
//            //    };
//            //    j++;
//            //    if (j == $(lstUsuarios).length)
//            //        clearInterval(idSetIntervalUsuario);
//            //}, 1);
//
//            //sin intervalo
//
//            ////comentado 25-03-2014
//            //var lstUsuarios = JSON.parse(resultado.d);
//            //$.each(lstUsuarios, function () {
//            //    if (this.select) {
//            //        $("#lstSeleccionados").append($("<option></option>").attr("value", this.key).text(this.title));
//            //    } else {
//            //        $("#lstResultado").append($("<option></option>").attr("value", this.key).text(this.title));
//            //    };
//            //});
//            //BloquearPagina(false);
//            //$("#dvProcesando").hide(100);
//        },
//        error: function (xhr, err, thrErr) {
//            MostrarErrorAjax(xhr, err, thrErr);
//        }
//    });
//}

//function CargarTree() {
//    var treeData;
//    var idPerfil = $("#hdfCodigo").val();
//    var biCheckBox = false;
//
//    $.ajax({
//        type: "POST",
//        url: "Mnt_Perfil.aspx/ObtenerProductoTree",
//        data: "{'pIdPerfil': '" + idPerfil + "'}",
//        contentType: "application/json; charset=utf-8",
//        dataType: "json",
//        success: function (resultado) {
//            treeData = resultado.d;
//            var treeData2 = JSON.parse(treeData);
//            $("#divTree").dynatree({
//                checkbox: true,
//                selectMode: 3,
//                children: treeData2,
//                cookieId: "dynatree-Cb3",
//                idPrefix: "dynatree-Cb3-",
//                fx: { height: "toggle", duration: 200 },
//                onSelect: function (select, node) {
//                    node.data.select = select;
//                },
//                onQuerySelect: function (flag, node) {
//                    if (idPerfil == "42")
//                        return false;
//                    else
//                        return true;
//                }
//                //                ,onExpand: function () {
//                //                    var altura = $("#divTree").height();
//                //                    if (altura > 270) {
//                //                        $("#divTree").height('270px');
//                //                        alert(altura);
//                //                    } else {
//                //                        $("#divTree").css("height", "auto");
//                //                        alert(altura);
//                //                    };
//                //                }
//            });
//        },
//        error: function (xhr, err, thrErr) {
//            MostrarErrorAjax(xhr, err, thrErr);
//        }
//    });
//}
var tbUsuarios;
//var tbAccesos;
var btTreeGridAccesos;

//#region Seccion Tipo Linea
var activarAccesoDashMov = false;
var activarAccesoDashEmpl = false;
var activarAccesoConsultas = false;
var textDashMov = '';
var textDashEmpl = '';
var textConsumo = '';
//#endregion

// ====================================================================================================================================
// LOAD
// ====================================================================================================================================
$(function () {



    try {

        // ========================================================================================================================
        // HORARIO
        // ========================================================================================================================    
        var align_ = 'center';
        var tbNumeros3 = $("#tbNumeros3").jqGrid({
            datatype: "local",
            colModel: [ //0
                {name: 'Horario_vcDia', index: 'Horario_vcDia', label: 'Día', hidden: false, width: anchoDia_, sortable: false,
                formatter: function (value, options, rData) {
                    return "<a  href='#' onclick='Marcar_Dia(this.id)' id='" + rData.Horario_vcDia + "' >" + rData.Horario_vcDia + "</a>";
                }
            },
            // ========================================================================================================================    
                   {name: 'Horario_in1', index: 'Horario_in1', label: '00', hidden: false, width: ancho_, sortable: false, align: align_,
                   formatter: function (value, options, rData) {
                       return "<input title='" + rData.Horario_vcDia + "' " + (rData.Horario_in1 == '0' ? '' : 'checked') + " name='" + rData.Horario_vcDia + "' onclick='Asignar_HoraAcceso(this.name,1)'  type='checkbox' id='check_1_" + rData.Horario_vcDia + "' />";
                   }
               },
                   { name: 'Horario_in2', index: 'Horario_in2', label: '01', hidden: false, width: ancho_, sortable: false, align: align_,
                       formatter: function (value, options, rData) {
                           return "<input title='" + rData.Horario_vcDia + "' " + (rData.Horario_in2 == '0' ? '' : 'checked') + " name='" + rData.Horario_vcDia + "' onclick='Asignar_HoraAcceso(this.name,2)'  type='checkbox' id='check_2_" + rData.Horario_vcDia + "' />";
                       }
                   },
                   { name: 'Horario_in3', index: 'Horario_in3', label: '02', hidden: false, width: ancho_, sortable: false, align: align_,
                       formatter: function (value, options, rData) {
                           return "<input title='" + rData.Horario_vcDia + "' " + (rData.Horario_in3 == '0' ? '' : 'checked') + " name='" + rData.Horario_vcDia + "' onclick='Asignar_HoraAcceso(this.name,3)'  type='checkbox' id='check_3_" + rData.Horario_vcDia + "' />";
                       }
                   },
                   { name: 'Horario_in4', index: 'Horario_in4', label: '03', hidden: false, width: ancho_, sortable: false, align: align_,
                       formatter: function (value, options, rData) {
                           return "<input title='" + rData.Horario_vcDia + "' " + (rData.Horario_in4 == '0' ? '' : 'checked') + "  name='" + rData.Horario_vcDia + "' onclick='Asignar_HoraAcceso(this.name,4)'  type='checkbox' id='check_4_" + rData.Horario_vcDia + "' />";
                       }
                   },
                   { name: 'Horario_in5', index: 'Horario_in5', label: '04', hidden: false, width: ancho_, sortable: false, align: align_,
                       formatter: function (value, options, rData) {
                           return "<input title='" + rData.Horario_vcDia + "'  " + (rData.Horario_in5 == '0' ? '' : 'checked') + " name='" + rData.Horario_vcDia + "' onclick='Asignar_HoraAcceso(this.name,5)'  type='checkbox' id='check_5_" + rData.Horario_vcDia + "' />";
                       }
                   },
            // ========================================================================================================================    
            // ========================================================================================================================    
                   {name: 'Horario_in6', index: 'Horario_in6', label: '05', hidden: false, width: ancho_, sortable: false, align: align_,
                   formatter: function (value, options, rData) {
                       return "<input title='" + rData.Horario_vcDia + "'  " + (rData.Horario_in6 == '0' ? '' : 'checked') + " name='" + rData.Horario_vcDia + "' onclick='Asignar_HoraAcceso(this.name,6)'  type='checkbox' id='check_6_" + rData.Horario_vcDia + "' />";
                   }
               },
                   { name: 'Horario_in7', index: 'Horario_in7', label: '06', hidden: false, width: ancho_, sortable: false, align: align_,
                       formatter: function (value, options, rData) {
                           return "<input title='" + rData.Horario_vcDia + "' " + (rData.Horario_in7 == '0' ? '' : 'checked') + "  name='" + rData.Horario_vcDia + "' onclick='Asignar_HoraAcceso(this.name,7)'  type='checkbox' id='check_7_" + rData.Horario_vcDia + "' />";
                       }
                   },
                   { name: 'Horario_in8', index: 'Horario_in8', label: '07', hidden: false, width: ancho_, sortable: false, classes: 'css_fondoHorario', align: align_,
                       formatter: function (value, options, rData) {
                           return "<input title='" + rData.Horario_vcDia + "' " + (rData.Horario_in8 == '0' ? '' : 'checked') + "  name='" + rData.Horario_vcDia + "' onclick='Asignar_HoraAcceso(this.name,8)'  type='checkbox' id='check_8_" + rData.Horario_vcDia + "' />";
                       }
                   },
                   { name: 'Horario_in9', index: 'Horario_in9', label: '08', hidden: false, width: ancho_, sortable: false, classes: 'css_fondoHorario', align: align_,
                       formatter: function (value, options, rData) {
                           return "<input title='" + rData.Horario_vcDia + "' " + (rData.Horario_in9 == '0' ? '' : 'checked') + "  name='" + rData.Horario_vcDia + "' onclick='Asignar_HoraAcceso(this.name,9)'  type='checkbox' id='check_9_" + rData.Horario_vcDia + "' />";
                       }
                   },
                   { name: 'Horario_in10', index: 'Horario_in10', label: '09', hidden: false, width: ancho_, sortable: false, classes: 'css_fondoHorario', align: align_,
                       formatter: function (value, options, rData) {
                           return "<input title='" + rData.Horario_vcDia + "' " + (rData.Horario_in10 == '0' ? '' : 'checked') + "  name='" + rData.Horario_vcDia + "' onclick='Asignar_HoraAcceso(this.name,10)'  type='checkbox' id='check_10_" + rData.Horario_vcDia + "' />";
                       }
                   },
            // ========================================================================================================================    
            // ========================================================================================================================    
                   {name: 'Horario_in11', index: 'Horario_in11', label: '10', hidden: false, width: ancho_, sortable: false, classes: 'css_fondoHorario', align: align_,
                   formatter: function (value, options, rData) {
                       return "<input title='" + rData.Horario_vcDia + "'  " + (rData.Horario_in11 == '0' ? '' : 'checked') + " name='" + rData.Horario_vcDia + "' onclick='Asignar_HoraAcceso(this.name,11)' type='checkbox' id='check_11_" + rData.Horario_vcDia + "' />";
                   }
               },
                   { name: 'Horario_in12', index: 'Horario_in12', label: '11', hidden: false, width: ancho_, sortable: false, classes: 'css_fondoHorario', align: align_,
                       formatter: function (value, options, rData) {
                           return "<input title='" + rData.Horario_vcDia + "'  " + (rData.Horario_in12 == '0' ? '' : 'checked') + " name='" + rData.Horario_vcDia + "' onclick='Asignar_HoraAcceso(this.name,12)' type='checkbox' id='check_12_" + rData.Horario_vcDia + "' />";
                       }
                   },
                   { name: 'Horario_in13', index: 'Horario_in13', label: '12', hidden: false, width: ancho_, sortable: false, classes: 'css_fondoHorario', align: align_,
                       formatter: function (value, options, rData) {
                           return "<input title='" + rData.Horario_vcDia + "'  " + (rData.Horario_in13 == '0' ? '' : 'checked') + " name='" + rData.Horario_vcDia + "' onclick='Asignar_HoraAcceso(this.name,13)' type='checkbox' id='check_13_" + rData.Horario_vcDia + "' />";
                       }
                   },
                   { name: 'Horario_in14', index: 'Horario_in14', label: '13', hidden: false, width: ancho_, sortable: false, classes: 'css_fondoHorario', align: align_,
                       formatter: function (value, options, rData) {
                           return "<input title='" + rData.Horario_vcDia + "' " + (rData.Horario_in14 == '0' ? '' : 'checked') + "  name='" + rData.Horario_vcDia + "' onclick='Asignar_HoraAcceso(this.name,14)' type='checkbox' id='check_14_" + rData.Horario_vcDia + "' />";
                       }
                   },
                   { name: 'Horario_in15', index: 'Horario_in15', label: '14', hidden: false, width: ancho_, sortable: false, classes: 'css_fondoHorario', align: align_,
                       formatter: function (value, options, rData) {
                           return "<input title='" + rData.Horario_vcDia + "'  " + (rData.Horario_in15 == '0' ? '' : 'checked') + " name='" + rData.Horario_vcDia + "' onclick='Asignar_HoraAcceso(this.name,15)' type='checkbox' id='check_15_" + rData.Horario_vcDia + "' />";
                       }
                   },
            // ========================================================================================================================    
            // ========================================================================================================================    
                   {name: 'Horario_in16', index: 'Horario_in16', label: '15', hidden: false, width: ancho_, sortable: false, classes: 'css_fondoHorario', align: align_,
                   formatter: function (value, options, rData) {
                       return "<input title='" + rData.Horario_vcDia + "' " + (rData.Horario_in16 == '0' ? '' : 'checked') + "  name='" + rData.Horario_vcDia + "' onclick='Asignar_HoraAcceso(this.name,16)' type='checkbox' id='check_16_" + rData.Horario_vcDia + "' />";
                   }
               },
                   { name: 'Horario_in17', index: 'Horario_in17', label: '16', hidden: false, width: ancho_, sortable: false, classes: 'css_fondoHorario', align: align_,
                       formatter: function (value, options, rData) {
                           return "<input title='" + rData.Horario_vcDia + "' " + (rData.Horario_in17 == '0' ? '' : 'checked') + "  name='" + rData.Horario_vcDia + "' onclick='Asignar_HoraAcceso(this.name,17)' type='checkbox' id='check_17_" + rData.Horario_vcDia + "' />";
                       }
                   },
                   { name: 'Horario_in18', index: 'Horario_in18', label: '17', hidden: false, width: ancho_, sortable: false, classes: 'css_fondoHorario', align: align_,
                       formatter: function (value, options, rData) {
                           return "<input title='" + rData.Horario_vcDia + "' " + (rData.Horario_in18 == '0' ? '' : 'checked') + "  name='" + rData.Horario_vcDia + "' onclick='Asignar_HoraAcceso(this.name,18)' type='checkbox' id='check_18_" + rData.Horario_vcDia + "' />";
                       }
                   },
                   { name: 'Horario_in19', index: 'Horario_in19', label: '18', hidden: false, width: ancho_, sortable: false, classes: 'css_fondoHorario', align: align_,
                       formatter: function (value, options, rData) {
                           return "<input title='" + rData.Horario_vcDia + "' " + (rData.Horario_in19 == '0' ? '' : 'checked') + "  name='" + rData.Horario_vcDia + "' onclick='Asignar_HoraAcceso(this.name,19)' type='checkbox' id='check_19_" + rData.Horario_vcDia + "' />";
                       }
                   },
                   { name: 'Horario_in20', index: 'Horario_in20', label: '19', hidden: false, width: ancho_, sortable: false, classes: 'css_fondoHorario', align: align_,
                       formatter: function (value, options, rData) {
                           return "<input title='" + rData.Horario_vcDia + "' " + (rData.Horario_in20 == '0' ? '' : 'checked') + "  name='" + rData.Horario_vcDia + "' onclick='Asignar_HoraAcceso(this.name,20)' type='checkbox' id='check_20_" + rData.Horario_vcDia + "' />";
                       }
                   },
            // ========================================================================================================================    
            // ========================================================================================================================    
                   {name: 'Horario_in21', index: 'Horario_in21', label: '20', hidden: false, width: ancho_, sortable: false, align: align_,
                   formatter: function (value, options, rData) {
                       return "<input title='" + rData.Horario_vcDia + "' " + (rData.Horario_in21 == '0' ? '' : 'checked') + "  name='" + rData.Horario_vcDia + "' onclick='Asignar_HoraAcceso(this.name,21)' type='checkbox' id='check_21_" + rData.Horario_vcDia + "' />";
                   }
               },
                   { name: 'Horario_in22', index: 'Horario_in22', label: '21', hidden: false, width: ancho_, sortable: false, align: align_,
                       formatter: function (value, options, rData) {
                           return "<input title='" + rData.Horario_vcDia + "' " + (rData.Horario_in22 == '0' ? '' : 'checked') + "  name='" + rData.Horario_vcDia + "' onclick='Asignar_HoraAcceso(this.name,22)' type='checkbox' id='check_22_" + rData.Horario_vcDia + "' />";
                       }
                   },
                   { name: 'Horario_in23', index: 'Horario_in23', label: '22', hidden: false, width: ancho_, sortable: false, align: align_,
                       formatter: function (value, options, rData) {
                           return "<input title='" + rData.Horario_vcDia + "' " + (rData.Horario_in23 == '0' ? '' : 'checked') + "  name='" + rData.Horario_vcDia + "' onclick='Asignar_HoraAcceso(this.name,23)' type='checkbox' id='check_23_" + rData.Horario_vcDia + "' />";
                       }
                   },

                   { name: 'Horario_in24', index: 'Horario_in24', label: '23', hidden: false, width: ancho_, sortable: false, align: align_,
                       formatter: function (value, options, rData) {
                           return "<input title='" + rData.Horario_vcDia + "' " + (rData.Horario_in24 == '0' ? '' : 'checked') + "  name='" + rData.Horario_vcDia + "' onclick='Asignar_HoraAcceso(this.name,24)' type='checkbox' id='check_24_" + rData.Horario_vcDia + "' />";
                       }
                   },
                ],
            sortname: "Horario_vcDia", //Default SortColumn
            sortorder: "asc", //Default SortOrder.
            width: (24 * (ancho_ + 5)) + (anchoDia_ + 5) + 1,
            height: (23 * 7) + 1,
            shrinkToFit: false,
            rownumbers: false,
            //caption: "Seleccione",
            beforeSelectRow: function (rowid, e) {
                return false;
            },
            onRightClickRow: function (rowid, iRow, iCol, e) {
                $("#tbNumeros3").jqGrid("resetSelection");
                return;
            }
        });




    } catch (e) {
        alerta(e);
    }

    //CargarTreeGridAccesos();
    IniciarPagina();


    //CargarTree();

    //CargarGrillaAccesos();
    //CargarTreeUsuarios();
    $(".btnNormal").button();
    var indiceTab = window.parent.tab.tabs("option", "selected");

    $("#txtBuscarUsuario").keypress(function (e) {
        if (e.keyCode == 13) {
            $("#tbUsuarios").trigger("reloadGrid");
        } else {
            return ValidarAlfaNumericoConEspacios(e);
        }
    });
    $("#txtNombre").focus();

    //var slstProductos = '{    "total": "1",    "page": "1",    "records": "2",    "rows": [           {"id": "1", "cell":  ["1",  "Super Item",     "300", "0", "",  "false", "false", "true"]},           {"id": "2", "cell":  ["2",  "Item 1",         "100", "1", "1", "false", "false", "true"]}]}  '; 


    function IniciarPagina() {

        if ($("#hdfCodigo").val() != '') {
            $("#AcordionUsuarios").show();
        } else {
            $("#AccordionJQ1").find('h3').filter(':contains(Dashboard)').hide();
        }

        //tabla Tree Grid
        //CargarTreeGridAccesos(),
        //alert(DatosTreeGridAccesos);

        //        var slstProductosk = '{    "total": "1",    "page": "1",    "records": "2",    "rows": [           {"id": "1", "cell":  ["1",  "Super Item0",     "300", "0", "",  "false", "false", "true"]},           {"id": "2", "cell":  ["2",  "Item 1",         "100", "1", "1", "false", "false", "true"]}]}  ';

        //jQuery("#btTreeGridAccesos").jqGrid({
        debugger;
        btTreeGridAccesos = $("#btTreeGridAccesos").jqGrid({
            datatype: 'jsonstring',
            datastr: DatosTreeGridAccesos,
            colNames: ["ID", "Acceso", 'Descripción', "Nivel", "CodPadre", "Código", "inNumNod", "inNumNodSelect", "lstCodNod", "esAdmLista", "Nuevo", "Editar Avanzado", "Editar Básico", "Eliminar", "Exportar", "btImp"], //16
            colModel: [
                { name: 'OrdenGrilla', index: 'OrdenGrilla', width: 0, hidden: true, key: true },
                { name: 'IsSelected', width: 80, sortable: false, align: 'center',
                    formatter: function (value, options, rData) {
                        if (value == "True") {
                            return '<input estActual="1" estAnterior="" class="chkAcceso" type="checkbox" id="chk-' + rData[0] + '" checked />';
                        } else {
                            return '<input estActual="0" estAnterior="" class="chkAcceso" type="checkbox" id="chk-' + rData[0] + '" />';
                        }
                    }
                },
                { name: 'Descripcion', width: 240, sortable: false },
                { name: 'inNivel', width: 0, sortable: false, hidden: true },
                { name: 'inPadre', width: 0, sortable: false, hidden: true },
                { name: 'Codigo', width: 0, sortable: false, hidden: true },
                { name: 'inNumNod', width: 0, sortable: false, hidden: true },
                { name: 'inNumNodSelect', width: 0, sortable: false, hidden: true },
                { name: 'lstCodNod', width: 0, sortable: false, hidden: true },
                { name: 'esAdmLista', width: 0, sortable: false, hidden: true },
                { name: 'btIns', width: 80, label: "Nuevo", sortable: false, align: 'center',
                    formatter: function (value, options, rData) {
                        if (rData[6] == "0" && rData[9] == "True") {
                            if (rData[1] == "True") {
                                if (value == "True") {
                                    return '<input class="chkIns" type="checkbox" id="chkIns-' + rData[0] + '" checked />';
                                } else {
                                    return '<input class="chkIns" type="checkbox" id="chkIns-' + rData[0] + '" />';
                                }
                            } else {
                                return '<input class="chkIns" type="checkbox" id="chkIns-' + rData[0] + '" disabled/>';
                            }
                        } else {
                            return '';
                        }
                    }
                },
                { name: 'btAct', width: 80, label: "Editar Avanzado", sortable: false, align: 'center',
                    formatter: function (value, options, rData) {
                        if (rData[6] == "0" && rData[9] == "True") {
                            if (rData[2] == "Solicitudes") {
                                return '';
                            }
                            if (rData[1] == "True") {
                                if (value == "True") {
                                    return '<input class="chkAct" type="checkbox" id="chkAct-' + rData[0] + '" checked />';
                                } else {
                                    return '<input class="chkAct" type="checkbox" id="chkAct-' + rData[0] + '" />';
                                }
                            } else {
                                return '<input class="chkAct" type="checkbox" id="chkAct-' + rData[0] + '" disabled/>';
                            }
                        } else {
                            return '';
                        }
                    }
                },
                {
                    name: 'btActBas', width: 80, label: "Editar Básico", sortable: false, align: 'center',
                    formatter: function (value, options, rData) {
                        if (rData[6] == "0" && rData[9] == "True") {
                            //debugger;
                            if (rData[2] == "Solicitudes") {
                                return '';
                            }
                            if (rData[1] == "True") {
                                if (value == "True") {
                                    return '<input class="chkActBas" type="checkbox" id="chkActBas-' + rData[0] + '" checked />';
                                } else {
                                    return '<input class="chkActBas" type="checkbox" id="chkActBas-' + rData[0] + '" />';
                                }
                            } else {
                                return '<input class="chkActBas" type="checkbox" id="chkActBas-' + rData[0] + '" disabled/>';
                            }
                        } else {
                            return '';
                        }
                        //return '';
                    }
                },
                { name: 'btEli', width: 80, label: "Eliminar", sortable: false, align: 'center',
                    formatter: function (value, options, rData) {
                        if (rData[6] == "0" && rData[9] == "True") {
                            if (rData[2] == "Solicitudes") {
                                return '';
                            }
                            if (rData[1] == "True") {
                                if (value == "True") {
                                    return '<input class="chkEli" type="checkbox" id="chkEli-' + rData[0] + '" checked />';
                                } else {
                                    return '<input class="chkEli" type="checkbox" id="chkEli-' + rData[0] + '" />';
                                }
                            } else {
                                return '<input class="chkEli" type="checkbox" id="chkEli-' + rData[0] + '" disabled/>';
                            }
                        } else {
                            return '';
                        }
                    }
                },
                { name: 'btExp', width: 80, label: "Exportar", sortable: false, align: 'center',
                    formatter: function (value, options, rData) {
                        if (rData[6] == "0" && rData[9] == "True") {
                            if (rData[2] == "Solicitudes") {
                                return '';
                            }
                            if (rData[1] == "True") {
                                if (value == "True") {
                                    return '<input class="chkExp" type="checkbox" id="chkExp-' + rData[0] + '" checked />';
                                } else {
                                    return '<input class="chkExp" type="checkbox" id="chkExp-' + rData[0] + '" />';
                                }
                            } else {
                                return '<input class="chkExp" type="checkbox" id="chkExp-' + rData[0] + '" disabled/>';
                            }
                        } else {
                            return '';
                        }
                    }
                },
                { name: 'btImp', width: 80, label: "Importar", hidden: true, sortable: false, align: 'center',
                    formatter: function (value, options, rData) {
                        if (rData[6] == "0" && rData[9] == "True") {
                            if (rData[2] == "Solicitudes") {
                                return '';
                            }
                            if (rData[1] == "True") {
                                if (value == "True") {
                                    return '<input class="chkImp" type="checkbox" id="chkImp-' + rData[0] + '" checked />';
                                } else {
                                    return '<input class="chkImp" type="checkbox" id="chkImp-' + rData[0] + '" />';
                                }
                            } else {
                                return '<input class="chkImp" type="checkbox" id="chkImp-' + rData[0] + '" disabled/>';
                            }
                        } else {
                            return '';
                        }
                    }
                }
                ],
            treeGridModel: 'adjacency',
            height: '100%',
            rowNum: 10000,
            treeGrid: true,
            ExpandColumn: 'Descripcion',
            ExpandColClick: true,
            width: 750, //750,
            shrinkToFit: false,
            loadComplete: function (data) {
                desactivarChekAccesos(data);
            },
            //onCellSelect: function (rowid, iCol, cellcontent, e) {
            //    //alert(rowid + ", " + iCol + ", " + cellcontent + ", " + e);
            //    var nmChk = '';
            //    if (iCol == 10) {
            //        nmChk = 'chkIns-' + rowid;
            //        //alert(!$(nmChk).is(":disabled"));
            //        if (!$(nmChk).is(":disabled")) {
            //            alert($(nmChk).is(":checked"));
            //            if ($(nmChk).is(":checked")) {
            //                $(nmChk).attr("checked", false);
            //            } else {
            //                $(nmChk).attr("checked", true);
            //            }
            //        }
            //    }
            //
            //},
            caption: "Accesos",
            gridComplete: function () {

                $("#gview_btTreeGridAccesos .ui-jqgrid-bdiv").css("overflow", "hidden");
            }
        });

        valChecksIdeterminate();

        function valChecksIdeterminate() {
            var vcIdProd = btTreeGridAccesos.getDataIDs();
            for (k = 0; k < vcIdProd.length; k++) {
                var cod = vcIdProd[k];
                var nivel = vcIdProd[k].split("-")[1];
                var rowCam = btTreeGridAccesos.getRowData(cod);
                if ($("#chk-" + cod).is(":checked") && rowCam.inNumNod != rowCam.inNumNodSelect) {
                    document.getElementById('chk-' + cod).indeterminate = true;
                }
                var rowCam = btTreeGridAccesos.getRowData(vcIdProd[k]);
            }

            var contadorAccesos = 0;
            activarAccesoDashMov = false;
            activarAccesoDashEmpl = false;
            activarAccesoConsultas = false;
            textDashMov = '';
            textDashEmpl = '';
            textConsumo = '';
            $.each($(".chkAcceso"), function () {
                var idRow = '';
                var rowSelected;
                if ($(this).is(":checked") || $(this)[0].indeterminate == true) {
                    contadorAccesos = contadorAccesos + 1;
                    idRow = $(this).attr("id").substring(4);
                    rowSelected = btTreeGridAccesos.getRowData(idRow);
                    var id = rowSelected.Codigo;
                    //Opcion
                    if (rowSelected.inNivel == 2) {
                        if (rowSelected.Codigo == 221) {
                            if ($(this).is(":checked")) {
                                activarAccesoDashMov = true;
                                textDashMov = rowSelected.Descripcion;
                            }
                            else {
                                activarAccesoDashMov = false;
                                textDashMov = '';
                            }
                        }
                        if (rowSelected.Descripcion == 'Dashboard Empleado') {
                            if ($(this).is(":checked")) {
                                activarAccesoDashEmpl = true;
                                textDashEmpl = rowSelected.Descripcion;
                            }
                            else {
                                activarAccesoDashEmpl = false;
                                textDashEmpl = '';
                            }
                        }
                        if (rowSelected.Codigo == 109) {
                            if ($(this).is(":checked")) {
                                activarAccesoConsultas = true;
                                textConsumo = rowSelected.Descripcion;
                            }
                            else {
                                activarAccesoConsultas = false;
                                textConsumo = '';
                            }
                        }
                    }
                }
            });


            $.each($(".chkAct"), function () {
                var idRow = '';
                var idCheck = '';
                if ($(this).is(":checked")) {
                    idRow = $(this).attr("id").substring(7);
                    idCheck = '#chkActBas-' + idRow;
                    $(idCheck).prop('disabled', true);
                }
            });

            $.each($(".chkActBas"), function () {
                var idRow = '';
                var idCheck = '';
                if ($(this).is(":checked")) {
                    idRow = $(this).attr("id").substring(10);
                    idCheck = '#chkAct-' + idRow;
                    $(idCheck).prop('disabled', true);
                }
            });


            fnActualizarSeccionTipoLinea();
        }

        $(".chkAct").live("click", function () {
            let idRow = '';
            let idChk2 = '';
            let idChk = $(this).attr("id");
            idRow = idChk.substring(7);
            idChk2 = 'chkActBas-' + idRow;

            $("#" + idChk2).attr("checked", false);
            if ($(this).is(":checked")) {
                $("#" + idChk2).prop('disabled', true);
            }
            else {
                $("#" + idChk2).prop('disabled', false);
            }
        });

        $(".chkActBas").live("click", function () {
            let idRow = '';
            let idChk2 = '';
            let idChk = $(this).attr("id");
            idRow = idChk.substring(10);
            idChk2 = 'chkAct-' + idRow;

            $("#" + idChk2).attr("checked", false);
            if ($(this).is(":checked")) {
                $("#" + idChk2).prop('disabled', true);
            }
            else {
                $("#" + idChk2).prop('disabled', false);
            }
        });

        //checked = 1, nocheck = 2, indetermiante = 3
        $(".chkAcceso").live("click", function () {
            var estActual;
            activarAccesoDashMov = false;
            activarAccesoDashEmpl = false;
            activarAccesoConsultas = false;
            textDashMov = '';
            textDashEmpl = '';
            textConsumo = '';

            if ($(this)[0].indeterminate == true) {
                estActual = "3";
            } else if ($(this).is(":checked")) {
                estActual = "1";
            } else {
                estActual = "2";
            }
            $(this).attr("estActual", estActual);

            if ($(this).attr("estActual") == $(this).attr("estAnterior")) {
                return;
            }

            var idChk = $(this).attr("id");
            $(this).attr("disabled", "disabled");
            var cod = idChk.substring(4);
            var rowCamThis = btTreeGridAccesos.getRowData(cod);
            //opciones extras
            if (rowCamThis.inNumNod == "0" && rowCamThis.esAdmLista == "True") {
                if ($(this).is(":checked")) {
                    $("#chkIns-" + cod).removeAttr("disabled");
                    $("#chkAct-" + cod).removeAttr("disabled");
                    $("#chkActBas-" + cod).removeAttr("disabled");
                    $("#chkEli-" + cod).removeAttr("disabled");
                    $("#chkExp-" + cod).removeAttr("disabled");
                    $("#chkImp-" + cod).removeAttr("disabled");
                } else {
                    $("#chkIns-" + cod).removeAttr("checked");
                    $("#chkAct-" + cod).removeAttr("checked");
                    $("#chkActBas-" + cod).removeAttr("checked");
                    $("#chkEli-" + cod).removeAttr("checked");
                    $("#chkExp-" + cod).removeAttr("checked");
                    $("#chkImp-" + cod).removeAttr("checked");
                    $("#chkIns-" + cod).attr("disabled", "disabled");
                    $("#chkAct-" + cod).attr("disabled", "disabled");
                    $("#chkActBas-" + cod).attr("disabled", "disabled");
                    $("#chkEli-" + cod).attr("disabled", "disabled");
                    $("#chkExp-" + cod).attr("disabled", "disabled");
                    $("#chkImp-" + cod).attr("disabled", "disabled");
                }
            }

            var Codigo = rowCamThis.Codigo;
            var Nivel = rowCamThis.inNivel;
            var toIndeterminate = false;

            //Configurar chkeck de padre
            if (parseInt(rowCamThis.inNivel) > 0) {
                var CodigoPadre = rowCamThis.inPadre.toString();
                var RowPadre;
                var inNumNodSelect;
                var checkCambio = Codigo;
                var estInicialCheck = 0; //1 = check, 2 = uncheck, 3 = indeterminate
                var i;
                for (i = Nivel; i > 0; i--) {
                    var nivelPadre = parseInt(i) - 1;
                    CodigoRowPadre = nivelPadre.toString() + "-" + CodigoPadre;
                    RowPadre = btTreeGridAccesos.getRowData(CodigoRowPadre);
                    inNumNodSelect = parseInt(RowPadre.inNumNodSelect);
                    if ($('#chk-' + i + '-' + checkCambio)[0].indeterminate == true) {
                        if (estInicialCheck == "2" || estInicialCheck == "0") {
                            inNumNodSelect = inNumNodSelect + 1;
                            btTreeGridAccesos.jqGrid('setCell', CodigoRowPadre, 'inNumNodSelect', inNumNodSelect.toString());
                            estInicialCheck = "3";
                        }
                    } else if ($("#chk-" + i + "-" + checkCambio).is(":checked")) { //activar -> aumentar numero de nodos seleccionados
                        if (estInicialCheck == "2" || estInicialCheck == "0") {
                            inNumNodSelect = inNumNodSelect + 1;
                            btTreeGridAccesos.jqGrid('setCell', CodigoRowPadre, 'inNumNodSelect', inNumNodSelect.toString());
                        }
                    } else {
                        inNumNodSelect = inNumNodSelect - 1;
                        btTreeGridAccesos.jqGrid('setCell', CodigoRowPadre, 'inNumNodSelect', inNumNodSelect.toString());
                    }
                    //estado inicial del check padre
                    if ($("#chk-" + CodigoRowPadre)[0].indeterminate == true) {
                        estInicialCheck = "3";
                    } else if ($("#chk-" + CodigoRowPadre).is(":checked")) {
                        estInicialCheck = "1";
                    } else {
                        estInicialCheck = "2";
                    }
                    //actualizar check padre
                    if (toIndeterminate) {
                        document.getElementById('chk-' + CodigoRowPadre).indeterminate = true;
                        toIndeterminate = true;
                    } else {
                        if (inNumNodSelect == 0) {
                            document.getElementById('chk-' + CodigoRowPadre).indeterminate = false;
                            $("#chk-" + CodigoRowPadre).removeAttr("checked");
                            $("#chk-" + CodigoRowPadre).attr("estAnterior", "2");
                        } else if (RowPadre.inNumNod == inNumNodSelect) {
                            document.getElementById('chk-' + CodigoRowPadre).indeterminate = false;
                            $("#chk-" + CodigoRowPadre).attr("checked", "checked");
                            $("#chk-" + CodigoRowPadre).attr("estAnterior", "1");
                        } else {
                            document.getElementById('chk-' + CodigoRowPadre).indeterminate = true;
                            $("#chk-" + CodigoRowPadre).attr("estAnterior", "3");
                            toIndeterminate = true;
                        }
                    }
                    checkCambio = RowPadre.Codigo.toString();
                    CodigoPadre = RowPadre.inPadre.toString();
                }
            }
            //Configuarar checks hijos
            if (parseInt(rowCamThis.inNumNod) > 0) {
                var lstCodHijos = rowCamThis.lstCodNod.split(",");
                var NivelHijos = parseInt(Nivel) + 1;
                var CodHijo1;
                var lstCodHijos1;
                var NivelHijos1;
                var rowDataHijo1;
                var CodHijo2;
                var lstCodHijos2;
                var NivelHijos2;
                var rowDataHijo2;
                var CodHijo3;
                if ($(this).is(":checked")) { //activar todos los checks hijos
                    btTreeGridAccesos.jqGrid('setCell', cod, 'inNumNodSelect', rowCamThis.inNumNod);
                    var i = 0;
                    for (i = 0; i < $(lstCodHijos).length; i++) {
                        CodHijo1 = NivelHijos.toString() + "-" + lstCodHijos[i].toString();
                        document.getElementById('chk-' + CodHijo1).indeterminate = false;
                        $("#chk-" + CodHijo1).attr("checked", "checked");
                        $("#chk-" + CodHijo1).attr("estAnterior", "1");
                        //---
                        $("#chkIns-" + CodHijo1).removeAttr("disabled");
                        $("#chkAct-" + CodHijo1).removeAttr("disabled");
                        $("#chkActBas-" + CodHijo1).removeAttr("disabled");
                        $("#chkEli-" + CodHijo1).removeAttr("disabled");
                        $("#chkExp-" + CodHijo1).removeAttr("disabled");
                        $("#chkImp-" + CodHijo1).removeAttr("disabled");
                        //activarCheckOpciones(CodHijo1);

                        rowDataHijo1 = btTreeGridAccesos.getRowData(CodHijo1);
                        if (parseInt(rowDataHijo1.inNumNod) > 0) {
                            lstCodHijos1 = rowDataHijo1.lstCodNod.split(",");
                            NivelHijos1 = parseInt(NivelHijos) + 1;
                            btTreeGridAccesos.jqGrid('setCell', CodHijo1, 'inNumNodSelect', rowDataHijo1.inNumNod);
                            var j;
                            for (j = 0; j < $(lstCodHijos1).length; j++) {
                                CodHijo2 = NivelHijos1.toString() + "-" + lstCodHijos1[j].toString();
                                document.getElementById('chk-' + CodHijo2).indeterminate = false;
                                $("#chk-" + CodHijo2).attr("checked", "checked");
                                $("#chk-" + CodHijo2).attr("estAnterior", "1");
                                //-------------
                                $("#chkIns-" + CodHijo2).removeAttr("disabled");
                                $("#chkAct-" + CodHijo2).removeAttr("disabled");
                                $("#chkActBas-" + CodHijo2).removeAttr("disabled");
                                $("#chkEli-" + CodHijo2).removeAttr("disabled");
                                $("#chkExp-" + CodHijo2).removeAttr("disabled");
                                $("#chkImp-" + CodHijo2).removeAttr("disabled");
                                //activarCheckOpciones(CodHijo2);

                                rowDataHijo2 = btTreeGridAccesos.getRowData(CodHijo2);
                                if (parseInt(rowDataHijo2.inNumNod) > 0) {
                                    lstCodHijos2 = rowDataHijo2.lstCodNod.split(",");
                                    NivelHijos2 = parseInt(NivelHijos1) + 1;
                                    btTreeGridAccesos.jqGrid('setCell', CodHijo2, 'inNumNodSelect', rowDataHijo2.inNumNod);
                                    var k;
                                    for (k = 0; k < $(lstCodHijos2).length; k++) {
                                        CodHijo3 = NivelHijos2.toString() + "-" + lstCodHijos2[k].toString();
                                        document.getElementById('chk-' + CodHijo3).indeterminate = false;
                                        $("#chk-" + CodHijo3).attr("checked", "checked");
                                        $("#chk-" + CodHijo3).attr("estAnterior", "1");
                                        //----
                                        $("#chkIns-" + CodHijo3).removeAttr("disabled");
                                        $("#chkAct-" + CodHijo3).removeAttr("disabled");
                                        $("#chkActBas-" + CodHijo3).removeAttr("disabled");
                                        $("#chkEli-" + CodHijo3).removeAttr("disabled");
                                        $("#chkExp-" + CodHijo3).removeAttr("disabled");
                                        $("#chkImp-" + CodHijo3).removeAttr("disabled");
                                        //activarCheckOpciones(CodHijo3);
                                    }
                                }
                            }
                        }
                    }
                } else {
                    btTreeGridAccesos.jqGrid('setCell', cod, 'inNumNodSelect', 0);
                    var i;
                    for (i = 0; i < $(lstCodHijos).length; i++) {
                        CodHijo1 = NivelHijos.toString() + "-" + lstCodHijos[i].toString();
                        document.getElementById('chk-' + CodHijo1).indeterminate = false;
                        $("#chk-" + CodHijo1).removeAttr("checked");
                        $("#chk-" + CodHijo1).attr("estAnterior", "2");
                        //--
                        $("#chkIns-" + CodHijo1).removeAttr("checked");
                        $("#chkAct-" + CodHijo1).removeAttr("checked");
                        $("#chkActBas-" + CodHijo1).removeAttr("checked");
                        $("#chkEli-" + CodHijo1).removeAttr("checked");
                        $("#chkExp-" + CodHijo1).removeAttr("checked");
                        $("#chkImp-" + CodHijo1).removeAttr("checked");
                        $("#chkIns-" + CodHijo1).attr("disabled", "disabled");
                        $("#chkAct-" + CodHijo1).attr("disabled", "disabled");
                        $("#chkActBas-" + CodHijo1).attr("disabled", "disabled");
                        $("#chkEli-" + CodHijo1).attr("disabled", "disabled");
                        $("#chkExp-" + CodHijo1).attr("disabled", "disabled");
                        $("#chkImp-" + CodHijo1).attr("disabled", "disabled");
                        //desactivarCheckOpciones(CodHijo1);

                        rowDataHijo1 = btTreeGridAccesos.getRowData(CodHijo1);
                        if (parseInt(rowDataHijo1.inNumNod) > 0) {
                            lstCodHijos1 = rowDataHijo1.lstCodNod.split(",");
                            NivelHijos1 = parseInt(NivelHijos) + 1;
                            btTreeGridAccesos.jqGrid('setCell', CodHijo1, 'inNumNodSelect', 0);
                            var j = 0;
                            for (j = 0; j < $(lstCodHijos1).length; j++) {
                                CodHijo2 = NivelHijos1.toString() + "-" + lstCodHijos1[j].toString();
                                document.getElementById('chk-' + CodHijo2).indeterminate = false;
                                $("#chk-" + CodHijo2).removeAttr("checked");
                                $("#chk-" + CodHijo2).attr("estAnterior", "2");
                                //--
                                $("#chkIns-" + CodHijo2).removeAttr("checked");
                                $("#chkAct-" + CodHijo2).removeAttr("checked");
                                $("#chkActBas-" + CodHijo2).removeAttr("checked");
                                $("#chkEli-" + CodHijo2).removeAttr("checked");
                                $("#chkExp-" + CodHijo2).removeAttr("checked");
                                $("#chkImp-" + CodHijo2).removeAttr("checked");
                                $("#chkIns-" + CodHijo2).attr("disabled", "disabled");
                                $("#chkAct-" + CodHijo2).attr("disabled", "disabled");
                                $("#chkActBas-" + CodHijo2).attr("disabled", "disabled");
                                $("#chkEli-" + CodHijo2).attr("disabled", "disabled");
                                $("#chkExp-" + CodHijo2).attr("disabled", "disabled");
                                $("#chkImp-" + CodHijo2).attr("disabled", "disabled");
                                //desactivarCheckOpciones(CodHijo2);

                                rowDataHijo2 = btTreeGridAccesos.getRowData(CodHijo2);
                                if (parseInt(rowDataHijo2.inNumNod) > 0) {
                                    lstCodHijos2 = rowDataHijo2.lstCodNod.split(",");
                                    NivelHijos2 = parseInt(NivelHijos1) + 1;
                                    btTreeGridAccesos.jqGrid('setCell', CodHijo2, 'inNumNodSelect', 0);
                                    var k = 0;
                                    for (k = 0; k < $(lstCodHijos2).length; k++) {
                                        CodHijo3 = NivelHijos2.toString() + "-" + lstCodHijos2[k].toString();
                                        document.getElementById('chk-' + CodHijo3).indeterminate = false;
                                        $("#chk-" + CodHijo3).removeAttr("checked");
                                        $("#chk-" + CodHijo3).attr("estAnterior", "2");
                                        //--
                                        $("#chkIns-" + CodHijo3).removeAttr("checked");
                                        $("#chkAct-" + CodHijo3).removeAttr("checked");
                                        $("#chkActBas-" + CodHijo3).removeAttr("checked");
                                        $("#chkEli-" + CodHijo3).removeAttr("checked");
                                        $("#chkExp-" + CodHijo3).removeAttr("checked");
                                        $("#chkImp-" + CodHijo3).removeAttr("checked");
                                        $("#chkIns-" + CodHijo3).attr("disabled", "disabled");
                                        $("#chkAct-" + CodHijo3).attr("disabled", "disabled");
                                        $("#chkActBas-" + CodHijo3).attr("disabled", "disabled");
                                        $("#chkEli-" + CodHijo3).attr("disabled", "disabled");
                                        $("#chkExp-" + CodHijo3).attr("disabled", "disabled");
                                        $("#chkImp-" + CodHijo3).attr("disabled", "disabled");
                                        //desactivarCheckOpciones(CodHijo3);
                                    }
                                }
                            }
                        }
                    }
                }
            }
            $(this).removeAttr("disabled");
            $(this).attr("estAnterior", $(this).attr("estActual"));

            var contadorAccesos = 0;
            $.each($(".chkAcceso"), function () {
                var idRow = '';
                var rowSelected;
                if ($(this).is(":checked") || $(this)[0].indeterminate == true) {
                    contadorAccesos = contadorAccesos + 1;
                    idRow = $(this).attr("id").substring(4);
                    rowSelected = btTreeGridAccesos.getRowData(idRow);
                    var id = rowSelected.Codigo;
                    //Opcion
                    if (rowSelected.inNivel == 2) {
                        if (rowSelected.Codigo == 221) {
                            if ($(this).is(":checked")) {
                                activarAccesoDashMov = true;
                                textDashMov = rowSelected.Descripcion;
                            }
                            else {
                                activarAccesoDashMov = false;
                                textDashMov = '';
                            }
                        }
                        if (rowSelected.Descripcion == 'Dashboard Empleado') {
                            if ($(this).is(":checked")) {
                                activarAccesoDashEmpl = true;
                                textDashEmpl = rowSelected.Descripcion;
                            }
                            else {
                                activarAccesoDashEmpl = false;
                                textDashEmpl = '';
                            }
                        }
                        if (rowSelected.Codigo == 109) {
                            if ($(this).is(":checked")) {
                                activarAccesoConsultas = true;
                                textConsumo = rowSelected.Descripcion;
                            }
                            else {
                                activarAccesoConsultas = false;
                                textConsumo = '';
                            }
                        }

                    }
                }
            });

            fnActualizarSeccionTipoLinea();
        });

        //        var xslstProductos = '{    "total": "1",    "page": "1",    "records": "2",    "rows": [           {"id": "1", "cell":  ["1",  "Super Item0",     "300", "0", "",  "false", "false", "true"]},           {"id": "2", "cell":  ["2",  "Item 1",         "100", "1", "1", "false", "false", "true"]}]}  ';

        //        $("#tree").jqGrid({
        //            datatype: 'jsonstring',
        //            datastr: xslstProductos,
        //            colNames: ["ID", 'Description', "Total"],
        //            colModel: [
        //                    { name: 'id', index: 'id', width: 1, hidden: true, key: true },
        //                    { name: 'desc', width: 180, sortable: false },
        //                    { name: 'num', width: 80, sortable: false, align: 'center' }
        //                ],
        //            treeGridModel: 'adjacency',
        //            height: 'auto',
        //            rowNum: 10000,
        //            treeGrid: true,
        //            ExpandColumn: 'desc',
        //            ExpandColClick: true,
        //            caption: "TreeGrid Test"
        //        });



        //        btTreeGridAccesos = $("#btTreeGridAccesos").jqGrid({
        //            datastr: slstProductos,
        //            datatype: 'jsonstring',
        //            mtype: 'GET',
        //            colNames: ["OrdenGrilla", 'Description', "Acceso"],
        //            colModel: [
        //                    { name: 'id', index: 'id', width: 1, hidden: true, key: true },
        //                    { name: 'desc', width: 180, sortable: false },
        //                    { name: 'num', width: 80, sortable: false, align: 'center' }
        //                ],
        //            treeGridModel: 'adjacency',
        //            height: 'auto',
        //            rowNum: 10000,
        //            treeGrid: true,
        //            ExpandColumn: 'desc',
        //            ExpandColClick: true,
        //            caption: "TreeGrid Test"
        //        });

        //tabla accesos
        //tbAccesos = $("#tbAccesos").jqGrid({
        //    sortable: false,
        //    datatype: "local",
        //    colModel: [{ name: 'OrdenGrilla', Campo: 'OrdenGrilla', label: 'OrdenGrilla', hidden: false, width: 50 },
        //                { name: 'inNivel', index: 'inNivel', label: 'Nivel', hidden: false, width: 50 },
        //                { name: 'inPader', index: 'inPader', label: 'CodPadre', hidden: false, width: 50 },
        //                { name: 'Codigo', index: 'Codigo', label: 'Código', hidden: false, width: 50 },
        //                { name: 'IsSelected', index: 'IsSelected', label: 'Acceso', hidden: false, width: 50,
        //                    formatter: function (value, options, rData) {
        //                        if (value == true) {
        //                            return '<input id="chk-' + rData.OrdenGrilla + '" type="checkbox" checked="checked" />';
        //                        } else {
        //                            return '<input id="chk-' + rData.OrdenGrilla + '" type="checkbox" />';
        //                        }
        //                    }, align: "center"
        //                },
        //                { name: 'Descripcion', index: 'Descripcion', label: 'Descripción', hidden: false, width: 100 },
        //                { name: 'btIns', index: 'btIns', label: 'Nuevo', hidden: false, width: 50,
        //                    formatter: function (value, options, rData) {
        //                        if (value == true) {
        //                            return '<input id="chk-' + rData.OrdenGrilla + '" type="checkbox" checked="checked" />';
        //                        } else {
        //                            return '<input id="chk-' + rData.OrdenGrilla + '" type="checkbox" />';
        //                        }
        //                    }, align: "center"
        //                },
        //                { name: 'btAct', index: 'btAct', label: 'Editar', hidden: false, width: 50,
        //                    formatter: function (value, options, rData) {
        //                        if (value == true) {
        //                            return '<input id="chk-' + rData.OrdenGrilla + '" type="checkbox" checked="checked" />';
        //                        } else {
        //                            return '<input id="chk-' + rData.OrdenGrilla + '" type="checkbox" />';
        //                        }
        //                    }, align: "center"
        //                },
        //                { name: 'btEli', index: 'btEli', label: 'Eliminar', hidden: false, width: 50,
        //                    formatter: function (value, options, rData) {
        //                        if (value == true) {
        //                            return '<input id="chk-' + rData.OrdenGrilla + '" type="checkbox" checked="checked" />';
        //                        } else {
        //                            return '<input id="chk-' + rData.OrdenGrilla + '" type="checkbox" />';
        //                        }
        //                    }, align: "center"
        //                },
        //                { name: 'btExp', index: 'btExp', label: 'Exportar', hidden: false, width: 50,
        //                    formatter: function (value, options, rData) {
        //                        if (value == true) {
        //                            return '<input id="chk-' + rData.OrdenGrilla + '" type="checkbox" checked="checked" />';
        //                        } else {
        //                            return '<input id="chk-' + rData.OrdenGrilla + '" type="checkbox" />';
        //                        }
        //                    }, align: "center"
        //                },
        //                { name: 'btImp', index: 'btImp', label: 'Importar', hidden: false, width: 50,
        //                    formatter: function (value, options, rData) {
        //                        if (value == true) {
        //                            return '<input id="chk-' + rData.OrdenGrilla + '" type="checkbox" checked="checked" />';
        //                        } else {
        //                            return '<input id="chk-' + rData.OrdenGrilla + '" type="checkbox" />';
        //                        }
        //                    }, align: "center"
        //                },
        //                { name: 'inNumNod', index: 'inNumNod', label: 'NumChild', hidden: false, width: 30 }
        //    ],
        //    pager: "#dvAccesosPager",
        //    loadtext: 'Cargando accesos...',
        //    emptyrecords: 'Error al mostrar los módulos',
        //    //pgtext: 'Pág: {0} de {1}', //Paging input control text format.
        //    //rowNum: "10", // PageSize.
        //    //rowList: [10, 20, 30], //Variable PageSize DropDownList. 
        //    //viewrecords: true, //Show the RecordCount in the pager.
        //    multiselect: false,
        //    //sortname: "vcNom", //sortname: idTabla, //Default SortColumn
        //    //sortorder: "asc", //Default SortOrder.
        //    width: 710,
        //    height: "auto",
        //    rownumbers: true,
        //    shrinkToFit: false,
        //    caption: "Accesos"
        //});

        //tabla usuarios
        tbUsuarios = $("#tbUsuarios").jqGrid({
            sortable: true,
            datatype: CargarGrillaUsuarios,
            colModel: [{ name: 'IdUsuario', Campo: 'IdUsuario', label: 'Código', hidden: false, width: 150 },
                        { name: 'vcNom', index: 'vcNom', label: 'Nombre', hidden: false, width: 400 },
                        { name: 'vcUsu', index: 'vcUsu', label: 'Usuario', hidden: true, width: 100 },
                        { name: 'Correo', index: 'Correo', label: 'Correo', hidden: true, width: 100 }
        ],
            jsonReader: {
                root: "Items",
                page: "PaginaActual",
                total: "TotalPaginas",
                records: "TotalRegistros",
                repeatitems: true,
                cell: "Row",
                id: "ID"
            },
            pager: "#tbUsuarioPager",
            loadtext: 'Cargando usuarios...',
            emptyrecords: 'No hay usuarios', //'No hay usuarios en en perfil',
            pgtext: 'Pág: {0} de {1}', //Paging input control text format.
            rowNum: "10", // PageSize.
            rowList: [10, 20, 30], //Variable PageSize DropDownList. 
            viewrecords: true, //Show the RecordCount in the pager.
            multiselect: false,
            sortname: "vcNom", //sortname: idTabla, //Default SortColumn
            sortorder: "asc", //Default SortOrder.
            width: 710,
            height: "auto",
            rownumbers: true,
            shrinkToFit: false,
            caption: "Usuarios"
        });
    }

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

    $(".accordion").accordion({
        collapsible: true,
        autoHeight: false
    });

    //$("#contenedorDash").hide();
    //$('.accordion').accordion().children('b:eq(index), div:eq(index)').hide();

    $("#contenedorDash").prev().hide();
    $("#contenedorDash").hide();


    // ===========================================================================================================================
    // GUARDAR
    // ===========================================================================================================================
    $("#btnGuardar").live("click", function () {
        //alert($("#hdf_idHoras").val());
        BloquearPagina(true);
        //var rootNode = $("#divTree").dynatree("getRoot");
        //var nodosSelecionados = rootNode.tree.getSelectedNodes().join(",");
        //nodosSelecionados = nodosSelecionados.replace(/'/g, "");

        //agregado usuarios 19-08-2013
        //var rootNodeUsu = $("#divTreeUsuarios").dynatree("getRoot");
        //var nodosSeleccionadosUsu = rootNodeUsu.tree.getSelectedNodes().join(",");
        //nodosSeleccionadosUsu = nodosSeleccionadosUsu.replace(/'/g, "");

        ///-----nuevos usuarios
        //var arUsuariosSeleccionados = [];
        //$("#lstSeleccionados option").each(function () {
        //    arUsuariosSeleccionados.push($(this).val());
        //});
        //var nodosSeleccionadosUsu = arUsuariosSeleccionados.join(",");
        //nodosSeleccionadosUsu = nodosSeleccionadosUsu.replace(/'/g, "");
        //------fin nuevos usuarios

        var Seg_Perfil = new seg_perfil();

        if ($("#hdfCodigo").val() == "") {
            Seg_Perfil.P_inCod = "-1";
        }
        else {
            Seg_Perfil.P_inCod = $("#hdfCodigo").val();
        }

        Seg_Perfil.vcNom = $("#txtNombre").val().replace(/\\/g, "");
        Seg_Perfil.vcNom = $.trim(Seg_Perfil.vcNom.replace(/'/g, ""));
        Seg_Perfil.inCodTip_DashMovil = $("#ddlDashMovil").val();
        Seg_Perfil.inCodTip_DashEmpl = $("#ddlDashEmpleado").val();
        Seg_Perfil.inCodTip_Consumo = $("#ddlConsumo").val();
        Seg_Perfil.inCodTip_General = $("#ddlTipoGeneral").val();
        // ========================================================================================
        // MODULO DE SEGURIDAD 
        // ========================================================================================
        Seg_Perfil.vcHoras = $("#hdf_idHoras").val();
        // ========================================================================================
        // ========================================================================================
        if (Seg_Perfil.vcNom == "") {
            alerta("El nombre del Perfil es un campo obligatorio");
            $("#txtNombre").val('');
            BloquearPagina(false);
            $("#txtNombre").focus();
            return;
        }

        var oSeg_Perfil = JSON.stringify(Seg_Perfil);

        //NUEVO GUARDAR
        var XML_Producto = "<?xml version=\"1.0\" encoding=\"iso-8859-1\"?><TABLE>";
        var XML_Modulo = "<?xml version=\"1.0\" encoding=\"iso-8859-1\"?><TABLE>";
        var XML_Opcion = "<?xml version=\"1.0\" encoding=\"iso-8859-1\"?><TABLE>";
        var XML_Item = "<?xml version=\"1.0\" encoding=\"iso-8859-1\"?><TABLE>";
        //XML_Formato_Producto = "<PRODUCTO><ID>{0}</ID></PRODUCTO>";
        //XML_Formato_Modulo = "<MODULO><ID>{0}</ID></MODULO>";
        //XML_Formato_Opcion = "<OPCION><ID>{0}</ID></OPCION>";
        //XML_Formato_Item = "<ITEM><ID>{0}</ID></ITEM>";

        var contadorAccesos = 0;
        $.each($(".chkAcceso"), function () {
            var idRow = '';
            var rowSelected;
            if ($(this).is(":checked") || $(this)[0].indeterminate == true) { //<<<
                contadorAccesos = contadorAccesos + 1;
                idRow = $(this).attr("id").substring(4);
                rowSelected = btTreeGridAccesos.getRowData(idRow);
                var idPer = $("#hdfCodigo").val();
                var id = rowSelected.Codigo;
                var chkIns = 0, chkAct = 0, chkActBas = 0, chkEli = 0, chkExp = 0, chkImp = 0;
                if (rowSelected.esAdmLista == "True" && rowSelected.inNumNod == "0") {
                    chkIns = ($("#chkIns-" + idRow).is(":checked")) ? 1 : 0;
                    chkAct = ($("#chkAct-" + idRow).is(":checked")) ? 1 : 0;
                    chkActBas = ($("#chkActBas-" + idRow).is(":checked")) ? 1 : 0;
                    chkEli = ($("#chkEli-" + idRow).is(":checked")) ? 1 : 0;
                    chkExp = ($("#chkExp-" + idRow).is(":checked")) ? 1 : 0;
                    chkImp = ($("#chkImp-" + idRow).is(":checked")) ? 1 : 0;
                }

                //Productos
                if (rowSelected.inNivel == 0) {
                    XML_Producto += '<PRODUCTO F_inPer=\"' + idPer + '\" F_inProd=\"' + id + '\" btIns=\"' + chkIns + '\" btAct=\"' + chkAct + '\" btActBas=\"' + chkActBas;
                    XML_Producto += '\" btEli=\"' + chkEli + '\" btExp=\"' + chkExp + '\" btImp=\"' + chkImp + '"\/>';
                }
                //Modulo
                if (rowSelected.inNivel == 1) {
                    XML_Modulo += '<MODULO F_inPer=\"' + idPer + '\" F_inMod=\"' + id + '\" btIns=\"' + chkIns + '\" btAct=\"' + chkAct + '\" btActBas=\"' + chkActBas;
                    XML_Modulo += '\" btEli=\"' + chkEli + '\" btExp=\"' + chkExp + '\" btImp=\"' + chkImp + '"\/>';
                }
                //Opcion
                if (rowSelected.inNivel == 2) {
                    XML_Opcion += '<OPCION F_inPer=\"' + idPer + '\" F_inOpc=\"' + id + '\" btIns=\"' + chkIns + '\" btAct=\"' + chkAct + '\" btActBas=\"' + chkActBas;
                    XML_Opcion += '\" btEli=\"' + chkEli + '\" btExp=\"' + chkExp + '\" btImp=\"' + chkImp + '"\/>';
                }
                //Item
                if (rowSelected.inNivel == 3) {
                    XML_Item += '<ITEM F_inPer=\"' + idPer + '\" F_inIte=\"' + id + '\" btIns=\"' + chkIns + '\" btAct=\"' + chkAct + '\" btActBas=\"' + chkActBas;
                    XML_Item += '\" btEli=\"' + chkEli + '\" btExp=\"' + chkExp + '\" btImp=\"' + chkImp + '"\/>';
                }
            }
        });

        XML_Producto += "</TABLE>";
        XML_Modulo += "</TABLE>";
        XML_Opcion += "</TABLE>";
        XML_Item += "</TABLE>";

        //$.ajax({
        //    type: "POST",
        //    url: "Mnt_Perfil.aspx/Guardar",
        //    data: "{'oPerfil': '" + oSeg_Perfil + "','pNodosSeleccionados': '" + nodosSelecionados + "' }",
        //    //"','pNodosSeleccionadosUsu':'" + nodosSeleccionadosUsu + "'}",
        //    contentType: "application/json; charset=utf-8",
        //    dataType: "json",
        //    success: function (result) {
        //        if (result.d == "1") {
        //
        //            window.parent.ActualizarGrilla();
        //            Mensaje("<br/><h1>Perfil guardado</h1><br/><h2>" + Seg_Perfil.vcNom + "</h2>", document, CerroMensaje);
        //
        //
        //        } else {
        //            alerta("El Nombre del Perfil ya ha sido Registrado Anteriormente, no se pudo Grabar el Registro");
        //            BloquearPagina(false);
        //        }
        //        //window.parent.ActualizarGrilla();
        //        //Mensaje("<br/><h1>Perfil guardado</h1><br/><h2>" + Seg_Perfil.vcNom + "</h2>", document, CerroMensaje);
        //    },
        //    error: function (xhr, err, thrErr) {
        //        MostrarErrorAjax(xhr, err, thrErr);
        //        BloquearPagina(false);
        //    }
        //});

        if (contadorAccesos == 0) {
            alerta("Debe seleccionar por lo menos un acceso");
            BloquearPagina(false);
            return;
        }

        var MiIdTemporizador;

        if ($("#chkActivarTemporizador").prop("checked")) {
            MiIdTemporizador = $("#ddlTemporizador").val();
        }
        else {
            MiIdTemporizador = -1;
        }

        $.ajax({
            type: "POST",
            url: "Mnt_Perfil.aspx/GuardarTodo",
            data: "{'oPerfil': '" + oSeg_Perfil + "'," +
                    "'XML_Producto': '" + XML_Producto + "'," +
                    "'XML_Modulo': '" + XML_Modulo + "'," +
                    "'XML_Opcion': '" + XML_Opcion + "'," +
                    "'XML_Item':'" + XML_Item + "'," +
                    "'prIdTemporizador':'" + MiIdTemporizador + "' }",
            //"','pNodosSeleccionadosUsu':'" + nodosSeleccionadosUsu + "'}",

            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                if (result.d != "0") {
                    window.parent.ActualizarGrilla();
                    esNuevo = ($("#hdfCodigo").val() == '') ? true : false;
                    Mensaje("<br/><h1>Perfil guardado</h1><br/><h2>" + Seg_Perfil.vcNom + "</h2>", document, CerroMensaje);

                    $("#hdfCodigo").val(result.d);
                } else {
                    alerta("El Nombre del Perfil ya ha sido Registrado Anteriormente, no se pudo Grabar el Registro");
                    BloquearPagina(false);
                }
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
                BloquearPagina(false);
            }
        });
    });

    var esNuevo;
    function CerroMensaje() {
        BloquearPagina(false);
        //if ($("#hdfCodigo").val() == "") {
        //$("#txtNombre").val("");
        //$("#txtNombre").focus();
        if (esNuevo) {
            $("#AcordionUsuarios").show();
            $("#AccordionJQ1").accordion("option", "active", 1);
            $("#tbAgregarUsuarios").show();
            $("#dvMensajeUsuarios").hide();
        } else {
            window.parent.tab.tabs("remove", indiceTab);
        }
    }

    $("#btnCerrar").live("click", function () {
        window.parent.tab.tabs("remove", window.parent.tab.tabs("option", "selected"));
    });

    ///nuevo 01-02-2014
    //$('#txtBusqueda').live("keydown", function (e) {
    //    if (e.keyCode == 13) {
    //        $("#btnBuscar").click();
    //        return false;
    //    };
    //});
    //
    //$("#btnBuscar").click(function () {
    //    if ($("#txtBusqueda").val() == "") {
    //        alerta("Ingrese un valor a buscar");
    //        $("#txtBusqueda").focus();
    //        return;
    //    };
    //    if (($("#txtBusqueda").val()).indexOf("'") != -1) {
    //        alerta("No se permiten apóstrofes.");
    //        return;
    //    };
    //    //CargarDetalle(1);
    //    CargarUsuariosFiltro();
    //});

    //$("#btnDerecha").click(function () {
    //    if ($("#lstResultado option:selected").length > 0) {
    //        if ($("#lstResultado option:selected").length > 400) {
    //            if (confirm('La cantidad seleccionada es muy grande. ¿Desea continuar con el proceso? Esta acción bajará el performance de su equipo.')) {
    //                AgregaItems("#lstResultado option:selected");
    //            }
    //        }
    //        else {
    //            AgregaItems("#lstResultado option:selected");
    //        }
    //    }
    //    else {
    //        alerta("Seleccione un ítem");
    //    }
    //});
    //$("#btnIzquierda").click(function () {
    //    if ($("#lstSeleccionados option:selected").length > 0) {
    //        $("#lstSeleccionados option:selected").remove();
    //    }
    //    else {
    //        alerta("Seleccione un ítem");
    //    }
    //});
    //$("#btnDerechaTodo").click(function () {
    //    if ($("#lstResultado option").length > 0) {
    //        if ($("#lstResultado option").length > 400) {
    //            if (confirm('La cantidad seleccionada es muy grande. ¿Desea continuar con el proceso? Esta acción bajará el performance de su equipo.')) {
    //                AgregaItems("#lstResultado option");
    //            }
    //        }
    //        else {
    //            AgregaItems("#lstResultado option");
    //        }
    //    }
    //    else {
    //        alerta("No hay datos disponibles");
    //    }
    //});
    //$("#btnIzquierdaTodo").click(function () {
    //    if ($("#lstSeleccionados option").length > 0) {
    //        $("#lstSeleccionados").html("");
    //    }
    //    else {
    //        alerta("No hay datos seleccionados");
    //    }
    //});
    $("#btnAgregar").live("click", function () {
        $("#bpBusquedaUsuarios_imgBusqueda").click();
    });
    $("#btnBusquedaUsuario").live("click", function () {
        $("#tbUsuarios").trigger("reloadGrid");
    });
    $("#btnEliminar").live("click", function () {
        var inCodUsu = tbUsuarios.getGridParam('selrow');
        if (inCodUsu == null || inCodUsu == undefined || inCodUsu == '') {
            alerta("Seleccione un usuario.");
            return;
        } else {
            if ($("#hdfCodigo").val() == '42') {
                $("#lblPDConfirmacion").show();
                $("#lblPDConfirmacion").text("Se eliminará la configuración de \"Seguridad por Tipo\" para el usuario eliminado");
            }
            $("#MsgConfirmacionEliminar").dialog({
                title: "Confirmación",
                modal: true,
                buttons: {
                    "Aceptar": function () {
                        $(this).dialog("close");
                        ProcesarUsuario($("#hdfCodigo").val(), inCodUsu, false);
                    },
                    "Cancelar": function () {
                        $(this).dialog("close");
                    }
                },
                resizable: false
            });

            //alerta("Eliminar " + inCodUsu);
        }
    });

    fnTemporizador();
});

//function AgregaItems(selector) {
//    BloquearPagina(true);
//    $("#dvProcesando").show();
//    $("#lblProcesando").text("Procesando...");
//    var totalSeleccionado = $(selector).length;
//    var ValorAgregado = false;
//    if (totalSeleccionado < 400) {
//        $(selector).each(function () {
//            var Seleccionado = $(this);
//            var Existe = false;
//            $("#lstSeleccionados option").each(function () {
//                if (Seleccionado.val() == $(this).val()) {
//                    Existe = true;
//                    ValorAgregado = true;
//                    return false;
//                }
//            });
//            if (!Existe) {
//                $("#lstSeleccionados").append($("<option></option>").attr("value", Seleccionado.val()).text(Seleccionado.html()).css("color", "black"));
//            }
//        });
//        $("#dvProcesando").hide(500);
//        BloquearPagina(false);
//    } else {
//        var k = 0;
//        idSetInterval = setInterval(function () {
//            var Seleccionado = $($(selector)[k]);
//            var Existe = false;
//            $("#lstSeleccionados option").each(function () {
//                if (Seleccionado.val() == $(this).val()) {
//                    Existe = true;
//                    ValorAgregado = true;
//                    return false;
//                }
//            });
//            if (!Existe) {
//                $("#lstSeleccionados").append($("<option></option>").attr("value", Seleccionado.val()).text(Seleccionado.html()).css("color", "black"));
//            };
//            k++;
//            $("#lblProcesando").html('');
//            //var total = k / totalSeleccionado * 100;
//            //var iof = total.toString.indexOf(".");
//            //var porcentaje = total.substring(0, iof);
//            $("#lblProcesando").append("Procesando " + k + " de " + totalSeleccionado + " usuarios");
//            if (k == totalSeleccionado) {
//                clearInterval(idSetInterval);
//                $("#lblProcesando").html('');
//                $("#lblProcesando").append("Completado");
//                $("#dvProcesando").hide(5000);
//                BloquearPagina(false);
//            };
//        });
//    };
//    if (ValorAgregado) {
//        alerta("Algunos ítems seleccionados ya han sido agregados");
//    }
//};

//function CargarUsuariosFiltro() {
//    var treeData;
//    var idPerfil = $("#hdfCodigo").val();
//    var filtro = $("#txtBusqueda").val();
//    BloquearPagina(true);
//    $("#dvProcesando").show();
//    $("#lblProcesando").text("Cargando usuarios...");
//    $.ajax({
//        type: "POST",
//        url: "Mnt_Perfil.aspx/ObtenerUsuarios_Perfil_Busqueda",
//        data: "{'pIdPerfil': '" + idPerfil + "', 'pvcNom':'" + filtro + "'}",
//        contentType: "application/json; charset=utf-8",
//        dataType: "json",
//        success: function (resultado) {
//            var lstUsuarios = JSON.parse(resultado.d);
//            $("#lstResultado").html("");
//            $.each(lstUsuarios, function () {
//                $("#lstResultado").append($("<option></option>").attr("value", this.key).text(this.title));
//            });
//            BloquearPagina(false);
//            $("#dvProcesando").hide(100);
//        },
//        error: function (xhr, err, thrErr) {
//            MostrarErrorAjax(xhr, err, thrErr);
//        }
//    });
//};

function fnMostrarCodigoUsuario(valor) {
    ProcesarUsuario($("#hdfCodigo").val(), valor, true);
}

function ProcesarUsuario(inCodPer, inCodUsu, esAdd) {

    $.ajax({
        type: "POST",
        url: "Mnt_Perfil.aspx/ProcesarUsuarioPerfil",
        data: "{ 'inCodPer':'" + inCodPer + "', 'inCodUsu':'" + inCodUsu + "', 'esAdd':'" + esAdd + "' }",
        dateType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            var textResultado = '';
            //$("#lblResultado").show();
            if (esAdd) {
                if (result.d == '1') {
                    textResultado = "Usuario agregado.";
                } else {
                    textResultado = "Usuario ya pertenece al perfil.";
                }
            } else {
                if (result.d == '1') {
                    textResultado = "Usuario eliminado.";
                } else if (result.d == "0") {
                    textResultado = "Usuario no pertence al perfil.";
                } else if (result.d == "2") {
                    alerta("No puede eliminar usuario porque tiene solicitud asignadas aún en estado \"En Proceso\".");
                } else if (result.d == "3") {
                    alerta("No puede eliminar usuario porque es <b>Especialista Responsable</b> de un tipo de solicitud.");
                } else if (result.d == "4") {
                    alerta("No puede eliminar usuario porque es <b>Responsable De Aprobación</b> de un tipo de solicitud.");
                } else {
                    alerta("Problema el intentar eliminar el usuario, vuelva a intentarlo en unos instantes.");
                }
            }
            tbUsuarios.trigger("reloadGrid");
            //$("#lblResultado").text(textResultado);
            //$("#lblResultado").hide(5000);
            //$("#tbUsuarios").trigger("reloadGrid");
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
}

function activarCheckOpciones(codRow) {
    $("#chkIns-" + codRow).removeAttr("disabled");
    $("#chkAct-" + codRow).removeAttr("disabled");
    $("#chkActBas-" + codRow).removeAttr("disabled");
    $("#chkEli-" + codRow).removeAttr("disabled");
    $("#chkExp-" + codRow).removeAttr("disabled");
    $("#chkImp-" + codRow).removeAttr("disabled");
}

function desactivarCheckOpciones(codRow) {
    $("#chkIns-" + codRow).removeAttr("checked");
    $("#chkAct-" + codRow).removeAttr("checked");
    $("#chkActBas-" + codRow).removeAttr("checked");
    $("#chkEli-" + codRow).removeAttr("checked");
    $("#chkExp-" + codRow).removeAttr("checked");
    $("#chkImp-" + codRow).removeAttr("checked");
    $("#chkIns-" + codRow).attr("disabled", "disabled");
    $("#chkAct-" + codRow).attr("disabled", "disabled");
    $("#chkActBas-" + codRow).attr("disabled", "disabled");
    $("#chkEli-" + codRow).attr("disabled", "disabled");
    $("#chkExp-" + codRow).attr("disabled", "disabled");
    $("#chkImp-" + codRow).attr("disabled", "disabled");
}

function desactivarChekAccesos(data) {
    //técnico de solicitud (desactivar check de accesos)
    if ($("#hdfCodigo").val() == "42" || $("#hdfCodigo").val() == "39") {
        $(".chkAcceso").attr("disabled", "disabled");
        $(".chkIns").attr("disabled", "disabled");
        $(".chkAct").attr("disabled", "disabled");
        $(".chkActBas").attr("disabled", "disabled");
        $(".chkEli").attr("disabled", "disabled");
        $(".chkExp").attr("disabled", "disabled");
        $(".chkImp").attr("disabled", "disabled");

        //JHERRERA 20141006: Se quitó inhabilitaciones de opciones específicas
        //---------------------------------------------------------------------------------
        //La opción de Despacho Oficina puede ser elegida para un técnico de solicitudes
        $("#chk-2-213").removeAttr("disabled");
        $("#chkIns-2-213").removeAttr("disabled");
        $("#chkAct-2-213").removeAttr("disabled");
        $("#chkActBas-2-213").removeAttr("disabled");
        $("#chkEli-2-213").removeAttr("disabled");
        $("#chkExp-2-213").removeAttr("disabled");
        $("#chkImp-2-213").removeAttr("disabled");

        //La opción de Despacho Empleado puede ser elegida para un técnico de solicitudes
        $("#chk-2-214").removeAttr("disabled");
        $("#chkIns-2-214").removeAttr("disabled");
        $("#chkAct-2-214").removeAttr("disabled");
        $("#chkActBas-2-214").removeAttr("disabled");
        $("#chkEli-2-214").removeAttr("disabled");
        $("#chkExp-2-214").removeAttr("disabled");
        $("#chkImp-2-214").removeAttr("disabled");
        //------------------------------------------------------------------------------->>
//        for (i = 0; i < data.rows.length; i++) {
//            if(data.rows[0].cell[2] != "Despacho Oficina" && data.rows[0].cell[2] != "Despacho Empleado" && data.rows[0].cell[0] != "2-213" && data.rows[0].cell[0] != "2-214") {
//            }
//        }
    }

    if ($("#hdfCodigo").val() == "1" || $("#hdfCodigo").val() == "50") {
        $(".chkAcceso").attr("disabled", "disabled");
        $(".chkIns").attr("disabled", "disabled");
        $(".chkAct").attr("disabled", "disabled");
        $(".chkActBas").attr("disabled", "disabled");
        $(".chkEli").attr("disabled", "disabled");
        $(".chkExp").attr("disabled", "disabled");
        $(".chkImp").attr("disabled", "disabled");
    }
}


function fnTemporizador() {

    $("#chkActivarTemporizador").change(function () {
        if ($(this).prop("checked")) {
            $(".esTemporizadorActivo").css("display", "block");
            fnObtenerTemporizador();
        }
        else {
            $(".esTemporizadorActivo").css("display", "none");
        }
    });

    $("#ddlTemporizador").change(function () {
        fnObtenerTemporizador();
    });

    if ($("#hdfIdTemporizador").val() != "-1") {
        $("#chkActivarTemporizador").prop("checked",true);
        $("#ddlTemporizador").val($("#hdfIdTemporizador").val());
        $(".esTemporizadorActivo").css("display", "block");
        fnObtenerTemporizador();
    }
}

function fnObtenerTemporizador() {
    var misOptions = $("#ddlTemporizador option");

    if (misOptions.length > 0) {

        $.ajax({
            type: "POST",
            url: "Mnt_Perfil.aspx/ObtenerTemporizador",
            data: "{'prIdTemporizador': '" + $("#ddlTemporizador").val() + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (resultado) {
                var resul = resultado.d;

                $("#mensajeTemporizador").hide(0, function () {
                    $("#tblTemporizador").fadeIn(300);
                });
                if (resul.length > 0) {
                    $("#txtTiempoTemporizador").val(resul[0].Tiempo);
                    $("#chkReiniciarTemporizado").prop("checked", resul[0].ReiniciarConAccion);
                }

            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            }
        });

    }
    else {
        $("#tblTemporizador").hide(0, function () {
            $("#mensajeTemporizador").fadeIn(300);
            $("#chkActivarTemporizador").removeAttr("checked");
            $("#chkActivarTemporizador").attr("readonly", "readonly");
        });
    }
}

function fnActualizarSeccionTipoLinea() {
    //if ((activarAccesoDashMov == true || activarAccesoDashEmpl == true || activarAccesoConsultas == true ? true : false) == true) {
    //    $("#AccordionJQ1").find('h3').filter(':contains(Tipo de Grupo por Perfil)').show();
    if (activarAccesoDashMov == true) {
        //$("#dvDashboardMovil").show();
        $("#lblDashMovil").html(textDashMov);
    } else {
        $("#dvDashboardMovil").hide();
    }
    if (activarAccesoDashEmpl == true) {
        //$("#dvDashboardEmpleado").show();
        $("#LblDashEmpleado").html(textDashEmpl);
    } else {
        $("#dvDashboardEmpleado").hide();
    }
    if (activarAccesoConsultas == true) {
        //$("#dvAnalisisConsumo").show();
        $("#LblConsumo").html("Analisis Consumo");
    } else {
        $("#dvAnalisisConsumo").hide();
    }
    //} else {
    //    $("#AccordionJQ1").find('h3').filter(':contains(Tipo de Grupo por Perfil)').hide();
    //}
}
