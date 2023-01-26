var MargenFiltro = 0; var MargenHeight = 48; var nuAltoFila = 23.04; var vcTipSel = "Tecnico"; var vcTipSubSel = "Tecnico";
var vcIdBusqueda = "";
var idSetInterval;
var idSetIntervalFilas;
var XMLUsuGruTipSol = "";
var biSubOpcHab;
var buscarValor = '';

var totalChecks;
var totalChkLeer, totalChkCrear, totalChkEditar, totalChkEliminar;
$(function () {
    $('#bpTipoSolicitud_txtValorBusqueda').hide();
    $('#bpTipoSolicitud_imgBusqueda').hide();
    $('#bpGrupo_txtValorBusqueda').hide();
    $('#bpGrupo_imgBusqueda').hide();

    $("#rbtSubSelTecnico").attr('disabled', 'disabled');
    $("#rbtSubSelGrupo").attr('disabled', 'disabled');
    $('#rbtSubSelTecnico').prop('checked', false);
    $('#rbtSubSelGrupo').prop('checked', false);

    fnDeshabilitarCheckboxTodos();
    $("#trSubseleccion").css({ "display": "none" });
    $("#trBusqueda").css({ "display": "none" });
    
    $("#btnGuardar").button("option", "disabled", true);
    vcIdBusqueda = 0;
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
            //fnMostrarDatos("");
            $("#txtresultado").val("");
            $("#trBusqueda").css({ "display": "none" });
            fnMostrarDatos(0);
            fnTitulosTecnico();
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

            $('#lblTipoSeleccion').html("Técnico");
            vcTipSel = 'Tecnico';
            $("#tbGrid").setCaption('Técnicos');
            fnLimpiarCheckboxTodos();
            $("#trBusqueda").css({ "display": "" });
            fnMostrarDatos("");
            fnTitulosTecnico();
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
            $("#tbGrid").setCaption('Técnicos');
            fnLimpiarCheckboxTodos();
            fnMostrarDatos("");
            fnTitulosGrupo();
        }

        fnHabilitarDeshabilitarSubOpciones();
    });

    $("#btnBuscar").click(function () {

        $('#txtbusqueda').val($('#txtbusqueda').val().replace(/\\/g, ''));
        buscarValor = $('#txtbusqueda').val();
        $('#grid').trigger('reloadGrid');


        $('#grid').jqGrid({
            sortable: true,
            datatype: listar2,
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
            colModel: [{ name: 'IdUsuario', index: 'IdUsuario', label: 'Código', width: 60 },
                        { name: 'Nombre', index: 'Nombre', label: 'Nombre' },
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
            width: 460,
            height: '255',
            rownumbers: true,

            onSelectRow: function (id) {
                IdEquipo = id;
            },
            ondblClickRow: function (id) {
                IdEquipo = id;
                $('#btnAddTecnico').click();
            }

        }).navGrid('#pager', { edit: false, add: false, search: false, del: false });

        var dlgTecnicos = $('#div_modal_tecnico').dialog({
            title: 'Agregar Titulares',
            width: 490,
            height: 420,
            modal: true,
            resizable: false,
            position: ['center'],
            autoOpen: true
        });

    });


    function fnHabilitarDeshabilitarSubOpciones() {
        if ($('#rbtTipoSolicitud').is(':checked')) {
            $('#rbtSubSelTecnico').prop("disabled", false);
            $('#rbtSubSelGrupo').prop("disabled", false);
            $('#rbtSubSelTecnico').prop('checked', true);
            $('#rbtSubSelGrupo').prop('checked', false);
        }
        else if ($('#rbtTecnico').is(':checked')) {
            $("#rbtSubSelTecnico").attr('disabled', 'disabled');
            $("#rbtSubSelGrupo").attr('disabled', 'disabled');
            $('#rbtSubSelTecnico').prop('checked', false);
            $('#rbtSubSelGrupo').prop('checked', false);
        }
        else if ($('#rbtGrupo').is(':checked')) {
            $('#rbtSubSelTecnico').prop('checked', false);
            $('#rbtSubSelGrupo').prop('checked', false);
            $("#rbtSubSelTecnico").attr('disabled', 'disabled');
            $("#rbtSubSelGrupo").attr('disabled', 'disabled');
        }
    }

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

    $('#txtbusqueda').keydown(function (event) {
        buscarValor = $('#txtbusqueda').val();
        $('#grid').trigger('reloadGrid');
    });

    $('#btnAddTecnico').live('click', function () {

        var id = $("#grid").jqGrid('getGridParam', 'selrow');

        if (id) {
            var datos = $("#grid").jqGrid('getRowData', id);
            var Iduser = datos['IdUsuario'];
            var NombreUser = datos['Nombre'];
            $("#txtresultado").val(NombreUser);
            fnMostrarDatos(Iduser);
            $('#div_modal_tecnico').dialog('close');
        }
        else {
            alert('Seleccione un registro'); return;
        }

    });

    $('#btnCancelarTecnico').live('click', function () {
        $('#div_modal_tecnico').dialog('close');
    });

    var lstFilas;

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

                        $("#tbGrid").setGridHeight($(window).height() - 260);

                        j = 0;

                        //agregado - 14/05/2014 - wapumayta
                        totalChecks = $(lstFilas).length;
                        totalChkLeer = totalChecks, totalChkCrear = totalChecks, totalChkEditar = totalChecks, totalChkEliminar = totalChecks;

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
                            },
                               { name: 'IdTipoSolicitud', Campo: 'IdTipoSolicitud', label: 'IdTipoSolicitud', hidden: true }, //agregado jcamacho123
           	        ],
        titulo: 'Técnico',
        loadtext: 'Cargando datos...',
        emptyrecords: 'No hay resultados',
        sortname: "Idd", //sortname: idTabla, //Default SortColumn
        sortorder: "asc", //Default SortOrder.
        height: "auto",
        width: "580",
        rownumbers: true,
        shrinkToFit: false,
        caption: "Técnicos",
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

    $("#btnGuardar").click(function () {
        biSubOpcHab = "1";
        if ($('#rbtSubSelTecnico').is(':disabled')) {
            biSubOpcHab = "0";
        }

        BloquearPagina(true);
        $("#dvProcesando").show();

        var vcIds = tbGrid.getDataIDs();
        var inSoloAsignacion = 0;
        XMLUsuGruTipSol = "<?xml version=\"1.0\" encoding=\"ISO-8859-1\"?><ROOT>";

        for (i = 0; i < vcIds.length; i++) {
            var row = tbGrid.getRowData(vcIds[i]);

            XMLUsuGruTipSol += "<DATA IdUsuario=\"" + row.IdTipSel + "\" IdTipoSolicitud=\"" + row.IdTipoSolicitud + "\" Leer=\"" + $("#chkLeer_" + row.IdTipSel)[0].checked + "\" Asignar=\"";
                   XMLUsuGruTipSol += $("#chkCrear_" + row.IdTipSel)[0].checked + "\" Procesar=\"" + $("#chkEditar_" + row.IdTipSel)[0].checked + "\" Anular=\"";
                   XMLUsuGruTipSol += $("#chkEliminar_" + row.IdTipSel)[0].checked + "\"/>";



            //if ($("#chkLeer_" + row.IdTipSel)[0].checked == true && $("#chkCrear_" + row.IdTipSel)[0].checked == true && $("#chkEditar_" + row.IdTipSel)[0].checked == false &&
            //        $("#chkEliminar_" + row.IdTipSel)[0].checked == false) {
            //    inSoloAsignacion = inSoloAsignacion + 1;
            //}
            //
            //if ($("#chkLeer_" + row.IdTipSel)[0].checked == true || $("#chkCrear_" + row.IdTipSel)[0].checked == true || $("#chkEditar_" + row.IdTipSel)[0].checked == true ||
            //        $("#chkEliminar_" + row.IdTipSel)[0].checked == true) {
            //
            //    if (vcTipSel == "TipoSolicitud") {
            //        if (vcTipSubSel == "Tecnico") {
            //            XMLUsuGruTipSol += "<DATA F_inUsu=\"" + row.IdTipSel + "\" F_inTipSol=\"" + vcIdBusqueda + "\" biLeer=\"" + $("#chkLeer_" + row.IdTipSel)[0].checked + "\" biCrear=\"";
            //            XMLUsuGruTipSol += $("#chkCrear_" + row.IdTipSel)[0].checked + "\" biEditar=\"" + $("#chkEditar_" + row.IdTipSel)[0].checked + "\" biEliminar=\"";
            //            XMLUsuGruTipSol += $("#chkEliminar_" + row.IdTipSel)[0].checked + "\"/>";
            //        } else if (vcTipSubSel == "Grupo") {
            //            XMLUsuGruTipSol += "<DATA F_inGruOri=\"" + row.IdTipSel + "\" F_inTipSol=\"" + vcIdBusqueda + "\" biLeer=\"" + $("#chkLeer_" + row.IdTipSel)[0].checked + "\" biCrear=\"";
            //            XMLUsuGruTipSol += $("#chkCrear_" + row.IdTipSel)[0].checked + "\" biEditar=\"" + $("#chkEditar_" + row.IdTipSel)[0].checked + "\" biEliminar=\"";
            //            XMLUsuGruTipSol += $("#chkEliminar_" + row.IdTipSel)[0].checked + "\"/>";
            //        }
            //    } else if (vcTipSel == "Tecnico") {
            //        XMLUsuGruTipSol += "<DATA F_inUsu=\"" + vcIdBusqueda + "\" F_inTipSol=\"" + row.IdTipSel + "\" biLeer=\"" + $("#chkLeer_" + row.IdTipSel)[0].checked + "\" biCrear=\"";
            //        XMLUsuGruTipSol += $("#chkCrear_" + row.IdTipSel)[0].checked + "\" biEditar=\"" + $("#chkEditar_" + row.IdTipSel)[0].checked + "\" biEliminar=\"";
            //        XMLUsuGruTipSol += $("#chkEliminar_" + row.IdTipSel)[0].checked + "\"/>";
            //    } else if (vcTipSel == "Grupo") {
            //        XMLUsuGruTipSol += "<DATA F_inGruOri=\"" + vcIdBusqueda + "\" F_inTipSol=\"" + row.IdTipSel + "\" biLeer=\"" + $("#chkLeer_" + row.IdTipSel)[0].checked + "\" biCrear=\"";
            //        XMLUsuGruTipSol += $("#chkCrear_" + row.IdTipSel)[0].checked + "\" biEditar=\"" + $("#chkEditar_" + row.IdTipSel)[0].checked + "\" biEliminar=\"";
            //        XMLUsuGruTipSol += $("#chkEliminar_" + row.IdTipSel)[0].checked + "\"/>";
            //    }
            //}
        }
        XMLUsuGruTipSol += "</ROOT>";

        if (((vcTipSel == "TipoSolicitud" && vcTipSubSel == "Tecnico") || (vcTipSel == "Tecnico")) && inSoloAsignacion > 0) {
            if (vcTipSel == "Tecnico")
                confirmacion("Existe uno o más tipos de solicitud que el técnico podrá asignar mas no procesar ni culminar. ¿Está seguro que desea grabar esta configuración?", fnGrabar, fnCancelar);
            else
                confirmacion("Existe uno o más técnicos con permisos de asignar mas no procesar ni culminar. ¿Está seguro que desea grabar esta configuración?", fnGrabar, fnCancelar);
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
                  "'XMLUsuGruTipSol':'" + XMLUsuGruTipSol + "'}",
            dataType: "json",
            type: "post",
            contentType: "application/json; charset=utf-8",
            success: function (result) {
            
                if ($(result.d).length > 0)
                    $("#btnGuardar").button("option", "disabled", false);
                else
                    $("#btnGuardar").button("option", "disabled", true);        

                Mensaje("<br/><h1>Configuración guardada.<br/>Para aplicar los cambios, debe volver a iniciar sesión.</h1><br/>", document, CerroMensaje);
    
                if (biSubOpcHab == "0") {
                    $('#rbtSubSelTecnico').prop("disabled", true);
                    $('#rbtSubSelGrupo').prop("disabled", true);
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

    function CerroMensaje() 
    {
        fnLimpiarCheckboxTodos();
        fnMostrarDatos(0);        
        BloquearPagina(false);
    }


    $("#btnCerrar").click(function () {
        //var Nametab = window.parent.tabschild[window.parent.tabPrincipal.tabs("option", "selected")].id;
        //var Accord = window.parent.$("#" + Nametab);
        //Accord.tabs("remove", Accord.tabs("option", "selected"));

        window.parent.parent.parent.parent.$("#ifTema").attr("src", "");
    });

    function fnCancelar() {
        BloquearPagina(false);
    }
});

function fnMostrarDatos(valor) {
    vcIdBusqueda = valor;
    $("#tbGrid").trigger("reloadGrid");
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


function listar2() {
  
    $.ajax({
        url: "Adm_SeguridadSolicitud.aspx/BuscarTecnico",

        data: "{'filtro':'" + buscarValor.replace(/'/g, '&#39') + "'," +             
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