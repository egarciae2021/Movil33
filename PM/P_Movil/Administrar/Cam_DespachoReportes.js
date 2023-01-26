var Dialogo;
var i = 0;
var v_lstOficina;
var idSetInterval;

var j = 0;
var v_lstModelos;
var idSetInterval_2;
var Ancho;

function CargarOficina(lstOficina) {
    var lstOficinasRepetidos = "";
    var vcOfi = "";
    i = 0;
    v_lstOficina = lstOficina;

    idSetInterval = setInterval(function () {
        if (v_lstOficina[i].IdOficina == undefined) {
            alerta("Debe seleccionar una oficina para poder agregarlo");
        }
        else if (v_lstOficina[i].IdOficina != undefined) {
            var datos = $("#tblSeleccionOficina").jqGrid('getRowData');
            vcOfi = "";
            $(datos).each(function () {
                if (this.IdOficina.toString() == v_lstOficina[i].IdOficina) {
                    if (lstOficinasRepetidos != "") {
                        lstOficinasRepetidos += ", ";
                    }
                    lstOficinasRepetidos += v_lstOficina[i].Descripcion;
                    vcOfi = v_lstOficina[i].Descripcion;
                }
            });
            if (vcOfi == "") {
                $("#tblSeleccionOficina").jqGrid('addRowData', v_lstOficina[i].IdOficina, v_lstOficina[i]);
            }
        }
        //if ($("#tblSeleccionOficina").jqGrid('getRowData', v_lstOficina[i].IdOficina).IdOficina == undefined) {
        //    $("#tblSeleccionOficina").jqGrid('addRowData', v_lstOficina[i].IdOficina, v_lstOficina[i]);
        //} else {
        //    if (lstOficinasRepetidos != "")
        //        lstOficinasRepetidos += ",";
        //    lstOficinasRepetidos += v_lstOficina[i].Descripcion;
        //}
        i++;

        if (i == $(v_lstOficina).length) {
            clearInterval(idSetInterval);

            if (lstOficinasRepetidos != "")
                alerta("Las oficinas '<b>" + lstOficinasRepetidos + "</b>' ya han sido agregados anteriormente.");
        }
    }, 1);


    //            for (var i = 0; i < $(lstOficina).length; i++) {
    //                if ($("#tblSeleccionOficina").jqGrid('getRowData', lstOficina[i].IdOficina).IdOficina == undefined)
    //                    $("#tblSeleccionOficina").jqGrid('addRowData', lstOficina[i].IdOficina, lstOficina[i]);
    //                else {
    //                    if (lstOficinasRepetidos != "")
    //                        lstOficinasRepetidos += ",";
    //                    lstOficinasRepetidos += lstOficina[i].Descripcion;
    //                }
    //            }
}

function CargarModeloDispositivo(lstModeloDispositivo) {
    var lstModelosRepetidos = "";
    var vcModeloDisp = "";
    j = 0;
    v_lstModelos = lstModeloDispositivo;

    idSetInterval_2 = setInterval(function () {
        if (v_lstModelos[j].P_inCod == undefined) {
            alerta("Debe seleccionar un modelo de dispositivo para poder agregarlo");
        }
        else if (v_lstModelos[j].P_inCod != undefined) {
            vcModeloDisp = "";
            var datos = $("#tblSeleccionModelo").jqGrid('getRowData');
            vcModeloDisp = "";
            $(datos).each(function () {
                if (this.P_inCod.toString() == v_lstModelos[j].P_inCod) {
                    if (lstModelosRepetidos != "") {
                        lstModelosRepetidos += ", ";
                    }
                    lstModelosRepetidos += v_lstModelos[j].vcNom;
                    vcModeloDisp = v_lstModelos[j].vcNom;
                }
            });
            if (vcModeloDisp == "") {
                $("#tblSeleccionModelo").jqGrid('addRowData', v_lstModelos[j].P_inCod, v_lstModelos[j]);
            }
        }
        j++;

        if (j == $(v_lstModelos).length) {
            clearInterval(idSetInterval_2);

            if (lstModelosRepetidos != "")
                alerta("Los modelos de dispositivos '<b>" + lstModelosRepetidos + "</b>' ya han sido agregados anteriormente.");
        }
    }, 1);

    //            for (var i = 0; i < $(lstModeloDispositivo).length; i++) {
    //                if ($("#tblSeleccionModelo").jqGrid('getRowData', lstModeloDispositivo[i].P_inCod).P_inCod == undefined)
    //                    $("#tblSeleccionModelo").jqGrid('addRowData', lstModeloDispositivo[i].P_inCod, lstModeloDispositivo[i]);
    //                else{
    //                    if (lstModelosRepetidos != "")
    //                        lstModelosRepetidos += ",";
    //                    lstModelosRepetidos += lstModeloDispositivo[i].vcNom;
    //                }
    //            }
}

function CerrarDialogo() {
    Dialogo.dialog("close");
}

