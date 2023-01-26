function compania(COMP_P_vcCODCIA, COMP_vcNOMCIA, COMP_vcCODPRE, COMP_vcREEPRE) {
    this.COMP_P_vcCODCIA = COMP_P_vcCODCIA;
    this.COMP_vcNOMCIA = COMP_vcNOMCIA;
    this.COMP_vcCODPRE = COMP_vcCODPRE;
    this.COMP_vcREEPRE = COMP_vcREEPRE;
}


$(function () {

    var indiceTab = window.parent.tab.tabs("option", "selected");

    $("#txtCodigo").keypress(ValidarCodigoVarChar);
    $("#txtNombre").keypress(ValidarAlfaNumericoConEspacios);
    $("#txtPrefijo").keypress(ValidarAlfaNumerico);
    $("#txtCambiarPrefijo").keypress(ValidarAlfaNumerico);

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

    function CerroMensaje() {
        BloquearPagina(false);
        if ($("#hdfCompania").val() == "") {//Nuevo
            $("#txtCodigo").val("");
            $("#txtNombre").val("");
            $("#txtPrefijo").val("");
            $("#txtCambiarPrefijo").val("");
            $("#txtCodigo").focus();
        }
        else {//Edicion
            window.parent.tab.tabs("remove", indiceTab);
        }
    }

    $(".btnNormal").button();

    var vcCodCom = $("#hdfCompania").val();



    $("#btnGuardar").click(function (event) {
        var Compania = new compania();
        Compania.COMP_P_vcCODCIA = $("#txtCodigo").val().replace(/'/g, "&#39").replace(/"/g, "&#34").replace(/\\/g, "&#92");
        Compania.COMP_vcNOMCIA = $("#txtNombre").val().replace(/'/g, "&#39").replace(/"/g, "&#34").replace(/\\/g, "&#92");
        Compania.COMP_vcCODPRE = $("#txtPrefijo").val().replace(/'/g, "&#39").replace(/"/g, "&#34").replace(/\\/g, "&#92");
        Compania.COMP_vcREEPRE = $("#txtCambiarPrefijo").val().replace(/'/g, "&#39").replace(/"/g, "&#34").replace(/\\/g, "&#92");
        Compania.COMP_btEST = $("#chkEstado").is(':checked');

        if (Compania.COMP_P_vcCODCIA == "") {
            alerta("El código de operador es un campo obligatorio.");
            $("#txtCodigo").focus();
            return;
        }

        //way
        if ($.trim(Compania.COMP_P_vcCODCIA).length == 0) {
            alerta("El codigo ingresado es Invalido");
            $("#txtCodigo").focus();
            return;
        }

        var oCompania = JSON.stringify(Compania);
        var vcCodCom = $("#hdfCompania").val();

        $.ajax({
            type: "POST",
            url: "Mnt_Compania.aspx/Guardar",
            //data: "{'oCompania': '" + oCompania + "'}",

            data: "{'oCompania': '" + oCompania + "'," +
                               "'vcCodCom': '" + vcCodCom.replace(/'/g, "&#39") + "'}",

            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                if (result.d == "0") {
                    window.parent.ActualizarGrilla();
                    Mensaje("<br/><h1>Operador guardado</h1><br/><h2>" + Compania.COMP_P_vcCODCIA + "</h2>", document, CerroMensaje);
                }
                else {
                    alerta("El código del Operador ya ha sido Registrado Anteriormente, no se pudo Grabar el Registro");
                    BloquearPagina(false);
                }
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
                BloquearPagina(false);
            }
        });
    });

    //way
    $("#btnCerrar").live("click", function () {
        window.parent.tab.tabs("remove", window.parent.tab.tabs("option", "selected"));
    });
});

function validarEspaciosEnBlancoAlInicio() {
    var valor = $("#txtNombre").val();
    $("#txtNombre").val($.trim(valor));
}