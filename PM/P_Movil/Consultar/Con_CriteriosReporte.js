    var Historico;
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
    var Modelos;
    var tbModelos;

    function UsuarioEmpl(P_vcCod, vcNom)
    {
        this.P_vcCod = P_vcCod;
        this.vcNom = vcNom;
    }

    function UsuarioLin(P_vcNum)
    {
        this.P_vcNum = P_vcNum;
    }

    function UsuarioArea(P_inCodOrg, vcNomOrg, vcCodInt, P_vcCodCenCos)
    {
        this.P_inCodOrg = P_inCodOrg;
        this.vcNomOrg = vcNomOrg;
        this.vcCodInt = vcCodInt;
        this.P_vcCodCenCos = P_vcCodCenCos;
    }

    function modelos(P_inCod, vcNom){
        this.P_inCod = P_inCod;
        this.vcNom = vcNom;
    }

    $(function () {
        $(".btnNormal").button({});

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
            Historico = new ENT_MOV_Historicos();
            ifCentroCosto = $("#ifCCO");
            ifNumeroLlamado = $("#ifNumeroLlamado");
            Modelos = [];
            if ($('#chkFecha').is(':checked') == true) {
                $("#txtDiaInicial").prop("disabled", true);
                $("#txtDiaFinal").prop("disabled", true);
            } else {
                $("#txtDiaInicial").prop("disabled", false);
                $("#txtDiaFinal").prop("disabled", false);
            }
        }

        $(window).resize(function () {
            DimPosElementos();

            $(".CONSULTAS").each(function () {
                $(this)[0].width = $(window).width() - 27;
                $(this)[0].height = $(window).height() - 65;
            });
        });

        function AgregarCheckItem(idchklst, indice, valor, texto) {
            var str = '<tr>\n\t\t\t\t<td>' +
                          '<input id=\"' + idchklst + '_' + indice + '\" name=\"' + idchklst + '$' + indice + '\" value=\"' + valor + '\" type=\"checkbox\">' +
                          '<label for=\"' + idchklst + '_' + indice + '\">' + texto + '</label></td>\n\t\t\t</tr>';
            return str;
        }

        function DimPosElementos() {
            var Ancho = $(window).width();
            var Alto = $(window).height();
            var AnchoLateral = $(".LateralSplitter");
            $(".tabs").css({ height: Alto - 25, width: Ancho - AnchoLateral });
            $(".tabHijo").css({ height: Alto - 95, width: Ancho - 560 });
            $(".ifContenido").css({ height: Alto - 71, width: Ancho - 262 });
            $("#dvContAcordeon").css({ height: Alto - 70, width: Ancho - 160 });
        }

        $("#TabDetalle span.ui-icon-close").live("click", function () {
            var index = $("li", tabOpciones).index($(this).parent());
            tabOpciones.tabs("remove", index);
        });

        //INIT datepicker;
        $(".txtFecha").datepicker({
            changeMonth: true,
            changeYear: true
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

        tbModelos = $("#tbModelos").jqGrid({
            sortable: true,
            datatype: "local",
            colModel: [{ name: 'IdModeloDispositivo', Campo: 'IdModeloDispositivo', label: 'Código', hidden: false, width: 70 },
                   { name: 'vcNom', index: 'vcNom', label: 'Nombre', hidden: false, width: 500 }
   	        ],
            jsonReader: {
                root: "Items",
                page: "PaginaActual",
                total: "TotalPaginas",
                records: "TotalRegistros",
                repeatitems: true,
                cell: "Row",
                id: "ID"
            },
            pager: "#tbModelosPager",
            loadtext: 'Cargando Modelos Dispositivos...',
            emptyrecords: 'No hay Modelos en el Grupo Empleado',
            pgtext: 'Pág: {0} de {1}',
            rowNum: "10",
            rowList: [10, 20, 30],
            viewrecords: true,
            multiselect: false,
            sortname: "vcNom",
            sortorder: "asc",
            width: 710,
            height: "auto",
            rownumbers: true,
            shrinkToFit: false,
            caption: "Modelos Dispositivos"
        });

        $("#btnAgregarModelo").live("click", function () {
            $("#bpBusquedaModelos_imgBusqueda").click();
        });

        $("#btnEliminarModelo").live("click", function () {
            var inCodModelo = tbModelos.getGridParam('selrow');
            if (tbModelos.getGridParam('selrow')) {
                var indice = 0;
                for (i in Historico.Modelos) {
                    if (Historico.Modelos[i].P_inCod == inCodModelo) {
                        indice = i;
                        break;
                    }
                }
                if (indice > -1) {
                    //Historico.Modelos.splice(indice, 1);
                    Modelos.splice(indice, 1);
                }
                $("#tbModelos").jqGrid('delRowData', inCodModelo);
            }
        });

        $("#btnEmpleado").click(function () {
            var $width = 920;
            var $height = 505;
            var $Pagina = 'Con_SeleccionArea.aspx?Tipo=2&Multiple=1&UnPanel=0';
            $("#ifArea").attr("src", $Pagina);
            Modal = $('#dvArea').dialog({
                title: "Seleccionar empleado",
                width: $width,
                height: $height,
                modal: true,
                resizable: false
            });
        });

        $("#btnQuitarEmpleado").live("click", function () {
            $("#lstEmpleado option:selected").each(function () {
                var indice = 0;
                var Item = $(this).val();
                for (i in Historico.Empleados) {
                    if (Historico.Empleados[i].P_vcCod == Item) {
                        indice = i;
                        break;
                    }
                }
                if (indice > -1) {
                    Historico.Empleados.splice(indice, 1);
                    $("#lstEmpleado option:selected").remove();
                }
            });
        });

        $("#btnLinea").click(function () {
            var $width = 740;
            var $height = 505;
            var $Pagina = 'Con_SeleccionArea.aspx?Tipo=3&Multiple=1&vcCodEmp=' + "" + '&UnPanel=1';
            $("#ifArea").attr("src", $Pagina);
            Modal = $('#dvArea').dialog({
                title: "Seleccionar celular",
                width: $width,
                height: $height,
                modal: true,
                resizable: false
            });
        });

        $("#btnQuitarLinea").live("click", function () {
            $("#lstLinea option:selected").each(function () {
                var indice = 0;
                var Item = $(this).val();
                for (i in Historico.Lineas) {
                    if (Historico.Lineas[i].P_vcNum == Item) {
                        indice = i;
                        break;
                    }
                }
                if (indice > -1) {
                    Historico.Lineas.splice(indice, 1);
                    $("#lstLinea option:selected").remove();
                }
            });
        });

        $("#btnOrganizacion").click(function () {
            var ExisteCentroCosto = false;
            var ifCentroCosto = $("#ifCCO");
            if ($("#ddlOficinaOrganizativa").val() == "1") {//Organización
                var $width = 740;
                var $height = 505;
                var $Pagina = 'Con_SeleccionArea.aspx?Tipo=1&Multiple=1&UnPanel=1';
                $("#ifArea").attr("src", $Pagina);
                Modal = $('#dvArea').dialog({
                    title: "Seleccionar Área",
                    width: $width,
                    height: $height,
                    modal: true,
                    resizable: false
                });
            }
            else if ($("#ddlOficinaOrganizativa").val() == "2") {//Centro de costo
                var $width = 590;
                var $height = 470;
                Modal = $('#dvCCO').dialog({
                    title: "Seleccionar centro de costo",
                    width: $width,
                    height: $height,
                    modal: true,
                    resizable: false
                });
                if (!ExisteCentroCosto) {
                    var $Pagina = 'Con_SeleccionCentroCosto.aspx';
                    $("#ifCCO").attr("src", $Pagina);
                    ExisteCentroCosto = true;
                }
            }
        });

        $("#ddlOficinaOrganizativa").live("change", function () {
            Historico.Organizaciones = [];
            Historico.CentrosCostos = [];
            $("#lstOrganizacion").html("");
        });

        $("#btnQuitarOrganizacion").live("click", function () {
            var indice = 0;
            var Item = $("#lstOrganizacion").val();
            if ($("#ddlOficinaOrganizativa").val() == 1) {
                $("#lstOrganizacion option:selected").each(function () {
                    var indice = 0;
                    var Item = $(this).val();
                    for (i in Historico.Organizaciones) {
                        if (Historico.Organizaciones[i].P_inCodOrg == Item) {
                            indice = i;
                            break;
                        }
                    }
                    if (indice > -1) {
                        Historico.Organizaciones.splice(indice, 1);
                        $("#lstOrganizacion option:selected").remove();
                    }
                });
            }
            if ($("#ddlOficinaOrganizativa").val() == 2) {
                $("#lstOrganizacion option:selected").each(function () {
                    var indice = 0;
                    var Item = $(this).val();
                    for (i in Historico.CentrosCostos) {
                        if (Historico.CentrosCostos[i].P_vcCodCenCos == Item) {
                            indice = i;
                            break;
                        }
                    }
                    if (indice > -1) {
                        Historico.CentrosCostos.splice(indice, 1);
                        $("#lstOrganizacion option:selected").remove();
                    }
                });
            }
        });

        $("#chkOperador").change(function () {
            $("input", "#chklstOperador").attr('checked', $(this).is(':checked'));
        });

        $("#chkCuenta").change(function () {
            $("input", "#chklstCuenta").attr('checked', $(this).is(':checked'));
        });

        $("#chkFecha").change(function () {
            if ($('#chkFecha').is(':checked') == true) {
                $("#txtDiaInicial").prop("disabled", true);
                $("#txtDiaFinal").prop("disabled", true);
            } else {
                $("#txtDiaInicial").prop("disabled", false);
                $("#txtDiaFinal").prop("disabled", false);
            }
        });

        $("#ddlOperador").change(function () {
            var inCodOpe = $(this).val();
            $.ajax({
                type: "POST",
                url: "Con_CriteriosReporte.aspx/ListarCuentaPorOperador",
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
                    $("#chkCuenta").prop("checked", false);
                },
                error: function (xhr, err, thrErr) {
                    MostrarErrorAjax(xhr, err, thrErr);
                }
            });
        });

        $("#btnLimpiar").click(function () {
            if ($("#hdfvcTab").val() == "MOV_Dispositivo") {
                window.location.href = 'Con_CriteriosReporte.aspx?vcTipRep=4&vcTab=MOV_Dispositivo';
            }
            else {
                window.location.href = 'Con_CriteriosReporte.aspx?vcTipRep=5&vcTab=MOV_Linea';
            }
        });

        $("#btnEjecutar").click(function () {
            var fechaFormato = $(".txtFecha").datepicker("option", "dateFormat");
            var fechaIni = $("#txtDiaInicial").val();
            var fechaFin = $("#txtDiaFinal").val();

            if (!ValidarFechaFormatoIguales(fechaIni, fechaFin, fechaFormato)) {
                alerta("En el rango por días la fecha inicial debe ser menor igual a la fecha final");
                $("#txtDiaInicial").focus();
                return;
            }
            
            SeteaValores($("#hdfvcTab").val());
        });

        function SeteaValores(TipoReporte) {
            var fechaIni = $("#txtDiaInicial").val();
            var fechaFin = $("#txtDiaFinal").val();
            var fechaFormato = $(".txtFecha").datepicker("option", "dateFormat");
            
            Historico.inCodEst = $('#ddlEstado').val();
            Historico.inLinTip = $('#ddlLineaTipo').val();
            if ($('#chkFecha').is(':checked') == false) {
                Historico.vcPorDiaIni = fechaIni.substring(fechaFormato.indexOf("yy"), fechaFormato.indexOf("yy") + 4) + fechaIni.substring(fechaFormato.indexOf("mm"), fechaFormato.indexOf("mm") + 2) + fechaIni.substring(fechaFormato.indexOf("dd"), fechaFormato.indexOf("dd") + 2);
                Historico.vcPorDiaFin = fechaFin.substring(fechaFormato.indexOf("yy"), fechaFormato.indexOf("yy") + 4) + fechaFin.substring(fechaFormato.indexOf("mm"), fechaFormato.indexOf("mm") + 2) + fechaFin.substring(fechaFormato.indexOf("dd"), fechaFormato.indexOf("dd") + 2);
            } else {
                Historico.vcPorDiaIni = "";
                Historico.vcPorDiaFin = "";
            }
            Historico.inNumHis = $("#hdfNumHis").val();

            Historico.Operadores = [];
            $("input", "#chklstOperador").each(function () {
                if ($(this).attr('checked')) {
                    Operador = new ENT_GEN_Operador();
                    Operador.P_inCodOpe = $(this).val();
                    Historico.Operadores.push(Operador);
                }
            });

            if (TipoReporte == "MOV_Dispositivo") { //DISPOSITIVOS
                Historico.Cuentas = []; //Cuentas
                Historico.OperadorCuenta.P_inCodOpe = "0"; //Operador de Cuentas
                Historico.Modelos = []; //Modelos
                IngresarModelos(Modelos); //Modelos

                $.ajax({
                    type: "POST",
                    url: "Con_CriteriosReporte.aspx/SeteaValores",
                    data: "{'oHistorico': '" + JSON.stringify(Historico).replace(/'/g, "&#39") + "'}",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (result) {
                        //pagina = "../../P_Movil/Administrar/Adm_ReporteDevExpress.aspx?vcTipRep=4&vcTab=MOV_Dispositivo&NumCriterio=" + $("#hdfNumHis").val() + "";
                        //var Id = "#" + $("#hdfvcTab").val() + "_Tab_" + "ReportebtnReporte_15";
                        //Titulo = "Reporte de Dispositivos Históricos";

                        var cvTipRep = "";
                        if ($("#hdfvcTipRep").val() == "7") {
                            vcTipRep = "2";
                        } else {
                            vcTipRep = "1";
                        }
                        //pagina = "../../P_Movil/Administrar/Adm_Reporte.aspx?vcTipRep=4&vcTipRepHist=" + vcTipRep + "&vcTab=MOV_Dispositivo&NumCriterio=" + $("#hdfNumHis").val() + "";
                        pagina = "../../P_Movil/Administrar/Adm_ReporteDevExpress.aspx?vcTipRep=4&vcTipRepHist=" + vcTipRep + "&vcTab=MOV_Dispositivo&NumCriterio=" + $("#hdfNumHis").val() + "";
                        if (vcTipRep == "1") {
                            var Id = "#" + $("#hdfvcTab").val() + "_Tab_" + "ReportebtnReporte_15";
                            Titulo = "Reporte de Dispositivos Históricos";
                        } else {
                            var Id = "#" + $("#hdfvcTab").val() + "_Tab_" + "ReportebtnReporte_16";
                            Titulo = "Reporte de Históricos de Asignaciones";
                        }

                        window.parent.AbrirTabReporte(Id, pagina, Titulo);
                    },
                    error: function (xhr, err, thrErr) {
                        MostrarErrorAjax(xhr, err, thrErr);
                    }
                });
            } else { //LINEAS
                Historico.OperadorCuenta.P_inCodOpe = $("#ddlOperador").val(); //Operador de Cuentas
                $("input", "#chklstCuenta").each(function () { //Cuentas
                    if ($(this).attr('checked')) {
                        Cuenta = new ENT_MOV_Cuenta();
                        Cuenta.P_vcCod = $(this).val();
                        Historico.Cuentas.push(Cuenta);
                    }
                });
                Historico.Modelos = []; //Modelos

                $.ajax({
                    type: "POST",
                    url: "Con_CriteriosReporte.aspx/SeteaValores",
                    data: "{'oHistorico': '" + JSON.stringify(Historico) + "'}",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (result) {
                        //pagina = "../../P_Movil/Administrar/Adm_ReporteDevExpress.aspx?vcTipRep=5&vcTab=MOV_Linea&NumCriterio=" + $("#hdfNumHis").val() + "";
                        //var Id = "#" + $("#hdfvcTab").val() + "_Tab_" + "ReportebtnReporte_14";
                        //Titulo = "Reporte de Líneas Históricas";

                        var cvTipRep = "";
                        if ($("#hdfvcTipRep").val() == "7") {
                            vcTipRep = "2";
                        } else {
                            vcTipRep = "1";
                        }
                        //pagina = "../../P_Movil/Administrar/Adm_Reporte.aspx?vcTipRep=5&vcTipRepHist=" + vcTipRep + "&vcTab=MOV_Linea&NumCriterio=" + $("#hdfNumHis").val() + "";
                        pagina = "../../P_Movil/Administrar/Adm_ReporteDevExpress.aspx?vcTipRep=5&vcTipRepHist=" + vcTipRep + "&vcTab=MOV_Linea&NumCriterio=" + $("#hdfNumHis").val() + "";
                        if (vcTipRep == "1") {
                            var Id = "#" + $("#hdfvcTab").val() + "_Tab_" + "ReportebtnReporte_14";
                            Titulo = "Reporte de Líneas Históricas";
                        } else {
                            var Id = "#" + $("#hdfvcTab").val() + "_Tab_" + "ReportebtnReporte_15";
                            Titulo = "Reporte Históricos de Asignaciones";
                        }

                        window.parent.AbrirTabReporte(Id, pagina, Titulo);
                    },
                    error: function (xhr, err, thrErr) {
                        MostrarErrorAjax(xhr, err, thrErr);
                    }
                });
            }
        }
    });

   function fnMostrarCodigoModelos(valor) {   
      var exists = false;
      var Modelo = new modelos();
      var Filas = $("#tbModelos").getGridParam("data");
        $(Filas).each(function (){
          if (this.IdModeloDispositivo == valor){
            exists = true;
          }
        });
      if (!exists){
        var nomDips = $("#bpBusquedaModelos_txtValorBusqueda").val();
        var dataBP = {IdModeloDispositivo: valor,
                      vcNom: nomDips};
        $("#tbModelos").jqGrid('addRowData', valor, dataBP);
        Modelo.P_inCod = valor;
        Modelo.vcNom = nomDips;
        Modelos.push(Modelo);
      }
    }

    function IngresarModelos(modelos) {
        $(modelos).each(function () {
            var Modelo = this;
            Historico.Modelos.push(Modelo);
        });
    }

    function IngresarEmpleados(empleados) {
        $(empleados).each(function () {
            var Empleado = this;
            Historico.Empleados.push(Empleado);
            $("#lstEmpleado").append($("<option></option>").attr("value", Empleado.P_vcCod).text(Empleado.vcNom));
        });

            var biLinEli = "0";
            var inLinCan = Historico.Lineas.length;
            var i = 0;
            for (i = 0; i < inLinCan; i++) {
                var oLinea = Historico.Lineas[inLinCan - i - 1];
                var biExiste = "0";
                var j = 0;
                for (j = 0; j < Historico.Empleados.length; j++) {
                    var oEmpleado = Historico.Empleados[j];
                    if (oEmpleado.vcNom.substring(oEmpleado.vcNom.indexOf("=") + 1) == oLinea.Empleado.vcNom.substring(oLinea.Empleado.vcNom.indexOf("=") + 1)) {
                        biExiste = "1";
                    }
                }

                if (biExiste == "0") {
                    $("#lstLinea option[value='" + oLinea.P_vcNum.toString() + "']").remove();
                    Historico.Lineas.splice((inLinCan - i - 1), 1);
                    biLinEli = "1";
                }
            }
            if (biLinEli == "1") {
                alerta("Algunas líneas fueron quitadas de la lista porque no coincidian con la lista de empleados seleccionados.");
            }
    }

    function IngresarLineas(lineas) {
        var biValidos = "1";
        $(lineas).each(function () {
            var Linea = this;
            var biExiste = "0";
            var i = 0;
            for (i = 0; i < Historico.Empleados.length; i++) {
                var oEmpleado = Historico.Empleados[i];
                if (oEmpleado.vcNom.substring(oEmpleado.vcNom.indexOf("=") + 1) == Linea.Empleado.vcNom.substring(Linea.Empleado.vcNom.indexOf("=") + 1)) {
                    biExiste = "1";
                }
            }

            if (biExiste == "1" || Historico.Empleados.length == 0) {
                Historico.Lineas.push(Linea);
                $("#lstLinea").append($("<option></option>").attr("value", Linea.P_vcNum).text(Linea.Empleado.vcNom));
            } else {
                biValidos = "0";
            }
        });

        if (biValidos == "0") {
            alerta("Algunas líneas no fueron agregadas porque no pertenecen a los empleados previamente elegidos.");
        }
    }


    function IngresarAreas(areas) {
        $(areas).each(function () {
            var Area = this;
            Area.vcCodInt = Area.P_inCodOrg;
            Area.P_inCodOrg = Area.vcCodOrg;
            Area.vcCodOrg = Area.vcNomOrg.split("=")[0];
            Historico.Organizaciones.push(Area);
            $("#lstOrganizacion").append($("<option></option>").attr("value", Area.P_inCodOrg).text(Area.vcNomOrg));
        });
    }
    function IngresarCentroCosto(centrosCostos) {
        $("#lstOrganizacion").html("");
        Historico.CentrosCostos = [];
        $(centrosCostos).each(function () {
            var CentroCosto = this;
            Historico.CentrosCostos.push(CentroCosto);
            $("#lstOrganizacion").append($("<option></option>").attr("value", CentroCosto.P_vcCodCenCos).text(CentroCosto.vcNomCenCos));
        });
    }
    function IngresarAreaUnico(area) {
        $("#lblAreaSumario").html(area.vcNomOrg);
        area.vcCodInt = area.P_inCodOrg;
        area.P_inCodOrg = area.vcNomOrg.split("=")[0];
        Historico.AreaSumario = area;
    }