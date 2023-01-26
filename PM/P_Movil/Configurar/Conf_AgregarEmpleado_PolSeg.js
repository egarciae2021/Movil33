var Criterio;
var strEmp;
        function empleado() {
            this.P_vcCod;
            this.vcNom;
            this.vcVal;
        }

        function IngresarEmpleados(empleados) {//Carga los empleados seleccionados del formulario respectivo
            $("#lstEmpleado").html("");
            Criterio.Empleados = [];
            $(empleados).each(function () {
                var Empleado = this;
                Criterio.Empleados.push(Empleado);
                $("#lstEmpleado").append($("<option></option>").attr("value", Empleado.P_vcCod).text(Empleado.vcNom));
            });
        }

        function isIE() { //Vefiricar Version del Internet Explorer
            var myNav = navigator.userAgent.toLowerCase();
            return (myNav.indexOf('msie') != -1) ? parseInt(myNav.split('msie')[1]) : false;
        }

        $(function () {
            $("#txtValor").focus();

            if (window.parent.CodigosNombres != undefined) {
                if (window.parent.CodigosNombres.length > 0) {
                    $("#hdfNomEmp").val(window.parent.CodigosNombres.substr(0, window.parent.CodigosNombres.length - 1));
                }
            }

            if (window.parent.Codigos != undefined) {
                if (window.parent.Codigos.length > 0) {
                    $("#hdfEmpleado").val(window.parent.Codigos.substr(0, window.parent.Codigos.length - 1));
                }
            }

            if ($("#hdfEmpleado").val() != "") {
                var arrCodEmp = $("#hdfEmpleado").val().split(",");
                var arrNomEmp = $("#hdfNomEmp").val().split(",");

                for (i = 0; i < arrCodEmp.length; i++) {
                    var btExiste = 0;
                    for (j = 0; j < $("#lstEmpleado")[0].options.length; j++) {
                        if ($("#lstEmpleado")[0][j].value == arrCodEmp[i]) {
                            btExiste = 1;
                        }
                    }
                    if (btExiste == 0) {
                        $("#lstEmpleado").append($("<option></option>").attr("value", arrCodEmp[i]).text(arrNomEmp[i]));
                    }
                }
            } else {
                $("#lstEmpleado").empty();
            }

            $(".btnNormal").button();

            Inicio();

            if (isIE() == 6) {
                $("#btnCancelar").css('width', '100px');
                $("#btnGuardar").css('width', '100px');
                $("#btnCancelar").css('display', 'inline-block');
                $("#btnGuardar").css('display', 'inline-block');
            }

            ValidarNumeroEnCajaTexto("txtValor", ValidarEnteroPositivo);

            $("#btnEmpleado").click(function () {
                window.parent.AbreEmpleado();
            });

            $("#btnGuardar").click(function () {
                var Politica = $("#hdfPolitica").val();
                var vcCodEmp;
                var vcNomEmp;
                var inTip;

                if ($("#hdfEmpleado").val() == "") {
                    if ($("#hdfTipEmp").val() == "1") {
                        parent.alerta("No hay mas empleados para agregar");
                        window.parent.Modal.dialog('close');
                    }
                    else if ($("#hdfTipEmp").val() == "2") {
                        vcCodEmp = $("#ddlEmpleado").val();
                        vcNomEmp = $("#ddlEmpleado option:selected").text();
                        if (vcCodEmp == "-1") {
                            alerta("Seleccione un empleado");
                            $("#ddlEmpleado").focus();
                            return;
                        }
                    }
                    else if ($("#hdfTipEmp").val() == "3") {
                        vcCodEmp = $("#hdfCodEmpleado").val();
                        vcNomEmp = $("#txtEmpleado").val();
                        if (vcCodEmp == "") {
                            alerta("Ingrese un empleado o vuelva a ingresarlo");
                            $("#txtEmpleado").focus();
                            return;
                        }
                    }
                    inTip = 1;
                }
                else {
                    vcCodEmp = $("#hdfEmpleado").val();
                    vcNomEmp = $("#lblEmpleado").html();
                    inTip = 2;
                }

                var Valor = $("#txtValor").val();

                if (!$('#chkIlimitado').is(':checked')) {
                    if (Valor == "") {
                        alerta("Ingrese un valor");
                        $("#txtValor").focus();
                        return;
                    }
                    if (Valor.substring(0, 1) == "0") {
                        alerta("Ingrese un valor válido - No se permite que el valor inicie con cero.");
                        $("#txtValor").focus();
                        return;
                    }

                    if (parseInt(Valor) <= 0) {
                        alerta("Ingrese un valor mayor a cero");
                        $("#txtValor").focus();
                        return;
                    }
                }
                else {
                    Valor = "0";
                }

                var arrCodEmp = vcCodEmp.split(",");
                var XMLEmpleado = "<?xml version=\"1.0\" encoding=\"ISO-8859-1\"?><ROOT>";

                for (i = 0; i < arrCodEmp.length; i++) {
                    XMLEmpleado = XMLEmpleado + "<POLITICA P_F_inCodPolMov=\"" + Politica + "\" P_F_vcCodEmp=\"" + arrCodEmp[i] + "\" vcVal=\"" + Valor + "\" />";
                }
                XMLEmpleado = XMLEmpleado + "</ROOT>";

                $.ajax({
                    type: "POST",
                    url: "Conf_AgregarEmpleado_PolSeg.aspx/Guardar",
                    data: "{'inCodPol': '" + Politica + "'," +
                           "'vcCodEmp': '" + vcCodEmp + "'," +
                           "'inTip': '" + inTip + "'," +
                           "'vcVal': '" + Valor + "'," +
                           "'XMLEmp': '" + XMLEmpleado + "'}",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (msg) {
                        //                        if (inTip == 1) {
                        //                            var Empleado = new empleado();

                        //                            Empleado.P_vcCod = vcCodEmp;
                        //                            Empleado.vcNom = vcNomEmp;
                        //                            Empleado.vcVal = Valor;
                        //                            window.parent.tblEmpleado.jqGrid('addRowData', Empleado.P_vcCod, Empleado);
                        //                        }
                        //                        else {

                        //                        var arrCodEmp = vcCodEmp.split(",");
                        //                        for (i = 0; i < arrCodEmp.length; i++) {
                        //                            window.parent.tblEmpleado.jqGrid('setRowData', arrCodEmp[i], { 'vcVal': Valor });
                        //                        }
                        window.parent.ActualizarGrillaExcepciones(); //agregado 26-08-2013
                        window.parent.ModalEmpleados.dialog('close');
                    },
                    error: function (xhr, err, thrErr) {
                        MostrarErrorAjax(xhr, err, thrErr);
                    }
                });
            });

            $("#btnCancelar").click(function () {
                window.parent.ModalEmpleados.dialog('close');
            });

            function Inicio() {
                Criterio = new ENT_MOV_IMP_Criterio();
                if ($("#hdfEmpleado").val() == "" && $("#hdfTipEmp").val() == "1") {
                    parent.alerta("No hay mas empleados para agregar");
                    window.parent.Modal.dialog('close');
                }
            }

            $("#txtEmpleado").focusout(function () {
                $.ajax({
                    type: "POST",
                    url: "Conf_AgregarEmpleado_PolSeg.aspx/ListarEmpleado",
                    data: "{'maxFilas': '" + 100 + "'," +
                           "'vcNomEmp': '" + $("#txtEmpleado").val() + "'," +
                           "'incodGrup': '" + $("#hdfGrupo").val() + "'," +
                           "'incodPol': '" + $("#hdfPolitica").val() + "'}",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (result) {
                        if ($(result.d).length == 1) {
                            $("#hdfCodEmpleado").val(result.d[0].P_vcCod);
                            Selecciono = true;
                        }
                        else {
                            $("#hdfCodEmpleado").val("");
                            Selecciono = false;
                        }
                    },
                    error: function (xhr, err, thrErr) {
                        MostrarErrorAjax(xhr, err, thrErr);
                    }
                });
            });

            $("#chkIlimitado").change(function () {
                if ($('#chkIlimitado').is(':checked')) {
                    $('#trValor').hide();
                    $('#txtValor').hide();
                    $('#txtValor').val("");
                }
                else {
                    $('#trValor').show();
                    $('#txtValor').show();
                    $('#txtValor').val("");
                    $('#txtValor').focus();
                }
            });
        });