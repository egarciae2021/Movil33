function SubConceptoResumen(P_inCod, F_inCodConceptoResumen, vcCodSubCon, vcNomSubCon, btVig) {
    this.P_inCod = P_inCod;
    this.F_inCodConceptoResumen = F_inCodConceptoResumen;
    this.vcCodSubCon = vcCodSubCon;
    this.vcNomSubCon = vcNomSubCon;
    this.btVig = btVig;
}

var indiceTab;
$(function() {

    indiceTab = window.parent.tab.tabs("option", "selected");

    if ($("#txtConceptoResumen").length > 0) {
        $("#txtConceptoResumen").autocomplete({
            minLength: 0,
            source: function (request, response) {
                var data = {
                    vcCriterio: $("#txtConceptoResumen").val().replace(/'/g, "&#39").replace(/"/g, "&#34").replace(/\\/g, "&#92"),
                    idCliente: window.parent.parent.parent.idCliente,
                    activo: true
                };
                $.ajax({
                    type: "POST",
                    url: "Mnt_SubServicioResumen.aspx/ListarConceptosResumen",
                    data: JSON.stringify(data),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (result) {
                        response($.map(result.d, function (item) {
                            return {
                                label: item.VcNomCon.replace(/&#39/g, "'").replace(/&#92/g, "\\").replace(/&#34/g, '"'),
                                P_InCodCon: item.P_InCodCon
                            };
                        }));
                    },
                    error: function (xhr, err, thrErr) {
                        MostrarErrorAjax(xhr, err, thrErr);
                    }
                });
            },
            focus: function (event, ui) {
                $("#txtConceptoResumen").val(ui.item.label);
                return false;
            },
            select: function (event, ui) {
                Selecciono = true;
                //pais
                $("#txtConceptoResumen").val(ui.item.label);
                $("#hdfCodConcepto").val(ui.item.P_InCodCon);
            },
            change: function (event, ui) {

            },
            open: function (event, ui) {
                Selecciono = false;
                return false;
            }
        }).data("autocomplete")._renderItem = function (ul, item) {
            return $("<li></li>").data("item.autocomplete", item).append("<a>" + item.P_InCodCon + "=" + item.label + "</a>").appendTo(ul);
        };
    }

    $("#btnGuardar").click(function (event) {

        var oSubConceptoResumen = new SubConceptoResumen();

        oSubConceptoResumen.vcCodSubCon = $("#txtCodigo").val().replace(/'/g, "&#39").replace(/"/g, "&#34").replace(/\\/g, "&#92");
        oSubConceptoResumen.vcNomSubCon = $("#txtSubConceptoResumen").val().replace(/'/g, "&#39").replace(/"/g, "&#34").replace(/\\/g, "&#92");
        oSubConceptoResumen.F_inCodConceptoResumen = $("#hdfCodConcepto").val();

        if ($('#chkEstado').is(':checked')) {
            oSubConceptoResumen.btVig = true;
        } else {
            oSubConceptoResumen.btVig = false;
        }

        if ($("#txtCodigo").val() === "") {
            alerta("El código del sub concepto es un campo obligatorio.");
            $("#txtCodigo").focus();
            return;
        }
        if ($("#txtSubConceptoResumen").val() === "") {
            alerta("El nombre del sub concepto es un campo obligatorio.");
            $("#txtSubConceptoResumen").focus();
            return;
        }

        if ($("#txtConceptoResumen").val() === "") {
            alerta("El Concepto de Resumen es un campo obligatorio.");
            $("#txtConceptoResumen").focus();
            return;
        }
        
        var sendData = JSON.stringify(oSubConceptoResumen);

        $.ajax({
            type: "POST",
            url: "Mnt_SubServicioResumen.aspx/Guardar",
            data: "{'codigo': '" + $("#hdfCodSubConceptoRes").val() + "','oSubConceptoResumen': '" + sendData + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                $("#dvCargando").hide();
                if (result.d == "1") {
                    window.parent.ActualizarGrilla();
                    Mensaje("<h1>Sub Concepto guardado</h1><br/>", document, CerroMensaje);
                }
                else if (result.d == "99") {
                    alerta("El código del Sub Concepto ya ha sido registrado. Intente otro.");
                    $("#txtCodigo").focus();
                } else if (result.d == "100") {
                    alerta("El nombre ingresado ya ha sido registrado. Intente otro.");
                    $("#txtSubConceptoResumen").focus();
                }

            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
                //                BloquearPagina(false);
            }
        });
    });

    $("#btnCerrar").click(function (event) {
        window.parent.tab.tabs("remove", window.parent.tab.tabs("option", "selected"));
    });
});

function validarEspaciosEnBlancoAlInicio(id) {
    var valor = $("#" + id.toString() + "").val();
    $("#" + id.toString() + "").val($.trim(valor));

}

function CerroMensaje() {
    BloquearPagina(false);
    if ($("#hdfCodSubConceptoRes").val() === "") {//Nuevo
        $("#txtCodigo").val("");
        $("#txtSubConceptoResumen").val("");
        $("#txtConceptoResumen").val("");
        $("#hdfCodConcepto").val("");
        $("#txtCodigo").focus("");
    }
    else {//Edicion
        window.parent.tab.tabs("remove", indiceTab);
    }
}