
function pais(P_vcCodPai, vcNomPai, P_btEST) {
    this.P_vcCodPai = P_vcCodPai;
    this.vcNomPai = vcNomPai;
    this.P_btEST = P_btEST;
}

$(function () {
    $("#txtCodigo").focus();
    ValidarNumeroEnCajaTexto("txtCodigo", ValidarSoloNumero);
    $("#txtNombre").keypress(ValidarAlfaNumericoConEspacios);

    var indiceTab = window.parent.tab.tabs("option", "selected");

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
        if ($("#hdfPais").val() == "") {//Nuevo
            $("#txtCodigo").val("");
            $("#txtNombre").val("");
            $("#txtCodigo").focus();
        }
        else {//Edicion
            window.parent.tab.tabs("remove", indiceTab);
        }
    }


    $("#btnCerrar").live("click", function () {
        window.parent.tab.tabs("remove", window.parent.tab.tabs("option", "selected"));
    });


    $(".btnNormal").button();

    var vcCodPai = $("#hdfPais").val();

    $("#btnGuardar").click(function (event) {
        var Pais = new pais();
        Pais.P_vcCodPai = $("#txtCodigo").val().replace(/'/g, "&#39").replace(/"/g, "&#34").replace(/\\/g, "&#92");
        Pais.vcNomPai = $("#txtNombre").val().replace(/'/g, "&#39").replace(/"/g, "&#34").replace(/\\/g, "&#92");
        Pais.P_btEST = $("#chkEstado").is(':checked');

        if (Pais.P_vcCodPai == "") {
            alerta("El código del país es un campo obligatorio.");
            $("#txtCodigo").focus();
            return;
        }
        if (Pais.vcNomPai == "") {
            alerta("El Nombre del país es un campo obligatorio.");
            $("#txtNombre").focus();
            return;
        }

        var oPais = JSON.stringify(Pais);
        var vcCodPai = $("#hdfPais").val().replace(/'/g, "&#39").replace(/"/g, "&#34").replace(/\\/g, "&#92");

        $.ajax({
            type: "POST",
            url: "Mnt_Pais.aspx/Guardar",
            //data: "{'oCompania': '" + oCompania + "'}",

            data: "{'oPais': '" + oPais + "'," +
                               "'vcCodPai': '" + vcCodPai + "'}",

            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                if (result.d == "0") {
                    window.parent.ActualizarGrilla();
                    Mensaje("<br/><h1>País guardado</h1><br/><h2>" + Pais.P_vcCodPai + "</h2>", document, CerroMensaje);
                }
                else {
                    alerta("El código del país ya ha sido registrado anteriormente, no se pudo grabar el registro");
                    BloquearPagina(false);
                }
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
                BloquearPagina(false);
            }
        });
    });
});

function validarEspaciosEnBlancoAlInicio() {
    var valor = $("#txtNombre").val();
    $("#txtNombre").val($.trim(valor));
}