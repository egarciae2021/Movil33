        var Criterio;
        var ifCentroCosto;
        var ifNumeroLlamado;
        var ExisteCentroCosto = false;
        var ExisteNumeroLlamado = false;
        var Modal;
        var tblLlamada;
        var tbSumario;
        var tabOpciones;
        var ventanaSumario;
        var UserEmpleado;
        var UserLineas;
        var UserOrga;
        var isGuardarComo = false;

        function UsuarioEmpl(P_vcCod, vcNom) {
            this.P_vcCod = P_vcCod;
            this.vcNom = vcNom;
        }

        function UsuarioLin(P_vcNum) {
            this.P_vcNum = P_vcNum;
        }

        function UsuarioArea(P_inCodOrg, vcNomOrg, vcCodInt, P_vcCodCenCos) {
            this.P_inCodOrg = P_inCodOrg;
            this.vcNomOrg = vcNomOrg;
            this.vcCodInt = vcCodInt;
            this.P_vcCodCenCos = P_vcCodCenCos;
        }

        function AbrirTab(PaginaTab, NombreTab, TituloTab) {
            var Ancho = $(window).width();
            var Alto = $(window).height();
            pagina = PaginaTab;
            AbrirOpcion(tabOpciones, NombreTab, TituloTab, Alto - 95, Ancho - 150);
        }

        function IngresarEmpleados(empleados) {//Agrega los empleados seleccionados del formulario respectivo
            //$("#lstEmpleado").html(""); //JHERRERA 20140807 -- Se comenta esta línea porque la selección de empleados cambió.
            //Criterio.Empleados = new Array();
            $(empleados).each(function () {
                var Empleado = this;
                Criterio.Empleados.push(Empleado);
                $("#lstEmpleado").append($("<option></option>").attr("value", Empleado.P_vcCod).text(Empleado.vcNom));
            });


            var biLinEli = "0";
            var inLinCan = Criterio.Lineas.length;
            var i = 0;
            for (i = 0; i < inLinCan; i++) {
                var oLinea = Criterio.Lineas[inLinCan - i - 1];
                var biExiste = "0";
                var j = 0;
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
                var i = 0;
                for (i = 0; i < Criterio.Empleados.length; i++) {
                    var oEmpleado = Criterio.Empleados[i];
                    if (oEmpleado.vcNom.substring(oEmpleado.vcNom.indexOf("=") + 1) == Linea.Empleado.vcNom.substring(Linea.Empleado.vcNom.indexOf("=") + 1)) {
                        biExiste = "1";
                    }
                }

                if (biExiste == "1" || Criterio.Empleados.length == 0) {
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
                Area.vcCodInt = Area.P_inCodOrg;
                Area.P_inCodOrg = Area.vcNomOrg.split("=")[0];
                Criterio.Organizaciones.push(Area);
                $("#lstOrganizacion").append($("<option></option>").attr("value", Area.P_inCodOrg).text(Area.vcNomOrg));
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

        $(function () {
            $(".btnNormal").button({});


            //$("#txtHoraInicial").val("00:00:00");


            $(".txtFechaKendo").removeClass("ui-widget-content ui-corner-all");
            $(".txtFechaKendo").css("padding", "0px");
            $(".txtFechaKendo").css("margin", "0px");
            $(".txtFechaKendo").kendoTimePicker({
                culture: "es-ES",
                animation: false,
                format: "HH:mm:ss",
                interval: 60

            });

            var txtHoraInicial = $("#txtHoraInicial").data("kendoDateTimePicker");

            $(".txtFecha").keypress(ValidarFecha);
            //$("#txtTiempoMayor").keypress(ValidarFechaHora);

            $(".txtFecha").bind('paste', function (e) {
                return false;
            });

            $(".accordion").accordion({
                collapsible: true,
                autoHeight: false
            });

            inicio();
            function inicio() {
                DimPosElementos();
                Criterio = new ENT_MOV_IMP_Criterio();
                ifCentroCosto = $("#ifCCO");
                ifNumeroLlamado = $("#ifNumeroLlamado");
            }

            $(window).resize(function () {
                DimPosElementos();

                $(".CONSULTAS").each(function () {
                    $(this)[0].width = $(window).width() - 27;
                    $(this)[0].height = $(window).height() - 65;
                });
            });

            function DimPosElementos() {
                var Ancho = $(window).width();
                var Alto = $(window).height();
                var AnchoLateral = $(".LateralSplitter");
                $(".tabs").css({ height: Alto - 25, width: Ancho - AnchoLateral });
                $(".tabHijo").css({ height: Alto - 95, width: Ancho - 560 });
                $(".ifContenido").css({ height: Alto - 71, width: Ancho - 262 });
                $("#dvContAcordeon").css({ height: Alto - 70, width: Ancho - 160 });
            }

            //--------------------------------------------Tab-----------------------------------------------------
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

            //INIT datepicker;
            $(".txtFecha").datepicker({
                changeMonth: true,
                changeYear: true
                //, onSelect: function () { $(this).blur().change(); } //agregado 02-09-2013
            });

            $(".txtHora").AnyTime_picker({ format: "%H:%i:%s",
                labelTitle: "Hora",
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

            $("#btnNumeroLlamado").click(function () {
                var $width = 320;
                var $height = 370;
                Modal = $('#dvNumeroLlamado').dialog({
                    title: "Seleccionar número",
                    width: $width,
                    height: $height,
                    modal: true,
                    resizable: false
                });
                if (!ExisteNumeroLlamado) {
                    var $Pagina = 'Con_SeleccionNumero.aspx';
                    $("#ifNumeroLlamado").attr("src", $Pagina);
                    ExisteNumeroLlamado = true;
                }
            });

            $("#txtNombre").keypress(ValidarAlfaNumerico);

            $("#ddlGlobal").change(function () {
                //var vcCodGlo = $(this).val();
                if ($("#ddlGlobal").val() == -1) {
                    var vcCodGlo = $("#ddlGlobal").val();
                } else {
                    var vcCodGlo = $.trim($("#ddlGlobal option:selected").text());
                }

                $.ajax({
                    type: "POST",
                    url: "Con_Consulta.aspx/ListarServicioPorGlobal",
                    data: "{'vcCodGlo': '" + vcCodGlo + "'}",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (result) {
                        var i = 0;
                        $("tbody", $("#chklstServicio")).html("");
                        $.each(result.d, function () {
                            $("#chklstServicio").append($(AgregarCheckItem('chklstServicio', i.toString(), this.P_inCod, this.vcNom)));
                            i++;
                        });
                        //alert(i);
                    },
                    error: function (xhr, err, thrErr) {
                        MostrarErrorAjax(xhr, err, thrErr);
                    }
                });
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
                    url: "Con_Consulta.aspx/ListarCuentaPorOperador",
                    data: "{'inCodOpe': '" + inCodOpe + "'}",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (result) {
                        var i = 0;
                        $("tbody", $("#chklstCuenta")).html("");
                        $.each(result.d, function () {
                            $("#chklstCuenta").append($(AgregarCheckItem('chklstCuenta', i.toString(), this.P_vcCod, this.vcNom)));
                            i++;
                        });
                    },
                    error: function (xhr, err, thrErr) {
                        MostrarErrorAjax(xhr, err, thrErr);
                    }
                });
            });

            $("#ddlOficinaOrganizativa").live("change", function () {
                Criterio.Organizaciones = [];
                Criterio.CentrosCostos = [];
                $("#lstOrganizacion").html("");
            });

            $("#btnQuitarEmpleado").live("click", function () {
                //var indice = 0;
                //var Item = $("#lstEmpleado").val();
                $("#lstEmpleado option:selected").each(function () {
                    var indice = 0;
                    var Item = $(this).val();
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
            $("#btnQuitarNumeroLlamado").live("click", function () {
                //var indice = 0;
                //var Item = $("#lstEmpleado").val();
                $("#lstNumeroLlamado option:selected").each(function () {
                    var indice = 0;
                    var Item = $(this).val();
                    for (i in Criterio.Numeros) {
                        if (Criterio.Numeros[i].P_vcNum == Item) {
                            indice = i;
                            break;
                        }
                    }
                    if (indice > -1) {
                        Criterio.Numeros.splice(indice, 1);
                        $("#lstNumeroLlamado option:selected").remove();
                        //Eliminar en la pagina de busqueda de numero...
                        try {
                            $("#ifNumeroLlamado")[0].contentWindow.QuitarNumeroLlamado(Item);
                        }
                        catch (e) {
                            //some error
                        }
                    }
                    //$("#lstNumeroLlamado option:selected").remove();
                });
            });

            $("#lstEmpleado").keyup(function (e) {

                if ($.trim($("#hdfEmpSel").val()) != "") {
                    return;
                }
                //var indice = 0;
                var Item = ""; //$("#lstEmpleado").val();
                var code = (e.keyCode ? e.keyCode : e.which);
                if (code == 46) {
                    if (Item != null) {
                        $("#lstEmpleado option:selected").each(function () {
                            var indice = 0;
                            Item = $(this).val();
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
                    }
                }
            });

            $("#btnQuitarLinea").live("click", function () {
                $("#lstLinea option:selected").each(function () {
                    var indice = 0;
                    var Item = $(this).val();
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

            $("#lstLinea").keyup(function (e) {
                //var indice = 0;
                var Item = ""; //$("#lstLinea").val();
                var code = (e.keyCode ? e.keyCode : e.which);
                if (code == 46) {
                    if (Item != null) {
                        $("#lstLinea option:selected").each(function () {
                            var indice = 0;
                            Item = $(this).val();
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
                    }
                }
            });

            $("#btnQuitarOrganizacion").live("click", function () {
                var indice = 0;
                var Item = $("#lstOrganizacion").val();
                if ($("#ddlOficinaOrganizativa").val() == 1) {
                    $("#lstOrganizacion option:selected").each(function () {
                        var indice = 0;
                        var Item = $(this).val();
                        for (i in Criterio.Organizaciones) {
                            if (Criterio.Organizaciones[i].P_inCodOrg == Item) {
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

            $("#lstOrganizacion").keyup(function (e) {
                var indice = 0;
                var Item = ""; //$("#lstOrganizacion").val();
                var code = (e.keyCode ? e.keyCode : e.which);
                if (code == 46) {
                    if (Item != null) {
                        if ($("#ddlOficinaOrganizativa").val() == 1) {
                            $("#lstOrganizacion option:selected").each(function () {
                                var indice = 0;
                                var Item = $(this).val();
                                for (i in Criterio.Organizaciones) {
                                    if (Criterio.Organizaciones[i].P_inCodOrg == Item) {
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
                    }
                }
            });

            $("#btnEjecutar").click(function () {
                var Ancho = $(window).width();
                var Alto = $(window).height();
                var fechaFormato = $(".txtFecha").datepicker("option", "dateFormat");
                var fechaIni = $("#txtDiaInicial").val();
                var fechaFin = $("#txtDiaFinal").val();
                var idtab;

                if (!ValidarFechaFormatoIguales(fechaIni, fechaFin, fechaFormato)) {
                    alerta("En el rango por días la fecha inicial debe ser menor igual a la fecha final");
                    $("#txtDiaInicial").focus();
                    return;
                }

                SeteaValores();

                if (Criterio.inTipCon == "1") {//Reporte
                    pagina = "Con_Llamada.aspx";
                    AbrirOpcionCriterio(tabOpciones, "#TabLlamadas", "Llamadas", Alto - 95, Ancho - 150, Criterio.inTipCon);
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
                        if (Criterio.AreaSumario.P_inCodOrg == "-1" || Criterio.AreaSumario.vcCodOrg == "-1") {
                            //if (Criterio.AreaSumario.vcCodInt == "-1") {
                            alerta("Seleccione un área para el sumario por área");
                            $('#btnSeleccionarArea').focus();
                            return;
                        }
                        vcValSum = Criterio.AreaSumario.vcCodOrg;
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

                    pagina = "Con_Sumario.aspx?Tipo=" + $("#ddlTipoSumario").val() + "&Valor=" + vcValSum;
                    idtab = $($("#ddlTipoSumario option")[parseInt($("#ddlTipoSumario").val())]).html().replace(" ", "").substring(0, 8).replace('á', 'a').replace('é', 'e').replace('í', 'i').replace('ó', 'o').replace('ú', 'u');
                    AbrirOpcionCriterio(tabOpciones, "#TabSum" + idtab, $($("#ddlTipoSumario option")[parseInt($("#ddlTipoSumario").val())]).html(), Alto - 95, Ancho - 150, Criterio.inTipCon);
                }
                else if (Criterio.inTipCon == "3") {//Desconocido
                    pagina = "Con_Reporte_DevExpress.aspx?Tipo=3&SubTipo=0&NumCriterio=" + Criterio.inNumCri;
                    AbrirOpcionCriterio(tabOpciones, "#TabDesconocido", "Desconocido", Alto - 95, Ancho - 150, Criterio.inTipCon);
                }
                else if (Criterio.inTipCon == "4") {//Ranking
                    if ($('#ddlNivelRanking').val() == "-1") {
                        alerta("Seleccione un nivel");
                        $('#ddlNivelRanking').focus();
                        return;
                    }
                    pagina = "Con_Reporte_DevExpress.aspx?Tipo=4&SubTipo=0&NumCriterio=" + Criterio.inNumCri;
                    idtab = $("#ddlNivelRanking option:selected").text().replace(/ /g, '').substring(0, 8).replace('á', 'a').replace('é', 'e').replace('í', 'i').replace('ó', 'o').replace('ú', 'u');
                    AbrirOpcionCriterio(tabOpciones, "#TabRan" + idtab, "Ranking " + $.trim($("#ddlNivelRanking option:selected").text().replace(/ /g, '').substring(0, 8)), Alto - 102, 95 - 150, Criterio.inTipCon);
                }
                else if (Criterio.inTipCon == "5") {//Reporte
                    pagina = "Con_Resumen.aspx?NumCriterio=" + Criterio.inNumCri;
                    AbrirOpcionCriterio(tabOpciones, "#TabResumen", "Resumen", Alto - 95, Ancho - 150, Criterio.inTipCon);
                }
            });

            function fnObtenerIdTap() {
                if (Criterio.inTipCon == "1") {//Reporte
                    return "#TabLlamadas";
                }
                else if (Criterio.inTipCon == "2") {//Sumario
                    return "#TabSum" + $($("#ddlTipoSumario option")[parseInt($("#ddlTipoSumario").val())]).html().replace(" ", "").substring(0, 8).replace('á', 'a').replace('é', 'e').replace('í', 'i').replace('ó', 'o').replace('ú', 'u');
                }
                else if (Criterio.inTipCon == "3") {//Desconocido
                    return "#TabDesconocido";
                }
                else if (Criterio.inTipCon == "4") {//Ranking
                    return "#TabRan" + $("#ddlNivelRanking option:selected").text().replace(" ", "").substring(0, 8).replace('á', 'a').replace('é', 'e').replace('í', 'i').replace('ó', 'o').replace('ú', 'u');
                }
                else if (Criterio.inTipCon == "5") {//Reporte
                    return "#TabResumen";
                }
            }

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
                }
                else {//En el caso que exista lo muestra
                    //                    tab.tabs('select', Id);

                    //                    var i = tabOpciones.tabs("option", "selected");
                    //                    try {
                    //                        $("iframe", "#TabDetalle")[i].contentWindow.Actualizar();
                    //                    }
                    //                    catch (e) {
                    //                        //some err
                    //                    }

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



                    // $("iframe", "#tbAsignacion")[i].contentWindow.Actualizar();

                    //                    switch (parseInt(inTipCon)) {
                    //                        case 1: //Reporte
                    //                            tblLlamada.trigger("reloadGrid");
                    //                            break;
                    //                        case 2: //Sumario
                    //                            //tbSumario.trigger("reloadGrid");
                    //                            ventanaSumario.reload(); ;
                    //                            break;
                    //                        case 3: //Desconocido
                    //                            //
                    //                            break;
                    //                        case 4: //Ranking
                    //                            //
                    //                            break;
                    //                    }
                }
            }

            function SeteaValores() {
                var fechaIni = $("#txtDiaInicial").val();
                var fechaFin = $("#txtDiaFinal").val();
                var fechaFormato = $(".txtFecha").datepicker("option", "dateFormat");

                if (isGuardarComo == true) {
                    Criterio.P_inCodCri = "-1";
                } else {
                    Criterio.P_inCodCri = $("#hdfCod").val();
                }
                Criterio.btCom = $("#chkCompartir").is(':checked');
                Criterio.inTipCon = $("input[name='rblstTipoConsulta']:checked").val();
                Criterio.inTipSum = $('#ddlTipoSumario').val();
                Criterio.NivelSumario.P_inCodNiv = $('#ddlNivelSumario').val();
                Criterio.NivelSumario.vcNomNiv = $("#ddlNivelSumario option:selected").text();
                Criterio.PaisSumario.P_vcCodPai = $('#ddlPaisSumario').val();
                Criterio.PaisSumario.vcNomPai = $("#ddlPaisSumario option:selected").text();
                Criterio.NivelRanking.P_inCodNiv = $('#ddlNivelRanking').val();
                Criterio.NivelRanking.vcNomNiv = $("#ddlNivelRanking option:selected").text();
                Criterio.inTipOfiOrg = $("#ddlOficinaOrganizativa").val();
                Criterio.vcPorDiaIni = fechaIni.substring(fechaFormato.indexOf("yy"), fechaFormato.indexOf("yy") + 4) + fechaIni.substring(fechaFormato.indexOf("mm"), fechaFormato.indexOf("mm") + 2) + fechaIni.substring(fechaFormato.indexOf("dd"), fechaFormato.indexOf("dd") + 2);
                Criterio.vcPorDiaFin = fechaFin.substring(fechaFormato.indexOf("yy"), fechaFormato.indexOf("yy") + 4) + fechaFin.substring(fechaFormato.indexOf("mm"), fechaFormato.indexOf("mm") + 2) + fechaFin.substring(fechaFormato.indexOf("dd"), fechaFormato.indexOf("dd") + 2);
                Criterio.vcPorHorIni = $("#txtHoraInicial").val();
                Criterio.vcPorHorFin = $("#txtHoraFinal").val();
                Criterio.vcPorTieIni = $("#txtTiempoMayor").val();
                Criterio.vcPorTieFin = $("#txtTiempoMenor").val();
                if ($("#ddlGlobal").val() == -1) {
                    Criterio.Global.P_vcCod = $("#ddlGlobal").val();
                } else {
                    Criterio.Global.P_vcCod = $.trim($("#ddlGlobal option:selected").text());
                }
                Criterio.TipoLlamada.P_inCod = $("input[name='rblstTipoLlamada']:checked").val();
                Criterio.TipoTelefonia.P_inCod = $("input[name='rblstTelefonia']:checked").val();
                Criterio.OperadorCuenta.P_inCodOpe = $("#ddlOperador").val();
                if ($("#hdfCod").val() == "-1") {
                    Criterio.vcNomCri = $("#txtNombre").val();
                } else {
                    Criterio.vcNomCri = $("#TxtNombreComo").val();
                }
                Criterio.inNumCri = $("#hdfNumCri").val();
                Criterio.vcTab = "";

                //jherrera 20130507 Nuevo criterio
                //--------------------------------
                Criterio.inLinTip = $('#ddlLineaTipo').val();
                //--------------------------------

                //agregado 07-08-2014 - wapumayta 
                //Criterio.AreaSumario.vcCodInt = Criterio.AreaSumario.P_inCodOrg;
                //Criterio.AreaSumario.P_inCodOrg = 0;
                //----------
                Criterio.Servicios = [];
                Criterio.Operadores = [];
                Criterio.SucursalesOrigen = [];
                Criterio.Cuentas = [];


                if ($.trim($("#hdfEmpSel").val()) != "") {
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

                $("input", "#chklstServicio").each(function () {
                    if ($(this).attr('checked')) {
                        Servicio = new ENT_GEN_Servicio();
                        Servicio.P_inCod = $(this).val();
                        Criterio.Servicios.push(Servicio);
                    }
                });

                $("input", "#chklstOperador").each(function () {
                    if ($(this).attr('checked')) {
                        Operador = new ENT_GEN_Operador();
                        Operador.P_inCodOpe = $(this).val();
                        Criterio.Operadores.push(Operador);
                    }
                });
                $("input", "#chklstSucursalOrigen").each(function () {
                    if ($(this).attr('checked')) {
                        Sucursal = new ENT_GEN_Sucursal();
                        Sucursal.P_vcCod = $(this).val();
                        Criterio.SucursalesOrigen.push(Sucursal);
                    }
                });

                $("input", "#chklstCuenta").each(function () {
                    if ($(this).attr('checked')) {
                        Cuenta = new ENT_MOV_Cuenta();
                        Cuenta.P_vcCod = $(this).val();
                        Criterio.Cuentas.push(Cuenta);
                    }
                });

                Criterio.vcNomTab = fnObtenerIdTap();

                Criterio.AreaSumario.vcCodOrg = Criterio.AreaSumario.P_inCodOrg;
                delete Criterio.AreaSumario.P_inCodOrg;


                $.ajax({
                    type: "POST",
                    url: "Con_Consulta.aspx/SeteaValores",
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

            $("#btnEditar").click(function () {
                SeteaValores();

                if (Criterio.Empleados.length > 240) {
                    alerta("No se pudo completar la operación ya que son demasiados Empleados a guardar");
                    HabilitarControles(true);
                    $("#btnGuardar").show();
                    $("#btnLimpiar").show();
                    //$("#btnCancelar").show();
                    $(this).dialog("close");
                    return;
                }
                if (Criterio.Lineas.length > 240) {
                    alerta("No se pudo completar la operación ya que son demasiados Líneas a guardar");
                    HabilitarControles(true);
                    $("#btnGuardar").show();
                    $("#btnLimpiar").show();
                    //$("#btnCancelar").show();
                    $(this).dialog("close");
                    return;
                }
                if (Criterio.Organizaciones.length > 240) {
                    alerta("No se pudo completar la operación ya que son demasiados Organizaciones a guardar");
                    HabilitarControles(true);
                    $("#btnGuardar").show();
                    $("#btnLimpiar").show();
                    //$("#btnCancelar").show();
                    $(this).dialog("close");
                    return;
                }
                if (Criterio.CentrosCostos.length > 240) {
                    alerta("No se pudo completar la operación ya que son demasiados Centros de Costos a guardar");
                    HabilitarControles(true);
                    $("#btnGuardar").show();
                    $("#btnLimpiar").show();
                    //$("#btnCancelar").show();
                    $(this).dialog("close");
                    return;
                }

                var oCriterio = JSON.stringify(Criterio);

                $.ajax({
                    type: "POST",
                    url: "Con_Consulta.aspx/Guardar",
                    data: "{'oCriterio': '" + oCriterio + "'}",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (result) {
                        Mensaje("<br/><img src=\"../../Common/Images/Mantenimiento/Grabar32.png\" /><br/><h1>Criterio guardado</h1><br/>", document, CerroMensaje);
                    },
                    error: function (xhr, err, thrErr) {
                        MostrarErrorAjax(xhr, err, thrErr);
                    }
                });
                //                $('#divMsgConfirmacion').dialog({
                //                    title: "Advertencia",
                //                    modal: true,
                //                    buttons: {
                //                        "Si": function () {
                //                            alert(1);
                //                        },
                //                        "No": function () {
                //                            $(this).dialog("close");
                //                        }
                //                    },
                //                    close: function (event, ui) {
                //                        $(this).dialog("close");
                //                    }
                //                });
            });

            $("#btnGuardar").click(function () {
                $("#dvNombre").dialog({
                    title: "Guardar criterio",
                    width: 370,
                    //height: $height,
                    modal: true,
                    buttons: {
                        "Guardar": function () {
                            if ($("#txtNombre").val() == "") {
                                alerta("Ingrese un nombre para el criterio a guardar");
                                $("#txtNombre").focus();
                                return;
                            }

                            SeteaValores();

                            if (Criterio.Empleados.length > 240) {
                                alerta("No se pudo completar la operación ya que son demasiados Empleados a guardar");
                                HabilitarControles(true);
                                $("#btnGuardar").show();
                                $("#btnLimpiar").show();
                                //$("#btnCancelar").show();
                                $(this).dialog("close");
                                return;
                            }
                            if (Criterio.Lineas.length > 240) {
                                alerta("No se pudo completar la operación ya que son demasiados Líneas a guardar");
                                HabilitarControles(true);
                                $("#btnGuardar").show();
                                $("#btnLimpiar").show();
                                //$("#btnCancelar").show();
                                $(this).dialog("close");
                                return;
                            }
                            if (Criterio.Organizaciones.length > 240) {
                                alerta("No se pudo completar la operación ya que son demasiados Organizaciones a guardar");
                                HabilitarControles(true);
                                $("#btnGuardar").show();
                                $("#btnLimpiar").show();
                                //$("#btnCancelar").show();
                                $(this).dialog("close");
                                return;
                            }
                            if (Criterio.CentrosCostos.length > 240) {
                                alerta("No se pudo completar la operación ya que son demasiados Centros de Costos a guardar");
                                HabilitarControles(true);
                                $("#btnGuardar").show();
                                $("#btnLimpiar").show();
                                //$("#btnCancelar").show();
                                $(this).dialog("close");
                                return;
                            }

                            var oCriterio = JSON.stringify(Criterio);

                            $.ajax({
                                type: "POST",
                                url: "Con_Consulta.aspx/Guardar",
                                data: "{'oCriterio': '" + oCriterio + "'}",
                                contentType: "application/json; charset=utf-8",
                                dataType: "json",
                                success: function (result) {
                                    Mensaje("<br/><img src=\"../../Common/Images/Mantenimiento/Grabar32.png\" /><br/><h1>Criterio guardado</h1><br/>", document, CerroMensaje);
                                },
                                error: function (xhr, err, thrErr) {
                                    MostrarErrorAjax(xhr, err, thrErr);
                                }
                            });
                            $(this).dialog("close");
                        },
                        "Cancelar": function () {
                            $(this).dialog("close");
                        }
                    }
                });
            });

            $("#btnGuardarComo").click(function () {
                $("#dvGuardarComo").dialog({
                    title: "Guardar como criterio",
                    width: 370,
                    //height: $height,
                    modal: true,
                    buttons: {
                        "Guardar": function () {
                            if ($("#TxtNombreComo").val() == "") {
                                alerta("Ingrese un nombre para el criterio a guardar");
                                $("#TxtNombreComo").focus();
                                return;
                            }
                            //                            HabilitarControles(false);
                            //                            $("#btnGuardar").hide();
                            //                            $("#btnLimpiar").hide();
                            //                            $("#btnCancelar").hide();
                            isGuardarComo = true;
                            SeteaValores();

                            if (Criterio.Empleados.length > 240) {
                                alerta("No se pudo completar la operación ya que son demasiados Empleados a guardar");
                                HabilitarControles(true);
                                $("#btnGuardar").show();
                                $("#btnLimpiar").show();
                                //$("#btnCancelar").show();
                                $(this).dialog("close");
                                return;
                            }
                            if (Criterio.Lineas.length > 240) {
                                alerta("No se pudo completar la operación ya que son demasiados Líneas a guardar");
                                HabilitarControles(true);
                                $("#btnGuardar").show();
                                $("#btnLimpiar").show();
                                //$("#btnCancelar").show();
                                $(this).dialog("close");
                                return;
                            }
                            if (Criterio.Organizaciones.length > 240) {
                                alerta("No se pudo completar la operación ya que son demasiados Organizaciones a guardar");
                                HabilitarControles(true);
                                $("#btnGuardar").show();
                                $("#btnLimpiar").show();
                                //$("#btnCancelar").show();
                                $(this).dialog("close");
                                return;
                            }
                            if (Criterio.CentrosCostos.length > 240) {
                                alerta("No se pudo completar la operación ya que son demasiados Centros de Costos a guardar");
                                HabilitarControles(true);
                                $("#btnGuardar").show();
                                $("#btnLimpiar").show();
                                //$("#btnCancelar").show();
                                $(this).dialog("close");
                                return;
                            }

                            var oCriterio = JSON.stringify(Criterio);

                            $.ajax({
                                type: "POST",
                                url: "Con_Consulta.aspx/Guardar",
                                data: "{'oCriterio': '" + oCriterio + "'}",
                                contentType: "application/json; charset=utf-8",
                                dataType: "json",
                                success: function (result) {
                                    Mensaje("<br/><img src=\"../../Common/Images/Mantenimiento/Grabar32.png\" /><br/><h1>Criterio guardado</h1><br/>", document, CerroMensaje);
                                    isGuardarComo = false;
                                },
                                error: function (xhr, err, thrErr) {
                                    MostrarErrorAjax(xhr, err, thrErr);
                                }
                            });
                            $(this).dialog("close");
                        },
                        "Cancelar": function () {
                            $(this).dialog("close");
                        }
                    }
                });
            });

            if ($("#hdfEmpSel").val() != '') {
                var cont = 0;
                $('#rblstTipoConsulta > tbody  > tr').each(function () {
                    cont += 1;
                    if (cont > 1) {
                        $(this).remove();
                    }
                });
                //$('input:radio[name=rblstTipoConsulta]:nth(1)').attr("disabled", "disabled");
                //$('input:radio[name=rblstTipoConsulta]:nth(2)').attr("disabled", "disabled");
                //$('input:radio[name=rblstTipoConsulta]:nth(3)').attr("disabled", "disabled");
                $("#trInformacionServicios").show();
                $(".accordion").find('h3').filter(':contains(Número)').hide();
                $(".accordion").find('h3').filter(':contains(Telefonía)').hide();
                $(".accordion").find('h3').filter(':contains(Sucursal)').hide();
                $(".accordion").find('h3').filter(':contains(Cuenta)').hide();
            }
            else {
                //$('input:radio[name=rblstTipoConsulta]:nth(4)').removeAttr("disabled");
                //$('input:radio[name=rblstTipoConsulta]:nth(2)').removeAttr("disabled");
                //$('input:radio[name=rblstTipoConsulta]:nth(3)').removeAttr("disabled");
                $("#trInformacionServicios").hide();
            }

            function CerroMensaje() {
                $("#btnEjecutar").button("option", "disabled", false);
                HabilitarTipoConsulta(true);
                $("#btnSeleccionarArea").button("option", "disabled", false);
                $("#txtNombre").val("");
                $("#TxtNombreComo").val("");
                //$("#btnGuardar").hide();

                //----
                //                //HabilitarControles(false);
                //                $("#btnEjecutar").button("option", "disabled", false);
                //                //HabilitarTipoConsulta(true);
                //                $("#btnSeleccionarArea").button("option", "disabled", false);
                //                $("#btnLimpiar").hide();
                //                $("#btnCancelar").hide();
                //                $("#btnGuardar").hide();
                //                $("#btnEditar").show();
                //                $("#btnGuardarComo").show();

                $("#dwOperador").attr('disabled', true);
            }

            $("#btnLimpiar").click(function () {
                window.location.href = 'Con_Consulta.aspx?inNumCri=1';
                /*
                var i = 0;

                $('input:radio[name=rblstTipoConsulta]:nth(0)').attr('checked', true);

                $('.CriteriosAdicionales').hide();
                $('#dvRanking').hide();
                $("select#ddlNivelRanking").prop('selectedIndex', 0);
                $('#dvSumario').hide();
                $("#dvCriterioExtra").hide(); //Solo para sumario
                $("select#ddlTipoSumario").prop('selectedIndex', 0);
                $('#dvCriterioExtra').hide();
                $('#dvNivelSumario').hide();
                $("select#ddlNivelSumario").prop('selectedIndex', 0);
                $('#dvAreaSumario').hide();
                $('#lblAreaSumario').html("");
                $('#dvPaisSumario').hide();
                $("select#ddlPaisSumario").prop('selectedIndex', 0);
                $("#lstEmpleado").html("");
                $("#lstLinea").html("");
                $("#lstOrganizacion").html("");
                $("select#ddlOficinaOrganizativa").prop('selectedIndex', 0);
                //jherrera 20130507
                //-----------------
                $("select#ddlLineaTipo").prop('selectedIndex', 0);
                //-----------------

                $.ajax({
                type: "POST",
                url: "../../Common/WebService/General.asmx/Fecha",
                data: "{}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {
                $("#txtDiaInicial").val("01" + result.d.substring(2, 10));
                $("#txtDiaFinal").val(result.d);
                },
                error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
                }
                });

                $("#txtHoraInicial").val("00:00:00");
                $("#txtHoraFinal").val("23:59:59");
                //txtTiempoMayor
                $("#txtTiempoMayor").val("00:00:00");
                $("#txtTiempoMenor").val("00:00:00");
                $("#ddlGlobal").val("-1");
                $("#chkServicio").attr('checked', false);
                $("#ddlGlobal").change();

                $("#lstNumeroLlamado").html("");
                $("input", "#chklstOperador").attr('checked', false);
                $('input:radio[name=rblstTipoLlamada]:nth(1)').attr('checked', true);
                $('input:radio[name=rblstTelefonia]:nth(0)').attr('checked', true);
                $("#chkCompartir").attr('checked', false);

                i = 0;

                $("#chkSucursalOrigen").attr('checked', false);

                $("input", "#chklstSucursalOrigen").attr('checked', false);

                $("#chkOperador").attr('checked', false);
                $("#ddlOperador").val("-1");

                i = 0;
                $("#chkCuenta").attr('checked', false);
                $("#ddlOperador").change();
                Criterio = new ENT_MOV_IMP_Criterio();
                */
            });

            $("#btnCancelar").click(function () {

            });

            $("#rblstTipoConsulta").change(function () {
                var valor = $("input[name='rblstTipoConsulta']:checked").val();

                $("#dvRanking").hide();
                $("#dvSumario").hide();
                $("#dvCriterioExtra").hide(); //Solo para sumario                
                $(".CriteriosAdicionales").hide();

                $("select#ddlNivelRanking").prop('selectedIndex', 0);
                $("select#ddlTipoSumario").prop('selectedIndex', 0);
                $("select#ddlNivelSumario").prop('selectedIndex', 0);
                $("select#ddlPaisSumario").prop('selectedIndex', 0);

                if (valor == "2") {
                    $("#dvSumario").show();
                    $("#dvCriterioExtra").show(); //Solo para sumario
                    $("#dvNivelSumario").hide();
                    $("#dvAreaSumario").hide();
                    $("#dvPaisSumario").hide();
                    $(".CriteriosAdicionales").show();
                }
                else if (valor == "4") {
                    $("#dvRanking").show();
                    $(".CriteriosAdicionales").show();
                }

                Criterio.AreaSumario = new ENT_GEN_Organizacion();
                $("#lblAreaSumario").html("");
            });

            $("#ddlTipoSumario").change(function () {
                var inCodTipSum = $(this).val();

                $("#dvCriterioExtra").hide();
                $("#dvNivelSumario").hide();
                $("#dvAreaSumario").hide();
                $("#dvPaisSumario").hide();
                $("select#ddlNivelSumario").prop('selectedIndex', 0);
                $("select#ddlPaisSumario").prop('selectedIndex', 0);

                if (inCodTipSum == 1) {
                    $("#dvCriterioExtra").show();
                    $("#dvNivelSumario").show();
                }
                else if (inCodTipSum == 2) {
                    $("#dvCriterioExtra").show();
                    $("#dvAreaSumario").show();
                }
                else if (inCodTipSum == 10) {
                    $("#dvCriterioExtra").show();
                    $("#dvPaisSumario").show();
                }

                Criterio.AreaSumario = new ENT_GEN_Organizacion();
                $("#lblAreaSumario").html("");
            });

            $("#btnSeleccionarArea").click(function () {
                var altoContenidoTab = tabOpciones.css("height").replace("px", "");
                var $width;
                var $height;
                if (parseInt(altoContenidoTab) > 500) {
                    $width = 755;
                    $height = 510;
                } else {
                    $width = 770; //para soportar scroll
                    $height = parseInt(altoContenidoTab);
                }
                var $Pagina = 'Con_SeleccionArea.aspx?Tipo=1&Multiple=0';
                $("#ifAreaSumario").attr("width", "730px").attr("height", "470px");
                $("#ifAreaSumario").attr("src", $Pagina);
                Modal = $('#dvAreaSumarioDet').dialog({
                    title: "Seleccionar Área",
                    width: $width,
                    height: $height,
                    modal: true,
                    resizable: false
                });
            });

            function HabilitarTipoConsulta(Habilitar) {
                if (Habilitar) {
                    $("input", "#rblstTipoConsulta").removeAttr("disabled");
                    $("#ddlNivelRanking").removeAttr("disabled");
                    $("#ddlTipoSumario").removeAttr("disabled");
                    $("#ddlNivelSumario").removeAttr("disabled");
                    $("#ddlPaisSumario").removeAttr("disabled");
                }
                else {
                    $("input", "#rblstTipoConsulta").attr("disabled", "disabled");
                    $("#ddlNivelRanking").attr("disabled", "disabled");
                    $("#ddlTipoSumario").attr("disabled", "disabled");
                    $("#ddlNivelSumario").attr("disabled", "disabled");
                    $("#ddlPaisSumario").attr("disabled", "disabled");
                }
            }

            function HabilitarOrganizacion(Habilitar) {
                if (Habilitar) {
                    $("#ddlOficinaOrganizativa").removeAttr("disabled");
                }
                else {
                    $("#ddlOficinaOrganizativa").attr("disabled", "disabled");
                }
            }
            function HabilitarMiscelanea(Habilitar) {
                if (Habilitar) {
                    $("#ddlGlobal").removeAttr("disabled");
                    $("#txtDiaInicial").removeAttr("disabled");
                    $("#txtDiaFinal").removeAttr("disabled");
                    $("#txtHoraInicial").removeAttr("disabled");
                    $("#txtHoraFinal").removeAttr("disabled");
                    $("#txtTiempoMayor").removeAttr("disabled");
                    $("#txtTiempoMenor").removeAttr("disabled");
                    $("input", "#chklstServicio").removeAttr("disabled");
                    $("#chkServicio").removeAttr("disabled");
                }
                else {
                    $("#ddlGlobal").attr("disabled", "disabled");
                    $("#txtDiaInicial").attr("disabled", "disabled");
                    $("#txtDiaFinal").attr("disabled", "disabled");
                    $("#txtHoraInicial").attr("disabled", "disabled");
                    $("#txtHoraFinal").attr("disabled", "disabled");
                    $("#txtTiempoMayor").attr("disabled", "disabled");
                    $("#txtTiempoMenor").attr("disabled", "disabled");
                    $("input", "#chklstServicio").attr("disabled", "disabled");
                    $("#chkServicio").attr("disabled", "disabled");
                }
            }
            function HabilitarOrigen(Habilitar) {
                if (Habilitar) {
                    $("input", "#chklstOperador").removeAttr("disabled");
                    $("input", "#rblstTipoLlamada").removeAttr("disabled");
                    $("input", "#rblstTelefonia").removeAttr("disabled");
                    $("#chkOperador").removeAttr("disabled");
                    //jherrera 20130508
                    //-----------------
                    $("#ddlLineaTipo").removeAttr("disabled");
                    //-----------------
                }
                else {
                    $("input", "#chklstOperador").attr("disabled", "disabled");
                    $("input", "#rblstTipoLlamada").attr("disabled", "disabled");
                    $("input", "#rblstTelefonia").attr("disabled", "disabled");
                    $("#chkOperador").attr("disabled", "disabled");
                    //jherrera 20130508
                    //-----------------
                    $("#ddlLineaTipo").attr("disabled", "disabled");
                    //-----------------
                }
            }
            function HabilitarSucursal(Habilitar) {
                if (Habilitar) {
                    $("input", "#chklstSucursalOrigen").removeAttr("disabled");
                    $("#chkSucursalOrigen").removeAttr("disabled");
                }
                else {
                    $("input", "#chklstSucursalOrigen").attr("disabled", "disabled");
                    $("#chkSucursalOrigen").attr("disabled", "disabled");
                }
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

            function HabilitarControles(Habilitar) {
                HabilitarTipoConsulta(Habilitar);
                HabilitarOrganizacion(Habilitar);
                HabilitarMiscelanea(Habilitar);
                HabilitarOrigen(Habilitar);
                HabilitarSucursal(Habilitar);
                HabilitarCuenta(Habilitar);
                $(".btnNormal").button("option", "disabled", !Habilitar);
            }

            $("#chkServicio").change(function () {
                $("input", "#chklstServicio").attr('checked', $(this).is(':checked'));
            });
            $("#chkCuenta").change(function () {
                $("input", "#chklstCuenta").attr('checked', $(this).is(':checked'));
            });
            $("#chkSucursalOrigen").change(function () {
                $("input", "#chklstSucursalOrigen").attr('checked', $(this).is(':checked'));
            });
            $("#chkOperador").change(function () 
            {
                $("input", "#chklstOperador").attr('checked', $(this).is(':checked'));
                
            });

            //mostrar el dialog en ventana padre - agregado 27-11-2013 wapumayta
            $("#btnOrganizacion").click(function () {
                window.parent.abrirDialogSelecOficina($("#ddlOficinaOrganizativa").val());
            });
            //$("#btnOrganizacion").click(function () {
            //    if ($("#ddlOficinaOrganizativa").val() == "1") {//Organización
            //        var $width = 740;
            //        var $height = 505;
            //        var $Pagina = 'Con_SeleccionArea.aspx?Tipo=1&Multiple=1';
            //        $("#ifArea").attr("src", $Pagina);
            //        Modal = $('#dvArea').dialog({
            //            title: "Seleccionar area",
            //            width: $width,
            //            height: $height,
            //            modal: true,
            //            resizable: false
            //        });
            //    }
            //    else if ($("#ddlOficinaOrganizativa").val() == "2") {//Centro de costo
            //        var $width = 475;
            //        var $height = 370;
            //        Modal = $('#dvCCO').dialog({
            //            title: "Seleccionar centro de costo",
            //            width: $width,
            //            height: $height,
            //            modal: true,
            //            resizable: false
            //        });
            //        if (!ExisteCentroCosto) {
            //            var $Pagina = 'Con_SeleccionCentroCosto.aspx';
            //            $("#ifCCO").attr("src", $Pagina);
            //            ExisteCentroCosto = true;
            //        }
            //    }
            //});

            //mostrar el dialog en ventana padre - agregado 27-11-2013 wapumayta
            $("#btnEmpleado").click(function () {
                window.parent.abrirDialogSelectEmp();
            });
            //$("#btnEmpleado").click(function () {
            //    var $width = 740;
            //    var $height = 505;
            //    var $Pagina = 'Con_SeleccionArea.aspx?Tipo=2&Multiple=1';
            //    $("#ifArea").attr("src", $Pagina);
            //    Modal = $('#dvArea').dialog({
            //        title: "Seleccionar empleado",
            //        width: $width,
            //        height: $height,
            //        modal: true,
            //        resizable: false
            //    });
            //});

            //mostrar el dialog en ventana padre - agregado 27-11-2013 wapumayta
            $("#btnLinea").click(function () {
                window.parent.abrirDialogSelecLiena($("#hdfEmpSel").val(), $("#ddlLineaTipo").val());
            });
            //$("#btnLinea").click(function () {
            //    var $width = 740;
            //    var $height = 505;
            //    var $Pagina = 'Con_SeleccionArea.aspx?Tipo=3&Multiple=1&vcCodEmp=' + $("#hdfEmpSel").val();
            //    $("#ifArea").attr("src", $Pagina);
            //    Modal = $('#dvArea').dialog({
            //        title: "Seleccionar celular",
            //        width: $width,
            //        height: $height,
            //        modal: true,
            //        resizable: false
            //    });
            //});

            $("#dvCargandoInicial").fadeOut("slow");
            $("#dvContenido").fadeIn("slow");
            if ($("#hdfCod").val() != "-1") {
                //HabilitarControles(false);
                $("#btnEjecutar").button("option", "disabled", false);
                //HabilitarTipoConsulta(true);
                $("#btnSeleccionarArea").button("option", "disabled", false);
                $("#btnLimpiar").hide();
                $("#btnCancelar").hide();
                $("#btnGuardar").hide();
                $("#btnEditar").show();
                $("#btnGuardarComo").show();
                Criterio.AreaSumario.P_inCodOrg = $("#hdfCodAre").val();

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

                UserLineas = [];
                $("#lstLinea option").each(function () {
                    var UsuarioLinea = new UsuarioLin();
                    UsuarioLinea.P_vcNum = $(this).val();
                    UserLineas.push(UsuarioLinea);
                });
                Criterio.Lineas = [];
                $(UserLineas).each(function () {
                    var Lineas = this;
                    Criterio.Lineas.push(Lineas);
                });


                if ($("#ddlOficinaOrganizativa").val() == 2) {
                    UserOrga = [];
                    $("#lstOrganizacion option").each(function () {
                        var UsuarioOrga = new UsuarioArea();
                        UsuarioOrga.P_vcCodCenCos = $(this).val();
                        UserOrga.push(UsuarioOrga);
                    });
                    Criterio.CentrosCostos = [];
                    $(UserOrga).each(function () {
                        var CentroCosto = this;
                        Criterio.CentrosCostos.push(CentroCosto);
                    });
                } else {
                    UserOrga = [];
                    $("#lstOrganizacion option").each(function () {
                        var UsuarioOrga = new UsuarioArea();
                        UsuarioOrga.P_inCodOrg = $(this).val();
                        UsuarioOrga.vcNomOrg = $(this).html();
                        UserOrga.push(UsuarioOrga);
                    });
                    Criterio.Organizaciones = [];
                    $(UserOrga).each(function () {
                        var Area = this;
                        Criterio.Organizaciones.push(Area);
                    });
                }
            }
        });
