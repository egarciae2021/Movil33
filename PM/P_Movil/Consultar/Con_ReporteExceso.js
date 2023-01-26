        var SimDec = ".";
        var SimMil = ",";
        var NumDec = "2";

        var inFilas;

        $(function () {
            var idCol;
            $(".btnNormal").button({});

            oCulturaUsuario = window.parent.parent.parent.parent.oCulturaUsuario;
            SimMil = oCulturaUsuario.vcSimSepMil;
            NumDec = oCulturaUsuario.dcNumDec;
            SimDec = oCulturaUsuario.vcSimDec;

            $(".MESANHO").removeClass("ui-widget-content ui-corner-all");
            $(".MESANHO").css("padding", "0px");
            $(".MESANHO").css("margin", "0px");
            $(".MESANHO").kendoDatePicker({
                culture: "es-ES",
                animation: false,
                start: "year",
                depth: "year",
                format: "MM/yyyy"
            });

            var tab = $("#TabOpciones").tabs({
                show: function (event, ui) {
                    if ($("#TabOpciones").tabs("option", "selected") == "0") {
                        $("#tdExportar").hide();
                    }
                }
            });
            $("#TabOpciones").hide();

            var tabPlan = $("#TabOpcionesPlan").tabs({
                show: function (event, ui) {
                    if ($("#TabOpcionesPlan").tabs("option", "selected") == "0") {
                        $("#tdExportar").hide();
                    }
                }
            });
            $("#TabOpcionesPlan").hide();
            inicio();

            $("#ddlOperador").change(function () {
                if (this.value == -1 || $("#ddlAsignacionCredito").val() == -1) {
                    $("#tdLblPlan_Bolsa").hide();
                    $("#tdPlan_Bolsa").hide();
                }
                else {
                    ListarCuentasPorOperador();
                }
            });

            $("#ddlAsignacionCredito").change(function () {
                if (this.value == -1 || $("#ddlOperador").val() == -1) {
                    $("#tdLblPlan_Bolsa").hide();
                    $("#tdPlan_Bolsa").hide();
                }
                else {
                    if (this.value == 1) {
                        $("#tdLblPlan_Bolsa").hide();
                        $("#tdPlan_Bolsa").hide();
                    }
                    if (this.value == 2) {
                        $("#LblPlanesBolsa").text("Cuentas");
                        ListarCuentasPorOperador();
                    }

                }
            });

            $("#btnImprimir").live("click", function () {
                var vcPeriodo = '';
                var vcCodOpe = '';
                var vcAsigCred = '';
                var vcCodigoCuenta_Plan = '';
                vcPeriodo = $("#txtPeriodo").val().replace(/^(\s|\&nbsp;)*|(\s|\&nbsp;)*$/g, "");
                if ($.trim(vcPeriodo) == "") {
                    alerta("Ingrese el periodo del archivo a importar");
                    $("#txtPeriodo").focus();
                    return;
                }
                if (vcPeriodo.length < 7 || vcPeriodo.split("/").length != 2) {
                    alerta("El periodo no tiene el formato correcto MM/yyyy .");
                    $("#txtPeriodo").focus();
                    return;
                }
                mPer = vcPeriodo.substr(0, 2);
                yPer = vcPeriodo.substr(3, 4);
                if (!checkperiodo(mPer, yPer)) {
                    alerta("El periodo es inválido.");
                    $("#txtPeriodo").focus();
                    return;
                }
                if ($("#ddlOperador").val() == "-1") {
                    alerta("Seleccione un operador");
                    $("#ddlOperador").focus();
                    return;
                }
                if ($("#ddlAsignacionCredito").val() == "-1") {
                    alerta("Seleccione una Asignación de Crédito");
                    $("#ddlAsignacionCredito").focus();
                    return;
                }
                if ($("#ddlAsignacionCredito").val() == 2) {
                    if ($("#ddlPlanesBolsa").val() == "-1") {
                        alerta("Seleccione una cuenta");
                        $("#ddlPlanesBolsa").focus();
                        return;
                    }
                }

                $("#hdfPeriodo").val(mPer.toString() + yPer.substr(2, 2).toString());
                $("#hdfCodigoOperador").val($("#ddlOperador").val());
                $("#hdfAsignacionCredito").val($("#ddlAsignacionCredito").val());
                $("#hdfCodigoCuenta_Plan").val(($("#ddlAsignacionCredito").val() == 1 ? '' : $("#ddlPlanesBolsa").val()));
                $("#hdfTipoServicio").val('16');
                $("#dvCargando").show();
                if ($("#ddlAsignacionCredito").val() == 2) {
                    $("#ifLista").attr("src", "Con_ReporteExcesoLista.aspx?vcPeriodo=" + $("#hdfPeriodo").val() + "&vcCodOpe=" + $("#hdfCodigoOperador").val() + "&vcAsigCred=" + $("#hdfAsignacionCredito").val() + "&vcCodigoCuenta_Plan=" + $("#hdfCodigoCuenta_Plan").val() + "&vcTipoServicio=" + $("#hdfTipoServicio").val());

                } else {
                    $("#ifListaPlan").attr("src", "Con_ReporteExcesoLista.aspx?vcPeriodo=" + $("#hdfPeriodo").val() + "&vcCodOpe=" + $("#hdfCodigoOperador").val() + "&vcAsigCred=" + $("#hdfAsignacionCredito").val() + "&vcCodigoCuenta_Plan=" + $("#hdfCodigoCuenta_Plan").val() + "&vcTipoServicio=" + $("#hdfTipoServicio").val());
                }
            });


            $(window).resize(function () {
                $("#tbConsulta").setGridWidth($(window).width() - 20);
                $("#tbConsulta").setGridHeight($(window).height() - 180);
            });

            function inicio() {

            }

            fnDimencionar();

            $(window).resize(function () {
                fnDimencionar2();
            });
        });

    function ListarCuentasPorOperador() {        
        if ($("#ddlOperador").val() != -1) {
            $.ajax({
                type: "POST",
                url: "Con_ReporteExceso.aspx/ListarCuentaPorOperador",
                data: "{'inCodOpe': '" + $("#ddlOperador").val() + "', 'inTipoAsignacion': '" + $("#ddlAsignacionCredito").val() + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {
                        $("#ddlPlanesBolsa").html("");
                        if ($(result.d).length > 0) {
                            $("#ddlPlanesBolsa").append($("<option></option>").attr("value", -1).text("<Seleccionar>"));
                            $(result.d).each(function () {
                                $("#ddlPlanesBolsa").append($("<option></option>").attr("value", this.P_vcCod.replace(/&#39/g, "'").replace(/&#92/g, "\\").replace(/&#34/g, '"')).text(this.vcNom.replace(/&#39/g, "'").replace(/&#92/g, "\\").replace(/&#34/g, '"')));
                            });
                        } else {
                            $("#ddlPlanesBolsa").append($("<option></option>").attr("value", -1).text("<Seleccionar>"));
                        }
                        $("#ddlPlanesBolsa > option[value='-1']").attr("selected", true);
                    $("#tdLblPlan_Bolsa").show();
                    $("#tdPlan_Bolsa").show();
                },
                error: function (xhr, err, thrErr) {
                    MostrarErrorAjax(xhr, err, thrErr);
                }
            });
        }
    }
    function checkdate(m, d, y, h, mi) {
        return m > 0 && m < 13 && y > 0 && y < 32768 && d > 0 && h >= 0 && h < 24 && mi >= 0 && mi < 60 && d <= (new Date(y, m, 0))
    .getDate();
    }
    function checkperiodo(m, y) {
        if (m > 0 && m < 13 && y > 0 && y < 32768) {
            var d = new Date();
            return d.getDate();
        }
    }
    function fnDimencionar() {
        var Ancho = $(window).width();
        var Alto = $(window).height();
        var altoFiltro = $("#pnalFiltros").height();

        $("#TabOpciones").css("height", (Alto - 90) + "px");
        $("#TabOpcionesPlan").css("height", (Alto - 90) + "px");

        $("#ifLista").width(Ancho - 42);
        $("#ifLista").height(Alto - altoFiltro - 90);

        $("#ifListaPlan").width(Ancho - 42);
        $("#ifListaPlan").height(Alto - altoFiltro - 90);



    }
    function fnDimencionar2() {
        var Ancho = $(window).width();
        var Alto = $(window).height();
        var altoFiltro = $("#pnalFiltros").height();



        $("#TabOpciones").css("height", (Alto - 90) + "px");
        $("#TabOpcionesPlan").css("height", (Alto - 90) + "px");

        $("#ifLista").width(Ancho - 42);
        $("#ifLista").height(Alto - altoFiltro - 90);

        $("#ifListaPlan").width(Ancho - 42);
        $("#ifListaPlan").height(Alto - altoFiltro - 90);
    }


    function MostrarAlerta_SinData_ReporteExceso_X_Cuenta() {
        if ($("#ddlAsignacionCredito").val() == 2) {
            $("#TabOpciones").hide();
            $("#tdExportar").hide();
            alerta("No hay datos para mostrar.");
        } else {
            $("#TabOpcionesPlan").hide();
            $("#tdExportar").hide();
            alerta("No hay datos para mostrar.");
        }        
    }

    function MostrarAlerta_ConData_ReporteExceso_X_Cuenta() {
        if ($("#ddlAsignacionCredito").val() == 2) {
            $("#TabOpciones").show();
            $("#TabOpcionesPlan").hide();
        } else {
            $("#TabOpcionesPlan").show();
            $("#TabOpciones").hide(); 
        }
        $("#tdExportar").show();
    }