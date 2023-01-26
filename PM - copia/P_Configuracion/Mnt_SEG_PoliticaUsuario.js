


$(window).resize(function () {
    DimPosElementos();
});

function DimPosElementos() {
    var Ancho = $(window).width();
    var Alto = $(window).height();
    
    if ($(window).width() < 480) {
        $("#tbNumeros3").setGridWidth(220);
        //$("#tblPoliticaSolicitudxEmpleado").setGridWidth(220);
    } else {
        $("#tbNumeros3").setGridWidth(Ancho - 250);
       // $("#tblPoliticaSolicitudxEmpleado").setGridWidth(Ancho - 250);
    }

    if ($(window).height() < 500 && $(window).height() > 400) {
        $("#tbNumeros3").setGridHeight((Alto - 140) / 4);
        
    } else if ($(window).height() < 400) {
        $("#tbNumeros3").setGridHeight(120);
        //$("#tblPoliticaSolicitudxEmpleado").setGridHeight(Alto - 60 - 350);
    } else {
        $("#tbNumeros3").setGridHeight(240);
        //$("#tblPoliticaSolicitudxEmpleado").setGridHeight(Alto - 90 - 350);
    }
}


$(function () {

    ValidarNumeroEnCajaTexto("txtValor", ValidarEnteroPositivo);

    $(".dvPanel").css("padding", "5px");

    $("input:checkbox,input:radio,input:file").uniform();
    $(".btnNormal").button();

    try {
        var tbNumeros3 = $("#tbNumeros3").jqGrid({
            datatype: "local",
            colModel: [ //0
                {name: 'vcCod', index: 'vcCod', label: 'Codigo', hidden: true, width: '50px', sortable: false },
                { name: 'vcNom', index: 'vcNom', label: 'Descripción', hidden: false, width: '300px', sortable: false },
                { name: 'vcVal', index: 'vcVal', label: 'Valor', hidden: false, width: '50px', sortable: false, classes: 'ColumGridColor', align: 'center',
                       formatter: function (value, options, rData) {

                           if (rData.btPerUsu == true) {
                               if (value == 1) {
                                   return 'Si';
                               }
                               else {
                                   return 'No';
                               }
                           }
                           return value;
                       }
                   },
            ],
            sortname: "vcCod", //Default SortColumn
            sortorder: "asc", //Default SortOrder.
            //width: "500",
            //height: "300",
            shrinkToFit: true,

            rownumbers: true,
            caption: "Políticas de Usuario",
            ondblClickRow: function () {
                Modificar_Valor();
            },
            afterInsertRow: function (rowid, aData) {


            }
        });

    } catch (e) {
        alerta(e);
    }

    Listar_Politica();

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


// ==============================================================================================================================
// SQL TABLA TEMPORAL
// ==============================================================================================================================
function Modificar_Valor() {


    var id = $("#tbNumeros3").jqGrid('getGridParam', 'selrow');

    if (id) {
        var datos = $("#tbNumeros3").jqGrid('getRowData', id);
        
        $("#hdf_CodPolitica").val(datos.vcCod);
        $("#lblDescrip").html(datos.vcNom.toUpperCase());
        if (datos.vcVal == 'Si' || datos.vcVal == 'No') {
            //$("#txtValor").val((datos.vcVal == 'Si' ? '1' : '0'));
            $("#txtValor").hide();
            $("#ddlValorCambioClavePrimerIngreso").show();
            $("#ddlValorCambioClavePrimerIngreso").val(datos.vcVal == 'Si' ? '1' : '0');            
        }
        else {
            $("#txtValor").show();
            $("#txtValor").val(datos.vcVal);
            $("#ddlValorCambioClavePrimerIngreso").hide();
        }

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

// ===================================================================================================================================================
//  GUARDAR
// ===================================================================================================================================================
function GuardarDatos() {

    var vcCriterio1 = $("#hdf_CodPolitica").val();
    var vcCriterio2 = $("#txtValor").val();

    if (vcCriterio1 == "POLITICA01" || vcCriterio1 == "POLITICA02" || vcCriterio1 == "POLITICA03" || vcCriterio1 == "POLITICA05") {
        if (vcCriterio2 < 1) {
            alerta("Debe ingresar un valor mayor a cero");
            $("#txtValor").focus();
            return false;
        }
    }
    else if (vcCriterio1 == "POLITICA04" || vcCriterio1 == "POLITICA06") {
        vcCriterio2 = $("#ddlValorCambioClavePrimerIngreso").val();
    }

    $.ajax({
        // ==============================================================================================================================
        type: "POST",
        url: "Mnt_SEG_PoliticaUsuario.aspx/Actualizar_Politica",
        data: "{'prCriterio1': '" + vcCriterio1 + "','prCriterio2': '" + vcCriterio2 + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        // ==============================================================================================================================
        success: function (result) {

            Listar_Politica();
        },
        error: function (xhr, err, thrErr) {
            //MostrarErrorAjax(xhr, err, thrErr);
            alert(thrErr);
        }

    });

    $("#div_CambioValor").dialog("close");
}
// ==============================================================================================================================
// LISTAR POLITICA
// ==============================================================================================================================
function Listar_Politica() {

    $("#tbNumeros3").jqGrid('clearGridData');

    $.ajax({
        // ==============================================================================================================================
        type: "POST",
        url: "Mnt_SEG_PoliticaUsuario.aspx/Listar_Politica",
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