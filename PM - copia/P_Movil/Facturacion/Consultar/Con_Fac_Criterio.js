var Criterio;
var tblResumen;

var tabOpciones;

var isGuardarComo = false;


function IngresarEmpleados(empleados) {//Agrega los empleados seleccionados del formulario respectivo

    $(empleados).each(function () {
        var Empleado = this;
        Criterio.Empleados.push(Empleado);
        $("#lstEmpleado").append($("<option></option>").attr("value", Empleado.P_vcCod).text(Empleado.vcNom));
    });


    var biLinEli = "0";
    var inLinCan = Criterio.Lineas.length;
    var i;
    for (i = 0; i < inLinCan; i++) {
        var oLinea = Criterio.Lineas[inLinCan - i - 1];
        var biExiste = "0";

        var j;
        for (j = 0; j < Criterio.Empleados.length; j++) {
            var oEmpleado = Criterio.Empleados[j];
            if (oEmpleado.vcNom.substring(oEmpleado.vcNom.indexOf("=") + 1) == oLinea.Empleado.vcNom.substring(oLinea.Empleado.vcNom.indexOf("=") + 1)) {
                biExiste = "1";
            }
        }
        if (biExiste == "0") {
            $("#lstLinea option[value='" + oLinea.P_vcNum.toString() + "']").remove();
            Criterio.Lineas.splice((inLinCan - i - 1), 1);
            biLinEli = "1";
        }
    }

    if (biLinEli == "1") {
        alerta("Algunas líneas fueron quitadas de la lista porque no coincidian con la lista de empleados seleccionados.");
    }
}

function IngresarLineas(lineas) {//Agrega las lineas seleccionadas del formulario respectivo
    //$("#lstLinea").html(""); //JHERRERA 20140807 -- Se comenta esta línea porque la selección de empleados cambió.
    var biValidos = "1";
    //Criterio.Lineas = new Array();
    $(lineas).each(function () {
        var Linea = this;
        var biExiste = "0";

        var i;
        for (i = 0; i < Criterio.Empleados.length; i++) {
            var oEmpleado = Criterio.Empleados[i];
            if (oEmpleado.vcNom.substring(oEmpleado.vcNom.indexOf("=") + 1) == Linea.Empleado.vcNom.substring(Linea.Empleado.vcNom.indexOf("=") + 1)) {
                biExiste = "1";
            }
        }

        if (biExiste == "1" || Criterio.Empleados.length === 0) {
            Criterio.Lineas.push(Linea);
            $("#lstLinea").append($("<option></option>").attr("value", Linea.P_vcNum).text(Linea.Empleado.vcNom));
        } else {
            biValidos = "0";
        }
    });

    if (biValidos == "0") {
        alerta("Algunas líneas no fueron agregadas porque no pertenecen a los empleados previamente elegidos.");
    }
}

function IngresarAreas(areas) {//Agrega las areas seleccionadas del formulario respectivo
    //$("#lstOrganizacion").html(""); //JHERRERA 20140807 -- Se comenta esta línea porque la selección de empleados cambió.
    //Criterio.Organizaciones = new Array(); //comentado wapumayta 08/08/2014 - se comenta por que limpia los resultado de la busqueda anterior
    $(areas).each(function () {
        var Area = this;

        //debugger;

        Area.vcCodInt = Area.P_inCodOrg;
        Area.P_inCodOrg = -1; // Area.vcNomOrg.split("=")[0];
        Criterio.Organizaciones.push(Area);
        $("#lstOrganizacion").append($("<option></option>").attr("value", Area.vcCodInt).text(Area.vcNomOrg));
    });
}

function IngresarCentroCosto(centrosCostos) {//Carga los centros de costos seleccionados del formulario respectivo
    $("#lstOrganizacion").html("");
    Criterio.CentrosCostos = [];
    $(centrosCostos).each(function () {
        var CentroCosto = this;
        Criterio.CentrosCostos.push(CentroCosto);
        $("#lstOrganizacion").append($("<option></option>").attr("value", CentroCosto.P_vcCodCenCos).text(CentroCosto.vcNomCenCos));
    });
}

function IngresarAreaUnico(area) {//Carga el area seleccionada
    $("#lblAreaSumario").html(area.vcNomOrg);
    area.vcCodInt = area.P_inCodOrg;
    area.P_inCodOrg = area.vcNomOrg.split("=")[0];
    Criterio.AreaSumario = area;
}

