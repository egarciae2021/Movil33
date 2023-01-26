
$(function () {
    $("input:checkbox,input:radio,input:file").uniform();

    $("#lblAsociacionAreaCab").hide();
    $("#lblAsociacionCentroCostoCab").show();
    $("body").css({ "margin": "0px", "padding": "0px" });
    $("input[name='rblstAsociacion']").change(function () {
        if ($("input[name='rblstAsociacion']:checked").val() == "A") {
            $("#lblAsociacionAreaCab").show();
            $("#lblAsociacionCentroCostoCab").hide();
        }
        else {
            $("#lblAsociacionAreaCab").hide();
            $("#lblAsociacionCentroCostoCab").show();
        }
    });

    $("#btnAsociar").click(function () {
        if ($("input[name='rblstAsociacion']:checked").val() == "A") {
            var $width = 740;
            var $height = 505;
            $("#ifArea").attr("src", '../../Consultar/Con_SeleccionArea.aspx?Tipo=1&Multiple=1');
            var Modal = $('#dvArea').dialog({
                title: "Seleccionar Área",
                width: $width,
                height: $height,
                modal: true,
                resizable: false
            });
        }
        else {
            var $width = 475;
            var $height = 370;
            $("#ifCCO").attr("src", '../../Consultar/Con_SeleccionCentroCosto.aspx');
            var Modal = $('#dvCCO').dialog({
                title: "Seleccionar centro de costo",
                width: $width,
                height: $height,
                modal: true,
                resizable: false
            });
        }
    });



});
    