var EsPriVez = "1";
var vcFileName = "";
var Periodo;
var CarpetaDominio = '';
var ProcesoCerrado = '0';
var EnlaceSeleccionado = '';
$(function () {
    ProcesoCerrado = $("#hdfCerrado").val();
    if (ProcesoCerrado == "1") {
        $("#txtDetalle").attr("disabled", "disabled");
        $("#btnEnviar").hide();
        $("input[name=userfile]").hide();
    }

    $(".itemChat").click(function () {

        $(".itemChatSeleccionado").removeClass("itemChatSeleccionado").addClass("itemChat");
        $(this).removeClass("itemChat").addClass("itemChatSeleccionado");


        EnlaceSeleccionado = $(this).attr("id");
        EnlaceSeleccionado = EnlaceSeleccionado.replace(/Enlace_/g, '');

        setTimeout(function () {
            $("#dvChatContador_" + EnlaceSeleccionado).html("");
            $("#dvChatContador_" + EnlaceSeleccionado).hide();

            try {
                window.parent.ActualizarNoLeidos();
            } catch (e) {
            }

        }, 800);

        var Periodo = $("#hdfPeriodo").val();
        var Mes = Periodo.substring(4, 6);
        var Anio = Periodo.substring(0, 4);
        //$("#dvChatContador").hide();
        $('#ifNota').attr("src", "ValidarNota.aspx?Periodo=" + Periodo + "&Enlace=" + EnlaceSeleccionado + "&EsEnlace=0&Operador=" + $("#hdfOperador").val());
        var formulario = $('#dvNota').dialog({
            title: "Notas - Facturación " + Mes + "/" + Anio,
            height: 570,
            width: 703,
            modal: true
        });

    });

    if ($(".itemChat").length > 0) {
        $(".itemChat")[0].click();
        //Ocultar al mismo empleado...
        var CodEmpleadoActual = $("#hdfEmpleadoActual").val();
        $("#Enlace_" + CodEmpleadoActual).hide();
    }


    //debugger;
    $.ajax({
        url: "CierreNota.aspx/ObtenerNoLeidos",
        data: "{'Periodo':'" + $("#hdfPeriodo").val() + "','Operador':'" + $("#hdfOperador").val() + "'}",
        dataType: "json",
        type: "post",
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            if (result.d.length == 0) {
                return;
            }
            var CodEnlace = "";
            RegistrosNoLeidos = result.d[0];
            for (var i = 0; i < RegistrosNoLeidos.length; i++) {
                CodEnlace = RegistrosNoLeidos[i].CodEnlace;
                $("#dvChatContador_" + CodEnlace).html(RegistrosNoLeidos[i].NoVisto);
                $("#dvChatContador_" + CodEnlace).show();
            }
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });    

});


