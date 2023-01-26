/*28/12/2015 : RURBINA*/
var Modal;
var tbPerfiles;

$(function () {

    $(".btnNormal").button();

    var Modal;
    var codSol;
    var inTipSol;
    var timeoutHnd;

    tbPerfiles = $("#tbPerfiles").jqGrid({
        datatype: "local",
        colModel: [
            { name: 'vcNombrePerfil', index: 'vcNombrePerfil', label: 'Perfil' },
            { name: 'P_inCodPerfil', index: 'P_inCodPerfil', label: 'Codigo', hidden: true }
        ],
        sortname: "P_inCodPerfil", //Default SortColumn
        sortorder: "asc", //Default SortOrder.
        width: "400",
        height: "200",
        rownumbers: true,
        caption: "",
        ondblClickRow: function (id) { MostrarReporte(); }
    });

    $("#tbPerfiles").jqGrid('bindKeys', { "onEnter": function (id) { MostrarReporte(); }, "onSpace": function (id) { MostrarReporte(); } });

    function MostrarReporte() {
        var id = $("#tbPerfiles").jqGrid('getGridParam', 'selrow');
        if (id) {
            var datos = $("#tbPerfiles").jqGrid('getRowData', id);
            var codreporte = datos['P_inCodPerfil'];
            $("#hdfIdPerfil").val(codreporte);
            window.parent.Modal.dialog("close");
            window.parent.$("#dvCargando").show();
            TipoPivot = "2";
            ObtenerDatosPerfil();         
        }
        return false;
    }
    ListarMisPerfiles();

    function ListarMisPerfiles() {
        $.ajax({
            type: "POST",
            url: "Imp_Mis_Perfiles.aspx/ListarMisPerfiles",
            data: "{'vcCodPerfil': '" + $("#hdfIdPerfil").val() + "','vcTipoConsulta':'" + TipoPivot + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                $("#tbPerfiles").jqGrid('clearGridData');
                var i;
                for (i = 0; i < $(result.d).length; i++) {
                    $("#tbPerfiles").jqGrid('addRowData', result.d[i].P_inCodPerfil, result.d[i]);
                }
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            }
        });
    }

    function ObtenerDatosPerfil(id) {
        TipoPivot = 2;
        $.ajax({
            type: "POST",
            url: "Imp_Mis_Perfiles.aspx/ObtenerCampos_X_Perfil",
            data: "{'vcCodPerfil': '" + $("#hdfIdPerfil").val() + "','vcTipoConsulta':'" + TipoPivot + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                if ($(result.d).length > 0) {
                    window.parent.ObtenerDatosDePerfil(result.d);
                }
                return true;
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

        var id = $("#tbPerfiles").jqGrid('getGridParam', 'selrow');
        if (id) {
            var datos = $("#tbPerfiles").jqGrid('getRowData', id);
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
                                    ListarMisPerfiles();
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

