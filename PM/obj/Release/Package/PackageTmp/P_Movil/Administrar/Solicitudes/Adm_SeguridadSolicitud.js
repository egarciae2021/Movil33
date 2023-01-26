var MargenFiltro = 0; var MargenHeight = 48; var nuAltoFila = 23.04; var vcTipSel = "TipoSolicitud"; var vcTipSubSel = "Tecnico";
var vcIdBusqueda = "";
var idSetInterval;
var idSetIntervalFilas;
var XMLUsuGruTipSol = "";
var XMLAreaTecnico = "";
var biSubOpcHab;

var totalChecks;
var totalChkLeer, totalChkCrear, totalChkEditar, totalChkEliminar;

var busquedaorga = 1;
var cnt_orga = 0;
var roweliminar = -1;
var tbGridSolicitudesArea;

$(function () {
    $('#bpTecnico_txtValorBusqueda').hide();
    $('#bpTecnico_imgBusqueda').hide();
    $('#bpGrupo_txtValorBusqueda').hide();
    $('#bpGrupo_imgBusqueda').hide();

    $("#rbtSubSelTecnico").attr('disabled', 'disabled');
    $("#rbtSubSelGrupo").attr('disabled', 'disabled');
    $('#rbtSubSelTecnico').prop('checked', false);
    $('#rbtSubSelGrupo').prop('checked', false);
    $('#rbtTipoSolicitud').prop('checked', true);
    $('#rbtTipoSolicitud').click();

    //$("#ddlTipo").attr('disabled', 'disabled'); //Agregado Jcamacho 2015/09/09

    $("#btnQuitaArea").click(function () {
        if (roweliminar > -1) {
            $('#tbGridSolicitudesArea').jqGrid('delRowData', roweliminar);
            cnt_orga--;
            roweliminar = -1;
        } else {
            alerta("Seleccione un área para desasociar", "Usuario", null, "warning");
        }

    });

    fnDeshabilitarCheckboxTodos();

    $("#btnGuardar").button("option", "disabled", true);

    $("#rbtTipoSolicitud,#rbtTecnico,#rbtGrupo").change(function () {
        if ($('#rbtTipoSolicitud').is(':checked')) {
            $('#bpTecnico_txtValorBusqueda').hide();
            $('#bpTecnico_txtValorBusqueda').val("");
            $('#bpTecnico_imgBusqueda').hide();
            $('#bpGrupo_txtValorBusqueda').hide();
            $('#bpGrupo_txtValorBusqueda').val("");
            $('#bpGrupo_imgBusqueda').hide();
            $('#bpTipoSolicitud_txtValorBusqueda').show();
            $('#bpTipoSolicitud_imgBusqueda').show();

            $('#lblTipoSeleccion').html("Tipo de Solicitud");
            vcTipSel = 'TipoSolicitud';
            vcTipSubSel = "Tecnico";
            $("#tbGrid").setCaption('Técnicos');
            fnLimpiarCheckboxTodos();
            fnMostrarDatos("");
            fnTitulosTecnico();

            $('#dvTecnicoSolicitud').hide();
        }
        else if ($('#rbtTecnico').is(':checked')) {
            $('#bpTecnico_txtValorBusqueda').show();
            $('#bpTecnico_imgBusqueda').show();
            $('#bpGrupo_txtValorBusqueda').hide();
            $('#bpGrupo_txtValorBusqueda').val("");
            $('#bpGrupo_imgBusqueda').hide();
            $('#bpTipoSolicitud_txtValorBusqueda').hide();
            $('#bpTipoSolicitud_txtValorBusqueda').val("");
            $('#bpTipoSolicitud_imgBusqueda').hide();

            $('#lblTipoSeleccion').html("Especialista");
            vcTipSel = 'Tecnico';
            $("#tbGrid").setCaption('Tipos de Solicitud');
            fnLimpiarCheckboxTodos();
            fnMostrarDatos("");
            fnTitulosTecnico();

            $('#dvTecnicoSolicitud').hide();
        }
        else if ($('#rbtGrupo').is(':checked')) {
            $('#bpTecnico_txtValorBusqueda').hide();
            $('#bpTecnico_txtValorBusqueda').val("");
            $('#bpTecnico_imgBusqueda').hide();
            $('#bpGrupo_txtValorBusqueda').show();
            $('#bpGrupo_imgBusqueda').show();
            $('#bpTipoSolicitud_txtValorBusqueda').hide();
            $('#bpTipoSolicitud_txtValorBusqueda').val("");
            $('#bpTipoSolicitud_imgBusqueda').hide();

            $('#lblTipoSeleccion').html("Grupo");
            vcTipSel = 'Grupo';
            $("#tbGrid").setCaption('Tipos de Solicitud');
            fnLimpiarCheckboxTodos();
            fnMostrarDatos("");
            fnTitulosGrupo();

            $('#dvTecnicoSolicitud').hide();
        }

        fnHabilitarDeshabilitarSubOpciones();
    });

        function fnHabilitarDeshabilitarSubOpciones() {
        if ($('#rbtTipoSolicitud').is(':checked')) {
            $('#rbtSubSelTecnico').prop("disabled", false);
            $('#rbtSubSelGrupo').prop("disabled", false);
            $('#rbtSubSelTecnico').prop('checked', true);
            $('#rbtSubSelGrupo').prop('checked', false);
            $("#ddlTipo").attr('disabled', false); //Agregado Jcamacho 2015/09/09
        }
        else if ($('#rbtTecnico').is(':checked')) {
            $("#rbtSubSelTecnico").attr('disabled', 'disabled');
            $("#rbtSubSelGrupo").attr('disabled', 'disabled');
            $('#rbtSubSelTecnico').prop('checked', false);
            $('#rbtSubSelGrupo').prop('checked', false);
            $("#ddlTipo").val("1");
            $("#ddlTipo").attr('disabled', 'disabled'); //Agregado Jcamacho 2015/09/09
        }
        else if ($('#rbtGrupo').is(':checked')) {
            $('#rbtSubSelTecnico').prop('checked', false);
            $('#rbtSubSelGrupo').prop('checked', false);
            $("#rbtSubSelTecnico").attr('disabled', 'disabled');
            $("#rbtSubSelGrupo").attr('disabled', 'disabled');
            $("#ddlTipo").val("1");
            $("#ddlTipo").attr('disabled', 'disabled'); //Agregado Jcamacho 2015/09/09
        }
    }

    $("#ddlTipo").change(function () {
        $('#bpTipoSolicitud_txtValorBusqueda').val("");
        if ($("#ddlTipo").val() == "1") {

            $("#tbGrid").setCaption('Técnicos');
            $('#bpTecnico_txtValorBusqueda').val("");
            vcTipSubSel = "Tecnico";
            fnLimpiarCheckboxTodos();
            fnMostrarDatos("");
            fnTitulosTecnico();
        }
        else if ($("#ddlTipo").val() == "2") {

            $("#tbGrid").setCaption('Grupos');
            $('#bpTecnico_txtValorBusqueda').val("");
            vcTipSubSel = "Grupo";
            fnLimpiarCheckboxTodos();
            fnMostrarDatos("");
            fnTitulosGrupo();

        }
        else {
            $('#rbtSubSelTecnico').prop('checked', true);
            $('#rbtSubSelGrupo').prop('checked', false);

            $("#tbGrid").setCaption('nada');
            $('#bpTecnico_txtValorBusqueda').val("");
            vcTipSubSel = "";
            fnLimpiarCheckboxTodos();
            fnMostrarDatos("");
            fnTitulosTecnico();
        }

    });
    $("#rbtSubSelTecnico,#rbtSubSelGrupo").change(function () {
        if ($('#rbtSubSelTecnico').is(':checked')) {
            $("#tbGrid").setCaption('Técnicos');
            $('#bpTecnico_txtValorBusqueda').val("");
            vcTipSubSel = "Tecnico";
            fnLimpiarCheckboxTodos();
            fnMostrarDatos("");
            fnTitulosTecnico();
        } else if ($('#rbtSubSelGrupo').is(':checked')) {
            $("#tbGrid").setCaption('Grupos');
            $('#bpTecnico_txtValorBusqueda').val("");
            vcTipSubSel = "Grupo";
            fnLimpiarCheckboxTodos();
            fnMostrarDatos("");
            fnTitulosGrupo();
        }
    });
    var lstFilas;

    tbGridSolicitudesArea = $("#tbGridSolicitudesArea").jqGrid({
        sortable: true,
        datatype: function () {
            $.ajax({
                url: "Adm_SeguridadSolicitud.aspx/ListarAreas", //PageMethod
                data: "{'vcIdUsuario':'" + vcIdBusqueda + "'}",
                dataType: "json",
                type: "post",
                contentType: "application/json; charset=utf-8",
                //async: false,
                success: function (result) {
                    //debugger;
                    lstFilas = result.d;
                    cnt_orga = lstFilas.length;
                    tbGridSolicitudesArea.jqGrid('clearGridData');
                    if (lstFilas.length > 0) {
                        j = 0;
                        idSetIntervalFilas = setInterval(function () {
                            tbGridSolicitudesArea.jqGrid('addRowData', j, lstFilas[j]);

                            j = j + 1;
                            if (j == $(lstFilas).length) {
                                clearInterval(idSetIntervalFilas);
                                fnVerificarCheckTodos();
                            }
                        }, 1);

                    } else {
                        //fnDeshabilitarCheckboxTodos();
                        //$("#tbGridSolicitudesArea").setGridHeight(0);
                    }
                },
                error: function (xhr, err, thrErr) {
                    MostrarErrorAjax(xhr, err, thrErr);
                }
            });
        },
        jsonReader: //Set the jsonReader to the JQGridJSonResponse squema to bind the data.
                {
                    root: "Items",
                    page: "PaginaActual",
                    total: "TotalPaginas",
                    records: "TotalRegistros",
                    repeatitems: true,
                    cell: "Row",
                    id: "inCodint"
                },
        colModel: [{ name: 'inCodint', Campo: 'inCodint', label: 'inCodint', hidden: true, width: 50, key: true },
                   { name: 'vcCodint', Campo: 'vcCodint', label: 'vcCodint', hidden: true, width: 50 },
                   { name: 'vcCodorg', Campo: 'vcCodorg', label: 'Cód. Area', hidden: false, width: 150 },
                   { name: 'vcNomorg', Campo: 'vcNomorg', label: 'Nombre Area', hidden: false, width: 250 }

        ],
        titulo: 'Área',
        loadtext: 'Cargando datos...',
        emptyrecords: 'No hay resultados',
        sortname: "Idd", //sortname: idTabla, //Default SortColumn
        sortorder: "asc", //Default SortOrder.
        height: "auto",
        width: "450",
        rownumbers: true,
        shrinkToFit: false,
        caption: "Áreas asociadas",
        beforeSelectRow: function (rowid, e) {
            roweliminar = parseInt(rowid);
            return true;
        }
    });


    var tbGrid = $("#tbGrid").jqGrid({
        sortable: true,
        datatype: function () {
            $.ajax({
                url: "Adm_SeguridadSolicitud.aspx/Listar", //PageMethod
                data: "{'vcTipSel':'" + vcTipSel + "'," +
                      "'vcTipSubSel':'" + vcTipSubSel + "'," +
                      "'vcIdTipSel':'" + vcIdBusqueda + "'}",
                dataType: "json",
                type: "post",
                contentType: "application/json; charset=utf-8",
                success: function (result) {

                    lstFilas = result.d;
                    tbGrid.jqGrid('clearGridData');
                    if (lstFilas.length > 0) {
                        fnHabilitarCheckboxTodos();

                        var vcLinea = lstFilas[0].vcLinea; //Agregado jcamacho 2015/09/09
                        if (vcLinea != undefined && $("#rbtGrupo").is(':checked') == true) {
                            $("#tbGrid").setCaption('Tipos de Solicitud - ' + vcLinea);
                            var nombreGrupo = $("#bpGrupo_txtValorBusqueda").val();
                            $("#bpGrupo_txtValorBusqueda").val(nombreGrupo + ' (' + vcLinea + ')');
                        }

                        else if (vcLinea != undefined && $("#rbtTipoSolicitud").is(':checked') == true) {
                            $("#tbGrid").setCaption('Grupos - ' + vcLinea);
                            var nombreGrupo = $("#bpTipoSolicitud_txtValorBusqueda").val();
                            $("#bpTipoSolicitud_txtValorBusqueda").val(nombreGrupo + ' (' + vcLinea + ')');
                        }

                        $("#tbGrid").setGridHeight($(window).height() - 260);

                        j = 0;

                        //agregado - 14/05/2014 - wapumayta
                        totalChecks = $(lstFilas).length;
                        totalChkLeer = totalChecks; totalChkCrear = totalChecks; totalChkEditar = totalChecks; totalChkEliminar = totalChecks;

                        idSetIntervalFilas = setInterval(function () {
                            tbGrid.jqGrid('addRowData', j, lstFilas[j]);

                            //comentado 14/05/2014 - wapumayta
                            //if (lstFilas[j] != undefined) {
                            //    if ($("#chkTodosLeer").is(':checked') == true)
                            //        $("#chkLeer_" + lstFilas[j].IdTipSel)[0].checked = true;
                            //    if ($("#chkTodosCrear").is(':checked') == true)
                            //        $("#chkCrear_" + lstFilas[j].IdTipSel)[0].checked = true;
                            //    if ($("#chkTodosEditar").is(':checked') == true)
                            //        $("#chkEditar_" + lstFilas[j].IdTipSel)[0].checked = true;
                            //    if ($("#chkTodosEliminar").is(':checked') == true)
                            //        $("#chkEliminar_" + lstFilas[j].IdTipSel)[0].checked = true;
                            //}

                            //agregado - 14/05/2014 - wapumayta
                            if (lstFilas[j] != undefined) {
                                if ($("#chkLeer_" + lstFilas[j].IdTipSel)[0].checked == false)
                                    totalChkLeer = totalChkLeer - 1;
                                if ($("#chkCrear_" + lstFilas[j].IdTipSel)[0].checked == false)
                                    totalChkCrear = totalChkCrear - 1;
                                if ($("#chkEditar_" + lstFilas[j].IdTipSel)[0].checked == false)
                                    totalChkEditar = totalChkEditar - 1;
                                if ($("#chkEliminar_" + lstFilas[j].IdTipSel)[0].checked == false)
                                    totalChkEliminar = totalChkEliminar - 1;
                            }

                            j = j + 1;
                            if (j == $(lstFilas).length) {
                                clearInterval(idSetIntervalFilas);
                                fnVerificarCheckTodos();
                            }
                        }, 1);

                    } else {
                        fnDeshabilitarCheckboxTodos();
                        $("#tbGrid").setGridHeight(0);
                    }

                    if ($(result.d).length > 0) {
                        $("#btnGuardar").button("option", "disabled", false);

                    } else {
                        $("#btnGuardar").button("option", "disabled", true);
                    }
                },
                error: function (xhr, err, thrErr) {
                    MostrarErrorAjax(xhr, err, thrErr);
                }
            });
        },
        jsonReader: //Set the jsonReader to the JQGridJSonResponse squema to bind the data.
                {
                root: "Items",
                page: "PaginaActual",
                total: "TotalPaginas",
                records: "TotalRegistros",
                repeatitems: true,
                cell: "Row",
                id: "P_inCodSol"
            },
        colModel: [{ name: 'IdTipSel', Campo: 'IdTipSel', label: 'IdTipSel', hidden: true, width: 50, key: true },
                            { name: 'vcNomTipSel', Campo: 'vcNomTipSel', label: 'Descripción', hidden: false, width: 300 },
                            { name: 'chkLeer', index: 'chkLeer', label: ' ', hidden: false, width: 55, align: 'center', editable: true, sortable: false,
                                formatter: function (value, options, rData) {
                                    if (rData.biLeer == "True") {
                                        return "<input id='chkLeer_" + rData.IdTipSel + "' type='checkbox' class='HabilitarLeer' checked='checked' " + rData.vcDisabled + "/>";
                                    } else {
                                        return "<input id='chkLeer_" + rData.IdTipSel + "' type='checkbox' class='HabilitarLeer' " + rData.vcDisabled + "/>";
                                    }
                                }
                            },
                            { name: 'chkCrear', index: 'chkCrear', label: ' ', hidden: false, width: 55, align: 'center', editable: true, sortable: false,
                                formatter: function (value, options, rData) {
                                    if (rData.biCrear == "True") {
                                        return "<input id='chkCrear_" + rData.IdTipSel + "' type='checkbox' class='HabilitarEditar chkCrear' checked='checked' " + rData.vcDisabled + "/>";
                                    } else {
                                        return "<input id='chkCrear_" + rData.IdTipSel + "' type='checkbox' class='HabilitarEditar chkCrear' " + rData.vcDisabled + "/>";
                                    }
                                }
                            },
                            { name: 'chkEditar', index: 'chkEditar', label: ' ', hidden: false, width: 55, align: 'center', editable: true, sortable: false,
                                formatter: function (value, options, rData) {
                                    if (rData.biEditar == "True") {
                                        return "<input id='chkEditar_" + rData.IdTipSel + "' type='checkbox' class='HabilitarEditar chkEditar' checked='checked' " + rData.vcDisabled + "/>";
                                    } else {
                                        return "<input id='chkEditar_" + rData.IdTipSel + "' type='checkbox' class='HabilitarEditar chkEditar' " + rData.vcDisabled + "/>";
                                    }
                                }
                            },
                            { name: 'chkEliminar', index: 'chkEliminar', label: ' ', hidden: false, width: 55, align: 'center', editable: true, sortable: false,
                                formatter: function (value, options, rData) {
                                    if (rData.biEliminar == "True") {
                                        return "<input id='chkEliminar_" + rData.IdTipSel + "' type='checkbox' class='HabilitarEditar chkEliminar' checked='checked' " + rData.vcDisabled + "/>";
                                    } else {
                                        return "<input id='chkEliminar_" + rData.IdTipSel + "' type='checkbox' class='HabilitarEditar chkEliminar' " + rData.vcDisabled + "/>";
                                    }
                                }
                            }
           	        ],
        titulo: 'Especialista',
        loadtext: 'Cargando datos...',
        emptyrecords: 'No hay resultados',
        sortname: "Idd", //sortname: idTabla, //Default SortColumn
        sortorder: "asc", //Default SortOrder.
        height: "auto",
        width: "600",
        rownumbers: true,
        shrinkToFit: false,
        caption: "Tipos de Solicitud",
        beforeSelectRow: function (rowid, e) {
            return false;
        }
    });

    $("#tbGrid_chkLeer").append("<span id='lblLeer'>Leer</span><br /><input type='checkbox' id='chkTodosLeer'/>");
    $("#tbGrid_chkCrear").append("<span id='lblCrear'>Crear</span><br /><input type='checkbox' id='chkTodosCrear' />");
    $("#tbGrid_chkEditar").append("<span id='lblEditar'>Editar</span><br /><input type='checkbox' id='chkTodosEditar' />");
    $("#tbGrid_chkEliminar").append("<span id='lblEliminar'>Eliminar</span><br /><input type='checkbox' id='chkTodosEliminar' />");

    fnTitulosTecnico();

    //inicioPagina();
    function inicioPagina() {
        DimPosElementos();
    }

    function DimPosElementos() {
        var Ancho = $(window).width();
        var Alto = $(window).height();
        var AnchoLateral = $(".LateralSplitter");

        $("#tbGrid").setGridHeight($(window).height() - 300);
    }

    function fnLimpiarCheckboxTodos() {
        $("#chkTodosLeer")[0].checked = false;
        $("#chkTodosCrear")[0].checked = false;
        $("#chkTodosEditar")[0].checked = false;
        $("#chkTodosEliminar")[0].checked = false;
    }

    function fnDeshabilitarCheckboxTodos() {
        $("#chkTodosLeer").prop('disabled', true);
        $("#chkTodosCrear").prop('disabled', true);
        $("#chkTodosEditar").prop('disabled', true);
        $("#chkTodosEliminar").prop('disabled', true);
    }

    function fnHabilitarCheckboxTodos() {
        if (vcTipSel == "Tecnico" && vcIdBusqueda == "1") {
            $("#chkTodosLeer").prop('disabled', true);
            $("#chkTodosCrear").prop('disabled', true);
            $("#chkTodosEditar").prop('disabled', true);
            $("#chkTodosEliminar").prop('disabled', true);
        } else {
            $("#chkTodosLeer").prop('disabled', false);
            $("#chkTodosCrear").prop('disabled', false);
            $("#chkTodosEditar").prop('disabled', false);
            $("#chkTodosEliminar").prop('disabled', false);
        }
    }

    $("#chkTodosLeer").change(function () {
        var vcIds = tbGrid.getDataIDs();

        if ($("#chkTodosLeer").is(':checked') == true) {
            for (i = 0; i < vcIds.length; i++) {
                var row = tbGrid.getRowData(vcIds[i]);
                $("#chkLeer_" + row.IdTipSel)[0].checked = true;
            }
            totalChkLeer = totalChecks;
        } else {
            for (i = 0; i < vcIds.length; i++) {
                var row = tbGrid.getRowData(vcIds[i]);

                var biEditarC = "0";
                if ($("#chkCrear_" + row.IdTipSel).is(':checked') == true) {
                    biEditarC = "1";
                }
                if ($("#chkEditar_" + row.IdTipSel).is(':checked') == true) {
                    biEditarC = "1";
                }
                if ($("#chkEliminar_" + row.IdTipSel).is(':checked') == true) {
                    biEditarC = "1";
                }
                if (biEditarC == "1") {
                    $("#chkLeer_" + row.IdTipSel)[0].checked = true;
                } else {
                    $("#chkLeer_" + row.IdTipSel)[0].checked = false;
                    totalChkLeer = totalChkLeer - 1;
                }
            }
        }

        fnVerificarCheckTodos();
    });
    $("#chkTodosCrear").change(function () {
        var vcIds = tbGrid.getDataIDs();

        if ($("#chkTodosCrear").is(':checked') == true) {
            for (i = 0; i < vcIds.length; i++) {
                var row = tbGrid.getRowData(vcIds[i]);
                $("#chkCrear_" + row.IdTipSel)[0].checked = true;
            }
            totalChkCrear = totalChecks;
            for (i = 0; i < vcIds.length; i++) {
                var row = tbGrid.getRowData(vcIds[i]);
                $("#chkLeer_" + row.IdTipSel)[0].checked = true;
            }
            totalChkLeer = totalChecks;
        } else {
            var inCanIna = 0;
            for (i = 0; i < vcIds.length; i++) {
                var row = tbGrid.getRowData(vcIds[i]);
                if (vcTipSel == "TipoSolicitud" && vcTipSubSel == "Tecnico" && row.IdTipSel == "1") {
                    $("#chkCrear_" + row.IdTipSel)[0].checked = true;
                    inCanIna = inCanIna + 1;
                } else
                    $("#chkCrear_" + row.IdTipSel)[0].checked = false;
            }
            totalChkCrear = 0 + inCanIna;
        }
        fnVerificarCheckTodos();
    });
    $("#chkTodosEditar").change(function () {
        var vcIds = tbGrid.getDataIDs();

        if ($("#chkTodosEditar").is(':checked') == true) {
            for (i = 0; i < vcIds.length; i++) {
                var row = tbGrid.getRowData(vcIds[i]);
                $("#chkEditar_" + row.IdTipSel)[0].checked = true;
            }
            totalChkEditar = totalChecks;
            for (i = 0; i < vcIds.length; i++) {
                var row = tbGrid.getRowData(vcIds[i]);
                $("#chkLeer_" + row.IdTipSel)[0].checked = true;
            }
            totalChkLeer = totalChecks;
        } else {
            var inCanIna = 0;
            for (i = 0; i < vcIds.length; i++) {
                var row = tbGrid.getRowData(vcIds[i]);
                if (vcTipSel == "TipoSolicitud" && vcTipSubSel == "Tecnico" && row.IdTipSel == "1") {
                    $("#chkEditar_" + row.IdTipSel)[0].checked = true;
                    inCanIna = inCanIna + 1;
                } else
                    $("#chkEditar_" + row.IdTipSel)[0].checked = false;
            }
            totalChkEditar = 0 + inCanIna;
        }
        fnVerificarCheckTodos();
    });
    $("#chkTodosEliminar").change(function () {
        var vcIds = tbGrid.getDataIDs();

        if ($("#chkTodosEliminar").is(':checked') == true) {
            for (i = 0; i < vcIds.length; i++) {
                var row = tbGrid.getRowData(vcIds[i]);
                $("#chkEliminar_" + row.IdTipSel)[0].checked = true;
            }
            totalChkEliminar = totalChecks;
            for (i = 0; i < vcIds.length; i++) {
                var row = tbGrid.getRowData(vcIds[i]);
                $("#chkLeer_" + row.IdTipSel)[0].checked = true;
            }
            totalChkLeer = totalChecks;
        } else {
            var inCanIna = 0;
            for (i = 0; i < vcIds.length; i++) {
                var row = tbGrid.getRowData(vcIds[i]);
                if (vcTipSel == "TipoSolicitud" && vcTipSubSel == "Tecnico" && row.IdTipSel == "1") {
                    $("#chkEliminar_" + row.IdTipSel)[0].checked = true;
                    inCanIna = inCanIna + 1;
                } else
                    $("#chkEliminar_" + row.IdTipSel)[0].checked = false;
            }
            totalChkEliminar = 0 + inCanIna;
        }
        fnVerificarCheckTodos();
    });

    $(".HabilitarLeer").live("click", function () {
        var vcIdControl = $(this).attr('id');
        var vcIdTipSel = vcIdControl.substring(vcIdControl.indexOf("_") + 1);
        var biEditar = "0";

        if ($("#" + vcIdControl).is(':checked') == false) {
            if ($("#chkCrear_" + vcIdTipSel).is(':checked') == true) {
                biEditar = "1";
            }
            if ($("#chkEditar_" + vcIdTipSel).is(':checked') == true) {
                biEditar = "1";
            }
            if ($("#chkEliminar_" + vcIdTipSel).is(':checked') == true) {
                biEditar = "1";
            }
            if (biEditar == "1") {
                $("#chkLeer_" + vcIdTipSel)[0].checked = true;
            } else {
                totalChkLeer = totalChkLeer - 1;
            }
        } else {
            totalChkLeer = totalChkLeer + 1;
        }

        fnVerificarCheckTodos();
    });

    $(".HabilitarEditar").live("click", function () {
        var vcIdControl = $(this).attr('id');
        var vcIdTipSel = vcIdControl.substring(vcIdControl.indexOf("_") + 1);

        if ($("#" + vcIdControl).is(':checked')) {
            if ($("#chkLeer_" + vcIdTipSel)[0].checked != true) {
                $("#chkLeer_" + vcIdTipSel)[0].checked = true;
                totalChkLeer = totalChkLeer + 1;
            }

            if ($(this).hasClass("chkCrear")) {
                totalChkCrear = totalChkCrear + 1;
            }
            if ($(this).hasClass("chkEditar")) {
                totalChkEditar = totalChkEditar + 1;
            }
            if ($(this).hasClass("chkEliminar")) {
                totalChkEliminar = totalChkEliminar + 1;
            }
        } else {
            if ($(this).hasClass("chkCrear")) {
                totalChkCrear = totalChkCrear - 1;
            }
            if ($(this).hasClass("chkEditar")) {
                totalChkEditar = totalChkEditar - 1;
            }
            if ($(this).hasClass("chkEliminar")) {
                totalChkEliminar = totalChkEliminar - 1;
            }
        }

        fnVerificarCheckTodos();
    });

    $("#btnAgregarOrga2").click(function () {
        //debugger;
        busquedaorga = 2;
        var Alto = $(window).height();
        var $width = 740;
        var $height = 525;
        if (Alto < 500) {
            $height = Alto - 20;
            $width = 750;
        }

        var $Pagina = '../../../P_Movil/Consultar/Con_SeleccionArea.aspx?Tipo=1&Multiple=1&UnPanel=1';
        $("#ifArea").attr("src", $Pagina);
        Modal = $('#dvArea').dialog({
            title: "Seleccionar área",
            width: $width,
            height: $height,
            modal: true
            //,resizable: false       
        });
    });

    $("#btnGuardar").click(function () {
        biSubOpcHab = "1";
        if ($('#rbtSubSelTecnico').is(':disabled')) {
            biSubOpcHab = "0";
        }

        if ($('#ddlTipo').is(':disabled')) {  //Agregado Jcamacho 2015/09/09
            biSubOpcHab = "0";
        }

        BloquearPagina(true);
        $("#dvProcesando").show();

        var vcIds = tbGrid.getDataIDs();
        var inSoloAsignacion = 0;
        XMLUsuGruTipSol = "<?xml version=\"1.0\" encoding=\"ISO-8859-1\"?><ROOT>";

        for (i = 0; i < vcIds.length; i++) {
            var row = tbGrid.getRowData(vcIds[i]);

            if ($("#chkLeer_" + row.IdTipSel)[0].checked == true && $("#chkCrear_" + row.IdTipSel)[0].checked == true && $("#chkEditar_" + row.IdTipSel)[0].checked == false &&
                    $("#chkEliminar_" + row.IdTipSel)[0].checked == false) {
                inSoloAsignacion = inSoloAsignacion + 1;
            }

            if ($("#chkLeer_" + row.IdTipSel)[0].checked == true || $("#chkCrear_" + row.IdTipSel)[0].checked == true || $("#chkEditar_" + row.IdTipSel)[0].checked == true ||
                    $("#chkEliminar_" + row.IdTipSel)[0].checked == true) {

                if (vcTipSel == "TipoSolicitud") {
                    if (vcTipSubSel == "Tecnico") {
                        XMLUsuGruTipSol += "<DATA F_inUsu=\"" + row.IdTipSel + "\" F_inTipSol=\"" + vcIdBusqueda + "\" biLeer=\"" + $("#chkLeer_" + row.IdTipSel)[0].checked + "\" biCrear=\"";
                        XMLUsuGruTipSol += $("#chkCrear_" + row.IdTipSel)[0].checked + "\" biEditar=\"" + $("#chkEditar_" + row.IdTipSel)[0].checked + "\" biEliminar=\"";
                        XMLUsuGruTipSol += $("#chkEliminar_" + row.IdTipSel)[0].checked + "\"/>";
                    } else if (vcTipSubSel == "Grupo") {
                        XMLUsuGruTipSol += "<DATA F_inGruOri=\"" + row.IdTipSel + "\" F_inTipSol=\"" + vcIdBusqueda + "\" biLeer=\"" + $("#chkLeer_" + row.IdTipSel)[0].checked + "\" biCrear=\"";
                        XMLUsuGruTipSol += $("#chkCrear_" + row.IdTipSel)[0].checked + "\" biEditar=\"" + $("#chkEditar_" + row.IdTipSel)[0].checked + "\" biEliminar=\"";
                        XMLUsuGruTipSol += $("#chkEliminar_" + row.IdTipSel)[0].checked + "\"/>";
                    }
                } else if (vcTipSel == "Tecnico") {
                    XMLUsuGruTipSol += "<DATA F_inUsu=\"" + vcIdBusqueda + "\" F_inTipSol=\"" + row.IdTipSel + "\" biLeer=\"" + $("#chkLeer_" + row.IdTipSel)[0].checked + "\" biCrear=\"";
                    XMLUsuGruTipSol += $("#chkCrear_" + row.IdTipSel)[0].checked + "\" biEditar=\"" + $("#chkEditar_" + row.IdTipSel)[0].checked + "\" biEliminar=\"";
                    XMLUsuGruTipSol += $("#chkEliminar_" + row.IdTipSel)[0].checked + "\"/>";
                } else if (vcTipSel == "Grupo") {
                    XMLUsuGruTipSol += "<DATA F_inGruOri=\"" + vcIdBusqueda + "\" F_inTipSol=\"" + row.IdTipSel + "\" biLeer=\"" + $("#chkLeer_" + row.IdTipSel)[0].checked + "\" biCrear=\"";
                    XMLUsuGruTipSol += $("#chkCrear_" + row.IdTipSel)[0].checked + "\" biEditar=\"" + $("#chkEditar_" + row.IdTipSel)[0].checked + "\" biEliminar=\"";
                    XMLUsuGruTipSol += $("#chkEliminar_" + row.IdTipSel)[0].checked + "\"/>";
                }
            }
        }
        XMLUsuGruTipSol += "</ROOT>";

        //Datos de AreaTecnico ***************************************************************************************************************************************
        
        if (vcTipSel == "Tecnico") {
            XMLAreaTecnico = "<?xml version=\"1.0\" encoding=\"ISO-8859-1\"?><ROOT>";
            var vcIds = tbGridSolicitudesArea.getDataIDs();
            for (i = 0; i < vcIds.length; i++) {
                var row = tbGridSolicitudesArea.getRowData(vcIds[i]);
                XMLAreaTecnico += "<DATA F_inUsu=\"" + vcIdBusqueda + "\" F_vcCodint=\"" + row.vcCodint + "\"/>";

            }
            XMLAreaTecnico += "</ROOT>";
        } else {
            XMLAreaTecnico = "";
        }
        //************************************************************************************************************************************************************


        if (((vcTipSel == "TipoSolicitud" && vcTipSubSel == "Tecnico") || (vcTipSel == "Tecnico")) && inSoloAsignacion > 0) {
            if (vcTipSel == "Tecnico")
                confirmacion("Existe uno o más tipos de solicitud que el especialista podrá asignar mas no procesar ni culminar. ¿Está seguro que desea grabar esta configuración?", fnGrabar, fnCancelar);
            else
                confirmacion("Existe uno o más especialista con permisos de asignar mas no procesar ni culminar. ¿Está seguro que desea grabar esta configuración?", fnGrabar, fnCancelar);
        } else {
            fnGrabar();
        }
    });

    function fnGrabar() {
        $.ajax({
            url: "Adm_SeguridadSolicitud.aspx/Grabar", //PageMethod
            data: "{'vcTipSel':'" + vcTipSel + "'," +
                  "'vcIdBusqueda':'" + vcIdBusqueda + "'," +
                  "'vcTipSubSel':'" + vcTipSubSel + "'," +
                  "'XMLAreaTecnico':'" + XMLAreaTecnico + "'," +
                  "'XMLUsuGruTipSol':'" + XMLUsuGruTipSol + "'}",
            dataType: "json",
            type: "post",
            contentType: "application/json; charset=utf-8",
            success: function (result) {

                if ($(result.d).length > 0)
                    $("#btnGuardar").button("option", "disabled", false);
                else
                    $("#btnGuardar").button("option", "disabled", true);

                //grupo comentado el 14/05/2014 - wapumayta
                //$('#lblTipoSeleccion').html("Técnico");
                //vcTipSel = 'Tecnico';
                //$("#tbGrid").setCaption('Tipos de Solicitud');

                fnLimpiarCheckboxTodos();
                fnMostrarDatos("");
                $('#bpGrupo_txtValorBusqueda').val("");
                $('#bpTipoSolicitud_txtValorBusqueda').val("");
                $('#bpTecnico_txtValorBusqueda').val("");

                Mensaje("<br/><h1>Configuración guardada.<br/>Para aplicar los cambios, debe volver a iniciar sesión.</h1><br/>", document);

                BloquearPagina(false);
                if (biSubOpcHab == "0") {
                    $('#rbtSubSelTecnico').prop("disabled", true);
                    $('#rbtSubSelGrupo').prop("disabled", true);
                    $("#ddlTipo").attr('disabled', 'disabled');
                }

                $("#dvProcesando").hide(100);
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
                BloquearPagina(false);
                $("#dvProcesando").hide(100);
            }
        });
    }

    $("#btnCerrar").click(function () {
        var Nametab = window.parent.tabschild[window.parent.tabPrincipal.tabs("option", "selected")].id;
        var Accord = window.parent.$("#" + Nametab);
        Accord.tabs("remove", Accord.tabs("option", "selected"));
    });

    function fnCancelar() {
        BloquearPagina(false);
    }
});

