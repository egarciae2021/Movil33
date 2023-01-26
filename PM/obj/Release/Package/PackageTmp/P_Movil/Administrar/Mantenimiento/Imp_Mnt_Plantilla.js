var tbHojas;
var lstCampo;
var lstTipoPlantilla;
var lstServicio;
var tipoText;
// =================================================
//  HINOPE
// =================================================
var lstServicioResumenCosto;
var lstServicioResumenConsumo;

// =================================================
//  END HINOPE
// =================================================

var lstZona;
var lstTipoServicioImportador;
var Extension = "";

function ActualizaPestanas(indiceTabBorrar) {
    var i = 1;
    tbHojas.tabs("remove", indiceTabBorrar);
    
    $('#tbHojas > ul a').each(function () {
        $(this).text("Hoja " + i.toString());
        i++;        
    });
}

function ValidarRegistrosFijos() {
    var band = false;
    $.ajax({
        type: "POST",
        url: "Imp_Mnt_Plantilla.aspx/ValidarRegistrosFijos",
        data: "{}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (result) {
            band = result.d;
            return band;
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
    return band;
}

var HeigthTab = 40;
var HeigthPanel = 50;
var HeigthTabla = 70;

// ==============================================================================
//  LOAD
// ==============================================================================
$(function () {

    var indiceTab = window.parent.tab.tabs("option", "selected");
    var Titulo = "";
    var PlantillaDetalle;
    var NumTab = 0;
    var Extensiones = "";

    $(".btnNormal").button({});

    inicio();
    DimPosElementos();

    $(window).resize(function () {
        DimPosElementos();
    });

    function DimPosElementos() {
        var Ancho = $(window).width();
        var Alto = $(window).height();


        $("#tbHojas").height(Alto - HeigthTab);
        //$("#pnlPrincipal").height(Alto - HeigthPanel);
        $("#pnlTabla").height(Alto - HeigthTabla);

    }



    function inicio() {
        Extensiones = $("#hdfExt").val();
        Extensiones = Extensiones.split(",");
    }

    tbHojas = $("#tbHojas").tabs({
        //tabTemplate: "<li><a href='#{href}'>#{label}</a> <span class='ui-icon ui-icon-close'>Eliminar Hoja</span></li>",
        add: function (event, ui) {
            var ifra = document.createElement('IFRAME');
            ifra.width = "100%";
            ifra.height = "95%";
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

    function CambiarExtension() {
        if ($("#ddlArchivo").val() == "-1") {
            Extension = "";
        }
        else {
            Extension = Extensiones[parseInt($("#ddlArchivo").val()) - 1];
        }

        var i = 0;
        for (i = 0; i < $("#tbHojas").tabs("length"); i++) {
            $("iframe", "#tbHojas")[i].contentWindow.$("#txtExtensionDefecto").val(Extension);
        }
    }

    $("#ddlArchivo").change(function () {
        var Cerro = false;
        if ($("#ddlArchivo").val() == "3") {
            $("#trTodaHoja").show();
            $("#btnAgregarHoja").show();
            $("#chkTodasHojas").attr('checked', false);
            var i = 1;
            $('#tbHojas > ul a').each(function () {
                $(this).text("Hoja " + i.toString());
                i++;
            });
            if ($("#ddlArchivo").val() == "-1") {
                $("#dvHoja").hide();
            }
            else {
                $("#dvHoja").show();
            }

            CambiarExtension();
        }
        else {
            var NumTabs = tbHojas.tabs("length");
            if (NumTabs > 1) {
                $('#divMsgConfirmacion').dialog({
                    title: "Advertencia",
                    modal: true,
                    buttons: {
                        "Si": function () {
                            var i = 0;
                            for (i = 0; i < NumTabs - 1; i++) {
                                tbHojas.tabs("remove", 1);
                            }

                            $('#tbHojas > ul a').each(function () {
                                $(this).text("Todas las Hojas");
                            });

                            $("#trTodaHoja").hide();
                            $("#btnAgregarHoja").hide();
                            Cerro = true;
                            $(this).dialog("close");

                            if ($("#ddlArchivo").val() == "-1") {
                                $("#dvHoja").hide();
                            }
                            else {
                                $("#dvHoja").show();
                            }

                            CambiarExtension();
                        },
                        "No": function () {
                            Cerro = true;
                            $("#ddlArchivo").val("3");
                            $(this).dialog("close");
                        }
                    },
                    close: function (event, ui) {
                        if (!Cerro) {
                            $("#ddlArchivo").val("3");
                        }
                    }
                });
            }
            else {
                $("#trTodaHoja").hide();
                $("#btnAgregarHoja").hide();

                var i = 0;
                for (i = 0; i < $("#tbHojas").tabs("length"); i++) {
                    $("iframe", "#tbHojas")[i].contentWindow.$("#btnEliminarHoja").hide();
                }

                $('#tbHojas > ul a').each(function () {
                    $(this).text("Detalle");
                });
                if ($("#ddlArchivo").val() == "-1") {
                    $("#dvHoja").hide();
                }
                else {
                    $("#dvHoja").show();
                }
                CambiarExtension();
            }
        }

        if ($("#ddlArchivo").val() == "1") {//Texto con separador
            var i = 0;
            for (i = 0; i < $("#tbHojas").tabs("length"); i++) {
                $("iframe", "#tbHojas")[i].contentWindow.tabOpciones.tabs('select', '#TabOpciones_TabJQ1');
                $("iframe", "#tbHojas")[i].contentWindow.$("#trLongitud").hide();
                $("iframe", "#tbHojas")[i].contentWindow.$("#txtLongitud").hide();
                $("iframe", "#tbHojas")[i].contentWindow.$("#tbCampoPlantilla").jqGrid('hideCol', ["inLon"]);
                $("iframe", "#tbHojas")[i].contentWindow.$("#TabOpciones").tabs("option", "disabled", []);
                $("iframe", "#tbHojas")[i].contentWindow.$('input:radio[name=rbSeparador]:nth(0)').attr('checked', true);
                $("iframe", "#tbHojas")[i].contentWindow.$("#txtOtroSeparador").hide();
                $("iframe", "#tbHojas")[i].contentWindow.$("#txtOtroSeparador").val("");
            }
        }
        else if ($("#ddlArchivo").val() == "2") {//Texto plano
            var i = 0;
            for (i = 0; i < $("#tbHojas").tabs("length"); i++) {
                $("iframe", "#tbHojas")[i].contentWindow.tabOpciones.tabs('select', '#TabOpciones_TabJQ1');
                $("iframe", "#tbHojas")[i].contentWindow.$("#trLongitud").show();
                $("iframe", "#tbHojas")[i].contentWindow.$("#txtLongitud").show();
                $("iframe", "#tbHojas")[i].contentWindow.$("#tbCampoPlantilla").jqGrid('showCol', ["inLon"]);
                $("iframe", "#tbHojas")[i].contentWindow.$("#TabOpciones").tabs("option", "disabled", [2]);
            }
        }
        else {//hoja de calculo y otros
            var i = 0;
            for (i = 0; i < $("#tbHojas").tabs("length"); i++) {
                $("iframe", "#tbHojas")[i].contentWindow.tabOpciones.tabs('select', '#TabOpciones_TabJQ1');
                $("iframe", "#tbHojas")[i].contentWindow.$("#trLongitud").hide();
                $("iframe", "#tbHojas")[i].contentWindow.$("#txtLongitud").hide();
                $("iframe", "#tbHojas")[i].contentWindow.$("#tbCampoPlantilla").jqGrid('hideCol', ["inLon"]);
                $("iframe", "#tbHojas")[i].contentWindow.$("#TabOpciones").tabs("option", "disabled", [2]);
                $("iframe", "#tbHojas")[i].contentWindow.$("#btnEliminarHoja").show();
            }
        }
    });

    $("#chkPlantillaMultiple").change(function () {
        for (i = 0; i < $("#tbHojas").tabs("length"); i++) {
            if ($('#chkPlantillaMultiple').is(':checked')) {
                $("iframe", "#tbHojas")[i].contentWindow.$("#hdfIsPlantillaMultiple").val(1);
                $("iframe", "#tbHojas")[i].contentWindow.$("#TabOpcionesResumen").tabs("option", "disabled", []);

            } else {
                $("iframe", "#tbHojas")[i].contentWindow.$("#hdfIsPlantillaMultiple").val(0);
                $("iframe", "#tbHojas")[i].contentWindow.$("#TabOpcionesResumen").tabs("option", "disabled", [1]);
            } 
        }
    });

    $("#chkTodasHojas").change(function () {
        var Cerro = false;
        if ($('#chkTodasHojas').is(':checked')) {
            var NumTabs = tbHojas.tabs("length");
            if (NumTabs > 1) {
                $('#divMsgConfirmacion').dialog({
                    title: "Advertencia",
                    modal: true,
                    buttons: {
                        "Si": function () {
                            var i = 0;
                            for (i = 0; i < NumTabs - 1; i++) {
                                tbHojas.tabs("remove", 1);
                            }

                            $('#tbHojas > ul a').each(function () {
                                $(this).text("Todas las Hojas");
                            });

                            Cerro = true;
                            $("#btnAgregarHoja").hide();
                            $(this).dialog("close");
                        },
                        "No": function () {
                            Cerro = true;
                            $("#chkTodasHojas").attr('checked', false);
                            $(this).dialog("close");
                        }
                    },
                    close: function (event, ui) {
                        if (!Cerro) {
                            $("#chkTodasHojas").attr('checked', false);
                        }
                    }
                });
            }
            else {
                $('#tbHojas > ul a').each(function () {
                    $(this).text("Todas las Hojas");
                });

                $("#btnAgregarHoja").hide();
            }
        }
        else {
            var i = 1;
            $('#tbHojas > ul a').each(function () {
                $(this).text("Hoja " + i.toString());
                i++;
            });

            $("#btnAgregarHoja").show();
        }
    });

    function AgregarDetalle() {
        pagina = 'Imp_Mnt_PlantillaDetalle.aspx?Cod=' + PlantillaDetalle.toString();
        var Id = "#" + "_Tab_PlantillaDetalle" + NumTab.toString();
        var $panel = tbHojas.find(Id);
        if (!$panel.length) {//En el caso que no exista el tab, lo crea
            tbHojas.tabs("add", Id, Titulo);
            $(Id).css("width", "99%");
            $(Id).css("height", "95%");
            $(Id).css("margin-top", "0px");
            $(Id).css("margin-left", "0px");
            $(Id).css("margin-bottom", "0px");
            $(Id).css("margin-right", "0px");
            $(Id).css("padding-top", "0px");
            $(Id).css("padding-left", "0px");
            $(Id).css("padding-bottom", "0px");
            $(Id).css("padding-right", "0px");
        }
        PlantillaDetalle = "";
        NumTab++;
    }

    $("#btnAgregarHoja").click(function (event) {
        var Hoja = tbHojas.tabs("length") + 1;
        Titulo = "Hoja " + Hoja.toString();
        AgregarDetalle();
    });

    $("#txtNombre").focusout(function () {
        $("#txtNombre").val($("#txtNombre").val().replace(/\\/g, ""));
    });

    // =====================================================================================
    //  GUARDAR
    // =====================================================================================

    $("#btnGuardar").click(function () {
        var i = 0;
        var ErrorValSubPlan = false;
        var oPlantilla = new ENT_MOV_IMP_Plantilla();

        if ($("#hdfCod").val() == "") {
            oPlantilla.P_inCodPla = "-1";
        }
        else {
            oPlantilla.P_inCodPla = $("#hdfCod").val();
        }

        oPlantilla.Operador.P_inCodOpe = $('#ddlOperador').val();
        oPlantilla.inTipArc = $('#ddlArchivo').val();
        oPlantilla.btVig = $('#chkEstado').is(':checked');
        oPlantilla.btTodHojPla = $('#chkTodasHojas').is(':checked');
        oPlantilla.vcNom = $('#txtNombre').val().replace(/'/g, "&#39").replace(/\\/g, "");
        oPlantilla.inTipTel = 1;

        if (oPlantilla.Operador.P_inCodOpe == "-1") {
            alerta("Seleccione un Operador, es un campo obligatorio");
            $("#ddlOperador").focus();
            return;
        }

        if ($.trim(oPlantilla.vcNom) == "") {
            alerta("Ingrese un Nombre a la Plantilla, es un campo obligatorio");
            $("#txtNombre").focus();
            return;
        }

        if (oPlantilla.inTipArc == "-1") {
            alerta("Seleccione un Tipo de Archivo, es un campo obligatorio");
            $("#ddlArchivo").focus();
            return;
        }

        for (i = 0; i < $("#tbHojas").tabs("length"); i++) {
            oPlantilla.PlantillaDetalles.push($("iframe", "#tbHojas")[i].contentWindow.ObtienePlantillaDetalle(i));
        }
        if ($(oPlantilla.PlantillaDetalles).length == 0) {
            alerta("Ingrese por lo menos un Detalle de Plantilla");
            return;
        }
        i = 0;

        $(oPlantilla.PlantillaDetalles).each(function () {
            if ($(this.Campos).length == 0) {
                $("#tbHojas").tabs("option", "selected", i);
                alerta("Ingrese por lo menos un campo la hoja actual");
                ErrorValSubPlan = true;
                return false;
            }

            //if (this.Zona.P_inCodOri == "-1") {
            //    $("#tbHojas").tabs("option", "selected", i);
            //    alerta("Seleccione una zona para la hoja actual, es un campo obligatorio");
            //    $("iframe", "#tbHojas")[i].contentWindow.$("#btnOpcion").click();
            //    $("iframe", "#tbHojas")[i].contentWindow.tabOpciones.tabs('select', '#TabOpciones_TabJQ1');
            //    $("iframe", "#tbHojas")[i].contentWindow.$("#ddlZona").focus();
            //    ErrorValSubPlan = true;
            //    return false;
            //}

            if ($("iframe", "#tbHojas")[i].contentWindow.$("#chkServicioDefecto").is(':checked') == true && this.F_inCodSerDef == "-1") {
                $("#tbHojas").tabs("option", "selected", i);
                alerta("Seleccione un servicio por defecto, es un campo obligatorio");
                $("iframe", "#tbHojas")[i].contentWindow.$("#btnOpcion").click();
                $("iframe", "#tbHojas")[i].contentWindow.tabOpciones.tabs('select', '#TabOpciones_TabJQ1');
                $("iframe", "#tbHojas")[i].contentWindow.$("#ddlServicioDefecto").focus();
                ErrorValSubPlan = true;
                return false;
            }

            if ($("iframe", "#tbHojas")[i].contentWindow.$("#chkServicioPreDefinido").is(':checked') == true && this.F_inCodSerPreDef == "-1") {
                $("#tbHojas").tabs("option", "selected", i);
                alerta("Seleccione un servicio pre definido, es un campo obligatorio");
                $("iframe", "#tbHojas")[i].contentWindow.$("#btnOpcion").click();
                $("iframe", "#tbHojas")[i].contentWindow.tabOpciones.tabs('select', '#TabOpciones_TabJQ1');
                $("iframe", "#tbHojas")[i].contentWindow.$("#ddlServicioPreDefinido").focus();
                ErrorValSubPlan = true;
                return false;
            }

            if ($("iframe", "#tbHojas")[i].contentWindow.$("#rbtActualizaCosto").is(':checked') == true && this.inTipCosteo == "-1") {
                $("#tbHojas").tabs("option", "selected", i);
                alerta("Seleccione un tipo de actualización de costo, es un campo obligatorio");
                $("iframe", "#tbHojas")[i].contentWindow.$("#btnOpcion").click();
                $("iframe", "#tbHojas")[i].contentWindow.tabOpciones.tabs('select', '#TabOpciones_TabJQ1');
                $("iframe", "#tbHojas")[i].contentWindow.$("#rbtActualizaCosto").focus();
                ErrorValSubPlan = true;
                return false;
            }

            if (this.inTipPla == 1) {
                if (this.vcForFec1 == this.vcForFec2 || this.vcForFec1 == this.vcForFec3 || this.vcForFec2 == this.vcForFec3) {
                    $("#tbHojas").tabs("option", "selected", i);
                    alerta("En el formato de fecha no pueden coincidir ninguno de los tres valores");
                    $("iframe", "#tbHojas")[i].contentWindow.$("#btnOpcion").click();
                    $("iframe", "#tbHojas")[i].contentWindow.$("select#ddlFormatoFechaDia").focus();
                    ErrorValSubPlan = true;
                    return false;
                }
            }

            if (this.vcSepFec == "") {
                $("#tbHojas").tabs("option", "selected", i);
                alerta("Ingrese un caracter para el separador de fecha, es un campo obligatorio");
                $("iframe", "#tbHojas")[i].contentWindow.$("#btnOpcion").click();
                $("iframe", "#tbHojas")[i].contentWindow.tabOpciones.tabs('select', '#TabOpciones_TabJQ2');
                $("iframe", "#tbHojas")[i].contentWindow.$("#txtSeparadorFecha").focus();
                ErrorValSubPlan = true;
                return false;
            }
            if (this.vcSepHor == "") {
                $("#tbHojas").tabs("option", "selected", i);
                alerta("Ingrese un caracter para el separador de hora, es un campo obligatorio");
                $("iframe", "#tbHojas")[i].contentWindow.$("#btnOpcion").click();
                $("iframe", "#tbHojas")[i].contentWindow.tabOpciones.tabs('select', '#TabOpciones_TabJQ2');
                $("iframe", "#tbHojas")[i].contentWindow.$("#txtSeparadorHora").focus();
                ErrorValSubPlan = true;
                return false;
            }

            if (this.inTipSep == "3" && this.vcOtrSep == "" && oPlantilla.inTipArc == "1") {
                $("#tbHojas").tabs("option", "selected", i);
                alerta("Ingrese un caracter para el separador de campo, es un campo obligatorio");
                $("iframe", "#tbHojas")[i].contentWindow.$("#btnOpcion").click();
                $("iframe", "#tbHojas")[i].contentWindow.tabOpciones.tabs('select', '#TabOpciones_TabJQ3');
                $("iframe", "#tbHojas")[i].contentWindow.$("#txtOtroSeparador").focus();
                ErrorValSubPlan = true;
                return false;
            }

            // ===================================================================================
            // HINOPE - para guardar una plantilla resumen, no es necesario validar estos datos
            // ===================================================================================

            // =====
            // SI 
            // =====
            if (this.inTipPla == 2) {

                var flagValidaNumero = true;

                if (this.idTipPlanRes == 2) {
                    $(this.Campos).each(function () {
                        if (this.vcDesSer == 'Numero' || this.vcDesSer == 'Número') {
                            flagValidaNumero = false;
                        }
                    });
                } else {
                    $(this.Campos).each(function () {
                        if (this.vcDesSer == 'IMEI' || this.vcDesSer == 'imei') {
                            flagValidaNumero = false;
                        }
                    });
                }

                if (flagValidaNumero) {
                    if (this.idTipPlanRes == 2) {
                        alerta("Debe ingresar el campo número");
                    } else {
                        alerta("Debe ingresar el campo imei");
                    }
                    ErrorValSubPlan = true;
                    return false;
                }
            }
            // =====
            // NO 
            // =====
            if (this.inTipPla != 2) {
                if (this.btConNumCel == false && this.inDirNumCel == -1) {
                    alerta("Debe ingresar una ubicación de número válido");
                    $("iframe", "#tbHojas")[i].contentWindow.$("#btnOpcion").click();
                    $("iframe", "#tbHojas")[i].contentWindow.tabOpciones.tabs('select', '#TabOpciones_TabJQ4');
                    $("iframe", "#tbHojas")[i].contentWindow.$("#ddlUbicacionNumCelular").focus();
                    ErrorValSubPlan = true;
                    return false;
                }

                if (this.btCabeceraFecha == false && this.inDirecFecha == -1) {
                    alerta("Debe ingresar una ubicación de número válido");
                    $("iframe", "#tbHojas")[i].contentWindow.$("#btnOpcion").click();
                    $("iframe", "#tbHojas")[i].contentWindow.tabOpciones.tabs('select', '#TabOpciones_TabJQ4');
                    $("iframe", "#tbHojas")[i].contentWindow.$("#ddlUbicacionFecha").focus();
                    ErrorValSubPlan = true;
                    return false;
                }
            }
            var band = ValidarRegistrosFijos();
            if (this.inTipPla == 2) {
                if (this.dcTasImp > 0) {
                    if (band == false) {
                        alerta("Esta pantilla no se puede registrar, \ndebibo a que no existen el grupo: Impuestos en la tabla GrupoConcepto,\n y/o el concepto IGV no existe en la en la tabla ConceptoResumen.");
                        $("iframe", "#tbHojas")[i].contentWindow.$("#btnOpcionResumen").click();
                        $("iframe", "#tbHojas")[i].contentWindow.tabOpcionesResumen.tabs('select', '#TabOpcionesResumen_TabJQ2');
                        $("iframe", "#tbHojas")[i].contentWindow.$("#txtTasaRes").focus();
                        ErrorValSubPlan = true;
                        return false;
                    }

                }
            }

            //JHERRERA 20141030: Filtros
            if (this.btInsEntrFil1 == true && this.inCodSerFil1 == -1) {
                alerta("Debe ingresar un servicio válido");
                $("iframe", "#tbHojas")[i].contentWindow.$("#btnOpcion").click();
                $("iframe", "#tbHojas")[i].contentWindow.tabOpciones.tabs('select', '#TabOpciones_TabJQ5');
                $("iframe", "#tbHojas")[i].contentWindow.$("#ddlServicioFiltro1").focus();
                ErrorValSubPlan = true;
                return false;
            }
            if (this.btInsEntrFil2 == true && this.inCodSerFil2 == -1) {
                alerta("Debe ingresar un servicio válido");
                $("iframe", "#tbHojas")[i].contentWindow.$("#btnOpcion").click();
                $("iframe", "#tbHojas")[i].contentWindow.tabOpciones.tabs('select', '#TabOpciones_TabJQ5');
                $("iframe", "#tbHojas")[i].contentWindow.$("#ddlServicioFiltro2").focus();
                ErrorValSubPlan = true;
                return false;
            }
            if (this.btInsEntrFil3 == true && this.inCodSerFil3 == -1) {
                alerta("Debe ingresar un servicio válido");
                $("iframe", "#tbHojas")[i].contentWindow.$("#btnOpcion").click();
                $("iframe", "#tbHojas")[i].contentWindow.tabOpciones.tabs('select', '#TabOpciones_TabJQ5');
                $("iframe", "#tbHojas")[i].contentWindow.$("#ddlServicioFiltro3").focus();
                ErrorValSubPlan = true;
                return false;
            }
            //-->
            //JHERRERA 20141126: Filtros
            if (this.btInsEntrFil4 == true && this.inCodSerFil4 == -1) {
                alerta("Debe ingresar un servicio válido");
                $("iframe", "#tbHojas")[i].contentWindow.$("#btnOpcion").click();
                $("iframe", "#tbHojas")[i].contentWindow.tabOpciones.tabs('select', '#TabOpciones_TabJQ5');
                $("iframe", "#tbHojas")[i].contentWindow.$("#ddlServicioFiltro4").focus();
                ErrorValSubPlan = true;
                return false;
            }
            if (this.btInsEntrFil5 == true && this.inCodSerFil5 == -1) {
                alerta("Debe ingresar un servicio válido");
                $("iframe", "#tbHojas")[i].contentWindow.$("#btnOpcion").click();
                $("iframe", "#tbHojas")[i].contentWindow.tabOpciones.tabs('select', '#TabOpciones_TabJQ5');
                $("iframe", "#tbHojas")[i].contentWindow.$("#ddlServicioFiltro5").focus();
                ErrorValSubPlan = true;
                return false;
            }
            if (this.btInsEntrFil6 == true && this.inCodSerFil6 == -1) {
                alerta("Debe ingresar un servicio válido");
                $("iframe", "#tbHojas")[i].contentWindow.$("#btnOpcion").click();
                $("iframe", "#tbHojas")[i].contentWindow.tabOpciones.tabs('select', '#TabOpciones_TabJQ5');
                $("iframe", "#tbHojas")[i].contentWindow.$("#ddlServicioFiltro6").focus();
                ErrorValSubPlan = true;
                return false;
            }
            //-->

            //JHERRERA 20141030: Filtros
            if (this.btInsEntrFil1 == true && this.inCodSerFil1 == -1) {
                alerta("Debe ingresar un servicio válido");
                $("iframe", "#tbHojas")[i].contentWindow.$("#btnOpcion").click();
                $("iframe", "#tbHojas")[i].contentWindow.tabOpciones.tabs('select', '#TabOpciones_TabJQ5');
                $("iframe", "#tbHojas")[i].contentWindow.$("#ddlServicioFiltro1").focus();
                ErrorValSubPlan = true;
                return false;
            }
            if (this.btInsEntrFil2 == true && this.inCodSerFil2 == -1) {
                alerta("Debe ingresar un servicio válido");
                $("iframe", "#tbHojas")[i].contentWindow.$("#btnOpcion").click();
                $("iframe", "#tbHojas")[i].contentWindow.tabOpciones.tabs('select', '#TabOpciones_TabJQ5');
                $("iframe", "#tbHojas")[i].contentWindow.$("#ddlServicioFiltro2").focus();
                ErrorValSubPlan = true;
                return false;
            }
            if (this.btInsEntrFil3 == true && this.inCodSerFil3 == -1) {
                alerta("Debe ingresar un servicio válido");
                $("iframe", "#tbHojas")[i].contentWindow.$("#btnOpcion").click();
                $("iframe", "#tbHojas")[i].contentWindow.tabOpciones.tabs('select', '#TabOpciones_TabJQ5');
                $("iframe", "#tbHojas")[i].contentWindow.$("#ddlServicioFiltro3").focus();
                ErrorValSubPlan = true;
                return false;
            }
            //-->
            //JHERRERA 20141126: Filtros
            if (this.btInsEntrFil4 == true && this.inCodSerFil4 == -1) {
                alerta("Debe ingresar un servicio válido");
                $("iframe", "#tbHojas")[i].contentWindow.$("#btnOpcion").click();
                $("iframe", "#tbHojas")[i].contentWindow.tabOpciones.tabs('select', '#TabOpciones_TabJQ5');
                $("iframe", "#tbHojas")[i].contentWindow.$("#ddlServicioFiltro4").focus();
                ErrorValSubPlan = true;
                return false;
            }
            if (this.btInsEntrFil5 == true && this.inCodSerFil5 == -1) {
                alerta("Debe ingresar un servicio válido");
                $("iframe", "#tbHojas")[i].contentWindow.$("#btnOpcion").click();
                $("iframe", "#tbHojas")[i].contentWindow.tabOpciones.tabs('select', '#TabOpciones_TabJQ5');
                $("iframe", "#tbHojas")[i].contentWindow.$("#ddlServicioFiltro5").focus();
                ErrorValSubPlan = true;
                return false;
            }
            if (this.btInsEntrFil6 == true && this.inCodSerFil6 == -1) {
                alerta("Debe ingresar un servicio válido");
                $("iframe", "#tbHojas")[i].contentWindow.$("#btnOpcion").click();
                $("iframe", "#tbHojas")[i].contentWindow.tabOpciones.tabs('select', '#TabOpciones_TabJQ5');
                $("iframe", "#tbHojas")[i].contentWindow.$("#ddlServicioFiltro6").focus();
                ErrorValSubPlan = true;
                return false;
            }
            //-->

            contPlaMul = 6;
            for (var x = 1; x < contPlaMul; x++) {
                if ($("iframe", "#tbHojas")[i].contentWindow.$("#TxtFiltroMultiple_" + x).val() != "") {
                    if ($("iframe", "#tbHojas")[i].contentWindow.$("#ddlFiltroMultiple_" + x).val() == "-1") {
                        alerta("Debe seleccionar una plantilla válida");
                        $("iframe", "#tbHojas")[i].contentWindow.$("#btnOpcionResumen").click();
                        $("iframe", "#tbHojas")[i].contentWindow.tabOpcionesResumen.tabs('select', '#TabOpcionesResumen_TabJQ2');
                        $("iframe", "#tbHojas")[i].contentWindow.$("#ddlFiltroMultiple_" + x).focus();
                        ErrorValSubPlan = true;
                        return false;
                    }
                } else {
                    continue;
                }
            }


            contPlaCab = 6;
            for (var x = 1; x < contPlaCab; x++) {
                if ($("iframe", "#tbHojas")[i].contentWindow.$("#txtCabTexto_" + x).val() != "") {
                    if ($("iframe", "#tbHojas")[i].contentWindow.$("#TxtCabLongitud_" + x).val() == "") {
                        alerta("Debe ingresar una posición válida");
                        $("iframe", "#tbHojas")[i].contentWindow.$("#btnOpcionResumen").click();
                        $("iframe", "#tbHojas")[i].contentWindow.tabOpcionesResumen.tabs('select', '#TabOpcionesResumen_TabJQ3');
                        $("iframe", "#tbHojas")[i].contentWindow.$("#TxtCabLongitud_" + x).focus();
                        ErrorValSubPlan = true;
                        return false;
                    }
                } else {
                    continue;
                }
            }

            i++;
        });

        if (ErrorValSubPlan) {
            return;
        }
        var p_oPlantilla = JSON.stringify(oPlantilla);

        BloquearPagina(true);
        $.ajax({
            type: "POST",
            url: "Imp_Mnt_Plantilla.aspx/Guardar",
            data: "{'p_oPlantilla': '" + p_oPlantilla + "'}",
            contentType: "application/json; charset=iso-8859-1",
            dataType: "json",
            success: function (result) {
                window.parent.ActualizarGrilla();
                Mensaje("<h1>Plantilla Guardada</h1><br/>", document, CerroMensaje);
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
                BloquearPagina(false);
            }
        });
    });

    function CerroMensaje() {
        BloquearPagina(false);
        if ($('#hdfCod').val() == "") {
            LimpiarTodo();
        }
        else {
            window.parent.tab.tabs("remove", indiceTab);
        }

        $("#ddlOperador").prop("selectedIndex", 0);
        $("#ddlOperador").attr('disabled', false);
        if ($("#ddlOperador option").length == 2) {
            $("#ddlOperador").prop("selectedIndex", 1);
            $("#ddlOperador").attr('disabled', true);
            $("#ddlOperador").change();
        }

    }

    function CargarDetalle() {
        if ($("#hdfCod").val() != "") {
            $("#ddlArchivo").attr("disabled", "disabled");
            $('#ddlOperador').attr("disabled", "disabled");

            if ($(lstPlantillaDetalles).length > 0) {
                $(lstPlantillaDetalles).each(function () {
                    PlantillaDetalle = this.P_inCodPlaDet;

                    if ($("#ddlArchivo").val() != "3") {
                        Titulo = "Detalle";
                    }
                    else {
                        if ($('#chkTodasHojas').is(':checked')) {
                            Titulo = "Todas las Hojas";
                        }
                        else {
                            Titulo = "Hoja " + this.inNumHojCal.toString();
                        }
                    }

                    AgregarDetalle();
                });
                $("#tbHojas").tabs("option", "selected", 0);
            }
            else {
                PlantillaDetalle = "";

                if ($("#ddlArchivo").val() != "3") {
                    Titulo = "Detalle";
                }
                else {
                    if ($('#chkTodasHojas').is(':checked')) {
                        Titulo = "Todas las Hojas";
                    }
                    else {
                        Titulo = "Hoja 1";
                    }
                }
                AgregarDetalle();
            }
            $("#dvHoja").show();
        }
        else {
            PlantillaDetalle = "";
            Titulo = "Detalle";
            AgregarDetalle();
        }
    }

    $("#btnCerrar").click(function () {
        window.parent.tab.tabs("remove", window.parent.tab.tabs("option", "selected"));
    });
    function LimpiarTodo() {
        $("select#ddlOperador").prop('selectedIndex', 0);
        $('#txtNombre').val("");
        $("select#ddlArchivo").prop('selectedIndex', 0);
        $('#trTodaHoja').hide();
        $("#chkTodasHojas").attr('checked', false);
        $('#trEstado').hide();
        $("#chkEstado").attr('checked', true);
        $("#btnAgregarHoja").hide();
        $("#dvHoja").hide();
        var numTab = $("#tbHojas").tabs("length");
        for (i = 0; i < numTab; i++) {
            $("#tbHojas").tabs('remove', 0);
        }
        CargarDetalle();
    }

    $.ajax({
        type: "POST",
        url: "Imp_Mnt_Plantilla.aspx/ListarDatos",
        data: "{}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            var datos = JSON.parse(result.d);
            lstCampo = datos["lstCampo"];
            lstTipoPlantilla = datos["lstTipoPlantilla"];
            lstServicio = datos["lstServicio"];

            // ===========================================================================
            //  HINOPE
            // ===========================================================================

            lstServicioResumenCosto = datos["lstServicioResumenCosto"];
            lstServicioResumenConsumo = datos["lstServicioResumenConsumo"];

            // ===========================================================================
            //  END HINOPE
            // ===========================================================================
            lstZona = datos["lstZona"];
            lstTipoServicioImportador = datos["lstTipoServicioImportador"];

            if ($(lstCampo).length == 1) {
                alerta("Ingrese por lo Menos un Campo");
                window.parent.tab.tabs("remove", indiceTab);
            }
            else if ($(lstTipoPlantilla).length == 0) {
                alerta("Ingrese por lo menos un Tipo de Plantilla y vuelva a intentarlo");
                window.parent.tab.tabs("remove", indiceTab);
            }
            else if ($(lstServicio).length == 1) {
                alerta("Ingrese por lo menos un servicio y vuelva a intentarlo");
                window.parent.tab.tabs("remove", indiceTab);
            }
            else if ($(lstZona).length == 1) {
                alerta("Ingrese por lo menos una Zona y vuelva a intentarlo");
                window.parent.tab.tabs("remove", indiceTab);
            }
            else if ($(lstTipoServicioImportador).length == 0) {
                alerta("Ingrese por lo menos un Tipo Servicio Importador y vuelva a intentarlo");
                window.parent.tab.tabs("remove", indiceTab);
            }
            else {
                CargarDetalle();
            }
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });

    //CargarDetalle();

    $("#btnEliminarHoja").click(function () {
        if (tbHojas.tabs("length") > 1) {

            ActualizaPestanas(tbHojas.tabs("option", "selected"));
        }
        else {
            alerta("No puede borrar mas hojas ya que solo existe una");
        }
    });



});
