	    function centroCosto(P_vcCodCenCos, vcNomCenCos) {
	        this.P_vcCodCenCos = P_vcCodCenCos;
	        this.vcNomCenCos = vcNomCenCos;
	    }
	    $(function () {
	        var Vis = false;
	        var CentroCostos = [];

	        $(".btnNormal").button({});

	        ListarCentroCosto();

	        $("#txtBusqueda").keypress(function (e) {
	            if (e.keyCode == 13) {
	                ListarCentroCosto();
	                return false;
	            }
	        });

	        function ListarCentroCosto() {
	            $.ajax({
	                type: "POST",
	                url: "Con_SeleccionCentroCosto.aspx/ListarCentroCosto",
	                data: "{'inCodEst': '" + $("#ddlEstado").val() + "'," +
                           "'vcBus': '" + $("#txtBusqueda").val().replace(/'/g, "&#39").replace(/\\/g, "&#92") + "'}",
	                contentType: "application/json; charset=utf-8",
	                dataType: "json",
	                success: function (result) {
	                    $("#lstResultado").html("");
	                    $(result.d).each(function () {
	                        var color = "";
	                        if (!this.btVig) {
	                            color = "Red";
	                        }
	                        $("#lstResultado").append($("<option></option>").attr("value", this.P_vcCodCenCos).text(this.P_vcCodCenCos + "=" + this.vcNomCenCos).css("color", color));
	                    });
	                },
	                error: function (xhr, err, thrErr) {
	                    MostrarErrorAjax(xhr, err, thrErr);
	                }
	            });
	        }

	        $("#btnAvanzada").click(function () {
	            if (Vis) {
	                $("#dvAvanzada").fadeOut('slow', function () {
	                    window.parent.Modal.dialog("option", "height", 370);
	                    window.parent.ifCentroCosto.css("height", 340);
	                }); //$("#dvAvanzada").hide('blind', {}, 'slow');
	            }
	            else {
	                window.parent.Modal.dialog("option", "height", 500);
	                window.parent.ifCentroCosto.css("height", "430");
	                $("#dvAvanzada").fadeIn('slow'); //$("#dvAvanzada").show('blind', {}, 'slow');
	            }
	            Vis = !Vis;
	        });

	        $("#ddlEstado").change(function () {
	            ListarCentroCosto();
	        });

	        $("#btnBuscar").click(function () {
	            ListarCentroCosto();
	        });

	        $("#btnDerecha").click(function () {
	            if ($("#lstResultado option:selected").length > 0) {
	                AgregaItems("#lstResultado option:selected");
	            }
	            else {
	                alerta("Seleccione un ítem");
	            }
	        });
	        $("#btnIzquierda").click(function () {
	            if ($("#lstSeleccionados option:selected").length > 0) {
	                $("#lstSeleccionados option:selected").remove();
	            }
	            else {
	                alerta("Seleccione un ítem");
	            }
	        });
	        $("#btnDerechaTodo").click(function () {
	            if ($("#lstResultado option").length > 0) {
	                AgregaItems("#lstResultado option");
	            }
	            else {
	                alerta("No hay datos disponibles");
	            }
	        });
	        $("#btnIzquierdaTodo").click(function () {
	            if ($("#lstSeleccionados option").length > 0) {
	                $("#lstSeleccionados").html("");
	            }
	            else {
	                alerta("No hay datos seleccionados");
	            }
	        });

	        function AgregaItems(selector) {
	            var ValorAgregado = false;
	            $(selector).each(function () {
	                var Seleccionado = $(this);
	                var Existe = false;
	                $("#lstSeleccionados option").each(function () {
	                    if (Seleccionado.val() == $(this).val()) {
	                        Existe = true;
	                        ValorAgregado = true;
	                        return false;
	                    }
	                });
	                if (!Existe) {
	                    $("#lstSeleccionados").append($("<option></option>").attr("value", Seleccionado.val()).text(Seleccionado.html()).css("color", Seleccionado.css("color", "black")));
	                }
	            });
	            if (ValorAgregado) {
	                alerta("Algunos ítems seleccionados ya han sido agregados");
	            }
	        }
	        $("#btnAgregar").click(function () {
	            CentroCostos = [];
	            $("#lstSeleccionados option").each(function () {
	                var CentroCosto = new centroCosto();
	                CentroCosto.P_vcCodCenCos = $(this).val();
	                CentroCosto.vcNomCenCos = $(this).html();
	                CentroCostos.push(CentroCosto);
	            });
	            window.parent.IngresarCentroCosto(CentroCostos);
	            window.parent.Modal.dialog("close");
	        });

	        $("#btnCancelar").click(function () {
	            window.parent.Modal.dialog("close");
	        });

	        //window.parent.Modal.bind("dialogbeforeclose", function (event, ui) {
	        //    //$("#dvAvanzada").hide();
	        //    window.parent.Modal.dialog("option", "height", 370);
	        //    window.parent.ifCentroCosto.css("height", 340);
	        //    $("select#ddlEstado").prop('selectedIndex', 1);
	        //    $("#txtBusqueda").val("");
	        //    $("#lstResultado").html("");
	        //    $("#lstSeleccionados").html("");
	        //    ListarCentroCosto();
	        //    Vis = false;
	        //});
	    });