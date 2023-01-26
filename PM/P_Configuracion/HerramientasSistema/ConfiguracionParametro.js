$(function () {


    let biNotasPorRevisar = false;
    var tab;
    var MargenFiltro = 0;
    var MargenHeight = 48;
    var idSeleccionado = null;
    var TamanoPagina = [20, 50, 100];
    var nuAltoFilaSolicitud = 34;
    var inAltGrid;
    var inFilas;
    var nuAltoFila = 23.04;
    let ArrayPaginacionSolicitud = [];
    var inFiltro = 1;
    var vcFiltro = "";
    var vcFiltro2 = "";
    var vcGruTipSolEdi;
    var vcGruTipSolEli;
    var vcVista = "General";
    var vcTodos = "0";
    var vcTipos = "0"; //General
    var vcFecVal;
    var vcRangFecVal;
    var vcRangoFechaIni;
    var vcRangoFechaFin;
    var inIdResTec;
    var vcTit;
    var vcMen;
    var lstIdSol = "";
    var vcIdTipSol = "";
    var vcEsReasignar = "0";




    $(window).resize(function () {
        DimPosElementos();
    });

    function DimPosElementos() {
        var Ancho = $(window).width();
        var Alto = $(window).height();

        if ($(window).width() < 480) {
            $("#tbNumeros3").setGridWidth(220);

        } else {
            $("#tbNumeros3").setGridWidth(Ancho - 250);

        }

        if ($(window).height() < 500 && $(window).height() > 400) {
            $("#tbNumeros3").setGridHeight(Alto * 0.8);

        } else if ($(window).height() < 400) {
            $("#tbNumeros3").setGridHeight(Alto * 0.8);

        } else {
            $("#tbNumeros3").setGridHeight(Alto * 0.8);

        }
        RecalcularColumnasGrilla("grid", true);


    }

    nuAltoFila = 23.04;
    inFilas = Math.floor(($(window).height()) / nuAltoFila);

    inFilas = inFilas - 1;
    ActualizarPageSizeGrillasTabSolicitud("grid", inFilas);


    function ActualizarPageSizeGrillasTabSolicitud(gridName, inFilas) {
        ArrayPaginacionSolicitud.push(inFilas);
        ArrayPaginacionSolicitud.push(inFilas + inFilas);
        ArrayPaginacionSolicitud.push(inFilas + inFilas + inFilas);

        $("#" + gridName).closest('.ui-jqgrid').find('.ui-pg-selbox').children().remove();
        if (inFilas <= 0) {
            $("#" + gridName).closest('.ui-jqgrid').find('.ui-pg-selbox').append('<option value=1>1</option>');
        }
        else {
            var k;
            for (k = 1; k <= 3; k++) {
                $("#" + gridName).closest('.ui-jqgrid').find('.ui-pg-selbox').append('<option value=' + inFilas * k + '>' + inFilas * k + '</option>');
            }
        }

        if (inFilas <= 0) { inFilas = 1; }

        $("#" + gridName).closest('.ui-jqgrid').find('.ui-pg-selbox').val(inFilas);
        $("#" + gridName).closest('.ui-jqgrid').find('.ui-pg-selbox').change();


    }

    function NumeroInicialFilas() {
        //debugger;
        inFilas = Math.floor(inAltGrid / nuAltoFilaSolicitud);
        //ArrayPaginacionSolicitud = [];


        ArrayPaginacionSolicitud.push(inFilas);
        ArrayPaginacionSolicitud.push(inFilas + inFilas);
        ArrayPaginacionSolicitud.push(inFilas + inFilas + inFilas);
    }

    function ActualizarGrilla() {
        $("#grid").trigger("reloadGrid");
    }




    DimPosElementos();

    var Alto = $(window).height();

    inAltGrid = 600 - MargenFiltro * MargenHeight;
    ValidarNumeroEnCajaTexto("txtValor", ValidarEnteroPositivo);

    $(".dvPanel").css("padding", "5px");

    $("input:checkbox,input:radio,input:file").uniform();
    $(".btnNormal").button();



    NumeroInicialFilas();
    console.log(inFilas);
    console.log(ArrayPaginacionSolicitud);

    try {



        var tbNumeros3 = $("#tbNumeros3").jqGrid({
            datatype: "local",
            colModel: [ //0
                { name: 'IdParametro', index: 'IdParametro', label: 'IdParametro', hidden: true, width: '50px', sortable: false },
                { name: 'Grupo', index: 'Grupo', label: 'Grupo', hidden: false, width: '100px', sortable: false },
                { name: 'Clave', index: 'Clave', label: 'Clave', hidden: false, width: '220px', sortable: false },
                { name: 'Valor', index: 'Valor', label: 'Valor', hidden: false, width: '300px', sortable: false, classes: 'ColumGridColor' },
                { name: 'Descripcion', index: 'Descripcion', label: 'Descripcion', hidden: false, width: '300px', sortable: false },
            ],
            sortname: "IdParametro", //Default SortColumn
            sortorder: "asc", //Default SortOrder.
            width: "500",
            //height: "300",
            shrinkToFit: false,
            /*height: '100%',*/

            //viewrecords: true,
            pager: "#pager", //Pager.
            loadtext: "Cargando datos...",
            //recordtext: "{0} - {1} de {2} elementos",
            emptyrecords: "No hay resultados",
            //pgtext: "Pág: {0} de {1}", //Paging input control text format.
            rowNum: inFilas, //$("#hdfTamPag").val(), //"10" PageSize.
            rowList: ArrayPaginacionSolicitud, //TamanosPaginaSel, //Variable PageSize D 
            rownumbers: true,
            caption: "Parametros",
            ondblClickRow: function () {
                Modificar_Valor();
            },
            afterInsertRow: function (rowid, aData) {


            }
        });


    } catch (e) {
        alerta(e);
    }

    Listar_Parametros();

    $("#btnCambiarValGrup").click(function (event) {
        Modificar_Valor();
    });

    DimPosElementos();

    $("#txtValor").keypress(function (e) {
        if (e.which == 13) {
            GuardarDatos();
        }
    });
    $("#txtValor").focus(function () { $(this).select(); });

});

