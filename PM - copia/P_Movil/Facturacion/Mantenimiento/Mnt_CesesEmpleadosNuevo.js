var oCulturaUsuario;
var indiceTab = window.parent.tab.tabs("option", "selected");
var p_idEmpleado;
var listaEstados = [];
var _id;
var oCulturaUsuario;
var dcPenalidad = 0;
var dcSubTotal = 0;
var btOpcion = false;
var listaDeudas = [];
var pagAct;
var totPag;
var totReg;
var subTotalCuotas = 0;
var subTotalPagos = 0;
var subTotalCargos = 0;
var estadoCuentaAnt = 0;
var dcImporteTotal = 0;
var dcMontoCobrar = 0;
var strBaja_Lineas = "";
var strBaja_Penalidad = "";
var strLineas = "";
var strLineasConEquipo = "";
var SelEmpTrans = false;
var TotalCuotasProgramadas = 0;

var UsaComprobante = false; //oculta la posibilidad de generar el cese con comprobante, oculta informacion de comprobantes en la grilla de deudas, envía el cese con valor EmitirComprobante = 0

$(document).on('ready', function () {
    oCulturaUsuario = window.parent.parent.oCulturaUsuario;

    if (!UsaComprobante) {
        $("#dvEmitir").hide();
    }

    kendo.culture("es-PE");
    altoPagina = $(window).height();
    var AltoGrilla = 0;
    AltoGrilla = altoPagina - 320;
    if (AltoGrilla <= 0) {
        AltoGrilla = 250;
    }

    var date = new Date();
    var fechaMax = new Date(date.getFullYear(), date.getMonth() + 2, 0);
    var start = $("#txtFechaCese").kendoDatePicker({
    }).data("kendoDatePicker");
    start.min(date);
    start.max(fechaMax);

    var startFechaPago = $("#txtFechaPago").kendoDatePicker({
    }).data("kendoDatePicker");
    startFechaPago.min(date);
    startFechaPago.max(date);

    $("#txtFechaCese, #txtFechaPago").live("keypress", function (e) {
        return ValidarCaracteresFormatoFecha_Y_Hora(e);
    });

    $("#txtFechaPago").button("option", "disabled", true);



    Inicio();
    function Inicio() {

        $("#lblDenomMoneda").text(oCulturaUsuario.Moneda.vcNomLar);

        $(".bordeui").removeClass("ui-corner-all");
        $(".bordeui").css({
            "border": "none",
            "padding": "0px"
        });

        var Nuevo = $("#hdfCodigo").val();
        var Estado = $("#hdfEstado").val();
        $("#TextBox1").hide();
        if (Estado == 1 || $("#hdfHayResTec").val() == "0" || $("#hdfHayResApr").val() == "0") {

            //#region   ECONDEÑA    07/01/2015
            //            $("#btnGuardar").hide();
            //            $("#btnCerrar").hide();

            //            $("#txtEmpleado").attr("disabled", true);
            //            start.enable(false);
            //            startFechaPago.enable(false);
            //            $("#txtDescripcion").attr("disabled", true);
            //            $("#ddlTipoCese").attr("disabled", true);
            //            $("#ddlTipoCese").val($("#hdfTipoCese").val());

            //            var _IdEmpleado = $("#hdfEmpleado").val();
            //            $("#Info").hide();
            //            $(".ocul").hide();

            //            if ($("#hdfHayResTec").val() == "0") {
            //                $("#bpTecnicoResponsable_txtValorBusqueda").attr('disabled', 'disabled');
            //                $("#bpTecnicoResponsable_imgBusqueda").hide();
            //                $("#lblMensaje").text("La configuración del tipo de solicitud de Cesión está incompleta. Falta asignar un técnico responsable al tipo de solicitud.");
            //            }
            //            if ($("#hdfHayResApr").val() == "0") {
            //                $("#bpTecnicoResponsable_txtValorBusqueda").attr('disabled', 'disabled');
            //                $("#bpTecnicoResponsable_imgBusqueda").hide();
            //                $("#lblMensaje").text("La configuración del tipo de solicitud de Cesión está incompleta. Falta asignar un responsable de aprobación al tipo de solicitud.");
            //            }
            //#endregion

        }
        else if (Estado != 1) {

            //            $("#txtEmpleado").attr("disabled", false);
            if (Nuevo != 0) {
                //                $("#txtEmpleado").attr("disabled", true);

                $(".ocul").hide();
                $("#dvContenedorTecRes").attr("disabled", true);

            }
            start.enable(true);
            startFechaPago.enable(true);
            $("#txtDescripcion").attr("disabled", false);
            //            $("#txtMontoAdeudado").attr("disabled", false);
            //            $("#ddlTipoCese").attr('disabled', false);

            try {
                $.browser.chrome = /chrom(e|ium)/.test(navigator.userAgent.toLowerCase());

                if ($.browser.chrome) {
                    $(".Alto").css({ 'height': "35px", 'width': "89px" });
                }
                else {
                    $(".Alto").css({ 'height': "30px", 'width': "90px" });
                }
            } catch (Error) {

            }
        }
    }


    $("#btnGuardar").click(function () {
        var _codEmpleado = $("#hdfTecnicoResponsable").val();
        var _fechaCese = $("#txtFechaCese").val();
        var _descripcion = $.trim($("#txtDescripcion").val());
        var _fechaRegistro = $("#txtFechaPago").val();


        if (_codEmpleado == "") {
            $("#spMensaje").text('Ingrese el empleado');
            return;
        }

        if (_descripcion == "") {
            $("#spMensaje").text('Ingrese la descripción');
            alerta("Ingrese la descripción");
            return;
        }

        var _FechaCese = $("#txtFechaCese").val().replace(/^(\s|\&nbsp;)*|(\s|\&nbsp;)*$/g, "");
        var _FechaPago = $("#txtFechaPago").val().replace(/^(\s|\&nbsp;)*|(\s|\&nbsp;)*$/g, "");

        if (_FechaCese.length < 10) {
            $("#spMensaje").text("La fecha de Cese no tiene el formato correcto dd/MM/YYYY .");
            return;
        }
        if (_FechaPago.length < 10) {
            $("#spMensaje").text("La fecha de Pago no tiene el formato correcto dd/MM/YYYY .");
            return;
        }
        dI = _FechaCese.substr(0, 2);
        mI = _FechaCese.substr(3, 2);
        yI = _FechaCese.substr(6, 4);
        if (!checkdate(mI, dI, yI)) {
            $("#spMensaje").text("La fecha de cese es inválida.");
            return;
        }
        dF = _FechaPago.substr(0, 2);
        mF = _FechaPago.substr(3, 2);
        yF = _FechaPago.substr(6, 4);
        if (!checkdate(mF, dF, yF)) {
            $("#spMensaje").text("La fecha de pago es inválida.");
            return;
        }
        else {
            $("#spMensaje").text("");
        }

        var fecIni = new Date(mI + "/" + dI + '/' + yI);

        var fecFin = new Date(mF + '/' + dF + '/' + yF);

        var fechaAux = new Date();
        var dd = fechaAux.getDate();
        var mm = fechaAux.getMonth() + 1;
        var y = fechaAux.getFullYear();


        var FechaActual = new Date(mm + '/' + dd + '/' + y);
        var FechaAnterior = new Date(mm + '/' + dd + '/' + y);
        var FechaPosterior = new Date(mm + '/' + dd + '/' + y);
        FechaAnterior.setDate(FechaAnterior.getDate() - 0);
        FechaPosterior.setDate(FechaPosterior.getDate() + 30);

        if (fecIni < FechaAnterior || fecIni > FechaPosterior) {
            $("#spMensaje").text("La fecha de cese permitida debe estar dentro de un día antes o como máximo un día despues de la fecha actual.");
            return;
        }
        else {
            $("#spMensaje").text("");
        }


        if (fecFin < FechaActual) {
            $("#spMensaje").text("La fecha de pago debe ser mayor o igual que la fecha actual");
            return;
        }
        else {
            $("#spMensaje").text("");
        }
        FechaPosterior.setDate(FechaPosterior.getDate() + 30);
        if (fecFin > FechaPosterior) {
            $("#spMensaje").text("La fecha de pago debe ser mayor o igual a la fecha actual pero  como máximo 30 días hábiles para efectuar el págo.");
            return;
        }
        else {
            $("#spMensaje").text("");
        }

        var emitirComp;
        if (UsaComprobante) {
            emitirComp = $('#chkEmitir').is(':checked');
        } else {
            emitirComp = false;
        }

        var validarDatos = true;

        //        var datos = $("#tbLineas").jqGrid('getRowData');
        var datos = $("#tbLineasEmp").jqGrid('getRowData');

        var xmlDatosLineas = "<?xml version=\"1.0\" encoding=\"ISO-8859-1\"?><DETALLE>";
        $(datos).each(function () {
            Id = this.id;
            estado = this.EstadoFinalAux;

            Linea = this.Linea;
            ConEquipo = $("#chk_" + Id).is(':checked') ? 1 : 0;  //this.ConEquipoAux != "" ? this.ConEquipoAux : 0;
            EstadoFinal = $("#ddl_Estado" + Id).val();
            //            Penalidad = EstadoFinal == '36' ? parseFloat($('#tbLineasEmp').find('tr').eq(Id).find('td').eq('10').text()) : 0; 
            if (EstadoFinal == '36') {
                Penalidad = $('#txt_' + Id).val() != undefined ? parseFloat(DevuelveNumeroSinFormato($('#txt_' + Id).val(), oCulturaUsuario, false)) : 0;
            } else {
                Penalidad = 0;
            }
            TransferidoA = EstadoFinal == '74' ? ($("#lblEmpleadoTransf_" + Id).text()).substr(0, $("#lblEmpleadoTransf_" + Id).text().lastIndexOf("=")) : "";
            FechaInicioContrato = this.FechaInicioContrato;
            FechaInicioContrato = FechaInicioContrato.substring(6, 10) + FechaInicioContrato.substring(3, 5) + FechaInicioContrato.substring(0, 2);
            FechaFinContrato = this.FechaFinContrato;
            FechaFinContrato = FechaFinContrato.substring(6, 10) + FechaFinContrato.substring(3, 5) + FechaFinContrato.substring(0, 2);
            TipoLinea = this.IdTipoLinea;
            CodContrato = $.trim(this.CodigoPedido); // this.CodigoPedido.trim();

            switch (EstadoFinal) {
                case "0":
                    alerta("Seleccionar un estado final para la línea: " + Linea + ".");
                    $("#ddl_Estado" + Id).focus();
                    validarDatos = false;
                    return;
                case "36":
                    var d = new Date();
                    var fecActual = new Date(d.getFullYear(), d.getMonth(), d.getDate());
                    var fecFin = new Date(FechaFinContrato.substring(0, 4), FechaFinContrato.substring(4, 6) - 1, FechaFinContrato.substring(6, 8));
                    if (fecFin > fecActual) {
                        if (Penalidad == 'undefined' || Penalidad <= 0) {
                            alerta("Ingrese una monto de penalidad para la línea: " + Linea + ".");
                            $("#txt_" + Id).focus();
                            validarDatos = false;
                            return;
                        }
                    } else {
                        Penalidad = 0;
                    }
                    break;
                case "74":
                    if (TransferidoA == "") {
                        alerta("Sí la linea: '" + Linea + "' va a ser 'Transferido', es obligatorio agregar un empleado para la línea.");
                        $("#btnTransferir" + Id).focus();
                        validarDatos = false;
                        return;
                    }
                    break;
                case "-1":
                    alerta("Seleccione un estado final para la línea: " + Linea);
                    validarDatos = false;
                    return;
                    break;
                default:
                    break;
            }

            xmlDatosLineas += '<DATA Linea=\"' + Linea + '\" CodContrato=\"' + CodContrato + '\" FechaInicioContrato=\"' + $.trim(FechaInicioContrato) + '\" FechaFinContrato=\"' + $.trim(FechaFinContrato) + '\" TipoLinea=\"' + $.trim(TipoLinea) + '\" ConEquipo=\"' + ConEquipo + '\" EstadoFinal=\"' + EstadoFinal + '\" Penalidad=\"' + Penalidad + '\" TransferidoA=\"' + TransferidoA + '\" />';
        });
        xmlDatosLineas += "</DETALLE>";

        if (!validarDatos) {
            return;
        }

        var oCese = new ENT_MOV_FAC_Cese();
        oCese.vcCodEmp = _codEmpleado;
        oCese.FechaCese = _fechaCese.substr(6, 4) + _fechaCese.substr(3, 2) + _fechaCese.substr(0, 2);
        //        oCese.TipoCese = _TipoCese;
        oCese.FechaCreacion = _fechaRegistro;
        oCese.EstadoCuentaAnterior = DevuelveNumeroSinFormato($("#lblECAnt").text(), oCulturaUsuario, false);
        oCese.PagosAbonos = DevuelveNumeroSinFormato($("#lblPagos").text(), oCulturaUsuario, false);
        oCese.ConsumosCargos = DevuelveNumeroSinFormato($("#lblConsumos").text(), oCulturaUsuario, false);
        oCese.CuotasFinanciadas = DevuelveNumeroSinFormato($("#lblCuotasFinan").text(), oCulturaUsuario, false);
        oCese.Penalidades = DevuelveNumeroSinFormato($("#lblPenalidades").text(), oCulturaUsuario, false);
        oCese.VcDescripcion = _descripcion;
        oCese.btEstado = 1;


        var sendData = JSON.stringify(oCese);

        var band = false;
        if (!emitirComp && $("#chkEmitir").is(':enabled')) {
            $('#dvMsgSinEmitir').dialog({
                title: "¡Aviso!",
                modal: true,
                width: 330,
                buttons: {
                    "Si": function () {
                        $(this).dialog("close");
                        return;
                    },
                    "No": function () {
                        $(this).dialog("close");
                        band = true;

                        $.ajax({
                            type: "post",
                            url: "Mnt_CesesEmpleadosNuevo.aspx/Guardar",
                            data: "{'emitirComp': '" + emitirComp + "','oCese': '" + sendData + "', 'xmlDatosLineas':'" + xmlDatosLineas + "'}",
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success: function (result) {
                                if (result.d == '') {
                                    Mensaje("<br/><h1>Se completó el registro de Cese del Empleado " + $("#bpTecnicoResponsable_txtValorBusqueda").val().substring($("#bpTecnicoResponsable_txtValorBusqueda").val().lastIndexOf("=") + 1) + ".</h1>", document, CerroMensaje);
                                } else {
                                    alerta(result.d);
                                }
                            }, error: function (xhr, err, thrErr) {
                                MostrarErrorAjax(xhr, err, thrErr);
                            }
                        });
                    }
                },
                resizable: false
            });
        } else {
            band = true;
        }

        if (band) {
            $('#divMsgConfirmar').dialog({
                title: "¡Alerta!",
                modal: true,
                width: 330,
                buttons: {
                    "Si": function () {
                        $.ajax({
                            type: "post",
                            url: "Mnt_CesesEmpleadosNuevo.aspx/Guardar",
                            data: "{'emitirComp': '" + emitirComp + "','oCese': '" + sendData + "', 'xmlDatosLineas':'" + xmlDatosLineas + "'}",
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success: function (result) {
                                if (result.d == '') {
                                    Mensaje("<br/><h1>Se completó el registro de Cese del Empleado " + $("#bpTecnicoResponsable_txtValorBusqueda").val().substring($("#bpTecnicoResponsable_txtValorBusqueda").val().lastIndexOf("=") + 1) + ".</h1>", document, CerroMensaje);
                                } else {
                                    alerta(result.d);
                                }
                            }, error: function (xhr, err, thrErr) {
                                MostrarErrorAjax(xhr, err, thrErr);
                            }
                        });


                        $(this).dialog("close");
                    },
                    "Cancelar": function () {
                        $(this).dialog("close");
                    }
                },
                resizable: false
            });
        }

    });

    function CerroMensaje() {
        BloquearPagina(false);
        window.parent.ActualizarGrilla();
        window.parent.tab.tabs("remove", window.parent.tab.tabs("option", "selected"));

        //        if ($("#hdfCodigo").val() == "") {

        //        }
        //        else {
        //            var delay = 1000//1 seconds
        //            setTimeout(function () {
        //                window.parent.tab.tabs("remove", indiceTab);
        //            }, delay)
        //        }
    };

    $("#btnCerrar").click(function (event) {
        window.parent.tab.tabs("remove", indiceTab);
    });

    $(window).resize(function () {
        //        DimPosElementos();
        //        NumeroInicialFilas();
        TamanioGrilla();
    });

    function TamanioGrilla() {
        var panelwidth = $("#dvLineas").width();

        if (panelwidth > 689) {
            $("#tbLineas").setGridWidth($(window).width() - 130);
            $("#tbDeudas").setGridWidth($(window).width() - 130);
        }
        else {
            $("#tbLineas").setGridWidth(720 - 130);
            $("#tbDeudas").setGridWidth(720 - 130);
        }
    }

    function GenerarCombos(id, valor, linea, fechaFin) {
        var s;
        var d = new Date();
        var fecActual = new Date(d.getFullYear(), d.getMonth(), d.getDate());
        var fecFin = new Date(fechaFin.substring(3, 5) + "/" + fechaFin.substring(0, 2) + "/" + fechaFin.substring(6, 10));
        if (valor != '1') {
            s = "<select id='ddl_Estado" + id + "' style='width: 115px; padding: 4px; border: 1px solid rgb(221, 221, 221);' " +
            "onchange='Seleccion(this.id," + id + ")' class='ui-corner-all' title='Seleccione el estado para la Linea: " + linea + "'";

            if (btOpcion) {
                s = s + (valor != '-1' ? " disabled='disabled'>" : ">");
            } else {

                if (fecFin <= fecActual) {
                    //                    s += " disabled='disabled'>";
                }
                s += ' >';
            }

            for (var i = 0; i < listaEstados.length; i++) {
                var item = listaEstados[i].split("|");
                s += "<option value='" + item[0] + "'"; // + item[1] + "</option>";
                if (item[0] == valor) {
                    s += " selected";
                }
                if (fecFin <= fecActual && item[0] == '76') {
                    s += " disabled";
                }
                s += ">" + item[1] + "</option>";
            }
            s += "</select>";
        } else {
            s = "<select id='ddl_Estado" + id + "' style='width: 115px; padding: 4px; border: 1px solid rgb(221, 221, 221);' class='ui-corner-all' disabled='disabled'><option value='" + valor + "' selected>Disponible</option></select>";
        }
        return s;
    }

    if ($("#hdfCodCese").val() != "") {
        //        $("#ddlTipoCese").prop("disabled", true);
        $("#btnGuardar").button("option", "disabled", true);
        $("#txtDescripcion").attr("disabled", "disabled");

        start.enable(false);
        btOpcion = true;

        p_idEmpleado = $("#hdfTecnicoResponsable").val();
        fnMostrarDatos(p_idEmpleado);
    }

    var nodes = document.getElementById("dvEmitir").getElementsByTagName('*');
    for (var i = 0; i < nodes.length; i++) {
        nodes[i].disabled = true;
    }
    if ($("#hdfValidaConf").val() == "0") {
        $("#dvEmitir").attr("title", "Se requiere configurar el módulo de comprobantes");
    } else {
        if (!btOpcion) {
            $('#chkEmitir').prop('checked', true);
        }
    }

    startFechaPago.enable(false);

    var tbLineas = $("#tbLineas").jqGrid({
        sortable: true,
        datatype: "local",
        datatype: function () {

            $.ajax({
                url: "Mnt_CesesEmpleadosNuevo.aspx/ListarLineasxEmpleado", //PageMethod
                data: "{'IdEmpleado':'" + p_idEmpleado + "'," +
                    "'inPagTam':'" + $('#tbLineas').getGridParam("rowNum") + "'," +
                    "'inPagAct':'" + parseInt($('#tbLineas').getGridParam("page")) + "'," +
                    "'vcOrdCol':'" + $('#tbLineas').getGridParam("sortname") + "'," + //Nombre de columna ordenado
                    "'vcTipOrdCol':'" + $('#tbLineas').getGridParam("sortorder") + "'," +
                    "'btOpcion':'" + btOpcion + "'}", //Tipo de orden de columna asc, desc
                dataType: "json",
                type: "post",
                contentType: "application/json; charset=utf-8",
                success: function (result) {
                    $("#tbLineas")[0].addJSONData(result.d);
                },
                error: function (xhr, err, thrErr) {
                    MostrarErrorAjax(xhr, err, thrErr);
                }
            });
        },
        jsonReader: {
            root: "Items",
            page: "PaginaActual",
            total: "TotalPaginas",
            records: "TotalRegistros",
            repeatitems: true,
            cell: "Row"
            //                ,id: "P_inCodSol"
        },
        colModel: [
            { name: 'id', index: 'id', width: 10, hidden: true, key: true },
            { name: 'CodigoPedido', index: 'CodigoPedido', label: 'Contrato', hidden: false, width: 70, align: "center" },
            { name: 'Linea', index: 'Linea', label: 'Línea', hidden: false, width: 70, align: "center" },
            { name: 'TipoLinea', index: 'TipoLinea', label: 'Tipo Línea', hidden: false, width: 50, sortable: true, align: "center" },
            { name: 'MontoLinea', index: 'MontoLinea', label: 'Monto Línea', hidden: false, width: 65, sortable: true, align: "center" },
            { name: 'FechaInicioContrato', index: 'FechaInicioContrato', label: 'Inicio Contrato', hidden: false, sortable: true, width: 70, align: "center" },
            { name: 'FechaFinContrato', index: 'FechaFinContrato', label: 'Fin Contrato', hidden: false, width: 70, sortable: true, align: "center" },
            {
                name: 'EstadoFinal', index: 'EstadoFinal',
                label: 'Estado Final',
                hidden: false,
                sortable: false,
                width: 120,
                align: "center",
                formatter: function (value, options, rData) {
                    if (btOpcion) {
                        if (rData[6] != '1') {
                            return GenerarCombos(rData[0], value, rData[2], rData[5]);
                        } else {
                            return '<label id="lbl_Estado' + rData[0] + '">Disponible</label>';
                        }
                    } else {
                        return GenerarCombos(rData[0], value, rData[2], rData[5]);
                    }
                }
            },
            { name: 'Penalidad', index: 'Penalidad', label: 'Penalidad', hidden: false, width: 100, align: "right", sortable: false,
                formatter: function (value, options, rData) {
                    if (btOpcion) {
                        return "<label id='lbl_" + rData[0] + "'>" + (rData[7] != '36' ? "---" : FormatoNumero(rData[8], oCulturaUsuario, false)) + "</label> ";
                    } else {
                        if (rData[8] == '0') {
                            return "<input class='MiTxt ui-corner-all' id='txt_" + rData[0] + "' onClick='this.select();' name='txt_" + rData[0] +
                                "' type='text' value='" + parseFloat(0).toFixed(2) + "' style='width: 85px; padding: 4px; border: 1px solid rgb(221, 221, 221); text-align: right; display:none;' maxlength='10' /> ";
                        } else {
                            return "<label id='lbl_" + rData[0] + "'>" + (rData[8] == '-1' ? "---" : rData[8]) + "</label> ";
                        }
                    }
                }
            },
            { name: 'EstadoFinalAux', index: 'EstadoFinalAux', label: 'Estado Final Aux', hidden: true, width: 50, align: "center", sortable: false },
            { name: 'PenalidadAux', index: 'PenalidadAux', label: 'Penalidad Aux', hidden: true, width: 50, align: "center", sortable: false },
            { name: 'MontoDeuda', index: 'MontoDeuda', label: 'MontoDeuda', hidden: true, width: 50, align: "center", sortable: false },
            { name: 'TransferirA', index: 'TransferirA', label: 'Tranferir a', hidden: false, width: 220, sortable: false, align: "left", formatter:
                function (value, options, rData) {
                    var s = "";
                    if (btOpcion) {
                        s = "<label id='lblEmpleadoTransf_" + rData[0] + "' " + (rData[7] != '74' ? "style='display:none;'" : "") + ">" + (rData[9] != '' ? rData[9] : "") + "</label>";
                    } else {
                        if (rData[7] != '1') {
                            s = "<img id='btnTransferir" + rData[0] + "' onclick='TransferirA(this.id)' style='display:none;' src='../../../Common/Images/Mantenimiento/usuario.png' alt='Procesar' class='imgBtn' title='Buscar'/>&#160;";
                            s = s + "<label id='lblEmpleadoTransf_" + rData[0] + "' " + (btOpcion ? "style='display:none;'" : "") + ">" + (btOpcion && rData[9] != '-1' ? rData[9] : "") + "</label>";
                        }
                    }
                    return s;
                }
            },
            {
                name: 'ConEquipo', index: 'ConEquipo', label: 'Con Equipo', editable: true, width: 50, align: 'center', sortable: false,
                formatter: function (value, options, rData) {

                    var x = "";
                    if (rData[7] == '74' || rData[7] == '75') {
                        x = "<input type='checkbox' id='chk_" + rData[0] + "' class='MiChk' name='chk_" + rData[0] + "' " + (rData[10] == "True" ? "checked='checked' " : "") + (rData[7] != '-1' ? "disabled" : "") + " />";
                    } else {
                        if (!btOpcion && rData[7] == '-1') {
                            x = "<input type='checkbox' id='chk_" + rData[0] + "' class='MiChk' name='chk_" + rData[0] + "' " + (rData[10] == "True" ? "checked='checked' " : "") + " style='display:none;' />";
                        } else {
                            x = "<input type='checkbox' id='chk_" + rData[0] + "' class='MiChk' name='chk_" + rData[0] + "' " + (rData[10] == "True" ? "checked='checked' " : "") + " style='display:none;' />";
                        }
                    }

                    return x;
                }
            }
            , { name: 'PenalidadAux', index: 'PenalidadAux', label: 'PenalidadAux', hidden: true, width: 50, align: "center" }

        ],
        //viewrecords: true,
        //        pager: "#pgLineas", //Pager.
        loadtext: 'Cargando datos...',
        recordtext: "{0} - {1} de {2} elementos",
        emptyrecords: 'No hay resultados',
        pgtext: 'Pág: {0} de {1}', //Paging input control text format.
        rowNum: 10, //$("#hdfTamPag").val(), //"10" PageSize.
        rowList: [10, 20, 30],  //TamanosPaginaSel, //Variable PageSize DropDownList. 
        sortname: "TipoLinea", //sortname: idTabla, //Default SortColumn
        sortorder: "asc", //Default SortOrder.
        rownumbers: true,
        shrinkToFit: false,
        cmTemplate: { title: false },
        //        width: 820,
        width: $(window).width() - 130,
        height: 30, //'auto',//160,
        beforeSelectRow: function (rowid, e) {
            return false;
        },
        gridComplete: function () {
            var grid = $("#tbLineas").getDataIDs();
            var colModels = $("#tbLineas").getGridParam("colModel");
            for (var i = 0; i < grid.length; i++) {
                var data = $('#tbLineas').jqGrid('getRowData', grid[i]);

                if (data.TipoLinea == "Staff") {
                    for (var j in colModels) {
                        if (j != 0) {
                            $("#tbLineas").jqGrid('setCell', grid[i], j, "", { 'background-color': '#DFE6FD', 'background-image': 'none' });
                        }
                    }
                }
            }

            if (grid.length > 0) {
                $("#tbLineas").setGridHeight("auto");
            }
        }
    }).navGrid("#pgLineas", { edit: false, add: false, search: false, del: false });

    var tbDeudas = $("#tbDeudas").jqGrid({
        sortable: true,
        datatype: "local",
        datatype: function () {

            $.ajax({
                url: "Mnt_CesesEmpleadosNuevo.aspx/ListarDeudasxEmpleado", //PageMethod
                data: "{'IdEmpleado':'" + p_idEmpleado + "'," +
                    "'inPagTam':'" + $('#tbDeudas').getGridParam("rowNum") + "'," +
                    "'inPagAct':'" + parseInt($('#tbDeudas').getGridParam("page")) + "'," +
                    "'vcOrdCol':'" + $('#tbDeudas').getGridParam("sortname") + "'," + //Nombre de columna ordenado
                    "'vcTipOrdCol':'" + $('#tbDeudas').getGridParam("sortorder") + "'," +
                    "'btOpcion':'" + btOpcion + "'}", //Tipo de orden de columna asc, desc
                dataType: "json",
                type: "post",
                contentType: "application/json; charset=utf-8",
                success: function (result) {
                    $("#tbDeudas")[0].addJSONData(result.d);

                    var lista = [];

                    if ($("#hdfTecnicoResponsable").val() != "" && result.d != null) {
                        for (var i = 0; i < result.d.Items.length; i++) {
                            var oLista = new MOV_FAC_CeseDetalleDeuda();
                            oLista = result.d.Items[i].Row;
                            lista.push(oLista);
                        }
                    }
                    if (lista.length > 0) {
                        listaDeudas = lista;
                        dcImporteTotal = listaDeudas[0][10];
                        dcMontoCobrar = listaDeudas[0][11];
                    }
                },
                error: function (xhr, err, thrErr) {
                    MostrarErrorAjax(xhr, err, thrErr);
                }
            });
        },
        jsonReader: {
            root: "Items",
            page: "PaginaActual",
            total: "TotalPaginas",
            records: "TotalRegistros",
            repeatitems: true,
            cell: "Row"
        },
        colModel: [
            { name: 'id', index: 'id', width: 10, hidden: true, key: true },
            { name: 'Periodo', index: 'Periodo', label: 'Periodo', hidden: false, width: 70, align: "center" },
            { name: 'FechaEmision', index: 'FechaEmision', label: 'Fecha Emisión', hidden: !UsaComprobante, width: 75, align: "center" },
            {
                name: 'NumeroComprobante', index: 'NumeroComprobante', label: 'Nro Comprobante', hidden: !UsaComprobante, width: 105, align: "center",
                formatter: function (value, options, rData) {
                    var ret;
                    if (value == '---') {
                        ret = "<img id='btnVerCro" + rData[0] + "' onclick='Ver_Cronogramas(this.id);' src='../../../Common/Images/Mantenimiento/Todo.png' alt='Procesar' class='imgBtn' title='Buscar'/>&#160;" +
                                "<img id='imgAlerta" + rData[0] + "' src='../../../Common/Images/Mantenimiento/Alerta_16x16.png' alt='Advertencia' title='No se generará este comprobante porque su importe total es 0.00' style='display: none;'/>&#160;";
                    } else {
                        ret = "<a href='#' style='color:#08088A;' title='Vista Preliminar: " + rData[1] + "' name='" + value + "' id='" + rData[0] + "' onclick='" + (value != '---' ? "Ver_Comprobante(this.id);" : "Ver_Cronogramas(this.id);") + "' style='height:22px'>" + value + "</a>";
                    }
                    return ret;
                }
            },
            { name: 'IdTipoDocumento', index: 'IdTipoDocumento', label: 'IdTipoDocumento', hidden: true, width: 50, align: "center" },
            { name: 'TipoDocumento', index: 'TipoDocumento', label: 'Tipo Documento', hidden: !UsaComprobante, width: 140, align: "center" },
            { name: 'IdTipoProducto', index: 'IdTipoProducto', label: 'IdTipoProducto', hidden: true, width: 50, align: "center" },
            { name: 'TipoMotivo', index: 'TipoMotivo', label: 'Tipo Motivo', hidden: false, width: 70, align: "center" },
            { name: 'IdEstado', index: 'IdEstado', label: 'IdEstado', hidden: true, width: 50, align: "center" },
            { name: 'Estado', index: 'Estado', label: 'Estado', hidden: !UsaComprobante, width: 100, align: "center" },
            { name: 'ImporteTotal', index: 'ImporteTotal', label: 'Importe Total', width: 110, align: 'right', formatter: 'currency', formatoptions: { decimalSeparator: ".", thousandsSeparator: ",", decimalPlaces: 2} },
            { name: 'MontoPorCobrar', index: 'MontoPorCobrar', label: 'Monto por Cobrar', width: 110, align: 'right', formatter: 'currency', formatoptions: { decimalSeparator: ".", thousandsSeparator: ",", decimalPlaces: 2} },
            { name: 'IdSolFac', index: 'IdSolFac', label: 'IdSolFac', width: 110, align: 'right', hidden: true }
        ],
        viewrecords: true,
        //        pager: "#pgLineas", //Pager.
        loadtext: 'Cargando datos...',
        recordtext: "{0} - {1} de {2} elementos",
        emptyrecords: 'No hay resultados',
        pgtext: 'Pág: {0} de {1}', //Paging input control text format.
        rowNum: 10, //$("#hdfTamPag").val(), //"10" PageSize.
        rowList: [10, 20, 30],  //TamanosPaginaSel, //Variable PageSize DropDownList. 
        sortname: "NumeroComprobante", //sortname: idTabla, //Default SortColumn
        sortorder: "asc", //Default SortOrder.
        rownumbers: true,
        shrinkToFit: false,
        width: $(window).width() - 130,
        height: 30, //'auto'//160
        beforeSelectRow: function (rowid, e) {
            return false;
        },
        gridComplete: function () {
            var grid = $("#tbDeudas").getDataIDs();
            if (grid.length > 0) {
                $("#tbDeudas").setGridHeight("auto");
            } else {
                $("#tbDeudas").setGridHeight(30);
            }
        }
    }).navGrid("#pgDeudas", { edit: false, add: false, search: false, del: false });

    $(".MiTxt").live("keypress", function (event) {
        var id = this.name;
        ValidarNumeroEnCajaTextoGrilla(id, ValidarDecimalPositivo, oCulturaUsuario);

        //        $("#tbDeudas")[0].addJSONData(result.d);
    });

    $('.MiTxt').live("keydown", function (e) {
        //$('.MiTxt').on('keydown', function (e) {
        if (e.keyCode == 8) {
            var id = this.name;
            ValidarNumeroEnCajaTextoGrilla(id, ValidarDecimalPositivo, oCulturaUsuario);
        }
    });

    $('.MiChk').live("change", function () {
        //        var x = this.checked;
        var id = this.name;
        var valor;
        if ($('#' + id).is(':checked')) {
            valor = 1;
        } else {
            valor = 0;
        }
        id = id.replace("chk_", "");
        $("#tbLineas").jqGrid('setCell', id, 'ConEquipoAux', valor);


        var v_estado = $("#ddl_Estado" + id).val();
        var v_transferido;
        if (v_estado == '74') {
            v_transferido = $("#lblEmpleadoTransf_" + id).text().substring(0, $("#lblEmpleadoTransf_" + id).text().indexOf("="));
        } else {
            v_transferido = "";
        }
        var v_penalidad = 0;
        var v_conequipo = $('#chk_' + id).is(':checked');
        //fnMostrarDeuda(id, v_estado, v_penalidad, v_transferido, v_conequipo);

        var dataDeuda = $("#tbDeudas").jqGrid('getRowData');
        for (var i = 0; i < dataDeuda.length; i++) {
            var idTipoProd = dataDeuda[i].IdTipoProducto;
            var idTipoDoc = dataDeuda[i].IdTipoDocumento;
            if (dataDeuda[i].Estado == 'NO EMITIDO' && idTipoDoc == "1") {
                DetalleDeuda(idTipoProd, idTipoDoc, false, 0, true, 0);
            }
        }
    });

    TamanioGrilla();
});

