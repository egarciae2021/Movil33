//var vcFileName = "";
var vNombreRespTec_Actual = '';

var xCondicion = ["primera", "segunda", "tercera", "cuarta", "quinta", "sexta", "sétima", "octava", "novena", "décima"];
var totalContenidos = [];
var vcTabProSel = "";
//var indiceTab = window.parent.tab.tabs("option", "selected");
var idRowCampoEdicion = '';
var valRowCampoEdicion = '';
var valRowParametro = '';
//var num = 0;
//-------

var Campos = [];
var EntidadRelacion = [];
var vIdEntFor = '';
var vcFiltroEntidad = '';
var CamposRelacion = [];
var Selecciono = false;
var oCulturaLocal = window.parent.parent.oCulturaUsuario;
var vcMenRegPro = "";
var regMsj = new RegExp("_;.-.;_", 'g');
var vcRegMsj = "_;.-.;_";
var biMsjTecResIni = "0";
var buscarValor = '';
//-------

function IngresarEmpleadoUnico(empleado) {//Carga del empleado seleccionado del formulario respectivo
    //$("#txtResponsable").val(empleado.vcNom);
    //$("#txtResponsable").attr('title', empleado.vcNom);

    $("#dvConfirmacionUsuarioEspecifico").dialog({
        title: "Confirmación De Asignación De Perfil",
        modal: true,
        resizable: false,
        buttons: {
            "Aceptar": function () {
                $("#txtUsuarioEspecifico").val(empleado.vcNom);
                $("#txtUsuarioEspecifico").attr('title', empleado.vcNom);
                $(this).dialog("close");
            },
            "Cancelar": function () {
                $(this).dialog("close");
            }
        }
    });
}

var numCondicion = 0;
var valCondicionActual = '';
var lstNumCond = [];
//var lstCondiciones = new Array();
//function CampoReferenciaCondicion(IdCondicion, IdCampo, IdCamEnt, IdSimboloCondicion, IdCampoTipSol, TextoCondicion,IdCampoRelacion, ValorCampoRelacion, NombreCampoRelacion) {
//    this.IdCondicion = IdCondicion; //pk de la tabla
//    this.IdCampo = IdCampo; //Id del campo tipo de solicitud
//    this.IdCamEnt = IdCamEnt; //id de ent_campo del campo a comparar
//    this.IdSimboloCondicion = IdSimboloCondicion; // condicion
//    this.IdCampoTipSol = IdCampoTipSol; // id del campo del tip de solicitud (para opcion campo de la solicitud)
//    this.TextoCondicion = TextoCondicion; // condicion ingresada por el usuario (para valor estatico)

//    this.IdCampoRelacion = IdCampoRelacion; //codigo del campo de la tabla relacionada
//    this.ValorCampoRelacion = ValorCampoRelacion; 
//    this.NombreCampoRelacion = NombreCampoRelacion
//    ,IdCampoRelacion, ValorCampoRelacion, NombreCampoRelacion
//}

//Validaciones de Valores Objetivo y Máximo de Umbrales
function ValidarValoresSemaforosAprobacion(txtValor) {
    if ($("#txtValorObjetivoApr").val() != "" && $("#txtValorMaximoApr").val() != "") {
        if (parseInt($("#txtValorObjetivoApr").val()) > parseInt($("#txtValorMaximoApr").val()) || parseInt($("#txtValorObjetivoApr").val()) == parseInt($("#txtValorMaximoApr").val())) {
            alertaExterna("El valor objetivo debe ser menor al valor máximo.");
            $(txtValor).val("");
            return;
        }
    }
}
function ValidarValoresSemaforosProceso(txtValor) {
    if ($("#txtValorObjetivoPro").val() != "" && $("#txtValorMaximoPro").val() != "") {
        if (parseInt($("#txtValorObjetivoPro").val()) > parseInt($("#txtValorMaximoPro").val()) || parseInt($("#txtValorObjetivoPro").val()) == parseInt($("#txtValorMaximoPro").val())) {
            alertaExterna("El valor objetivo debe ser menor al valor máximo.");
            $(txtValor).val("");
            return;
        }
    }
}

var tbDetalleContenido;
var tabAprobacion, tabProceso;
//devolucion
var arDatosDevolucion = [];
var XMLCamposPorEstadoProceso = ''
var XMLCampos = ''
var tblParametrosCorDev, tblSolicitudesAfectadas;
var vColorParametroDev = '#FFA87F';
var vColorDestinatarioDev = '#EB8A9A';
var vColorDesactivo = '#CD0A0A0';
//configuración
var tabContenidoConfig;
var tabContenidoRowId;
$(function () {

    //cargar parametros
    ListarParametros('ValidAdjuntos_Peso', -1);
    ListarParametros('ValidMensaje_Count', -1);

    $("#ddlTipoValidMensaje").change(function () {
        if ($(this).val() == '-1') {
            $("#lblDescTipoValidMensaje").text("");
            return;
        }
        var descValidMensaje = $("#ddlTipoValidMensaje option[value= '" + $(this).val() + "']").attr("desc");
        if (descValidMensaje != undefined && descValidMensaje != null) {
            $("#lblDescTipoValidMensaje").text(descValidMensaje == '' ? '' : "(" + descValidMensaje + ")");
        }
    });
    $("#ddlTamTip_Adj").change(function () {
        if ($(this).val() == '-1') {
            $("#lblDescValidTamTipAdjunto").text("");
            return;
        }
        var descValidTamAdjunto = $("#ddlTamTip_Adj option[value= '" + $(this).val() + "']").attr("desc");
        if (descValidTamAdjunto != undefined && descValidTamAdjunto != null) {
            $("#lblDescValidTamTipAdjunto").text(descValidTamAdjunto == '' ? '' : "(" + descValidTamAdjunto + ")");
        }
    });

    tabAprobacion = $("#tabEstadoAprobacion").tabs({
        //        select: function (event, ui) {
        //            //var tabSeleccionado = ui.index;
        //            var idTabSeleccionado = ui.panel.id
        //            
        //            if (idTabSeleccionado =="tbResponsable")
        //                $('#ddlEstadoAprobacion').prop('disabled', true);
        //            else if (idTabSeleccionado == "tbUmbralAprobacion")
        //                $('#ddlEstadoAprobacion').prop('disabled', true);
        //            else
        //                $('#ddlEstadoAprobacion').prop('disabled', false);
        //        }
    });
    tabProceso = $("#tabEstadoProceso").tabs({
        select: function (event, ui) {
            vcTabProSel = ui.panel.id;
            if (vcTabProSel == "tbReglaProceso") {
                $("#lblEstadoIniReglaProMensaje").text(vcMenRegPro);
            } else {
                $("#lblEstadoIniReglaProMensaje").text("");
            }
        }
    });

    //EDICION DE SOLICITUDES DE SISTEMA
    //Deshabilitar campos
    if ($("#hdfPersonalizada").val() == "false") {
        //Nombre de accordion
        $.each($("#AccordionJQ1 a"), function () {
            if ($(this)[0].text == "Atributos") {
                $(this)[0].text = "Pestañas";
            }
        });

        //General
        $("#txtTabla").attr("disabled", true);
        $("#txtPrefijo").attr("disabled", true);
        $("#ddlLineaTipo").attr("disabled", true);
        //$("#ddlFinanciamiento").attr("disabled", true);

        //Atributos
        $("#dvFormulario").hide();
        $("#dvCapturaDatos").show();

        tbDetalleContenido = $("#tbDetalleContenido").jqGrid({
            sortable: true,
            datatype: "local",
            colModel: [{ name: 'inCod', Campo: 'inCod', label: 'inCod', hidden: true, width: 100 },
                        { name: 'vcTituloTab', Campo: 'vcTituloTab', label: 'Título Pestaña', hidden: false, width: 180 },
                        { name: 'btProObl', index: 'btProObl', label: 'btProObl', hidden: true, width: 100 },
                        { name: 'btAct', index: 'btAct', label: 'Visible', hidden: false, width: 65, align: "center",
                            formatter: function (value, options, rData) {
                                if (rData.btProObl == "True") { //mostrar labels
                                    return '<label id="lblCapVisible-' + rData.inCod.toString() + '">SI</label>';
                                } else { //mostrar ddl seleccionables
                                    if (value == "True") {
                                        return '<select id="ddlCapVisible-' + rData.inCod.toString() + '" class="CapVisible"><option value="1" selected="selected">SI</option><option value="0">NO</option></select>';
                                    } else {
                                        return '<select id="ddlCapVisible-' + rData.inCod.toString() + '" class="CapVisible"><option value="1">SI</option><option value="0" selected="selected">NO</option></select>';
                                    }
                                }
                            }
                        },
                        { name: 'btCapObl', index: 'btCapObl', label: 'Obligatorio', hidden: false, width: 65, align: "center",
                            formatter: function (value, options, rData) {
                                if (rData.btProObl == "True") {
                                    return '<label id="lblCapObligatorio-' + rData.inCod.toString() + '">SI</label>';
                                } else if (rData.inCod == "4") {
                                    if (value == "True") {
                                        return '<select id="ddlCapObligatorio-' + rData.inCod.toString() + '" class="CapObligatorio" disabled="disabled"><option value="1" selected="selected">SI</option><option value="0">NO</option></select>';
                                    } else {
                                        return '<select id="ddlCapObligatorio-' + rData.inCod.toString() + '" class="CapObligatorio" disabled="disabled"><option value="1">SI</option><option value="0" selected="selected">NO</option></select>';
                                    }
                                } else {
                                    if (rData.btAct == "False") {
                                        return '<select id="ddlCapObligatorio-' + rData.inCod.toString() + '" class="CapObligatorio" disabled="disabled"><option value="1">SI</option><option value="0" selected="selected">NO</option></select>';
                                    } else {
                                        if (value == "True") {
                                            return '<select id="ddlCapObligatorio-' + rData.inCod.toString() + '" class="CapObligatorio"><option value="1" selected="selected">SI</option><option value="0">NO</option></select>';
                                        } else {
                                            return '<select id="ddlCapObligatorio-' + rData.inCod.toString() + '" class="CapObligatorio"><option value="1">SI</option><option value="0" selected="selected">NO</option></select>';
                                        }
                                    }
                                }
                            }
                        },
                        { name: 'btBotRef', index: 'btBotRef', label: 'Mostrar Refrescar', hidden: false, width: 110, align: "center",
                            formatter: function (value, options, rData) {
                                if (rData.inCod == "5" || rData.inCod == "6" || rData.inCod == "10") {
                                    return '<label id="lblCapRefrescar-' + rData.inCod.toString() + '">NO</label>';
                                } else {
                                    if (rData.btAct == "False") {
                                        return '<select id="ddlCapRefrescar-' + rData.inCod.toString() + '" class="CapRefrescar" disabled="disabled"><option value="1">SI</option><option value="0" selected="selected">NO</option></select>';
                                    } else {
                                        if (value == "True") {
                                            return '<select id="ddlCapRefrescar-' + rData.inCod.toString() + '" class="CapRefrescar"><option value="1" selected="selected">SI</option><option value="0">NO</option></select>';
                                        } else {
                                            return '<select id="ddlCapRefrescar-' + rData.inCod.toString() + '" class="CapRefrescar"><option value="1">SI</option><option value="0" selected="selected">NO</option></select>';
                                        }
                                    }
                                }
                            }
                        },
                        { name: 'Descripcion', index: 'Descripcion', label: 'Descripción', hidden: false, width: 430 },
                        { name: 'vcNombreTab', index: 'vcNombreTab', label: 'vcNombreTab', hidden: true, width: 100 },
                        { name: 'inCanTot_Adj', index: 'inCanTot_Adj', label: 'inCanTot_Adj', hidden: true, width: 100 },
                        { name: 'vcExtPer_Adj', index: 'vcExtPer_Adj', label: 'vcExtPer_Adj', hidden: true, width: 100 },
                        { name: 'vcTamTip_Adj', index: 'vcTamTip_Adj', label: 'vcTamTip_Adj', hidden: true, width: 100 },
                        { name: 'vcTamMed_Adj', index: 'vcTamMed_Adj', label: 'vcTamMed_Adj', hidden: true, width: 100 },
                        { name: 'dcTamaño_Adj', index: 'dcTamaño_Adj', label: 'dcTamaño_Adj', hidden: true, width: 100 },
                        { name: 'vcTamTip_Msj', index: 'vcTamTip_Msj', label: 'vcTamTip_Msj', hidden: true, width: 100 },
                        { name: 'inTamaño_Msj', index: 'inTamaño_Msj', label: 'inTamaño_Msj', hidden: true, width: 100 },
                        { name: 'vcNomArchivo_Dec', index: 'vcNomArchivo_Dec', label: 'vcNomArchivo_Dec', hidden: true, width: 100 },
            //                        { name: 'vcUbiArchivo_Dec', index: 'vcUbiArchivo_Dec', label: 'vcUbiArchivo_Dec', hidden: true, width: 100 },
                        {name: 'Configuración', index: 'Configuracion', label: '-', hidden: false, width: 30, align: "center",
                        formatter: function (value, options, rData) {
                            if (rData.vcNombreTab == 'DocAdjuntos' || rData.vcNombreTab == 'Condiciones' || rData.vcNombreTab == 'Mensaje') {
                                //return '<div id="btnConfig-' + rData.inCod.toString() + '" class="btnNormal ConfigConten"><a>Configuración</a></div>';
                                return '<img id="btnConfig-' + rData.inCod.toString() + '" class="imgBtn ConfigConten" title="Configuración" src="../../../Common/Images/Mantenimiento/Proceso.png"/>';
                            } else {
                                return '';
                            }
                            //$('#btnConfig-' + rData.inCod.toString()).button({});
                        }
                    }
   	        ],
            loadtext: 'Cargando datos...',
            emptyrecords: 'No hay resultados',
            sortname: "inCod", //sortname: idTabla, //Default SortColumn
            sortorder: "asc", //Default SortOrder.
            height: "auto",
            rownumbers: true,
            shrinkToFit: false,
            width: $(window).width() - 73,
            caption: "Pestañas",
            onRightClickRow: function () {
                tbDetalleContenido.jqGrid('resetSelection');
                return false;
            },
            beforeSelectRow: function (rowid, status, e) {
                return false;
            },
            afterInsertRow: function (rowid, rowdata, rowelem) {
                //$(".ConfigConten").button({});
                if (rowdata.vcNombreTab == 'Condiciones' || rowdata.vcNombreTab == 'Mensaje') {
                    if ($("#ddlCapObligatorio-" + rowdata.inCod.toString()).val() == '0') {
                        $("#btnConfig-" + rowdata.inCod.toString()).button("option", "disabled", true);
                    }
                }
            }
        });

        //Estados de Proceso
        var Id = '#tbCampo';
        var $panel = tabProceso.find(Id);
        if ($panel.length) {//En el caso que exista el tab, lo elimina
            tabProceso.tabs("option", "selected", 1);
            //$("#tabEstadoProceso").tabs("option", "disabled", [0]);
            //$("#tabEstadoProceso").tabs('option', 'selected', $("#tabEstadoProceso").tabs('option', 'selected') + 1);
            tabProceso.tabs("remove", Id);
        };

    }
    else { //PERSONALIZADA
        $("#trRefrescar").show();
    }

    $("#imgTecnico").click(function () {

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
            width: 470,
            height: 420,
            modal: true,
            resizable: false,
            position: ['center'],
            autoOpen: true
        });

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
            $("#hdfTecnicoResponsable").val(Iduser);
            $("#hdfTecnicoResponsable_Act").val(Iduser);
            $('#div_modal_tecnico').dialog('close');
        }
        else {
            alert('Seleccione un registro'); return;
        }

    });


    $(".CapVisible").live("click", function () {
        var id = $(this).attr("id").split("-")[1];
        if (this.value == 0) {
            $("#ddlCapObligatorio-" + id).val("0");
            $("#ddlCapObligatorio-" + id).attr("disabled", true);

            $("#ddlCapRefrescar-" + id).val("0");
            $("#ddlCapRefrescar-" + id).attr("disabled", true);

            $("#btnConfig-" + id).button("option", "disabled", true);
            $("#dvCapturaDatosConfiguracion").hide();

            //desactivando campo con parametro
            if (id == "5") { //Mensaje
                //Vefiricar si se usa en parametros
                //                var ids = tbParametros.getDataIDs();
                var ids = tbParametros.jqGrid('getGridParam', 'selarrrow');
                var esParametro = false, idParam = '';
                for (j = 0; j < ids.length; j++) {
                    var rowP = tbParametros.getRowData(ids[j]);
                    if ('vcDesSol' == rowP["IdCampo"].toString()) {
                        esParametro = true;
                        idParam = rowP["Clave"].toString();
                    }
                }
                if (esParametro) {
                    $('#divMsgConfirmQuitarCampo').dialog({
                        title: "¡Alerta!",
                        modal: true,
                        width: 330,
                        buttons: {
                            "Si": function () {
                                //Eliminar de tbParametros
                                //tbParametros.delRowData(idParam);
                                tbParametros.jqGrid('setSelection', idParam);
                                $("input[name='jqg_tbParametros_{MotivoSolicitud}']").attr("disabled", "disabled");
                                $(this).dialog("close");
                            },
                            "Cancelar": function () {
                                //regresar combo a "SI"
                                $("#ddlCapVisible-5").val(1);
                                $(this).dialog("close");
                            }
                        }
                    });
                } else {
                    //Eliminar de tbParametros
                    tbParametros.delRowData(idParam);
                    $(this).dialog("close");
                }
                //eliminar de parametros
                //                $("#ddlValor option[value='vcDesSol']").remove();
                //                fnSortDropDownListByText("ddlValor");
            }
        } else {
            if (id == "4") {
                $("#ddlCapObligatorio-" + id).val("1");
                $("#btnConfig-" + id).button("option", "disabled", false);
            } else if (id == "6") {
                $("#ddlCapObligatorio-" + id).attr("disabled", false);
                $("#btnConfig-" + id).button("option", "disabled", false);
            } else if (id == "5") { //activar pestaña mensaje
                //agregar campo a parametros
                //                $("#ddlValor").append($('<option></option>').val('vcDesSol').html('Descripción Solicitud'));
                //                fnSortDropDownListByText("ddlValor");
                $("input[name='jqg_tbParametros_{MotivoSolicitud}']").attr("disabled", false);
                $("#ddlCapObligatorio-" + id).attr("disabled", false);
            } else {
                $("#ddlCapObligatorio-" + id).attr("disabled", false);
            }

            $("#ddlCapRefrescar-" + id).attr("disabled", false);
            $("#ddlCapRefrescar-" + id).val("1");
        }
    });

    $(".CapObligatorio").live("click", function () {
        var id = $(this).attr("id").split("-")[1];
        if (id != '6') {
            if (this.value == 0) {
                $("#btnConfig-" + id).button("option", "disabled", true);
                $("#dvCapturaDatosConfiguracion").hide();
            } else {
                $("#btnConfig-" + id).button("option", "disabled", false);
            }
        }
    });


    //inicio configuración pestañas
    $("#dvCapturaDatosConfiguracion").css("width", $(window).width() - 93);

    ValidarNumeroEnCajaTexto("txtCantidadAdjuntos", ValidarDecimal, oCulturaLocal, true);
    ValidarNumeroEnCajaTexto("txtTamano_Adj", ValidarDecimal, oCulturaLocal, false);
    ValidarNumeroEnCajaTexto("txtTamMensaje", ValidarDecimal, oCulturaLocal, true);
    $("#txtExtensionesPermitidas").focusout(ValidarNoEspacio_focusout);

    $(".ConfigConten").live("click", function () {
        var id = $(this).attr("id").split("-")[1];
        var row = tbDetalleContenido.getRowData(id);
        var vcNomTab = row.vcNombreTab
        if (vcNomTab == tabContenidoConfig && $("#dvCapturaDatosConfiguracion").is(":visible")) {
            return;
        }
        tabContenidoConfig = vcNomTab;
        tabContenidoRowId = id;
        $("#lblTituloConfiguracionContenido").text("Configuración de pestaña '" + row.vcTituloTab + "'");
        $(".trAdjuntos").hide();
        $(".trMensaje").hide();
        $(".trCondiciones").hide();
        if (vcNomTab == 'DocAdjuntos') {
            $("#dvCapturaDatosConfiguracion").show();
            $(".trAdjuntos").show();
            //cargar datos actuales
            if (parseInt(row.inCanTot_Adj) == 0) {
                $("#txtCantidadAdjuntos").val('');
                $("#txtCantidadAdjuntos").attr('disabled', true);
                $("#chkCantIlimitada_Adj").attr("checked", true);
            } else {
                $("#txtCantidadAdjuntos").val(row.inCanTot_Adj);
                $("#txtCantidadAdjuntos").attr('disabled', false);
                $("#chkCantIlimitada_Adj").attr("checked", false);
            }
            if (row.vcExtPer_Adj == '') {
                $("#txtExtensionesPermitidas").val('');
                $("#txtExtensionesPermitidas").attr('disabled', true);
                $("#chkTodas_Adj").attr("checked", true);
            } else {
                $("#txtExtensionesPermitidas").val(row.vcExtPer_Adj);
                $("#txtExtensionesPermitidas").attr('disabled', false);
                $("#chkIlimitada_Adj").attr("checked", false);
            }
            $("#ddlTamTip_Adj").val(row.vcTamTip_Adj = '' ? '-1' : row.vcTamTip_Adj);
            var descValidTamTipAdj = $("#ddlTamTip_Adj option[value= '" + $("#ddlTamTip_Adj").val() + "']").attr("desc");
            $("#lblDescValidTamTipAdjunto").text(descValidTamTipAdj == '' ? '' : "(" + descValidTamTipAdj + ")");
            $("#ddlTamMed_Adj").val(row.vcTamMed_Adj = '' ? '-1' : row.vcTamMed_Adj);
            if (parseFloat(row.dcTamaño_Adj) == 0) {
                $("#txtTamano_Adj").val('');
                $("#txtTamano_Adj").attr('disabled', true);
                $("#ddlTamTip_Adj").attr('disabled', true);
                $("#ddlTamMed_Adj").attr('disabled', true);
                $("#chkTamIlimitado_Adj").attr("checked", true);
            } else {
                $("#txtTamano_Adj").val(row.dcTamaño_Adj);
                $("#txtTamano_Adj").attr('disabled', false);
                $("#ddlTamTip_Adj").attr('disabled', false);
                $("#ddlTamMed_Adj").attr('disabled', false);
                $("#chkTamIlimitado_Adj").attr("checked", false);
            }
        } else if (vcNomTab == 'Mensaje') {
            $("#dvCapturaDatosConfiguracion").show();
            $(".trMensaje").show();
            //cargar datos actuales
            $("#ddlTipoValidMensaje").val(row.vcTamTip_Msj == '' ? '-1' : row.vcTamTip_Msj);
            var descTipoValidMensaje = $("#ddlTipoValidMensaje option[value= '" + $("#ddlTipoValidMensaje").val() + "']").attr("desc");
            $("#lblDescTipoValidMensaje").text(descTipoValidMensaje == '' ? '' : "(" + descTipoValidMensaje + ")");
            $("#txtTamMensaje").val(row.inTamaño_Msj);
        } else if (vcNomTab == 'Condiciones') {
            $("#dvCapturaDatosConfiguracion").show();
            $(".trCondiciones").show();
        } else {
            $("#dvCapturaDatosConfiguracion").hide();
        }
    });

    $("#txtExtensionesPermitidas").focus(function () {
        if ($(this).hasClass("txtBusqueda")) {
            $(this).removeClass("txtBusqueda");
            $("#txtExtensionesPermitidas").val("");
        }
    });

    $("#txtExtensionesPermitidas").blur(function (i) {
        if ($("#txtExtensionesPermitidas").val() == "") {
            $(this).addClass("txtBusqueda");
            $("#txtExtensionesPermitidas").val('Ej: bmp,png,jpg');
        }
    });

    $("#chkCantIlimitada_Adj").change(function () {
        if ($(this).is(":checked")) {
            $("#txtCantidadAdjuntos").val('');
            $("#txtCantidadAdjuntos").attr('disabled', true);
        } else {
            $("#txtCantidadAdjuntos").attr('disabled', false);
        }
    });

    $("#chkTodas_Adj").change(function () {
        if ($(this).is(":checked")) {
            $("#txtExtensionesPermitidas").val('');
            $("#txtExtensionesPermitidas").attr('disabled', true);
        } else {
            $("#txtExtensionesPermitidas").attr('disabled', false);
            $("#txtExtensionesPermitidas").addClass("txtBusqueda");
            $("#txtExtensionesPermitidas").val('Ej: bmp,png,jpg');
        }
    });

    $("#chkTamIlimitado_Adj").change(function () {
        if ($(this).is(":checked")) {
            $("#txtTamano_Adj").val('');
            $("#ddlTamTip_Adj").val('-1');
            $("#ddlTamMed_Adj").val('-1');
            $("#txtTamano_Adj").attr('disabled', true);
            $("#ddlTamTip_Adj").attr('disabled', true);
            $("#ddlTamMed_Adj").attr('disabled', true);
        } else {
            $("#txtTamano_Adj").attr('disabled', false);
            $("#ddlTamTip_Adj").attr('disabled', false);
            $("#ddlTamMed_Adj").attr('disabled', false);
        }
    });

    $("#btnGuardarConfigConten").live("click", function () {
        var vCanTot_Adj, vExtPer_Adj, vTamTip_Adj, vTamMed_Adj, vTamaño_Adj;
        var vTamTip_Msj, vTamaño_Msj;
        var vNomArchivo_Dec, vUbiArchivo_Dec;
        var dataConfig;
        if (tabContenidoConfig == 'DocAdjuntos') {
            //validaciones
            if (!$("#chkCantIlimitada_Adj").is(":checked") && $("#txtCantidadAdjuntos").val() == '') {
                alertaExterna("Ingrese una cantidad de archivos");
                $("#txtCantidadAdjuntos").focus();
                return;
            }
            if (!$("#chkTodas_Adj").is(":checked") && ($("#txtExtensionesPermitidas").val() == '' || $("#txtExtensionesPermitidas").hasClass("txtBusqueda"))) {
                alertaExterna("Ingrese por lo menos una extensión de archivo");
                $("#txtExtensionesPermitidas").focus();
                return;
            }
            if (!$("#chkTamIlimitado_Adj").is(":checked")) {
                if ($("#ddlTamTip_Adj").val() == '-1') {
                    alertaExterna("Defina el tipo de validación para el tamaño del archivo.");
                    $("#ddlTamTip_Adj").focus();
                    return;
                }
                if ($("#ddlTamMed_Adj").val() == '-1') {
                    alertaExterna("Defina la medida para validar el tamaño del archivo.");
                    $("#ddlTamMed_Adj").focus();
                    return;
                }
                if ($("#txtTamano_Adj").val() == '') {
                    alertaExterna("Ingres el tamaño maximó permitido.");
                    $("#txtTamano_Adj").focus();
                    return;
                }
            }
            //cargar datos nuevos
            if ($("#chkCantIlimitada_Adj").is(":checked")) {
                vCanTot_Adj = '0';
            } else {
                vCanTot_Adj = $("#txtCantidadAdjuntos").val();
            }
            if ($("#chkTodas_Adj").is(":checked")) {
                vExtPer_Adj = '';
            } else {
                vExtPer_Adj = $("#txtExtensionesPermitidas").val();
            }
            if ($("#chkTamIlimitado_Adj").is(":checked")) {
                vTamTip_Adj = '';
                vTamMed_Adj = '';
                vTamaño_Adj = '0';
            } else {
                vTamTip_Adj = $("#ddlTamTip_Adj").val();
                vTamMed_Adj = $("#ddlTamMed_Adj").val();
                vTamaño_Adj = $("#txtTamano_Adj").val();
            }
        } else if (tabContenidoConfig == 'Mensaje') {
            //validaciones
            if ($("#ddlTipoValidMensaje").val() == '-1') {
                alertaExterna("Defina el tipo de validación para el mensaje.");
                $("#ddlTipoValidMensaje").focus();
                return;
            }
            if ($("#txtTamMensaje").val() == '' || $("#txtTamMensaje").val() == '0') {
                alertaExterna("Ingrese una cantidad para validar el ingreso del mensaje.");
                $("#txtTamMensaje").focus();
                return;
            }
            //cargar datos nuevos
            vTamTip_Msj = $("#ddlTipoValidMensaje").val();
            vTamaño_Msj = $("#txtTamMensaje").val();
        } else if (tabContenidoConfig == 'Condiciones') {
            if ($("#ddlCapVisible-4").val() == "1" && vcFileName == "") {
                alertaExterna("El archivo de condiciones es requerido.");
                return;
            }
            //            vNomArchivo_Dec = '';
            //            vUbiArchivo_Dec = '';
        }
        if (tabContenidoConfig == 'DocAdjuntos') {
            dataConfig = { inCanTot_Adj: FormatoNumero(vCanTot_Adj, oCulturaLocal, true),
                vcExtPer_Adj: vExtPer_Adj,
                vcTamTip_Adj: vTamTip_Adj,
                vcTamMed_Adj: vTamMed_Adj,
                dcTamaño_Adj: FormatoNumero(vTamaño_Adj, oCulturaLocal, false)
            };
        } else if (tabContenidoConfig == 'Mensaje') {
            dataConfig = { vcTamTip_Msj: vTamTip_Msj,
                inTamaño_Msj: FormatoNumero(vTamaño_Msj, oCulturaLocal, true)
            };
        } else if (tabContenidoConfig == 'Condiciones') {
            dataConfig = { vcNomArchivo_Dec: vNomArchivo_Dec
                //                vcUbiArchivo_Dec: vUbiArchivo_Dec
            };
        }
        $("#dvCapturaDatosConfiguracion").hide();
        $("#tbDetalleContenido").jqGrid("setRowData", tabContenidoRowId, dataConfig);
    });

    $("#btnCancelarConfigConten").live("click", function () {
        $("#dvCapturaDatosConfiguracion").hide();
    });
    //fin configuración pestañas

    indiceTab = window.parent.tab.tabs("option", "selected");
    $("#txtTabla").focus();

    //check correso (destinatarios) // 10-03-2014 wapumayta
    //$("#chkPropietarioCorPro").prop('disabled', true);
    //$("#chkUsuarioEspecificoCorApr").prop('disabled', true);
    //$("#chkAreaCorApr").prop('disabled', true);
    //$("#chkTecnicoCorApr").prop('disabled', true);

    //JHERRERA 2014082014
    //$("#chkUsuarioEspecificoCorPro").prop('disabled', true);
    //$("#chkAreaCorPro").prop('disabled', true);

    //tipo dato referencia //11-03-2014 wapumayta
    //$("#ddlSimboloCondicion").attr("disabled", true);
    //$("#ddlValorCondicion").hide();
    $(".DdlValorCondicion").hide();

    $("#ddlEntidadReferencia").change(function () {
        var idEntidad = this.value;
        if (idEntidad != "-1") {
            $("#ddlCampoEntidad").html('');
            $("#ddlCampoEntidadCondicion_0").html('');
            $("#ddlCampoEntidadCondicion_0").append('<option value="-1">Seleccione...</option>');
            $("#ddlSimboloCondicion_0").attr("disabled", false);
            //$("#ddlEntidadRelacion").html('');
            $.ajax({
                type: "POST",
                url: "Adm_SolicitudesConfiguracion.aspx/ListarCampoEntidadReferencia",
                data: "{'inCodEnt': '" + idEntidad + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {
                    Campos = [];
                    EntidadRelacion = [];
                    eval(result.d);

                    var lstKeysCampos = Object.keys(Campos);
                    for (var i = 0; i < $(lstKeysCampos).length; i++) {
                        var valueddl = Campos[lstKeysCampos[i]].P_inCod;
                        var textoddl = Campos[lstKeysCampos[i]].vcDes;
                        var selectddl = Campos[lstKeysCampos[i]].btBusq;
                        if (selectddl == 'True' || selectddl == 'true' || selectddl == '1') {
                            $("#ddlCampoEntidad").append($('<option selected="selected"></option>').val(valueddl).html(textoddl));
                        } else {
                            $("#ddlCampoEntidad").append($('<option></option>').val(valueddl).html(textoddl));
                        }
                    }

                    //Cargar primera condición
                    numCondicion = 0;
                    valCondicionActual = '';
                    lstNumCond = [];
                    //lstCondiciones = [];
                    $("#tdCondiciones").html('');
                    NuevaCondicion1();
                },
                error: function (xhr, err, thrErr) {
                    MostrarErrorAjax(xhr, err, thrErr);
                }
            });
        } else {
            $("#tdCondiciones").html('');
            $("#ddlCampoEntidad").html('');
            $("#ddlCampoEntidad").append($("<option></option>").val("-2").html("Seleccione Entidad"));
        }
    });
    //$("#ddlCampoEntidadCondicion").change(function () {
    $(".CampoCondicion").live("change", function () {
        var idCampo = this.value;
        var numCondicion = $(this).attr("id").split("_")[1];
        valCondicionActual = numCondicion;
        //volver estados de controles a inicio
        $("#ddlSimboloCondicion_" + numCondicion).html('');
        $("#ddlSimboloCondicion_" + numCondicion).attr("disabled", true);
        $("#ddlValorCondicion_" + numCondicion).hide();
        $("#txtValorCondicion_" + numCondicion).show();
        $("#txtValorCondicion_" + numCondicion).attr("disabled", true);
        $("#btnValorCondicion_" + numCondicion).button("option", "disabled", true);
        //mensajes lblMsjSelecValor,lblMsjValorEstatico
        //$("#lblMsjSelecValor").text("El campo seleccionado está relacionado con la entidad " + Campos[idCampo].);

        if (idCampo != "-1") {
            var tipDatCampo = Campos[idCampo].F_inTipDat.toString();
            //cargar Simbolo Condición
            $("#ddlSimboloCondicion_" + numCondicion).attr("disabled", false);
            $("#ddlSimboloCondicion_" + numCondicion).html('');
            for (var i = 0; i < $(Simbolos).length; i++) {
                var tipdat = Simbolos[i].vcTipoDato.toString();
                var ndxOf = tipdat.indexOf(tipDatCampo);
                if (ndxOf > -1) {
                    $("#ddlSimboloCondicion_" + numCondicion).append('<option value="' + Simbolos[i].Id + '">' + Simbolos[i].Descripcion + '</option>');
                }
            }
            //si es logico, cargar ValorVerdadero y ValorFalso
            if (tipDatCampo == 6) {
                $("#ddlValorCondicion_" + numCondicion).show();
                $("#txtValorCondicion_" + numCondicion).hide();
                $("#btnValorCondicion_" + numCondicion).button("option", "disabled", true);
                $("#ddlValorCondicion_" + numCondicion).html('');
                $("#ddlValorCondicion_" + numCondicion).append('"<option value="1">' + Campos[idCampo].vcValVer + '</option>');
                $("#ddlValorCondicion_" + numCondicion).append('"<option value="0">' + Campos[idCampo].vcValFal + '</option>');
                NuevaCondicion1();
            } else {
                $("#ddlValorCondicion_" + numCondicion).hide();
                $("#txtValorCondicion_" + numCondicion).show();
                $("#btnValorCondicion_" + numCondicion).button("option", "disabled", false);
            }
        } else {
            //$("#ddlSimboloCondicion_" + numCondicion).html('');
            //$("#ddlSimboloCondicion_" + numCondicion).attr("disabled", true);
            //$("#ddlValorCondicion_" + numCondicion).hide();
            //$("#txtValorCondicion_" + numCondicion).show();
            //$("#txtValorCondicion_" + numCondicion).attr("disabled", true);
            //$("#btnValorCondicion_" + numCondicion).button("option", "disabled", true);
        }
    });

    $(".SimboloCondicion").live("change", function () {
        var idSimbolo = this.value;
        var numCondicion = $(this).attr("id").split("_")[1];
        var idCampo = $("#ddlCampoEntidadCondicion_" + numCondicion).val();

        if ($(this).val() == "8" || $(this).val() == "9") { // NULL || NOT NULL
            $("#ddlValorCondicion_" + numCondicion).hide();
            $("#txtValorCondicion_" + numCondicion).show();
            $("#txtValorCondicion_" + numCondicion).val('');
            $("#btnValorCondicion_" + numCondicion).button("option", "disabled", true);
            NuevaCondicion1();
        } else {
            if (Campos[idCampo].F_inTipDat == "6") { // Lógico
                $("#btnValorCondicion_" + numCondicion).button("option", "disabled", true);
                $("#ddlValorCondicion_" + numCondicion).show();
                $("#txtValorCondicion_" + numCondicion).hide();
                $("#ddlValorCondicion_" + numCondicion).html('');
                $("#ddlValorCondicion_" + numCondicion).append('"<option value="1">' + Campos[idCampo].vcValVer + '</option>');
                $("#ddlValorCondicion_" + numCondicion).append('"<option value="0">' + Campos[idCampo].vcValFal + '</option>');
            } else {
                $("#btnValorCondicion_" + numCondicion).button("option", "disabled", false);
                $("#ddlValorCondicion_" + numCondicion).hide();
                $("#txtValorCondicion_" + numCondicion).show();
            }
        }
    });

    $(".BotonCondicion").live("click", function () {
        valCondicionActual = $(this).attr("id").split("_")[1];
        if ($("#ddlCampoEntidadCondicion_" + valCondicionActual).val() != "-1") {
            //limpiar modal
            LimpiarValorCondicion();
            //Cargar ddlCampoRelacion
            var vTabFor = Campos[$("#ddlCampoEntidadCondicion_" + valCondicionActual).val()].vcTabFor;
            var vNomTabFor = '';
            vIdEntFor = '', vcFiltroEntidad = '';
            var lstKeysEntidadRelacion = Object.keys(EntidadRelacion);
            for (var i = 0; i < $(lstKeysEntidadRelacion).length; i++) {
                if (EntidadRelacion[lstKeysEntidadRelacion[i]].vcTab == vTabFor) {
                    vIdEntFor = EntidadRelacion[lstKeysEntidadRelacion[i]].P_inCod;
                    vNomTabFor = EntidadRelacion[lstKeysEntidadRelacion[i]].vcDes;
                    vcFiltroEntidad = EntidadRelacion[lstKeysEntidadRelacion[i]].vcFiltroEntidad;
                }
            }
            $("#lblEntidadRelacionada").text('');
            if (vNomTabFor != '') {
                $("#lblEntidadRelacionada").text('(Entidad relacionada: ' + vNomTabFor + ')');
                $("#rbtValorDinamico").attr("disabled", false);
            } else {
                $("#lblEntidadRelacionada").text('(No existe entidad relacionada)');
                $("#rbtValorDinamico").attr("disabled", true);
            }
            //alert('valCondicionActual: ' + valCondicionActual + '\nvTabFor: ' + vTabFor + '\nNombreEntidad: ' + vNomTabFor);
            if (vIdEntFor != '') {
                $.ajax({
                    type: "POST",
                    url: "Adm_SolicitudesConfiguracion.aspx/ListarCampoEntidadRelacion",
                    data: "{'inCodEnt': '" + vIdEntFor + "'}",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (result) {
                        CamposRelacion = [];
                        eval(result.d);
                        $("#ddlCampoRelacion").html('');
                        $("#ddlCampoRelacion").append($('<option></option>').val("-1").html(''));
                        var lstKeysCamposRelacion = Object.keys(CamposRelacion);
                        for (var i = 0; i < $(lstKeysCamposRelacion).length; i++) {
                            var valueddl = CamposRelacion[lstKeysCamposRelacion[i]].P_inCod;
                            var textoddl = CamposRelacion[lstKeysCamposRelacion[i]].vcDes;
                            var selectddl = CamposRelacion[lstKeysCamposRelacion[i]].btBusq;
                            if (selectddl == 'True' || selectddl == 'true' || selectddl == '1') {
                                $("#ddlCampoRelacion").append($('<option></option>').val(valueddl).html(textoddl));
                            }
                        }
                        if ($("#hdfValorCampRelac_" + valCondicionActual).val() != '') {
                            $("#ddlCampoRelacion").val($("#hdfValorCampRelac_" + valCondicionActual).val());
                        }
                    },
                    error: function (xhr, err, thrErr) {
                        MostrarErrorAjax(xhr, err, thrErr);
                    }
                });
            }
            //Abrir dialogo
            var ModalValorCondicion = $("#divValorCondicion").dialog({
                title: "Seleccionar Valor",
                width: 380,
                height: 400,
                modal: true,
                resizable: false
            });

            if ($('#txtValorCondicion_' + valCondicionActual).val() != '') { //editar valor
                $("#rbtCampoTipSol").attr("checked", false);
                $("#rbtValorEstatico").attr("checked", false);
                $("#rbtValorDinamico").attr("checked", false);
                if ($("#hdfValorCondicion_" + valCondicionActual).val() == '' && $("#hdfValorCampRelac_" + valCondicionActual).val() == '') { //es valor estático
                    $("#rbtValorEstatico").attr("checked", true);
                    $("#txtValorEstatico").val($("#txtValorCondicion_" + valCondicionActual).val());
                    $("#txtValorEstatico").attr("disabled", false);

                    $("#ddlCampoTipSol").attr("disabled", true);
                    $("#ddlCampoTipSol").val("-1");
                    //$("#ddlEntidadRelacion").attr("disabled", true);
                    $("#ddlCampoRelacion").attr("disabled", true);
                    $("#txtValorCampoRelacion").attr("disabled", true);
                    //$("#ddlEntidadRelacion").val("-1");
                    $("#ddlCampoRelacion").val("-1");
                    $("#txtValorCampoRelacion").val();
                } else if ($("#hdfValorCondicion_" + valCondicionActual).val() != '' && $("#hdfValorCampRelac_" + valCondicionActual).val() == '') { //valor es campo de solicitud
                    $("#rbtCampoTipSol").attr("checked", true);
                    $("#ddlCampoTipSol").val($('#hdfValorCondicion_' + valCondicionActual).val());
                    $("#ddlCampoTipSol").attr("disabled", false);

                    $("#txtValorEstatico").attr("disabled", true);
                    $("#txtValorEstatico").val("");
                    //$("#ddlEntidadRelacion").attr("disabled", true);
                    $("#ddlCampoRelacion").attr("disabled", true);
                    $("#txtValorCampoRelacion").attr("disabled", true);
                    //$("#ddlEntidadRelacion").val("-1");
                    $("#ddlCampoRelacion").val("-1");
                    $("#txtValorCampoRelacion").val();
                } else if ($("#hdfValorCondicion_" + valCondicionActual).val() != '' && $("#hdfValorCampRelac_" + valCondicionActual).val() != '') { //es valor dinamico (relacion con otra entidad)
                    $("#rbtValorDinamico").attr("checked", true);
                    $("#ddlCampoRelacion").attr("disabled", false);
                    $("#txtValorCampoRelacion").val($("#txtValorCondicion_" + valCondicionActual).val());
                    $("#hdfValorCampoRelacion").val($("#hdfValorCondicion_" + valCondicionActual).val());
                    $("#txtValorCampoRelacion").attr("disabled", false);
                }
            } else { //nuevo
                $("#rbtCampoTipSol").attr("checked", true);
                $("#ddlCampoTipSol").attr("disabled", false);
                $("#ddlCampoTipSol").focus();

                $("#ddlCampoTipSol").val("-1");
                $("#txtValorEstatico").attr("disabled", true);
                $("#txtValorEstatico").val('');
                //$("#ddlEntidadRelacion").attr("disabled", true);
                $("#ddlCampoRelacion").attr("disabled", true);
                //$("#ddlEntidadRelacion").val("-1");
                $("#ddlCampoRelacion").val("-1");
                $("#txtValorCampoRelacion").attr('disabled', true);
                $("#txtValorCampoRelacion").val('');
                $("#hdfValorCampoRelacion").val('');
            }
        } else {
            alertaExterna("Debe seleccionar un Campo para la condición");
        }
    });

    $("input[name=rbtTipoValor]").change(function () {
        if (this.value == "1") { //valor estático
            $("#txtValorEstatico").attr("disabled", false);

            $("#ddlCampoTipSol").attr("disabled", true);
            $("#ddlCampoTipSol").val("-1");

            //$("#ddlEntidadRelacion").attr("disabled", true);
            $("#ddlCampoRelacion").attr("disabled", true);
            $("#txtValorCampoRelacion").attr("disabled", true);
            //$("#ddlEntidadRelacion").val("-1");
            $("#ddlCampoRelacion").val("-1");
            $("#txtValorCampoRelacion").attr("disabled", true);
            $("#txtValorCampoRelacion").val('');
        } else if (this.value == "2") { //entidad relacionada
            //$("#ddlEntidadRelacion").attr("disabled", false);
            $("#ddlCampoRelacion").attr("disabled", false);
            //$("#txtValorCampoRelacion").attr("disabled", false);
            $("#txtValorCampoRelacion").val('');

            $("#txtValorEstatico").attr("disabled", true);
            $("#txtValorEstatico").val('');

            $("#ddlCampoTipSol").attr("disabled", true);
            $("#ddlCampoTipSol").val("-1");
        } else if (this.value == "3") { //campo solicitud
            $("#ddlCampoTipSol").attr("disabled", false);

            $("#txtValorEstatico").attr("disabled", true);
            $("#txtValorEstatico").val('');

            //$("#ddlEntidadRelacion").attr("disabled", false);
            $("#ddlCampoRelacion").attr("disabled", true);
            $("#txtValorCampoRelacion").attr("disabled", true);
            //$("#ddlEntidadRelacion").val("-1");
            $("#ddlCampoRelacion").val("-1");
            $("#txtValorCampoRelacion").val('');
        }
    });

    $("#txtValorEstatico").live('keypress', function (e) {
        if (e.which == '13') {
            btnAgregarValorCondicion.click();
        }
    });
    $("#txtValorCampoRelacion").live('keypress', function (e) {
        if (e.which == '13') {
            if ($("#hdfValorCampoRelacion").val() != '') {
                btnAgregarValorCondicion.click();
            } else {
                alertaExterna("Seleccione un valor de la lista.");
            }
        }
    });

    $("#ddlCampoRelacion").live("change", function () {
        //alert(this.value);
        $("#txtValorCampoRelacion").val("");
        $("#hdfValorCampoRelacion").val("");
        if (this.value != '-1') {
            $("#txtValorCampoRelacion").attr("disabled", false);
        } else {
            $("#txtValorCampoRelacion").attr("disabled", true);
        }
    });

    $("#txtValorCampoRelacion").keypress(function () {
        Selecciono = false;
    });
    $("#txtValorCampoRelacion").autocomplete({
        minLength: 0,
        source: function (request, response) {
            $.ajax({
                type: "POST",
                url: "Adm_SolicitudesConfiguracion.aspx/ListarRegistrosEntidad",
                data: "{'inMaxFil': '100'," +
                       "'inCodent': '" + vIdEntFor + "'," +
                       "'vcValBus': '" + $("#txtValorCampoRelacion").val() + "'," +
                       "'inCodCam': '" + $("#ddlCampoRelacion").val() + "'," +
                       "'vcFiltroEntidad': '" + vcFiltroEntidad + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {
                    response($.map(result.d, function (item) {
                        return {
                            label: item.Nombre,
                            valor: item.Codigo
                        }
                    }));
                },
                cache: false,
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    alertaExterna(errorThrown);
                }
            });

        },
        focus: function (event, ui) {
            $("#txtValorCampoRelacion").val(ui.item.label);
            return false;
        },
        select: function (event, ui) {
            Selecciono = true;
            $("#txtValorCampoRelacion").val(ui.item.label);
            $("#hdfValorCampoRelacion").val(ui.item.valor);
            return false;
        },
        change: function (event, ui) {
            if (!Selecciono) {
                $("#hdfValorCampoRelacion").val("");
                $("#txtValorCampoRelacion").val("");
            };
            return false;
        },
        open: function (event, ui) {
            Selecciono = false;
            return false;
        }
    }).data("autocomplete")._renderItem = function (ul, item) {
        return $("<li></li>")
			        .data("item.autocomplete", item)
			        .append("<a>" + item.label + "</a>")
			        .appendTo(ul);
    };

    $("#btnAgregarValorCondicion").live("click", function () {
        var valorCond, textoCond, valCampRe;
        if ($("#rbtCampoTipSol").is(":checked")) { //campo de solicitud
            valorCond = $("#ddlCampoTipSol").val();
            textoCond = $("#ddlCampoTipSol option:selected").text();
            valCampRe = '';
            if (valorCond == "-1") {
                alertaExterna("Debe seleccionar un campo de la solicitud.");
                return;
            }
        } else if ($("#rbtValorEstatico").is(":checked")) { //valor estatico
            valorCond = '';
            textoCond = $("#txtValorEstatico").val();
            valCampRe = '';
            if (textoCond == '') {
                alertaExterna("Debe ingresar un valor estático");
                return;
            }
        } else if ($("#rbtValorDinamico").is(":checked")) { //campo de entidad relacionada
            textoCond = $("#txtValorCampoRelacion").val();
            valCampRe = $("#ddlCampoRelacion").val();
            valorCond = $("#hdfValorCampoRelacion").val();
            //if (valorCond == '') {
            if (textoCond == '') {
                alertaExterna("Debe ingresar un valor para el campo relacionado.");
                return;
            }
        }
        $("#txtValorCondicion_" + valCondicionActual).val(textoCond);
        $("#hdfValorCondicion_" + valCondicionActual).val(valorCond);
        $("#hdfValorCampRelac_" + valCondicionActual).val(valCampRe);
        //finalizar
        $("#divValorCondicion").dialog("close");
        if (lstNumCond[$(lstNumCond).length - 1] == valCondicionActual) { //si es la última condición, agregar condición
            //$("#imgQuitarCond_" + valCondicionActual).show();
            NuevaCondicion1();
        }
    });

    $("#btnCancelarValorCondicion").live("click", function () {
        $("#divValorCondicion").dialog("close");
    });

    $('.BtnQuitarCondicion').live("click", function () {
        var btnId = $(this).attr("id");
        var numCondicionElim = btnId.split("_")[1];
        $("#dvCondicion_" + numCondicionElim).html("");
        //var trid = $(this).closest('tr').attr('id'); // table row ID 
        lstNumCond = jQuery.grep(lstNumCond, function (value) {
            return value != numCondicionElim;
        });
    });
    //fin tipo dato referencia

    var inRow = 1;
    var LongDat = $("#hdfTamano").val().split(',');
    var TextoParametros = ['', 'Ej: 10,2 (Use "Coma" como separador)', 'Max', '', '', 'Ej: si,no (Use "Coma" como separador)', '', 'Ej: bmp,png,jpg', ''];
    var vcMensajeClave = "Ej: {Empleado} (Use '{ }')";
    var vcParametroDecimal = 'Ej: 10,2; donde 2 es la cantidad de decimales y 10 es la cantidad total de dígitos (Use "Coma" como separador)';
    var inNumCamDef = 6;
    var inNumSolicitudes = 0;
    var biPrimerEstApr = "32";
    var biPrimerEstPro = "6";

    var mydata = [{ Idd: "in0_daFechaCreacion", Campo: "daFechaCreacion", Descripcion: "Fecha Creación", IdTipoDato: "5", TipoDato: "Fecha - Hora", Tamano: "", Activo: "True" },
                    { Idd: "in0_daFechaModificacion", Campo: "daFechaModificacion", Descripcion: "Fecha Modificación", IdTipoDato: "5", TipoDato: "Fecha - Hora", Tamano: "", Activo: "True" },
    //                    { Idd: "in0_F_inFasSol", Campo: "F_inFasSol", Descripcion: "Fase", IdTipoDato: "1", TipoDato: "Numérico Entero", Tamano: "" },
                    {Idd: "in0_F_vcCodEmp", Campo: "F_vcCodEmp", Descripcion: "Empleado", IdTipoDato: "3", TipoDato: "Texto", Tamano: "75", Activo: "True" }, //cambio de tamaño de campo empleado de 15 a 75
                    {Idd: "in0_inUsuarioCreacion", Campo: "inUsuarioCreacion", Descripcion: "Usuario Creación", IdTipoDato: "1", TipoDato: "Numérico Entero", Tamano: "", Activo: "True" },
                    { Idd: "in0_inUsuarioModificacion", Campo: "inUsuarioModificacion", Descripcion: "Usuario Modificación", IdTipoDato: "1", TipoDato: "Numérico Entero", Tamano: "", Activo: "True" }
                    , { Idd: 'in0_vcCodigo', Campo: 'vcCodigo', Descripcion: 'Código', IdTipoDato: "3", TipoDato: "Texto", Tamano: "15", Activo: "True" }, //agregado 08-09-2014 - wapumayta
                 ];

    //    var mydata = [{ Idd: "in0_daFechaCreacion", Campo: "daFechaCreacion", Descripcion: "Fecha Creación", IdTipoDato: "5", TipoDato: "Fecha - Hora", Tamano: "", Activo: "True", Visible: "True", Basico: "True", DescripcionDetalle: "Mostrará la fecha y hora de creación de la solicitud." },
    //                    { Idd: "in0_daFechaModificacion", Campo: "daFechaModificacion", Descripcion: "Fecha Modificación", IdTipoDato: "5", TipoDato: "Fecha - Hora", Tamano: "", Activo: "True", Visible: "True", Basico: "True", DescripcionDetalle: "Mostrará la última fecha y hora de modificación de la solicitud." },
    //                    { Idd: "in0_F_vcCodEmp", Campo: "F_vcCodEmp", Descripcion: "Empleado", IdTipoDato: "3", TipoDato: "Texto", Tamano: "75", Activo: "True", Visible: "True", Basico: "True", DescripcionDetalle: "Mostrará el código y nombre del empleado a quien está a nombre la solicitud." }, //cambio de tamaño de campo empleado de 15 a 75
    //                    {Idd: "in0_inUsuarioCreacion", Campo: "inUsuarioCreacion", Descripcion: "Usuario Creación", IdTipoDato: "1", TipoDato: "Numérico Entero", Tamano: "", Activo: "True", Visible: "True", Basico: "True", DescripcionDetalle: "Mostrará el usuario que creó la solicitud." },
    //                    { Idd: "in0_inUsuarioModificacion", Campo: "inUsuarioModificacion", Descripcion: "Usuario Modificación", IdTipoDato: "1", TipoDato: "Numérico Entero", Tamano: "", Activo: "True", Visible: "True", Basico: "True", DescripcionDetalle: "Mostrará el último usuario que modificó la solicitud." },
    //                    { Idd: 'in0_vcCodigo', Campo: 'vcCodigo', Descripcion: 'Código', IdTipoDato: "3", TipoDato: "Texto", Tamano: "15", Activo: "True", Visible: "True", Basico: "True", DescripcionDetalle: "Mostrará el código de la solicitud."} //agregado 08-09-2014 - wapumayta
    //                 ];

    $(".accordion").accordion({
        collapsible: true,
        autoHeight: false
    });

    //    var accordion = $("#AccordionJQ1").data("accordion");
    //    accordion._std_clickHandler = accordion._clickHandler;
    //    accordion._clickHandler = function (event, target) {
    //        var clicked = $(event.currentTarget || target);
    //        if (!clicked.hasClass("ui-state-disabled")) this._std_clickHandler(event, target);
    //    };
    if ($("#hdfCodTipSol").val() == "") {
        for (var i = 0; i < $("#ddlEstadoAprobacion")[0].options.length; i++) {
            fnAgregarEstadoAprobacion($("#ddlEstadoAprobacion")[0].options[i].value, $("#ddlEstadoAprobacion")[0].options[i].text);
            //fnAgregarEstadoAprobacion($("#ddlEstadoAprobacion")[0].options[i].value, $("#ddlEstadoAprobacion")[0].options[i].text);
        }
        for (var i = 0; i < $("#ddlEstadoProceso")[0].options.length; i++) {
            fnAgregarEstadoProceso($("#ddlEstadoProceso")[0].options[i].value, $("#ddlEstadoProceso")[0].options[i].text);
        }
        fnUsuarioEspecifico();
    }

    fnUsuarioEspecifico();
    fnDeshabilitarControlesMensajeApr();
    fnDeshabilitarControlesMensajePro();
    fnActualizarEtiquetasSemaforosApr();
    fnActualizarEtiquetasSemaforosPro();
    fnActualizaLabelReglaAutomaticaApr();
    fnActualizaLabelReglaAutomaticaPro();

    $("#txtTabla").keypress(ValidarNoEspacio).focusout(ValidarNoEspacio_focusout);
    $("#txtValorFase").keypress(ValidarNoEspacio).focusout(ValidarNoEspacio_focusout);
    $("#txtPrefijo").keypress(ValidarNoEspacio).focusout(ValidarNoEspacio_focusout);

    ValidarNumeroEnCajaTexto("txtMonto", ValidarDecimal, oCulturaLocal, false);
    //    ValidarNumeroEnCajaTexto("txtValorObjetivoApr", ValidarEnteroPositivo);
    //    ValidarNumeroEnCajaTexto("txtValorMaximoApr", ValidarEnteroPositivo);
    //    ValidarNumeroEnCajaTexto("txtValorObjetivoPro", ValidarEnteroPositivo);
    //    ValidarNumeroEnCajaTexto("txtValorMaximoPro", ValidarEnteroPositivo);
    $("#txtValorObjetivoApr").css({ "text-align": "right" });
    $("#txtValorMaximoApr").css({ "text-align": "right" });
    $("#txtValorObjetivoPro").css({ "text-align": "right" });
    $("#txtValorMaximoPro").css({ "text-align": "right" });

    $("#txtValorObjetivoApr,#txtValorMaximoApr,#txtValorObjetivoPro,#txtValorMaximoPro").keypress(function (event) {
        if (event.keyCode) {
            if (event.keyCode > 47 && event.keyCode < 58)
                return true;
            else
                return false;
        }
        if (event.which) {
            if (event.which > 47 && event.which < 58)
                return true;
            else
                return false;
        }
    });

    $("#txtValorObjetivoApr").change(function () { ValidarValoresSemaforosAprobacion("#txtValorObjetivoApr"); });
    $("#txtValorMaximoApr").change(function () { ValidarValoresSemaforosAprobacion("#txtValorMaximoApr"); });
    $("#txtValorObjetivoPro").change(function () { ValidarValoresSemaforosProceso("#txtValorObjetivoPro"); });
    $("#txtValorMaximoPro").change(function () { ValidarValoresSemaforosProceso("#txtValorMaximoPro"); });

    $("#txtCampo").keypress(ValidarNoEspacio).focusout(ValidarNoEspacio_focusout);

    $('#txtClave').keypress(function (event) {
        if (event.which == 92) {
            event.preventDefault(); //stop character from entering input
        }
    });

    $("#txtClave").addClass("txtBusqueda");
    $("#txtClave").val(vcMensajeClave);

    $("#ddlLineaTipo").change(function () {
        $("#ddlFinanciamiento").empty();
        if (this.value != "-1") {
            $.ajax({
                type: "POST",
                url: "Adm_SolicitudesConfiguracion.aspx/ListarFinanciamiento",
                data: "{'inTipLin': '" + this.value + "'}", //inTipLin = 1 (empleados que perteneces a un grupo con tipo de linea staff)
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {
                    //$('#ddlFinanciamiento').append(new Option('<Ninguno>', '0'));
                    $('#ddlFinanciamiento').append('<option value="0">--Ninguno--</option>');

                    if (result.d.length > 0) {
                        for (var i = 0; i < result.d.length; i++) {
                            //$('#ddlFinanciamiento').append(new Option(result.d[i].DesCor, result.d[i].Id));
                            $('#ddlFinanciamiento').append('<option value="' + result.d[i].Id + '">' + result.d[i].DesCor + '</option>');
                        }
                    }
                },
                error: function (xhr, err, thrErr) {
                    MostrarErrorAjax(xhr, err, thrErr);
                }
            });
        } else {
            //$('#ddlFinanciamiento').append(new Option('Seleccione Tipo de Línea', '-2'));
            $('#ddlFinanciamiento').append('<option value="-2">Seleccione Tipo de Línea</option>');
        }
        //$("#ddlFraccionamiento").val("0");
        $('input[name=chkMontoFijo]').attr('checked', true);
        $("#trMonto").hide();
        //$("#trFraccionamiento").hide();
        $("#trMontoFijo").hide();
        $("#trEsDevolucion").hide();
        $("#txtMonto").val("0.00");
    });

    if ($('input[name=chkMontoFijo]').is(':checked') && $("#ddlFinanciamiento").val() != "0") {
        $("#trMonto").show();
    }

    if ($("#hdfCodTipSol").val() != "") {
        inNumSolicitudes = $("#hdfNumSolicitudes").val();
    }

    $("#txtDescripcionTipo").live("change", function () {
        //if ($("#txtDescripcionTipo").val() != "") {
        //    $('input:checkbox[id$=chkTecnicoCorApr]').next().text('Técnico de la Solicitud ' + $("#txtDescripcionTipo").val());
        //    $('input:checkbox[id$=chkTecnicoCorPro]').next().text('Técnico de la Solicitud ' + $("#txtDescripcionTipo").val());
        //} else {
        //    $('input:checkbox[id$=chkTecnicoCorApr]').next().text('Técnico de la Solicitud');
        //    $('input:checkbox[id$=chkTecnicoCorPro]').next().text('Técnico de la Solicitud');
        //}
    })

    //$('#chkRespUsuario').change(function () {
    //    fnUsuarioEspecifico();
    //});
    //
    //$('#chkRespArea').change(function () {
    //    fnResponsableArea();
    //});
    //
    //$('#chkUmbralAprobacion').change(function () {
    //    fnUmbralAprobacion();
    //});
    //
    //$('#chkUmbralProceso').change(function () {
    //    fnUmbralProceso();
    //})

    $("#btnEmpleado").click(function () {
        var $width = 740;
        var $height = 505;
        var $Pagina = '../../Consultar/Con_SeleccionArea.aspx?Tipo=2&Multiple=0';
        $("#ifArea").attr("src", $Pagina);
        Modal = $('#dvArea').dialog({
            title: "Seleccionar empleado",
            width: $width,
            height: $height,
            modal: true,
            resizable: false
        });
    });

    $("#txtValorObjetivoApr,#txtValorMaximoApr").change(function () {
        fnActualizarEtiquetasSemaforosApr();
    });

    $("#txtValorObjetivoPro,#txtValorMaximoPro").change(function () {
        fnActualizarEtiquetasSemaforosPro();
    });

    $('#chkEnviarCorreoUmbApr').change(function () {
        if ($(this).is(":checked"))
            $("#dvMensajeUmbApr").show();
        else {
            $("#dvMensajeUmbApr").hide();
            $("#ddlEstadoFinReglaApr").val("-1");
        }
    });

    $('#chkEnviarCorreoUmbPro').change(function () {
        if ($(this).is(":checked"))
            $("#dvMensajeUmbPro").show();
        else
            $("#dvMensajeUmbPro").hide();
    });


    $('#chkEstadoAutomaticoApr').change(function () {
        fnActualizaLabelReglaAutomaticaApr();
    });
    $('#ddlEstadoFinReglaApr').change(function () {
        fnActualizaLabelReglaAutomaticaApr();
        validarSeleccionEstadoFinal("#ddlEstadoIniReglaApr", "#ddlEstadoFinReglaApr", "1");
    });

    $('#chkEstadoAutomaticoPro,#ddlEstadoFinReglaPro').change(function () {
        fnActualizaLabelReglaAutomaticaPro();
        validarSeleccionEstadoFinal("#ddlEstadoProceso", "#ddlEstadoFinReglaPro", "2");
    });

    $('#chkEnviarCorreoApr').live("change", function () {
        //if (inNumSolicitudes == 0) {
        if ($(this).is(":checked"))
            fnHabilitarControlesMensajeApr();
        else
            fnDeshabilitarControlesMensajeApr();
        //}
    });

    $('#chkEnviarCorreoPro').live("change", function () {
        //if (inNumSolicitudes == 0) {
        if ($(this).is(":checked"))
            fnHabilitarControlesMensajePro();
        else {
            if (vcTabProSel == "tbMensajeProceso")
                $("#tabEstadoProceso").tabs('option', 'selected', 0);
            fnDeshabilitarControlesMensajePro();
        }
        //}
    });


    //    //-------------------------------------FINANCIAMIENTO-------------------------------------//

    //    //combo multiple
    //    var arMeses = [{ valor: 1, mes: 'Enero' }, { valor: 2, mes: 'Febrero' }, { valor: 3, mes: 'Marzo' }, { valor: 4, mes: 'Abril' }, { valor: 5, mes: 'Mayo' }, { valor: 6, mes: 'Junio' }, { valor: 7, mes: 'Julio' }, { valor: 8, mes: 'Agosto' }, { valor: 9, mes: 'Septiembre' }, { valor: 10, mes: 'Octubre' }, { valor: 11, mes: 'Noviembre' }, { valor: 12, mes: 'Diciembre'}];
    //    var arMesesShort = [{ valor: 1, mes: 'Ene' }, { valor: 2, mes: 'Feb' }, { valor: 3, mes: 'Mar' }, { valor: 4, mes: 'Abr' }, { valor: 5, mes: 'May' }, { valor: 6, mes: 'Jun' }, { valor: 7, mes: 'Jul' }, { valor: 8, mes: 'Ago' }, { valor: 9, mes: 'Sep' }, { valor: 10, mes: 'Oct' }, { valor: 11, mes: 'Nov' }, { valor: 12, mes: 'Dic'}];
    //    var arValTipos = [];
    //    var arNombreTipos = [];
    //    //---
    //    //cuotas dobles
    //    var arMesesCuotasDobles = [];
    //    var arNomMesesCuotasDobles = [];
    //    //---

    //    var oFinanciamientoTipo;

    //    $("#txtDescripcion").attr('maxlength', '1000');
    //    oFinanciamientoTipo = new MOV_CAM_FinanciamientoTipo();

    //    ko.validation.rules.pattern.message = 'Invalid.';
    //    ko.validation.configure({
    //        registerExtenders: true,
    //        messagesOnModified: true,
    //        insertMessages: true,
    //        parseInputAttributes: true,
    //        messageTemplate: null
    //    });
    //    ko.applyBindings(oFinanciamientoTipo);
    //    oFinanciamientoTipo.errors = ko.validation.group(oFinanciamientoTipo);

    //    //$("input:checkbox,input:radio,input:file").uniform();

    //    //////////////////////combobox multiple
    //    $("#ddlMesesPagoCuotas").removeClass("ui-widget-content ui-corner-all");
    //    $("#ddlMesesPagoCuotas").css("padding", "0px");
    //    $("#ddlMesesPagoCuotas").css("margin", "0px");
    //    $("#ddlMesesPagoCuotas").kendoComboBox({
    //        placeholder: "<--Seleccione-->",
    //        dataTextField: "mes",
    //        dataValueField: "valor",
    //        template: '<input class="chkVista" type="checkbox" id="chkMesCuota-${ data.valor }">${ data.mes }</input>',
    //        dataSource: arMeses,
    //        select: function (e) {
    //            e.sender._blur = function () { };
    //            var txt = e.item.text();
    //            arValTipos = [];
    //            arNombreTipos = [];
    //            for (var i = 0; i < arMeses.length; i++) {
    //                if ($("#chkMesCuota-" + arMeses[i].valor).is(':checked')) {
    //                    arValTipos.push(arMesesShort[i].valor);
    //                    arNombreTipos.push(arMesesShort[i].mes);
    //                } else {
    //                    arValTipos = jQuery.grep(arValTipos, function (value) {
    //                        return value != arMesesShort[i].valor;
    //                    });
    //                    arNombreTipos = jQuery.grep(arNombreTipos, function (value) {
    //                        return value != arMesesShort[i].mes;
    //                    });
    //                };
    //            };
    //            e.sender._text = function () { return arNombreTipos.join(","); };
    //        },
    //        close: function (e) {
    //            //alert(arValTipos.join(','));
    //        }
    //    });
    //    /////////////////////fin combo multiple


    //    //COMO MULTIPLES CUOTAS DOBLES
    //    $("#ddlMesesCuotasDobles").removeClass("ui-widget-content ui-corner-all");
    //    $("#ddlMesesCuotasDobles").css("padding", "0px");
    //    $("#ddlMesesCuotasDobles").css("margin", "0px");
    //    $("#ddlMesesCuotasDobles").kendoComboBox({
    //        ignoreCase: false,
    //        placeholder: "<--Seleccione-->",
    //        dataTextField: "mes",
    //        dataValueField: "valor",
    //        template: '<input class="chkVista" type="checkbox" id="chkMesDobles-${ data.valor }">${ data.mes }</input>',
    //        dataSource: arMeses,
    //        select: function (e) {
    //            e.sender._blur = function () { };
    //            var txt = e.item.text();
    //            arMesesCuotasDobles = [];
    //            arNomMesesCuotasDobles = [];
    //            for (var i = 0; i < arMeses.length; i++) {
    //                if ($("#chkMesDobles-" + arMeses[i].valor).is(':checked')) {
    //                    arMesesCuotasDobles.push(arMesesShort[i].valor);
    //                    arNomMesesCuotasDobles.push(arMesesShort[i].mes);
    //                } else {
    //                    arMesesCuotasDobles = jQuery.grep(arMesesCuotasDobles, function (value) {
    //                        return value != arMesesShort[i].valor;
    //                    });
    //                    arNomMesesCuotasDobles = jQuery.grep(arNomMesesCuotasDobles, function (value) {
    //                        return value != arMesesShort[i].mes;
    //                    });
    //                };
    //            };
    //            e.sender._text = function () { return arNomMesesCuotasDobles.join(","); };
    //        },
    //        close: function (e) {
    //            //alert(arValTipos.join(','));
    //        }
    //    });
    //    //FIN COMBO CUOTAS DOBLES


    //------------------------------EVENTOS DE BOTONES DE FASE------------------------------//
    //
    //    $("#btnAgregarFase").live("click", function () {
    //        fnFaseAgregar();
    //    });
    //
    //    $("#btnEditarFase").live("click", function () {
    //        fnFaseEditar();
    //    });
    //
    //    $("#btnEliminarFase").live("click", function () {
    //        fnFaseEliminar();
    //    });
    //
    //    $("#btnSubirFase").live("click", function () {
    //        fnFaseSubir();
    //    });
    //
    //    $("#btnBajarFase").live("click", function () {
    //        fnFaseBajar();
    //    });
    //
    //    $("#lstFases").live("dblclick", function () {
    //        //fnFaseEditar();
    //    });
    //
    //    $("#btnGuardarFase").click(function (event) {
    //        fnGuardarFase();
    //    });
    //
    //    $('#txtValorFase').keypress(function (event) {
    //        if (event.which == '13') {
    //            fnGuardarFase();
    //        }
    //    });
    //
    //    $("#btnCerrarFase").click(function (event) {
    //        $('#divValorFase').dialog("close");
    //    });
    //
    //    $(".btnFase").button();
    //    $(".btnFase").css({ "width": "80px" });
    //
    //---------------------------------------------------------------------------------------->>
    //
    //-------------------------ACTUALIZANDO FASES A LISTA PRINCIPAL-------------------------//
    //
    //    function fnGuardarFase() {
    //        var Valor = $("#txtValorFase").val();
    //        Valor = Valor.replace("'", "");
    //
    //        if ($.trim(Valor) == '') {
    //            $("#txtValorFase").val('');
    //            alertaExterna('Debe ingresar un valor');
    //            $("#txtValorFase").focus();
    //            return;
    //        }
    //        if (TipoGuardar == 'A') {
    //
    //            if (fnValidaExisteFase(Valor) == 1) {
    //                alertaExterna('El valor ingresado ya existe');
    //                $("#txtValorFase").focus();
    //                return;
    //            }
    //            $('#lstFases').append('<option value="' + Valor + '">' + Valor + '</option>');
    //            $("#txtValorFase").val('');
    //            $("#txtValorFase").focus();
    //            //fnAgregarMultiplesFases(Valor);
    //        }
    //        else {
    //            if (ValorInicialFase.toString().toLowerCase() != Valor.toString().toLowerCase()) {
    //
    //                if (fnValidaExisteFase(Valor) == 1) {
    //                    alertaExterna('El valor ingresado ya existe');
    //                    $("#txtValorFase").focus();
    //                    return;
    //                }
    //
    //                $("#lstFases option[value='" + ValorInicialFase + "']").after('<option value="' + Valor + '">' + Valor + '</option>');
    //                $("#lstFases option[value='" + ValorInicialFase + "']").remove();
    //            }
    //            $('#divValorFase').dialog("close");
    //            $("#lstFases").focus();
    //        }
    //    }
    //
    //    function fnFaseEliminar() {
    //        if ($('#lstFases option').length == 0) {
    //            return;
    //        }
    //
    //        if ($('#lstFases option:selected').length == 0) {
    //            alertaExterna('Seleccione un ítem como mínimo');
    //            $('#lstFases').focus();
    //            return;
    //        }
    //
    //        $('#lstFases option:selected').remove();
    //        fnEliminarMultiplesFases();
    //    }
    //
    //    function fnEliminarMultiplesFases() {
    //
    //        $('#ddlFase').empty();
    //
    //        for (var i = 0; i < $("#lstFases")[0].options.length; i++) {
    //            var vcValor = $("#lstFases")[0].options[i].value;
    //            $("#ddlFase").append($('<option></option>').val(vcValor).html(vcValor));
    //        }
    //
    //        var vcFases = Object.keys(arTipSol);
    //        var inLen = vcFases.length;
    //        for (i = 0; i < inLen; i++) {
    //            var biExiste = 0;
    //            for (var j = 0; j < $("#lstFases")[0].options.length; j++) {
    //                if (vcFases[i] == $("#lstFases")[0].options[j].value)
    //                    biExiste = 1;
    //            }
    //
    //            if (biExiste == 0)
    //                delete arTipSol[vcFases[i]];
    //        }
    //
    //        if ($("#lstFases")[0].options.length == 0)
    //            $("#dvTabs").hide();
    //    }
    //
    //---------------------------------------------------------------------------------------->>

    //---------------------------------AGREGAR ESTADOS PROCESO--------------------------------//

    function fnAgregarEstadoAprobacion(Valor, Nombre) {

        //Estados
        arTipSol.EstadoAprobacion[Nombre] = [];
        arTipSol.EstadoAprobacion[Nombre].Id = Valor;

        //Umbrales
        if (Valor == 34 || Valor == 35) {//34-Aprobada 35-Rechazada
            arTipSol.Umbrales.Aprobacion[Nombre] = [];
            arTipSol.Umbrales.Aprobacion[Nombre].EstadoInicial = '33';
            arTipSol.Umbrales.Aprobacion[Nombre].EstadoFinal = Valor;
            arTipSol.Umbrales.Aprobacion[Nombre].ValorObjetivo = '';
            arTipSol.Umbrales.Aprobacion[Nombre].ValorMaximo = '';
            arTipSol.Umbrales.Aprobacion[Nombre].EnviarCorreo = '';
            arTipSol.Umbrales.Aprobacion[Nombre].Destinatarios = '';
            arTipSol.Umbrales.Aprobacion[Nombre].Asunto = '';
            arTipSol.Umbrales.Aprobacion[Nombre].Mensaje = '';
            arTipSol.Umbrales.Aprobacion[Nombre].IdUmbral = '0';
        }

        //Reglas
        arTipSol.EstadoAprobacion[Nombre].IdRegla = '0';
        arTipSol.EstadoAprobacion[Nombre].ReglaAutomatica = '0';
        arTipSol.EstadoAprobacion[Nombre].IdEstadoFinal = '';

        //Mensajes
        arTipSol.EstadoAprobacion[Nombre].EnviarCorreo = '0';
        arTipSol.EstadoAprobacion[Nombre].Destinatarios = '';
        arTipSol.EstadoAprobacion[Nombre].Asunto = '';
        arTipSol.EstadoAprobacion[Nombre].Mensaje = '';
        arTipSol.EstadoAprobacion[Nombre].Propietario = '0';
        arTipSol.EstadoAprobacion[Nombre].UsuarioEspecifico = '0';
        arTipSol.EstadoAprobacion[Nombre].Responsable = '0';
        arTipSol.EstadoAprobacion[Nombre].Tecnico = '0';
        arTipSol.EstadoAprobacion[Nombre].IdMensaje = '0';
    }

    function fnAgregarEstadoProceso(Valor, Nombre) {
        //$("#ddlEstadoProceso").append($('<option></option>').val(Valor).html(Valor.replace("_", " ")));

        //Nombre = Nombre.replace(" ", "_");

        arTipSol.EstadoProceso[Nombre] = [];
        var estadoProceso = new EstadoProcesos();
        //eval("arTipSol.EstadoProceso." + Nombre + ".push[estadoProceso]");

        arTipSol.EstadoProceso[Nombre].Id = Valor;
        arTipSol.EstadoProceso[Nombre].EnviarCorreo = '0';
        arTipSol.EstadoProceso[Nombre].Destinatarios = '';
        arTipSol.EstadoProceso[Nombre].Asunto = '';
        arTipSol.EstadoProceso[Nombre].Mensaje = '';
        arTipSol.EstadoProceso[Nombre].Propietario = '0';
        arTipSol.EstadoProceso[Nombre].UsuarioEspecifico = '0';
        arTipSol.EstadoProceso[Nombre].Responsable = '0';
        arTipSol.EstadoProceso[Nombre].Tecnico = '0';
        arTipSol.EstadoProceso[Nombre].Campos = [];
        arTipSol.EstadoProceso[Nombre].IdMensaje = '0';

        //if (vcEstadoProcesos.length > 0) {
        var vcCampos = Object.keys(arTipSol.EstadoProceso[Nombre].Campos);

        for (var i = 0; i < mydata.length; i++) {
            arTipSol.EstadoProceso[Nombre].Campos[mydata[i].Campo] = {};
            if (mydata[i].Idd == "in0_F_vcCodEmp") {
                arTipSol.EstadoProceso[Nombre].Campos[mydata[i].Campo] = { Campo: mydata[i].Campo, Descripcion: arTipSol.EstadoProceso[Nombre].Campos[mydata[i].Campo].Descripcion, Visible: '1', Editable: '0', Obligatorio: '0', IdCampo: '0' };
            } else {
                arTipSol.EstadoProceso[Nombre].Campos[mydata[i].Campo] = { Campo: mydata[i].Campo, Descripcion: arTipSol.EstadoProceso[Nombre].Campos[mydata[i].Campo].Descripcion, Visible: '0', Editable: '0', Obligatorio: '0', IdCampo: '0' };
            }
        }

        for (var i = 0; i < vcCampos.length; i++) {
            arTipSol.EstadoProceso[Nombre].Campos[vcCampos[i]] = {};
            arTipSol.EstadoProceso[Nombre].Campos[vcCampos[i]] = { Campo: vcCampos[i], Descripcion: arTipSol.EstadoProceso[Nombre].Campos[vcCampos[i]].Descripcion, Visible: '-1', Editable: '-1', Obligatorio: '-1' };
        }
        //}

        if (Valor == 6) //Pendiente
            arTipSol.EstadoProceso[Nombre].Orden = '1';
        else if (Valor == 7) //Culminada
            arTipSol.EstadoProceso[Nombre].Orden = '3';
        else if (Valor == 8) //En Proceso
            arTipSol.EstadoProceso[Nombre].Orden = '2';
        else if (Valor == 9) //Anulada
            arTipSol.EstadoProceso[Nombre].Orden = '4';

        //eval("arTipSol.EstadoProceso." + Nombre + ".Orden = " + $('#ddlEstadoProceso option').length);

        //Umbrales
        //if (Valor == 6 || Valor == 8) {//7-Culminada 35-Anulada
        //    arTipSol.Umbrales.Proceso[Nombre] = [];
        //    arTipSol.Umbrales.Proceso[Nombre].Umbral = '0';
        //    arTipSol.Umbrales.Proceso[Nombre].EstadoInicial = '6';
        //    arTipSol.Umbrales.Proceso[Nombre].EstadoFinal = Valor;
        //    arTipSol.Umbrales.Proceso[Nombre].ValorObjetivo = '';
        //    arTipSol.Umbrales.Proceso[Nombre].ValorMaximo = '';
        //    arTipSol.Umbrales.Proceso[Nombre].EnviarCorreo = '';
        //    arTipSol.Umbrales.Proceso[Nombre].Destinatarios = '';
        //    arTipSol.Umbrales.Proceso[Nombre].Asunto = '';
        //    arTipSol.Umbrales.Proceso[Nombre].Mensaje = '';
        //    arTipSol.Umbrales.Proceso[Nombre].IdUmbral = '0';
        //}

        //Umbrales Nuevo - 
        var EstIni = '0';
        if (Valor == 7 || Valor == 9)
            EstIni = '8';
        else
            EstIni = '6';
        if (Valor != 6) {//7-Culminada 8-EnProceso 9-Anulada
            arTipSol.Umbrales.Proceso[Nombre] = [];
            arTipSol.Umbrales.Proceso[Nombre].Umbral = '0';
            arTipSol.Umbrales.Proceso[Nombre].EstadoInicial = EstIni;
            arTipSol.Umbrales.Proceso[Nombre].EstadoFinal = Valor;
            arTipSol.Umbrales.Proceso[Nombre].ValorObjetivo = '';
            arTipSol.Umbrales.Proceso[Nombre].ValorMaximo = '';
            arTipSol.Umbrales.Proceso[Nombre].EnviarCorreo = '';
            arTipSol.Umbrales.Proceso[Nombre].Destinatarios = '';
            arTipSol.Umbrales.Proceso[Nombre].Asunto = '';
            arTipSol.Umbrales.Proceso[Nombre].Mensaje = '';
            arTipSol.Umbrales.Proceso[Nombre].IdUmbral = '0';
        }

        //Reglas
        arTipSol.EstadoProceso[Nombre].IdRegla = '0';
        arTipSol.EstadoProceso[Nombre].ReglaAutomatica = '0';
        arTipSol.EstadoProceso[Nombre].IdEstadoFinal = '';



        $("#dvTabs").show();
    }

    //---------------------------------------------------------------------------------------->>

    //-------------------------------CÁLCULO DE TAMAÑO DE CAMPO-------------------------------//
    VerificarTamano();

    function VerificarTamano() {
        if (LongDat[$("#ddlTipoDato").prop('selectedIndex')] == 0) {
            $("#trTamDat").hide();
            $("#txtTamanoDato").val('');
            $("#trReferencia").hide();
        } else if (LongDat[$("#ddlTipoDato").prop('selectedIndex')] == 10) {
            $("#trTamDat").hide();
            $("#txtTamanoDato").val('');
            $("#trReferencia").show();
        } else {
            //alert(LongDat[$("#ddlTipoDato").prop('selectedIndex')]);
            $("#trReferencia").hide();
            $("#tdTamano").html('Tamaño');
            $("#divPicklist").hide();
            $("#lblMensajeTamano").show();
            $("#txtTamanoDato").show();
            if (LongDat[$("#ddlTipoDato").prop('selectedIndex')] == 3) {
                //Logico
                $("#txtTamanoDato").attr('maxlength', '35');
                $("#tdTamano").html('Valores');
            }
            if (LongDat[$("#ddlTipoDato").prop('selectedIndex')] == 2) {
                //Numero Decimal
                $("#txtTamanoDato").attr('maxlength', '4');
            }
            if (LongDat[$("#ddlTipoDato").prop('selectedIndex')] == 1) {
                //Texto
                $("#txtTamanoDato").attr('maxlength', '4');
            }
            if (LongDat[$("#ddlTipoDato").prop('selectedIndex')] == 8) {
                //Picklist
                //if (inNumSolicitudes == 0) {
                $("#divPicklist").show();
                $("#lblMensajeTamano").hide();
                $("#txtTamanoDato").hide();
                $("#tdTamano").html('Valores');
                $("#tbCampos").setGridWidth($(window).width() - 132); //115
                //}
            }
            if (LongDat[$("#ddlTipoDato").prop('selectedIndex')] == 9) {
                $("#tdTamano").html('Tipos de Extensión');
                $("#txtTamanoDato").attr('maxlength', '100');

            }
            $("#trTamDat").show();
            $("#txtTamanoDato").addClass("txtBusqueda");
            $("#txtTamanoDato").val('');
            $("#txtTamanoDato").val(TextoParametros[$("#ddlTipoDato").prop('selectedIndex')]);

            if (LongDat[$("#ddlTipoDato").prop('selectedIndex')] == 2) //Número Decimal
                $("#lblMensajeTamano").html(vcParametroDecimal);
            else
                $("#lblMensajeTamano").html(TextoParametros[$("#ddlTipoDato").prop('selectedIndex')]);
        }
    }

    $("#txtTamanoDato").focus(function () {
        if ($(this).hasClass("txtBusqueda")) {
            $(this).removeClass("txtBusqueda");
            $("#txtTamanoDato").val("");
        }
    });

    $("#txtTamanoDato").blur(function (i) {
        if ($("#txtTamanoDato").val() == "") {
            $(this).addClass("txtBusqueda");
            $("#txtTamanoDato").val(TextoParametros[$("#ddlTipoDato").prop('selectedIndex')]);
        }
    });

    $("#txtTamanoDato").keypress(VerificaTipo);
    $("#txtCampo").keypress(ValidarNoEspacio).focusout(ValidarNoEspacio_focusout);

    $("#txtTamanoDato").bind('paste', function (e) {
        return false;
    });

    $("#txtCampo").bind('paste', function (e) {
        return false;
    });

    $("#txtCampo").change(function () {
        if ($("#txtCampo").val() != "" && $("#txtDescripcion").val() == "")
            $("#txtDescripcion").val($("#txtCampo").val());
    });

    function VerificaTipo(event) {
        if (LongDat[$("#ddlTipoDato").prop('selectedIndex')] == 1) {
            return ValidarEnteroPositivo(event, $("#txtTamanoDato"));
        }
        else if (LongDat[$("#ddlTipoDato").prop('selectedIndex')] == 2 && $("#ddlTipoDato").prop('selectedIndex') != 5) {
            return ValidarDecimalComaPositivo(event, $("#txtTamanoDato"));
        }
        else if (LongDat[$("#ddlTipoDato").prop('selectedIndex')] == 9) {
            if (event.which == '32') //Sin Espacios
                return false;
            else
                return true;
        }
        else
            return true;
    }

    $("#ddlTipoDato").live("change", function () {
        VerificarTamano();
    });

    $('#ddlFinanciamiento').live('change', function () {
        if ($('#ddlFinanciamiento').val() == "0") {
            //$("#ddlFraccionamiento").val("0");
            $('input[name=chkMontoFijo]').attr('checked', true);
            $("#trEsDevolucion").hide();
            $("#trMonto").hide();
            //$("#trFraccionamiento").hide();
            $("#trMontoFijo").hide();
            $("#txtMonto").val("0.00");

            //$("#ddlFraccionamiento").prop('disabled', true);
            $("#chkMontoFijo").prop('disabled', true);
            $("#txtMonto").prop('disabled', true);
        } else {
            //$("#ddlFraccionamiento").val("0");
            $('input[name=chkMontoFijo]').attr('checked', false);
            //$("#trMonto").show();
            //$("#trFraccionamiento").show();
            if ($("#hdfPersonalizada").val() == "true") {
                $("#trEsDevolucion").show();
            }
            $("#trMontoFijo").show();
            $("#txtMonto").val("");
            $("#trMonto").hide();

            //$("#ddlFraccionamiento").prop('disabled', false);
            $("#chkMontoFijo").prop('disabled', false);
            $("#txtMonto").prop('disabled', false);
        }
    });

    $("#btnCerrar").live("click", function () {
        window.parent.tab.tabs("remove", window.parent.tab.tabs("option", "selected"));
    });

    //---------------------------------------------------------------------------------------->>

    //-----------------------------EVENTOS DE BOTONES DE PICKLIST-----------------------------//

    $("#btnPicklistAgregar").live("click", function () {
        fnPicklistAgregar();
    });

    $("#btnPicklistEditar").live("click", function () {
        fnPicklistEditar();
    });

    $("#btnPicklistEliminar").live("click", function () {
        if ($("#lblPicklistEliminar").text() == 'Eliminar') {
            fnPicklistEliminar();
        } else if ($("#lblPicklistEliminar").text() == 'Activar') {
            fnPicklistActivar();
        } else if ($("#lblPicklistEliminar").text() == 'Desactivar') {
            fnPicklistDesactivar();
        }
    });

    $("#btnPicklistSubir").live("click", function () {
        fnPicklistSubir();
    });

    $("#btnPicklistBajar").live("click", function () {
        fnPicklistBajar();
    });

    $("#lstPicklist").live("click", function () { //agregado 07-01-2015 wapumayta
        if ($($('#lstPicklist option:selected')[0]).attr("estado") == '1') {
            $("#btnPicklistEditar").button("option", "disabled", true);
            $("#lblPicklistEliminar").text('Desactivar');
        } else if ($($('#lstPicklist option:selected')[0]).attr("Estado") == '0') {
            $("#btnPicklistEditar").button("option", "disabled", true);
            $("#lblPicklistEliminar").text('Activar');
        } else {
            $("#btnPicklistEditar").button("option", "disabled", false);
            $("#lblPicklistEliminar").text('Eliminar');
        }
    });

    $("#lstPicklist").live("dblclick", function () {
        if ($($('#lstPicklist option:selected')[0]).attr("estado") == '2') { //agregado 07-01-2015 wapumayta
            fnPicklistEditar();
        }
    });

    $("#btnGuardarPicklist").click(function (event) {
        fnGuardarPicklist();
    });

    $('#txtValorPicklist').keypress(function (event) {
        if (event.which == '13') {
            fnGuardarPicklist();
        }
    });

    $("#btnCerrarPicklist").click(function (event) {
        $('#divValorPicklist').dialog("close");
    });

    $(".btnPicklist").button();
    $(".btnPicklist").css({ "width": "80px" });
    $("#lstPicklist").css({ "height": "150px" });

    //---------------------------------------------------------------------------------------->>

    //--------------------------CONFIGURACIÓN DE CAMPOS DE FORMULARIO-------------------------//
    function EstadoProcesos() {
        this.Campo;
        this.Descripcion;
        this.Visible;
        this.Editable;
        this.Obligatorio;
    }

    $(EstadoProcesos).extend({
        Campo: 'Campo',
        Campo: 'Descripcion',
        Visible: 'Visible',
        Editable: 'Editable',
        Obligatorio: 'Obligatorio'
    });

    $("#txtDescripcion").keyup(function (event) {
        if (event.keyCode == 13) {
            btnAgregar.click();
        }
    });

    $("#ddlTipoDato").live('keypress', function (e) {
        if (e.which == '13') {
            btnAgregar.click();
        }
    });

    $("#txtTamanoDato").keyup(function (event) {
        if (event.keyCode == 13) {
            btnAgregar.click();
        }
    });

    $("#btnAgregar").live("click", function () {
        var TamanoDato;
        var ListaActivos = ''; //agregado 07-01-2015 wapumayta
        var Activo = $("#hdfCampoActivo").val() == 'Activo' || $("#hdfCampoActivo").val() == 'True' ? 'True' : 'False';
        var vcCampo = $("#txtCampo").val();
        var vcDescripcion = $.trim($("#txtDescripcion").val());

        if (vcCampo == "") {
            alertaExterna("El campo es requerido");
            $("#txtCampo").focus();
            return;
        }

        if (vcDescripcion == "") {
            alertaExterna("La descripción es requerida");
            $("#txtDescripcion").focus();
            return;
        }

        if (LongDat[$("#ddlTipoDato").prop('selectedIndex')] == 8) {
            //PickList
            if ($('#lstPicklist option').length == 0) {
                alertaExterna('Debe ingresar como mínimo un valor en la lista');
                $('#lstPicklist').focus();
                return;
            } else { //validar al menos un valor activo
                var valorMinAct = false;
                $('#lstPicklist option').each(function () {
                    if ($(this).attr("estado") != '0') {
                        valorMinAct = true;
                    }
                });
                if (!valorMinAct) {
                    alertaExterna('Debe existir como mínimo un valor activo en la lista');
                    $('#lstPicklist').focus();
                    return;
                }
            }

            TamanoDato = '';
            $('#lstPicklist option').each(function () {
                TamanoDato = TamanoDato + "," + $(this).val();
                ListaActivos = ListaActivos + "," + $(this).attr("estado");
            });
            ListaActivos = ListaActivos.substring(1, ListaActivos.toString().length);
            TamanoDato = TamanoDato.substring(1, TamanoDato.toString().length);

            if (TamanoDato > 8000) {
                alertaExterna("Ingrese un valor de tamaño válido - No puede superar a 8000 caracteres");
                $('#lstPicklist').focus();
                return;
            }
        } else if (LongDat[$("#ddlTipoDato").prop('selectedIndex')] == 1) {
            TamanoDato = $.trim($("#txtTamanoDato").val());
            if (TamanoDato > 8000) {
                alertaExterna("Ingrese un valor de tamaño válido - No puede superar a 8000 caracteres");
                $('#lstPicklist').focus();
                return;
            }
        } else {
            TamanoDato = $.trim($("#txtTamanoDato").val());
        }

        if ($("#txtTamanoDato").is(":visible") && $("#txtTamanoDato").hasClass("txtBusqueda")) {
            if (LongDat[$("#ddlTipoDato").prop('selectedIndex')] == 9) {
                alertaExterna("Ingrese un valor de Tipos de Extensión valido.");
            }
            else {
                alertaExterna("Ingrese un valor de Tamaño válido.");
            }
            return;
        }

        //Tipo de dato referencia
        var vIdEntidad = '';
        var NombreEntidadReferencia = '';
        var vIdCamPK = '';
        var vIdCamDes = '';
        var NombreCampoDesc = '';
        var TamanoCampoRef = '';
        if ($("#divReferencia").is(":visible")) {
            vIdEntidad = $("#ddlEntidadReferencia").val();
            NombreEntidadReferencia = $("#ddlEntidadReferencia option:selected").text();
            vIdCamDes = $("#ddlCampoEntidad").val();
            NombreCampoDesc = $("#ddlCampoEntidad option:selected").text();

            var lstCamposConsultaPri = Object.keys(Campos);
            for (var i = 0; i < $(lstCamposConsultaPri).length; i++) {
                var btPri = Campos[lstCamposConsultaPri[i]].btIdPri;
                if (btPri == "True") {
                    vIdCamPK = Campos[lstCamposConsultaPri[i]].P_inCod;
                }
                //JHERRERA WAPUMAYTA 20150109: La longitud ahora siempre será 8000
                //if (vIdCamDes == Campos[lstCamposConsultaPri[i]].P_inCod) {
                //    TamanoCampoRef = Campos[lstCamposConsultaPri[i]].inLar;
                //}
            }
            TamanoDato = "8000";
            //TamanoDato = TamanoCampoRef

            //validaciones
            if (vIdEntidad == "-1") {
                alertaExterna("Seleccion un Entidad");
                return;
            }
            if (vIdCamPK == '') {
                alertaExterna("La entidad seleccionada no posee un campo PK");
                return;
            }
        }

        if (LongDat[$("#ddlTipoDato").prop('selectedIndex')] == 9) {
            if (TamanoDato.indexOf(".") >= 0 || TamanoDato.indexOf(";") >= 0 || TamanoDato.indexOf(":") >= 0 || TamanoDato.indexOf("/") >= 0 || TamanoDato.indexOf("\\") >= 0 || TamanoDato.indexOf("'") >= 0 ||
                TamanoDato.indexOf("-") >= 0 || TamanoDato.indexOf("_") >= 0 || TamanoDato.indexOf("*") >= 0 || TamanoDato.indexOf("$") >= 0 || TamanoDato.indexOf("%") >= 0 || TamanoDato.indexOf("#") >= 0 ||
                TamanoDato.indexOf("@") >= 0) {
                alertaExterna("Ninguna extensión valida debe contener: . : / \ ' - _ * $ % # @");
                return;
            }
            if (TamanoDato.indexOf(",") == 0 || TamanoDato.lastIndexOf(",") == TamanoDato.length - 1) {
                alertaExterna("No puede haber una ',' al inicio ni al final de los Tipos de Extensión.");
                return;
            }
        }

        var textoAgregar = $("#lblBotonAgregar").text();
        var ids = tbCampos.getDataIDs();
        var biExiste = 0;
        for (i = 0; i < ids.length; i++) {
            if ((tbCampos.getRowData(ids[i]))["Campo"] == vcCampo) {
                biExiste = 1;
            }
        }
        if (inRow == 1) { inRow = parseInt(inRow) + parseInt(ids.length); } //agregado 06-01-2015
        if (textoAgregar != "Agregar") { biExiste = 0; }
        if (biExiste == 0) {
            if (textoAgregar == "Agregar") { //agregar nuevo campo
                var datos = { Idd: "in_" + (inRow.toString().length == '1' ? '0' + inRow.toString() : inRow.toString()),
                    Campo: vcCampo,
                    Descripcion: vcDescripcion,
                    IdTipoDato: $("#ddlTipoDato").val(),
                    TipoDato: $("#ddlTipoDato option:selected").text(),
                    Tamano: TamanoDato.replace(/ /g, ""),
                    IdEntidad: vIdEntidad,
                    NomEntidad: NombreEntidadReferencia,
                    IdCamPK: vIdCamPK,
                    IdCamDes: vIdCamDes,
                    NomCamDes: NombreCampoDesc,
                    Activo: 'True',
                    ListaActivos: ListaActivos
                };

                tbCampos.jqGrid('addRowData', datos.Idd, datos);

                var vcEstadoProcesos = Object.keys(arTipSol.EstadoProceso);
                for (i = 0; i < vcEstadoProcesos.length; i++) {
                    arTipSol.EstadoProceso[vcEstadoProcesos[i]].Campos[vcCampo] = {};
                    arTipSol.EstadoProceso[vcEstadoProcesos[i]].Campos[vcCampo] = { Campo: vcCampo, Descripcion: vcDescripcion, Visible: '-1', Editable: '-1', Obligatorio: '-1', IdCampo: "0" };
                }

                var datosAcciones = { vcCampo: vcCampo,
                    vcDescripcion: vcDescripcion,
                    ddlVisible: "-1",
                    ddlEditable: "-1",
                    ddlObligatorio: "-1",
                    Activo: 'True'
                };
                tbCamposEstadoProceso.jqGrid('addRowData', vcCampo, datosAcciones);
                //tbCamposEstadoProceso.trigger("reloadGrid");

                if (LongDat[$("#ddlTipoDato").prop('selectedIndex')] != 9) {
                    //$("#ddlValor").append($('<option></option>').val(vcCampo).html(vcDescripcion));
                    //fnSortDropDownListByText("ddlValor");
                    fnAgregarParametro("0", vcCampo, vcDescripcion, "0", "0")

                    //dialog referencia
                    $("#ddlCampoTipSol").append($('<option></option>').val(vcCampo).html(vcDescripcion));
                    fnSortDropDownListByText("ddlCampoTipSol");
                }

                inRow = inRow + 1;
            } else { //editar campo
                var datos = {
                    Idd: idRowCampoEdicion,
                    Campo: vcCampo,
                    Descripcion: vcDescripcion,
                    IdTipoDato: $("#ddlTipoDato").val(),
                    TipoDato: $("#ddlTipoDato option:selected").text(),
                    Tamano: TamanoDato.replace(/ /g, ""),
                    IdEntidad: vIdEntidad,
                    NomEntidad: NombreEntidadReferencia,
                    IdCamPK: vIdCamPK,
                    IdCamDes: vIdCamDes,
                    NomCamDes: NombreCampoDesc,
                    Activo: Activo,
                    ListaActivos: ListaActivos
                };
                tbCampos.jqGrid('setRowData', idRowCampoEdicion, datos);

                //actualizar el combo de parametros ddlValor
                //                $("#ddlValor option[value='" + vcCampo + "']").remove();
                //                $("#ddlValor").append($('<option></option>').val(vcCampo).html(vcDescripcion));
                //                fnSortDropDownListByText("ddlValor");
                $('#ddlParametrosApr option[value="{' + vcCampo + '}"]').text('vcDescripcion');
                $('#ddlParametrosPro option[value="{' + vcCampo + '}"]').text('vcDescripcion');
                $('#ddlParametrosUmbApr option[value="{' + vcCampo + '}"]').text('vcDescripcion');
                $('#ddlParametrosUmbPro option[value="{' + vcCampo + '}"]').text('vcDescripcion');
                fnSortDropDownListByText("ddlParametrosApr");
                fnSortDropDownListByText("ddlParametrosPro");
                fnSortDropDownListByText("ddlParametrosUmbApr");
                fnSortDropDownListByText("ddlParametrosUmbPro");

                //actualizar combo en dialog referencia
                $("#ddlCampoTipSol option[value='" + vcCampo + "']").remove();
                $("#ddlCampoTipSol").append($('<option></option>').val(vcCampo).html(vcDescripcion));
                fnSortDropDownListByText("ddlCampoTipSol");
                //actuzlizar grid tbParametros
                var ids = tbParametros.getDataIDs();
                for (j = 0; j < ids.length; j++) {
                    var row = tbParametros.getRowData(ids[j]);
                    if (valRowCampoEdicion == row.IdCampo) {
                        var datos = { Clave: row.Clave, IdCampo: vcCampo, vcCampo: vcDescripcion };
                        tbParametros.jqGrid('setRowData', row.Clave, datos);
                    }
                }
                //actualizar grid tbCamposEstadoProceso
                var ids = tbCamposEstadoProceso.getDataIDs();
                for (j = 0; j < ids.length; j++) {
                    var row = tbCamposEstadoProceso.getRowData(ids[j]);
                    if (vcCampo == row.vcCampo) {
                        var datosAcciones = { vcCampo: vcCampo,
                            vcDescripcion: vcDescripcion
                        };
                        tbCamposEstadoProceso.jqGrid('setRowData', vcCampo, datosAcciones);
                    }
                }
                //actualizar arTipSol
                var vcEstadoProcesos = Object.keys(arTipSol.EstadoProceso);
                for (i = 0; i < vcEstadoProcesos.length; i++) {
                    var vcCampos = Object.keys(arTipSol.EstadoProceso[vcEstadoProcesos[i]].Campos);
                    for (j = 0; j < vcCampos.length; j++) {
                        if (vcCampo == vcCampos[j]) {
                            arTipSol.EstadoProceso[vcEstadoProcesos[i]].Campos[vcCampo].Descripcion = vcDescripcion;
                            //var copyVisible = arTipSol.EstadoProceso[vcEstadoProcesos[i]].Campos[valRowCampoEdicion].Visible;
                            //var copyEditable = arTipSol.EstadoProceso[vcEstadoProcesos[i]].Campos[valRowCampoEdicion].Editable;
                            //var copyObligatorio = arTipSol.EstadoProceso[vcEstadoProcesos[i]].Campos[valRowCampoEdicion].Obligatorio;
                            //var copyIdCampo = arTipSol.EstadoProceso[vcEstadoProcesos[i]].Campos[valRowCampoEdicion].IdCampo;
                            //delete arTipSol.EstadoProceso[vcEstadoProcesos[i]].Campos[valRowCampoEdicion];
                            //arTipSol.EstadoProceso[vcEstadoProcesos[i]].Campos[vcCampo] = {};
                            //arTipSol.EstadoProceso[vcEstadoProcesos[i]].Campos[vcCampo] = { Campo: vcCampo, Descripcion: vcDescripcion, Visible: copyVisible, Editable: copyEditable, Obligatorio: copyObligatorio, IdCampo: copyIdCampo };
                        }
                    };
                }

                $("#txtCampo").attr("disabled", false);
                $("#txtTamanoDato").attr("disabled", false);
                $("#ddlTipoDato").attr("disabled", false);
                $("#lblBotonAgregar").text("Agregar");
                $("#lblBotonQuitar").text("Quitar");
                $("#imgAgregar").attr('src', '../../../Common/Images/Mantenimiento/add_16x16.gif');
                $("#imgQuitar").attr('src', '../../../Common/Images/Mantenimiento/Quitar.png');

                idRowCampoEdicion = '';

                //Eliminar las condiciones del campo seleccionado y volver a añadir
                lstCondiciones = jQuery.grep(lstCondiciones, function (val) {
                    if (val.IdCampo != $("#txtCampo").val()) {
                        return val;
                    }
                });
            }
            //Agregar Condiciones 
            $.each($(".CampoCondicion"), function () {
                if ($(this).val() != "-1") {
                    var iNumCond = $(this).attr("id").split("_")[1];
                    var DatosCondicion = new CampoReferenciaCondicion();
                    DatosCondicion.IdCondicion = "0";
                    DatosCondicion.IdCampo = $("#txtCampo").val();
                    DatosCondicion.IdCamEnt = $(this).val();
                    DatosCondicion.IdSimboloCondicion = $("#ddlSimboloCondicion_" + iNumCond).val();
                    DatosCondicion.IdCampoRelacion = '';
                    DatosCondicion.ValorCampoRelacion = '';
                    DatosCondicion.NombreCampoRelacion = '';
                    DatosCondicion.TextoCondicion = '';
                    if (DatosCondicion.IdSimboloCondicion == "8" || DatosCondicion.IdSimboloCondicion == "9") { //no requiere valor para NULL o NOT NULL o BIT
                        DatosCondicion.IdCampoTipSol = '';
                        DatosCondicion.NombreCampoTipSol = '';
                        DatosCondicion.TextoCondicion = '';
                    } else if (Campos[$(this).val()].F_inTipDat == "6") {
                        DatosCondicion.IdCampoTipSol = '';
                        DatosCondicion.NombreCampoTipSol = '';
                        DatosCondicion.TextoCondicion = '';
                        DatosCondicion.ValorCampoRelacion = $("#ddlValorCondicion_" + iNumCond).val();
                    } else if ($("#hdfValorCondicion_" + iNumCond).val() == '' && $("#hdfValorCampRelac_" + iNumCond).val() == '') { //se ingresó un valor estático
                        DatosCondicion.IdCampoTipSol = '';
                        DatosCondicion.NombreCampoTipSol = '';
                        DatosCondicion.TextoCondicion = $("#txtValorCondicion_" + iNumCond).val();
                    } else if ($("#hdfValorCondicion_" + iNumCond).val() != '' && $("#hdfValorCampRelac_" + iNumCond).val() == '') { //campo de la solicitud
                        DatosCondicion.IdCampoTipSol = $("#hdfValorCondicion_" + iNumCond).val();
                        DatosCondicion.NombreCampoTipSol = $("#hdfValorCondicion_" + iNumCond).val();
                        DatosCondicion.TextoCondicion = '';
                    } else if ($("#hdfValorCondicion_" + iNumCond).val() != '' && $("#hdfValorCampRelac_" + iNumCond).val() != '') { //relacion con otra entidad
                        DatosCondicion.IdCampoTipSol = '';
                        DatosCondicion.NombreCampoTipSol = '';
                        DatosCondicion.TextoCondicion = '';
                        DatosCondicion.IdCampoRelacion = $("#hdfValorCampRelac_" + iNumCond).val();
                        DatosCondicion.ValorCampoRelacion = $("#hdfValorCondicion_" + iNumCond).val();
                        DatosCondicion.NombreCampoRelacion = $("#txtValorCondicion_" + iNumCond).val();
                    }
                    lstCondiciones.push(DatosCondicion);
                }
            });
            $("#txtCampo").val("");
            $("#txtDescripcion").val("");
            //$("#ddlTipoDato").val("-1");
            $('#ddlTipoDato option:first-child').attr("selected", "selected");
            $("#lstPicklist").empty();
            VerificarTamano();
            $("#txtCampo").focus();
            DimPosElementos();
            //Limpiar div referencia
            LimpiarDivReferencia();
        } else {
            alertaExterna("El campo ingresado ya existe.");
            $("#txtCampo").focus();
        }
        CargarEstilosControles();
    });

    $("#btnQuitar").live("click", function () {
        var textoQuitar = $("#lblBotonQuitar").text();
        if (textoQuitar == "Quitar" || textoQuitar == "Desactivar" || textoQuitar == "Activar") {
            if (tbCampos.getGridParam('selrow')) {
                var row; var rowNomAdj;
                row = tbCampos.getRowData(tbCampos.getGridParam('selrow'));
                //Vefiricar si se usa en parametros
                //var ids = tbParametros.getDataIDs();
                var ids = tbParametros.jqGrid('getGridParam', 'selarrrow');
                var esParametro = false, idParam = '';
                for (j = 0; j < ids.length; j++) {
                    var rowP = tbParametros.getRowData(ids[j]);
                    if (row["Campo"].toString() == rowP["IdCampo"].toString()) {
                        esParametro = true;
                        idParam = rowP["Clave"].toString();
                    }
                }
                if (esParametro) {
                    $('#divMsgConfirmQuitarCampo').dialog({
                        title: "¡Alerta!",
                        modal: true,
                        width: 330,
                        buttons: {
                            "Si": function () {
                                if (row["IdCampo"] == '0' || row["IdCampo"] == '-1') { //Es un campo nuevo
                                    //Eliminar de tbCampos, tbCamposEstadoProceso y arTipSol
                                    tbCampos.delRowData(tbCampos.getGridParam('selrow'));
                                    tbCamposEstadoProceso.delRowData(row["Campo"]);
                                    var vcEstadoProcesos = Object.keys(arTipSol.EstadoProceso);
                                    var inLen = vcEstadoProcesos.length;
                                    for (i = 0; i < inLen; i++) {
                                        delete arTipSol.EstadoProceso[vcEstadoProcesos[i]].Campos[row["Campo"]];
                                        if (row.IdTipoDato == 9) {
                                            delete arTipSol.EstadoProceso[vcEstadoProcesos[i]].Campos["AdjNom_" + row.Campo];
                                        }
                                        if (row.IdTipoDato == 10) {
                                            //eliminar Condicion
                                            lstCondiciones = jQuery.grep(lstCondiciones, function (cond) {
                                                if (cond.IdCampo != row["Campo"]) {
                                                    return cond;
                                                }
                                            });
                                        }
                                    }
                                } else { //Es un campo existen el la tabla actual, se desacitva
                                    var colModels = tbCampos.getGridParam("colModel");
                                    for (var i in colModels) {
                                        if (textoQuitar == "Desactivar") {
                                            if (colModels[i].name != 'Activo') {
                                                tbCampos.jqGrid('setCell', row["Idd"], i, '', { color: '#cd0a0a' });
                                            } else {
                                                tbCampos.jqGrid('setCell', row["Idd"], i, 'False', { color: '#cd0a0a' });
                                            }
                                            $("#lblBotonQuitar").text("Activar");
                                        } else {
                                            if (colModels[i].name != 'Activo' && colModels[i].name != 'rn') {
                                                tbCampos.jqGrid('setCell', row["Idd"], i, '', { color: '#363636' });
                                            } else if (colModels[i].name == 'Activo') {
                                                tbCampos.jqGrid('setCell', row["Idd"], i, 'True', { color: '#363636' });
                                            } else {
                                                tbCampos.jqGrid('setCell', row["Idd"], i, '', { color: '#2e6e9e' });
                                            }
                                            $("#lblBotonQuitar").text("Desactivar");
                                        }
                                    }
                                    //cambiar texto de columna Activo
                                    for (var i in colModelsProc) {
                                        if (textoQuitar == "Desactivar") {
                                            if (colModelsProc[i].name == 'Activo') {
                                                tbCamposEstadoProceso.jqGrid('setCell', row["Campo"], i, 'False', { color: '#cd0a0a' });
                                            } else {
                                                tbCamposEstadoProceso.jqGrid('setCell', row["Campo"], i, '', { color: '#cd0a0a' });
                                            }
                                        } else {
                                            if (colModelsProc[i].name == 'rn') {
                                                tbCamposEstadoProceso.jqGrid('setCell', row["Campo"], i, '', { color: '#2e6e9e' });
                                            } else if (colModelsProc[i].name == 'Activo') {
                                                tbCamposEstadoProceso.jqGrid('setCell', row["Campo"], i, 'True', { color: '#363636' });
                                            } else {
                                                tbCamposEstadoProceso.jqGrid('setCell', row["Campo"], i, '', { color: '#363636' });
                                            }
                                        }
                                    }
                                }
                                //Eliminar de tbParametros
                                fnQuitarParametro(row["Campo"]);
                                //                                tbParametros.delRowData(idParam);
                                $(this).dialog("close");
                            },
                            "Cancelar": function () {
                                $(this).dialog("close");
                            }
                        },
                        resizable: true
                    });
                } else {
                    if (inNumSolicitudes == 0 || row["IdCampo"] == '0' || row["IdCampo"] == '-1') { //Es un campo nuevo o un tipo sin solicitudes creadas
                        var vcEstadoProcesos = Object.keys(arTipSol.EstadoProceso);
                        var inLen = vcEstadoProcesos.length;
                        tbCampos.delRowData(tbCampos.getGridParam('selrow')); //eliminar de campo
                        tbCamposEstadoProceso.delRowData(row["Campo"]); //eliminar de campos por estado
                        for (i = 0; i < inLen; i++) {
                            delete arTipSol.EstadoProceso[vcEstadoProcesos[i]].Campos[row["Campo"]]; //eliminar de arTipSol
                            if (row.IdTipoDato == 9) {
                                delete arTipSol.EstadoProceso[vcEstadoProcesos[i]].Campos["AdjNom_" + row.Campo];
                            }
                        }
                        //eliminar Condicion
                        lstCondiciones = jQuery.grep(lstCondiciones, function (cond) {
                            if (cond.IdCampo != row["Campo"]) {
                                return cond;
                            }
                        });
                    } else { //Es un campo existen el la tabla actual, se desacitva o tipo ya tiene solicitudes creadas
                        var colModels = tbCampos.getGridParam("colModel");
                        var colModelsProc = tbCamposEstadoProceso.getGridParam("colModel");
                        for (var i in colModels) {
                            if (textoQuitar == "Desactivar") {
                                if (colModels[i].name != 'Activo') {
                                    tbCampos.jqGrid('setCell', row["Idd"], i, '', { color: '#cd0a0a' });
                                } else {
                                    tbCampos.jqGrid('setCell', row["Idd"], i, 'False', { color: '#cd0a0a' });
                                }
                                $("#lblBotonQuitar").text("Activar");
                            } else {
                                if (colModels[i].name != 'Activo' && colModels[i].name != 'rn') {
                                    tbCampos.jqGrid('setCell', row["Idd"], i, '', { color: '#363636' });
                                } else if (colModels[i].name == 'Activo') {
                                    tbCampos.jqGrid('setCell', row["Idd"], i, 'True', { color: '#363636' });
                                } else {
                                    tbCampos.jqGrid('setCell', row["Idd"], i, '', { color: '#2e6e9e' });
                                }
                                $("#lblBotonQuitar").text("Desactivar");
                            }
                        }
                        //cambiar texto de columna Activo
                        for (var i in colModelsProc) {
                            if (textoQuitar == "Desactivar") {
                                if (colModelsProc[i].name == 'Activo') {
                                    tbCamposEstadoProceso.jqGrid('setCell', row["Campo"], i, 'False', { color: '#cd0a0a' });
                                } else {
                                    tbCamposEstadoProceso.jqGrid('setCell', row["Campo"], i, '', { color: '#cd0a0a' });
                                }
                            } else {
                                if (colModelsProc[i].name == 'rn') {
                                    tbCamposEstadoProceso.jqGrid('setCell', row["Campo"], i, '', { color: '#2e6e9e' });
                                } else if (colModelsProc[i].name == 'Activo') {
                                    tbCamposEstadoProceso.jqGrid('setCell', row["Campo"], i, 'True', { color: '#363636' });
                                } else {
                                    tbCamposEstadoProceso.jqGrid('setCell', row["Campo"], i, '', { color: '#363636' });
                                }
                            }
                        }
                        ////desactivar combos
                        //if (textoQuitar == "Desactivar") {
                        //    $("#" + row["Campo"] + "_ddlVisible").attr("disabled", true);
                        //    $("#" + row["Campo"] + "_ddlEditable").attr("disabled", true);
                        //    $("#" + row["Campo"] + "_ddlObligatorio").attr("disabled", true);
                        //    //$("#" + row["Campo"] + "_ddlVisible").css("border", "1px solid #cd0a0a");
                        //    //$("#" + row["Campo"] + "_ddlVisible").css("color", "#cd0a0a");
                        //    //$("#" + row["Campo"] + "_ddlVisible option").css("color", "#cd0a0a");
                        //    //$("#" + row["Campo"] + "_ddlEditable").css("border", "1px solid #cd0a0a");
                        //    //$("#" + row["Campo"] + "_ddlObligatorio").css("border", "1px solid #cd0a0a");
                        //    //$("#" + row["Campo"] + "_ddlObligatorio").css("color", "#cd0a0a");
                        //    //$("#" + row["Campo"] + "_ddlObligatorio option").css("color", "#cd0a0a");
                        //} else {
                        //    $("#" + row["Campo"] + "_ddlVisible").attr("disabled", false);
                        //    if ($("#" + row["Campo"] + "_ddlVisible").val() == '1')
                        //        $("#" + row["Campo"] + "_ddlEditable").attr("disabled", false);
                        //    if ($("#" + row["Campo"] + "_ddlEditable").val() == '1')
                        //        $("#" + row["Campo"] + "_ddlObligatorio").attr("disabled", false);
                        //
                        //    //$("#" + row["Campo"] + "_ddlVisible").css("border", "1px solid rgb(169, 169, 169)");
                        //    //$("#" + row["Campo"] + "_ddlEditable").css("border", "1px solid rgb(169, 169, 169)");
                        //    //$("#" + row["Campo"] + "_ddlObligatorio").css("border", "1px solid rgb(169, 169, 169)");
                        //}
                    }
                }
                if (textoQuitar == "Activar") {
                    //$("#ddlValor").append($("<option></option>").val(row["Campo"]).text(row["Descripcion"]));
                    //fnSortDropDownListByText("ddlValor");
                    fnAgregarParametro("0", row["Campo"], row["Descripcion"], "0", "0");
                    $("#ddlCampoTipSol").append($("<option></option>").val(row["Campo"]).text(row["Descripcion"]));
                    fnSortDropDownListByText("ddlCampoTipSol");
                } else {
                    //eliminar de parametros
                    //                    $("#ddlValor option[value='" + row["Campo"] + "']").remove();
                    //                    fnSortDropDownListByText("ddlValor");
                    //fnQuitarParametro(row["Campo"]);
                    //eliminar de dialog referencia
                    $("#ddlCampoTipSol option[value='" + row["Campo"] + "']").remove();
                    fnSortDropDownListByText("ddlCampoTipSol");
                }
                //eliminar de parametros
                //                $("#ddlValor option[value='" + row["Campo"] + "']").remove();
                //                fnSortDropDownListByText("ddlValor");
                //                fnQuitarParametrosEnSeccionMensajes(row["Campo"]);
                fnQuitarParametro(row["Campo"]);
                //eliminar de dialog referencia
                $("#ddlCampoTipSol option[value='" + row["Campo"] + "']").remove();
                fnSortDropDownListByText("ddlCampoTipSol");
            } else {
                alertaExterna("Debe seleccionar una fila");
            }
        } else {
            CancelarEdicionCampo();
        }
    });

    var tbCampos = $("#tbCampos").jqGrid({
        sortable: true,
        datatype: "local",
        colModel: [{ name: 'Idd', Campo: 'Idd', label: 'Idd', hidden: false, width: 150, sortable: false },
                    { name: 'Campo', Campo: 'Campo', label: 'Campo', hidden: false, width: 150, sortable: false },
                    { name: 'Descripcion', index: 'Descripcion', label: 'Descripción', hidden: false, width: 200, sortable: false },
                    { name: 'IdTipoDato', index: 'IdTipoDato', label: 'IdTipoDato', hidden: true, width: 150, sortable: false },
                    { name: 'TipoDato', index: 'TipoDato', label: 'Tipo de Dato', hidden: false, width: 130, sortable: false },
                    { name: 'Tamano', index: 'Tamano', label: 'Tamaño', hidden: false, width: 150, sortable: false },
                    { name: 'IdCampo', index: 'IdCampo', label: 'IdCampo', hidden: true, width: 200, sortable: false,
                        formatter: function (value, options, rData) {
                            if ($("#hdfCodTipSol").val() == "") {
                                return "-1";
                            } else {
                                if (rData.IdCampo == undefined || rData.IdCampo == "" || rData.IdCampo == null) {
                                    return "0";
                                } else {
                                    return rData.IdCampo;
                                }
                            }
                        }
                    },
                    { name: 'IdEntidad', index: 'IdEntidad', label: 'IdEntidad', hidden: true, width: 100, sortable: false },
                    { name: 'NomEntidad', index: 'NomEntidad', label: 'Nombre Entidad', hidden: false, width: 100, sortable: false },
                    { name: 'IdCamPK', index: 'IdCamPK', label: 'IdCamPK', hidden: true, width: 100, sortable: false },
                    { name: 'IdCamDes', index: 'IdCamDes', label: 'IdCamDes', hidden: true, width: 100, sortable: false },
                    { name: 'NomCamDes', index: 'NomCamDes', label: 'Nombre Campo', hidden: false, width: 100, sortable: false }
                    , { name: 'Activo', index: 'Activo', label: 'Estado', hidden: false, width: 50,
                        formatter: function (value, options, rData) {
                            if (value == 'True') {
                                return 'Activo';
                            } else if (value == 'False') {
                                return 'Inactivo';
                            } else {
                                return value;
                            }
                        }
                    }
                    , { name: 'ListaActivos', index: 'ListaActivos', label: 'ListaActivos', hidden: true, width: 50 }
   	        ],
        loadtext: 'Cargando datos...',
        emptyrecords: 'No hay resultados',
        sortname: "Idd", //sortname: idTabla, //Default SortColumn
        sortorder: "asc", //Default SortOrder.
        height: "auto",
        rownumbers: true,
        shrinkToFit: false,
        caption: "Campos",
        onRightClickRow: function () {
            tbCampos.jqGrid('resetSelection');
            return false;
        },
        beforeSelectRow: function (rowid, e) {
            //inNumSolicitudes > 0 || 
            if (rowid == "in0_F_inFasSol" || rowid == "in0_F_vcCodEmp" || rowid == "in0_daFechaCreacion" || rowid == "in0_daFechaModificacion" ||
                rowid == "in0_inUsuarioCreacion" || rowid == "in0_inUsuarioModificacion" || rowid == "in0_vcCodigo")
                return false;
            else
                return true;
        },
        ondblClickRow: function (rowid, aData, rowelem) {
            if (rowid == "in0_F_inFasSol" || rowid == "in0_F_vcCodEmp" || rowid == "in0_daFechaCreacion" || rowid == "in0_daFechaModificacion" ||
                rowid == "in0_inUsuarioCreacion" || rowid == "in0_inUsuarioModificacion") {
                return false;
            } else {
                var rowCampos = tbCampos.getRowData(rowid);
                //alert(rowid + ", " + rowCampos.Campo + ", " + rowCampos.Descripcion + "; " + rowCampos.IdTipoDato + ", " + rowCampos.Tamano);
                EditarCampo(rowid, rowCampos.Campo, rowCampos.Descripcion, rowCampos.IdTipoDato, rowCampos.Tamano, rowCampos.IdEntidad, rowCampos.IdCamDes, rowCampos.IdCampo, rowCampos.Activo, rowCampos.ListaActivos);
            }
        },
        afterInsertRow: function (rowid, aData, rowelem) {
            var colModels = tbCampos.getGridParam("colModel");
            if (rowid == "in0_F_inFasSol" || rowid == "in0_F_vcCodEmp" || rowid == "in0_daFechaCreacion" || rowid == "in0_daFechaModificacion" || rowid == "in0_inUsuarioCreacion" ||
                rowid == "in0_inUsuarioModificacion" || rowid == "in0_vcCodigo") {
                var colModels = tbCampos.getGridParam("colModel");
                for (var i in colModels) {
                    tbCampos.jqGrid('setCell', rowid, i, '', { color: 'grey' });
                }
            } else {
                if (aData.Activo == 'False' || aData.Activo == 'Inactivo') {
                    for (var i in colModels) {
                        tbCampos.jqGrid('setCell', rowid, i, '', { color: '#cd0a0a' });
                    }
                }
            }
        },
        onSelectRow: function (rowid, select, item) {
            var rowCampos = tbCampos.getRowData(rowid);
            //$("#btnQuitar").button("option", "disabled", false);
            if (inNumSolicitudes > 0 && $("#lblBotonQuitar").text() != "Cancelar") {
                if (rowCampos.IdCampo == '0' || rowCampos.IdCampo == '-1') {
                    $("#lblBotonQuitar").text("Quitar");
                } else {
                    if (rowCampos.Activo == 'Activo') {
                        $("#lblBotonQuitar").text("Desactivar");
                    } else {
                        $("#lblBotonQuitar").text("Activar");
                    }
                }
            }
        }
    });

    //Editar campo
    function EditarCampo(IdRow, Nombre, Descripcion, TipoDato, Tamano, Entidad, Campo, IdCampo, Activo, ListaActivos) {
        $("#hdfCampoActivo").val(Activo)
        idRowCampoEdicion = IdRow.toString();
        valRowCampoEdicion = Nombre.toString();
        //deshabilitar controles no editables
        $("#txtCampo").attr("disabled", true);
        if (inNumSolicitudes > 0 || $("#hdfCodTipSol").val() == "31" || $("#hdfCodTipSol").val() == "30") {
            $("#btnAgregar").button("option", "disabled", false);
            $("#btnQuitar").button("option", "disabled", false);
            if (IdCampo != "0" && IdCampo != "-1") { //edición restringida
                $('#txtDescripcion').attr('readonly', false);
                $('#ddlTipoDato').prop('disabled', true);
                if (TipoDato == '6') { //campo de tipo lógico (permite edición de valores)
                    $("#txtTamanoDato").attr("disabled", false);
                } else {
                    $("#txtTamanoDato").attr("disabled", true);
                }
            } else { //edicion total para camps nuevos 10-10-2014 wapumayta
                $('#txtDescripcion').attr('readonly', true);
                $('#ddlTipoDato').prop('disabled', false);
                $("#txtTamanoDato").attr("disabled", false);
            }
        }
        //botones
        $("#lblBotonAgregar").text("Actualizar");
        $("#lblBotonQuitar").text("Cancelar");
        $("#imgAgregar").attr('src', '../../../Common/Images/Mantenimiento/Guardar.png');
        $("#imgQuitar").attr('src', '../../../Common/Images/Mantenimiento/Salir.gif');

        $("#txtCampo").val(Nombre);
        $("#txtDescripcion").val(Descripcion);
        $("#ddlTipoDato").val(TipoDato);
        VerificarTamano();
        $("#txtTamanoDato").removeClass("txtBusqueda");
        $("#txtTamanoDato").val(Tamano);
        //tipo dato referencia
        if (TipoDato == "10") {
            $("#ddlEntidadReferencia").val(Entidad);
            $.ajax({
                type: "POST",
                url: "Adm_SolicitudesConfiguracion.aspx/ListarCampoEntidadReferencia",
                data: "{'inCodEnt': '" + Entidad + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {
                    Campos = [], EntidadRelacion = [];
                    eval(result.d);
                    var valueddl, textoddl;
                    $("#ddlCampoEntidad").html('');
                    var lstKeysCampos = Object.keys(Campos);
                    for (var i = 0; i < $(lstKeysCampos).length; i++) {
                        valueddl = Campos[lstKeysCampos[i]].P_inCod;
                        textoddl = Campos[lstKeysCampos[i]].vcDes;
                        $("#ddlCampoEntidad").append($('<option></option>').val(valueddl).html(textoddl));
                    }
                    $("#ddlCampoEntidad").val(Campo); //set campo
                    //Cargar condiciones
                    numCondicion = 0;
                    valCondicionActual = '';
                    lstNumCond = [];
                    $("#tdCondiciones").html('');
                    var inNumContCreados = numCondicion;
                    if (lstCondiciones.length > 0) {
                        for (var i = 0; i < lstCondiciones.length; i++) {
                            if (lstCondiciones[i].IdCampo == Nombre) {
                                NuevaCondicion1();
                                $("#ddlCampoEntidadCondicion_" + inNumContCreados).val(lstCondiciones[i].IdCamEnt);
                                $("#ddlCampoEntidadCondicion_" + inNumContCreados).change();
                                $("#ddlSimboloCondicion_" + inNumContCreados).val(lstCondiciones[i].IdSimboloCondicion);
                                //Actualizado el 26/05/2014
                                if (lstCondiciones[i].ValorCampoRelacion != '' && lstCondiciones[i].IdCampoRelacion != '') { //campo relacionado a otra entidad
                                    $("#txtValorCondicion_" + inNumContCreados).val(lstCondiciones[i].NombreCampoRelacion);
                                    $("#hdfValorCondicion_" + inNumContCreados).val(lstCondiciones[i].ValorCampoRelacion);
                                    $("#hdfValorCampRelac_" + inNumContCreados).val(lstCondiciones[i].IdCampoRelacion);
                                } else if (lstCondiciones[i].IdCampoTipSol != '' && lstCondiciones[i].NombreCampoTipSol != '') { //campo de la solicitud
                                    $("#txtValorCondicion_" + inNumContCreados).val($("#ddlCampoTipSol option[value='" + lstCondiciones[i].NombreCampoTipSol + "']").text());
                                    $("#hdfValorCondicion_" + inNumContCreados).val(lstCondiciones[i].NombreCampoTipSol);
                                } else if (lstCondiciones[i].TextoCondicion != '') { //campo estático
                                    $("#txtValorCondicion_" + inNumContCreados).val(lstCondiciones[i].TextoCondicion);
                                } else if (lstCondiciones[i].ValorCampoRelacion != '' && lstCondiciones[i].IdCampoRelacion == '') { //para campo lógico
                                    $("#ddlValorCondicion_" + inNumContCreados).val(lstCondiciones[i].ValorCampoRelacion);
                                }
                                inNumContCreados = parseInt(inNumContCreados) + 1;
                            }
                        }
                    }
                    if (inNumSolicitudes > 0 || $("#hdfCodTipSol").val() == "31" || $("#hdfCodTipSol").val() == "30") {//edicion de tipo con al menos una solicitud creada
                        DeshabilitarDivReferencia();
                    } else {
                        NuevaCondicion1();
                    }
                },
                error: function (xhr, err, thrErr) {
                    MostrarErrorAjax(xhr, err, thrErr);
                }
            });
        } else if (TipoDato == "8") {
            var lstTamano = Tamano.split(",");
            $('#lstPicklist').html('');
            var lstEstado = ListaActivos.split(",");
            for (var i = 0; i < lstTamano.length; i++) {
                if (lstEstado[i] == '0') {
                    $('#lstPicklist').append('<option value="' + lstTamano[i] + '" estado="' + lstEstado[i] + '" style="color: #cd0a0a;">' + lstTamano[i] + '</option>');
                } else {
                    $('#lstPicklist').append('<option value="' + lstTamano[i] + '" estado="' + lstEstado[i] + '">' + lstTamano[i] + '</option>');
                }
            }
            //if (IdCampo != '0' && IdCampo != '-1') {
            //    //$("#tblPicklistButtons").hide();
            //    $("#btnPicklistEditar").button("option", "disabled", true);
            //    $("#btnPicklistEliminar").button("option", "disabled", true);
            //}
        }
    };
    function CancelarEdicionCampo() {
        $("#tbCampos").jqGrid('resetSelection'); //limpiar seleccoin en grilla //agregado 05-01-2015
        //habilitar controles no editables
        //botones
        $("#txtCampo").attr("disabled", false);
        $("#txtTamanoDato").attr("disabled", false);
        $('#ddlTipoDato').prop('disabled', false);
        //$("#btnQuitar").button("option", "disabled", true); //comentado 05-01-2015
        //if (inNumSolicitudes > 0 || $("#hdfCodTipSol").val() == "31" || $("#hdfCodTipSol").val() == "30") { //con solicitudes
        if ($("#hdfCodTipSol").val() == "31" || $("#hdfCodTipSol").val() == "30") { //con solicitudes // activar edicion 10-10-2014 wapumayta
            $("#btnAgregar").button("option", "disabled", true); //10-10-2014 wapumayta
            $("#btnQuitar").button("option", "disabled", true);

            $("#txtCampo").attr("readonly", true);
            $("#txtDescripcion").attr("readonly", true);
            $('#ddlTipoDato').prop('disabled', true);
        }
        $("#lblBotonAgregar").text("Agregar");
        $("#lblBotonQuitar").text("Quitar");
        $("#imgAgregar").attr('src', '../../../Common/Images/Mantenimiento/add_16x16.gif');
        $("#imgQuitar").attr('src', '../../../Common/Images/Mantenimiento/Quitar.png');

        //limpiar
        $("#txtCampo").val('');
        $("#txtDescripcion").val('');
        $("#ddlTipoDato").val('-1');
        $("#lstPicklist").empty();
        VerificarTamano();
        $("#txtCampo").focus();
        DimPosElementos();
        idRowCampoEdicion = '';
        valRowCampoEdicion = '';
        LimpiarDivReferencia();
    };

    $("#btnSubir").live("click", function () {
        if (tbCampos.getGridParam('selrow')) {
            var ids = tbCampos.getDataIDs();
            var IndAct;
            var IdAct = tbCampos.getGridParam('selrow');
            for (i = 0; i < ids.length; i++) {
                if (ids[i] == IdAct)
                    IndAct = i;
            }

            if (IndAct > inNumCamDef) {
                var IdAnt = ids[IndAct - 1]; //
                var r1 = tbCampos.getRowData(IdAnt);
                var r2 = tbCampos.getRowData(IdAct);
                tbCampos.delRowData(IdAnt);
                tbCampos.delRowData(IdAct);
                r1.id = IdAct;
                r1["Idd"] = IdAct;
                r2.id = IdAnt;
                r2["Idd"] = IdAnt;
                tbCampos.addRowData(r2.id, r2);
                tbCampos.addRowData(r1.id, r1);

                tbCampos.trigger("reloadGrid");
                tbCampos.jqGrid('setSelection', r2.id, true);
            }
        }
    });

    $("#btnBajar").live("click", function () {
        if (tbCampos.getGridParam('selrow')) {
            var ids = tbCampos.getDataIDs();
            var IndAct;
            var IdAct = tbCampos.getGridParam('selrow');
            for (i = 0; i < ids.length; i++) {
                if (ids[i] == IdAct)
                    IndAct = i;
            }

            if (IndAct < ids.length - 1) {
                var IdPos = ids[IndAct + 1]; //
                var r1 = tbCampos.getRowData(IdAct);
                var r2 = tbCampos.getRowData(IdPos);
                tbCampos.delRowData(IdAct);
                tbCampos.delRowData(IdPos);
                r1.id = IdPos;
                r1["Idd"] = IdPos;
                r2.id = IdAct;
                r2["Idd"] = IdAct;
                tbCampos.addRowData(r2.id, r2);
                tbCampos.addRowData(r1.id, r1);

                tbCampos.trigger("reloadGrid");
                tbCampos.jqGrid('setSelection', r1.id, true);
            }
        }
    });

    //---------------------------------------------------------------------------------------->>

    //---------------------CONFIGURACIÓN DE CAMPOS POR ESTADOS DE PROCESO---------------------//

    var tbCamposEstadoProceso = $("#tbCamposEstadoProceso").jqGrid({
        sortable: true,
        datatype: "local",
        cellsubmit: 'clientArray',
        editurl: 'clientArray',
        cellEdit: true,
        colModel: [{ name: 'vcCampo', index: 'vcCampo', label: 'Campo', hidden: false, width: 240 },
                    { name: 'vcDescripcion', index: 'vcDescripcion', label: 'Descripción', hidden: false, width: 240 },
                    { name: 'ddlVisible', index: 'ddlVisible', label: 'Visible', hidden: false, width: 90, align: 'center', editable: true,
                        formatter: function (value, options, rData) {
                            //                            if (rData.vcCampo == "F_vcCodEmp")
                            //                                return "<label id='" + rData.vcCampo + "_ddlEditable'>SI</label>";
                            //                            else {
                            if (rData.vcCampo == "F_vcCodEmp" || rData.vcCampo == "vcCodigo" || rData.vcCampo == "daFechaCreacion") {
                                if (rData.vcCampo == "daFechaCreacion" && $("#ddlEstadoProceso").val() == "6") {
                                    return "<label id='" + rData.vcCampo + "_ddlVisible'>NO</label>";
                                } else {
                                    return "<label id='" + rData.vcCampo + "_ddlVisible'>SI</label>";
                                }
                            } else if (rData.vcCampo == "daFechaModificacion" || rData.vcCampo == "F_inFasSol" ||
                                rData.vcCampo == "inUsuarioCreacion" || rData.vcCampo == "inUsuarioModificacion") {
                                //if (inNumSolicitudes == 0 && $("#hdfCodTipSol").val() != "31" && $("#hdfCodTipSol").val() != "30") {
                                if ($("#hdfCodTipSol").val() != "31" && $("#hdfCodTipSol").val() != "30") { //10-10-2014 wapumayta
                                    return "<select id='" + rData.vcCampo + "_ddlVisible' class='Visible' selected='0'><option value='-1'></option><option value='1'>SI</option><option value='0' selected='selected'>NO</option></select>";
                                } else {
                                    return "<label id='" + rData.vcCampo + "_ddlVisible' >NO</label>";
                                }
                            } else {
                                //if (inNumSolicitudes == 0 && $("#hdfCodTipSol").val() != "31" && $("#hdfCodTipSol").val() != "30")
                                if ($("#hdfCodTipSol").val() != "31" && $("#hdfCodTipSol").val() != "30") //10-10-2014 wapumayta
                                    return "<select id='" + rData.vcCampo + "_ddlVisible' class='Visible'><option value='-1'></option><option value='1'>SI</option><option value='0'>NO</option></select>";
                                else
                                    return "<label id='" + rData.vcCampo + "_ddlVisible' >" + rData.ddlVisible + "</label>";
                            }
                            //                            }
                        }
                    },
                    { name: 'ddlEditable', index: 'ddlEditable', label: 'Editable', hidden: false, width: 90, align: 'center', editable: true,
                        formatter: function (value, options, rData) {

                            if (rData.vcCampo == "daFechaCreacion" || rData.vcCampo == "daFechaModificacion" || rData.vcCampo == "F_inFasSol" || rData.vcCampo == "F_vcCodEmp" ||
                                rData.vcCampo == "inUsuarioCreacion" || rData.vcCampo == "inUsuarioModificacion" || rData.vcCampo == "vcCodigo")
                                return "<label id='" + rData.vcCampo + "_ddlEditable'>NO</label>";
                            else {
                                //if (inNumSolicitudes == 0 && $("#hdfCodTipSol").val() != "31" && $("#hdfCodTipSol").val() != "30")
                                if ($("#hdfCodTipSol").val() != "31" && $("#hdfCodTipSol").val() != "30") //10-10-2014 wapumayta
                                    return "<select id='" + rData.vcCampo + "_ddlEditable' class='Editable'><option value='-1'></option><option value='1'>SI</option><option value='0'>NO</option></select>";
                                else
                                    return "<label id='" + rData.vcCampo + "_ddlEditable'>" + rData.ddlEditable + "</label>";
                            }
                        }
                    },
                    { name: 'ddlObligatorio', index: 'ddlObligatorio', label: 'Obligatorio', hidden: false, width: 90, align: 'center', editable: true,
                        formatter: function (value, options, rData) {

                            if (rData.vcCampo == "daFechaCreacion" || rData.vcCampo == "daFechaModificacion" || rData.vcCampo == "F_inFasSol" || rData.vcCampo == "F_vcCodEmp" ||
                                rData.vcCampo == "inUsuarioCreacion" || rData.vcCampo == "inUsuarioModificacion" || rData.vcCampo == "vcCodigo")
                                return "<label id='" + rData.vcCampo + "_ddlObligatorio'>NO</label>";
                            else {
                                //if (inNumSolicitudes == 0 && $("#hdfCodTipSol").val() != "31" && $("#hdfCodTipSol").val() != "30")
                                if ($("#hdfCodTipSol").val() != "31" && $("#hdfCodTipSol").val() != "30") //10-10-2014 wapumayta
                                    return "<select id='" + rData.vcCampo + "_ddlObligatorio' class='Obligatorio'><option value='-1'></option><option value='1'>SI</option><option value='0'>NO</option></select>";
                                else
                                    return "<label id='" + rData.vcCampo + "_ddlObligatorio'>" + rData.ddlObligatorio + "</label>";
                            }
                        }
                    },
                    { name: 'IdCampo', index: 'IdCampo', label: 'IdCampo', hidden: true, width: 200,
                        formatter: function (value, options, rData) {
                            if ($("#hdfCodTipSol").val() == "") {
                                return "-1";
                            } else {
                                if (rData.IdCampo == undefined || rData.IdCampo == "" || rData.IdCampo == null) {
                                    return "0";
                                } else {
                                    return rData.IdCampo;
                                }
                            }
                        }
                    },
                    { name: 'Activo', index: 'Activo', label: 'Activo', hidden: true, width: 100 }
   	               ],

        emptyrecords: 'No hay resultados',
        sortname: "vcCampo", //sortname: idTabla, //Default SortColumn
        sortorder: "asc", //Default SortOrder.
        height: "auto",
        rownumbers: true,
        shrinkToFit: false,
        onRightClickRow: function () {
            tbCamposEstadoProceso.jqGrid('resetSelection');
            return false;
        },
        beforeSelectRow: function (rowid, e) {
            //return false;
        },
        afterInsertRow: function (rowid, aData, rowelem) {
            if (rowid == "F_inFasSol" || rowid == "F_vcCodEmp" || rowid == "daFechaCreacion" || rowid == "daFechaModificacion" || rowid == "inUsuarioCreacion" ||
                rowid == "inUsuarioModificacion" || rowid == "vcCodigo") {
                var colModels = tbCamposEstadoProceso.getGridParam("colModel");

                for (var i in colModels) {
                    tbCamposEstadoProceso.jqGrid('setCell', rowid, i, '', { color: 'grey' });
                }
            } else {
                if (aData.Activo == "False" || aData.Activo == "Inactivo") {
                    var colModels = tbCamposEstadoProceso.getGridParam("colModel");
                    for (var i in colModels) {
                        tbCamposEstadoProceso.jqGrid('setCell', rowid, i, '', { color: '#cd0a0a' });
                    }
                }
            }
        }
    }).navGrid("#pager", { edit: false, add: false, search: false, del: false });

    for (var i = 0; i < mydata.length; i++) {
        $("#tbCampos").jqGrid('addRowData', mydata[i].Idd, mydata[i]);
        //        $("#ddlValor").append($('<option></option>').val(mydata[i].Campo).html(mydata[i].Descripcion));
        //combo de campos en dialog referencia 
        $("#ddlCampoTipSol").append($('<option></option>').val(mydata[i].Campo).html(mydata[i].Descripcion));
        var datosAcciones = { vcCampo: mydata[i].Campo,
            vcDescripcion: mydata[i].Descripcion,
            ddlVisible: "-1",
            ddlEditable: "-1",
            ddlObligatorio: "-1",
            Activo: 'True'
        };
        tbCamposEstadoProceso.jqGrid('addRowData', mydata[i].Campo, datosAcciones);

        //$("#tbCamposEstadoProceso").jqGrid('addRowData', mydata[i].Campo, { "vcCampo: mydata[i].Campo, vcDescripcion: mydata[i].Descripcion, ddlVisible: "-1", ddlEditable: "0" });
    }
    //agregar campo "MODELO SOLICITADO" para solicitudes del tipo 1(cambio),2(nuevo) y 3(reposición)
    //if ($("#hdfCodSolSist").val() != '' && ($("#hdfCodSolSist").val() == "1" || $("#hdfCodSolSist").val() == "2" || $("#hdfCodSolSist").val() == "3")) {
    //    $("#ddlValor").append($('<option></option>').val('F_inCodModDis').html('Modelo Dispositivo'));
    //}
    //    fnSortDropDownListByText("ddlValor");
    fnSortDropDownListByText("ddlCampoTipSol");

    //validaciones ddl parametros estadoproceso
    $(".Visible").live("change", function () {
        var p_id = $(this).attr("id").substring(0, $(this).attr("id").indexOf("_ddlVisible"));
        if ($(this).val() == '0') {
            $("#" + p_id + "_ddlEditable").val("0");
            $("#" + p_id + "_ddlEditable").attr("disabled", true);
            $("#" + p_id + "_ddlObligatorio").val("0");
            $("#" + p_id + "_ddlObligatorio").attr("disabled", true);
        } else if ($(this).val() == '1') {
            $("#" + p_id + "_ddlEditable").attr("disabled", false);
        } else {
            $("#" + p_id + "_ddlEditable").val("-1");
            $("#" + p_id + "_ddlEditable").attr("disabled", false);
            $("#" + p_id + "_ddlObligatorio").val("-1");
            $("#" + p_id + "_ddlObligatorio").attr("disabled", false);
        };
    });
    $(".Editable").live("change", function () {
        var p_id = $(this).attr("id").substring(0, $(this).attr("id").indexOf("_ddlEditable"));
        if ($(this).val() == '0') {
            $("#" + p_id + "_ddlObligatorio").val("0");
            $("#" + p_id + "_ddlObligatorio").attr("disabled", true);
        } else if ($(this).val() == '1') {
            $("#" + p_id + "_ddlObligatorio").attr("disabled", false);
        } else {
            $("#" + p_id + "_ddlObligatorio").val("-1");
            $("#" + p_id + "_ddlObligatorio").attr("disabled", false);
        };
    });
    //fin validaciones ddl parametros estadoproceso

    function ActualizaArrayPorEstadoAprobacion(vcNomEstAprReg, vcNomEstAprMsj) {
        //alert(vcNomEstAprReg + ", " + vcNomEstAprMsj);
        //Umbrales
        //var biEnvCorUmbApr = "0", biAprobUmbral = "0";
        //if ($('input[name=chkEnviarCorreoUmbApr]').is(':checked'))
        //    biEnvCorUmbApr = "1";
        //if ($('input[name=chkUmbralAprobacion]').is(':checked'))
        //    biAprobUmbral = "1";
        //var vcEstApr = Object.keys(arTipSol.Umbrales.Aprobacion);
        //for (i = 0; i < vcEstApr.length; i++) {
        //    arTipSol.Umbrales.Aprobacion[vcEstApr[i]].Umbral = biAprobUmbral;
        //    arTipSol.Umbrales.Aprobacion[vcEstApr[i]].ValorObjetivo = $("#txtValorObjetivoApr").val();
        //    arTipSol.Umbrales.Aprobacion[vcEstApr[i]].ValorMaximo = $("#txtValorMaximoApr").val();
        //    arTipSol.Umbrales.Aprobacion[vcEstApr[i]].EnviarCorreo = biEnvCorUmbApr;
        //    arTipSol.Umbrales.Aprobacion[vcEstApr[i]].Destinatarios = $("#txtCorreoUmbApr").val();
        //    arTipSol.Umbrales.Aprobacion[vcEstApr[i]].Asunto = $("#txtAsuntoUmbApr").val();
        //    arTipSol.Umbrales.Aprobacion[vcEstApr[i]].Mensaje = $.trim($("#txtMensajeUmbApr").val()).replace(/\n/g, vcRegMsj);
        //};

        //Reglas
        //alert("vcNomEstAprReg: " + vcNomEstAprReg + "\nEst Final: " + $("#ddlEstadoFinReglaApr").vale());
        //if (vcNomEstAprReg != "0") {
        //    var biRegAut = "0";
        //    if ($('input[name=chkEstadoAutomaticoApr]').is(':checked'))
        //        biRegAut = "1";
        //    arTipSol.EstadoAprobacion[vcNomEstAprReg].ReglaAutomatica = biRegAut;
        //    arTipSol.EstadoAprobacion[vcNomEstAprReg].IdEstadoFinal = $("#ddlEstadoFinReglaApr").val();
        //};

        //Mensajes
        if (vcNomEstAprMsj != "0") {
            var biEnvCor = "0", biPro = "0", biUsuEsp = "0", biAre = "0", biTec = "0", biOperador = "0", biPlantilla = "0";
            if ($('input[name=chkEnviarCorreoApr]').is(':checked'))
                biEnvCor = "1";
            arTipSol.EstadoAprobacion[vcNomEstAprMsj].EnviarCorreo = biEnvCor;
            arTipSol.EstadoAprobacion[vcNomEstAprMsj].Destinatarios = $("#txtCorreoApr").val();
            arTipSol.EstadoAprobacion[vcNomEstAprMsj].Asunto = $("#txtAsuntoApr").val();
            arTipSol.EstadoAprobacion[vcNomEstAprMsj].Mensaje = $.trim($("#txtMensajeApr").val()).replace(/\n/g, vcRegMsj);
            if ($('input[name=chkPropietarioCorApr]').is(':checked'))
                biPro = "1";
            if ($('input[name=chkUsuarioEspecificoCorApr]').is(':checked'))
                biUsuEsp = "1";
            if ($('input[name=chkAreaCorApr]').is(':checked'))
                biAre = "1";
            if ($('input[name=chkTecnicoCorApr]').is(':checked'))
                biTec = "1";
            if ($('input[name=chkOperadorApr]').is(':checked'))
                biOperador = "1";
            if ($('input[name=chkPlantilla]').is(':checked'))
                biPlantilla = "1";
            arTipSol.EstadoAprobacion[vcNomEstAprMsj].Propietario = biPro;
            arTipSol.EstadoAprobacion[vcNomEstAprMsj].UsuarioEspecifico = biUsuEsp;
            arTipSol.EstadoAprobacion[vcNomEstAprMsj].Responsable = biAre;
            arTipSol.EstadoAprobacion[vcNomEstAprMsj].Tecnico = biTec;
            arTipSol.EstadoAprobacion[vcNomEstAprMsj].Operador = biOperador;
            arTipSol.EstadoAprobacion[vcNomEstAprMsj].UsaPlantilla = biPlantilla;
        };
    }

    function MuestraDatosDeArrayPorEstadoAprobacion(vcNomEstAprReg, vcNomEstAprMsj) {
        //alert(vcNomEstAprReg + ", " + vcNomEstAprMsj);

        //validar creacion de reglas
        var vcEstadosApr = Object.keys(arTipSol.EstadoAprobacion);
        var vcReglasEstadoInicial = [];
        $("#lblEstadoIniReglaAprMensaje").text("");
        if (vcNomEstAprReg != "0") {
            for (j = 0; j < vcEstadosApr.length; j++) {
                if (arTipSol.EstadoAprobacion[vcEstadosApr[j]].ReglaAutomatica == '1' && arTipSol.EstadoAprobacion[vcEstadosApr[j]].IdEstadoFinal == arTipSol.EstadoAprobacion[vcNomEstAprReg].Id) {
                    vcReglasEstadoInicial.push(vcEstadosApr[j]);
                    cicloFin = true;
                }
            }
            if (vcReglasEstadoInicial.length > 0) {
                $("#lblEstadoIniReglaAprMensaje").text(" *Este estado se está usando como estado final en la(s) regla(s) con estado inicial: " + vcReglasEstadoInicial.join(","));
            }
        }
        //Reglas
        if (vcNomEstAprReg != "0") {
            if ($("#ddlEstadoIniReglaApr").val() == 34) { //Aprobada
                $("#chkEstadoAutomaticoApr").prop('disabled', true);
                $('input[name=chkEstadoAutomaticoApr]').attr('checked', false);
                $("#ddlEstadoFinReglaApr").val("-1");
                $("#lblEstadoIniReglaAprMensaje").text(" *El estado inicial '" + vcNomEstAprReg + "' no puede tener una regla.");
            } else {
                $("#chkEstadoAutomaticoApr").prop('disabled', false);
            }

            if (arTipSol.EstadoAprobacion[vcNomEstAprReg].ReglaAutomatica == '1') {
                $('input[name=chkEstadoAutomaticoApr]').attr('checked', true);
                $("#ddlEstadoFinReglaApr").val(arTipSol.EstadoAprobacion[vcNomEstAprReg].IdEstadoFinal);
            } else {
                $('input[name=chkEstadoAutomaticoApr]').attr('checked', false);
                $("#ddlEstadoFinReglaApr").val("-1");
            }
        };

        //Mensajes
        if (vcNomEstAprMsj != "0") {
            //            if (arTipSol.EstadoAprobacion[vcNomEstAprMsj].Id == biPrimerEstApr) //Estado aprobación 32 'Pendiente'
            $("#lblEnvioDeCorreoApr").html("Este mensaje será enviado cada vez que se cree una solicitud.");
            //            else
            //                $("#lblEnvioDeCorreoApr").html("Este mensaje será enviado cada vez que una solicitud se encuentre en el estado de aprobación: '" + vcNomEstAprMsj + "'.")

            if (arTipSol.EstadoAprobacion[vcNomEstAprMsj].EnviarCorreo == '1') {
                $('input[name=chkEnviarCorreoApr]').attr('checked', true);
            } else {
                $('input[name=chkEnviarCorreoApr]').attr('checked', false);
            }

            $("#txtCorreoApr").val(arTipSol.EstadoAprobacion[vcNomEstAprMsj].Destinatarios);
            $("#txtAsuntoApr").val(arTipSol.EstadoAprobacion[vcNomEstAprMsj].Asunto);
            $("#txtMensajeApr").val(arTipSol.EstadoAprobacion[vcNomEstAprMsj].Mensaje.replace(regMsj, '\n'));

            if (arTipSol.EstadoAprobacion[vcNomEstAprMsj].Propietario == '1')
                $('input[name=chkPropietarioCorApr]').attr('checked', true);
            else
                $('input[name=chkPropietarioCorApr]').attr('checked', false);
            if (arTipSol.EstadoAprobacion[vcNomEstAprMsj].UsuarioEspecifico == '1')
                $('input[name=chkUsuarioEspecificoCorApr]').attr('checked', true);
            else
                $('input[name=chkUsuarioEspecificoCorApr]').attr('checked', false);
            if (arTipSol.EstadoAprobacion[vcNomEstAprMsj].Responsable == '1')
                $('input[name=chkAreaCorApr]').attr('checked', true);
            else
                $('input[name=chkAreaCorApr]').attr('checked', false);
            if (arTipSol.EstadoAprobacion[vcNomEstAprMsj].Tecnico == '1')
                $('input[name=chkTecnicoCorApr]').attr('checked', true);
            else
                $('input[name=chkTecnicoCorApr]').attr('checked', false);
            if (arTipSol.EstadoAprobacion[vcNomEstAprMsj].Operador == '1')
                $('input[name=chkOperadorApr]').attr('checked', true);
            else
                $('input[name=chkOperadorApr]').attr('checked', false);
            if (arTipSol.EstadoAprobacion[vcNomEstAprMsj].UsaPlantilla == '1')
                $('input[name=chkPlantilla]').attr('checked', true);
            else
                $('input[name=chkPlantilla]').attr('checked', false);
        };

        //Umbrales
        //var vcEstApr = Object.keys(arTipSol.Umbrales.Aprobacion);
        //if (arTipSol.Umbrales.Aprobacion[vcEstApr[0]].EnviarCorreo == "1")
        //    $('input[name=chkEnviarCorreoUmbApr]').attr('checked', true);
        //if (arTipSol.Umbrales.Aprobacion[vcEstApr[0]].Umbral == "1")
        //    $('input[name=chkUmbralAprobacion]').attr('checked', true);
        //
        //$("#txtValorObjetivoApr").val(arTipSol.Umbrales.Aprobacion[vcEstApr[0]].ValorObjetivo);
        //$("#txtValorMaximoApr").val(arTipSol.Umbrales.Aprobacion[vcEstApr[0]].ValorMaximo);
        //$("#txtCorreoUmbApr").val(arTipSol.Umbrales.Aprobacion[vcEstApr[0]].Destinatarios);
        //$("#txtAsuntoUmbApr").val(arTipSol.Umbrales.Aprobacion[vcEstApr[0]].Asunto);
        //$("#txtMensajeUmbApr").val(arTipSol.Umbrales.Aprobacion[vcEstApr[0]].Mensaje.replace(regMsj, '\n'));
    }

    function ActualizaArrayPorEstadoProceso(vcNomEstPro) {
        var vcEstadoProcesos = Object.keys(arTipSol.EstadoProceso);
        for (i = 0; i < vcEstadoProcesos.length; i++) {

            //Umbrales Nuevo
            //var biEnvCorUmbPro = "0", biUmbral = "0";
            //if ($('input[name=chkEnviarCorreoUmbPro]').is(':checked'))
            //    biEnvCorUmbPro = "1";
            //if ($("#chkUmbralProceso").is(":checked"))
            //    biUmbral = "1";
            //
            //if (arTipSol.EstadoProceso[vcEstadoProcesos[i]].Id != 6) {
            //    if (arTipSol.EstadoProceso[vcNomEstPro].Id == arTipSol.Umbrales.Proceso[vcEstadoProcesos[i]].EstadoInicial) {
            //        arTipSol.Umbrales.Proceso[vcEstadoProcesos[i]].Umbral = biUmbral;
            //        arTipSol.Umbrales.Proceso[vcEstadoProcesos[i]].ValorObjetivo = $("#txtValorObjetivoPro").val();
            //        arTipSol.Umbrales.Proceso[vcEstadoProcesos[i]].ValorMaximo = $("#txtValorMaximoPro").val();
            //        arTipSol.Umbrales.Proceso[vcEstadoProcesos[i]].EnviarCorreo = biEnvCorUmbPro;
            //        arTipSol.Umbrales.Proceso[vcEstadoProcesos[i]].Destinatarios = $("#txtCorreoUmbPro").val();
            //        arTipSol.Umbrales.Proceso[vcEstadoProcesos[i]].Asunto = $("#txtAsuntoUmbPro").val();
            //        arTipSol.Umbrales.Proceso[vcEstadoProcesos[i]].Mensaje = $.trim($("#txtMensajeUmbPro").val()).replace(/\n/g, vcRegMsj);
            //    }
            //}

            if (vcEstadoProcesos[i] == vcNomEstPro) {
                var vcCampos = Object.keys(arTipSol.EstadoProceso[vcEstadoProcesos[i]].Campos);

                //Reglas
                var biRegAut = "0";
                //if ($('input[name=chkEstadoAutomaticoPro]').is(':checked'))
                //    biRegAut = "1";
                //
                //arTipSol.EstadoProceso[vcEstadoProcesos[i]].ReglaAutomatica = biRegAut;
                //arTipSol.EstadoProceso[vcEstadoProcesos[i]].IdEstadoFinal = $("#ddlEstadoFinReglaPro").val();

                //Mensajes
                var biEnvCor = "0", biPro = "0", biUsuEsp = "0", biAre = "0", biTec = "0";
                if ($('input[name=chkEnviarCorreoPro]').is(':checked'))
                    biEnvCor = "1";

                arTipSol.EstadoProceso[vcEstadoProcesos[i]].EnviarCorreo = biEnvCor;
                arTipSol.EstadoProceso[vcEstadoProcesos[i]].Destinatarios = $.trim($("#txtCorreoPro").val());
                arTipSol.EstadoProceso[vcEstadoProcesos[i]].Asunto = $.trim($("#txtAsuntoPro").val());
                arTipSol.EstadoProceso[vcEstadoProcesos[i]].Mensaje = $.trim($("#txtMensajePro").val()).replace(/\n/g, vcRegMsj);

                if ($('input[name=chkPropietarioCorPro]').is(':checked'))
                    biPro = "1";
                if ($('input[name=chkUsuarioEspecificoCorPro]').is(':checked'))
                    biUsuEsp = "1";
                if ($('input[name=chkAreaCorPro]').is(':checked'))
                    biAre = "1";
                if ($('input[name=chkTecnicoCorPro]').is(':checked'))
                    biTec = "1";
                arTipSol.EstadoProceso[vcEstadoProcesos[i]].Propietario = biPro;
                arTipSol.EstadoProceso[vcEstadoProcesos[i]].UsuarioEspecifico = biUsuEsp;
                arTipSol.EstadoProceso[vcEstadoProcesos[i]].Responsable = biAre;
                arTipSol.EstadoProceso[vcEstadoProcesos[i]].Tecnico = biTec;

                //              JHERRERA - 19/05/2015: Comentado porque ahora los parámetros no se agregan manualmente sino automáticamente por cada atributo o predefinidos para solicitudes de sistema.
                //              -------------------------------------------------------------------------------------------------------------------------------------------------------------------------
                //                arTipSol.Parametros = [];
                //                //Parámetros actualización
                //                var ids = tbParametros.getDataIDs();
                //                for (j = 0; j < ids.length; j++) {
                //                    var row = tbParametros.getRowData(ids[j]);
                //                    arTipSol.Parametros[row.IdCampo] = [];
                //                    var parametro = new Parametros();
                //                    arTipSol.Parametros[row.IdCampo].push[parametro];
                //                    arTipSol.Parametros[row.IdCampo] = { Clave: row.Clave, IdCampo: row.IdCampo, vcCampo: row.vcCampo, IdParametro: row.IdParametro, Elegido: row.Elegido };
                //                }
                //              -------------------------------------------------------------------------------------------------------------------------------------------------------------------------

                //CamposEstadoProcesos
                for (j = 0; j < vcCampos.length; j++) {
                    var biVisible = "0", biEditable = "0"; biObligatorio = "0";

                    //if (inNumSolicitudes == 0 && $("#hdfCodTipSol").val() != "31" && $("#hdfCodTipSol").val() != "30") { //Controles de página HABILITADOS
                    if ($("#hdfCodTipSol").val() != "31" && $("#hdfCodTipSol").val() != "30") { //Controles de página HABILITADOS // activacion de actualizacion 10/10/2014 wapumayta
                        arTipSol.EstadoProceso[vcEstadoProcesos[i]].Campos[vcCampos[j]].Visible = $('#' + vcCampos[j] + '_ddlVisible option:selected').val();
                        //Condición de campos básicos para Editable y Obligatorio
                        if (vcCampos[j] == "F_inFasSol" || vcCampos[j] == "F_vcCodEmp" || vcCampos[j] == "daFechaCreacion" || vcCampos[j] == "daFechaModificacion" || vcCampos[j] == "inUsuarioCreacion" ||
                            vcCampos[j] == "inUsuarioModificacion" || vcCampos[j] == "vcCodigo") {

                            if ($("#" + vcCampos[j] + "_ddlEditable").html() == "SI")
                                biEditable = "1";
                            if ($("#" + vcCampos[j] + "_ddlObligatorio").html() == "SI")
                                biObligatorio = "1";

                            arTipSol.EstadoProceso[vcEstadoProcesos[i]].Campos[vcCampos[j]].Editable = biEditable;
                            arTipSol.EstadoProceso[vcEstadoProcesos[i]].Campos[vcCampos[j]].Obligatorio = biObligatorio;
                            if (vcCampos[j] == "F_vcCodEmp" || vcCampos[j] == "vcCodigo" || vcCampos[j] == "daFechaCreacion") {
                                if ($("#" + vcCampos[j] + "_ddlVisible").html() == "SI")
                                    biVisible = "1";
                                else if ($("#" + vcCampos[j] + "_ddlVisible").html() == "NO")
                                    biVisible = "0";
                                arTipSol.EstadoProceso[vcEstadoProcesos[i]].Campos[vcCampos[j]].Visible = biVisible;
                            };
                        } else {
                            arTipSol.EstadoProceso[vcEstadoProcesos[i]].Campos[vcCampos[j]].Editable = $('#' + vcCampos[j] + '_ddlEditable option:selected').val();
                            arTipSol.EstadoProceso[vcEstadoProcesos[i]].Campos[vcCampos[j]].Obligatorio = $('#' + vcCampos[j] + '_ddlObligatorio option:selected').val();
                        }

                    } else { //Controles de página INHABILITADOS

                        //Labels
                        if ($("#" + vcCampos[j] + "_ddlVisible").html() == "SI")
                            biVisible = "1";
                        if ($("#" + vcCampos[j] + "_ddlEditable").html() == "SI")
                            biEditable = "1";
                        if ($("#" + vcCampos[j] + "_ddlObligatorio").html() == "SI")
                            biObligatorio = "1";
                        arTipSol.EstadoProceso[vcEstadoProcesos[i]].Campos[vcCampos[j]].Visible = biVisible;
                        arTipSol.EstadoProceso[vcEstadoProcesos[i]].Campos[vcCampos[j]].Editable = biEditable;
                        arTipSol.EstadoProceso[vcEstadoProcesos[i]].Campos[vcCampos[j]].Obligatorio = biObligatorio;
                    }
                }

                //VERIFICAR SI ES SELECT O LABEL
                //eval("arTipSol.EstadoProceso." + vcEstadoProcesos[i] + ".Campos." + vcCampos[j] + ".Visible = $('#" + vcCampos[j] + "_ddlVisible option:selected').val()");
                //eval("arTipSol.EstadoProceso." + vcEstadoProcesos[i] + ".Campos." + vcCampos[j] + ".Editable = $('#" + vcCampos[j] + "_ddlEditable option:selected').val()");
            }
        }
    }

    function MuestraDatosDeArrayPorEstadoProceso(vcNomEstPro) {
        var vcEstadoProcesos = Object.keys(arTipSol.EstadoProceso);
        //tbParametros.jqGrid("clearGridData", true).trigger("reloadGrid");

        for (i = 0; i < vcEstadoProcesos.length; i++) {
            //Umbrales Nuevo
            //            if (arTipSol.EstadoProceso[vcEstadoProcesos[i]].Id != 6) {//Estado 8-proceso 7-'Culminada', 9-'Anulada'
            //                if (arTipSol.EstadoProceso[vcNomEstPro].Id == arTipSol.Umbrales.Proceso[vcEstadoProcesos[i]].EstadoInicial) {
            //                    if (arTipSol.Umbrales.Proceso[vcEstadoProcesos[i]].Umbral == "1") {
            //                        $('input[name=chkUmbralProceso]').attr('checked', true);
            //                        $("#dvUmbralPro").show();
            //                    } else {
            //                        $('input[name=chkUmbralProceso]').attr('checked', false);
            //                        $("#dvUmbralPro").hide();
            //                    };
            //                    $("#txtValorObjetivoPro").val(arTipSol.Umbrales.Proceso[vcEstadoProcesos[i]].ValorObjetivo);
            //                    $("#txtValorMaximoPro").val(arTipSol.Umbrales.Proceso[vcEstadoProcesos[i]].ValorMaximo);
            //                    if (arTipSol.Umbrales.Proceso[vcEstadoProcesos[i]].EnviarCorreo == "1") {
            //                        $('input[name=chkEnviarCorreoUmbPro]').attr('checked', true);
            //                        $("#dvMensajeUmbPro").show();
            //                    } else {
            //                        $('input[name=chkEnviarCorreoUmbPro]').attr('checked', false);
            //                        $("#dvMensajeUmbPro").hide();
            //                    };
            //                    $("#txtCorreoUmbPro").val(arTipSol.Umbrales.Proceso[vcEstadoProcesos[i]].Destinatarios);
            //                    $("#txtAsuntoUmbPro").val(arTipSol.Umbrales.Proceso[vcEstadoProcesos[i]].Asunto);
            //                    $("#txtMensajeUmbPro").val(arTipSol.Umbrales.Proceso[vcEstadoProcesos[i]].Mensaje.replace(regMsj, '\n'));
            //                }
            //            }

            if (vcEstadoProcesos[i] == vcNomEstPro) {
                //Umbrales
                //if (arTipSol.EstadoProceso[vcNomEstPro].Id == 6 || arTipSol.EstadoProceso[vcNomEstPro].Id == 8) {//Estado proceso 6-'Pendiente', 8-'Proceso'
                //    $("#chkUmbralProceso").prop('disabled', false);
                //    //$("#dvUmbralPro").hide();
                //} else {
                //    $("#chkUmbralProceso").prop('disabled', true);
                //    $('input[name=chkUmbralProceso]').attr('checked', false);
                //    $("#dvUmbralPro").hide();
                //}
                //if (arTipSol.EstadoProceso[vcNomEstPro].Id == 6) {
                //    $("#msjUmbProPendiente").show();
                //    $("#msjUmbProEnProceso").hide();
                //    $("#msjUmbProCulminada_Anulada").hide();
                //} else if (arTipSol.EstadoProceso[vcNomEstPro].Id == 8) {
                //    $("#msjUmbProPendiente").hide();
                //    $("#msjUmbProEnProceso").show();
                //    $("#msjUmbProCulminada_Anulada").hide();
                //} else {
                //    $("#msjUmbProPendiente").hide();
                //    $("#msjUmbProEnProceso").hide();
                //    $("#msjUmbProCulminada_Anulada").show();
                //};

                //validar creacion de reglas
                var vcEstadosPro = Object.keys(arTipSol.EstadoProceso);
                var vcReglasEstadoInicial = [];
                //$("#lblEstadoIniReglaProMensaje").text("");
                //vcMenRegPro = $("#lblEstadoIniReglaProMensaje").text();
                //for (j = 0; j < vcEstadosPro.length; j++) {
                //    if (arTipSol.EstadoProceso[vcEstadosPro[j]].ReglaAutomatica == '1' && arTipSol.EstadoProceso[vcEstadosPro[j]].IdEstadoFinal == arTipSol.EstadoProceso[vcNomEstPro].Id) {
                //        vcReglasEstadoInicial.push(vcEstadosPro[j]);
                //        cicloFin = true;
                //    }
                //}
                //if (vcReglasEstadoInicial.length > 0) {
                //    if (vcTabProSel == "tbReglaProceso") {
                //        $("#lblEstadoIniReglaProMensaje").text(" *Este estado se está usando como estado final en la(s) regla(s) con estado inicial: " + vcReglasEstadoInicial.join(","));
                //        vcMenRegPro = $("#lblEstadoIniReglaProMensaje").text();
                //    } else
                //        vcMenRegPro = " *Este estado se está usando como estado final en la(s) regla(s) con estado inicial: " + vcReglasEstadoInicial.join(",");
                //}
                //Reglas
                //if (arTipSol.EstadoProceso[vcNomEstPro].ReglaAutomatica == '1') {
                //    $('input[name=chkEstadoAutomaticoPro]').attr('checked', true);
                //    $("#ddlEstadoFinReglaPro").val(arTipSol.EstadoProceso[vcNomEstPro].IdEstadoFinal);
                //} else {
                //    $('input[name=chkEstadoAutomaticoPro]').attr('checked', false);
                //    $("#ddlEstadoFinReglaPro").val("-1");
                //};
                //if ($("#ddlEstadoProceso").val() == 7) { //Culminada
                //    $("#chkEstadoAutomaticoPro").prop('disabled', true);
                //    $('input[name=chkEstadoAutomaticoPro]').attr('checked', false);
                //    $("#ddlEstadoFinReglaPro").val("-1");
                //    if (vcTabProSel == "tbReglaProceso" && $("#ddlEstadoProceso").val() == "7") {
                //        $("#lblEstadoIniReglaProMensaje").text(" *El estado inicial '" + vcNomEstPro + "' no puede tener una regla.");
                //        vcMenRegPro = $("#lblEstadoIniReglaProMensaje").text();
                //    } else if ($("#ddlEstadoProceso").val() == "7")
                //        vcMenRegPro = "*El estado inicial '" + vcNomEstPro + "' no puede tener una regla.";
                //} else {
                //    $("#chkEstadoAutomaticoPro").prop('disabled', false);
                //}

                //Mensaje
                if (arTipSol.EstadoProceso[vcNomEstPro].Id == biPrimerEstPro) { //Estado aprobación 32 'Pendiente'
                    //$("#lblEnvioDeCorreoPro").html("Este mensaje será enviado cada vez que se cree una solicitud.")
                    $("#lblEnvioDeCorreoPro").html("Este mensaje será enviado cada vez que una solicitud se encuentre en el estado de proceso: '" + vcEstadoProcesos[i] + "'.")
                } else {
                    $("#lblEnvioDeCorreoPro").html("Este mensaje será enviado cada vez que una solicitud se encuentre en el estado de proceso: '" + vcEstadoProcesos[i] + "'.")
                }

                //Mensaje
                var vcMensaje = "";
                if (arTipSol.EstadoProceso[vcEstadoProcesos[i]].EnviarCorreo == '1') {
                    $('input[name=chkEnviarCorreoPro]').attr('checked', true);
                } else {
                    $('input[name=chkEnviarCorreoPro]').attr('checked', false);
                }
                $('#txtCorreoPro').val(arTipSol.EstadoProceso[vcEstadoProcesos[i]].Destinatarios);
                $('#txtAsuntoPro').val(arTipSol.EstadoProceso[vcEstadoProcesos[i]].Asunto);
                vcMensaje = arTipSol.EstadoProceso[vcEstadoProcesos[i]].Mensaje;
                $('#txtMensajePro').val(vcMensaje.replace(regMsj, '\n'));

                if (arTipSol.EstadoProceso[vcEstadoProcesos[i]].Propietario == '1')
                    $('input[name=chkPropietarioCorPro]').attr('checked', true);
                else
                    $('input[name=chkPropietarioCorPro]').attr('checked', false);
                if (arTipSol.EstadoProceso[vcEstadoProcesos[i]].UsuarioEspecifico == '1')
                    $('input[name=chkUsuarioEspecificoCorPro]').attr('checked', true);
                else
                    $('input[name=chkUsuarioEspecificoCorPro]').attr('checked', false);
                if (arTipSol.EstadoProceso[vcEstadoProcesos[i]].Responsable == '1')
                    $('input[name=chkAreaCorPro]').attr('checked', true);
                else
                    $('input[name=chkAreaCorPro]').attr('checked', false);
                if (arTipSol.EstadoProceso[vcEstadoProcesos[i]].Tecnico == '1')
                    $('input[name=chkTecnicoCorPro]').attr('checked', true);
                else
                    $('input[name=chkTecnicoCorPro]').attr('checked', false);

                //                //Parámetros
                //                var vcParametros = Object.keys(arTipSol.Parametros); var inNumSel = 0;
                //                for (j = 0; j < vcParametros.length; j++) {
                //                    var vcClave = ""; var vcIdCampo = ""; var vcNomCampo = ""; var vcElegido = ""; var vcDesDet = "";
                //                    vcClave = arTipSol.Parametros[vcParametros[j]].Clave;
                //                    vcIdCampo = arTipSol.Parametros[vcParametros[j]].IdCampo;
                //                    vcNomCampo = arTipSol.Parametros[vcParametros[j]].vcCampo;
                //                    vcIdParametro = arTipSol.Parametros[vcParametros[j]].IdParametro;
                //                    vcElegido = arTipSol.Parametros[vcParametros[j]].Elegido;
                //                    vcDesDet = arTipSol.Parametros[vcParametros[j]].DescripcionDetalle;
                //                    var datos = { Clave: vcClave, IdCampo: vcIdCampo, vcCampo: vcNomCampo, IdParametro: vcIdParametro, Elegido: vcElegido, DescripcionDetalle: vcDesDet };

                //                    tbParametros.jqGrid('addRowData', vcClave, datos);
                //                    if (vcElegido == "1") {
                //                        tbParametros.jqGrid('setSelection', vcClave);
                //                        inNumSel = inNumSel + 1;

                //                        if ($('#ddlParametrosApr').find('option[value="' + vcClave + '"]').length == 0) {
                //                            $('#ddlParametrosApr').append($('<option></option>').val(vcClave).html(vcNomCampo));
                //                            $('#ddlParametrosPro').append($('<option></option>').val(vcClave).html(vcNomCampo));
                //                        }
                //                    }
                //                }
                //                tbParametros.trigger("reloadGrid", [{ current: true}]);
                //                if (inNumSel == vcParametros.length) {
                //                    $("#cb_tbParametros").attr('checked', true);
                //                }

                //Campos
                var vcCampos = Object.keys(arTipSol.EstadoProceso[vcEstadoProcesos[i]].Campos);
                //if (arTipSol.EstadoProceso[vcNomEstPro].Id == 6) {
                //    $("#lblMsjCamEstPro").html("Esta configuración se verá reflejada solo cuando se cree la solicitud o cuando esta se encuentre en estado de aprobación 'Pendiente'.");
                //} else {
                //    $("#lblMsjCamEstPro").html("");
                //}
                //
                //for (j = 0; j < vcCampos.length; j++) {
                //    var vcVisible = "NO", biVisible = "0", vcEditable = "NO", biEditable = "0", vcObligatorio = "NO", biObligatorio = "0";
                //    biVisible = arTipSol.EstadoProceso[vcEstadoProcesos[i]].Campos[vcCampos[j]].Visible;
                //    biEditable = arTipSol.EstadoProceso[vcEstadoProcesos[i]].Campos[vcCampos[j]].Editable;
                //    biObligatorio = arTipSol.EstadoProceso[vcEstadoProcesos[i]].Campos[vcCampos[j]].Obligatorio;
                //
                //    if (biVisible == "1") { vcVisible = "SI" }; if (biEditable == "1") { vcEditable = "SI" }; if (biObligatorio == "1") { vcObligatorio = "SI" };
                //
                //    //if (inNumSolicitudes == 0 && $("#hdfCodTipSol").val() != "31" && $("#hdfCodTipSol").val() != "30") { //Controles de página HABILITADOS
                //    if ($("#hdfCodTipSol").val() != "31" && $("#hdfCodTipSol").val() != "30") { //Controles de página HABILITADOS //10-10-2014 wapumayta
                //        if (vcCampos[j] == "F_vcCodEmp" && vcEstadoProcesos[i] == "Pendiente") {
                //            $("#" + vcCampos[j] + "_ddlVisible").html("SI");
                //        } else if (vcCampos[j] == "F_vcCodEmp" && vcEstadoProcesos[i] != "Pendiente") {
                //            $("#" + vcCampos[j] + "_ddlVisible").html("SI");
                //        } else if (vcCampos[j] == "daFechaCreacion" && vcEstadoProcesos[i] == "Pendiente") {
                //            $("#" + vcCampos[j] + "_ddlVisible").html("NO");
                //        } else if (vcCampos[j] == "daFechaCreacion" && vcEstadoProcesos[i] != "Pendiente") {
                //            $("#" + vcCampos[j] + "_ddlVisible").html("SI");
                //        } else {
                //            $("#" + vcCampos[j] + "_ddlVisible").val(biVisible);
                //        };
                //        //--
                //        if (biVisible == "0") {
                //            $("#" + vcCampos[j] + "_ddlEditable").attr("disabled", true);
                //        } else {
                //            $("#" + vcCampos[j] + "_ddlEditable").attr("disabled", false);
                //        };
                //        //--
                //        if (vcCampos[j] == "F_inFasSol" || vcCampos[j] == "F_vcCodEmp" || vcCampos[j] == "daFechaCreacion" || vcCampos[j] == "daFechaModificacion" || vcCampos[j] == "inUsuarioCreacion" ||
                //            vcCampos[j] == "inUsuarioModificacion") {
                //            $("#" + vcCampos[j] + "_ddlEditable").html(vcEditable);
                //            $("#" + vcCampos[j] + "_ddlObligatorio").html(vcObligatorio);
                //        } else {
                //            $("#" + vcCampos[j] + "_ddlEditable").val(biEditable);
                //            if (biEditable == "0") {
                //                $("#" + vcCampos[j] + "_ddlObligatorio").attr("disabled", true);
                //            } else {
                //                $("#" + vcCampos[j] + "_ddlObligatorio").attr("disabled", false);
                //            };
                //            $("#" + vcCampos[j] + "_ddlObligatorio").val(biObligatorio);
                //        }
                //
                //    } else { //Controles de página INHABILITADOS
                //        $("#" + vcCampos[j] + "_ddlVisible").html(vcVisible);
                //        $("#" + vcCampos[j] + "_ddlEditable").html(vcEditable);
                //        $("#" + vcCampos[j] + "_ddlObligatorio").html(vcObligatorio);
                //    }
                //}
                //                for (j = 0; j < vcCampos.length; j++) {
                //                    var rowCampos = tbCamposEstadoProceso.getRowData(vcCampos[j]);
                //                    eval("$('#" + vcCampos[j] + "_ddlVisible').val = arTipSol.EstadoProceso." + vcEstadoProcesos[i] + ".Campos." + vcCampos[j] + ".Visible");
                //                    eval("$('#" + vcCampos[j] + "_ddlEditable').val = arTipSol.EstadoProceso." + vcEstadoProcesos[i] + ".Campos." + vcCampos[j] + ".Editable");

                //                    eval("rowCampos.ddlVisible = arTipSol.EstadoProceso." + vcEstadoProcesos[i] + ".Campos." + vcCampos[j] + ".Visible");
                //                    eval("rowCampos.ddlEditable = arTipSol.EstadoProceso." + vcEstadoProcesos[i] + ".Campos." + vcCampos[j] + ".Editable");

                //                    tbCamposEstadoProceso.jqGrid('setRowData', vcCampos[j], rowCampos);
                //                    tbCamposEstadoProceso.trigger("reloadGrid");
                //                    if (inNumSolicitudes == 0)
                //                        tbCamposEstadoProceso.jqGrid('editRow', vcCampos[j], true);
                //                }
            }
        }
    }

    $("#ddlEstadoAprobacion").focus(function () {
        //if (inNumSolicitudes == 0) {
        var rptaMensajeApr = ValidarIngresoMensajes("#chkEnviarCorreoApr", "#txtCorreoApr", "chkTecnicoCorApr", "chkOperadorApr", "#txtAsuntoApr", "#txtMensajeApr");
        if (rptaMensajeApr != '') {
            FocusAlert(3, 3, rptaMensajeApr);
            return;
        };
        ActualizaArrayPorEstadoAprobacion("0", $("#ddlEstadoAprobacion option:selected").text()); //this.value .replace(" ", "_")
        //}
    }).change(function () {
        MuestraDatosDeArrayPorEstadoAprobacion("0", $("#ddlEstadoAprobacion option:selected").text()); //.replace(" ", "_")
        //if (inNumSolicitudes == 0) {
        if ($("#chkEnviarCorreoApr").is(":checked"))
            fnHabilitarControlesMensajeApr();
        else
            fnDeshabilitarControlesMensajeApr();
        //}
        //if (this.value == 32) { // 10-03-2014 wapumayta
        //    $("#chkAreaCorApr").prop('disabled', true);
        //    $("#chkTecnicoCorApr").prop('disabled', true);
        //    $("#chkUsuarioEspecificoCorApr").prop('disabled', true);
        //} else {
        //    if ($("#chkRespArea").is(":checked")) {
        //        $("#chkAreaCorApr").prop('disabled', false);
        //    } else {
        //        $("#chkAreaCorApr").prop('disabled', true);
        //    }
        //    if ($("#chkRespUsuario").is(":checked")) {
        //        $("#chkUsuarioEspecificoCorApr").prop('disabled', false);
        //    } else {
        //        $("#chkUsuarioEspecificoCorApr").prop('disabled', true);
        //    }
        //    $("#chkTecnicoCorApr").prop('disabled', true);
        //}
    });

    //$("#ddlEstadoIniReglaApr").focus(function () {
    //    //if (inNumSolicitudes == 0) {
    //    if (!ValidarIngresoReglas("chkEstadoAutomaticoApr", this, "#ddlEstadoFinReglaApr")) {
    //        return;
    //    }
    //    ActualizaArrayPorEstadoAprobacion($("#ddlEstadoIniReglaApr option:selected").text(), "0"); //this.value .replace(" ", "_")
    //    //};
    //}).change(function () {
    //    MuestraDatosDeArrayPorEstadoAprobacion($("#ddlEstadoIniReglaApr option:selected").text(), "0"); //.replace(" ", "_")
    //    fnActualizaLabelReglaAutomaticaApr();
    //});

    //    $("#ddlEstadoProceso").click(function () {
    //        //        if (inNumSolicitudes == 0) {
    //        //var rptaUmbralProC = ValidarIngresoUmbrales("chkUmbralProceso", "#txtValorObjetivoPro", "#txtValorMaximoPro", "chkEnviarCorreoUmbPro", "#txtCorreoUmbPro", "#txtAsuntoUmbPro", "#txtMensajeUmbPro");
    //        //if (rptaUmbralProC != '') {
    //        //    if ($("#hdfPersonalizada").val() == "true") { //agregado 13-01-2015
    //        //        FocusAlert(4, 1, rptaUmbralProC);
    //        //    } else {
    //        //        FocusAlert(4, 0, rptaUmbralProC);
    //        //    }
    //        //    return;
    //        //};
    //        //if (!ValidarIngresoReglas("chkEstadoAutomaticoPro", "#ddlEstadoProceso", "#ddlEstadoFinReglaPro")) {
    //        //    FocusAlert(4, 2, "#ddlEstadoFinReglaPro");
    //        //    return;
    //        //};
    //        var rptaMensajePro = ValidarIngresoMensajes("#chkEnviarCorreoPro", "#txtCorreoPro", "chkPropietarioCorPro", "chkUsuarioEspecificoCorPro", "chkAreaCorPro", "chkTecnicoCorPro", "#txtAsuntoPro", "#txtMensajePro");
    //        if (rptaMensajePro != '') {
    //            FocusAlert(4, 3, rptaMensajePro);
    //            return;
    //        };

    //        ActualizaArrayPorEstadoProceso($("#ddlEstadoProceso option:selected").text()); //this.value .replace(" ", "_")
    //        //        }
    //    }).change(function () {
    //        MuestraDatosDeArrayPorEstadoProceso($("#ddlEstadoProceso option:selected").text()); //.replace(" ", "_")
    //        fnActualizaLabelReglaAutomaticaPro();
    //        if (this.value == 6) { // 10-03-2014 wapumayta
    //            $("#chkPropietarioCorPro").prop('disabled', true);
    //            $("#chkUsuarioEspecificoCorPro").prop('disabled', true);
    //            $("#chkAreaCorPro").prop('disabled', true);
    //        } else {
    //            if ($("#chkRespUsuario").is(":checked")) {
    //                $("#chkUsuarioEspecificoCorPro").prop('disabled', false);
    //            } else {
    //                $("#chkUsuarioEspecificoCorPro").prop('disabled', true);
    //            }
    //            if ($("#chkRespArea").is(":checked")) {
    //                $("#chkAreaCorPro").prop('disabled', false);
    //            } else {
    //                $("#chkAreaCorPro").prop('disabled', true);
    //            }
    //            $("#chkPropietarioCorPro").prop('disabled', false);
    //        }
    //        //if (inNumSolicitudes == 0) {
    //        //    //Umbrales
    //        //    if (this.value == 2) {
    //        //
    //        //    } else if (this.value == 3) {
    //        //
    //        //    }
    //        //}
    //        //Mensajes
    //        if ($("#chkEnviarCorreoPro").is(":checked"))
    //            fnHabilitarControlesMensajePro();
    //        else {
    //            if (vcTabProSel == "tbMensajeProceso")
    //                $("#tabEstadoProceso").tabs('option', 'selected', 0);
    //            fnDeshabilitarControlesMensajePro();
    //        }
    //    });

    //---------------------------------------------------------------------------------------->>

    //------------------------------CONFIGURACIÓN DE PARÁMETROS-------------------------------//

    function Parametros() {
        this.Clave;
        this.IdCampo;
        this.vcCampo;
    }

    $(Parametros).extend({
        Clave: 'Calve',
        IdCampo: 'IdCampo',
        vcCampo: 'vcCampo'
    });

    function fnCargarGrillaParametros() {
        var vcParametros = Object.keys(arTipSol.Parametros); var inNumSel = 0;
        for (j = 0; j < vcParametros.length; j++) {
            var vcClave = ""; var vcIdCampo = ""; var vcNomCampo = ""; var vcElegido = ""; var vcDesDet = "";
            vcClave = arTipSol.Parametros[vcParametros[j]].Clave;
            vcIdCampo = arTipSol.Parametros[vcParametros[j]].IdCampo;
            vcNomCampo = arTipSol.Parametros[vcParametros[j]].vcCampo;
            vcIdParametro = arTipSol.Parametros[vcParametros[j]].IdParametro;
            vcElegido = arTipSol.Parametros[vcParametros[j]].Elegido;
            vcDesDet = arTipSol.Parametros[vcParametros[j]].DescripcionDetalle;
            var datos = { Clave: vcClave, IdCampo: vcIdCampo, vcCampo: vcNomCampo, IdParametro: vcIdParametro, Elegido: vcElegido, DescripcionDetalle: vcDesDet };

            tbParametros.jqGrid('addRowData', vcClave, datos);
            if (vcElegido == "1") {
                tbParametros.jqGrid('setSelection', vcClave);
                inNumSel = inNumSel + 1;

                if ($('#ddlParametrosApr').find('option[value="' + vcClave + '"]').length == 0) {
                    fnAgregarParametrosEnSeccionMensajes(vcClave, vcNomCampo);
                }
            }
        }
        tbParametros.trigger("reloadGrid", [{ current: true}]);
        if (inNumSel == vcParametros.length) {
            $("#cb_tbParametros").attr('checked', true);
        }
    }

    function fnAgregarParametro(vcIdCampo, vcNomCampo, vcDesCampo, vcIdParametro, vcElegido) {
        var vcClave = "{" + vcNomCampo + "}";
        var vcDesDet = "Campo dinámico: " + vcNomCampo + ".";
        var datos = { Clave: vcClave, IdCampo: vcIdCampo, vcCampo: vcDesCampo, IdParametro: vcIdParametro, Elegido: vcElegido, DescripcionDetalle: vcDesDet };
        tbParametros.jqGrid('addRowData', vcClave, datos);
        arTipSol.Parametros[vcClave] = [];
        //arTipSol.Parametros[vcClave] = { Clave: vcClave, IdCampo: vcNomCampo, vcCampo: vcNomCampo, IdParametro: vcIdParametro, Elegido: vcElegido };
        arTipSol.Parametros[vcClave] = { Clave: vcClave, IdCampo: vcNomCampo, vcCampo: vcDesCampo, IdParametro: vcIdParametro, Elegido: vcElegido };

        fnAgregarParametrosEnSeccionMensajes(vcClave, vcDesCampo)
        fnSortDropDownListByText("ddlParametrosApr");
        fnSortDropDownListByText("ddlParametrosPro");
        fnSortDropDownListByText("ddlParametrosUmbApr");
        fnSortDropDownListByText("ddlParametrosUmbPro");
    }
    function fnQuitarParametro(vcCampo) {
        var Clave = "{" + vcCampo + "}";
        tbParametros.delRowData(Clave);
        var vcParametros = Object.keys(arTipSol.Parametros);
        for (j = 0; j < vcParametros.length; j++) {
            var vcClave = arTipSol.Parametros[vcParametros[j]].Clave;
            //            var vcIdCampo = arTipSol.Parametros[vcParametros[j]].IdCampo;
            if (vcClave == Clave) {
                delete arTipSol.Parametros[vcParametros[j]]; //eliminar de arTipSol
            }
        }
        fnQuitarParametrosEnSeccionMensajes(Clave);
    }
    function fnAgregarParametrosEnSeccionMensajes(value, name) {
        //        //Primero se quita el elemento para evitar duplicidad y simplificar el proceso de validación de existencia
        //        fnQuitarParametrosEnSeccionMensajes(value);
        $('#ddlParametrosApr').append($('<option></option>').val(value).html(name));
        $('#ddlParametrosPro').append($('<option></option>').val(value).html(name));
        $('#ddlParametrosUmbApr').append($('<option></option>').val(value).html(name));
        $('#ddlParametrosUmbPro').append($('<option></option>').val(value).html(name));
    }
    function fnQuitarParametrosEnSeccionMensajes(value) {
        $("#ddlParametrosApr option[value='" + value + "']").remove();
        $("#ddlParametrosPro option[value='" + value + "']").remove();
        $("#ddlParametrosUmbApr option[value='" + value + "']").remove();
        $("#ddlParametrosUmbPro option[value='" + value + "']").remove();
    }

    var tbParametros = $("#tbParametros").jqGrid({
        sortable: true,
        datatype: "local",
        jsonReader: //Set the jsonReader to the JQGridJSonResponse squema to bind the data.
                    {
                    root: "Items",
                    page: "PaginaActual",
                    total: "TotalPaginas",
                    records: "TotalRegistros",
                    repeatitems: true,
                    cell: "Row",
                    id: "ID"
                },
        colModel: [{ name: 'Clave', index: 'Clave', label: 'Clave', hidden: false, width: 160 },
                    { name: 'IdCampo', index: 'IdCampo', label: 'IdCampo', hidden: true, width: 180 },
                    { name: 'vcCampo', index: 'vcCampo', label: 'Descripción', hidden: false, width: 170 },
                    { name: 'IdParametro', index: 'IdParametro', label: 'IdParametro', hidden: true, width: 50,
                        formatter: function (value, options, rData) {
                            if ($("#hdfCodTipSol").val() == "") {
                                return "-1";
                            } else {
                                if (rData.IdParametro == undefined || rData.IdParametro == "" || rData.IdParametro == null) {
                                    return "0";
                                } else {
                                    return rData.IdParametro;
                                }
                            }
                        }
                    },
                    { name: 'DescripcionDetalle', index: 'DescripcionDetalle', label: 'Descripción Detallada', hidden: false, width: 410 }
   	               ],
        loadtext: 'Cargando datos...',
        emptyrecords: 'No hay resultados',
        rowList: [10, 20, 30],  //TamanosPaginaSel, //Variable PageSize DropDownList. 
        rowNum: 100,
        sortname: "inCodGru", //sortname: idTabla, //Default SortColumn
        sortorder: "asc", //Default SortOrder.
        height: "135",
        //        width: "600",
        rownumbers: true,
        shrinkToFit: false,
        multiselect: true,
        beforeSelectRow: function (rowid, e) {
            var row = tbParametros.getRowData(rowid);

            if (row.IdCampo == 'vcDesSol' && $("#ddlCapVisible-5").val() == "0") {
                return false;
            } else {
                return true;
            }
        },
        onSelectRow: function (rowid, biSelect, iCol, e) {
            var row = tbParametros.getRowData(rowid);

            if (biSelect) {
                arTipSol.Parametros[row.Clave].Elegido = "1";
                if ($('#ddlParametrosApr').find('option[value="' + row.Clave + '"]').length == 0) {
                    fnAgregarParametrosEnSeccionMensajes(row.Clave, row.vcCampo);
                    fnSortDropDownListByText("ddlParametrosApr");
                    fnSortDropDownListByText("ddlParametrosPro");
                    fnSortDropDownListByText("ddlParametrosUmbApr");
                    fnSortDropDownListByText("ddlParametrosUmbPro");
                }
            } else {
                arTipSol.Parametros[row.Clave].Elegido = "0";
                fnQuitarParametrosEnSeccionMensajes(row.Clave)
            }
        },
        onSelectAll: function (aRowids, status) {
            var row;

            for (var i = 0; i < aRowids.length; i++) {
                row = tbParametros.getRowData(aRowids[i]);
                if (status) {
                    if (arTipSol.Parametros[row.Clave].Elegido == "0") {
                        arTipSol.Parametros[row.Clave].Elegido = "1";
                        fnAgregarParametrosEnSeccionMensajes(row.Clave, row.vcCampo);
                    }
                } else {
                    arTipSol.Parametros[row.Clave].Elegido = "0";
                    fnQuitarParametrosEnSeccionMensajes(row.Clave)
                }
            }
            fnSortDropDownListByText("ddlParametrosApr");
            fnSortDropDownListByText("ddlParametrosPro");
            fnSortDropDownListByText("ddlParametrosUmbApr");
            fnSortDropDownListByText("ddlParametrosUmbPro");
        }
    });

    //    if ($("#hdfCodTipSol").val() == "") {
    tbParametros.jqGrid("clearGridData", true).trigger("reloadGrid");
    fnCargarGrillaParametros();
    //    }

    //    
    //    function EditarParametro(Clave, IdCampo, Valor) {
    //        alertaExterna("Si va a modificar parámetros, deberá revisar la edición de mensajes y actualizar los parámetros manualmente");
    //        valRowParametro = Clave;
    //        $("#lblBotonAgregarParametro").text("Actualizar");
    //        $("#lblBotonQuitarParametro").text("Cancelar");
    //        $("#txtClave").val(Clave);
    //        $("#ddlValor").val(IdCampo);
    //        $("#txtClave").attr("disabled", false);
    //        $("#txtClave").removeClass("txtBusqueda");
    //        $("#ddlValor").prop("disabled", true);
    //    }
    //    function CancelarEdicionParametro() {
    //        $("#lblBotonAgregarParametro").text("Agregar");
    //        $("#lblBotonQuitarParametro").text("Quitar");
    //        $("#txtClave").val('');
    //        $("#ddlValor").val("-1");
    //        $("#ddlValor").prop("disabled", false);
    //    };

    //    $("#txtClave").focus(function () {
    //        if ($(this).hasClass("txtBusqueda")) {
    //            $(this).removeClass("txtBusqueda");
    //            $("#txtClave").val("");
    //        }
    //    });

    //    $("#txtClave").blur(function (i) {
    //        if ($("#txtClave").val() == "") {
    //            $(this).addClass("txtBusqueda");
    //            $("#txtClave").val(vcMensajeClave);
    //        }
    //    });

    //    $("#ddlValor").live('keypress', function (e) {
    //        if (e.which == '13') {
    //            btnAgregarParametro.click();
    //            $("#txtClave").focus();
    //        }
    //    });

    $("#btnAgregarParametro").live("click", function () {
        var textoAgregarParam = $("#lblBotonAgregarParametro").text();
        var vcClave = $.trim($("#txtClave").val());

        if (vcClave == "") {
            alertaExterna("La clave es requerida.");
            return;
        }
        if ($("#ddlValor").val() == "-1") {
            alertaExterna("El campo es requerido.");
            return;
        }
        if (vcClave.substr(0, 1) != "{" || vcClave.substr(vcClave.length - 1, 1) != "}") {
            alertaExterna("La clave debe comenzar con '{' y terminar con '}'");
            return;
        }

        var ids = tbParametros.getDataIDs();
        var biExiste = 0;
        for (i = 0; i < ids.length; i++) {
            if (((tbParametros.getRowData(ids[i]))["Clave"] == vcClave) || ((tbParametros.getRowData(ids[i]))["IdCampo"] == $("#ddlValor").val())) {
                biExiste = 1;
            }
        }
        if (textoAgregarParam != "Agregar") { biExiste = 0; }
        if (biExiste == 0) {
            var datos = { Clave: vcClave,
                IdCampo: $("#ddlValor").val(),
                vcCampo: $("#ddlValor option:selected").text()
            }
            if (textoAgregarParam == 'Agregar') { //agregar nuevo
                tbParametros.jqGrid('addRowData', vcClave, datos);
                tbParametros.trigger("reloadGrid");
            } else { //editar
                tbParametros.jqGrid('setRowData', valRowParametro, datos);
                CancelarEdicionParametro();
            }
            $("#txtClave").val("");
            $("#ddlValor").val("-1");
        } else {
            alertaExterna("Los parámetros deben ser únicos para claves y campos.");
            $("#txtClave").focus();
        }
    });

    $("#btnQuitarParametro").live("click", function () {
        var textoQuitarParam = $("#lblBotonQuitarParametro").text();
        if (textoQuitarParam == "Quitar") {
            if (tbParametros.getGridParam('selrow')) {
                tbParametros.delRowData(tbParametros.getGridParam('selrow'));
            } else {
                alertaExterna("Debe seleccionar una fila");
            }
        } else {
            CancelarEdicionParametro();
        }
    });

    //---------------------------------------------------------------------------------------->>

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //------------------------------------------------------EDITAR TIPO DE SOLICITUD-------------------------------------------------------//

    if ($("#hdfCodTipSol").val() != "") {
        $("#dvTabs").show();

        //for (var i = 0; i < dtCampos.length; i++)
        //    tbCampos.jqGrid('addRowData', dtCampos[i].Idd, dtCampos[i]);
        //
        //for (var i = 0; i < dtCamposEstadoProceso.length; i++)
        //    tbCamposEstadoProceso.jqGrid('addRowData', dtCamposEstadoProceso[i].vcCampo, dtCamposEstadoProceso[i]);

        //CARGAR DATOS 
        //MuestraDatosDeArrayPorEstadoProceso($("#ddlEstadoProceso option:selected").text()); //.replace(" ", "_")
        MuestraDatosDeArrayPorEstadoAprobacion($("#ddlEstadoAprobacion option:selected").text(), $("#ddlEstadoAprobacion option:selected").text());

        //Actualizar Controles
        //fnUmbralAprobacion();
        //fnActualizarEtiquetasSemaforosApr();
        //fnActualizarEtiquetasSemaforosPro();
        fnActualizaLabelReglaAutomaticaApr();
        fnActualizaLabelReglaAutomaticaPro();
        fnDeshabilitarControlesMensajeApr();
        fnDeshabilitarControlesMensajePro();

        if ($("#chkEnviarCorreoPro").is(":checked"))
            fnHabilitarControlesMensajePro();
        if ($("#chkEnviarCorreoApr").is(":checked"))
            fnHabilitarControlesMensajeApr();

        if ($("#hdfNumSolicitudes").val() > 0 || $("#hdfCodTipSol").val() == "31" || $("#hdfCodTipSol").val() == "30") {
            //Cabecera
            if ($("#hdfPersonalizada").val() == 'true') {
                if ($("#hdfCodTipSol").val() != "30" && $("#hdfCodTipSol").val() != "31") {
                    $('#lblMensajeError').html("Debido a que ya existe una o más solicitudes para este tipo de solicitud, este no puede ser editado en su totalidad; solo algunos datos como Responsables de Aprobacion, Umbrales, Reglas y Mensajes pueden ser editados .")
                } else {
                    $('#lblMensajeError').html("Este tipo de solicitud no puede ser editada en su totalidad; solo algunos datos como Responsables de Aprobacion, Umbrales, Reglas y Mensajes pueden ser editados.")
                }
            }
            $('#txtTabla').attr('disabled', true);
            $('#ddlLineaTipo').prop('disabled', true);
            $('#txtPrefijo').prop('disabled', true);
            $("#chkMontoFijo").prop('disabled', true);
            $("#chkEsDevolucion").prop('disabled', true);
            $("#txtMonto").prop('disabled', true);
            $('#ddlFinanciamiento').prop('disabled', true);
            $("#chkUsarDriver").prop('disabled', true);

            //Atributos
            if ($("#hdfCodTipSol").val() == "31" || $("#hdfCodTipSol").val() == "30") {
                $('#txtCampo').attr('readonly', true);
                $('#txtDescripcion').attr('readonly', true);
                $('#ddlTipoDato').prop('disabled', true);
                $("#btnAgregar").button("option", "disabled", true);
                $("#btnQuitar").button("option", "disabled", true);
                $("#btnSubir").button("option", "disabled", true);
                $("#btnBajar").button("option", "disabled", true);
            }
        }
    }


    //------------------------------------------------------EDITAR TIPO DE SOLICITUD------------------------------------------------------->>
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    //------------------------------------EVENTOS GENERALES-----------------------------------//

    $('#chkMontoFijo').live("change", function () {
        if ($(this).is(":checked")) {
            $("#trMonto").show();
            $("#txtMonto").val("");
        } else {
            $("#trMonto").hide();
        }
    });

    //detalle de financiamiento
    $("#imgInfoFinanciamiento").live("click", function () {
        if ($("#ddlFinanciamiento").val() == "-2" || $("#ddlFinanciamiento").val() == "-1" || $("#ddlFinanciamiento").val() == "0") {
            alertaExterna("No ha seleccionado un financiamiento.");
            return;
        }

        var wAncho = $(window).width();
        var wAlto = $(window).height();
        $("#ifInfoFinanciamiento").attr("width", 550);
        $("#ifInfoFinanciamiento").attr("height", wAlto - 100);
        $("#ifInfoFinanciamiento").attr("src", "../Mantenimiento/Cam_Mnt_Financiamiento.aspx?Cod=" + $("#ddlFinanciamiento").val() + "&FinancSit=0");

        $('#divInfoFinanciamiento').dialog({
            title: "Detalle de Financiamiento",
            width: 575, //  690,
            height: wAlto - 50, //430,
            modal: true,
            resizable: false,
            buttons: {
                "Cerrar": function () {
                    $(this).dialog("close");
                }
            }
        });
    });

    //    $("#imgInfoFinanciamiento").live("click", function () {

    //        if ($("#ddlFinanciamiento").val() == "-2" || $("#ddlFinanciamiento").val() == "-1" || $("#ddlFinanciamiento").val() == "0") {
    //            alertaExterna("No ha seleccionado un financiamiento.");
    //            return;
    //        }

    //        oFinanciamientoTipo.Inicio($("#ddlFinanciamiento").val());
    //        fnOcultarControlesFinanciamiento();

    //        $('#divInfoFinanciamiento').dialog({
    //            title: "Detalle de Financiamiento",
    //            width: 590,
    //            height: 430,
    //            modal: true,
    //            resizable: false,
    //            buttons: {
    //                "Cerrar": function () {
    //                    $(this).dialog("close");
    //                }
    //            }
    //        });
    //    });

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

    $(window).resize(function () {
        DimPosElementos();
    });

    inicioPagina();
    function inicioPagina() {
        DimPosElementos();
    }

    function DimPosElementos() {
        var Ancho = $(window).width();
        var Alto = $(window).height();
        var AnchoLateral = $(".LateralSplitter");

        $("#tbCampos").setGridWidth($(window).width() - 145); //115
        $("#tbDetalleContenido").setGridWidth($(window).width() - 93);

        $("#tbParametros").setGridWidth($(window).width() - 96);

        $("#dvCapturaDatosConfiguracion").css("width", Ancho - 114);
        $('#dvResponsableAprobacion').css("width", Ancho - 129);
        $('#dvUmbralAprobacion').css("width", Ancho - 129);
        $('#dvReglaAprobacion').css("width", Ancho - 129);
        $('#dvMensajeAprobacion').css("width", Ancho - 129);
        $("#txtMensajeApr").css("width", Ancho - 250);

        $("#tbCamposEstadoProceso").setGridWidth(Ancho - 137);
        $('#dvCamposProceso').css("width", Ancho - 129);
        $('#dvUmbralProceso').css("width", Ancho - 129);
        $('#dvReglaProceso').css("width", Ancho - 129);
        $('#dvMensajeProceso').css("width", Ancho - 129);
        $("#txtMensajePro").css("width", Ancho - 196);
        $("#txtMensajeUmbApr").css("width", Ancho - 205);
        $("#txtMensajeUmbPro").css("width", Ancho - 205);

        var AltoIframe = $("#ifCondiciones").height();
        if (AltoIframe > 0 && !$("#btnAmpliar").is(':visible') && $("#btnReducir").is(':visible')) {
            $("#ifCondiciones").css("height", Alto - 90);
        }
    }

    $('#txtAsuntoPro').live("keypress", function (e) {
        if (e.keyCode == 39)
            return false;
        else
            return true;
    });

    //    $('#txtMensajePro').live("keypress", function (e) {
    //        if (e.keyCode == 13)
    //            return false;
    //        else
    //            return true;
    //    });
    //
    //    $("#ddlRoles").live('keypress', function (e) {
    //        if (e.which == '13') {
    //            fnAgregarRol();
    //        }
    //    });
    //
    //    $("#imgAgregarRol").live("click", function () {
    //        fnAgregarRol();
    //    });
    //
    //    function fnAgregarRol() {
    //        var biExiste = 0;
    //        var vcIdRol = $("#ddlRoles").val();
    //
    //        if (vcIdRol == "-1") {
    //            alertaExterna("Seleccione un rol válido.");
    //            return;
    //        }
    //
    //var ids = tbRoles.getDataIDs();
    //        for (i = 0; i < ids.length; i++) {
    //            if ((tbRoles.getRowData(ids[i]))["IdRol"] == vcIdRol) {
    //                biExiste = 1;
    //            }
    //        }
    //
    //        if (biExiste == 1) {
    //            alertaExterna("El rol seleccionado ya ha sido agregado.");
    //            return;
    //        }
    //
    //        var datos = { IdRol: vcIdRol, NomRol: $("#ddlRoles option:selected").html(), chkLeer: "", chkCrear: "", chkEditar: "", chkEliminar: "" };
    //
    //        tbRoles.jqGrid('addRowData', $("#ddlRoles").val(), datos);
    //    }
    //
    //    $("#imgQuitarRol").live("click", function () {
    //        if (tbRoles.getGridParam('selrow')) {
    //            tbRoles.delRowData(tbRoles.getGridParam('selrow'));
    //        }
    //        else {
    //            alertaExterna("Seleccione un ítem a quitar");
    //        }
    //    });


    $("#btnGuardar").live("click", function () {
        var vcTabla = $.trim($("#txtTabla").val());
        var vcDescripcionTipo = $.trim($("#txtDescripcionTipo").val());
        //var biReqPerRol = "0";
        var inLinTip = $("#ddlLineaTipo").val();
        var vcPrefijo = $.trim($("#txtPrefijo").val());
        //var vcTipApr = $("#ddlTipoAprobacion").val();
        var vcResApr = "";
        var biMonFij = "0";
        var dcMonto = 0.0;
        var biUsaDri = "0";
        var biNecesitaInfoMensaje = "0";
        var biActivo = "0";

        var biPropie = $("#chkRespPropietario").is(":checked") ? "1" : "0";
        var biUsuEsp = $("#chkRespUsuario").is(":checked") ? "1" : "0";
        var biResAre = $("#chkRespArea").is(":checked") ? "1" : "0";
        var biOperador = $("#chkOperadorApr").is(":checked") ? "1" : "0";
        //var biUsaPlantilla = $("#chkRespArea").is(":checked") ? "1" : "0";

        //esDevolucion //14-03-2014 wapumayta
        var esDevolucion = $("#chkEsDevolucion").is(":checked") ? "1" : "0";

        if (vcTabla == "") {
            alertaExterna("El nombre del tipo de solicitud es requerido.");
            FocusAlert(0, "", "#txtTabla");
            return;
        };

        if (vcDescripcionTipo == "") {
            alertaExterna("La descripción del tipo de solicitud es requerida.");
            FocusAlert(0, "", "#txtDescripcionTipo");
            return;
        }

        if (vcPrefijo == "") {
            alertaExterna("El prefijo del código de solicitudes requerido.");
            FocusAlert(0, "", "#txtPrefijo");
            return;
        }

        if (inLinTip == "-1") {
            alertaExterna("El tipo de línea es requerido.");
            FocusAlert(0, "", "#ddlLineaTipo");
            return;
        }

        if ($('input[name=chkMontoFijo]').is(':checked')) {
            biMonFij = "1";

            if ($("#txtMonto").val() == "") {
                alertaExterna("Si ha elegido Monto fijo, entonces el monto es requerido");
                FocusAlert(0, "", "#txtMonto");
                return;
            } else {
                dcMonto = $("#txtMonto").val().replace(oCulturaLocal.vcSimSepMil, "")
                if (dcMonto > 9999) {
                    alertaExterna("La solicitud no puede contener un monto mayor a S/.9 999.");
                    FocusAlert(0, "", "#txtMonto");
                    return;
                }
            }
        }

        //técnico responsable 
        if ($("#hdfTecnicoResponsable").val() == '') {
            alertaExterna("Seleccione un técnico responsable, es un campo obligatorio");
            FocusAlert(0, "", "#bpTecnicoResponsable_txtValorBusqueda");
            //$("#bpTecnicoResponsable_txtValorBusqueda").focus();
            //bpTecnicoResponsable_imgBusqueda
            return;
        }

        if ($('input[name=chkUsarDriver]').is(':checked')) {
            biUsaDri = "1";
        }

        //        if ($("#lstFases")[0].options.length < 2) {
        //            alertaExterna("Debe haber mínimo dos Fases por solicitud");
        //            return;
        //        }

        if ($("#ddlFinanciamiento").val() == "-1" && $("#ddlFinanciamiento").val() == null && $("#ddlFinanciamiento").val() == "-2") {
            alertaExterna("El tipo de financiamiento es requerido");
            FocusAlert(0, "", "#ddlFinanciamiento");
            return;
        }

        if ($("#ddlFinanciamiento").val() == "0") {
            dcMonto = 0.0;
            biMonFij = "1";
        }

        if (tbCampos.getGridParam("reccount") <= inNumCamDef) {
            if (esPers == 'true') {
                alertaExterna("Debe ingresar por lo menos un campo para el formulario.");
                FocusAlert(1, "", "#txtCampo");
                return;
            }
        }

        //Resonsables
        //if (biPropie == "0" && biUsuEsp == "0" && biResAre == "0") {
        //    alertaExterna("Debe seleccionar por lo menos un responsable");
        //    FocusAlert(3, 0, "");
        //    return;
        //};
        //
        //if (biUsuEsp == "1" && $.trim($("#txtUsuarioEspecifico").val()) == "") {
        //    alertaExterna("El nombre de usuario específico es requerido.");
        //    FocusAlert(3, 0, "btnEmpleado");
        //    return;
        //}
        //
        //if (biUsuEsp == "1") { vcResApr = ($("#txtUsuarioEspecifico").val().split("="))[0].toString(); };

        //var vcEstadoAprobacion = Object.keys(arTipSol.EstadoAprobacion);
        //for (var m = 0; m < vcEstadoAprobacion.length; m++) {
        //    var ra = arTipSol.EstadoAprobacion[vcEstadoAprobacion[m]].ReglaAutomatica
        //    var ei = IdEstadoInicial = arTipSol.EstadoAprobacion[vcEstadoAprobacion[m]].Id;
        //    var ef = IdEstadoFinal = arTipSol.EstadoAprobacion[vcEstadoAprobacion[m]].IdEstadoFinal;
        //    if (ra == 1 && ef == "") {
        //        alertaExterna("Si a sel");
        //        FocusAlert(3, 2, "");
        //        return;
        //    }
        //}

        //Umbrales Aprobacion
        //var rptaUmbral = ValidarIngresoUmbrales("chkUmbralAprobacion", "#txtValorObjetivoApr", "#txtValorMaximoApr", "chkEnviarCorreoUmbApr", "#txtCorreoUmbApr", "#txtAsuntoUmbApr", "#txtMensajeUmbApr");
        //if (rptaUmbral != '') {
        //    FocusAlert(3, 1, rptaUmbral);
        //    return;
        //};
        //
        ////Reglas Aprobacion
        //if (!ValidarIngresoReglas("chkEstadoAutomaticoApr", "#ddlEstadoIniReglaApr", "#ddlEstadoFinReglaApr")) {
        //    FocusAlert(3, 2, "#ddlEstadoFinReglaApr");
        //    return;
        //};

        //Mensajes Aprobacion
        var rptaMensaje = ValidarIngresoMensajes("#chkEnviarCorreoApr", "#txtCorreoApr", "chkTecnicoCorApr", "chkOperadorApr", "#txtAsuntoApr", "#txtMensajeApr");
        if (rptaMensaje != '') {
            FocusAlert(3, 3, rptaMensaje);
            return;
        };

        //Umbrales Proceso
        //var rptaUmbralPro = ValidarIngresoUmbrales("chkUmbralProceso", "#txtValorObjetivoPro", "#txtValorMaximoPro", "chkEnviarCorreoUmbPro", "#txtCorreoUmbPro", "#txtAsuntoUmbPro", "#txtMensajeUmbPro");
        //if (rptaUmbralPro != '') {
        //    if ($("#hdfPersonalizada").val() == "true") {//agregado 13-01-2015
        //        FocusAlert(4, 1, rptaUmbralPro);
        //    } else {
        //        FocusAlert(4, 0, rptaUmbralPro);
        //    }
        //    return;
        //};

        //Reglas Proceso
        //if (!ValidarIngresoReglas("chkEstadoAutomaticoPro", "#ddlEstadoProceso", "#ddlEstadoFinReglaPro")) {
        //    FocusAlert(4, 2, "#ddlEstadoFinReglaPro");
        //    return;
        //};

        //if (vcTipApr == "2" && $("#txtResponsable").val() == "") {
        //    alertaExterna("Para el tipo de aprobación 'Usuario Específico' es necesario elegir al empleado responsable.");
        //    return;
        //} else
        //    vcResApr = ($("#txtResponsable").val().split("="))[0].toString();

        //var vcCamposEstadoProcesos = tbCamposEstadoProceso.getDataIDs();
        var vcEstadoProcesos = Object.keys(arTipSol.EstadoProceso);
        var vcCamposEstadoProcesos = Object.keys(arTipSol.EstadoProceso[vcEstadoProcesos[0]].Campos)
        var biHayDatos = "1";

        ActualizaArrayPorEstadoProceso($("#ddlEstadoProceso option:selected").text()); //.replace(" ", "_")
        //ActualizaArrayPorEstadoAprobacion($("#ddlEstadoAprobacion option:selected").text()); // ENVIAR DOS IDS DE ESTADOS (MENSAJES Y REGLAS)
        ActualizaArrayPorEstadoAprobacion($("#ddlEstadoIniReglaApr option:selected").text(), $("#ddlEstadoAprobacion option:selected").text());

        for (i = 0; i < vcEstadoProcesos.length; i++) {
            for (j = 0; j < vcCamposEstadoProcesos.length; j++) {
                if (arTipSol.EstadoProceso[vcEstadoProcesos[i]].Campos[vcCamposEstadoProcesos[j]].Visible == '-1')
                    biHayDatos = '0';
                if (arTipSol.EstadoProceso[vcEstadoProcesos[i]].Campos[vcCamposEstadoProcesos[j]].Editable == '-1')
                    biHayDatos = '0';
                if (arTipSol.EstadoProceso[vcEstadoProcesos[i]].Campos[vcCamposEstadoProcesos[j]].Obligatorio == '-1')
                    biHayDatos = '0';
            }

            if (arTipSol.EstadoProceso[vcEstadoProcesos[i]].EnviarCorreo == '1' && (arTipSol.EstadoProceso[vcEstadoProcesos[i]].Asunto == '' || arTipSol.EstadoProceso[vcEstadoProcesos[i]].Mensaje == ''))
                biNecesitaInfoMensaje = '1';
        }

        if (biHayDatos == "0") {
            alertaExterna("Las acciones 'Visible', 'Editable' y 'Obligatorio' deben tener valores válidos para todos los campos de cada Estado Proceso.");
            FocusAlert(4, 0, "");
            return;
        }

        if (biNecesitaInfoMensaje == "1") {
            alertaExterna("Si la opción 'Enviar Correo' de cualquier Estado Proceso está habilitada, entonces los campos 'Asunto' y 'Mensaje' son requeridos para dicho Estado Proceso.");
            FocusAlert(4, 3, "");
            return;
        }

        //        var XMLEstadoProcesos = "<?xml version=\"1.0\" encoding=\"ISO-8859-1\"?><ROOT>";
        XMLCampos = "<?xml version=\"1.0\" encoding=\"ISO-8859-1\"?><ROOT>";
        XMLCamposPorEstadoProceso = "<?xml version=\"1.0\" encoding=\"ISO-8859-1\"?><ROOT>";
        var XMLMensajePorEstado = "<?xml version=\"1.0\" encoding=\"ISO-8859-1\"?><ROOT>"; //XMLMensajePorEstado
        var XMLParametros = "<?xml version=\"1.0\" encoding=\"ISO-8859-1\"?><ROOT>";

        var XMLUmbralEstado = "<?xml version=\"1.0\" encoding=\"ISO-8859-1\"?><ROOT>";
        var XMLReglaEstado = "<?xml version=\"1.0\" encoding=\"ISO-8859-1\"?><ROOT>";
        var XMLCamposReferenciaCondicion = "<?xml version=\"1.0\" encoding=\"ISO-8859-1\"?><ROOT>";

        //Campos Referencia Condicion
        //if ($(lstCondiciones).length > 0) {
        //    $.each(lstCondiciones, function () {
        //        IdCondicion = this.IdCondicion.toString();
        //        IdCampo = this.IdCampo.toString();
        //        IdCamEnt = this.IdCamEnt.toString();
        //        IdSimboloCondicion = this.IdSimboloCondicion.toString();
        //        IdCampoTipSol = this.IdCampoTipSol.toString();
        //        TextoCondicion = this.TextoCondicion.toString();
        //        IdCampoRelacion = this.IdCampoRelacion.toString();
        //        ValorCampoRelacion = this.ValorCampoRelacion.toString();
        //        NombreCampoRelacion = this.NombreCampoRelacion.toString();
        //        XMLCamposReferenciaCondicion += '<DATA IdCondicion=\"' + IdCondicion + '\" IdCampo=\"' + IdCampo + '\" IdCamEnt=\"' + IdCamEnt
        //        XMLCamposReferenciaCondicion += '\" IdSimboloCondicion=\"' + IdSimboloCondicion + '\" IdCampoTipSol=\"' + IdCampoTipSol
        //        XMLCamposReferenciaCondicion += '\" TextoCondicion=\"' + TextoCondicion + '\" IdCampoRelacion=\"' + IdCampoRelacion
        //        XMLCamposReferenciaCondicion += '\" ValorCampoRelacion=\"' + ValorCampoRelacion + '\" NombreCampoRelacion=\"' + NombreCampoRelacion + '\" />'
        //    });
        //}
        XMLCamposReferenciaCondicion += "</ROOT>";

        //Umbrales Estados Aprobacion
        // if ($("#chkUmbralAprobacion").is(":checked")) {
        //     var vcEstApr = Object.keys(arTipSol.Umbrales.Aprobacion);
        //     for (var h = 0; h < vcEstApr.length; h++) {
        //         var IdSolicitudTipo = "-1";
        //         var EstadoInicial = arTipSol.Umbrales.Aprobacion[vcEstApr[h]].EstadoInicial;
        //         var EstadoFinal = arTipSol.Umbrales.Aprobacion[vcEstApr[h]].EstadoFinal;
        //         var ValorObjetivoDias = arTipSol.Umbrales.Aprobacion[vcEstApr[h]].ValorObjetivo;
        //         var ValorMaximoDias = arTipSol.Umbrales.Aprobacion[vcEstApr[h]].ValorMaximo;
        //         var Destinatarios = '', Asunto = '', MensajeUmbral = '';
        //         if (arTipSol.Umbrales.Aprobacion[vcEstApr[h]].EnviarCorreo == "1") {
        //             Destinatarios = arTipSol.Umbrales.Aprobacion[vcEstApr[h]].Destinatarios;
        //             Asunto = arTipSol.Umbrales.Aprobacion[vcEstApr[h]].Asunto;
        //             MensajeUmbral = arTipSol.Umbrales.Aprobacion[vcEstApr[h]].Mensaje;
        //         };
        //         var IdUmbral = arTipSol.Umbrales.Aprobacion[vcEstApr[h]].IdUmbral;
        //         XMLUmbralEstado += '<DATA IdSolicitudTipo=\"' + IdSolicitudTipo + '\" EstadoInicial=\"' + EstadoInicial + '\" EstadoFinal=\"' + EstadoFinal + '\" ValorObjetivoDias=\"' + ValorObjetivoDias;
        //         XMLUmbralEstado += '\" ValorMaximoDias=\"' + ValorMaximoDias + '\" Destinatarios=\"' + Destinatarios + '\" Asunto=\"' + Asunto + '\" Mensaje=\"' + MensajeUmbral + '\" IdUmbral=\"' + IdUmbral + '\" />';
        //     };
        // };
        //XMLUmbralEstado += "</ROOT>";

        //Reglas y Mensajes Estados Aprobacion
        var vcEstadoAprobacion = Object.keys(arTipSol.EstadoAprobacion);
        for (var m = 0; m < vcEstadoAprobacion.length; m++) {
            if (arTipSol.EstadoAprobacion[vcEstadoAprobacion[m]].ReglaAutomatica == "1") {
                var IdSolicitudTipo = "-1";
                var IdEstadoInicial = arTipSol.EstadoAprobacion[vcEstadoAprobacion[m]].Id;
                var IdEstadoFinal = arTipSol.EstadoAprobacion[vcEstadoAprobacion[m]].IdEstadoFinal;
                var IdRegla = arTipSol.EstadoAprobacion[vcEstadoAprobacion[m]].IdRegla;
                XMLReglaEstado += '<DATA IdSolicitudTipo=\"' + IdSolicitudTipo + '\" IdEstadoInicial=\"' + IdEstadoInicial + '\" IdEstadoFinal=\"' + IdEstadoFinal + '\" IdRegla=\"' + IdRegla + '\" />';
            };

            if (arTipSol.EstadoAprobacion[vcEstadoAprobacion[m]].EnviarCorreo == "1") {
                //var IdSolicitudTipo = "-1";
                var IdSolicitudTipo = $("#hdfCodTipSol").val();
                var IdEstado = arTipSol.EstadoAprobacion[vcEstadoAprobacion[m]].Id;
                var Destinatarios = arTipSol.EstadoAprobacion[vcEstadoAprobacion[m]].Destinatarios;
                var Asunto = arTipSol.EstadoAprobacion[vcEstadoAprobacion[m]].Asunto;
                var MensajeEstadoAprobacion = arTipSol.EstadoAprobacion[vcEstadoAprobacion[m]].Mensaje;
                var Propietario = arTipSol.EstadoAprobacion[vcEstadoAprobacion[m]].Propietario;
                var UsuarioEspecifico = arTipSol.EstadoAprobacion[vcEstadoAprobacion[m]].UsuarioEspecifico;
                var Responsable = arTipSol.EstadoAprobacion[vcEstadoAprobacion[m]].Responsable;
                var Tecnico = arTipSol.EstadoAprobacion[vcEstadoAprobacion[m]].Tecnico;
                var Operador = arTipSol.EstadoAprobacion[vcEstadoAprobacion[m]].Operador;
                var UsaPlantilla = arTipSol.EstadoAprobacion[vcEstadoAprobacion[m]].UsaPlantilla;
                var IdMensaje = arTipSol.EstadoAprobacion[vcEstadoAprobacion[m]].IdMensaje;
                XMLMensajePorEstado += '<DATA IdTipoSolicitud=\"' + IdSolicitudTipo + '\" IdTipoMensajeEstado=\"' + IdEstado + '\" Destinatarios=\"' + Destinatarios;
                XMLMensajePorEstado += '\" Asunto=\"' + Asunto.replace(/\"/g, '&quot;') + '\" Mensaje=\"' + MensajeEstadoAprobacion.replace(/\"/g, '&quot;');
                //XMLMensajePorEstado += '\" Asunto=\"' + Asunto.replace(/\"/g, '&quot;') + '\" Mensaje=\"' + MensajeEstadoAprobacion.replace(/\"/g, '&quot;') + '\" Propietario=\"' + Propietario;
                //XMLMensajePorEstado += '\" UsuarioEspecifico=\"' + UsuarioEspecifico + '\" Responsable=\"' + Responsable + '\" Tecnico=\"' + Tecnico + '\" IdMensaje=\"' + IdMensaje + '\" />';
                XMLMensajePorEstado += '\" Operador=\"' + Operador + '\" Tecnico=\"' + Tecnico + '\" UsaPlantilla=\"' + UsaPlantilla + '\" IdTipoSolicitudMensaje=\"' + IdMensaje + '\" />';
            };
        };

        //Mensaje Servicio
        XMLMensajePorEstado += '<DATA IdTipoSolicitud=\"' + $("#hdfCodTipSol").val() +'\" IdTipoMensajeEstado=\"0\" Destinatarios=\"' + $("#txtCorreosSrv").val();
        XMLMensajePorEstado += '\" Asunto=\"' + $("#txtAsuntoSrv").val().replace(/\"/g, '&quot;') + '\" Mensaje=\"' + $("#txtMensajeSrv").val().replace(/\"/g, '&quot;');
        XMLMensajePorEstado += '\" Operador=\"0\" Tecnico=\"0\" UsaPlantilla=\"0\" IdTipoSolicitudMensaje=\"0\" />';

        //XMLReglaEstado += "</ROOT>";
        //XMLMensajePorEstado += "</ROOT>";

        for (var i = 0; i < vcEstadoProcesos.length; i++) {

            var biEnviaCorreo = "0"; // var biIni = "0"; var biFin = "0"; var inOrdEst;
            biEnviaCorreo = arTipSol.EstadoProceso[vcEstadoProcesos[i]].EnviarCorreo;

            var inIdEst = arTipSol.EstadoProceso[vcEstadoProcesos[i]].Id;

            //Campos por EstadoProceso
            for (j = 0; j < vcCamposEstadoProcesos.length; j++) {
                if (vcCamposEstadoProcesos[j].substring(0, 7) != "AdjNom_") {
                    var biVisible = "0", biEditable = "0", biObligatorio = "0"; IdCampo2 = ''

                    biVisible = arTipSol.EstadoProceso[vcEstadoProcesos[i]].Campos[vcCamposEstadoProcesos[j]].Visible;
                    biEditable = arTipSol.EstadoProceso[vcEstadoProcesos[i]].Campos[vcCamposEstadoProcesos[j]].Editable;
                    biObligatorio = arTipSol.EstadoProceso[vcEstadoProcesos[i]].Campos[vcCamposEstadoProcesos[j]].Obligatorio;
                    IdCampo2 = arTipSol.EstadoProceso[vcEstadoProcesos[i]].Campos[vcCamposEstadoProcesos[j]].IdCampo;

                    XMLCamposPorEstadoProceso += "<DATA IdEstado=\"" + inIdEst + "\" IdCampo=\"" + vcCamposEstadoProcesos[j] + "\" Visible=\"" + biVisible;
                    XMLCamposPorEstadoProceso += "\" Editable=\"" + biEditable + "\" Obligatorio=\"" + biObligatorio + "\" IdCampo2=\"" + IdCampo2 + "\" />";

                    var vcCam = tbCampos.getDataIDs();
                    for (k = 0; k < vcCam.length; k++) {
                        var rowCam = tbCampos.getRowData(vcCam[k]);
                        //Añadiendo Nombre de Adjunto
                        if (rowCam.Campo == vcCamposEstadoProcesos[j] && rowCam.IdTipoDato == 9) {
                            IdCampo2 = arTipSol.EstadoProceso[vcEstadoProcesos[i]].Campos[rowCam.Campo].IdCampo;
                            XMLCamposPorEstadoProceso += "<DATA IdEstado=\"" + inIdEst + "\" IdCampo=\"AdjNom_" + vcCamposEstadoProcesos[j] + "\" Visible=\"0\" Editable=\"0\" Obligatorio=\"0\" IdCampo2=\"" + IdCampo2 + "\" />"
                        }
                    }
                } else {
                    IdCampo2 = arTipSol.EstadoProceso[vcEstadoProcesos[i]].Campos[vcCamposEstadoProcesos[j]].IdCampo;
                    XMLCamposPorEstadoProceso += "<DATA IdEstado=\"" + inIdEst + "\" IdCampo=\"" + vcCamposEstadoProcesos[j] + "\" Visible=\"0\" Editable=\"0\" Obligatorio=\"0\" IdCampo2=\"" + IdCampo2 + "\" />";
                }
            }


            //Mensaje
            var inNumMen = 0;
            if (biEnviaCorreo == "1") {
                inNumMen = inNumMen + 1;
                var vcDestinatarios = ""; var vcAsunto = ""; var vcMensaje = "";
                vcDestinatarios = arTipSol.EstadoProceso[vcEstadoProcesos[i]].Destinatarios;
                vcAsunto = arTipSol.EstadoProceso[vcEstadoProcesos[i]].Asunto;
                vcMensaje = arTipSol.EstadoProceso[vcEstadoProcesos[i]].Mensaje;
                var Propietario = arTipSol.EstadoProceso[vcEstadoProcesos[i]].Propietario;
                var UsuarioEspecifico = arTipSol.EstadoProceso[vcEstadoProcesos[i]].UsuarioEspecifico;
                var Responsable = arTipSol.EstadoProceso[vcEstadoProcesos[i]].Responsable;
                var Tecnico = arTipSol.EstadoProceso[vcEstadoProcesos[i]].Tecnico;
                var IdMensaje = arTipSol.EstadoProceso[vcEstadoProcesos[i]].IdMensaje;
                XMLMensajePorEstado += "<DATA IdSolicitudTipo=\"-1\" IdEstado=\"" + inIdEst + "\" Destinatarios=\"" + vcDestinatarios + "\" Asunto=\"" + vcAsunto.replace(/\"/g, '&quot;');
                XMLMensajePorEstado += "\" Mensaje=\"" + vcMensaje.replace(/\"/g, '&quot;') + "\" Propietario=\"" + Propietario;
                XMLMensajePorEstado += '\" UsuarioEspecifico=\"' + UsuarioEspecifico + '\" Responsable=\"' + Responsable + '\" Tecnico=\"' + Tecnico + '\" IdMensaje=\"' + IdMensaje + '\" />';
            }

            //Umbrales
            //if (arTipSol.EstadoProceso[vcEstadoProcesos[i]].Id != 6) {
            //    if (arTipSol.Umbrales.Proceso[vcEstadoProcesos[i]].Umbral == "1") {
            //        var IdSolicitudTipo = "-1";
            //        var EstadoInicial = arTipSol.Umbrales.Proceso[vcEstadoProcesos[i]].EstadoInicial;
            //        var EstadoFinal = arTipSol.Umbrales.Proceso[vcEstadoProcesos[i]].EstadoFinal;
            //        var ValorObjetivoDias = arTipSol.Umbrales.Proceso[vcEstadoProcesos[i]].ValorObjetivo;
            //        var ValorMaximoDias = arTipSol.Umbrales.Proceso[vcEstadoProcesos[i]].ValorMaximo;
            //        var Destinatarios = '', Asunto = '', MensajeEstadoProceso = '';
            //        var IdUmbral = arTipSol.Umbrales.Proceso[vcEstadoProcesos[i]].IdUmbral;
            //        if (arTipSol.Umbrales.Proceso[vcEstadoProcesos[i]].EnviarCorreo == "1") {
            //            Destinatarios = arTipSol.Umbrales.Proceso[vcEstadoProcesos[i]].Destinatarios;
            //            Asunto = arTipSol.Umbrales.Proceso[vcEstadoProcesos[i]].Asunto;
            //            MensajeEstadoProceso = arTipSol.Umbrales.Proceso[vcEstadoProcesos[i]].Mensaje;
            //        };
            //        XMLUmbralEstado += '<DATA IdSolicitudTipo=\"' + IdSolicitudTipo + '\" EstadoInicial=\"' + EstadoInicial + '\" EstadoFinal=\"' + EstadoFinal + '\" ValorObjetivoDias=\"' + ValorObjetivoDias;
            //        XMLUmbralEstado += '\" ValorMaximoDias=\"' + ValorMaximoDias + '\" Destinatarios=\"' + Destinatarios + '\" Asunto=\"' + Asunto + '\" Mensaje=\"' + MensajeEstadoProceso + '\" IdUmbral=\"' + IdUmbral + '\" />';
            //    };
            //};

            //Reglas
            //if (arTipSol.EstadoProceso[vcEstadoProcesos[i]].ReglaAutomatica == "1") {
            //    var IdSolicitudTipo = "-1";
            //    var IdEstadoInicial = arTipSol.EstadoProceso[vcEstadoProcesos[i]].Id;
            //    var IdEstadoFinal = arTipSol.EstadoProceso[vcEstadoProcesos[i]].IdEstadoFinal;
            //    var IdRegla = arTipSol.EstadoProceso[vcEstadoProcesos[i]].IdRegla;
            //    XMLReglaEstado += '<DATA IdSolicitudTipo=\"' + IdSolicitudTipo + '\" IdEstadoInicial=\"' + IdEstadoInicial + '\" IdEstadoFinal=\"' + IdEstadoFinal + '\" IdRegla=\"' + IdRegla + '\" />';
            //};
        }

        //Parámetros
        var vcParametros = Object.keys(arTipSol.Parametros);
        for (j = 0; j < vcParametros.length; j++) {
            var vcClave = arTipSol.Parametros[vcParametros[j]].Clave;
            var vcIdCampo = arTipSol.Parametros[vcParametros[j]].IdCampo;
            var vcIdParametro = arTipSol.Parametros[vcParametros[j]].IdParametro;
            var vcElegido = arTipSol.Parametros[vcParametros[j]].Elegido;

            XMLParametros += "<DATA IdSolicitudTipo=\"-1\" Clave=\"" + vcClave + "\" Valor=\"" + vcIdCampo + "\" IdParametro=\"" + vcIdParametro + "\" Elegido=\"" + vcElegido + "\" />";
        }

        XMLParametros += "</ROOT>";
        XMLMensajePorEstado += "</ROOT>";
        XMLCamposPorEstadoProceso += "</ROOT>";
        XMLUmbralEstado += "</ROOT>";
        XMLReglaEstado += "</ROOT>";

        var XMLDetalleCaptura = "<?xml version=\"1.0\" encoding=\"ISO-8859-1\"?><ROOT>";

        //if ($("#hdfPersonalizada").val() == 'true') {
        if ($("#hdfPersonalizada").val() == 'true') {
            var vcCampos = tbCampos.getDataIDs();
            var inNumCam = 0;
            for (j = 0; j < vcCampos.length; j++) {
                var rowCampos = tbCampos.getRowData(vcCampos[j]);

                inNumCam = inNumCam + 1;
                XMLCampos += "<DATA IdSolicitudTipo=\"-1\" Nombre=\"" + rowCampos.Campo + "\" Descripcion=\"" + rowCampos.Descripcion + "\" F_inCodTipDat=\"" + rowCampos.IdTipoDato;
                XMLCampos += "\" Longitud=\"" + rowCampos.Tamano + "\" Orden=\"" + inNumCam;
                XMLCampos += "\" IdCampo=\"" + rowCampos.IdCampo + "\"";

                XMLCampos += " Activo=\"" + (rowCampos.Activo == 'True' || rowCampos.Activo == 'Activo' ? "1" : "0") + "\""; //ACTIVAR Y DESACTIVAR CAMPOS //wapumayta
                XMLCampos += " ListaActivos=\"" + rowCampos.ListaActivos.replace(/2/g, '1') + "\""; //estados de los valores de una lista

                if (rowCampos.Idd.substring(0, 3) == "in0")
                    XMLCampos += " DeSistema = \"1\""; //XMLCampos += " DeSistema = \"1\" />";
                else
                    XMLCampos += " DeSistema = \"0\""; //XMLCampos += " DeSistema = \"0\" />";

                //Nuevos campos para referencia
                XMLCampos += " IdEntidad=\"" + rowCampos.IdEntidad + "\" IdCamPK=\"" + rowCampos.IdCamPK + "\" IdCamDes=\"" + rowCampos.IdCamDes + "\" />";

                //Añadiendo Nombre de Adjunto
                if (rowCampos.IdTipoDato == 9) {
                    XMLCampos += "<DATA IdSolicitudTipo=\"-1\" Nombre=\"AdjNom_" + rowCampos.Campo + "\" Descripcion=\"AdjNom_" + rowCampos.Campo + "\" F_inCodTipDat=\"3\" Longitud=\"200\" Orden=\"0\" ";
                    XMLCampos += "IdCampo=\"" + rowCampos.IdCampo + "\" DeSistema = \"1\" ";

                    XMLCampos += " IdEntidad=\"" + rowCampos.IdEntidad + "\" IdCamPK=\"" + rowCampos.IdCamPK + "\" IdCamDes=\"" + rowCampos.IdCamDes + "\" />";
                }
            }

            var vcCodTipSol = "-1";
            if ($("#hdfCodTipSol").val() != "") { vcCodTipSol = $("#hdfCodTipSol").val() }

            XMLDetalleCaptura += "<DATA inCodTipSol=\"" + vcCodTipSol + "\" inCodConten=\"" + "9" + "\" btBotRef=\"" + $("#ddlMosBotRef").val();
            XMLDetalleCaptura += "\" />";

        } else {
            var inNumCam = 0;
            var vcNuevoNombre = "";

            if ($("#ddlCapVisible-4").val() == "1" && vcFileName == "") {
                alertaExterna("El archivo de condiciones es requerido.");
                $(".trAdjuntos").hide();
                $(".trMensaje").hide();
                $(".trCondiciones").show();
                tabContenidoConfig = "Condiciones";
                $("#dvCapturaDatosConfiguracion").show();
                FocusAlert(1, "", "#btnGuardarConfigConten");
                return;
            }

            if (!vcFileName.indexOf(vcPrefijo + "_COND_") == 0 && vcFileName != "") {
                vcNuevoNombre = vcPrefijo + "_COND_" + vcFileName;
            } else {
                vcNuevoNombre = vcFileName;
            }

            var CapturaDatos = tbDetalleContenido.getDataIDs();
            for (var i = 0; i < CapturaDatos.length; i++) {
                var rowCapturaDatos = tbDetalleContenido.getRowData(CapturaDatos[i]);
                var btProObl, btAct, btCapObl, btBotRef;
                var inCanTot_Adj, vcExtPer_Adj, vcTamTip_Adj, vcTamMed_Adj, dcTamaño_Adj, vcTamTip_Msj, inTamaño_Msj, vcNomArchivo_Dec, vcUbiArchivo_Dec;
                btProObl = rowCapturaDatos.btProObl;
                if (btProObl == 'True') {
                    btAct = 1;
                    btCapObl = 1;
                } else {
                    btAct = $("#ddlCapVisible-" + rowCapturaDatos.inCod).val();
                    btCapObl = $("#ddlCapObligatorio-" + rowCapturaDatos.inCod).val();
                }

                if (rowCapturaDatos.inCod == "5" || rowCapturaDatos.inCod == "6" || rowCapturaDatos.inCod == "10") {
                    btBotRef = 0;
                } else {
                    btBotRef = $("#ddlCapRefrescar-" + rowCapturaDatos.inCod).val();
                }

                inCanTot_Adj = rowCapturaDatos.inCanTot_Adj == 'undefined' || rowCapturaDatos.inCanTot_Adj == undefined || rowCapturaDatos.inCanTot_Adj == '' ? '0' : rowCapturaDatos.inCanTot_Adj;
                vcExtPer_Adj = rowCapturaDatos.vcExtPer_Adj == 'undefined' || rowCapturaDatos.vcExtPer_Adj == undefined || rowCapturaDatos.vcExtPer_Adj == '' ? '' : rowCapturaDatos.vcExtPer_Adj;
                vcTamTip_Adj = rowCapturaDatos.vcTamTip_Adj == 'undefined' || rowCapturaDatos.vcTamTip_Adj == undefined || rowCapturaDatos.vcTamTip_Adj == '' ? '' : rowCapturaDatos.vcTamTip_Adj;
                vcTamMed_Adj = rowCapturaDatos.vcTamMed_Adj == 'undefined' || rowCapturaDatos.vcTamMed_Adj == undefined || rowCapturaDatos.vcTamMed_Adj == '' ? '' : rowCapturaDatos.vcTamMed_Adj;
                dcTamaño_Adj = rowCapturaDatos.dcTamaño_Adj == 'undefined' || rowCapturaDatos.dcTamaño_Adj == undefined || rowCapturaDatos.dcTamaño_Adj == '' ? '0' : rowCapturaDatos.dcTamaño_Adj;
                vcTamTip_Msj = rowCapturaDatos.vcTamTip_Msj == 'undefined' || rowCapturaDatos.vcTamTip_Msj == undefined || rowCapturaDatos.vcTamTip_Msj == '' ? '' : rowCapturaDatos.vcTamTip_Msj;
                inTamaño_Msj = rowCapturaDatos.inTamaño_Msj == 'undefined' || rowCapturaDatos.inTamaño_Msj == undefined || rowCapturaDatos.inTamaño_Msj == '' ? '0' : rowCapturaDatos.inTamaño_Msj;
                vcNomArchivo_Dec = rowCapturaDatos.vcNomArchivo_Dec;
                //validaciones antes de guardar el tipo
                if (rowCapturaDatos.inCod == 4 && btCapObl == 1) { //Condiciones
                    if (vcFileName == "") {
                        alertaExterna("El archivo de condiciones es requerido.");
                        FocusAlert(1, '', '');
                        $("#btnConfig-" + rowCapturaDatos.inCod).click();
                        return;
                    }
                } else if (rowCapturaDatos.inCod == 5 && btCapObl == 1) { //Mensajes
                    if (vcTamTip_Msj == '' || vcTamTip_Msj == '-1') {
                        alertaExterna("Defina el tipo de validación para el mensaje.");
                        FocusAlert(1, '', '');
                        $("#btnConfig-" + rowCapturaDatos.inCod).click();
                        return;
                    }
                    if (inTamaño_Msj == '' || inTamaño_Msj == '0') {
                        alertaExterna("Ingrese una cantidad para validar el ingreso del mensaje.");
                        FocusAlert(1, '', '');
                        $("#btnConfig-" + rowCapturaDatos.inCod).click();
                        return;
                    }
                }

                XMLDetalleCaptura += "<DATA inCodTipSol=\"" + $("#hdfCodTipSol").val() + "\" inCodConten=\"" + rowCapturaDatos.inCod + "\" btProObl=\"" + btProObl + "\" btAct=\"" + btAct + "\" btCapObl=\"" + btCapObl;
                XMLDetalleCaptura += "\" inCanTot_Adj=\"" + inCanTot_Adj;
                XMLDetalleCaptura += "\" vcExtPer_Adj=\"" + vcExtPer_Adj;
                XMLDetalleCaptura += "\" vcTamTip_Adj=\"" + vcTamTip_Adj;
                XMLDetalleCaptura += "\" vcTamMed_Adj=\"" + vcTamMed_Adj;
                XMLDetalleCaptura += "\" dcTamaño_Adj=\"" + dcTamaño_Adj;
                XMLDetalleCaptura += "\" vcTamTip_Msj=\"" + vcTamTip_Msj;
                XMLDetalleCaptura += "\" inTamaño_Msj=\"" + inTamaño_Msj;
                XMLDetalleCaptura += "\" vcNomArchivo_Dec=\"" + vcNuevoNombre;
                XMLDetalleCaptura += "\" btBotRef=\"" + btBotRef;
                //                XMLDetalleCaptura += "\" vcUbiArchivo_Dec=\"" + vcUbiArchivo_Dec;
                XMLDetalleCaptura += "\" />";
            }
        }
        XMLCampos = XMLCampos + "</ROOT>";
        XMLDetalleCaptura = XMLDetalleCaptura + "</ROOT>";

        if ($('input[name=chkActivo]').is(':checked'))
            biActivo = "1";

        //DEVOLUCION DE SOLICITUDES -- 13/10/2014 wapumayta
        //si es una edicion validar cambios es CamposEstados
        if ($("#hdfCodTipSol").val() != '' && $("#hdfPersonalizada").val() == 'true') {
            $.ajax({
                type: "POST",
                url: "Adm_SolicitudesConfiguracion.aspx/ListarSolicitudesEnConflicto_Datos",
                data: "{'inCodTipSol':'" + $("#hdfCodTipSol").val() + "'," +
                    "'XMLCamposPorEstadoProceso':'" + XMLCamposPorEstadoProceso + "', " +
                    "'XMLCampos':'" + XMLCampos + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {
                    var lstRes = result.d;
                    var inSolicitudesConflictivas = lstRes[0];
                    $("#lblSolicitudDevolucion").text(inSolicitudesConflictivas);
                    if (lstRes[1] != '') {
                        eval(lstRes[1]);
                        CargarDatosMensajeDev(1);
                    }
                    if (inSolicitudesConflictivas > 0) { //existen solicitudes que pueden entrar en conflicto con el cambio
                        $("#dvConfirmacionDevolucion").dialog({
                            title: "Confirmación de devolución",
                            modal: true,
                            resizable: false,
                            buttons: {
                                "Si": function () {
                                    $(this).dialog("close");
                                    //cargar datos en la grilla
                                    $("#tblSolicitudesAfectadas").trigger("reloadGrid");
                                    //mostrar dialog                                    
                                    $("#dvEnvioCorreoDevolucion").dialog({
                                        title: "Devolución de solicitud: Envio de correos",
                                        modal: true,
                                        resizable: false,
                                        width: 515,
                                        heigth: 410,
                                        buttons: {
                                            "Guardar": function () {
                                                //actualizar datos de mensaje seleccionado
                                                var TipoDest = $("#ddlTipoDestinatario").val();
                                                if (fnValidarDatosMensajesDevolucion(TipoDest) == '') {
                                                    GuardarDatosMensajeDev(TipoDest);
                                                } else {
                                                    alertaExterna(fnValidarDatosMensajesDevolucion(TipoDest));
                                                    return;
                                                }
                                                //alert(GenerarXMLDatosMensajeDev());
                                                $("#dvConfirmacionGuardarDevolucion").dialog({
                                                    title: "Confirmación Envio Correos Devolución",
                                                    modal: true,
                                                    resizable: false,
                                                    buttons: {
                                                        "Continuar": function () {
                                                            fnGuardarTipoSolicitud(vcTabla, vcDescripcionTipo, $("#ddlFinanciamiento").val(), biUsaDri, inLinTip, vcPrefijo, vcResApr, biPropie,
                                                            biUsuEsp, biResAre, XMLCampos, XMLCamposPorEstadoProceso, inNumCam, XMLMensajePorEstado, XMLParametros, XMLUmbralEstado,
                                                            XMLReglaEstado, XMLCamposReferenciaCondicion, XMLDetalleCaptura, $("#hdfCodTipSol").val(), biMonFij, $("#hdfTecnicoResponsable").val(), esDevolucion,
                                                            dcMonto, biActivo, vcFileName, lstRes[2], GenerarXMLDatosMensajeDev());
                                                        },
                                                        "Volver": function () {
                                                            $(this).dialog("close");
                                                        }
                                                    }
                                                });
                                            },
                                            "Cancelar": function () {
                                                $(this).dialog("close");
                                            }
                                        }
                                    });
                                },
                                "Cancelar": function () {
                                    $(this).dialog("close");
                                }
                            }
                        });
                    } else { //se procede con el cambio normal
                        fnGuardarTipoSolicitud(vcTabla, vcDescripcionTipo, $("#ddlFinanciamiento").val(), biUsaDri, inLinTip, vcPrefijo, vcResApr, biPropie,
                        biUsuEsp, biResAre, XMLCampos, XMLCamposPorEstadoProceso, inNumCam, XMLMensajePorEstado, XMLParametros, XMLUmbralEstado,
                        XMLReglaEstado, XMLCamposReferenciaCondicion, XMLDetalleCaptura, $("#hdfCodTipSol").val(), biMonFij, $("#hdfTecnicoResponsable").val(), esDevolucion,
                        dcMonto, biActivo, vcFileName, '', '');
                    }
                },
                error: function (xhr, err, thrErr) {
                    MostrarErrorAjax(xhr, err, thrErr);
                }
            });
        } else { //guardar normalmente si es una insersión
            fnGuardarTipoSolicitud(vcTabla, vcDescripcionTipo, $("#ddlFinanciamiento").val(), biUsaDri, inLinTip, vcPrefijo, vcResApr, biPropie,
            biUsuEsp, biResAre, XMLCampos, XMLCamposPorEstadoProceso, inNumCam, XMLMensajePorEstado, XMLParametros, XMLUmbralEstado,
            XMLReglaEstado, XMLCamposReferenciaCondicion, XMLDetalleCaptura, $("#hdfCodTipSol").val(), biMonFij, $("#hdfTecnicoResponsable").val(), esDevolucion,
            dcMonto, biActivo, vcFileName, '', '');
        }
        //$.ajax({
        //    type: "POST",
        //    url: "Adm_SolicitudesConfiguracion.aspx/Guardar",
        //    data: "{'vcNomTip': '" + vcTabla + "'," +
        //                                  "'vcDesTip': '" + vcDescripcionTipo + "'," +
        //                                  "'inIdFinanciamiento': '" + $("#ddlFinanciamiento").val() + "'," +
        //    //"'biFraccionamiento': '" + $("#ddlFraccionamiento").val() + "'," +
        //                                  "'biUsaDri': '" + biUsaDri + "'," +
        //                                  "'inLinTip': '" + inLinTip + "'," +
        //                                  "'vcPrefijo': '" + vcPrefijo + "'," +
        //    //"'vcTipApr': '" + vcTipApr + "'," +
        //                                  "'vcResApr': '" + vcResApr + "'," +
        //                                  "'biPropie': '" + biPropie + "'," +
        //                                  "'biUsuEsp': '" + biUsuEsp + "'," +
        //                                  "'biResAre': '" + biResAre + "'," +
        //                                  "'XMLCampos': '" + XMLCampos + "'," +
        //                                  "'XMLCamposPorEstadoProceso': '" + XMLCamposPorEstadoProceso + "'," +
        //                                  "'inNumCam': '" + inNumCam + "'," +
        //                                  "'XMLMensajePorEstado': '" + XMLMensajePorEstado + "'," +
        //                                  "'XMLParametros': '" + XMLParametros + "'," +
        //                                  "'XMLUmbralEstado': '" + XMLUmbralEstado + "'," +
        //                                  "'XMLReglaEstado': '" + XMLReglaEstado + "'," +
        //                                  "'XMLCamposCondicion': '" + XMLCamposReferenciaCondicion + "'," +
        //                                  "'XMLDetalleCaptura': '" + XMLDetalleCaptura + "'," +
        //                                  "'vcCodTipsol': '" + $("#hdfCodTipSol").val() + "'," +
        //                                  "'biMonFij': '" + biMonFij + "'," +
        //                                  "'inTecnicoResponsable': '" + $("#hdfTecnicoResponsable").val() + "'," +
        //                                  "'esDevolucion': '" + esDevolucion + "'," +
        //                                  "'dcMonto': '" + dcMonto + "'," +
        //                                  "'biActivo': '" + biActivo + "'," +
        //                                  "'vcNomArcCon': '" + vcFileName + "'}",
        //    contentType: "application/json; charset=utf-8",
        //    dataType: "json",
        //    success: function (msg) {
        //        if (msg.d == "0") {
        //            alertaExterna("El nombre del tipo de solicitud ya existe.");
        //        } else if (msg.d == "-1") {
        //            alertaExterna("El prefijo de solicitud ya existe.");
        //        } else {
        //            window.parent.ActualizarGrilla();
        //            window.scrollTo(0, 0);
        //            Mensaje("<br/><h1>Tipo de Solicitud Guardado.<br/>Para aplicar los cambios, debe volver a iniciar sesión.</h1><br/>", document, CerroMensaje);
        //        }
        //    },
        //    error: function (xhr, err, thrErr) {
        //        MostrarErrorAjax(xhr, err, thrErr);
        //    }
        //});
    });


    //---------------------------------------------------------------------------------------->>

    function fnOcultarControlesFinanciamiento() {
        document.getElementById('trPagoContadoDefinicionRango').style.display = 'none';
        document.getElementById('trPagoContadoDefinicionPredefinido').style.display = 'none';
        document.getElementById('trPagoContadoDefinicionMeses1').style.display = 'none';
        //document.getElementById('trPagoContadoDefinicionMeses2').style.display = 'none';

        document.getElementById('trMaximoMesesPeriodoGracia').style.display = 'none';
        document.getElementById('trMesesPeriodoGracia').style.display = 'none';

        $("input[name='rblstTipoPeriodoGracia']:checked").attr("checked", false);
        $("input[name='rblstPagoContado']:checked").attr("checked", false);
        $("input[name='rblstTipoCuotaQuincena']:checked").attr("checked", false);

        $("#txtMes").val("");

        document.getElementById('trCuotaQuincenaDefinicion').style.display = 'none';
        document.getElementById('trPorcentajeMaximoCuotaPrimeraQuincena').style.display = 'none';
        document.getElementById('trPorcentajeCuotaPrimeraQuincena').style.display = 'none';
        document.getElementById('trPorcentajeMaximoCuotaPrimeraQuincena').style.display = 'none';
        document.getElementById('trPorcentajeCuotaPrimeraQuincena').style.display = 'none';
        //document.getElementById('trMesesCuotasDobles').style.display = 'none';
        document.getElementById('trMes').style.display = 'none';
        document.getElementById('trTipoInteres').style.display = 'none';
        document.getElementById('trTasaInteres').style.display = 'none';
        oFinanciamientoTipo.TipoInteres("");

        //nuevo
        //document.getElementById('trPagoContadoDefinicion').style.display = 'none';
        //document.getElementById('trPeriodoGraciaDefinicion').style.display = 'none';
        //document.getElementById('trCuotaQuincenaDefinicion').style.display = 'none';

    }

    //---CONDICIONES (ADJUNTO) DE SOLICITUDES DE SISTEMAS---//
    //new AjaxUpload('#UploadButton', {
    //    action: 'UploadHandler.ashx',
    //    onComplete: function (file, response) {
    //        //alert(response);
    //        $("<div class='imgBtn' style='margin-top:1px; height:21px;'><img src='../../../Common/Images/remove.png' onclick=\"DeleteFile('" + response + "')\"/>&nbsp;&nbsp;&nbsp;<span id='filesubido' style='text-decoration:underline;' nombre='" + response + "'>" + response + "</span></div>").appendTo('#UploadedFile');
    //        vcFileName = response;
    //        $("#UploadButton").hide();
    //
    //        var RutaCompleta = "P_Movil/Administrar/Temporal/Solicitudes/" + response;
    //        $("#ifCondiciones").css("height", 200);
    //        $("#ifCondiciones").attr("src", raiz(RutaCompleta));
    //        $("#btnAmpliar").show();
    //    },
    //    onSubmit: function (file, ext) {
    //        if (!(ext && /^(htm|html)$/i.test(ext))) {
    //            alertaExterna('Formato inválido');
    //            return false;
    //        }
    //    }
    //});

    $("#filesubido").live("click", function () {
        var archivo = $(this).attr("nombre");
        fnDescargarArchivo(archivo, 1, null);
    });

    //    function SaveToDisk(fileURL, fileName) {
    //        // for non-IE
    //        if (!window.ActiveXObject) {
    //            var save = document.createElement('a');
    //            save.href = raiz(fileURL);
    //            save.target = '_blank';
    //            save.download = fileName || fileURL;
    //            var evt = document.createEvent('MouseEvents');
    //            evt.initMouseEvent('click', true, true, window, 1, 0, 0, 0, 0,
    //            false, false, false, false, 0, null);
    //            save.dispatchEvent(evt);
    //            (window.URL || window.webkitURL).revokeObjectURL(save.href);
    //        }
    //
    //        // for IE
    //        else if (!!window.ActiveXObject && document.execCommand) {
    //            //alert(fileURL + "\n" + raiz(fileURL));
    //            var _window = window.open(raiz(fileURL), "_blank");
    //            _window.document.close();
    //            _window.document.execCommand('SaveAs', true, fileName || fileURL)
    //            _window.close();
    //        }
    //    }
    //    //---FIN CONDICIONES

    //---SOLICITUDES SISTEMAS----
    //alert($("#hdfPersonalizada").val());
    var esPers = $("#hdfPersonalizada").val();

    if (esPers == 'false') {
        ListarDetalleCaptura();
    };

    $("#btnGuardarSistema").click(function () {
        //alert(totalContenidos.join(","));
        actualizarCapturaDatos();
    });
    $("#btnCerrarSistema").click(function () {
        window.parent.tab.tabs("remove", window.parent.tab.tabs("option", "selected"));
    });
    //---FIN SOLICITUDES SISTEMAS

    //--------Ampliar - Reducir iframe de condiciones--------
    $("#btnAmpliar").click(function () {
        var Alto = $(window).height();
        $("#ifCondiciones").css("height", Alto - 90);
        //$("#dvContenido").scrollTop($("#dvContenido").scrollTop() + 100);

        $("#btnReducir").show();
        $("#btnAmpliar").hide();

        $('html,body').animate({ scrollTop: 370 }, 0);
    });

    $("#btnReducir").click(function () {
        $("#ifCondiciones").css("height", 200);
        $("#btnReducir").hide();
        $("#btnAmpliar").show();
    });
    //---

    //#region devolucion de solicitudes por cambios en estados //13-10-2014 - wapumayta
    //#region array DatosDevolucion
    arDatosDevolucion = [];
    //propietario
    arDatosDevolucion['1'] = [];
    arDatosDevolucion['1'].IdTipoSolicitud = 0;
    arDatosDevolucion['1'].TipoDestinatario = 1;
    arDatosDevolucion['1'].EnvioCorreo = 1;
    arDatosDevolucion['1'].Destinatarios = [{ Control: 'chkPropietario', Valor: 1}];
    arDatosDevolucion['1'].Asunto = "";
    arDatosDevolucion['1'].Mensaje = "";
    //responsable
    arDatosDevolucion['2'] = [];
    arDatosDevolucion['1'].IdTipoSolicitud = 0;
    arDatosDevolucion['1'].TipoDestinatario = 2;
    arDatosDevolucion['2'].EnvioCorreo = 1;
    arDatosDevolucion['2'].Destinatarios = [{ Control: 'chkRespAprobacion', Valor: 1}];
    arDatosDevolucion['2'].Asunto = "";
    arDatosDevolucion['2'].Mensaje = "";
    //tecnicos
    arDatosDevolucion['3'] = [];
    arDatosDevolucion['1'].IdTipoSolicitud = 0;
    arDatosDevolucion['1'].TipoDestinatario = 3;
    arDatosDevolucion['3'].EnvioCorreo = 1;
    arDatosDevolucion['3'].Destinatarios = [{ Control: 'chkTecAsignado', Valor: 1 },
                                            { Control: 'chkTecResponsable', Valor: 1 },
                                            { Control: 'chkAdministrador', Valor: 0}];
    arDatosDevolucion['3'].Asunto = "";
    arDatosDevolucion['3'].Mensaje = "";
    //#endregion

    //busqueda de solicitud
    $("#txtBusquedaSolDev").live("keypress", function (e) {
        if (e.keyCode == 13) {
            fnCargarSolicitudesEnConflictoPaginado();
        }
    });

    //cargar los datos del propietario
    ListarParametros('TipoDest_CorDev', 1);
    CargarDatosMensajeDev(1);

    $("#ddlTipoDestinatario").focus(function () {
        if (fnValidarDatosMensajesDevolucion($(this).val()) != '') {
            alertaExterna(fnValidarDatosMensajesDevolucion($(this).val()));
            return;
            //$(this).attr("size", 0);
        } else {
            GuardarDatosMensajeDev($(this).val());
        }
    }).change(function () {
        CargarDatosMensajeDev($(this).val());
    });

    function GuardarDatosMensajeDev(TipoDest) {
        //Check's Destinatarios
        for (var i = 0; i < arDatosDevolucion[TipoDest].Destinatarios.length; i++) {
            arDatosDevolucion[TipoDest].Destinatarios[i].Valor = $("#" + arDatosDevolucion[TipoDest].Destinatarios[i].Control).is(":checked") ? 1 : 0;
        }
        //Check Envio
        if ($("#chkEnvioCorDev").is(":checked")) {
            arDatosDevolucion[TipoDest].EnvioCorreo = 1;
        } else {
            arDatosDevolucion[TipoDest].EnvioCorreo = 0;
        }
        //Datos
        arDatosDevolucion[TipoDest].Asunto = $("#txtAsuntoCorDev").val();
        arDatosDevolucion[TipoDest].Mensaje = $("#txtMensajeCorDev").val(); //.replace(/\n/g, vcRegMsj);
    }
    function CargarDatosMensajeDev(TipoDest) {
        $("#lblchkPropietario").hide();
        $("#lblchkRespAprobacion").hide();
        $("#lblchkTecAsignado").hide();
        $("#lblchkTecResponsable").hide();
        $("#lblchkAdministrador").hide();
        if (TipoDest == 1) { //propietario
            $("#lblchkPropietario").show()
        } else if (TipoDest == 2) { //responsable
            $("#lblchkRespAprobacion").show();
        } else if (TipoDest == 3) { //tecnicos
            $("#lblchkTecAsignado").show();
            $("#lblchkTecResponsable").show();
            $("#lblchkAdministrador").show();
        }
        //Check's Destinatarios
        for (var i = 0; i < arDatosDevolucion[TipoDest].Destinatarios.length; i++) {
            $("#" + arDatosDevolucion[TipoDest].Destinatarios[i].Control).attr("checked", arDatosDevolucion[TipoDest].Destinatarios[i].Valor == 1 ? true : false);
        }
        //Check Envio
        if (arDatosDevolucion[TipoDest].EnvioCorreo == 1) {
            $("#chkEnvioCorDev").attr("checked", true);
            HabilitarMensajeDev(TipoDest)
        } else {
            $("#chkEnvioCorDev").attr("checked", false);
            DeshabilitarMensajeDev(TipoDest)
        }
        //Datos
        $("#txtAsuntoCorDev").val(arDatosDevolucion[TipoDest].Asunto);
        $("#txtMensajeCorDev").val(arDatosDevolucion[TipoDest].Mensaje.replace(new RegExp('<br/>', 'g'), '\n')); //.replace(regMsj, '\n'));
    }
    function GenerarXMLDatosMensajeDev() {
        var XMLMensajesDevolucion = "<?xml version=\"1.0\" encoding=\"ISO-8859-1\"?><ROOT>";
        var IdSolicitudTipo, TipoDestinatario, EnviarCorreo, Destinatarios, Asunto, Mensaje, Propietario, RespAprobacion, TecAsignado, TecResponsable, Administrador;
        for (var m = 1; m < 4; m++) {
            IdSolicitudTipo = arDatosDevolucion[m].IdTipoSolicitud;
            TipoDestinatario = arDatosDevolucion[m].TipoDestinatario;
            EnviarCorreo = arDatosDevolucion[m].EnvioCorreo
            Destinatarios = '';
            Asunto = arDatosDevolucion[m].Asunto;
            Mensaje = arDatosDevolucion[m].Mensaje.replace(new RegExp('\n', 'g'), '<br/>').replace(new RegExp('"', 'g'), "''");
            Propietario = 0, RespAprobacion = 0, TecAsignado = 0, TecResponsable = 0, Administrador = 0;
            for (var i = 0; i < arDatosDevolucion[m].Destinatarios.length; i++) {
                switch (arDatosDevolucion[m].Destinatarios[i].Control) {
                    case 'chkPropietario':
                        Propietario = arDatosDevolucion[m].Destinatarios[i].Valor;
                        break;
                    case 'chkRespAprobacion':
                        RespAprobacion = arDatosDevolucion[m].Destinatarios[i].Valor;
                        break;
                    case 'chkTecAsignado':
                        TecAsignado = arDatosDevolucion[m].Destinatarios[i].Valor;
                        break;
                    case 'chkTecResponsable':
                        TecResponsable = arDatosDevolucion[m].Destinatarios[i].Valor;
                        break;
                    case 'chkAdministrador':
                        Administrador = arDatosDevolucion[m].Destinatarios[i].Valor;
                        break;
                    default:
                }
            }
            XMLMensajesDevolucion += "<DATA IdSolicitudTipo=\"" + IdSolicitudTipo + "\" TipoDestinatario=\"" + TipoDestinatario + "\" EnviarCorreo=\"" + EnviarCorreo;
            XMLMensajesDevolucion += "\" Destinatarios=\"" + Destinatarios;
            XMLMensajesDevolucion += "\" Asunto=\"" + Asunto;
            XMLMensajesDevolucion += "\" Mensaje=\"" + Mensaje;
            XMLMensajesDevolucion += "\" Propietario=\"" + Propietario;
            XMLMensajesDevolucion += "\" RespAprobacion=\"" + RespAprobacion;
            XMLMensajesDevolucion += "\" TecAsignado=\"" + TecAsignado;
            XMLMensajesDevolucion += "\" TecResponsable=\"" + TecResponsable;
            XMLMensajesDevolucion += "\" Administrador=\"" + Administrador;
            XMLMensajesDevolucion += "\" />";
        }
        XMLMensajesDevolucion += "</ROOT>";
        return XMLMensajesDevolucion;
    }

    $("#chkEnvioCorDev").change(function () {
        var tipDes = $("#ddlTipoDestinatario").val();
        if ($(this).is(":checked")) {
            HabilitarMensajeDev(tipDes);
        } else {
            DeshabilitarMensajeDev(tipDes);
        }
    });

    function DeshabilitarMensajeDev(TipoDest) {
        $("#txtAsuntoCorDev").attr("disabled", true);
        $("#txtMensajeCorDev").attr("disabled", true);
        $("#lblAdvertenciaCorDev").show();
        if (TipoDest == 1) { //propietario
            $("#lblAdvertenciaCorDev").text("No se enviará ningún correo al Propietario.")
            $("#chkPropietario").attr("disabled", true);
        } else if (TipoDest == 2) { //responsable
            $("#lblAdvertenciaCorDev").text("No se enviará ningún correo al Responsable de Aprobación.")
            $("#chkRespAprobacion").attr("disabled", true);
        } else if (TipoDest == 3) {
            $("#lblAdvertenciaCorDev").text("No se enviará ningún correo a los Técnicos y/o Administrador.")
            $("#chkTecResponsable").attr("disabled", true);
            $("#chkTecAsignado").attr("disabled", true);
            $("#chkAdministrador").attr("disabled", true);
        }
    }
    function HabilitarMensajeDev(TipoDest) {
        $("#txtAsuntoCorDev").attr("disabled", false);
        $("#txtMensajeCorDev").attr("disabled", false);
        $("#lblAdvertenciaCorDev").hide();
        if (TipoDest == 1) { //propietario
            $("#chkPropietario").attr("disabled", false);
        } else if (TipoDest == 2) { //responsable
            $("#chkRespAprobacion").attr("disabled", false);
        } else if (TipoDest == 3) { //tecnicos
            $("#chkTecResponsable").attr("disabled", false);
            $("#chkTecAsignado").attr("disabled", false);
            $("#chkAdministrador").attr("disabled", false);
        }
    }

    tabCorreoDevolucion = $("#tabCorreoDevolucion").tabs({
        select: function (event, ui) {
            if (ui.panel.id == "tbMensajeCorDev") {
                CargarDatosMensajeDev($("#ddlTipoDestinatario").val());
            } else {
                var vcTextValid = fnValidarDatosMensajesDevolucion($("#ddlTipoDestinatario").val());
                if (vcTextValid == '') {
                    GuardarDatosMensajeDev($("#ddlTipoDestinatario").val());
                } else {
                    alertaExterna(vcTextValid);
                    return false;
                }
            }
        }
    });
    //#region parametros
    tblParametrosCorDev = $("#tblParametrosCorDev").jqGrid({
        sortable: false,
        datatype: "local",
        colModel: [{ name: 'Param', Campo: 'Param', label: 'Valor', hidden: false, width: 150 },
                        { name: 'Desc', index: 'Desc', label: 'Descripción', hidden: false, width: 298 },
                        { name: 'Tipo', index: 'Tipo', label: 'Tipo', hidden: true, width: 60 }
   	        ],
        loadtext: 'Cargando datos...',
        emptyrecords: 'No hay resultados',
        sortname: "Param",
        sortorder: "asc",
        height: 205,
        rownumbers: false,
        shrinkToFit: false,
        width: 475,
        caption: "Parametros usados en los correos de devolución",
        afterInsertRow: function (rowid, rowdata, rowelem) {
            var colModels = $("#tblParametrosCorDev").getGridParam("colModel");
            if (rowdata.Tipo == 'Destinatario') {
                for (var i in colModels) {
                    $("#tblParametrosCorDev").jqGrid('setCell', rowid, i, '', { 'background-color': vColorDestinatarioDev, 'color': 'black', 'border-color': '#a6c9e2' });
                }
            } else {
                for (var i in colModels) {
                    $("#tblParametrosCorDev").jqGrid('setCell', rowid, i, '', { 'background-color': vColorParametroDev, 'color': 'black', 'border-color': '#a6c9e2' });
                }
            }
        }
    });
    $("#lblInfoParamCorDev").html('');
    $("#lblInfoParamCorDev").html('Los <a style="color: ' + vColorDestinatarioDev + ';"><b>"Destinatarios"</b></a> son los usurios que recibiarán el correo. Los valores de los <a style="color: ' + vColorParametroDev + ';"><b>"Parámetros"</b></a> serán reemplazados al momento de enviar los correos respectivos.');
    var dataParamCorDev = [{ Param: 'Propietario', Desc: 'Correo del propietario de la Solicitud.', Tipo: 'Destinatario' },
                            { Param: 'RespAprobacion', Desc: 'Correo del responsable que aprobó la solicitud devuelta.', Tipo: 'Destinatario' },
                            { Param: 'TecAsignado', Desc: 'Correo del técnicos asignado a la solicitud devuelta.', Tipo: 'Destinatario' },
                            { Param: 'TecResponsable', Desc: 'Correo del técnico responsable del tipo de solicitud.', Tipo: 'Destinatario' },
                            { Param: 'Administrador', Desc: 'Correo del Administrador.', Tipo: 'Destinatario' },
                            { Param: '{Codigo}', Desc: 'Código de la solicitud devuelta.', Tipo: 'Parametro' },
                            { Param: '{NombreEmpleado}', Desc: 'Nombre del propietario de la Solicitud devuelta.', Tipo: 'Parametro' },
                            { Param: '{CodigoEmpleado}', Desc: 'Código del propietario de la Solicitud devuelta.', Tipo: 'Parametro' },
                            { Param: '{Fecha}', Desc: 'Fecha de la devolución de la solicitud.', Tipo: 'Parametro' },
                            { Param: '{TipoSolicitud}', Desc: 'Nombre del tipo de solicitud.', Tipo: 'Parametro' },
                            { Param: '{ListadoSolicitudes}', Desc: 'Listado de solicitudes afectadas.', Tipo: 'Parametro'}];
    for (var i = 0; i < dataParamCorDev.length; i++) {
        tblParametrosCorDev.addRowData(dataParamCorDev[i].Param, dataParamCorDev[i]);
    }
    //#endregion
    //#region Solicitudes
    tblSolicitudesAfectadas = $("#tblSolicitudesAfectadas").jqGrid({
        sortable: false,
        datatype: fnCargarSolicitudesEnConflictoPaginado,
        jsonReader: //Set the jsonReader to the JQGridJSonResponse squema to bind the data.
                {
                root: "Items",
                page: "PaginaActual",
                total: "TotalPaginas",
                records: "TotalRegistros",
                repeatitems: true,
                cell: "Row",
                id: "ID"
            },
        colModel: [{ name: 'P_inCodSol', Campo: 'P_inCodSol', label: 'P_inCodSol', hidden: true, width: 150 },
                    { name: 'IdEstado', index: 'IdEstado', label: 'IdEstado', hidden: true, width: 100 },
                    { name: 'vcCodigo', index: 'vcCodigo', label: 'Codigo', hidden: false, width: 150 },
                    { name: 'vcCodEmp', index: 'vcCodEmp', label: 'vcCodEmp', hidden: true, width: 100 },
                    { name: 'vcNomEmp', index: 'vcNomEmp', label: 'Nombre Empl', hidden: false, width: 300
                        , formatter: function (value, options, rData) {
                            if (value != undefined && value != null) {
                                return rData[3].toString() + ' - ' + value.toString();
                            }
                        }
                    },
                    { name: 'vcCorProp', index: 'vcCorProp', label: 'Correo Empl', hidden: false, width: 200 },
                    { name: 'vcCampo', index: 'vcCampo', label: 'Campos', hidden: false, width: 200 }
   	        ],
        pager: '#pagerSolDev',
        loadtext: 'Cargando datos...',
        emptyrecords: 'No hay resultados',
        recordtext: "{0} - {1} de {2} elementos",
        pgtext: 'Pág: {0} de {1}',
        rowNum: "10",
        rowList: [7, 10, 15, 20],
        sortname: "vcCodigo",
        sortorder: "asc",
        height: 175,
        rownumbers: true,
        shrinkToFit: false,
        width: 480,
        caption: "Solicitudes para devolución"
    }).navGrid("#pagerSolDev", { edit: false, add: false, search: false, del: false });

    //#endregion

    //check envio correo
    $("#chkEnvioCorDev").change(function () {
        var tipoCheck;
        switch ($(this).attr("id")) {
            case "chkEnvioCorDev_Prop":
                tipoCheck = "Prop";
                break;
            case "chkEnvioCorDev_RespAprob":
                tipoCheck = "RespAprob";
                break;
            case "chkEnvioCorDev_Tec":
                tipoCheck = "Tec";
                break;
        }
        if (!$(this).is(":checked")) {
            $("#txtDestinatariosCorDev_" + tipoCheck).attr("disabled", true);
            $("#txtAsuntoCorDev_" + tipoCheck).attr("disabled", true);
            $("#txtMensajeCorDev_" + tipoCheck).attr("disabled", true);
            $("#lblAdvertenciaCorDev_" + tipoCheck).show();
        } else {
            $("#txtDestinatariosCorDev_" + tipoCheck).attr("disabled", false);
            $("#txtAsuntoCorDev_" + tipoCheck).attr("disabled", false);
            $("#txtMensajeCorDev_" + tipoCheck).attr("disabled", false);
            $("#lblAdvertenciaCorDev_" + tipoCheck).hide();
        }
    });

    //funcion de validacion de datos
    function fnValidarDatosMensajesDevolucion(TipoDest) {
        var vcErrorDev = '';
        if ($("#chkEnvioCorDev").is(":checked") && $("#txtAsuntoCorDev").val() == '') {
            vcErrorDev = 'Debe de ingresar un "Asunto" para el correo.';
            $("#txtAsuntoCorDev").focus();
        }
        if ($("#chkEnvioCorDev").is(":checked") && $("#txtMensajeCorDev").val() == '') {
            vcErrorDev = 'Debe de ingresar un "Mensaje" para el correo.';
            $("#txtMensajeCorDev").focus();
        }
        if ($("#chkEnvioCorDev").is(":checked") && TipoDest == 3) {
            if (!$("#chkTecAsignado").is(":checked") && !$("#chkTecResponsable").is(":checked") && !$("#chkAdministrador").is(":checked")) {
                vcErrorDev = 'Debe de seleccionar por lo menos un destinatario para le correo que se enviará a los técnicos';
            }
        }
        return vcErrorDev;
    }
    //#endregion

    //#region Parámetros en mensajes
    $("#btnAgregarAsuntoApr").click(function () {
        fnInsertarTextoEnTextbox("txtMensajeApr", $("#ddlParametrosApr").val());
    });

    $("#btnAgregarAsuntoPro").click(function () {
        fnInsertarTextoEnTextbox("txtMensajePro", $("#ddlParametrosPro").val());
    });

    $("#btnAgregarAsuntoUmbApr").click(function () {
        fnInsertarTextoEnTextbox("txtMensajeUmbApr", $("#ddlParametrosUmbApr").val());
    });

    $("#btnAgregarAsuntoUmbPro").click(function () {
        fnInsertarTextoEnTextbox("txtMensajeUmbPro", $("#ddlParametrosUmbPro").val());
    });

    function fnInsertarTextoEnTextbox(nombreControl, texto) {
        var textarea = document.getElementById(nombreControl);
        var currentPos = getCaret(textarea);
        var strLeft = textarea.value.substring(0, currentPos);
        var strMiddle = texto;
        var strRight = textarea.value.substring(currentPos, textarea.value.length);
        textarea.value = strLeft + strMiddle + strRight;
    }

    function getCaret(control) {
        if (control.selectionStart) {
            return control.selectionStart;
        } else if (document.selection) { //ie
            control.focus();

            var r = document.selection.createRange();
            if (r == null) {
                return 0;
            }

            var re = control.createTextRange(),
            rc = re.duplicate();
            re.moveToBookmark(r.getBookmark());
            rc.setEndPoint('EndToStart', re);

            return rc.text.length;
        }
        return 0;
    }
    //#endregion

    //#Configuracion Correo Servicio
    var tbParametrosSrv = $("#tbParametrosSrv").jqGrid({
        sortable: true,
        datatype: "local",
        colModel: [{ name: 'Clave', index: 'Clave', label: 'Clave', hidden: false, width: 160 },
                    { name: 'Nombre', index: 'Nombre', label: 'IdCampo', hidden: true, width: 180 },
                    { name: 'Descripcion', index: 'Descripcion', label: 'Descripción', hidden: false, width: 170 },
                    { name: 'IdParametro', index: 'IdParametro', label: 'IdParametro', hidden: true, width: 50 },
                    { name: 'Detalle', index: 'Detalle', label: 'Descripción Detallada', hidden: false, width: 410 }
   	               ],
        loadtext: 'Cargando datos...',
        emptyrecords: 'No hay resultados',
        rowList: [10, 20, 30],
        rowNum: 100,
        sortname: "inCodGru",
        sortorder: "asc",
        height: "135",
        width: 410 + 170 + 160 + 70,
        rownumbers: true,
        shrinkToFit: false,
        multiselect: false
    });

    $("#txtMensajeSrv").kendoEditor({
        tools: ["bold", "italic", "underline", "strikethrough",
                "justifyLeft", "justifyCenter", "justifyRight", "justifyFull",
                "insertUnorderedList", "insertOrderedList",
                "indent", "outdent",
                "fontSize"
        ],
        messages: {
            bold: "Negritas", italic: "Cursiva", underline: "Subrayado", strikethrough: "Tachado",
            justifyLeft: "Alinear a la izquierda", justifyCenter: "Centrar", justifyRight: "Alinear a la derecha", justifyFull: "Justificar",
            insertUnorderedList: "Viñetas", insertOrderedList: "Numeración",
            indent: "Disminuir sangría", outdent: "Aumentar sangría",
            fontNameInherit: "(Fuente)", fontSizeInherit: "(Tamaño de fuente)",
            fontSize: "Tamaño de fuente"
        }
    });

    fnCargarDatosCorreoServicio($("#hdfCodTipSol").val());

    $("#btnAgregarSrv").click(function () {
        fnInsertarTextoEnKendoEditor("txtMensajeSrv", $("#ddlParametrosSrv").val());
    });    
    //#endregion

});

//-----------------------------------FUNCIONES GENERALES----------------------------------//

function DeleteFile(file) {
    $.ajax({
        url: "UploadHandler.ashx?file=" + file + "&accion=delete",
        type: "GET",
        cache: false,
        async: true,
        success: function (html) {
            $('#UploadedFile').html("");
            $("#UploadButton").show();
            vcFileName = "";

            $("#ifCondiciones").css("height", 0);
            $("#ifCondiciones").attr("src", "");
            $("#btnReducir").hide();
            $("#btnAmpliar").hide();
        }
    });
}

function fnDescargarArchivo(NomArc, tipo, inIdDet) {
    //Descargar adjunto antes de grabar configuración
    if (tipo == 1) {
        var filePath = "P_Movil/Administrar/Temporal/Solicitudes/" + NomArc;
        $.ajax({
            url: raiz(filePath),
            success: function (data) {
                window.location.href = raiz("Common/Controladores/DescargarArchivo.ashx?archivo=" + filePath);
            },
            error: function (data) {
                alertaExterna('No se encontró el archivo a descargar.');
                $('#UploadedFile').html("");
                $("#UploadButton").show();
                vcFileName = "";
            }
        });
    }
    //        //Descargar adjunto de nota grabada
    //        else if (tipo == 2) {
    //            $.ajax({
    //                type: "POST",
    //                url: "Adm_SolicitudNota.aspx/DescargarArchivoBD",
    //                data: "{'inIdDet': '" + inIdDet + "'}",
    //                contentType: "application/json; charset=utf-8",
    //                dataType: "json",
    //                success: function (result) {
    //                    if (result.d == "1") {
    //                        var filePath = "P_Movil/Administrar/Temporal/Solicitudes/" + NomArc;
    //                        SaveToDisk(filePath, NomArc);
    //                    } else {
    //                        alertaExterna('No se encontró el archivo a descargar.');
    //                        $('#UploadedFile').html("");
    //                        $("#UploadButton").show();
    //                        vcFileName = "";
    //                    }
    //                },
    //                error: function (xhr, err) {
    //                    $("#dvCargando").hide();
    //                    alertaExterna("Error, Estadow: " + xhr.readyState + "\nEstado: " + xhr.status);
    //                }
    //            });
    //        }
}


function fnSortDropDownListByText(selectId) {
    //    var foption = $('#' + selectId + ' option:first');
    //    var soptions = $('#' + selectId + ' option:not(:first)').sort(function (a, b) {
    //        return a.text.toLowerCase() == b.text.toLowerCase() ? 0 : a.text.toLowerCase() < b.text.toLowerCase() ? -1 : 1;
    //    });
    //    $('#' + selectId).html(soptions).prepend(foption);


    var foption = $('#' + selectId + ' option:first');
    var soptions = $('#' + selectId + ' option').sort(function (a, b) {
        return a.text.toLowerCase() == b.text.toLowerCase() ? 0 : a.text.toLowerCase() < b.text.toLowerCase() ? -1 : 1;
    });
    $('#' + selectId).html(soptions);
    $('#' + selectId).val(foption);
};

function fnUsuarioEspecifico() {
    //if ($("#chkRespUsuario").is(":checked")) {
    //    $("#trUsuarioEspecifico").show();
    //    if ($("#ddlEstadoAprobacion").val() != "32") { // 10-03-2014 wapumayta
    //        $("#chkUsuarioEspecificoCorApr").prop('disabled', false);
    //    }
    //    if ($("#ddlEstadoProceso").val() != "6") {
    //        $("#chkUsuarioEspecificoCorPro").prop('disabled', false); //JHERRERA 2014082014
    //    }
    //} else {
    //    $("#trUsuarioEspecifico").hide();
    //    $('input[name=chkUsuarioEspecificoCorApr]').attr('checked', false);
    //    $('input[name=chkUsuarioEspecificoCorPro]').attr('checked', false);
    //    $("#chkUsuarioEspecificoCorApr").prop('disabled', true);
    //    $("#chkUsuarioEspecificoCorPro").prop('disabled', true);
    //
    //    fnLimpiarChecksCorreo("EstadoAprobacion", "UsuarioEspecifico");
    //    fnLimpiarChecksCorreo("EstadoProceso", "UsuarioEspecifico");
    //}
}

function fnResponsableArea() {
    //if ($("#chkRespArea").is(":checked")) {
    //    if ($("#ddlEstadoAprobacion").val() != "32") { // 10-03-2014 wapumayta
    //        $("#chkAreaCorApr").prop('disabled', false);
    //    }
    //    $("#chkAreaCorPro").prop('disabled', false); //JHERRERA 2014082014
    //} else {
    //    $('input[name=chkAreaCorApr]').attr('checked', false);
    //    $('input[name=chkAreaCorPro]').attr('checked', false);
    //    $("#chkAreaCorApr").prop('disabled', true);
    //    $("#chkAreaCorPro").prop('disabled', true);
    //
    //    fnLimpiarChecksCorreo("EstadoAprobacion", "Responsable");
    //    fnLimpiarChecksCorreo("EstadoProceso", "Responsable");
    //}
}

function fnLimpiarChecksCorreo(vcTipEst, vcTipChec) {
    var vcEstados = Object.keys(arTipSol[vcTipEst]);
    for (i = 0; i < vcEstados.length; i++) {
        arTipSol[vcTipEst][vcEstados[i]][vcTipChec] = "0";
    }
}

function fnUmbralAprobacion() {
    //if ($("#chkUmbralAprobacion").is(":checked")) {
    //    $("#dvUmbralApr").show();
    //    if ($('input[name=chkEnviarCorreoUmbApr]').is(':checked')) {
    //        $("#dvMensajeUmbApr").show();
    //    } else {
    //        $("#dvMensajeUmbApr").hide();
    //    }
    //} else {
    //    $("#dvUmbralApr").hide();
    //    //        $("#txtValorObjetivoApr").val("");
    //    //        $("#txtValorMaximoApr").val("");
    //    //        $('input[name=chkEnviarCorreoUmbApr]').attr('checked', false);
    //    //        $("#txtCorreoUmbApr").val("");
    //    //        $("#txtAsuntoUmbApr").val("");
    //    //        $("#txtMensajeUmbApr").val("");
    //    //        fnActualizarEtiquetasSemaforosApr();
    //}
}

function fnUmbralProceso() {
    //if ($("#chkUmbralProceso").is(":checked")) {
    //    $("#dvUmbralPro").show();
    //} else {
    //    $("#dvUmbralPro").hide();
    //}
}

function fnActualizarEtiquetasSemaforosApr() {
    //var vcTexto1 = "# Días Solicitud <= {Valor Objetivo}";
    //var vcTexto2 = "{Valor Objetivo} < # Días Solicitud <= {Valor Máximo}";
    //var vcTexto3 = "# Días Solicitud > {Valor Máximo}";
    //var vcValObj = "{Valor Objetivo}";
    //var vcValMax = "{Valor Máximo}";
    //
    //if ($("#txtValorObjetivoApr").val() != "")
    //    vcValObj = $("#txtValorObjetivoApr").val();
    //if ($("#txtValorMaximoApr").val() != "")
    //    vcValMax = $("#txtValorMaximoApr").val();
    //
    //$("#lblSemaforoApr1").text(vcTexto1.replace("{Valor Objetivo}", vcValObj));
    //$("#lblSemaforoApr2").text(vcTexto2.replace("{Valor Objetivo}", vcValObj).replace("{Valor Máximo}", vcValMax));
    //$("#lblSemaforoApr3").text(vcTexto3.replace("{Valor Máximo}", vcValMax));
}

function fnActualizarEtiquetasSemaforosPro() {
    //var vcTexto1 = "# Días Solicitud <= {Valor Objetivo}";
    //var vcTexto2 = "{Valor Objetivo} < # Días Solicitud <= {Valor Máximo}";
    //var vcTexto3 = "# Días Solicitud > {Valor Máximo}";
    //var vcValObj = "{Valor Objetivo}";
    //var vcValMax = "{Valor Máximo}";
    //
    //if ($("#txtValorObjetivoPro").val() != "")
    //    vcValObj = $("#txtValorObjetivoPro").val();
    //if ($("#txtValorMaximoPro").val() != "")
    //    vcValMax = $("#txtValorMaximoPro").val();
    //
    //$("#lblSemaforoPro1").text(vcTexto1.replace("{Valor Objetivo}", vcValObj));
    //$("#lblSemaforoPro2").text(vcTexto2.replace("{Valor Objetivo}", vcValObj).replace("{Valor Máximo}", vcValMax));
    //$("#lblSemaforoPro3").text(vcTexto3.replace("{Valor Máximo}", vcValMax));
}

function fnActualizaLabelReglaAutomaticaApr() {
    //var vcEstIni = $("#ddlEstadoIniReglaApr option:selected").text();
    //var vcEstFin = $("#ddlEstadoFinReglaApr option:selected").text();
    //
    //if ($("#chkEstadoAutomaticoApr").is(":checked")) {
    //    //$("#ddlEstadoFinReglaApr").prop('disabled', false);
    //    $("#lblMensajeEstApr").text("Cuando la solicitud esté en el estado '" + vcEstIni + "' , esta se cambiará automáticamente al estado '" + vcEstFin + "'.");
    //    $("#trReglaAprobacionLabel").show();
    //    $("#trReglaAprogacionCombo").show();
    //} else {
    //    //$("#ddlEstadoFinReglaApr").prop('disabled', true);
    //    $("#lblMensajeEstApr").text("");
    //    $("#trReglaAprobacionLabel").hide();
    //    $("#trReglaAprogacionCombo").hide();
    //}
}

function fnActualizaLabelReglaAutomaticaPro() {
    //var vcEstIni = $("#ddlEstadoProceso option:selected").text();
    //var vcEstFin = $("#ddlEstadoFinReglaPro option:selected").text();
    //
    //if ($("#chkEstadoAutomaticoPro").is(":checked")) {
    //    //$("#ddlEstadoFinReglaPro").prop('disabled', false);
    //    $("#lblMensajeEstPro").text("Cuando la solicitud esté en el estado '" + vcEstIni + "' , esta se cambiará automáticamente al estado '" + vcEstFin + "'.");
    //    $("#trReglaProcesoCombo").show();
    //    $("#trReglaProcesoLabel").show();
    //} else {
    //    //$("#ddlEstadoFinReglaPro").prop('disabled', true);
    //    $("#lblMensajeEstPro").text("");
    //    $("#trReglaProcesoCombo").hide();
    //    $("#trReglaProcesoLabel").hide();
    //}
}

function fnDeshabilitarControlesMensajePro() {
    $("#txtCorreoPro").attr("disabled", "disabled");
    $("#txtAsuntoPro").attr("disabled", "disabled");
    $("#txtMensajePro").attr("disabled", "disabled");

    //$("#tabEstadoProceso").tabs('option', 'selected', 0);
    if ($("#hdfPersonalizada").val() == "false") {
        $("#tabEstadoProceso").tabs("option", "disabled", [2]);
    } else {
        $("#tabEstadoProceso").tabs("option", "disabled", [3]);
    }
    //$("#accMensaje").addClass("ui-state-disabled");
}

function fnDeshabilitarControlesMensajeApr() {
    //$("#txtCorreoApr").attr("disabled", "disabled");
    //$("#txtAsuntoApr").attr("disabled", "disabled");
    //$("#txtMensajeApr").attr("disabled", "disabled");

    //$("#tabEstadoAprobacion").tabs('option', 'selected', 0);
    //$("#tabEstadoAprobacion").tabs("option", "disabled", [2]);

    $("#divCorreoAprobacion").hide();
}

function fnHabilitarControlesMensajePro() {
    $("#txtCorreoPro").removeAttr("disabled");
    $("#txtAsuntoPro").removeAttr("disabled");
    $("#txtMensajePro").removeAttr("disabled");

    $("#tabEstadoProceso").tabs("option", "disabled", []);

    //    $("#accMensaje").removeClass("ui-state-disabled");
}

function fnHabilitarControlesMensajeApr() {
    //$("#txtCorreoApr").removeAttr("disabled");
    //$("#txtAsuntoApr").removeAttr("disabled");
    //$("#txtMensajeApr").removeAttr("disabled");

    //$("#tabEstadoAprobacion").tabs("option", "disabled", []);
    $("#divCorreoAprobacion").show();
}

//function fnDeshabilitarControlesParametros() {
//    $("#txtClave").attr("disabled", "disabled");
//    $("#ddlValor").attr("disabled", "disabled");
//    $("#btnAgregarParametro").button("option", "disabled", true);
//    $("#btnQuitarParametro").button("option", "disabled", true);

//    //$("#accParametros").addClass("ui-state-disabled");
//}

//function fnHabilitarControlesParametros() {
//    $("#txtClave").removeAttr("disabled");
//    $("#ddlValor").removeAttr("disabled");
//    $("#btnAgregarParametro").button("option", "disabled", false);
//    $("#btnQuitarParametro").button("option", "disabled", false);

//    //$("#accParametros").removeClass("ui-state-disabled");
//}

//---------------------------------------------------------------------------------------->>

//--------------------------------FUNCIONES PARA PICKLIST---------------------------------//

function fnGuardarPicklist() {
    var Valor = $("#txtValorPicklist").val();
    Valor = Valor.replace("'", "");

    if ($.trim(Valor) == '') {
        $("#txtValorPicklist").val('');
        alertaExterna('Debe ingresar un valor');
        $("#txtValorPicklist").focus();
        return;
    }
    if (TipoGuardar == 'A') {

        if (fnValidaExisteItem(Valor) == 1) {
            alertaExterna('El valor ingresado ya existe');
            $("#txtValorPicklist").focus();
            return;
        }
        $('#lstPicklist').append('<option value="' + Valor + '" estado="2">' + Valor + '</option>');
        $("#txtValorPicklist").val('');
        $("#txtValorPicklist").focus();
    }
    else {
        if (ValorInicialPicklist.toString().toLowerCase() != Valor.toString().toLowerCase()) {

            if (fnValidaExisteItem(Valor) == 1) {
                alertaExterna('El valor ingresado ya existe');
                $("#txtValorPicklist").focus();
                return;
            }

            $("#lstPicklist option[value='" + ValorInicialPicklist + "']").after('<option value="' + Valor + '" estado="2">' + Valor + '</option>');
            $("#lstPicklist option[value='" + ValorInicialPicklist + "']").remove();
        }
        $('#divValorPicklist').dialog("close");
        $("#lstPicklist").focus();
    }
}

function fnPicklistEditar() {

    if ($('#lstPicklist option').length == 0) {
        return;
    }

    var list = "";
    $('#lstPicklist option:selected').each(function () {
        list += this.value + "|";
    });

    if ($('#lstPicklist option:selected').length == 0) {
        alertaExterna('Seleccione un ítem');
        $('#lstPicklist').focus();
        return;
    }
    if ($('#lstPicklist option:selected').length > 1) {
        alertaExterna('Sólo seleccione un ítem');
        $('#lstPicklist').focus();
        return;
    }

    var Valor = $('#lstPicklist option:selected')[0].value;
    ValorInicialPicklist = Valor;
    $("#tdTituloPicklist").html('Modificar la etiqueta de este valor de lista.');
    $("#txtValorPicklist").val(Valor);
    $("#txtValorPicklist").focus();
    TipoGuardar = 'E';
    Modal = $('#divValorPicklist').dialog({
        title: "Modificar valor de lista",
        width: 300,
        height: 135,
        modal: true,
        resizable: false
    });
}

function fnPicklistEliminar() {
    if ($('#lstPicklist option').length == 0) {
        return;
    }

    if ($('#lstPicklist option:selected').length == 0) {
        alertaExterna('Seleccione un ítem como mínimo');
        $('#lstPicklist').focus();
        return;
    }

    if (confirm('El valor asociado con esta opción de lista se eliminará de forma permanente. Una vez eliminado del sistema el valor de lista, no se puede volver a agregar. Los registros existentes que contengan este valor se deben actualizar manualmente con otro valor de la lista.\n\nHaga clic en Aceptar para continuar.')) {
        $('#lstPicklist option:selected').remove();
    }
    else {
        return;
    }
}

function fnPicklistAgregar() {
    $("#tdTituloPicklist").html('Agregar nuevo valor a la lista.');
    $("#txtValorPicklist").val('');
    $("#txtValorPicklist").focus();
    TipoGuardar = 'A';
    Modal = $('#divValorPicklist').dialog({
        title: "Agregar valor a la lista",
        width: 300,
        height: 135,
        modal: true,
        resizable: false
    });
}

function fnPicklistSubir() {
    if ($('#lstPicklist option').length == 0) {
        return;
    }
    if ($('#lstPicklist option:selected').length == 0) {
        alertaExterna('Seleccione un ítem');
        $('#lstPicklist').focus();
        return;
    }
    if ($('#lstPicklist option:selected').length > 1) {
        alertaExterna('Sólo seleccione un ítem');
        $('#lstPicklist').focus();
        return;
    }

    var Valor = $('#lstPicklist option:selected')[0].value;
    var ValorAnterior = '';
    $('#lstPicklist option').each(function () {
        if ($(this).val() == Valor) {
            return false;
        }
        ValorAnterior = $(this).val();
    });

    if (ValorAnterior != '') {
        $("#lstPicklist option[value='" + Valor + "']").insertBefore("#lstPicklist option[value='" + ValorAnterior + "']");
    }
}

function fnPicklistBajar() {
    if ($('#lstPicklist option').length == 0) {
        return;
    }
    if ($('#lstPicklist option:selected').length == 0) {
        alertaExterna('Seleccione un ítem');
        $('#lstPicklist').focus();
        return;
    }
    if ($('#lstPicklist option:selected').length > 1) {
        alertaExterna('Sólo seleccione un ítem');
        $('#lstPicklist').focus();
        return;
    }

    var Valor = $('#lstPicklist option:selected')[0].value;
    var ValorPosterior = '';
    var blEncontroValor = 0;
    $('#lstPicklist option').each(function () {
        if (ValorPosterior == Valor) {
            ValorPosterior = $(this).val();
            blEncontroValor = 1;
            return false;
        }
        ValorPosterior = $(this).val();
    });

    if (blEncontroValor == 1) {
        $("#lstPicklist option[value='" + Valor + "']").insertAfter("#lstPicklist option[value='" + ValorPosterior + "']");
    }
}

function fnPicklistActivar() {
    if ($('#lstPicklist option').length == 0) {
        return;
    }
    if ($('#lstPicklist option:selected').length == 0) {
        alertaExterna('Seleccione un ítem');
        $('#lstPicklist').focus();
        return;
    }
    if ($('#lstPicklist option:selected').length > 1) {
        alertaExterna('Sólo seleccione un ítem');
        $('#lstPicklist').focus();
        return;
    }
    $($('#lstPicklist option:selected')[0]).attr("estado", '1');
    $($('#lstPicklist option:selected')[0]).css("color", 'rgb(50,50,50)');
    $("#lblPicklistEliminar").text('Desactivar');
}

function fnPicklistDesactivar() {
    if ($('#lstPicklist option').length == 0) {
        return;
    }
    if ($('#lstPicklist option:selected').length == 0) {
        alertaExterna('Seleccione un ítem');
        $('#lstPicklist').focus();
        return;
    }
    if ($('#lstPicklist option:selected').length > 1) {
        alertaExterna('Sólo seleccione un ítem');
        $('#lstPicklist').focus();
        return;
    }
    $($('#lstPicklist option:selected')[0]).attr("estado", '0');
    $($('#lstPicklist option:selected')[0]).css("color", 'rgb(205,10,10)');
    $("#lblPicklistEliminar").text('Activar');
}

function fnValidaExisteItem(strNuevoValor) {
    var blExiste = 0;
    $('#lstPicklist option').each(function () {
        if ($(this).val().toLowerCase() == strNuevoValor.toString().toLowerCase()) {
            blExiste = 1;
            return false;
        }
    });
    return blExiste;
};

//---------------------------------------------------------------------------------------->>

//----------------------------------FUNCIONES PARA FASE-----------------------------------//

//function fnFaseEditar() {

//    if ($('#lstFases option').length == 0) {
//        return;
//    }

//    var list = "";
//    $('#lstFases option:selected').each(function () {
//        list += this.value + "|";
//    });

//    if ($('#lstFases option:selected').length == 0) {
//        alertaExterna('Seleccione un ítem');
//        $('#lstFases').focus();
//        return;
//    }
//    if ($('#lstFases option:selected').length > 1) {
//        alertaExterna('Sólo seleccione un ítem');
//        $('#lstFases').focus();
//        return;
//    }

//    var Valor = $('#lstFases option:selected')[0].value;
//    ValorInicialFase = Valor;
//    $("#tdTituloFase").html('Modificar la etiqueta de este valor de lista.');
//    $("#txtValorFase").val(Valor);
//    $("#txtValorFase").focus();
//    TipoGuardar = 'E';
//    Modal = $('#divValorFase').dialog({
//        title: "Modificar valor de lista",
//        width: 300,
//        height: 135,
//        modal: true,
//        resizable: false
//    });
//}

//function fnFaseAgregar() {
//    $("#tdTituloFase").html('Agregar nuevo valor a la lista.');
//    $("#txtValorFase").val('');
//    $("#txtValorFase").focus();
//    TipoGuardar = 'A';
//    Modal = $('#divValorFase').dialog({
//        title: "Agregar valor a la lista",
//        width: 300,
//        height: 135,
//        modal: true,
//        resizable: false
//    });
//}

//function fnFaseSubir() {
//    if ($('#lstFases option').length == 0) {
//        return;
//    }
//    if ($('#lstFases option:selected').length == 0) {
//        alertaExterna('Seleccione un ítem');
//        $('#lstFases').focus();
//        return;
//    }
//    if ($('#lstFases option:selected').length > 1) {
//        alertaExterna('Sólo seleccione un ítem');
//        $('#lstFases').focus();
//        return;
//    }

//    var Valor = $('#lstFases option:selected')[0].value;
//    var ValorAnterior = '';
//    $('#lstFases option').each(function () {
//        if ($(this).val() == Valor) {
//            return false;
//        }
//        ValorAnterior = $(this).val();
//    });

//    if (ValorAnterior != '') {
//        $("#lstFases option[value='" + Valor + "']").insertBefore("#lstFases option[value='" + ValorAnterior + "']");
//        eval("arTipSol.EstadoProceso." + Valor + ".Orden = arTipSol.EstadoProceso." + Valor + ".Orden - 1;");
//        eval("arTipSol.EstadoProceso." + ValorAnterior + ".Orden = arTipSol.EstadoProceso." + ValorAnterior + ".Orden + 1;");
//    }
//}

//function fnFaseBajar() {
//    if ($('#lstFases option').length == 0) {
//        return;
//    }
//    if ($('#lstFases option:selected').length == 0) {
//        alertaExterna('Seleccione un ítem');
//        $('#lstFases').focus();
//        return;
//    }
//    if ($('#lstFases option:selected').length > 1) {
//        alertaExterna('Sólo seleccione un ítem');
//        $('#lstFases').focus();
//        return;
//    }

//    var Valor = $('#lstFases option:selected')[0].value;
//    var ValorPosterior = '';
//    var blEncontroValor = 0;
//    $('#lstFases option').each(function () {
//        if (ValorPosterior == Valor) {
//            ValorPosterior = $(this).val();
//            blEncontroValor = 1;
//            return false;
//        }
//        ValorPosterior = $(this).val();
//    });

//    if (blEncontroValor == 1) {
//        $("#lstFases option[value='" + Valor + "']").insertAfter("#lstFases option[value='" + ValorPosterior + "']");
//        eval("arTipSol.EstadoProceso." + Valor + ".Orden = arTipSol.EstadoProceso." + Valor + ".Orden + 1;");
//        eval("arTipSol.EstadoProceso." + ValorPosterior + ".Orden = arTipSol.EstadoProceso." + ValorPosterior + ".Orden - 1;");
//    }
//}

//function fnValidaExisteFase(strNuevoValor) {
//    var blExiste = 0;
//    $('#lstFases option').each(function () {
//        if ($(this).val().toLowerCase() == strNuevoValor.toString().toLowerCase()) {
//            blExiste = 1;
//            return false;
//        }
//    });
//    return blExiste;
//};

//---------------------------------------------------------------------------------------->>

//-----Funciones para editar Tipos de Solicitud del Sistema
function ListarDetalleCaptura() {

    return;
    var inCotTipSol = $("#hdfCodSolSist").val();
    $.ajax({
        type: "POST",
        url: "Adm_SolicitudesConfiguracion.aspx/ListarDetalleCaptura",
        data: "{'inCotTipSol': '" + inCotTipSol + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            $("#lblTipoSolicitud").text(result.d[0].vcNomTipSol);
            $.each(result.d, function () {
                var datosDetalle = {
                    inCod: this.inCod,
                    vcTituloTab: this.vcTituloTab,
                    btProObl: this.btProObl,
                    btAct: this.btAct,
                    btCapObl: this.btCapObl,
                    Descripcion: this.Descripcion,
                    vcNombreTab: this.vcNombreTab,
                    inCanTot_Adj: this.inCanTot_Adj,
                    vcExtPer_Adj: this.vcExtPer_Adj,
                    vcTamTip_Adj: this.vcTamTip_Adj,
                    vcTamMed_Adj: this.vcTamMed_Adj,
                    dcTamaño_Adj: FormatoNumero(this.dcTamaño_Adj, oCulturaLocal, false),
                    vcTamTip_Msj: this.vcTamTip_Msj,
                    inTamaño_Msj: this.inTamaño_Msj,
                    vcNomArchivo_Dec: this.vcNomArchivo_Dec,
                    btBotRef: this.btBotRef
                    //                    vcUbiArchivo_Dec: this.vcUbiArchivo_Dec
                }
                tbDetalleContenido.jqGrid('addRowData', this.inCod, datosDetalle);

                //condicioens de la solicitud
                if (this.inCod == 4) {
                    vcFileName = this.vcNomArchivo_Dec;

                    if (vcFileName != "") {
                        $("<div class='imgBtn' style='margin-top:1px; height:21px;'><img src='../../../Common/Images/remove.png' onclick=\"DeleteFile('" + vcFileName + "')\"/>&nbsp;&nbsp;&nbsp;<span id='filesubido' style='text-decoration:underline;' nombre='" + vcFileName + "'>" + vcFileName + "</span></div>").appendTo('#UploadedFile');
                        $("#UploadButton").hide();

                        var RutaCompleta = "P_Movil/Administrar/Temporal/Solicitudes/" + vcFileName;
                        $("#ifCondiciones").attr("src", raiz(RutaCompleta));
                        $("#ifCondiciones").css("height", 200);
                        $("#btnAmpliar").show();
                    }
                }
                //jherrera 20/05/2015 - Comentado debido a nueva lógica de parámetros.
                //validar si existe mensajes visible y agregarlo como parámetro para los correos - wapumayta 09/10/2014
                //                if (this.vcTituloTab == 'Mensaje' && this.btAct == 'True') {
                //                    $("#ddlValor").append($('<option></option>').val('vcDesSol').html('Descripción Solicitud'));
                //                }
            });
            //            fnSortDropDownListByText("ddlValor");
            //totalContenidos = [];
            //$.each(result.d, function () {
            //    //alert(this.btProObl + " - " + this.btAct + " - " + this.inCod);
            //    var esObligatorio = this.btProObl == 'True' ? 'SI' : 'NO';
            //    var esActivo = '';
            //    if (this.btAct == 'True') {
            //        if (this.btProObl == 'True') {
            //            esActivo = '<input id="chk-' + this.inCod + '" type="checkbox" value="' + this.inCod + '" checked="checked" disabled="disabled" />';
            //        } else {
            //            totalContenidos.push(this.inCod);
            //            esActivo = '<input id="chk-' + this.inCod + '" type="checkbox" value="' + this.inCod + '" checked="checked" />';
            //        };
            //    } else {
            //        if (this.btProObl == 'True') {
            //            esActivo = '<input id="chk-' + this.inCod + '" type="checkbox" value="' + this.inCod + '" disabled="disabled" />';
            //        } else {
            //            totalContenidos.push(this.inCod);
            //            esActivo = '<input id="chk-' + this.inCod + '" type="checkbox" value="' + this.inCod + '" />';
            //        };
            //    };
            //
            //    $('#tbDetCaptura').append('<tr><td>' + this.vcTituloTab + '</td><td  align="center">' +
            //    esObligatorio + '</td><td align="center">' +
            //    esActivo + '</td></tr>')
            //});
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
};

function actualizarCapturaDatos() {
    var inCodTipSol = $("#hdfCodSolSist").val();
    var xmlDetalle = '<?xml version="1.0" encoding="iso-8859-1"?><TABLE>';
    $.each(totalContenidos, function () {
        var btAct = $("#chk-" + this).is(":checked") ? '1' : '0';
        xmlDetalle = xmlDetalle + "<CONTENIDO><inCodTipSol>" + inCodTipSol + "</inCodTipSol><inCodConten>" + this + "</inCodConten><btAct>" + btAct + "</btAct></CONTENIDO>";
    });
    xmlDetalle = xmlDetalle + "</TABLE>";
    //alert(xmlDetalle);
    $.ajax({
        type: "POST",
        url: "Adm_SolicitudesConfiguracion.aspx/ActualizarDetalleCaptura",
        data: "{'inCodTipSol': '" + inCodTipSol + "','xmlDetalle':'" + xmlDetalle + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            Mensaje("<br/><h1>Configuración guardada</h1><br/>", document, CerrarVentana);
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
};

function CerrarVentana() {
    window.parent.tab.tabs("remove", window.parent.tab.tabs("option", "selected"));
};

function FocusAlert(IndexAccordion, IndexTab, Control) {
    if ($("#AccordionJQ1").accordion("option", "active").toString() == "false") {
        $("#AccordionJQ1").accordion("option", "active", IndexAccordion);
    } else {
        if ($("#AccordionJQ1").accordion("option", "active") != IndexAccordion)
            $("#AccordionJQ1").accordion("option", "active", IndexAccordion);
    };
    if (IndexTab.tostring != "") {
        if (IndexAccordion == '3') {
            $("#tabEstadoAprobacion").tabs('option', 'selected', IndexTab);
        };
        if (IndexAccordion == '4') {
            $("#tabEstadoProceso").tabs('option', 'selected', IndexTab);
        };
    };
    if (Control != "") {
        $(Control).focus();
    };
};

function ValidarIngresoReglas(EstadoAutomatico, EstadoInicial, EstadoFinal) {
    var resultado = true;
    if ($("input[name=" + EstadoAutomatico + "]").is(":checked")) {
        if ($(EstadoFinal).val() == "-1") {
            $(EstadoFinal).blur();
            //alertaExterna("Si ha elegido estado automático, debe de seleccionar un estado final");
            window.top.alertaGlobal("Si ha elegido estado automático, debe de seleccionar un estado final");
            //            $(EstadoFinal).focus();
            resultado = false;
        };
        if ($(EstadoFinal).val() == $(EstadoInicial).val()) {
            alertaExterna("El Estado Final no puede ser igual al Estado Inicial");
            $(EstadoFinal).val("-1");
            $(EstadoFinal).focus();
            resultado = false;
            $("#lblEstadoIniReglaAprMensaje").text("");
        };
    };
    return resultado;
}

function ValidarIngresoUmbrales(Umbral, ValorObjetivo, ValorMaximo, EnvioCorreo, Destinatarios, Asunto, Mensaje) {
    var resultado = '';
    if ($("input[name=" + Umbral + "]").is(":checked")) {
        if ($(ValorObjetivo).val() == '') {
            alertaExterna("Debe ingresar un Valor Objetivo para el Umbral");
            //$(ValorObjetivo).focus();
            resultado = ValorObjetivo;
        } else if ($(ValorMaximo).val() == '') {
            alertaExterna("Debe ingresar un Valor Máximo para el Umbral");
            //$(ValorMaximo).focus();
            resultado = ValorMaximo;
        } else if ($("input[name=" + EnvioCorreo + "]").is(":checked")) {
            if ($(Asunto).val() == '') {
                alertaExterna("Debe ingresar un Asunto para el correo del Umbral");
                //$(Asunto).focus(),
                resultado = Asunto;
            } else if ($(Mensaje).val() == '') {
                alertaExterna("Debe ingresar un Mensaje para el correo del Umbral");
                //$(Mensaje).focus();
                resultado = Mensaje;
            };
        };
    };
    return resultado;
};

function ValidarIngresoMensajes(EnvioCorreo, Destinatarios,Tecnico,Operador, Asunto, Mensaje) {
    var resultado = '';
    if ($(EnvioCorreo).is(":checked")) {
        if ($(Destinatarios).val() != "" && !validarEmail2($(Destinatarios).val())) {
            alertaExterna("Debe ingresar un correo válido.");
            resultado = Destinatarios;
        }
        else if ($(Destinatarios).val() == "" && !$("input[name=" + Tecnico + "]").is(":checked") && !$("input[name=" + Operador + "]").is(":checked")) {
            alertaExterna("Debe ingresar por lo menos un Correo o seleccionar por lo menos un Usuario");
            //$(Destinatarios).focus();
            resultado = Destinatarios;
        } else if ($(Asunto).val() == "") {
            alertaExterna("Debe ingresar un Asunto para el correo");
            //$(Asunto).focus();
            resultado = Asunto;
        } else if ($(Mensaje).val() == "") {
            alertaExterna("Debe ingresar un Mensaje para el correo");
            //$(Mensaje).focus();
            resultado = Mensaje;
        };
    };
    return resultado;
};

function validarSeleccionEstadoFinal(EstadoInicial, EstadoFinal, TipoEstado) { //1=aprobacion, 2=proceso
    //validar estado inicial y estado final
    if ($(EstadoInicial).val() == $(EstadoFinal).val()) {
        alertaExterna("El estado final no puede ser igual al estado inicial.");
        $("#lblMensajeEstApr").text("");
        $(EstadoFinal).val("-1");
        return;
    }
    //validar que no se elija:  estado inicial rechazada y estado final Por Apribar o Aprobada.
    if ($(EstadoInicial).val() == "35" && ($(EstadoFinal).val() == "33" || $(EstadoFinal).val() == "34")) {
        alertaExterna('No existe regla para el estado inicial <b><i>"Rechazada"</i></b> y estado final <b><i>"' + $(EstadoFinal + ' option:selected').text() + '</i></b>".');
        $("#lblMensajeEstApr").text("");
        $(EstadoFinal).val("-1");
        return;
    }
    //validar que no se elija:  estado inicial rechazada y estado final Por Apribar o Aprobada.
    if ($(EstadoInicial).val() == "9" && ($(EstadoFinal).val() == "7" || $(EstadoFinal).val() == "8")) {
        alertaExterna('No existe regla para el estado inicial <b><i>"Anulada"</i></b> y estado final <b><i>"' + $(EstadoFinal + ' option:selected').text() + '</i></b>".');
        $("#lblMensajeEstPro").text("");
        $(EstadoFinal).val("-1");
        return;
    }
    //validar reglas ciclicas
    var inEstadoFinalComp = $(EstadoFinal).val();
    var inEstadoInicialComp = $(EstadoInicial).val();
    if (TipoEstado == "1") { //aprobacipno
        var vcEstadosApr = Object.keys(arTipSol.EstadoAprobacion);
        //alert("inEstadoInicialComp: " + inEstadoInicialComp + "\ninEstadoFinalComp: " + inEstadoFinalComp);
        var seguir = true;
        //$("#lblEstadoFinReglaAprMensaje").text("");
        while (seguir) {
            for (i = 0; i < vcEstadosApr.length; i++) {
                if (arTipSol.EstadoAprobacion[vcEstadosApr[i]].ReglaAutomatica == '1' && arTipSol.EstadoAprobacion[vcEstadosApr[i]].Id == inEstadoFinalComp) {
                    if (arTipSol.EstadoAprobacion[vcEstadosApr[i]].IdEstadoFinal == $(EstadoInicial).val()) {
                        //$("#lblEstadoFinReglaAprMensaje").text("reglas ciclicas");
                        alertaExterna('El estado final <b><i>"' + $(EstadoFinal + ' option:selected').text() + '"</i></b> no puede ser seleccionado porque estaría generando un proceso cíclico en las reglas automáticas.');
                        $(EstadoFinal).val("-1");
                        seguir = false;
                        break;
                    } else {
                        inEstadoInicialComp = arTipSol.EstadoAprobacion[vcEstadosApr[i]].Id;
                        inEstadoFinalComp = arTipSol.EstadoAprobacion[vcEstadosApr[i]].IdEstadoFinal;
                        seguir = true;
                        break;
                    }
                } else {
                    seguir = false;
                }
            }
        }
    } else { //proceso
        var vcEstadosPro = Object.keys(arTipSol.EstadoProceso);
        //alert("inEstadoInicialComp: " + inEstadoInicialComp + "\ninEstadoFinalComp: " + inEstadoFinalComp);
        var seguir = true;
        //$("#lblEstadoFinReglaAprMensaje").text("");
        while (seguir) {
            for (i = 0; i < vcEstadosPro.length; i++) {
                if (arTipSol.EstadoProceso[vcEstadosPro[i]].ReglaAutomatica == '1' && arTipSol.EstadoProceso[vcEstadosPro[i]].Id == inEstadoFinalComp) {
                    if (arTipSol.EstadoProceso[vcEstadosPro[i]].IdEstadoFinal == $(EstadoInicial).val()) {
                        //$("#lblEstadoFinReglaAprMensaje").text("reglas ciclicas");
                        alertaExterna('El estado final <b><k>"' + $(EstadoFinal + ' option:selected').text() + '"</k></b> no puede ser seleccionado porque estaría generando un proceso cíclico en las reglas automáticas.');
                        $(EstadoFinal).val("-1");
                        seguir = false;
                        break;
                    } else {
                        inEstadoInicialComp = arTipSol.EstadoProceso[vcEstadosPro[i]].Id;
                        inEstadoFinalComp = arTipSol.EstadoProceso[vcEstadosPro[i]].IdEstadoFinal;
                        seguir = true;
                        break;
                    }
                } else {
                    seguir = false;
                }
            }
        }
    }
}

function fnMostrarDatos(valor) {
    if ($("#hdfTecnicoResponsable_Act").val() == valor) { //guardar nombre del responsable actual
        vNombreRespTec_Actual = $("#bpTecnicoResponsable_txtValorBusqueda").val();
    }
    if ($("#hdfCodTipSol").val() != "" && biMsjTecResIni == "0" && valor != '' && $("#hdfTecnicoResponsable_Act").val() != '1' && $("#hdfTecnicoResponsable_Act").val() != valor) {
        biMsjTecResIni = "1";
        alertaExterna('El técnico <b>"' + vNombreRespTec_Actual + '"</b> aún tiene todos los permisos para este tipo de solicitud, si desea quitarle los permisos deberá configurarlos en la ventana <b>"Seguridad por Tipo"</b>.');
    }
    $("#hdfTecnicoResponsable").val(valor);

    //if (valor != '') {
    //    $.ajax({
    //        type: "POST",
    //        url: "Adm_SolicitudesConfiguracion.aspx/MostrarTecnicoResponsable",
    //        data: "{'inCodUsu': '" + valor + "'}",
    //        contentType: "application/json; charset=utf-8",
    //        dataType: "json",
    //        success: function (result) {
    //            //alert(result.d);
    //            $("#hdfTecnicoResponsable").val(result.d)
    //        },
    //        error: function (xhr, err, thrErr) {
    //            MostrarErrorAjax(xhr, err, thrErr);
    //        }
    //    });
    //} else {
    //    $("#hdfTecnicoResponsable").val('')
    //}
    //$("#tbGrid").trigger("reloadGrid");
}

function NuevaCondicion() {
    //preparar nueva condicion
    var campos = $(".CampoCondicion");
    var idLast = $($(".CampoCondicion")[campos.length - 1]).attr("id").split("_")[1];
    //alert(idLast + "; " + valCondicionActual);
    if (idLast == valCondicionActual) {
        var newNumCondicion = num + 1;
        //$("#tdCondiciones").append('<div id="dvCondicion_' + newNumCondicion + '"><table id="tbCondicion_' + newNumCondicion + '"></table></div>');
        //$("#tbCondicion_" + newNumCondicion).append('<tr id="trCondicion_' + newNumCondicion + '"></tr>');
        $("#tbCondiciones").append('<tr id="trCondicion_' + newNumCondicion + '"></tr>');
        $("#trCondicion_" + newNumCondicion).append('<td>Campos Entidad</td>');
        $("#trCondicion_" + newNumCondicion).append('<td><select id="ddlCampoEntidadCondicion_' + newNumCondicion + '" style="width:160px" class="CampoCondicion"><option value="-2">Seleccione Entidad</option></select></td>');
        $("#trCondicion_" + newNumCondicion).append('<td>Condición</td>');
        $("#trCondicion_" + newNumCondicion).append('<td><select id="ddlSimboloCondicion_' + newNumCondicion + '" style="width:100px" class="SimboloCondicion" disabled="true"></select></td>');
        $("#trCondicion_" + newNumCondicion).append('<td>Valor</td>');
        $("#trCondicion_" + newNumCondicion).append('<td><input type="text" id="txtValorCondicion_' + newNumCondicion + '" readonly="true" style="width:170px;"class="TxtValorCondicion" /><select id="ddlValorCondicion_' + newNumCondicion + '" style="width:170px;" class="DdlValorCondicion"></select></td>');
        $("#trCondicion_" + newNumCondicion).append('<td><div id="btnValorCondicion_' + newNumCondicion + '" runat="server" class="btnNormal BotonCondicion" disabled="true">...</div></td>');
        $("#trCondicion_" + newNumCondicion).append('<td><image id="imgQuitarCond_' + newNumCondicion + '" title="Quitar Condición" src="../../../Common/Images/Mantenimiento/Quitar.png" class="imgBtn"></image></td>');
        $("#ddlValorCondicion_" + newNumCondicion).hide();
        $('#btnValorCondicion_' + newNumCondicion).button();
        CargarEstilosControles();
    }
}

function NuevaCondicion1() {
    //alert(valCondicionActual + " - " + $(lstNumCond).length + " - " + lstNumCond.join(","));
    if (lstNumCond[$(lstNumCond).length - 1] == valCondicionActual || valCondicionActual == '') {
        $("#tdCondiciones").append('<div id="dvCondicion_' + numCondicion + '"><table id="tbCondicion_' + numCondicion + '" style="width:100%;"></table></div>');
        $("#tbCondicion_" + numCondicion).append('<tr id="trCondicion_' + numCondicion + '"></tr>');
        $("#trCondicion_" + numCondicion).append('<td>Campos Entidad</td>');
        $("#trCondicion_" + numCondicion).append('<td><select id="ddlCampoEntidadCondicion_' + numCondicion + '" style="width:160px" class="CampoCondicion"><option value="-1">Seleccione...</option></select></td>');
        $("#trCondicion_" + numCondicion).append('<td>Condición</td>');
        $("#trCondicion_" + numCondicion).append('<td><select id="ddlSimboloCondicion_' + numCondicion + '" style="width:100px" class="SimboloCondicion" disabled="true"></select></td>');
        $("#trCondicion_" + numCondicion).append('<td>Valor</td>');
        $("#trCondicion_" + numCondicion).append('<td><input type="text" id="txtValorCondicion_' + numCondicion + '" readonly="true" style="width:160px;"class="TxtValorCondicion" disabled="true"/><input type="hidden" id="hdfValorCondicion_' + numCondicion + '" /><input type="hidden" id="hdfValorCampRelac_' + numCondicion + '" /><select id="ddlValorCondicion_' + numCondicion + '" style="width:170px;" class="DdlValorCondicion"></select></td>');
        $("#trCondicion_" + numCondicion).append('<td><div id="btnValorCondicion_' + numCondicion + '" runat="server" class="btnNormal BotonCondicion">...</div></td>');
        $("#trCondicion_" + numCondicion).append('<td style="width:20px;"><image id="imgQuitarCond_' + numCondicion + '" title="Quitar Condición" src="../../../Common/Images/Mantenimiento/Quitar.png" class="imgBtn BtnQuitarCondicion"></image></td>');
        $("#ddlValorCondicion_" + numCondicion).hide();

        //ocultar boton quitar de condicion creada
        $("#imgQuitarCond_" + numCondicion).hide();
        //mostrar boton quitar condicion de condicion anterior
        $("#imgQuitarCond_" + lstNumCond[lstNumCond.length - 1]).show();

        $('#btnValorCondicion_' + numCondicion).button();
        $('#btnValorCondicion_' + numCondicion).button("option", "disabled", true);
        CargarEstilosControles();
        //cargar combo campos
        var lstKeysCampos = Object.keys(Campos);
        for (var i = 0; i < $(lstKeysCampos).length; i++) {
            var valueddl = Campos[lstKeysCampos[i]].P_inCod;
            var textoddl = Campos[lstKeysCampos[i]].vcDes;
            $("#ddlCampoEntidadCondicion_" + numCondicion).append($('<option></option>').val(valueddl).html(textoddl));
        }
        lstNumCond.push(numCondicion);
        numCondicion = numCondicion + 1;
    }
}

function LimpiarDivReferencia() {
    $("#ddlEntidadReferencia").val("-1");
    $("#tdCondiciones").html('');
    $("#ddlCampoEntidad").html('');
    $("#ddlCampoEntidad").append($("<option></option>").val("-2").html("Seleccione Entidad"));
    //$("#ddlCampoEntidad").html('');
    //$("#ddlCampoEntidadCondicion_0").html('');
    //$("#ddlCampoEntidadCondicion_0").append('<option value="-1">Seleccione...</option>');
    //$("#ddlSimboloCondicion_0").html('');
    //$("#ddlSimboloCondicion_0").attr("disabled", true);
    //$("#btnValorCondicion_" + numCondicion).button("option", "disabled", true);
}

function DeshabilitarDivReferencia() {
    $("#ddlEntidadReferencia").attr("disabled", true);
    $("#ddlCampoEntidad").attr("disabled", true);
    $(".CampoCondicion").attr("disabled", true);
    $(".SimboloCondicion").attr("disabled", true);
    $(".DdlValorCondicion").attr("disabled", true);
    $("input[name=rbtTipoValor]").attr("disabled", true);
    $("#ddlCampoTipSol").attr("disabled", true);
    $("#txtValorEstatico").attr("disabled", true);
    //$("#ddlEntidadRelacion").attr("disabled", true);
    $("#ddlCampoRelacion").attr("disabled", true);
    $("#txtValorCampoRelacion").attr("disabled", true);
    $(".BtnQuitarCondicion").hide();
    $("#btnAgregarValorCondicion").hide();
    $("#lblBtnCancelarCondicion").text("Cerrar");
}

function ListarParametros(Grupo, ValDefault) {
    $.ajax({
        type: "POST",
        url: "Adm_ProcesarSolicitud.aspx/ListarParametros",
        data: "{'vcGrupo': '" + Grupo + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            var Parametros;
            switch (Grupo) {
                case 'ValidMensaje_Count':
                    $("#ddlTipoValidMensaje").html('');
                    $("#ddlTipoValidMensaje").append($('<option></option>').val('-1').text('Seleccione...').attr("desc", ""));
                    for (var i = 0; i < result.d.length; i++) {
                        Parametros = result.d[i];
                        $("#ddlTipoValidMensaje").append($('<option></option>').val(Parametros.Clave).text(Parametros.Valor).attr("desc", Parametros.Descripcion));
                    }
                    $("#ddlTipoValidMensaje").val(ValDefault);
                    $("#lblDescTipoValidMensaje").text($("#ddlTipoValidMensaje option[value= '" + $("#ddlTipoValidMensaje").val() + "']").attr("desc"));
                    break;
                case 'ValidAdjuntos_Peso':
                    $("#ddlTamTip_Adj").html('');
                    $("#ddlTamTip_Adj").append($('<option></option>').val('-1').text('Ninguno').attr("desc", ""));
                    for (var i = 0; i < result.d.length; i++) {
                        Parametros = result.d[i];
                        $("#ddlTamTip_Adj").append($('<option></option>').val(Parametros.Clave).text(Parametros.Valor).attr("desc", Parametros.Descripcion));
                    }
                    $("#ddlTamTip_Adj").val(ValDefault);
                    $("#lblDescValidTamTipAdjunto").text($("#ddlTamTip_Adj option[value= '" + $("#ddlTamTip_Adj").val() + "']").attr("desc"));
                    break;
                case 'TipoDest_CorDev':
                    $("#ddlTipoDestinatario").html('');
                    for (var i = 0; i < result.d.length; i++) {
                        Parametros = result.d[i];
                        $("#ddlTipoDestinatario").append($('<option></option>').val(Parametros.Clave).text(Parametros.Valor));
                    }
                    $("#ddlTipoDestinatario").val(ValDefault);
                    break;
                default:
                    alertaExterna("Datos incorrectos al listar parametros");
            }
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
}

function LimpiarValorCondicion() {
    //limpiar
    $("#rbtCampoTipSol").attr("checked", false);
    $("#rbtValorEstatico").attr("checked", false);
    $("#rbtValorDinamico").attr("checked", false);
    //valor de solicitud
    $("#ddlCampoTipSol").attr("disabled", true);
    $("#ddlCampoTipSol").val("-1");
    //valor estatico
    $("#txtValorEstatico").attr("disabled", true);
    $("#txtValorEstatico").val("");
    //valor dinamico
    $("#ddlCampoRelacion").attr("disabled", true);
    $("#ddlCampoRelacion").html('');
    $("#txtValorCampoRelacion").attr("disabled", true);
    $("#txtValorCampoRelacion").val('');
}

function fnCargarSolicitudesEnConflictoPaginado() {
    var inPagTam = $("#tblSolicitudesAfectadas").getGridParam("rowNum");
    var inPagAct = $("#tblSolicitudesAfectadas").getGridParam("page");
    if (XMLCamposPorEstadoProceso != '') {
        $.ajax({
            type: "POST",
            url: "Adm_SolicitudesConfiguracion.aspx/ListarSolicitudesEnConflicto_Busqueda",
            data: "{'inCodTipSol':'" + $("#hdfCodTipSol").val() + "'," +
                "'XMLCamposPorEstadoProceso':'" + XMLCamposPorEstadoProceso + "'," +
                "'inPagTam':'" + inPagTam + "'," +
                "'inPagAct':'" + inPagAct + "'," +
                "'paramBusq':'" + $("#txtBusquedaSolDev").val().replace(/'/g, "&#39") + "'," +
                "'XMLCampos':'" + XMLCampos + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                $("#tblSolicitudesAfectadas").jqGrid('clearGridData');
                if (result.d.Items[0].ID > '0') {
                    $("#tblSolicitudesAfectadas")[0].addJSONData(result.d);
                }
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            }
        });
    }
}

function fnGuardarTipoSolicitud(vcNomTip, vcDesTip, inIdFinanciamiento, biUsaDri, inLinTip, vcPrefijo, vcResApr, biPropie,
biUsuEsp, biResAre, XMLCampos, XMLCamposPorEstadoProceso, inNumCam, XMLMensajePorEstado, XMLParametros, XMLUmbralEstado,
XMLReglaEstado, XMLCamposCondicion, XMLDetalleCaptura, vcCodTipsol, biMonFij, inTecnicoResponsable, esDevolucion,
dcMonto, biActivo, vcNomArcCon, vcLstCodSol, XMLMensajeDevolucion) {
    var dataJSON = { vcNomTip: vcNomTip,
        vcDesTip: vcDesTip,
        inIdFinanciamiento: inIdFinanciamiento,
        biUsaDri: biUsaDri,
        inLinTip: inLinTip,
        vcPrefijo: vcPrefijo,
        vcResApr: vcResApr,
        biPropie: biPropie,
        biUsuEsp: biUsuEsp,
        biResAre: biResAre,
        XMLCampos: XMLCampos,
        XMLCamposPorEstadoProceso: XMLCamposPorEstadoProceso,
        inNumCam: inNumCam,
        XMLMensajePorEstado: XMLMensajePorEstado,
        XMLParametros: XMLParametros,
        XMLUmbralEstado: XMLUmbralEstado,
        XMLReglaEstado: XMLReglaEstado,
        XMLCamposCondicion: XMLCamposCondicion,
        XMLDetalleCaptura: XMLDetalleCaptura,
        vcCodTipsol: vcCodTipsol,
        biMonFij: biMonFij,
        inTecnicoResponsable: inTecnicoResponsable,
        esDevolucion: esDevolucion,
        dcMonto: dcMonto,
        biActivo: biActivo,
        vcNomArcCon: vcNomArcCon,
        vcLstCodSol: vcLstCodSol,
        XMLMensajeDevolucion: XMLMensajeDevolucion //.replace(new RegExp('<br/>', 'g'), '\n')
    };

    $.ajax({
        type: "POST",
        url: "Adm_SolicitudesConfiguracion.aspx/Guardar",
        data: JSON.stringify(dataJSON),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
            if (msg.d == "0") {
                alertaExterna("El nombre del tipo de solicitud ya existe.");
            } else if (msg.d == "-1") {
                alertaExterna("El prefijo de solicitud ya existe.");
            } else if (msg.d == "-20") { //JHERRERA 20150120: Validación de responsable de aprobación (viene de otro método por eso el valor -20 es bastante alto)
                alertaExterna("No se pudo asignar el perfil 'Responsable De Aprobación' al usuario específico agregado ya que no cuenta con un usuario de acceso. Asigne un empleado que cuente con un usuario de login, o solicite la creación de este antes de guardar esta configuración.");
            } else {
                window.parent.ActualizarGrilla();
                window.scrollTo(0, 0);
                Mensaje("<br/><h1>Tipo de Solicitud Guardado.<br/>Para aplicar los cambios, debe volver a iniciar sesión.</h1><br/>", document, CerroMensaje);
            }
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
}

function CerroMensaje() {
    BloquearPagina(false);
    //window.parent.tab.tabs("remove", window.parent.tab.tabs("option", "selected"));
    window.parent.tab.tabs("remove", indiceTab);
};


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

function fnCargarDatosCorreoServicio(IdTipoSolicitud) {
    $.ajax({
        type: "POST",
        url: "Adm_SolicitudesConfiguracion.aspx/ListarDatosCorreoServicio",
        data: "{'IdTipoSolicitud': '" + IdTipoSolicitud + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            //cargar grilla parametros
            var vParametros = result.d[0];
            var vValoresCor = result.d[1];
            for (var i = 0; i < vParametros.length; i++) {
                var vClave, vNombre, vDescripcion, vIdParametro, vDetalle;
                vClave = vParametros[i].Variable;
                vNombre = vParametros[i].NombreCampo;
                vDescripcion = vParametros[i].Descripcion;
                vDetalle = vParametros[i].Detalle;
                var vData = {
                    Clave: vClave, Nombre: vNombre, Descripcion: vDescripcion, IdParametro: vIdParametro, Detalle: vDetalle
                }

                $("#tbParametrosSrv").jqGrid('addRowData', vClave, vData);

                $("#ddlParametrosSrv").append($("<option></option>").val(vClave).text(vDescripcion));
            }

            //cargar datos de mensaje
            $("#txtAsuntoSrv").val(vValoresCor.Asunto);
            //$("#txtMensajeSrv").val(vValoresCor.Mensaje);
            $("#txtMensajeSrv").data("kendoEditor").value(vValoresCor.Mensaje);
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
}

function fnInsertarTextoEnKendoEditor(nombreControl, texto) {
    var editor = $("#" + nombreControl).data("kendoEditor");
    editor.exec("inserthtml", { value: texto });
}