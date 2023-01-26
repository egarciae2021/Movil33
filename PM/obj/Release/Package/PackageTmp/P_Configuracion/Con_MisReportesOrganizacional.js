/*28/12/2015 : RURBINA*/
var Modal;
var tbSolicitud;

$(function () {
    $(".btnNormal").button();

    var Modal;
    var codSol;
    var inTipSol;
    var timeoutHnd;

    tbSolicitud = $("#tbSolicitud").jqGrid({
        datatype: "local",
        colModel: [
            { name: 'Nombre', index: 'Nombre', label: 'Nombre' },
            { name: 'codreporte', index: 'codreporte', label: 'Codigo', hidden: true }
        ],
        sortname: "P_inCodSol", //Default SortColumn
        sortorder: "asc", //Default SortOrder.
        width: "400",
        height: "200",
        rownumbers: true,
        caption: "",
        ondblClickRow: function (id) { MostrarReporte(); }
    });

    $("#tbSolicitud").jqGrid('bindKeys', { "onEnter": function (id) { MostrarReporte(); }, "onSpace": function (id) { MostrarReporte(); } });

    function MostrarReporte() {

        var id = $("#tbSolicitud").jqGrid('getGridParam', 'selrow');
        if (id) {
            var datos = $("#tbSolicitud").jqGrid('getRowData', id);
            var codreporte = datos['codreporte'];
            //alert(nombrereporte);
            window.parent.Modal.dialog("close");
            //window.parent.parent.fnCarga();
            window.parent.$("#dvCargando").show();
            window.parent.location.href = 'PivotReporte.aspx?codreporte=' + codreporte;
            return true;
        }
        return false;
    }
    ListarReportes();

    function ListarReportes() {
        $.ajax({
            type: "POST",
            url: "Con_MisReportes.aspx/ListarMisReportes",
            data: "{'vcCodEmp': '" + $("#hdfCodEmp").val() + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                $("#tbSolicitud").jqGrid('clearGridData');
                var i;
                for (i = 0; i < $(result.d).length; i++) {
                    $("#tbSolicitud").jqGrid('addRowData', result.d[i].P_inCodSol, result.d[i]);
                }
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            }
        });
    }


    $("#btnAceptar").click(function () {
        //window.parent.IngresarLineaUnica(Linea);
        MostrarReporte();
    });

    $("#btnCancelar").click(function () {
        window.parent.Modal.dialog("close");
    });

    $("#btnQuitarReporte").click(function () {
        //window.parent.IngresarLineaUnica(Linea);
        QuitarReporte();
    });


    function QuitarReporte() {

        var id = $("#tbSolicitud").jqGrid('getGridParam', 'selrow');
        if (id) {
            var datos = $("#tbSolicitud").jqGrid('getRowData', id);
            var codreporte = datos['codreporte'];

            $("#lblMensajeConfirmacion").html("¿Desea eliminar el reporte seleccionado?");
            $('#divMsgConfirmacion').dialog({
                title: "Eliminar Reporte",
                modal: true,
                buttons: {
                    "Si": function () {
                        $.ajax({
                            type: "POST",
                            url: "Con_MisReportes.aspx/EliminarReporte",
                            data: "{'codreporte': '" + codreporte + "'}",
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success: function (result) {
                                if (result.d == 1) {
                                    //Registro Eliminado....
                                    Mensaje("Registro Eliminado", document, CerroMensaje);
                                    ListarReportes();
                                } else {
                                    Mensaje("Registro no pudo ser eliminado", document, CerroMensaje);
                                }
                            },
                            error: function (xhr, err, thrErr) {
                                MostrarErrorAjax(xhr, err, thrErr);
                            }
                        });
                        $(this).dialog("close");
                    },
                    "No": function () {
                        $(this).dialog("close");
                    }
                }
            });


            //alert(nombrereporte);
            //window.parent.Modal.dialog("close");
            //window.parent.location.href = 'PivotReporte.aspx?codreporte=' + codreporte;
            return true;
        }
        return false;
    }


});


function CerroMensaje() { }
      
