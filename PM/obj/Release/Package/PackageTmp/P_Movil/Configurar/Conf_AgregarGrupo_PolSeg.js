        function isIE() { //Vefiricar Version del Internet Explorer
            var myNav = navigator.userAgent.toLowerCase();
            return (myNav.indexOf('msie') != -1) ? parseInt(myNav.split('msie')[1]) : false;
        }

        function grupo() {
            this.inCodGru;
            this.vcGru;
            this.vcVal;
        }

        $(function () {
            $("#txtValor").focus();
            $(".btnNormal").button();

            if (isIE() == 6) {
                $("#").css('z-index', '2000');
                $("#btnCancelar").css('width', '100px');
                $("#btnGuardar").css('width', '100px');
                $("#btnCancelar").css('display', 'inline-block');
                $("#btnGuardar").css('display', 'inline-block');
            }

            ValidarNumeroEnCajaTexto("txtValor", ValidarEnteroPositivo);

            $("#btnGuardar").click(function () {
                if ($("#ddlGrupo").val() == null || $("#ddlGrupo").val() == "") {
                    return;
                }

                var Politica = $("#hdfPolitica").val();
                var inTip;
                var Valor = $("#txtValor").val();
                if ($("#hdfOpcion").val != 1) {
                    if (!$('#chkIlimitado').is(':checked')) {
                        if (Valor == "") {
                            alerta("Ingrese un valor");
                            $("#txtValor").focus();
                            return;
                        }
                        if (Valor.substring(0, 1) == "0") {
                            alerta("Ingrese un valor válido - No se permite que el valor inicie con cero");
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
                    if ($("#hdfGrupo").val() == "") {
                        $("#hdfGrupo").val($("#ddlGrupo").val());
                        inTip = 1;
                    }
                    else {
                        inTip = 2;
                    }
                }
                $.ajax({
                    type: "POST",
                    url: "Conf_AgregarGrupo_PolSeg.aspx/Guardar",
                    data: "{'P_inCodPol': '" + Politica + "'," +
                           "'P_inCodGru': '" + $("#hdfGrupo").val() + "'," +
                           "'inTip': '" + inTip + "'," +
                           "'vcVal': '" + Valor + "'}",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (msg) {
                        if (inTip == 1) {
                            var Grupo = new grupo();

                            Grupo.inCodGru = $("#ddlGrupo").val();
                            Grupo.vcGru = $("#ddlGrupo option:selected").text();
                            Grupo.vcVal = Valor;

                            window.parent.tblGrupo.jqGrid('addRowData', Grupo.inCodGru, Grupo);
                        }
                        else {
                            window.parent.tblGrupo.jqGrid('setRowData', $("#hdfGrupo").val(), { 'vcVal': Valor });
                        }
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

            Inicio();
            function Inicio() {
                if ($("#ddlGrupo option").size() == 0 && $("#hdfGrupo").val() == "") {
                    parent.alerta("No hay mas grupos para agregar");
                    window.parent.ModalEmpleados.dialog('close');
                }
            }

            $("#chkIlimitado").change(function () {
                if ($('#chkIlimitado').is(':checked')) {
                    $("#trValor").hide();
                    //$('#txtValor').hide();
                    $('#txtValor').val("");
                }
                else {
                    $("#trValor").show();
                    //$('#txtValor').show();
                    $('#txtValor').val("");
                    $('#txtValor').focus();
                }
            });
        });