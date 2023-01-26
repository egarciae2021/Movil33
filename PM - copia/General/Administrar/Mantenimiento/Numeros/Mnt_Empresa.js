function empresa(P_vcCodEmp, vcRazSoc, EMPR_btEST) {
    this.P_vcCodEmp = P_vcCodEmp;
    this.vcRazSoc = vcRazSoc;
    this.EMPR_btEST = EMPR_btEST;
}


$(function () {
    $("#txtCodigo").keypress(ValidarNoEspacio);
    //$("#txtCodigo").keypress(ValidarCodigoVarChar);
    $("#txtRazonSocial").keypress(ValidarAlfaNumericoConEspacios);

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
        if ($("#hdfCod").val() == "") {//registro nuevo
            $("#txtCodigo").val("");
            $("#txtRazonSocial").val("");
            $("#txtCodigo").focus();
        }
        else {//Edicion
            //window.parent.tab.tabs("remove", window.parent.tab.tabs("option", "selected"));
            window.parent.tab.tabs("remove", indiceTab);
        }
    }

    $(".btnNormal").button();
    //$('#btnGuardar').button({ icons: { primary: "ui-icon-disk"} });

    $("#btnCerrar").live("click", function () {
        window.parent.tab.tabs("remove", window.parent.tab.tabs("option", "selected"));
    });

    var vcCodEmp = $("#hdfCod").val();


    $('#btnGuardar').click(function (event) {

        $("#txtCodigo").keypress(ValidarCodigoVarChar);
        $("#txtRazonSocial").keypress(ValidarAlfaNumericoConEspacios);

        var Empresa = new empresa();
        Empresa.P_vcCodEmp = $("#txtCodigo").val().replace(/'/g, "&#39").replace(/"/g, "&#34").replace(/\\/g, "&#92");
        Empresa.vcRazSoc = $("#txtRazonSocial").val().replace(/'/g, "&#39").replace(/"/g, "&#34").replace(/\\/g, "&#92");
        Empresa.EMPR_btEST = $("#chkEstado").is(':checked');
        //        var cod = $('#hdfCod').val();
        //        var Codigo = $.trim($("#txtCodigo").val());
        //        var Razon = $.trim($("#txtRazonSocial").val());

        if (Empresa.P_vcCodEmp == "") {
            alerta("El Código es un campo obligatorio");
            $("#txtCodigo").focus();
            return;
        }

        if (Empresa.vcRazSoc == "") {
            alerta("La Razón social es un campo obligatorio");
            $("#txtRazonSocial").focus();
            return;
        }

        //$("#dvCargando").show();
        //var esInsertar = cod == '-1';

        var oEmpresa = JSON.stringify(Empresa);
        var vcCodEmp = $("#hdfCod").val().replace(/'/g, "&#39").replace(/"/g, "&#34").replace(/\\/g, "&#92");

        $.ajax({
            type: "POST",
            url: "Mnt_Empresa.aspx/Guardar",
            data: "{'oEmpresa': '" + oEmpresa + "', 'vcCodEmp': '" + vcCodEmp + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                //$("#dvCargando").hide();
                if (result.d == "0") {
                    window.parent.ActualizarGrilla();
                    //Mensaje("<br/><h1>Empresa guardada</h1><br/>", document, CerroMensaje);
                    Mensaje("<br/><h1>Empresa guardada</h1><br/><h2>" + Empresa.P_vcCodEmp + "</h2>", document, CerroMensaje);
                }
                else {
                    alerta("El código de la Empresa ya ha sido Registrado Anteriormente, no se pudo Grabar el Registro");
                    BloquearPagina(false);
                }
            },
            error: function (xhr, err, thrErr) {
                //$("#dvCargando").hide();
                //alerta("Error, Estadow: " + xhr.readyState + "\nEstado: " + xhr.status);
                MostrarErrorAjax(xhr, err, thrErr);
                BloquearPagina(false);
            }
        });
    });
});

function validarEspaciosEnBlancoAlInicio() {
    var valor = $("#txtRazonSocial").val();
    $("#txtRazonSocial").val($.trim(valor));
}



//function Guardar() {
//    var cod = $('#hdfCod').val();
//    var Codigo = $.trim($("#txtCodigo").val());
//    var Razon = $.trim($("#txtRazonSocial").val());

//    if (Codigo == "") {
//        alerta("El codigo es un campo obligatorio");
//        $("#txtCodigo").focus();
//        return;
//    }

//    if (Razon == "") {
//        alerta("El Razón social es un campo obligatorio");
//        $("#txtRazonSocial").focus();
//        return;
//    }

//    $("#dvCargando").show();

//    var esInsertar = cod == '-1';

//    $.ajax({
//        type: "POST",
//        url: "Mnt_Empresa.aspx/Guardar",
//        data: "{'Codigo': '" + Codigo + "', 'RazonSocial': '" + Razon + "', 'esInsertar': '" + esInsertar.toString() + "'}",
//        contentType: "application/json; charset=utf-8",
//        dataType: "json",
//        success: function (msg) {
//            $("#dvCargando").hide();
//            if (msg.d == "") {
//                window.parent.ActualizarGrilla();
//                Mensaje("<br/><h1>Empresa guardada</h1><br/>", document, CerroMensaje);
//            }
//            else {
//                alerta("Revisar: " + msg.d);
//            }
//        },
//        error: function (xhr, err) {
//            $("#dvCargando").hide();
//            alerta("Error, Estadow: " + xhr.readyState + "\nEstado: " + xhr.status);
//        }
//    });
//}