$(function () {
    Ancho = $(window).width();
    $("#ddlCampana").change(function () {
        $("#ddlTipoReporte").val("-1");

        $("#dvSeleccionOficina").hide();
        $("#dvSeleccionOficinaDetalle").hide();
        $('input:radio[name=rblSeleccionOficina]:nth(0)').attr('checked', true);

        $("#dvSeleccionModelo").hide();
        $("#dvSeleccionModeloDetalle").hide();
        $('input:radio[name=rblSeleccionModelo]:nth(0)').attr('checked', true);
    });
    $("#ddlTipoReporte").change(function () {
        if ($("#ddlTipoReporte").val() == "-1") {
            $("#dvSeleccionOficina").hide();
            $('input:radio[name=rblSeleccionOficina]:nth(0)').attr('checked', true);
            $("#dvSeleccionModelo").hide();
            $('input:radio[name=rblSeleccionModelo]:nth(0)').attr('checked', true);
        }
        else {
            switch ($("#ddlTipoReporte").val()) {
                case "1": //Pedidos por Despachar
                    $("#dvSeleccionOficina").hide();
                    $("#dvSeleccionModelo").show();
                    $("#dvSeleccionModeloDetalle").hide();
                    $('input:radio[name=rblSeleccionModelo]:nth(0)').attr('checked', true); //
                    break;
                case "2": //Pedidos Despachados
                    $("#dvSeleccionOficina").hide();
                    $("#dvSeleccionModelo").show();
                    $("#dvSeleccionModeloDetalle").hide();
                    $('input:radio[name=rblSeleccionModelo]:nth(0)').attr('checked', true); //
                    break;
                case "3": //Pedidos por Oficina
                    $("#dvSeleccionModelo").hide();
                    $("#dvSeleccionOficina").show();
                    $("#dvSeleccionOficinaDetalle").hide();
                    $('input:radio[name=rblSeleccionOficina]:nth(0)').attr('checked', true); //
                    break;
                case "4":
                    $("#dvSeleccionModelo").hide();
                    $("#dvSeleccionOficina").show();
                    $("#dvSeleccionOficinaDetalle").hide();
                    $('input:radio[name=rblSeleccionOficina]:nth(0)').attr('checked', true); //
                    break;
                default:
            }
        }
    });
    $("#rblSeleccionOficina").change(function () {
        if ($("input[name='rblSeleccionOficina']:checked").val() == "-1")
            $("#dvSeleccionOficinaDetalle").hide();
        else
            $("#dvSeleccionOficinaDetalle").show();
    });
    $("#rblSeleccionModelo").change(function () {
        if ($("input[name='rblSeleccionModelo']:checked").val() == "-1")
            $("#dvSeleccionModeloDetalle").hide();
        else
            $("#dvSeleccionModeloDetalle").show();
    });
    function SeleccionoOficina(id) {

    }
    var modeloOficina = [
                 { name: 'IdOficina', index: 'IdOficina', label: 'IdOficina', hidden: true, width: 70, align: 'left' },
                 { name: 'opAccion', index: 'opAccion', label: ' ', hidden: false, width: 40, align: 'center',
                     formatter: function (value, options, rData) { return GenerarBotones(options.rowId, 'O'); }
                 },
                 { name: 'Descripcion', index: 'Descripcion', label: 'Oficina', hidden: false, key: true, width: 250, align: 'left' },
                 { name: 'NombrePais', index: 'NombrePais', label: 'País', hidden: true, key: true, width: 100, align: 'left' },
                 { name: 'NombreCiudad', index: 'NombreCiudad', label: 'Departamento', hidden: false, key: true, width: 100, align: 'left' },
   		         { name: 'NombreProvincia', index: 'NombreProvincia', label: 'Provincia', hidden: false, width: 100, align: 'left' },
                 { name: 'NombreDistrito', index: 'NombreDistrito', label: 'Distrito', hidden: false, width: 120, align: 'left' },
                 { name: 'DireccionCompleta', index: 'DireccionCompleta', label: 'Dirección', hidden: false, width: 350, align: 'left' }
   	            ];

    var tbOficina = JQGrid("#tblSeleccionOficina", "", "local", modeloOficina, Ancho - 50, 270, "rowId", false, null, SeleccionoOficina);

    function SeleccionoModelo(id) {

    }
    var modeloModeloDispositivo = [
                 { name: 'P_inCod', index: 'P_inCod', label: 'IdModeloDispositivo', hidden: true, width: 70, align: 'left' },
                 { name: 'opAccion', index: 'opAccion', label: ' ', hidden: false, width: 40, align: 'center',
                     formatter: function (value, options, rData) { return GenerarBotones(options.rowId, 'MD'); }
                 },
                 { name: 'vcNom', index: 'vcNom', label: 'Modelo', hidden: false, key: true, width: 250, align: 'left' },
                 { name: 'vcNomTipSer', index: 'vcNomTipSer', label: 'Tipo de Servicio', hidden: false, key: true, width: 160, align: 'left' }
   	            ];

    function GenerarBotones(id, tipo) {
        return '<img id="btnQuitar' + id + '" src="../../Common/Images/Mantenimiento/Cancelar.png" alt="Quitar Item" class="imgBtn QuitarItem' + tipo + '" title="Quitar Item"/>';
    }

    $(".QuitarItemMD").live("click", function () {
        tbModelo.jqGrid('delRowData', $(this).attr("id").toString().substring(9, $(this).attr("id").toString().length));
    });

    $(".QuitarItemO").live("click", function () {
        tbOficina.jqGrid('delRowData', $(this).attr("id").toString().substring(9, $(this).attr("id").toString().length));
    });

    var tbModelo = JQGrid("#tblSeleccionModelo", "", "local", modeloModeloDispositivo, 700, 270, "rowId", false, null, SeleccionoModelo);

    $("#btnAgregarOficina").click(function () {
        $('#ifSeleccionarOficina').attr("src", "Adm_OficinaSeleccion.aspx?idcam=" + $("#ddlCampana").val());
        Dialogo = $('#dvSeleccionarOficina').dialog({
            title: "Selección de Oficina",
            height: 540,
            width: 710,
            resizable: false,
            modal: true
        });
    });

    $("#btnLimpiarSeleccionOficina").click(function () {
        $("#tblSeleccionOficina").jqGrid('clearGridData');
    });

    $("#btnAgregarModelo").click(function () {
        $('#ifSeleccionarModeloDispositivo').attr("src", "Adm_ModeloDispositivoSeleccion.aspx?idcam=" + $("#ddlCampana").val());
        Dialogo = $('#dvSeleccionarModeloDispositivo').dialog({
            title: "Selección de Modelo de Dispositivo",
            height: 550,
            width: 590,
            resizable: false,
            modal: true
        });
    });

    $("#btnLimpiarSeleccionModelo").click(function () {
        $("#tblSeleccionModelo").jqGrid('clearGridData');
    });

    $("#btnSalir").click(function () {
        var tab1 = window.parent.tabschild[window.parent.tabPrincipal.tabs("option", "selected")].id;
        var Accord = window.parent.$("#" + tab1);
        Accord.tabs("remove", Accord.tabs("option", "selected"));
    });

    function SatisfactoriaCargarValores() {
        //$('#ifReporte').attr("src", raiz("Common/Controladores/DescargarArchivo.ashx?archivo=") + ruta);
        btnExportarExcel_eegReporte();
    }

    $("#btnGenerarReporte").click(function () {
        if ($("#ddlCampana").val() == "-1") {
            alerta("Seleccione una campaña válida.");
            return;
        }

        if ($("#ddlTipoReporte").val() != "-1") {
            var Metodo = raiz("P_Movil/Administrar/Cam_DespachoReportes.aspx/CargarValores"); //ExportarExcel
            var lstFiltro = "";


            if ($("#ddlTipoReporte").val() == "3") {
                if ($("input[name='rblSeleccionOficina']:checked").val() == "1") { //Seleccion
                    var datos = $("#tblSeleccionOficina").jqGrid('getRowData');
                    if (datos.length == 0) {
                        alerta("Seleccione por lo menos una oficina.");
                        return;
                    }
                    $(datos).each(function () {
                        if (lstFiltro != "")
                            lstFiltro += ",";
                        lstFiltro += this.IdOficina.toString();
                    });
                }
            }
            else if ($("#ddlTipoReporte").val() == "4") {
                if ($("input[name='rblSeleccionOficina']:checked").val() == "1") { //Seleccion
                    var datos = $("#tblSeleccionOficina").jqGrid('getRowData');
                    if (datos.length == 0) {
                        alerta("Seleccione por lo menos una oficina.");
                        return;
                    }
                    $(datos).each(function () {
                        if (lstFiltro != "")
                            lstFiltro += ",";
                        lstFiltro += this.IdOficina.toString();
                    });
                }
            }
            else {
                if ($("input[name='rblSeleccionModelo']:checked").val() == "1") { //Seleccion
                    var datos = $("#tblSeleccionModelo").jqGrid('getRowData');
                    if (datos.length == 0) {
                        alerta("Seleccione por lo menos un modelo de dispositivo.");
                        return;
                    }
                    $(datos).each(function () {
                        if (lstFiltro != "")
                            lstFiltro += ",";
                        lstFiltro += this.P_inCod.toString();
                    });
                }
            }

            var Data = {
                IdCampana: $("#ddlCampana").val(), //Serializa JSON MODELO
                TipoExportacion: $("#ddlTipoReporte").val(), //Serializa JSON MODELO
                Datos: lstFiltro //Serializa JSON MODELO
            };
            MetodoWeb(Metodo, JSON.stringify(Data), SatisfactoriaCargarValores);
        }
        else {
            alerta("Seleccione un tipo de reporte");
        }
    });
});