function IngresarNumero(numeros, numerosEmpresa) {//Carga los numeros seleccionados del formulario respectivo
    $("#lstNumeroLlamado").html("");
    Criterio.Numeros = [];
    Criterio.Paises = [];
    Criterio.Ciudades = [];
    Criterio.Empresas = [];
    $(numeros).each(function () {
        if (this.inTip == "1") {//Numero
            var num = new ENT_MOV_Linea();

            num.P_vcNum = this.p_vcCod;
            Criterio.Numeros.push(num);
            $("#lstNumeroLlamado").append($("<option></option>").attr("value", this.p_vcCod).text(this.vcNom));
        }
        else if (this.inTip == "2") {//Pais
            var pais = new ENT_GEN_Pais();

            pais.P_vcCodPai = this.p_vcCod;
            pais.vcNomPai = this.vcNom;
            Criterio.Paises.push(pais);
            $("#lstNumeroLlamado").append($("<option></option>").attr("value", this.p_vcCod).text(this.vcNom));
        }
        else if (this.inTip == "3") {//Ciudad
            var ciudad = new ENT_GEN_Ciudad();

            ciudad.P_vcCodCiu = this.p_vcCod;
            ciudad.vcNomCiu = this.vcNom;
            Criterio.Ciudades.push(ciudad);
            $("#lstNumeroLlamado").append($("<option></option>").attr("value", this.p_vcCod).text(this.vcNom));
        }
        else if (this.inTip == "4") {//Empresa
            var empresa = new ENT_GEN_Empresa();

            empresa.P_vcCodEmp = this.p_vcCod;
            empresa.vcRazSoc = this.vcNom;
            Criterio.Empresas.push(empresa);
        }
    });
    $(numerosEmpresa).each(function () {//Carga los numeros de las empresas seleccionadas
        $("#lstNumeroLlamado").append($("<option></option>").attr("value", this.p_vcCod).text(this.vcNom));
    });
}



function onChange_KendoDate() {
}

var txtPeriodoDesde, txtPeriodoHasta;