var tmp_valor = '';
var tmp_descripcion = '';

// ==============================================================================================================================
// SQL TABLA TEMPORAL
// ==============================================================================================================================
function Modificar_Valor() {
    tmp_descripcion = $("#ddlDescripcionacambiar").val();
    tmp_valor = $("#ddlVarloracambiar").val();
    var id = $("#tbNumeros3").jqGrid('getGridParam', 'selrow');


    if (id) {
        var datos = $("#tbNumeros3").jqGrid('getRowData', id);

        $("#lblDescrip").html(datos.Clave);
        $("#txtValor").hide();
        $("#ddlVarloracambiar").show();
        $("#ddlVarloracambiar").val(datos.Valor);

        $("#txtDescripcion").hide();
        $("#ddlDescripcionacambiar").show();
        $("#ddlDescripcionacambiar").val(datos.Descripcion);
    }
    else {
        alerta("Seleccione un parametro");
        return;
    }

    ModalNuevo = $('#div_CambioValor').dialog({
        title: "Editar Valor ",
        width: 500,
        //heigth: 250,
        modal: true,
        resizable: false,
        // ===================================================================================================================================================
        open: function (event, ui) {
            $(".ui-dialog-titlebar-close", ui.dialog).hide();
        },
        // ===================================================================================================================================================
        buttons: {
            "Guardar ": function () {
                // ===================================================================================================================================================

                GuardarDatos();
                // ===================================================================================================================================================
            },
            "Cerrar ": function () {
                // ===================================================================================================================================================
                $(this).dialog("close");
                //$("#ifReinicia")[0].contentWindow.guardar_datos(fn_flag_contrasena);
                // ===================================================================================================================================================
            }

        }
    });


}

function codificarEntidad(str) {
    var array = [];
    for (var i = str.length - 1; i >= 0; i--) {
        array.unshift(['&#', str[i].charCodeAt(), ';'].join(''));
    }
    return array.join('');
}
// ===================================================================================================================================================
//  GUARDAR
// ===================================================================================================================================================
function GuardarDatos() {

    var vcCriterio1 = $("#lblDescrip").text();
    var vcCriterio2 = $("#ddlVarloracambiar").val();
    var vcCriterio3 = $("#ddlDescripcionacambiar").val();


    if (vcCriterio2 == tmp_valor) {
        alerta("No se registraron cambios");
        return false;
    }

    vcCriterio2 = codificarEntidad(vcCriterio2);
    vcCriterio3 = '';
    $.ajax({
        // ==============================================================================================================================
        type: "POST",
        url: "ConfiguracionParametro.aspx/Actualizar_Parametros",
        data: "{'prCriterio1': '" + vcCriterio1 + "','prCriterio2': '" + vcCriterio2 + "','prCriterio3':'" + vcCriterio3 + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        // ==============================================================================================================================
        success: function (result) {

            Listar_Parametros();
            alerta("Se actualizaron los datos");
        },
        error: function (xhr, err, thrErr) {
            //MostrarErrorAjax(xhr, err, thrErr);
            alert(thrErr);
        }

    });

    $("#div_CambioValor").dialog("close");
}
// ==============================================================================================================================
// LISTAR 
// ==============================================================================================================================
function Listar_Parametros() {

    $("#tbNumeros3").jqGrid('clearGridData');

    $.ajax({
        // ==============================================================================================================================
        type: "POST",
        url: "ConfiguracionParametro.aspx/Listar_Parametros",
        data: "{'prCriterio': ''}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        // ==============================================================================================================================
        success: function (result) {


            if ($(result.d).length > 0) {
                var i;
                for (i = 0; i < $(result.d).length; i++) {
                    $("#tbNumeros3").jqGrid('addRowData', result.d[i].vcCod, result.d[i]);
                }

                $("#tbNumeros3").trigger("reloadGrid");


            }
            else {
            }
        },
        error: function (xhr, err, thrErr) {
            //MostrarErrorAjax(xhr, err, thrErr);
            alert(thrErr);
        }

    });

}