var Selecciono;
var codTempAutocomplete;

var oCulturaUsuario;
var FormatoFechaCulturaForDatePicker = "";
var indiceTab;

function ConceptoResumen(VcCodCon, VcNomCon, VcNomAbrvSr, BtEst, DtFecIni, F_InCodConTip, BtVig, InOrden, BtCampSum, BtMinUt) {
    this.VcCodCon = VcCodCon;
    this.VcNomCon = VcNomCon;
    this.VcNomAbrvSr = VcNomAbrvSr;
    this.BtEst = BtEst;
    this.DtFecIni = DtFecIni;
    this.F_InCodConTip = F_InCodConTip;
    this.btVig = BtVig;
    this.InOrden = InOrden;
    this.BtCampSum = BtCampSum;
    this.BtMinUt = BtMinUt;
//    this.P_InCodCon = P_InCodCon;
}

$(function () {

    indiceTab = window.parent.tab.tabs("option", "selected");

    oCulturaUsuario = window.parent.parent.oCulturaUsuario;
    FormatoFechaCulturaForDatePicker = oCulturaUsuario.vcFecCor.toLowerCase();

    if (FormatoFechaCulturaForDatePicker.indexOf("yyyy") >= 0) {
        FormatoFechaCulturaForDatePicker = FormatoFechaCulturaForDatePicker.replace("yyyy", "yy");  //Para datepicker 'yy' es como 'yyyy'; y 'y' es 'yy'
    }
    else if (FormatoFechaCulturaForDatePicker.indexOf("yy") >= 0) {
        FormatoFechaCulturaForDatePicker = FormatoFechaCulturaForDatePicker.replace("yy", "y");
    }

    $(".txtFecha").datepicker({
        changeMonth: true,
        changeYear: true,
        onSelect: function (dateText, inst) {
            //$("#txtVigencia").val(fnCalcularVigencia());
        }
    });
    $(".txtFecha").datepicker('option', 'dateFormat', FormatoFechaCulturaForDatePicker);

    $("#txtCodigo").focusout(function () {
        $("#txtCodigo").val($("#txtCodigo").val().replace(/\\/g, "").replace(/'/g, ""));
    });

    $("#txtGrupoConcepto").focus(function () {
        switch ($(this).attr("id")) {
            case ("txtGrupoConcepto"):
                codTempAutocomplete = $("#hdfCodGruCon").val();
                break;
        }
    });


    if ($("#txtGrupoConcepto").length > 0) {
        $("#txtGrupoConcepto").autocomplete({
            minLength: 0,
            source: function (request, response) {
                var data = {
                    vcCriterio: $("#txtGrupoConcepto").val().replace(/'/g, "&#39").replace(/"/g, "&#34").replace(/\\/g, "&#92"),
                    idCliente: window.parent.parent.parent.idCliente,
                    activo: true
                };
                $.ajax({
                    type: "POST",
                    url: "Mnt_ServicioResumen.aspx/ListarGrupoConcepto",
                    data: JSON.stringify(data),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (result) {
                        response($.map(result.d, function (item) {
                            return {
                                label: item.VcNomGruSer.replace(/&#39/g, "'").replace(/&#92/g, "\\").replace(/&#34/g, '"'),
                                P_InCodGruSer: item.P_InCodGruSer
                            };
                        }));
                    },
                    error: function (xhr, err, thrErr) {
                        MostrarErrorAjax(xhr, err, thrErr);
                    }
                });
            },
            focus: function (event, ui) {
                $("#txtGrupoConcepto").val(ui.item.label);
                return false;
            },
            select: function (event, ui) {
                Selecciono = true;
                //pais
                $("#txtGrupoConcepto").val(ui.item.label);
                $("#hdfCodGruCon").val(ui.item.P_InCodGruSer);
            },
            change: function (event, ui) {

            },
            open: function (event, ui) {
                Selecciono = false;
                return false;
            }
        }).data("autocomplete")._renderItem = function (ul, item) {
            return $("<li></li>").data("item.autocomplete", item).append("<a>" + item.P_InCodGruSer + "=" + item.label + "</a>").appendTo(ul);
        };
    }

    $("#ddlTipCon").change(function () {
        var idTip = $(this).val();
        if ($(this).val() == "2") {

            $("#trBtMinUti").show();
        } else {
            $("#trBtMinUti").hide();
        }
        $("#hdfCodTipoConc").val(idTip);
    });

    //    $.ajax({
    //        type: "POST",
    //        url: "Mnt_ServicioResumen.aspx/Listar_TipoConcepto",
    //        contentType: "application/json; charset=utf-8",
    //        dataType: "json",
    //        success: function (result) {
    //            $("#ddlTipCon").html("");
    //            var ddlTipo = $('#ddlTipCon');
    //            $.each(result, function (val, text) {
    //                ddlTipo.append($('<option></option>').val(val).html(text));
    //            });
    //        },
    //        error: function (xhr, err, thrErr) {
    //            MostrarErrorAjax(xhr, err, thrErr);
    //        }
    //    });


    if ($("#txtTipoConcepto").length > 0) {
        $("#txtTipoConcepto").autocomplete({
            minLength: 0,
            source: function (request, response) {
                var data = {
                    vcCriterio: $("#txtTipoConcepto").val().replace(/'/g, "&#39").replace(/"/g, "&#34").replace(/\\/g, "&#92"),
                    idCliente: window.parent.parent.parent.idCliente
                };
                $.ajax({
                    type: "POST",
                    url: "Mnt_ServicioResumen.aspx/ListarTipoConcepto",
                    data: JSON.stringify(data),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (result) {
                        response($.map(result.d, function (item) {
                            return {
                                label: item.VcDes.replace(/&#39/g, "'").replace(/&#92/g, "\\").replace(/&#34/g, '"'),
                                P_inCod: item.P_inCod
                            };
                        }));
                    },
                    error: function (xhr, err, thrErr) {
                        MostrarErrorAjax(xhr, err, thrErr);
                    }
                });
            },
            focus: function (event, ui) {
                $("#txtTipoConcepto").val(ui.item.label);
                return false;
            },
            select: function (event, ui) {
                Selecciono = true;
                //pais
                $("#txtTipoConcepto").val(ui.item.label);
                $("#hdfCodTipoConc").val(ui.item.P_inCod);
            },
            change: function (event, ui) {

            },
            open: function (event, ui) {
                Selecciono = false;
                return false;
            }
        }).data("autocomplete")._renderItem = function (ul, item) {
            return $("<li></li>").data("item.autocomplete", item).append("<a>" + item.P_inCod + "=" + item.label + "</a>").appendTo(ul);
        };
    }

    $("#txtOrden").keypress(function (e) {
        if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
            return false;
        }
    });

    $("#btnGuardar").click(function (event) {

        var oConceptoResumen = new ConceptoResumen();

        oConceptoResumen.VcCodCon = $("#txtCodigo").val().replace(/'/g, "&#39").replace(/"/g, "&#34").replace(/\\/g, "&#92");
        oConceptoResumen.VcNomCon = $("#txtConceptoResumen").val().replace(/'/g, "&#39").replace(/"/g, "&#34").replace(/\\/g, "&#92");
        oConceptoResumen.VcNomAbrvSr = $("#txtNomAbrev").val().replace(/'/g, "&#39").replace(/"/g, "&#34").replace(/\\/g, "&#92");
        oConceptoResumen.BtVig = true;
        oConceptoResumen.DtFecIni = convertDateTommddyyyy($.trim($("#txtFechaInicioConceptoResumen").val()));
        oConceptoResumen.F_InCodConTip = $("#hdfCodGruCon").val();
        //        oConceptoResumen.F_inCodTipConc = $("#hdfCodTipoConc").val();
        oConceptoResumen.F_inCodTipConc = $("#ddlTipCon").val();

        oConceptoResumen.InOrden = $("#txtOrden").val().replace(/'/g, "&#39").replace(/"/g, "&#34").replace(/\\/g, "&#92");

        if ($('#chkEstado').is(':checked')) {
            oConceptoResumen.BtEst = true;
        } else {
            oConceptoResumen.BtEst = false;
        }

        if ($('#chkSumatoria').is(':checked')) {
            oConceptoResumen.BtCampSum = true;
        } else {
            oConceptoResumen.BtCampSum = false;
        }

        if ($('#chkMinUti').is(':checked')) {
            oConceptoResumen.BtMinUt = true;
        } else {
            oConceptoResumen.BtMinUt = false;
        }

        if ($("#txtCodigo").val() === "") {
            alerta("El Código es un campo obligatorio.");
            $("#txtCodigo").focus();
            return;
        }
        if ($("#txtConceptoResumen").val() === "") {
            alerta("El Nombre es un campo obligatorio.");
            $("#txtConceptoResumen").focus();
            return;
        }
        if ($("#txtNomAbrev").val() === "") {
            alerta("La abreviatura es un campo obligatorio.");
            $("#txtNomAbrev").focus();
            return;
        }
        if ($("#txtFechaInicioConceptoResumen").val() === "") {
            alerta("La fecha es un campo obligatorio.");
            $("#txtFechaInicioConceptoResumen").focus();
            return;
        }
        if ($("#txtGrupoConcepto").val() === "") {
            alerta("El Grupo Concepto es un campo obligatorio.");
            $("#txtGrupoConcepto").focus();
            return;
        }

        //        if ($("#txtTipoConcepto").val() == "") {
        //            alerta("El Tipo de Concepto es un campo obligatorio.");
        //            $("#txtTipoConcepto").focus();
        //            return;
        //        };
        if ($("#ddlTipCon").val() === "-1") {
            alerta("El Tipo de Concepto es un campo obligatorio.");
            $("#ddlTipCon").focus();
            return;
        }

        if ($("#txtOrden").val() === "") {
            alerta("El campo orden es un campo obligatorio. Debe ser la posición en el archivo.");
            $("#txtOrden").focus();
            return;
        }

        if (parseInt($("#txtOrden").val()) < 1) {
            alerta("El orden no debe ser menor a 1.");
            $("#txtOrden").focus();
            return;
        }


        var cod = $("#hdfCodConcpRes").val();

        var sendData = JSON.stringify(oConceptoResumen);

        $.ajax({
            type: "POST",
            url: "Mnt_ServicioResumen.aspx/Guardar",
            data: "{'cod': '" + cod + "','oConceptoResumen': '" + sendData + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                $("#dvCargando").hide();
                if (result.d == "1") {
                    window.parent.ActualizarGrilla();
                    Mensaje("<h1>Concepto guardado</h1><br/>", document, CerroMensaje);

                }
                else if (result.d == "99") {
                    alerta("El código de concepto ya ha sido registrado. Intente otro");
                    $("#txtCodigo").focus();
                } else if (result.d == "100") {
                    alerta("El nombre ingresado ya ha sido registrado. Intente otro");
                    $("#txtConceptoResumen").focus();
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
    if ($("#hdfCodConcpRes").val() === "") {//Nuevo
        $("#txtCodigo").val("");
        $("#txtConceptoResumen").val("");
        $("#txtNomAbrev").val("");
        $("#txtFechaInicioConceptoResumen").val("");
        $("#txtGrupoConcepto").val("");
        $("#txtOrden").val("");
        $("#chkSumatoria").is(":checked", false);
        $("#ddlTipCon").val(-1);
        $("#txtCodigo").focus("");
    }
    else {//Edicion
        window.parent.tab.tabs("remove", indiceTab);
    }
}

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


function convertDateToJson(m) {
    var fecha = new Date(m);
    var mileseg = fecha.getTime();
    return "/Date(" + mileseg + ")/";
}

function convertJsonToDate(mm) {
    var date = new Date(parseFloat(mm.substr(6)));
    var d = date.getDate(), m = date.getMonth() + 1, y;
    if (date.getFullYear) { y = date.getFullYear(); }
    else { y = 2000 + (date.getYear() % 100); }
    return (10 > d ? '0' : '') + d + (10 > m ? '/0' : '/') + m + '/' + y;
}

function convertDateTommddyyyy(mmm) {
    var dia = mmm.substring(2, 0);
    var mes = mmm.substring(5, 3);
    var anio = mmm.substring(10, 6);
    var mmm2 = mes + "/" + dia + "/" + anio;
    return mmm2;
}

function convertDateToddmmyyyy(mmm) {
    var dia = mmm.substring(2, 0);
    var mes = mmm.substring(5, 3);
    var anio = mmm.substring(10, 6);
    var mmm2 = dia + "/" + mes + "/" + anio;
    return mmm2;
}