$(function () {

    $("#ddlCuenta").select2();
    $(".MESANHO").removeClass("ui-widget-content ui-corner-all");
    $(".MESANHO").css("padding", "0px");
    $(".MESANHO").css("margin", "0px");

    var today = new Date();
    var maxDate = today.setDate(today.getDate());
    var minDate = today.setDate(today.getDate() - 30 * 36);

    $(".MESANHO").kendoDatePicker({
        culture: "es-ES",
        animation: false,
        start: "year",
        depth: "year",
        format: "MM/yyyy",
        value: new Date(maxDate),
        min: new Date(minDate),
        max: new Date(maxDate),
        change: onChange_KendoDate,
    });

    txtPeriodoDesde = $("#txtPeriodoDesde").data("kendoDatePicker");
    txtPeriodoHasta = $("#txtPeriodoHasta").data("kendoDatePicker");


    $("#dvCargandoInicial").fadeOut("slow");
    $("#dvContenido").fadeIn("slow");

    $(".accordion").accordion({
        collapsible: true,
        autoHeight: false
    });


    //$("#iconclose_Panel1").css('left', null);

    //$("#AccordionJQ1").accordion("option", "active", 0);
    //$("#AccordionJQ2").accordion("option", "active", 1);

    $(window).resize(function () {
        DimPosElementos(false);

        $(".CONSULTAS").each(function () {
            $(this)[0].width = $(window).width() - 27;
            $(this)[0].height = $(window).height() - 65;
        });
    });


    inicio();
    function inicio() {
        DimPosElementos(false);
        Criterio = new ENT_MOV_IMP_Criterio();
        ifCentroCosto = $("#ifCCO");
        ifNumeroLlamado = $("#ifNumeroLlamado");
    }

    tabOpciones = $("#TabDetalle").tabs({
        tabTemplate: "<li><a href='#{href}'>#{label}</a> <span class='ui-icon ui-icon-close'>Remover Tab</span></li>",
        //fx: { height: 'toggle', duration: 800 },
        add: function (event, ui) {
            var ifra = document.createElement('IFRAME');
            var Ancho = $(window).width();
            var Alto = $(window).height();
            ifra.width = Ancho - 27;
            ifra.height = Alto - 65;
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
            ifra.className = "SinBordes CONSULTAS";
            $(ui.panel).append(ifra);
            $(this).tabs('select', '#' + ui.panel.id);
            pagina = "";
        }
    });

    $("#TabDetalle span.ui-icon-close").live("click", function () {
        var index = $("li", tabOpciones).index($(this).parent());
        tabOpciones.tabs("remove", index);
    });


    function AgregarCheckItem(idchklst, indice, valor, texto) {
        var str = '<tr>\n\t\t\t\t<td>' +
                          '<input id=\"' + idchklst + '_' + indice + '\" name=\"' + idchklst + '$' + indice + '\" value=\"' + valor + '\" type=\"checkbox\">' +
                          '<label for=\"' + idchklst + '_' + indice + '\">' + texto + '</label></td>\n\t\t\t</tr>';
        return str;
    }

    $("#ddlOperador").change(function () {
        var inCodOpe = $(this).val();
        $.ajax({
            type: "POST",
            url: "Con_Fac_Criterio.aspx/ListarCuentaPorOperador",
            data: "{'inCodOpe': '" + inCodOpe + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                var i = 0;

                $("#chkCuenta").hide();
                $("#trCuentaTodos").hide();
                $("tbody", $("#chklstCuenta")).html("");
                if (result.d.length > 0) {
                    $("#chkCuenta").show();
                    $("#trCuentaTodos").show();
                    $.each(result.d, function () {
                        $("#chklstCuenta").append($(AgregarCheckItem('chklstCuenta', i.toString(), this.P_vcCod, this.vcNom)));
                        i++;
                    });
                }
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            }
        });
    });

    function HabilitarControles(Habilitar) {

        HabilitarCuenta(Habilitar);
        $(".btnNormal").button("option", "disabled", !Habilitar);
    }

    function HabilitarCuenta(Habilitar) {
        if (Habilitar) {
            $("#ddlOperador").removeAttr("disabled");
            $("input", "#chklstCuenta").removeAttr("disabled");
            $("#chkCuenta").removeAttr("disabled");
        }
        else {
            $("#ddlOperador").attr("disabled", "disabled");
            $("input", "#chklstCuenta").attr("disabled", "disabled");
            $("#chkCuenta").attr("disabled", "disabled");
        }
    }

    $("#chkCuenta").change(function () {
        $("input", "#chklstCuenta").attr('checked', $(this).is(':checked'));
    });

    $("input", "#chklstCuenta").each(function () {
        if ($(this).attr('checked')) {
            Cuenta = new ENT_MOV_Cuenta();
            Cuenta.P_vcCod = $(this).val();
            Criterio.Cuentas.push(Cuenta);
        }
    });

    $("#btnEjecutar").click(function () {

        if (txtPeriodoDesde.value() > txtPeriodoHasta.value()) {
            alerta("El periodo inicial no puede ser mayor al final", "Consulta", null, "warning");
            return;
        }

        var Ancho = $(window).width();
        var Alto = $(window).height();

        $("#iconclose_Panel1").removeClass("ui-icon-circle-triangle-n");
        $("#iconclose_Panel1").addClass("ui-icon-circle-triangle-s");
        $("#BarraNavegacionJQ1_Panel1_O").hide();
        DimPosElementos();

        SeteaValores();
        //ddlCuenta
        //alert(Criterio.inTipCon);

        if ((typeof Criterio.inTipCon == 'undefined') || Criterio.inTipCon == "1") {//Reporte
            Criterio.inTipCon = "1";
            pagina = "Con_Fac_Consulta.aspx";

            var numeroAleatorio = Math.floor(Math.random() * 1000) + 1;
            $("#ifrResultado").attr("src", pagina + "?v=" + numeroAleatorio);


            //AbrirOpcionCriterio(tabOpciones, "#TabResumen", "Resultado", Alto - 95, Ancho - 150, Criterio.inTipCon);
        }
        else if (Criterio.inTipCon == "2") {//Sumario
            var vcValSum = "";
            if ($("#ddlTipoSumario").val() == "-1") {
                alerta("Seleccione un tipo de sumario");
                $('#ddlTipoSumario').focus();
                return;
            }
            if ($("#ddlTipoSumario").val() == "1") {//Por Niveles
                if ($("#ddlNivelSumario").val() == "-1") {
                    alerta("Seleccione un nivel para el sumario por nivel");
                    $('#ddlNivelSumario').focus();
                    return;
                }
                vcValSum = $("#ddlNivelSumario").val();
            }
            if ($("#ddlTipoSumario").val() == "2") {//Por Area
                if (Criterio.AreaSumario.P_inCodOrg == "-1") {
                    //if (Criterio.AreaSumario.vcCodInt == "-1") {
                    alerta("Seleccione un área para el sumario por área");
                    $('#btnSeleccionarArea').focus();
                    return;
                }
                vcValSum = Criterio.AreaSumario.P_inCodOrg;
                //vcValSum = Criterio.AreaSumario.vcCodInt; //agregado wapumayta 07/08/2014
            }
            if ($("#ddlTipoSumario").val() == "10") {//Por Ciudad
                if ($("#ddlPaisSumario").val() == "-1") {
                    alerta("Seleccione un país para el sumario por ciudad");
                    $('#ddlPaisSumario').focus();
                    return;
                }
                vcValSum = $("#ddlPaisSumario").val();
            }

            pagina = "Con_Fac_Sumario.aspx?Tipo=" + $("#ddlTipoSumario").val() + "&Valor=" + vcValSum;
            AbrirOpcionCriterio(tabOpciones, "#TabSum" + $($("#ddlTipoSumario option")[parseFloat($("#ddlTipoSumario").val())]).html().replace(" ", "").substring(0, 8), $($("#ddlTipoSumario option")[parseFloat($("#ddlTipoSumario").val())]).html(), Alto - 95, Ancho - 150, Criterio.inTipCon);
        }
        else if (Criterio.inTipCon == "3") {//Desconocido
            pagina = "Con_Fac_Reporte.aspx?Tipo=3&SubTipo=0&NumCriterio=" + Criterio.inNumCri;
            AbrirOpcionCriterio(tabOpciones, "#TabDesconocido", "Desconocido", Alto - 95, Ancho - 150, Criterio.inTipCon);
        }
        else if (Criterio.inTipCon == "4") {//Ranking
            if ($('#ddlNivelRanking').val() == "-1") {
                alerta("Seleccione un nivel");
                $('#ddlNivelRanking').focus();
                return;
            }
            pagina = "Con_Fac_Reporte.aspx?Tipo=4&SubTipo=0&NumCriterio=" + Criterio.inNumCri;
            AbrirOpcionCriterio(tabOpciones, "#TabRan" + $("#ddlNivelRanking option:selected").text().replace(/ /g, '').substring(0, 8), "Ranking " + $.trim($("#ddlNivelRanking option:selected").text().replace(/ /g, '').substring(0, 8)), Alto - 102, 95 - 150, Criterio.inTipCon);
        }
        else if (Criterio.inTipCon == "5") {//Reporte
            pagina = "Con_Fac_Consulta.aspx?NumCriterio=" + Criterio.inNumCri;
            AbrirOpcionCriterio(tabOpciones, "#TabResumen", "Resultado", Alto - 95, Ancho - 150, Criterio.inTipCon);
        }
    });

    function AbrirOpcionCriterio(tab, Id, Titulo, h, w, inTipCon) {
        var $panel = tab.find(Id);
        if (!$panel.length) {//En el caso que no exista el tab, lo crea
            tab.tabs("add", Id, Titulo);
            $(Id).css("width", w);
            $(Id).css("height", h);
            $(Id).css("margin-top", "0px");
            $(Id).css("margin-left", "0px");
            $(Id).css("margin-bottom", "0px");
            $(Id).css("margin-right", "0px");
            $(Id).css("padding-top", "0px");
            $(Id).css("padding-left", "0px");
            $(Id).css("padding-bottom", "0px");
            $(Id).css("padding-right", "0px");
            $(Id).addClass("tabResumen");
        }
        else {

            tab.tabs('remove', Id);

            tab.tabs("add", Id, Titulo);
            $(Id).css("width", w);
            $(Id).css("height", h);
            $(Id).css("margin-top", "0px");
            $(Id).css("margin-left", "0px");
            $(Id).css("margin-bottom", "0px");
            $(Id).css("margin-right", "0px");
            $(Id).css("padding-top", "0px");
            $(Id).css("padding-left", "0px");
            $(Id).css("padding-bottom", "0px");
            $(Id).css("padding-right", "0px");

        }
    }

    function fnObtenerIdTap() {
        if ((typeof Criterio.inTipCon == 'undefined') || Criterio.inTipCon == "1") {//Reporte
            Criterio.inTipCon = "1";
            return "#TabResumen";
        }
        else if (Criterio.inTipCon == "2") {//Sumario
            return "#TabSum" + $($("#ddlTipoSumario option")[parseFloat($("#ddlTipoSumario").val())]).html().replace(" ", "").substring(0, 8);
        }
        else if (Criterio.inTipCon == "3") {//Desconocido
            return "#TabDesconocido";
        }
        else if (Criterio.inTipCon == "4") {//Ranking
            return "#TabRan" + $("#ddlNivelRanking option:selected").text().replace(" ", "").substring(0, 8);
        }
        else if (Criterio.inTipCon == "5") {//Reporte
            return "#TabResumen";
        }
    }


    function SeteaValores() {


        if (isGuardarComo === true) {
            Criterio.P_inCodCri = "-1";
        } else {
            Criterio.P_inCodCri = $("#hdfCod").val();
        }
        Criterio.btCom = $("#chkCompartir").is(':checked');
        Criterio.inTipCon = $("input[name='rblstTipoConsulta']:checked").val();
        //        Criterio.inTipSum = $('#ddlTipoSumario').val();
        //        Criterio.NivelSumario.P_inCodNiv = $('#ddlNivelSumario').val();
        //        Criterio.NivelSumario.vcNomNiv = $("#ddlNivelSumario option:selected").text();
        //        Criterio.PaisSumario.P_vcCodPai = $('#ddlPaisSumario').val();
        //        Criterio.PaisSumario.vcNomPai = $("#ddlPaisSumario option:selected").text();
        //        Criterio.NivelRanking.P_inCodNiv = $('#ddlNivelRanking').val();
        //        Criterio.NivelRanking.vcNomNiv = $("#ddlNivelRanking option:selected").text();
        Criterio.inTipOfiOrg = $("#ddlOficinaOrganizativa").val();

        //        Criterio.TipoLlamada.P_inCod = $("input[name='rblstTipoLlamada']:checked").val();
        //        Criterio.TipoTelefonia.P_inCod = $("input[name='rblstTelefonia']:checked").val();
        Criterio.OperadorCuenta.P_inCodOpe = $("#ddlOperador").val();
        if ($("#hdfCod").val() == "-1") {
            Criterio.vcNomCri = $("#txtNombre").val();
        } else {
            Criterio.vcNomCri = $("#TxtNombreComo").val();
        }
        Criterio.inNumCri = $("#hdfNumCri").val();
        Criterio.vcTab = "";

        Criterio.inLinTip = $('#ddlLineaTipo').val();

        //        Criterio.Servicios = [];
        Criterio.Operadores = [];
        //        Criterio.SucursalesOrigen = [];
        Criterio.Cuentas = [];

        //agregado 10-03-2015 - econdeña 
        //var txtPeriodoDesde = $("#txtPeriodoDesde").val();
        //var txtPeriodoHasta = $("#txtPeriodoHasta").val();


        if (txtPeriodoDesde.value() > txtPeriodoHasta.value()) {
            alerta("El periodo inicial no puede ser mayor al final", "Consulta", null, "warning");
            return;
        }

        var tmpMes = txtPeriodoDesde.value();
        var vcPeriodoLista = '';
        for (var i = 0; i < 36; i++) {
            if (tmpMes > txtPeriodoHasta.value()) {
                break;
            }
            vcPeriodoLista += "," + window.top.moment(tmpMes).format('MMYY');
            tmpMes = new Date(window.top.moment(tmpMes).add(window.top.moment.duration({ M: 1 })));
        }
        if (vcPeriodoLista.length > 0) {
            vcPeriodoLista = vcPeriodoLista.substring(1, vcPeriodoLista.length);
        }
        Criterio.vcPer = vcPeriodoLista; //$("#ddlPeriodo").val();

        if ($.trim($("#hdfEmpSel").val()) !== "") {
            UserEmpleado = [];
            $("#lstEmpleado option").each(function () {
                var UsuarioEmpleado = new UsuarioEmpl();
                UsuarioEmpleado.P_vcCod = $(this).val();
                UsuarioEmpleado.vcNom = $(this).html();
                UserEmpleado.push(UsuarioEmpleado);
            });

            Criterio.Empleados = [];
            $(UserEmpleado).each(function () {
                var Empleado = this;
                Criterio.Empleados.push(Empleado);
            });
        }

        $("input", "#chklstOperador").each(function () {
            if ($(this).attr('checked')) {
                Operador = new ENT_GEN_Operador();
                Operador.P_inCodOpe = $(this).val();
                Criterio.Operadores.push(Operador);
            }
        });

        var mCuentas = $("#ddlCuenta").val();
        if (mCuentas != null) {
            for (var i = 0; i < mCuentas.length; i++) {
                Cuenta = new ENT_MOV_Cuenta();
                Cuenta.P_vcCod = mCuentas[i];
                Criterio.Cuentas.push(Cuenta);
            }
        }       

        //$("input", "#chklstCuenta").each(function () {
        //    if ($(this).attr('checked')) {
        //        Cuenta = new ENT_MOV_Cuenta();
        //        Cuenta.P_vcCod = $(this).val();
        //        Criterio.Cuentas.push(Cuenta);
        //    }
        //});

        Criterio.vcNomTab = fnObtenerIdTap();

        $.ajax({
            type: "POST",
            url: "Con_Fac_Criterio.aspx/SeteaValores",
            data: "{'oCriterio': '" + JSON.stringify(Criterio) + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                //alert("session actualizada");
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            }
        });
    }


    $("#btnEmpleado").click(function () {
        //window.parent.abrirDialogSelectEmp();
        abrirDialogSelectEmp();
    });

    $("#btnLinea").click(function () {
        //window.parent.abrirDialogSelecLiena($("#hdfEmpSel").val());
        abrirDialogSelecLiena($("#hdfEmpSel").val());
    });

    $("#btnOrganizacion").click(function () {
        //window.parent.abrirDialogSelecOficina($("#ddlOficinaOrganizativa").val());
        abrirDialogSelecOficina($("#ddlOficinaOrganizativa").val());
    });



    $("#ddlOficinaOrganizativa").live("change", function () {
        Criterio.Organizaciones = [];
        Criterio.CentrosCostos = [];
        $("#lstOrganizacion").html("");
    });

    $("#chkOperador").change(function () {
        $("input", "#chklstOperador").attr('checked', $(this).is(':checked'));
    });

    $("#btnQuitarEmpleado").live("click", function () {
        //var indice = 0;
        //var Item = $("#lstEmpleado").val();
        $("#lstEmpleado option:selected").each(function () {
            var indice = 0;
            var Item = $(this).val();
            var i;
            for (i in Criterio.Empleados) {
                if (Criterio.Empleados[i].P_vcCod == Item) {
                    indice = i;
                    break;
                }
            }
            if (indice > -1) {
                Criterio.Empleados.splice(indice, 1);
                $("#lstEmpleado option:selected").remove();
            }
        });
    });

    $("#btnQuitarLinea").live("click", function () {
        $("#lstLinea option:selected").each(function () {
            var indice = 0;
            var Item = $(this).val();
            var i;
            for (i in Criterio.Lineas) {
                if (Criterio.Lineas[i].P_vcNum == Item) {
                    indice = i;
                    break;
                }
            }
            if (indice > -1) {
                Criterio.Lineas.splice(indice, 1);
                $("#lstLinea option:selected").remove();
            }
        });
    });

    $("#btnQuitarOrganizacion").live("click", function () {
        var indice = 0;
        var Item = $("#lstOrganizacion").val();
        if ($("#ddlOficinaOrganizativa").val() == 1) {
            $("#lstOrganizacion option:selected").each(function () {
                var indice = 0;
                var Item = $(this).val();
                var i;
                //debugger;
                for (i in Criterio.Organizaciones) {
                    if (Criterio.Organizaciones[i].vcCodInt == Item) {
                        indice = i;
                        break;
                    }
                }
                if (indice > -1) {
                    Criterio.Organizaciones.splice(indice, 1);
                    $("#lstOrganizacion option:selected").remove();
                }
            });
        }
        if ($("#ddlOficinaOrganizativa").val() == 2) {
            $("#lstOrganizacion option:selected").each(function () {
                var indice = 0;
                var Item = $(this).val();
                var i;
                for (i in Criterio.CentrosCostos) {
                    if (Criterio.CentrosCostos[i].P_vcCodCenCos == Item) {
                        indice = i;
                        break;
                    }
                }
                if (indice > -1) {
                    Criterio.CentrosCostos.splice(indice, 1);
                    $("#lstOrganizacion option:selected").remove();
                }
            });
        }
    });


    $("#btnLimpiar").click(function () {
        window.location.href = 'Con_Fac_Criterio.aspx?inNumCri=1';

    });

    $("#ddlPeriodo").change(function () {
        var selPer = this.value;
        $.ajax({
            // ==============================================================================================================================
            type: "POST",
            url: "Con_Fac_Criterio.aspx/Carga_Periodo",
            data: "{'p_vcNomGrupo_Para': 'dwDesde','p_vcValor_Para': '" + this.value + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {

                if ($(result.d).length > 0) {

                    var select = $("#ddlPeriodo");
                    select.empty();

                    $.each(result.d, function (index, itemData) {

                        select.append($('<option/>', {
                            value: itemData.IdGrupo,
                            text: itemData.vcGrupo
                        }));
                    });
                    $("#ddlPeriodo").val(selPer);
                }
            },
            error: function (xhr, err, thrErr) {
                // ==============================================================================================================================
                MostrarErrorAjax(xhr, err, thrErr);
                // ==============================================================================================================================
            }
        });
    });


    inicioAcordion();

});