function SumaTotalDeuda(idTipoProducto) {
    var data = $("#tbLineasEmp").jqGrid('getRowData');
    var dcPenalidades = 0;
    for (var i = 0; i < data.length; i++) {
        if ($("#ddl_Estado" + data[i].id).val() == '36') {
            if (data[i].PenalidadAux == "" || data[i].PenalidadAux == null) {
                data[i].PenalidadAux = "0";
            }

            var txt = "#txt_" + data[i].id;
            if ($(txt).val() != undefined) {
                dcPenalidades = parseFloat(dcPenalidades) + parseFloat(($(txt).val() == "" ? 0 : DevuelveNumeroSinFormato($(txt).val(), oCulturaUsuario, false)));
            }
            dcPenalidad = dcPenalidades;
        }
    }

    //Comentado por JHERRERA 20160217
    //    if ($("#tbDeudas").jqGrid('getRowData', 1).Estado == 'NO EMITIDO' && $("#tbDeudas").jqGrid('getRowData', 1).IdTipoDocumento) {
    //        $("#tbDeudas").jqGrid('setCell', 1, 'ImporteTotal', subTotalCuotas);
    //        $("#tbDeudas").jqGrid('setCell', 1, 'MontoPorCobrar', subTotalCuotas);

    TotalCuotasProgramadas = 0;
    var dataDeuda = $("#tbDeudas").jqGrid('getRowData');
    for (var i = 0; i < dataDeuda.length; i++) {
        var idTipoDoc = dataDeuda[i].IdTipoDocumento;
        if (dataDeuda[i].Estado == 'NO EMITIDO' && idTipoDoc == "1" && dataDeuda[i].IdTipoProducto == idTipoProducto) {
            $("#tbDeudas").jqGrid('setCell', dataDeuda[i].id, 'ImporteTotal', subTotalCuotas);
            $("#tbDeudas").jqGrid('setCell', dataDeuda[i].id, 'MontoPorCobrar', subTotalCuotas);

            if (subTotalCuotas == 0) {
                $("#btnVerCro" + dataDeuda[i].id).hide();
                $("#imgAlerta" + dataDeuda[i].id).show();
                $("#" + dataDeuda[i].id, "#tbDeudas").find("td").css("background-color", "#E6E6E6");
            } else {
                $("#btnVerCro" + dataDeuda[i].id).show();
                $("#imgAlerta" + dataDeuda[i].id).hide();
                $("#" + dataDeuda[i].id, "#tbDeudas").find("td").css("background-color", "white");
            }
        }
    }
    dataDeuda = $("#tbDeudas").jqGrid('getRowData');
    for (var i = 0; i < dataDeuda.length; i++) {
        var idTipoDoc = dataDeuda[i].IdTipoDocumento;
        if (dataDeuda[i].Estado == 'NO EMITIDO' && idTipoDoc == "1") {
            TotalCuotasProgramadas = parseFloat(TotalCuotasProgramadas) + parseFloat(DevuelveNumeroSinFormato(dataDeuda[i].MontoPorCobrar, oCulturaUsuario, false));
        }
    }
    var dcMontoTotal = estadoCuentaAnt - subTotalPagos + subTotalCargos + TotalCuotasProgramadas;

    $("#lblPenalidades").text(FormatoNumero(dcPenalidades, oCulturaUsuario, false));
    $("#lblMontoTotal").text(FormatoNumero(dcMontoTotal, oCulturaUsuario, false));
    $("#lblCuotasFinan").text(FormatoNumero(TotalCuotasProgramadas - dcPenalidad, oCulturaUsuario, false));
    //var dcMontoTotal = estadoCuentaAnt - subTotalPagos + subTotalCargos + subTotalCuotas;
    //    var dcMontoTotal = estadoCuentaAnt - subTotalPagos + subTotalCargos + (subTotalCuotas - dcPenalidades) + dcPenalidades;
}

