var Selecciono;
var tbAsignacion;
var lstServicio;
var lstTipoServicio;
var oCulturaUsuario;

function plan(P_inCod, vcNom, vcDes, dcMon, F_inCodOpe, btVig, F_inCodTip, MantienePlanCampana, inMinAdi) {
    this.P_inCod = P_inCod;
    this.vcNom = vcNom;
    this.vcDes = vcDes;
    this.dcMon = dcMon;
    this.F_inCodOpe = F_inCodOpe;
    this.btVig = btVig;
    this.SubPlanes = [];
    this.Modelos = [];
    this.F_inCodTip = F_inCodTip;
    this.MantienePlanCampana = MantienePlanCampana;
    this.inMinAdi = inMinAdi;
}

function ActualizaMonto() {
    var monto = 0;
    var Monto;

    for (i = 0; i < $("#tbAsignacion").tabs("length"); i++) {
        var Monto = $("iframe", "#tbAsignacion")[i].contentWindow.ObtieneSubPlan().dcMon;
        //alert(Monto + '-' + 1);
        if (Monto != "") {
            //if (oCulturaUsuario.vcSimDec = ',') {
            //    monto += parseFloat(Monto.replace(/\s/g, "").replace(",", "."));
            //} else {
                monto += parseFloat(Monto);
            //}            
            //alert(ParseFloatMultiPais(Monto, oCulturaUsuario));
            //monto += parseFloat(ParseFloatMultiPais(Monto, oCulturaUsuario));
            //alert(monto);
        }
    }

    //$("#lblMonto").html(monto);
    //if (oCulturaUsuario.vcSimDec == ',') {
    //    $("#lblMonto").html(FormatoNumero(monto.toString().replace(/\s/g, "").replace(".", ","), oCulturaUsuario));
    //} else {
    //    $("#lblMonto").html(FormatoNumero(monto, oCulturaUsuario));
    //}
    if (monto != 0) {
        $("#lblMonto").val(FormatoNumero(monto, oCulturaUsuario));
        var chkIncImp = document.getElementById("chkIncImp");
        if (chkIncImp.checked == true) {
            var monto = $("#lblMonto").val();
            var montoImp = $("#hdfImpto").val();
            var montoSinImp = 0;
            if (monto == "" || monto == null) {
                monto = 0;
            }
            montoSinImp = monto / montoImp;
            $("#lblMontoImp").html(FormatoNumero(montoSinImp, oCulturaUsuario));
            $("#trMontoIncImpuesto").show();
        }
    }    
    //console.log("monto: ", monto);

    if (monto == 0) {
        $("#lblMonto").prop('disabled', false);
        $("#lblMonto").css("background-color", "#FFF");
    }
    else {
        $("#lblMonto").prop('disabled', true);
        $("#lblMonto").css("background-color", "#EBEBE4");
    }
    

}

function fnSpace(noOfSpaces) {
    var space = "&nbsp;", returnValue = "";
    var index = 0;
    for (index = 0; index < noOfSpaces; index++) {
        returnValue += space;
    }
    return returnValue;
}

