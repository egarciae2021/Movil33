        $(function () {
            var indiceTab = window.parent.tab.tabs("option", "selected");
            $(".btnNormal").button({});

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

            $("#txtTipoLlamada").focusout(function () {
                $("#txtTipoLlamada").val($("#txtTipoLlamada").val().replace(/\\/g, ""));
            });

            $("#btnGuardar").click(function () {
                var TipoLlamada = $('#txtTipoLlamada').val().replace(/'/g, "&#39").replace(/\\/g, "");
                var GlobalAsignado = $('#ddlGlobalAsignado').val();
                var btVig = $('#chkEstado').is(':checked');

                if (TipoLlamada == "") {
                    window.top.alerta("Ingrese el tipo de llamada");
                    $('#txtTipoLlamada').focus();
                    return;
                }
                if (GlobalAsignado == "-1") {
                    window.top.alerta("Seleccione un global");
                    $('#ddlGlobalAsignado').focus();
                    return;
                }

                BloquearPagina(true);
                $.ajax({
                    type: "POST",
                    url: "Imp_Mnt_Destino.aspx/Guardar",
                    data: "{'vcTipLla': '" + TipoLlamada.replace(/'/g, "&#39") + "'," +
                           "'vcGlo': '" + GlobalAsignado + "'," +
                           "'btVig': '" + btVig + "'," +
                           "'inDes': '" + $("#hdfDestino").val() + "'}",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (result) {
                        if (result.d == "0") {
                            window.parent.ActualizarGrilla();
                            Mensaje("<br/><img src=\"../../../Common/Images/Mantenimiento/Grabar32.png\" /><br/><h1>Destino guardado</h1><br/>", document, CerroMensaje);
                        }
                        else {
                            window.top.alerta("Ya se ingreso un destino con los mismo datos");
                            BloquearPagina(false);
                        }
                    },
                    error: function (xhr, err, thrErr) {
                        MostrarErrorAjax(xhr, err, thrErr);
                        BloquearPagina(false);
                    }
                });
            });
            function CerroMensaje() {
                BloquearPagina(false);
                if ($("#hdfDestino").val() == "") {//Nuevo
                    LimpiarTodo();
                }
                else {//Edicion
                    window.parent.tab.tabs("remove", indiceTab);
                }
            }
            $("#btnCerrar").click(function () {
                window.parent.tab.tabs("remove", indiceTab);
            });
            function LimpiarTodo() {
                $('#txtTipoLlamada').val("");
                $("select#ddlGlobalAsignado").prop('selectedIndex', 0);
            }
        });