function fnMostrarDatos(valor) {
    //debugger;
    vcIdBusqueda = valor;
    $("#tbGrid").trigger("reloadGrid");
    
    if (vcTipSel == "Tecnico" && vcIdBusqueda != "") {
        $('#dvTecnicoSolicitud').show();
        $("#tbGridSolicitudesArea").trigger("reloadGrid");
    //    CargarGrillaAreasTecnico(vcIdBusqueda);
    } else {
        $('#dvTecnicoSolicitud').hide();
    //    tbGridSolicitudesArea.jqGrid('clearGridData');
    }
}

//agregado 14-05-2014 wapumayta
function fnVerificarCheckTodos() {
    if (totalChkLeer == totalChecks)
        $("#chkTodosLeer")[0].checked = true;
    else
        $("#chkTodosLeer")[0].checked = false;
    if (totalChkCrear == totalChecks)
        $("#chkTodosCrear")[0].checked = true;
    else
        $("#chkTodosCrear")[0].checked = false;
    if (totalChkEditar == totalChecks)
        $("#chkTodosEditar")[0].checked = true;
    else
        $("#chkTodosEditar")[0].checked = false;
    if (totalChkEliminar == totalChecks)
        $("#chkTodosEliminar")[0].checked = true;
    else
        $("#chkTodosEliminar")[0].checked = false;

    //alert(totalChkLeer + ", " + totalChkCrear + ", " + totalChkEditar + "," + totalChkEliminar);
}

