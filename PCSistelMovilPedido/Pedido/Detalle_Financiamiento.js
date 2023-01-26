

$(function () {
    fnMostrarDatos();
    //$("input").addClass("k-textbox");
});

function fnMostrarDatos() {

    $("#txtCodigo").val(p_FinanciamientoTipo.Codigo);
    $("#TextBox1").val(p_FinanciamientoTipo.Descripcion);
    $("#txtDescripcionCorta").val(p_FinanciamientoTipo.DescripcionCorta);

    $("#chkPagoContado").prop("checked", p_FinanciamientoTipo.PagoContado);
    $("#txtPagoContadoMinimo").val(p_FinanciamientoTipo.MinimoCuotas);
    $("#txtPagoContadoMaximo").val(p_FinanciamientoTipo.MaximoCuotas);
    $("#txtPagonContado").val(p_FinanciamientoTipo.Cuotas);
    $("#chkPeriodoGracia").prop("checked", p_FinanciamientoTipo.PeriodoGracia);
    $("#txtMinimoMesesPeriodoGracia").val(p_FinanciamientoTipo.MinimoMesesPeriodoGracia);
    $("#txtMaximoMesesPeriodoGracia").val(p_FinanciamientoTipo.MaximoMesesPeriodoGracia);
    $("#txtMesesPeriodoGracia").val(p_FinanciamientoTipo.MesesPeriodoGracia);
    $("#chkCuotasDobles").prop("checked", p_FinanciamientoTipo.CuotasDobles);
    $("#chkCuotaQuincena").prop("checked", p_FinanciamientoTipo.CuotaQuincena);
    $("#txtMinimoCuotaPrimeraQuincena").val(p_FinanciamientoTipo.MinimoCuotaPrimeraQuincena);
    $("#txtMaximoCuotaPrimeraQuincena").val(p_FinanciamientoTipo.MaximoCuotaPrimeraQuincena);
    $("#txtCuotaPrimeraQuincena").val(p_FinanciamientoTipo.CuotaPrimeraQuincena);
    $("#chkInteres").prop("checked", p_FinanciamientoTipo.Interes);
    $("#txtTasaInteres").val(p_FinanciamientoTipo.TasaInteres);

    //Pago contado
    if (p_FinanciamientoTipo.PagoContado == true) {
        $("#trPagoContadoDefinicion").css("display", "none");
        $("#trPagoContadoDefinicion").css("display", "none");
        $("#trPagoContadoDefinicion").css("display", "none");
        $("#trPagoContadoDefinicion").css("display", "none");
        $("#trPagoContadoDefinicion").css("display", "none");
        $("#trPagoContadoDefinicion").css("display", "none");
//        document.getElementById('trPagoContadoDefinicion').style.display = 'none';
//        document.getElementById('trCuotasDobles').style.display = 'none';
//        document.getElementById('trCuotaQuincena').style.display = 'none';
//        document.getElementById('trIntereses').style.display = 'none';
//        document.getElementById('trPagoContadoDefinicionMeses1').style.display = 'none';
//        document.getElementById('trPagoContadoDefinicionMeses2').style.display = 'none';
    } else {
        
        if (p_FinanciamientoTipo.MinimoCuotas != '0' && p_FinanciamientoTipo.MaximoCuotas != '0') {
            $($("input[name='rblstPagoContado']")[0]).attr("checked", true);
            $("#trPagoContadoDefinicionRango").css("display", "block");
            //document.getElementById('trPagoContadoDefinicionRango').style.display = '';
            $("#txtPagonContado").val('');
        } else if (p_FinanciamientoTipo.Cuotas != '0') {
            $($("input[name='rblstPagoContado']")[1]).attr("checked", true);
            $("#trPagoContadoDefinicionPredefinido").css("display", "block");
            //document.getElementById('trPagoContadoDefinicionPredefinido').style.display = '';
            $("#txtPagoContadoMinimo").val('');
            $("#txtPagoContadoMaximo").val('');
        } else if (p_FinanciamientoTipo.MesesCuotas != '') {
            $($("input[name='rblstPagoContado']")[2]).attr("checked", true);
            $("#trPagoContadoDefinicionMeses1").css("display", "block");
            $("#trPagoContadoDefinicionMeses2").css("display", "block");
//            document.getElementById('trPagoContadoDefinicionMeses1').style.display = '';
//            document.getElementById('trPagoContadoDefinicionMeses2').style.display = '';
            $("#txtPagoContadoMinimo").val('');
            $("#txtPagoContadoMaximo").val('');
            $("#txtPagonContado").val('');
            if (p_FinanciamientoTipo.MesesCuotas != "") {
                var splMeses = p_FinanciamientoTipo.MesesCuotas.split(",");
                var arNomMesSelect = [];
                for (var i = 0; i < splMeses.length; i++) {
                    var vcMes = oFinanciamientoTipo.NombreMes(splMeses[i]).substring(0, 3);
                    //$("#lstMesesPagoContado").append($("<option></option>").attr("value", splMeses[i]).text(vcMes)); //comentado 10/12/2013 wapumayta
                    $("#chkMesCuota-" + splMeses[i]).attr("checked", true);
                    arNomMesSelect.push(vcMes);
                }
                arValTipos = splMeses;
                $("#ddlMesesPagoCuotas").data("kendoComboBox").text(arNomMesSelect.join(",").toString());
            }
        } else {
            $($("input[name='rblstPagoContado']")[3]).attr("checked", true);
            $("#txtPagoContadoMinimo").val('');
            $("#txtPagoContadoMaximo").val('');
            $("#txtPagonContado").val('');
        }
    }

    //Periodo de gracia
    if (p_FinanciamientoTipo.PeriodoGracia == true) {
        $("#trPeriodoGraciaDefinicion").css("display", "block");
        //document.getElementById('trPeriodoGraciaDefinicion').style.display = '';
        if (p_FinanciamientoTipo.MinimoMesesPeriodoGracia != '0' && p_FinanciamientoTipo.MaximoMesesPeriodoGracia != '0') {
            $($("input[name='rblstTipoPeriodoGracia']")[0]).attr("checked", true);
            $("#trMaximoMesesPeriodoGracia").css("display", "block");
            //document.getElementById('trMaximoMesesPeriodoGracia').style.display = '';
            $("#txtMesesPeriodoGracia").val('');
        }
        if (p_FinanciamientoTipo.MesesPeriodoGracia != '0') {
            $($("input[name='rblstTipoPeriodoGracia']")[1]).attr("checked", true);
            $("#trMesesPeriodoGracia").css("display", "block");
            //document.getElementById('trMesesPeriodoGracia').style.display = '';
            $("#txtMinimoMesesPeriodoGracia").val('');
            $("#txtMaximoMesesPeriodoGracia").val('');
        }
    } 
    //else {
    //    //document.getElementById('#trPeriodoGraciaDefinicion').style.display = 'none';
    //}

    //Cuotas dobles
    if (p_FinanciamientoTipo.PagoContado == false && p_FinanciamientoTipo.CuotasDobles == true) {
        $("#trMesesCuotasDobles").css("display", "block");
        $("#trMes").css("display", "block");
//        document.getElementById('trMesesCuotasDobles').style.display = '';
//        document.getElementById('trMes').style.display = '';
    } else {        
        $('#trMesesCuotasDobles').css("display", "none");
        $('#trMes').css("display","none");
        $("#txtMes").val("");
        $("#lstbMesesCuotasDobles").empty();
    }
    $("#lstbMesesCuotasDobles").empty();
    if (p_FinanciamientoTipo.MesesCuotasDobles != "" && p_FinanciamientoTipo.MesesCuotasDobles != null) {
        var splMesesCD = p_FinanciamientoTipo.MesesCuotasDobles.split(",");
        var arNomMesSelect = [];
        for (var i = 0; i < splMesesCD.length; i++) {
            var vcMesCD = oFinanciamientoTipo.NombreMes(splMesesCD[i]).substring(0, 3);
            //$("#lstbMesesCuotasDobles").append($("<option></option>").attr("value", splMesesCD[i]).text(vcMesCD)); //comentado 10-12-2013 wapumayta
            $("#chkMesDobles-" + splMesesCD[i]).attr("checked", true);
            arNomMesSelect.push(vcMesCD);
        }
        arMesesCuotasDobles = splMesesCD;
        $("#ddlMesesCuotasDobles").data("kendoComboBox").text(arNomMesSelect.join(",").toString());
    }

    //Cuotas quincena
    if (p_FinanciamientoTipo.PagoContado == false && p_FinanciamientoTipo.CuotaQuincena == true) {
        $("#trCuotaQuincenaDefinicion").css("display", "block");
        //document.getElementById('trCuotaQuincenaDefinicion').style.display = '';
        if (p_FinanciamientoTipo.MinimoCuotaPrimeraQuincena != '' && p_FinanciamientoTipo.MinimoCuotaPrimeraQuincena != null && p_FinanciamientoTipo.MaximoCuotaPrimeraQuincena != '' && p_FinanciamientoTipo.MaximoCuotaPrimeraQuincena != null) {
            $($("input[name='rblstTipoCuotaQuincena']")[0]).attr("checked", true);
            $("#trPorcentajeMaximoCuotaPrimeraQuincena").css("display", "block");
            //document.getElementById('trPorcentajeMaximoCuotaPrimeraQuincena').style.display = '';
        }
        if (p_FinanciamientoTipo.CuotaPrimeraQuincena != '' && p_FinanciamientoTipo.CuotaPrimeraQuincena != null) {
            $($("input[name='rblstTipoCuotaQuincena']")[1]).attr("checked", true);
            $("#trPorcentajeCuotaPrimeraQuincena").css("display", "block");
            //document.getElementById('trPorcentajeCuotaPrimeraQuincena').style.display = '';
        }
    } else {
        $("#trCuotaQuincenaDefinicion").css("display", "none");
        //document.getElementById('trCuotaQuincenaDefinicion').style.display = 'none';
    }

    //Intereses
    if (p_FinanciamientoTipo.PagoContado == false && p_FinanciamientoTipo.Interes == true) {
        $("#trTipoInteres").css("display", "block");
        $("#trTasaInteres").css("display", "block");
//        document.getElementById('trTipoInteres').style.display = '';
//        document.getElementById('trTasaInteres').style.display = '';

    } else {
        $("#trTipoInteres").css("display", "none");
        $("#trTasaInteres").css("display", "none");
//        document.getElementById('trTipoInteres').style.display = 'none';
//        document.getElementById('trTasaInteres').style.display = 'none';

        $("#txtTasaInteres").val("");
    }

}