function ENT_SEG_Usuario(P_inCod, vcNom) {
    this.P_inCod = P_inCod;
    this.vcNom = vcNom;
}
function ENT_GEN_Nivel(P_inCodNiv, vcNomNiv) {
    this.P_inCodNiv = P_inCodNiv;
    this.vcNomNiv = vcNomNiv;
}
function ENT_GEN_Empleado(P_vcCod, vcNom) {
    this.P_vcCod = P_vcCod;
    this.vcNom = vcNom;
}
function ENT_MOV_Linea(P_vcNum) {
    this.P_vcNum = P_vcNum;
}
function ENT_GEN_Organizacion(P_inCodOrg, vcNomOrg) {
    this.P_inCodOrg = -1;
    this.vcNomOrg = vcNomOrg;
}
function ENT_GEN_CentroCosto(P_vcCodCenCos, vcNomCenCos) {
    this.P_vcCodCenCos = P_vcCodCenCos;
    this.vcNomCenCos = vcNomCenCos;
}



function ENT_MOV_IMP_TipoTelefonia(P_inCod, vcNom) {
    this.P_inCod = P_inCod;
    this.vcNom = vcNom;
}
function ENT_GEN_Operador(P_inCodOpe, vcCodOpe) {
    this.P_inCodOpe = P_inCodOpe;
    this.vcCodOpe = vcCodOpe;
}
function ENT_GEN_Ciudad(P_vcCodCiu, vcNomCiu) {
    this.P_vcCodCiu = P_vcCodCiu;
    this.vcNomCiu = vcNomCiu;
}
function ENT_GEN_Empresa(P_vcCodEmp, vcRazSoc) {
    this.P_vcCodEmp = P_vcCodEmp;
    this.vcRazSoc = vcRazSoc;
}
function ENT_GEN_Sucursal(P_vcCod, vcNom) {
    this.P_vcCod = P_vcCod;
    this.vcNom = vcNom;
}
function ENT_MOV_Cuenta(P_vcCod, vcNom) {
    this.P_vcCod = P_vcCod;
    this.vcNom = vcNom;
}
function ENT_MOV_IMP_Criterio(P_inCodCri, vcNomCri, btCom, vcFecCrea, inTipCon, vcTipCon, inTipSum, inTipOfiOrg,
                                inNumCri, vcTab, vcNomTab, vcPer) {
    this.P_inCodCri = P_inCodCri;
    this.vcNomCri = vcNomCri;
    this.Usuario = new ENT_SEG_Usuario();
    this.btCom = btCom;
    this.vcFecCrea = vcFecCrea;
    this.inTipCon = inTipCon;
    this.vcTipCon = vcTipCon;
    this.inTipSum = inTipSum;
    this.NivelSumario = new ENT_GEN_Nivel();
    this.AreaSumario = new ENT_GEN_Organizacion();

    this.NivelRanking = new ENT_GEN_Nivel();
    this.Empleados = [];
    this.Lineas = [];
    this.inTipOfiOrg = inTipOfiOrg;
    this.Organizaciones = [];
    this.CentrosCostos = [];



    this.Numeros = [];

    this.Empresas = [];
    this.Operadores = [];

    this.TipoTelefonia = new ENT_MOV_IMP_TipoTelefonia();

    this.OperadorCuenta = new ENT_GEN_Operador();
    this.Cuentas = [];
    this.inNumCri = inNumCri;
    this.vcTab = vcTab;
    this.vcNomTab = vcNomTab;
    // Criterio: Periodo
    this.vcPer = vcPer;
}









