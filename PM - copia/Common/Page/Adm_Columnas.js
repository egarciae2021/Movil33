/*global _comma_separated_list_of_variables_*/
function checkBox(e) {
    e = e || event; /* get IE event ( not passed ) */
    e.stopPropagation ? e.stopPropagation() : e.cancelBubble = true;
}
var grid;

$(document).ready(function () {
    var lstCampo = new Array();

    $(".btnNormal").button();

    IniciarPagina();

    function IniciarPagina() {
    }

    var mydata;
    mydata = grid = $("#tbCampo");
    getColumnIndexByName = function (columnName) {
        var cm = grid.jqGrid('getGridParam', 'colModel'), i = 0, l = cm.length;
        for (i = 0; i < l; i++) {
            if (cm[i].name === columnName) {
                return i; // return the index
            }
        }
        return -1;
    };
    disableIfChecked = function (elem) {
        if ($(elem).is(':checked')) {
            $(elem).attr('disabled', true);
        }
    };

    grid.jqGrid({
        datatype: 'local',
        data: mydata,
        colModel: [
                    { name: 'P_inCod', index: 'P_inCod', align: 'center', sorttype: 'int', label: 'Codigo', hidden: true },
                    { name: 'vcDes', index: 'vcDes', align: 'left', label: 'Campo', width: 120 },
                    { name: 'inOrd', index: 'inOrd', hidden: true, label: 'inord' },
                    { name: 'btVis', index: 'btVis', width: 80, align: 'left',
                        label: ["<div style='text-align:left;'><input type='checkbox' id='chkTodosVisible' onclick='checkBox(event)'/>Visible</div>"],
                        formatter: 'checkbox', formatoptions: { disabled: false },
                        edittype: 'checkbox', editoptions: { value: "true:false", defaultValue: 'true' }
                    },
                    { name: 'btOrd', index: 'btOrd', width: 70, align: 'left',
                        label: ["<div style='text-align:left;'><input type='checkbox' id='chkTodosOrden' onclick='checkBox(event)'/>Orden</div>"],
                        formatter: 'checkbox', formatoptions: { disabled: false },
                        edittype: 'checkbox', editoptions: { value: 'true:false', defaultValue: 'true' }
                    },
                    { name: 'btFil', index: 'btFil', width: 70, align: 'left',
                        label: ["<div style='text-align:left;'><input type='checkbox' id='chkTodosFiltro' onclick='checkBox(event)'/>Filtro</div>"],
                        formatter: 'checkbox', formatoptions: { disabled: false },
                        edittype: 'checkbox', editoptions: { value: 'true:false', defaultValue: 'true' }
                    },
                    { name: 'inLar', index: 'inLar', hidden: true, label: 'inLar' }
                ],
        sortname: "inOrd", //Default SortColumn
        sortorder: "asc", //Default SortOrder.
        width: "380",
        height: "277",
        shrinkToFit: false
    });

    $("#chkTodosVisible").change(function () {
        var datos = $("#tbCampo").jqGrid('getRowData');
        $(datos).each(function () {
            $("#tbCampo").jqGrid('setRowData', this.P_inCod, { 'btVis': $('#chkTodosVisible').is(':checked') });
        });
        VerificaColumna('btVis');
    });

    $("#chkTodosOrden").change(function () {
        var datos = $("#tbCampo").jqGrid('getRowData');
        $(datos).each(function () {
            $("#tbCampo").jqGrid('setRowData', this.P_inCod, { 'btOrd': $('#chkTodosOrden').is(':checked') });
        });
        VerificaColumna('btOrd');
    });

    $("#chkTodosFiltro").change(function () {
        var datos = $("#tbCampo").jqGrid('getRowData');
        $(datos).each(function () {
            $("#tbCampo").jqGrid('setRowData', this.P_inCod, { 'btFil': $('#chkTodosFiltro').is(':checked') });
        });
        VerificaColumna('btFil');
    });

    function VerificaVisible(Col) {
        var datos = $("#tbCampo").jqGrid('getRowData');
        var ConCheck = 0;
        var SinCheck = 0;

        $(datos).each(function () {
            if (Col == 'btVis') {
                if (this.btVis == "true") {
                    ConCheck++;
                }
                else {
                    SinCheck++;
                }
            }
            else if (Col == 'btOrd') {
                if (this.btOrd == "true") {
                    ConCheck++;
                }
                else {
                    SinCheck++;
                }
            }
            else if (Col == 'btFil') {
                if (this.btFil == "true") {
                    ConCheck++;
                }
                else {
                    SinCheck++;
                }
            }
        });

        if (Col == 'btVis') {
            if (ConCheck == 0) {
                $("#chkTodosVisible").attr('checked', false);
            }
            else if (SinCheck == 0) {
                $("#chkTodosVisible").attr('checked', true);
            }
        }
        else if (Col == 'btOrd') {
            if (ConCheck == 0) {
                $("#chkTodosOrden").attr('checked', false);
            }
            else if (SinCheck == 0) {
                $("#chkTodosOrden").attr('checked', true);
            }
        }
        else if (Col == 'btFil') {
            if (ConCheck == 0) {
                $("#chkTodosFiltro").attr('checked', false);
            }
            else if (SinCheck == 0) {
                $("#chkTodosFiltro").attr('checked', true);
            }
        }
    }

    function VerificaColumna(Col) {
        var i = getColumnIndexByName(Col);
        $("tbody > tr.jqgrow > td:nth-child(" + (i + 1) + ") > input", $("#tbCampo")).click(function (e) {
            VerificaVisible(Col);
        });
    }

    $.ajax({
        type: "POST",
        url: "Adm_Columnas.aspx/ListarColumnas",
        data: "{'vcTab': '" + $("#hdfvcTab").val() + "'," +
               "'inTipOri':'" + $('#hdfinTipOri').val() + "'}", //TipoOrigen
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            $("#tbCampo").jqGrid('clearGridData');
            var i;
            for (i = 0; i < $(result.d).length; i++) {
                if (result.d[i].btVig == true) {
                    var oCampo = new ENT_ENT_Campo(result.d[i].P_inCod, result.d[i].inOrd, result.d[i].vcDes, result.d[i].btFil, result.d[i].btOrd, result.d[i].btVis, result.d[i].inLar);
                    lstCampo.push(oCampo);
                    //if (result.d[i].vcNomAlias != "btVig") { //31-01-2014 - wapumayta
                    $("#tbCampo").jqGrid('addRowData', oCampo.P_inCod, oCampo);
                    //};
                }
            }
            VerificaColumna('btVis');
            VerificaColumna('btOrd');
            VerificaColumna('btFil');
            VerificaVisible('btVis');
            VerificaVisible('btOrd');
            VerificaVisible('btFil');
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });

    $("#btnGuardar").click(function () {

        if (!VerificaColumnaVisible())
        { return; }

        var datos = $("#tbCampo").jqGrid('getRowData');
        //lstCampo
        $(datos).each(function () {
            var oRow = this;
            $(lstCampo).each(function () {
                this.vcDes = this.vcDes.replace(/'/g, "&#39");
                if (this.P_inCod == oRow.P_inCod) {
                    this.btFil = oRow.btFil;
                    this.btOrd = oRow.btOrd;
                    this.btVis = oRow.btVis;
                    this.inLar = oRow.inLar;
                    return false;
                }
            });
        });

        var vclstCam = JSON.stringify(lstCampo);

        $.ajax({
            type: "POST",
            url: "Adm_Columnas.aspx/GuardarColumnas",
            data: "{'vcTab': '" + $("#hdfvcTab").val() + "'," +
                    "'vclstCam': '" + vclstCam + "'," +
                    "'inTipOri':'" + $('#hdfinTipOri').val() + "'}", //TipoOrigen
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (msg) {
                window.parent.location.reload();
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            }
        });
    });

    $("#btnCerrar").click(function () {
        window.parent.dialogConfCol.dialog("close");
    });
});




function VerificaColumnaVisible() {
    var _return = true;
    var datos = $("#tbCampo").jqGrid('getRowData');
    var ConCheck = 0;
    var SinCheck = 0;
    $(datos).each(function () {
        if (this.btVis == "true") {
            ConCheck++;
        }
        else {
            SinCheck++;
        }
    });

    if (ConCheck == 0) {
        _return = false;
        alerta('Debe seleccionar una columna como mínimo');
    }

    return _return;
    
}