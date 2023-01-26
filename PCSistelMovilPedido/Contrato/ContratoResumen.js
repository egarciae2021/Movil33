$(function () {
    //alert(JSON.stringify(window.parent.arCampanasActivas));
    
    $("#tbContratos").kendoGrid({
        dataSource: {
            data: window.parent.arCampanasActivas
        },
        sortable: false,
        columns: [
            { field: "IdCampana", width: "50px", title: "IdCampana", hidden: true },
            { field: "CodigoCampana", width: "50px", title: "Código Campaña", hidden: true },
            { template: '<img id="#:data.IdOperador#-#:data.NombreOperador#" class="hovOpe" src="../Common/Images/icono_#:data.NombreOperador#.png" style="width: 18px;height: 18px;float: left;">', width: "30px", title: "", headerAttributes: { style: "text-align: center;font-size:11px;"} },
            { field: "NombreOperador", title: "Operador", hidden: false },
            { field: "NombreCampana", title: "Nombre Campaña", hidden: false },
            { command: { text: "Descargue su Contrato", click: fnDescargarContrato }, title: "Documento", width: "150px", attributes: { style: "text-align:center;" }, headerAttributes: { style: "text-align: center;font-size:11px;"} }
        ]
    });

    $("#btnDescargar").click(function () {
        $.ajax({
            type: "POST",
            url: "ContratoResumen.aspx/ObtenerContrato",
            data: "{'pIdEmpleado': '" + $("#hdfEmpleado").val() + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (resultado) {
                if ($.trim(resultado.d) == "") {
                    alerta("Ud. no tiene contrato generado.");
                } else if ($.trim(resultado.d) == "-1") {
                    alerta('No se encontró el archivo a descargar.');
                } else {
                    window.location.href = "../Common/Controladores/DescargarArchivo.ashx?archivo=" + resultado.d;
                }
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            }
        });
    });
});

function fnDescargarContrato(e) {
    var tbData = this.dataItem($(e.currentTarget).closest("tr"));

    var ObtenerContrato_Data = {
        pIdEmpleado: $("#hdfEmpleado").val(),
        pIdCampana: tbData.IdCampana
    };

    $.ajax({
        type: "POST",
        url: "ContratoResumen.aspx/ObtenerContrato",
        data: JSON.stringify(ObtenerContrato_Data),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (resultado) {
            if ($.trim(resultado.d) == "") {
                alerta("Ud. no tiene contrato generado.");
            } else if ($.trim(resultado.d) == "-1") {
                alerta('No se encontró el archivo a descargar.');
            } else {
                window.location.href = "../Common/Controladores/DescargarArchivo.ashx?archivo=" + resultado.d;
            }
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });   
}