function Valida_Caja(evt) {
    var charCode = (evt.which) ? evt.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57))
        return false;

    return true;
}

function checkdate(m, d, y) {
    return m > 0 && m < 13 && y > 0 && y < 32768 && d > 0 && d <= (new Date(y, m, 0))
    .getDate();
}

function fnMostrarDatos(valor) {
    $("#hdfTecnicoResponsable").val(valor);
    if (valor == "") {
        Limpia();
        $("#dvLineasEmpleado").hide();
        $("#dvLineas").show();
    }
    if (listaEstados.length == 0) {
        ListarEstados();    //estados de ceses
    }

    /*  BUSCAR  */
    p_idEmpleado = valor;

    if (valor == "") {
        $("#tbLineas").jqGrid('clearGridData');
        $("#tbDeudas").jqGrid('clearGridData');
        $("#tbLineasEmp").jqGrid('clearGridData');

        $("#tbLineasEmp").setGridHeight(30);
        $("#tbDeudas").setGridHeight(30);
    } else {
        if ($("#hdfCodCese").val() == "") {
            $("#hdfTemp").val("");
            $("#hdfTecnicoResponsable").val(p_idEmpleado);
            fnMostrarDeuda(0, -1, 0, "", false, true);
        } else {
            $("#bpTecnicoResponsable_txtValorBusqueda").val($("#hdfNomEmp").val());
            $("#tbLineas").jqGrid('clearGridData').trigger("reloadGrid");
            $("#tbDeudas").jqGrid('clearGridData').trigger("reloadGrid");
            CargarResumenTotal();
        }

        $("#tbLineasEmp").setGridHeight("auto");
        $("#tbDeudas").setGridHeight("auto");
    }
}