$(function () {
    oCulturaUsuario = window.parent.parent.oCulturaUsuario;

    var indiceTab = 0;
    try {
        indiceTab = window.parent.tab.tabs("option", "selected");
    } catch (e) {
    }
    
    var pagina = "";
    var NumeroSubPlan = 1;
    var Titulo = "";
    var SubPlan;
    var CargoServicio = false;

    $("#lblMonto").css({ "text-align": "right" });
    if (oCulturaUsuario.vcCodCul.toString().toLowerCase() != 'es-pe' && oCulturaUsuario != null) {
        $("#lblMonto").text(FormatoNumero($("#lblMonto").val(), oCulturaUsuario));    
    }

    //$("#txtMinAdi").keypress(ValidarEntero);
    ValidarNumeroEnCajaTexto("txtMinAdi", ValidarEntero);

    $("#chkMantienePlanCamp").uniform();

    //    $("#ddlOperador").kendoComboBox();
    //    var combobox = $("#ddlOperador").data("kendoComboBox"); 
    //    combobox.readonly(true); 

    Mantenimiento_Mostrar_VARBINARY("", "../../../");

    IniciarPagina();

    if ($("#hdfCodDispositivos").val() != "") {
        var id = $("#hdfCodDispositivos").val();
        var nombre = $("#hdfNomDispositivos").val();
        var arrID = id.substring(0, id.length - 1).split(",");
        var arrNOM = nombre.substring(0, nombre.length - 2).split("*,");
        var t = 0;
        for (t = 0; t < arrID.length; t++) {
            $('#lstPicklist').append('<option value="' + arrID[t] + '">' + arrNOM[t] + '</option>');
        }
    }

    $("#ddlLineaTipo").change(function () {
        if ($("#ddlLineaTipo").val() == "1") {
            $("#trManientePlan").hide();
            $('input[name=chkMontoFijo]').attr('checked', false);
        } else {
            $("#trManientePlan").show();
        }

    });

    ActivarCombokendo("#ddlOperador", "200");
    ActivarCombokendo("#ddlLineaTipo", 120);
    ActivarCombokendo("#ddlTipoServicio", 120);

    if ($("#hdfTotalLineas").val() > 0) {
        $("#ddlOperador").data("kendoComboBox").enable(false);
        $("#dvInfoOpe").show();
    } else {
        $("#ddlOperador").data("kendoComboBox").enable();
        $("#dvInfoOpe").hide();
    }

    function IniciarPagina() {
        $("#txtPlan").focus();
        $(".tdEtiqueta").css("width", "80px");
        if ($("#hdfPlan").val() != "") {
            $("#txtPlan").prop("disabled", true);
        } else {
            $("#txtPlan").prop("disabled", false);
        }
    }

    $(".btnNormal").button();

    $(".VARCHAR").keypress(ValidarCadena);
    $(".INT").keypress(ValidarEntero);
    $(".DECIMAL").keypress(ValidarDecimal);
    $(".DATE").keypress(ValidarFecha);
    $(".DATETIME").keypress(ValidarFechaHora);

    $(".DATETIME").AnyTime_picker({ format: "%d/%m/%Y %H:%i:%s",
        labelTitle: "Fecha-Hora",
        labelHour: "Hora",
        labelMinute: "Minuto",
        labelSecond: "Segundo",
        labelYear: "Año",
        labelMonth: "Mes",
        labelDayOfMonth: "Dia",
        monthAbbreviations: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
        monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        dayAbbreviations: ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'],
        dayNames: ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado']
    });

    $(".DATE").datepicker({
        changeMonth: true,
        changeYear: true
    });

    tbAsignacion = $("#tbAsignacion").tabs({
        tabTemplate: "<li><a href='#{href}'>#{label}</a> <span class='ui-icon ui-icon-close'>Remover Tab</span></li>",
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


    $(".btnPicklist").button();
    $(".btnPicklist").css({ "width": "80px" });
    $("#lstPicklist").css({ "height": "150px" });




    $("#txt_Dispositivos").keypress(ValidarAlfaNumericoConEspacios);  // $("#txt_Dispositivos").keypress(ValidarAlfaNumericoConEspacios);

    $("#btnModelosPlan").click(function (event) {
        $('#dvModelosPlan').dialog({
            title: "Modelos del Plan",
            width: 500,
            modal: true,
            buttons: {
                "Aceptar": function () {
                    $(this).dialog("close");
                    //var index = $("li", tbAsignacion).index($(this).parent());
                    //tbAsignacion.tabs("remove", index);
                },
                "Cerrar": function () {
                    $(this).dialog("close");
                }
            }
        });
    });

    $("#txt_Dispositivos").autocomplete({
        minLength: 0,
        source: function (request, response) {

            var Dato = $("#txt_Dispositivos").val();
            Dato = $.trim(Dato);
            if (Dato == '') {
                Dato = 'x@x@x';
            }

            $.ajax({
                type: "POST",
                url: "../../../Common/WebService/General.asmx/ListarModDispAutoc",
                data: "{'maxFilas': '" + 10 + "'," +
                                  "'vcNomAre': '" + Dato.replace(/'/g, "&#39").replace(/"/g, "&#34").replace(/\\/g, "&#92") + "'," + "'idCliente': '" + $("#hdfCodCliente").val() + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {
                    response($.map(result.d, function (item) {
                        return {
                            label: $.trim(item.vcNom),
                            P_inCod: $.trim(item.P_inCod)
                        };
                    }));
                },
                cache: false,
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    alerta(errorThrown);
                }
            });
        },
        focus: function (event, ui) {
            $("#txt_Dispositivos").val(ui.item.label);
            return false;
        },
        select: function (event, ui) {
            Selecciono = true;
            $("#txt_Dispositivos").val(ui.item.label);
            $("#hdfCodDispositivos").val(ui.item.P_inCod);
            return false;
        },
        change: function (event, ui) {
            if (!Selecciono)
            { $("#hdfCodDispositivos").val(""); }
            return false;
        },
        open: function (event, ui) {
            Selecciono = false;
            return false;
        }
    })
                .data("autocomplete")._renderItem = function (ul, item) {
                    return $("<li></li>")
            			.data("item.autocomplete", item)
                        .append("<a>" + item.label + "</a>")
            			.appendTo(ul);
                };
    $("#btnPicklistAgregar").live("click", function () {
        fnPicklistAgregar();
    });

    $("#btnPicklistEliminar").live("click", function () {
        fnPicklistEliminar();
    });
    $('#txt_Dispositivos').keypress(function (event) {
        if (event.which == '13') {
            if ($.trim($('#txt_Dispositivos').val()) != '' && Selecciono == true) {
                fnPicklistAgregar();
            }
        }
    });

    //    $("#txtPlan").focusout(function () {
    //        $("#txtPlan").val($("#txtPlan").val().replace(/\\/g, ""));
    //    });

    $("#btnGuardar").click(function (event) {
        var i = 0;
        var Modelos_Plan = "";
        var ErrorValSubPlan = false;
        var Plan = new plan();
        var CamposDinamicos = "";

        if ($("#hdfPlan").val() == "") {
            Plan.P_inCod = "-1";
        }
        else {
            Plan.P_inCod = $("#hdfPlan").val();
        }
        Plan.vcNom = $("#txtPlan").val().replace(/'/g, "&#39").replace(/"/g, "&#34").replace(/\\/g, "&#92");
        Plan.vcDes = $("#txtDescripcion").data("kendoEditor").value().replace(/'/g, "&#39").replace(/"/g, "&#34").replace(/\\/g, "&#92");
        Plan.vcNom = Plan.vcNom.replace(/'/g, "&#39").replace(/"/g, "&#34").replace(/\\/g, "&#92");
        Plan.vcDes = Plan.vcDes.replace(/'/g, "&#39").replace(/"/g, "&#34").replace(/\\/g, "&#92");

        Plan.F_inCodOpe = $("#ddlOperador").val();

        //Plan.dcMon = $("#lblMonto").html().replace($("#hdfSepMiles").val(), "");
        Plan.dcMon = DevuelveNumeroSinFormato($("#lblMonto").val(), oCulturaUsuario, false);   //ECONDEÑA  12/10/2016

        Plan.btVig = false;
        Plan.F_inCodTip = $("#ddlLineaTipo").val();
        if ($("#txtMinAdi").val() == "")
        { Plan.inMinAdi = 0; }
        else
        { Plan.inMinAdi = $("#txtMinAdi").val(); }

        if ($('#chkEstado').is(':checked')) {
            Plan.btVig = true;
        }
        if ($("#chkMantienePlanCamp").is(":checked")) {
            Plan.MantienePlanCampana = true;
        }

        if (Plan.vcNom == "") {
            //window.top.alerta("El nombre del plan es un campo obligatorio");
            alerta("El nombre del plan es un campo obligatorio");
            $("#txtPlan").focus();
            return;
        }

        if (Plan.vcDes.length > 8000) {
            //window.top.alerta("Se exedío la cantidad de caracteres en la Descripción");
            alerta("Se exedío la cantidad de caracteres en la Descripción");
            var editor = $("#txtDescripcion").data("kendoEditor");
            editor.focus();
            //$("#txtDescripcion").focus();
            return;
        }

        if (Plan.F_inCodOpe == "-1") {
            //window.top.alerta("Seleccione un operador, es un campo obligatorio");
            alerta("Seleccione un operador, es un campo obligatorio");
            $("#ddlOperadorPlan").focus();
            return;
        }
        if (Plan.F_inCodTip == "-1") {
            Plan.F_inCodTip = 1;
            //////window.top.alerta("Seleccione un tipo de grupo, es un campo obligatorio");
            ////alerta("Seleccione un tipo de grupo, es un campo obligatorio");
            ////$("#ddlLineaTipo").focus();
            ////return;
        }

        for (i = 0; i < $("#tbAsignacion").tabs("length"); i++) {
            Plan.SubPlanes.push($("iframe", "#tbAsignacion")[i].contentWindow.ObtieneSubPlan());
        }

        if ($(Plan.SubPlanes).length == 0) {
            //window.top.alerta("Ingrese por lo menos un Sub Plan");
            alerta("Ingrese por lo menos un Sub Plan");
            return;
        }

        $("#lstPicklist option").each(function (e) {
            Modelos_Plan += this.value + ',';
        });
        Plan.Roaming = $("#chkRoaming").is(":checked");

        Plan.IncluyeImpuesto = $("#chkIncImp").is(":checked");

        i = 0;
        $(Plan.SubPlanes).each(function () {
            if (this.vcNom == "") {
                //window.top.alerta("Ingrese el nombre de la Sub Plan, es un campo obligatorio");
                alerta("Ingrese el nombre de la Sub Plan, es un campo obligatorio");
                $("#tbAsignacion").tabs("option", "selected", i);
                $("iframe", "#tbAsignacion")[i].contentWindow.$("#txtNombre").focus();
                ErrorValSubPlan = true;
                return false;
            }
            if (this.dcMon == "") {
                //window.top.alerta("Ingrese el monto de " + this.vcNom + ", es un campo obligatorio");
                alerta("Ingrese el monto de " + this.vcNom + ", es un campo obligatorio");
                $("#tbAsignacion").tabs("option", "selected", i);
                $("iframe", "#tbAsignacion")[i].contentWindow.$("#txtMonto").focus();
                ErrorValSubPlan = true;
                return false;
            }
            if (this.Servicios.length == 0) {
                //window.top.alerta("Ingrese por lo menos un servicio de " + this.vcNom);
                alerta("Ingrese por lo menos un servicio de " + this.vcNom);
                $("#tbAsignacion").tabs("option", "selected", i);
                $("iframe", "#tbAsignacion")[i].contentWindow.$("#btnAgregarServicio").focus();
                ErrorValSubPlan = true;
                return false;
            }
            this.vcNom = this.vcNom.replace(/'/g, "&#39").replace(/"/g, "&#34").replace(/\\/g, "&#92");
            this.vcDes = this.vcDes.replace(/'/g, "&#39").replace(/"/g, "&#34").replace(/\\/g, "&#92");

            if (oCulturaUsuario.vcSimSepMil == ",") {
                this.dcMon = this.dcMon.toString().replace(/,/g, "");
                this.dcCan = this.dcCan.toString().replace(/,/g, "");
            }

            i++;

        });

        if (ErrorValSubPlan) {
            return;
        }


        //Plan.Modelos.clear();
        //        $('#lstPicklist option').each(function () {
        //            Plan.Modelos.push($(this).val());
        //        });

        if (oCulturaUsuario.vcSimDec == ',') {
            Plan.dcMon = Plan.dcMon.toString().replace(".", "");
            Plan.dcMon = Plan.dcMon.toString().replace(",", ".");
        } else {
            Plan.dcMon = ParseFloatMultiPais(Plan.dcMon, oCulturaUsuario);
        }

        var oPlan = JSON.stringify(Plan);

        $(".VARCHAR").each(function (i) {
            CamposDinamicos += "[" + $(this).attr("obj") + "]";
            CamposDinamicos += " = \"";
            CamposDinamicos += this.value.replace(/'/g, "&#39").replace(/"/g, "&#34").replace(/\\/g, "&#92");
            CamposDinamicos += "\",";

        });
        var ValidacionNumerica = true;
        $(".INT").each(function (i) {
            CamposDinamicos += "[" + $(this).attr("obj") + "]";
            CamposDinamicos += " = ";
            if ($.trim(this.value) == "") {
                CamposDinamicos += "0";
            }
            else {
                CamposDinamicos += this.value.replace(new RegExp('\\' + oCulturaUsuario.vcSimSepMil, 'g'), "");
                var NumeroDecimal = parseFloat(this.value.replace(new RegExp('\\' + oCulturaUsuario.vcSimSepMil, 'g'), ""));
                if (isNaN(NumeroDecimal)) { NumeroDecimal = 0; }
                if (NumeroDecimal > 99999999.99) {
                    alerta("El valor ingresado '" + this.value + "' debe ser menor.");
                    ValidacionNumerica = false;
                    return;
                }
            }
            CamposDinamicos += ",";
        });
        if (!ValidacionNumerica) { return; }

        ValidacionNumerica = true;
        $(".DECIMAL").each(function (i) {
            CamposDinamicos += "[" + $(this).attr("obj") + "]";
            CamposDinamicos += " = ";
            if ($.trim(this.value) == "") {
                CamposDinamicos += "0";
            }
            else {
                CamposDinamicos += this.value.replace(new RegExp('\\' + oCulturaUsuario.vcSimSepMil, 'g'), "");
                var NumeroDecimal = parseFloat(this.value.replace(new RegExp('\\' + oCulturaUsuario.vcSimSepMil, 'g'), ""));
                if (isNaN(NumeroDecimal)) { NumeroDecimal = 0; }
                if (NumeroDecimal > 99999999.99) {
                    alerta("El valor ingresado '" + this.value + "' debe ser menor.");
                    ValidacionNumerica = false;
                    return;
                }
            }
            CamposDinamicos += ",";
        });
        if (!ValidacionNumerica) { return; }

        $(".DATE").each(function (i) {
            CamposDinamicos += "[" + $(this).attr("obj") + "]";
            CamposDinamicos += " = \"";
            CamposDinamicos += this.value;
            CamposDinamicos += "\",";
        });
        $(".DATETIME").each(function (i) {
            var nVal = this.value.substring(0, 20);
            CamposDinamicos += "[" + $(this).attr("obj") + "]";
            CamposDinamicos += " = \"";
            CamposDinamicos += nVal;
            CamposDinamicos += "\",";
        });
        $(".BIT").each(function (i) {
            CamposDinamicos += "[" + $(this).attr("obj") + "]";
            CamposDinamicos += " = ";
            if ($("input", this).is(':checked') == true) {
                CamposDinamicos += "1";
            }
            else {
                CamposDinamicos += "0";
            }

            CamposDinamicos += ",";
        });
        var vcAdjuntos = "";
        $(".VARBINARY").each(function (i) {
            var vcNomCon = $(this).attr("obj");
            if ($(this).hasClass("imgButton")) { //habilitado
                if ($(this).attr("oblig") == "True" && $('#file_' + vcNomCon).text() == "") {
                    vcVacio = "1";
                } else {

                    if (this.value != "") {
                        vcAdjuntos += "[" + $(this).attr("obj") + "],";
                        vcAdjuntos += $('#file_' + vcNomCon).text() + ";";
                    }
                    else {
                        vcAdjuntos += "[" + $(this).attr("obj") + "],";
                        vcAdjuntos += ";";
                    }
                }
            }
        });

        BloquearPagina(true);
        $.ajax({
            type: "POST",
            url: "Mnt_Plan.aspx/Guardar",
            data: "{'oPlan': '" + oPlan + "', " +
                  "'vcCamDim': '" + CamposDinamicos + "'," +
                  "'vcAdj': '" + vcAdjuntos + "'," +
                  "'inTipoSer': '" + $("#ddlTipoServicio").val() + "'," +
                  "'oModeloPlan': '" + Modelos_Plan.substring(0, Modelos_Plan.length - 1) + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                if (result.d == -1) {
                    //window.top.alerta("El nombre del Plan ya ha sido registrada anteriormente, no se pudo grabar el registro");
                    alerta("El nombre del Plan ya ha sido registrada anteriormente, no se pudo grabar el registro");
                    BloquearPagina(false);
                } else {
                    $.ajax({
                        type: "POST",
                        url: "Mnt_Plan.aspx/ActualizarMonto_x_Plan",
                        data: "{'strNumCuenta': '" + '' + "'," +
                    "'inTipoAsigCre': " + 1 + "}",
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: function (result) {
                            try {
                                window.parent.ActualizarGrilla();
                            } catch (e) {
                            }                            
                            try {
                                window.top.fnObtenerWindowPlantillaTab().$('#div_modal').dialog('close');
                            } catch (e) {
                            }
                            Mensaje("<br/><h1>Plan guardado</h1><br/><h2>" + Plan.vcNom + "</h2>", document, CerroMensaje);
                        },
                        error: function (xhr, err, thrErr) {
                            MostrarErrorAjax(xhr, err, thrErr);
                            BloquearPagina(false);
                        }
                    });
                }
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
                BloquearPagina(false);
            }
        });
    });

    $("#btnCerrar").click(function (event) {
        try {
            window.parent.tab.tabs("remove", window.parent.tab.tabs("option", "selected"));
        } catch (e) {
        }
        try {
            window.top.fnObtenerWindowPlantillaTab().$('#div_modal').dialog('close');
        } catch (e) {
        }
    });

    function CerroMensaje() 
    {
        BloquearPagina(false);
        if ($("#hdfPlan").val() == "") {//Nuevo
            window.location.reload();
            ////$("#txtPlan").val("");
            ////$("#txtDescripcion").data("kendoEditor").value('');
            //////$("select#ddlOperador").prop('selectedIndex', 0);
            ////$("#ddlOperador").data("kendoComboBox").select(0);
            ////if ($("#hdfCodLinTip_X_User").val() == '0') {
            ////    $("#ddlLineaTipo").data("kendoComboBox").select(0);
            ////}
            ////$("#lblMonto").html("");
            ////$("#txtPlan").focus();
            ////$("#chkMantienePlanCamp").attr("checked", false);
            ////$.uniform.update();
            ////var numTab = $("#tbAsignacion").tabs("length");
            ////for (i = 0; i < numTab; i++)
            ////{ $("#tbAsignacion").tabs('remove', 0); }

            ////SubPlan = "";
            ////Titulo = "Nuevo sub Plan";
            ////$("#btnAgregarSubPlan").click();
        }
        else {//Edicion
            window.parent.tab.tabs("remove", indiceTab);
        }

        //$("#ddlOperador").data("kendoComboBox").select(0);
        //$("#ddlOperador").data("kendoComboBox").enable(true);
        //if ($("#ddlOperador option").length == 2) 
        //{
        //    $("#ddlOperador").data("kendoComboBox").select(1);
        //    $("#ddlOperador").data("kendoComboBox").enable(false);
        //    $("#ddlOperador").change();
        //}

    }

    $("#btnAgregarSubPlan").click(function (event) {
        pagina = 'Mnt_SubPlan.aspx?Cod=' + SubPlan.toString();
        var Id = "#" + "_Tab_SubPlan" + NumeroSubPlan.toString();
        var $panel = tbAsignacion.find(Id);
        if (!$panel.length) {//En el caso que no exista el tab, lo crea
            tbAsignacion.tabs("add", Id, Titulo);
            $(Id).css("width", "99%");
            $(Id).css("height", "345px");
            $(Id).css("margin-top", "0px");
            $(Id).css("margin-left", "0px");
            $(Id).css("margin-bottom", "0px");
            $(Id).css("margin-right", "0px");
            $(Id).css("padding-top", "0px");
            $(Id).css("padding-left", "0px");
            $(Id).css("padding-bottom", "0px");
            $(Id).css("padding-right", "0px");
        }
        Titulo = "Nuevo sub Plan";
        SubPlan = "";
        NumeroSubPlan++;
    });

    //$("#tbAsignacion span.ui-icon-close").live("click", function ()
    $('#tbAsignacion').on('click', 'span.ui-icon-close', function () {
        var objCloseTab = $(this);
        $('#divMsgConfirmacion').dialog({
            title: Titulo,
            modal: true,
            buttons: {
                "Si": function () {
                    $(this).dialog("close");
                    var index = $("li", tbAsignacion).index(objCloseTab.parent());
                    tbAsignacion.tabs("remove", index);
                },
                "Cancelar": function () {
                    $(this).dialog("close");
                }
            }
        });
    });

    var MontoPlanxSubPlanes = 0;
    function CargarSubPlan() {
        MontoPlanxSubPlanes = 0;
        if ($("#hdfPlan").val() != "") {
            if ($(lstSubPlan).length > 0) {                
                $(lstSubPlan).each(function () {
                    SubPlan = this.P_inCodSubPla;
                    Titulo = this.vcNom;
                    MontoPlanxSubPlanes += this.dcMon;
                    $("#btnAgregarSubPlan").click();
                });
                $("#tbAsignacion").tabs("option", "selected", 0);
            }
            else {
                SubPlan = "";
                Titulo = "Nuevo sub Plan";
                $("#btnAgregarSubPlan").click();
            }
        }
        else {
            SubPlan = "";
            Titulo = "Nuevo sub Plan";
            $("#btnAgregarSubPlan").click();
        }

        if (MontoPlanxSubPlanes == 0) {
            $("#lblMonto").prop('disabled', false);
            $("#lblMonto").css("background-color", "#FFF");
        }
        else {
            $("#lblMonto").prop('disabled', true);
            $("#lblMonto").css("background-color", "#EBEBE4");
        }

    }

    $.ajax({
        type: "POST",
        url: "../../../Common/WebService/General.asmx/ListarServicio",
        data: "{'idCliente': " + window.parent.parent.parent.idCliente + "}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            lstServicio = result.d;
            if ($(lstServicio).length == 0) {
                //window.top.alerta("Ingrese por lo menos un servicio y vuelva a intentarlo");
                alerta("Ingrese por lo menos un servicio y vuelva a intentarlo");
                window.parent.tab.tabs("remove", window.parent.tab.tabs("option", "selected"));
            }
            else {
                if (CargoServicio) {
                    CargarSubPlan();
                }
                else {
                    CargoServicio = true;
                }
            }
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });

    $.ajax({
        type: "POST",
        url: "../../../Common/WebService/General.asmx/ListarTipoServicio",
        data: "{'idCliente': " + window.parent.parent.parent.idCliente + "}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            lstTipoServicio = result.d;
            if ($(lstTipoServicio).length == 0) {
                //window.top.alerta("Ingrese por lo menos un tipo de servicio y vuelva a intentarlo");
                alerta("Ingrese por lo menos un tipo de servicio y vuelva a intentarlo");
                window.parent.tab.tabs("remove", window.parent.tab.tabs("option", "selected"));
            }
            else {
                if (CargoServicio) {
                    CargarSubPlan();
                }
                else {
                    CargoServicio = true;
                }
            }
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });

    //DESCRIPCION
    $("#txtDescripcion").kendoEditor({
        tools: ["bold", "italic", "underline", "strikethrough",
                            "justifyLeft", "justifyCenter", "justifyRight", "justifyFull",
                            "insertUnorderedList", "insertOrderedList",
                            "indent", "outdent"],
        messages: {
            bold: "Negritas", italic: "Cursiva", underline: "Subrayado", strikethrough: "Tachado",
            justifyLeft: "Alinear a la izquierda", justifyCenter: "Centrar", justifyRight: "Alinear a la derecha", justifyFull: "Justificar",
            insertUnorderedList: "Viñetas", insertOrderedList: "Numeración",
            indent: "Disminuir sangría", outdent: "Aumentar sangría",
            fontNameInherit: "(Fuente)", fontSizeInherit: "(Tamaño de fuente)"
        }
    });

    $("input[name='ddlOperador_input']").attr("disabled", true);
    $("input[name='ddlLineaTipo_input']").attr("disabled", true);
    $("input[name='ddlServicio_input']").attr("disabled", true);
    $("#txtPlan").focus();

//    $("#ddlOperador").data("kendoComboBox").select(0);
    //$("#ddlOperador").data("kendoComboBox").enable(true);    
    //if ($("#ddlOperador option").length == 2) {
    //    $("#ddlOperador").data("kendoComboBox").select(1);
    //    $("#ddlOperador").data("kendoComboBox").enable(false);
    //    $("#ddlOperador").change();
    //}

    $("#lblMonto").change(function () {
        var chkIncImp = document.getElementById("chkIncImp");
        if (chkIncImp.checked == true) {
            var monto = $("#lblMonto").val();
            var montoImp = $("#hdfImpto").val();
            var montoSinImp = 0;
            if (monto == "" || monto == null) {
                monto = 0;
            }
            montoSinImp = monto / montoImp;
            $("#lblMontoImp").html(FormatoNumero(montoSinImp, oCulturaUsuario));
            $("#trMontoIncImpuesto").show();
        }
    });

    MuestraMensajeImpuesto();

    $("#txt_TipoGrupo").css("width", "490px");
    $("#txt_NomPlanOperador").css("width", "490px");

});

function MuestraMensajeImpuesto() {
    //debugger;
    var chkIncImp = document.getElementById("chkIncImp");
    var monto = $("#lblMonto").val();
    var montoImp = $("#hdfImpto").val();
    var montoSinImp = 0;
    if (monto == "" || monto == null) {
        monto = 0;
    }
    if (chkIncImp.checked == true) {
        montoSinImp = monto / montoImp;
        $("#lblMontoImp").html(FormatoNumero(montoSinImp, oCulturaUsuario));
        $("#trMontoIncImpuesto").show();
    } else {
        $("#trMontoIncImpuesto").hide();
    }
}

function fnPicklistAgregar() {
    var Valor = $("#txt_Dispositivos").val();
    Valor = Valor.replace("'", "");

    if ($("#hdfCodDispositivos").val() == '') {
        $("#txt_Dispositivos").val('');
        alerta('Debe seleccionar un modelo');
        $("#txt_Dispositivos").focus();
        return;
    }

    if (fnValidaExisteItem($("#hdfCodDispositivos").val()) == 1) {
        alerta('El valor ingresado ya existe');
        $("#hdfCodDispositivos").val('');
        $("#txt_Dispositivos").focus();
        return;
    }

    $('#lstPicklist').append('<option value="' + $("#hdfCodDispositivos").val() + '">' + Valor + '</option>');

    $("#txt_Dispositivos").val('');
    $("#hdfCodDispositivos").val('');
    $("#txt_Dispositivos").focus();
}

function fnPicklistEliminar() {
    if ($('#lstPicklist option').length == 0) {
        return;
    }

    if ($('#lstPicklist option:selected').length == 0) {
        alerta('Seleccione un ítem como mínimo');
        $('#lstPicklist').focus();
        return;
    }


    var vMjsConfirm = "El valor asociado con esta opción de lista se eliminará de forma permanente. Una vez eliminado del sistema el valor de lista, no se puede volver a agregar. Los registros existentes que contengan este valor se deben actualizar manualmente con otro valor de la lista.<br /><br />¿Desea elminar el valor?.";
    confirmacion(vMjsConfirm, fnConfirmacion_Si, fnConfirmacion_No, 'Mensaje de Confirmación.');
    
    //if (confirm('El valor asociado con esta opción de lista se eliminará de forma permanente. Una vez eliminado del sistema el valor de lista, no se puede volver a agregar. Los registros existentes que contengan este valor se deben actualizar manualmente con otro valor de la lista.\n\nHaga clic en Aceptar para continuar.')) {
    //    $('#lstPicklist option:selected').remove();
    //}
    //else {
    //    return;
    //}
}

function fnConfirmacion_Si() {
    $('#lstPicklist option:selected').remove();
}
function fnConfirmacion_No() {
    return;
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
}
