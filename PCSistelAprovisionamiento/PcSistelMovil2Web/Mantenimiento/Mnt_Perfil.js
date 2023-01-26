// ===============================================================================================================
// ENTIDAD - PERFIL 
// ==============================================================================================================

function apr_Perfil(IdPerfil,Nombre) {
    this.IdPerfil = IdPerfil;
    this.Nombre = Nombre;
}

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


var tbUsuarios;
var btTreeGridAccesos;
var buscarValor = '';


$(function () {


    IniciarPagina();

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

        btTreeGridAccesos = $("#btTreeGridAccesos").jqGrid({
            datatype: 'jsonstring',
            datastr: DatosTreeGridAccesos,
            colNames: ["ID", "Acceso", 'Descripción', "Nivel", "CodPadre", "Código", "inNumNod", "inNumNodSelect", "lstCodNod", "esAdmLista", "Nuevo", "Editar", "Eliminar", "Exportar", "btImp"],
            colModel: [
                    { name: 'OrdenGrilla', index: 'OrdenGrilla', width: 30, hidden: true, key: true },
                    { name: 'IsSelected', width: 80, sortable: false, align: 'center',
                        formatter: function (value, options, rData) {
                            if (value == "True") {
                                return '<input estActual="1" estAnterior="" class="chkAcceso" type="checkbox" id="chk-' + rData[0] + '" checked />';
                            } else {
                                return '<input estActual="0" estAnterior="" class="chkAcceso" type="checkbox" id="chk-' + rData[0] + '" />';
                            }
                        }
                    },
                    { name: 'Descripcion', width: 180, sortable: false },
                    { name: 'inNivel', width: 40, sortable: false, hidden: true },
                    { name: 'inPadre', width: 40, sortable: false, hidden: true },
                    { name: 'Codigo', width: 40, sortable: false, hidden: true },
                    { name: 'inNumNod', width: 40, sortable: false, hidden: true },
                    { name: 'inNumNodSelect', width: 40, sortable: false, hidden: true },
                    { name: 'lstCodNod', width: 80, sortable: false, hidden: true },
                    { name: 'esAdmLista', width: 80, sortable: false, hidden: true },
                    { name: 'btIns', width: 80, label: "Nuevo", sortable: false, align: 'center', hidden: true,
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
                    { name: 'btAct', width: 80, label: "Editar", sortable: false, align: 'center', hidden: true,
                        formatter: function (value, options, rData) {
                            if (rData[6] == "0" && rData[9] == "True") {
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
                    { name: 'btEli', width: 80, label: "Eliminar", sortable: false, align: 'center', hidden: true,
                        formatter: function (value, options, rData) {
                            if (rData[6] == "0" && rData[9] == "True") {
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
                    { name: 'btExp', width: 80, label: "Exportar", sortable: false, align: 'center', hidden: true,
                        formatter: function (value, options, rData) {
                            if (rData[6] == "0" && rData[9] == "True") {
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
                    { name: 'btImp', width: 80, label: "Importar", hidden: true, sortable: false, align: 'center', hidden: true,
                        formatter: function (value, options, rData) {
                            if (rData[6] == "0" && rData[9] == "True") {
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
            width: 650,
            shrinkToFit: false,
            loadComplete: function (data) {
                desactivarChekAccesos(data);
            },
            caption: "Accesos",
            gridComplete: function () {

                $("#gview_btTreeGridAccesos .ui-jqgrid-bdiv").css("overflow", "hidden");
            }
        });

        valChecksIdeterminate();

        function valChecksIdeterminate() {
            var vcIdProd = btTreeGridAccesos.getDataIDs();
            for (k = 0; k < vcIdProd.length; k++) {
                var cod = vcIdProd[k]
                var nivel = vcIdProd[k].split("-")[1];
                var rowCam = btTreeGridAccesos.getRowData(cod);
                if ($("#chk-" + cod).is(":checked") && rowCam.inNumNod != rowCam.inNumNodSelect) {
                    document.getElementById('chk-' + cod).indeterminate = true;
                }
                var rowCam = btTreeGridAccesos.getRowData(vcIdProd[k]);
            }

            var contadorAccesos = 0;
            var activarAccesoDashMov = false;
            var activarAccesoDashEmpl = false;
            var activarAccesoConsultas = false;
            var textDashMov = '';
            var textDashEmpl = '';
            var textConsumo = '';
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


            if ((activarAccesoDashMov == true || activarAccesoDashEmpl == true || activarAccesoConsultas == true ? true : false) == true) {
                $("#AccordionJQ1").find('h3').filter(':contains(Tipo de Grupo por Perfil)').show();
                if (activarAccesoDashMov == true) {
                    $("#dvDashboardMovil").show();
                    $("#lblDashMovil").html(textDashMov);
                } else {
                    $("#dvDashboardMovil").hide();
                }
                if (activarAccesoDashEmpl == true) {
                    $("#dvDashboardEmpleado").show();
                    $("#LblDashEmpleado").html(textDashEmpl);
                } else {
                    $("#dvDashboardEmpleado").hide();
                }
                if (activarAccesoConsultas == true) {
                    $("#dvAnalisisConsumo").show();
                    $("#LblConsumo").html("Analisis Consumo");
                } else {
                    $("#dvAnalisisConsumo").hide();
                }
            } else {
                $("#AccordionJQ1").find('h3').filter(':contains(Tipo de Grupo por Perfil)').hide();
            }
        }
        //checked = 1, nocheck = 2, indetermiante = 3
        $(".chkAcceso").live("click", function () {
            var estActual;
            var activarAccesoDashMov = false;
            var activarAccesoDashEmpl = false;
            var activarAccesoConsultas = false;
            var textDashMov = '';
            var textDashEmpl = '';
            var textConsumo = '';

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
                    $("#chkEli-" + cod).removeAttr("disabled");
                    $("#chkExp-" + cod).removeAttr("disabled");
                    $("#chkImp-" + cod).removeAttr("disabled");
                } else {
                    $("#chkIns-" + cod).removeAttr("checked");
                    $("#chkAct-" + cod).removeAttr("checked");
                    $("#chkEli-" + cod).removeAttr("checked");
                    $("#chkExp-" + cod).removeAttr("checked");
                    $("#chkImp-" + cod).removeAttr("checked");
                    $("#chkIns-" + cod).attr("disabled", "disabled");
                    $("#chkAct-" + cod).attr("disabled", "disabled");
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
                for (var i = Nivel; i > 0; i--) {
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
                    for (var i = 0; i < $(lstCodHijos).length; i++) {
                        CodHijo1 = NivelHijos.toString() + "-" + lstCodHijos[i].toString();
                        document.getElementById('chk-' + CodHijo1).indeterminate = false;
                        $("#chk-" + CodHijo1).attr("checked", "checked");
                        $("#chk-" + CodHijo1).attr("estAnterior", "1");
                        //---
                        $("#chkIns-" + CodHijo1).removeAttr("disabled");
                        $("#chkAct-" + CodHijo1).removeAttr("disabled");
                        $("#chkEli-" + CodHijo1).removeAttr("disabled");
                        $("#chkExp-" + CodHijo1).removeAttr("disabled");
                        $("#chkImp-" + CodHijo1).removeAttr("disabled");
                        //activarCheckOpciones(CodHijo1);

                        rowDataHijo1 = btTreeGridAccesos.getRowData(CodHijo1);
                        if (parseInt(rowDataHijo1.inNumNod) > 0) {
                            lstCodHijos1 = rowDataHijo1.lstCodNod.split(",");
                            NivelHijos1 = parseInt(NivelHijos) + 1;
                            btTreeGridAccesos.jqGrid('setCell', CodHijo1, 'inNumNodSelect', rowDataHijo1.inNumNod);
                            for (var j = 0; j < $(lstCodHijos1).length; j++) {
                                CodHijo2 = NivelHijos1.toString() + "-" + lstCodHijos1[j].toString();
                                document.getElementById('chk-' + CodHijo2).indeterminate = false;
                                $("#chk-" + CodHijo2).attr("checked", "checked");
                                $("#chk-" + CodHijo2).attr("estAnterior", "1");
                                //-------------
                                $("#chkIns-" + CodHijo2).removeAttr("disabled");
                                $("#chkAct-" + CodHijo2).removeAttr("disabled");
                                $("#chkEli-" + CodHijo2).removeAttr("disabled");
                                $("#chkExp-" + CodHijo2).removeAttr("disabled");
                                $("#chkImp-" + CodHijo2).removeAttr("disabled");
                                //activarCheckOpciones(CodHijo2);

                                rowDataHijo2 = btTreeGridAccesos.getRowData(CodHijo2);
                                if (parseInt(rowDataHijo2.inNumNod) > 0) {
                                    lstCodHijos2 = rowDataHijo2.lstCodNod.split(",");
                                    NivelHijos2 = parseInt(NivelHijos1) + 1;
                                    btTreeGridAccesos.jqGrid('setCell', CodHijo2, 'inNumNodSelect', rowDataHijo2.inNumNod);
                                    for (var k = 0; k < $(lstCodHijos2).length; k++) {
                                        CodHijo3 = NivelHijos2.toString() + "-" + lstCodHijos2[k].toString();
                                        document.getElementById('chk-' + CodHijo3).indeterminate = false;
                                        $("#chk-" + CodHijo3).attr("checked", "checked");
                                        $("#chk-" + CodHijo3).attr("estAnterior", "1");
                                        //----
                                        $("#chkIns-" + CodHijo3).removeAttr("disabled");
                                        $("#chkAct-" + CodHijo3).removeAttr("disabled");
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
                    for (var i = 0; i < $(lstCodHijos).length; i++) {
                        CodHijo1 = NivelHijos.toString() + "-" + lstCodHijos[i].toString();
                        document.getElementById('chk-' + CodHijo1).indeterminate = false;
                        $("#chk-" + CodHijo1).removeAttr("checked");
                        $("#chk-" + CodHijo1).attr("estAnterior", "2");
                        //--
                        $("#chkIns-" + CodHijo1).removeAttr("checked");
                        $("#chkAct-" + CodHijo1).removeAttr("checked");
                        $("#chkEli-" + CodHijo1).removeAttr("checked");
                        $("#chkExp-" + CodHijo1).removeAttr("checked");
                        $("#chkImp-" + CodHijo1).removeAttr("checked");
                        $("#chkIns-" + CodHijo1).attr("disabled", "disabled");
                        $("#chkAct-" + CodHijo1).attr("disabled", "disabled");
                        $("#chkEli-" + CodHijo1).attr("disabled", "disabled");
                        $("#chkExp-" + CodHijo1).attr("disabled", "disabled");
                        $("#chkImp-" + CodHijo1).attr("disabled", "disabled");
                        //desactivarCheckOpciones(CodHijo1);

                        rowDataHijo1 = btTreeGridAccesos.getRowData(CodHijo1);
                        if (parseInt(rowDataHijo1.inNumNod) > 0) {
                            lstCodHijos1 = rowDataHijo1.lstCodNod.split(",");
                            NivelHijos1 = parseInt(NivelHijos) + 1;
                            btTreeGridAccesos.jqGrid('setCell', CodHijo1, 'inNumNodSelect', 0);
                            for (var j = 0; j < $(lstCodHijos1).length; j++) {
                                CodHijo2 = NivelHijos1.toString() + "-" + lstCodHijos1[j].toString();
                                document.getElementById('chk-' + CodHijo2).indeterminate = false;
                                $("#chk-" + CodHijo2).removeAttr("checked");
                                $("#chk-" + CodHijo2).attr("estAnterior", "2");
                                //--
                                $("#chkIns-" + CodHijo2).removeAttr("checked");
                                $("#chkAct-" + CodHijo2).removeAttr("checked");
                                $("#chkEli-" + CodHijo2).removeAttr("checked");
                                $("#chkExp-" + CodHijo2).removeAttr("checked");
                                $("#chkImp-" + CodHijo2).removeAttr("checked");
                                $("#chkIns-" + CodHijo2).attr("disabled", "disabled");
                                $("#chkAct-" + CodHijo2).attr("disabled", "disabled");
                                $("#chkEli-" + CodHijo2).attr("disabled", "disabled");
                                $("#chkExp-" + CodHijo2).attr("disabled", "disabled");
                                $("#chkImp-" + CodHijo2).attr("disabled", "disabled");
                                //desactivarCheckOpciones(CodHijo2);

                                rowDataHijo2 = btTreeGridAccesos.getRowData(CodHijo2);
                                if (parseInt(rowDataHijo2.inNumNod) > 0) {
                                    lstCodHijos2 = rowDataHijo2.lstCodNod.split(",");
                                    NivelHijos2 = parseInt(NivelHijos1) + 1;
                                    btTreeGridAccesos.jqGrid('setCell', CodHijo2, 'inNumNodSelect', 0);
                                    for (var k = 0; k < $(lstCodHijos2).length; k++) {
                                        CodHijo3 = NivelHijos2.toString() + "-" + lstCodHijos2[k].toString();
                                        document.getElementById('chk-' + CodHijo3).indeterminate = false;
                                        $("#chk-" + CodHijo3).removeAttr("checked");
                                        $("#chk-" + CodHijo3).attr("estAnterior", "2");
                                        //--
                                        $("#chkIns-" + CodHijo3).removeAttr("checked");
                                        $("#chkAct-" + CodHijo3).removeAttr("checked");
                                        $("#chkEli-" + CodHijo3).removeAttr("checked");
                                        $("#chkExp-" + CodHijo3).removeAttr("checked");
                                        $("#chkImp-" + CodHijo3).removeAttr("checked");
                                        $("#chkIns-" + CodHijo3).attr("disabled", "disabled");
                                        $("#chkAct-" + CodHijo3).attr("disabled", "disabled");
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
            if ((activarAccesoDashMov == true || activarAccesoDashEmpl == true || activarAccesoConsultas == true ? true : false) == true) {
                $("#AccordionJQ1").find('h3').filter(':contains(Tipo de Grupo por Perfil)').show();
                if (activarAccesoDashMov == true) {
                    $("#dvDashboardMovil").show();
                    $("#lblDashMovil").html(textDashMov);
                } else {
                    $("#dvDashboardMovil").hide();
                }
                if (activarAccesoDashEmpl == true) {
                    $("#dvDashboardEmpleado").show();
                    $("#LblDashEmpleado").html(textDashEmpl);
                } else {
                    $("#dvDashboardEmpleado").hide();
                }
                if (activarAccesoConsultas == true) {
                    $("#dvAnalisisConsumo").show();
                    $("#LblConsumo").html("Analisis Consumo");
                } else {
                    $("#dvAnalisisConsumo").hide();
                }
            } else {
                $("#AccordionJQ1").find('h3').filter(':contains(Tipo de Grupo por Perfil)').hide();
            }
        });

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

    // ===========================================================================================================================
    // GUARDAR
    // ===========================================================================================================================
    $("#btnGuardar").live("click", function () {

        BloquearPagina(true);
    
        var APR_Perfil = new apr_Perfil();

        if ($("#hdfCodigo").val() == "") {
            APR_Perfil.IdPerfil = "-1";          
        }
        else {
            APR_Perfil.IdPerfil = $("#hdfCodigo").val();
        }

        APR_Perfil.Nombre = $("#txtNombre").val().replace(/\\/g, "");
        APR_Perfil.Nombre = $.trim(APR_Perfil.Nombre.replace(/'/g, ""));

        if (APR_Perfil.Nombre == "") {
            alertaExterna("El nombre del Perfil es un campo obligatorio");
            $("#txtNombre").val('');
            BloquearPagina(false);
            $("#txtNombre").focus();
            return;
        }

        var oPerfil = JSON.stringify(APR_Perfil);

        //NUEVO GUARDAR
        var XML_Producto = "<?xml version=\"1.0\" encoding=\"iso-8859-1\"?><TABLE>";
        var XML_Modulo = "<?xml version=\"1.0\" encoding=\"iso-8859-1\"?><TABLE>";
        var XML_Opcion = "<?xml version=\"1.0\" encoding=\"iso-8859-1\"?><TABLE>";
        var XML_Item = "<?xml version=\"1.0\" encoding=\"iso-8859-1\"?><TABLE>";

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
                var chkIns = 0, chkAct = 0, chkEli = 0, chkExp = 0, chkImp = 0;
                if (rowSelected.esAdmLista == "True" && rowSelected.inNumNod == "0") {
                    chkIns = ($("#chkIns-" + idRow).is(":checked")) ? 1 : 0;
                    chkAct = ($("#chkAct-" + idRow).is(":checked")) ? 1 : 0;
                    chkEli = ($("#chkEli-" + idRow).is(":checked")) ? 1 : 0;
                    chkExp = ($("#chkExp-" + idRow).is(":checked")) ? 1 : 0;
                    chkImp = ($("#chkImp-" + idRow).is(":checked")) ? 1 : 0;
                }

                //Productos
                //if (rowSelected.inNivel == 0) {
                //    XML_Producto += '<PRODUCTO F_inPer=\"' + idPer + '\" F_inProd=\"' + id + '\" btIns=\"' + chkIns + '\" btAct=\"' + chkAct
                //    XML_Producto += '\" btEli=\"' + chkEli + '\" btExp=\"' + chkExp + '\" btImp=\"' + chkImp + '"\ />'
                //}
                //Modulo
                if (rowSelected.inNivel == 0) {
                    XML_Modulo += '<MODULO IdPerfil=\"' + idPer + '\" IdModulo=\"' + id + '\" btIns=\"' + chkIns + '\" btAct=\"' + chkAct
                    XML_Modulo += '\" btEli=\"' + chkEli + '\" btExp=\"' + chkExp + '\" btImp=\"' + chkImp + '"\ />'
                }
                //Opcion
                if (rowSelected.inNivel == 1) {
                    XML_Opcion += '<OPCION IdPerfil=\"' + idPer + '\" IdOpcion=\"' + id + '\" btIns=\"' + chkIns + '\" btAct=\"' + chkAct
                    XML_Opcion += '\" btEli=\"' + chkEli + '\" btExp=\"' + chkExp + '\" btImp=\"' + chkImp + '"\ />'
                }
                //Item
                //if (rowSelected.inNivel == 3) {
                //    XML_Item += '<ITEM F_inPer=\"' + idPer + '\" F_inIte=\"' + id + '\" btIns=\"' + chkIns + '\" btAct=\"' + chkAct
                //    XML_Item += '\" btEli=\"' + chkEli + '\" btExp=\"' + chkExp + '\" btImp=\"' + chkImp + '"\ />'
                //}
            }
        });

        XML_Producto += "</TABLE>";
        XML_Modulo += "</TABLE>";
        XML_Opcion += "</TABLE>";
        XML_Item += "</TABLE>";

        if (contadorAccesos == 0) {
            alertaExterna("Debe seleccionar por lo menos un acceso");
            BloquearPagina(false);
            return;
        }

        $.ajax({
            type: "POST",
            url: "Mnt_Perfil.aspx/GuardarTodo",
            data: "{'oPerfil': '" + oPerfil + "'," +
                    "'XML_Producto': '" + XML_Producto + "'," +
                    "'XML_Modulo': '" + XML_Modulo + "'," +
                    "'XML_Opcion': '" + XML_Opcion + "'," +
                    "'XML_Item':'" + XML_Item + "'," +
                    "'prIdTemporizador':'0' }",
            //"','pNodosSeleccionadosUsu':'" + nodosSeleccionadosUsu + "'}",

            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                if (result.d == "0") {
                    window.parent.ActualizarGrilla();
                    esNuevo = ($("#hdfCodigo").val() == '') ? true : false;
                    Mensaje("<br/><h1>Perfil guardado</h1><br/><h2>" + APR_Perfil.Nombre + "</h2>", document, CerroMensaje);

                    $("#hdfCodigo").val(result.d);
                } else {
                    alertaExterna("El Nombre del Perfil ya ha sido Registrado Anteriormente, no se pudo Grabar el Registro");
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

    $("#btnAgregar").live("click", function () {
        $("#bpBusquedaUsuarios_imgBusqueda").click();
    });

    $("#btnBusquedaUsuario").live("click", function () {
        $("#tbUsuarios").trigger("reloadGrid");
    });

    $("#btnEliminar").live("click", function () {
        var inCodUsu = tbUsuarios.getGridParam('selrow');
        if (inCodUsu == null || inCodUsu == undefined || inCodUsu == '') {
            alertaExterna("Seleccione un usuario.");
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


        }
    });

    $('#grid').jqGrid({
        sortable: true,
        datatype: BuscarUsuario,
        jsonReader:
                      {
                          root: 'Items',
                          page: 'PaginaActual',
                          total: 'TotalPaginas',
                          records: 'TotalRegistros',
                          repeatitems: true,
                          cell: 'Row',
                          IdEquipo: 'IdEquipo'
                      },
        colModel: [{ name: 'IdUsuario', index: 'IdUsuario', label: 'IdUsuario', hidden: true, width: 60 },
                    { name: 'Nombre', index: 'Nombre', label: 'Nombre Usuario', width: 60 },
                    { name: 'Usuario', index: 'Usuario', label: 'Usuario' },
                 ],
        pager: '#pager',
        loadtext: 'Cargando datos...',
        recordtext: '{0} - {1} de {2} elementos',
        emptyrecords: 'No hay resultados',
        pgtext: 'Pág: {0} de {1}',
        rowNum: 10,
        rowList: [10, 20, 30],
        viewrecords: true,
        multiselect: false,
        sortorder: "asc",
        width: 450,
        height: '255',
        rownumbers: true,

        onSelectRow: function (id) {
            IdEquipo = id;
        },
        ondblClickRow: function (id) {
            IdEquipo = id;
            $('#btnAddUsuario').click();
        }


    }).navGrid('#pager', { edit: false, add: false, search: false, del: false });


    $("#btnAgregar").click(function () {

        $('#grid').trigger('reloadGrid');


        var dlgusuarios = $('#div_modal_Usuario').dialog({
            title: 'Búsqueda Usuario',
            width: 470,
            height: 420,
            modal: true,
            resizable: false,
            position: ['center'],
            autoOpen: true
        });

    });

    $('#btnAddUsuario').live('click', function () {

        var id = $("#grid").jqGrid('getGridParam', 'selrow');

        if (id) {
            var datos = $("#grid").jqGrid('getRowData', id);
            var Iduser = datos['IdUsuario'];
            var NombreUser = datos['Nombre'];

            ProcesarUsuario($("#hdfCodigo").val(), Iduser, true);

            $('#div_modal_Usuario').dialog('close');
           
        }
        else {
            alert('Seleccione un registro'); return;
        }

    });

    $('#btnCancelar').live('click', function () {
        $('#div_modal_Usuario').dialog('close');
    });

    $('#txtbusqueda').keydown(function (event) {
        buscarValor = $('#txtbusqueda').val();
        $('#grid').trigger('reloadGrid');
    });

});


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
            var textResultado = ''
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
                    alertaExterna("No puede eliminar usuario porque tiene solicitud asignadas aún en estado \"En Proceso\".");
                } else if (result.d == "3") {
                    alertaExterna("No puede eliminar usuario porque es <b>Técnico Responsable</b> de un tipo de solicitud.");
                } else if (result.d == "4") {
                    alertaExterna("No puede eliminar usuario porque es <b>Responsable De Aprobación</b> de un tipo de solicitud.");
                } else {
                    alertaExterna("Problema el intentar eliminar el usuario, vuelva a intentarlo en unos instantes.");
                }
            }
            tbUsuarios.trigger("reloadGrid");
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
}

function activarCheckOpciones(codRow) {
    $("#chkIns-" + codRow).removeAttr("disabled");
    $("#chkAct-" + codRow).removeAttr("disabled");
    $("#chkEli-" + codRow).removeAttr("disabled");
    $("#chkExp-" + codRow).removeAttr("disabled");
    $("#chkImp-" + codRow).removeAttr("disabled");
}

function desactivarCheckOpciones(codRow) {
    $("#chkIns-" + codRow).removeAttr("checked");
    $("#chkAct-" + codRow).removeAttr("checked");
    $("#chkEli-" + codRow).removeAttr("checked");
    $("#chkExp-" + codRow).removeAttr("checked");
    $("#chkImp-" + codRow).removeAttr("checked");
    $("#chkIns-" + codRow).attr("disabled", "disabled");
    $("#chkAct-" + codRow).attr("disabled", "disabled");
    $("#chkEli-" + codRow).attr("disabled", "disabled");
    $("#chkExp-" + codRow).attr("disabled", "disabled");
    $("#chkImp-" + codRow).attr("disabled", "disabled");
}

function desactivarChekAccesos(data) {
    //técnico de solicitud (desactivar check de accesos)
    if ($("#hdfCodigo").val() == "42") {
        $(".chkAcceso").attr("disabled", "disabled");
        $(".chkIns").attr("disabled", "disabled");
        $(".chkAct").attr("disabled", "disabled");
        $(".chkEli").attr("disabled", "disabled");
        $(".chkExp").attr("disabled", "disabled");
        $(".chkImp").attr("disabled", "disabled");

        //JHERRERA 20141006: Se quitó inhabilitaciones de opciones específicas
        //---------------------------------------------------------------------------------




    }
}

function BuscarUsuario() {

    $.ajax({
        url: "Mnt_Perfil.aspx/BuscarUsuarioPerfil",

          data: "{'filtro':'" + buscarValor.replace(/'/g, '&#39') + "'," +
                 "'IdPerfil':" + $("#hdfCodigo").val() + "," +
                 "'campoordenar':'" + $('#grid').getGridParam("sortname") + "'," +
                 "'orden':'" + $('#grid').getGridParam("sortorder") + "'," +
                 "'inPagTam':'" + $('#grid').getGridParam('rowNum') + "'," +
                 "'inPagAct':'" + parseInt($('#grid').getGridParam('page')) + "'}",

        dataType: 'json',
        type: 'post',
        contentType: 'application/json; charset=utf-8',
        success: function (result) {

            $('#grid').jqGrid('clearGridData');
            if (result.d.Items.length > 0) {
                $('#grid')[0].addJSONData(result.d);
            }

            //                indexcombo = $("#ddlEquipo option:selected").index();
            //                $("#grid").jqGrid('setSelection', indexcombo+1, true);
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
}