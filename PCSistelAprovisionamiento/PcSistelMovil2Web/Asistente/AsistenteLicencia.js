var ExisteDominio = 1;
var oCultura = { dcNumDec: '2', vcSimDec: '.', vcSimSepMil: ',', Moneda: { vcSimMon: 'S/.'} };
$(function () {

    //window.parent.$("#DivLicencia").find(".lblMenu").css({ color: "#424242" });
    window.parent.$("#DivLicencia").find(".lblMenu").css({ "text-decoration": "underline" });
    window.parent.$("#edit3").css({ "display": "" });

    //*****************Cargando Datos************
    $("#Tipolicencia").val(window.parent.codtipoli);

    if (window.parent.nombredom == "") {
        $("#nombredominio").val(window.parent.nombreempresa);
    }
    else {
        $("#nombredominio").val(window.parent.nombredom);
    }
    $("#txtnlineas").val(FormatoNumero(window.parent.nlineas, oCultura, true));
    //*************************************************


    //ValidarNumeroEnCajaTexto("txtnlineas", ValidarSoloNumero);
    //ValidarNumeroEnCajaTexto("nombredominio", ValidarAlfaNumerico);

    $("#btnatras").click(function () {

        window.parent.$("#DivLicencia").find(".lblMenu").css({ "text-decoration": "none" });
        window.parent.$("#edit3").css({ "display": "none" });
        var $Pagina = 'Asistente2.aspx';
        window.parent.$("#ifTemaAsistente").attr("src", $Pagina);
    });

    $("#btnsiguiente").click(function () {

        if ($("#nombredominio").val() == "") {
            alertaExterna("Ingrese un nombre de dominio");
            $("#nombredominio").focus();
            return;
        }

        if ($("#nombredominio").val().length < 3 || $("#nombredominio").val().length > 35) {
            alertaExterna("El nombre de dominio debe tener entre 3 y 35 caracteres");
            $("#nombredominio").focus()
            return;
        }

        if ($("#ddlPortalOrigen").val() == "-1") {
            alertaExterna("Debe seleccionar un Portal de Orgien");
            $("#ddlPortalOrigen").focus();
            return;
        }       

        $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            url: "AsistenteLicencia.aspx/BuscarDominio",
            data: "{'nombre':'" + $("#nombredominio").val() + "'}",
            dataType: "json",
            success: function (result) {
        
                var resultado = result.d;
        
                if (resultado == 0) { ExisteDominio = '0'; }
                else if (resultado == 2) {
                    alertaExterna("El nombre de dominio no puede contener tildes o espacios en blanco");
                    BloquearPagina(false);
                }
                else {
                    alertaExterna("El nombre de dominio ya existe");
                    BloquearPagina(false);
                }


        //ExisteDominio = '0';
        //fnActivarAsistente();

        
            },
            error: function (result) {
                alert("Error");
            },
            complete: function () {
                //window.top.fnMostrarEspera();
                setTimeout(function () { fnActivarAsistente(); }, 900);
            }
        });


    });

    $("#btcancelar").click(function () {
        CancelarAsistente();
    });

});


function fnActivarAsistente() {
    if (ExisteDominio == '0') {
        window.parent.codtipoli = $("#Tipolicencia").val();
        window.parent.tipoli = $($("#Tipolicencia option:selected")[0]).text();
        window.parent.nlineas = DevuelveNumeroSinFormato($("#txtnlineas").val(), oCultura, true);
        window.parent.nombredom = $("#nombredominio").val();
        window.parent.IdPortal = $("#ddlPortalOrigen").val();

        window.parent.$("#DivLicencia").find(".lblMenu").css({ "text-decoration": "none" });
        window.parent.$("#edit3").css({ "display": "none" });
        //var $Pagina = 'Asistente3.aspx'; //Original
        //var $Pagina = 'Asistente1.aspx';

        //console.log('AsistenteLicencia.aspx');


        //alert(window.parent.$("#ifTemaAsistente").html());
        
        //window.parent.$("#ifTemaAsistente").attr("src", 'Asistente3.aspx');

        //window.parent.ifTemaAsistente.onload = function () { setTimeout(function () { }, 8); };
        //window.parent.ifTemaAsistente.src = 'Asistente3.aspx';


        //window.parent.$("#ifTemaAsistente").load('Asistente3.aspx');
        window.parent.RecargarPaginaAsistente('Asistente3.aspx');

    }
}