var ExisteCentroCosto = false;
var ifCentroCosto = $("#ifCCO");
function abrirDialogSelecOficina(oficina) {
    if (oficina == "1") {//Organización
        var $width = 750;
        var $height = 525;
        var $Pagina = '../../Consultar/Con_SeleccionArea.aspx?Tipo=1&Multiple=1&UnPanel=1'; //JHERRERA 20140807-- Ahora sólo se mostrará un panel para la selección de empleado
        $("#ifArea").attr("src", $Pagina);
        Modal = $('#dvArea').dialog({
            title: "Seleccionar Área",
            width: $width,
            height: $height,
            modal: true,
            resizable: false
        });
    }
    else if (oficina == "2") {//Centro de costo
        var width = 590;
        var height = 515;
        Modal = $('#dvCCO').dialog({
            title: "Seleccionar centro de costo",
            width: width,
            height: height,
            modal: true,
            resizable: false
        });
        if (!ExisteCentroCosto) {
            var $Pagina2 = '../../Consultar/Con_SeleccionCentroCosto.aspx';
            $("#ifCCO").attr("src", $Pagina2);
            ExisteCentroCosto = true;
        }
    }
}
function abrirDialogSelectEmp() {
    var $width = 930;
    var $height = 515;
    var $Pagina = '../../Consultar/Con_SeleccionArea.aspx?Tipo=2&Multiple=1&UnPanel=0'; //JHERRERA 20140807-- Ahora sólo se mostrará un panel para la selección de empleado
    //            var $Pagina = 'Con_SeleccionArea.aspx?Tipo=2&Multiple=1';
    $("#ifArea").attr("src", $Pagina);
    Modal = $('#dvArea').dialog({
        title: "Seleccionar empleado",
        width: $width,
        height: $height,
        modal: true,
        resizable: false
    });
}
function abrirDialogSelecLiena(empSel) {
    var $width = 740;
    var $height = 505;
    var $Pagina = '../../Consultar/Con_SeleccionArea.aspx?Tipo=3&Multiple=1&vcCodEmp=' + empSel + '&UnPanel=1'; //JHERRERA 20140807-- Ahora sólo se mostrará un panel para la selección de empleado
    $("#ifArea").attr("src", $Pagina);
    Modal = $('#dvArea').dialog({
        title: "Seleccionar celular",
        width: $width,
        height: $height,
        modal: true,
        resizable: false
    });
}