function Limpia() {
    $("#lblECAnt").text("(Desconocido)");
    $("#lblPagos").text("(Desconocido)");
    $("#lblConsumos").text("(Desconocido)");
    $("#lblCuotasFinan").text("(Desconocido)");
    $("#lblMontoTotal").text("(Desconocido)");
    $("#lblPagoOperador").text("(Desconocido)");

    $("#lblConsumos").text("(Desconocido)");

    subTotalCuotas = 0;
    dcPenalidad = 0;
    subTotalPagos = 0;
    subTotalCargos = 0;
    estadoCuentaAnt = 0;
    dcImporteTotal = 0;
    dcMontoCobrar = 0;
    strBaja_Lineas = "";
    strBaja_Penalidad = "";
    strLineas = "";
    strLineasConEquipo = "";

    $.ajax({
        type: "POST",
        url: "Mnt_CesesEmpleadosNuevo.aspx/LimpiarConsulta",
        data: JSON.stringify({
            'tempConsulta': $("#hdfTemp").val()
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            $("#hdfTemp").val("");
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });

}

function cargar_Deuda() {
    $.ajax({
        type: "POST",
        url: "Mnt_CesesEmpleadosNuevo.aspx/ListarDeudas",
        data: JSON.stringify({
            'IdEmpleado': $("#hdfTecnicoResponsable").val(),
            'inTipOri': $("#hdfinTipOri").val(),
            'TipoCese': $("#ddlTipoCese").val()
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            if (data.d.length > 0) {
                $("#lblECAnt").text(data.d[0].SaldoAnterior);
                $("#lblPagos").text(data.d[0].MontoPagado);
                $("#lblCuotasFinan").text(data.d[0].MontoCuota);
                $("#lblPagoOperador").text(data.d[0].PagoOperador);
                $("#lblMontoTotal").text(data.d[0].MontoPagar);
                $("#lblConsumos").text(data.d[0].Consumos);
            }
            else {
                $("#spMensaje").text("No tiene deudas pendientes.");
                Limpia();
            }
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
}
//Comentado por JHERRERA 20160217
function Seleccion(control, id) {
    _id = id;
    $("#tbLineas").jqGrid('setCell', id, 'PenalidadAux', 0);
    var select = "#" + control;
    var img = "#btnTransferir" + id;
    var txt = "#txt_" + id;
    var lbl = "#lbl_" + id;
    var chk = "#chk_" + id;
    switch ($(select).val()) {
        case '36':
            $(txt).val(""); $(txt).focus(); $(txt).show(); $(img).hide(); $(lbl).hide(); $(chk).hide(); break;
        case '74':
            $("#tbLineas").jqGrid('setCell', id, 'PenalidadAux', 0);
            $(img).show(); $(txt).hide(); $(lbl).show(); $(chk).show(); $("#bpTecnicoTransferido_btnBuscar").click(); break;
        case '75':
            $("#tbLineas").jqGrid('setCell', id, 'PenalidadAux', 0);
            $(txt).val(""); $(txt).hide(); $(img).hide(); $(lbl).show(); $(chk).show(); break;
        case '-1':
            $("#tbLineas").jqGrid('setCell', id, 'PenalidadAux', 0);
            return;
            break;
        default:
            $("#tbLineas").jqGrid('setCell', id, 'PenalidadAux', 0);
            $(img).hide(); $(txt).hide(); $(lbl).show(); $(chk).hide(); break;
    }

    var datosLineas = $("#tbLineasEmp").jqGrid("getRowData", id);

    var v_estado = $(select).val();
    var v_penalidad = 0;
    var v_transferido = "";
    var v_conequipo = false;
    fnMostrarDeuda(id, v_estado, v_penalidad, v_transferido, v_conequipo);


    $("#tbLineas").jqGrid('setCell', id, 'EstadoFinalAux', $(select).val());
    $("#lblEmpleadoTransf_" + id).text("");

    var montoDeuda = parseFloat($("#tbLineas").jqGrid('getRowData', id).MontoDeuda);
    var importeTotal = dcImporteTotal;

    var montoCobrar = dcMontoCobrar;
    var penalidad = 0;
    var datosGrilla = $("#tbLineas").jqGrid("getRowData");
    if (datosGrilla.length > 0) {
        //        importeTotal = parseFloat($('#tbDeudas').find('tr').eq(1).find('td').eq('11').text());
        //        montoCobrar = parseFloat($('#tbDeudas').find('tr').eq(1).find('td').eq('12').text());
    }
    for (var i = 0; i < datosGrilla.length; i++) {
        penalidad = penalidad + parseFloat($('#tbLineas').find('tr').eq(i + 1).find('td').eq('10').text());
    }

    if ($(select).val() != '76' && $(select).val() != '1') {
        $("#tbDeudas").jqGrid('setCell', 1, 'ImporteTotal', parseFloat(importeTotal) - montoDeuda + penalidad);
        $("#tbDeudas").jqGrid('setCell', 1, 'MontoPorCobrar', parseFloat(montoCobrar) - montoDeuda + penalidad);
    } else {
        $("#tbDeudas").jqGrid('setCell', 1, 'ImporteTotal', parseFloat(importeTotal) + penalidad);
        $("#tbDeudas").jqGrid('setCell', 1, 'MontoPorCobrar', parseFloat(montoCobrar) + penalidad);
    }

    var dataDeuda = $("#tbDeudas").jqGrid('getRowData');
    for (var i = 0; i < dataDeuda.length; i++) {
        var idTipoProd = dataDeuda[i].IdTipoProducto;
        var idTipoDoc = dataDeuda[i].IdTipoDocumento;
        if (dataDeuda[i].Estado == 'NO EMITIDO' && idTipoDoc == "1") {
            DetalleDeuda(idTipoProd, idTipoDoc, false, 0, true, 0);
        }
    }
}

function TransferirA(id) {
    SelEmpTrans = true;
    _id = id.replace("btnTransferir", "");
    $("#bpTecnicoTransferido_btnBuscar").click();
}

function fnMostrarTecTransf(valor) {
    if ($("#hdfTecnicoResponsable").val() != valor.EMPL_P_vcCODEMP) {
        $("#lblEmpleadoTransf_" + _id).text(valor.EMPL_P_vcCODEMP + "=" + valor.EMPL_vcNOMEMP);

        var datosLineas = $("#tbLineasEmp").jqGrid("getRowData", _id);
        var v_estado = $("#ddl_Estado" + _id).val();
        var v_penalidad = 0;
        var v_transferido = valor.EMPL_P_vcCODEMP;
        //        var v_conequipo = $('#chk_' + _id).is(':checked');
        var v_conequipo = false;
        fnMostrarDeuda(_id, v_estado, v_penalidad, v_transferido, v_conequipo, false);
        //        $("#tbDeudas").trigger("reloadGrid");
    } else {
        alerta("El empleado a quién se transferirá la deuda no debe ser el mismo que realizará el cese. Por favor elija otro empleado");
    }
}

function ListarEstados() {
    $.ajax({
        url: "Mnt_CesesEmpleadosNuevo.aspx/ListarEstadosCeses",
        dataType: "json",
        type: "post",
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            listaEstados = [];
            if (result.d.length > 0) {
                $(result.d).each(function () {
                    listaEstados.push(this.IdEstado + "|" + this.NombreEstado);
                });
            }
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
}

function CargarDeudaTotal() {
    $.ajax({
        type: "POST",
        url: "Mnt_CesesEmpleadosNuevo.aspx/ListarEstadoCuenta",
        data: JSON.stringify({
            'IdEmpleado': p_idEmpleado
            //            ,"inTipOri": 1
            //            ,"p_periodo": p_periodo
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            if (data.d.length > 0) {

                var Moneda = "Nuevos Soles (S/.)";
                var FechaPago = data.d[0].UltDiaPago;
                var Periodo = data.d[0].Periodo;
                var SaldoAnterior = 0;
                if (data.d[0].SaldoAnterior.indexOf(",") >= 0) {
                    SaldoAnterior = SaldoAnterior + parseFloat(data.d[0].SaldoAnterior.replace(',', ''));

                }
                else {
                    SaldoAnterior = SaldoAnterior + parseFloat(data.d[0].SaldoAnterior);
                }
                var FechaGeneracionEC = data.d[0].FechaGeneracionEC;
                var MontoTotal = 0;

                var pagos = 0;
                var Deudas = 0;
                for (var i = 0; i < data.d.length; i++) {
                    if (data.d[i].MontoPagado.indexOf(",") >= 0) {
                        pagos = pagos + parseFloat(data.d[i].MontoPagado.replace(',', ''));
                    }
                    else {
                        pagos = pagos + parseFloat(data.d[i].MontoPagado);
                    }
                    if (data.d[i].MontoCuota.indexOf(",") >= 0) {
                        Deudas = Deudas + parseFloat(data.d[i].MontoCuota.replace(',', ''));
                    }
                    else {
                        Deudas = Deudas + parseFloat(data.d[i].MontoCuota);
                    }
                }
                MontoTotal = SaldoAnterior - pagos + Deudas;
                $("#lblMoneda").text(Moneda);
                $("#lblFechaPago").text(FechaPago);
                $("#lblPeriodo").text(Periodo);

                $("#lblECAnt").text(kendo.toString(SaldoAnterior, "c"));
                $("#lblPagos").text(kendo.toString(pagos, "c"));
                $("#lblConsumos").text("0.00");
                $("#lblCuotasFinan").text(kendo.toString(Deudas, "c"));
                $("#lblMontoTotal").text(kendo.toString(MontoTotal, "c"));
                $("#hdfFecEC").val(FechaGeneracionEC);
                $("#spMensaje").text("");

                //                $("#tbExportar").show();
                //                $("#btnPdf").show();
                //                cronograma_6M(_IdEmpleado);
            }
            else {
                if ($("#toolbar").css('display') == "none") {
                    $("#spMensaje").text("Usted no tiene un Estado de Cuenta");
                } else {
                    $("#spMensaje").text("El empleado ingresado no tiene un Estado de Cuenta");
                }

                $("#lblMoneda").text("(Desconocido)");
                $("#lblFechaPago").text("(Desconocido)");
                $("#lblPeriodo").text("(Desconocido)");

                $("#lblECAnt").text("(Desconocido)");
                $("#lblPagos").text("(Desconocido)");
                $("#lblConsumos").text("(Desconocido)");
                $("#lblCuotasFinan").text("(Desconocido)");
                $("#lblMontoTotal").text("(Desconocido)");
                $("#hdfFecEC").val("");

                //                var dataSource = new kendo.data.DataSource({
                //                    data: data.d,
                //                    pageSize: 10
                //                });

                //                var gridele = $("#grdEstadoCuenta").data("kendoGrid");
                //                gridele.setDataSource(dataSource);

                //                var dataSource2 = new kendo.data.DataSource({
                //                    data: data.d,
                //                    pageSize: 1
                //                });

                //                var gridCrono = $("#grCronogramaPagos").data("kendoGrid");
                //                gridCrono.setDataSource(dataSource2);
                //                $("#tbExportar").hide();
                //                $("#btnPdf").hide();
            }
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
}

function CargarResumenTotal() {

    if ($("#hdfCodCese").val() != "") {
        btOpcion = true;
    }
    $.ajax({
        type: "POST",
        url: "Mnt_CesesEmpleadosNuevo.aspx/MostrarResumenDeudaTotal",
        data: JSON.stringify({
            'IdEmpleado': p_idEmpleado, 'btOpcion': btOpcion
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var datos = data.d;
            var dcMontoEcant = parseFloat(datos.EstadoCuentaAnterior);
            var dcPagos = parseFloat(datos.PagosAbonos);
            var dcConsumos = parseFloat(datos.ConsumosCargos);
            var dcCuotasFuturas = parseFloat(datos.CuotasFinanciadas);
            var subTotal = (dcMontoEcant - dcPagos + dcConsumos + dcCuotasFuturas);

            $("#lblECAnt").text(FormatoNumero(datos.EstadoCuentaAnterior, oCulturaUsuario, false));
            $("#lblPagos").text(FormatoNumero(datos.PagosAbonos, oCulturaUsuario, false));
            $("#lblConsumos").text(FormatoNumero(datos.ConsumosCargos, oCulturaUsuario, false));
            $("#lblCuotasFinan").text(FormatoNumero(datos.CuotasFinanciadas, oCulturaUsuario, false));

            subTotalPagos = dcPagos;
            subTotalCargos = dcConsumos;
            estadoCuentaAnt = dcMontoEcant;

            if (!btOpcion) {
                $("#lblPenalidades").text(FormatoNumero(dcPenalidad, oCulturaUsuario, false));
            } else {
                dcPenalidad = parseFloat(datos.Penalidades);
                $("#lblPenalidades").text(FormatoNumero(dcPenalidad, oCulturaUsuario, false));
            }
            dcSubTotal = subTotal + dcPenalidad;

            $("#lblMontoTotal").text(FormatoNumero(dcSubTotal, oCulturaUsuario, false));


        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
}

function Ver_Comprobante(id) {
    var tipoRep = 'RepComprobantePdf';
    var row = $("#tbDeudas").getRowData(id);
    var nroComp = row.NumeroComprobante.substring(row.NumeroComprobante.indexOf(">") + 1, row.NumeroComprobante.lastIndexOf("<"));
    var pagina = "../../Administrar/Adm_Reporte.aspx?Tipo=" + tipoRep + "&nroComp=" + nroComp;
    $("#ifReporte").hide();

    formulario = $('#dvVisPre').dialog({
        title: "Vista Preliminar del Documento",
        width: 880,
        height: $(window).height() - 30,
        modal: true,
        show: true,
        hide: true,
        resizable: true,
        maxWidth: 880,
        minWidth: 550,
        minHeight: 450,
        position: { my: "center", at: "top", of: window },
        buttons: {
            "Cerrar": function () {
                $(this).dialog('close');
            }
        }
    });
    $("#ifReporte").attr("src", pagina);
}

function fnShowIframe() {
    $("#ifReporte").show();
}

function Ver_Cronogramas(id) {
    id = id.replace("btnVerCro", "");
    var row = $("#tbDeudas").getRowData(id);

    DetalleDeuda(row.IdTipoProducto, row.IdTipoDocumento, true, row.MontoPorCobrar, false, row.IdSolFac);
}

function fn_mdl_muestraForm(pURL, pFuncion, pTitulo, pAncho, pAlto) {
    if (!pTitulo) { pTitulo = ''; }

    $("body").append("<div id='dv_ModalFrame'></div>");
    var strHtml = '<iframe runat="server" id="ifrModal" width="100%" height="100%" frameborder="0" scrolling="auto" marginheight="0" marginwidth="0" src="' + pURL + '"></iframe>';

    $("#dv_ModalFrame").html(strHtml);
    $("#dv_ModalFrame").dialog({
        modal: true,
        title: pTitulo,
        width: pAncho,
        height: (pAlto ? pAlto : 'auto'),
        resizable: false,
        show: true,
        hide: true,
        position: { my: "center", at: "top", of: window },
        buttons: {
            "Cerrar": function () {
                $(this).dialog('close');
            }
        }
    });
}

function DetalleDeuda(idTipoProducto, idtipoDocumento, band, montoPorCobrar, actualizarMonto, IdSolFac) {
    $("#tbDetalleDeuda").GridUnload();
    var lst = [];
    //    var lstBaja = [];
    var strBaja_Lineas = "";
    var strBaja_Penalidad = "";
    var strLineas = "";
    var strLineasConEquipo = "";

    var data = $("#tbLineasEmp").jqGrid("getRowData");

    var d = new Date();
    var fecActual = new Date(d.getFullYear(), d.getMonth(), d.getDate());


    for (var i = 0; i < data.length; i++) {

        var fechaFin = data[i].FechaFinContrato;
        var fecFin = new Date(fechaFin.substring(3, 5) + "/" + fechaFin.substring(0, 2) + "/" + fechaFin.substring(6, 10));
        if ($("#ddl_Estado" + data[i].id).val() == '-1') {
            //            alerta("Seleccione un estado para la linea: " + data[i].Linea);
            //            return;
        }
        if ($("#ddl_Estado" + data[i].id).val() == 36 && fecFin > fecActual) {
            if (parseFloat($('#tbLineasEmp').find('tr').eq(i + 1).find('td').eq('10').text()) <= 0) {
                alerta("Ingrese una penalidad para la linea: " + data[i].Linea);
                return;
            }
        }


        if ($("#ddl_Estado" + data[i].id).val() == 36) {
            strBaja_Lineas = strBaja_Lineas + data[i].Linea + ",";
            //            strBaja_Penalidad = strBaja_Penalidad + ($('#tbLineasEmp').find('tr').eq(i + 1).find('td').eq('9').text()) + ",";
            if (fecFin <= fecActual) {
                strBaja_Penalidad = strBaja_Penalidad + 0 + "|";
            } else {
                strBaja_Penalidad = strBaja_Penalidad + ($('#txt_' + data[i].id).val()) + "|";
                strLineas = strLineas + data[i].Linea + ",";
                strLineasConEquipo = strLineasConEquipo + "1" + ",";
            }
            //strLineas = strLineas + data[i].Linea + ",";
        } else if ($("#ddl_Estado" + data[i].id).val() == '74' || $("#ddl_Estado" + data[i].id).val() == '75') {
            strLineas = strLineas + data[i].Linea + ",";
            strLineasConEquipo = strLineasConEquipo + ($("#chk_" + data[i].id).is(":checked") ? "1" : "2") + ","; //"0" + ",";
        }
    }
    strBaja_Lineas = strBaja_Lineas.substring(0, strBaja_Lineas.length - 1);
    strBaja_Penalidad = strBaja_Penalidad.substring(0, strBaja_Penalidad.length - 1);

    strLineas = strLineas.substring(0, strLineas.length - 1);
    strLineasConEquipo = strLineasConEquipo.substring(0, strLineasConEquipo.length - 1);

    var tbDetalleDeuda = $("#tbDetalleDeuda").jqGrid({
        sortable: true,
        datatype: "local",
        datatype: function () {
            $.ajax({
                url: "Mnt_CesesEmpleadosNuevo.aspx/ListarCronogramasCeses", //PageMethod
                data: "{'IdEmpleado':'" + $("#hdfTecnicoResponsable").val() + "'," +
                    "'inPagTam':'" + $('#tbDetalleDeuda').getGridParam("rowNum") + "'," +
                    "'inPagAct':'" + parseInt($('#tbDetalleDeuda').getGridParam("page")) + "'," +
                    "'vcOrdCol':'" + $('#tbDetalleDeuda').getGridParam("sortname") + "'," + //Nombre de columna ordenado
                    "'vcTipOrdCol':'" + $('#tbDetalleDeuda').getGridParam("sortorder") + "'," +
                    "'inTipoProducto':'" + idTipoProducto + "'," +
                    "'inTipoDocumento':'" + idtipoDocumento + "'," + //Tipo de orden de columna asc, desc
                    "'montoPorCobrar':'" + montoPorCobrar + "'," +
                    "'strBaja_Lineas':'" + strBaja_Lineas + "'," + //Tipo de orden de columna asc, desc
                    "'strBaja_Penalidad':'" + strBaja_Penalidad + "'," + //Tipo de orden de columna asc, desc
                    "'strLineas':'" + strLineas + "'," +
                    "'strLineasConEquipo':'" + strLineasConEquipo + "'," +
                    "'strIdSolFac':'" + IdSolFac + "'}",
                dataType: "json",
                type: "post",
                contentType: "application/json; charset=utf-8",
                success: function (result) {

                    if ($(result.d).length > 0) {

                        $("#lblTipoDocumento").text(result.d[0].Items[0].Row[5]);
                        $("#lblMotivo").text(result.d[0].Items[0].Row[9]);

                        $("#tbDetalleDeuda")[0].addJSONData(result.d[0]);
                        //$("#tbDetalleDeuda")[0].addJSONData(result.d);

                        subTotalCuotas = parseFloat(result.d[1]);
                        dcPenalidad = parseFloat(result.d[2]);

                        if (actualizarMonto != false) {
                            SumaTotalDeuda(idTipoProducto);
                        }


                        //                        var dataDeuda = $("#tbDeudas").jqGrid('getRowData');
                        //                        for (var i = 0; i < dataDeuda.length; i++) {
                        //                            var idTipoDoc = dataDeuda[i].IdTipoDocumento;
                        //                            if (dataDeuda[i].Estado == 'NO EMITIDO' && idTipoDoc == "1") {
                        //                                TotalCuotasProgramadas = parseFloat(TotalCuotasProgramadas) + parseFloat(DevuelveNumeroSinFormato(dataDeuda[i].MontoPorCobrar, oCulturaUsuario, false));
                        //                            }
                        //                        }
                        //$("#lblCuotasFinan").text(FormatoNumero(TotalCuotasProgramadas - dcPenalidad, oCulturaUsuario, false));

                        if ($('#tbDetalleDeuda').jqGrid('getRowData').length > 0) {
                            if (band) {
                                var dvDetalleDeuda = $("#dvDetalleDeuda").dialog({
                                    title: "Detalle de Deuda",
                                    modal: true,
                                    resizable: false,
                                    width: 800,
                                    buttons: {
                                        Cerrar: function () {
                                            $(this).dialog("close");
                                        }
                                    }
                                });
                            }

                        } else {
                            Mensaje("<br/><h1>No existe registros del proceso seleccionado.</h1>", document, null);
                        }

                    } else {
                        $("#tbDetalleDeuda").jqGrid("clearGridData");
                        //                        alerta("No existe registros.");
                        subTotalCuotas = 0;
                        $("#lblCuotasFinan").text(FormatoNumero(0, oCulturaUsuario, false));
                        SumaTotalDeuda(idTipoProducto);
                    }
                    //                    SumaTotalDeuda();
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
        cell: "Row"
        //            id: "P_inCodSol"
    },
    colModel: [
                { name: 'RowNumber', label: 'RowNumber', hidden: true, width: 80 },
                { name: 'Periodo', label: 'Periodo', hidden: false, width: 60, align: "center" },
                { name: 'Linea', label: 'Línea', hidden: false, width: 70, align: "center" },
                { name: 'PedidoSolicitud', label: 'Pedido / Solicitud', hidden: false, width: 92 },
                { name: 'TipoProceso', label: 'Tipo de proceso', hidden: false, width: 70, align: "center" },
                { name: 'TipoDocumento', label: 'Tipo Documento', hidden: true, width: 100, align: "center" },
                { name: 'Motivo', label: 'Motivo', hidden: false, width: 340 },
                { name: 'EstadoCobro', label: 'Estado', hidden: true, width: 100, align: 'center' },
                { name: 'IdTipDoc', label: 'IdTipDoc', hidden: true },
                { name: 'TipoMotivo', label: 'Tipo motivo', hidden: true, width: 85, align: "center" },
                { name: 'MontoCuota', label: 'Monto', hidden: false, width: 60, align: "right" }
            ],
    viewrecords: true,
    pager: "#pager", //Pager.
    loadtext: 'Cargando datos...',
    recordtext: "{0} - {1} de {2} elementos",
    emptyrecords: 'No hay resultados',
    pgtext: 'Pág: {0} de {1}', //Paging input control text format.
    rowNum: 10, //$("#hdfTamPag").val(), //"10" PageSize.
    rowList: [10, 20, 30], //TamanosPaginaSel, //Variable PageSize DropDownList. 
    sortname: "Periodo", //sortname: idTabla, //Default SortColumn
    sortorder: "asc", //Default SortOrder.
    rownumbers: true,
    shrinkToFit: false,
    width: 770,
    height: 232
}).navGrid("#pager", { edit: false, add: false, search: false, del: false });

}

function ValidarNumeroEnCajaTextoGrilla(_idTextBox, funcionValidacion, oCulturaUsuario, esEntero) {

    $('#' + _idTextBox).unbind("keypress");
    $('#' + _idTextBox).keypress(funcionValidacion);

    $("#" + _idTextBox).css({ "text-align": "right" });

    $("#" + _idTextBox).focusout(function () {
        var dato = $.trim($("#" + _idTextBox).val());
        if (oCulturaUsuario != null) {
            if (oCulturaUsuario.vcSimSepMil == ",") {
                dato = dato.replace(/,/g, "");
            }
        }
        if (dato == '') {
            dato = 0;
        }
        if (dato.toString() != '') {
            if (!$.isNumeric(dato)) {
                alerta("Debe ingresar un valor correcto", "Validación",
               function () { return fnFocusCajaTexto_focusout(_idTextBox); });
            }
            else if (oCulturaUsuario != null) {
                $("#" + _idTextBox).val(FormatoNumero(dato, oCulturaUsuario, esEntero));

                var id = _idTextBox;
                var idCol = id.replace("txt_", "");
                $("#tbLineas").jqGrid('setCell', idCol, 'PenalidadAux', dato, '', '', true);

                var v_estado = $("#ddl_Estado" + idCol).val();
                var v_transferido = "";
                var v_penalidad = dato;
                var v_conequipo = $('#chk_' + id).is(':checked');
                fnMostrarDeuda(idCol, v_estado, v_penalidad, v_transferido, v_conequipo, false);

                var select = "#ddl_Estado" + idCol;
                if ($(select).val() == '36') {

                    var montoDeuda = parseFloat($("#tbLineas").jqGrid('getRowData', idCol).MontoDeuda);
                    var importeTotal = parseFloat(dcImporteTotal);
                    var montoCobrar = parseFloat(dcMontoCobrar);
                    var penalidad = 0;
                    var datosGrilla = $("#tbLineas").jqGrid("getRowData");
                    for (var i = 0; i < datosGrilla.length; i++) {
                        penalidad = penalidad + parseFloat(parseFloat($('#tbLineas').find('tr').eq(i + 1).find('td').eq('10').text()));
                    }


                    //Comentado por JHERRERA 20160217
                    //                    $("#tbDeudas").jqGrid('setCell', 1, 'ImporteTotal', importeTotal - montoDeuda + penalidad);
                    //                    $("#tbDeudas").jqGrid('setCell', 1, 'MontoPorCobrar', montoCobrar - montoDeuda + penalidad);
                    //                    if ($("#tbDeudas").jqGrid('getRowData', 1).Estado == 'NO EMITIDO' && $("#tbDeudas").jqGrid('getRowData', 1).IdTipoDocumento) {
                    //                        var idTipoProd = $("#tbDeudas").jqGrid('getRowData', 1).IdTipoProducto;
                    //                        var idTipoDoc = $("#tbDeudas").jqGrid('getRowData', 1).IdTipoDocumento;
                    //                        DetalleDeuda(idTipoProd, idTipoDoc, false, penalidad);
                    //                    }

                    var dataDeuda = $("#tbDeudas").jqGrid('getRowData');
                    for (var i = 0; i < dataDeuda.length; i++) {
                        var idTipoProd = dataDeuda[i].IdTipoProducto;
                        var idTipoDoc = dataDeuda[i].IdTipoDocumento;
                        if (dataDeuda[i].Estado == 'NO EMITIDO' && idTipoDoc == "1" && idTipoProd == "2") {
                            DetalleDeuda(idTipoProd, idTipoDoc, false, penalidad, true, 0);
                            $("#tbDeudas").jqGrid('setCell', dataDeuda[i].id, 'ImporteTotal', importeTotal - montoDeuda + penalidad);
                            $("#tbDeudas").jqGrid('setCell', dataDeuda[i].id, 'MontoPorCobrar', montoCobrar - montoDeuda + penalidad);
                        }
                    }
                }

                //                if ($("#tbDeudas").jqGrid('getRowData', 1).Estado == 'NO EMITIDO' && $("#tbDeudas").jqGrid('getRowData', 1).IdTipoDocumento) {
                //                    var idTipoProd = $("#tbDeudas").jqGrid('getRowData', 1).IdTipoProducto;
                //                    var idTipoDoc = $("#tbDeudas").jqGrid('getRowData', 1).IdTipoDocumento;
                //                    DetalleDeuda(idTipoProd, idTipoDoc, false);
                //                }

                //SumaTotalDeuda(2);
            }
        }
    });

}

function MOV_FAC_CeseDetalleDeuda(id, Periodo, FechaEmision, NumeroComprobante, IdTipoDocumento, TipoDocumento, IdTipoProducto, TipoMotivo, IdEstado, Estado, ImporteTotal, MontoPorCobrar) {
    this.id = id;
    this.Periodo = Periodo;
    this.FechaEmision = FechaEmision;
    this.NumeroComprobante = NumeroComprobante;
    this.IdTipoDocumento = IdTipoDocumento;
    this.TipoDocumento = TipoDocumento;
    this.IdTipoProducto = IdTipoProducto;
    this.TipoMotivo = TipoMotivo;
    this.IdEstado = IdEstado;
    this.Estado = Estado;
    this.ImporteTotal = ImporteTotal;
    this.MontoPorCobrar = MontoPorCobrar;
}

function ENT_MOV_FAC_EstadoLinea(IdEstado, NombreEstado) {
    this.IdEstado = IdEstado;
    this.NombreEstado = NombreEstado;
}

function ENT_MOV_FAC_Cese(vcCodEmp, VcDescripcion, btEstado, FechaCese, FechaCreacion, EstadoCuentaAnterior, PagosAbonos, ConsumosCargos, CuotasFinanciadas, Penalidades, IdUsuarioCese) {
    this.vcCodEmp = vcCodEmp;
    this.VcDescripcion = VcDescripcion;
    this.FechaCese = FechaCese;
    this.FechaCreacion = FechaCreacion;
    this.EstadoCuentaAnterior = EstadoCuentaAnterior;
    this.PagosAbonos = PagosAbonos;
    this.ConsumosCargos = ConsumosCargos;
    this.CuotasFinanciadas = CuotasFinanciadas;
    this.Penalidades = Penalidades;
    this.IdUsuarioCese = IdUsuarioCese;
    this.btEstado = btEstado;
}

function fnMostrarDeuda(p_linea, p_estado, p_penalidad, p_idEmpleadoTran, p_equipo, SelEmpTrans) {
    if (SelEmpTrans) { $("#tbLineasEmp").GridUnload(); }

    var grid = $("#tbLineasEmp").jqGrid({
        datatype: "local",
        datatype: function () {
            var Buscar_Data = {
                inPagTam: $('#tbLineasEmp').getGridParam("rowNum"),
                inPagAct: $('#tbLineasEmp').getGridParam("page"),
                vcOrdCol: $('#tbLineasEmp').getGridParam("sortname"),
                vcTipOrdCol: $('#tbLineasEmp').getGridParam("sortorder"),
                p_idEmpleado: $("#hdfTecnicoResponsable").val(),
                p_temp: $("#hdfTemp").val(),
                p_linea: p_linea,
                p_estado: p_estado,
                p_penalidad: p_penalidad,
                p_idEmpleadoTran: p_idEmpleadoTran,
                p_equipo: p_equipo
                , p_UsaComprobante: UsaComprobante
            }
            $.ajax({
                type: "POST",
                url: "Mnt_CesesEmpleadosNuevo.aspx/MostrarDeudaxEmpleado",
                data: JSON.stringify(Buscar_Data),
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                success: function (result) {

                    if ($(result.d).length > 0) {
                        $("#dvLineasEmpleado").show();
                        $("#dvLineas").hide();
                        $("#tbLineasEmp")[0].addJSONData(result.d[0]);

                        $("#tbDeudas")[0].addJSONData(result.d[1]);

                        //                            if ($("#tbDeudas").jqGrid('getRowData', 1).Estado == 'NO EMITIDO' && $("#tbDeudas").jqGrid('getRowData', 1).IdTipoDocumento) {
                        //                                var idTipoProd = $("#tbDeudas").jqGrid('getRowData', 1).IdTipoProducto;
                        //                                var idTipoDoc = $("#tbDeudas").jqGrid('getRowData', 1).IdTipoDocumento;
                        //                                var MontoPorCobrar = $("#tbDeudas").jqGrid('getRowData', 1).MontoPorCobrar;
                        //                                DetalleDeuda(idTipoProd, idTipoDoc, false, MontoPorCobrar);
                        //                            }
                        //SumaTotalDeuda();

                        var dataDeuda = $("#tbDeudas").jqGrid('getRowData');
                        for (var i = 0; i < dataDeuda.length; i++) {
                            var idTipoProd = dataDeuda[i].IdTipoProducto;
                            var idTipoDoc = dataDeuda[i].IdTipoDocumento;
                            //if (dataDeuda[i].Estado == 'NO EMITIDO' && idTipoDoc == "1") {
                            //    DetalleDeuda(idTipoProd, idTipoDoc, false, 0, true, 0);
                            //}
                        }

                        $("#hdfTemp").val(result.d[2]);

                        estadoCuentaAnt = result.d[3].EstadoCuentaAnterior;
                        $("#lblECAnt").text(FormatoNumero(result.d[3].EstadoCuentaAnterior, oCulturaUsuario, false));
                        subTotalPagos = result.d[3].PagosAbonos;
                        $("#lblPagos").text(FormatoNumero(result.d[3].PagosAbonos, oCulturaUsuario, false));
                        subTotalCargos = result.d[3].ConsumosCargos;
                        $("#lblConsumos").text(FormatoNumero(result.d[3].ConsumosCargos, oCulturaUsuario, false));
                        subTotalCuotas = result.d[3].CuotasFinanciadas
                        $("#lblCuotasFinan").text(FormatoNumero(result.d[3].CuotasFinanciadas, oCulturaUsuario, false));
                        dcPenalidades = result.d[3].Penalidades;
                        $("#lblPenalidades").text(FormatoNumero(result.d[3].Penalidades, oCulturaUsuario, false));
                        var totalDeuda = result.d[3].EstadoCuentaAnterior - result.d[3].PagosAbonos + result.d[3].ConsumosCargos + result.d[3].CuotasFinanciadas + result.d[3].Penalidades;
                        $("#lblMontoTotal").text(FormatoNumero(totalDeuda, oCulturaUsuario, false));
                    } else {

                        Limpia();
                    }
                },
                error: function (xhr, err, thrErr) {
                    MostrarErrorAjax(xhr, err, thrErr);
                }
            });
        },
        jsonReader: {
            root: "Items",
            page: "PaginaActual",
            total: "TotalPaginas",
            records: "TotalRegistros",
            repeatitems: true,
            cell: "Row"
            //                ,id: "P_inCodSol"
        },
        colModel: [
            { name: 'id', index: 'id', width: 10, hidden: true, key: true },
            { name: 'CodigoPedido', index: 'CodigoPedido', label: 'Contrato', hidden: false, width: 70, align: "center" },
            { name: 'Linea', index: 'Linea', label: 'Línea', hidden: false, width: 70, align: "center" },
            { name: 'IdTipoLinea', index: 'IdTipoLinea', label: 'IdTipoLinea', hidden: true, width: 50, sortable: true, align: "center" },
            { name: 'TipoLinea', index: 'TipoLinea', label: 'Tipo Línea', hidden: false, width: 50, sortable: true, align: "center" },
            { name: 'MontoLinea', index: 'MontoLinea', label: 'Monto Línea', hidden: false, width: 65, sortable: true, align: "center" },
            { name: 'FechaInicioContrato', index: 'FechaInicioContrato', label: 'Inicio Contrato', hidden: false, sortable: true, width: 70, align: "center" },
            { name: 'FechaFinContrato', index: 'FechaFinContrato', label: 'Fin Contrato', hidden: false, width: 70, sortable: true, align: "center" },
            {
                name: 'EstadoFinal', index: 'EstadoFinal', label: 'Estado Final', hidden: false, sortable: false, width: 120, align: "center",
                formatter: function (value, options, rData) {
                    if (btOpcion) {
                        if (rData[7] != '1') {
                            return GenerarCombosGrilla(rData[0], value, rData[2], rData[7]);
                        } else {
                            return '<label id="lbl_Estado' + rData[0] + '">Disponible</label>';
                        }
                    } else {
                        return GenerarCombosGrilla(rData[0], value, rData[2], rData[7]);
                    }
                }
            },
            {
                name: 'Penalidad', index: 'Penalidad', label: 'Penalidad', hidden: false, width: 100, align: "right", sortable: false,
                formatter: function (value, options, rData) {
                    var d = new Date();
                    var fecActual = new Date(d.getFullYear(), d.getMonth(), d.getDate());
                    var fecFin = new Date(rData[7].substring(3, 5) + "/" + rData[7].substring(0, 2) + "/" + rData[7].substring(6, 10)); //Se cambio el rData[6] POR EL rData[7]
                    if (btOpcion) {
                        return "<label id='lbl_" + rData[0] + "'>" + (rData[8] != '36' ? "---" : FormatoNumero(rData[9], oCulturaUsuario, false)) + "</label> "; //Se cambio el rData[7] POR EL rData[8]
                    } else {
                        if (rData[8] == '36') { //Se cambio el rData[7] POR EL rData[8]
                            if (parseInt(rData[9]) == '-1') {
                                rData[9] = 0;
                            }
                            if (fecFin <= fecActual) {
                                return "<label id='lbl_" + rData[0] + "'>" + (parseInt(rData[9]) == '-1' ? "---" : FormatoNumero(rData[9], oCulturaUsuario, false)) + "</label> ";
                            } else {
                                return "<input class='MiTxt ui-corner-all' id='txt_" + rData[0] + "' onClick='this.select();' name='txt_" + rData[0] +
                            "' type='text' value='" + FormatoNumero(rData[9], oCulturaUsuario, false) + "' style='width: 85px; padding: 4px; border: 1px solid rgb(221, 221, 221); text-align: right; display: none;' maxlength='10' /> ";
                            }
                        } else {
                            return "<label id='lbl_" + rData[0] + "'>---</label> " + "<input class='MiTxt ui-corner-all' id='txt_" + rData[0] + "' onClick='this.select();' name='txt_" + rData[0] +
                            "' type='text' value='" + FormatoNumero(rData[9], oCulturaUsuario, false) + "' style='width: 85px; padding: 4px; border: 1px solid rgb(221, 221, 221); text-align: right; display: none;' maxlength='10' /> ";
                        }
                    }
                }
            },
            {
                name: 'EmpleadoTransferido', index: 'EmpleadoTransferido', label: 'Tranferir a', width: 220, align: "left", sortable: false,
                formatter: function (value, options, rData) {
                    var s = "";
                    if (btOpcion) {
                        s = "<label id='lblEmpleadoTransf_" + rData[0] + "' " + (rData[8] != '74' ? "style='display:none;'" : "") + ">" + (rData[10] != '' ? rData[10] : "") + "</label>";
                    } else {
                        if (rData[10] == '' && rData[8] == '74') {
                            s = "<img id='btnTransferir" + rData[0] + "' onclick='TransferirA(this.id)' src='../../../Common/Images/Mantenimiento/usuario.png' alt='Procesar' class='imgBtn' title='Buscar'/>&#160;";
                            s = s + "<label id='lblEmpleadoTransf_" + rData[0] + "' " + (btOpcion ? "style='display:none;'" : "") + ">" + (btOpcion && rData[10] != '' ? rData[10] : "") + "</label>";
                        } else {
                            if (rData[10] != '' && rData[8] == '74') {
                                s = "<img id='btnTransferir" + rData[0] + "' onclick='TransferirA(this.id)' src='../../../Common/Images/Mantenimiento/usuario.png' alt='Procesar' class='imgBtn' title='Buscar'/>&#160;";
                                s = s + "<label id='lblEmpleadoTransf_" + rData[0] + "' >" + rData[10] + "</label>";
                            } else {
                                s = "<img id='btnTransferir" + rData[0] + "' onclick='TransferirA(this.id)' style='display:none;' src='../../../Common/Images/Mantenimiento/usuario.png' alt='Procesar' class='imgBtn' title='Buscar'/>&#160;";
                                s = s + "<label id='lblEmpleadoTransf_" + rData[0] + "' " + (btOpcion ? "style='display:none;'" : "") + ">" + (btOpcion && rData[10] != '' ? rData[10] : "") + "</label>";
                            }

                        }
                    }
                    return s;
                }
            },
            {
                name: 'ConEquipo', index: 'ConEquipo', label: 'Con Equipo', hidden: false, width: 50, align: "center", sortable: false,
                formatter: function (value, options, rData) {
                    var x = "";
                    if (!btOpcion && (rData[8] == '74' || rData[8] == '75')) {
                        x = "<input type='checkbox' id='chk_" + rData[0] + "' class='MiChk' name='chk_" + rData[0] + "' " + (rData[11] == "True" ? "checked='checked' " : "") + " />";
                    } else {
                        if (!btOpcion) {
                            x = "<input type='checkbox' id='chk_" + rData[0] + "' class='MiChk' name='chk_" + rData[0] + "' " + (rData[11] == "True" ? "checked='checked' " : "") + " style='display:none;' />";
                        } else {
                            x = "<input type='checkbox' id='chk_" + rData[0] + "' class='MiChk' name='chk_" + rData[0] + "' " + (rData[11] == "True" ? "checked='checked' " : "") + " style='display:none;' />";
                        }
                    }
                    return x;
                }
            },
            { name: 'PenalidadAux', index: 'PenalidadAux', label: 'Penalidad Aux', hidden: true, width: 50, align: "center", sortable: false },
            { name: 'TransferirA', index: 'TransferirA', label: 'TransferirA', hidden: true, width: 50, align: "center", sortable: false }
        ],
        viewrecords: true,
        //        pager: "#pgLineas", //Pager.
        loadtext: 'Cargando datos...',
        recordtext: "{0} - {1} de {2} elementos",
        emptyrecords: 'No hay resultados',
        pgtext: 'Pág: {0} de {1}', //Paging input control text format.
        rowNum: 50, //10, //$("#hdfTamPag").val(), //"10" PageSize.
        rowList: [50, 100],  //[10, 20, 30],  //TamanosPaginaSel, //Variable PageSize DropDownList. 
        sortname: "TipoLinea", //sortname: idTabla, //Default SortColumn
        sortorder: "asc", //Default SortOrder.
        rownumbers: true,
        shrinkToFit: false,
        cmTemplate: { title: false },
        //        width: 820,
        width: $(window).width() - 130,
        height: 30, //160,
        beforeSelectRow: function (rowid, e) {
            return false;
        },
        gridComplete: function () {
            var grid = $("#tbLineasEmp").getDataIDs();
            var colModels = $("#tbLineasEmp").getGridParam("colModel");
            for (var i = 0; i < grid.length; i++) {
                var data = $('#tbLineasEmp').jqGrid('getRowData', grid[i]);

                if (data.IdTipoLinea == "1") {
                    for (var j in colModels) {
                        if (j != 0) {
                            $("#tbLineasEmp").jqGrid('setCell', grid[i], j, "", { 'background-color': '#DFE6FD', 'background-image': 'none' });
                        }
                    }
                }
            }

            if (grid.length > 0) {
                $("#tbLineasEmp").setGridHeight("auto");
            }
        }
    }).navGrid("#pgGrid", { edit: false, add: false, search: false, del: false });
}

function GenerarCombosGrilla(id, valor, linea, fechaFin) {
    var s;
    var d = new Date();
    var fecActual = new Date(d.getFullYear(), d.getMonth(), d.getDate());
    var fecFin = new Date(fechaFin.substring(3, 5) + "/" + fechaFin.substring(0, 2) + "/" + fechaFin.substring(6, 10));
    if (valor != '1') {
        s = "<select id='ddl_Estado" + id + "' style='width: 115px; padding: 4px; border: 1px solid rgb(221, 221, 221);' " +
            "onchange='SeleccionarEstado(this.id," + id + ")' class='ui-corner-all' title='Seleccione el estado para la Linea: " + linea + "'";

        if (btOpcion) {
            s = s + (valor != '-1' ? " disabled='disabled'>" : ">");
        } else {

            if (fecFin <= fecActual) {
                //                    s += " disabled='disabled'>";
            }
            s += ' >';
        }

        for (var i = 0; i < listaEstados.length; i++) {
            var item = listaEstados[i].split("|");
            s += "<option value='" + item[0] + "'"; // + item[1] + "</option>";
            if (item[0] == valor) {
                s += " selected";
            }
            //if (fecFin <= fecActual && item[0] == '76') {
            //    s += " disabled";
            //}
            s += ">" + item[1] + "</option>";
        }
        s += "</select>";
    } else {
        s = "<select id='ddl_Estado" + id + "' style='width: 115px; padding: 4px; border: 1px solid rgb(221, 221, 221);' class='ui-corner-all' disabled='disabled'><option value='" + valor + "' selected>Disponible</option></select>";
    }
    return s;
}

function SeleccionarEstado(control, id) {
    _id = id;
    $("#tbLineasEmp").jqGrid('setCell', id, 'PenalidadAux', 0);
    var select = "#" + control;
    var img = "#btnTransferir" + id;
    var txt = "#txt_" + id;
    var lbl = "#lbl_" + id;
    var lblEmpTrans = "#lblEmpleadoTransf_" + id;
    var chk = "#chk_" + id;
    switch ($(select).val()) {
        case '36':
            $(txt).val(""); $(txt).show(); $(img).hide(); $(lblEmpTrans).hide(); $(lblEmpTrans).text(""); $(lbl).hide(); $(chk).hide(); $(txt).focus(); break;
        case '74':
            $("#tbLineas").jqGrid('setCell', id, 'PenalidadAux', 0);
            $(img).show(); $(lblEmpTrans).show(); $(lblEmpTrans).text(""); $(txt).hide(); $(lbl).show(); $(chk).show();
            $("#bpTecnicoTransferido_btnBuscar").click();

            break;
        case '75':
            $("#tbLineas").jqGrid('setCell', id, 'PenalidadAux', 0);
            $(txt).val(""); $(txt).hide(); $(img).hide(); $(lblEmpTrans).hide(); $(lblEmpTrans).text(""); $(lbl).show(); $(chk).show(); break;
        case '-1':
            $("#tbLineas").jqGrid('setCell', id, 'PenalidadAux', 0);
            $(img).hide(); $(lblEmpTrans).hide(); $(lblEmpTrans).text(""); $(txt).hide(); $(lbl).show(); $(chk).hide();
            break;
        default:
            $("#tbLineas").jqGrid('setCell', id, 'PenalidadAux', 0);
            $(img).hide(); $(lblEmpTrans).hide(); $(lblEmpTrans).text(""); $(txt).hide(); $(lbl).show(); $(chk).hide(); break;
    }

    var datosLineas = $("#tbLineasEmp").jqGrid("getRowData", id);

    var v_estado = $(select).val();
    var v_penalidad = parseFloat(datosLineas.PenalidadAux);
    var v_transferido = datosLineas.TransferirA;
    var v_conequipo = $('#chk_' + id).is(':checked');
    //var v_conequipo = false;
    fnMostrarDeuda(id, v_estado, v_penalidad, v_transferido, v_conequipo, false);

    var dataDeuda = $("#tbDeudas").jqGrid('getRowData');
    for (var i = 0; i < dataDeuda.length; i++) {
        var idTipoProd = dataDeuda[i].IdTipoProducto;
        var idTipoDoc = dataDeuda[i].IdTipoDocumento;
        if (dataDeuda[i].Estado == 'NO EMITIDO' && idTipoDoc == "1") {
            DetalleDeuda(idTipoProd, idTipoDoc, false, 0, true, 0);
        }
    }


    //    Comentado por JHERRERA 20160217
    //    if ($("#tbDeudas").jqGrid('getRowData', 1).Estado == 'NO EMITIDO' && $("#tbDeudas").jqGrid('getRowData', 1).IdTipoDocumento) {
    //        var idTipoProd = $("#tbDeudas").jqGrid('getRowData', 1).IdTipoProducto;
    //        var idTipoDoc = $("#tbDeudas").jqGrid('getRowData', 1).IdTipoDocumento;
    //        DetalleDeuda(idTipoProd, idTipoDoc, false, 0);
    //    }
}