function fnTitulosTecnico() {
    $("#lblCrear").text("Asignar");
    $("#lblEditar").text("Procesar");
    $("#lblEliminar").text("Anular");
}
function fnTitulosGrupo() {
    $("#lblCrear").text("Crear");
    $("#lblEditar").text("Editar");
    $("#lblEliminar").text("Eliminar");
}

function IngresarAreas(areas) {

    $(areas).each(function () {
        var Area = this;

        Area.vcCodInt = Area.P_inCodOrg;
        Area.P_inCodOrg = -1; // Area.vcNomOrg.split("=")[0];

        var codorg = Area.vcNomOrg.split("=")[0];
        var nomorg = Area.vcNomOrg.split("=")[1];

        var data = { inCodint: "0", vcCodint: Area.vcCodInt, vcCodorg: codorg, vcNomorg: nomorg, btQuitar: "True" };

        var existe = false;
        if (Area.vcCodInt != "" && Area.vcCodInt > -1) {
            var ids = $("#tbGridSolicitudesArea").jqGrid("getDataIDs");
            for (var i = 0; i < ids.length; i++) {
                var myRow = $("#tbGridSolicitudesArea").jqGrid('getRowData', ids[i]);
                if (Area.vcCodInt === myRow.vcCodint) {
                    existe = true;
                }
            }
        }

        if (!existe && Area.vcCodInt > -1) {
            $("#tbGridSolicitudesArea").jqGrid('addRowData', cnt_orga, data);
            cnt_orga++;
        }

    });
}