function inicioAcordion() {
    $("#BarraNavegacionJQ1_Panel1_O").css("padding-top", "5px");
    $("#BarraNavegacionJQ1_Panel1_O").css("padding-bottom", "5px");
    $("#BarraNavegacionJQ1_Panel2_O").css("padding-top", "0px");
    $("#BarraNavegacionJQ1_Panel2_O").css("padding-bottom", "0px");
    $("#iconclose_Panel1,#aiconclose_Panel1").click(function () {
        if ($("#iconclose_Panel1").hasClass("ui-icon-circle-triangle-n")) {
            $("#iconclose_Panel1").removeClass("ui-icon-circle-triangle-n");
            $("#iconclose_Panel1").addClass("ui-icon-circle-triangle-s");
            $("#BarraNavegacionJQ1_Panel1_O").hide();
        }
        else {
            $("#iconclose_Panel1").removeClass("ui-icon-circle-triangle-s");
            $("#iconclose_Panel1").addClass("ui-icon-circle-triangle-n");
            $("#BarraNavegacionJQ1_Panel1_O").show();
        }
        DimPosElementos(true);
    });


}


function DimPosElementos(refreshIframe) {
    var Ancho = $(window).width();
    var Alto = $(window).height();
    var AnchoLateral = $(".LateralSplitter");
    $(".tabs").css({ height: Alto - 25, width: Ancho - AnchoLateral });
    $(".tabHijo").css({ height: Alto - 95, width: Ancho - 560 });
    $(".ifContenido").css({ height: Alto - 71, width: Ancho - 262 });
    $("#dvContAcordeon").css({ height: Alto - 70, width: Ancho - 160 });
    $(".tabResumen").css({ height: Alto - 81, width: Ancho - 200 });


    if ($("#iconclose_Panel1").hasClass("ui-icon-circle-triangle-n")) {
        $("#ifrResultado").height(Alto - 340);
    }
    else {
        $("#ifrResultado").height(Alto - 80);
    }
    $("#ifrResultado").width(Ancho - 10);

    //if (refreshIframe) {
    //    var iframe = document.getElementById("ifrResultado");
    //    iframe.src = iframe.src;
    //}


}




