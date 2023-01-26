var asInitVals = [];
        var Modal;

        $(function () {
            $(".btnNormal").button();

            Organizacion = new tree_component();
            Organizacion.init($("#demo"));

            function ValidarVacio($control, Valor) {
                if (control.val() == Valor) {
                    return false;
                }
                else {
                    return true;
                }
            }

            var index = 0;
            EstableceColumnFiltro();
            function EstableceColumnFiltro() {
                //    var indexFiltro = $("#ddlBusqueda").val(); //Arreglar esto
                //                for (var i in oTable.fnSettings().aoColumns) {
                //                    if (oTable.fnSettings().aoColumns[i].sTitle == indexFiltro)
                //                        index = i;
                //                }
            }
            $("#txtBusqueda").keyup(function () {
                //oTable.fnFilter(this.value, index);
            });
            $("#txtBusqueda").each(function (i) {
                asInitVals[i] = this.value;
            });
            $("#txtBusqueda").focus(function () {
                if (this.className == "txtBusqueda") {
                    this.className = "";
                    this.value = "";
                }
            });
            $("#txtBusqueda").blur(function (i) {
                if (this.value == "") {
                    this.className = "txtBusqueda";
                    this.value = asInitVals[$("#txtBusqueda").index(this)];
                }
            });

            $("#ddlOperador").change(function () {
                var inCod = $("#ddlOperador").val();
                $("#dvCargando16").show();

                var strOperador = $("#hdfOperadores").val();
                var lstOperador = strOperador.split(",");
                $("#lblPeriodo").html("--/--- - --/---");

                $("#divPlanes").hide();
                $("#divLibre").hide();

                $.ajax({
                    type: "POST",
                    url: "Adm_AsignacionCredito.aspx/CambiarOperador",
                    data: "{'inCodOpe': '" + inCod + "'}",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (result) {
                        $("#ddlCuenta").html("");
                        var lstCuenta = "";
                        $.each(result.d, function () {
                            $("#ddlCuenta").append($("<option></option>").attr("value", this.P_vcCod).text(this.vcNom));
                            if (this.P_vcCod != "-1") {
                                lstCuenta = lstCuenta + this.P_vcCod + "*" + this.vcPerFac + ",";
                            }
                        });
                        lstCuenta = lstCuenta.substring(0, lstCuenta.length - 1);
                        $("#hdfCuentas").val(lstCuenta);
                    },
                    error: function (xhr, err, thrErr) {
                        MostrarErrorAjax(xhr, err, thrErr);
                    }
                });
                $.ajax({
                    type: "POST",
                    url: "Adm_AsignacionCredito.aspx/ListaServiciosPorOperador",
                    data: "{'inCodOpe': '" + inCod + "'}",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (result) {
                        $("#ddlServicio").html("");

                        var aTrs = oTable5.fnGetNodes();
                        var i = 0;
                        for (i = 0; i < aTrs.length; i++) {
                            aTrs[i].style.display = 'none';
                        }

                        $.each(result.d, function () {
                            var P_inCod = this.P_inCod;
                            $("#ddlServicio").append($("<option></option>").attr("value", this.P_inCod).text(this.vcNom));
                            if (P_inCod != "-1") {
                                $(oTable5.fnSettings().aoData).each(
                                        function () {
                                            if (this._aData[0] == P_inCod) {
                                                this.nTr.style.display = '';
                                            }
                                        }
                                    );
                            }
                            //oTable5.dataTable().fnAddData([this.P_inCod, this.vcNom, this.dcMonMax, this.dcAct, this.dcAcu]);
                        });
                    },
                    error: function (xhr, err, thrErr) {
                        MostrarErrorAjax(xhr, err, thrErr);
                    }
                });

                $(oTable.fnSettings().aoData).each(function () {
                    $(this.nTr).removeClass('Grilla-SelectedRowStyle');
                });

                $(oTable2.fnSettings().aoData).each(function () {
                    $(this.nTr).removeClass('Grilla-SelectedRowStyle');
                });
                oTable2.fnFilter("-1", 1);
                oTable3.fnFilter("-1", 1);

                $.each(lstOperador, function () {
                    var oOperador = this.split("*");

                    if (oOperador[0] == inCod) {
                        $("#hdfTipoPerFac").val(oOperador[1]);
                        if (oOperador[3] == 1) {
                            $("#divPlanes").show();
                            oTable.fnFilter(inCod, 1);
                        }
                        else if (oOperador[3] == 2) {
                            $("#divLibre").show();
                            $("#rbtnLst").change();
                            oTable3.fnFilter(inCod, 1);
                        }
                        if (oOperador[1] == 1) {
                            $("#lblPeriodo").html(oOperador[2]);
                        }
                    }
                });
                $("#dvCargando16").hide();
            }
            );

            $("#ddlCuenta").change(function () {
                var vcCodCue = $("#ddlCuenta").val();
                if ($("#hdfTipoPerFac").val() == 2) {
                    var strCuentas = $("#hdfCuentas").val();
                    var lstCuentas = strCuentas.split(",");

                    $("#lblPeriodo").html("--/--- - --/---");

                    $.each(lstCuentas, function () {
                        var oCuenta = this.split("*");

                        if (oCuenta[0] == vcCodCue) {
                            $("#lblPeriodo").html(oCuenta[1]);
                        }
                    });
                }
                if (vcCodCue != "-1") {
                    $.ajax({
                        type: "POST",
                        url: "Adm_AsignacionCredito.aspx/ListaServiciosPorCuenta",
                        data: "{'vcCodCue': '" + vcCodCue + "'}",
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: function (result) {
                            $("#ddlServicio").html("");
                            $.each(result.d, function () {
                                $("#ddlServicio").append($("<option></option>").attr("value", this.P_inCod).text(this.vcNom));
                            });
                        },
                        error: function (xhr, err, thrErr) {
                            MostrarErrorAjax(xhr, err, thrErr);
                        }
                    });
                }
                else {
                    var inCodOpe = $("#ddlOperador").val();
                    $.ajax({
                        type: "POST",
                        url: "Adm_AsignacionCredito.aspx/ListaServiciosPorOperador",
                        data: "{'inCodOpe': '" + inCodOpe + "'}",
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: function (result) {
                            $("#ddlServicio").html("");
                            $.each(result.d, function () {
                                $("#ddlServicio").append($("<option></option>").attr("value", this.P_inCod).text(this.vcNom));
                            });
                        },
                        error: function (xhr, err, thrErr) {
                            MostrarErrorAjax(xhr, err, thrErr);
                        }
                    });
                }
            });

            $("#ddlServicio").change(function () {
                var inCodOpe = $("#ddlOperador").val();
                var vcCodCue = $("#ddlCuenta").val();
                var inCodSer = $("#ddlServicio").val();
                if (inCodSer != '-1') {
                    $.ajax({
                        type: "POST",
                        url: "Adm_AsignacionCredito.aspx/MostrarMaximoDisponibleServicio",
                        data: "{'inCodOpe': '" + inCodOpe + "'," +
                            "'vcCodCue': '" + vcCodCue + "'," +
                            "'inCodSer': '" + inCodSer + "'}",
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: function (result) {
                            $("#lblMaximo").html(result.d.dcMonMax);
                            $("#lblDisponible").html(result.d.dcMonMax);
                        },
                        error: function (xhr, err, thrErr) {
                            MostrarErrorAjax(xhr, err, thrErr);
                        }
                    });
                }
                else {
                    $("#lblMaximo").html("0.00");
                    $("#lblDisponible").html("0.00");
                }
            });

            var oTable = ConfigurarGrilla("#gvPlan", "No se encontraron planes para este operador", false, 0,
                                          [{ 'bSortable': false, 'bSearchable': false, 'bVisible': false, 'aTargets': [0] },
                                           { 'bSortable': false, 'bSearchable': true, 'bVisible': false, 'aTargets': [1] },
                                           { 'bSortable': false, 'bSearchable': false, 'bVisible': true, 'aTargets': [2] },
                                           { 'bSortable': false, 'bSearchable': false, 'bVisible': true, 'aTargets': [3]}]);

            var oTable2 = ConfigurarGrilla("#gvLineaPlan", "No se encontraron lineas para este plan", false, 0,
                                           [{ 'bSortable': false, 'bSearchable': false, 'bVisible': true, 'aTargets': [0] },
                                            { 'bSortable': false, 'bSearchable': true, 'bVisible': false, 'aTargets': [1] },
                                            { 'bSortable': false, 'bSearchable': false, 'bVisible': true, 'aTargets': [2]}]);

            var oTable3 = ConfigurarGrilla("#gvLinea", "No se encontraron lineas", false, 0,
                                           [{ 'bSortable': false, 'bSearchable': false, 'bVisible': true, 'aTargets': [0] },
                                            { 'bSortable': false, 'bSearchable': true, 'bVisible': false, 'aTargets': [1] },
                                            { 'bSortable': false, 'bSearchable': false, 'bVisible': true, 'aTargets': [2] },
                                            { 'bSortable': false, 'bSearchable': true, 'bVisible': false, 'aTargets': [3] },
                                            { 'bSortable': false, 'bSearchable': true, 'bVisible': false, 'aTargets': [4]}]);

            var oTable4 = ConfigurarGrilla("#gvGrupo", "No se encontraron grupos", false, 0,
                                           [{ 'bSortable': false, 'bSearchable': true, 'bVisible': false, 'aTargets': [0] },
                                            { 'bSortable': false, 'bSearchable': false, 'bVisible': true, 'aTargets': [1] },
                                            { 'bSortable': false, 'bSearchable': false, 'bVisible': true, 'aTargets': [2]}]);

            var oTable5 = ConfigurarGrilla("#gvServicio", "No se encontraron servicios", false, 200,
                                           [{ 'bSortable': false, 'bSearchable': true, 'bVisible': false, 'aTargets': [0] },
                                            { 'bSortable': false, 'bSearchable': false, 'bVisible': true, 'aTargets': [1] },
                                            { 'bSortable': false, 'bSearchable': false, 'bVisible': true, "sWidth": "60px", 'aTargets': [2] },
                                            { 'bSortable': false, 'bSearchable': false, 'bVisible': true, "sWidth": "60px", 'aTargets': [3] },
                                            { 'bSortable': false, 'bSearchable': false, 'bVisible': true, "sWidth": "60px", 'aTargets': [4]}]);

            function seleccionarFilaGrilla(tb, evt) {
                $(tb.fnSettings().aoData).each(function () {
                    $(this.nTr).removeClass('Grilla-SelectedRowStyle');
                });
                $(evt.target.parentNode).addClass('Grilla-SelectedRowStyle');
            }

            $("#gvPlan tbody").click(function (event) {
                seleccionarFilaGrilla(oTable, event);

                var indexAux = oTable.fnSettings().aiDisplay[event.target.parentNode.rowIndex - 1];
                var idPlan = oTable.fnSettings().aoData[indexAux]._aData[0];
                oTable2.fnFilter(idPlan, 1);
            });
            $("#gvLineaPlan tbody").click(function (event) {
                seleccionarFilaGrilla(oTable2, event);
            });
            $("#gvLinea tbody").click(function (event) {
                seleccionarFilaGrilla(oTable3, event);
            });
            $("#gvGrupo  tbody").click(function (event) {
                seleccionarFilaGrilla(oTable4, event);
            });
            //            $("#gvServicio tbody").click(
            //                function (event) {
            //                    seleccionarFilaGrilla(oTable5, event);
            //                }
            //            );

            Inicio();
            function Inicio() {
                oTable.fnFilter('-1', 1);
                oTable2.fnFilter('-1', 1);
            }

            $("#rbtnLst").change(function () {
                $("input", this).each(function () {
                    if (this.checked == true) {
                        $("#divLinea").hide();
                        $("#divArea").hide();
                        $("#divServicio").hide();
                        if (this.value == 1) {
                            $("#divLinea").show();
                        }
                        else if (this.value == 2) {
                            $("#divArea").show();
                        }
                        $("#divServicio").show();
                    }
                });
            });

            $("#btnAgregarPlan").click(function () {
                var $Pagina = "Mantenimiento/Mnt_Plan.aspx";
                var $width = 420;
                var $height = 450;

                Modal = $('<iframe id="if2" src="' + $Pagina + '" width="' + $width + '" height="' + $height + '" />').dialog({
                    title: "Nuevo Plan",
                    width: $width,
                    height: $height,
                    modal: true
                });
            });

            $("#btnModificarPlan").click(function () {
                var anSelected = fnGetSelected(oTable);
                if (anSelected.length > 0) {
                    var $width = 420;
                    var $height = 450;
                    var index = oTable.fnSettings().aiDisplay[anSelected[0].sectionRowIndex];
                    var inCodPla = oTable.fnSettings().aoData[index]._aData[0];
                    var $Pagina = "Mantenimiento/Mnt_Plan.aspx" + '?inCodPla=' + inCodPla;

                    Modal = $('<iframe id="if2" src="' + $Pagina + '" width="' + $width + '" height="' + $height + '" />').dialog({
                        title: "Editar Plan",
                        width: $width,
                        height: $height,
                        modal: true
                    });
                }
                else {
                    alerta("seleccione un plan");
                }
            });

            $("#btnEliminarPlan").click(function () {
                var anSelected = fnGetSelected(oTable);
                if (anSelected.length > 0) {
                    var index = oTable.fnSettings().aiDisplay[anSelected[0].sectionRowIndex];
                    var inCodPla = oTable.fnSettings().aoData[index]._aData[0];
                    var $width = 320;
                    var $height = 150;

                    $('#divMsgConfirmacion').dialog({
                        title: "Eliminar Plan",
                        width: $width,
                        height: $height,
                        modal: true,
                        buttons: {
                            "Si": function () {
                                $("#dvCargando").show();
                                $.ajax({
                                    type: "POST",
                                    url: "Mantenimiento/Mnt_Plan.aspx/Eliminar",
                                    data: "{'inCodPla': '" + inCodPla + "'}",
                                    contentType: "application/json; charset=utf-8",
                                    dataType: "json",
                                    success: function (msg) {
                                        if (msg.d == "") {
                                            oTable.fnDeleteRow(anSelected[0]);
                                        }
                                        $("#dvCargando").hide();
                                        if (msg.d != "") {
                                            alert(msg.d);
                                        }
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
                }
                else {
                    alerta("seleccione un plan");
                }
            });

            $("#btnAgregarlinea").click(function () {
                var anSelected = fnGetSelected(oTable);
                if (anSelected.length > 0) {
                    var inCodOpe = $("#ddlOperador").val();
                    var index = oTable.fnSettings().aiDisplay[anSelected[0].sectionRowIndex];
                    var inCodPla = oTable.fnSettings().aoData[index]._aData[0];
                    var $width = 320;
                    var $height = 150;

                    $("#dvCargando").show();

                    $.ajax({
                        type: "POST",
                        url: "Mantenimiento/Mnt_Linea.aspx/ListarLineaSinPlanxOperador",
                        data: "{'inCodOpe': '" + inCodOpe + "'}",
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: function (result) {
                            $("#ddlLineaSinPlan").html("");
                            var Vacio = true;
                            $.each(result.d, function () {
                                $("#ddlLineaSinPlan").append($("<option></option>").attr("value", this.P_dcNum).text(this.P_dcNum));
                                Vacio = false;
                            });
                            $("#dvCargando").hide();
                            if (!Vacio) {
                                $('#divLineasSinPlan').dialog({
                                    title: "Agregar linea",
                                    width: $width,
                                    height: $height,
                                    modal: true,
                                    buttons: {
                                        "Agregar": function () {
                                            $.ajax({
                                                type: "POST",
                                                url: "Mantenimiento/Mnt_Linea.aspx/AgregarPlanLinea",
                                                data: "{'dcNum': '" + $("#ddlLineaSinPlan").val() + "'," +
                                                        "'inCodPla': '" + inCodPla + "'}",
                                                contentType: "application/json; charset=utf-8",
                                                dataType: "json",
                                                success: function (result) {
                                                    oTable2.dataTable().fnAddData([result.d.P_dcNum, result.d.inCodPla, result.d.dcMon]);
                                                    $("#dvCargando").hide();
                                                    oTable2.fnFilter(inCodPla, 1);
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
                            }
                            else {
                                alerta("No hay lineas disponibles");
                            }
                        },
                        error: function (xhr, err, thrErr) {
                            MostrarErrorAjax(xhr, err, thrErr);
                        }
                    });
                }
                else {
                    alerta("seleccione un plan");
                }
            });

            $("#btnModificarlinea").click(function () {

            });

            $("#btnEliminarlinea").click(function () {
                var anSelected = fnGetSelected(oTable2);
                if (anSelected.length > 0) {
                    var index = oTable2.fnSettings().aiDisplay[anSelected[0].sectionRowIndex];
                    var dcNum = oTable2.fnSettings().aoData[index]._aData[0];
                    var $width = 320;
                    var $height = 150;

                    $('#divMsgConfirmacion2').dialog({
                        title: "Quitar linea del plan",
                        width: $width,
                        height: $height,
                        modal: true,
                        buttons: {
                            "Si": function () {
                                $("#dvCargando").show();
                                $.ajax({
                                    type: "POST",
                                    url: "Mantenimiento/Mnt_Linea.aspx/EliminarPlanDeLinea",
                                    data: "{'dcNum': '" + dcNum + "'}",
                                    contentType: "application/json; charset=utf-8",
                                    dataType: "json",
                                    success: function (msg) {
                                        if (msg.d == "") {
                                            oTable2.fnDeleteRow(anSelected[0]);
                                            $("#dvCargando").hide();
                                            alerta("Linea borrada");
                                        }
                                        else {
                                            $("#dvCargando").hide();
                                            alert(msg.d);
                                        }
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
                }
                else {
                    alerta("seleccione una linea");
                }
            });
        });