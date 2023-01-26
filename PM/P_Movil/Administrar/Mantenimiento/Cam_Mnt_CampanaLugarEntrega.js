
var MargenFiltro = 0;
var MargenHeight = 48;

function inicioPagina() {
    DimPosElementos();
}

function DimPosElementos() {
    var Ancho = $(window).width();
    var Alto = $(window).height();
    $("#tblLugarEntrega").setGridWidth(Ancho - 110);
    $("#tblLugarEntrega").setGridHeight(Alto - 120);
}

$(function () {
    $("#ddlCampana").hide();
    //            $("input:checkbox,input:radio,input:file").uniform();
    $(".DATE").datepicker({
        changeMonth: true,
        changeYear: true,
        dateFormat: 'dd/mm/yy'
    });
    //combokendoFormar("#ddlCampana", 200);
    combokendoFormar("#ddlTipoEnvio", 200);
    combokendoFormar("#ddlOficinaDistribuidora", 200);
    combokendoFormar("#ddlTipoEnvioE", 200);
    combokendoFormar("#ddlOficinaDistribuidoraE", 200);

    $(window).resize(function () {
        DimPosElementos();
    });
    $("#txtCapacidadE").keypress(ValidarEntero);
    $("#txtCapacidad").keypress(ValidarEntero);
    $("#txtTelefonoContacto").keypress(ValidarEntero);
    $("#txtTelefonoContacto").keypress(ValidarEntero);

    var oColModelLugarEntrega = [
		        { name: 'IdLugarEntregaCampana', label: 'IdLugarEntregaCampana', hidden: true },
		        { name: 'IdCampana', label: 'IdCampana', width: 80, hidden: true },
   		        { name: 'IdCentroAtencion', label: 'IdCentroAtencion', hidden: true },
   		        { name: 'IdOficina', label: 'IdOficina', hidden: true },
   		        { name: 'Oficina', label: 'Oficina', width: 180 },
                { name: 'DireccionCompleta', label: 'Dirección', width: 250 },
   		        { name: 'Horario', label: 'Horario', width: 120, hidden: true },
   		        { name: 'CapacidadAtencion', label: 'Capacidad Atención', width: 100, hidden: true },
   		        { name: 'FechaRecojoInicio', label: 'Fecha Recojo Inicio', width: 100, formatter: FormatoFecha, hidden: true },
   		        { name: 'FechaRecojoFin', label: 'Fecha Recojo Fin', width: 100, formatter: FormatoFecha, hidden: true },
   		        { name: 'PersonaContacto', label: 'Persona Contacto', width: 120 },
   		        { name: 'TelefonoContacto', label: 'Teléfono Contacto', width: 120 },
   		        { name: 'RepartoDirecto', label: 'Reparto Directo', width: 50 },
                { name: 'TipoEnvio', label: 'IdTipoEnvio', hidden: true },
                { name: 'IdEstado', label: 'IdTipoEnvio', hidden: true },
   		        { name: 'NomTipoEnvio', label: 'Tipo Envío', width: 100 },
   		        { name: 'IdOficinaDistribuidora', label: 'IdOficinaDistribuidora', hidden: true },
   		        { name: 'OficinaDistribuidora', label: 'Oficina Distribuidora', width: 180 }
   	        ];

    function FormatoFecha(cellvalue, options, rowObject) {
        return FechaJSON(cellvalue);
    }

    var oColModelEleccionLugarEntrega = [
		        { name: 'IdOficina', label: 'IdOficina', width: 80, hidden: true },
		        { name: 'IdPais', label: 'IdPais', width: 80, hidden: true },
   		        { name: 'Pais', label: 'País', width: 100 },
   		        { name: 'IdCiudad', label: 'IdCiudad', width: 80, hidden: true },
   		        { name: 'Ciudad', label: 'Ciudad', width: 100 },
   		        { name: 'IdDistrito', label: 'IdDistrito', width: 170, hidden: true },
   		        { name: 'Distrito', label: 'Distrito', width: 150 },
   		        { name: 'Descripcion', label: 'Descripción', width: 200 },
   		        { name: 'DireccionCompleta', label: 'Dirección', width: 250 },
   		        { name: 'Referencia', label: 'Referencia', width: 200 }
   	        ];

    var tblLugarEntrega = JQGrid("#tblLugarEntrega", "#pagerLugarEntrega", ListarLugarEntrega, oColModelLugarEntrega, 50, 500, "rowId", true, EditarLugarEntrega, fnSelectLugarEntrega);
    var tblEleccionLugarEntrega = JQGrid("#tblEleccionLugarEntrega", "#pager", ListarOficina, oColModelEleccionLugarEntrega, 780, 110, "IdOficina", true, fnDoubleCLickOficina, fnSelectEleccionOficina);

    inicioPagina();
    function fnFechaActual() {
        var fullDate = new Date();
        //console.log(fullDate);
        var twoDigitMonth = fullDate.getMonth() + ""; if (twoDigitMonth.length == 1) twoDigitMonth = "0" + twoDigitMonth;
        var twoDigitDate = fullDate.getDate() + ""; if (twoDigitDate.length == 1) twoDigitDate = "0" + twoDigitDate;
        var currentDate = twoDigitDate + "/" + (parseInt(twoDigitMonth) + 1) + "/" + fullDate.getFullYear();
        return currentDate;
    }

    $("#ddlCampana").change(function () {
        //MetodoWeb("Cam_Mnt_CampanaLugarEntrega.aspx/ListarLugarEntrega", JSON.stringify({ 'IdCampana': $(this).val() }), CargarLugarEntregaCampana, null);
        ListarLugarEntrega();
    });

    $("#btnAgregarLugarEntrega").click(function () {
        $("#txtPersonaContacto").val('');
        $("#txtHorario").val('');
        $("#txtTelefonoContacto").val('');
        $("#ddlTipoEnvio").data("kendoComboBox").value('-1');
        $("#ddlOficinaDistribuidora").data("kendoComboBox").value('-1');
        $("#txtFechaInicio").val(fnFechaActual());
        $("#txtFechaFin").val(fnFechaActual());
        $("#txtCapacidad").val('');
        $("#chkRepartoDirecto").attr('checked', false);
        //if ($("#ddlCampana").val() != '-1') {
        ListarOficina();
        $('#dvEleccionLugarEntrega').dialog({
            title: "Seleccionar Oficina",
            height: 380,
            width: 850,
            modal: true,
            resizable: false
        });
        //MetodoWeb("Cam_Mnt_CampanaLugarEntrega.aspx/Listar", JSON.stringify({}), CargarOficina, null);
        //                } else {
        //                    alerta("Debe seleccionar una Campaña");
        //                }
    });

    $("#btnQuitarLugarEntrega").click(function () {
        //                if ($("#ddlCampana").val() != '-1') {
        var id = $("#tblLugarEntrega").jqGrid('getGridParam', 'selarrrow');
        if (id.length > 0) {
            fnQuitar();
            //                    $('#divMsgConfirmacionLugarEnt').dialog({
            //                        title: "Eliminar Registro",
            //                        modal: true,
            //                        buttons: {
            //                            "Si": function () {
            //                                fnQuitar();
            //                                $(this).dialog("close");
            //                            },
            //                            "Cancelar": function () {
            //                                $(this).dialog("close");
            //                            }
            //                        },
            //                        resizable: false
            //                    });
        }
        else {
            alerta("Seleccione por lo menos un lugar de entrega");
        }
        //                } else {
        //                    alerta("Seleccione por lo menos un Grupo de Empleado");
        //                }
        //confirmacion("Se quitara este lugar de entrega de la actual campaña. ¿Desea continua?", fnQuitar, null, "");
    });

    $("#btnEditarLugarEntrega").click(function () {
        var id = $("#tblLugarEntrega").jqGrid('getGridParam', 'selarrrow');
        if (id.length != 1) {
            alerta("Solo puede editar un solo registro", "Editar Lugar Entrega");
        } else {
            if (id != "") {
                EditarLugarEntrega(id);
            }
        }
    });

    $("#btnCerrar").live("click", function () {
        $("#dvEleccionLugarEntrega").dialog("close");
    });

    $("#btnCerrarEdicion").live("click", function () {
        $("#divEdicionLugarE").dialog("close");
    });

    //AGREGAR REGISTRO
    $("#btnAgregarSeleccion").click(function () {
        var idsSel = $("#tblEleccionLugarEntrega").jqGrid('getGridParam', 'selarrrow');
        var LugarEntregaI = "";
        var LugarEntregaU = "";
        var horario = $("#txtHorario").val();
        var PersonaCont = $("#txtPersonaContacto").val();
        var TelefCont = $("#txtTelefonoContacto").val();
        var IdtipoEnvio = $("#ddlTipoEnvio").val();
        var NomTipoEnvio = $("#ddlTipoEnvio :selected").text();
        var IdOficinaDis = $("#ddlOficinaDistribuidora").val();
        var NomOficinaDis = $("#ddlOficinaDistribuidora :selected").text();
        var FechIni = $("#txtFechaInicio").val();
        var FechFin = $("#txtFechaFin").val();
        var Capacidad = $("#txtCapacidad").val();
        var fechaFormato = $(".DATE").datepicker("option", "dateFormat");
        var FIni = FechIni.split('/');
        var FFin = FechFin.split('/');
        var contRegExiste = 0;
        var MensajeError = 0;
        var RepDirecto;
        var OficinasRepetidas = "";
        if ($("#chkRepartoDirecto").is(':checked')) {
            RepDirecto = "SI";
        } else {
            RepDirecto = "NO";
        }
        //VALIDACIONES
        if ($(idsSel).length > 0) {
            if (RepDirecto == "SI") {
                if (IdOficinaDis == "-1") {
                    alerta("Seleccione una Oficina Distribuidora");
                    return;
                }

                if ($.trim(PersonaCont) == "") {
                    alerta("Ingrese una Persona de Contacto");
                    return;
                }
                //                    if ($.trim(horario) == "") {
                //                        alerta("Ingrese un Horario");
                //                        return;
                //                    }
                if ($.trim(TelefCont) == "") {
                    alerta("Ingrese un Teléfono de Contacto");
                    return;
                }
                if (IdtipoEnvio == "-1") {
                    alerta("Seleccione un Tipo de Envío");
                    return;
                }
            }
            
//            if (IdOficinaDis == "-1") {
//                alerta("Seleccione una Oficina Distribuidora");
//                return;
//            }
            
            if ($.trim(FechIni) == "") {
                alerta("Seleccione la Fecha Inicial del Recojo");
                return;
            }
            if ($.trim(FechFin) == "") {
                alerta("Seleccione la Fecha Final del Recojo");
                return;
            }
            if (!ValidarFechaFormatoIguales(FechIni, FechFin, fechaFormato)) {
                alerta("En el rango por días la fecha inicial debe ser menor igual a la fecha final");
                return;
            }
            //                    if ($.trim(Capacidad) == "" || parseInt(Capacidad) <= 0) {
            //                        alerta("Ingrese una Capacidad de Atención válido");
            //                        return;
            //                    }

            if ($.trim(Capacidad) == "" || parseInt(Capacidad) <= 0) {
                Capacidad = 0;
            }


            for (i in idsSel) {
                contRegExiste = 0;
                var datos = $("#tblEleccionLugarEntrega").jqGrid('getRowData', idsSel[i]);
                //                        $(datos).each(function () {
                //                            if (parseInt(this["IdOficina"]) == idsSel[i]) {
                //                                contRegExiste = 1;
                //                                MensajeError += 1;
                //                                LugarEntregaU = LugarEntregaU + parseInt(datos.IdOficina) + '*';
                //                                LugarEntregaU = LugarEntregaU + $.trim(horario).replace(/'/g, "&#39") + '*';
                //                                LugarEntregaU = LugarEntregaU + $.trim(Capacidad).replace(/'/g, "&#39") + '*';
                //                                LugarEntregaU = LugarEntregaU + FIni[2] + '-' + FIni[1] + '-' + FIni[0] + '*';
                //                                LugarEntregaU = LugarEntregaU + FFin[2] + '-' + FFin[1] + '-' + FFin[0] + '*';
                //                                LugarEntregaU = LugarEntregaU + $.trim(PersonaCont).replace(/'/g, "&#39") + '*';
                //                                LugarEntregaU = LugarEntregaU + $.trim(TelefCont).replace(/'/g, "&#39") + '*';
                //                                LugarEntregaU = LugarEntregaU + ($.trim(RepDirecto) == 'SI' ? 1 : 0) + '*';
                //                                LugarEntregaU = LugarEntregaU + $.trim(IdtipoEnvio) + '*';
                //                                LugarEntregaU = LugarEntregaU + $.trim(IdOficinaDis) + '*';
                //                                LugarEntregaU = LugarEntregaU + 0 + '*'; //IdLugarEntregaU
                //                                LugarEntregaU = LugarEntregaU + 1 + ',';
                //                                OficinasRepetidas += datos.Descripcion + ', ';
                //                            }
                //                        });
                if (contRegExiste == 0) {
                    var datos = $("#tblEleccionLugarEntrega").jqGrid('getRowData', idsSel[i]);
                    LugarEntregaI = LugarEntregaI + parseInt(datos.IdOficina) + '*';
                    LugarEntregaI = LugarEntregaI + $.trim(horario).replace(/'/g, "&#39") + '*';
                    LugarEntregaI = LugarEntregaI + $.trim(Capacidad).replace(/'/g, "&#39") + '*';
                    LugarEntregaI = LugarEntregaI + FIni[2] + '-' + FIni[1] + '-' + FIni[0] + '*';
                    LugarEntregaI = LugarEntregaI + FFin[2] + '-' + FFin[1] + '-' + FFin[0] + '*';
                    LugarEntregaI = LugarEntregaI + $.trim(PersonaCont).replace(/'/g, "&#39") + '*';
                    LugarEntregaI = LugarEntregaI + $.trim(TelefCont).replace(/'/g, "&#39") + '*';
                    LugarEntregaI = LugarEntregaI + ($.trim(RepDirecto) == 'SI' ? 1 : 0) + '*';
                    LugarEntregaI = LugarEntregaI + $.trim(IdtipoEnvio) + '*';
                    LugarEntregaI = LugarEntregaI + $.trim(IdOficinaDis) + '*';
                    LugarEntregaI = LugarEntregaI + 0 + '*'; //IdLugarEntregaI
                    LugarEntregaI = LugarEntregaI + 1 + '*';
                    LugarEntregaI = LugarEntregaI + datos.Oficina + ',';
                }
            }
            if (LugarEntregaI != "") {
                //fnAgregarLugarEntrega(LugarEntregaI, $("#ddlCampana").val());
                fnAgregarLugarEntrega(LugarEntregaI, $('#hdfIdCampana').val());
            }
            //Actualiza Registros LugarEntregaU
            if (MensajeError > 0) {
                $("#lblMsg1").text(OficinasRepetidas.substring(0, OficinasRepetidas.length - 2));
                $("#lblMsg2").text(OficinasRepetidas.substring(0, OficinasRepetidas.length - 2));
                $('#divMsgConfirmacionAhora').dialog({
                    title: "Remplazar Datos de Lugar Entrega",
                    modal: true,
                    buttons: {
                        "Si": function () {
                            //fnAgregarLugarEntrega(LugarEntregaU, $("#ddlCampana").val());
                            fnAgregarLugarEntrega(LugarEntregaI, $('#hdfIdCampana').val());
                            $(this).dialog("close");
                        },
                        "No": function () {
                            $(this).dialog("close");
                        }
                    },
                    resizable: false
                });
            }
        } else {
            alerta("Seleccione una oficina a agregar");
            return;
        }
    });

    //ACTUALIZAR REGISTROS
    $("#btnAceptarEdicionLugarEntrega").click(function () {
        var FechIniE = $("#txtFechaInicio").val();
        var FechFinE = $("#txtFechaFin").val();
        var FIniE = FechIniE.split('/');
        var FFinE = FechFinE.split('/');
        var fechaFormato = $(".DATE").datepicker("option", "dateFormat");
        var RepDirectoE;
        var id = $("#tblLugarEntrega").jqGrid('getGridParam', 'selrow');
        if ($("#chkRepartoDirectoE").is(':checked')) {
            RepDirectoE = "SI";
        } else {
            RepDirectoE = "NO";
        }

        if ($("#txtPersonaContactoE").val() == "") {
            alerta("Ingrese una Persona de Contacto");
            return;
        }
        if ($("#txtHorarioE").val() == "") {
            alerta("Ingrese un Horario");
            return;
        }
        if ($("#txtTelefonoContactoE").val() == "") {
            alerta("Ingrese un Teléfono de Contacto");
            return;
        }
        if ($("#ddlTipoEnvioE").val() == "-1") {
            alerta("Seleccione un Tipo de Envío");
            return;
        }
        if ($("#ddlOficinaDistribuidoraE").val() == "-1") {
            alerta("Seleccione una Oficina Distribuidora");
            return;
        }
        if ($.trim(FechIniE) == "") {
            alerta("Seleccione la Fecha Inicial del Recojo");
            return;
        }
        if ($.trim(FechFinE) == "") {
            alerta("Seleccione la Fecha Final del Recojo");
            return;
        }
        if (!ValidarFechaFormatoIguales(FechIniE, FechFinE, fechaFormato)) {
            alerta("En el rango por días la fecha inicial debe ser menor igual a la fecha final");
            return;
        }
        if ($.trim($("#txtCapacidadE").val()) == "" || parseInt($("#txtCapacidadE").val()) <= 0) {
            alerta("Ingrese una Capacidad de Atención válido");
            return;
        }

        $.ajax({
            type: "POST",
            url: "Cam_Mnt_CampanaLugarEntrega.aspx/Actualizar",
            data: "{'IdLugarEntregaCampana': '" + id + "'," +
                            "'IdCampana':'" + $("#ddlCampana").val() + "'," +
                            "'IdOficina': '" + 0 + "'," +
                            "'IdOficinaDistribuidora':'" + $.trim($("#ddlOficinaDistribuidoraE").val()) + "'," +
                            "'FechaInicioRecojo':'" + $("#txtFechaInicioE").val() + "'," +
                            "'FechaFinRecojo': '" + $("#txtFechaFinE").val() + "'," +
                            "'Horario':'" + $.trim($("#txtHorarioE").val()) + "'," +
                            "'PersonaContacto':'" + $.trim($("#txtPersonaContactoE").val()) + "'," +
                            "'TelefonoContacto': '" + $.trim($("#txtTelefonoContactoE").val()) + "'," +
                            "'TipoEnvio':'" + $.trim($("#ddlTipoEnvioE").val()) + "'," +
                            "'Capacidad':'" + $.trim($("#txtCapacidadE").val()) + "'," +
                            "'RepartoDirecto': '" + $.trim(RepDirectoE) + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                $("#divEdicionLugarE").dialog("close");
                //MetodoWeb("Cam_Mnt_CampanaLugarEntrega.aspx/ListarLugarEntregaCampana", JSON.stringify({ 'IdCampana': $("#ddlCampana").val() }), CargarLugarEntregaCampana, null);
                ListarLugarEntrega();
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            }
        });
    });

    //ELIMINAR REGISTRO
    function fnQuitar() {
        var idsSel = $("#tblLugarEntrega").jqGrid('getGridParam', 'selarrrow');
        $.ajax({
            type: "POST",
            url: "Cam_Mnt_CampanaLugarEntrega.aspx/Eliminar",
            data: "{'IdCampana': '" + $('#hdfIdCampana').val() + "'," +
                          "'IdLugarE': '" + idsSel + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                //$("#tblLugarEntrega").jqGrid('delRowData', id);
                //MetodoWeb("Cam_Mnt_CampanaLugarEntrega.aspx/ListarLugarEntregaCampana", JSON.stringify({ 'IdCampana': $("#ddlCampana").val() }), CargarLugarEntregaCampana, null);
                if (result.d == 1) {
                    ListarLugarEntrega();
                } else {
                    ListarLugarEntrega();
                    alerta("No se pudieron quitar algunos lugares de entrega porque ya existen pedidos relacionados a estos.");
                }
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            }
        });
    }

    function ListarOficina() {
        $.ajax({
            type: "POST",
            url: "Cam_Mnt_CampanaLugarEntrega.aspx/ListarOficinaNoAgregadas",
            data: "{'inPagTam':'" + $('#tblEleccionLugarEntrega').getGridParam("rowNum") + "'," + //Tamaño de pagina
                          "'inPagAct':'" + parseInt($('#tblEleccionLugarEntrega').getGridParam("page")) + "'}", //FiltroRegistro
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                $("#tblEleccionLugarEntrega")[0].addJSONData(result.d);
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            }
        });
    }

    function ListarLugarEntrega() {
        //                if ($("#ddlCampana").val() != "-1") {
        //                    $.ajax({
        //                        type: "POST",
        //                        url: "Cam_Mnt_CampanaLugarEntrega.aspx/ListarLugarEntrega",
        //                        data: "{'inPagTam':'" + $('#tblLugarEntrega').getGridParam("rowNum") + "'," + //Tamaño de pagina
        //                            "'inPagAct':'" + parseInt($('#tblLugarEntrega').getGridParam("page")) + "'," +  //FiltroRegistro
        //                            "'IdCampana':'" + parseInt($("#ddlCampana").val()) + "'}",
        //                        contentType: "application/json; charset=utf-8",
        //                        dataType: "json",
        //                        success: function (result) {
        //                            $("#tblLugarEntrega")[0].addJSONData(result.d);
        //                        },
        //                        error: function (xhr, err, thrErr) {
        //                            MostrarErrorAjax(xhr, err, thrErr);
        //                        }
        //                    });
        //                }

        $.ajax({
            type: "POST",
            url: "Cam_Mnt_CampanaLugarEntrega.aspx/ListarLugarEntrega",
            data: "{'inPagTam':'" + $('#tblLugarEntrega').getGridParam("rowNum") + "'," + //Tamaño de pagina
                           "'inPagAct':'" + parseInt($('#tblLugarEntrega').getGridParam("page")) + "'," +  //FiltroRegistro
                           "'IdCampana':'" + $('#hdfIdCampana').val() + "'," +
                           "'Oficina':'" + $('#txtOficina').val() + "'," +
                           "'Tipo':'" + $('#ddlBusqueda').val() + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                $("#tblLugarEntrega")[0].addJSONData(result.d);
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            }
        });
    }

    function fnAgregarLugarEntrega(LugarEntrega, IdCampana) {
        $.ajax({
            type: "POST",
            url: "Cam_Mnt_CampanaLugarEntrega.aspx/Guardar",
            data: "{'IdCampana': '" + IdCampana + "'," +
                          "'vcLugEnt': '" + LugarEntrega.substring(0, LugarEntrega.length - 1) + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                //MetodoWeb("Cam_Mnt_CampanaLugarEntrega.aspx/ListarLugarEntregaCampana", JSON.stringify({ 'IdCampana': $("#ddlCampana").val() }), CargarLugarEntregaCampana, null);
                ListarLugarEntrega();
                $("#txtHorario").val('');
                $("#txtPersonaContacto").val('');
                $("#txtTelefonoContacto").val('');
                $("#ddlTipoEnvio").data("kendoComboBox").value('-1');
                $("#ddlOficinaDistribuidora").data("kendoComboBox").value('-1');
                $("#chkRepartoDirecto").attr('checked', false);
                $("#txtCapacidad").val('');
                $("#txtFechaInicio").val(fnFechaActual());
                $("#txtFechaFin").val(fnFechaActual());
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            }
        });
    }

    function fnSelectLugarEntrega(id) { }
    function fnDoubleCLickOficina(id) { }
    function fnSelectEleccionOficina(id) { }

    function EditarLugarEntrega(id) {
        var datos = $("#tblLugarEntrega").jqGrid('getRowData', id);
        $("#lblOficina").html(datos.Oficina);
        $("#txtHorarioE").val(datos.Horario);
        $("#txtPersonaContactoE").val(datos.PersonaContacto);
        $("#txtTelefonoContactoE").val(datos.TelefonoContacto);
        if (datos.RepartoDirecto == "Si") {
            $("#chkRepartoDirectoE").attr('checked', true);
        } else {
            $("#chkRepartoDirectoE").attr('checked', false);
        }
        $("#ddlTipoEnvioE").data("kendoComboBox").value((datos.TipoEnvio == "" ? "-1" : datos.TipoEnvio));
        $("#ddlOficinaDistribuidoraE").data("kendoComboBox").value((datos.IdOficinaDistribuidora == "" ? "-1" : datos.IdOficinaDistribuidora));
        //$("#ddlTipoEnvioE").val(datos.TipoEnvio);
        //$("#ddlOficinaDistribuidoraE").val(datos.IdOficinaDistribuidora);
        $("#txtFechaFinE").val((datos.FechaRecojoFin == "" ? fnFechaActual() : datos.FechaRecojoFin));
        $("#txtFechaInicioE").val((datos.FechaRecojoInicio == "" ? fnFechaActual() : datos.FechaRecojoInicio));
        $("#txtCapacidadE").val(datos.CapacidadAtencion);

        $("#divEdicionLugarE").dialog({
            title: "Editar Lugar de entrega",
            width: 650,
            height: 290,
            modal: true,
            resizable: false
        });
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
    function CargarDialog(id, ancho, alto, titulo) {
        $("#dvEleccionLugarEntrega").dialog({
            title: "Registrar Lugar de entrega",
            width: ancho,
            height: alto,
            modal: true,
            resizable: false
        });
    }

    function CargarLugarEntregaCampana(lstLugarE) {
        $("#tblLugarEntrega").jqGrid('clearGridData');
        if ($(lstLugarE).length > 0) {
            var i = 0;
            for (i = 0; i < $(lstLugarE).length; i++)
                $("#tblLugarEntrega").jqGrid('addRowData', lstLugarE[i].IdLugarEntregaCampana, lstLugarE[i]);
        }
        else {
            //alerta("No hay datos disponibles");
        }
    }

    function CargarOficina(lstOficina) {
        $("#tblEleccionLugarEntrega").jqGrid('clearGridData');
        if ($(lstOficina).length > 0) {
            var i = 0;
            for (i = 0; i < $(lstOficina).length; i++)
                $("#tblEleccionLugarEntrega").jqGrid('addRowData', lstOficina[i].IdOficina, lstOficina[i]);
            CargarDialog("#dvEleccionLugarEntrega", 830, 520, "Agregar Oficina");
        }
        else {
            //alerta("No hay datos disponibles");
        }
    }

    $('#txtOficina').live("keydown", function (e) {
        if (e.keyCode == 13) {
            ListarLugarEntrega();
            return false; // prevent the button click from happening
        }
    });

    $('#chkRepartoDirecto').change(function () {
        if ($(this).is(':checked')) {
            $("#trOficina").show();
        }
        else {
            $("#trOficina").hide();
        }
    });
});
    