
function grupo() {
    this.inCodGru;
    this.vcGru;
    this.vcVal;
}

function fnMostrarDatos(valor) {
    alert(valor);
}

$(function () {
    $(".btnNormal").button();

    //            if (isIE() == 6) {
    //                $("#").css('z-index', '2000');
    //                $("#btnCancelar").css('width', '100px');
    //                $("#btnGuardar").css('width', '100px');
    //                $("#btnCancelar").css('display', 'inline-block');
    //                $("#btnGuardar").css('display', 'inline-block');
    //            }



    $("#btnGuardar").click(function () {
        $.ajax({
            type: "POST",
            url: "Conf_AgregarGrupoCampana_PolSeg.aspx/Guardar",
            data: "{'P_inCodGru': '" + $("#ddlGrupo").val() + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (msg) {
                //if (inTip == 1) {
                var Grupo = new grupo();

                Grupo.inCodGru = $("#ddlGrupo").val();
                Grupo.vcGru = $("#ddlGrupo option:selected").text();

                window.parent.tblGrupo.jqGrid('addRowData', Grupo.inCodGru, Grupo);
                //}
                //else {
                //    window.parent.tblGrupo.jqGrid('setRowData', $("#hdfGrupo").val(), { 'vcVal': Valor });
                //}
                window.parent.ModalEmpleados.dialog('close');
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            }
        });

    });
    $("#btnCancelar").click(function () {
        window.parent.ModalEmpleados.dialog('close');
    });

    Inicio();
    function Inicio() {
        if ($("#ddlGrupo option").size() == 0 && $("#hdfGrupo").val() == "") {
            alerta("No hay mas grupos para agregar");
            window.parent.ModalEmpleados.dialog('close');
        }
    }
});    
    