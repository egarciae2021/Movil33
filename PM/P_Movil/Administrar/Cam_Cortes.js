
var tab;
var MargenFiltro = 0;
var MargenHeight = 48;
var inIdCorte = "";
var idSeleccionado = null;
var TamanoPagina = [10, 20, 30];
var inAltGrid;
var inFilas;
var dialogoAdministrador;

function ActualizarGrilla(idCorte) {
    inIdCorte = idCorte;
    $("#grid").trigger("reloadGrid");
}

$(function () {

    inAltGrid = $(window).height() - 168 - MargenFiltro * MargenHeight;

    //            $("input:checkbox,input:radio,input:file").uniform();
    $("#tblCorreo").buttonset();
    $("#tblReporte").buttonset();
    $("#tblAcciones").buttonset();
    $(".ui-button-text").css({ padding: 4, width: 22 });

    $("#ddlOperador,#ddlCampana").change(function () {
        $("#grid").trigger("reloadGrid");
    });

    tab = $("#TabDetalle").tabs({
        tabTemplate: "<li><a href='#{href}'>#{label}</a> <span class='ui-icon ui-icon-close'>Remover Tab</span></li>",
        //fx: { height: 'toggle', duration: 800 },
        add: function (event, ui) {
            var ifra = document.createElement('IFRAME');
            ifra.width = "100%";
            ifra.height = "100%";
            ifra.setAttribute("margin-top", "0px");
            ifra.setAttribute("margin-left", "0px");
            ifra.setAttribute("margin-bottom", "0px");
            ifra.setAttribute("margin-right", "0px");
            ifra.setAttribute("padding-top", "0px");
            ifra.setAttribute("padding-left", "0px");
            ifra.setAttribute("padding-bottom", "0px");
            ifra.setAttribute("padding-right", "0px");
            ifra.src = pagina;
            ifra.frameBorder = "0";
            ifra.className = "SinBordes";
            $(ui.panel).append(ifra);
            $(this).tabs('select', '#' + ui.panel.id);
            pagina = "";
        }
    });

    function SatisfactoriaEnvioOperador(result) {
        //if (result == "1") {
        ActualizarGrilla($("#grid").jqGrid('getRowData', $("#grid").jqGrid('getGridParam', 'selrow')).IdCorte);
        Mensaje("<h1>El Corte ha sido aprobado y pasado al estado enviado al operador, ya no podrá ser modificado</h1>", document, CerroMensaje);
        //                }
        //                else {
        //                    ActualizarGrilla($("#grid").jqGrid('getRowData', $("#grid").jqGrid('getGridParam', 'selrow')).IdCorte);      
        //                    alerta("Este registro ya fue enviado al operador");
        //                }
    }

    function CerroMensaje() {
    }

    function ErrorEnvioOperador() {
    }

    function EnvioOperador(id, RenovacionConEquipo, Situacion) {
        var id = $("#grid").jqGrid('getRowData', $("#grid").jqGrid('getGridParam', 'selrow')).IdCorte;
        var Situacion = $("#grid").jqGrid('getRowData', $("#grid").jqGrid('getGridParam', 'selrow')).Situacion;
        var Estado = $("#grid").jqGrid('getRowData', $("#grid").jqGrid('getGridParam', 'selrow')).Estado;

        //var Metodo = raiz("P_Movil/Administrar/Cam_CortesEnvio.aspx/EnvioOperador");
        var Metodo = "Cam_CortesEnvio.aspx/EnvioOperador";
        var Data = {
            IdCorte: id, //Serializa JSON MODELO
            Situacion: Situacion
        };
        MetodoWeb(Metodo, JSON.stringify(Data), SatisfactoriaEnvioOperador, ErrorEnvioOperador);
        //                $('#ifEnvio').attr("src", "Cam_CortesEnvio.aspx?IdCorte=" + id + "&RenovacionConEquipo=" + RenovacionConEquipo.toString() + "&Situacion=" + Situacion);
        //                formulario = $('#dvEnvio').dialog({
        //                    title: "Envio al Operador",
        //                    height: 300,
        //                    width: 530,
        //                    modal: true
        //                });
    }

    $("#btnEnviarOperador").live("click", function () {
        id = $("#grid").jqGrid('getRowData', $("#grid").jqGrid('getGridParam', 'selrow')).IdCorte;
        var situacion = $("#grid").jqGrid('getRowData', $("#grid").jqGrid('getGridParam', 'selrow')).Situacion;
        var Estado = $("#grid").jqGrid('getRowData', $("#grid").jqGrid('getGridParam', 'selrow')).Estado;

        if (id != null && Estado != "Enviado Operador" && Estado != "Cancelado") {
            confirmacion("Se le cambiará el estado a enviado al operador a todos los pedidos ", EnvioOperador, null, "Mensaje de Confirmación");
            //                    if (situacion == 'Renovacion' || situacion == 'Renovación') {
            //                        $('#dvOpcionRenovacion').dialog({
            //                            title: "Reporte de Renovación",
            //                            modal: true,
            //                            buttons: {
            //                                "Exportar": function () {
            //                                    EnvioOperador(id, $("input[name='rblstRenovacion']:checked").val(), situacion);
            //                                    $(this).dialog("close");
            //                                },
            //                                "Cancelar": function () {
            //                                    $(this).dialog("close");
            //                                }
            //                            }
            //                        });
            //                    }
            //                    else {
            //                        EnvioOperador(id, "True", situacion);
            //                    }
        }
        else if (Estado == "Enviado Operador") {
            alerta("Este registro ya fue enviado al operador.");
            return;
        }
        else if (Estado == "Cancelado") {
            alerta("Un corte cancelado no puede ser enviado al operador.");
            return;
        } else {
            alerta("Seleccione un registro.");
            return;
        }
    });

    function NumeroInicialFilas() {
        var nuAltoFila = 23.04;
        inFilas = Math.floor(inAltGrid / nuAltoFila);
    }

    var tblGrupo = $("#grid").jqGrid({
        sortable: true,
        datatype: "local",
        datatype: function () {
            $.ajax({
                url: "Cam_Cortes.aspx/Listar", //PageMethod
                data: "{'inPagTam':'" + $('#grid').getGridParam("rowNum") + "'," +
                              "'inPagAct':'" + parseInt($('#grid').getGridParam("page")) + "'," +
                              "'vcOrdCol':'" + $('#grid').getGridParam("sortname") + "'," + //Nombre de columna ordenado
                              "'vcTipOrdCol':'" + $('#grid').getGridParam("sortorder") + "'," + //Tipo de orden de columna asc, desc
                              "'inIdCampana': '" + $("#ddlCampana").val() + "'," +
                              "'inIdOperador':'" + $("#ddlOperador").val() + "'}",
                dataType: "json",
                type: "post",
                contentType: "application/json; charset=utf-8",
                success: function (result) {
                    //$("#tblPoliticaSolicitudxGrupo").trigger("reloadGrid");
                    $("#grid")[0].addJSONData(result.d);
                    //$("#tblPoliticaSolicitudxGrupo").jqGrid('addRowData', result.d[0].P_vcCod, result.d[0]);

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
                id: "IdCorte"
            },
        colModel: [{ name: 'IdCampana', index: 'IdCampana', label: 'IdCampana', hidden: true },
                       { name: 'IdCorte', index: 'IdCorte', label: 'IdCorte', hidden: true },
   		               { name: 'vcNomCam', index: 'vcNomCam', label: 'Campaña', hidden: false, width: 200 },
                       { name: 'NumeroItem', index: 'NumeroItem', label: 'Número de Ítem', hidden: false, width: 60, align: 'right' },
                       { name: 'Fecha', index: 'Fecha', label: 'Fecha', hidden: false, width: 100, align: 'center' },
                       { name: 'NumeroPedidos', index: 'NumeroPedidos', label: 'Número de Pedidos', hidden: false, width: 100, align: 'right' },
                       { name: 'Situacion', index: 'Situacion', label: 'Situación', hidden: false, width: 100 },
        //{ name: 'EnvioCorreoUsuario', index: 'EnvioCorreoUsuario', label: '', hidden: true, width: 100 },
                       {name: 'EnvioCorreoUsuario', index: 'EnvioCorreoUsuario', label: 'Envío de Correo Usuario', hidden: false, width: 100, align: 'center',
                       formatter: function (value, options, rData) {
                           if (rData[7] == "False" && rData[8] == "Enviado Operador") {
                               return "<div id='btnEnviarUsuario_" + rData[1] + "' class='btnNormal btnEnviarUsuario' title='Enviar Correo'>" +
                                        "<img alt='Enviar Correo' src='../../Common/Images/Mantenimiento/enviarcorreousuario.png'/><a>Enviar</a></div>";
                           }
                           else if (rData[8] != "Enviado Operador") {
                               return "-------";
                           }
                           else {
                               return "Enviado";
                           }
                       }
                   },
                       { name: 'Estado', index: 'Estado', label: 'Estado', hidden: false, width: 100 },
                       { name: 'Cancelable', index: 'Cancelable', label: '', hidden: true, width: 100 }
   	                  ],
        pager: "#pager", //Pager.
        loadtext: 'Cargando datos...',
        recordtext: "{0} - {1} de {2} elementos",
        emptyrecords: 'No hay resultados',
        pgtext: 'Pág: {0} de {1}', //Paging input control text format.
        rowNum: inFilas, //$("#hdfTamPag").val(), //"10" PageSize.
        rowList: TamanoPagina,  //TamanosPaginaSel, //Variable PageSize DropDownList. 
        sortname: "Fecha", //sortname: idTabla, //Default SortColumn
        sortorder: "desc", //Default SortOrder.
        rownumbers: true,
        shrinkToFit: false,
        ondblClickRow: function (id) { },
        onSelectRow: function (id) {
        },
        sortable: function (permutation) {
            //var colModels = $("#grid").getGridParam("colModel");
            //alert(colModels);
        },
        resizeStop: function (width, index) {
            //alerta("resize column " + index + " to " + width + "pixels");
        },
        afterInsertRow: function (rowid, aData, rowelem) {
            $(".btnNormal").button();
            if (aData.btVig == 'False') {
                var colModels = $("#tblPoliticaSolicitudxGrupo").getGridParam("colModel");
                for (i in colModels) {
                    $("#tblPoliticaSolicitudxGrupo").jqGrid('setCell', rowid, i, '', { color: 'red' });
                }
            }
        },
        //onSortCol: function(name,index){  alerta("Column Name: "+name+" Column Index: "+index); },
        ondblClickRow: function (id) {
            $("#grid").jqGrid('resetSelection');
            $("#grid").jqGrid('setSelection', id);
            EditaRegistro(id);
        },
        gridComplete: function () {
            if (inIdCorte != "") {
                var ids = $("#grid").jqGrid('getDataIDs');
                var i = 0;
                for (i = 0; i < ids.length; i++) {
                    var datos = $("#grid").jqGrid('getRowData', ids[i]);
                    if (datos.IdCorte == inIdCorte) {
                        $("#grid").jqGrid('setSelection', ids[i], true);
                        //btnEnviarOperador.click();
                    }
                }
                inIdCorte = "";
            }
        }
    }).navGrid("#pager", { edit: false, add: false, search: false, del: false });

    inicioPagina();
    function inicioPagina() {
        DimPosElementos();
    }

    $(window).resize(function () {
        DimPosElementos();
        NumeroInicialFilas();
    });

    function DimPosElementos() {
        var Ancho = $(window).width();
        var Alto = $(window).height();
        var AnchoLateral = $(".LateralSplitter");
        $(".tabs").css({ height: Alto - 23, width: Ancho - AnchoLateral, marginbotton: 0, paddingbotton: 0 });

        $(".Splitter").css({ height: Alto - 18 });
        inAltGrid = $(window).height() - 168 - MargenFiltro * MargenHeight;
        $("#grid").setGridWidth($(window).width() - 31);
        $("#grid").setGridHeight(inAltGrid);
    }

    $("#TabDetalle span.ui-icon-close").live("click", function () {
        var index = $("li", tab).index($(this).parent());
        tab.tabs("remove", index);
    });

    $("#btnAgregar").live("click", function () {
        pagina = "Cam_CortesNuevo.aspx";
        var Id = "#" + $("#hdfvcTab").val() + "_Tab_Nuevo";
        var $panel = tab.find(Id);
        if (!$panel.length) {//En el caso que no exista el tab, lo crea
            tab.tabs("add", Id, "Nuevo");
            $(Id).css("width", "99%");
            $(Id).css("height", "92%");
            $(Id).css("margin-top", "0px");
            $(Id).css("margin-left", "0px");
            $(Id).css("margin-bottom", "0px");
            $(Id).css("margin-right", "0px");
            $(Id).css("padding-top", "0px");
            $(Id).css("padding-left", "0px");
            $(Id).css("padding-bottom", "0px");
            $(Id).css("padding-right", "0px");
        }
        else {//En el caso que exista lo muestra
            tab.tabs('select', Id);
        }
    });

    $("#btnEditar").live("click", function () {
        EditarRegistro();
    });

    function EditaRegistro(id) {
        pagina = $("#btnEditar").attr("url");
        if (pagina != "") {
            idSeleccionado = id;
            EditarRegistro();
        }
    }

    function EditarRegistro() {
        pagina = "Cam_CortesNuevo.aspx";
        var id = null;
        if (idSeleccionado == null) {
            id = $("#grid").jqGrid('getGridParam', 'selrow');
            if (id == null) {
                alerta("Seleccione un registro");
                return;
            }
        }
        else {
            id = idSeleccionado;
            idSeleccionado = null;
        }

        if (id) {
            var IdTab = "#" + $("#hdfvcTab").val() + "_Tab_Editar";
            var $panel = tab.find(IdTab);
            var idTabla = "IdCorte";

            var ids = idTabla.split(",");
            var idsParametro = "";
            var idsValor = "";
            var datos = $("#grid").jqGrid('getRowData', id);
            for (i in ids) {
                if (idsParametro != "") {
                    idsParametro += ",";
                    idsValor += "-";
                }
                idsParametro += ids[i];
                idsValor += datos[ids[i]];
            }

            if (!$panel.length) {//En el caso que no exista el tab, lo crea
                pagina += "?Cod=" + idsValor;
                tab.tabs("add", IdTab, "Ver Detalle");
                $(IdTab).css("width", "99%");
                $(IdTab).css("height", "94%");
                $(IdTab).css("margin-top", "0px");
                $(IdTab).css("margin-left", "0px");
                $(IdTab).css("margin-bottom", "0px");
                $(IdTab).css("margin-right", "0px");
                $(IdTab).css("padding-top", "0px");
                $(IdTab).css("padding-left", "0px");
                $(IdTab).css("padding-bottom", "0px");
                $(IdTab).css("padding-right", "0px");
            }
            else {//En el caso que exista lo muestra
                if (vcCod == id) {//Si el codigo anterior seleccionado es igual al actual
                    tab.tabs("remove", $panel.index() - 1);
                    pagina += "?Cod=" + idsValor + "&Par=" + idsParametro;
                    tab.tabs("add", IdTab, "Editar");
                    $(IdTab).css("width", "99%");
                    $(IdTab).css("height", "94%");
                    $(IdTab).css("margin-top", "0px");
                    $(IdTab).css("margin-left", "0px");
                    $(IdTab).css("margin-bottom", "0px");
                    $(IdTab).css("margin-right", "0px");
                    $(IdTab).css("padding-top", "0px");
                    $(IdTab).css("padding-left", "0px");
                    $(IdTab).css("padding-bottom", "0px");
                    $(IdTab).css("padding-right", "0px");
                    //tab.tabs('select', IdTab);
                }
                else {
                    tab.tabs("remove", $panel.index() - 1);
                    pagina += "?Cod=" + idsValor + "&Par=" + idsParametro;
                    tab.tabs("add", IdTab, "Editar");
                    $(IdTab).css("width", "99%");
                    $(IdTab).css("height", "94%");
                    $(IdTab).css("margin-top", "0px");
                    $(IdTab).css("margin-left", "0px");
                    $(IdTab).css("margin-bottom", "0px");
                    $(IdTab).css("margin-right", "0px");
                    $(IdTab).css("padding-top", "0px");
                    $(IdTab).css("padding-left", "0px");
                    $(IdTab).css("padding-bottom", "0px");
                    $(IdTab).css("padding-right", "0px");
                }
            }
            vcCod = id;
        }
        else {
            alerta("Seleccione un registro");
        }
    }

    function EnviarUsuario(IdCorte) {
        var Metodo = "Cam_Cortes.aspx/EnviarCorreoUsuario";
        var Data = {
            IdCorte: IdCorte
        };
        MetodoWeb(Metodo, JSON.stringify(Data), EnviaUsuarioSatisfactorio, EnviaUsuarioError);
    }
    function EnviaUsuarioSatisfactorio() {
        Mensaje("<br/><h1>Se genero el envío de correos</h1><br/>", document, CerroMensaje);
        $("#grid").trigger("reloadGrid");
    }
    function CerroMensaje() { }
    function EnviaUsuarioError() {
        alerta("Hubo un problema al enviar las notificaciones a los usuarios, vuelva a intentarlo o comuniquese con soporte");
    }

    $(".btnEnviarUsuario").live("click", function () {
        EnviarUsuario($(this).attr("id").toString().split("_")[1]);
    });

    $("#btnEnviarUsuario").live("click", function () {
        id = $("#grid").jqGrid('getRowData', $("#grid").jqGrid('getGridParam', 'selrow')).IdCorte;
        var Estado = $("#grid").jqGrid('getRowData', $("#grid").jqGrid('getGridParam', 'selrow')).Estado;
        var EstadoEnvio = $("#grid").jqGrid('getRowData', $("#grid").jqGrid('getGridParam', 'selrow')).EnvioCorreoUsuario;
        if (Estado != "Enviado Operador") {
            alerta("Se tiene que enviar al operador para poder hacer el envio a los usuarios");
            return;
        }
        if (EstadoEnvio == "Enviado") {
            alerta("El correo a los usuarios ya fue enviado");
            return;
        }

        if (id != null) {
            EnviarUsuario(id);
        } else {
            alerta("Seleccione un registro");
        }
    });

    $("#btnReporte").live("click", function () {
        id = $("#grid").jqGrid('getRowData', $("#grid").jqGrid('getGridParam', 'selrow')).IdCorte;
        var situacion = $("#grid").jqGrid('getRowData', $("#grid").jqGrid('getGridParam', 'selrow')).Situacion;
        if (id != null) {
            if (situacion == 'Renovacion' || situacion == 'Renovación') {
                $('#dvOpcionRenovacion').dialog({
                    title: "Reporte de Renovación",
                    modal: true,
                    buttons: {
                        "Exportar": function () {
                            AbrirReporte($("input[name='rblstRenovacion']:checked").val());
                            $(this).dialog("close");
                        },
                        "Cancelar": function () {
                            $(this).dialog("close");
                        }
                    }
                });
            }
            else {
                AbrirReporte("True");
            }
        } else {
            alerta("Seleccione un registro");
        }
    });

    function AbrirReporte(RenovacionConEquipo) {
        //            var pagina = "Cam_Cortes.aspx" + "?IdCorte=" + id + "&RenovacionConEquipo=" + RenovacionConEquipo.toString();
        //            $("#ifReporte").attr("src", pagina);

        var Metodo = "Cam_Cortes.aspx/AbrirReporte";
        var Data = {
            IdCorte: id,
            RenovacionConEquipo: RenovacionConEquipo.toString()
        };
        MetodoWeb(Metodo, JSON.stringify(Data), AbrirReporteSatisfactorio, AbrirReporteError);
    }

    function AbrirReporteSatisfactorio() {
        btnExportarExcel_eegReporte();
    }

    function AbrirReporteError() {
        alerta("No se pudo generar el reporte, vuelva a intentarlo o comuniquese con el area de soporte.");
    }

    $("#btnCancelar").click(function () {
        var id = $("#grid").jqGrid('getRowData', $("#grid").jqGrid('getGridParam', 'selrow')).IdCorte;
        if (id != null) {
            var Cancelable = $("#grid").jqGrid('getRowData', $("#grid").jqGrid('getGridParam', 'selrow')).Cancelable;
            var Estado = $("#grid").jqGrid('getRowData', $("#grid").jqGrid('getGridParam', 'selrow')).Estado;

            if (Cancelable == 1) {
                confirmacion("¿Desea cancelar el corte seleccionado?", CancelarCorteVerificaAdministrador, null, "Confirmación");
            }
            else {
                alerta("El estado " + Estado + ", no puede ser cancelado");
            }
        }
        else {
            alerta("Seleccione un registro");
        }
    });

    function VerificaAdministrador() {
        $.ajax({
            //url: raiz("Common/WebService/General.asmx/VerificarAdministrador"), //PageMethod
            url: "../../Common/WebService/General.asmx/VerificarAdministrador",
            data: "{'Usuario':'" + $('#txtUsuarioPermisoAdministrador').val() + "'," +
                       "'Password': '" + $("#txtPasswordPermisoAdministrador").val() + "'}",
            dataType: "json",
            type: "post",
            contentType: "application/json; charset=utf-8",
            success: function (result) {
                if (result.d == "0") {
                    CancelarCorte();
                    dialogoAdministrador.dialog("close");
                }
                else if (result.d == "1") {
                    alerta("Usuario Invalido");
                    $("#txtPasswordPermisoAdministrador").focus();
                }
                else if (result.d == "2") {
                    alerta("Contraseña Invalida");
                    $("#txtPasswordPermisoAdministrador").focus();
                }
                else if (result.d == "3") {
                    alerta("Usuario sin Privilegios de Administrador");
                    $("#txtPasswordPermisoAdministrador").focus();
                }
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            }
        });
    }

    function CancelarCorteVerificaAdministrador() {
        $.ajax({
            //url: raiz("Common/WebService/General.asmx/VerificarPerfilAdministrador"), //PageMethod
            url: "../../Common/WebService/General.asmx/VerificarPerfilAdministrador",
            data: "{}",
            dataType: "json",
            type: "post",
            contentType: "application/json; charset=utf-8",
            success: function (result) {
                if (result.d == "1") {
                    CancelarCorte();
                }
                else {
                    $('#txtPasswordPermisoAdministrador').val("");
                    $('#txtPasswordPermisoAdministrador').focus();

                    dialogoAdministrador = $('#dvPermisoAdministrador').dialog({
                        title: "Seguridad del Sistema",
                        modal: true,
                        buttons: {
                            "Aceptar": function () {
                                VerificaAdministrador();
                            },
                            "Cancelar": function () {
                                $(this).dialog("close");
                            }
                        }
                    });
                }
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            }
        });
    }
    function CancelarCorte() {
        var IdCorte = $("#grid").jqGrid('getRowData', $("#grid").jqGrid('getGridParam', 'selrow')).IdCorte;
        $.ajax({
            url: "Cam_Cortes.aspx/Cancelar", //PageMethod
            data: "{'IdCorte':'" + IdCorte + "'}",
            dataType: "json",
            type: "post",
            contentType: "application/json; charset=utf-8",
            success: function (result) {
                $("#grid").trigger("reloadGrid");
                Mensaje("<br/><h1>Se cancelo el registro seleccionado</h1><br/>", document, CerroMensaje);
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            }
        });
    }

    $('#txtUsuarioPermisoAdministrador').live("keydown", function (e) {
        if (e.keyCode == 13) {
            $("#txtPasswordPermisoAdministrador").focus();
            return false; // prevent the button click from happening
        }
    });
    $('#txtPasswordPermisoAdministrador').live("keydown", function (e) {
        if (e.keyCode == 13) {
            VerificaAdministrador();
            return false; // prevent the button click from happening
        }
    });
});
    